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

import { cleanPath, getRecipeIdFromUrl } from "../utils";
import SuperTokens from "../";

/*
 * Interface.
 */
export interface RecipeModuleConfig {
    routes: Array<string>;
    recipeId: string;
}

/*
 * Class.
 */
export default class RecipeModule {
    private routes: Array<string>;
    private recipeId: string;

    constructor(config: RecipeModuleConfig) {
        this.recipeId = config.recipeId;
        // Add websiteBasePath prefix to routes.
        this.routes = config.routes;
    }

    static getInstanceIfDefined() {
        throw new Error("Unimplemented method");
    }

    static init(config: RecipeModuleConfig) {
        throw new Error("Unimplemented method");
    }

    handleRoute(urlString: string): boolean {
        // If rId from URL exists and doesn't match, return false.
        const rIdFromUrl = getRecipeIdFromUrl(urlString);
        if (rIdFromUrl !== null && rIdFromUrl !== this.recipeId) return false;

        const url = new URL(urlString);

        // Otherwise, if recipeId matches, or if none was provided, check if url matches any module routes.
        return this.routes.some(route => {
            return cleanPath(url.pathname) === SuperTokens.prependWebsiteBasePath(route);
        });
    }
}
