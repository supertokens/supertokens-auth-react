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
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom() {
    try {
        var pathsToComponentWithRecipeIdMap = _superTokens["default"].getPathsToComponentWithRecipeIdMap();

        return Object.keys(pathsToComponentWithRecipeIdMap).map(function(path) {
            return /*#__PURE__*/ React.createElement(SuperTokensRouteWithRecipeId, {
                key: "st-".concat(path),
                path: path
            });
        });
    } catch (e) {
        // If react-router-dom is absent from dependencies, return [];
        return [];
    }
}

function SuperTokensRouteWithRecipeId(_ref) {
    var path = _ref.path;

    var Route = require("react-router-dom").Route;

    var recipeId = (0, _utils.getRecipeIdFromSearch)(window.location.search);

    var component = _superTokens["default"].getMatchingComponentForRouteAndRecipeId(path, recipeId);

    return /*#__PURE__*/ React.createElement(Route, {
        exact: true,
        key: "st-".concat(path),
        path: path,
        component: component
    });
}
