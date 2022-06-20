"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUsingTokenTheme =
    exports.ResetPasswordUsingToken =
    exports.EmailVerificationTheme =
    exports.EmailVerification =
    exports.getAuthStateFromURL =
    exports.getAuthErrorFromURL =
    exports.getAuthCodeFromURL =
    exports.verifyAndGetStateOrThrowError =
    exports.generateStateToSendToOAuthProvider =
    exports.getAuthorisationURLWithQueryParamsAndSetState =
    exports.setStateAndOtherInfoToStorage =
    exports.getStateAndOtherInfoFromStorage =
    exports.thirdPartySignInAndUp =
    exports.getAuthorisationURLFromBackend =
    exports.redirectToThirdPartyLogin =
    exports.getResetPasswordTokenFromURL =
    exports.doesEmailExist =
    exports.emailPasswordSignUp =
    exports.emailPasswordSignIn =
    exports.sendPasswordResetEmail =
    exports.submitNewPassword =
    exports.redirectToAuth =
    exports.signOut =
    exports.ThirdPartySignInAndUpCallbackTheme =
    exports.ThirdPartySignInAndUpCallback =
    exports.SignInAndUpTheme =
    exports.SignInAndUp =
    exports.getEmailVerificationTokenFromURL =
    exports.sendVerificationEmail =
    exports.verifyEmail =
    exports.isEmailVerified =
    exports.Github =
    exports.Facebook =
    exports.Google =
    exports.Apple =
    exports.init =
    exports.ThirdPartyEmailPasswordAuth =
        void 0;
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
Object.defineProperty(exports, "Apple", {
    enumerable: true,
    get: function () {
        return thirdparty_1.Apple;
    },
});
Object.defineProperty(exports, "Google", {
    enumerable: true,
    get: function () {
        return thirdparty_1.Google;
    },
});
Object.defineProperty(exports, "Facebook", {
    enumerable: true,
    get: function () {
        return thirdparty_1.Facebook;
    },
});
Object.defineProperty(exports, "Github", {
    enumerable: true,
    get: function () {
        return thirdparty_1.Github;
    },
});
var utils_1 = require("../../utils");
var utils_2 = require("../thirdparty/utils");
var signInAndUpCallback_1 = require("../thirdparty/components/themes/signInAndUpCallback");
Object.defineProperty(exports, "ThirdPartySignInAndUpCallbackTheme", {
    enumerable: true,
    get: function () {
        return signInAndUpCallback_1.SignInAndUpCallbackTheme;
    },
});
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe_1.default.init(config);
    };
    Wrapper.signOut = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().signOut({
                        userContext: (0, utils_1.getNormalisedUserContext)(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.isEmailVerified = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().emailVerification.recipeImpl.isEmailVerified(
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (input === undefined || typeof input === "string") {
                    return [
                        2 /*return*/,
                        recipe_1.default.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input),
                    ];
                } else {
                    if (input.redirectBack === false || input.redirectBack === undefined) {
                        return [
                            2 /*return*/,
                            recipe_1.default.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input.show),
                        ];
                    } else {
                        return [
                            2 /*return*/,
                            recipe_1.default.getInstanceOrThrow().redirectToAuthWithRedirectToPath(input.show),
                        ];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    Wrapper.submitNewPassword = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.submitNewPassword(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.sendPasswordResetEmail = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.emailPasswordSignUp = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.emailPasswordSignUp(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.emailPasswordSignIn = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.emailPasswordSignIn(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesEmailExist = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.doesEmailExist(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getResetPasswordTokenFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getResetPasswordTokenFromURL(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
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
                    (0, utils_2.redirectToThirdPartyLogin)({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.thirdPartyRecipe.config,
                        userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        recipeImplementation: recipeInstance.thirdPartyRecipe.recipeImpl,
                    }),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLFromBackend = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.thirdPartySignInAndUp = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.thirdPartySignInAndUp(
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.setStateAndOtherInfoToStorage(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.getAuthorisationURLWithQueryParamsAndSetState(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.verifyAndGetStateOrThrowError(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
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
var getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
exports.getEmailVerificationTokenFromURL = getEmailVerificationTokenFromURL;
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
var getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
exports.getResetPasswordTokenFromURL = getResetPasswordTokenFromURL;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
var getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
var thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
var setStateAndOtherInfoToStorage = Wrapper.setStateAndOtherInfoToStorage;
exports.setStateAndOtherInfoToStorage = setStateAndOtherInfoToStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
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
