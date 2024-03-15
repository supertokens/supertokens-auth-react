/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import ThirdParty from "./recipe";
import type { NormalisedConfig } from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
export declare class ThirdPartyPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: ThirdParty;
    static instance?: ThirdPartyPreBuiltUI;
    constructor(recipeInstance: ThirdParty);
    static getInstanceOrInitAndGetInstance(): ThirdPartyPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signinup" | "signinupcallback",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static SignInAndUp: (
        prop?: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static SignInAndUpCallback: (
        prop: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static SignInAndUpTheme: import("react").FC<
        import("./types").SignInAndUpThemeProps & {
            userContext?: UserContext | undefined;
        }
    >;
    static SignInAndUpCallbackTheme: (props: { config: NormalisedConfig }) => import("react/jsx-runtime").JSX.Element;
}
declare const SignInAndUp: (
    prop?: FeatureBaseProps<{
        redirectOnSessionExists?: boolean;
        userContext?: UserContext;
    }>
) => JSX.Element;
declare const SignInAndUpCallback: (
    prop: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { SignInAndUp, SignInAndUpCallback, SignInAndUpCallbackTheme, SignInAndUpTheme };
