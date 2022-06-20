"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordlessLinkClicked =
    exports.EmailVerificationTheme =
    exports.EmailVerification =
    exports.redirectToAuth =
    exports.signOut =
    exports.ThirdPartySignInAndUpCallback =
    exports.SignInUpTheme =
    exports.SignInAndUp =
    exports.clearPasswordlessLoginAttemptInfo =
    exports.setPasswordlessLoginAttemptInfo =
    exports.getPasswordlessLoginAttemptInfo =
    exports.doesPasswordlessUserPhoneNumberExist =
    exports.doesPasswordlessUserEmailExist =
    exports.getPasswordlessPreAuthSessionIdFromURL =
    exports.getPasswordlessLinkCodeFromURL =
    exports.consumePasswordlessCode =
    exports.resendPasswordlessCode =
    exports.createPasswordlessCode =
    exports.getThirdPartyAuthStateFromURL =
    exports.getThirdPartyAuthErrorFromURL =
    exports.getThirdPartyAuthCodeFromURL =
    exports.verifyAndGetThirdPartyStateOrThrowError =
    exports.generateThirdPartyStateToSendToOAuthProvider =
    exports.getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    exports.setThirdPartyStateAndOtherInfoToStorage =
    exports.getThirdPartyStateAndOtherInfoFromStorage =
    exports.thirdPartySignInAndUp =
    exports.getAuthorisationURLFromBackend =
    exports.redirectToThirdPartyLogin =
    exports.getEmailVerificationTokenFromURL =
    exports.verifyEmail =
    exports.sendVerificationEmail =
    exports.isEmailVerified =
    exports.Github =
    exports.Facebook =
    exports.Google =
    exports.Apple =
    exports.init =
    exports.ThirdPartyPasswordlessAuth =
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
var thirdpartyPasswordlessAuth_1 = tslib_1.__importDefault(require("./thirdpartyPasswordlessAuth"));
exports.ThirdPartyPasswordlessAuth = thirdpartyPasswordlessAuth_1.default;
var signInUp_1 = tslib_1.__importDefault(require("./components/themes/signInUp"));
exports.SignInUpTheme = signInUp_1.default;
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
var linkClickedScreen_1 = require("../passwordless/components/themes/linkClickedScreen");
var utils_1 = require("../../utils");
var utils_2 = require("../thirdparty/utils");
var PasswordlessUtilFunctions = tslib_1.__importStar(require("../passwordless/utils"));
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
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return tslib_1.__generator(this, function (_a) {
                recipeInstance = recipe_1.default.getInstanceOrThrow();
                if (recipeInstance.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Third party passwordless was initialised without any social providers. This function is only available if at least one social provider is initialised"
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
    Wrapper.getThirdPartyStateAndOtherInfoFromStorage = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getThirdPartyStateAndOtherInfoFromStorage(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.setThirdPartyStateAndOtherInfoToStorage = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.setThirdPartyStateAndOtherInfoToStorage(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default
                        .getInstanceOrThrow()
                        .recipeImpl.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(
                            tslib_1.__assign(tslib_1.__assign({}, input), {
                                userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                            })
                        ),
                ];
            });
        });
    };
    Wrapper.generateThirdPartyStateToSendToOAuthProvider = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.generateThirdPartyStateToSendToOAuthProvider(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.verifyAndGetThirdPartyStateOrThrowError = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.verifyAndGetThirdPartyStateOrThrowError(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getThirdPartyAuthCodeFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getThirdPartyAuthCodeFromURL(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getThirdPartyAuthErrorFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getThirdPartyAuthErrorFromURL(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getThirdPartyAuthStateFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getThirdPartyAuthStateFromURL(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.createPasswordlessCode = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var recipe;
            return tslib_1.__generator(this, function (_a) {
                recipe = recipe_1.default.getInstanceOrThrow();
                if (recipe.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    PasswordlessUtilFunctions.createCode(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            recipeImplementation: recipe.passwordlessRecipe.recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendPasswordlessCode = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var recipe;
            return tslib_1.__generator(this, function (_a) {
                recipe = recipe_1.default.getInstanceOrThrow();
                if (recipe.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    PasswordlessUtilFunctions.resendCode(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            recipeImplementation: recipe.passwordlessRecipe.recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.consumePasswordlessCode = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var recipe;
            return tslib_1.__generator(this, function (_a) {
                recipe = recipe_1.default.getInstanceOrThrow();
                if (recipe.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    PasswordlessUtilFunctions.consumeCode(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            recipeImplementation: recipe.passwordlessRecipe.recipeImpl,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getPasswordlessLinkCodeFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getPasswordlessLinkCodeFromURL(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getPasswordlessPreAuthSessionIdFromURL = function (input) {
        return recipe_1.default.getInstanceOrThrow().recipeImpl.getPasswordlessPreAuthSessionIdFromURL(
            tslib_1.__assign(tslib_1.__assign({}, input), {
                userContext: (0, utils_1.getNormalisedUserContext)(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.doesPasswordlessUserEmailExist = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.doesPasswordlessUserEmailExist(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesPasswordlessUserPhoneNumberExist = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.doesPasswordlessUserPhoneNumberExist(
                        tslib_1.__assign(tslib_1.__assign({}, input), {
                            userContext: (0, utils_1.getNormalisedUserContext)(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getPasswordlessLoginAttemptInfo = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.getPasswordlessLoginAttemptInfo(
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
    Wrapper.setPasswordlessLoginAttemptInfo = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.setPasswordlessLoginAttemptInfo(
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
    Wrapper.clearPasswordlessLoginAttemptInfo = function (input) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe_1.default.getInstanceOrThrow().recipeImpl.clearPasswordlessLoginAttemptInfo(
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
    Wrapper.Google = thirdparty_1.Google;
    Wrapper.Apple = thirdparty_1.Apple;
    Wrapper.Facebook = thirdparty_1.Facebook;
    Wrapper.Github = thirdparty_1.Github;
    Wrapper.ThirdPartyPasswordlessAuth = thirdpartyPasswordlessAuth_1.default;
    Wrapper.SignInAndUp = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("signInUp", prop);
    };
    Wrapper.SignInAndUpTheme = signInUp_1.default;
    Wrapper.ThirdPartySignInAndUpCallback = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    };
    Wrapper.EmailVerification = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    };
    Wrapper.EmailVerificationTheme = emailVerification_1.default;
    Wrapper.PasswordlessLinkClickedTheme = linkClickedScreen_1.LinkClickedScreen;
    Wrapper.PasswordlessLinkClicked = function (prop) {
        return recipe_1.default.getInstanceOrThrow().getFeatureComponent("linkClickedScreen", prop);
    };
    return Wrapper;
})();
exports.default = Wrapper;
var init = Wrapper.init;
exports.init = init;
var signOut = Wrapper.signOut;
exports.signOut = signOut;
var isEmailVerified = Wrapper.isEmailVerified;
exports.isEmailVerified = isEmailVerified;
var sendVerificationEmail = Wrapper.sendVerificationEmail;
exports.sendVerificationEmail = sendVerificationEmail;
var verifyEmail = Wrapper.verifyEmail;
exports.verifyEmail = verifyEmail;
var getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
exports.getEmailVerificationTokenFromURL = getEmailVerificationTokenFromURL;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
var getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
var thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
var getThirdPartyStateAndOtherInfoFromStorage = Wrapper.getThirdPartyStateAndOtherInfoFromStorage;
exports.getThirdPartyStateAndOtherInfoFromStorage = getThirdPartyStateAndOtherInfoFromStorage;
var setThirdPartyStateAndOtherInfoToStorage = Wrapper.setThirdPartyStateAndOtherInfoToStorage;
exports.setThirdPartyStateAndOtherInfoToStorage = setThirdPartyStateAndOtherInfoToStorage;
var getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
exports.getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
var generateThirdPartyStateToSendToOAuthProvider = Wrapper.generateThirdPartyStateToSendToOAuthProvider;
exports.generateThirdPartyStateToSendToOAuthProvider = generateThirdPartyStateToSendToOAuthProvider;
var verifyAndGetThirdPartyStateOrThrowError = Wrapper.verifyAndGetThirdPartyStateOrThrowError;
exports.verifyAndGetThirdPartyStateOrThrowError = verifyAndGetThirdPartyStateOrThrowError;
var getThirdPartyAuthCodeFromURL = Wrapper.getThirdPartyAuthCodeFromURL;
exports.getThirdPartyAuthCodeFromURL = getThirdPartyAuthCodeFromURL;
var getThirdPartyAuthErrorFromURL = Wrapper.getThirdPartyAuthErrorFromURL;
exports.getThirdPartyAuthErrorFromURL = getThirdPartyAuthErrorFromURL;
var getThirdPartyAuthStateFromURL = Wrapper.getThirdPartyAuthStateFromURL;
exports.getThirdPartyAuthStateFromURL = getThirdPartyAuthStateFromURL;
var createPasswordlessCode = Wrapper.createPasswordlessCode;
exports.createPasswordlessCode = createPasswordlessCode;
var resendPasswordlessCode = Wrapper.resendPasswordlessCode;
exports.resendPasswordlessCode = resendPasswordlessCode;
var consumePasswordlessCode = Wrapper.consumePasswordlessCode;
exports.consumePasswordlessCode = consumePasswordlessCode;
var getPasswordlessLinkCodeFromURL = Wrapper.getPasswordlessLinkCodeFromURL;
exports.getPasswordlessLinkCodeFromURL = getPasswordlessLinkCodeFromURL;
var getPasswordlessPreAuthSessionIdFromURL = Wrapper.getPasswordlessPreAuthSessionIdFromURL;
exports.getPasswordlessPreAuthSessionIdFromURL = getPasswordlessPreAuthSessionIdFromURL;
var doesPasswordlessUserEmailExist = Wrapper.doesPasswordlessUserEmailExist;
exports.doesPasswordlessUserEmailExist = doesPasswordlessUserEmailExist;
var doesPasswordlessUserPhoneNumberExist = Wrapper.doesPasswordlessUserPhoneNumberExist;
exports.doesPasswordlessUserPhoneNumberExist = doesPasswordlessUserPhoneNumberExist;
var getPasswordlessLoginAttemptInfo = Wrapper.getPasswordlessLoginAttemptInfo;
exports.getPasswordlessLoginAttemptInfo = getPasswordlessLoginAttemptInfo;
var setPasswordlessLoginAttemptInfo = Wrapper.setPasswordlessLoginAttemptInfo;
exports.setPasswordlessLoginAttemptInfo = setPasswordlessLoginAttemptInfo;
var clearPasswordlessLoginAttemptInfo = Wrapper.clearPasswordlessLoginAttemptInfo;
exports.clearPasswordlessLoginAttemptInfo = clearPasswordlessLoginAttemptInfo;
var redirectToAuth = Wrapper.redirectToAuth;
exports.redirectToAuth = redirectToAuth;
var SignInAndUp = Wrapper.SignInAndUp;
exports.SignInAndUp = SignInAndUp;
var ThirdPartySignInAndUpCallback = Wrapper.ThirdPartySignInAndUpCallback;
exports.ThirdPartySignInAndUpCallback = ThirdPartySignInAndUpCallback;
var EmailVerification = Wrapper.EmailVerification;
exports.EmailVerification = EmailVerification;
var PasswordlessLinkClicked = Wrapper.PasswordlessLinkClicked;
exports.PasswordlessLinkClicked = PasswordlessLinkClicked;
