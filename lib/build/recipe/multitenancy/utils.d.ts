import type { UserInput, NormalisedConfig, GetLoginMethodsResponseNormalized } from "./types";
import type AuthRecipe from "../authRecipe";
export declare function normaliseMultitenancyConfig(config?: UserInput): NormalisedConfig;
export declare function hasIntersectingRecipes(
    tenantMethods: GetLoginMethodsResponseNormalized,
    recipeList: AuthRecipe<any, any, any, any>[]
): boolean;
