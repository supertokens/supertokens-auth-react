'use strict';

var logger = require('./logger.js');
var constants = require('./constants.js');

var AppInfo;
var DEFAULT_API_BASE_PATH = "/api/auth";
function superTokensMiddleware(config, apiRequestMiddleware) {
    var _this = this;
    var usesTheNextjsApiAsTheAuthenticationServer = compareUrlHost(config.appInfo.apiDomain, config.appInfo.websiteDomain);
    return function (request) { return logger.__awaiter(_this, void 0, void 0, function () {
        var requestUrl, response;
        return logger.__generator(this, function (_a) {
            requestUrl = new URL(request.url);
            if (requestUrl.pathname.startsWith(constants.SESSION_REFRESH_API_PATH) && request.method === "GET") {
                return [2 /*return*/, refreshSession(config, request)];
            }
            if (requestUrl.pathname.startsWith("/api") && usesTheNextjsApiAsTheAuthenticationServer) {
                if (requestUrl.pathname.startsWith(config.appInfo.apiBasePath || DEFAULT_API_BASE_PATH)) {
                    // this hits our pages/api/auth/* endpoints
                    return [2 /*return*/, next()];
                }
                if (apiRequestMiddleware) {
                    return [2 /*return*/, apiRequestMiddleware(request)];
                }
            }
            if (requestUrl.pathname.startsWith("/auth") &&
                requestUrl.searchParams.get(constants.FORCE_LOGOUT_PATH_PARAM_NAME) === "true") {
                return [2 /*return*/, revokeSession(config, request)];
            }
            response = next();
            response.headers.append("set-cookie", "".concat(constants.CURRENT_PATH_COOKIE_NAME, "=").concat(requestUrl.pathname, "; Path=/; HttpOnly; SameSite=Strict"));
            return [2 /*return*/, response];
        });
    }); };
}
function refreshSession(config, request) {
    return logger.__awaiter(this, void 0, void 0, function () {
        var redirectAttemptNumber, requestUrl, urlParamRedirectPath, redirectTo, tokens, hasRequiredCookies, redirectUrl, finalResponse, err_1;
        return logger.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    AppInfo = config.appInfo;
                    if (config.enableDebugLogs) {
                        logger.enableLogging();
                    }
                    redirectAttemptNumber = getRedirectAttemptNumber(request);
                    if (redirectAttemptNumber > constants.REDIRECT_ATTEMPT_MAX_COUNT) {
                        return [2 /*return*/, redirectToAuthPage(request)];
                    }
                    if (!getCookie(request, constants.REFRESH_TOKEN_COOKIE_NAME) && !request.headers.get(constants.REFRESH_TOKEN_HEADER_NAME)) {
                        logger.logDebugMessage("Refresh token not found");
                        return [2 /*return*/, redirectToAuthPage(request)];
                    }
                    requestUrl = new URL(request.url);
                    urlParamRedirectPath = requestUrl.searchParams.get(constants.REDIRECT_PATH_PARAM_NAME);
                    redirectTo = urlParamRedirectPath && isValidUrlPath(urlParamRedirectPath) ? urlParamRedirectPath : "/";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchNewTokens(request)];
                case 2:
                    tokens = _a.sent();
                    hasRequiredCookies = tokens.accessToken && tokens.refreshToken && tokens.frontToken;
                    if (!hasRequiredCookies) {
                        logger.logDebugMessage("Missing tokens from refresh response");
                        return [2 /*return*/, redirectToAuthPage(request)];
                    }
                    redirectUrl = new URL(redirectTo, request.url);
                    finalResponse = redirect(redirectUrl.toString());
                    finalResponse.headers.append("set-cookie", tokens.accessToken);
                    finalResponse.headers.append("set-cookie", tokens.refreshToken);
                    finalResponse.headers.append("set-cookie", tokens.frontToken);
                    if (tokens.antiCsrfToken) {
                        finalResponse.headers.append("set-cookie", tokens.antiCsrfToken);
                    }
                    finalResponse.headers.append("set-cookie", "".concat(constants.REDIRECT_ATTEMPT_COUNT_COOKIE_NAME, "=").concat(redirectAttemptNumber + 1, "; Path=/; Max-Age=10; HttpOnly; SameSite=Strict"));
                    logger.logDebugMessage("Attached new tokens to response");
                    return [2 /*return*/, finalResponse];
                case 3:
                    err_1 = _a.sent();
                    logger.logDebugMessage("Error refreshing session");
                    logger.logDebugMessage(err_1);
                    return [2 /*return*/, redirectToAuthPage(request)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function revokeSession(config, request) {
    return logger.__awaiter(this, void 0, void 0, function () {
        var response, accessToken, signOutURL, err_2;
        var _a;
        return logger.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    AppInfo = config.appInfo;
                    if (config.enableDebugLogs) {
                        logger.enableLogging();
                    }
                    response = new Response(null, {});
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    accessToken = getCookie(request, constants.ACCESS_TOKEN_COOKIE_NAME) || request.headers.get(constants.ACCESS_TOKEN_HEADER_NAME);
                    if (!accessToken) {
                        throw new Error("No access token found in the request");
                    }
                    signOutURL = new URL("".concat(AppInfo.apiBasePath, "/signout"), AppInfo.apiDomain);
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
                    logger.logDebugMessage("Error during the sign out attempt");
                    logger.logDebugMessage(err_2);
                    return [3 /*break*/, 4];
                case 4:
                    response.headers.set("x-middleware-next", "1");
                    response.headers.delete("set-cookie");
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
    var authPagePath = AppInfo.websiteBasePath || "/auth";
    var redirectUrl = new URL(authPagePath, request.url);
    redirectUrl.searchParams.set(constants.FORCE_LOGOUT_PATH_PARAM_NAME, "true");
    return redirect(redirectUrl.toString());
}
function redirect(location) {
    logger.logDebugMessage("Redirecting to: ".concat(location));
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
var MAX_REFRESH_ATTEMPTS = 3;
function fetchNewTokens(request, attemptNumber) {
    if (attemptNumber === void 0) { attemptNumber = 1; }
    return logger.__awaiter(this, void 0, void 0, function () {
        var refreshApiURL, cookieRefreshToken, headerRefreshToken, refreshRequestHeaders, refreshResponse, frontTokenHeaderValue, cookieTokens, setCookieHeaders, _i, setCookieHeaders_1, header, accessTokenHeaderValue, refreshTokenHeaderValue, antiCsrfTokenHeaderValue;
        return logger.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refreshApiURL = new URL("".concat(AppInfo.apiBasePath, "/session/refresh"), AppInfo.apiDomain);
                    cookieRefreshToken = getCookie(request, constants.REFRESH_TOKEN_COOKIE_NAME);
                    headerRefreshToken = request.headers.get(constants.REFRESH_TOKEN_HEADER_NAME);
                    refreshRequestHeaders = {
                        "Content-Type": "application/json",
                    };
                    if (cookieRefreshToken) {
                        refreshRequestHeaders.Cookie = "".concat(constants.REFRESH_TOKEN_COOKIE_NAME, "=").concat(cookieRefreshToken);
                    }
                    else if (headerRefreshToken) {
                        refreshRequestHeaders[constants.REFRESH_TOKEN_HEADER_NAME] = headerRefreshToken;
                    }
                    return [4 /*yield*/, fetch(refreshApiURL, {
                            method: "POST",
                            headers: refreshRequestHeaders,
                            credentials: "include",
                        })];
                case 1:
                    refreshResponse = _a.sent();
                    if (refreshResponse.status === 401 && attemptNumber <= MAX_REFRESH_ATTEMPTS) {
                        logger.logDebugMessage("Retrying the refresh request because of a 401 response. Attempt number ".concat(attemptNumber));
                        return [2 /*return*/, fetchNewTokens(request, attemptNumber + 1)];
                    }
                    if (!refreshResponse.ok) {
                        logger.logDebugMessage("Refresh request returned an invalid status code: ".concat(refreshResponse.status));
                        return [2 /*return*/, { accessToken: "", refreshToken: "", frontToken: "", antiCsrfToken: "" }];
                    }
                    logger.logDebugMessage("Session refresh request completed");
                    frontTokenHeaderValue = refreshResponse.headers.get(constants.FRONT_TOKEN_HEADER_NAME);
                    cookieTokens = {
                        accessToken: "",
                        refreshToken: "",
                        frontToken: "".concat(constants.FRONT_TOKEN_COOKIE_NAME, "=").concat(frontTokenHeaderValue, "; Path=/"),
                        antiCsrfToken: "",
                    };
                    setCookieHeaders = refreshResponse.headers.getSetCookie();
                    for (_i = 0, setCookieHeaders_1 = setCookieHeaders; _i < setCookieHeaders_1.length; _i++) {
                        header = setCookieHeaders_1[_i];
                        if (header.includes(constants.ACCESS_TOKEN_COOKIE_NAME)) {
                            cookieTokens.accessToken = header;
                        }
                        if (header.includes(constants.REFRESH_TOKEN_COOKIE_NAME)) {
                            cookieTokens.refreshToken = header;
                        }
                        if (header.includes(constants.ANTI_CSRF_TOKEN_COOKIE_NAME)) {
                            cookieTokens.antiCsrfToken = header;
                        }
                    }
                    accessTokenHeaderValue = refreshResponse.headers.get(constants.ACCESS_TOKEN_HEADER_NAME);
                    refreshTokenHeaderValue = refreshResponse.headers.get(constants.REFRESH_TOKEN_HEADER_NAME);
                    antiCsrfTokenHeaderValue = refreshResponse.headers.get(constants.ANTI_CSRF_TOKEN_HEADER_NAME);
                    if (!cookieTokens.accessToken) {
                        cookieTokens.accessToken = "".concat(constants.ACCESS_TOKEN_COOKIE_NAME, "=").concat(accessTokenHeaderValue, "; Path=/; HttpOnly; SameSite=Lax");
                    }
                    if (!cookieTokens.refreshToken) {
                        cookieTokens.refreshToken = "".concat(constants.REFRESH_TOKEN_COOKIE_NAME, "=").concat(refreshTokenHeaderValue, "; Path=/api/auth/session/refresh; HttpOnly; SameSite=Lax");
                    }
                    if (!cookieTokens.antiCsrfToken && antiCsrfTokenHeaderValue) {
                        cookieTokens.antiCsrfToken = "".concat(constants.ANTI_CSRF_TOKEN_COOKIE_NAME, "=").concat(antiCsrfTokenHeaderValue, "; Path=/; HttpOnly; SameSite=Lax");
                    }
                    return [2 /*return*/, cookieTokens];
            }
        });
    });
}
function getCookie(request, name) {
    var _a, _b;
    return (_b = (_a = request.headers
        .get("cookie")) === null || _a === void 0 ? void 0 : _a.split("; ").find(function (row) { return row.startsWith("".concat(name, "=")); })) === null || _b === void 0 ? void 0 : _b.split("=")[1];
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
        logger.logDebugMessage("Error comparing URL host");
        logger.logDebugMessage(err);
        return false;
    }
}

exports.refreshSession = refreshSession;
exports.revokeSession = revokeSession;
exports.superTokensMiddleware = superTokensMiddleware;
