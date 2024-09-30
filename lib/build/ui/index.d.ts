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
    }>;
    static AuthPageComponentList: React.ComponentType<AuthPageThemeProps>;
    static AuthRecipeComponentsOverrideContextProvider: React.FC<
        React.PropsWithChildren<{
            components: import("../recipe/authRecipe/types").ComponentOverrideMap;
        }>
    >;
}
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
