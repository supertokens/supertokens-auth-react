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
import { normaliseUrl, isTest, normalisePath } from "./utils";
import RecipeModule from "./recipes/recipeModule";
import { DEFAULT_API_BASE_PATH, DEFAULT_WEBSITE_BASE_PATH } from "./constants";
import { AppInfo, SuperTokensConfig } from "./types";

/*
 * Class.
 */

export default class SuperTokens {
    /*
     * Attributes.
     */
    private static appInfo?: AppInfo;
    private static recipeList: RecipeModule[] = [];

    /*
     * Static methods.
     */
    static init(config: SuperTokensConfig) {
        if (SuperTokens.appInfo || SuperTokens.recipeList.length > 0) {
            throw new Error("SuperTokens was already initialized");
        }

        SuperTokens.appInfo = {
            appName: config.appInfo.appName,
            apiDomain: normaliseUrl(config.appInfo.apiDomain),
            apiBasePath: config.appInfo.apiBasePath || DEFAULT_API_BASE_PATH,
            websiteDomain: normaliseUrl(config.appInfo.websiteDomain),
            websiteBasePath:
                (config.appInfo.websiteBasePath !== undefined && normalisePath(config.appInfo.websiteBasePath)) ||
                DEFAULT_WEBSITE_BASE_PATH,
            logoFullURL: config.appInfo.logoFullURL || undefined
        };

        if (config.recipeList === undefined) {
            throw new Error("No recipeList provided to SuperTokens."); // TODO Add link to appropriate docs.
        }

        SuperTokens.recipeList = config.recipeList;
    }

    static getAppInfo(): AppInfo {
        if (SuperTokens.appInfo === undefined) {
            throw new Error("SuperTokens must be initialized before calling this method.");
        }

        return SuperTokens.appInfo;
    }

    static canHandleRoute(url: string): boolean {
        return SuperTokens.recipeList.some(recipe => recipe.canHandleRoute(url));
    }

    static getRoutingComponent(url: string) {
        // TODO
    }

    static getRecipeList() {
        return SuperTokens.recipeList;
    }

    /*
     * Tests methods.
     */
    static reset() {
        if (!isTest()) {
            return;
        }

        SuperTokens.appInfo = undefined;
        SuperTokens.recipeList.length = 0;
    }
}
