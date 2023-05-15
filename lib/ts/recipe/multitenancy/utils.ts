import SuperTokens from "../../superTokens";
import { normaliseAuthRecipe } from "../authRecipe/utils";
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
import ThirdParty from "../thirdparty/recipe";

import type { UserInput, NormalisedConfig, RecipeInterface, GetLoginMethodsResponseNormalized } from "./types";
import type RecipeModule from "../recipeModule";
import type Provider from "../thirdparty/providers";

export function normaliseMultitenancyConfig(config: UserInput): NormalisedConfig {
    const getTenantID = config.getTenantID !== undefined ? config.getTenantID : () => undefined;
    return {
        ...normaliseAuthRecipe(config),
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

export const getProviders = ({
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

    if (ThirdParty.providers !== undefined) {
        return ThirdParty.providers;
    }

    const usesDynamicLoginMethods = SuperTokens.usesDynamicLoginMethods === true;
    if (usesDynamicLoginMethods === false && clientProviders.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    if (usesDynamicLoginMethods === false || tenantProviders.length === 0) {
        return clientProviders.map((provider) => ({
            id: provider.id,
            buttonComponent: provider.getButton(),
            getButton: provider.getButton,
        }));
    }
    const providers: Pick<Provider, "id" | "buttonComponent" | "getButton">[] = [];

    for (const tenantProvider of tenantProviders) {
        let provider = clientProviders.find((provider) => {
            const { id } = tenantProvider;
            return provider.id === id || provider.id.includes(id);
        });
        if (provider === undefined) {
            provider = clientProviders.find((provider) => {
                const { id } = tenantProvider;
                return id.startsWith(provider.id);
            });
        }
        if (provider !== undefined) {
            providers.push({
                id: tenantProvider.id,
                buttonComponent: provider.getButton(tenantProvider.name),
                getButton: provider.getButton,
            });
        } else {
            const providerID = Object.keys(builtInProvidersMap).find((id) => {
                return tenantProvider.id === id || tenantProvider.id.startsWith(id);
            });
            if (builtInProvidersMap[providerID as keyof typeof builtInProvidersMap]) {
                const provider = builtInProvidersMap[providerID as keyof typeof builtInProvidersMap].init();
                providers.push({
                    id: tenantProvider.id,
                    buttonComponent: provider.getButton(tenantProvider.name),
                    getButton: provider.getButton,
                });
            }
        }
    }
    ThirdParty.providers = providers;
    return providers;
};
