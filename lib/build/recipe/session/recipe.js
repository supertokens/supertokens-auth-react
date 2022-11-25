"use strict";
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
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var recipeModule_1 = __importDefault(require("../recipeModule"));
var utils_1 = require("../../utils");
var recipe_1 = require("supertokens-web-js/recipe/session/recipe");
var utils_2 = require("../recipeModule/utils");
var superTokens_1 = __importDefault(require("../../superTokens"));
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session(config) {
        var _this = this;
        var normalizedConfig = __assign(__assign({}, config), (0, utils_2.normaliseRecipeModuleConfig)(config));
        _this = _super.call(this, normalizedConfig) || this;
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
            return _this.webJsRecipe.getUserId(input);
        };
        _this.getClaimValue = function (input) {
            return _this.webJsRecipe.getClaimValue(input);
        };
        _this.getAccessTokenPayloadSecurely = function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webJsRecipe.getAccessTokenPayloadSecurely(input)];
                });
            });
        };
        _this.doesSessionExist = function (input) {
            return _this.webJsRecipe.doesSessionExist(input);
        };
        _this.signOut = function (input) {
            return _this.webJsRecipe.signOut(input);
        };
        _this.attemptRefreshingSession = function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webJsRecipe.attemptRefreshingSession()];
                });
            });
        };
        _this.validateClaims = function (input) {
            return _this.webJsRecipe.validateClaims(input);
        };
        _this.getInvalidClaimsFromResponse = function (input) {
            return _this.webJsRecipe.getInvalidClaimsFromResponse(input);
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
            return __awaiter(_this, void 0, void 0, function () {
                var invalidClaims, invalidClaimRedirectPath, jsonContext, successContextStr, authRecipeRedirectHandler;
                return __generator(this, function (_a) {
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
                                    superTokens_1.default.getInstanceOrThrow().redirectToAuth({
                                        history: history,
                                        redirectBack: false,
                                    }),
                                ];
                            }
                            return [4 /*yield*/, this.validateClaims({ userContext: userContext })];
                        case 2:
                            invalidClaims = _a.sent();
                            invalidClaimRedirectPath = (0, utils_1.popInvalidClaimRedirectPathFromContext)(userContext);
                            if (!(invalidClaims.length > 0 && invalidClaimRedirectPath !== undefined))
                                return [3 /*break*/, 5];
                            if (!(redirectInfo !== undefined)) return [3 /*break*/, 4];
                            jsonContext = JSON.stringify(redirectInfo);
                            return [
                                4 /*yield*/,
                                (0, utils_1.setLocalStorage)("supertokens-success-redirection-context", jsonContext),
                            ];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            // then we do the redirection.
                            return [
                                2 /*return*/,
                                superTokens_1.default
                                    .getInstanceOrThrow()
                                    .redirectToUrl(invalidClaimRedirectPath, history),
                            ];
                        case 5:
                            if (!(redirectInfo === undefined)) return [3 /*break*/, 12];
                            return [
                                4 /*yield*/,
                                (0, utils_1.getLocalStorage)("supertokens-success-redirection-context"),
                            ];
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
                                (0, utils_1.removeFromLocalStorage)("supertokens-success-redirection-context"),
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
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, "/"];
                });
            });
        };
        _this.notifyListeners = function (event) {
            return __awaiter(_this, void 0, void 0, function () {
                var sessionContext;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getSessionContext(event)];
                        case 1:
                            sessionContext = _a.sent();
                            // We copy this.eventListeners into a new array to "freeze" it for the loop
                            // We do this to avoid an infinite loop in case one of the listeners causes a new listener to be added (e.g.: through re-rendering)
                            Array.from(this.eventListeners).forEach(function (listener) {
                                return listener(__assign({ sessionContext: sessionContext }, event));
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.webJsRecipe = new recipe_1.Recipe(
            __assign(__assign({}, normalizedConfig), {
                onHandleEvent: function (event) {
                    if (config.onHandleEvent !== undefined) {
                        config.onHandleEvent(event);
                    }
                    void _this.notifyListeners(event);
                },
                preAPIHook: function (context) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            response = __assign(__assign({}, context), {
                                requestInit: __assign(__assign({}, context.requestInit), {
                                    headers: __assign(__assign({}, context.requestInit.headers), {
                                        rid: config.recipeId,
                                    }),
                                }),
                            });
                            if (config.preAPIHook === undefined) {
                                return [2 /*return*/, response];
                            } else {
                                return [2 /*return*/, config.preAPIHook(context)];
                            }
                            return [2 /*return*/];
                        });
                    });
                },
            })
        );
        return _this;
    }
    Session.prototype.getSessionContext = function (_a) {
        var action = _a.action,
            userContext = _a.userContext;
        return __awaiter(this, void 0, void 0, function () {
            var _b, userId, accessTokenPayload;
            return __generator(this, function (_c) {
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
        return recipe_1.Recipe.addAxiosInterceptors(axiosInstance, userContext);
    };
    Session.init = function (config) {
        return function (appInfo, enableDebugLogs) {
            Session.instance = new Session(
                __assign(__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: Session.RECIPE_ID,
                    enableDebugLogs: enableDebugLogs,
                })
            );
            return Session.instance;
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
        if (!(0, utils_1.isTest)()) {
            return;
        }
        Session.instance = undefined;
        return;
    };
    Session.RECIPE_ID = "session";
    return Session;
})(recipeModule_1.default);
exports.default = Session;
