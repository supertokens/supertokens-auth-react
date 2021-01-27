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
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
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
                result.done
                    ? resolve(result.value)
                    : new P(function(resolve) {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function(thisArg, body) {
        var _ = {
                label: 0,
                sent: function() {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function() {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function(v) {
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
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var httpRequest_1 = __importDefault(require("../httpRequest"));
var utils_1 = require("../utils");
/*
 * Class.
 */
var RecipeModule = /** @class */ (function() {
    /*
     * Constructor.
     */
    function RecipeModule(config) {
        var _this = this;
        /*
         * Instance Methods.
         */
        this.getRecipeId = function() {
            return _this.recipeId;
        };
        this.getAppInfo = function() {
            return _this.appInfo;
        };
        this.getHttp = function() {
            return _this.httpRequest;
        };
        this.preAPIHook = function(context) {
            return __awaiter(_this, void 0, void 0, function() {
                var preAPIHook;
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            preAPIHook = this.hooks.preAPIHook;
                            if (!(preAPIHook !== undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, preAPIHook(context)];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                        case 2:
                            return [2 /*return*/, context.requestInit];
                    }
                });
            });
        };
        this.redirect = function(context, history, title, shouldReload) {
            if (shouldReload === void 0) {
                shouldReload = false;
            }
            return __awaiter(_this, void 0, void 0, function() {
                var redirectUrl, e_1;
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getRedirectionURL(context)];
                        case 1:
                            redirectUrl = _a.sent();
                            if (!(shouldReload === true)) return [3 /*break*/, 3];
                            return [4 /*yield*/, utils_1.redirectToWithReload(redirectUrl)];
                        case 2:
                            return [2 /*return*/, _a.sent()];
                        case 3:
                            _a.trys.push([3, 5, , 7]);
                            new URL(redirectUrl);
                            return [4 /*yield*/, utils_1.redirectToWithReload(redirectUrl)];
                        case 4:
                            // Otherwise, If full URL, use redirectToWithReload
                            return [2 /*return*/, _a.sent()];
                        case 5:
                            e_1 = _a.sent();
                            return [4 /*yield*/, utils_1.redirectToInApp(redirectUrl, title, history)];
                        case 6:
                            // Otherwise, redirect in app.
                            return [2 /*return*/, _a.sent()];
                        case 7:
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.getRedirectionURL = function(context) {
            return __awaiter(_this, void 0, void 0, function() {
                var redirectUrl, getRedirectionURL;
                return __generator(this, function(_a) {
                    switch (_a.label) {
                        case 0:
                            getRedirectionURL = this.hooks.getRedirectionURL;
                            if (!(getRedirectionURL !== undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, getRedirectionURL(context)];
                        case 1:
                            redirectUrl = _a.sent() || redirectUrl;
                            if (redirectUrl !== undefined) {
                                return [2 /*return*/, redirectUrl];
                            }
                            _a.label = 2;
                        case 2:
                            return [4 /*yield*/, this.getDefaultRedirectionURL(context)];
                        case 3:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        this.recipeId = config.recipeId;
        this.appInfo = config.appInfo;
        this.httpRequest = new httpRequest_1.default(this);
        this.hooks = {
            preAPIHook: config.preAPIHook,
            onHandleEvent: config.onHandleEvent,
            getRedirectionURL: config.getRedirectionURL
        };
    }
    RecipeModule.prototype.onHandleEvent = function(context) {
        var onHandleEvent = this.hooks.onHandleEvent;
        if (onHandleEvent !== undefined) {
            onHandleEvent(context);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RecipeModule.prototype.getDefaultRedirectionURL = function(context) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                throw new Error("Recipe must overwrite getDefaultRedirectionURL");
            });
        });
    };
    return RecipeModule;
})();
exports.default = RecipeModule;
