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
var supertokens_1 = require("../supertokens");
/*
 * Class.
 */
var RecipeModule = /** @class */ (function() {
    function RecipeModule(config) {
        var _this = this;
        this.getRecipeId = function() {
            return _this.recipeId;
        };
        this.getFeatures = function() {
            return _this.features;
        };
        this.canHandleRoute = function(route, rId) {
            // If rId from URL exists and doesn't match, or if route path doesn't start with return false.
            if (rId !== null && rId !== _this.recipeId) {
                return false;
            }
            // Otherwise, if recipeId matches, or if none was provided, check if url matches any module routes.
            // Remove websiteBasePath from normalised path to match with features hash keys.
            var routeWithoutBasePath = _this.getNormalisedRouteWithoutWebsiteBasePath(route);
            return _this.features[routeWithoutBasePath] !== undefined;
        };
        this.getRoutingComponent = function(route, rId) {
            // If rId from URL exists and doesn't match, or if route path doesn't start with return undefined.
            if (rId !== null && rId !== _this.recipeId) {
                return undefined;
            }
            var routeWithoutBasePath = _this.getNormalisedRouteWithoutWebsiteBasePath(route);
            return _this.features[routeWithoutBasePath];
        };
        this.getNormalisedRouteWithoutWebsiteBasePath = function(path) {
            // If base path is present, remove it.
            if (path.startsWith(supertokens_1.default.getAppInfo().websiteBasePath)) {
                var newPath = path.slice(supertokens_1.default.getAppInfo().websiteBasePath.length);
                if (newPath.length === 0) {
                    newPath = "/";
                }
                return newPath;
            }
            // Otherwise, return url unchanged.
            return path;
        };
        this.recipeId = config.recipeId;
        this.features = config.features;
    }
    return RecipeModule;
})();
exports.default = RecipeModule;
