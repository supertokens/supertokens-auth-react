import React from "react";
import type {
    TranslationContextType,
    TranslationControlEventSource,
    TranslationFunc,
    TranslationStore,
} from "./translationHelpers";
import type { PropsWithChildren } from "react";
export declare const TranslationContext: React.Context<TranslationContextType>;
export declare const useTranslation: () => TranslationFunc;
export declare const TranslationContextProvider: React.FC<
    PropsWithChildren<{
        defaultLanguage: string;
        defaultStore: TranslationStore;
        userTranslationFunc?: TranslationFunc;
        translationControlEventSource: TranslationControlEventSource;
    }>
>;
