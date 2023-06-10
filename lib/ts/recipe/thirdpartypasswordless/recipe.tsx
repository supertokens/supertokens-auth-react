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

import ThirdpartyPasswordlessWebJS from "supertokens-web-js/recipe/thirdpartypasswordless";

import { SSR_ERROR } from "../../constants";
import SuperTokens from "../../superTokens";
import { isTest } from "../../utils";
import AuthRecipe from "../authRecipe";
import Passwordless from "../passwordless/recipe";
import ThirdParty from "../thirdparty/recipe";

import { getFunctionOverrides } from "./functionOverrides";
import getPasswordlessImpl from "./recipeImplementation/passwordlessImplementation";
import getThirdPartyImpl from "./recipeImplementation/thirdPartyImplementation";
import { normaliseThirdPartyPasswordlessConfig } from "./utils";

import type {
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    UserInput,
    PreAndPostAPIHookAction,
} from "./types";
import type {
    NormalisedAppInfo,
    NormalisedConfigWithAppInfoAndRecipeID,
    RecipeInitResult,
    WebJSRecipeInterface,
} from "../../types";
import type RecipeModule from "../recipeModule";

export default class ThirdPartyPasswordless extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdPartyPasswordless;
    static RECIPE_ID = "thirdpartypasswordless";

    recipeID = ThirdPartyPasswordless.RECIPE_ID;

    passwordlessRecipe: Passwordless | undefined;

    thirdPartyRecipe: ThirdParty | undefined;

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        recipes: {
            thirdPartyInstance: ThirdParty | undefined;
            passwordlessInstance: Passwordless | undefined;
        },
        public readonly webJSRecipe: WebJSRecipeInterface<
            typeof ThirdpartyPasswordlessWebJS
        > = ThirdpartyPasswordlessWebJS
    ) {
        if (
            SuperTokens.usesDynamicLoginMethods === false &&
            config.disablePasswordless === true &&
            config.thirdpartyConfig?.signInAndUpFeature.providers.length === 0
        ) {
            throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
        }
        super(config);
        this.passwordlessRecipe =
            recipes.passwordlessInstance !== undefined
                ? recipes.passwordlessInstance
                : SuperTokens.usesDynamicLoginMethods === false && this.config.disablePasswordless
                ? undefined
                : new Passwordless(
                      {
                          ...this.config.passwordlessConfig,
                          appInfo: this.config.appInfo,
                          recipeId: this.config.recipeId,
                      },
                      // ThirdPartyPasswordless has passwordless and thirdparty instances initialized within it,
                      // so we pass the ThirdPartyPasswordless instance to getRecipeImpl functions to get each recipe instance
                      // importing the sub-recipes (thirdparty, passwordless) directly from web-js would throw an error due to them not being initialized
                      // getting the appropriate interfaces (the ones exposed by the recipe index files) through the web-js
                      // instance of ThirdPartyPasswordless would require reworking web-js and is impractical
                      getPasswordlessImpl(this.webJSRecipe)
                  );

        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : this.config.thirdpartyConfig === undefined
                ? undefined
                : new ThirdParty(
                      {
                          ...this.config.thirdpartyConfig,
                          appInfo: this.config.appInfo,
                          recipeId: this.config.recipeId,
                      },
                      getThirdPartyImpl(this.webJSRecipe)
                  );
    }

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        return this.getAuthRecipeDefaultRedirectionURL(context);
    };

    /*
     * Static methods.
     */

    static init(
        config: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        const normalisedConfig = normaliseThirdPartyPasswordlessConfig(config);

        return {
            recipeID: ThirdPartyPasswordless.RECIPE_ID,
            authReact: (
                appInfo: NormalisedAppInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                ThirdPartyPasswordless.instance = new ThirdPartyPasswordless(
                    {
                        ...normalisedConfig,
                        appInfo,
                        recipeId: ThirdPartyPasswordless.RECIPE_ID,
                    },
                    {
                        passwordlessInstance: undefined,
                        thirdPartyInstance: undefined,
                    }
                );
                return ThirdPartyPasswordless.instance;
            },
            webJS: ThirdpartyPasswordlessWebJS.init({
                ...normalisedConfig,
                override: {
                    functions: (originalImpl, builder) => {
                        const functions = getFunctionOverrides(
                            ThirdPartyPasswordless.RECIPE_ID,
                            normalisedConfig.onHandleEvent
                        );
                        builder.override(functions);
                        builder.override(normalisedConfig.override.functions);
                        return originalImpl;
                    },
                },
            }),
        };
    }

    static getInstanceOrThrow(): ThirdPartyPasswordless {
        if (ThirdPartyPasswordless.instance === undefined) {
            let error =
                "No instance of ThirdPartyPasswordless found. Make sure to call the ThirdPartyPasswordless.init method." +
                "See https://supertokens.io/docs/thirdpartypasswordless/quick-setup/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return ThirdPartyPasswordless.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        ThirdPartyPasswordless.instance = undefined;
        return;
    }
}
