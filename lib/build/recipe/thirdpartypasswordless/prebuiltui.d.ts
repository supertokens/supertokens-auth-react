import { RecipeRouter } from "../recipeRouter";
import SignInUpTheme from "./components/themes/signInUp";
import ThirdPartyPasswordless from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";
export declare class ThirdPartyPasswordlessPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: ThirdPartyPasswordless;
    static instance?: ThirdPartyPasswordlessPreBuiltUI;
    private thirdPartyPreBuiltUI;
    private passwordlessPreBuiltUI;
    constructor(recipeInstance: ThirdPartyPasswordless);
    static getInstanceOrInitAndGetInstance(): ThirdPartyPasswordlessPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatureComponent: (
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    static reset(): void;
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
declare const SignInAndUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        userContext?: any;
    }>
) => JSX.Element;
declare const ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
declare const PasswordlessLinkClicked: (prop?: any) => JSX.Element;
export { SignInAndUp, ThirdPartySignInAndUpCallback, PasswordlessLinkClicked, SignInUpTheme };
