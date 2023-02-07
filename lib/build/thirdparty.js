"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

require("./session-shared.js");
var thirdparty = require("./thirdparty-shared.js");
require("react/jsx-runtime");
require("react");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/recipe/session/recipe");
require("./translations.js");
require("./translationContext.js");
require("react-dom");
require("./authRecipe-shared.js");
require("./session-shared2.js");
require("supertokens-web-js/recipe/session");
require("supertokens-web-js/utils/error");
require("./spinnerIcon.js");
require("supertokens-web-js/recipe/thirdparty/recipeImplementation");

exports.Apple = thirdparty.Apple;
exports.Facebook = thirdparty.Facebook;
exports.Github = thirdparty.Github;
exports.Google = thirdparty.Google;
exports.SignInAndUp = thirdparty.SignInAndUp;
exports.SignInAndUpCallback = thirdparty.SignInAndUpCallback;
exports.SignInAndUpCallbackTheme = thirdparty.SignInAndUpCallbackTheme;
exports.SignInAndUpTheme = thirdparty.SignInAndUpThemeWrapper;
exports.ThirdpartyComponentsOverrideProvider = thirdparty.ThirdpartyComponentsOverrideProvider;
exports.default = thirdparty.Wrapper;
exports.generateStateToSendToOAuthProvider = thirdparty.generateStateToSendToOAuthProvider;
exports.getAuthCodeFromURL = thirdparty.getAuthCodeFromURL;
exports.getAuthErrorFromURL = thirdparty.getAuthErrorFromURL;
exports.getAuthStateFromURL = thirdparty.getAuthStateFromURL;
exports.getAuthorisationURLFromBackend = thirdparty.getAuthorisationURLFromBackend;
exports.getAuthorisationURLWithQueryParamsAndSetState = thirdparty.getAuthorisationURLWithQueryParamsAndSetState;
exports.getStateAndOtherInfoFromStorage = thirdparty.getStateAndOtherInfoFromStorage;
exports.init = thirdparty.init;
exports.redirectToThirdPartyLogin = thirdparty.redirectToThirdPartyLogin$1;
exports.setStateAndOtherInfoToStorage = thirdparty.setStateAndOtherInfoToStorage;
exports.signInAndUp = thirdparty.signInAndUp;
exports.signOut = thirdparty.signOut;
exports.verifyAndGetStateOrThrowError = thirdparty.verifyAndGetStateOrThrowError;
//# sourceMappingURL=thirdparty.js.map
