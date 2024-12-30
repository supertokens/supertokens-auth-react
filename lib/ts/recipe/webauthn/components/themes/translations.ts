import { defaultTranslationsCommon } from "../../../../translation/translations";

export const defaultTranslationsWebauthn = {
    en: {
        ...defaultTranslationsCommon.en,
        WEBAUTHN_EMAIL_CONTINUE_BUTTON: "CONTINUE",
        WEBAUTHN_SIGN_UP_LABEL: "Email",
        WEBAUTHN_RECOVER_ACCOUNT_LABEL: "Recover Account",
        WEBAUTHN_CONTINUE_WITHOUT_PASSKEY_BUTTON: "Continue without passkey",
        WEBAUTHN_CREATE_A_PASSKEY_HEADER: "Create a passkey",
        WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT: "Continue with",
        WEBAUTHN_COMBO_CONTINUE_WITH_PASSKEY_BUTTON: "CONTINUE WITH PASSKEY",
        WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD: "No need to remember password",
        WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD_DETAIL:
            "With passkey, you can use things like your face or fingerprint to login.",
        WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES: "Works on all devices",
        WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES_DETAIL:
            "Passkey will automatically be available across all your synced devices.",
        WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER: "Keep your account safer",
        WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER_DETAIL: "Passkey offer state of the art phishing resistance.",
        WEBAUTHN_PASSKEY_RECOVERABLE_ERROR:
            "The request either timed out, was canceled or the device is already registered. Please try again or try using another device.",
        WEBAUTHN_ERROR_GO_BACK_BUTTON_LABEL: "Go back",
        WEBAUTHN_UNRECOVERABLE_ERROR: "Something went wrong",
        WEBAUTHN_UNRECOVERABLE_ERROR_DETAILS: "something went wrong with your current session. please try again.",
    },
};
