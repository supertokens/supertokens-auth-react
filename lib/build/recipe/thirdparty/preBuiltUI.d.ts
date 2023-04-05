import { RecipeRouter } from "../recipeRouter";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import ThirdParty from "./recipe";
import type { NormalisedConfig } from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";
export declare class ThirdPartyPreBuiltUI extends RecipeRouter {
    private readonly recipeInstance;
    static instance?: ThirdPartyPreBuiltUI;
    constructor(recipeInstance: ThirdParty);
    static getInstanceOrInitAndGetInstance(recipeInstance?: ThirdParty): ThirdPartyPreBuiltUI;
    static getFeatures(
        recipeInstance?: ThirdParty,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signinup" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>,
        recipeInstance?: ThirdParty
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static SignInAndUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }>
    ) => JSX.Element;
    static SignInAndUpCallback: (prop?: any) => JSX.Element;
    static SignInAndUpTheme: import("react").FC<import("./types").SignInAndUpThemeProps>;
    static SignInAndUpCallbackTheme: (props: { config: NormalisedConfig }) => JSX.Element;
}
declare const _getFeatures: typeof ThirdPartyPreBuiltUI.getFeatures;
declare const SignInAndUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        userContext?: any;
    }>
) => JSX.Element;
declare const SignInAndUpCallback: (prop?: any) => JSX.Element;
export { _getFeatures, SignInAndUp, SignInAndUpCallback, SignInAndUpCallbackTheme, SignInAndUpTheme };
