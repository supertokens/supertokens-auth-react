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

import SuperTokens from "../../superTokens";
import { redirectWithFullPageReload } from "../../utils";
import { normaliseAuthRecipe } from "../authRecipe/utils";
import { FactorIds } from "../multifactorauth/types";
import Multitenancy from "../multitenancy/recipe";

import { getProviderLogo } from "./constants";
import Provider from "./providers";
import ActiveDirectory from "./providers/activeDirectory";
import Apple from "./providers/apple";
import Bitbucket from "./providers/bitbucket";
import BoxySAML from "./providers/boxySaml";
import Custom from "./providers/custom";
import Discord from "./providers/discord";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
import Gitlab from "./providers/gitlab";
import Google from "./providers/google";
import GoogleWorkspaces from "./providers/googleWorkspaces";
import LinkedIn from "./providers/linkedIn";
import Okta from "./providers/okta";
import Twitter from "./providers/twitter";

import type Recipe from "./recipe";
import type {
    NormalisedSignInAndUpFeatureConfig,
    NormalisedConfig,
    SignInAndUpFeatureUserInput,
    Config,
    CustomStateProperties,
} from "./types";
import type { UserContext, WebJSRecipeInterface } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";
import type ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";

/*
 * Methods.
 */
export function normaliseThirdPartyConfig(config: Config | undefined): NormalisedConfig {
    if (config === undefined) {
        config = {};
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

    const style = config.style !== undefined ? config.style : "";
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
        style,
        providers,
    };
}

export function matchRecipeIdUsingState(recipe: Recipe, userContext: UserContext): boolean {
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
    userContext: UserContext;
    shouldTryLinkingWithSessionUser: boolean | undefined;
    recipeImplementation: WebJSRecipeInterface<typeof ThirdPartyWebJS>;
}): Promise<{ status: "OK" | "ERROR" }> {
    const loginMethods = await Multitenancy.getInstanceOrThrow().getCurrentDynamicLoginMethods({
        userContext: input.userContext,
    });
    const tenantProviders = loginMethods?.firstFactors.includes(FactorIds.THIRDPARTY)
        ? loginMethods.thirdparty.providers
        : [];
    const providers = mergeProviders({
        tenantProviders,
        clientProviders: input.config.signInAndUpFeature.providers,
    });

    const provider = providers.find((p) => p.id === input.thirdPartyId);
    if (provider === undefined) {
        return { status: "ERROR" };
    }

    const response = await input.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
        thirdPartyId: input.thirdPartyId,
        frontendRedirectURI: provider.getRedirectURL(),
        redirectURIOnProviderDashboard: provider.getRedirectURIOnProviderDashboard(),
        shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
        userContext: input.userContext,
    });

    redirectWithFullPageReload(response);
    return { status: "OK" };
}

export const mergeProviders = ({
    tenantProviders = [],
    clientProviders = [],
}: {
    tenantProviders?: {
        id: string;
        name: string;
    }[];
    clientProviders: Provider[];
}): Pick<Provider, "id" | "getButton" | "getRedirectURL" | "getRedirectURIOnProviderDashboard" | "name">[] => {
    const builtInProvidersMap = {
        apple: Apple,
        google: Google,
        "google-workspaces": GoogleWorkspaces,
        github: Github,
        "active-directory": ActiveDirectory,
        bitbucket: Bitbucket,
        "boxy-saml": BoxySAML,
        discord: Discord,
        gitlab: Gitlab,
        linkedin: LinkedIn,
        okta: Okta,
        twitter: Twitter,
        facebook: Facebook,
    } as const;

    const usesDynamicLoginMethods = SuperTokens.usesDynamicLoginMethods === true;
    if (usesDynamicLoginMethods === false && clientProviders?.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    // If we are not using dynamic login methods or if there is no providers
    // from the core we use frontend initialized providers
    if (usesDynamicLoginMethods === false || tenantProviders.length === 0) {
        return clientProviders;
    }
    const providers: Pick<
        Provider,
        "id" | "getButton" | "getRedirectURL" | "getRedirectURIOnProviderDashboard" | "name"
    >[] = [];

    for (const tenantProvider of tenantProviders) {
        // try finding exact match
        let provider = clientProviders.find((provider) => {
            const { id } = tenantProvider;
            return provider.id === id;
        });
        // if none found try finding by tenantProvider id prefix match only
        if (provider === undefined) {
            provider = clientProviders.find((provider) => {
                const { id } = tenantProvider;
                return id.startsWith(provider.id);
            });
        }
        // means provider is initialized on the frontend and found
        if (provider !== undefined) {
            providers.push(
                Custom.init({
                    ...provider.config,
                    id: tenantProvider.id,
                    name: tenantProvider.name,
                    buttonComponent: provider.getButton(
                        tenantProvider.name,
                        getProviderLogo(tenantProvider.id, tenantProvider.name)
                    ),
                })
            );
        } else {
            // try to find and initialize provider from all prebuilt providers list
            const providerID = Object.keys(builtInProvidersMap).find((id) => {
                return tenantProvider.id === id || tenantProvider.id.startsWith(id);
            });
            if (builtInProvidersMap[providerID as keyof typeof builtInProvidersMap]) {
                const provider = new builtInProvidersMap[providerID as keyof typeof builtInProvidersMap]({
                    id: tenantProvider.id,
                    name: tenantProvider.name,
                });
                providers.push(provider);
            } else {
                providers.push(Custom.init(tenantProvider));
            }
        }
    }

    return providers;
};
