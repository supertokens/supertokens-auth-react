/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import { EmailVerificationTheme } from "./components/themes/emailVerification";
import EmailVerificationRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
import type { AuthComponent } from "../../types";
export declare class EmailVerificationPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: EmailVerificationRecipe;
    static instance?: EmailVerificationPreBuiltUI;
    languageTranslations: {
        en: {
            EMAIL_VERIFICATION_RESEND_SUCCESS: string;
            EMAIL_VERIFICATION_SEND_TITLE: string;
            EMAIL_VERIFICATION_SEND_DESC_START: string;
            EMAIL_VERIFICATION_SEND_DESC_STRONG: string;
            EMAIL_VERIFICATION_SEND_DESC_END: string;
            EMAIL_VERIFICATION_RESEND_BTN: string;
            EMAIL_VERIFICATION_LOGOUT: string;
            EMAIL_VERIFICATION_SUCCESS: string;
            EMAIL_VERIFICATION_CONTINUE_BTN: string;
            EMAIL_VERIFICATION_CONTINUE_LINK: string;
            EMAIL_VERIFICATION_EXPIRED: string;
            EMAIL_VERIFICATION_ERROR_TITLE: string;
            EMAIL_VERIFICATION_ERROR_DESC: string;
            EMAIL_VERIFICATION_LINK_CLICKED_HEADER: string;
            EMAIL_VERIFICATION_LINK_CLICKED_DESC: string;
            EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON: string;
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
    constructor(recipeInstance: EmailVerificationRecipe);
    static getInstanceOrInitAndGetInstance(): EmailVerificationPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "emailverification",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        _: "emailverification",
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    static reset(): void;
    static EmailVerification: (
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
}
declare const EmailVerification: (
    props: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { EmailVerification, EmailVerificationTheme };
