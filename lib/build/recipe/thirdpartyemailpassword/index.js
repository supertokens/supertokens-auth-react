"use strict";
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
var thirdpartyEmailpassword_1 = __importDefault(require("./thirdpartyEmailpassword"));
var emailVerification_1 = __importDefault(require("../emailverification/components/themes/emailVerification"));
exports.EmailVerificationTheme = emailVerification_1.default;
var wrapper_1 = __importDefault(require("./components/features/emailVerification/wrapper"));
exports.EmailVerification = wrapper_1.default;
var wrapper_2 = __importDefault(require("./components/features/resetPasswordUsingToken/wrapper"));
exports.ResetPasswordUsingToken = wrapper_2.default;
var resetPasswordUsingToken_1 = __importDefault(require("../emailpassword/components/themes/resetPasswordUsingToken"));
exports.ResetPasswordUsingTokenTheme = resetPasswordUsingToken_1.default;
var thirdpartyEmailpasswordAuth_1 = __importDefault(require("./thirdpartyEmailpasswordAuth"));
exports.ThirdPartyEmailPasswordAuth = thirdpartyEmailpasswordAuth_1.default;
var wrapper_3 = __importDefault(require("./components/features/signInAndUp/wrapper"));
exports.SignInAndUp = wrapper_3.default;
var signInAndUp_1 = __importDefault(require("./components/themes/signInAndUp"));
exports.SignInAndUpTheme = signInAndUp_1.default;
var thirdparty_1 = require("../thirdparty/");
exports.Apple = thirdparty_1.Apple;
exports.Google = thirdparty_1.Google;
exports.Facebook = thirdparty_1.Facebook;
exports.Github = thirdparty_1.Github;
/*
 * Class.
 */
var ThirdPartyEmailPasswordAPIWrapper = /** @class */ (function () {
    function ThirdPartyEmailPasswordAPIWrapper() {}
    /*
     * Static attributes.
     */
    ThirdPartyEmailPasswordAPIWrapper.init = function (config) {
        return thirdpartyEmailpassword_1.default.init(config);
    };
    ThirdPartyEmailPasswordAPIWrapper.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, thirdpartyEmailpassword_1.default.signOut()];
            });
        });
    };
    ThirdPartyEmailPasswordAPIWrapper.isEmailVerified = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, thirdpartyEmailpassword_1.default.isEmailVerified()];
            });
        });
    };
    ThirdPartyEmailPasswordAPIWrapper.redirectToAuth = function (show) {
        return thirdpartyEmailpassword_1.default.redirectToAuth(show);
    };
    /*
     * Providers
     */
    ThirdPartyEmailPasswordAPIWrapper.Google = thirdparty_1.Google;
    ThirdPartyEmailPasswordAPIWrapper.Apple = thirdparty_1.Apple;
    ThirdPartyEmailPasswordAPIWrapper.Facebook = thirdparty_1.Facebook;
    ThirdPartyEmailPasswordAPIWrapper.Github = thirdparty_1.Github;
    ThirdPartyEmailPasswordAPIWrapper.ThirdPartyEmailPasswordAuth = thirdpartyEmailpasswordAuth_1.default;
    ThirdPartyEmailPasswordAPIWrapper.SignInAndUp = wrapper_3.default;
    ThirdPartyEmailPasswordAPIWrapper.SignInAndUpTheme = signInAndUp_1.default;
    ThirdPartyEmailPasswordAPIWrapper.ResetPasswordUsingToken = wrapper_2.default;
    ThirdPartyEmailPasswordAPIWrapper.ResetPasswordUsingTokenTheme = resetPasswordUsingToken_1.default;
    ThirdPartyEmailPasswordAPIWrapper.EmailVerification = wrapper_1.default;
    ThirdPartyEmailPasswordAPIWrapper.EmailVerificationTheme = emailVerification_1.default;
    return ThirdPartyEmailPasswordAPIWrapper;
})();
exports.ThirdPartyEmailPasswordAPIWrapper = ThirdPartyEmailPasswordAPIWrapper;
exports.default = ThirdPartyEmailPasswordAPIWrapper;
var init = ThirdPartyEmailPasswordAPIWrapper.init;
exports.init = init;
var signOut = ThirdPartyEmailPasswordAPIWrapper.signOut;
exports.signOut = signOut;
var isEmailVerified = ThirdPartyEmailPasswordAPIWrapper.isEmailVerified;
exports.isEmailVerified = isEmailVerified;
var redirectToAuth = ThirdPartyEmailPasswordAPIWrapper.redirectToAuth;
exports.redirectToAuth = redirectToAuth;
//# sourceMappingURL=index.js.map
