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

import { RecipeFeatureComponentMap } from "../../types";

import { appendQueryParamsToURL, redirectWithFullPageReload, getOriginOfPage, redirectWithHistory } from "../../utils";
import { NormalisedConfig } from "./types";

/*
 * Class.
 */
export default abstract class RecipeModule<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType,
    N extends NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType>
> {
    config: N;

    /*
     * Constructor.
     */
    constructor(config: N) {
        this.config = config;
    }

    redirect = async (
        context: GetRedirectionURLContextType,
        history?: any,
        queryParams?: Record<string, string>
    ): Promise<void> => {
        let redirectUrl = await this.getRedirectUrl(context);
        redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);

        try {
            new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
        } catch (e) {
            // For multi tenancy, If mismatch between websiteDomain and current location, prepand URL relative path with websiteDomain.
            const origin = getOriginOfPage().getAsStringDangerous();
            if (origin !== this.config.appInfo.websiteDomain.getAsStringDangerous()) {
                redirectUrl = `${this.config.appInfo.websiteDomain.getAsStringDangerous()}${redirectUrl}`;
                redirectWithFullPageReload(redirectUrl);
                return;
            }

            // If history was provided, use to redirect without reloading.
            if (history !== undefined) {
                redirectWithHistory(redirectUrl, history);
                return;
            }
        }
        // Otherwise, redirect in app.
        redirectWithFullPageReload(redirectUrl);
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getRedirectUrl = async (context: GetRedirectionURLContextType): Promise<string> => {
        // If getRedirectionURL provided by user.
        const redirectUrl = await this.config.getRedirectionURL(context);
        if (redirectUrl !== undefined) {
            return redirectUrl;
        }

        // Otherwise, use default.
        return await this.getDefaultRedirectionURL(context);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getDefaultRedirectionURL(_: GetRedirectionURLContextType): Promise<string> {
        throw new Error("getDefaultRedirectionURL is not implemented.");
    }

    abstract getFeatures(): RecipeFeatureComponentMap;

    abstract getFeatureComponent(componentName: string, props: any): JSX.Element;
}
