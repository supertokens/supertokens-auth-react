import { RouteToFeatureComponentMap, RecipeModuleConfig, RouteWithPathAndRecipeId, ReactComponentClass } from "../types";
export default abstract class RecipeModule {
    private features;
    private recipeId;
    private appInfo;
    constructor(config: RecipeModuleConfig);
    getRecipeId: () => string;
    getFeatures: () => RouteToFeatureComponentMap;
    canHandleRoute: (route: RouteWithPathAndRecipeId) => boolean;
    getRoutingComponent: (route: RouteWithPathAndRecipeId) => ReactComponentClass | undefined;
}
