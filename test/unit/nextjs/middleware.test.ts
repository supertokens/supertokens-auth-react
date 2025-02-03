import { refreshSession, revokeSession } from "../../../lib/ts/nextjs/middleware";
import type { SuperTokensNextjsConfig } from "../../../lib/ts/nextjs/types";
import {
    ACCESS_TOKEN_COOKIE_NAME,
    ACCESS_TOKEN_HEADER_NAME,
    FRONT_TOKEN_COOKIE_NAME,
    FRONT_TOKEN_HEADER_NAME,
    REFRESH_TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_HEADER_NAME,
    ANTI_CSRF_TOKEN_COOKIE_NAME,
    ANTI_CSRF_TOKEN_HEADER_NAME,
    REDIRECT_ATTEMPT_COUNT_COOKIE_NAME,
    FORCE_LOGOUT_PATH_PARAM_NAME,
    REDIRECT_PATH_PARAM_NAME,
} from "../../../lib/ts/nextjs/constants";

class MockHeaders implements Headers {
    private headers: Map<string, string>;

    constructor(init?: HeadersInit) {
        this.headers = new Map();
        if (init) {
            if (init instanceof Array) {
                init.forEach(([key, value]) => this.set(key, value));
            } else if (init instanceof Headers) {
                init.forEach((value, key) => this.set(key, value));
            } else {
                Object.entries(init).forEach(([key, value]) => this.set(key, value));
            }
        }
    }

    append(name: string, value: string): void {
        const existing = this.get(name);
        this.set(name, existing ? `${existing}, ${value}` : value);
    }

    delete(name: string): void {
        this.headers.delete(name.toLowerCase());
    }

    get(name: string): string | null {
        return this.headers.get(name.toLowerCase()) || null;
    }

    has(name: string): boolean {
        return this.headers.has(name.toLowerCase());
    }

    set(name: string, value: string): void {
        this.headers.set(name.toLowerCase(), value);
    }

    forEach(callbackfn: (value: string, key: string, parent: Headers) => void): void {
        this.headers.forEach((value, key) => callbackfn(value, key, this));
    }

    entries(): IterableIterator<[string, string]> {
        return this.headers.entries();
    }

    keys(): IterableIterator<string> {
        return this.headers.keys();
    }

    values(): IterableIterator<string> {
        return this.headers.values();
    }

    [Symbol.iterator](): IterableIterator<[string, string]> {
        return this.entries();
    }

    // Additional helper method for tests
    getAll(name: string): string[] {
        const value = this.get(name);
        return value ? value.split(", ") : [];
    }

    getSetCookie(): string[] {
        return this.getAll("set-cookie");
    }
}

class MockResponse implements Response {
    public readonly headers: Headers;
    public readonly ok: boolean;
    public readonly redirected: boolean;
    public readonly status: number;
    public readonly statusText: string;
    public readonly type: ResponseType;
    public readonly url: string;
    public readonly body: ReadableStream | null = null;
    public readonly bodyUsed: boolean = false;

    constructor(body: any = null, init: ResponseInit = {}) {
        this.headers = new MockHeaders(init.headers);
        this.status = init.status || 200;
        this.statusText = init.statusText || "";
        this.ok = this.status >= 200 && this.status < 300;
        this.redirected = false;
        this.type = "default";
        this.url = "";
    }

    clone(): Response {
        return new MockResponse(null, {
            headers: this.headers,
            status: this.status,
            statusText: this.statusText,
        });
    }

    arrayBuffer(): Promise<ArrayBuffer> {
        throw new Error("Method not implemented.");
    }

    blob(): Promise<Blob> {
        throw new Error("Method not implemented.");
    }

    formData(): Promise<FormData> {
        throw new Error("Method not implemented.");
    }

    json(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    text(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    bytes(): Promise<Uint8Array> {
        return Promise.resolve(new Uint8Array());
    }
}

class MockRequest implements Request {
    public readonly cache: RequestCache = "default";
    public readonly credentials: RequestCredentials = "same-origin";
    public readonly destination: RequestDestination = "";
    public readonly headers: Headers;
    public readonly integrity: string = "";
    public readonly keepalive: boolean = false;
    public readonly method: string;
    public readonly mode: RequestMode = "cors";
    public readonly redirect: RequestRedirect = "follow";
    public readonly referrer: string = "about:client";
    public readonly referrerPolicy: ReferrerPolicy = "";
    public readonly signal: AbortSignal = null as any;
    public readonly url: string;
    public readonly body: ReadableStream | null = null;
    public readonly bodyUsed: boolean = false;

    constructor(url: string, init: RequestInit = {}) {
        this.url = url;
        this.method = init.method || "GET";
        this.headers = new MockHeaders(init.headers);
    }

    clone(): Request {
        return new MockRequest(this.url, {
            method: this.method,
            headers: this.headers,
        });
    }

    arrayBuffer(): Promise<ArrayBuffer> {
        throw new Error("Method not implemented.");
    }

    blob(): Promise<Blob> {
        throw new Error("Method not implemented.");
    }

    formData(): Promise<FormData> {
        throw new Error("Method not implemented.");
    }

    json(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    text(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    bytes(): Promise<Uint8Array> {
        return Promise.resolve(new Uint8Array());
    }
}

const buildRedirectUrl = (basePath: string, params: string[]) => {
    return `${basePath}?${params.join("&")}`;
};

const globalAny = global as any;
globalAny.Request = MockRequest;
globalAny.Response = MockResponse;
globalAny.Headers = MockHeaders;

const headersToInit = (headers: MockHeaders): HeadersInit => {
    const init: Record<string, string> = {};
    headers.forEach((value, key) => {
        init[key] = value;
    });
    return init;
};

describe("nextjs/middleware", () => {
    const AUTH_PATH = "/auth";
    const API_PATH = "/api/protected";
    const DASHBOARD_PATH = "/dashboard";
    const BASE_URL = "http://localhost:3000";
    const AUTH_URL = `${BASE_URL}${AUTH_PATH}`;
    const API_URL = `${BASE_URL}${API_PATH}`;
    const DASHBOARD_URL = `${BASE_URL}${DASHBOARD_PATH}`;
    const REFRESH_TOKEN_PATH = "/api/auth/session/refresh";
    const FORCE_LOGOUT_PARAM = `${FORCE_LOGOUT_PATH_PARAM_NAME}=true`;

    const COOKIE_ATTRIBUTES = {
        DEFAULT: "; Path=/; HttpOnly",
        LAX: "; Path=/; HttpOnly; SameSite=Lax",
        REFRESH: `; Path=${REFRESH_TOKEN_PATH}; HttpOnly`,
        REFRESH_LAX: `; Path=${REFRESH_TOKEN_PATH}; HttpOnly; SameSite=Lax`,
    };

    const mockConfig: SuperTokensNextjsConfig = {
        appInfo: {
            apiBasePath: "/api/auth",
            apiDomain: BASE_URL,
            websiteBasePath: AUTH_PATH,
            appName: "SuperTokens Demo",
            websiteDomain: BASE_URL,
        },
        enableDebugLogs: false,
    };

    const getAllSetCookieHeaders = (headers: MockHeaders): string[] => {
        return headers.getAll("set-cookie");
    };

    const mockRequest = (
        url: string,
        options: { cookies?: Record<string, string>; headers?: Record<string, string> } = {}
    ) => {
        const headers = new MockHeaders(options.headers);
        if (options.cookies) {
            const cookieString = Object.entries(options.cookies)
                .map(([key, value]) => `${key}=${value}`)
                .join("; ");
            headers.set("cookie", cookieString);
        }
        return new MockRequest(url, { headers: headersToInit(headers) });
    };

    describe("refreshSession", () => {
        beforeEach(() => {
            global.fetch = jest.fn();
        });

        describe("cookie based auth", () => {
            it("redirects to the auth page if the flow ends up in a redirect loop", async () => {
                const request = mockRequest(API_URL, {
                    cookies: {
                        [REDIRECT_ATTEMPT_COUNT_COOKIE_NAME]: "6",
                        [REFRESH_TOKEN_COOKIE_NAME]: "valid-refresh-token",
                    },
                });

                const response = await refreshSession(mockConfig, request);
                expect(response.status).toBe(307);
                expect(response.headers.get("Location")).toBe(`${AUTH_URL}?${FORCE_LOGOUT_PARAM}`);
            });

            it("redirects to the auth page if the refresh token is not found", async () => {
                const request = mockRequest(API_URL);
                const response = await refreshSession(mockConfig, request);

                expect(response.status).toBe(307);
                expect(response.headers.get("Location")).toBe(`${AUTH_URL}?${FORCE_LOGOUT_PARAM}`);
            });

            it("redirects to the auth page if the refresh request fails", async () => {
                const request = mockRequest(API_URL, {
                    cookies: {
                        [REFRESH_TOKEN_COOKIE_NAME]: "valid-refresh-token",
                    },
                });

                (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

                const response = await refreshSession(mockConfig, request);
                expect(response.status).toBe(307);
                expect(response.headers.get("Location")).toBe(`${AUTH_URL}?${FORCE_LOGOUT_PARAM}`);
            });

            it("redirects back after a successful refresh", async () => {
                const request = mockRequest(`${API_URL}?${REDIRECT_PATH_PARAM_NAME}=${DASHBOARD_PATH}`, {
                    cookies: {
                        [REFRESH_TOKEN_COOKIE_NAME]: "valid-refresh-token",
                    },
                });

                const mockResponse = new MockResponse(null, {
                    headers: {
                        [FRONT_TOKEN_HEADER_NAME]: "new-front-token",
                        "set-cookie": [
                            `${ACCESS_TOKEN_COOKIE_NAME}=new-access-token${COOKIE_ATTRIBUTES.DEFAULT}`,
                            `${REFRESH_TOKEN_COOKIE_NAME}=new-refresh-token${COOKIE_ATTRIBUTES.REFRESH}`,
                            `${FRONT_TOKEN_COOKIE_NAME}=new-front-token; Path=/`,
                            `${ANTI_CSRF_TOKEN_COOKIE_NAME}=new-anti-csrf-token${COOKIE_ATTRIBUTES.DEFAULT}`,
                        ].join(", "),
                    },
                });

                (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

                const response = await refreshSession(mockConfig, request);
                expect(response.status).toBe(307);
                expect(response.headers.get("Location")).toBe(DASHBOARD_URL);

                const cookies = getAllSetCookieHeaders(response.headers as MockHeaders);
                expect(cookies).toContain(`${ACCESS_TOKEN_COOKIE_NAME}=new-access-token${COOKIE_ATTRIBUTES.DEFAULT}`);
                expect(cookies).toContain(`${REFRESH_TOKEN_COOKIE_NAME}=new-refresh-token${COOKIE_ATTRIBUTES.REFRESH}`);
                expect(cookies).toContain(`${FRONT_TOKEN_COOKIE_NAME}=new-front-token; Path=/`);
                expect(cookies).toContain(
                    `${ANTI_CSRF_TOKEN_COOKIE_NAME}=new-anti-csrf-token${COOKIE_ATTRIBUTES.DEFAULT}`
                );
                expect(cookies.some((c) => c.includes(REDIRECT_ATTEMPT_COUNT_COOKIE_NAME))).toBeTruthy();
            });
        });

        describe("header based auth", () => {
            it("redirects to the auth page if the refresh token is not found in headers", async () => {
                const request = mockRequest(API_URL, {
                    headers: {},
                });

                const response = await refreshSession(mockConfig, request);
                expect(response.status).toBe(307);
                expect(response.headers.get("Location")).toBe(`${AUTH_URL}?${FORCE_LOGOUT_PARAM}`);
            });

            it("redirects back after a successful refresh with header tokens", async () => {
                const request = mockRequest(API_URL, {
                    headers: {
                        [REFRESH_TOKEN_HEADER_NAME]: "valid-refresh-token",
                    },
                });

                const mockResponse = new Response(null, {
                    headers: new Headers({
                        [ACCESS_TOKEN_HEADER_NAME]: "new-access-token",
                        [REFRESH_TOKEN_HEADER_NAME]: "new-refresh-token",
                        [FRONT_TOKEN_HEADER_NAME]: "new-front-token",
                        [ANTI_CSRF_TOKEN_HEADER_NAME]: "new-anti-csrf-token",
                    }),
                });

                (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

                const response = await refreshSession(mockConfig, request);
                expect(response.status).toBe(307);

                const cookies = getAllSetCookieHeaders(response.headers as MockHeaders);
                expect(cookies).toContain(`${ACCESS_TOKEN_COOKIE_NAME}=new-access-token${COOKIE_ATTRIBUTES.LAX}`);
                expect(cookies).toContain(
                    `${REFRESH_TOKEN_COOKIE_NAME}=new-refresh-token${COOKIE_ATTRIBUTES.REFRESH_LAX}`
                );
                expect(cookies).toContain(`${FRONT_TOKEN_COOKIE_NAME}=new-front-token; Path=/`);
                expect(cookies).toContain(`${ANTI_CSRF_TOKEN_COOKIE_NAME}=new-anti-csrf-token${COOKIE_ATTRIBUTES.LAX}`);
            });
        });
    });

    describe("revokeSession", () => {
        beforeEach(() => {
            global.fetch = jest.fn();
        });

        it("removes the authentication headers even if the access token is not found", async () => {
            const request = mockRequest(API_URL, {
                cookies: {
                    [REFRESH_TOKEN_COOKIE_NAME]: "old-refresh-token",
                    [FRONT_TOKEN_COOKIE_NAME]: "old-front-token",
                    [ANTI_CSRF_TOKEN_COOKIE_NAME]: "old-anti-csrf-token",
                },
                headers: {
                    [REFRESH_TOKEN_HEADER_NAME]: "old-refresh-token",
                    [FRONT_TOKEN_HEADER_NAME]: "old-front-token",
                    [ANTI_CSRF_TOKEN_HEADER_NAME]: "old-anti-csrf-token",
                },
            });
            const response = await revokeSession(mockConfig, request);

            expect(response?.headers.get("x-middleware-next")).toBe("1");
            expect(response?.headers.has("set-cookie")).toBe(false);
            expect(response?.headers.has(ACCESS_TOKEN_HEADER_NAME)).toBe(false);
            expect(response?.headers.has(REFRESH_TOKEN_HEADER_NAME)).toBe(false);
            expect(response?.headers.has(FRONT_TOKEN_HEADER_NAME)).toBe(false);
            expect(response?.headers.has(ANTI_CSRF_TOKEN_HEADER_NAME)).toBe(false);
        });

        it("removes the authentication headers even if the signout request fails", async () => {
            const request = mockRequest(API_URL, {
                cookies: {
                    [ACCESS_TOKEN_COOKIE_NAME]: "valid-access-token",
                    [REFRESH_TOKEN_COOKIE_NAME]: "old-refresh-token",
                    [FRONT_TOKEN_COOKIE_NAME]: "old-front-token",
                    [ANTI_CSRF_TOKEN_COOKIE_NAME]: "old-anti-csrf-token",
                },
                headers: {
                    [ACCESS_TOKEN_HEADER_NAME]: "valid-access-token",
                    [REFRESH_TOKEN_HEADER_NAME]: "old-refresh-token",
                    [FRONT_TOKEN_HEADER_NAME]: "old-front-token",
                    [ANTI_CSRF_TOKEN_HEADER_NAME]: "old-anti-csrf-token",
                },
            });

            (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

            const response = await revokeSession(mockConfig, request);

            expect(response?.headers.get("x-middleware-next")).toBe("1");
            expect(response?.headers.has("set-cookie")).toBe(false);
            expect(response?.headers.has(ACCESS_TOKEN_HEADER_NAME)).toBe(false);
            expect(response?.headers.has(REFRESH_TOKEN_HEADER_NAME)).toBe(false);
            expect(response?.headers.has(FRONT_TOKEN_HEADER_NAME)).toBe(false);
            expect(response?.headers.has(ANTI_CSRF_TOKEN_HEADER_NAME)).toBe(false);
        });

        it("performs the signout request and then removes the authentication headers", async () => {
            const request = mockRequest(API_URL, {
                cookies: {
                    [ACCESS_TOKEN_COOKIE_NAME]: "valid-access-token",
                    [REFRESH_TOKEN_COOKIE_NAME]: "old-refresh-token",
                    [FRONT_TOKEN_COOKIE_NAME]: "old-front-token",
                    [ANTI_CSRF_TOKEN_COOKIE_NAME]: "old-anti-csrf-token",
                },
                headers: {
                    [ACCESS_TOKEN_HEADER_NAME]: "valid-access-token",
                    [REFRESH_TOKEN_HEADER_NAME]: "old-refresh-token",
                    [FRONT_TOKEN_HEADER_NAME]: "old-front-token",
                    [ANTI_CSRF_TOKEN_HEADER_NAME]: "old-anti-csrf-token",
                },
            });

            (global.fetch as jest.Mock).mockResolvedValueOnce(new Response(null, { status: 200 }));

            const response = await revokeSession(mockConfig, request);
            expect(response?.headers.get("x-middleware-next")).toBe("1");
            expect(response?.headers.has("set-cookie")).toBe(false);
            expect(response?.headers.has(ACCESS_TOKEN_HEADER_NAME)).toBe(false);
            expect(response?.headers.has(REFRESH_TOKEN_HEADER_NAME)).toBe(false);
            expect(response?.headers.has(FRONT_TOKEN_HEADER_NAME)).toBe(false);
            expect(response?.headers.has(ANTI_CSRF_TOKEN_HEADER_NAME)).toBe(false);
        });
    });
});
