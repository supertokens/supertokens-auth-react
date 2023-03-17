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
import { isTest } from "../../utils";
import AuthRecipe from "../authRecipe";

import { normaliseMultitenancyConfig } from "./utils";

import type { UserInput } from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";
import type { NormalisedAppInfo } from "../../types";
import type RecipeModule from "../recipeModule";

/*
 * Class.
 */
export default class Multitenancy extends AuthRecipe<any, any, any, any> {
    static instance?: Multitenancy;
    static RECIPE_ID = "multitenancy";

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<any>,
        public readonly webJSRecipe: WebJSRecipeInterface<typeof MultitenancyWebJS> = MultitenancyWebJS
    ) {
        super(config);
    }

    static init(config: UserInput): RecipeInitResult<any, any, any, any> {
        const normalisedConfig = normaliseMultitenancyConfig(config);

        return {
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
