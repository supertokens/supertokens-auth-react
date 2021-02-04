import HttpRequest from "../httpRequest";
import { RouteToFeatureComponentMap, RecipeModuleConfig, NormalisedAppInfo, NormalisedRecipeModuleHooks } from "../types";
export default abstract class RecipeModule {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    httpRequest: HttpRequest;
    hooks: NormalisedRecipeModuleHooks;
    constructor(config: RecipeModuleConfig<unknown, unknown>);
    abstract getFeatures(): RouteToFeatureComponentMap;
}
