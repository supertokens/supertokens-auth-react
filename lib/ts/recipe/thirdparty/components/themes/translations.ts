import { defaultTranslationsCommon } from "../../../../translation/translations";

export const defaultTranslationsThirdParty = {
    en: {
        ...defaultTranslationsCommon.en,

        THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up / Sign In",

        THIRD_PARTY_SIGN_IN_UP_FOOTER_START: "By continuing, you agree to our ",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS: "Terms of Service",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_AND: " and ",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_PP: "Privacy Policy",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_END: "",
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: "Continue with ",
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: "",

        THIRD_PARTY_ERROR_NO_EMAIL: "Could not retrieve email. Please try a different method.",
        EMAIL_ALREADY_USED_IN_ANOTHER_ACCOUNT:
            "Cannot sign in / up due to security reasons. Please contact support. (EMAIL_ALREADY_USED_IN_ANOTHER_ACCOUNT)",

        /*
         * The following are error messages from our backend SDK.
         * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
         * They are shown as is by default (setting the value to undefined will display the raw translation key)
         */
        "Cannot sign in / up due to security reasons. Please contact support. (IS_SIGN_IN_ALLOWED_FALSE)": undefined,
        "Cannot sign in / up because new email cannot be applied to existing account. Please contact support. (ANOTHER_PRIM_USER_HAS_EMAIL)":
            undefined,
    },
};
