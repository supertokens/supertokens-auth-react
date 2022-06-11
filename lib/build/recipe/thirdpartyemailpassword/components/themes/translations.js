"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var translations_1 = require("../../../emailpassword/components/themes/translations");
var translations_2 = require("../../../thirdparty/components/themes/translations");
exports.defaultTranslationsThirdPartyEmailPassword = {
    en: tslib_1.__assign(
        tslib_1.__assign(
            tslib_1.__assign({}, translations_2.defaultTranslationsThirdParty.en),
            translations_1.defaultTranslationsEmailPassword.en
        ),
        { THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR: "or" }
    ),
};
