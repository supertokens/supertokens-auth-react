import { normaliseRecipeModuleConfig } from "../recipeModule/utils";

import type { UserInput, NormalisedConfig, GetLoginMethodsResponseNormalized } from "./types";
import type { BaseRecipeModule } from "../recipeModule/baseRecipeModule";

export function normaliseMultitenancyConfig(config: UserInput): NormalisedConfig {
    return {
        ...normaliseRecipeModuleConfig(config),
        override: {
            functions: (originalImplementation) => originalImplementation,
            ...config.override,
        },
    };
}

export function hasIntersectingRecipes(
    tenantMethods: GetLoginMethodsResponseNormalized,
    recipeList: BaseRecipeModule<any, any, any, any>[]
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
