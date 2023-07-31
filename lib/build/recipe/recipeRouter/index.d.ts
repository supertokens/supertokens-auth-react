import type { RecipeFeatureComponentMap } from "../../types";
import type { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
import type { GetLoginMethodsResponseNormalized } from "../multitenancy/types";
import type RecipeModule from "../recipeModule";
import type NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";
export declare abstract class RecipeRouter {
    private pathsToFeatureComponentWithRecipeIdMap?;
    abstract recipeInstance: RecipeModule<any, any, any, any>;
    static getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
        normalisedUrl: NormalisedURLPath,
        preBuiltUIList: RecipeRouter[],
        defaultToStaticList: boolean,
        dynamicLoginMethods?: GetLoginMethodsResponseNormalized
    ): ComponentWithRecipeAndMatchingMethod | undefined;
    getPathsToFeatureComponentWithRecipeIdMap: () => BaseFeatureComponentMap;
    abstract getFeatures(): RecipeFeatureComponentMap;
}
