import { enableLogging, logDebugMessage } from "../logger";
import { jwtVerify } from "../utils";
import { doesSessionExist, getAccessTokenPayloadSecurely } from "supertokens-web-js/recipe/session";

import {
    FRONT_TOKEN_HEADER_NAME,
    ACCESS_TOKEN_COOKIE_NAME,
    ACCESS_TOKEN_HEADER_NAME,
    CURRENT_PATH_COOKIE_NAME,
    FORCE_LOGOUT_PATH_PARAM_NAME,
    REDIRECT_PATH_PARAM_NAME,
    FRONT_TOKEN_COOKIE_NAME,
    DEFAULT_API_PATH,
} from "./constants";
import { isCookiesStore } from "./types";

import type {
    CookiesObject,
    CookiesStore,
    FrontTokenPayload,
    GetServerSidePropsReturnValue,
    SuperTokensNextjsConfig,
} from "./types";
import type { LoadedSessionContext } from "../recipe/session/types";
import { getNormalisedUserContext } from "supertokens-web-js/utils";
import SuperTokens from "../superTokens";

type SSRSessionState =
    | "front-token-not-found"
    | "front-token-invalid"
    | "front-token-expired"
    | "access-token-not-found"
    | "access-token-invalid"
    | "tokens-do-not-match"
    | "tokens-match";

export default class SuperTokensNextjsSSRAPIWrapper {
    static config: SuperTokensNextjsConfig;

    static init(config: SuperTokensNextjsConfig): void {
        if (config.enableDebugLogs) {
            enableLogging();
        }
        SuperTokensNextjsSSRAPIWrapper.config = config;
    }

    static getConfigOrThrow(): SuperTokensNextjsConfig {
        if (!SuperTokensNextjsSSRAPIWrapper.config) {
            throw new Error("SuperTokens must be initialized before calling this method.");
        }

        return SuperTokensNextjsSSRAPIWrapper.config;
    }

    static getJWKSUrl(): string {
        const appInfo = SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow().appInfo;
        let jwksPath = `${appInfo.apiBasePath}/jwt/jwks.json`;
        if (!jwksPath.startsWith("/")) {
            jwksPath = `/${jwksPath}`;
        }
        jwksPath = jwksPath.replace("//", "/");
        const jwksUrl = new URL(jwksPath, appInfo.apiDomain);
        return jwksUrl.toString();
    }

    /**
     * Get the session state inside a server componet or redirect
     * The function is meant to be used inside Next.js server components
     * @param cookies - The cookies store exposed by next/headers (await cookies())
     * @returns The session context value or directly redirects the user to either the login page or the refresh API
     **/
    static async getServerComponentSession(cookies: CookiesStore): Promise<LoadedSessionContext> {
        const redirectPath = cookies.get(CURRENT_PATH_COOKIE_NAME)?.value || "/";
        const authPagePath = getAuthPagePath(redirectPath);
        const refreshLocation = getRefreshLocation(redirectPath);

        const { state, session } = await getSSRSessionState(cookies);
        logDebugMessage(`SSR Session State: ${state}`);
        switch (state) {
            case "front-token-not-found":
            case "front-token-invalid":
            case "access-token-invalid":
                logDebugMessage(`Redirecting to Auth Page: ${authPagePath}`);
                return redirect(authPagePath);
            case "front-token-expired":
            case "access-token-not-found":
            case "tokens-do-not-match":
                logDebugMessage(`Redirecting to refresh API: ${refreshLocation}`);
                return redirect(refreshLocation);
            case "tokens-match":
                logDebugMessage("Returning session object");
                return session as LoadedSessionContext;
            default:
                // This is here just to prevent typescript from complaining
                // about the function not returning a value
                throw new Error(`Unknown state: ${state}`);
        }
    }

    /**
     * Get the session state inside a server action
     * The function is meant to be used inside Next.js server actions
     * @param cookies - The cookies store exposed by next/headers (await cookies())
     * @returns An object that includes session context value and the status of the session ('valid' | 'expired' | 'invalid')
     * If the status is 'invalid' or 'expired' then the users should be considered as unauthenticated
     **/
    static async getServerActionSession(
        cookies: CookiesStore
    ): Promise<
        { session: LoadedSessionContext; status: "valid" } | { status: "expired" | "invalid"; session: undefined }
    > {
        const { state, session } = await getSSRSessionState(cookies);
        logDebugMessage(`SSR Session State: ${state}`);
        if (state === "tokens-match") {
            return { session: session as LoadedSessionContext, status: "valid" };
        } else if (
            ["tokens-do-not-match", "front-token-expired", "access-token-not-found", "access-token-invalid"].includes(
                state
            )
        ) {
            return { status: "expired", session: undefined };
        }

        return { status: "invalid", session: undefined };
    }

    /**
     * Ensures that a server action is called by an authenticated user
     * If the session does not exist/user is not authenticated, it will automatically redirect to the login page
     * The function is meant to run on the client, before calling the actual server action
     * @param action - A server action that will get called after the authentication state is confirmed
     * @returns The server action return value
     **/
    static async confirmAuthenticationAndCallServerAction<T extends () => Promise<K>, K>(action: T) {
        try {
            const sessionExists = await doesSessionExist();
            logDebugMessage(`Session exists: ${sessionExists}`);
            if (!sessionExists) {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    show: "signin",
                    redirectBack: true,
                    userContext: getNormalisedUserContext({}),
                });
            }

            logDebugMessage(`Retrieved access token payload`);
            await getAccessTokenPayloadSecurely();
        } catch (err) {
            logDebugMessage(`Error while authenticating server action`);
            return SuperTokens.getInstanceOrThrow().redirectToAuth({
                show: "signin",
                redirectBack: true,
                userContext: getNormalisedUserContext({}),
            });
        }

        logDebugMessage(`Calling server action`);
        return action();
    }

    /**
     * Get the session state or redirect
     * The function is meant to be used inside getServerSideProps.
     * @param request - The request object available inside getServerSideProps ctx (ctx.req)
     * @returns The session context value or a redirects path to send the user to the refresh API or the login page
     **/
    static async getServerSidePropsSession(
        request: Request & { cookies: CookiesObject }
    ): Promise<GetServerSidePropsReturnValue> {
        const appInfo = SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow().appInfo;
        const requestUrl = new URL(request.url, appInfo.websiteDomain);
        const redirectPath = requestUrl.pathname;
        const authPagePath = getAuthPagePath(redirectPath);
        const refreshLocation = getRefreshLocation(redirectPath);

        const { state, session } = await getSSRSessionState(request.cookies);
        logDebugMessage(`SSR Session State: ${state}`);
        switch (state) {
            case "front-token-not-found":
            case "front-token-invalid":
            case "access-token-invalid":
                logDebugMessage(`Redirecting to Auth Page: ${authPagePath}`);
                return { redirect: { destination: authPagePath, permanent: false } };
            case "front-token-expired":
            case "access-token-not-found":
            case "tokens-do-not-match":
                logDebugMessage(`Redirecting to refresh API: ${refreshLocation}`);
                return { redirect: { destination: refreshLocation, permanent: false } };
            case "tokens-match":
                logDebugMessage("Returning session object");
                return { props: { session: session as LoadedSessionContext } };
            default:
                // This is here just to prevent typescript from complaining
                // about the function not returning a value
                throw new Error(`Unknown state: ${state}`);
        }
    }
}

export const init = SuperTokensNextjsSSRAPIWrapper.init;
export const getServerComponentSession = SuperTokensNextjsSSRAPIWrapper.getServerComponentSession;
export const getServerActionSession = SuperTokensNextjsSSRAPIWrapper.getServerActionSession;
export const getServerSidePropsSession = SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession;
export const confirmAuthenticationAndCallServerAction =
    SuperTokensNextjsSSRAPIWrapper.confirmAuthenticationAndCallServerAction;

function getAuthPagePath(redirectPath: string): string {
    const authPagePath = SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow().appInfo.websiteBasePath || "/auth";
    return `${authPagePath}?${FORCE_LOGOUT_PATH_PARAM_NAME}=true&${REDIRECT_PATH_PARAM_NAME}=${redirectPath}`;
}

function getRefreshAPIPath(): string {
    const apiPath = SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow().appInfo.apiBasePath || DEFAULT_API_PATH;
    return `${apiPath}/session/refresh`;
}

function getRefreshLocation(redirectPath: string): string {
    const refreshAPIPath = getRefreshAPIPath();
    return `${refreshAPIPath}?${REDIRECT_PATH_PARAM_NAME}=${redirectPath}`;
}

async function getSSRSessionState(
    cookies: CookiesObject | CookiesStore
): Promise<{ state: SSRSessionState; session?: LoadedSessionContext }> {
    const frontToken =
        getCookieValue(cookies, FRONT_TOKEN_COOKIE_NAME) || getCookieValue(cookies, FRONT_TOKEN_HEADER_NAME);
    if (!frontToken) {
        return { state: "front-token-not-found" };
    }

    const parsedFrontToken = parseFrontToken(frontToken);
    if (!parsedFrontToken.isValid) {
        return { state: "front-token-invalid" };
    }

    logDebugMessage(`Front token expires at: ${new Date(parsedFrontToken.ate)}`);
    if (parsedFrontToken.ate < Date.now()) {
        return { state: "front-token-expired" };
    }

    const accessToken =
        getCookieValue(cookies, ACCESS_TOKEN_COOKIE_NAME) || getCookieValue(cookies, ACCESS_TOKEN_HEADER_NAME);
    if (!accessToken) {
        return { state: "access-token-not-found" };
    }

    const parsedAccessToken = await parseAccessToken(accessToken);
    if (!parsedAccessToken.isValid) {
        return { state: "access-token-invalid" };
    }
    if (!compareTokenPayloads(parsedFrontToken.payload, parsedAccessToken.payload)) {
        return { state: "tokens-do-not-match" };
    }

    return {
        state: "tokens-match",
        session: buildLoadedSessionContext(parsedAccessToken.payload),
    };
}

function buildLoadedSessionContext(accessTokenPayload: FrontTokenPayload["up"]): LoadedSessionContext {
    return {
        userId: accessTokenPayload.sub,
        accessTokenPayload,
        doesSessionExist: true,
        loading: false,
        invalidClaims: [],
    };
}

function parseFrontToken(
    frontToken: string
): { payload: FrontTokenPayload["up"]; ate: number; isValid: true } | { isValid: false } {
    try {
        const parsedToken = JSON.parse(decodeURIComponent(escape(atob(frontToken)))) as FrontTokenPayload;
        if (!parsedToken.uid || !parsedToken.ate || !parsedToken.up) {
            return { isValid: false };
        }
        return { payload: parsedToken.up, ate: parsedToken.ate, isValid: true };
    } catch (err) {
        logDebugMessage(`Error while parsing front token: ${err}`);
        return { isValid: false };
    }
}

async function parseAccessToken(
    token: string
): Promise<{ isValid: true; payload: FrontTokenPayload["up"] } | { isValid: false }> {
    try {
        const payload = await jwtVerify<FrontTokenPayload["up"]>(token, SuperTokensNextjsSSRAPIWrapper.getJWKSUrl());
        if (!payload.sub || !payload.exp) {
            return { isValid: false };
        }
        return { isValid: true, payload };
    } catch (err) {
        logDebugMessage(`Error while parsing access token: ${err}`);
        return { isValid: false };
    }
}

function compareTokenPayloads(payload1: FrontTokenPayload["up"], payload2: FrontTokenPayload["up"]): boolean {
    return JSON.stringify(payload1) === JSON.stringify(payload2);
}

function getCookieValue(cookie: CookiesStore | CookiesObject, name: string): string | undefined {
    if (isCookiesStore(cookie)) {
        return cookie.get(name)?.value;
    }
    return cookie[name];
}

const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
type RedirectType = "push" | "replace";
type RedirectStatusCode = 303 | 307 | 308;
type RedirectError = Error & {
    digest: `${typeof REDIRECT_ERROR_CODE};${RedirectType};${string};${RedirectStatusCode};`;
};
function redirect(path: string): never {
    const type: RedirectType = "push";
    const statusCode: RedirectStatusCode = 307;
    const error = new Error(REDIRECT_ERROR_CODE) as RedirectError;
    error.digest = `${REDIRECT_ERROR_CODE};${type};${path};${statusCode};`;
    throw error;
}
