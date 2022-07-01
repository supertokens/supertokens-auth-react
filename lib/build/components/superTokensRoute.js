"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuperTokensRoutesForReactRouterDom = void 0;
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
        jsx_runtime_1.jsx)(Route, __assign({ exact: true, path: path }, { children: (0, jsx_runtime_1.jsx)(routingComponent_1.RoutingComponent, { supertokensInstance: supertokensInstance, path: path }) }), "st-".concat(path));
    });
}
exports.getSuperTokensRoutesForReactRouterDom = getSuperTokensRoutesForReactRouterDom;
