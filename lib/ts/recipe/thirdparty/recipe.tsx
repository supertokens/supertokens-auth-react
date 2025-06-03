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

import ThirdpartyWebJS from "supertokens-web-js/recipe/thirdparty";

import { SSR_ERROR } from "../../constants";
import SuperTokens from "../../superTokens";
import { applyPlugins, isTest } from "../../utils";
import AuthRecipe from "../authRecipe";
import { FactorIds } from "../multifactorauth/types";

import { getFunctionOverrides } from "./functionOverrides";
import { normaliseThirdPartyConfig } from "./utils";

import type {
    GetRedirectionURLContext,
    NormalisedConfig,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    UserInput,
} from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";
import type RecipeModule from "../recipeModule";

/*
 * Class.
 */
export default class ThirdParty extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdParty;
    static RECIPE_ID = "thirdparty" as const;
    recipeID = ThirdParty.RECIPE_ID;
    firstFactorIds = [FactorIds.THIRDPARTY];
    public getFirstFactorsForAuthPage(): string[] {
        return this.firstFactorIds;
    }

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof ThirdpartyWebJS> = ThirdpartyWebJS
    ) {
        if (SuperTokens.usesDynamicLoginMethods === false && config.signInAndUpFeature.providers.length === 0) {
            throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
        }

        super(config);
    }

    /*
     * Instance methods.
     */
    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        return this.getAuthRecipeDefaultRedirectionURL(context);
    };

    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        return {
            recipeID: ThirdParty.RECIPE_ID,
            authReact: (
                appInfo,
                _,
                overrideMaps
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                const normalisedConfig = normaliseThirdPartyConfig(
                    applyPlugins(ThirdParty.RECIPE_ID, config, overrideMaps ?? [])
                );
                ThirdParty.instance = new ThirdParty({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: ThirdParty.RECIPE_ID,
                });
                return ThirdParty.instance;
            },
            webJS: (...args) => {
                const normalisedConfig = normaliseThirdPartyConfig(config);
                const init = ThirdpartyWebJS.init({
                    ...normalisedConfig,
                    override: {
                        functions: (originalImpl, builder) => {
                            const functions = getFunctionOverrides(
                                ThirdParty.RECIPE_ID,
                                normalisedConfig.onHandleEvent
                            );
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

    static getInstanceOrThrow(): ThirdParty {
        if (ThirdParty.instance === undefined) {
            let error =
                "No instance of ThirdParty found. Make sure to call the ThirdParty.init method." +
                "See https://supertokens.io/docs/thirdparty/quick-setup/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return ThirdParty.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        ThirdParty.instance = undefined;
        return;
    }
}
