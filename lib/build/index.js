"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

require("./genericComponentOverrideContext.js");
var uiEntry = require("./index2.js");
var translationContext = require("./translationContext.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("react/jsx-runtime");
require("react-dom");
require("./multitenancy-shared.js");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");
require("./multifactorauth-shared.js");
require("supertokens-web-js/recipe/session");
require("./oauth2provider-shared.js");
require("supertokens-web-js/recipe/oauth2provider");
require("./authRecipe-shared.js");
require("supertokens-web-js/lib/build/normalisedURLPath");

exports.SuperTokensWrapper = uiEntry.SuperTokensWrapper;
exports.changeLanguage = uiEntry.changeLanguage;
exports.default = uiEntry.SuperTokensAPIWrapper;
exports.init = uiEntry.init;
exports.loadTranslation = uiEntry.loadTranslation;
exports.redirectToAuth = uiEntry.redirectToAuth;
exports.useUserContext = uiEntry.useUserContext;
exports.useTranslation = translationContext.useTranslation;
