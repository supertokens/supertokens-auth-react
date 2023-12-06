/// <reference types="react" />
import type { TranslationStore } from "./translation/translationHelpers";
import type { Navigate, SuperTokensConfig } from "./types";
export default class SuperTokensAPIWrapper {
    static SuperTokensWrapper: import("react").FC<
        import("react").PropsWithChildren<{
            userContext?: any;
        }>
    >;
    static init(config: SuperTokensConfig): void;
    static changeLanguage(language: string): Promise<void>;
    static loadTranslation(store: TranslationStore): void;
    static redirectToAuth: (options?: {
        show?: "signin" | "signup";
        navigate?: Navigate;
        queryParams?: any;
        redirectBack?: boolean;
    }) => Promise<void>;
    static useTranslation: () => import("./translation/translationHelpers").TranslationFunc;
    static useUserContext: () => any;
}
export declare const init: typeof SuperTokensAPIWrapper.init;
export declare const changeLanguage: typeof SuperTokensAPIWrapper.changeLanguage;
export declare const loadTranslation: typeof SuperTokensAPIWrapper.loadTranslation;
export declare const redirectToAuth: (options?: {
    show?: "signin" | "signup";
    navigate?: Navigate;
    queryParams?: any;
    redirectBack?: boolean;
}) => Promise<void>;
export { SuperTokensWrapper } from "./components/supertokensWrapper";
export { useTranslation } from "./translation/translationContext";
export { useUserContext } from "./usercontext";
