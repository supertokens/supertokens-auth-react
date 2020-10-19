import { RecipeModuleConfig } from "../types";
import { ComponentClass } from "react";
export default abstract class RecipeModule {
    private features;
    private recipeId;
    constructor(config: RecipeModuleConfig);
    getRecipeId(): string;
    canHandleRoute(route: string, rId: string | null): boolean;
    getRoutingComponent(route: string, rId: string | null): ComponentClass | undefined;
    private getNormalisedRouteWithoutWebsiteBasePath;
}
