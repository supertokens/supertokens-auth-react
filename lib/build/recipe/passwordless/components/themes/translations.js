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
exports.defaultTranslationsPasswordless = void 0;
var translations_1 = require("../../../../translation/translations");
exports.defaultTranslationsPasswordless = {
    en: __assign(__assign({}, translations_1.defaultTranslationsCommon.en), {
        GENERAL_ERROR_EMAIL_UNDEFINED: "Please set your email",
        GENERAL_ERROR_EMAIL_NON_STRING: "Email must be of type string",
        GENERAL_ERROR_EMAIL_INVALID: "Email is invalid",
        GENERAL_ERROR_PHONE_UNDEFINED: "Please set your phone number",
        GENERAL_ERROR_PHONE_NON_STRING: "Phone number must be of type string",
        GENERAL_ERROR_PHONE_INVALID: "Phone number is invalid",
        GENERAL_ERROR_EMAIL_OR_PHONE_UNDEFINED: "Please set your email or phone number",
        GENERAL_ERROR_EMAIL_OR_PHONE_NON_STRING: "Email or Phone number must be of type string",
        GENERAL_ERROR_EMAIL_OR_PHONE_INVALID: "Email or Phone number is invalid",
        GENERAL_ERROR_OTP_UNDEFINED: "Please fill your OTP",
        GENERAL_ERROR_OTP_INVALID: "Invalid OTP",
        GENERAL_ERROR_OTP_EXPIRED: "Expired OTP.",
        GENERAL_ERROR_OTP_NON_STRING: "OTP must be of type string",
        GENERAL_ERROR_OTP_EMPTY: "OTP cannot be empty",
        ERROR_SIGN_IN_UP_LINK: "Invalid magic link. Please try again.",
        ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW: "Login timed out. Please try again.",
        ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW: "Login unsuccessful. Please try again.",
        PWLESS_CLOSE_TAB_TITLE: "Success!",
        PWLESS_CLOSE_TAB_SUBTITLE_LINE1: "You have been successfully signed in.",
        PWLESS_CLOSE_TAB_SUBTITLE_LINE2: "Please close this tab",
        PWLESS_SIGN_IN_UP_HEADER_TITLE: "Sign Up or Log In",
        PWLESS_SIGN_IN_UP_FOOTER_START: "By continuing, you agree to our ",
        PWLESS_SIGN_IN_UP_FOOTER_TOS: "Terms of Service",
        PWLESS_SIGN_IN_UP_FOOTER_AND: " and ",
        PWLESS_SIGN_IN_UP_FOOTER_PP: "Privacy Policy",
        PWLESS_SIGN_IN_UP_FOOTER_END: "",
        PWLESS_SIGN_IN_UP_EMAIL_LABEL: "Email",
        PWLESS_SIGN_IN_UP_PHONE_LABEL: "Phone Number",
        PWLESS_SIGN_IN_UP_EMAIL_OR_PHONE_LABEL: "Email or Phone number",
        PWLESS_SIGN_IN_UP_CONTINUE_BUTTON: "CONTINUE",
        PWLESS_EMAIL_OR_PHONE_INVALID_INPUT_GUESS_PHONE_ERR: "Please enter a valid phone number with its country code.",
        PWLESS_LINK_SENT_RESEND_SUCCESS: "Link resent",
        PWLESS_LINK_SENT_RESEND_TITLE: "Link sent!",
        PWLESS_LINK_SENT_RESEND_DESC_START_EMAIL: "We sent a link to ",
        PWLESS_LINK_SENT_RESEND_DESC_START_PHONE: "We sent a link to your phone number ",
        PWLESS_LINK_SENT_RESEND_DESC_END_EMAIL: " Click the link to login or sign up",
        PWLESS_LINK_SENT_RESEND_DESC_END_PHONE: "",
        PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL: "Change email",
        PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE: "Change phone number",
        PWLESS_LINK_CLICKED_CONTINUE_HEADER: "Sign Up or Log In",
        PWLESS_LINK_CLICKED_CONTINUE_DESC: "Click the button below to log in on this device",
        PWLESS_LINK_CLICKED_CONTINUE_BUTTON: "CONTINUE",
        PWLESS_RESEND_SUCCESS_EMAIL: "Email resent",
        PWLESS_RESEND_SUCCESS_PHONE: "SMS resent",
        PWLESS_RESEND_BTN_DISABLED_START: "Resend in ",
        PWLESS_RESEND_BTN_DISABLED_END: "",
        PWLESS_RESEND_BTN_EMAIL: "Resend Email",
        PWLESS_RESEND_BTN_PHONE: "Resend SMS",
        PWLESS_USER_INPUT_CODE_HEADER_TITLE: "Enter OTP",
        PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE: "An OTP was sent to you at",
        PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE_LINK: "An OTP and a magic link was sent to you at",
        PWLESS_USER_INPUT_CODE_INPUT_LABEL: "OTP",
        /*
         * The following are error messages from our backend SDK.
         * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
         * They are shown as is by default (setting the value to undefined will display the raw translation key)
         */
        "Failed to generate a one time code. Please try again": undefined,
        "Phone number is invalid": undefined,
        "Email is invalid": undefined,
    }),
};
