import { RecipeRouter } from "../recipeRouter";
import ThirdParty from "./recipe";
import type { NormalisedConfig } from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren } from "react";
export declare class ThirdPartyPreBuiltUI extends RecipeRouter {
    private readonly recipeInstance;
    constructor(recipeInstance: ThirdParty);
    static instance: ThirdPartyPreBuiltUI;
    static getInstanceOrInitAndGetInstance(recipeInstance?: ThirdParty): ThirdPartyPreBuiltUI;
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
    static getReactRouterDomRoutes(reactRouterDom: any): JSX.Element[];
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback",
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
    static SignInAndUpCallback: (prop?: any) => JSX.Element;
    static SignInAndUpTheme: import("react").FC<import("./types").SignInAndUpThemeProps>;
    static SignInAndUpCallbackTheme: (props: { config: NormalisedConfig }) => JSX.Element;
}
