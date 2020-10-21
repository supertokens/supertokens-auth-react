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
var superTokens_1 = require("../superTokens");
function getSuperTokensRoutesForReactDomRouter() {
    try {
        var Route_1 = require("react-router-dom").Route;
        var routes_1 = [];
        superTokens_1.default.getRecipeList().map(function(recipe) {
            var features = recipe.getFeatures();
            return Object.keys(features).map(function(featurePath) {
                var fullPath = "" + superTokens_1.default.getAppInfo().websiteBasePath + featurePath;
                // if (!feature.disableDefaultRoute) { //TODO
                routes_1.push(
                    React.createElement(Route_1, {
                        exact: true,
                        key: "st-" + fullPath,
                        path: fullPath,
                        component: features[featurePath]
                    })
                );
            });
        });
        return routes_1;
    } catch (e) {
        return [];
    }
}
exports.getSuperTokensRoutesForReactDomRouter = getSuperTokensRoutesForReactDomRouter;
