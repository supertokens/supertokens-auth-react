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
var utils_1 = require("../utils");
var __1 = require("../");
/*
 * Class.
 */
var RecipeModule = /** @class */ (function() {
    function RecipeModule(config) {
        this.recipeId = config.recipeId;
        // Add websiteBasePath prefix to routes.
        this.routes = config.routes;
    }
    RecipeModule.prototype.getRecipeId = function() {
        return this.recipeId;
    };
    RecipeModule.prototype.canHandleRoute = function(urlString) {
        // If rId from URL exists and doesn't match, return false.
        var rIdFromUrl = utils_1.getRecipeIdFromUrl(urlString);
        if (rIdFromUrl !== null && rIdFromUrl !== this.recipeId) {
            return false;
        }
        var url = new URL(urlString);
        // Otherwise, if recipeId matches, or if none was provided, check if url matches any module routes.
        return this.routes.some(function(route) {
            return (
                utils_1.normalisePath(url.pathname) ===
                "" + __1.default.getAppInfo().websiteBasePath + utils_1.normalisePath(route)
            );
        });
    };
    return RecipeModule;
})();
exports.default = RecipeModule;
