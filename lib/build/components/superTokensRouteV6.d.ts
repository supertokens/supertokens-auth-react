/// <reference types="react" />
import type { RecipeRouter } from "../recipe/recipeRouter";
import type { ReactRouterDomWithCustomHistory } from "../ui/types";
export declare function getSuperTokensRoutesForReactRouterDomV6({
    getReactRouterDomWithCustomHistory,
    recipeList,
    basePath,
}: {
    getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    recipeList: RecipeRouter[];
    basePath: string | undefined;
}): JSX.Element[];
