"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTranslationsThirdPartyPasswordless = void 0;
var tslib_1 = require("tslib");
var translations_1 = require("../../../passwordless/components/themes/translations");
var translations_2 = require("../../../thirdparty/components/themes/translations");
exports.defaultTranslationsThirdPartyPasswordless = {
    en: tslib_1.__assign(
        tslib_1.__assign(
            tslib_1.__assign({}, translations_2.defaultTranslationsThirdParty.en),
            translations_1.defaultTranslationsPasswordless.en
        ),
        {
            THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up or Log In",
            THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_DIVIDER_OR: "or",
        }
    ),
};
