import SuperTokens from "../../superTokens";
import { normaliseAuthRecipe } from "../authRecipe/utils";

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
    clientProviders,
}: {
    tenantProviders?: {
        id: string;
        name: string;
    }[];
    clientProviders: Pick<Provider, "id" | "buttonComponent" | "getButton">[];
}): Pick<Provider, "id" | "getButton">[] => {
    const usesDynamicLoginMethods = SuperTokens.usesDynamicLoginMethods === true;
    if (usesDynamicLoginMethods === false) {
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
        }
    }
    return providers;
};
