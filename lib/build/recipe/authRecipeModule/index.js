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
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
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
                result.done
                    ? resolve(result.value)
                    : new P(function (resolve) {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
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
var session_1 = __importDefault(require("../session/session"));
var recipeModule_1 = __importDefault(require("../recipeModule"));
var api_1 = require("./api");
var utils_1 = require("./utils");
var emailverification_1 = __importDefault(require("../emailverification"));
/*
 * Class.
 */
var AuthRecipeModule = /** @class */ (function (_super) {
    __extends(AuthRecipeModule, _super);
    /*
     * Constructor.
     */
    function AuthRecipeModule(config, normalisedChildClassConfig) {
        var _this = _super.call(this, config) || this;
        _this.getAuthRecipeModuleDefaultRedirectionURL = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (context.action) {
                        case "SIGN_IN_AND_UP":
                            return [
                                2 /*return*/,
                                this.appInfo.websiteBasePath.getAsStringDangerous() + "?rid=" + this.recipeId,
                            ];
                        case "SUCCESS":
                            return [2 /*return*/, context.redirectToPath === undefined ? "/" : context.redirectToPath];
                        case "VERIFY_EMAIL": {
                            if (this.emailVerification === undefined) {
                                return [2 /*return*/, "/"];
                            }
                            return [2 /*return*/, this.emailVerification.getEmailVerificationDefaultURL(context)];
                        }
                    }
                    return [2 /*return*/];
                });
            });
        };
        _this.getAuthRecipeModuleFeatures = function () {
            var features = {};
            if (_this.emailVerification !== undefined) {
                features = _this.emailVerification.getFeatures();
            }
            return features;
        };
        /*
         * getConfig
         */
        _this.getConfig = function () {
            return _this.config;
        };
        /*
         * SignOut.
         */
        _this.signOut = function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, api_1.signOut(this)];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /*
         * Session
         */
        _this.doesSessionExist = function () {
            return session_1.default.getInstanceOrThrow().doesSessionExist();
        };
        _this.config = __assign({}, utils_1.normaliseAuthRecipeModuleConfig(config), normalisedChildClassConfig);
        if (_this.config.emailVerificationFeature.mode === "REQUIRED") {
            _this.emailVerification = new emailverification_1.default(
                __assign(
                    {},
                    _this.config.emailVerificationFeature,
                    { palette: _this.config.palette, useShadowDom: _this.config.useShadowDom },
                    _this.hooks,
                    { appInfo: _this.appInfo, recipeId: _this.recipeId, signOut: _this.signOut }
                )
            );
        }
        return _this;
    }
    /*
     * Email Verification
     */
    AuthRecipeModule.prototype.isEmailVerified = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.emailVerification === undefined) {
                            throw new Error(
                                "You need to set emailVerificationFeature mode to required to use this method."
                            );
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.emailVerification.isEmailVerified()];
                    case 1:
                        return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthRecipeModule.prototype.isEmailVerificationRequired = function () {
        return this.emailVerification !== undefined && this.emailVerification.config.mode === "REQUIRED";
    };
    return AuthRecipeModule;
})(recipeModule_1.default);
exports.default = AuthRecipeModule;
//# sourceMappingURL=index.js.map
