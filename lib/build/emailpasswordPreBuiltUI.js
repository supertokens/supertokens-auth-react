"use strict";

require("./recipeModule-shared.js");
require("react/jsx-runtime");
require("supertokens-web-js/utils/normalisedURLPath");
require("./session-shared.js");
require("./SuperTokensBranding.js");
var emailpasswordPreBuiltUI = require("./emailpassword-shared2.js");
require("./emailpassword-shared3.js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("./session-shared2.js");
require("supertokens-web-js/recipe/session/recipe");
require("./session-shared3.js");
require("supertokens-web-js/recipe/session");
require("./translationContext.js");
require("./index2.js");
require("./authRecipe-shared.js");
require("supertokens-web-js/recipe/emailpassword/recipeImplementation");
require("./translations.js");
require("react-dom");
require("./emailverification-shared2.js");
require("./index.js");
require("supertokens-web-js/utils/error");
require("./emailpassword-shared.js");

exports.EmailPasswordPreBuiltUI = emailpasswordPreBuiltUI.EmailPasswordPreBuiltUI;
exports.ResetPasswordUsingToken = emailpasswordPreBuiltUI.ResetPasswordUsingToken;
exports.ResetPasswordUsingTokenTheme = emailpasswordPreBuiltUI.ResetPasswordUsingTokenThemeWrapper;
exports.SignInAndUp = emailpasswordPreBuiltUI.SignInAndUp;
exports.SignInAndUpTheme = emailpasswordPreBuiltUI.SignInAndUpThemeWrapper;
exports.canHandleRoute = emailpasswordPreBuiltUI.canHandleRoute;
exports.getFeatureComponent = emailpasswordPreBuiltUI.getFeatureComponent;
exports.getFeatures = emailpasswordPreBuiltUI.getFeatures;
exports.getRoutingComponent = emailpasswordPreBuiltUI.getRoutingComponent;
//# sourceMappingURL=emailpasswordPreBuiltUI.js.map
