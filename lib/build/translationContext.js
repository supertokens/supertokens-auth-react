"use strict";

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");

const errCB = () => {
    throw new Error("Cannot use translation func outside TranslationContext provider.");
};
const TranslationContext = React.createContext({
    translate: errCB,
});
const useTranslation = () => {
    return React.useContext(TranslationContext).translate;
};
const TranslationContextProvider = ({
    children,
    defaultLanguage,
    userTranslationFunc,
    defaultStore,
    translationControlEventSource,
}) => {
    const [translationStore, setTranslationStore] = React.useState(defaultStore);
    const [currentLanguage, setCurrentLanguage] = React.useState(undefined);
    React.useEffect(() => {
        function loadLanguageFromCookies() {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const cookieLang = yield sessionAuth.getCurrentLanguageFromCookie();
                const cookieLangTemp = cookieLang === null ? defaultLanguage : cookieLang;
                /**
                 * If current is not undefined, it means that something else has set the language.
                 * For example if the user calls SuperTokens.changeLanguage before this
                 *
                 * We want to use the language preference from cookies only if something else has
                 * not set language before this
                 */
                setCurrentLanguage((current) => (current !== undefined ? current : cookieLangTemp));
            });
        }
        void loadLanguageFromCookies();
    }, [defaultLanguage, setCurrentLanguage]);
    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const changeHandler = (_eventName, detail) => {
            setCurrentLanguage(detail);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const loadHandler = (_eventName, detail) => {
            setTranslationStore((os) => sessionAuth.mergeObjects(os, detail));
        };
        translationControlEventSource.on("LanguageChange", changeHandler);
        translationControlEventSource.on("TranslationLoaded", loadHandler);
        return () => {
            translationControlEventSource.off("LanguageChange", changeHandler);
            translationControlEventSource.off("TranslationLoaded", loadHandler);
        };
    });
    const translateFunc = React.useCallback(
        (key) => {
            if (userTranslationFunc !== undefined) {
                return userTranslationFunc(key);
            }
            if (currentLanguage !== undefined) {
                const res = translationStore[currentLanguage] && translationStore[currentLanguage][key];
                const fallback = translationStore[defaultLanguage] && translationStore[defaultLanguage][key];
                if (res === undefined) {
                    if (fallback !== undefined) {
                        return fallback;
                    }
                    return key;
                }
                return res;
            }
            throw new Error("Should never come here");
        },
        [translationStore, currentLanguage, defaultLanguage, userTranslationFunc]
    );
    if (currentLanguage === undefined) {
        return null;
    }
    return jsxRuntime.jsx(
        TranslationContext.Provider,
        Object.assign({ value: { translate: translateFunc } }, { children: children })
    );
};

exports.TranslationContextProvider = TranslationContextProvider;
exports.useTranslation = useTranslation;
//# sourceMappingURL=translationContext.js.map
