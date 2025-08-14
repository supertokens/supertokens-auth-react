/// <reference types="react" />
import type { TranslationStore } from "./translation/translationHelpers";
import type { Navigate, SuperTokensConfig, UserContext } from "./types";
export default class SuperTokensAPIWrapper {
    static SuperTokensWrapper: import("react").FC<
        import("react").PropsWithChildren<{
            userContext?: UserContext | undefined;
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
        userContext?: UserContext;
    }) => Promise<void>;
    static isRecipeInitialized(recipeId: string): boolean;
    static useTranslation: () => import("./translation/translationHelpers").TranslationFunc;
    static getTranslationFunction: <T extends string>(
        ...stores: TranslationStore[]
    ) => (key: T, replacements?: Record<string, string> | undefined) => string;
    static useUserContext: () => UserContext;
}
export declare const init: typeof SuperTokensAPIWrapper.init;
export declare const changeLanguage: typeof SuperTokensAPIWrapper.changeLanguage;
export declare const loadTranslation: typeof SuperTokensAPIWrapper.loadTranslation;
export declare const redirectToAuth: (options?: {
    show?: "signin" | "signup";
    navigate?: Navigate;
    queryParams?: any;
    redirectBack?: boolean;
    userContext?: UserContext;
}) => Promise<void>;
export declare const isRecipeInitialized: typeof SuperTokensAPIWrapper.isRecipeInitialized;
export type { SuperTokensConfig, SuperTokensPublicConfig, SuperTokensPublicPlugin, SuperTokensPlugin } from "./types";
export type { TranslationStore } from "./translation/translationHelpers";
export { SuperTokensWrapper } from "./components/supertokensWrapper";
export { useTranslation } from "./translation/translationContext";
export { getTranslationFunction } from "./translation/translationHelpers";
export { useUserContext } from "./usercontext";
