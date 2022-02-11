"use strict";
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
var recipe_1 = __importDefault(require("./recipe"));
var emailVerification_1 = __importDefault(require("../emailverification/components/themes/emailVerification"));
exports.EmailVerificationTheme = emailVerification_1.default;
var resetPasswordUsingToken_1 = __importDefault(require("../emailpassword/components/themes/resetPasswordUsingToken"));
exports.ResetPasswordUsingTokenTheme = resetPasswordUsingToken_1.default;
var thirdpartyEmailpasswordAuth_1 = __importDefault(require("./thirdpartyEmailpasswordAuth"));
exports.ThirdPartyEmailPasswordAuth = thirdpartyEmailpasswordAuth_1.default;
var signInAndUp_1 = __importDefault(require("./components/themes/signInAndUp"));
exports.SignInAndUpTheme = signInAndUp_1.default;
var thirdparty_1 = require("../thirdparty/");
exports.Apple = thirdparty_1.Apple;
exports.Google = thirdparty_1.Google;
exports.Facebook = thirdparty_1.Facebook;
exports.Github = thirdparty_1.Github;
var utils_1 = require("../../utils");
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    Wrapper.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, recipe_1.default.getInstanceOrThrow().signOut()];
            });
        });
    };
    Wrapper.isEmailVerified = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default
                        .getInstanceOrThrow()
                        .emailVerification.isEmailVerified(
                            utils_1.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            )
                        ),
                ];
            });
        });
    };
    Wrapper.verifyEmail = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return __generator(this, function (_a) {
                recipeInstance = recipe_1.default.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    recipeInstance.emailVerification.recipeImpl.verifyEmail({
                        token: input.token,
                        config: recipeInstance.emailVerification.config,
                        userContext: utils_1.getNormalisedUserContext(input.userContext),
                    }),
                ];
            });
        });
    };
    Wrapper.sendVerificationEmail = function (input) {
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.emailVerification.recipeImpl.sendVerificationEmail({
            config: recipeInstance.emailVerification.config,
            userContext: utils_1.getNormalisedUserContext(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    };
    // have backwards compatibility to allow input as "signin" | "signup"
    Wrapper.redirectToAuth = function (input) {
        if (input === undefined || typeof input === "string") {
            return recipe_1.default.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input);
        } else {
            if (input.redirectBack === false || input.redirectBack === undefined) {
                return recipe_1.default.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input.show);
            } else {
                return recipe_1.default.getInstanceOrThrow().redirectToAuthWithRedirectToPath(input.show);
            }
        }
    };
    Wrapper.Google = thirdparty_1.Google;
    Wrapper.Apple = thirdparty_1.Apple;
    Wrapper.Facebook = thirdparty_1.Facebook;
    Wrapper.Github = thirdparty_1.Github;
    Wrapper.ThirdPartyEmailPasswordAuth = thirdpartyEmailpasswordAuth_1.default;
    Wrapper.SignInAndUp = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    };
    Wrapper.SignInAndUpTheme = signInAndUp_1.default;
    Wrapper.ResetPasswordUsingToken = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("resetpassword", prop);
    };
    Wrapper.ResetPasswordUsingTokenTheme = resetPasswordUsingToken_1.default;
    Wrapper.EmailVerification = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    };
    Wrapper.EmailVerificationTheme = emailVerification_1.default;
    return Wrapper;
})();
exports.default = Wrapper;
var init = Wrapper.init;
exports.init = init;
var signOut = Wrapper.signOut;
exports.signOut = signOut;
var isEmailVerified = Wrapper.isEmailVerified;
exports.isEmailVerified = isEmailVerified;
var verifyEmail = Wrapper.verifyEmail;
exports.verifyEmail = verifyEmail;
var sendVerificationEmail = Wrapper.sendVerificationEmail;
exports.sendVerificationEmail = sendVerificationEmail;
var redirectToAuth = Wrapper.redirectToAuth;
exports.redirectToAuth = redirectToAuth;
var SignInAndUp = Wrapper.SignInAndUp;
exports.SignInAndUp = SignInAndUp;
var EmailVerification = Wrapper.EmailVerification;
exports.EmailVerification = EmailVerification;
var ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;
exports.ResetPasswordUsingToken = ResetPasswordUsingToken;
