import { RecipeRouter } from "../recipeRouter";
import SignInUpTheme from "./components/themes/signInUp";
import Passwordless from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";
export declare class PasswordlessPreBuiltUI extends RecipeRouter {
    private readonly recipeInstance;
    constructor(recipeInstance: Passwordless);
    static instance?: PasswordlessPreBuiltUI;
    static getInstanceOrInitAndGetInstance(recipeInstance?: Passwordless): PasswordlessPreBuiltUI;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getFeatures(
        recipeInstance?: Passwordless,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        recipeInstance?: Passwordless
    ): JSX.Element;
    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[];
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static SignInUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }>
    ) => JSX.Element;
    static LinkClicked: (prop?: any) => JSX.Element;
    static SignInUpTheme: typeof SignInUpTheme;
}
declare const canHandleRoute: typeof PasswordlessPreBuiltUI.canHandleRoute;
declare const getRoutingComponent: typeof PasswordlessPreBuiltUI.getRoutingComponent;
declare const _getFeatures: typeof PasswordlessPreBuiltUI.getFeatures;
declare const _getFeatureComponent: typeof PasswordlessPreBuiltUI.getFeatureComponent;
declare const getReactRouterDomRoutes: typeof PasswordlessPreBuiltUI.getReactRouterDomRoutes;
declare const SignInUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        userContext?: any;
    }>
) => JSX.Element;
declare const LinkClicked: (prop?: any) => JSX.Element;
export {
    canHandleRoute,
    getRoutingComponent,
    _getFeatures,
    _getFeatureComponent,
    getReactRouterDomRoutes,
    SignInUp,
    LinkClicked,
    SignInUpTheme,
};
