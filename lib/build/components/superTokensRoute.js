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
exports.getSuperTokensRoutesForReactRouterDom = getSuperTokensRoutesForReactRouterDom;

var React = _interopRequireWildcard(require("react"));

var _normalisedURLPath = _interopRequireDefault(require("../normalisedURLPath"));

var _superTokens = _interopRequireDefault(require("../superTokens"));

var _utils = require("../utils");

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

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom() {
    try {
        // eslint-disable-next-line
        var Route = require("react-router-dom").Route;

        var pathsToComponentWithRecipeIdMap = _superTokens["default"].getPathsToComponentWithRecipeIdMap();
        /*
         *  Sort by path length to make sure a shorter path doesn't take precedence
         * i.e. /auth/reset-password comes before /auth/
         */

        var matchingRoutes = Object.keys(pathsToComponentWithRecipeIdMap) // .sort((a, b) => b.length - a.length)
            .map(function(path) {
                return /*#__PURE__*/ React.createElement(
                    Route,
                    {
                        exact: true,
                        key: "st-".concat(path),
                        path: path
                    },
                    /*#__PURE__*/ React.createElement(SuperTokensRouteWithRecipeId, {
                        path: path
                    })
                );
            });

        var basePath = _superTokens["default"].getAppInfo().websiteBasePath.getAsStringDangerous();

        var catchUnknownBasePathRoute = /*#__PURE__*/ React.createElement(
            Route,
            {
                path: basePath,
                key: "st-basepath"
            },
            /*#__PURE__*/ React.createElement(CatchUnknownBasePathComponent, null)
        );
        return [].concat(_toConsumableArray(matchingRoutes), [catchUnknownBasePathRoute]);
    } catch (e) {
        // If react-router-dom is absent from dependencies, return [];
        return [];
    }
}

function SuperTokensRouteWithRecipeId(_ref) {
    var path = _ref.path;
    var recipeId = (0, _utils.getRecipeIdFromSearch)(window.location.search);
    var normalisedPath = new _normalisedURLPath["default"](path);

    var Component = _superTokens["default"].getMatchingComponentForRouteAndRecipeId(normalisedPath, recipeId);

    if (Component === undefined) {
        return null;
    }

    return /*#__PURE__*/ React.createElement(Component, null);
}

function CatchUnknownBasePathComponent() {
    try {
        var history = require("react-router-dom").useHistory();

        var redirectToBasePath = _superTokens["default"].getAppInfo().websiteBasePath.getAsStringDangerous();

        (0, _utils.redirectToInApp)(redirectToBasePath, "", history);
        return null;
    } catch (e) {
        return null;
    }
}
