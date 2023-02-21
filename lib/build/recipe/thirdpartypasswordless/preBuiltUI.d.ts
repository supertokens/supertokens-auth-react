import { RecipeRouter } from "../recipeRouter";
import SignInUpTheme from "./components/themes/signInUp";
import ThirdPartyPasswordless from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";
export declare class ThirdPartyPasswordlessPreBuiltUI extends RecipeRouter {
    private readonly recipeInstance;
    constructor(recipeInstance: ThirdPartyPasswordless);
    static instance: ThirdPartyPasswordlessPreBuiltUI;
    static getInstanceOrInitAndGetInstance(): ThirdPartyPasswordlessPreBuiltUI;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getFeatures(): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ): JSX.Element;
    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[];
    getFeatureComponent: (
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    static SignInAndUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }>
    ) => JSX.Element;
    static ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
    static SignInUpTheme: typeof SignInUpTheme;
    static PasswordlessLinkClicked: (prop?: any) => JSX.Element;
}
declare const canHandleRoute: typeof ThirdPartyPasswordlessPreBuiltUI.canHandleRoute;
declare const getRoutingComponent: typeof ThirdPartyPasswordlessPreBuiltUI.getRoutingComponent;
declare const getFeatures: typeof ThirdPartyPasswordlessPreBuiltUI.getFeatures;
declare const getFeatureComponent: typeof ThirdPartyPasswordlessPreBuiltUI.getFeatureComponent;
declare const getReactRouterDomRoutes: typeof ThirdPartyPasswordlessPreBuiltUI.getReactRouterDomRoutes;
declare const SignInAndUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        userContext?: any;
    }>
) => JSX.Element;
declare const ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
declare const PasswordlessLinkClicked: (prop?: any) => JSX.Element;
export {
    canHandleRoute,
    getRoutingComponent,
    getFeatures,
    getFeatureComponent,
    getReactRouterDomRoutes,
    SignInAndUp,
    ThirdPartySignInAndUpCallback,
    PasswordlessLinkClicked,
    SignInUpTheme,
};
