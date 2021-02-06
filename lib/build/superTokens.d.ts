import * as React from "react";
import RecipeModule from "./recipe/recipeModule";
import { NormalisedAppInfo, SuperTokensConfig } from "./types";
import NormalisedURLPath from "./normalisedURLPath";
import Session from "./recipe/session/session";
export default class SuperTokens {
    private static instance?;
    private appInfo;
    private recipeList;
    private pathsToComponentWithRecipeIdMap?;
    reactRouterDom: any;
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    static getInstanceOrThrow(): SuperTokens;
    static getAppInfo(): NormalisedAppInfo;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | undefined;
    static getSuperTokensRoutesForReactRouterDom(): JSX.Element[];
    getAppInfo: () => NormalisedAppInfo;
    canHandleRoute: () => boolean;
    getRoutingComponent: () => JSX.Element | undefined;
    getPathsToComponentWithRecipeIdMap: () => Record<string, import("./types").ComponentWithRecipeId[]>;
    getMatchingComponentForRouteAndRecipeId: (normalisedUrl: NormalisedURLPath, recipeId: string | null) => React.ComponentClass<{}, any> | (<T>(props: T) => JSX.Element) | undefined;
    getRecipeList: () => RecipeModule[];
    getDefaultSessionRecipe: () => Session | undefined;
    static reset(): void;
}
