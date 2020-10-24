import RecipeModule from "./recipe/recipeModule";
import { AppInfo, SuperTokensConfig } from "./types";
import { ComponentClass } from "react";
import NormalisedURLPath from "./normalisedURLPath";
export default class SuperTokens {
    private static instance?;
    private appInfo;
    private recipeList;
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    private static getInstanceIfDefined;
    static getAppInfo(): AppInfo;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): ComponentClass | undefined;
    static getRecipeList(): RecipeModule[];
    static getNormalisedURLPathOrDefault(defaultPath: string, path?: string): NormalisedURLPath;
    static getSuperTokensRoutesForReactRouterDom(): JSX.Element[];
    getAppInfo: () => AppInfo;
    canHandleRoute: () => boolean;
    getRoutingComponent: () => ComponentClass<{}, any> | undefined;
    getRecipeList: () => RecipeModule[];
    static reset(): void;
}
