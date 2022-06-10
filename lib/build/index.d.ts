/// <reference types="react" />
import SuperTokens from "./superTokens";
import { TranslationStore } from "./translation/translationHelpers";
import { SuperTokensConfig } from "./types";
export default class SuperTokensAPIWrapper {
    static init(config: SuperTokensConfig): void;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static changeLanguage(language: string): Promise<void>;
    static loadTranslation(store: TranslationStore): void;
    static getSuperTokensRoutesForReactRouterDom(reactRouterDom: any): JSX.Element[];
    static useTranslation: () => import("./translation/translationHelpers").TranslationFunc;
    static useUserContext: () => any;
}
export declare const canHandleRoute: typeof SuperTokensAPIWrapper.canHandleRoute;
export declare const init: typeof SuperTokensAPIWrapper.init;
export declare const changeLanguage: typeof SuperTokensAPIWrapper.changeLanguage;
export declare const loadTranslation: typeof SuperTokensAPIWrapper.loadTranslation;
export declare const getRoutingComponent: typeof SuperTokensAPIWrapper.getRoutingComponent;
export declare const getSuperTokensRoutesForReactRouterDom: typeof SuperTokens.getSuperTokensRoutesForReactRouterDom;
export { useTranslation } from "./translation/translationContext";
export { useUserContext } from "./usercontext";
