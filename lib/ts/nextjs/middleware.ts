import { enableLogging, logDebugMessage } from "../logger";
import { normaliseInputAppInfoOrThrowError } from "../utils";

import {
    REDIRECT_ATTEMPT_MAX_COUNT,
    REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME,
    REFRESH_TOKEN_HEADER_SESSION_COOKIE_NAME,
    REFRESH_TOKEN_HEADER_NAME,
    REDIRECT_PATH_PARAM_NAME,
    REDIRECT_ATTEMPT_COUNT_COOKIE_NAME,
    ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME,
    ACCESS_TOKEN_HEADER_SESSION_COOKIE_NAME,
    ACCESS_TOKEN_HEADER_NAME,
    FRONT_TOKEN_HEADER_NAME,
    ANTI_CSRF_TOKEN_HEADER_NAME,
    FORCE_LOGOUT_PATH_PARAM_NAME,
    FRONT_TOKEN_COOKIE_SESSION_COOKIE_NAME,
    ANTI_CSRF_TOKEN_COOKIE_NAME,
    CURRENT_PATH_COOKIE_NAME,
    SSR_REFRESH_SESSION_INDICATOR_COOKIE_NAME,
    SSR_REVOKE_SESSION_INDICATOR_COOKIE_NAME,
} from "./constants";

import type { ApiRequestMiddleware, SuperTokensNextjsConfig } from "./types";
import type { NormalisedAppInfo } from "../types";

type SuperTokensNextjsMiddlewareConfig = SuperTokensNextjsConfig & {
    apiRequestMiddleware?: ApiRequestMiddleware;
    isApiRequest?: (request: Request) => boolean;
};

let AppInfo: NormalisedAppInfo;

export function superTokensMiddleware(
    config: SuperTokensNextjsMiddlewareConfig
): (request: Request) => Promise<Response | void> {
    const usesTheNextjsApiAsTheAuthenticationServer = compareUrlHost(
        config.appInfo.apiDomain,
        config.appInfo.websiteDomain
    );
    if (config.enableDebugLogs) {
        enableLogging();
    }

    const isApiRequest =
        config.isApiRequest ||
        ((request) => {
            const requestUrl = new URL(request.url);
            return requestUrl.pathname.startsWith("/api");
        });

    AppInfo = normaliseInputAppInfoOrThrowError(config.appInfo);

    return async (request: Request) => {
        const requestUrl = new URL(request.url);
        const refreshPath = getRefreshAPIPath();
        console.log("requestUrl.pathname", requestUrl.pathname);
        console.log("request method", request.method);
        if (requestUrl.pathname.startsWith(refreshPath) && request.method === "GET") {
            return refreshSession(request);
        }

        if (
            usesTheNextjsApiAsTheAuthenticationServer &&
            requestUrl.pathname.startsWith(AppInfo.apiBasePath.getAsStringDangerous())
        ) {
            // this hits our pages/api/auth/* endpoints
            return next();
        }

        if (
            requestUrl.pathname.startsWith(AppInfo.websiteBasePath.getAsStringDangerous()) &&
            requestUrl.searchParams.get(FORCE_LOGOUT_PATH_PARAM_NAME) === "true"
        ) {
            return revokeSession(request);
        }

        if (isApiRequest(request) && config.apiRequestMiddleware) {
            return config.apiRequestMiddleware(request);
        }

        // Save the current path so that we can use it during SSR
        // Used to redirect the user to the correct path after login/refresh
        // https://github.com/vercel/next.js/issues/43704#issuecomment-2090798307
        // TL;DR: You can not access pathname in SSR and requests that originate from redirect()
        const response = next();
        if (!isInternalPath(requestUrl.pathname)) {
            response.headers.append(
                "set-cookie",
                buildSetCookieHeader({
                    name: CURRENT_PATH_COOKIE_NAME,
                    value: requestUrl.pathname,
                    path: "/",
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 60,
                })
            );
        }
        return response;
    };
}

async function refreshSession(request: Request): Promise<Response> {
    // Cancel the refresh cycle if an unforseen state is encountered
    const redirectAttemptNumber = getRedirectAttemptNumber(request);
    if (redirectAttemptNumber > REDIRECT_ATTEMPT_MAX_COUNT) {
        return redirectToAuthPage(request);
    }

    // The redirect originates from SSR and authorization headers are passed in a cookie
    if (
        !getCookie(request, REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME) &&
        !getCookie(request, REFRESH_TOKEN_HEADER_SESSION_COOKIE_NAME)
    ) {
        logDebugMessage("Refresh token not found");
        return redirectToAuthPage(request);
    }

    const requestUrl = new URL(request.url);
    const urlParamRedirectPath = requestUrl.searchParams.get(REDIRECT_PATH_PARAM_NAME);
    const redirectTo = urlParamRedirectPath && isValidUrlPath(urlParamRedirectPath) ? urlParamRedirectPath : "/";
    try {
        const { cookies, headers } = await fetchNewTokens(request);
        const hasRequiredCookies = cookies.length >= 3 || headers.length >= 2;
        if (!hasRequiredCookies) {
            logDebugMessage("Missing tokens from refresh response");
            return redirectToAuthPage(request);
        }
        const redirectUrl = new URL(redirectTo, request.url);
        const finalResponse = redirect(redirectUrl.toString());
        for (const cookie of cookies) {
            finalResponse.headers.append("set-cookie", cookie);
        }

        for (const [headerName, headerValue] of headers) {
            finalResponse.headers.append(headerName, headerValue);
        }
        finalResponse.headers.append(
            "set-cookie",
            buildSetCookieHeader({
                name: REDIRECT_ATTEMPT_COUNT_COOKIE_NAME,
                value: String(redirectAttemptNumber + 1),
                path: "/",
                maxAge: 10,
                httpOnly: true,
                sameSite: "strict",
            })
        );

        finalResponse.headers.append(
            "set-cookie",
            buildSetCookieHeader({
                name: SSR_REFRESH_SESSION_INDICATOR_COOKIE_NAME,
                value: "true",
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                maxAge: 5,
            })
        );
        logDebugMessage("Attached new tokens to response");
        return finalResponse;
    } catch (err) {
        logDebugMessage("Error refreshing session");
        logDebugMessage(err as unknown as string);
        return redirectToAuthPage(request);
    }
}

async function revokeSession(request: Request): Promise<Response | void> {
    const response = new Response(null, {});

    try {
        const accessToken =
            getCookie(request, ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME) ||
            getCookie(request, ACCESS_TOKEN_HEADER_SESSION_COOKIE_NAME);
        if (!accessToken) {
            throw new Error("No access token found in the request");
        }
        const signOutURL = new URL(
            `${AppInfo.apiBasePath.getAsStringDangerous()}/signout`,
            AppInfo.apiDomain.getAsStringDangerous()
        );
        const signoutRequestHeaders = new Headers();
        signoutRequestHeaders.append("Content-Type", "application/json");
        signoutRequestHeaders.append("Cookie", `${ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME}=${accessToken}`);
        signoutRequestHeaders.append("Authorization", `Bearer ${accessToken}`);

        await fetch(signOutURL, {
            method: "POST",
            headers: signoutRequestHeaders,
            credentials: "include",
        });
    } catch (err) {
        logDebugMessage("Error during the sign out attempt");
        logDebugMessage(err as unknown as string);
    }

    response.headers.set("x-middleware-next", "1");
    response.headers.append(
        "set-cookie",
        buildSetCookieHeader({
            name: ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME,
            value: "",
            path: "/",
            expires: "Thu, 01 Jan 1970 00:00:00 GMT",
            httpOnly: true,
            sameSite: "lax",
        })
    );
    response.headers.append(
        "set-cookie",
        buildSetCookieHeader({
            name: ACCESS_TOKEN_HEADER_NAME,
            value: "",
            path: "/",
            expires: "Thu, 01 Jan 1970 00:00:00 GMT",
            httpOnly: true,
            sameSite: "lax",
        })
    );
    response.headers.append(
        "set-cookie",
        buildSetCookieHeader({
            name: FRONT_TOKEN_COOKIE_SESSION_COOKIE_NAME,
            value: "",
            path: "/",
            expires: "Thu, 01 Jan 1970 00:00:00 GMT",
            httpOnly: true,
            sameSite: "lax",
        })
    );
    response.headers.append(
        "set-cookie",
        buildSetCookieHeader({
            name: ANTI_CSRF_TOKEN_COOKIE_NAME,
            value: "",
            path: "/",
            expires: "Thu, 01 Jan 1970 00:00:00 GMT",
            httpOnly: true,
            sameSite: "lax",
        })
    );
    response.headers.append(
        "set-cookie",
        buildSetCookieHeader({
            name: ANTI_CSRF_TOKEN_HEADER_NAME,
            value: "",
            path: "/",
            expires: "Thu, 01 Jan 1970 00:00:00 GMT",
            httpOnly: true,
            sameSite: "lax",
        })
    );
    response.headers.append(
        "set-cookie",
        buildSetCookieHeader({
            name: REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME,
            value: "",
            path: "/",
            expires: "Thu, 01 Jan 1970 00:00:00 GMT",
            httpOnly: true,
            sameSite: "lax",
        })
    );
    response.headers.append(
        "set-cookie",
        buildSetCookieHeader({
            name: REFRESH_TOKEN_HEADER_SESSION_COOKIE_NAME,
            value: "",
            path: "/",
            expires: "Thu, 01 Jan 1970 00:00:00 GMT",
            httpOnly: true,
            sameSite: "lax",
        })
    );
    response.headers.append(
        "set-cookie",
        buildSetCookieHeader({
            name: SSR_REVOKE_SESSION_INDICATOR_COOKIE_NAME,
            value: "true",
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 5,
        })
    );

    return response;
}

function redirectToAuthPage(request: Request): Response {
    const redirectUrl = new URL(AppInfo.websiteBasePath.getAsStringDangerous(), request.url);
    redirectUrl.searchParams.set(FORCE_LOGOUT_PATH_PARAM_NAME, "true");
    return redirect(redirectUrl.toString());
}

function redirect(location: string): Response {
    logDebugMessage(`Redirecting to: ${location}`);
    return new Response(null, {
        status: 302,
        headers: {
            Location: location,
        },
    });
}

function next(): Response {
    const response = new Response(null, {});
    response.headers.set("x-middleware-next", "1");
    return response;
}

async function fetchNewTokens(request: Request): Promise<{
    headers: [string, string][];
    cookies: string[];
}> {
    const refreshApiURL = new URL(
        `${AppInfo.apiBasePath.getAsStringDangerous()}/session/refresh`,
        AppInfo.apiDomain.getAsStringDangerous()
    );
    const cookieRefreshToken = getCookie(request, REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME);
    const headerRefreshToken = getCookie(request, REFRESH_TOKEN_HEADER_SESSION_COOKIE_NAME);
    const refreshRequestHeaders = new Headers();
    refreshRequestHeaders.append("Content-Type", "application/json");
    if (cookieRefreshToken) {
        refreshRequestHeaders.append("Cookie", `${REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME}=${cookieRefreshToken}`);
    } else if (headerRefreshToken) {
        refreshRequestHeaders.append("Authorization", `Bearer ${headerRefreshToken}`);
    }

    const refreshResponse = await fetch(refreshApiURL, {
        method: "POST",
        headers: refreshRequestHeaders,
        credentials: "include",
    });

    if (!refreshResponse.ok) {
        throw new Error(`Refresh request returned an invalid status code: ${refreshResponse.status}`);
    }

    logDebugMessage("Session refresh request completed");
    // TOOD: Review the current build target
    // getSetCookie was added in node 18 and our build target is ES5
    // This should not a problem here since the function runs in the Vercel edge runtime environment
    // @ts-expect-error TS(2339): Property 'getSetCookie' does not exist on type 'Headers'.
    const setCookieHeaders = refreshResponse.headers.getSetCookie();
    const tokenTransferMethod: "cookie" | "header" = setCookieHeaders.find((header: string) =>
        header.includes(ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME)
    )
        ? "cookie"
        : "header";

    const cookies: string[] = [];
    const headers: [string, string][] = [];
    const frontToken = refreshResponse.headers.get(FRONT_TOKEN_HEADER_NAME) || "";
    if (!frontToken) {
        throw new Error("Front token not found in the response");
    }
    cookies.push(
        buildSetCookieHeader({
            name: FRONT_TOKEN_COOKIE_SESSION_COOKIE_NAME,
            value: frontToken,
            path: "/",
            httpOnly: false,
            sameSite: "lax",
        })
    );

    if (tokenTransferMethod === "cookie") {
        const accessTokenCookie = setCookieHeaders.find((header: string) =>
            header.includes(ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME)
        );
        if (!accessTokenCookie) {
            throw new Error("Access token cookie not found in the response");
        }
        cookies.push(accessTokenCookie);
        const refreshTokenCookie = setCookieHeaders.find((header: string) =>
            header.includes(REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME)
        );
        if (!refreshTokenCookie) {
            throw new Error("Refresh token cookie not found in the response");
        }
        cookies.push(refreshTokenCookie);
        const antiCsrfTokenCookie = setCookieHeaders.find((header: string) =>
            header.includes(ANTI_CSRF_TOKEN_COOKIE_NAME)
        );
        if (antiCsrfTokenCookie) {
            cookies.push(antiCsrfTokenCookie);
        }
    } else {
        const accessToken = refreshResponse.headers.get(ACCESS_TOKEN_HEADER_NAME);
        if (accessToken) {
            headers.push([ACCESS_TOKEN_HEADER_NAME, accessToken]);
            cookies.push(
                buildSetCookieHeader({
                    name: ACCESS_TOKEN_HEADER_SESSION_COOKIE_NAME,
                    value: accessToken,
                    path: "/",
                    httpOnly: true,
                    sameSite: "lax",
                })
            );
        } else {
            throw new Error("Access token header not found in the response");
        }
        const refreshToken = refreshResponse.headers.get(REFRESH_TOKEN_HEADER_NAME);
        if (refreshToken) {
            headers.push([REFRESH_TOKEN_HEADER_NAME, refreshToken]);
            cookies.push(
                buildSetCookieHeader({
                    name: REFRESH_TOKEN_HEADER_SESSION_COOKIE_NAME,
                    value: refreshToken,
                    path: "/",
                    httpOnly: true,
                    sameSite: "lax",
                })
            );
        } else {
            throw new Error("Refresh token header not found in the response");
        }
        const antiCsrfToken = refreshResponse.headers.get(ANTI_CSRF_TOKEN_HEADER_NAME);
        if (antiCsrfToken) {
            headers.push([ANTI_CSRF_TOKEN_HEADER_NAME, antiCsrfToken]);
            cookies.push(
                buildSetCookieHeader({
                    name: ANTI_CSRF_TOKEN_HEADER_NAME,
                    value: antiCsrfToken,
                    path: "/",
                    httpOnly: true,
                    sameSite: "lax",
                })
            );
        }
    }

    return { cookies, headers };
}

function getCookie(request: Request, name: string) {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
        return undefined;
    }

    const cookies = cookieHeader.split("; ");
    const matchingCookies = cookies.filter((row) => row.startsWith(`${name}=`)).map((row) => row.split("=")[1]);

    // Return the last matching cookie value (most recent)
    // This handles cases where duplicate cookies exist
    return matchingCookies.length > 0 ? matchingCookies[matchingCookies.length - 1] : undefined;
}

function getRedirectAttemptNumber(request: Request): number {
    const cookieValue = getCookie(request, REDIRECT_ATTEMPT_COUNT_COOKIE_NAME) || "1";

    try {
        return parseInt(cookieValue);
    } catch (err) {
        return 1;
    }
}

function isValidUrlPath(path: string): boolean {
    try {
        if (typeof path !== "string" || path.trim() === "") {
            return false;
        }

        if (!path.startsWith("/")) {
            return false;
        }

        const normalizedPath = normalizeUrlPath(path);
        const invalidChars = /[<>:"|?*\0]/;
        return (
            !invalidChars.test(normalizedPath) &&
            normalizedPath.startsWith("/") &&
            !normalizedPath.includes("//") &&
            normalizedPath.length <= 2048
        );
    } catch {
        return false;
    }
}

function normalizeUrlPath(path: string): string {
    if (!path) {
        return "/";
    }
    let normalizedPath = path.split("?")[0].split("#")[0];
    // remove trailing slash
    normalizedPath = path.replace(/\/$/, "");
    normalizedPath = !normalizedPath.startsWith("/") ? `/${path}` : path;

    return normalizedPath;
}

function compareUrlHost(firstUrl: string, secondUrl: string): boolean {
    try {
        const firstUrlObject = new URL(firstUrl);
        const secondUrlObject = new URL(secondUrl);
        return firstUrlObject.host === secondUrlObject.host;
    } catch (err) {
        logDebugMessage("Error comparing URL host");
        logDebugMessage(err as string);
        return false;
    }
}

function getRefreshAPIPath(): string {
    const apiPath = AppInfo.apiBasePath.getAsStringDangerous();
    return `${apiPath}/session/refresh`;
}

function isInternalPath(pathname: string): boolean {
    const internalPaths = [
        // Chrome DevTools and well-known paths
        "/.well-known/",

        // Browser favicon requests
        "/favicon.ico",
        "/apple-touch-icon",
        "/browserconfig.xml",
        "/manifest.json",

        // Service worker and PWA files
        "/sw.js",
        "/service-worker.js",
        "/workbox-",

        // Browser security and policy files
        "/robots.txt",
        "/sitemap.xml",
        "/ads.txt",
        "/.htaccess",

        // Browser prefetch and preload requests
        "/prefetch",
        "/preload",

        // Debug and development tools
        "/_next/webpack-hmr",
        "/_next/static/chunks/webpack",
        "/__webpack_hmr",

        // API routes (typically shouldn't be saved as redirect paths)
        "/api/",

        // Assets and static files
        "/static/",
        "/_next/static/",
        "/images/",
        "/css/",
        "/js/",
    ];

    const isInternalPath = internalPaths.some((path) => pathname.startsWith(path));

    const fileExtensions = [".ico", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".css", ".js", ".map", ".xml", ".txt"];
    const isAssetFile = fileExtensions.some((ext) => pathname.toLowerCase().endsWith(ext));

    return isInternalPath || isAssetFile;
}

function buildSetCookieHeader(cookie: {
    name: string;
    value: string;
    maxAge?: number;
    domain?: string;
    path?: string;
    sameSite?: "strict" | "lax" | "none";
    httpOnly?: boolean;
    secure?: boolean;
    expires?: string;
}): string {
    const { name, value, maxAge, domain, path = "/", sameSite = "lax", httpOnly = true, secure, expires } = cookie;

    let cookieString = `${name}=${value}; Path=${path}; SameSite=${sameSite}`;
    if (maxAge) {
        cookieString += `; Max-Age=${maxAge}`;
    }
    if (domain) {
        cookieString += `; Domain=${domain}`;
    }
    if (httpOnly) {
        cookieString += "; HttpOnly";
    }
    if (secure) {
        cookieString += "; Secure";
    }
    if (expires) {
        cookieString += `; Expires=${expires}`;
    }

    return cookieString;
}
