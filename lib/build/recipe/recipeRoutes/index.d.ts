/// <reference types="react" />
import NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";
import { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
import RecipeModule from "../recipeModule";
export declare class RecipeRoutes {
    private readonly recipe;
    private pathsToFeatureComponentWithRecipeIdMap?;
    constructor(recipe: RecipeModule<unknown, unknown, unknown, any>);
    private static reactRouterDom?;
    private static reactRouterDomIsV6;
    static getRoutes(reactRouterDom: any, instance: RecipeRoutes): JSX.Element[];
    canHandleRoute: () => boolean;
    getReactRouterDomWithCustomHistory: () =>
        | {
              router: {
                  Route: any;
              };
              useHistoryCustom: () => any;
          }
        | undefined;
    getRoutingComponent: () => JSX.Element | null;
    getPathsToFeatureComponentWithRecipeIdMap: () => BaseFeatureComponentMap;
    getMatchingComponentForRouteAndRecipeId: (
        normalisedUrl: NormalisedURLPath
    ) => ComponentWithRecipeAndMatchingMethod | undefined;
}
