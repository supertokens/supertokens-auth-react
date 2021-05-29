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
import { normaliseRecipeModuleConfig } from "../recipeModule/utils";
import RecipeImplementation from "./recipeImplementation";
import Recipe from "./recipe";

/*
 * Methods.
 */
export function normaliseThirdPartyConfig(config: Config, allowEmptyProviders = false): NormalisedConfig {
    const signInAndUpFeature: NormalisedSignInAndUpFeatureConfig = normaliseSignInAndUpFeature(
        config.signInAndUpFeature,
        allowEmptyProviders
    );

    let override: {
        functions: (originalImplementation: RecipeImplementation) => RecipeInterface;
    } = {
        functions: (originalImplementation: RecipeImplementation) => originalImplementation,
    };

    if (config !== undefined && config.override !== undefined) {
        if (config.override.functions !== undefined) {
            override = {
                ...override,
                functions: config.override.functions,
            };
        }
    }

    return {
        ...normaliseRecipeModuleConfig(config),
        signInAndUpFeature,
        override,
    };
}

export function normaliseSignInAndUpFeature(
    config: SignInAndUpFeatureUserInput,
    allowEmptyProviders: boolean
): NormalisedSignInAndUpFeatureConfig {
    if (config === undefined) {
        config = {};
    }

    if (config.providers === undefined) {
        config.providers = [];
    }

    if (allowEmptyProviders === false && config.providers.length === 0) {
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

export function matchRecipeIdUsingState(recipe: Recipe): boolean {
    const state = recipe.recipeImpl.getOAuthState();
    if (state === undefined) {
        return false;
    }
    if (state.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}
