"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

require("react/jsx-runtime");
require("react");
var ui = require("./index2.js");
require("./superTokens.js");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/recipe/thirdparty");
require("supertokens-web-js/recipe/session");

exports.canHandleRoute = ui.canHandleRoute;
exports.default = ui.UI;
exports.getRoutingComponent = ui.getRoutingComponent;
exports.getSuperTokensRoutesForReactRouterDom = ui.getSuperTokensRoutesForReactRouterDom;
//# sourceMappingURL=ui.js.map
