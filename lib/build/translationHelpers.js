"use strict";
// type TranslationContext = Record<string, Record<Record<string, string>>>;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var TranslationController = /** @class */ (function () {
    function TranslationController() {
        this.handlers = new Map();
    }
    TranslationController.prototype.emit = function (event, detail) {
        var handlerList = this.handlers.get(event) || [];
        for (var _i = 0, handlerList_1 = handlerList; _i < handlerList_1.length; _i++) {
            var h = handlerList_1[_i];
            h(event, detail);
        }
    };
    TranslationController.prototype.on = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(event, handlerList.concat(handler));
    };
    TranslationController.prototype.off = function (event, handler) {
        var handlerList = this.handlers.get(event) || [];
        this.handlers.set(
            event,
            handlerList.filter(function (h) {
                return h !== handler;
            })
        );
    };
    return TranslationController;
})();
exports.TranslationController = TranslationController;
var CURRENT_LANGUAGE_COOKIE_NAME = "sCurrLanguage";
function saveCurrentLanguage(language, cookieDomain) {
    utils_1.setFrontendCookie(CURRENT_LANGUAGE_COOKIE_NAME, language, cookieDomain);
}
exports.saveCurrentLanguage = saveCurrentLanguage;
function getCurrentLanguageFromCookie() {
    return utils_1.getCookieValue(CURRENT_LANGUAGE_COOKIE_NAME);
}
exports.getCurrentLanguageFromCookie = getCurrentLanguageFromCookie;
