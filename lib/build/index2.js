"use strict";

var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var superTokens = require("./superTokens.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

var RecipeRouter = /** @class */ (function () {
    function RecipeRouter() {
        var _this = this;
        this.getPathsToFeatureComponentWithRecipeIdMap = function () {
            // Memoized version of the map.
            if (_this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
                return _this.pathsToFeatureComponentWithRecipeIdMap;
            }
            var pathsToFeatureComponentWithRecipeIdMap = {};
            var features = _this.getFeatures();
            var featurePaths = Object.keys(features);
            for (var j = 0; j < featurePaths.length; j++) {
                // If no components yet for this route, initialize empty array.
                var featurePath = featurePaths[j];
                if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                    pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
                }
                pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
            }
            _this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
            return _this.pathsToFeatureComponentWithRecipeIdMap;
        };
    }
    RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList = function (
        normalisedUrl,
        preBuiltUIList,
        defaultToStaticList
    ) {
        var _a;
        var path = normalisedUrl.getAsStringDangerous();
        var routeComponents = preBuiltUIList.reduce(function (components, c) {
            var routes = c.getPathsToFeatureComponentWithRecipeIdMap();
            for (var _i = 0, _a = Object.entries(routes); _i < _a.length; _i++) {
                var _b = _a[_i],
                    routePath = _b[0],
                    routeComps = _b[1];
                if (
                    routePath === path ||
                    new RegExp("^" + routePath.replace(/:\w+/g, "[^/]+").replace(/\/\*/g, "/[^/]+") + "$").test(path)
                ) {
                    components = components.concat(routeComps);
                }
            }
            return components;
        }, []);
        var dynamicLoginMethods = superTokens.Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods();
        var componentMatchingRid = routeComponents.find(function (c) {
            return c.matches();
        });
        if (
            superTokens.SuperTokens.usesDynamicLoginMethods === false ||
            (dynamicLoginMethods === undefined && defaultToStaticList)
        ) {
            if (routeComponents.length === 0) {
                return undefined;
            } else if (componentMatchingRid !== undefined) {
                return componentMatchingRid;
            } else {
                return routeComponents[0];
            }
        }
        if (dynamicLoginMethods === undefined) {
            throw new Error(
                "Should never come here: dynamic login methods info has not been loaded but recipeRouter rendered"
            );
        }
        // The related ADR: https://supertokens.com/docs/contribute/decisions/multitenancy/0006
        var priorityOrder = [
            { rid: "thirdpartyemailpassword", includes: ["thirdparty", "emailpassword"] },
            { rid: "thirdpartypasswordless", includes: ["thirdparty", "passwordless"] },
            { rid: "emailpassword", includes: ["emailpassword"] },
            { rid: "passwordless", includes: ["passwordless"] },
            { rid: "thirdparty", includes: ["thirdparty"] },
        ];
        if (
            componentMatchingRid && // if we find a component matching by rid
            (!priorityOrder
                .map(function (a) {
                    return a.rid;
                })
                .includes(componentMatchingRid.recipeID) || // from a non-auth recipe
                ((_a = dynamicLoginMethods[componentMatchingRid.recipeID]) === null || _a === void 0
                    ? void 0
                    : _a.enabled) === true) // or an enabled auth recipe
        ) {
            return componentMatchingRid;
        }
        var matchingNonAuthComponent = routeComponents.find(function (comp) {
            return !priorityOrder
                .map(function (a) {
                    return a.rid;
                })
                .includes(comp.recipeID);
        });
        if (matchingNonAuthComponent) {
            return matchingNonAuthComponent;
        }
        var enabledRecipeCount = Object.keys(dynamicLoginMethods).filter(function (key) {
            return dynamicLoginMethods[key].enabled;
        }).length;
        var _loop_1 = function (rid, includes) {
            if (
                enabledRecipeCount === includes.length &&
                includes.every(function (subRId) {
                    return dynamicLoginMethods[subRId].enabled;
                })
            ) {
                var matchingComp = routeComponents.find(function (comp) {
                    return comp.recipeID === rid;
                });
                if (matchingComp) {
                    return { value: matchingComp };
                }
            }
        };
        // We first try to find an exact match
        for (var _i = 0, priorityOrder_1 = priorityOrder; _i < priorityOrder_1.length; _i++) {
            var _b = priorityOrder_1[_i],
                rid = _b.rid,
                includes = _b.includes;
            var state_1 = _loop_1(rid, includes);
            if (typeof state_1 === "object") return state_1.value;
        }
        var _loop_2 = function (rid, includes) {
            if (
                includes.some(function (subRId) {
                    return dynamicLoginMethods[subRId].enabled;
                })
            ) {
                var matchingComp = routeComponents.find(function (comp) {
                    return comp.recipeID === rid;
                });
                if (matchingComp) {
                    return { value: matchingComp };
                }
            }
        };
        // We try to find a partial match
        for (var _c = 0, priorityOrder_2 = priorityOrder; _c < priorityOrder_2.length; _c++) {
            var _d = priorityOrder_2[_c],
                rid = _d.rid,
                includes = _d.includes;
            var state_2 = _loop_2(rid, includes);
            if (typeof state_2 === "object") return state_2.value;
        }
        // Otherwise, we throw since no there are is no overlap between recipes enabled on the FE and BE
        throw new Error("We found no enabled recipes handling the current route");
    };
    return RecipeRouter;
})();

function RoutingComponent(props) {
    var _a, _b;
    var _c = React.useState(
            superTokens.SuperTokens.usesDynamicLoginMethods === false ||
                superTokens.Multitenancy.getInstanceOrThrow().getLoadedDynamicLoginMethods() !== undefined
        ),
        loadedDynamicLoginMethods = _c[0],
        setLoadedDynamicLoginMethods = _c[1];
    var path = props.path;
    var location =
        (_a = props.getReactRouterDomWithCustomHistory()) === null || _a === void 0 ? void 0 : _a.useLocation();
    var componentToRender = React__default.default.useMemo(
        function () {
            var normalizedPath = new NormalisedURLPath__default.default(path);
            // During development, this runs twice so as to warn devs of if there
            // are any side effects that happen here. So in tests, it will result in
            // the console log twice
            if (loadedDynamicLoginMethods) {
                return RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                    normalizedPath,
                    props.preBuiltUIList,
                    false
                );
            }
            return undefined;
            // location dependency needs to be kept in order to get new component on url change
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [path, location, loadedDynamicLoginMethods, props.preBuiltUIList]
    );
    React.useEffect(function () {
        var handler = function () {
            setLoadedDynamicLoginMethods(true);
        };
        superTokens.SuperTokens.uiController.on("LoginMethodsLoaded", handler);
    }, []);
    var history =
        (_b = props.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useHistoryCustom();
    if (componentToRender === undefined || loadedDynamicLoginMethods === false) {
        return null;
    }
    return jsxRuntime.jsx(componentToRender.component, { history: history });
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom$1(_a) {
    var getReactRouterDomWithCustomHistory = _a.getReactRouterDomWithCustomHistory,
        recipeList = _a.recipeList;
    var routerInfo = getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    return Object.values(
        recipeList.reduce(function (routes, recipe) {
            var pathsToFeatureComponentWithRecipeIdMap = recipe.getPathsToFeatureComponentWithRecipeIdMap();
            Object.keys(pathsToFeatureComponentWithRecipeIdMap).forEach(function (path) {
                path = path === "" ? "/" : path;
                if (!(path in routes)) {
                    routes[path] = jsxRuntime.jsx(
                        Route,
                        superTokens.__assign(
                            { exact: true, path: path },
                            {
                                children: jsxRuntime.jsx(RoutingComponent, {
                                    getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory,
                                    preBuiltUIList: recipeList,
                                    path: path,
                                }),
                            }
                        ),
                        "st-".concat(path)
                    );
                }
            });
            return routes;
        }, {})
    );
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDomV6(_a) {
    var getReactRouterDomWithCustomHistory = _a.getReactRouterDomWithCustomHistory,
        recipeList = _a.recipeList;
    var routerInfo = getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    return Object.values(
        recipeList.reduce(function (routes, recipe) {
            var pathsToFeatureComponentWithRecipeIdMap = recipe.getPathsToFeatureComponentWithRecipeIdMap();
            Object.keys(pathsToFeatureComponentWithRecipeIdMap).forEach(function (path) {
                path = path === "" ? "/" : path;
                if (!(path in routes)) {
                    routes[path] = jsxRuntime.jsx(
                        Route,
                        {
                            path: path,
                            element: jsxRuntime.jsx(RoutingComponent, {
                                getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory,
                                preBuiltUIList: recipeList,
                                path: path,
                            }),
                        },
                        "st-".concat(path)
                    );
                }
            });
            return routes;
        }, {})
    );
}

var UI = /** @class */ (function () {
    function UI() {}
    UI.getSuperTokensRoutesForReactRouterDom = function (reactRouterDom, preBuiltUiClassList) {
        if (preBuiltUiClassList === void 0) {
            preBuiltUiClassList = [];
        }
        if (reactRouterDom === undefined || preBuiltUiClassList.length === 0) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getSuperTokensRoutesForReactRouterDom like getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [EmailPasswordPreBuiltUI]) in your render function'
            );
        }
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        if (UI.reactRouterDomIsV6 === undefined) {
            UI.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (UI.reactRouterDomIsV6) {
            if (UI.reactRouterDom === undefined) {
                // this function wraps the react-router-dom v6 useNavigate function in a way
                // that enforces that it runs within a useEffect. The reason we do this is
                // cause of https://github.com/remix-run/react-router/issues/7460
                // which gets shown when visiting a social auth callback url like
                // /auth/callback/github, without a valid code or state. This then
                // doesn't navigate the user to the auth page.
                var useNavigateHookForRRDV6 = function () {
                    var navigateHook = reactRouterDom.useNavigate();
                    var _a = React__default.default.useState(undefined),
                        to = _a[0],
                        setTo = _a[1];
                    React__default.default.useEffect(
                        function () {
                            if (to !== undefined) {
                                setTo(undefined);
                                navigateHook(to);
                            }
                        },
                        [to, navigateHook, setTo]
                    );
                    return setTo;
                };
                UI.reactRouterDom = {
                    router: reactRouterDom,
                    useHistoryCustom: useNavigateHookForRRDV6,
                    useLocation: reactRouterDom.useLocation,
                };
            }
            return getSuperTokensRoutesForReactRouterDomV6({
                getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
                recipeList: recipeList,
            });
        }
        if (UI.reactRouterDom === undefined) {
            UI.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: reactRouterDom.useHistory,
                useLocation: reactRouterDom.useLocation,
            };
        }
        return getSuperTokensRoutesForReactRouterDom$1({
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            recipeList: recipeList,
        });
    };
    UI.canHandleRoute = function (preBuiltUiClassList) {
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        return (
            RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                superTokens.getCurrentNormalisedUrlPath(),
                recipeList,
                true
            ) !== undefined
        );
    };
    UI.getRoutingComponent = function (preBuiltUiClassList) {
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        return jsxRuntime.jsx(RoutingComponent, {
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            path: superTokens.getCurrentNormalisedUrlPath().getAsStringDangerous(),
            preBuiltUIList: recipeList,
        });
    };
    UI.getReactRouterDomWithCustomHistory = function () {
        return UI.reactRouterDom;
    };
    return UI;
})();
var getSuperTokensRoutesForReactRouterDom = UI.getSuperTokensRoutesForReactRouterDom;
var canHandleRoute = UI.canHandleRoute;
var getRoutingComponent = UI.getRoutingComponent;

exports.RecipeRouter = RecipeRouter;
exports.UI = UI;
exports.canHandleRoute = canHandleRoute;
exports.getRoutingComponent = getRoutingComponent;
exports.getSuperTokensRoutesForReactRouterDom = getSuperTokensRoutesForReactRouterDom;
