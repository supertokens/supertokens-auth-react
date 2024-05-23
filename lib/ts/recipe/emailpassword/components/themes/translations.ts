import { defaultTranslationsCommon } from "../../../../translation/translations";
import { defaultTranslationsEmailVerification } from "../../../emailverification/components/themes/translations";

export const defaultTranslationsEmailPassword = {
    en: {
        ...defaultTranslationsCommon.en,
        ...defaultTranslationsEmailVerification.en,

        EMAIL_PASSWORD_EMAIL_LABEL: "Email",
        EMAIL_PASSWORD_EMAIL_PLACEHOLDER: "Email address",

        EMAIL_PASSWORD_PASSWORD_LABEL: "Password",
        EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: "Password",

        EMAIL_PASSWORD_SIGN_IN_FORGOT_PW_LINK: "Forgot password?",
        EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: "SIGN IN",
        EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR: "Incorrect email and password combination",

        EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: "SIGN UP",

        EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: "This email already exists. Please sign in instead",

        EMAIL_PASSWORD_RESET_HEADER_TITLE: "Reset your password",
        EMAIL_PASSWORD_RESET_HEADER_SUBTITLE: "We will send you an email to reset your password",
        EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL: "your account",
        EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL: "A password reset email has been sent to ",
        EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL: ", if it exists in our system. ",
        EMAIL_PASSWORD_RESET_RESEND_LINK: "Resend or change email",
        EMAIL_PASSWORD_RESET_SEND_BTN: "Email me",
        EMAIL_PASSWORD_RESET_SIGN_IN_LINK: "Sign In",

        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: "Success!",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC: "Your password has been updated successfully",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: "SIGN IN",

        EMAIL_PASSWORD_NEW_PASSWORD_LABEL: "New password",
        EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: "New password",
        EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: "Confirm password",
        EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: "Confirm your password",

        EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: "Change your password",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE: "Enter a new password below to change your password",
        EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: "CHANGE PASSWORD",
        EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR: "Invalid password reset token",

        ERROR_EMAIL_NON_STRING: "Email must be of type string",
        ERROR_EMAIL_INVALID: "Email is invalid",

        ERROR_PASSWORD_NON_STRING: "Password must be of type string",
        ERROR_PASSWORD_TOO_SHORT: "Password must contain at least 8 characters, including a number",
        ERROR_PASSWORD_TOO_LONG: "Password's length must be lesser than 100 characters",
        ERROR_PASSWORD_NO_ALPHA: "Password must contain at least one alphabet",
        ERROR_PASSWORD_NO_NUM: "Password must contain at least one number",
        ERROR_CONFIRM_PASSWORD_NO_MATCH: "Confirmation password doesn't match",

        ERROR_NON_OPTIONAL: "Field is not optional",

        /*
         * The following are error messages from our backend SDK.
         * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
         * They are shown as is by default (setting the value to undefined will display the raw translation key)
         */
        "This email already exists. Please sign in instead.": undefined,
        "Field is not optional": undefined,
        "Password must contain at least 8 characters, including a number": undefined,
        "Password's length must be lesser than 100 characters": undefined,
        "Password must contain at least one alphabet": undefined,
        "Password must contain at least one number": undefined,
        "Email is invalid": undefined,
        "Reset password link was not created because of account take over risk. Please contact support. (ERR_CODE_001)":
            undefined,
        "Cannot sign up due to security reasons. Please try logging in, use a different login method or contact support. (ERR_CODE_007)":
            undefined,
        "Cannot sign in due to security reasons. Please try resetting your password, use a different login method or contact support. (ERR_CODE_008)":
            undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_009)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_010)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_011)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_012)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_013)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_014)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_015)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_016)": undefined,
    },
};
