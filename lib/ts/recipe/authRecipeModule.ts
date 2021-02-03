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
import {
    AuthRecipeModuleConfig,
    NormalisedAuthRecipeConfig,
    NormalisedAuthRecipeConfigHooks,
    NormalisedRecipeModuleHooks,
    SuccessAPIResponse
} from "../types";
import {
    appendQueryParamsToURL,
    getWindowOrThrow,
    normaliseAuthRecipeModuleConfig,
    normalisedAuthRecipeConfigHooks
} from "../utils";
import RecipeModule from "./recipeModule";
import { History, LocationState } from "history";

/*
 * Class.
 */
export default abstract class AuthRecipeModule extends RecipeModule {
    /*
     * Instance attributes.
     */

    config: NormalisedAuthRecipeConfig;
    hooks: NormalisedAuthRecipeConfigHooks & NormalisedRecipeModuleHooks;

    /*
     * Constructor.
     */
    constructor(config: AuthRecipeModuleConfig<unknown, unknown, unknown>) {
        super(config);
        this.config = {
            ...this.config,
            ...normaliseAuthRecipeModuleConfig(config)
        };
        this.hooks = {
            ...this.hooks,
            ...normalisedAuthRecipeConfigHooks(config)
        };
    }

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
        const redirectUrl = await this.hooks.getRedirectionURL(context);
        if (redirectUrl !== undefined) {
            return redirectUrl;
        }

        // Otherwise, use default.
        return await this.getDefaultRedirectionURL(context);
    };

    abstract getDefaultRedirectionURL(context: unknown): Promise<string>;
    abstract signOut(): Promise<SuccessAPIResponse>;
}
