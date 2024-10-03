/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import { AccessDeniedScreenTheme } from "./components/themes/accessDeniedScreenTheme";
import Session from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
import type { AuthComponent } from "../../types";
export declare class SessionPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: Session;
    static instance?: SessionPreBuiltUI;
    languageTranslations: {
        en: {
            ACCESS_DENIED: string;
            GO_BACK: string;
            LOGOUT: string;
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
    constructor(recipeInstance: Session);
    static getInstanceOrInitAndGetInstance(): SessionPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "accessDenied",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            error?: string;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getAuthComponents(): AuthComponent[];
    getFeatures: (_useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "accessDenied",
        props: FeatureBaseProps<{
            useShadowDom?: boolean;
            error?: string;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static AccessDeniedScreen: (
        prop?: FeatureBaseProps<{
            useShadowDom?: boolean;
            error?: string;
            userContext?: UserContext;
        }>
    ) => React.ReactElement;
    static AccessDeniedScreenTheme: import("react").FC<import("./types").AccessDeniedThemeProps>;
}
declare const AccessDeniedScreen: (
    prop?: FeatureBaseProps<{
        useShadowDom?: boolean;
        error?: string;
        userContext?: UserContext;
    }>
) => React.ReactElement;
export { AccessDeniedScreen, AccessDeniedScreenTheme };
