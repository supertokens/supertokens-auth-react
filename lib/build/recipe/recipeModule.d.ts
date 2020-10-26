import { RouteToFeatureComponentMap, RecipeModuleConfig, RouteWithPathAndRecipeId } from "../types";
import { ComponentClass } from "react";
export default abstract class RecipeModule {
    private features;
    private recipeId;
    private appInfo;
    constructor(config: RecipeModuleConfig);
    getRecipeId: () => string;
    getFeatures: () => RouteToFeatureComponentMap;
    canHandleRoute: (route: RouteWithPathAndRecipeId) => boolean;
    getRoutingComponent: (route: RouteWithPathAndRecipeId) => ComponentClass<{}, any> | undefined;
}
