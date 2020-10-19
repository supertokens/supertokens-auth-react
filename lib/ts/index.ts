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
    constructor(config: SuperTokensConfig) {
        this.appInfo = {
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

        this.recipeList = config.recipeList;
    }

    /*
     * Instance Attributes.
     */
    private appInfo: AppInfo;
    private recipeList: RecipeModule[] = [];

    /*
     * Instance Methods.
     */
    getAppInfo(): AppInfo {
        return this.appInfo;
    }

    canHandleRoute(url: string): boolean {
        return this.recipeList.some(recipe => recipe.canHandleRoute(url));
    }

    getRoutingComponent(url: string) {
        // TODO
    }

    getRecipeList() {
        return this.recipeList;
    }

    /*
     * Static Attributes.
     */
    private static instance?: SuperTokens;

    /*
     * Static Methods.
     */
    static init(config: SuperTokensConfig) {
        if (SuperTokens.instance !== undefined) throw new Error("SuperTokens was already initialized");

        return (SuperTokens.instance = new SuperTokens(config));
    }

    private static getInstance(): SuperTokens {
        if (SuperTokens.instance === undefined)
            throw new Error("SuperTokens must be initialized before calling this method.");

        return SuperTokens.instance;
    }

    static getAppInfo(): AppInfo {
        return SuperTokens.getInstance().getAppInfo();
    }

    static canHandleRoute(url: string): boolean {
        return SuperTokens.getInstance().canHandleRoute(url);
    }

    static getRoutingComponent(url: string) {
        return SuperTokens.getInstance().getRoutingComponent(url);
    }

    static getRecipeList() {
        return SuperTokens.getInstance().getRecipeList();
    }

    /*
     * Tests methods.
     */
    static reset() {
        if (!isTest()) {
            return;
        }

        SuperTokens.instance = undefined;
    }
}

export const canHandleRoute = SuperTokens.canHandleRoute;
export const init = SuperTokens.init;
export const getRecipeList = SuperTokens.getRecipeList;
export const getRoutingComponent = SuperTokens.getRoutingComponent;
