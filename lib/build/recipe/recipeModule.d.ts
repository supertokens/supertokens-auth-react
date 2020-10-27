import { RouteToFeatureComponentMap, RecipeModuleConfig } from "../types";
import { ComponentClass } from "react";
import SuperTokensUrl from "../superTokensUrl";
export default abstract class RecipeModule {
    private features;
    private recipeId;
    private appInfo;
    constructor(config: RecipeModuleConfig);
    getRecipeId: () => string;
    getFeatures: () => RouteToFeatureComponentMap;
    canHandleRoute: (url: SuperTokensUrl) => boolean;
    getRoutingComponent: (url: SuperTokensUrl) => ComponentClass<{}, any> | undefined;
}
