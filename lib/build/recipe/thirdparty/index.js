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
 * Import
 */
// /!\ ThirdParty must be imported before any of the providers to prevent circular dependencies.
var thirdparty_1 = __importDefault(require("./thirdparty"));
var emailVerification_1 = __importDefault(require("../emailverification/components/themes/emailVerification"));
exports.EmailVerificationTheme = emailVerification_1.default;
var wrapper_1 = __importDefault(require("./components/features/emailVerification/wrapper"));
exports.EmailVerification = wrapper_1.default;
var thirdpartyAuth_1 = __importDefault(require("./thirdpartyAuth"));
exports.ThirdPartyAuth = thirdpartyAuth_1.default;
var wrapper_2 = __importDefault(require("./components/features/signInAndUp/wrapper"));
exports.SignInAndUp = wrapper_2.default;
var signInAndUp_1 = __importDefault(require("./components/themes/signInAndUp"));
exports.SignInAndUpTheme = signInAndUp_1.default;
var apple_1 = __importDefault(require("./providers/apple"));
exports.Apple = apple_1.default;
var google_1 = __importDefault(require("./providers/google"));
exports.Google = google_1.default;
var facebook_1 = __importDefault(require("./providers/facebook"));
exports.Facebook = facebook_1.default;
var github_1 = __importDefault(require("./providers/github"));
exports.Github = github_1.default;
/*
 * Class.
 */
var ThirdPartyAPIWrapper = /** @class */ (function () {
    function ThirdPartyAPIWrapper() {}
    /*
     * Static attributes.
     */
    ThirdPartyAPIWrapper.init = function (config) {
        return thirdparty_1.default.init(config);
    };
    ThirdPartyAPIWrapper.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, thirdparty_1.default.signOut()];
            });
        });
    };
    ThirdPartyAPIWrapper.isEmailVerified = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, thirdparty_1.default.isEmailVerified()];
            });
        });
    };
    ThirdPartyAPIWrapper.redirectToAuth = function (show) {
        return thirdparty_1.default.redirectToAuth(show);
    };
    /*
     * Providers
     */
    ThirdPartyAPIWrapper.Google = google_1.default;
    ThirdPartyAPIWrapper.Apple = apple_1.default;
    ThirdPartyAPIWrapper.Facebook = facebook_1.default;
    ThirdPartyAPIWrapper.Github = github_1.default;
    ThirdPartyAPIWrapper.ThirdPartyAuth = thirdpartyAuth_1.default;
    ThirdPartyAPIWrapper.SignInAndUp = wrapper_2.default;
    ThirdPartyAPIWrapper.SignInAndUpTheme = signInAndUp_1.default;
    ThirdPartyAPIWrapper.EmailVerification = wrapper_1.default;
    ThirdPartyAPIWrapper.EmailVerificationTheme = emailVerification_1.default;
    return ThirdPartyAPIWrapper;
})();
exports.ThirdPartyAPIWrapper = ThirdPartyAPIWrapper;
exports.default = ThirdPartyAPIWrapper;
var init = ThirdPartyAPIWrapper.init;
exports.init = init;
var signOut = ThirdPartyAPIWrapper.signOut;
exports.signOut = signOut;
var isEmailVerified = ThirdPartyAPIWrapper.isEmailVerified;
exports.isEmailVerified = isEmailVerified;
var redirectToAuth = ThirdPartyAPIWrapper.redirectToAuth;
exports.redirectToAuth = redirectToAuth;
//# sourceMappingURL=index.js.map
