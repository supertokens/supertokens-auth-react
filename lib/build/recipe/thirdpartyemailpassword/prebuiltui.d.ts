/// <reference types="react" />
import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";
import { RecipeRouter } from "../recipeRouter";
import { SignInAndUpCallbackTheme as ThirdPartySignInAndUpCallbackTheme } from "../thirdparty/components/themes/signInAndUpCallback";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ThirdPartyEmailPassword from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
export declare class ThirdPartyEmailPasswordPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: ThirdPartyEmailPassword;
    static instance?: ThirdPartyEmailPasswordPreBuiltUI;
    private thirdPartyPreBuiltUI;
    private emailPasswordPreBuiltUI;
    constructor(recipeInstance: ThirdPartyEmailPassword);
    static getInstanceOrInitAndGetInstance(): ThirdPartyEmailPasswordPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static ThirdPartySignInAndUpCallback: (
        prop: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static ResetPasswordUsingToken: (
        prop: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static SignInAndUp: (
        prop?: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static ThirdPartySignInAndUpCallbackTheme: (props: {
        config: import("../thirdparty/types").NormalisedConfig;
    }) => import("react/jsx-runtime").JSX.Element;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
}
declare const ThirdPartySignInAndUpCallback: (
    prop: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
declare const ResetPasswordUsingToken: (
    prop: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
declare const SignInAndUp: (
    prop?: FeatureBaseProps<{
        redirectOnSessionExists?: boolean;
        userContext?: UserContext;
    }>
) => JSX.Element;
export {
    ThirdPartySignInAndUpCallback,
    ResetPasswordUsingToken,
    SignInAndUp,
    ThirdPartySignInAndUpCallbackTheme,
    ResetPasswordUsingTokenTheme,
    SignInAndUpTheme,
};
