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
    SESSION_REFRESH_API_PATH,
} from "./constants";

import type { ApiRequestMiddleware, SuperTokensNextjsConfig } from "./types";

let AppInfo: SuperTokensNextjsConfig["appInfo"];
const DEFAULT_API_BASE_PATH = "/api/auth";

export function superTokensMiddleware(
    config: SuperTokensNextjsConfig,
    apiRequestMiddleware?: ApiRequestMiddleware
): (request: Request) => Promise<Response | void> {
    const usesTheNextjsApiAsTheAuthenticationServer = compareUrlHost(
        config.appInfo.apiDomain,
        config.appInfo.websiteDomain
    );

    return async (request: Request) => {
        const requestUrl = new URL(request.url);
        if (requestUrl.pathname.startsWith(SESSION_REFRESH_API_PATH) && request.method === "GET") {
            return refreshSession(config, request);
        }

        if (requestUrl.pathname.startsWith("/api") && usesTheNextjsApiAsTheAuthenticationServer) {
            if (requestUrl.pathname.startsWith(config.appInfo.apiBasePath || DEFAULT_API_BASE_PATH)) {
                // this hits our pages/api/auth/* endpoints
                return next();
            }

            if (apiRequestMiddleware) {
                return apiRequestMiddleware(request);
            }
        }

        if (
            requestUrl.pathname.startsWith("/auth") &&
            requestUrl.searchParams.get(FORCE_LOGOUT_PATH_PARAM_NAME) === "true"
        ) {
            return revokeSession(config, request);
        }

        // Save the current path so that we can use it during SSR
        // Used to redirect the user to the correct path after login/refresh
        // https://github.com/vercel/next.js/issues/43704#issuecomment-2090798307
        // TL;DR: You can not access pathname in SSR and requests that originate from redirect()
        const response = next();
        response.headers.append(
            "set-cookie",
            `${CURRENT_PATH_COOKIE_NAME}=${requestUrl.pathname}; Path=/; HttpOnly; SameSite=Strict`
        );
        return response;
    };
}

export async function refreshSession(config: SuperTokensNextjsConfig, request: Request): Promise<Response> {
    AppInfo = config.appInfo;
    if (config.enableDebugLogs) {
        enableLogging();
    }

    // Cancel the refresh cycle if an unforseen state is encountered
    const redirectAttemptNumber = getRedirectAttemptNumber(request);
    if (redirectAttemptNumber > REDIRECT_ATTEMPT_MAX_COUNT) {
        return redirectToAuthPage(request);
    }

    if (!getCookie(request, REFRESH_TOKEN_COOKIE_NAME) && !request.headers.get(REFRESH_TOKEN_HEADER_NAME)) {
        logDebugMessage("Refresh token not found");
        return redirectToAuthPage(request);
    }

    const requestUrl = new URL(request.url);
    const urlParamRedirectPath = requestUrl.searchParams.get(REDIRECT_PATH_PARAM_NAME);
    const redirectTo = urlParamRedirectPath && isValidUrlPath(urlParamRedirectPath) ? urlParamRedirectPath : "/";
    try {
        const tokens = await fetchNewTokens(request);
        const hasRequiredCookies = tokens.accessToken && tokens.refreshToken && tokens.frontToken;
        if (!hasRequiredCookies) {
            logDebugMessage("Missing tokens from refresh response");
            return redirectToAuthPage(request);
        }
        const redirectUrl = new URL(redirectTo, request.url);
        const finalResponse = redirect(redirectUrl.toString());
        finalResponse.headers.append("set-cookie", tokens.accessToken);
        finalResponse.headers.append("set-cookie", tokens.refreshToken);
        finalResponse.headers.append("set-cookie", tokens.frontToken);
        if (tokens.antiCsrfToken) {
            finalResponse.headers.append("set-cookie", tokens.antiCsrfToken);
        }
        finalResponse.headers.append(
            "set-cookie",
            `${REDIRECT_ATTEMPT_COUNT_COOKIE_NAME}=${
                redirectAttemptNumber + 1
            }; Path=/; Max-Age=10; HttpOnly; SameSite=Strict`
        );
        logDebugMessage("Attached new tokens to response");
        return finalResponse;
    } catch (err) {
        logDebugMessage("Error refreshing session");
        logDebugMessage(err as unknown as string);
        return redirectToAuthPage(request);
    }
}

export async function revokeSession(config: SuperTokensNextjsConfig, request: Request): Promise<Response | void> {
    AppInfo = config.appInfo;
    if (config.enableDebugLogs) {
        enableLogging();
    }
    const response = new Response(null, {});

    try {
        const accessToken =
            getCookie(request, ACCESS_TOKEN_COOKIE_NAME) || request.headers.get(ACCESS_TOKEN_HEADER_NAME);
        if (!accessToken) {
            throw new Error("No access token found in the request");
        }
        const signOutURL = new URL(`${AppInfo.apiBasePath}/signout`, AppInfo.apiDomain);
        await fetch(signOutURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [ACCESS_TOKEN_HEADER_NAME]: accessToken,
                Cookie: `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}`,
            },
            credentials: "include",
        });
    } catch (err) {
        logDebugMessage("Error during the sign out attempt");
        logDebugMessage(err as unknown as string);
    }

    response.headers.set("x-middleware-next", "1");
    response.headers.delete("set-cookie");
    response.headers.delete(ACCESS_TOKEN_HEADER_NAME);
    response.headers.delete(REFRESH_TOKEN_HEADER_NAME);
    response.headers.delete(FRONT_TOKEN_HEADER_NAME);
    response.headers.delete(ANTI_CSRF_TOKEN_HEADER_NAME);
    return response;
}

function redirectToAuthPage(request: Request): Response {
    const authPagePath = AppInfo.websiteBasePath || "/auth";
    const redirectUrl = new URL(authPagePath, request.url);
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

const MAX_REFRESH_ATTEMPTS = 3;

async function fetchNewTokens(
    request: Request,
    attemptNumber = 1
): Promise<{
    accessToken: string;
    refreshToken: string;
    frontToken: string;
    antiCsrfToken: string;
}> {
    const refreshApiURL = new URL(`${AppInfo.apiBasePath}/session/refresh`, AppInfo.apiDomain);
    const cookieRefreshToken = getCookie(request, REFRESH_TOKEN_COOKIE_NAME);
    const headerRefreshToken = request.headers.get(REFRESH_TOKEN_HEADER_NAME);
    const refreshRequestHeaders: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (cookieRefreshToken) {
        refreshRequestHeaders.Cookie = `${REFRESH_TOKEN_COOKIE_NAME}=${cookieRefreshToken}`;
    } else if (headerRefreshToken) {
        refreshRequestHeaders.Authorization = `Bearer ${headerRefreshToken}`;
    }

    const refreshResponse = await fetch(refreshApiURL, {
        method: "POST",
        headers: refreshRequestHeaders,
        credentials: "include",
    });

    if (refreshResponse.status === 401 && attemptNumber <= MAX_REFRESH_ATTEMPTS) {
        logDebugMessage(`Retrying the refresh request because of a 401 response. Attempt number ${attemptNumber}`);
        return fetchNewTokens(request, attemptNumber + 1);
    }

    if (!refreshResponse.ok) {
        logDebugMessage(`Refresh request returned an invalid status code: ${refreshResponse.status}`);
        return { accessToken: "", refreshToken: "", frontToken: "", antiCsrfToken: "" };
    }

    logDebugMessage("Session refresh request completed");
    const frontTokenHeaderValue = refreshResponse.headers.get(FRONT_TOKEN_HEADER_NAME);
    const cookieTokens = {
        accessToken: "",
        refreshToken: "",
        frontToken: `${FRONT_TOKEN_COOKIE_NAME}=${frontTokenHeaderValue}; Path=/`,
        antiCsrfToken: "",
    };

    // TOOD: Review the current build target
    // getSetCookie was added in node 18 and our build target is ES5
    // This should not a problem here since the function runs in the Vercel edge runtime environment
    // @ts-expect-error TS(2339): Property 'getSetCookie' does not exist on type 'Headers'.
    const setCookieHeaders = refreshResponse.headers.getSetCookie();
    for (const header of setCookieHeaders) {
        if (header.includes(ACCESS_TOKEN_COOKIE_NAME)) {
            cookieTokens.accessToken = header;
        }
        if (header.includes(REFRESH_TOKEN_COOKIE_NAME)) {
            cookieTokens.refreshToken = header;
        }
        if (header.includes(ANTI_CSRF_TOKEN_COOKIE_NAME)) {
            cookieTokens.antiCsrfToken = header;
        }
    }

    const accessTokenHeaderValue = refreshResponse.headers.get(ACCESS_TOKEN_HEADER_NAME);
    const refreshTokenHeaderValue = refreshResponse.headers.get(REFRESH_TOKEN_HEADER_NAME);
    const antiCsrfTokenHeaderValue = refreshResponse.headers.get(ANTI_CSRF_TOKEN_HEADER_NAME);
    if (!cookieTokens.accessToken) {
        cookieTokens.accessToken = `${ACCESS_TOKEN_COOKIE_NAME}=${accessTokenHeaderValue}; Path=/; HttpOnly; SameSite=Lax`;
    }
    if (!cookieTokens.refreshToken) {
        cookieTokens.refreshToken = `${REFRESH_TOKEN_COOKIE_NAME}=${refreshTokenHeaderValue}; Path=/api/auth/session/refresh; HttpOnly; SameSite=Lax`;
    }
    if (!cookieTokens.antiCsrfToken && antiCsrfTokenHeaderValue) {
        cookieTokens.antiCsrfToken = `${ANTI_CSRF_TOKEN_COOKIE_NAME}=${antiCsrfTokenHeaderValue}; Path=/; HttpOnly; SameSite=Lax`;
    }

    return cookieTokens;
}

function getCookie(request: Request, name: string) {
    return request.headers
        .get("cookie")
        ?.split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];
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
