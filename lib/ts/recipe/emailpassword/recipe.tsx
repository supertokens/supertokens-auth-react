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

import EmailPasswordWebJS from "supertokens-web-js/recipe/emailpassword";

import { SSR_ERROR } from "../../constants";
import { getDefaultRedirectionURLForPath, isTest } from "../../utils";
import AuthRecipe from "../authRecipe";
import { FactorIds } from "../multifactorauth/types";

import { DEFAULT_RESET_PASSWORD_PATH } from "./constants";
import { getFunctionOverrides } from "./functionOverrides";
import { normaliseEmailPasswordConfig } from "./utils";

import type {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    NormalisedConfig,
    UserInput,
} from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";
import type RecipeModule from "../recipeModule";

/*
 * Class.
 */
export default class EmailPassword extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailPassword;
    static RECIPE_ID = "emailpassword" as const;

    recipeID = EmailPassword.RECIPE_ID;
    firstFactorIds = [FactorIds.EMAILPASSWORD];
    public getFirstFactorsForAuthPage(): string[] {
        return this.firstFactorIds;
    }

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof EmailPasswordWebJS> = EmailPasswordWebJS
    ) {
        super(config);
    }

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "RESET_PASSWORD") {
            return getDefaultRedirectionURLForPath(this.config, DEFAULT_RESET_PASSWORD_PATH, context);
        }

        return this.getAuthRecipeDefaultRedirectionURL(context);
    };

    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        return {
            recipeID: EmailPassword.RECIPE_ID,
            authReact: (
                appInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                const normalisedConfig = normaliseEmailPasswordConfig(config);
                EmailPassword.instance = new EmailPassword({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: EmailPassword.RECIPE_ID,
                });
                return EmailPassword.instance;
            },
            webJS: (...args) => {
                const normalisedConfig = normaliseEmailPasswordConfig(config);
                const init = EmailPasswordWebJS.init({
                    ...normalisedConfig, // plugins are applied by webjs
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

    static getInstanceOrThrow(): EmailPassword {
        if (EmailPassword.instance === undefined) {
            let error =
                "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/quick-setup/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return EmailPassword.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        EmailPassword.instance = undefined;
        return;
    }
}
