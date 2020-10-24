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

var _superTokens = _interopRequireDefault(require("../superTokens"));

var _superTokensUrl = _interopRequireDefault(require("../superTokensUrl"));

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

/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/*
 * Imports.
 */

/*
 * SuperTokensRouteWithRecipeId
 * Using react-router-dom, we can only match based on the route and not on the combination of path and query params.
 * having one route per component would lead to clashes when two components have the same route but different recipeId,
 * the first one would always take precedence.
 * Hence, the component rendered in the Route is an abstraction that decides which Feature to render based
 * on the rId.
 * See SuperTokensRouteWithRecipeId below.
 */
function getSuperTokensRoutesForReactRouterDom() {
    try {
        var pathsToComponentWithRecipeIdMap = {};

        _superTokens["default"].getRecipeList().map(function(recipe) {
            var features = recipe.getFeatures();
            return Object.keys(features).map(function(featurePath) {
                // If no components yet for this route, initialize empty array.
                if (pathsToComponentWithRecipeIdMap[featurePath] === undefined) {
                    pathsToComponentWithRecipeIdMap[featurePath] = [];
                }

                pathsToComponentWithRecipeIdMap[featurePath].push({
                    rid: recipe.getRecipeId(),
                    component: features[featurePath]
                });
            });
        });

        return Object.keys(pathsToComponentWithRecipeIdMap).map(function(path) {
            return SuperTokensRouteWithRecipeId(path, pathsToComponentWithRecipeIdMap[path]);
        });
    } catch (e) {
        return [];
    }
}

function SuperTokensRouteWithRecipeId(path, routeComponents) {
    var Route = require("react-router-dom").Route;

    var recipeId = new _superTokensUrl["default"]().recipeId; // If recipeId provided, try to find a match.

    if (recipeId !== null) {
        for (var i = 0; i < routeComponents.length; i++) {
            if (recipeId === routeComponents[i].rid) {
                return /*#__PURE__*/ React.createElement(Route, {
                    exact: true,
                    key: "st-".concat(path),
                    path: path,
                    component: routeComponents[i].component
                });
            }
        }
    } // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.

    return /*#__PURE__*/ React.createElement(Route, {
        exact: true,
        key: "st-".concat(path),
        path: path,
        component: routeComponents[0].component
    });
}
