import React, { ReactNode } from "react";
import {
    TranslationContextType,
    TranslationControlEventSource,
    TranslationFunc,
    TranslationStore,
} from "../translationHelpers";
export declare const TranslationContext: React.Context<TranslationContextType>;
export declare const useTranslation: () => TranslationFunc;
export declare const TranslationContextProvider: React.FC<{
    children: ReactNode;
    defaultLanguage: string;
    defaultStore: TranslationStore;
    userTranslateFunc?: TranslationFunc;
    translationControlEventSource: TranslationControlEventSource;
}>;
