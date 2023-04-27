"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var superTokens = require("./superTokens.js");
var thirdparty = require("./thirdparty.js");
var recipe$1 = require("./thirdparty-shared.js");
var recipe = require("./thirdpartyemailpassword-shared.js");
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
require("./genericComponentOverrideContext.js");
require("supertokens-web-js/recipe/thirdparty");
require("./authRecipe-shared.js");
require("./session-shared2.js");
require("supertokens-web-js/recipe/session");
require("./translationContext.js");
require("supertokens-web-js/recipe/thirdpartyemailpassword");
require("./emailpassword-shared3.js");
require("supertokens-web-js/recipe/emailpassword");
require("./emailpassword-shared4.js");

var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe.ThirdPartyEmailPassword.init(config);
    };
    Wrapper.signOut = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().signOut({
                        userContext: superTokens.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.submitNewPassword = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.submitNewPassword(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.sendPasswordResetEmail = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.sendPasswordResetEmail(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.emailPasswordSignUp = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.emailPasswordSignUp(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.emailPasswordSignIn = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.emailPasswordSignIn(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesEmailExist = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getResetPasswordTokenFromURL = function (input) {
        return recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.getResetPasswordTokenFromURL(
            superTokens.__assign(superTokens.__assign({}, input), {
                userContext: superTokens.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return superTokens.__generator(this, function (_a) {
                recipeInstance = recipe.ThirdPartyEmailPassword.getInstanceOrThrow();
                if (recipeInstance.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Third party email password was initialised without any social providers. This function is only available if at least one social provider is initialised"
                    );
                }
                return [
                    2 /*return*/,
                    recipe$1.redirectToThirdPartyLogin({
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
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.thirdPartySignInAndUp(
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
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.getStateAndOtherInfoFromStorage(
            superTokens.__assign(superTokens.__assign({}, input), {
                userContext: superTokens.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return superTokens.__awaiter(this, void 0, void 0, function () {
            return superTokens.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState(
                        superTokens.__assign(superTokens.__assign({}, input), {
                            userContext: superTokens.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.Google = thirdparty.Google;
    Wrapper.Apple = thirdparty.Apple;
    Wrapper.Bitbucket = thirdparty.Bitbucket;
    Wrapper.Discord = thirdparty.Discord;
    Wrapper.Github = thirdparty.Github;
    Wrapper.Gitlab = thirdparty.Gitlab;
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
var ThirdpartyEmailPasswordComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
var submitNewPassword = Wrapper.submitNewPassword;
var sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
var emailPasswordSignIn = Wrapper.emailPasswordSignIn;
var emailPasswordSignUp = Wrapper.emailPasswordSignUp;
var doesEmailExist = Wrapper.doesEmailExist;
var getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;

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
exports.ThirdpartyEmailPasswordComponentsOverrideProvider = ThirdpartyEmailPasswordComponentsOverrideProvider;
exports.default = Wrapper;
exports.doesEmailExist = doesEmailExist;
exports.emailPasswordSignIn = emailPasswordSignIn;
exports.emailPasswordSignUp = emailPasswordSignUp;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
exports.getResetPasswordTokenFromURL = getResetPasswordTokenFromURL;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.signOut = signOut;
exports.submitNewPassword = submitNewPassword;
exports.thirdPartySignInAndUp = thirdPartySignInAndUp;
//# sourceMappingURL=thirdpartyemailpassword.js.map
