import { RecipeRouter } from "../recipeRouter";
import MFAOTPTheme from "./components/themes/mfa";
import SignInUpTheme from "./components/themes/signInUp";
import Passwordless from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, Navigate, UserContext } from "../../types";
import type { PropsWithChildren } from "react";
export declare class PasswordlessPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: Passwordless;
    static instance?: PasswordlessPreBuiltUI;
    constructor(recipeInstance: Passwordless);
    static getInstanceOrInitAndGetInstance(): PasswordlessPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen" | "otp-phone" | "otp-email",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signInUp" | "linkClickedScreen" | "otp-phone" | "otp-email",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static SignInUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            navigate?: Navigate;
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static LinkClicked: (
        props: FeatureBaseProps<{
            navigate?: Navigate;
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static MfaOtpPhone: (
        props: FeatureBaseProps<{
            navigate?: Navigate;
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static MfaOtpEmail: (
        props: FeatureBaseProps<{
            navigate?: Navigate;
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static MFAOTPTheme: typeof MFAOTPTheme;
    static SignInUpTheme: typeof SignInUpTheme;
}
declare const SignInUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        navigate?: Navigate;
        userContext?: UserContext;
    }>
) => JSX.Element;
declare const LinkClicked: (
    props: FeatureBaseProps<{
        navigate?: Navigate;
        userContext?: UserContext;
    }>
) => JSX.Element;
declare const MfaOtpPhone: (
    props: FeatureBaseProps<{
        navigate?: Navigate;
        userContext?: UserContext;
    }>
) => JSX.Element;
declare const MfaOtpEmail: (
    props: FeatureBaseProps<{
        navigate?: Navigate;
        userContext?: UserContext;
    }>
) => JSX.Element;
export { SignInUp, LinkClicked, SignInUpTheme, MfaOtpPhone, MfaOtpEmail, MFAOTPTheme };
