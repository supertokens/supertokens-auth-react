import React, { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import {
    getCurrentLanguageFromCookie,
    TranslationContextType,
    TranslationControlEventSource,
    TranslationEventHandler,
    TranslationFunc,
    TranslationStore,
} from "../translationHelpers";
import { mergeObjects } from "../utils";

const errCB = () => {
    throw new Error("Cannot use translation func outside TranslationContext provider.");
};
export const TranslationContext = React.createContext<TranslationContextType>({
    translate: errCB,
});

export const useTranslation = (): TranslationFunc => {
    return useContext(TranslationContext).translate;
};

export const TranslationContextProvider: React.FC<{
    children: ReactNode;
    defaultLanguage: string;
    defaultStore: TranslationStore;
    userTranslateFunc?: TranslationFunc;
    translationControlEventSource: TranslationControlEventSource;
}> = ({ children, defaultLanguage, userTranslateFunc, defaultStore, translationControlEventSource }) => {
    const [translationStore, setTranslationStore] = useState<TranslationStore>(defaultStore);
    const cookieLang = getCurrentLanguageFromCookie();
    const [currentLanguage, setCurrentLanguage] = useState(cookieLang === null ? defaultLanguage : cookieLang);

    const translateFunc = useCallback<TranslationFunc>(
        (key: string, params: Record<string, string> = {}) => {
            if (userTranslateFunc !== undefined) {
                return userTranslateFunc(key, params);
            }
            const res = translationStore[currentLanguage] && translationStore[currentLanguage][key];
            const fallback = translationStore[defaultLanguage] && translationStore[defaultLanguage][key];

            if (res === undefined) {
                console.warn(`Missing translation ${key} from ${currentLanguage}`);
                if (fallback !== undefined) {
                    return fallback;
                }
                console.warn(`Missing translation ${key} from ${defaultLanguage}`);
                return key;
            }

            return res;
        },
        [translationStore, currentLanguage, defaultLanguage, userTranslateFunc]
    );

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const changeHandler: TranslationEventHandler<"LanguageChange"> = (_eventName, detail) => {
            setCurrentLanguage(detail);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const loadHandler: TranslationEventHandler<"TranslationLoaded"> = (_eventName, detail) => {
            setTranslationStore((os) => mergeObjects(os, detail));
        };

        translationControlEventSource.on("LanguageChange", changeHandler);
        translationControlEventSource.on("TranslationLoaded", loadHandler);

        return () => {
            translationControlEventSource.off("LanguageChange", changeHandler);
            translationControlEventSource.off("TranslationLoaded", loadHandler);
        };
    });
    return <TranslationContext.Provider value={{ translate: translateFunc }}>{children}</TranslationContext.Provider>;
};
