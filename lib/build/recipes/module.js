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
const utils_1 = require("../utils");
const __1 = require("../");
/*
 * Class.
 */
class RecipeModule {
    constructor(config) {
        this.recipeId = config.recipeId;
        // Add websiteBasePath prefix to routes.
        this.routes = config.routes;
    }
    static getInstanceIfDefined() {
        throw new Error("Unimplemented method");
    }
    static init(config) {
        throw new Error("Unimplemented method");
    }
    handleRoute(urlString) {
        // If rId from URL exists and doesn't match, return false.
        const rIdFromUrl = utils_1.getRecipeIdFromUrl(urlString);
        if (rIdFromUrl !== null && rIdFromUrl !== this.recipeId) return false;
        const url = new URL(urlString);
        // Otherwise, if recipeId matches, or if none was provided, check if url matches any module routes.
        return this.routes.some(route => {
            return utils_1.cleanPath(url.pathname) === __1.default.prependWebsiteBasePath(route);
        });
    }
}
exports.default = RecipeModule;
