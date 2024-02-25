import { normaliseRecipeModuleConfig } from "../recipeModule/utils";

import type { UserInput, NormalisedConfig, GetLoginMethodsResponseNormalized } from "./types";
import type AuthRecipe from "../authRecipe";

export function normaliseMultitenancyConfig(config?: UserInput): NormalisedConfig {
    return {
        ...normaliseRecipeModuleConfig(config),
        override: {
            functions: (originalImplementation) => originalImplementation,
            ...config?.override,
        },
    };
}

export function hasIntersectingRecipes(
    tenantMethods: GetLoginMethodsResponseNormalized,
    recipeList: AuthRecipe<any, any, any, any>[]
): boolean {
    return tenantMethods.firstFactors.some((factorId) =>
        recipeList.some((recipe) => recipe.firstFactorIds.includes(factorId))
    );
}
