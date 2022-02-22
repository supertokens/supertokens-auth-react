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
import Provider from "./providers";
import Custom from "./providers/custom";
import {
    NormalisedSignInAndUpFeatureConfig,
    NormalisedConfig,
    SignInAndUpFeatureUserInput,
    Config,
    RecipeInterface,
} from "./types";
import Recipe from "./recipe";
import { normaliseAuthRecipeWithEmailVerificationConfig } from "../authRecipeWithEmailVerification/utils";

/*
 * Methods.
 */
export function normaliseThirdPartyConfig(config: Config): NormalisedConfig {
    const signInAndUpFeature: NormalisedSignInAndUpFeatureConfig = normaliseSignInAndUpFeature(
        config.signInAndUpFeature
    );

    const oAuthCallbackScreen =
        config.oAuthCallbackScreen === undefined ? {} : { style: config.oAuthCallbackScreen.style };

    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        components: {},
        ...config.override,
    };
    return {
        ...normaliseAuthRecipeWithEmailVerificationConfig(config),
        signInAndUpFeature,
        oAuthCallbackScreen,
        override,
    };
}

export function normaliseSignInAndUpFeature(
    config: SignInAndUpFeatureUserInput | undefined
): NormalisedSignInAndUpFeatureConfig {
    if (config === undefined) {
        config = {};
    }

    if (config.providers === undefined) {
        config.providers = [];
    }

    if (config.providers.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }

    const disableDefaultImplementation = config.disableDefaultImplementation === true;
    const style = config.style !== undefined ? config.style : {};
    const privacyPolicyLink = config.privacyPolicyLink;
    const termsOfServiceLink = config.termsOfServiceLink;

    /*
     * Convert custom configs to custom providers.
     */
    const providersWithCustom = config.providers.map((provider) => {
        if (provider instanceof Provider) {
            return provider;
        }
        return Custom.init(provider);
    });

    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    const providers = Array.from(new Set(providersWithCustom.map((provider) => provider.id))).map(
        (id) => providersWithCustom.find((provider) => provider.id === id) as Provider
    );

    return {
        disableDefaultImplementation,
        privacyPolicyLink,
        termsOfServiceLink,
        style,
        providers,
    };
}

export function matchRecipeIdUsingState(recipe: Recipe, userContext: any): boolean {
    const stateResponse = recipe.recipeImpl.getOAuthState({
        config: recipe.config,
        userContext,
    });
    if (stateResponse.state === undefined) {
        return false;
    }
    if (stateResponse.state.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}
