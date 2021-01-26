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
import { RouteToFeatureComponentMap, RecipeModuleConfig, NormalisedAppInfo, RecipeModuleHooks } from "../types";
import { redirectToInApp, redirectToWithReload } from "../utils";
import { History, LocationState } from "history";
import NormalisedURLPath from "../normalisedURLPath";

/*
 * Class.
 */
export default abstract class RecipeModule {
    /*
     * Instance attributes.
     */

    private recipeId: string;
    private appInfo: NormalisedAppInfo;
    private hooks: RecipeModuleHooks;
    private httpRequest: HttpRequest;
    private redirectTo?: NormalisedURLPath;

    /*
     * Constructor.
     */
    constructor(config: RecipeModuleConfig) {
        this.recipeId = config.recipeId;
        this.appInfo = config.appInfo;
        this.httpRequest = new HttpRequest(this);
        this.hooks = {
            preAPIHook: config.preAPIHook,
            onHandleEvent: config.onHandleEvent,
            getRedirectionURL: config.getRedirectionURL
        };
    }

    /*
     * Instance Methods.
     */
    getRecipeId = (): string => {
        return this.recipeId;
    };

    setSuccessRedirectTo = (value: string): void => {
        try {
            this.redirectTo = new NormalisedURLPath(value);
        } catch (e) {}
    };

    getAppInfo = (): NormalisedAppInfo => {
        return this.appInfo;
    };

    getHttp = (): HttpRequest => {
        return this.httpRequest;
    };

    preAPIHook = async (context: { action: string; requestInit: RequestInit }): Promise<RequestInit> => {
        const preAPIHook = this.hooks.preAPIHook;
        if (preAPIHook !== undefined) {
            return await preAPIHook(context);
        }

        return context.requestInit;
    };

    redirect = async (context: { action: string }, history?: History<LocationState>): Promise<void> => {
        const redirectUrl = await this.getRedirectionURL(context);
        try {
            new URL(redirectUrl);
            // Otherwise, If full URL, use redirectToWithReload
            return await redirectToWithReload(redirectUrl);
        } catch (e) {
            // Otherwise, redirect in app.
            return await redirectToInApp(redirectUrl, history);
        }
    };

    getRedirectionURL = async (context: { action: string }): Promise<string> => {
        let redirectUrl = this.getSuccessRedirectionURL(context);
        if (redirectUrl !== undefined) {
            return redirectUrl;
        }

        // If getRedirectionURL provided by user.
        const getRedirectionURL = this.hooks.getRedirectionURL;
        if (getRedirectionURL !== undefined) {
            redirectUrl = (await getRedirectionURL(context)) || redirectUrl;
            if (redirectUrl !== undefined) {
                return redirectUrl;
            }
        }

        return await this.getDefaultRedirectionURL(context);
    };

    getSuccessRedirectionURL = (context: { action: string }): string | undefined => {
        if (context.action !== "SUCCESS" || this.redirectTo === undefined) {
            return;
        }

        const redirectTo: string = this.redirectTo.getAsStringDangerous();
        this.redirectTo = undefined; // Reset redirectToUrl.
        return redirectTo;
    };

    onHandleEvent(context: { action: string; user?: { id: string; email: string } }): void {
        const onHandleEvent = this.hooks.onHandleEvent;
        if (onHandleEvent !== undefined) {
            onHandleEvent(context);
        }
    }

    abstract getFeatures(): RouteToFeatureComponentMap;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async getDefaultRedirectionURL(context: { action: unknown }): Promise<string> {
        throw new Error("Recipe must overwrite getDefaultRedirectionURL");
    }
}
