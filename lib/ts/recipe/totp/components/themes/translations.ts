import { defaultTranslationsCommon } from "../../../../translation/translations";

export const defaultTranslationsTOTP = {
    en: {
        ...defaultTranslationsCommon.en,
        TOTP_SHOW_SECRET_START: "Unable to scan? Use a",
        TOTP_SHOW_SECRET_LINK: "secret key",
        TOTP_SHOW_SECRET_END: "",
        TOTP_CODE_VERIFICATION_HEADER_TITLE: "Enter TOTP",
        TOTP_CODE_VERIFICATION_HEADER_SUBTITLE:
            "Open the two-factor authenticator (TOTP) app on your mobile device to view your authentication code",
        TOTP_DEVICE_SETUP_HEADER_TITLE: "Enable TOTP",
        TOTP_DEVICE_SETUP_HEADER_SUBTITLE:
            "Please scan the given QR code from a phone app like Google Authenticator or Authy.",
        TOTP_CODE_INPUT_LABEL: "Please enter TOTP",
        TOTP_CODE_CONTINUE_BUTTON: "Continue",
        TOTP_BLOCKED_TITLE: "Account locked",
        TOTP_BLOCKED_SUBTITLE: "Account locked due to multiple failed login attempts.",
        TOTP_MFA_BLOCKED_TIMER_START: "",
        TOTP_MFA_BLOCKED_TIMER_END: "",
        TOTP_MFA_BLOCKED_RETRY: "Try again",
        TOTP_MFA_LOGOUT: "Logout",
        TOTP_MFA_FOOTER_CHOOSER_ANOTHER: "Choose another factor",

        TOTP_MFA_NAME: "TOTP",
        TOTP_MFA_DESCRIPTION: "Use an authenticator app to complete the authentication request",

        ERROR_TOTP_INVALID_CODE: "Invalid TOTP. Please try again.",
        ERROR_TOTP_INVALID_CODE_RETRY_START: "",
        // \xA0 is non breaking space.
        // We add it to make sure there is no line break between the number and the rest of the sentence
        ERROR_TOTP_INVALID_CODE_RETRY_END: "\xA0attempt(s) remaining before account is temporarily locked.",
        ERROR_TOTP_UNKNOWN_DEVICE: "The device was deleted before verification",

        GENERAL_ERROR_OTP_UNDEFINED: "Please fill your TOTP",
        TOTP_MFA_NOT_ALLOWED_TO_SETUP: "You are not allowed to set up TOTP.",
    },
};
