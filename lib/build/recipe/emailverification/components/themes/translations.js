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
exports.defaultTranslationsEmailVerification = void 0;
var translations_1 = require("../../../../translation/translations");
exports.defaultTranslationsEmailVerification = {
    en: __assign(__assign({}, translations_1.defaultTranslationsCommon.en), {
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
        EMAIL_VERIFICATION_LINK_CLICKED_HEADER: "Verify your email address",
        EMAIL_VERIFICATION_LINK_CLICKED_DESC: "Please click on the button below to verify your email address",
        EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON: "CONTINUE",
    }),
};
