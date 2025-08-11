'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./utils.js');
var uiEntry = require('./index2.js');
require('./superTokens.js');
var translationContext = require('./translationContext.js');
require('react');
require('supertokens-web-js/lib/build/error');
require('supertokens-web-js/utils/cookieHandler');
require('supertokens-web-js/utils/normalisedURLDomain');
require('supertokens-web-js/utils/normalisedURLPath');
require('supertokens-web-js/utils/windowHandler');
require('crypto');
require('react/jsx-runtime');
require('react-dom');
require('./multitenancy-shared.js');
require('./genericComponentOverrideContext.js');
require('./multifactorauth-shared2.js');
require('supertokens-web-js/recipe/multifactorauth');
require('supertokens-web-js/utils');
require('supertokens-web-js/utils/postSuperTokensInitCallbacks');
require('supertokens-web-js/utils/sessionClaimValidatorStore');
require('./recipeModule-shared.js');
require('./multifactorauth-shared.js');
require('supertokens-web-js/recipe/session');
require('./oauth2provider-shared.js');
require('supertokens-web-js/recipe/oauth2provider');
require('./authRecipe-shared.js');
require('supertokens-web-js/lib/build/normalisedURLPath');
require('supertokens-web-js');
require('supertokens-web-js/recipe/multitenancy');



exports.SuperTokensWrapper = uiEntry.SuperTokensWrapper;
exports.changeLanguage = uiEntry.changeLanguage;
exports.default = uiEntry.SuperTokensAPIWrapper;
exports.init = uiEntry.init;
exports.loadTranslation = uiEntry.loadTranslation;
exports.redirectToAuth = uiEntry.redirectToAuth;
exports.useUserContext = uiEntry.useUserContext;
exports.useTranslation = translationContext.useTranslation;
