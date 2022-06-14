"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuperTokensRoutesForReactRouterDom = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var routingComponent_1 = require("./routingComponent");
/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom(supertokensInstance) {
    var routerInfo = supertokensInstance.getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    var pathsToFeatureComponentWithRecipeIdMap = supertokensInstance.getPathsToFeatureComponentWithRecipeIdMap();
    return Object.keys(pathsToFeatureComponentWithRecipeIdMap).map(function (path) {
        path = path === "" ? "/" : path;
        return (0,
        jsx_runtime_1.jsx)(Route, tslib_1.__assign({ exact: true, path: path }, { children: (0, jsx_runtime_1.jsx)(routingComponent_1.RoutingComponent, { supertokensInstance: supertokensInstance, path: path }) }), "st-".concat(path));
    });
}
exports.getSuperTokensRoutesForReactRouterDom = getSuperTokensRoutesForReactRouterDom;
