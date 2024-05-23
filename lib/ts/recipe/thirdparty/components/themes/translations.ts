import { defaultTranslationsCommon } from "../../../../translation/translations";

export const defaultTranslationsThirdParty = {
    en: {
        ...defaultTranslationsCommon.en,

        THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "Continue with ",
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",

        THIRD_PARTY_ERROR_NO_EMAIL: "Could not retrieve email. Please try a different method.",

        /*
         * The following are error messages from our backend SDK.
         * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
         * They are shown as is by default (setting the value to undefined will display the raw translation key)
         */

        "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_004)":
            undefined,
        "Cannot sign in / up because new email cannot be applied to existing account. Please contact support. (ERR_CODE_005)":
            undefined,

        "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_006)":
            undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_020)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_021)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_022)": undefined,
        "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_023)": undefined,
    },
};
