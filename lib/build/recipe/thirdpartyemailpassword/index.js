"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
var recipe_1 = tslib_1.__importDefault(require("./recipe"));
var emailVerification_1 = tslib_1.__importDefault(require("../emailverification/components/themes/emailVerification"));
exports.EmailVerificationTheme = emailVerification_1.default;
var resetPasswordUsingToken_1 = tslib_1.__importDefault(
    require("../emailpassword/components/themes/resetPasswordUsingToken")
);
exports.ResetPasswordUsingTokenTheme = resetPasswordUsingToken_1.default;
var thirdpartyEmailpasswordAuth_1 = tslib_1.__importDefault(require("./thirdpartyEmailpasswordAuth"));
exports.ThirdPartyEmailPasswordAuth = thirdpartyEmailpasswordAuth_1.default;
var signInAndUp_1 = tslib_1.__importDefault(require("./components/themes/signInAndUp"));
exports.SignInAndUpTheme = signInAndUp_1.default;
var thirdparty_1 = require("../thirdparty/");
exports.Apple = thirdparty_1.Apple;
exports.Google = thirdparty_1.Google;
exports.Facebook = thirdparty_1.Facebook;
exports.Github = thirdparty_1.Github;
var utils_1 = require("../../utils");
var utils_2 = require("../thirdparty/utils");
var signInAndUpCallback_1 = require("../thirdparty/components/themes/signInAndUpCallback");
exports.ThirdPartySignInAndUpCallbackTheme = signInAndUpCallback_1.SignInAndUpCallbackTheme;
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
                            utils_1.getNormalisedUserContext(
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
                        userContext: utils_1.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.sendVerificationEmail = function (input) {
        return recipe_1.default.getInstanceOrThrow().emailVerification.recipeImpl.sendVerificationEmail({
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
    Wrapper.submitNewPassword = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.submitNewPassword(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: utils_1.getNormalisedUserContext(input.userContext),
            })
        );
    };
    Wrapper.sendPasswordResetEmail = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: utils_1.getNormalisedUserContext(input.userContext),
            })
        );
    };
    Wrapper.emailPasswordSignUp = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.emailPasswordSignUp(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: utils_1.getNormalisedUserContext(input.userContext),
            })
        );
    };
    Wrapper.emailPasswordSignIn = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.emailPasswordSignIn(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: utils_1.getNormalisedUserContext(input.userContext),
            })
        );
    };
    Wrapper.doesEmailExist = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.doesEmailExist(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: utils_1.getNormalisedUserContext(input.userContext),
            })
        );
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return tslib_1.__generator(this, function (_a) {
                recipeInstance = recipe_1.default.getInstanceOrThrow();
                if (recipeInstance.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Third party email password was initialised without any social providers. This function is only available if at least one social provider is initialised"
                    );
                }
                return [
                    2 /*return*/,
                    utils_2.redirectToThirdPartyLogin({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.thirdPartyRecipe.config,
                        userContext: utils_1.getNormalisedUserContext(input.userContext),
                        recipeImplementation: recipeInstance.thirdPartyRecipe.recipeImpl,
                    }),
                ];
            });
        });
    };
    Wrapper.thirdPartySignInAndUp = function (input) {
        /**
         * We do it this way here because prettier behaves in a weird way without it.
         * If you return directly, build-pretty will succeed but pretty-check will fail
         * when you try to commit and you will have to run pretty manually every time
         */
        var recipeInstance = recipe_1.default.getInstanceOrThrow();
        return recipeInstance.recipeImpl.thirdPartySignInAndUp(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: utils_1.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
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
    Wrapper.ThirdPartySignInAndUpCallback = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    };
    Wrapper.ResetPasswordUsingToken = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("resetpassword", prop);
    };
    Wrapper.ResetPasswordUsingTokenTheme = resetPasswordUsingToken_1.default;
    Wrapper.EmailVerification = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    };
    Wrapper.EmailVerificationTheme = emailVerification_1.default;
    Wrapper.ThirdPartySignInAndUpCallbackTheme = signInAndUpCallback_1.SignInAndUpCallbackTheme;
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
var ThirdPartySignInAndUpCallback = Wrapper.ThirdPartySignInAndUpCallback;
exports.ThirdPartySignInAndUpCallback = ThirdPartySignInAndUpCallback;
var EmailVerification = Wrapper.EmailVerification;
exports.EmailVerification = EmailVerification;
var ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;
exports.ResetPasswordUsingToken = ResetPasswordUsingToken;
var submitNewPassword = Wrapper.submitNewPassword;
exports.submitNewPassword = submitNewPassword;
var sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
var emailPasswordSignIn = Wrapper.emailPasswordSignIn;
exports.emailPasswordSignIn = emailPasswordSignIn;
var emailPasswordSignUp = Wrapper.emailPasswordSignUp;
exports.emailPasswordSignUp = emailPasswordSignUp;
var doesEmailExist = Wrapper.doesEmailExist;
exports.doesEmailExist = doesEmailExist;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
var thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
