import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import EmailPassword from "./recipe";
import { RecipeRouter } from "../recipeRouter";
import { PropsWithChildren } from "react";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
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
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
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