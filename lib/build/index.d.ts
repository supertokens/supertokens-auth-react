import RecipeModule from "./recipes/recipeModule";
import { AppInfo, SuperTokensConfig } from "./types";
import { ComponentClass } from "react";
export default class SuperTokens {
    constructor(config: SuperTokensConfig);
    private appInfo;
    private recipeList;
    getAppInfo(): AppInfo;
    canHandleRoute(urlString: string): boolean;
    getRoutingComponent(urlString: string): ComponentClass | undefined;
    getRecipeList(): RecipeModule[];
    private static instance?;
    static init(config: SuperTokensConfig): SuperTokens;
    private static getInstanceIfDefined;
    static getAppInfo(): AppInfo;
    static canHandleRoute(url: string): boolean;
    static getRoutingComponent(url: string): ComponentClass<{}, any> | undefined;
    static getRecipeList(): RecipeModule[];
    static reset(): void;
}
export declare const canHandleRoute: typeof SuperTokens.canHandleRoute;
export declare const init: typeof SuperTokens.init;
export declare const getRecipeList: typeof SuperTokens.getRecipeList;
export declare const getRoutingComponent: typeof SuperTokens.getRoutingComponent;
