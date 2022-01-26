import { defaultTranslationsCommon } from "../../components/translations";
import { defaultTranslationsEmailVerification } from "../emailverification/translations";

export const defaultTranslationsThirdParty = {
    en: {
        ...defaultTranslationsCommon.en,
        ...defaultTranslationsEmailVerification.en,

        THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: "Sign Up / Sign In",

        THIRD_PARTY_SIGN_IN_UP_FOOTER_START: "By continuing, you agree to our",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS: "Terms of Service",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_AND: "and",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_PP: "Privacy Policy",
        THIRD_PARTY_SIGN_IN_UP_FOOTER_END: "",
    },
};
