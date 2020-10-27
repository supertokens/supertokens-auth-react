/// <reference types="react" />
import RecipeModule from "./recipe/recipeModule";
import { AppInfo, ReactComponentClass, SuperTokensConfig } from "./types";
import NormalisedURLPath from "./normalisedURLPath";
import { PathToComponentWithRecipeIdMap } from "./types";
export default class SuperTokens {
    private static instance?;
    private appInfo;
    private recipeList;
    private pathsToComponentWithRecipeIdMap?;
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    private static getInstanceOrThrow;
    static getAppInfo(): AppInfo;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): ReactComponentClass | undefined;
    static getRecipeList(): RecipeModule[];
    static getPathsToComponentWithRecipeIdMap(): PathToComponentWithRecipeIdMap;
    static getMatchingComponentForRouteAndRecipeId(path: string, recipeId: string | null): ReactComponentClass | undefined;
    static getNormalisedURLPathOrDefault(defaultPath: string, path?: string): NormalisedURLPath;
    static getSuperTokensRoutesForReactRouterDom(): JSX.Element[];
    getAppInfo: () => AppInfo;
    canHandleRoute: () => boolean;
    getRoutingComponent: () => ReactComponentClass | undefined;
    getPathsToComponentWithRecipeIdMap: () => PathToComponentWithRecipeIdMap;
    getMatchingComponentForRouteAndRecipeId: (path: string, recipeId: string | null) => ReactComponentClass | undefined;
    getRecipeList: () => RecipeModule[];
    static reset(): void;
}
