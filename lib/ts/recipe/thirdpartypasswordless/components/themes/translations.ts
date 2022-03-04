import { defaultTranslationsPasswordless } from "../../../passwordless/components/themes/translations";
import { defaultTranslationsThirdParty } from "../../../thirdparty/components/themes/translations";

export const defaultTranslationsThirdPartyPasswordless = {
    en: {
        ...defaultTranslationsThirdParty.en,
        ...defaultTranslationsPasswordless.en,

        THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up or Log In",
        THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_DIVIDER_OR: "or",
    },
};
