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
import HttpRequest from "../httpRequest";
import {
    RouteToFeatureComponentMap,
    RecipeModuleConfig,
    NormalisedAppInfo,
    NormalisedRecipeModuleHooks
} from "../types";
import { normalisedRecipeModuleHooks } from "../utils";

/*
 * Class.
 */
export default abstract class RecipeModule {
    /*
     * Instance attributes.
     */

    recipeId: string;
    appInfo: NormalisedAppInfo;
    httpRequest: HttpRequest;
    hooks: NormalisedRecipeModuleHooks;

    /*
     * Constructor.
     */
    constructor(config: RecipeModuleConfig<unknown, unknown>) {
        this.recipeId = config.recipeId;
        this.appInfo = config.appInfo;
        this.httpRequest = new HttpRequest(this);
        this.hooks = normalisedRecipeModuleHooks(config);
    }

    abstract getFeatures(): RouteToFeatureComponentMap;
}
