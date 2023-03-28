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

import MultitenancyWebJS from "supertokens-web-js/recipe/multitenancy";

import { SSR_ERROR } from "../../constants";
// import SuperTokens from "../../superTokens";
import { isTest } from "../../utils";
import RecipeModule from "../recipeModule";

import { normaliseMultitenancyConfig } from "./utils";

import type { NormalisedConfig, UserInput, GetLoginMethodsResponseNormalized } from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";
import type { NormalisedAppInfo } from "../../types";

/*
 * Class.
 */
export default class Multitenancy extends RecipeModule<any, any, any, any> {
    static instance?: Multitenancy;
    static RECIPE_ID = "multitenancy";
    static tenantID?: string;
    static dynamicLoginMethods?: GetLoginMethodsResponseNormalized;

    public recipeID = Multitenancy.RECIPE_ID;

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof MultitenancyWebJS> = MultitenancyWebJS
    ) {
        super(config);
    }

    static async getDynamicLoginMethods(
        ...options: Parameters<typeof MultitenancyWebJS.getLoginMethods>
    ): Promise<GetLoginMethodsResponseNormalized> {
        if (Multitenancy.dynamicLoginMethods !== undefined) {
            return Multitenancy.dynamicLoginMethods;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { emailPassword, passwordless, thirdParty } = await MultitenancyWebJS.getLoginMethods(...options);
        Multitenancy.dynamicLoginMethods = {
            passwordless,
            emailpassword: emailPassword,
            thirdparty: {
                ...thirdParty,
                enabled: true,
                providers: [
                    {
                        id: "google",
                        name: "Im Google",
                    },
                    {
                        id: "google-1",
                        name: "Im another Google",
                    },
                ],
                // enabled: thirdParty.enabled && thirdParty.providers !== null,
            },
        };
        return Multitenancy.dynamicLoginMethods;
    }

    static init(config: UserInput): RecipeInitResult<any, any, any, any> {
        const normalisedConfig = normaliseMultitenancyConfig(config);
        return {
            recipeID: Multitenancy.RECIPE_ID,
            authReact: (
                appInfo: NormalisedAppInfo,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _: boolean
            ): RecipeModule<any, any, any, any> => {
                Multitenancy.instance = new Multitenancy({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: Multitenancy.RECIPE_ID,
                });
                return Multitenancy.instance;
            },
            webJS: MultitenancyWebJS.init({
                ...normalisedConfig,
            }),
        };
    }

    static getInstanceOrThrow(): Multitenancy {
        if (Multitenancy.instance === undefined) {
            let error =
                "No instance of Multitenancy found. Make sure to call the Multitenancy.init method." +
                "See https://supertokens.io/docs/multitenancy/quick-setup/frontend"; // TODO check if page exists in docs

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return Multitenancy.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        Multitenancy.instance = undefined;
        return;
    }
}
