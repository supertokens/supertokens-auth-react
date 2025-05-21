import * as jose from "jose";
import SuperTokensNextjsSSRAPIWrapper from "../../../lib/ts/nextjs/ssr";
import type { CookiesStore, CookiesObject } from "../../../lib/ts/nextjs/types";
import {
    ACCESS_TOKEN_COOKIE_NAME,
    FRONT_TOKEN_COOKIE_NAME,
    CURRENT_PATH_COOKIE_NAME,
    FORCE_LOGOUT_PATH_PARAM_NAME,
    REDIRECT_PATH_PARAM_NAME,
} from "../../../lib/ts/nextjs/constants";

jest.mock("jose", () => ({
    createRemoteJWKSet: jest.fn(),
    jwtVerify: jest.fn(),
}));

describe("nextjs/ssr", () => {
    const API_BASE_PATH = "/api/auth";
    const WEBSITE_BASE_PATH = "/auth";
    const REFRESH_PATH = `${API_BASE_PATH}/session/refresh`;
    const AUTH_PATH = WEBSITE_BASE_PATH;
    const FORCE_LOGOUT_PARAM = `${FORCE_LOGOUT_PATH_PARAM_NAME}=true`;

    const buildRedirectUrl = (basePath: string, params: string[]) => {
        return `${basePath}?${params.join("&")}`;
    };

    const getRedirectParam = (redirectTo: string) => {
        return `${REDIRECT_PATH_PARAM_NAME}=${redirectTo}`;
    };

    const createFrontToken = (
        overrides: Partial<{
            uid: string;
            ate: number;
            up: Record<string, any>;
        }> = {}
    ) => {
        const defaultToken = {
            uid: "user123",
            ate: Date.now() + 3600000, // 1 hour from now
            up: { sub: "user123" },
            ...overrides,
        };
        return Buffer.from(JSON.stringify(defaultToken)).toString("base64");
    };

    const mockRedirect = jest.fn((url: string): never => {
        throw url;
    });

    const mockConfig = {
        appInfo: {
            apiBasePath: API_BASE_PATH,
            apiDomain: "http://localhost:3000",
            websiteBasePath: WEBSITE_BASE_PATH,
            appName: "SuperTokens Demo",
            websiteDomain: "http://localhost:3000",
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        SuperTokensNextjsSSRAPIWrapper.init(mockConfig);
    });

    describe("getSSRSession", () => {
        const createMockCookiesStore = (cookies: Record<string, string>): CookiesStore => ({
            get: (name: string) => {
                const value = cookies[name];
                return { value: value || "" };
            },
            set: jest.fn(),
        });

        it("should redirect to the auth page if the front token is not found", async () => {
            const currentPath = "/";
            const cookies = createMockCookiesStore({ [CURRENT_PATH_COOKIE_NAME]: currentPath });
            await expect(SuperTokensNextjsSSRAPIWrapper.getSSRSession(cookies, mockRedirect)).rejects.toBe(
                buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)])
            );
        });

        it("should redirect to the auth page if the front token is invalid", async () => {
            const currentPath = "/dashboard";
            const cookies = createMockCookiesStore({
                [FRONT_TOKEN_COOKIE_NAME]: "invalid-token",
                [CURRENT_PATH_COOKIE_NAME]: currentPath,
            });
            await expect(SuperTokensNextjsSSRAPIWrapper.getSSRSession(cookies, mockRedirect)).rejects.toBe(
                buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)])
            );
        });

        it("should redirect to the auth page if the access token is invalid", async () => {
            const currentPath = "/profile";
            const mockFrontToken = createFrontToken();
            const cookies = createMockCookiesStore({
                [FRONT_TOKEN_COOKIE_NAME]: mockFrontToken,
                [ACCESS_TOKEN_COOKIE_NAME]: "invalid-access-token",
                [CURRENT_PATH_COOKIE_NAME]: currentPath,
            });

            (jose.jwtVerify as jest.Mock).mockRejectedValueOnce({ isValid: false });

            await expect(SuperTokensNextjsSSRAPIWrapper.getSSRSession(cookies, mockRedirect)).rejects.toBe(
                buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)])
            );
        });

        it("should redirect to the refresh path if the front token is expired", async () => {
            const currentPath = "/settings";
            const mockFrontToken = createFrontToken({
                ate: Date.now() - 1000, // Expired
            });

            const cookies = createMockCookiesStore({
                [FRONT_TOKEN_COOKIE_NAME]: mockFrontToken,
                [CURRENT_PATH_COOKIE_NAME]: currentPath,
            });

            await expect(SuperTokensNextjsSSRAPIWrapper.getSSRSession(cookies, mockRedirect)).rejects.toBe(
                buildRedirectUrl(REFRESH_PATH, [getRedirectParam(currentPath)])
            );
        });

        it("should redirect to the refresh path if the access token was not found", async () => {
            const currentPath = "/account";
            const mockFrontToken = createFrontToken();
            const cookies = createMockCookiesStore({
                [FRONT_TOKEN_COOKIE_NAME]: mockFrontToken,
                [CURRENT_PATH_COOKIE_NAME]: currentPath,
            });

            await expect(SuperTokensNextjsSSRAPIWrapper.getSSRSession(cookies, mockRedirect)).rejects.toBe(
                buildRedirectUrl(REFRESH_PATH, [getRedirectParam(currentPath)])
            );
        });

        it("should redirect to the refresh path if token payloads do not match", async () => {
            const currentPath = "/home";
            const mockFrontToken = createFrontToken({
                up: { sub: "user123", someData: "value1" },
            });

            const cookies = createMockCookiesStore({
                [FRONT_TOKEN_COOKIE_NAME]: mockFrontToken,
                [ACCESS_TOKEN_COOKIE_NAME]: "valid-access-token",
                [CURRENT_PATH_COOKIE_NAME]: currentPath,
            });

            (jose.jwtVerify as jest.Mock).mockResolvedValueOnce({
                payload: { sub: "user123", someData: "different-value", exp: Date.now() + 3600000 },
                isValid: true,
            });

            await expect(SuperTokensNextjsSSRAPIWrapper.getSSRSession(cookies, mockRedirect)).rejects.toBe(
                buildRedirectUrl(REFRESH_PATH, [getRedirectParam(currentPath)])
            );
        });

        it("should return the session if tokens match", async () => {
            const mockPayload = { sub: "user123", someData: "value1", exp: Date.now() + 360000 };
            const mockFrontToken = createFrontToken({
                up: mockPayload,
            });

            const cookies = createMockCookiesStore({
                [FRONT_TOKEN_COOKIE_NAME]: mockFrontToken,
                [ACCESS_TOKEN_COOKIE_NAME]: "valid-access-token",
            });

            (jose.jwtVerify as jest.Mock).mockResolvedValueOnce({
                payload: mockPayload,
                isValid: true,
            });

            const result = await SuperTokensNextjsSSRAPIWrapper.getSSRSession(cookies, mockRedirect);
            expect(result).toEqual({
                userId: "user123",
                accessTokenPayload: { isValid: true, payload: mockPayload },
                doesSessionExist: true,
                loading: false,
                invalidClaims: [],
                accessDeniedValidatorError: undefined,
            });
        });

        it("redirects to the correct page based on the sCurrentPath cookie", async () => {
            let currentPath = "/dashboard";
            const authCookies = createMockCookiesStore({
                [CURRENT_PATH_COOKIE_NAME]: currentPath,
            });

            await expect(SuperTokensNextjsSSRAPIWrapper.getSSRSession(authCookies, mockRedirect)).rejects.toBe(
                buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)])
            );

            currentPath = "/settings/profile";
            const complexPathCookies = createMockCookiesStore({
                [CURRENT_PATH_COOKIE_NAME]: currentPath,
            });

            await expect(SuperTokensNextjsSSRAPIWrapper.getSSRSession(complexPathCookies, mockRedirect)).rejects.toBe(
                buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)])
            );

            currentPath = "/";
            const cookiesWithoutPath = createMockCookiesStore({});
            await expect(SuperTokensNextjsSSRAPIWrapper.getSSRSession(cookiesWithoutPath, mockRedirect)).rejects.toBe(
                buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)])
            );
        });
    });

    describe("getServerSidePropsSession", () => {
        const createMockRequest = (
            cookies: Record<string, string>,
            path: string = "/"
        ): Request & { cookies: CookiesObject } =>
            ({
                url: `http://localhost:3000${path}`,
                cookies: cookies,
            } as Request & { cookies: CookiesObject });

        it("should redirect to the auth page if the front token is not found", async () => {
            const currentPath = "/";
            const request = createMockRequest({}, currentPath);
            const result = await SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession(request);
            expect(result).toEqual({
                redirect: {
                    destination: buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)]),
                    permanent: false,
                },
            });
        });

        it("should redirect to the auth page if the front token is invalid", async () => {
            const currentPath = "/dashboard";
            const request = createMockRequest(
                {
                    [FRONT_TOKEN_COOKIE_NAME]: "invalid-token",
                },
                currentPath
            );
            const result = await SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession(request);
            expect(result).toEqual({
                redirect: {
                    destination: buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)]),
                    permanent: false,
                },
            });
        });

        it("should redirect to the auth page if the access token is invalid", async () => {
            const currentPath = "/profile";
            const mockFrontToken = createFrontToken();
            const request = createMockRequest(
                {
                    [FRONT_TOKEN_COOKIE_NAME]: mockFrontToken,
                    [ACCESS_TOKEN_COOKIE_NAME]: "invalid-access-token",
                },
                currentPath
            );

            (jose.jwtVerify as jest.Mock).mockRejectedValueOnce({ isValid: false });

            const result = await SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession(request);
            expect(result).toEqual({
                redirect: {
                    destination: buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)]),
                    permanent: false,
                },
            });
        });

        it("should redirect to the refresh path if the front token is expired", async () => {
            const currentPath = "/settings";
            const mockFrontToken = createFrontToken({
                ate: Date.now() - 1000, // Expired
            });

            const request = createMockRequest(
                {
                    [FRONT_TOKEN_COOKIE_NAME]: mockFrontToken,
                },
                currentPath
            );

            const result = await SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession(request);
            expect(result).toEqual({
                redirect: {
                    destination: buildRedirectUrl(REFRESH_PATH, [getRedirectParam(currentPath)]),
                    permanent: false,
                },
            });
        });

        it("should redirect to the refresh path if the access token was not found", async () => {
            const currentPath = "/account";
            const mockFrontToken = createFrontToken();
            const request = createMockRequest(
                {
                    [FRONT_TOKEN_COOKIE_NAME]: mockFrontToken,
                },
                currentPath
            );

            const result = await SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession(request);
            expect(result).toEqual({
                redirect: {
                    destination: buildRedirectUrl(REFRESH_PATH, [getRedirectParam(currentPath)]),
                    permanent: false,
                },
            });
        });

        it("should redirect to the refresh path if token payloads do not match", async () => {
            const currentPath = "/home";
            const mockFrontToken = createFrontToken({
                up: { sub: "user123", someData: "value1" },
            });

            const request = createMockRequest(
                {
                    [FRONT_TOKEN_COOKIE_NAME]: mockFrontToken,
                    [ACCESS_TOKEN_COOKIE_NAME]: "valid-access-token",
                },
                currentPath
            );

            (jose.jwtVerify as jest.Mock).mockResolvedValueOnce({
                payload: { sub: "user123", someData: "different-value", exp: Date.now() + 3600000 },
                isValid: true,
            });

            const result = await SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession(request);
            expect(result).toEqual({
                redirect: {
                    destination: buildRedirectUrl(REFRESH_PATH, [getRedirectParam(currentPath)]),
                    permanent: false,
                },
            });
        });

        it("should return the session if tokens match", async () => {
            const mockPayload = { sub: "user123", someData: "value1", exp: Date.now() + 360000 };
            const mockFrontToken = createFrontToken({
                up: mockPayload,
            });

            const request = createMockRequest({
                [FRONT_TOKEN_COOKIE_NAME]: mockFrontToken,
                [ACCESS_TOKEN_COOKIE_NAME]: "valid-access-token",
            });

            (jose.jwtVerify as jest.Mock).mockResolvedValueOnce({
                payload: mockPayload,
                isValid: true,
            });

            const result = await SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession(request);
            expect(result).toEqual({
                props: {
                    session: {
                        userId: "user123",
                        accessTokenPayload: { isValid: true, payload: mockPayload },
                        doesSessionExist: true,
                        loading: false,
                        invalidClaims: [],
                        accessDeniedValidatorError: undefined,
                    },
                },
            });
        });

        it("redirects to the correct page based on the request URL path", async () => {
            let currentPath = "/dashboard";
            const dashboardRequest = createMockRequest({}, currentPath);
            const dashboardResult = await SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession(dashboardRequest);
            expect(dashboardResult).toEqual({
                redirect: {
                    destination: buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)]),
                    permanent: false,
                },
            });

            currentPath = "/settings/profile";
            const complexRequest = createMockRequest({}, currentPath);
            const complexResult = await SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession(complexRequest);
            expect(complexResult).toEqual({
                redirect: {
                    destination: buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)]),
                    permanent: false,
                },
            });

            currentPath = "/";
            const rootRequest = createMockRequest({}, currentPath);
            const rootResult = await SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession(rootRequest);
            expect(rootResult).toEqual({
                redirect: {
                    destination: buildRedirectUrl(AUTH_PATH, [FORCE_LOGOUT_PARAM, getRedirectParam(currentPath)]),
                    permanent: false,
                },
            });
        });
    });
});
