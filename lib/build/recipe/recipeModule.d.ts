import { RouteToFeatureComponentMap, RecipeModuleConfig, NormalisedAppInfo } from "../types";
export default abstract class RecipeModule {
    private recipeId;
    private appInfo;
    constructor(config: RecipeModuleConfig);
    getRecipeId: () => string;
    getAppInfo: () => NormalisedAppInfo;
    abstract getFeatures(): RouteToFeatureComponentMap;
}
