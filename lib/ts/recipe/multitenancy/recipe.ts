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
import { getNormalisedUserContext } from "supertokens-web-js/utils";

import { SSR_ERROR } from "../../constants";
import SuperTokens from "../../superTokens";
import { applyPlugins, isTest } from "../../utils";
import { BaseRecipeModule } from "../recipeModule/baseRecipeModule";

import { hasIntersectingRecipes } from "./utils";
import { normaliseMultitenancyConfig } from "./utils";

import type { NormalisedConfig, UserInput, GetLoginMethodsResponseNormalized } from "./types";
import type {
    RecipeInitResult,
    NormalisedConfigWithAppInfoAndRecipeID,
    WebJSRecipeInterface,
    UserContext,
} from "../../types";
import type AuthRecipe from "../authRecipe";

/*
 * Class.
 */
export default class Multitenancy extends BaseRecipeModule<any, any, any, any> {
    static instance?: Multitenancy;
    static readonly RECIPE_ID = "multitenancy";

    private dynamicLoginMethodsCache: { [tenantId: string]: Promise<GetLoginMethodsResponseNormalized> };
    public readonly recipeID = Multitenancy.RECIPE_ID;

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof MultitenancyWebJS> = MultitenancyWebJS
    ) {
        super(config);
        this.dynamicLoginMethodsCache = {};
    }

    public async getCurrentDynamicLoginMethods(input: {
        userContext: UserContext;
    }): Promise<GetLoginMethodsResponseNormalized | undefined> {
        if (SuperTokens.usesDynamicLoginMethods === false) {
            return undefined;
        }
        const userContext = getNormalisedUserContext(input.userContext);

        const tenantId = (await Multitenancy.getInstanceOrThrow().webJSRecipe.getTenantId()) ?? "public";

        if (this.dynamicLoginMethodsCache[tenantId] === undefined) {
            this.dynamicLoginMethodsCache[tenantId] = Multitenancy.getDynamicLoginMethods({
                tenantId,
                userContext,
            });
        }
        const tenantMethods = await this.dynamicLoginMethodsCache[tenantId]!;

        if (
            !hasIntersectingRecipes(
                tenantMethods,
                SuperTokens.getInstanceOrThrow().recipeList.filter(
                    (recipe) => "firstFactorIds" in (recipe as AuthRecipe<any, any, any, any>)
                ) as AuthRecipe<any, any, any, any>[]
            )
        ) {
            throw new Error("Initialized recipes have no overlap with core recipes or could not load login methods");
        }
        return tenantMethods;
    }

    static async getDynamicLoginMethods(
        input: Parameters<typeof MultitenancyWebJS.getLoginMethods>[0]
    ): Promise<GetLoginMethodsResponseNormalized> {
        const { thirdParty, firstFactors } = await MultitenancyWebJS.getLoginMethods(input);

        return {
            thirdparty: thirdParty,
            firstFactors,
        };
    }

    static init(config?: UserInput): RecipeInitResult<any, any, any, any> {
        return {
            recipeID: Multitenancy.RECIPE_ID,
            authReact: (appInfo, _, overrideMaps): BaseRecipeModule<any, any, any, any> => {
                const normalisedConfig = normaliseMultitenancyConfig(
                    applyPlugins(Multitenancy.RECIPE_ID, config, overrideMaps ?? [])
                );
                Multitenancy.instance = new Multitenancy({
                    ...normalisedConfig,
                    appInfo,
                    recipeId: Multitenancy.RECIPE_ID,
                });
                return Multitenancy.instance;
            },
            webJS: (...args) => {
                const normalisedConfig = normaliseMultitenancyConfig(config);
                const init = MultitenancyWebJS.init({
                    ...normalisedConfig,
                });
                return init(...args);
            },
        };
    }

    static getInstanceOrThrow(): Multitenancy {
        if (Multitenancy.instance === undefined) {
            let error =
                "No instance of Multitenancy found. Make sure to call the Multitenancy.init method." +
                "See https://supertokens.io/docs/multitenancy/quick-setup/frontend";

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
