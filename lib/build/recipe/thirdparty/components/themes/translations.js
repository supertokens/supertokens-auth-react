"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTranslationsThirdParty = void 0;
var tslib_1 = require("tslib");
var translations_1 = require("../../../../translation/translations");
var translations_2 = require("../../../emailverification/components/themes/translations");
exports.defaultTranslationsThirdParty = {
    en: tslib_1.__assign(
        tslib_1.__assign(
            tslib_1.__assign({}, translations_1.defaultTranslationsCommon.en),
            translations_2.defaultTranslationsEmailVerification.en
        ),
        {
            THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up / Sign In",
            THIRD_PARTY_SIGN_IN_UP_FOOTER_START: "By continuing, you agree to our ",
            THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS: "Terms of Service",
            THIRD_PARTY_SIGN_IN_UP_FOOTER_AND: " and ",
            THIRD_PARTY_SIGN_IN_UP_FOOTER_PP: "Privacy Policy",
            THIRD_PARTY_SIGN_IN_UP_FOOTER_END: "",
            THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "Continue with ",
            THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",
            THIRD_PARTY_ERROR_NO_EMAIL: "Could not retrieve email. Please try a different method.",
        }
    ),
};
