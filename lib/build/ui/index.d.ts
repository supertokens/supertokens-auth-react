/// <reference types="react" />
import type { PreBuiltRecipes, ReactRouterDomWithCustomHistory } from "./types";
export default class UI {
    private static reactRouterDom;
    private static reactRouterDomIsV6?;
    static getSuperTokensRoutesForReactRouterDom(
        reactRouterDom: any,
        preBuiltUiClassList?: PreBuiltRecipes,
        basePath?: string
    ): JSX.Element[];
    static getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    static canHandleRoute(preBuiltUiClassList: PreBuiltRecipes): boolean;
    static getRoutingComponent(preBuiltUiClassList: PreBuiltRecipes): JSX.Element;
}
declare const getSuperTokensRoutesForReactRouterDom: typeof UI.getSuperTokensRoutesForReactRouterDom;
declare const canHandleRoute: typeof UI.canHandleRoute;
declare const getRoutingComponent: typeof UI.getRoutingComponent;
export { getSuperTokensRoutesForReactRouterDom, canHandleRoute, getRoutingComponent };
