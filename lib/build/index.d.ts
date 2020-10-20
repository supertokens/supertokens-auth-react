/// <reference types="react" />
import { SuperTokensConfig } from "./types";
export default class SuperTokensAPIWrapper {
    static init(config: SuperTokensConfig): void;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): import("react").ComponentClass<{}, any> | undefined;
}
export declare const canHandleRoute: typeof SuperTokensAPIWrapper.canHandleRoute;
export declare const init: typeof SuperTokensAPIWrapper.init;
export declare const getRoutingComponent: typeof SuperTokensAPIWrapper.getRoutingComponent;
