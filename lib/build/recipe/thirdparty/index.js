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
    exports.redirectToAuth =
    exports.signOut =
    exports.SignInAndUpCallbackTheme =
    exports.SignInAndUpCallback =
    exports.SignInAndUpTheme =
    exports.SignInAndUp =
    exports.redirectToThirdPartyLogin =
    exports.signInAndUp =
    exports.getAuthStateFromURL =
    exports.getAuthErrorFromURL =
    exports.getAuthCodeFromURL =
    exports.verifyAndGetStateOrThrowError =
    exports.generateStateToSendToOAuthProvider =
    exports.getAuthorisationURLFromBackend =
    exports.getAuthorisationURLWithQueryParamsAndSetState =
    exports.setStateAndOtherInfoToStorage =
    exports.getStateAndOtherInfoFromStorage =
    exports.getEmailVerificationTokenFromURL =
    exports.sendVerificationEmail =
    exports.verifyEmail =
    exports.isEmailVerified =
    exports.Github =
    exports.Facebook =
    exports.Google =
    exports.Apple =
    exports.init =
    exports.ThirdPartyAuth =
        void 0;
var tslib_1 = require("tslib");
/*
 * Import
 */
// /!\ ThirdParty must be imported before any of the providers to prevent circular dependencies.
var recipe_1 = tslib_1.__importDefault(require("./recipe"));
var emailVerification_1 = tslib_1.__importDefault(require("../emailverification/components/themes/emailVerification"));
exports.EmailVerificationTheme = emailVerification_1.default;
var thirdpartyAuth_1 = tslib_1.__importDefault(require("./thirdpartyAuth"));
exports.ThirdPartyAuth = thirdpartyAuth_1.default;
var signInAndUp_1 = tslib_1.__importDefault(require("./components/themes/signInAndUp"));
exports.SignInAndUpTheme = signInAndUp_1.default;
var signInAndUpCallback_1 = require("./components/themes/signInAndUpCallback");
Object.defineProperty(exports, "SignInAndUpCallbackTheme", {
    enumerable: true,
    get: function () {
        return signInAndUpCallback_1.SignInAndUpCallbackTheme;
    },
});
var apple_1 = tslib_1.__importDefault(require("./providers/apple"));
exports.Apple = apple_1.default;
var google_1 = tslib_1.__importDefault(require("./providers/google"));
exports.Google = google_1.default;
var facebook_1 = tslib_1.__importDefault(require("./providers/facebook"));
exports.Facebook = facebook_1.default;
var github_1 = tslib_1.__importDefault(require("./providers/github"));
exports.Github = github_1.default;
var utils_1 = require("../../utils");
var utils_2 = require("./utils");
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    /*
     * Static attributes.
     */
    Wrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    Wrapper.signOut = function (input) {
        return recipe_1.default.getInstanceOrThrow().signOut({
            userContext: (0, utils_1.getNormalisedUserContext)(
                input === null || input === void 0 ? void 0 : input.userContext
            ),
        });
    };
    Wrapper.isEmailVerified = function (input) {
        return recipe_1.default.getInstanceOrThrow().emailVerification.recipeImpl.isEmailVerified(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.verifyEmail = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().emailVerification.recipeImpl.verifyEmail(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.sendVerificationEmail = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().emailVerification.recipeImpl.sendVerificationEmail(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getEmailVerificationTokenFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().emailVerification.recipeImpl.getEmailVerificationTokenFromURL(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
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
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return tslib_1.__generator(this, function (_a) {
                recipeInstance = recipe_1.default.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    (0, utils_2.redirectToThirdPartyLogin)({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.config,
                        userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        recipeImplementation: recipeInstance.recipeImpl,
                    }),
                ];
            });
        });
    };
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getStateAndOtherInfoFromStorage(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.setStateAndOtherInfoToStorage = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.setStateAndOtherInfoToStorage(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthorisationURLWithQueryParamsAndSetState(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.getAuthorisationURLFromBackend = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.signInAndUp = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.signInAndUp(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.generateStateToSendToOAuthProvider = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.generateStateToSendToOAuthProvider(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.verifyAndGetStateOrThrowError = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.verifyAndGetStateOrThrowError(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
            })
        );
    };
    Wrapper.getAuthCodeFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthCodeFromURL(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthErrorFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthErrorFromURL(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthStateFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthStateFromURL(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    /*
     * Providers
     */
    Wrapper.Google = google_1.default;
    Wrapper.Apple = apple_1.default;
    Wrapper.Facebook = facebook_1.default;
    Wrapper.Github = github_1.default;
    Wrapper.ThirdPartyAuth = thirdpartyAuth_1.default;
    Wrapper.SignInAndUp = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    };
    Wrapper.SignInAndUpTheme = signInAndUp_1.default;
    Wrapper.SignInAndUpCallback = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    };
    Wrapper.SignInAndUpCallbackTheme = signInAndUpCallback_1.SignInAndUpCallbackTheme;
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
var getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
exports.getEmailVerificationTokenFromURL = getEmailVerificationTokenFromURL;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
var setStateAndOtherInfoToStorage = Wrapper.setStateAndOtherInfoToStorage;
exports.setStateAndOtherInfoToStorage = setStateAndOtherInfoToStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
var getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
var generateStateToSendToOAuthProvider = Wrapper.generateStateToSendToOAuthProvider;
exports.generateStateToSendToOAuthProvider = generateStateToSendToOAuthProvider;
var verifyAndGetStateOrThrowError = Wrapper.verifyAndGetStateOrThrowError;
exports.verifyAndGetStateOrThrowError = verifyAndGetStateOrThrowError;
var getAuthCodeFromURL = Wrapper.getAuthCodeFromURL;
exports.getAuthCodeFromURL = getAuthCodeFromURL;
var getAuthErrorFromURL = Wrapper.getAuthErrorFromURL;
exports.getAuthErrorFromURL = getAuthErrorFromURL;
var getAuthStateFromURL = Wrapper.getAuthStateFromURL;
exports.getAuthStateFromURL = getAuthStateFromURL;
var signInAndUp = Wrapper.signInAndUp;
exports.signInAndUp = signInAndUp;
var redirectToAuth = Wrapper.redirectToAuth;
exports.redirectToAuth = redirectToAuth;
var SignInAndUp = Wrapper.SignInAndUp;
exports.SignInAndUp = SignInAndUp;
var SignInAndUpCallback = Wrapper.SignInAndUpCallback;
exports.SignInAndUpCallback = SignInAndUpCallback;
var EmailVerification = Wrapper.EmailVerification;
exports.EmailVerification = EmailVerification;
