/// <reference types="react" />
import SuperTokens from "./superTokens";
import { SuperTokensConfig } from "./types";
export default class SuperTokensAPIWrapper {
    static init(config: SuperTokensConfig): void;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | undefined;
    static getSuperTokensRoutesForReactRouterDom(): JSX.Element[];
}
export declare const canHandleRoute: typeof SuperTokensAPIWrapper.canHandleRoute;
export declare const init: typeof SuperTokensAPIWrapper.init;
export declare const getRoutingComponent: typeof SuperTokensAPIWrapper.getRoutingComponent;
export declare const getSuperTokensRoutesForReactRouterDom: typeof SuperTokens.getSuperTokensRoutesForReactRouterDom;
