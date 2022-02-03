/// <reference types="react" />
import SuperTokens from "./superTokens";
import { TranslationStore } from "./translationHelpers";
import { SuperTokensConfig } from "./types";
export default class SuperTokensAPIWrapper {
    static init(config: SuperTokensConfig): void;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static changeLanguage(language: string): void;
    static loadTranslation(store: TranslationStore): void;
    static getSuperTokensRoutesForReactRouterDom(reactRouterDom: any): JSX.Element[];
    static useTranslation: () => import("./translationHelpers").TranslationFunc;
}
export declare const canHandleRoute: typeof SuperTokensAPIWrapper.canHandleRoute;
export declare const init: typeof SuperTokensAPIWrapper.init;
export declare const getRoutingComponent: typeof SuperTokensAPIWrapper.getRoutingComponent;
export declare const getSuperTokensRoutesForReactRouterDom: typeof SuperTokens.getSuperTokensRoutesForReactRouterDom;
export { useTranslation } from "./components/translationContext";
