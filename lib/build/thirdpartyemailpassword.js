"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var uiEntry = require("./superTokens.js");
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
require("supertokens-web-js/recipe/thirdparty");
require("supertokens-web-js/recipe/session");
require("react-dom");
require("supertokens-web-js/utils");
require("supertokens-web-js/recipe/thirdpartyemailpassword");
require("./emailpassword-shared4.js");
require("supertokens-web-js/recipe/emailpassword");
require("./emailpassword-shared5.js");

var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return recipe.ThirdPartyEmailPassword.init(config);
    };
    Wrapper.signOut = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().signOut({
                        userContext: uiEntry.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.submitNewPassword = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.submitNewPassword(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.sendPasswordResetEmail = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.sendPasswordResetEmail(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.emailPasswordSignUp = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.emailPasswordSignUp(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.emailPasswordSignIn = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.emailPasswordSignIn(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.doesEmailExist = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getResetPasswordTokenFromURL = function (input) {
        return recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.getResetPasswordTokenFromURL(
            uiEntry.__assign(uiEntry.__assign({}, input), {
                userContext: uiEntry.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return uiEntry.__generator(this, function (_a) {
                recipeInstance = recipe.ThirdPartyEmailPassword.getInstanceOrThrow();
                if (recipeInstance.thirdPartyRecipe === undefined) {
                    throw new Error(
                        "Third party email password was initialised without any social providers. This function is only available if at least one social provider is initialised"
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
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.thirdPartySignInAndUp(
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
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.getStateAndOtherInfoFromStorage(
            uiEntry.__assign(uiEntry.__assign({}, input), {
                userContext: uiEntry.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return uiEntry.__awaiter(this, void 0, void 0, function () {
            return uiEntry.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    recipe.ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState(
                        uiEntry.__assign(uiEntry.__assign({}, input), {
                            userContext: uiEntry.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.Google = uiEntry.Google;
    Wrapper.Apple = uiEntry.Apple;
    Wrapper.Bitbucket = uiEntry.Bitbucket;
    Wrapper.Discord = uiEntry.Discord;
    Wrapper.Github = uiEntry.Github;
    Wrapper.Gitlab = uiEntry.Gitlab;
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
