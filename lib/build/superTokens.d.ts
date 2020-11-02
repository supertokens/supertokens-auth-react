import * as React from "react";
import RecipeModule from "./recipe/recipeModule";
import { NormalisedAppInfo, ReactComponentClass, SuperTokensConfig } from "./types";
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
    static getAppInfo(): NormalisedAppInfo;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | undefined;
    static getRecipeList(): RecipeModule[];
    static getPathsToComponentWithRecipeIdMap(): PathToComponentWithRecipeIdMap;
    static getMatchingComponentForRouteAndRecipeId(path: string, recipeId: string | null): ReactComponentClass | undefined;
    static getSuperTokensRoutesForReactRouterDom(): JSX.Element[];
    getAppInfo: () => NormalisedAppInfo;
    canHandleRoute: () => boolean;
    getRoutingComponent: () => JSX.Element | undefined;
    getPathsToComponentWithRecipeIdMap: () => Record<string, import("./types").ComponentWithRecipeId[]>;
    getMatchingComponentForRouteAndRecipeId: (normalisedUrl: NormalisedURLPath, recipeId: string | null) => React.ComponentClass<{}, any> | (<T>(props: T) => JSX.Element) | undefined;
    getRecipeList: () => RecipeModule[];
    static reset(): void;
}
