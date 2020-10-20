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
var superTokens_1 = require("../superTokens");
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
        this.canHandleRoute = function(url) {
            return _this.getRoutingComponent(url) !== undefined;
        };
        this.getRoutingComponent = function(url) {
            // If rId from URL exists and doesn't match, or if route path doesn't start with return undefined.
            if (url.recipeId !== null && url.recipeId !== _this.recipeId) {
                return undefined;
            }
            return _this.features[url.normalisedPathnameWithoutWebsiteBasePath];
        };
        this.getNormalisedRouteWithoutWebsiteBasePath = function(path) {
            // If base path is present, remove it.
            if (path.startsWith(superTokens_1.default.getAppInfo().websiteBasePath)) {
                var newPath = path.slice(superTokens_1.default.getAppInfo().websiteBasePath.length);
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
