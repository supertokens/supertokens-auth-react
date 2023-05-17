"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var uiEntry = require("./superTokens.js");
var recipe$1 = require("./passwordless-shared2.js");
var recipe = require("./thirdpartypasswordless-shared.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("react/jsx-runtime");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js/recipe/thirdparty");
require("supertokens-web-js/recipe/session");
require("react-dom");
require("supertokens-web-js/utils");
require("supertokens-web-js/recipe/passwordless");
require("supertokens-web-js/recipe/passwordless/utils");
require("supertokens-web-js/recipe/thirdpartypasswordless");

var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe.ThirdPartyPasswordless.init(config);
    };
    Wrapper.signOut = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().signOut({
                        userContext: uiEntry.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return uiEntry.__generator(this, function (_a) {
                recipeInstance = recipe.ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipeInstance.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Third party passwordless was initialised without any social providers. This function is only available if at least one social provider is initialised"
                    );
                }
                return [
                    2 /*return*/,
                    uiEntry.redirectToThirdPartyLogin({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.thirdPartyRecipe.config,
                        userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        recipeImplementation: recipeInstance.thirdPartyRecipe.webJSRecipe,
                    }),
                ];
            });
        });
    };
    Wrapper.thirdPartySignInAndUp = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.thirdPartySignInAndUp(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.createPasswordlessCode = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            var recipe$2;
            return uiEntry.__generator(this, function (_a) {
                recipe$2 = recipe.ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$2.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe$1.createCode(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            recipeImplementation: recipe$2.passwordlessRecipe.webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendPasswordlessCode = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            var recipe$2;
            return uiEntry.__generator(this, function (_a) {
                recipe$2 = recipe.ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$2.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe$1.resendCode(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            recipeImplementation: recipe$2.passwordlessRecipe.webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.consumePasswordlessCode = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            var recipe$2;
            return uiEntry.__generator(this, function (_a) {
                recipe$2 = recipe.ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$2.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe$1.consumeCode(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            recipeImplementation: recipe$2.passwordlessRecipe.webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getPasswordlessLinkCodeFromURL = function (input) {
        return recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessLinkCodeFromURL(
            uiEntry.__assign(uiEntry.__assign({}, input), {
                userContext: uiEntry.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getPasswordlessPreAuthSessionIdFromURL = function (input) {
        return recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessPreAuthSessionIdFromURL(
            uiEntry.__assign(uiEntry.__assign({}, input), {
                userContext: uiEntry.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.doesPasswordlessUserEmailExist = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.doesPasswordlessUserEmailExist(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesPasswordlessUserPhoneNumberExist = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.doesPasswordlessUserPhoneNumberExist(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getPasswordlessLoginAttemptInfo = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessLoginAttemptInfo(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.setPasswordlessLoginAttemptInfo = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.setPasswordlessLoginAttemptInfo(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.clearPasswordlessLoginAttemptInfo = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.clearPasswordlessLoginAttemptInfo(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.Apple = uiEntry.Apple;
    Wrapper.Bitbucket = uiEntry.Bitbucket;
    Wrapper.Discord = uiEntry.Discord;
    Wrapper.Github = uiEntry.Github;
    Wrapper.Gitlab = uiEntry.Gitlab;
    Wrapper.Google = uiEntry.Google;
    Wrapper.Facebook = uiEntry.Facebook;
    Wrapper.LinkedIn = uiEntry.LinkedIn;
    Wrapper.ActiveDirectory = uiEntry.ActiveDirectory;
    Wrapper.BoxySAML = uiEntry.BoxySAML;
    Wrapper.Okta = uiEntry.Okta;
    Wrapper.ComponentsOverrideProvider = recipe.Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
var getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
var createPasswordlessCode = Wrapper.createPasswordlessCode;
var resendPasswordlessCode = Wrapper.resendPasswordlessCode;
var consumePasswordlessCode = Wrapper.consumePasswordlessCode;
var getPasswordlessLinkCodeFromURL = Wrapper.getPasswordlessLinkCodeFromURL;
var getPasswordlessPreAuthSessionIdFromURL = Wrapper.getPasswordlessPreAuthSessionIdFromURL;
var doesPasswordlessUserEmailExist = Wrapper.doesPasswordlessUserEmailExist;
var doesPasswordlessUserPhoneNumberExist = Wrapper.doesPasswordlessUserPhoneNumberExist;
var getPasswordlessLoginAttemptInfo = Wrapper.getPasswordlessLoginAttemptInfo;
var setPasswordlessLoginAttemptInfo = Wrapper.setPasswordlessLoginAttemptInfo;
var clearPasswordlessLoginAttemptInfo = Wrapper.clearPasswordlessLoginAttemptInfo;
var ThirdpartyPasswordlessComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.ActiveDirectory = uiEntry.ActiveDirectory;
exports.Apple = uiEntry.Apple;
exports.Bitbucket = uiEntry.Bitbucket;
exports.BoxySAML = uiEntry.BoxySAML;
exports.Discord = uiEntry.Discord;
exports.Facebook = uiEntry.Facebook;
exports.Github = uiEntry.Github;
exports.Gitlab = uiEntry.Gitlab;
exports.Google = uiEntry.Google;
exports.LinkedIn = uiEntry.LinkedIn;
exports.Okta = uiEntry.Okta;
exports.ThirdpartyPasswordlessComponentsOverrideProvider = ThirdpartyPasswordlessComponentsOverrideProvider;
exports.clearPasswordlessLoginAttemptInfo = clearPasswordlessLoginAttemptInfo;
exports.consumePasswordlessCode = consumePasswordlessCode;
exports.createPasswordlessCode = createPasswordlessCode;
exports.default = Wrapper;
exports.doesPasswordlessUserEmailExist = doesPasswordlessUserEmailExist;
exports.doesPasswordlessUserPhoneNumberExist = doesPasswordlessUserPhoneNumberExist;
exports.getPasswordlessLinkCodeFromURL = getPasswordlessLinkCodeFromURL;
exports.getPasswordlessLoginAttemptInfo = getPasswordlessLoginAttemptInfo;
exports.getPasswordlessPreAuthSessionIdFromURL = getPasswordlessPreAuthSessionIdFromURL;
exports.getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.resendPasswordlessCode = resendPasswordlessCode;
exports.setPasswordlessLoginAttemptInfo = setPasswordlessLoginAttemptInfo;
exports.signOut = signOut;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
//# sourceMappingURL=thirdpartypasswordless.js.map
