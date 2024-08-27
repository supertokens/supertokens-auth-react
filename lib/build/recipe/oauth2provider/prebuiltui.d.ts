/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import OAuth2ProviderRecipe from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { FeatureBaseProps, RecipeFeatureComponentMap, UserContext } from "../../types";
import type { AuthComponent } from "../../types";
export declare class OAuth2ProviderPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: OAuth2ProviderRecipe;
    static instance?: OAuth2ProviderPreBuiltUI;
    languageTranslations: {
        en: {
            LOGGING_OUT: string;
            LOGOUT_CONFIRMATION: string;
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
    constructor(recipeInstance: OAuth2ProviderRecipe);
    static getInstanceOrInitAndGetInstance(): OAuth2ProviderPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "try-refresh-page" | "oauth2-logout-screen",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "try-refresh-page" | "oauth2-logout-screen",
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    static reset(): void;
    static TryRefreshPage: (
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static OAuth2LogoutScreen: (
        props: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
}
declare const TryRefreshPage: (
    props: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { TryRefreshPage };
