import { RecipeRoutes } from "../recipeRoutes";
import ThirdParty from "./recipe";
import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import { NormalisedConfig } from "./types";
import { PropsWithChildren } from "react";
export declare class ThirdPartyPreBuiltUIRoutes extends RecipeRoutes {
    private readonly recipeInstance;
    constructor(recipeInstance: ThirdParty);
    static instance: ThirdPartyPreBuiltUIRoutes;
    static init(recipeInstance: ThirdParty): void;
    static getInstanceOrInitAndGetInstance(recipeInstance?: ThirdParty): ThirdPartyPreBuiltUIRoutes;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getFeatures(recipeInstance?: ThirdParty): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signinup" | "signinupcallback",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ): JSX.Element;
    static getRoutes(reactRouterDom: any): JSX.Element[];
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback",
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
    static SignInAndUpCallback: (prop?: any) => JSX.Element;
    static SignInAndUpTheme: import("react").FC<import("./types").SignInAndUpThemeProps>;
    static SignInAndUpCallbackTheme: (props: { config: NormalisedConfig }) => JSX.Element;
}
