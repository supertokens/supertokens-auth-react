'use strict';

var utils = require('./utils.js');
var constants = require('./constants.js');
require('react');
require('supertokens-web-js/lib/build/error');
require('supertokens-web-js/utils/cookieHandler');
require('supertokens-web-js/utils/normalisedURLDomain');
require('supertokens-web-js/utils/normalisedURLPath');
require('supertokens-web-js/utils/windowHandler');
require('crypto');

var AppInfo;
function superTokensMiddleware(config) {
    var _this = this;
    var usesTheNextjsApiAsTheAuthenticationServer = compareUrlHost(config.appInfo.apiDomain, config.appInfo.websiteDomain);
    if (config.enableDebugLogs) {
        utils.enableLogging();
    }
    AppInfo = utils.normaliseInputAppInfoOrThrowError(config.appInfo);
    return function (request) { return utils.__awaiter(_this, void 0, void 0, function () {
        var requestUrl, refreshPath, response;
        return utils.__generator(this, function (_a) {
            requestUrl = new URL(request.url);
            refreshPath = getRefreshAPIPath();
            console.log("######");
            console.log(request.url);
            console.log("cookie");
            console.log(request.headers.get("cookie"));
            if (requestUrl.pathname.startsWith(refreshPath) && request.method === "GET") {
                return [2 /*return*/, refreshSession(request)];
            }
            console.log("skip refresh");
            if (usesTheNextjsApiAsTheAuthenticationServer &&
                requestUrl.pathname.startsWith(AppInfo.apiBasePath.getAsStringDangerous())) {
                // this hits our pages/api/auth/* endpoints
                return [2 /*return*/, next()];
            }
            console.log("skip auth api");
            if (requestUrl.pathname.startsWith(AppInfo.websiteBasePath.getAsStringDangerous()) &&
                requestUrl.searchParams.get(constants.FORCE_LOGOUT_PATH_PARAM_NAME) === "true") {
                return [2 /*return*/, revokeSession(request)];
            }
            console.log("skip revoke");
            response = next();
            response.headers.append("set-cookie", "".concat(constants.CURRENT_PATH_COOKIE_NAME, "=").concat(requestUrl.pathname, "; Path=/; HttpOnly; SameSite=Strict"));
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
                    if (!getCookie(request, constants.REFRESH_TOKEN_COOKIE_NAME) && !getCookie(request, constants.REFRESH_TOKEN_HEADER_NAME)) {
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
                    finalResponse.headers.append("set-cookie", "".concat(constants.REDIRECT_ATTEMPT_COUNT_COOKIE_NAME, "=").concat(redirectAttemptNumber + 1, "; Path=/; Max-Age=10; HttpOnly; SameSite=Strict"));
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
        var response, accessToken, signOutURL, err_2, refreshPath;
        var _a;
        return utils.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    response = new Response(null, {});
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    accessToken = getCookie(request, constants.ACCESS_TOKEN_COOKIE_NAME) || getCookie(request, constants.ACCESS_TOKEN_HEADER_NAME);
                    if (!accessToken) {
                        throw new Error("No access token found in the request");
                    }
                    signOutURL = new URL("".concat(AppInfo.apiBasePath.getAsStringDangerous(), "/signout"), AppInfo.apiDomain.getAsStringDangerous());
                    return [4 /*yield*/, fetch(signOutURL, {
                            method: "POST",
                            headers: (_a = {
                                    "Content-Type": "application/json"
                                },
                                _a[constants.ACCESS_TOKEN_HEADER_NAME] = accessToken,
                                _a.Cookie = "".concat(constants.ACCESS_TOKEN_COOKIE_NAME, "=").concat(accessToken),
                                _a),
                            credentials: "include",
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    utils.logDebugMessage("Error during the sign out attempt");
                    utils.logDebugMessage(err_2);
                    return [3 /*break*/, 4];
                case 4:
                    response.headers.set("x-middleware-next", "1");
                    response.headers.append("set-cookie", "".concat(constants.ACCESS_TOKEN_COOKIE_NAME, "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax"));
                    response.headers.append("set-cookie", "".concat(constants.FRONT_TOKEN_COOKIE_NAME, "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax"));
                    response.headers.append("set-cookie", "".concat(constants.ANTI_CSRF_TOKEN_COOKIE_NAME, "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax"));
                    refreshPath = getRefreshAPIPath();
                    response.headers.append("set-cookie", "".concat(constants.REFRESH_TOKEN_COOKIE_NAME, "=; Path=").concat(refreshPath, "; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax"));
                    response.headers.delete(constants.ACCESS_TOKEN_HEADER_NAME);
                    response.headers.delete(constants.REFRESH_TOKEN_HEADER_NAME);
                    response.headers.delete(constants.FRONT_TOKEN_HEADER_NAME);
                    response.headers.delete(constants.ANTI_CSRF_TOKEN_HEADER_NAME);
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
        var refreshApiURL, cookieRefreshToken, headerRefreshToken, refreshRequestHeaders, refreshResponse, cookies, tokens, setCookieHeaders, _i, setCookieHeaders_1, header, headers;
        return utils.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refreshApiURL = new URL("".concat(AppInfo.apiBasePath.getAsStringDangerous(), "/session/refresh"), AppInfo.apiDomain.getAsStringDangerous());
                    cookieRefreshToken = getCookie(request, constants.REFRESH_TOKEN_COOKIE_NAME);
                    headerRefreshToken = getCookie(request, constants.REFRESH_TOKEN_HEADER_NAME);
                    refreshRequestHeaders = new Headers();
                    refreshRequestHeaders.append("Content-Type", "application/json");
                    if (cookieRefreshToken) {
                        refreshRequestHeaders.append("Cookie", "".concat(constants.REFRESH_TOKEN_COOKIE_NAME, "=").concat(cookieRefreshToken));
                    }
                    else if (headerRefreshToken) {
                        refreshRequestHeaders.append("Authorization", "Bearer ".concat(headerRefreshToken));
                    }
                    // console.log("#######");
                    // console.log("request");
                    // console.log(request);
                    // console.log("#######");
                    // console.log("headers");
                    refreshRequestHeaders.forEach(function (value, key) {
                        console.log("".concat(key, ": ").concat(value));
                    });
                    return [4 /*yield*/, fetch(refreshApiURL, {
                            method: "POST",
                            headers: refreshRequestHeaders,
                            credentials: "include",
                        })];
                case 1:
                    refreshResponse = _a.sent();
                    // console.log("#######");
                    // console.log("response");
                    // console.log(refreshResponse);
                    if (!refreshResponse.ok) {
                        utils.logDebugMessage("Refresh request returned an invalid status code: ".concat(refreshResponse.status));
                        return [2 /*return*/, { headers: [], cookies: [] }];
                    }
                    utils.logDebugMessage("Session refresh request completed");
                    cookies = [];
                    tokens = {
                        accessToken: refreshResponse.headers.get(constants.ACCESS_TOKEN_HEADER_NAME) || "",
                        refreshToken: refreshResponse.headers.get(constants.REFRESH_TOKEN_HEADER_NAME) || "",
                        frontToken: refreshResponse.headers.get(constants.FRONT_TOKEN_HEADER_NAME) || "",
                        antiCsrfToken: refreshResponse.headers.get(constants.ANTI_CSRF_TOKEN_HEADER_NAME) || "",
                    };
                    cookies.push("".concat(constants.FRONT_TOKEN_COOKIE_NAME, "=").concat(tokens.frontToken, "; Path=/"));
                    setCookieHeaders = refreshResponse.headers.getSetCookie();
                    for (_i = 0, setCookieHeaders_1 = setCookieHeaders; _i < setCookieHeaders_1.length; _i++) {
                        header = setCookieHeaders_1[_i];
                        if (header.includes(constants.ACCESS_TOKEN_COOKIE_NAME)) {
                            cookies.push(header);
                        }
                        if (header.includes(constants.REFRESH_TOKEN_COOKIE_NAME)) {
                            cookies.push(header);
                        }
                        if (header.includes(constants.ANTI_CSRF_TOKEN_COOKIE_NAME)) {
                            cookies.push(header);
                        }
                    }
                    if (!cookies.some(function (cookie) { return cookie.includes(constants.ACCESS_TOKEN_COOKIE_NAME); })) {
                        cookies.push("".concat(constants.ACCESS_TOKEN_HEADER_NAME, "=").concat(tokens.accessToken, "; Path=/; HttpOnly; SameSite=Lax"));
                    }
                    if (!cookies.some(function (cookie) { return cookie.includes(constants.REFRESH_TOKEN_COOKIE_NAME); })) {
                        cookies.push("".concat(constants.REFRESH_TOKEN_HEADER_NAME, "=").concat(tokens.refreshToken, "; Path=/api/auth/session/refresh; HttpOnly; SameSite=Lax"));
                    }
                    if (!cookies.some(function (cookie) { return cookie.includes(constants.ANTI_CSRF_TOKEN_COOKIE_NAME); }) && tokens.antiCsrfToken) {
                        cookies.push("".concat(constants.ANTI_CSRF_TOKEN_HEADER_NAME, "=").concat(tokens.antiCsrfToken, "; Path=/; HttpOnly; SameSite=Lax"));
                    }
                    headers = [];
                    if (tokens.accessToken) {
                        headers.push([constants.ACCESS_TOKEN_HEADER_NAME, tokens.accessToken]);
                    }
                    if (tokens.refreshToken) {
                        headers.push([constants.REFRESH_TOKEN_HEADER_NAME, tokens.refreshToken]);
                    }
                    if (tokens.antiCsrfToken) {
                        headers.push([constants.ANTI_CSRF_TOKEN_HEADER_NAME, tokens.antiCsrfToken]);
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
    if (!path)
        return "/";
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

exports.refreshSession = refreshSession;
exports.revokeSession = revokeSession;
exports.superTokensMiddleware = superTokensMiddleware;
