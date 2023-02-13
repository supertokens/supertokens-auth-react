import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import ThirdPartyPasswordless from "./recipe";
import { RecipeRoutes } from "../recipeRoutes";
import SignInUpTheme from "./components/themes/signInUp";
import { PropsWithChildren } from "react";
export declare class ThirdPartyPasswordlessPreBuiltUIRoutes extends RecipeRoutes {
    private readonly recipeInstance;
    constructor(recipeInstance: ThirdPartyPasswordless);
    static instance: ThirdPartyPasswordlessPreBuiltUIRoutes;
    static init(recipeInstance: ThirdPartyPasswordless): void;
    static getInstanceOrInitAndGetInstance(): ThirdPartyPasswordlessPreBuiltUIRoutes;
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
    static getRoutes(reactRouterDom: any): JSX.Element[];
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
