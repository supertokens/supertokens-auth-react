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
var __1 = require("../");
/*
 * Class.
 */
var RecipeModule = /** @class */ (function() {
    function RecipeModule(config) {
        this.recipeId = config.recipeId;
        this.features = config.features;
    }
    RecipeModule.prototype.getRecipeId = function() {
        return this.recipeId;
    };
    RecipeModule.prototype.canHandleRoute = function(route, rId) {
        // If rId from URL exists and doesn't match, or if route path doesn't start with return false.
        if (rId !== null && rId !== this.recipeId) {
            return false;
        }
        // Otherwise, if recipeId matches, or if none was provided, check if url matches any module routes.
        // Remove websiteBasePath from normalised path to match with features hash keys.
        var routeWithoutBasePath = this.getNormalisedRouteWithoutWebsiteBasePath(route);
        return Boolean(this.features[routeWithoutBasePath]);
    };
    RecipeModule.prototype.getRoutingComponent = function(route, rId) {
        // If rId from URL exists and doesn't match, or if route path doesn't start with return undefined.
        if (rId !== null && rId !== this.recipeId) {
            return undefined;
        }
        var routeWithoutBasePath = this.getNormalisedRouteWithoutWebsiteBasePath(route);
        return this.features[routeWithoutBasePath];
    };
    RecipeModule.prototype.getNormalisedRouteWithoutWebsiteBasePath = function(path) {
        // If base path is present, remove it.
        if (path.startsWith(__1.default.getAppInfo().websiteBasePath)) {
            var newPath = path.slice(__1.default.getAppInfo().websiteBasePath.length);
            if (newPath.length === 0) {
                newPath = "/";
            }
            return newPath;
        }
        // Otherwise, return url unchanged.
        return path;
    };
    return RecipeModule;
})();
exports.default = RecipeModule;
