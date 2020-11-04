"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

var _normalisedURLPath = _interopRequireDefault(require("./normalisedURLPath"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
    };
    return cache;
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || (_typeof(obj) !== "object" && typeof obj !== "function")) {
        return { default: obj };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj["default"] = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var _require = require("./components/superTokensRoute"),
    _getSuperTokensRoutesForReactRouterDom = _require.getSuperTokensRoutesForReactRouterDom;

/*
 * Class.
 */
var SuperTokens = /*#__PURE__*/ (function() {
    /*
     * Static Attributes.
     */

    /*
     * Instance Attributes.
     */

    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;

        _classCallCheck(this, SuperTokens);

        this.recipeList = [];

        this.getAppInfo = function() {
            return _this.appInfo;
        };

        this.canHandleRoute = function() {
            return _this.getRoutingComponent() !== undefined;
        };

        this.getRoutingComponent = function() {
            var normalisedPath = (0, _utils.getCurrentNormalisedUrlPath)();
            var recipeId = (0, _utils.getRecipeIdFromSearch)(window.location.search);

            var Component = _this.getMatchingComponentForRouteAndRecipeId(normalisedPath, recipeId);

            if (Component === undefined) {
                return undefined;
            }

            return /*#__PURE__*/ React.createElement(Component, null);
        };

        this.getPathsToComponentWithRecipeIdMap = function() {
            if (_this.pathsToComponentWithRecipeIdMap !== undefined) {
                return _this.pathsToComponentWithRecipeIdMap;
            }

            var pathsToComponentWithRecipeIdMap = {};

            for (var i = 0; i < _this.getRecipeList().length; i++) {
                var recipe = _this.getRecipeList()[i];

                var features = recipe.getFeatures();
                var featurePaths = Object.keys(features);

                for (var j = 0; j < featurePaths.length; j++) {
                    // If no components yet for this route, initialize empty array.
                    var featurePath = featurePaths[j];

                    if (pathsToComponentWithRecipeIdMap[featurePath] === undefined) {
                        pathsToComponentWithRecipeIdMap[featurePath] = [];
                    }

                    pathsToComponentWithRecipeIdMap[featurePath].push({
                        rid: recipe.getRecipeId(),
                        component: features[featurePath]
                    });
                }
            }

            _this.pathsToComponentWithRecipeIdMap = pathsToComponentWithRecipeIdMap;
            return _this.pathsToComponentWithRecipeIdMap;
        };

        this.getMatchingComponentForRouteAndRecipeId = function(normalisedUrl, recipeId) {
            var path = normalisedUrl.getAsStringDangerous();

            var routeComponents = _this.getPathsToComponentWithRecipeIdMap()[path];

            if (routeComponents === undefined) {
                return undefined;
            } // If recipeId provided, try to find a match.

            if (recipeId !== null) {
                for (var i = 0; i < routeComponents.length; i++) {
                    if (recipeId === routeComponents[i].rid) {
                        return routeComponents[i].component;
                    }
                }
            } // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.

            return routeComponents[0].component;
        };

        this.getRecipeList = function() {
            return _this.recipeList;
        };

        this.appInfo = (0, _utils.normaliseInputAppInfoOrThrowError)(config.appInfo);

        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error("Please provide at least one recipe to the supertokens.init function call"); // TODO Add link to appropriate docs.
        }

        this.recipeList = config.recipeList.map(function(recipe) {
            return recipe(_this.appInfo);
        });
    }
    /*
     * Static Methods.
     */

    _createClass(SuperTokens, null, [
        {
            key: "init",
            value: function init(config) {
                if (SuperTokens.instance !== undefined) {
                    throw new Error("SuperTokens was already initialized");
                }

                SuperTokens.instance = new SuperTokens(config);
            }
        },
        {
            key: "getInstanceOrThrow",
            value: function getInstanceOrThrow() {
                if (SuperTokens.instance === undefined) {
                    throw new Error("SuperTokens must be initialized before calling this method.");
                }

                return SuperTokens.instance;
            }
        },
        {
            key: "getAppInfo",
            value: function getAppInfo() {
                return SuperTokens.getInstanceOrThrow().getAppInfo();
            }
        },
        {
            key: "canHandleRoute",
            value: function canHandleRoute() {
                return SuperTokens.getInstanceOrThrow().canHandleRoute();
            }
        },
        {
            key: "getRoutingComponent",
            value: function getRoutingComponent() {
                return SuperTokens.getInstanceOrThrow().getRoutingComponent();
            }
        },
        {
            key: "getRecipeList",
            value: function getRecipeList() {
                return SuperTokens.getInstanceOrThrow().getRecipeList();
            }
        },
        {
            key: "getPathsToComponentWithRecipeIdMap",
            value: function getPathsToComponentWithRecipeIdMap() {
                return SuperTokens.getInstanceOrThrow().getPathsToComponentWithRecipeIdMap();
            }
        },
        {
            key: "getMatchingComponentForRouteAndRecipeId",
            value: function getMatchingComponentForRouteAndRecipeId(path, recipeId) {
                var normalisedUrl = new _normalisedURLPath["default"](path);
                return SuperTokens.getInstanceOrThrow().getMatchingComponentForRouteAndRecipeId(
                    normalisedUrl,
                    recipeId
                );
            }
        },
        {
            key: "getSuperTokensRoutesForReactRouterDom",
            value: function getSuperTokensRoutesForReactRouterDom() {
                return _getSuperTokensRoutesForReactRouterDom();
            }
            /*
             * Instance Methods.
             */
        },
        {
            key: "reset",

            /*
             * Tests methods.
             */
            value: function reset() {
                if (!(0, _utils.isTest)()) {
                    return;
                }

                SuperTokens.instance = undefined;
                return;
            }
        }
    ]);

    return SuperTokens;
})();

exports["default"] = SuperTokens;
