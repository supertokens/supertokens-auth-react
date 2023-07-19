"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var superTokens = require("./superTokens.js");
require("./thirdparty.js");
var recipe = require("./thirdparty-shared.js");
var recipe$1 = require("./thirdpartypasswordless-shared.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("./genericComponentOverrideContext.js");
require("react/jsx-runtime");
require("supertokens-web-js/recipe/thirdparty");
require("./authRecipe-shared.js");
require("./recipeModule-shared.js");
require("./session-shared2.js");
require("supertokens-web-js/recipe/session");
require("supertokens-web-js/utils");
require("./translationContext.js");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js/recipe/thirdpartypasswordless");
require("./passwordless-shared2.js");
require("supertokens-web-js/recipe/passwordless");

var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe$1.ThirdPartyPasswordless.init(config);
    };
    Wrapper.signOut = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().signOut({
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
                recipeInstance = recipe$1.ThirdPartyPasswordless.getInstanceOrThrow();
                if (recipeInstance.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Third party passwordless was initialised without any social providers. This function is only available if at least one social provider is initialised"
                    );
                }
                return [
                    2 /*return*/,
                    recipe.redirectToThirdPartyLogin({
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
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.thirdPartySignInAndUp(
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
    Wrapper.getThirdPartyStateAndOtherInfoFromStorage = function (input) {
        return recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getThirdPartyStateAndOtherInfoFromStorage(
            superTokens.__assign(superTokens.__assign({}, input), {
                userContext: superTokens.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(
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
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.createPasswordlessCode(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.resendPasswordlessCode = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.resendPasswordlessCode(
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
    Wrapper.consumePasswordlessCode = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.consumePasswordlessCode(
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
    Wrapper.getPasswordlessLinkCodeFromURL = function (input) {
        return recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessLinkCodeFromURL(
            superTokens.__assign(superTokens.__assign({}, input), {
                userContext: superTokens.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getPasswordlessPreAuthSessionIdFromURL = function (input) {
        return recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessPreAuthSessionIdFromURL(
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
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.doesPasswordlessUserEmailExist(
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
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.doesPasswordlessUserPhoneNumberExist(
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
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessLoginAttemptInfo(
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
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.setPasswordlessLoginAttemptInfo(
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
                    recipe$1.ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.clearPasswordlessLoginAttemptInfo(
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
    Wrapper.Apple = recipe.Apple;
    Wrapper.Bitbucket = recipe.Bitbucket;
    Wrapper.Discord = recipe.Discord;
    Wrapper.Github = recipe.Github;
    Wrapper.Gitlab = recipe.Gitlab;
    Wrapper.Google = recipe.Google;
    Wrapper.GoogleWorkspaces = recipe.GoogleWorkspaces;
    Wrapper.Facebook = recipe.Facebook;
    Wrapper.LinkedIn = recipe.LinkedIn;
    Wrapper.ActiveDirectory = recipe.ActiveDirectory;
    Wrapper.BoxySAML = recipe.BoxySAML;
    Wrapper.Okta = recipe.Okta;
    Wrapper.ComponentsOverrideProvider = recipe$1.Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
var getThirdPartyStateAndOtherInfoFromStorage = Wrapper.getThirdPartyStateAndOtherInfoFromStorage;
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

exports.ActiveDirectory = recipe.ActiveDirectory;
exports.Apple = recipe.Apple;
exports.Bitbucket = recipe.Bitbucket;
exports.BoxySAML = recipe.BoxySAML;
exports.Discord = recipe.Discord;
exports.Facebook = recipe.Facebook;
exports.Github = recipe.Github;
exports.Gitlab = recipe.Gitlab;
exports.Google = recipe.Google;
exports.GoogleWorkspaces = recipe.GoogleWorkspaces;
exports.LinkedIn = recipe.LinkedIn;
exports.Okta = recipe.Okta;
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
exports.getThirdPartyStateAndOtherInfoFromStorage = getThirdPartyStateAndOtherInfoFromStorage;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.resendPasswordlessCode = resendPasswordlessCode;
exports.setPasswordlessLoginAttemptInfo = setPasswordlessLoginAttemptInfo;
exports.signOut = signOut;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
