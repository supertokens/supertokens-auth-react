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
var recipeModule_1 = __importDefault(require("../recipeModule"));
var emailVerification_1 = __importDefault(require("./components/features/emailVerification"));
var normalisedURLPath_1 = __importDefault(require("../../normalisedURLPath"));
var constants_1 = require("./constants");
var api_1 = require("./components/features/emailVerification/api");
var superTokens_1 = __importDefault(require("../../superTokens"));
var utils_1 = require("../../utils");
/*
 * Class.
 */
var EmailVerification = /** @class */ (function (_super) {
    __extends(EmailVerification, _super);
    /*
     * Constructor.
     */
    function EmailVerification(config) {
        var _this = _super.call(this, config) || this;
        /*
         * Instance methods.
         */
        _this.getFeatures = function () {
            var features = {};
            if (_this.config.mode !== "OFF" && _this.config.disableDefaultImplementation !== true) {
                var normalisedFullPath = _this.appInfo.websiteBasePath.appendPath(
                    new normalisedURLPath_1.default(constants_1.DEFAULT_VERIFY_EMAIL_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: utils_1.matchRecipeIdUsingQueryParams(_this.recipeId),
                    rid: _this.recipeId,
                    component: emailVerification_1.default,
                };
            }
            return features;
        };
        _this.config = config;
        return _this;
    }
    /*
     * Email Verification
     */
    EmailVerification.prototype.isEmailVerified = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, api_1.isEmailVerifiedAPI(this)];
                    case 1:
                        return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EmailVerification.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, this.config.signOut()];
                    case 1:
                        return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EmailVerification.prototype.getDefaultRedirectionURL = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            superTokens_1.default
                                .getInstanceOrThrow()
                                .getRecipeOrThrow(this.recipeId)
                                .getDefaultRedirectionURL(context),
                        ];
                    case 1:
                        return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EmailVerification.prototype.getEmailVerificationDefaultURL = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var verifyEmailPath;
            return __generator(this, function (_a) {
                if (context.action !== "VERIFY_EMAIL") {
                    return [2 /*return*/, "/"];
                }
                verifyEmailPath = new normalisedURLPath_1.default(constants_1.DEFAULT_VERIFY_EMAIL_PATH);
                return [
                    2 /*return*/,
                    this.appInfo.websiteBasePath.appendPath(verifyEmailPath).getAsStringDangerous() +
                        "?rid=" +
                        this.recipeId,
                ];
            });
        });
    };
    return EmailVerification;
})(recipeModule_1.default);
exports.default = EmailVerification;
//# sourceMappingURL=index.js.map
