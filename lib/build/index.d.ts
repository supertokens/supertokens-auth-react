/// <reference types="react" />
import { TranslationStore } from "./translation/translationHelpers";
import { SuperTokensConfig } from "./types";
export default class SuperTokensAPIWrapper {
    static SuperTokensWrapper: import("react").FC<
        import("react").PropsWithChildren<{
            userContext?: any;
        }>
    >;
    static init(config: SuperTokensConfig): void;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static changeLanguage(language: string): Promise<void>;
    static loadTranslation(store: TranslationStore): void;
    static getSuperTokensRoutesForReactRouterDom(reactRouterDom: any): JSX.Element[];
    static redirectToAuth: (options?: {
        show?: "signin" | "signup";
        history?: any;
        queryParams?: any;
        redirectBack?: boolean;
    }) => Promise<void>;
    static useTranslation: () => import("./translation/translationHelpers").TranslationFunc;
    static useUserContext: () => any;
}
export declare const canHandleRoute: typeof SuperTokensAPIWrapper.canHandleRoute;
export declare const init: typeof SuperTokensAPIWrapper.init;
export declare const changeLanguage: typeof SuperTokensAPIWrapper.changeLanguage;
export declare const loadTranslation: typeof SuperTokensAPIWrapper.loadTranslation;
export declare const getRoutingComponent: typeof SuperTokensAPIWrapper.getRoutingComponent;
export declare const getSuperTokensRoutesForReactRouterDom: typeof SuperTokensAPIWrapper.getSuperTokensRoutesForReactRouterDom;
export declare const redirectToAuth: (options?: {
    show?: "signin" | "signup";
    history?: any;
    queryParams?: any;
    redirectBack?: boolean;
}) => Promise<void>;
export { SuperTokensWrapper } from "./components/supertokensWrapper";
export { useTranslation } from "./translation/translationContext";
export { useUserContext } from "./usercontext";
