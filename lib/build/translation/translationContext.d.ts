import React, { PropsWithChildren } from "react";
import {
    TranslationContextType,
    TranslationControlEventSource,
    TranslationFunc,
    TranslationStore,
} from "./translationHelpers";
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
