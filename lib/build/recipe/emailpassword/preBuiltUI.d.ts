import { RecipeRouter } from "../recipeRouter";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import EmailPassword from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";
export declare class EmailPasswordPreBuiltUI extends RecipeRouter {
    private readonly recipeInstance;
    private constructor();
    static instance: EmailPasswordPreBuiltUI;
    static getInstanceOrInitAndGetInstance(recipeInstance?: EmailPassword): EmailPasswordPreBuiltUI;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getFeatures(recipeInstance?: EmailPassword): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signinup" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ): JSX.Element;
    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[];
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static SignInAndUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }>
    ) => JSX.Element;
    static ResetPasswordUsingToken: (prop?: any) => JSX.Element;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
}
