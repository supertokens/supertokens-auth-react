/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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

import OAuth2WebJS from "supertokens-web-js/recipe/oauth2provider";

import { SSR_ERROR } from "../../constants";
import { isTest } from "../../utils";
import RecipeModule from "../recipeModule";

import { getFunctionOverrides } from "./functionOverrides";
import { normaliseOAuth2Config } from "./utils";

import type {
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    UserInput,
} from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";

/*
 * Class.
 */
export default class OAuth2Provider extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: OAuth2Provider;
    static readonly RECIPE_ID = "oauth2provider";

    public readonly recipeID = OAuth2Provider.RECIPE_ID;

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof OAuth2WebJS> = OAuth2WebJS
    ) {
        super(config);
    }

    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        const normalisedConfig = normaliseOAuth2Config(config);

        return {
            recipeID: OAuth2Provider.RECIPE_ID,
            authReact: (
                appInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                OAuth2Provider.instance = new OAuth2Provider({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: OAuth2Provider.RECIPE_ID,
                });
                return OAuth2Provider.instance;
            },
            webJS: (...args) => {
                const init = OAuth2WebJS.init({
                    ...normalisedConfig,
                    override: {
                        functions: (originalImpl, builder) => {
                            const functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                            builder.override(functions);
                            builder.override(normalisedConfig.override.functions);
                            return originalImpl;
                        },
                    },
                });
                return init(...args);
            },
        };
    }

    static getInstanceOrThrow(): OAuth2Provider {
        if (OAuth2Provider.instance === undefined) {
            let error =
                "No instance of OAuth2Provider found. Make sure to call the OAuth2Provider.init method." +
                "See https://supertokens.io/docs/oauth2/quick-setup/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return OAuth2Provider.instance;
    }

    static getInstance(): OAuth2Provider | undefined {
        return OAuth2Provider.instance;
    }

    async getDefaultRedirectionURL(ctx: GetRedirectionURLContext): Promise<string> {
        // We do not use the util here, because we are likely redirecting across domains here.
        if (
            ctx.action === "SUCCESS_OAUTH2" ||
            ctx.action === "CONTINUE_OAUTH2_AFTER_REFRESH" ||
            ctx.action === "POST_OAUTH2_LOGOUT_REDIRECT"
        ) {
            return ctx.frontendRedirectTo;
        } else {
            throw new Error("Should never come here: unknown action in OAuth2Provider.getDefaultRedirectionURL");
        }
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        OAuth2Provider.instance = undefined;
        return;
    }
}
