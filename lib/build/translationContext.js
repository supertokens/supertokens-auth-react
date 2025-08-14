"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefault(React);

var errCB = function () {
    throw new Error("Cannot use translation func outside TranslationContext provider.");
};
var TranslationContext = React__default.default.createContext({
    translate: errCB,
});
var useTranslation = function () {
    return React.useContext(TranslationContext).translate;
};
var TranslationContextProvider = function (_a) {
    var children = _a.children,
        defaultLanguage = _a.defaultLanguage,
        userTranslationFunc = _a.userTranslationFunc,
        defaultStore = _a.defaultStore,
        translationControlEventSource = _a.translationControlEventSource;
    var _b = React.useState(defaultStore),
        translationStore = _b[0],
        setTranslationStore = _b[1];
    var _c = React.useState(undefined),
        currentLanguage = _c[0],
        setCurrentLanguage = _c[1];
    React.useEffect(
        function () {
            function loadLanguageFromCookies() {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var cookieLang, cookieLangTemp;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, genericComponentOverrideContext.getCurrentLanguageFromCookie()];
                            case 1:
                                cookieLang = _a.sent();
                                cookieLangTemp = cookieLang === null ? defaultLanguage : cookieLang;
                                /**
                                 * If current is not undefined, it means that something else has set the language.
                                 * For example if the user calls SuperTokens.changeLanguage before this
                                 *
                                 * We want to use the language preference from cookies only if something else has
                                 * not set language before this
                                 */
                                setCurrentLanguage(function (current) {
                                    return current !== undefined ? current : cookieLangTemp;
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            }
            void loadLanguageFromCookies();
        },
        [defaultLanguage, setCurrentLanguage]
    );
    React.useEffect(function () {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var changeHandler = function (_eventName, detail) {
            setCurrentLanguage(detail);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var loadHandler = function (_eventName, detail) {
            setTranslationStore(function (os) {
                return genericComponentOverrideContext.mergeObjects(os, detail);
            });
        };
        translationControlEventSource.on("LanguageChange", changeHandler);
        translationControlEventSource.on("TranslationLoaded", loadHandler);
        return function () {
            translationControlEventSource.off("LanguageChange", changeHandler);
            translationControlEventSource.off("TranslationLoaded", loadHandler);
        };
    });
    var translateFunc = React.useCallback(
        function (key) {
            if (userTranslationFunc !== undefined) {
                return userTranslationFunc(key);
            }
            if (currentLanguage !== undefined) {
                var res = translationStore[currentLanguage] && translationStore[currentLanguage][key];
                var fallback = translationStore[defaultLanguage] && translationStore[defaultLanguage][key];
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
        genericComponentOverrideContext.__assign({ value: { translate: translateFunc } }, { children: children })
    );
};

exports.TranslationContextProvider = TranslationContextProvider;
exports.useTranslation = useTranslation;
