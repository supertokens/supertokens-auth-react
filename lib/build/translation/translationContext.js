"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationContextProvider = exports.useTranslation = exports.TranslationContext = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = tslib_1.__importStar(require("react"));
var translationHelpers_1 = require("./translationHelpers");
var utils_1 = require("../utils");
var errCB = function () {
    throw new Error("Cannot use translation func outside TranslationContext provider.");
};
exports.TranslationContext = react_1.default.createContext({
    translate: errCB,
});
var useTranslation = function () {
    return (0, react_1.useContext)(exports.TranslationContext).translate;
};
exports.useTranslation = useTranslation;
var TranslationContextProvider = function (_a) {
    var children = _a.children,
        defaultLanguage = _a.defaultLanguage,
        userTranslationFunc = _a.userTranslationFunc,
        defaultStore = _a.defaultStore,
        translationControlEventSource = _a.translationControlEventSource;
    var _b = (0, react_1.useState)(defaultStore),
        translationStore = _b[0],
        setTranslationStore = _b[1];
    var _c = (0, react_1.useState)(undefined),
        currentLanguage = _c[0],
        setCurrentLanguage = _c[1];
    (0, react_1.useEffect)(
        function () {
            function loadLanguageFromCookies() {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var cookieLang, cookieLangTemp;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, (0, translationHelpers_1.getCurrentLanguageFromCookie)()];
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
    (0, react_1.useEffect)(function () {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var changeHandler = function (_eventName, detail) {
            setCurrentLanguage(detail);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var loadHandler = function (_eventName, detail) {
            setTranslationStore(function (os) {
                return (0, utils_1.mergeObjects)(os, detail);
            });
        };
        translationControlEventSource.on("LanguageChange", changeHandler);
        translationControlEventSource.on("TranslationLoaded", loadHandler);
        return function () {
            translationControlEventSource.off("LanguageChange", changeHandler);
            translationControlEventSource.off("TranslationLoaded", loadHandler);
        };
    });
    var translateFunc = (0, react_1.useCallback)(
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
    return (0, jsx_runtime_1.jsx)(
        exports.TranslationContext.Provider,
        tslib_1.__assign({ value: { translate: translateFunc } }, { children: children })
    );
};
exports.TranslationContextProvider = TranslationContextProvider;
