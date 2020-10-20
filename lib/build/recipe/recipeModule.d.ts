import { FeatureMap, RecipeModuleConfig } from "../types";
import { ComponentClass } from "react";
import SuperTokensUrl from "../helpers/superTokensUrl";
export default abstract class RecipeModule {
    private features;
    private recipeId;
    constructor(config: RecipeModuleConfig);
    getRecipeId: () => string;
    getFeatures: () => FeatureMap;
    canHandleRoute: (url: SuperTokensUrl) => boolean;
    getRoutingComponent: (url: SuperTokensUrl) => ComponentClass<{}, any> | undefined;
    private getNormalisedRouteWithoutWebsiteBasePath;
}
