import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import ThirdPartyPasswordless from "./recipe";
import { RecipeRouter } from "../recipeRouter";
import SignInUpTheme from "./components/themes/signInUp";
import { PropsWithChildren } from "react";
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
        }
    ) => JSX.Element;
    getFeatures: () => RecipeFeatureComponentMap;
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
