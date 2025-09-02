import { enableLogging, logDebugMessage } from "../logger";

import {
    REDIRECT_ATTEMPT_MAX_COUNT,
    REFRESH_TOKEN_COOKIE_NAME,
    REFRESH_TOKEN_HEADER_NAME,
    REDIRECT_PATH_PARAM_NAME,
    REDIRECT_ATTEMPT_COUNT_COOKIE_NAME,
    ACCESS_TOKEN_COOKIE_NAME,
    ACCESS_TOKEN_HEADER_NAME,
    FRONT_TOKEN_HEADER_NAME,
    ANTI_CSRF_TOKEN_HEADER_NAME,
    FORCE_LOGOUT_PATH_PARAM_NAME,
    FRONT_TOKEN_COOKIE_NAME,
    ANTI_CSRF_TOKEN_COOKIE_NAME,
    CURRENT_PATH_COOKIE_NAME,
    SSR_REFRESH_SESSION_INDICATOR_COOKIE_NAME,
    SSR_REVOKE_SESSION_INDICATOR_COOKIE_NAME,
} from "./constants";

import type { ApiRequestMiddleware, SuperTokensNextjsConfig } from "./types";
import type { NormalisedAppInfo } from "../types";
import { normaliseInputAppInfoOrThrowError } from "../utils";

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
                `${CURRENT_PATH_COOKIE_NAME}=${requestUrl.pathname}; Path=/; HttpOnly; SameSite=Strict`
            );
        }
        return response;
    };
}

export async function refreshSession(request: Request): Promise<Response> {
    // Cancel the refresh cycle if an unforseen state is encountered
    const redirectAttemptNumber = getRedirectAttemptNumber(request);
    if (redirectAttemptNumber > REDIRECT_ATTEMPT_MAX_COUNT) {
        return redirectToAuthPage(request);
    }

    // The redirect originates from SSR and authorization headers are passed in a cookie
    if (!getCookie(request, REFRESH_TOKEN_COOKIE_NAME) && !getCookie(request, REFRESH_TOKEN_HEADER_NAME)) {
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
            `${REDIRECT_ATTEMPT_COUNT_COOKIE_NAME}=${
                redirectAttemptNumber + 1
            }; Path=/; Max-Age=10; HttpOnly; SameSite=Strict`
        );

        finalResponse.headers.append(
            "set-cookie",
            `${SSR_REFRESH_SESSION_INDICATOR_COOKIE_NAME}=true; Path=/; HttpOnly; SameSite=Strict; Max-Age=5`
        );
        logDebugMessage("Attached new tokens to response");
        return finalResponse;
    } catch (err) {
        logDebugMessage("Error refreshing session");
        logDebugMessage(err as unknown as string);
        return redirectToAuthPage(request);
    }
}

export async function revokeSession(request: Request): Promise<Response | void> {
    const response = new Response(null, {});

    try {
        const accessToken =
            getCookie(request, ACCESS_TOKEN_COOKIE_NAME) || getCookie(request, ACCESS_TOKEN_HEADER_NAME);
        if (!accessToken) {
            throw new Error("No access token found in the request");
        }
        const signOutURL = new URL(
            `${AppInfo.apiBasePath.getAsStringDangerous()}/signout`,
            AppInfo.apiDomain.getAsStringDangerous()
        );
        const refreshRequestHeaders = new Headers();
        refreshRequestHeaders.append("Content-Type", "application/json");
        refreshRequestHeaders.append("Cookie", `${REFRESH_TOKEN_COOKIE_NAME}=${accessToken}`);
        refreshRequestHeaders.append("Authorization", `Bearer ${accessToken}`);

        await fetch(signOutURL, {
            method: "POST",
            headers: refreshRequestHeaders,
            credentials: "include",
        });
    } catch (err) {
        logDebugMessage("Error during the sign out attempt");
        logDebugMessage(err as unknown as string);
    }

    response.headers.set("x-middleware-next", "1");
    response.headers.append(
        "set-cookie",
        `${ACCESS_TOKEN_COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
    );
    response.headers.append(
        "set-cookie",
        `${ACCESS_TOKEN_HEADER_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
    );
    response.headers.append(
        "set-cookie",
        `${FRONT_TOKEN_COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
    );
    response.headers.append(
        "set-cookie",
        `${ANTI_CSRF_TOKEN_COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
    );
    response.headers.append(
        "set-cookie",
        `${ANTI_CSRF_TOKEN_HEADER_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
    );
    const refreshPath = getRefreshAPIPath();
    response.headers.append(
        "set-cookie",
        `${REFRESH_TOKEN_COOKIE_NAME}=; Path=${refreshPath}; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
    );
    response.headers.append(
        "set-cookie",
        `${REFRESH_TOKEN_HEADER_NAME}=; Path=${refreshPath}; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
    );
    response.headers.append(
        "set-cookie",
        `${SSR_REVOKE_SESSION_INDICATOR_COOKIE_NAME}=true; Path=/; HttpOnly; SameSite=Strict; Max-Age=5`
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
    const cookieRefreshToken = getCookie(request, REFRESH_TOKEN_COOKIE_NAME);
    const headerRefreshToken = getCookie(request, REFRESH_TOKEN_HEADER_NAME);
    const refreshRequestHeaders = new Headers();
    refreshRequestHeaders.append("Content-Type", "application/json");
    if (cookieRefreshToken) {
        refreshRequestHeaders.append("Cookie", `${REFRESH_TOKEN_COOKIE_NAME}=${cookieRefreshToken}`);
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
    const cookies: string[] = [];
    const tokens = {
        accessToken: refreshResponse.headers.get(ACCESS_TOKEN_HEADER_NAME) || "",
        refreshToken: refreshResponse.headers.get(REFRESH_TOKEN_HEADER_NAME) || "",
        frontToken: refreshResponse.headers.get(FRONT_TOKEN_HEADER_NAME) || "",
        antiCsrfToken: refreshResponse.headers.get(ANTI_CSRF_TOKEN_HEADER_NAME) || "",
    };

    cookies.push(`${FRONT_TOKEN_COOKIE_NAME}=${tokens.frontToken}; Path=/`);
    // TOOD: Review the current build target
    // getSetCookie was added in node 18 and our build target is ES5
    // This should not a problem here since the function runs in the Vercel edge runtime environment
    // @ts-expect-error TS(2339): Property 'getSetCookie' does not exist on type 'Headers'.
    const setCookieHeaders = refreshResponse.headers.getSetCookie();
    for (const header of setCookieHeaders) {
        if (header.includes(ACCESS_TOKEN_COOKIE_NAME)) {
            cookies.push(header);
        }
        if (header.includes(REFRESH_TOKEN_COOKIE_NAME)) {
            cookies.push(header);
        }
        if (header.includes(ANTI_CSRF_TOKEN_COOKIE_NAME)) {
            cookies.push(header);
        }
    }

    if (!cookies.some((cookie) => cookie.includes(ACCESS_TOKEN_COOKIE_NAME))) {
        cookies.push(`${ACCESS_TOKEN_HEADER_NAME}=${tokens.accessToken}; Path=/; HttpOnly; SameSite=Lax`);
    }
    if (!cookies.some((cookie) => cookie.includes(REFRESH_TOKEN_COOKIE_NAME))) {
        cookies.push(
            `${REFRESH_TOKEN_HEADER_NAME}=${tokens.refreshToken}; Path=/api/auth/session/refresh; HttpOnly; SameSite=Lax`
        );
    }
    if (!cookies.some((cookie) => cookie.includes(ANTI_CSRF_TOKEN_COOKIE_NAME)) && tokens.antiCsrfToken) {
        cookies.push(`${ANTI_CSRF_TOKEN_HEADER_NAME}=${tokens.antiCsrfToken}; Path=/; HttpOnly; SameSite=Lax`);
    }

    const headers: [string, string][] = [];
    if (tokens.accessToken) {
        headers.push([ACCESS_TOKEN_HEADER_NAME, tokens.accessToken]);
    }
    if (tokens.refreshToken) {
        headers.push([REFRESH_TOKEN_HEADER_NAME, tokens.refreshToken]);
    }
    if (tokens.antiCsrfToken) {
        headers.push([ANTI_CSRF_TOKEN_HEADER_NAME, tokens.antiCsrfToken]);
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
    if (!path) return "/";
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
