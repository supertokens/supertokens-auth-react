"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuperTokensRoutesForReactRouterDomV6 = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var routingComponent_1 = require("./routingComponent");
/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDomV6(supertokensInstance) {
    var routerInfo = supertokensInstance.getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    var pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map(function (path) {
        path = path === "" ? "/" : path;
        return (0,
        jsx_runtime_1.jsx)(Route, { path: path, element: (0, jsx_runtime_1.jsx)(routingComponent_1.RoutingComponent, { supertokensInstance: supertokensInstance, path: path }) }, "st-".concat(path));
    });
}
exports.getSuperTokensRoutesForReactRouterDomV6 = getSuperTokensRoutesForReactRouterDomV6;
