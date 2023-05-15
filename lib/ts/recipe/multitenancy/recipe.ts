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
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";

import { SSR_ERROR } from "../../constants";
import SuperTokens from "../../superTokens";
import { isTest } from "../../utils";
import RecipeModule from "../recipeModule";

import { hasIntersectingRecipes } from "./utils";
import { normaliseMultitenancyConfig } from "./utils";

import type { NormalisedConfig, UserInput, GetLoginMethodsResponseNormalized } from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";
import type { NormalisedAppInfo } from "../../types";

/*
 * Class.
 */
export default class Multitenancy extends RecipeModule<any, any, any, any> {
    static instance?: Multitenancy;
    static readonly RECIPE_ID = "multitenancy";

    private dynamicLoginMethods?: GetLoginMethodsResponseNormalized;
    private hasIntersection?: boolean;
    public readonly recipeID = Multitenancy.RECIPE_ID;

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof MultitenancyWebJS> = MultitenancyWebJS
    ) {
        super(config);
        PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            if (SuperTokens.usesDynamicLoginMethods === true) {
                void Multitenancy.getInstanceOrThrow().initMultitenancyWithDynamicLoginMethods().catch();
            }
        });
    }

    public async initMultitenancyWithDynamicLoginMethods(): Promise<void> {
        const tenantID = Multitenancy.getInstanceOrThrow().config.getTenantID();

        const tenantMethods = await Multitenancy.getDynamicLoginMethods({ tenantId: tenantID });
        this.hasIntersection = hasIntersectingRecipes(tenantMethods, SuperTokens.getInstanceOrThrow().recipeList);

        SuperTokens.uiController.emit("LoginMethodsLoaded");
    }

    public getDynamicLoginMethods(): GetLoginMethodsResponseNormalized | undefined {
        if (this.hasIntersection === false) {
            throw new Error("Initialized recipes have no overlap with core recipes");
        }
        return this.dynamicLoginMethods;
    }

    static async getDynamicLoginMethods(
        ...options: Parameters<typeof MultitenancyWebJS.getLoginMethods>
    ): Promise<GetLoginMethodsResponseNormalized> {
        const instance = Multitenancy.getInstanceOrThrow();
        if (instance.dynamicLoginMethods !== undefined) {
            return instance.dynamicLoginMethods;
        }
        const { emailPassword, passwordless } = await MultitenancyWebJS.getLoginMethods(...options);
        instance.dynamicLoginMethods = {
            passwordless,
            emailpassword: emailPassword,
            thirdparty: {
                enabled: true,
                providers: [],
            },
        };
        return instance.dynamicLoginMethods;
    }

    static init(config: UserInput): RecipeInitResult<any, any, any, any> {
        const normalisedConfig = normaliseMultitenancyConfig(config);
        return {
            recipeID: Multitenancy.RECIPE_ID,
            authReact: (appInfo: NormalisedAppInfo): RecipeModule<any, any, any, any> => {
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
