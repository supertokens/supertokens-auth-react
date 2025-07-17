import { defaultTranslationsCommon } from "../../../../translation/translations";

export const defaultTranslationsMultiFactorAuth = {
    en: {
        ...defaultTranslationsCommon.en,
        MULTI_FACTOR_CHOOSER_HEADER_TITLE: "Please select a factor",
        MULTI_FACTOR_AUTH_LOGOUT: "Log out",

        PWLESS_MFA_OTP_PHONE_NAME: "SMS based OTP",
        PWLESS_MFA_OTP_PHONE_DESCRIPTION: "Get an OTP code on your phone to complete the authentication request",

        PWLESS_MFA_OTP_EMAIL_NAME: "Email based OTP",
        PWLESS_MFA_OTP_EMAIL_DESCRIPTION:
            "Get an OTP code on your email address to complete the authentication request",

        TOTP_MFA_NAME: "TOTP",
        TOTP_MFA_DESCRIPTION: "Use an authenticator app to complete the authentication request",

        WEBAUTHN_MFA_NAME: "Passkeys",
        WEBAUTHN_MFA_DESCRIPTION: "Use a passkey to complete the authentication request",

        MFA_NO_AVAILABLE_OPTIONS: "You have no available secondary factors.",
        MFA_NO_AVAILABLE_OPTIONS_LOGIN:
            "You have no available secondary factors and cannot complete the sign-in process. Please contact support.",
    },
};
