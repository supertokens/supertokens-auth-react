import { defaultTranslationsCommon } from "../../../../translation/translations";

export const defaultTranslationsTOTP = {
    en: {
        ...defaultTranslationsCommon.en,
        TOTP_SHOW_SECRET_START: "Unable to scan? Use a secret key",
        TOTP_SHOW_SECRET_LINK: "secret key",
        TOTP_SHOW_SECRET_END: "",
        TOTP_CODE_VERIFICATION_HEADER_TITLE: "Enter TOTP",
        TOTP_CODE_VERIFICATION_HEADER_SUBTITLE:
            "Open the two-factor authenticator (TOTP) app on your mobile device to view your authentication code",
        TOTP_DEVICE_SETUP_HEADER_TITLE: "Setup an authenticator app",
        TOTP_DEVICE_SETUP_HEADER_SUBTITLE:
            "Please scan the given QR code from a phone app like Google Authenticator or Authy.",
        TOTP_DEVICE_SETUP_FOOTER: "",
        TOTP_CODE_INPUT_LABEL: "Please enter TOTP from the app",
        TOTP_CODE_CONTINUE_BUTTON: "Continue",
        TOTP_REMOVE_DEVICE_LINK: "Choose another factor",
    },
};
