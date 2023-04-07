/// <reference types="react" />
import type { PreBuiltRecipes, ReactRouterDom } from "./types";
export default class UI {
    private static reactRouterDom;
    private static reactRouterDomIsV6?;
    static getSuperTokensRoutesForReactRouterDom(
        reactRouterDom: any,
        preBuiltUiClassList?: PreBuiltRecipes
    ): JSX.Element[];
    static getReactRouterDomWithCustomHistory: () => ReactRouterDom | undefined;
    static canHandleRoute(preBuiltUiClassList: PreBuiltRecipes): boolean;
    static getRoutingComponent(preBuiltUiClassList: PreBuiltRecipes): JSX.Element;
}
declare const getSuperTokensRoutesForReactRouterDom: typeof UI.getSuperTokensRoutesForReactRouterDom;
declare const canHandleRoute: typeof UI.canHandleRoute;
declare const getRoutingComponent: typeof UI.getRoutingComponent;
export { getSuperTokensRoutesForReactRouterDom, canHandleRoute, getRoutingComponent };
