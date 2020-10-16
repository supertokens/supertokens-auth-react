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
import { getUrlFromDomain, getRecipeIdFromUrl, isTest, cleanPath } from "./utils";
import RecipeModule from "./recipes/module";

/*
 * Consts.
 */

const apiBasePath = "/auth";
const websiteBasePath = "/auth";

/*
 * Interfaces.
 */

interface AppInfo {
    /*
     * The name of your application.
     */
    appName: string;

    /*
     * The API that connects with your application.
     */
    apiDomain: string;

    /*
     * The base path for SuperTokens middleware in your API.
     * Default to `/auth`
     */
    apiBasePath?: string;

    /*
     * The domain on which your application runs.
     */
    websiteDomain: string;

    /*
     * The base path for SuperTokens middleware in your front end application.
     * Default to `/auth`
     */
    websiteBasePath?: string;

    /*
     * (Optional) URL for your logo that will be displayed on the login form.
     */
    logoFullURL?: string;
}

interface SuperTokensConfig {
    appInfo: AppInfo;
    recipeList: Array<RecipeModule>;
}

/*
 * Class.
 */

export default class SuperTokens {
    /*
     * Attributes.
     */
    private static appInfo?: AppInfo;
    private static recipeList: Array<RecipeModule> = [];

    /*
     * Static methods.
     */
    static init(config: SuperTokensConfig) {
        if (SuperTokens.appInfo || SuperTokens.recipeList.length > 0)
            throw new Error("SuperTokens was already initialized");

        SuperTokens.appInfo = {
            appName: config.appInfo.appName,
            apiDomain: getUrlFromDomain(config.appInfo.apiDomain),
            apiBasePath: config.appInfo.apiBasePath || apiBasePath,
            websiteDomain: getUrlFromDomain(config.appInfo.websiteDomain),
            websiteBasePath:
                (config.appInfo.websiteBasePath && cleanPath(config.appInfo.websiteBasePath)) || websiteBasePath,
            logoFullURL: config.appInfo.logoFullURL || undefined
        };

        if (!config.recipeList) throw new Error("No recipeList provided to SuperTokens."); // TODO Add link to appropriate docs.

        SuperTokens.recipeList = config.recipeList;
    }

    static getAppInfo(): AppInfo {
        if (SuperTokens.appInfo === undefined)
            throw new Error("SuperTokens must be initialized before calling this method.");

        return SuperTokens.appInfo;
    }

    static handleRoute(url: string): boolean {
        return SuperTokens.recipeList.some(recipe => recipe.handleRoute(url));
    }

    static getRoutingComponent(url: string) {
        // TODO
    }

    static getRecipeList() {
        return SuperTokens.recipeList;
    }

    /*
     * Helpers.
     */
    static prependWebsiteBasePath(path: string): string {
        return `${SuperTokens.getAppInfo().websiteBasePath}${cleanPath(path)}`;
    }

    /*
     * Tests methods.
     */
    static reset() {
        if (!isTest()) return;

        SuperTokens.appInfo = undefined;
        SuperTokens.recipeList.length = 0;
    }
}
