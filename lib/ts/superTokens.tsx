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
import { NormalisedAppInfo, ReactComponentClass, SuperTokensConfig } from "./types";
import { getCurrentNormalisedUrlPath, getRecipeIdFromSearch, isTest, normaliseInputAppInfoOrThrowError } from "./utils";
import NormalisedURLPath from "./normalisedURLPath";
const { getSuperTokensRoutesForReactRouterDom } = require("./components/superTokensRoute");
import { PathToComponentWithRecipeIdMap } from "./types";
import Session from "./recipe/session/session";

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
    private appInfo: NormalisedAppInfo;
    private recipeList: RecipeModule[] = [];
    private pathsToComponentWithRecipeIdMap?: PathToComponentWithRecipeIdMap;

    /*
     * Constructor.
     */
    constructor(config: SuperTokensConfig) {
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);

        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/starter-guide/frontend"
            );
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
            console.warn("SuperTokens was already initialized");
            return;
        }

        SuperTokens.instance = new SuperTokens(config);
    }

    private static getInstanceOrThrow(): SuperTokens {
        if (SuperTokens.instance === undefined) {
            throw new Error("SuperTokens must be initialized before calling this method.");
        }

        return SuperTokens.instance;
    }

    static getAppInfo(): NormalisedAppInfo {
        return SuperTokens.getInstanceOrThrow().getAppInfo();
    }

    static canHandleRoute(): boolean {
        return SuperTokens.getInstanceOrThrow().canHandleRoute();
    }

    static getRoutingComponent(): JSX.Element | undefined {
        return SuperTokens.getInstanceOrThrow().getRoutingComponent();
    }

    static getRecipeList(): RecipeModule[] {
        return SuperTokens.getInstanceOrThrow().getRecipeList();
    }

    static getPathsToComponentWithRecipeIdMap(): PathToComponentWithRecipeIdMap {
        return SuperTokens.getInstanceOrThrow().getPathsToComponentWithRecipeIdMap();
    }

    static getDefaultSessionRecipe(): Session | undefined {
        return SuperTokens.getInstanceOrThrow().getDefaultSessionRecipe();
    }

    static getMatchingComponentForRouteAndRecipeId(
        path: NormalisedURLPath,
        recipeId: string | null
    ): ReactComponentClass | undefined {
        return SuperTokens.getInstanceOrThrow().getMatchingComponentForRouteAndRecipeId(path, recipeId);
    }

    static getSuperTokensRoutesForReactRouterDom(): JSX.Element[] {
        return getSuperTokensRoutesForReactRouterDom();
    }

    /*
     * Instance Methods.
     */
    getAppInfo = (): NormalisedAppInfo => {
        return this.appInfo;
    };

    canHandleRoute = (): boolean => {
        return this.getRoutingComponent() !== undefined;
    };

    getRoutingComponent = (): JSX.Element | undefined => {
        const normalisedPath = getCurrentNormalisedUrlPath();
        const recipeId = getRecipeIdFromSearch(window.location.search);
        const Component = this.getMatchingComponentForRouteAndRecipeId(normalisedPath, recipeId);
        if (Component === undefined) {
            return undefined;
        }

        return <Component />;
    };

    getPathsToComponentWithRecipeIdMap = (): PathToComponentWithRecipeIdMap => {
        if (this.pathsToComponentWithRecipeIdMap !== undefined) {
            return this.pathsToComponentWithRecipeIdMap;
        }

        const pathsToComponentWithRecipeIdMap: PathToComponentWithRecipeIdMap = {};
        for (let i = 0; i < this.getRecipeList().length; i++) {
            const recipe = this.getRecipeList()[i];
            const features = recipe.getFeatures();
            const featurePaths = Object.keys(features);
            for (let j = 0; j < featurePaths.length; j++) {
                // If no components yet for this route, initialize empty array.
                const featurePath = featurePaths[j];
                if (pathsToComponentWithRecipeIdMap[featurePath] === undefined) {
                    pathsToComponentWithRecipeIdMap[featurePath] = [];
                }

                pathsToComponentWithRecipeIdMap[featurePath].push({
                    rid: recipe.getRecipeId(),
                    component: features[featurePath]
                });
            }
        }

        this.pathsToComponentWithRecipeIdMap = pathsToComponentWithRecipeIdMap;
        return this.pathsToComponentWithRecipeIdMap;
    };

    getMatchingComponentForRouteAndRecipeId = (
        normalisedUrl: NormalisedURLPath,
        recipeId: string | null
    ): ReactComponentClass | undefined => {
        const path = normalisedUrl.getAsStringDangerous();
        const routeComponents = this.getPathsToComponentWithRecipeIdMap()[path];
        if (routeComponents === undefined) {
            return undefined;
        }

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
    };

    getRecipeList = (): RecipeModule[] => {
        return this.recipeList;
    };

    getDefaultSessionRecipe = (): Session | undefined => {
        return this.getRecipeList().find(recipe => {
            return recipe.getRecipeId() === Session.RECIPE_ID;
        }) as Session;
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
