import SuperTokens from "../../superTokens";
import { normaliseRecipeModuleConfig } from "../recipeModule/utils";
import {
    ActiveDirectory,
    Apple,
    Bitbucket,
    BoxySAML,
    Discord,
    Facebook,
    Github,
    Gitlab,
    Google,
    LinkedIn,
    Okta,
    Twitter,
} from "../thirdparty";

import type { UserInput, NormalisedConfig, RecipeInterface, GetLoginMethodsResponseNormalized } from "./types";
import type RecipeModule from "../recipeModule";
import type Provider from "../thirdparty/providers";

export function normaliseMultitenancyConfig(config: UserInput): NormalisedConfig {
    const getTenantID = config.getTenantID !== undefined ? config.getTenantID : () => undefined;
    return {
        ...normaliseRecipeModuleConfig(config),
        getTenantID,
        override: {
            functions: (originalImplementation: RecipeInterface) => originalImplementation,
            ...config.override,
        },
    };
}

export function hasIntersectingRecipes(
    tenantMethods: GetLoginMethodsResponseNormalized,
    recipeList: RecipeModule<any, any, any, any>[]
): boolean {
    for (const key in tenantMethods) {
        const hasIntersection = recipeList.some((recipe) => {
            if (tenantMethods[key as keyof GetLoginMethodsResponseNormalized].enabled) {
                return recipe.recipeID === key || recipe.recipeID.includes(key);
            }
            return false;
        });
        if (hasIntersection === true) {
            return true;
        }
    }
    return false;
}

export const mergeProviders = ({
    tenantProviders = [],
    clientProviders = [],
}: {
    tenantProviders?: {
        id: string;
        name: string;
    }[];
    clientProviders: Pick<Provider, "id" | "buttonComponent" | "getButton">[];
}): Pick<Provider, "id" | "getButton">[] => {
    const builtInProvidersMap = {
        apple: Apple,
        google: Google,
        github: Github,
        activeDirectory: ActiveDirectory,
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
    if (usesDynamicLoginMethods === false && clientProviders.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    // If we are not using dynamic login methods or if there is no providers
    // from the core we use frontend initialized providers
    if (usesDynamicLoginMethods === false || tenantProviders.length === 0) {
        return clientProviders.map((provider) => ({
            id: provider.id,
            buttonComponent: provider.getButton(),
            getButton: provider.getButton,
        }));
    }
    const providers: Pick<Provider, "id" | "buttonComponent" | "getButton">[] = [];

    for (const tenantProvider of tenantProviders) {
        // try finding exact and prefix match first
        let provider = clientProviders.find((provider) => {
            const { id } = tenantProvider;
            return provider.id === id || provider.id.includes(id);
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
            providers.push({
                id: tenantProvider.id,
                buttonComponent: provider.getButton(tenantProvider.name),
                getButton: provider.getButton,
            });
        } else {
            // try to find and initialize provider from all prebuilt providers list
            const providerID = Object.keys(builtInProvidersMap).find((id) => {
                return tenantProvider.id === id || tenantProvider.id.startsWith(id);
            });
            if (builtInProvidersMap[providerID as keyof typeof builtInProvidersMap]) {
                const provider = new builtInProvidersMap[providerID as keyof typeof builtInProvidersMap]();
                providers.push({
                    id: tenantProvider.id,
                    buttonComponent: provider.getButton(tenantProvider.name),
                    getButton: provider.getButton,
                });
            }
        }
    }
    return providers;
};
