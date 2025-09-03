"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var utils = require("./utils.js");
var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
var utils$1 = require("supertokens-web-js/utils");
var superTokens = require("./superTokens.js");
var constants = require("./constants.js");
var crypto = require("crypto");
require("react");
require("supertokens-web-js/lib/build/error");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/recipe/multitenancy");

function isCookiesStore(obj) {
    return typeof obj === "object" && obj !== null && "get" in obj && typeof obj.get === "function";
}

var JWKSCache = /** @class */ (function () {
    function JWKSCache() {
        this.cache = new Map();
        this.defaultCacheDurationMs = 10 * 60 * 1000; // 10 minutes default
    }
    JWKSCache.prototype.getJWKS = function (jwksUrl, config) {
        var _a;
        return utils.__awaiter(this, void 0, void 0, function () {
            var now, cacheEntry, cacheDurationMs, jwksResponse, jwks;
            return utils.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        now = Date.now();
                        cacheEntry = this.cache.get(jwksUrl);
                        cacheDurationMs =
                            (_a = config === null || config === void 0 ? void 0 : config.cacheDurationMs) !== null &&
                            _a !== void 0
                                ? _a
                                : this.defaultCacheDurationMs;
                        if (cacheEntry && now < cacheEntry.expiresAt) {
                            return [2 /*return*/, cacheEntry.jwks];
                        }
                        return [4 /*yield*/, fetch(jwksUrl)];
                    case 1:
                        jwksResponse = _b.sent();
                        if (!jwksResponse.ok) {
                            throw new Error("Failed to fetch JWKS: ".concat(jwksResponse.statusText));
                        }
                        return [4 /*yield*/, jwksResponse.json()];
                    case 2:
                        jwks = _b.sent();
                        this.cache.set(jwksUrl, {
                            jwks: jwks,
                            timestamp: now,
                            expiresAt: now + cacheDurationMs,
                        });
                        return [2 /*return*/, jwks];
                }
            });
        });
    };
    JWKSCache.prototype.clearCache = function () {
        this.cache.clear();
    };
    JWKSCache.prototype.setCacheDuration = function (durationMs) {
        this.defaultCacheDurationMs = durationMs;
    };
    return JWKSCache;
})();
var jwksCache = new JWKSCache();
function jwtVerify(token, jwksUrl, config) {
    return utils.__awaiter(this, void 0, void 0, function () {
        var parts,
            headerB64,
            payloadB64,
            signatureB64,
            headerStr,
            header,
            kid,
            alg,
            jwks,
            matchingKey,
            publicKey,
            signatureInput,
            signature,
            algorithmsRecord,
            cryptoAlg,
            isValid,
            payloadStr,
            payload,
            now;
        return utils.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parts = token.split(".");
                    if (parts.length !== 3) {
                        throw new Error("Invalid JWT token format");
                    }
                    (headerB64 = parts[0]), (payloadB64 = parts[1]), (signatureB64 = parts[2]);
                    headerStr = Buffer.from(
                        headerB64 + "=".repeat((4 - (headerB64.length % 4)) % 4),
                        "base64"
                    ).toString();
                    header = JSON.parse(headerStr);
                    kid = header.kid;
                    if (!kid) {
                        throw new Error("JWT header missing kid (Key ID)");
                    }
                    alg = header.alg;
                    if (!alg) {
                        throw new Error("JWT header missing alg (Algorithm)");
                    }
                    return [4 /*yield*/, jwksCache.getJWKS(jwksUrl, config)];
                case 1:
                    jwks = _a.sent();
                    matchingKey = jwks.keys.find(function (key) {
                        return key.kid === kid;
                    });
                    if (!matchingKey) {
                        throw new Error("No matching key found for kid: ".concat(kid));
                    }
                    publicKey = generatePublicKey(matchingKey);
                    signatureInput = "".concat(headerB64, ".").concat(payloadB64);
                    signature = Buffer.from(signatureB64 + "=".repeat((4 - (signatureB64.length % 4)) % 4), "base64");
                    algorithmsRecord = {
                        RS256: "RSA-SHA256",
                        RS384: "RSA-SHA384",
                        RS512: "RSA-SHA512",
                        ES256: "SHA256",
                        ES384: "SHA384",
                        ES512: "SHA512",
                    };
                    cryptoAlg = algorithmsRecord[alg];
                    if (!cryptoAlg) {
                        throw new Error("Unsupported algorithm: ".concat(alg));
                    }
                    isValid = crypto.verify(cryptoAlg, Buffer.from(signatureInput), publicKey, signature);
                    if (!isValid) {
                        throw new Error("JWT signature verification failed");
                    }
                    payloadStr = Buffer.from(
                        payloadB64 + "=".repeat((4 - (payloadB64.length % 4)) % 4),
                        "base64"
                    ).toString();
                    payload = JSON.parse(payloadStr);
                    now = Math.floor(Date.now() / 1000);
                    if (payload.exp !== undefined && typeof payload.exp === "number") {
                        if (now >= payload.exp) {
                            throw new Error("JWT expired");
                        }
                    }
                    if (payload.nbf !== undefined && typeof payload.nbf === "number") {
                        if (now < payload.nbf) {
                            throw new Error("JWT not valid yet (nbf)");
                        }
                    }
                    if (payload.iat !== undefined && typeof payload.iat === "number") {
                        if (now < payload.iat) {
                            throw new Error("JWT issued in the future");
                        }
                    }
                    return [2 /*return*/, payload];
            }
        });
    });
}
function generatePublicKey(jwk, _alg) {
    if (jwk.kty !== "RSA") {
        throw new Error("Unsupported key type");
    }
    if (!jwk.n || !jwk.e) {
        throw new Error("Missing RSA key parameters");
    }
    var modulus = base64urlToBase64(jwk.n);
    var exponent = base64urlToBase64(jwk.e);
    var keyInput = {
        key: {
            kty: "RSA",
            kid: jwk.kid,
            n: modulus,
            e: exponent,
        },
        format: "jwk",
    };
    // TODO: Update node types
    // The error originates from the fact that we are using an older version of types/node - 14
    // The API has changed in version 16 (the minimum version that we support)
    // @ts-expect-error TS(2345) - Types of property 'key' are incompatible.
    return crypto.createPublicKey(keyInput);
}
function base64urlToBase64(base64url) {
    var base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
        base64 += "=";
    }
    return base64;
}

var SuperTokensNextjsSSRAPIWrapper = /** @class */ (function () {
    function SuperTokensNextjsSSRAPIWrapper() {}
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
                        redirectPath =
                            ((_a = cookies.get(constants.CURRENT_PATH_COOKIE_NAME)) === null || _a === void 0
                                ? void 0
                                : _a.value) || "/";
                        authPagePath = getAuthPagePath(redirectPath);
                        refreshLocation = getRefreshLocation(redirectPath);
                        return [4 /*yield*/, getSSRSessionState(cookies)];
                    case 1:
                        (_b = _c.sent()), (state = _b.state), (session = _b.session);
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
                    case 0:
                        return [4 /*yield*/, getSSRSessionState(cookies)];
                    case 1:
                        (_a = _b.sent()), (state = _a.state), (session = _a.session);
                        utils.logDebugMessage("SSR Session State: ".concat(state));
                        if (state === "tokens-match") {
                            return [2 /*return*/, { session: session, status: "valid" }];
                        } else if (
                            ["tokens-do-not-match", "front-token-expired", "access-token-not-found"].includes(state)
                        ) {
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
    SuperTokensNextjsSSRAPIWrapper.ensureSessionAndCall = function (action) {
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
                            return [
                                2 /*return*/,
                                superTokens.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                    show: "signin",
                                    redirectBack: true,
                                    userContext: utils$1.getNormalisedUserContext({}),
                                }),
                            ];
                        }
                        utils.logDebugMessage("Retrieved access token payload");
                        return [4 /*yield*/, WebJSSessionRecipe.getAccessTokenPayloadSecurely()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a.sent();
                        utils.logDebugMessage("Error while authenticating server action");
                        return [
                            2 /*return*/,
                            superTokens.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                show: "signin",
                                redirectBack: true,
                                userContext: utils$1.getNormalisedUserContext({}),
                            }),
                        ];
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
                        (_a = _b.sent()), (state = _a.state), (session = _a.session);
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
})();
var init = SuperTokensNextjsSSRAPIWrapper.init;
var getServerComponentSession = SuperTokensNextjsSSRAPIWrapper.getServerComponentSession;
var getServerActionSession = SuperTokensNextjsSSRAPIWrapper.getServerActionSession;
var getServerSidePropsSession = SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession;
var ensureSessionAndCall = SuperTokensNextjsSSRAPIWrapper.ensureSessionAndCall;
function getAuthPagePath(redirectPath) {
    var authPagePath = SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow().appInfo.websiteBasePath || "/auth";
    return ""
        .concat(authPagePath, "?")
        .concat(constants.FORCE_LOGOUT_PATH_PARAM_NAME, "=true&")
        .concat(constants.REDIRECT_PATH_PARAM_NAME, "=")
        .concat(redirectPath);
}
function getRefreshAPIPath() {
    var apiPath = SuperTokensNextjsSSRAPIWrapper.getConfigOrThrow().appInfo.apiBasePath || constants.DEFAULT_API_PATH;
    return "".concat(apiPath, "/session/refresh");
}
function getRefreshLocation(redirectPath) {
    var sessionRefreshAPIPath = getRefreshAPIPath();
    return "".concat(sessionRefreshAPIPath, "?").concat(constants.REDIRECT_PATH_PARAM_NAME, "=").concat(redirectPath);
}
function getSSRSessionState(cookies) {
    return utils.__awaiter(this, void 0, void 0, function () {
        var frontToken, parsedFrontToken, accessToken, parsedAccessToken;
        return utils.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    frontToken =
                        getCookieValue(cookies, constants.FRONT_TOKEN_COOKIE_NAME) ||
                        getCookieValue(cookies, constants.FRONT_TOKEN_HEADER_NAME);
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
                    accessToken =
                        getCookieValue(cookies, constants.ACCESS_TOKEN_COOKIE_NAME) ||
                        getCookieValue(cookies, constants.ACCESS_TOKEN_HEADER_NAME);
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
                    return [
                        2 /*return*/,
                        {
                            state: "tokens-match",
                            session: buildLoadedSessionContext(parsedAccessToken.payload),
                        },
                    ];
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
    } catch (err) {
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
                    return [4 /*yield*/, jwtVerify(token, SuperTokensNextjsSSRAPIWrapper.getJWKSUrl())];
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
                case 3:
                    return [2 /*return*/];
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

exports.default = SuperTokensNextjsSSRAPIWrapper;
exports.ensureSessionAndCall = ensureSessionAndCall;
exports.getServerActionSession = getServerActionSession;
exports.getServerComponentSession = getServerComponentSession;
exports.getServerSidePropsSession = getServerSidePropsSession;
exports.init = init;
