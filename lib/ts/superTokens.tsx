/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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
import { ComponentWithRecipeAndMatchingMethod, NormalisedAppInfo, SuperTokensConfig } from "./types";
import { getCurrentNormalisedUrlPath, isTest, normaliseInputAppInfoOrThrowError } from "./utils";
import NormalisedURLPath from "./normalisedURLPath";
const { getSuperTokensRoutesForReactRouterDom } = require("./components/superTokensRoute");
import { BaseFeatureComponentMap } from "./types";
import { SSR_ERROR } from "./constants";

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
    appInfo: NormalisedAppInfo;
    recipeList: RecipeModule<unknown, unknown, unknown>[] = [];
    private pathsToFeatureComponentWithRecipeIdMap?: BaseFeatureComponentMap;
    private useReactRouterDom: boolean;
    private reactRouterDom?: any;

    /*
     * Constructor.
     */
    constructor(config: SuperTokensConfig) {
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);

        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }

        this.recipeList = config.recipeList.map((recipe) => {
            return recipe(this.appInfo);
        });

        // Get react router dom if present and not disabled by user.
        this.useReactRouterDom = config.useReactRouterDom === false ? false : true;
        if (this.useReactRouterDom) {
            try {
                this.reactRouterDom = require("react-router-dom");
            } catch (e) {
                this.useReactRouterDom = false;
            }
        }
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

    static getInstanceOrThrow(): SuperTokens {
        if (SuperTokens.instance === undefined) {
            let error = "SuperTokens must be initialized before calling this method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw new Error(error);
        }

        return SuperTokens.instance;
    }

    static canHandleRoute(): boolean {
        return SuperTokens.getInstanceOrThrow().canHandleRoute();
    }

    static getRoutingComponent(): JSX.Element | undefined {
        return SuperTokens.getInstanceOrThrow().getRoutingComponent();
    }

    static getSuperTokensRoutesForReactRouterDom(): JSX.Element[] {
        return getSuperTokensRoutesForReactRouterDom();
    }

    /*
     * Instance Methods.
     */
    canHandleRoute = (): boolean => {
        return this.getRoutingComponent() !== undefined;
    };

    getRoutingComponent = (): JSX.Element | undefined => {
        const normalisedPath = getCurrentNormalisedUrlPath();
        const FeatureComponentWithRecipeId = this.getMatchingComponentForRouteAndRecipeId(normalisedPath);
        if (FeatureComponentWithRecipeId === undefined) {
            return undefined;
        }
        return <FeatureComponentWithRecipeId.component recipeId={FeatureComponentWithRecipeId.rid} />;
    };

    getPathsToFeatureComponentWithRecipeIdMap = (): BaseFeatureComponentMap => {
        // Memoized version of the map.
        if (this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
            return this.pathsToFeatureComponentWithRecipeIdMap;
        }

        const pathsToFeatureComponentWithRecipeIdMap: BaseFeatureComponentMap = {};
        for (let i = 0; i < this.recipeList.length; i++) {
            const recipe = this.recipeList[i];
            const features = recipe.getFeatures();
            const featurePaths = Object.keys(features);
            for (let j = 0; j < featurePaths.length; j++) {
                // If no components yet for this route, initialize empty array.
                const featurePath = featurePaths[j];
                if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                    pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
                }

                pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
            }
        }

        this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
        return this.pathsToFeatureComponentWithRecipeIdMap;
    };

    getMatchingComponentForRouteAndRecipeId = (
        normalisedUrl: NormalisedURLPath
    ): ComponentWithRecipeAndMatchingMethod | undefined => {
        const path = normalisedUrl.getAsStringDangerous();
        const routeComponents = this.getPathsToFeatureComponentWithRecipeIdMap()[path];
        if (routeComponents === undefined) {
            return undefined;
        }

        const component = routeComponents.find((c) => c.matches());
        if (component !== undefined) {
            return component;
        }

        // Otherwise, If no recipe Id provided, or if no recipe id matches, return the first matching component.
        return routeComponents[0];
    };

    getRecipeOrThrow<T, S, R>(recipeId: string): RecipeModule<T, S, R> {
        const recipe = this.recipeList.find((recipe) => {
            return recipe.recipeId === recipeId;
        });

        if (recipe === undefined) {
            throw new Error(`Missing recipe: ${recipeId}`);
        }

        return recipe as RecipeModule<T, S, R>;
    }

    getReactRouterDom = (): { Route: any; withRouter: any } | undefined => {
        if (!this.useReactRouterDom) {
            return undefined;
        }

        return this.reactRouterDom;
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
