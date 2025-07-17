import { defaultTranslationsCommon } from "../../../../translation/translations";

export const defaultTranslationsWebauthn = {
    en: {
        ...defaultTranslationsCommon.en,
        WEBAUTHN_EMAIL_CONTINUE_BUTTON: "CONTINUE",
        WEBAUTHN_SIGN_UP_LABEL: "Email",
        WEBAUTHN_RECOVER_ACCOUNT_LABEL: "Recover Account",
        WEBAUTHN_RECOVER_ACCOUNT_SUBHEADER_LABEL: "We will send you an email to recover your account.",
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
        WEBAUTHN_PASSKEY_INVALID_CREDENTIALS_ERROR:
            "The passkey is invalid, please try again, possibly with a different device.",
        WEBAUTHN_ERROR_GO_BACK_BUTTON_LABEL: "Go back",
        WEBAUTHN_UNRECOVERABLE_ERROR: "Something went wrong",
        WEBAUTHN_UNRECOVERABLE_ERROR_DETAILS: "Something went wrong with your current session. please try again.",
        WEBAUTHN_EMAIL_SENT_LABEL: "Email sent",
        WEBAUTHN_EMAIL_SENT_LABEL_PRE_EMAIL: "Account recovery email has been sent to ",
        WEBAUTHN_EMAIL_SENT_LABEL_POST_EMAIL: ", if it exists in our system.",
        WEBAUTHN_RESEND_OR_CHANGE_EMAIL_LABEL: "Resend or change email",
        WEBAUTHN_ACCOUNT_RECOVERY_NOT_ALLOWED_LABEL: "Account Recovery is not allowed, please contact support.",
        WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR:
            "Something went wrong while trying to send recover account token, please try again.",
        WEBAUTHN_ACCOUNT_RECOVERY_SUCCESSFUL_LABEL: "Account recovered successfully!",
        WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR:
            "The token used for recovering the account is invalid. Please try with a different token or request a new one.",
        WEBAUTHN_ACCOUNT_RECOVERY_INVALID_EMAIL_ERROR:
            "The email used is invalid. Please try with a different email ID or reach out to support.",
        WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR: "Failed to recover account, please try again.",
        WEBAUTHN_ACCOUNT_RECOVERY_FETCH_ERROR: "Something went wrong, please refresh the page or reach out to support.",
        WEBAUTHN_SIGN_UP_CAUTION_MESSAGE_LABEL:
            "Make sure your email is correct—we’ll use it to help you recover your account.",
        WEBAUTHN_ACCOUNT_RECOVERY_INVALID_CREDENTIALS_ERROR:
            "The passkey is invalid, please try again, possibly with a different device.",
        WEBAUTHN_ACCOUNT_RECOVERY_GENERATED_OPTIONS_NOT_FOUND_ERROR: "Failed to recover account, please try again.",
        WEBAUTHN_ACCOUNT_RECOVERY_INVALID_AUTHENTICATOR_ERROR: "Invalid authenticator, please try again.",
        WEBAUTHN_EMAIL_ALREADY_EXISTS_ERROR: "Email already exists, please sign in instead.",
        WEBAUTHN_NOT_SUPPORTED_ERROR: "Passkey is not supported on your browser, please try with a different browser.",
        WEBAUTHN_PASSKEY_NOT_SUPPORTED_BY_BROWSER:
            "Your browser does not support passkey flow, please try in a different browser.",
        WEBAUTHN_EMAIL_INPUT_NOT_POPULATED_ERROR: "Please enter your email to continue.",

        // WebAuthn MFA translations
        WEBAUTHN_MFA_SIGN_IN_HEADER_TITLE: "Use a Passkey",
        WEBAUTHN_MFA_SIGN_IN_HEADER_SUBTITLE:
            "To finish signing in, click the button and follow the instructions from your browser.",
        WEBAUTHN_MFA_DIVIDER: "or",
        WEBAUTHN_MFA_REGISTER_PASSKEY_SUBTITLE: "Set up a new authentication method to use for future logins.",
        WEBAUTHN_MFA_REGISTER_PASSKEY_LINK: "Register a passkey",
    },
};
