"use strict";

var utils = require("./utils.js");
var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
var utils$1 = require("./recipeModule-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var WebJSSessionRecipe__default = /*#__PURE__*/ _interopDefault(WebJSSessionRecipe);

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var Session = /** @class */ (function (_super) {
    utils.__extends(Session, _super);
    function Session(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = WebJSSessionRecipe__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.eventListeners = new Set();
        _this.redirectionHandlersFromAuthRecipes = new Map();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _this.getFeatureComponent = function (_) {
            throw new Error("should never come here");
        };
        _this.getFeatures = function () {
            return {};
        };
        _this.getUserId = function (input) {
            return _this.webJSRecipe.getUserId(input);
        };
        _this.getAccessToken = function (input) {
            return _this.webJSRecipe.getAccessToken(input);
        };
        _this.getClaimValue = function (input) {
            return _this.webJSRecipe.getClaimValue(input);
        };
        _this.getAccessTokenPayloadSecurely = function (input) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, this.webJSRecipe.getAccessTokenPayloadSecurely(input)];
                });
            });
        };
        _this.doesSessionExist = function (input) {
            return _this.webJSRecipe.doesSessionExist(input);
        };
        _this.signOut = function (input) {
            return _this.webJSRecipe.signOut(input);
        };
        _this.attemptRefreshingSession = function () {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, this.webJSRecipe.attemptRefreshingSession()];
                });
            });
        };
        _this.validateClaims = function (input) {
            return _this.webJSRecipe.validateClaims(input);
        };
        _this.getInvalidClaimsFromResponse = function (input) {
            return _this.webJSRecipe.getInvalidClaimsFromResponse(input);
        };
        /**
         * @returns Function to remove event listener
         */
        _this.addEventListener = function (listener) {
            _this.eventListeners.add(listener);
            return function () {
                return _this.eventListeners.delete(listener);
            };
        };
        _this.addAuthRecipeRedirectionHandler = function (rid, redirect) {
            _this.redirectionHandlersFromAuthRecipes.set(rid, redirect);
        };
        _this.validateGlobalClaimsAndHandleSuccessRedirection = function (redirectInfo, userContext, history) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                var invalidClaims, invalidClaimRedirectPath, jsonContext, successContextStr, authRecipeRedirectHandler;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.doesSessionExist({ userContext: userContext })];
                        case 1:
                            // First we check if there is an active session
                            if (!_a.sent()) {
                                // If there is none, we have no way of checking claims, so we redirect to the auth page
                                // This can happen e.g.: if the user clicked on the email verification link in a browser without an active session
                                return [
                                    2 /*return*/,
                                    utils$1.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        history: history,
                                        redirectBack: false,
                                    }),
                                ];
                            }
                            return [4 /*yield*/, this.validateClaims({ userContext: userContext })];
                        case 2:
                            invalidClaims = _a.sent();
                            invalidClaimRedirectPath = utils.popInvalidClaimRedirectPathFromContext(userContext);
                            if (!(invalidClaims.length > 0 && invalidClaimRedirectPath !== undefined))
                                return [3 /*break*/, 5];
                            if (!(redirectInfo !== undefined)) return [3 /*break*/, 4];
                            jsonContext = JSON.stringify(redirectInfo);
                            return [
                                4 /*yield*/,
                                utils.setLocalStorage("supertokens-success-redirection-context", jsonContext),
                            ];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            // then we do the redirection.
                            return [
                                2 /*return*/,
                                utils$1.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                    invalidClaimRedirectPath,
                                    history
                                ),
                            ];
                        case 5:
                            if (!(redirectInfo === undefined)) return [3 /*break*/, 12];
                            return [4 /*yield*/, utils.getLocalStorage("supertokens-success-redirection-context")];
                        case 6:
                            successContextStr = _a.sent();
                            if (!(successContextStr !== null)) return [3 /*break*/, 11];
                            _a.label = 7;
                        case 7:
                            _a.trys.push([7, , 8, 10]);
                            redirectInfo = JSON.parse(successContextStr);
                            return [3 /*break*/, 10];
                        case 8:
                            return [
                                4 /*yield*/,
                                utils.removeFromLocalStorage("supertokens-success-redirection-context"),
                            ];
                        case 9:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 10:
                            return [3 /*break*/, 12];
                        case 11:
                            // If there was nothing in localstorage we set a default
                            // this can happen if the user visited email verification screen without an auth recipe redirecting them there
                            // but already had the email verified and an active session
                            redirectInfo = {
                                rid: Session.RECIPE_ID,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: false,
                                },
                            };
                            _a.label = 12;
                        case 12:
                            authRecipeRedirectHandler = this.redirectionHandlersFromAuthRecipes.get(redirectInfo.rid);
                            if (authRecipeRedirectHandler !== undefined) {
                                // and call it with the saved info
                                return [
                                    2 /*return*/,
                                    authRecipeRedirectHandler(redirectInfo.successRedirectContext, history),
                                ];
                            }
                            // This should only happen if the configuration changed between saving the context and finishing the sign in process
                            // or if the user navigated to a page where they were expected to have a stored redirectInfo but didn't
                            // (e.g.: pressed back after email verification)
                            return [2 /*return*/, this.redirect(redirectInfo.successRedirectContext, history)];
                    }
                });
            });
        };
        /**
         * This should only get called if validateGlobalClaimsAndHandleSuccessRedirection couldn't get a redirectInfo
         * @returns "/"
         */
        _this.getDefaultRedirectionURL = function () {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, "/"];
                });
            });
        };
        _this.notifyListeners = function (event) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                var sessionContext;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getSessionContext(event)];
                        case 1:
                            sessionContext = _a.sent();
                            // We copy this.eventListeners into a new array to "freeze" it for the loop
                            // We do this to avoid an infinite loop in case one of the listeners causes a new listener to be added (e.g.: through re-rendering)
                            Array.from(this.eventListeners).forEach(function (listener) {
                                return listener(utils.__assign({ sessionContext: sessionContext }, event));
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        return _this;
    }
    Session.prototype.getSessionContext = function (_a) {
        var action = _a.action,
            userContext = _a.userContext;
        return utils.__awaiter(this, void 0, void 0, function () {
            var _b, userId, accessTokenPayload;
            return utils.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (
                            !(
                                action === "SESSION_CREATED" ||
                                action === "REFRESH_SESSION" ||
                                action === "API_INVALID_CLAIM" ||
                                action === "ACCESS_TOKEN_PAYLOAD_UPDATED"
                            )
                        )
                            return [3 /*break*/, 2];
                        return [
                            4 /*yield*/,
                            Promise.all([
                                this.getUserId({
                                    userContext: userContext,
                                }),
                                this.getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ]),
                        ];
                    case 1:
                        (_b = _c.sent()), (userId = _b[0]), (accessTokenPayload = _b[1]);
                        return [
                            2 /*return*/,
                            {
                                doesSessionExist: true,
                                accessTokenPayload: accessTokenPayload,
                                userId: userId,
                            },
                        ];
                    case 2:
                        if (action === "SIGN_OUT" || action === "UNAUTHORISED") {
                            return [
                                2 /*return*/,
                                {
                                    doesSessionExist: false,
                                    accessTokenPayload: {},
                                    userId: "",
                                },
                            ];
                        }
                        throw new Error("Unhandled recipe event: ".concat(action));
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    Session.addAxiosInterceptors = function (axiosInstance, userContext) {
        return WebJSSessionRecipe__default.default.addAxiosInterceptors(axiosInstance, userContext);
    };
    Session.init = function (config) {
        var _this = this;
        var normalisedConfig = utils$1.normaliseRecipeModuleConfig(config);
        return {
            authReact: function (appInfo, enableDebugLogs) {
                Session.instance = new Session(
                    utils.__assign(utils.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: Session.RECIPE_ID,
                        enableDebugLogs: enableDebugLogs,
                    })
                );
                return Session.instance;
            },
            webJS: WebJSSessionRecipe__default.default.init(
                utils.__assign(utils.__assign({}, normalisedConfig), {
                    onHandleEvent: function (event) {
                        if (normalisedConfig.onHandleEvent !== undefined) {
                            normalisedConfig.onHandleEvent(event);
                        }
                        void Session.getInstanceOrThrow().notifyListeners(event);
                    },
                    preAPIHook: function (context) {
                        return utils.__awaiter(_this, void 0, void 0, function () {
                            var response;
                            return utils.__generator(this, function (_a) {
                                response = utils.__assign(utils.__assign({}, context), {
                                    requestInit: utils.__assign(utils.__assign({}, context.requestInit), {
                                        headers: utils.__assign(utils.__assign({}, context.requestInit.headers), {
                                            rid: Session.RECIPE_ID,
                                        }),
                                    }),
                                });
                                if (normalisedConfig.preAPIHook === undefined) {
                                    return [2 /*return*/, response];
                                } else {
                                    return [2 /*return*/, normalisedConfig.preAPIHook(context)];
                                }
                            });
                        });
                    },
                })
            ),
        };
    };
    Session.getInstanceOrThrow = function () {
        if (Session.instance === undefined) {
            throw Error(
                "No instance of Session found. Make sure to call the Session.init method. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        return Session.instance;
    };
    Session.getInstance = function () {
        return Session.instance;
    };
    Session.reset = function () {
        if (!utils.isTest()) {
            return;
        }
        Session.instance = undefined;
        return;
    };
    Session.RECIPE_ID = "session";
    return Session;
})(utils$1.RecipeModule);

exports.Session = Session;
//# sourceMappingURL=session-shared2.js.map
