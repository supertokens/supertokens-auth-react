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
import { normalisePath, getRecipeIdFromUrl } from "../utils";
import SuperTokens from "../";
import { FeatureHash, RecipeModuleConfig } from "../types";
import { Component, ComponentClass } from "react";

/*
 * Class.
 */
export default abstract class RecipeModule {
    private features: FeatureHash;
    private recipeId: string;

    constructor(config: RecipeModuleConfig) {
        this.recipeId = config.recipeId;
        this.features = config.features;
    }

    getRecipeId() {
        return this.recipeId;
    }

    canHandleRoute(route: string, rId: string | null): boolean {
        // If rId from URL exists and doesn't match, or if route path doesn't start with return false.
        if (rId !== null && rId !== this.recipeId) {
            return false;
        }

        // Otherwise, if recipeId matches, or if none was provided, check if url matches any module routes.
        // Remove websiteBasePath from normalised path to match with features hash keys.
        const routeWithoutBasePath = this.getNormalisedRouteWithoutWebsiteBasePath(route);
        return Boolean(this.features[routeWithoutBasePath]);
    }

    getRoutingComponent(route: string, rId: string | null): ComponentClass | undefined {
        // If rId from URL exists and doesn't match, or if route path doesn't start with return undefined.
        if (rId !== null && rId !== this.recipeId) {
            return undefined;
        }

        const routeWithoutBasePath = this.getNormalisedRouteWithoutWebsiteBasePath(route);
        return this.features[routeWithoutBasePath];
    }

    private getNormalisedRouteWithoutWebsiteBasePath(path: string): string {
        // If base path is present, remove it.
        if (path.startsWith(SuperTokens.getAppInfo().websiteBasePath)) {
            let newPath = path.slice(SuperTokens.getAppInfo().websiteBasePath.length);
            if (newPath.length === 0) {
                newPath = "/";
            }
            return newPath;
        }

        // Otherwise, return url unchanged.
        return path;
    }
}
