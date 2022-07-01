"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTranslationsThirdPartyEmailPassword = void 0;
var translations_1 = require("../../../emailpassword/components/themes/translations");
var translations_2 = require("../../../thirdparty/components/themes/translations");
exports.defaultTranslationsThirdPartyEmailPassword = {
    en: __assign(
        __assign(
            __assign({}, translations_2.defaultTranslationsThirdParty.en),
            translations_1.defaultTranslationsEmailPassword.en
        ),
        { THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR: "or" }
    ),
};
