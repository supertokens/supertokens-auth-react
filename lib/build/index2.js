"use strict";

var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var utils = require("./utils.js");

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
    RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList = function (normalisedUrl, preBuiltUIList) {
        var path = normalisedUrl.getAsStringDangerous();
        var routeComponents = preBuiltUIList.reduce(function (components, c) {
            var _a;
            var routes =
                (_a = c.getPathsToFeatureComponentWithRecipeIdMap) === null || _a === void 0
                    ? void 0
                    : _a.call(c)[path];
            return routes !== undefined ? components.concat(routes) : components;
        }, []);
        if (routeComponents.length === 0) {
            return undefined;
        }
        var component = routeComponents.find(function (c) {
            return c.matches();
        });
        if (component !== undefined) {
            return component;
        }
        // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
        return routeComponents[0];
    };
    return RecipeRouter;
})();

function RoutingComponent(props) {
    var _a, _b;
    var path = props.path;
    var location =
        (_a = props.getReactRouterDomWithCustomHistory()) === null || _a === void 0 ? void 0 : _a.useLocation();
    var componentToRender = React__default.default.useMemo(
        function () {
            var normalizedPath = new NormalisedURLPath__default.default(path);
            // During development, this runs twice so as to warn devs of if there
            // are any side effects that happen here. So in tests, it will result in
            // the console log twice
            return RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                normalizedPath,
                props.preBuiltUIList
            );
        },
        [path, location]
    ); // location dependency needs to be kept in order to get new component on url change
    var history =
        (_b = props.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useHistoryCustom();
    if (componentToRender === undefined) {
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
                        utils.__assign(
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
                utils.getCurrentNormalisedUrlPath(),
                recipeList
            ) !== undefined
        );
    };
    UI.getRoutingComponent = function (preBuiltUiClassList) {
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        return jsxRuntime.jsx(RoutingComponent, {
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            path: utils.getCurrentNormalisedUrlPath().getAsStringDangerous(),
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
//# sourceMappingURL=index2.js.map
