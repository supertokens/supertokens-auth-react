import { defaultTranslationsCommon } from "../../../../translation/translations";

export const defaultTranslationsMultiFactorAuth = {
    en: {
        ...defaultTranslationsCommon.en,
        MULTI_FACTOR_CHOOSER_HEADER_TITLE: "Please select a second factor",
        MULTI_FACTOR_AUTH_LOGOUT: "Logout",

        MFA_NO_AVAILABLE_OPTIONS: "You have no available secondary factors.",
        MFA_NO_AVAILABLE_OPTIONS_LOGIN:
            "You have no available secondary factors and cannot complete the sign-in process. Please contact support.",
    },
};
