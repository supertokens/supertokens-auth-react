/// <reference types="react" />
import type { ReactRouterDomWithCustomHistory } from "../prebuiltui/types";
import type { RecipeRouter } from "../recipe/recipeRouter";
export declare function getSuperTokensRoutesForReactRouterDom({
    getReactRouterDomWithCustomHistory,
    recipeList,
}: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    recipeList: RecipeRouter[];
}): JSX.Element[];
