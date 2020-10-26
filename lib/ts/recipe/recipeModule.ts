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
import { RouteToFeatureComponentMap, RecipeModuleConfig, AppInfo, RouteWithPathAndRecipeId } from "../types";
import { ComponentClass } from "react";
import NormalisedURLPath from "../normalisedURLPath";

/*
 * Class.
 */
export default abstract class RecipeModule {
    private features: RouteToFeatureComponentMap;
    private recipeId: string;
    private appInfo: AppInfo;

    constructor(config: RecipeModuleConfig) {
        this.recipeId = config.recipeId;
        this.appInfo = config.appInfo;
        this.features = {};
        // we store the normalised version of the path here.
        Object.keys(config.features).forEach(path => {
            let normalisedFullPath = this.appInfo.websiteBasePath.appendPath(new NormalisedURLPath(path));
            this.features[normalisedFullPath.getAsStringDangerous()] = config.features[path];
        });
    }

    getRecipeId = (): string => {
        return this.recipeId;
    };

    getFeatures = (): RouteToFeatureComponentMap => {
        return this.features;
    };

    canHandleRoute = (route: RouteWithPathAndRecipeId): boolean => {
        return this.getRoutingComponent(route) !== undefined;
    };

    getRoutingComponent = (route: RouteWithPathAndRecipeId): ComponentClass | undefined => {
        // If rId from URL exists and doesn't match, or if route path doesn't start with return undefined.
        if (route.recipeId !== null && route.recipeId !== this.recipeId) {
            return undefined;
        }
        return this.features[route.path.getAsStringDangerous()];
    };
}
