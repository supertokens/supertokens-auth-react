import type { UserInput, NormalisedConfig, GetLoginMethodsResponseNormalized } from "./types";
import type { BaseRecipeModule } from "../recipeModule/baseRecipeModule";
export declare function normaliseMultitenancyConfig(config?: UserInput): NormalisedConfig;
export declare function hasIntersectingRecipes(
    tenantMethods: GetLoginMethodsResponseNormalized,
    recipeList: BaseRecipeModule<any, any, any, any>[]
): boolean;
