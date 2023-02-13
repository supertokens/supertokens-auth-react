import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import ThirdPartyEmailPassword from "./recipe";
import { RecipeRoutes } from "../recipeRoutes";
import { PropsWithChildren } from "react";
import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";
import SignInAndUpTheme from "./components/themes/signInAndUp";
export declare class ThirdPartyEmailPasswordPreBuiltUIRoutes extends RecipeRoutes {
    private readonly recipeInstance;
    constructor(recipeInstance: ThirdPartyEmailPassword);
    static instance: ThirdPartyEmailPasswordPreBuiltUIRoutes;
    static init(recipeInstance: ThirdPartyEmailPassword): void;
    static getInstanceOrInitAndGetInstance(): ThirdPartyEmailPasswordPreBuiltUIRoutes;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getFeatures(): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ): JSX.Element;
    static getRoutes(reactRouterDom: any): JSX.Element[];
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    static ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
    static ResetPasswordUsingToken: (prop?: any) => JSX.Element;
    static SignInAndUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }>
    ) => JSX.Element;
    static ThirdPartySignInAndUpCallbackTheme: (props: {
        config: import("../thirdparty/types").NormalisedConfig;
    }) => JSX.Element;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
}
