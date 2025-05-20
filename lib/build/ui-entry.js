'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./utils.js');
require('react/jsx-runtime');
require('react');
var uiEntry = require('./index2.js');
require('./superTokens.js');
require('supertokens-web-js/utils/cookieHandler');
require('supertokens-web-js/utils/normalisedURLDomain');
require('supertokens-web-js/utils/normalisedURLPath');
require('supertokens-web-js/utils/windowHandler');
require('crypto');
require('./translationContext.js');
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



exports.AuthPage = uiEntry.AuthPage;
exports.AuthPageComponentList = uiEntry.AuthPageComponentList;
exports.AuthPageFooter = uiEntry.AuthPageFooter;
exports.AuthPageHeader = uiEntry.AuthPageHeader;
exports.AuthPageTheme = uiEntry.AuthPageTheme;
exports.AuthRecipeComponentsOverrideContextProvider = uiEntry.Provider;
exports.canHandleRoute = uiEntry.canHandleRoute;
exports.default = uiEntry.UI;
exports.getRoutingComponent = uiEntry.getRoutingComponent;
exports.getSuperTokensRoutesForReactRouterDom = uiEntry.getSuperTokensRoutesForReactRouterDom;
