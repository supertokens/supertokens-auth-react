"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var utils = require("./recipeModule-shared.js");
var componentOverrideContext = require("./thirdpartyemailpassword-shared.js");
var thirdparty = require("./thirdparty.js");
var componentOverrideContext$1 = require("./thirdparty-shared.js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("./authRecipe-shared.js");
require("./session-shared2.js");
require("supertokens-web-js/recipe/session/recipe");
require("./emailpassword-shared2.js");
require("./emailpassword-shared4.js");
require("supertokens-web-js/recipe/emailpassword/recipeImplementation");
require("./genericComponentOverrideContext.js");
require("react/jsx-runtime");
require("./translationContext.js");
require("supertokens-web-js/recipe/thirdparty/recipeImplementation");

var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return componentOverrideContext.ThirdPartyEmailPassword.init(config);
    };
    Wrapper.signOut = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().signOut({
                        userContext: utils.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.submitNewPassword = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.submitNewPassword(
                        utils.__assign(utils.__assign({}, input), {
                            userContext: utils.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.sendPasswordResetEmail = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail(
                        utils.__assign(utils.__assign({}, input), {
                            userContext: utils.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.emailPasswordSignUp = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.emailPasswordSignUp(
                        utils.__assign(utils.__assign({}, input), {
                            userContext: utils.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.emailPasswordSignIn = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.emailPasswordSignIn(
                        utils.__assign(utils.__assign({}, input), {
                            userContext: utils.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesEmailExist = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.doesEmailExist(
                        utils.__assign(utils.__assign({}, input), {
                            userContext: utils.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getResetPasswordTokenFromURL = function (input) {
        return componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getResetPasswordTokenFromURL(
            utils.__assign(utils.__assign({}, input), {
                userContext: utils.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return utils.__generator(this, function (_a) {
                recipeInstance = componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow();
                if (recipeInstance.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Third party email password was initialised without any social providers. This function is only available if at least one social provider is initialised"
                    );
                }
                return [
                    2 /*return*/,
                    componentOverrideContext$1.redirectToThirdPartyLogin({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.thirdPartyRecipe.config,
                        userContext: utils.getNormalisedUserContext(input.userContext),
                        recipeImplementation: recipeInstance.thirdPartyRecipe.recipeImpl,
                    }),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLFromBackend = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend(
                        utils.__assign(utils.__assign({}, input), {
                            userContext: utils.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.thirdPartySignInAndUp = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.thirdPartySignInAndUp(
                        utils.__assign(utils.__assign({}, input), {
                            userContext: utils.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getStateAndOtherInfoFromStorage(
            utils.__assign(utils.__assign({}, input), {
                userContext: utils.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.setStateAndOtherInfoToStorage = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.setStateAndOtherInfoToStorage(
                        utils.__assign(utils.__assign({}, input), {
                            userContext: utils.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthorisationURLWithQueryParamsAndSetState(
                        utils.__assign(utils.__assign({}, input), {
                            userContext: utils.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.generateStateToSendToOAuthProvider = function (input) {
        return componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.generateStateToSendToOAuthProvider(
            utils.__assign(utils.__assign({}, input), {
                userContext: utils.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.verifyAndGetStateOrThrowError = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.verifyAndGetStateOrThrowError(
                        utils.__assign(utils.__assign({}, input), {
                            userContext: utils.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getAuthCodeFromURL = function (input) {
        return componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthCodeFromURL(
            utils.__assign(utils.__assign({}, input), {
                userContext: utils.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthErrorFromURL = function (input) {
        return componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthErrorFromURL(
            utils.__assign(utils.__assign({}, input), {
                userContext: utils.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthStateFromURL = function (input) {
        return componentOverrideContext.ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthStateFromURL(
            utils.__assign(utils.__assign({}, input), {
                userContext: utils.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.Google = thirdparty.Google;
    Wrapper.Apple = thirdparty.Apple;
    Wrapper.Facebook = thirdparty.Facebook;
    Wrapper.Github = thirdparty.Github;
    Wrapper.ComponentsOverrideProvider = componentOverrideContext.Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var ThirdpartyEmailPasswordComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
var submitNewPassword = Wrapper.submitNewPassword;
var sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
var emailPasswordSignIn = Wrapper.emailPasswordSignIn;
var emailPasswordSignUp = Wrapper.emailPasswordSignUp;
var doesEmailExist = Wrapper.doesEmailExist;
var getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
var thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
var setStateAndOtherInfoToStorage = Wrapper.setStateAndOtherInfoToStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
var generateStateToSendToOAuthProvider = Wrapper.generateStateToSendToOAuthProvider;
var verifyAndGetStateOrThrowError = Wrapper.verifyAndGetStateOrThrowError;
var getAuthCodeFromURL = Wrapper.getAuthCodeFromURL;
var getAuthErrorFromURL = Wrapper.getAuthErrorFromURL;
var getAuthStateFromURL = Wrapper.getAuthStateFromURL;

exports.Apple = thirdparty.Apple;
exports.Facebook = thirdparty.Facebook;
exports.Github = thirdparty.Github;
exports.Google = thirdparty.Google;
exports.ThirdpartyEmailPasswordComponentsOverrideProvider = ThirdpartyEmailPasswordComponentsOverrideProvider;
exports.default = Wrapper;
exports.doesEmailExist = doesEmailExist;
exports.emailPasswordSignIn = emailPasswordSignIn;
exports.emailPasswordSignUp = emailPasswordSignUp;
exports.generateStateToSendToOAuthProvider = generateStateToSendToOAuthProvider;
exports.getAuthCodeFromURL = getAuthCodeFromURL;
exports.getAuthErrorFromURL = getAuthErrorFromURL;
exports.getAuthStateFromURL = getAuthStateFromURL;
exports.getAuthorisationURLFromBackend = getAuthorisationURLFromBackend;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
exports.getResetPasswordTokenFromURL = getResetPasswordTokenFromURL;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.setStateAndOtherInfoToStorage = setStateAndOtherInfoToStorage;
exports.signOut = signOut;
exports.submitNewPassword = submitNewPassword;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
exports.verifyAndGetStateOrThrowError = verifyAndGetStateOrThrowError;
//# sourceMappingURL=thirdpartyemailpassword.js.map
