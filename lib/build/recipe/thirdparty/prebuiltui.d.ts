/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import ThirdParty from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
import type { AuthComponent } from "../../types";
export declare class ThirdPartyPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: ThirdParty;
    static instance?: ThirdPartyPreBuiltUI;
    languageTranslations: {
        en: {
            THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: string;
            THIRD_PARTY_PROVIDER_DEFAULT_BTN_END: string;
            THIRD_PARTY_ERROR_NO_EMAIL: string;
            "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_004)": undefined;
            "Cannot sign in / up because new email cannot be applied to existing account. Please contact support. (ERR_CODE_005)": undefined;
            "Cannot sign in / up due to security reasons. Please try a different login method or contact support. (ERR_CODE_006)": undefined;
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_020)": undefined;
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_021)": undefined;
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_022)": undefined;
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_023)": undefined;
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
    constructor(recipeInstance: ThirdParty);
    static getInstanceOrInitAndGetInstance(): ThirdPartyPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signinupcallback",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinupcallback",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    static reset(): void;
    static SignInAndUpCallback: (
        prop: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static SignInAndUpCallbackTheme: (props: {
        config: import("./types").NormalisedConfig;
    }) => import("react/jsx-runtime").JSX.Element;
}
declare const SignInAndUpCallback: (
    prop: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { SignInAndUpCallback, SignInAndUpCallbackTheme };
