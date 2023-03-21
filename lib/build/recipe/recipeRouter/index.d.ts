/// <reference types="react" />
import type { RecipeFeatureComponentMap } from "../../types";
import type { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
import type NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";
export declare abstract class RecipeRouter {
    private pathsToFeatureComponentWithRecipeIdMap?;
    private static reactRouterDom?;
    private static reactRouterDomIsV6;
    static preBuiltUIList: RecipeRouter[];
    static getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
        normalisedUrl: NormalisedURLPath
    ): ComponentWithRecipeAndMatchingMethod | undefined;
    static addPrebuiltUI(instance: RecipeRouter): void;
    static getRecipeRoutes(reactRouterDom: any, instance: RecipeRouter): JSX.Element[];
    canHandleRoute: () => boolean;
    static getReactRouterDomWithCustomHistory: () =>
        | {
              router: {
                  Route: any;
              };
              useHistoryCustom: () => any;
              useLocation: () => any;
          }
        | undefined;
    getReactRouterDomWithCustomHistory: () =>
        | {
              router: {
                  Route: any;
              };
              useHistoryCustom: () => any;
              useLocation: () => any;
          }
        | undefined;
    getRoutingComponent: () => JSX.Element | null;
    getPathsToFeatureComponentWithRecipeIdMap: () => BaseFeatureComponentMap;
    getMatchingComponentForRouteAndRecipeId: (
        normalisedUrl: NormalisedURLPath
    ) => ComponentWithRecipeAndMatchingMethod | undefined;
    abstract getFeatures(): RecipeFeatureComponentMap;
}
