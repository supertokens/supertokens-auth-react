/// <reference types="react" />
import type { ReactRouterDom } from "../prebuiltui/types";
import type { RecipeRouter } from "../recipe/recipeRouter";
export declare function getSuperTokensRoutesForReactRouterDom({
    getReactRouterDomWithCustomHistory,
    recipeList,
}: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDom | undefined;
    recipeList: RecipeRouter[];
}): JSX.Element[];
