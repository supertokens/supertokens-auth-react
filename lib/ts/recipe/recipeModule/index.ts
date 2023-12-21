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

import { logDebugMessage } from "../../logger";
import SuperTokens from "../../superTokens";
import { appendQueryParamsToURL, getNormalisedUserContext } from "../../utils";

import { BaseRecipeModule } from "./baseRecipeModule";

import type { NormalisedConfig } from "./types";
import type { Navigate, UserContext } from "../../types";

export default abstract class RecipeModule<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType,
    N extends NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType>
> extends BaseRecipeModule<GetRedirectionURLContextType, Action, OnHandleEventContextType, N> {
    redirect = async (
        context: GetRedirectionURLContextType,
        navigate?: Navigate,
        queryParams?: Record<string, string>,
        userContext?: UserContext
    ): Promise<void> => {
        // NOTE: We cannot make userContext required in args because it follows optional parameters. Instead we will normalise it if it wasn't passed in.
        let redirectUrl = await this.getRedirectUrl(context, getNormalisedUserContext(userContext));

        if (redirectUrl === null) {
            logDebugMessage(
                `Skipping redirection because the user override returned null for context ${JSON.stringify(
                    context,
                    null,
                    2
                )}`
            );
            return;
        }

        redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
        return SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, navigate);
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getRedirectUrl = async (
        context: GetRedirectionURLContextType,
        userContext: UserContext
    ): Promise<string | null> => {
        // If getRedirectionURL provided by user.
        const redirectUrl = await this.config.getRedirectionURL(context, userContext);
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
}
