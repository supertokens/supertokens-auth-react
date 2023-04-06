/// <reference types="react" />
import type { PreBuiltRecipes, ReactRouterDom } from "./types";
export default class UI {
    private static reactRouterDom;
    private static reactRouterDomIsV6?;
    static getSuperTokensReactRouterDomRoutes(reactRouterDom: any, preBuiltUiClassList: PreBuiltRecipes): JSX.Element[];
    static getReactRouterDomWithCustomHistory: () => ReactRouterDom | undefined;
    static canHandleRoute(preBuiltUiClassList: PreBuiltRecipes): boolean;
    static getRoutingComponent(preBuiltUiClassList: PreBuiltRecipes): JSX.Element;
}
declare const getSuperTokensReactRouterDomRoutes: typeof UI.getSuperTokensReactRouterDomRoutes;
declare const canHandleRoute: typeof UI.canHandleRoute;
declare const getRoutingComponent: typeof UI.getRoutingComponent;
export { getSuperTokensReactRouterDomRoutes, canHandleRoute, getRoutingComponent };
