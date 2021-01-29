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
import { appendQueryParamsToURL, getWindowOrThrow, normalisedRecipeModuleHooks } from "../utils";
import { History, LocationState } from "history";

/*
 * Class.
 */
export default abstract class RecipeModule {
    /*
     * Instance attributes.
     */

    private recipeId: string;
    private appInfo: NormalisedAppInfo;
    private httpRequest: HttpRequest;
    hooks: NormalisedRecipeModuleHooks;

    /*
     * Constructor.
     */
    constructor(config: RecipeModuleConfig) {
        this.recipeId = config.recipeId;
        this.appInfo = config.appInfo;
        this.httpRequest = new HttpRequest(this);
        this.hooks = normalisedRecipeModuleHooks(config);
    }

    /*
     * Instance Methods.
     */
    getRecipeId = (): string => {
        return this.recipeId;
    };

    getAppInfo = (): NormalisedAppInfo => {
        return this.appInfo;
    };

    getHttp = (): HttpRequest => {
        return this.httpRequest;
    };

    redirect = async (
        context: unknown,
        history?: History<LocationState>,
        queryParams?: Record<string, string>
    ): Promise<void> => {
        let redirectUrl = await this.getRedirectUrl(context);
        redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);

        try {
            new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
        } catch (e) {
            // If history was provided, use to redirect without reloading.
            if (history !== undefined) {
                history.push(redirectUrl);
                return;
            }
        }
        // Otherwise, redirect in app.
        getWindowOrThrow().location.href = redirectUrl;
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getRedirectUrl = async (context: any): Promise<string> => {
        // If getRedirectionURL provided by user.
        let redirectUrl = await this.hooks.getRedirectionURL(context);
        if (redirectUrl !== undefined) {
            return redirectUrl;
        }
        // Try using redirectToPath
        if (context.action === "SUCCESS") {
            redirectUrl = context.redirectToPath;
            if (redirectUrl !== undefined) {
                return redirectUrl;
            }
        }

        // Otherwise, used default.
        return await this.getDefaultRedirectionURL(context);
    };

    onHandleEvent(context: { action: string; user?: { id: string; email: string } }): void {
        const onHandleEvent = this.hooks.onHandleEvent;
        if (onHandleEvent !== undefined) {
            onHandleEvent(context);
        }
    }

    abstract getFeatures(): RouteToFeatureComponentMap;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async getDefaultRedirectionURL(context: unknown): Promise<string> {
        throw new Error("Recipe must overwrite getDefaultRedirectionURL");
    }
}
