/// <reference types="react" />
import { RecipeRouter } from "../recipeRouter";
import { AccessDeniedScreenTheme } from "./components/themes/accessDeniedScreenTheme";
import Session from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps, UserContext } from "../../types";
export declare class SessionPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: Session;
    static instance?: SessionPreBuiltUI;
    constructor(recipeInstance: Session);
    static getInstanceOrInitAndGetInstance(): SessionPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "accessDenied",
        props: FeatureBaseProps<{
            redirectOnSessionExists?: boolean;
            error?: string;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (_useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "accessDenied",
        props: FeatureBaseProps<{
            useShadowDom?: boolean;
            error?: string;
            userContext?: UserContext;
        }>,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static AccessDeniedScreen: (
        prop?: FeatureBaseProps<{
            useShadowDom?: boolean;
            error?: string;
            userContext?: UserContext;
        }>
    ) => React.ReactElement;
    static AccessDeniedScreenTheme: import("react").FC<import("./types").AccessDeniedThemeProps>;
}
declare const AccessDeniedScreen: (
    prop?: FeatureBaseProps<{
        useShadowDom?: boolean;
        error?: string;
        userContext?: UserContext;
    }>
) => React.ReactElement;
export { AccessDeniedScreen, AccessDeniedScreenTheme };
