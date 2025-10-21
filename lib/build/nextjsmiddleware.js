'use strict';

var utils = require('./utils.js');
var constants = require('./constants.js');
require('react');
require('supertokens-web-js/lib/build/error');
require('supertokens-web-js/utils/cookieHandler');
require('supertokens-web-js/utils/normalisedURLDomain');
require('supertokens-web-js/utils/normalisedURLPath');
require('supertokens-web-js/utils/windowHandler');

var AppInfo;
function superTokensMiddleware(config) {
    var _this = this;
    var usesTheNextjsApiAsTheAuthenticationServer = compareUrlHost(config.appInfo.apiDomain, config.appInfo.websiteDomain);
    if (config.enableDebugLogs) {
        utils.enableLogging();
    }
    var isApiRequest = config.isApiRequest ||
        (function (request) {
            var requestUrl = new URL(request.url);
            return requestUrl.pathname.startsWith("/api");
        });
    AppInfo = utils.normaliseInputAppInfoOrThrowError(config.appInfo);
    return function (request) { return utils.__awaiter(_this, void 0, void 0, function () {
        var requestUrl, refreshPath, response;
        return utils.__generator(this, function (_a) {
            requestUrl = new URL(request.url);
            refreshPath = getRefreshAPIPath();
            console.log("requestUrl.pathname", requestUrl.pathname);
            console.log("request method", request.method);
            if (requestUrl.pathname.startsWith(refreshPath) && request.method === "GET") {
                return [2 /*return*/, refreshSession(request)];
            }
            if (usesTheNextjsApiAsTheAuthenticationServer &&
                requestUrl.pathname.startsWith(AppInfo.apiBasePath.getAsStringDangerous())) {
                // this hits our pages/api/auth/* endpoints
                return [2 /*return*/, next()];
            }
            if (requestUrl.pathname.startsWith(AppInfo.websiteBasePath.getAsStringDangerous()) &&
                requestUrl.searchParams.get(constants.FORCE_LOGOUT_PATH_PARAM_NAME) === "true") {
                return [2 /*return*/, revokeSession(request)];
            }
            if (isApiRequest(request) && config.apiRequestMiddleware) {
                return [2 /*return*/, config.apiRequestMiddleware(request)];
            }
            response = next();
            if (!isInternalPath(requestUrl.pathname)) {
                response.headers.append("set-cookie", buildSetCookieHeader({
                    name: constants.CURRENT_PATH_COOKIE_NAME,
                    value: requestUrl.pathname,
                    path: "/",
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 60,
                }));
            }
            return [2 /*return*/, response];
        });
    }); };
}
function refreshSession(request) {
    return utils.__awaiter(this, void 0, void 0, function () {
        var redirectAttemptNumber, requestUrl, urlParamRedirectPath, redirectTo, _a, cookies, headers, hasRequiredCookies, redirectUrl, finalResponse, _i, cookies_1, cookie, _b, headers_1, _c, headerName, headerValue, err_1;
        return utils.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    redirectAttemptNumber = getRedirectAttemptNumber(request);
                    if (redirectAttemptNumber > constants.REDIRECT_ATTEMPT_MAX_COUNT) {
                        return [2 /*return*/, redirectToAuthPage(request)];
                    }
                    // The redirect originates from SSR and authorization headers are passed in a cookie
                    if (!getCookie(request, constants.REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME) &&
                        !getCookie(request, constants.REFRESH_TOKEN_HEADER_SESSION_COOKIE_NAME)) {
                        utils.logDebugMessage("Refresh token not found");
                        return [2 /*return*/, redirectToAuthPage(request)];
                    }
                    requestUrl = new URL(request.url);
                    urlParamRedirectPath = requestUrl.searchParams.get(constants.REDIRECT_PATH_PARAM_NAME);
                    redirectTo = urlParamRedirectPath && isValidUrlPath(urlParamRedirectPath) ? urlParamRedirectPath : "/";
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchNewTokens(request)];
                case 2:
                    _a = _d.sent(), cookies = _a.cookies, headers = _a.headers;
                    hasRequiredCookies = cookies.length >= 3 || headers.length >= 2;
                    if (!hasRequiredCookies) {
                        utils.logDebugMessage("Missing tokens from refresh response");
                        return [2 /*return*/, redirectToAuthPage(request)];
                    }
                    redirectUrl = new URL(redirectTo, request.url);
                    finalResponse = redirect(redirectUrl.toString());
                    for (_i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
                        cookie = cookies_1[_i];
                        finalResponse.headers.append("set-cookie", cookie);
                    }
                    for (_b = 0, headers_1 = headers; _b < headers_1.length; _b++) {
                        _c = headers_1[_b], headerName = _c[0], headerValue = _c[1];
                        finalResponse.headers.append(headerName, headerValue);
                    }
                    finalResponse.headers.append("set-cookie", buildSetCookieHeader({
                        name: constants.REDIRECT_ATTEMPT_COUNT_COOKIE_NAME,
                        value: String(redirectAttemptNumber + 1),
                        path: "/",
                        maxAge: 10,
                        httpOnly: true,
                        sameSite: "strict",
                    }));
                    finalResponse.headers.append("set-cookie", buildSetCookieHeader({
                        name: constants.SSR_REFRESH_SESSION_INDICATOR_COOKIE_NAME,
                        value: "true",
                        path: "/",
                        httpOnly: true,
                        sameSite: "strict",
                        maxAge: 5,
                    }));
                    utils.logDebugMessage("Attached new tokens to response");
                    return [2 /*return*/, finalResponse];
                case 3:
                    err_1 = _d.sent();
                    utils.logDebugMessage("Error refreshing session");
                    utils.logDebugMessage(err_1);
                    return [2 /*return*/, redirectToAuthPage(request)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function revokeSession(request) {
    return utils.__awaiter(this, void 0, void 0, function () {
        var response, accessToken, signOutURL, signoutRequestHeaders, err_2;
        return utils.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = new Response(null, {});
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    accessToken = getCookie(request, constants.ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME) ||
                        getCookie(request, constants.ACCESS_TOKEN_HEADER_SESSION_COOKIE_NAME);
                    if (!accessToken) {
                        throw new Error("No access token found in the request");
                    }
                    signOutURL = new URL("".concat(AppInfo.apiBasePath.getAsStringDangerous(), "/signout"), AppInfo.apiDomain.getAsStringDangerous());
                    signoutRequestHeaders = new Headers();
                    signoutRequestHeaders.append("Content-Type", "application/json");
                    signoutRequestHeaders.append("Cookie", "".concat(constants.ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME, "=").concat(accessToken));
                    signoutRequestHeaders.append("Authorization", "Bearer ".concat(accessToken));
                    return [4 /*yield*/, fetch(signOutURL, {
                            method: "POST",
                            headers: signoutRequestHeaders,
                            credentials: "include",
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    utils.logDebugMessage("Error during the sign out attempt");
                    utils.logDebugMessage(err_2);
                    return [3 /*break*/, 4];
                case 4:
                    response.headers.set("x-middleware-next", "1");
                    response.headers.append("set-cookie", buildSetCookieHeader({
                        name: constants.ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME,
                        value: "",
                        path: "/",
                        expires: "Thu, 01 Jan 1970 00:00:00 GMT",
                        httpOnly: true,
                        sameSite: "lax",
                    }));
                    response.headers.append("set-cookie", buildSetCookieHeader({
                        name: constants.ACCESS_TOKEN_HEADER_NAME,
                        value: "",
                        path: "/",
                        expires: "Thu, 01 Jan 1970 00:00:00 GMT",
                        httpOnly: true,
                        sameSite: "lax",
                    }));
                    response.headers.append("set-cookie", buildSetCookieHeader({
                        name: constants.FRONT_TOKEN_COOKIE_SESSION_COOKIE_NAME,
                        value: "",
                        path: "/",
                        expires: "Thu, 01 Jan 1970 00:00:00 GMT",
                        httpOnly: true,
                        sameSite: "lax",
                    }));
                    response.headers.append("set-cookie", buildSetCookieHeader({
                        name: constants.ANTI_CSRF_TOKEN_COOKIE_NAME,
                        value: "",
                        path: "/",
                        expires: "Thu, 01 Jan 1970 00:00:00 GMT",
                        httpOnly: true,
                        sameSite: "lax",
                    }));
                    response.headers.append("set-cookie", buildSetCookieHeader({
                        name: constants.ANTI_CSRF_TOKEN_HEADER_NAME,
                        value: "",
                        path: "/",
                        expires: "Thu, 01 Jan 1970 00:00:00 GMT",
                        httpOnly: true,
                        sameSite: "lax",
                    }));
                    response.headers.append("set-cookie", buildSetCookieHeader({
                        name: constants.REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME,
                        value: "",
                        path: "/",
                        expires: "Thu, 01 Jan 1970 00:00:00 GMT",
                        httpOnly: true,
                        sameSite: "lax",
                    }));
                    response.headers.append("set-cookie", buildSetCookieHeader({
                        name: constants.REFRESH_TOKEN_HEADER_SESSION_COOKIE_NAME,
                        value: "",
                        path: "/",
                        expires: "Thu, 01 Jan 1970 00:00:00 GMT",
                        httpOnly: true,
                        sameSite: "lax",
                    }));
                    response.headers.append("set-cookie", buildSetCookieHeader({
                        name: constants.SSR_REVOKE_SESSION_INDICATOR_COOKIE_NAME,
                        value: "true",
                        path: "/",
                        httpOnly: true,
                        sameSite: "strict",
                        maxAge: 5,
                    }));
                    return [2 /*return*/, response];
            }
        });
    });
}
function redirectToAuthPage(request) {
    var redirectUrl = new URL(AppInfo.websiteBasePath.getAsStringDangerous(), request.url);
    redirectUrl.searchParams.set(constants.FORCE_LOGOUT_PATH_PARAM_NAME, "true");
    return redirect(redirectUrl.toString());
}
function redirect(location) {
    utils.logDebugMessage("Redirecting to: ".concat(location));
    return new Response(null, {
        status: 302,
        headers: {
            Location: location,
        },
    });
}
function next() {
    var response = new Response(null, {});
    response.headers.set("x-middleware-next", "1");
    return response;
}
function fetchNewTokens(request) {
    return utils.__awaiter(this, void 0, void 0, function () {
        var refreshApiURL, cookieRefreshToken, headerRefreshToken, refreshRequestHeaders, refreshResponse, setCookieHeaders, tokenTransferMethod, cookies, headers, frontToken, accessTokenCookie, refreshTokenCookie, antiCsrfTokenCookie, accessToken, refreshToken, antiCsrfToken;
        return utils.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refreshApiURL = new URL("".concat(AppInfo.apiBasePath.getAsStringDangerous(), "/session/refresh"), AppInfo.apiDomain.getAsStringDangerous());
                    cookieRefreshToken = getCookie(request, constants.REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME);
                    headerRefreshToken = getCookie(request, constants.REFRESH_TOKEN_HEADER_SESSION_COOKIE_NAME);
                    refreshRequestHeaders = new Headers();
                    refreshRequestHeaders.append("Content-Type", "application/json");
                    if (cookieRefreshToken) {
                        refreshRequestHeaders.append("Cookie", "".concat(constants.REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME, "=").concat(cookieRefreshToken));
                    }
                    else if (headerRefreshToken) {
                        refreshRequestHeaders.append("Authorization", "Bearer ".concat(headerRefreshToken));
                    }
                    return [4 /*yield*/, fetch(refreshApiURL, {
                            method: "POST",
                            headers: refreshRequestHeaders,
                            credentials: "include",
                        })];
                case 1:
                    refreshResponse = _a.sent();
                    if (!refreshResponse.ok) {
                        throw new Error("Refresh request returned an invalid status code: ".concat(refreshResponse.status));
                    }
                    utils.logDebugMessage("Session refresh request completed");
                    setCookieHeaders = refreshResponse.headers.getSetCookie();
                    tokenTransferMethod = setCookieHeaders.find(function (header) {
                        return header.includes(constants.ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME);
                    })
                        ? "cookie"
                        : "header";
                    cookies = [];
                    headers = [];
                    frontToken = refreshResponse.headers.get(constants.FRONT_TOKEN_HEADER_NAME) || "";
                    if (!frontToken) {
                        throw new Error("Front token not found in the response");
                    }
                    cookies.push(buildSetCookieHeader({
                        name: constants.FRONT_TOKEN_COOKIE_SESSION_COOKIE_NAME,
                        value: frontToken,
                        path: "/",
                        httpOnly: false,
                        sameSite: "lax",
                    }));
                    if (tokenTransferMethod === "cookie") {
                        accessTokenCookie = setCookieHeaders.find(function (header) {
                            return header.includes(constants.ACCESS_TOKEN_COOKIE_SESSION_COOKIE_NAME);
                        });
                        if (!accessTokenCookie) {
                            throw new Error("Access token cookie not found in the response");
                        }
                        cookies.push(accessTokenCookie);
                        refreshTokenCookie = setCookieHeaders.find(function (header) {
                            return header.includes(constants.REFRESH_TOKEN_COOKIE_SESSION_COOKIE_NAME);
                        });
                        if (!refreshTokenCookie) {
                            throw new Error("Refresh token cookie not found in the response");
                        }
                        cookies.push(refreshTokenCookie);
                        antiCsrfTokenCookie = setCookieHeaders.find(function (header) {
                            return header.includes(constants.ANTI_CSRF_TOKEN_COOKIE_NAME);
                        });
                        if (antiCsrfTokenCookie) {
                            cookies.push(antiCsrfTokenCookie);
                        }
                    }
                    else {
                        accessToken = refreshResponse.headers.get(constants.ACCESS_TOKEN_HEADER_NAME);
                        if (accessToken) {
                            headers.push([constants.ACCESS_TOKEN_HEADER_NAME, accessToken]);
                            cookies.push(buildSetCookieHeader({
                                name: constants.ACCESS_TOKEN_HEADER_SESSION_COOKIE_NAME,
                                value: accessToken,
                                path: "/",
                                httpOnly: true,
                                sameSite: "lax",
                            }));
                        }
                        else {
                            throw new Error("Access token header not found in the response");
                        }
                        refreshToken = refreshResponse.headers.get(constants.REFRESH_TOKEN_HEADER_NAME);
                        if (refreshToken) {
                            headers.push([constants.REFRESH_TOKEN_HEADER_NAME, refreshToken]);
                            cookies.push(buildSetCookieHeader({
                                name: constants.REFRESH_TOKEN_HEADER_SESSION_COOKIE_NAME,
                                value: refreshToken,
                                path: "/",
                                httpOnly: true,
                                sameSite: "lax",
                            }));
                        }
                        else {
                            throw new Error("Refresh token header not found in the response");
                        }
                        antiCsrfToken = refreshResponse.headers.get(constants.ANTI_CSRF_TOKEN_HEADER_NAME);
                        if (antiCsrfToken) {
                            headers.push([constants.ANTI_CSRF_TOKEN_HEADER_NAME, antiCsrfToken]);
                            cookies.push(buildSetCookieHeader({
                                name: constants.ANTI_CSRF_TOKEN_HEADER_NAME,
                                value: antiCsrfToken,
                                path: "/",
                                httpOnly: true,
                                sameSite: "lax",
                            }));
                        }
                    }
                    return [2 /*return*/, { cookies: cookies, headers: headers }];
            }
        });
    });
}
function getCookie(request, name) {
    var cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
        return undefined;
    }
    var cookies = cookieHeader.split("; ");
    var matchingCookies = cookies.filter(function (row) { return row.startsWith("".concat(name, "=")); }).map(function (row) { return row.split("=")[1]; });
    // Return the last matching cookie value (most recent)
    // This handles cases where duplicate cookies exist
    return matchingCookies.length > 0 ? matchingCookies[matchingCookies.length - 1] : undefined;
}
function getRedirectAttemptNumber(request) {
    var cookieValue = getCookie(request, constants.REDIRECT_ATTEMPT_COUNT_COOKIE_NAME) || "1";
    try {
        return parseInt(cookieValue);
    }
    catch (err) {
        return 1;
    }
}
function isValidUrlPath(path) {
    try {
        if (typeof path !== "string" || path.trim() === "") {
            return false;
        }
        if (!path.startsWith("/")) {
            return false;
        }
        var normalizedPath = normalizeUrlPath(path);
        var invalidChars = /[<>:"|?*\0]/;
        return (!invalidChars.test(normalizedPath) &&
            normalizedPath.startsWith("/") &&
            !normalizedPath.includes("//") &&
            normalizedPath.length <= 2048);
    }
    catch (_a) {
        return false;
    }
}
function normalizeUrlPath(path) {
    if (!path) {
        return "/";
    }
    var normalizedPath = path.split("?")[0].split("#")[0];
    // remove trailing slash
    normalizedPath = path.replace(/\/$/, "");
    normalizedPath = !normalizedPath.startsWith("/") ? "/".concat(path) : path;
    return normalizedPath;
}
function compareUrlHost(firstUrl, secondUrl) {
    try {
        var firstUrlObject = new URL(firstUrl);
        var secondUrlObject = new URL(secondUrl);
        return firstUrlObject.host === secondUrlObject.host;
    }
    catch (err) {
        utils.logDebugMessage("Error comparing URL host");
        utils.logDebugMessage(err);
        return false;
    }
}
function getRefreshAPIPath() {
    var apiPath = AppInfo.apiBasePath.getAsStringDangerous();
    return "".concat(apiPath, "/session/refresh");
}
function isInternalPath(pathname) {
    var internalPaths = [
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
    var isInternalPath = internalPaths.some(function (path) { return pathname.startsWith(path); });
    var fileExtensions = [".ico", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".css", ".js", ".map", ".xml", ".txt"];
    var isAssetFile = fileExtensions.some(function (ext) { return pathname.toLowerCase().endsWith(ext); });
    return isInternalPath || isAssetFile;
}
function buildSetCookieHeader(cookie) {
    var name = cookie.name, value = cookie.value, maxAge = cookie.maxAge, domain = cookie.domain, _a = cookie.path, path = _a === void 0 ? "/" : _a, _b = cookie.sameSite, sameSite = _b === void 0 ? "lax" : _b, _c = cookie.httpOnly, httpOnly = _c === void 0 ? true : _c, secure = cookie.secure, expires = cookie.expires;
    var cookieString = "".concat(name, "=").concat(value, "; Path=").concat(path, "; SameSite=").concat(sameSite);
    if (maxAge) {
        cookieString += "; Max-Age=".concat(maxAge);
    }
    if (domain) {
        cookieString += "; Domain=".concat(domain);
    }
    if (httpOnly) {
        cookieString += "; HttpOnly";
    }
    if (secure) {
        cookieString += "; Secure";
    }
    if (expires) {
        cookieString += "; Expires=".concat(expires);
    }
    return cookieString;
}

exports.superTokensMiddleware = superTokensMiddleware;
