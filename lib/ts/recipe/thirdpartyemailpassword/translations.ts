import { defaultTranslationsEmailPassword } from "../emailpassword/translations";
import { defaultTranslationsThirdParty } from "../thirdparty/translations";

export const defaultTranslationsThirdPartyEmailPassword = {
    en: {
        ...defaultTranslationsThirdParty.en,
        ...defaultTranslationsEmailPassword.en,

        THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up or Log In",
        THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR: "or",
    },
};
