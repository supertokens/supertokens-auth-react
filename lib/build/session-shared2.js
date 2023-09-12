"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
var index = require("./recipeModule-shared.js");
var utils = require("supertokens-web-js/utils");

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
function normaliseSessionConfig(config) {
    var _a, _b;
    if (config === undefined) {
        config = {};
    }
    var accessDeniedScreenStyle =
        (_b = (_a = config.accessDeniedScreen) === null || _a === void 0 ? void 0 : _a.style) !== null && _b !== void 0
            ? _b
            : "";
    var accessDeniedScreen = {
        style: accessDeniedScreenStyle,
    };
    var override = genericComponentOverrideContext.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign(
            {},
            genericComponentOverrideContext.normaliseRecipeModuleConfig(config)
        ),
        { accessDeniedScreen: accessDeniedScreen, override: override }
    );
}
var getFailureRedirectionInfo = function (_a) {
    var invalidClaims = _a.invalidClaims,
        overrideGlobalClaimValidators = _a.overrideGlobalClaimValidators,
        userContext = _a.userContext;
    return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
        var globalValidators, failedClaim, _loop_1, _i, globalValidators_1, validator, state_1;
        return genericComponentOverrideContext.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    globalValidators = utils.getGlobalClaimValidators({
                        overrideGlobalClaimValidators: overrideGlobalClaimValidators,
                        userContext: userContext,
                    });
                    failedClaim = undefined;
                    _loop_1 = function (validator) {
                        var claim, failureCallback, redirectPath;
                        return genericComponentOverrideContext.__generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    claim = invalidClaims.find(function (c) {
                                        return c.validatorId === validator.id;
                                    });
                                    if (!(claim !== undefined)) return [3 /*break*/, 2];
                                    failureCallback = validator.onFailureRedirection;
                                    if (!failureCallback) return [3 /*break*/, 2];
                                    return [
                                        4 /*yield*/,
                                        failureCallback({ reason: claim.reason, userContext: userContext }),
                                    ];
                                case 1:
                                    redirectPath = _c.sent();
                                    if (redirectPath !== undefined) {
                                        return [
                                            2 /*return*/,
                                            {
                                                value: {
                                                    redirectPath: redirectPath,
                                                    failedClaim: claim,
                                                },
                                            },
                                        ];
                                    }
                                    _c.label = 2;
                                case 2:
                                    if (validator.showAccessDeniedOnFailure !== false && failedClaim === undefined) {
                                        failedClaim = claim;
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    (_i = 0), (globalValidators_1 = globalValidators);
                    _b.label = 1;
                case 1:
                    if (!(_i < globalValidators_1.length)) return [3 /*break*/, 4];
                    validator = globalValidators_1[_i];
                    return [5 /*yield**/, _loop_1(validator)];
                case 2:
                    state_1 = _b.sent();
                    if (typeof state_1 === "object") return [2 /*return*/, state_1.value];
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    return [
                        2 /*return*/,
                        {
                            redirectPath: undefined,
                            failedClaim: failedClaim,
                        },
                    ];
            }
        });
    });
};

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
    genericComponentOverrideContext.__extends(Session, _super);
    function Session(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = WebJSSessionRecipe__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Session.RECIPE_ID;
        _this.eventListeners = new Set();
        _this.redirectionHandlersFromAuthRecipes = new Map();
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
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
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
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
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
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var invalidClaims, jsonContext, failureRedirectInfo, successContextStr, authRecipeRedirectHandler;
                return genericComponentOverrideContext.__generator(this, function (_a) {
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
                                    genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        history: history,
                                        redirectBack: false,
                                    }),
                                ];
                            }
                            return [4 /*yield*/, this.validateClaims({ userContext: userContext })];
                        case 2:
                            invalidClaims = _a.sent();
                            if (!(invalidClaims.length > 0)) return [3 /*break*/, 6];
                            if (!(redirectInfo !== undefined)) return [3 /*break*/, 4];
                            jsonContext = JSON.stringify(redirectInfo);
                            return [
                                4 /*yield*/,
                                genericComponentOverrideContext.setLocalStorage(
                                    "supertokens-success-redirection-context",
                                    jsonContext
                                ),
                            ];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            return [
                                4 /*yield*/,
                                getFailureRedirectionInfo({
                                    invalidClaims: invalidClaims,
                                    userContext: userContext,
                                }),
                            ];
                        case 5:
                            failureRedirectInfo = _a.sent();
                            // if redirectPath is string that means failed claim had callback that returns path, we redirect there otherwise continue
                            if (failureRedirectInfo.redirectPath !== undefined) {
                                return [
                                    2 /*return*/,
                                    genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToUrl(
                                        failureRedirectInfo.redirectPath,
                                        history
                                    ),
                                ];
                            }
                            _a.label = 6;
                        case 6:
                            if (!(redirectInfo === undefined)) return [3 /*break*/, 13];
                            return [
                                4 /*yield*/,
                                genericComponentOverrideContext.getLocalStorage(
                                    "supertokens-success-redirection-context"
                                ),
                            ];
                        case 7:
                            successContextStr = _a.sent();
                            if (!(successContextStr !== null)) return [3 /*break*/, 12];
                            _a.label = 8;
                        case 8:
                            _a.trys.push([8, , 9, 11]);
                            redirectInfo = JSON.parse(successContextStr);
                            return [3 /*break*/, 11];
                        case 9:
                            return [
                                4 /*yield*/,
                                genericComponentOverrideContext.removeFromLocalStorage(
                                    "supertokens-success-redirection-context"
                                ),
                            ];
                        case 10:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 11:
                            return [3 /*break*/, 13];
                        case 12:
                            // If there was nothing in localstorage we set a default
                            // this can happen if the user visited email verification screen without an auth recipe redirecting them there
                            // but already had the email verified and an active session
                            redirectInfo = {
                                rid: Session.RECIPE_ID,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewRecipeUser: false,
                                    user: undefined,
                                },
                            };
                            _a.label = 13;
                        case 13:
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
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [2 /*return*/, "/"];
                });
            });
        };
        _this.notifyListeners = function (event) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var sessionContext;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getSessionContext(event)];
                        case 1:
                            sessionContext = _a.sent();
                            // We copy this.eventListeners into a new array to "freeze" it for the loop
                            // We do this to avoid an infinite loop in case one of the listeners causes a new listener to be added (e.g.: through re-rendering)
                            Array.from(this.eventListeners).forEach(function (listener) {
                                return listener(
                                    genericComponentOverrideContext.__assign({ sessionContext: sessionContext }, event)
                                );
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
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            var _b, userId, accessTokenPayload;
            return genericComponentOverrideContext.__generator(this, function (_c) {
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
        var normalisedConfig = normaliseSessionConfig(config);
        return {
            recipeID: Session.RECIPE_ID,
            authReact: function (appInfo) {
                Session.instance = new Session(
                    genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, normalisedConfig),
                        { appInfo: appInfo, recipeId: Session.RECIPE_ID }
                    )
                );
                return Session.instance;
            },
            webJS: WebJSSessionRecipe__default.default.init(
                genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, normalisedConfig),
                    {
                        onHandleEvent: function (event) {
                            if (normalisedConfig.onHandleEvent !== undefined) {
                                normalisedConfig.onHandleEvent(event);
                            }
                            void Session.getInstanceOrThrow().notifyListeners(event);
                        },
                        preAPIHook: function (context) {
                            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                                var response;
                                return genericComponentOverrideContext.__generator(this, function (_a) {
                                    response = genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, context),
                                        {
                                            requestInit: genericComponentOverrideContext.__assign(
                                                genericComponentOverrideContext.__assign({}, context.requestInit),
                                                {
                                                    headers: genericComponentOverrideContext.__assign(
                                                        genericComponentOverrideContext.__assign(
                                                            {},
                                                            context.requestInit.headers
                                                        ),
                                                        { rid: Session.RECIPE_ID }
                                                    ),
                                                }
                                            ),
                                        }
                                    );
                                    if (normalisedConfig.preAPIHook === undefined) {
                                        return [2 /*return*/, response];
                                    } else {
                                        return [2 /*return*/, normalisedConfig.preAPIHook(context)];
                                    }
                                });
                            });
                        },
                    }
                )
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
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Session.instance = undefined;
        return;
    };
    Session.RECIPE_ID = "session";
    return Session;
})(index.RecipeModule);

exports.Session = Session;
exports.getFailureRedirectionInfo = getFailureRedirectionInfo;
