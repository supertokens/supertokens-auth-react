import type { UserInput, NormalisedConfig, GetLoginMethodsResponseNormalized } from "./types";
import type RecipeModule from "../recipeModule";
import type Provider from "../thirdparty/providers";
export declare function normaliseMultitenancyConfig(config: UserInput): NormalisedConfig;
export declare function hasIntersectingRecipes(
    tenantMethods: GetLoginMethodsResponseNormalized,
    recipeList: RecipeModule<any, any, any, any>[]
): boolean;
export declare const mergeProviders: ({
    tenantProviders,
    clientProviders,
}: {
    tenantProviders?:
        | {
              id: string;
              name: string;
          }[]
        | undefined;
    clientProviders: Pick<Provider, "id" | "buttonComponent" | "getButton">[];
}) => Pick<Provider, "id" | "getButton">[];
