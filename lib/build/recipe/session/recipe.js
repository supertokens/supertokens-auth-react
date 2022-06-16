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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*
 * Imports.
 */
var recipeModule_1 = tslib_1.__importDefault(require("../recipeModule"));
var utils_1 = require("../../utils");
var recipe_1 = require("supertokens-web-js/recipe/session/recipe");
var Session = /** @class */ (function (_super) {
    tslib_1.__extends(Session, _super);
    function Session(config) {
        var _this = _super.call(this, config) || this;
        _this.eventListeners = new Set();
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
        _this.getAccessTokenPayloadSecurely = function (input) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
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
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2 /*return*/, this.webJsRecipe.attemptRefreshingSession()];
                });
            });
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
        _this.notifyListeners = function (event) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var sessionContext;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getSessionContext(event)];
                        case 1:
                            sessionContext = _a.sent();
                            this.eventListeners.forEach(function (listener) {
                                return listener(tslib_1.__assign({ sessionContext: sessionContext }, event));
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.webJsRecipe = new recipe_1.Recipe(
            tslib_1.__assign(tslib_1.__assign({}, config), {
                onHandleEvent: function (event) {
                    if (config.onHandleEvent !== undefined) {
                        config.onHandleEvent(event);
                    }
                    void _this.notifyListeners(event);
                },
                preAPIHook: function (context) {
                    return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var response;
                        return tslib_1.__generator(this, function (_a) {
                            response = tslib_1.__assign(tslib_1.__assign({}, context), {
                                requestInit: tslib_1.__assign(tslib_1.__assign({}, context.requestInit), {
                                    headers: tslib_1.__assign(tslib_1.__assign({}, context.requestInit.headers), {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _b, userId, accessTokenPayload;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (
                            !(
                                action === "SESSION_CREATED" ||
                                action === "REFRESH_SESSION" ||
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
                tslib_1.__assign(tslib_1.__assign({}, config), {
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
