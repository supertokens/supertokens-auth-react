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
import { redirectWithFullPageReload } from "../../utils";
import { normaliseAuthRecipe } from "../authRecipe/utils";

import Provider from "./providers";
import Custom from "./providers/custom";

import type Recipe from "./recipe";
import type {
    NormalisedSignInAndUpFeatureConfig,
    NormalisedConfig,
    SignInAndUpFeatureUserInput,
    Config,
    CustomStateProperties,
} from "./types";
import type { WebJSRecipeInterface } from "../../types";
import type ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";

/*
 * Methods.
 */
export function normaliseThirdPartyConfig(config: Config): NormalisedConfig {
    if (config === undefined) {
        throw new Error("ThirdParty config should not be empty");
    }
    const signInAndUpFeature: NormalisedSignInAndUpFeatureConfig = normaliseSignInAndUpFeature(
        config.signInAndUpFeature
    );

    const oAuthCallbackScreen =
        config.oAuthCallbackScreen === undefined ? {} : { style: config.oAuthCallbackScreen.style };

    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };
    return {
        ...normaliseAuthRecipe(config),
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

    const disableDefaultUI = config.disableDefaultUI === true;
    const style = config.style !== undefined ? config.style : "";
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
        disableDefaultUI,
        privacyPolicyLink,
        termsOfServiceLink,
        style,
        providers,
    };
}

export function matchRecipeIdUsingState(recipe: Recipe, userContext: any): boolean {
    const stateResponse = recipe.webJSRecipe.getStateAndOtherInfoFromStorage<CustomStateProperties>({
        userContext,
    });
    if (stateResponse === undefined) {
        return false;
    }
    if (stateResponse.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}

export async function redirectToThirdPartyLogin(input: {
    thirdPartyId: string;
    config: NormalisedConfig;
    userContext: any;
    recipeImplementation: WebJSRecipeInterface<typeof ThirdPartyWebJS>;
}): Promise<{ status: "OK" | "ERROR" }> {
    const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);
    if (provider === undefined) {
        return { status: "ERROR" };
    }

    const response = await input.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
        thirdPartyId: input.thirdPartyId,
        frontendRedirectURI: provider.getFrontendRedirectURI(),
        redirectURIOnProviderDashboard: provider.getRedirectURIOnProviderDashboard(),
        userContext: input.userContext,
    });

    redirectWithFullPageReload(response);
    return { status: "OK" };
}
