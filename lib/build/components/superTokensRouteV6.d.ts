/// <reference types="react" />
import type { ReactRouterDomWithCustomHistory } from "../prebuiltui/types";
import type { RecipeRouter } from "../recipe/recipeRouter";
export declare function getSuperTokensRoutesForReactRouterDomV6({
    getReactRouterDomWithCustomHistory,
    recipeList,
}: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    recipeList: RecipeRouter[];
}): JSX.Element[];
