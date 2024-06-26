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

import OAuth2WebJS from "supertokens-web-js/recipe/oauth2";

import { SSR_ERROR } from "../../constants";
import { isTest } from "../../utils";
import RecipeModule from "../recipeModule";

import { normaliseOAuth2Config } from "./utils";

import type {
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    UserInput,
} from "./types";
import type {
    RecipeInitResult,
    NormalisedConfigWithAppInfoAndRecipeID,
    WebJSRecipeInterface,
    SuccessRedirectContextOAuth2,
} from "../../types";
import type { NormalisedAppInfo } from "../../types";

/*
 * Class.
 */
export default class OAuth2 extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: OAuth2;
    static readonly RECIPE_ID = "multitenancy";

    public readonly recipeID = OAuth2.RECIPE_ID;

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof OAuth2WebJS> = OAuth2WebJS
    ) {
        super(config);
    }

    static init(config?: UserInput): RecipeInitResult<any, never, any, any> {
        const normalisedConfig = normaliseOAuth2Config(config);
        return {
            recipeID: OAuth2.RECIPE_ID,
            authReact: (
                appInfo: NormalisedAppInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                OAuth2.instance = new OAuth2({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: OAuth2.RECIPE_ID,
                });
                return OAuth2.instance;
            },
            webJS: OAuth2WebJS.init({
                ...normalisedConfig,
            }),
        };
    }

    static getInstanceOrThrow(): OAuth2 {
        if (OAuth2.instance === undefined) {
            let error =
                "No instance of OAuth2 found. Make sure to call the OAuth2.init method." +
                "See https://supertokens.io/docs/oauth2/quick-setup/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return OAuth2.instance;
    }

    static getInstance(): OAuth2 | undefined {
        return OAuth2.instance;
    }

    async getDefaultRedirectionURL(ctx: SuccessRedirectContextOAuth2): Promise<string> {
        if (ctx.action === "SUCCESS_OAUTH2") {
            const domain = this.config.appInfo.apiDomain.getAsStringDangerous();
            const basePath = this.config.appInfo.apiBasePath.getAsStringDangerous();

            return `${domain}${basePath}/oauth2/login?loginChallenge${ctx.loginChallenge}`;
        } else {
            throw new Error("Should never come here: unknown action in OAuth2.getDefaultRedirectionURL");
        }
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        OAuth2.instance = undefined;
        return;
    }
}
