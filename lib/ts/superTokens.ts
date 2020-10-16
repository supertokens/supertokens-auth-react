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
import RecipeModule from "./recipe/recipeModule";
import { DEFAULT_API_BASE_PATH, DEFAULT_WEBSITE_BASE_PATH } from "./constants";
import { AppInfo, SuperTokensConfig } from "./types";
import { ComponentClass } from "react";
import SuperTokensUrl from "./superTokensUrl";
import { isTest, normaliseURLPathOrThrowError, normaliseURLDomainOrThrowError } from "./utils";
const { getSuperTokensRoutesForReactRouterDom } = require("./components/superTokensRoute");

/*
 * Class.
 */

export default class SuperTokens {
    /*
     * Static Attributes.
     */
    private static instance?: SuperTokens;

    /*
     * Instance Attributes.
     */
    private appInfo: AppInfo;
    private recipeList: RecipeModule[] = [];

    /*
     * Constructor.
     */
    constructor(config: SuperTokensConfig) {
        this.appInfo = {
            appName: config.appInfo.appName,
            apiDomain: normaliseURLDomainOrThrowError(config.appInfo.apiDomain),
            websiteDomain: normaliseURLDomainOrThrowError(config.appInfo.websiteDomain),
            apiBasePath: SuperTokens.getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, config.appInfo.apiBasePath),
            websiteBasePath: SuperTokens.getNormalisedURLPathOrDefault(
                DEFAULT_WEBSITE_BASE_PATH,
                config.appInfo.websiteBasePath
            ),
            logoFullURL: config.appInfo.logoFullURL
        };

        if (config.recipeList === undefined) {
            throw new Error("No recipeList provided to SuperTokens."); // TODO Add link to appropriate docs.
        }

        this.recipeList = config.recipeList.map(recipe => {
            return recipe();
        });
    }

    /*
     * Static Methods.
     */
    static init(config: SuperTokensConfig): void {
        if (SuperTokens.instance !== undefined) {
            throw new Error("SuperTokens was already initialized");
        }

        SuperTokens.instance = new SuperTokens(config);
    }

    private static getInstanceIfDefined(): SuperTokens {
        if (SuperTokens.instance === undefined) {
            throw new Error("SuperTokens must be initialized before calling this method.");
        }

        return SuperTokens.instance;
    }

    static getAppInfo(): AppInfo {
        return SuperTokens.getInstanceIfDefined().getAppInfo();
    }

    static canHandleRoute(): boolean {
        return SuperTokens.getInstanceIfDefined().canHandleRoute();
    }

    static getRoutingComponent(): ComponentClass | undefined {
        return SuperTokens.getInstanceIfDefined().getRoutingComponent();
    }

    static getRecipeList(): RecipeModule[] {
        return SuperTokens.getInstanceIfDefined().getRecipeList();
    }

    static getNormalisedURLPathOrDefault(defaultPath: string, path?: string): string {
        if (path !== undefined) {
            return normaliseURLPathOrThrowError(path);
        } else {
            return defaultPath;
        }
    }

    static getSuperTokensRoutesForReactRouterDom(): JSX.Element[] {
        return getSuperTokensRoutesForReactRouterDom();
    }

    /*
     * Instance Methods.
     */
    getAppInfo = (): AppInfo => {
        return this.appInfo;
    };

    canHandleRoute = (): boolean => {
        const url = new SuperTokensUrl();

        // If pathname doesn't start with websiteBasePath, return false.
        if (!url.matchesBasePath) {
            return false;
        }

        return this.recipeList.some(recipe => recipe.canHandleRoute(url));
    };

    getRoutingComponent = (): ComponentClass | undefined => {
        const url = new SuperTokensUrl();

        // If pathname doesn't start with websiteBasePath, return false.
        if (!url.matchesBasePath) {
            return undefined;
        }

        let component: ComponentClass | undefined;
        for (let i = 0; i < this.recipeList.length; i++) {
            component = this.recipeList[i].getRoutingComponent(url);
            if (component !== undefined) {
                break;
            }
        }

        return component;
    };

    getRecipeList = (): RecipeModule[] => {
        return this.recipeList;
    };

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        SuperTokens.instance = undefined;
        return;
    }
}
