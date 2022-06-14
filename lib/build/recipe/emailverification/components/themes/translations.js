"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var translations_1 = require("../../../../translation/translations");
exports.defaultTranslationsEmailVerification = {
    en: tslib_1.__assign(tslib_1.__assign({}, translations_1.defaultTranslationsCommon.en), {
        EMAIL_VERIFICATION_RESEND_SUCCESS: "Email resent",
        EMAIL_VERIFICATION_SEND_TITLE: "Verify your email address",
        EMAIL_VERIFICATION_SEND_DESC_START: "",
        EMAIL_VERIFICATION_SEND_DESC_STRONG: "Please click on the link",
        EMAIL_VERIFICATION_SEND_DESC_END: " in the email we just sent you to confirm your email address.",
        EMAIL_VERIFICATION_RESEND_BTN: "Resend Email",
        EMAIL_VERIFICATION_LOGOUT: "Logout ",
        EMAIL_VERIFICATION_SUCCESS: "Email verification successful!",
        EMAIL_VERIFICATION_CONTINUE_BTN: "CONTINUE",
        EMAIL_VERIFICATION_CONTINUE_LINK: "Continue",
        EMAIL_VERIFICATION_EXPIRED: "The email verification link has expired",
        EMAIL_VERIFICATION_ERROR_TITLE: "Something went wrong",
        EMAIL_VERIFICATION_ERROR_DESC: "We encountered an unexpected error. Please contact support for assistance",
    }),
};
