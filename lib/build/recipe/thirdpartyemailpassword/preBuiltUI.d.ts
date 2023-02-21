import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";
import { RecipeRouter } from "../recipeRouter";
import { SignInAndUpCallbackTheme as ThirdPartySignInAndUpCallbackTheme } from "../thirdparty/components/themes/signInAndUpCallback";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ThirdPartyEmailPassword from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";
export declare class ThirdPartyEmailPasswordPreBuiltUI extends RecipeRouter {
    private readonly recipeInstance;
    constructor(recipeInstance: ThirdPartyEmailPassword);
    static instance: ThirdPartyEmailPasswordPreBuiltUI;
    static getInstanceOrInitAndGetInstance(): ThirdPartyEmailPasswordPreBuiltUI;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getFeatures(): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ): JSX.Element;
    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[];
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
    static ResetPasswordUsingToken: (prop?: any) => JSX.Element;
    static SignInAndUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }>
    ) => JSX.Element;
    static ThirdPartySignInAndUpCallbackTheme: (props: {
        config: import("../thirdparty/types").NormalisedConfig;
    }) => JSX.Element;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
}
declare const canHandleRoute: typeof ThirdPartyEmailPasswordPreBuiltUI.canHandleRoute;
declare const getRoutingComponent: typeof ThirdPartyEmailPasswordPreBuiltUI.getRoutingComponent;
declare const getFeatures: typeof ThirdPartyEmailPasswordPreBuiltUI.getFeatures;
declare const getFeatureComponent: typeof ThirdPartyEmailPasswordPreBuiltUI.getFeatureComponent;
declare const getReactRouterDomRoutes: typeof ThirdPartyEmailPasswordPreBuiltUI.getReactRouterDomRoutes;
declare const ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
declare const ResetPasswordUsingToken: (prop?: any) => JSX.Element;
declare const SignInAndUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        userContext?: any;
    }>
) => JSX.Element;
export {
    canHandleRoute,
    getRoutingComponent,
    getFeatures,
    getFeatureComponent,
    getReactRouterDomRoutes,
    ThirdPartySignInAndUpCallback,
    ResetPasswordUsingToken,
    SignInAndUp,
    ThirdPartySignInAndUpCallbackTheme,
    ResetPasswordUsingTokenTheme,
    SignInAndUpTheme,
};
