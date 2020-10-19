import RecipeModule from "./recipes/recipeModule";
import { AppInfo, SuperTokensConfig } from "./types";
export default class SuperTokens {
    constructor(config: SuperTokensConfig);
    private appInfo;
    private recipeList;
    getAppInfo(): AppInfo;
    canHandleRoute(url: string): boolean;
    getRoutingComponent(url: string): void;
    getRecipeList(): RecipeModule[];
    private static instance?;
    static init(config: SuperTokensConfig): SuperTokens;
    private static getInstance;
    static getAppInfo(): AppInfo;
    static canHandleRoute(url: string): boolean;
    static getRoutingComponent(url: string): void;
    static getRecipeList(): RecipeModule[];
    static reset(): void;
}
export declare const canHandleRoute: typeof SuperTokens.canHandleRoute;
export declare const init: typeof SuperTokens.init;
export declare const getRecipeList: typeof SuperTokens.getRecipeList;
export declare const getRoutingComponent: typeof SuperTokens.getRoutingComponent;
