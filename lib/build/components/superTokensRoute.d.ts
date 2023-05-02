/// <reference types="react" />
import type { RecipeRouter } from "../recipe/recipeRouter";
import type { ReactRouterDomWithCustomHistory } from "../ui/types";
export declare function getSuperTokensRoutesForReactRouterDom({
    getReactRouterDomWithCustomHistory,
    recipeList,
}: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    recipeList: RecipeRouter[];
}): JSX.Element[];
