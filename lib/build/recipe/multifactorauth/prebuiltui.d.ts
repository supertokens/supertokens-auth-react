/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import FactorChooserThemeWrapper from "./components/themes/factorChooser";
import MultiFactorAuthRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
import type { AuthComponent } from "../../types";
export declare class MultiFactorAuthPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: MultiFactorAuthRecipe;
    static instance?: MultiFactorAuthPreBuiltUI;
    languageTranslations: {
        en: {
            MULTI_FACTOR_CHOOSER_HEADER_TITLE: string;
            MULTI_FACTOR_AUTH_LOGOUT: string;
            PWLESS_MFA_OTP_PHONE_NAME: string;
            PWLESS_MFA_OTP_PHONE_DESCRIPTION: string;
            PWLESS_MFA_OTP_EMAIL_NAME: string;
            PWLESS_MFA_OTP_EMAIL_DESCRIPTION: string;
            TOTP_MFA_NAME: string;
            TOTP_MFA_DESCRIPTION: string;
            MFA_NO_AVAILABLE_OPTIONS: string;
            MFA_NO_AVAILABLE_OPTIONS_LOGIN: string;
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
    constructor(recipeInstance: MultiFactorAuthRecipe);
    static getInstanceOrInitAndGetInstance(): MultiFactorAuthPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "factorchooser",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        _: "factorchooser",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    static reset(): void;
    static FactorChooser: (
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static FactorChooserTheme: typeof FactorChooserThemeWrapper;
}
declare const FactorChooser: (
    props: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { FactorChooser, FactorChooserThemeWrapper as FactorChooserTheme };
