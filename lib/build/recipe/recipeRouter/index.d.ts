/// <reference types="react" />
import type { RecipeFeatureComponentMap } from "../../types";
import type { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
import type NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";
export declare abstract class RecipeRouter {
    private pathsToFeatureComponentWithRecipeIdMap?;
    private static reactRouterDom?;
    private static reactRouterDomIsV6;
    static getRecipeRoutes(reactRouterDom: any, instance: RecipeRouter): JSX.Element[];
    canHandleRoute: () => boolean;
    static getReactRouterDomWithCustomHistory: () =>
        | {
              router: {
                  Route: any;
              };
              useHistoryCustom: () => any;
          }
        | undefined;
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
    abstract getFeatures(): RecipeFeatureComponentMap;
}
