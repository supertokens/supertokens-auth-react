"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var React = require("react");
var constants_1 = require("../constants");
var superTokens_1 = require("../superTokens");
var utils_1 = require("../utils");
function getSuperTokensRoutesForReactDomRouter() {
    try {
        var pathsToComponentWithRecipeIdMap_1 = {};
        superTokens_1.default.getRecipeList().map(function(recipe) {
            var features = recipe.getFeatures();
            return Object.keys(features).map(function(featurePath) {
                // if (!feature.disableDefaultRoute) { //TODO
                var fullPath = "" + superTokens_1.default.getAppInfo().websiteBasePath + featurePath;
                // If no components yet for this route, initialize empty array.
                if (!pathsToComponentWithRecipeIdMap_1[fullPath]) {
                    pathsToComponentWithRecipeIdMap_1[fullPath] = [];
                }
                pathsToComponentWithRecipeIdMap_1[fullPath].push({
                    rid: recipe.getRecipeId(),
                    component: features[featurePath]
                });
            });
        });
        return Object.keys(pathsToComponentWithRecipeIdMap_1).map(function(path) {
            return SuperTokensRouteWithRecipeId(path, pathsToComponentWithRecipeIdMap_1[path]);
        });
    } catch (e) {
        return [];
    }
}
exports.getSuperTokensRoutesForReactDomRouter = getSuperTokensRoutesForReactDomRouter;
function SuperTokensRouteWithRecipeId(path, routeComponents) {
    var Route = require("react-router-dom").Route;
    var recipeId = utils_1.getRecipeIdFromSearch(window.location.search);
    // If no recipe Id provided, return first matching component.
    if (recipeId === null)
        return React.createElement(Route, {
            exact: true,
            key: "st-" + path,
            path: path,
            component: routeComponents[0].component
        });
    // Otherwise, find matching recipeId.
    // let routeComponent: RouteComponent;
    for (var i = 0; i < routeComponents.length; i++) {
        if (recipeId === routeComponents[i].rid) {
            return React.createElement(Route, {
                exact: true,
                key: "st-" + path,
                path: path,
                component: routeComponents[i].component
            });
        }
    }
    // If no recipeId matches, return unknown recipe Id component.
    return React.createElement(Route, { exact: true, key: "st-" + path, path: path, component: UnknownRecipeId });
}
function UnknownRecipeId() {
    console.log("Unknown Recipe Id");
    return React.createElement("div", { className: constants_1.CLASS_UNKNOWN_RECIPE_ID });
}
