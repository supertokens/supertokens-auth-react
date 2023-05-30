"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

require("react/jsx-runtime");
require("react");
var uiEntry = require("./index2.js");
require("./utils.js");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/windowHandler");

exports.canHandleRoute = uiEntry.canHandleRoute;
exports.default = uiEntry.UI;
exports.getRoutingComponent = uiEntry.getRoutingComponent;
exports.getSuperTokensRoutesForReactRouterDom = uiEntry.getSuperTokensRoutesForReactRouterDom;
