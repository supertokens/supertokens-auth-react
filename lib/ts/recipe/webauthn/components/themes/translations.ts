import { defaultTranslationsCommon } from "../../../../translation/translations";

export const defaultTranslationsWebauthn = {
    en: {
        ...defaultTranslationsCommon.en,
        WEBAUTHN_EMAIL_CONTINUE_BUTTON: "CONTINUE",
        WEBAUTHN_SIGN_UP_LABEL: "Email",
        WEBAUTHN_RECOVER_ACCOUNT_LABEL: "Recover Account",
        WEBAUTHN_CONTINUE_WITHOUT_PASSKEY_BUTTON: "Continue without passkey",
        WEBAUTHN_CREATE_A_PASSKEY_HEADER: "Create a passkey",
        // WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT: "Continue with",
        WEBAUTHN_COMBO_CONTINUE_WITH_PASSKEY_BUTTON: "CONTINUE WITH PASSKEY",
    },
};
