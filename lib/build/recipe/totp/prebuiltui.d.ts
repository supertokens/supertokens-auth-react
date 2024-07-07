/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import MFATOTPTheme from "./components/themes/mfa";
import TOTPRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
import type { AuthComponent } from "../../types";
export declare class TOTPPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: TOTPRecipe;
    static instance?: TOTPPreBuiltUI;
    languageTranslations: {
        en: {
            TOTP_SHOW_SECRET_START: string;
            TOTP_SHOW_SECRET_LINK: string;
            TOTP_SHOW_SECRET_END: string;
            TOTP_CODE_VERIFICATION_HEADER_TITLE: string;
            TOTP_CODE_VERIFICATION_HEADER_SUBTITLE: string;
            TOTP_DEVICE_SETUP_HEADER_TITLE: string;
            TOTP_DEVICE_SETUP_HEADER_SUBTITLE: string;
            TOTP_CODE_INPUT_LABEL: string;
            TOTP_CODE_CONTINUE_BUTTON: string;
            TOTP_BLOCKED_TITLE: string;
            TOTP_BLOCKED_SUBTITLE: string;
            TOTP_MFA_BLOCKED_TIMER_START: string;
            TOTP_MFA_BLOCKED_TIMER_END: string;
            TOTP_MFA_BLOCKED_RETRY: string;
            TOTP_MFA_LOGOUT: string;
            ERROR_TOTP_INVALID_CODE: string;
            ERROR_TOTP_INVALID_CODE_RETRY_START: string;
            ERROR_TOTP_INVALID_CODE_RETRY_END: string;
            ERROR_TOTP_UNKNOWN_DEVICE: string;
            GENERAL_ERROR_TOTP_NON_STRING: string;
            GENERAL_ERROR_TOTP_EMPTY: string;
            GENERAL_ERROR_TOTP_UNDEFINED: string;
            AUTH_PAGE_HEADER_TITLE_SIGN_IN_AND_UP: string;
            AUTH_PAGE_HEADER_TITLE_SIGN_IN: string;
            AUTH_PAGE_HEADER_TITLE_SIGN_UP: string;
            AUTH_PAGE_HEADER_TITLE_SIGN_IN_UP_TO_APP: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_START: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_SIGN_UP_LINK: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_END: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_START: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_SIGN_IN_LINK: string;
            AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_END: string;
            AUTH_PAGE_FOOTER_START: string;
            AUTH_PAGE_FOOTER_TOS: string;
            AUTH_PAGE_FOOTER_AND: string;
            AUTH_PAGE_FOOTER_PP: string;
            AUTH_PAGE_FOOTER_END: string;
            DIVIDER_OR: string;
            BRANDING_POWERED_BY_START: string;
            BRANDING_POWERED_BY_END: string;
            SOMETHING_WENT_WRONG_ERROR: string;
            SOMETHING_WENT_WRONG_ERROR_RELOAD: string;
        };
    };
    constructor(recipeInstance: TOTPRecipe);
    static getInstanceOrInitAndGetInstance(): TOTPPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "mfaTOTP",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        _: "mfaTOTP",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    static reset(): void;
    static MFATOTP: (
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static MFATOTPTheme: typeof MFATOTPTheme;
}
declare const MFATOTP: (
    props: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { MFATOTP, MFATOTPTheme };
