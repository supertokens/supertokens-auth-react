import RecipeModule from "./recipe/recipeModule";
import { AppInfo, SuperTokensConfig } from "./types";
import { ComponentClass } from "react";
export default class SuperTokens {
    private static instance?;
    private appInfo;
    private recipeList;
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    private static getInstanceIfDefined;
    static getAppInfo(): AppInfo;
    static canHandleRoute(url: string): boolean;
    static getRoutingComponent(url: string): ComponentClass | undefined;
    static getRecipeList(): RecipeModule[];
    static getNormalisedBasePathOrDefault(defaultPath: string, path?: string): string;
    getAppInfo: () => AppInfo;
    canHandleRoute: (urlString: string) => boolean;
    getRoutingComponent: (urlString: string) => ComponentClass<{}, any> | undefined;
    getRecipeList: () => RecipeModule[];
    static reset(): void;
}
