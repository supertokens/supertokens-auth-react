'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.js');
var WebJSSessionRecipe = require('supertokens-web-js/recipe/session');
var constants = require('./constants.js');
var utils$1 = require('supertokens-web-js/utils');
var superTokens = require('./superTokens.js');
require('react');
require('supertokens-web-js/utils/cookieHandler');
require('supertokens-web-js/utils/normalisedURLDomain');
require('supertokens-web-js/utils/normalisedURLPath');
require('supertokens-web-js/utils/windowHandler');
require('crypto');
require('supertokens-web-js');
require('supertokens-web-js/utils/postSuperTokensInitCallbacks');
require('supertokens-web-js/recipe/multitenancy');

function isCookiesStore(obj) {
    return typeof obj === "object" && obj !== null && "get" in obj && typeof obj.get === "function";
}

var SuperTokensNextjsSSRAPIWrapper = /** @class */ (function () {
    function SuperTokensNextjsSSRAPIWrapper() {
    }
    SuperTokensNextjsSSRAPIWrapper.init = function (config) {
        if (config.enableDebugLogs) {
            utils.enableLogging();
        }
        SuperTokensNextjsSSRAPIWrapper.config = config;
    };
    SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow = function () {
        if (!SuperTokensNextjsSSRAPIWrapper.config) {
            throw new Error("SuperTokens must be initialized before calling this method.");
        }
        return SuperTokensNextjsSSRAPIWrapper.config;
    };
    SuperTokensNextjsSSRAPIWrapper.getJWKSUrl = function () {
        var appInfo = SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow().appInfo;
        var jwksPath = "".concat(appInfo.apiBasePath, "/jwt/jwks.json");
        if (!jwksPath.startsWith("/")) {
            jwksPath = "/".concat(jwksPath);
        }
        jwksPath = jwksPath.replace("//", "/");
        var jwksUrl = new URL(jwksPath, appInfo.apiDomain);
        return jwksUrl.toString();
    };
    /**
     * Get the session state inside a server componet or redirect
     * The function is meant to be used inside Next.js server components
     * @param cookies - The cookies store exposed by next/headers (await cookies())
     * @returns The session context value or directly redirects the user to either the login page or the refresh API
     **/
    SuperTokensNextjsSSRAPIWrapper.getServerComponentSession = function (cookies) {
        var _a;
        return utils.__awaiter(this, void 0, void 0, function () {
            var redirectPath, authPagePath, refreshLocation, _b, state, session;
            return utils.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        redirectPath = ((_a = cookies.get(constants.CURRENT_PATH_COOKIE_NAME)) === null || _a === void 0 ? void 0 : _a.value) || "/";
                        authPagePath = getAuthPagePath(redirectPath);
                        refreshLocation = getRefreshLocation(redirectPath);
                        return [4 /*yield*/, getSSRSessionState(cookies)];
                    case 1:
                        _b = _c.sent(), state = _b.state, session = _b.session;
                        utils.logDebugMessage("SSR Session State: ".concat(state));
                        switch (state) {
                            case "front-token-not-found":
                            case "front-token-invalid":
                            case "access-token-invalid":
                                utils.logDebugMessage("Redirecting to Auth Page: ".concat(authPagePath));
                                return [2 /*return*/, redirect(authPagePath)];
                            case "front-token-expired":
                            case "access-token-not-found":
                            case "tokens-do-not-match":
                                utils.logDebugMessage("Redirecting to refresh API: ".concat(refreshLocation));
                                return [2 /*return*/, redirect(refreshLocation)];
                            case "tokens-match":
                                utils.logDebugMessage("Returning session object");
                                return [2 /*return*/, session];
                            default:
                                // This is here just to prevent typescript from complaining
                                // about the function not returning a value
                                throw new Error("Unknown state: ".concat(state));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the session state inside a server action
     * The function is meant to be used inside Next.js server actions
     * @param cookies - The cookies store exposed by next/headers (await cookies())
     * @returns An object that includes session context value and the status of the session ('valid' | 'expired' | 'invalid')
     * If the status is 'invalid' or 'expired' then the users should be considered as unauthenticated
     **/
    SuperTokensNextjsSSRAPIWrapper.getServerActionSession = function (cookies) {
        return utils.__awaiter(this, void 0, void 0, function () {
            var _a, state, session;
            return utils.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getSSRSessionState(cookies)];
                    case 1:
                        _a = _b.sent(), state = _a.state, session = _a.session;
                        utils.logDebugMessage("SSR Session State: ".concat(state));
                        if (state === "tokens-match") {
                            return [2 /*return*/, { session: session, status: "valid" }];
                        }
                        else if (["tokens-do-not-match", "front-token-expired", "access-token-not-found", "access-token-invalid"].includes(state)) {
                            return [2 /*return*/, { status: "expired", session: undefined }];
                        }
                        return [2 /*return*/, { status: "invalid", session: undefined }];
                }
            });
        });
    };
    /**
     * Ensures that a server action is called by an authenticated user
     * If the session does not exist/user is not authenticated, it will automatically redirect to the login page
     * The function is meant to run on the client, before calling the actual server action
     * @param action - A server action that will get called after the authentication state is confirmed
     * @returns The server action return value
     **/
    SuperTokensNextjsSSRAPIWrapper.confirmAuthenticationAndCallServerAction = function (action) {
        return utils.__awaiter(this, void 0, void 0, function () {
            var sessionExists;
            return utils.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, WebJSSessionRecipe.doesSessionExist()];
                    case 1:
                        sessionExists = _a.sent();
                        utils.logDebugMessage("Session exists: ".concat(sessionExists));
                        if (!sessionExists) {
                            return [2 /*return*/, superTokens.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                    show: "signin",
                                    redirectBack: true,
                                    userContext: utils$1.getNormalisedUserContext({}),
                                })];
                        }
                        utils.logDebugMessage("Retrieved access token payload");
                        return [4 /*yield*/, WebJSSessionRecipe.getAccessTokenPayloadSecurely()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a.sent();
                        utils.logDebugMessage("Error while authenticating server action");
                        return [2 /*return*/, superTokens.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                show: "signin",
                                redirectBack: true,
                                userContext: utils$1.getNormalisedUserContext({}),
                            })];
                    case 4:
                        utils.logDebugMessage("Calling server action");
                        return [2 /*return*/, action()];
                }
            });
        });
    };
    /**
     * Get the session state or redirect
     * The function is meant to be used inside getServerSideProps.
     * @param request - The request object available inside getServerSideProps ctx (ctx.req)
     * @returns The session context value or a redirects path to send the user to the refresh API or the login page
     **/
    SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession = function (request) {
        return utils.__awaiter(this, void 0, void 0, function () {
            var appInfo, requestUrl, redirectPath, authPagePath, refreshLocation, _a, state, session;
            return utils.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        appInfo = SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow().appInfo;
                        requestUrl = new URL(request.url, appInfo.websiteDomain);
                        redirectPath = requestUrl.pathname;
                        authPagePath = getAuthPagePath(redirectPath);
                        refreshLocation = getRefreshLocation(redirectPath);
                        return [4 /*yield*/, getSSRSessionState(request.cookies)];
                    case 1:
                        _a = _b.sent(), state = _a.state, session = _a.session;
                        utils.logDebugMessage("SSR Session State: ".concat(state));
                        switch (state) {
                            case "front-token-not-found":
                            case "front-token-invalid":
                            case "access-token-invalid":
                                utils.logDebugMessage("Redirecting to Auth Page: ".concat(authPagePath));
                                return [2 /*return*/, { redirect: { destination: authPagePath, permanent: false } }];
                            case "front-token-expired":
                            case "access-token-not-found":
                            case "tokens-do-not-match":
                                utils.logDebugMessage("Redirecting to refresh API: ".concat(refreshLocation));
                                return [2 /*return*/, { redirect: { destination: refreshLocation, permanent: false } }];
                            case "tokens-match":
                                utils.logDebugMessage("Returning session object");
                                return [2 /*return*/, { props: { session: session } }];
                            default:
                                // This is here just to prevent typescript from complaining
                                // about the function not returning a value
                                throw new Error("Unknown state: ".concat(state));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SuperTokensNextjsSSRAPIWrapper;
}());
var init = SuperTokensNextjsSSRAPIWrapper.init;
var getServerComponentSession = SuperTokensNextjsSSRAPIWrapper.getServerComponentSession;
var getServerActionSession = SuperTokensNextjsSSRAPIWrapper.getServerActionSession;
var getServerSidePropsSession = SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession;
var confirmAuthenticationAndCallServerAction = SuperTokensNextjsSSRAPIWrapper.confirmAuthenticationAndCallServerAction;
function getAuthPagePath(redirectPath) {
    var authPagePath = SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow().appInfo.websiteBasePath || "/auth";
    return "".concat(authPagePath, "?").concat(constants.FORCE_LOGOUT_PATH_PARAM_NAME, "=true&").concat(constants.REDIRECT_PATH_PARAM_NAME, "=").concat(redirectPath);
}
function getRefreshAPIPath() {
    var apiPath = SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow().appInfo.apiBasePath || constants.DEFAULT_API_PATH;
    return "".concat(apiPath, "/session/refresh");
}
function getRefreshLocation(redirectPath) {
    var refreshAPIPath = getRefreshAPIPath();
    return "".concat(refreshAPIPath, "?").concat(constants.REDIRECT_PATH_PARAM_NAME, "=").concat(redirectPath);
}
function getSSRSessionState(cookies) {
    return utils.__awaiter(this, void 0, void 0, function () {
        var frontToken, parsedFrontToken, accessToken, parsedAccessToken;
        return utils.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    frontToken = getCookieValue(cookies, constants.FRONT_TOKEN_COOKIE_NAME) || getCookieValue(cookies, constants.FRONT_TOKEN_HEADER_NAME);
                    if (!frontToken) {
                        return [2 /*return*/, { state: "front-token-not-found" }];
                    }
                    parsedFrontToken = parseFrontToken(frontToken);
                    if (!parsedFrontToken.isValid) {
                        return [2 /*return*/, { state: "front-token-invalid" }];
                    }
                    utils.logDebugMessage("Front token expires at: ".concat(new Date(parsedFrontToken.ate)));
                    if (parsedFrontToken.ate < Date.now()) {
                        return [2 /*return*/, { state: "front-token-expired" }];
                    }
                    accessToken = getCookieValue(cookies, constants.ACCESS_TOKEN_COOKIE_NAME) || getCookieValue(cookies, constants.ACCESS_TOKEN_HEADER_NAME);
                    if (!accessToken) {
                        return [2 /*return*/, { state: "access-token-not-found" }];
                    }
                    return [4 /*yield*/, parseAccessToken(accessToken)];
                case 1:
                    parsedAccessToken = _a.sent();
                    if (!parsedAccessToken.isValid) {
                        return [2 /*return*/, { state: "access-token-invalid" }];
                    }
                    if (!compareTokenPayloads(parsedFrontToken.payload, parsedAccessToken.payload)) {
                        return [2 /*return*/, { state: "tokens-do-not-match" }];
                    }
                    return [2 /*return*/, {
                            state: "tokens-match",
                            session: buildLoadedSessionContext(parsedAccessToken.payload),
                        }];
            }
        });
    });
}
function buildLoadedSessionContext(accessTokenPayload) {
    return {
        userId: accessTokenPayload.sub,
        accessTokenPayload: accessTokenPayload,
        doesSessionExist: true,
        loading: false,
        invalidClaims: [],
    };
}
function parseFrontToken(frontToken) {
    try {
        var parsedToken = JSON.parse(decodeURIComponent(escape(atob(frontToken))));
        if (!parsedToken.uid || !parsedToken.ate || !parsedToken.up) {
            return { isValid: false };
        }
        return { payload: parsedToken.up, ate: parsedToken.ate, isValid: true };
    }
    catch (err) {
        utils.logDebugMessage("Error while parsing front token: ".concat(err));
        return { isValid: false };
    }
}
function parseAccessToken(token) {
    return utils.__awaiter(this, void 0, void 0, function () {
        var payload, err_2;
        return utils.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, utils.jwtVerify(token, SuperTokensNextjsSSRAPIWrapper.getJWKSUrl())];
                case 1:
                    payload = _a.sent();
                    if (!payload.sub || !payload.exp) {
                        return [2 /*return*/, { isValid: false }];
                    }
                    return [2 /*return*/, { isValid: true, payload: payload }];
                case 2:
                    err_2 = _a.sent();
                    utils.logDebugMessage("Error while parsing access token: ".concat(err_2));
                    return [2 /*return*/, { isValid: false }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function compareTokenPayloads(payload1, payload2) {
    return JSON.stringify(payload1) === JSON.stringify(payload2);
}
function getCookieValue(cookie, name) {
    var _a;
    if (isCookiesStore(cookie)) {
        return (_a = cookie.get(name)) === null || _a === void 0 ? void 0 : _a.value;
    }
    return cookie[name];
}
var REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
function redirect(path) {
    var type = "push";
    var statusCode = 307;
    var error = new Error(REDIRECT_ERROR_CODE);
    error.digest = "".concat(REDIRECT_ERROR_CODE, ";").concat(type, ";").concat(path, ";").concat(statusCode, ";");
    throw error;
}

exports.confirmAuthenticationAndCallServerAction = confirmAuthenticationAndCallServerAction;
exports.default = SuperTokensNextjsSSRAPIWrapper;
exports.getServerActionSession = getServerActionSession;
exports.getServerComponentSession = getServerComponentSession;
exports.getServerSidePropsSession = getServerSidePropsSession;
exports.init = init;
