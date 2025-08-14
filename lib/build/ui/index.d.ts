import React from "react";
import { AuthRecipeComponentsOverrideContextProvider } from "../recipe/authRecipe/componentOverrideContext";
import { AuthPageTheme } from "../recipe/authRecipe/components/theme/authPage";
import { AuthPageComponentList } from "../recipe/authRecipe/components/theme/authPage/authPageComponentList";
import { AuthPageFooter } from "../recipe/authRecipe/components/theme/authPage/authPageFooter";
import { AuthPageHeader } from "../recipe/authRecipe/components/theme/authPage/authPageHeader";
import type { PreBuiltRecipes, ReactRouterDomWithCustomHistory } from "./types";
import type { AuthPageProps } from "../recipe/authRecipe/components/feature/authPage/authPage";
import type { AuthPageThemeProps } from "../recipe/authRecipe/types";
import type { PropsWithChildren } from "react";
declare class UI {
    private static reactRouterDom;
    private static reactRouterDomIsV6?;
    static languageTranslations: {
        en: {
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
    static getSuperTokensRoutesForReactRouterDom(
        reactRouterDom: any,
        preBuiltUiClassList?: PreBuiltRecipes,
        basePath?: string
    ): JSX.Element[];
    static getReactRouterDomWithCustomHistory: () => ReactRouterDomWithCustomHistory | undefined;
    static canHandleRoute(preBuiltUiClassList: PreBuiltRecipes): boolean;
    static getRoutingComponent(preBuiltUiClassList: PreBuiltRecipes): JSX.Element;
    static AuthPage: (
        props: PropsWithChildren<
            Omit<AuthPageProps, "preBuiltUIList"> & {
                preBuiltUIList: PreBuiltRecipes;
            }
        >
    ) => import("react/jsx-runtime").JSX.Element;
    static AuthPageTheme: typeof AuthPageTheme;
    static AuthPageFooter: React.ComponentType<{
        privacyPolicyLink?: string | undefined;
        termsOfServiceLink?: string | undefined;
        factorIds: string[];
        hasSeparateSignUpView: boolean;
        isSignUp: boolean;
    }>;
    static AuthPageHeader: React.ComponentType<{
        factorIds: string[];
        isSignUp: boolean;
        hasSeparateSignUpView: boolean;
        onSignInUpSwitcherClick: (() => void) | undefined;
        resetFactorList: () => void;
        showBackButton: boolean;
        oauth2ClientInfo?:
            | {
                  logoUri?: string | undefined;
                  clientUri?: string | undefined;
                  clientName: string;
              }
            | undefined;
        headerLabel?: string | undefined;
        hideSignInSwitcher?: boolean | undefined;
    }>;
    static AuthPageComponentList: React.ComponentType<AuthPageThemeProps>;
    static AuthRecipeComponentsOverrideContextProvider: React.FC<
        React.PropsWithChildren<{
            components: import("../recipe/authRecipe/types").ComponentOverrideMap;
        }>
    >;
}
declare const languageTranslations: {
    en: {
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
declare const getSuperTokensRoutesForReactRouterDom: typeof UI.getSuperTokensRoutesForReactRouterDom;
declare const canHandleRoute: typeof UI.canHandleRoute;
declare const getRoutingComponent: typeof UI.getRoutingComponent;
declare const AuthPage: (
    props: PropsWithChildren<
        Omit<AuthPageProps, "preBuiltUIList"> & {
            preBuiltUIList: PreBuiltRecipes;
        }
    >
) => import("react/jsx-runtime").JSX.Element;
export default UI;
export {
    languageTranslations,
    getSuperTokensRoutesForReactRouterDom,
    canHandleRoute,
    getRoutingComponent,
    AuthPage,
    AuthPageTheme,
    AuthPageFooter,
    AuthPageHeader,
    AuthPageComponentList,
    AuthRecipeComponentsOverrideContextProvider,
    AuthPageThemeProps,
};
