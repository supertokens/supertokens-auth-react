/// <reference types="react" />
import type { PreBuiltRecipes, ReactRouterDom } from "./types";
export default class UI {
    private static reactRouterDom;
    private static reactRouterDomIsV6?;
    static getSupertokensReactRouterDomRoutes(reactRouterDom: any, preBuiltUiClassList: PreBuiltRecipes): JSX.Element[];
    static getReactRouterDomWithCustomHistory: () => ReactRouterDom | undefined;
    static canHandleRoute(preBuiltUiClassList: PreBuiltRecipes): boolean;
    static getRoutingComponent(preBuiltUiClassList: PreBuiltRecipes): JSX.Element;
}
declare const getSupertokensReactRouterDomRoutes: typeof UI.getSupertokensReactRouterDomRoutes;
declare const canHandleRoute: typeof UI.canHandleRoute;
declare const getRoutingComponent: typeof UI.getRoutingComponent;
export { getSupertokensReactRouterDomRoutes, canHandleRoute, getRoutingComponent };