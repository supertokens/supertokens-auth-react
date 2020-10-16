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
import { RouteToFeatureComponentMap, RecipeModuleConfig } from "../types";
import { ComponentClass } from "react";
import SuperTokensUrl from "../superTokensUrl";

/*
 * Class.
 */
export default abstract class RecipeModule {
    private features: RouteToFeatureComponentMap;
    private recipeId: string;

    constructor(config: RecipeModuleConfig) {
        this.recipeId = config.recipeId;
        this.features = config.features;
    }

    getRecipeId = (): string => {
        return this.recipeId;
    };

    getFeatures = (): RouteToFeatureComponentMap => {
        return this.features;
    };

    canHandleRoute = (url: SuperTokensUrl): boolean => {
        return this.getRoutingComponent(url) !== undefined;
    };

    getRoutingComponent = (url: SuperTokensUrl): ComponentClass | undefined => {
        // If rId from URL exists and doesn't match, or if route path doesn't start with return undefined.
        if (url.recipeId !== null && url.recipeId !== this.recipeId) {
            return undefined;
        }

        return this.features[url.normalisedPathnameWithoutWebsiteBasePath];
    };
}
