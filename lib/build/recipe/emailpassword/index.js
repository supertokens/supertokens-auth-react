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
exports.EmailVerificationTheme =
    exports.EmailVerification =
    exports.ResetPasswordUsingTokenTheme =
    exports.ResetPasswordUsingToken =
    exports.doesEmailExist =
    exports.signIn =
    exports.signUp =
    exports.sendPasswordResetEmail =
    exports.submitNewPassword =
    exports.redirectToAuth =
    exports.signOut =
    exports.SignInAndUpTheme =
    exports.SignInAndUp =
    exports.sendVerificationEmail =
    exports.verifyEmail =
    exports.isEmailVerified =
    exports.init =
    exports.EmailPasswordAuth =
        void 0;
var tslib_1 = require("tslib");
var recipe_1 = tslib_1.__importDefault(require("./recipe"));
var emailPasswordAuth_1 = tslib_1.__importDefault(require("./emailPasswordAuth"));
exports.EmailPasswordAuth = emailPasswordAuth_1.default;
var signInAndUp_1 = tslib_1.__importDefault(require("./components/themes/signInAndUp"));
exports.SignInAndUpTheme = signInAndUp_1.default;
var resetPasswordUsingToken_1 = tslib_1.__importDefault(require("./components/themes/resetPasswordUsingToken"));
exports.ResetPasswordUsingTokenTheme = resetPasswordUsingToken_1.default;
var emailVerification_1 = tslib_1.__importDefault(require("../emailverification/components/themes/emailVerification"));
exports.EmailVerificationTheme = emailVerification_1.default;
var utils_1 = require("../../utils");
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    Wrapper.signOut = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, recipe_1.default.getInstanceOrThrow().signOut()];
            });
        });
    };
    Wrapper.isEmailVerified = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default
                        .getInstanceOrThrow()
                        .emailVerification.isEmailVerified(
                            (0, utils_1.getNormalisedUserContext)(
                                input === null || input === void 0 ? void 0 : input.userContext
                            )
                        ),
                ];
            });
        });
    };
    Wrapper.verifyEmail = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().emailVerification.recipeImpl.verifyEmail({
                        userContext: (0, utils_1.getNormalisedUserContext)(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.sendVerificationEmail = function (input) {
        return recipe_1.default.getInstanceOrThrow().emailVerification.recipeImpl.sendVerificationEmail({
            userContext: (0, utils_1.getNormalisedUserContext)(
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
    Wrapper.submitNewPassword = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.submitNewPassword(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.sendPasswordResetEmail = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.signUp = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.signUp(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.signIn = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.signIn(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.doesEmailExist = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.doesEmailExist(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.EmailPasswordAuth = emailPasswordAuth_1.default;
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
var submitNewPassword = Wrapper.submitNewPassword;
exports.submitNewPassword = submitNewPassword;
var sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
var signUp = Wrapper.signUp;
exports.signUp = signUp;
var signIn = Wrapper.signIn;
exports.signIn = signIn;
var doesEmailExist = Wrapper.doesEmailExist;
exports.doesEmailExist = doesEmailExist;
var SignInAndUp = Wrapper.SignInAndUp;
exports.SignInAndUp = SignInAndUp;
var ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;
exports.ResetPasswordUsingToken = ResetPasswordUsingToken;
var EmailVerification = Wrapper.EmailVerification;
exports.EmailVerification = EmailVerification;
