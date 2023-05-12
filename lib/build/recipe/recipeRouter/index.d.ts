import type { RecipeFeatureComponentMap } from "../../types";
import type { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
import type NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";
export declare abstract class RecipeRouter {
    private pathsToFeatureComponentWithRecipeIdMap?;
    static getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
        normalisedUrl: NormalisedURLPath,
        preBuiltUIList: RecipeRouter[]
    ): ComponentWithRecipeAndMatchingMethod | undefined;
    getPathsToFeatureComponentWithRecipeIdMap: () => BaseFeatureComponentMap;
    abstract getFeatures(): RecipeFeatureComponentMap;
}
