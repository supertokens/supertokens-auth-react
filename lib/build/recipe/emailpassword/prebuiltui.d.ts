/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
import SignInTheme from "./components/themes/signIn";
import SignUpTheme from "./components/themes/signUp";
import EmailPassword from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
import type { AuthComponent } from "../../types";
export declare class EmailPasswordPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: EmailPassword;
    static instance?: EmailPasswordPreBuiltUI;
    constructor(recipeInstance: EmailPassword);
    static getInstanceOrInitAndGetInstance(): EmailPasswordPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "resetpassword",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "resetpassword",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    getAuthComponents(): AuthComponent[];
    requiresSignUpPage: boolean;
    static reset(): void;
    static SignInFeature: import("react").FC<
        import("../../types").AuthComponentProps & {
            recipe: EmailPassword;
            userContext: UserContext;
            useComponentOverrides: () => import("./types").ComponentOverrideMap;
        }
    >;
    static SignInTheme: typeof SignInTheme;
    static SignUpFeature: import("react").FC<
        import("../../types").AuthComponentProps & {
            recipe: EmailPassword;
            userContext?: UserContext | undefined;
            useComponentOverrides: () => import("./types").ComponentOverrideMap;
        }
    >;
    static SignUpTheme: typeof SignUpTheme;
    static ResetPasswordUsingToken: (
        prop: FeatureBaseProps<{
            userContext?: UserContext;
        }>
    ) => JSX.Element;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
}
declare const ResetPasswordUsingToken: (
    prop: FeatureBaseProps<{
        userContext?: UserContext;
    }>
) => JSX.Element;
export { ResetPasswordUsingToken, ResetPasswordUsingTokenTheme };
