"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var translationHelpers_1 = require("./translationHelpers");
var utils_1 = require("../utils");
var errCB = function () {
    throw new Error("Cannot use translation func outside TranslationContext provider.");
};
exports.TranslationContext = react_1.default.createContext({
    translate: errCB,
});
exports.useTranslation = function () {
    return react_1.useContext(exports.TranslationContext).translate;
};
exports.TranslationContextProvider = function (_a) {
    var children = _a.children,
        defaultLanguage = _a.defaultLanguage,
        userTranslationFunc = _a.userTranslationFunc,
        defaultStore = _a.defaultStore,
        translationControlEventSource = _a.translationControlEventSource;
    var _b = react_1.useState(defaultStore),
        translationStore = _b[0],
        setTranslationStore = _b[1];
    var cookieLang = translationHelpers_1.getCurrentLanguageFromCookie();
    var _c = react_1.useState(cookieLang === null ? defaultLanguage : cookieLang),
        currentLanguage = _c[0],
        setCurrentLanguage = _c[1];
    var translateFunc = react_1.useCallback(
        function (key) {
            if (userTranslationFunc !== undefined) {
                return userTranslationFunc(key);
            }
            var res = translationStore[currentLanguage] && translationStore[currentLanguage][key];
            var fallback = translationStore[defaultLanguage] && translationStore[defaultLanguage][key];
            if (res === undefined) {
                if (fallback !== undefined) {
                    return fallback;
                }
                return key;
            }
            return res;
        },
        [translationStore, currentLanguage, defaultLanguage, userTranslationFunc]
    );
    react_1.useEffect(function () {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var changeHandler = function (_eventName, detail) {
            setCurrentLanguage(detail);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var loadHandler = function (_eventName, detail) {
            setTranslationStore(function (os) {
                return utils_1.mergeObjects(os, detail);
            });
        };
        translationControlEventSource.on("LanguageChange", changeHandler);
        translationControlEventSource.on("TranslationLoaded", loadHandler);
        return function () {
            translationControlEventSource.off("LanguageChange", changeHandler);
            translationControlEventSource.off("TranslationLoaded", loadHandler);
        };
    });
    return react_1.default.createElement(
        exports.TranslationContext.Provider,
        { value: { translate: translateFunc } },
        children
    );
};
