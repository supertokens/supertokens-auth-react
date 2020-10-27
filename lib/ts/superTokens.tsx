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
import * as React from "react";
import RecipeModule from "./recipe/recipeModule";
import { DEFAULT_API_BASE_PATH, DEFAULT_WEBSITE_BASE_PATH } from "./constants";
import { AppInfo, ReactComponentClass, SuperTokensConfig } from "./types";
import { ComponentClass } from "react";
import { getRecipeIdFromSearch, isTest } from "./utils";
import NormalisedURLDomain from "./normalisedURLDomain";
import NormalisedURLPath from "./normalisedURLPath";
const { getSuperTokensRoutesForReactRouterDom } = require("./components/superTokensRoute");
import { PathToComponentWithRecipeIdMap } from "./types";

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
    private pathsToComponentWithRecipeIdMap?: PathToComponentWithRecipeIdMap;

    /*
     * Constructor.
     */
    constructor(config: SuperTokensConfig) {
        this.appInfo = {
            appName: config.appInfo.appName,
            apiDomain: new NormalisedURLDomain(config.appInfo.apiDomain),
            websiteDomain: new NormalisedURLDomain(config.appInfo.websiteDomain),
            apiBasePath: SuperTokens.getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, config.appInfo.apiBasePath),
            websiteBasePath: SuperTokens.getNormalisedURLPathOrDefault(
                DEFAULT_WEBSITE_BASE_PATH,
                config.appInfo.websiteBasePath
            )
        };

        if (config.recipeList === undefined) {
            throw new Error("No recipeList provided to SuperTokens."); // TODO Add link to appropriate docs.
        }

        this.recipeList = config.recipeList.map(recipe => {
            return recipe(this.appInfo);
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

    private static getInstanceOrThrow(): SuperTokens {
        if (SuperTokens.instance === undefined) {
            throw new Error("SuperTokens must be initialized before calling this method.");
        }

        return SuperTokens.instance;
    }

    static getAppInfo(): AppInfo {
        return SuperTokens.getInstanceOrThrow().getAppInfo();
    }

    static canHandleRoute(): boolean {
        return SuperTokens.getInstanceOrThrow().canHandleRoute();
    }

    static getRoutingComponent(): ReactComponentClass | undefined {
        return SuperTokens.getInstanceOrThrow().getRoutingComponent();
    }

    static getRecipeList(): RecipeModule[] {
        return SuperTokens.getInstanceOrThrow().getRecipeList();
    }

    static getPathsToComponentWithRecipeIdMap (): PathToComponentWithRecipeIdMap {
        return SuperTokens.getInstanceOrThrow().getPathsToComponentWithRecipeIdMap();
     }
   
     
    static getMatchingComponentForRouteAndRecipeId(path: string, recipeId: string | null): ReactComponentClass | undefined {
        return SuperTokens.getInstanceOrThrow().getMatchingComponentForRouteAndRecipeId(path, recipeId);
    }

    static getNormalisedURLPathOrDefault(defaultPath: string, path?: string): NormalisedURLPath {
        if (path !== undefined) {
            return new NormalisedURLPath(path);
        } else {
            return new NormalisedURLPath(defaultPath);
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
        const path = new NormalisedURLPath(window.location.pathname)
        return this.getPathsToComponentWithRecipeIdMap()[path.getAsStringDangerous()] !== undefined;
    };

    getRoutingComponent = (): ReactComponentClass | undefined => {
        const path = new NormalisedURLPath(window.location.pathname);
	    const recipeId = getRecipeIdFromSearch(window.location.search);
        return this.getMatchingComponentForRouteAndRecipeId(path.getAsStringDangerous(), recipeId);

    };

    getPathsToComponentWithRecipeIdMap = (): PathToComponentWithRecipeIdMap  => {
        if (this.pathsToComponentWithRecipeIdMap)
            return this.pathsToComponentWithRecipeIdMap;

        let pathsToComponentWithRecipeIdMap: PathToComponentWithRecipeIdMap = {};
        for (let i = 0; i < this.getRecipeList().length; i++) {
            const recipe = this.getRecipeList()[i];
            const features = recipe.getFeatures();
            const featurePaths = Object.keys(features);
            for (let j = 0; j < featurePaths.length; j++) {
                // If no components yet for this route, initialize empty array.
                const featurePath = featurePaths[j];
                if (pathsToComponentWithRecipeIdMap[featurePath] === undefined) {
                    pathsToComponentWithRecipeIdMap[featurePath] = []
                }

                pathsToComponentWithRecipeIdMap[featurePath].push({
                    rid: recipe.getRecipeId(),
                    component: features[featurePath]
                });
            }
        }

        this.pathsToComponentWithRecipeIdMap = pathsToComponentWithRecipeIdMap
        return this.pathsToComponentWithRecipeIdMap;
    }

    getMatchingComponentForRouteAndRecipeId = (path: string, recipeId: string | null): ReactComponentClass | undefined => {
        const routeComponents = SuperTokens.getPathsToComponentWithRecipeIdMap()[path];
        if (routeComponents === undefined)
            return undefined;

	    // If recipeId provided, try to find a match.
        if (recipeId !== null) {
            for (let i = 0; i < routeComponents.length; i++) {
                if (recipeId === routeComponents[i].rid) {
                    return routeComponents[i].component;
                }
            }
        }

	    // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
        return routeComponents[0].component;

    }

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
