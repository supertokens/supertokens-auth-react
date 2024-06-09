/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import { ResumePageSpinner } from "./components/themes/resumePageSpinner";
import OAuth2 from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
import type { AuthComponent } from "../../types";
export declare class OAuth2PreBuiltUI extends RecipeRouter {
    readonly recipeInstance: OAuth2;
    static instance?: OAuth2PreBuiltUI;
    languageTranslations: {
        en: {
            AUTH_PAGE_HEADER_TITLE_SIGN_IN_AND_UP: string;
            AUTH_PAGE_HEADER_TITLE_SIGN_IN: string;
            AUTH_PAGE_HEADER_TITLE_SIGN_UP: string;
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
    constructor(recipeInstance: OAuth2);
    static getInstanceOrInitAndGetInstance(): OAuth2PreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: never,
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (_useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        _componentName: never,
        _props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        _useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    static reset(): void;
    static ResumePageSpinnerTheme: (props: {
        config: import("./types").NormalisedConfig;
    }) => import("react/jsx-runtime").JSX.Element;
}
export { ResumePageSpinner as ResumePageSpinnerTheme };
