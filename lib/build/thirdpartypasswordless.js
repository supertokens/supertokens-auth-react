"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var superTokens = require("./superTokens.js");
var recipe$1 = require("./passwordless-shared2.js");
var thirdparty = require("./thirdparty.js");
var recipe = require("./thirdpartypasswordless-shared.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/recipe/thirdparty");
require("supertokens-web-js/recipe/session");
require("react/jsx-runtime");
require("supertokens-web-js/recipe/passwordless");
require("supertokens-web-js/recipe/passwordless/utils");
require("./thirdparty-shared.js");
require("./genericComponentOverrideContext.js");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js/recipe/thirdpartypasswordless");

var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe.ThirdPartyPasswordless.init(config);
    };
    Wrapper.signOut = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().signOut({
                        userContext: superTokens.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return superTokens.__generator(this, function (_a) {
                recipeInstance = recipe.ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipeInstance.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Third party passwordless was initialised without any social providers. This function is only available if at least one social provider is initialised"
                    );
                }
                return [
                    2 /*return*/,
                    superTokens.redirectToThirdPartyLogin({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.thirdPartyRecipe.config,
                        userContext: superTokens.getNormalisedUserContext(input.userContext),
                        recipeImplementation: recipeInstance.thirdPartyRecipe.webJSRecipe,
                    }),
                ];
            });
        });
    };
    Wrapper.thirdPartySignInAndUp = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.thirdPartySignInAndUp(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.createPasswordlessCode = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            var recipe$2;
            return superTokens.__generator(this, function (_a) {
                recipe$2 = recipe.ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$2.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe$1.createCode(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            recipeImplementation: recipe$2.passwordlessRecipe.webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendPasswordlessCode = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            var recipe$2;
            return superTokens.__generator(this, function (_a) {
                recipe$2 = recipe.ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$2.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe$1.resendCode(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            recipeImplementation: recipe$2.passwordlessRecipe.webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.consumePasswordlessCode = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            var recipe$2;
            return superTokens.__generator(this, function (_a) {
                recipe$2 = recipe.ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipe$2.passwordlessRecipe === undefined) {
                    throw new Error(
                        "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                    );
                }
                return [
                    2 /*return*/,
                    recipe$1.consumeCode(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            recipeImplementation: recipe$2.passwordlessRecipe.webJSRecipe,
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getPasswordlessLinkCodeFromURL = function (input) {
        return recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessLinkCodeFromURL(
            superTokens.__assign(superTokens.__assign({}, input), {
                userContext: superTokens.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getPasswordlessPreAuthSessionIdFromURL = function (input) {
        return recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessPreAuthSessionIdFromURL(
            superTokens.__assign(superTokens.__assign({}, input), {
                userContext: superTokens.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.doesPasswordlessUserEmailExist = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.doesPasswordlessUserEmailExist(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesPasswordlessUserPhoneNumberExist = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.doesPasswordlessUserPhoneNumberExist(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getPasswordlessLoginAttemptInfo = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessLoginAttemptInfo(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.setPasswordlessLoginAttemptInfo = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.setPasswordlessLoginAttemptInfo(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.clearPasswordlessLoginAttemptInfo = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.clearPasswordlessLoginAttemptInfo(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.Apple = thirdparty.Apple;
    Wrapper.Bitbucket = thirdparty.Bitbucket;
    Wrapper.Discord = thirdparty.Discord;
    Wrapper.Github = thirdparty.Github;
    Wrapper.Gitlab = thirdparty.Gitlab;
    Wrapper.Google = thirdparty.Google;
    Wrapper.Facebook = thirdparty.Facebook;
    Wrapper.LinkedIn = thirdparty.LinkedIn;
    Wrapper.ActiveDirectory = thirdparty.ActiveDirectory;
    Wrapper.BoxySAML = thirdparty.BoxySAML;
    Wrapper.Okta = thirdparty.Okta;
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

exports.ActiveDirectory = thirdparty.ActiveDirectory;
exports.Apple = thirdparty.Apple;
exports.Bitbucket = thirdparty.Bitbucket;
exports.BoxySAML = thirdparty.BoxySAML;
exports.Discord = thirdparty.Discord;
exports.Facebook = thirdparty.Facebook;
exports.Github = thirdparty.Github;
exports.Gitlab = thirdparty.Gitlab;
exports.Google = thirdparty.Google;
exports.LinkedIn = thirdparty.LinkedIn;
exports.Okta = thirdparty.Okta;
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
