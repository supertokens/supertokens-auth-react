/// <reference types="react" />
import type { RecipeRouter } from "../recipe/recipeRouter";
import type { ReactRouterDom } from "../ui/types";
export declare function getSuperTokensRoutesForReactRouterDomV6({
    getReactRouterDomWithCustomHistory,
    recipeList,
}: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDom | undefined;
    recipeList: RecipeRouter[];
}): JSX.Element[];
