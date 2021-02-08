/// <reference types="react" />
import RecipeModule from "./recipe/recipeModule";
import { ComponentWithRecipeId, NormalisedAppInfo, SuperTokensConfig } from "./types";
import NormalisedURLPath from "./normalisedURLPath";
import Session from "./recipe/session/session";
export default class SuperTokens {
    private static instance?;
    appInfo: NormalisedAppInfo;
    recipeList: RecipeModule[];
    private pathsToComponentWithRecipeIdMap?;
    private useReactRouterDom;
    private reactRouterDom?;
    constructor(config: SuperTokensConfig);
    static init(config: SuperTokensConfig): void;
    static getInstanceOrThrow(): SuperTokens;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | undefined;
    static getSuperTokensRoutesForReactRouterDom(): JSX.Element[];
    canHandleRoute: () => boolean;
    getRoutingComponent: () => JSX.Element | undefined;
    getPathsToComponentWithRecipeIdMap: () => Record<string, ComponentWithRecipeId[]>;
    getMatchingComponentForRouteAndRecipeId: (normalisedUrl: NormalisedURLPath, recipeId: string | null) => ComponentWithRecipeId | undefined;
    getRecipeOrThrow(recipeId: string): RecipeModule;
    getReactRouterDom: () => {
        Route: any;
        withRouter: any;
    } | undefined;
    getDefaultSessionRecipe: () => Session | undefined;
    static reset(): void;
}
