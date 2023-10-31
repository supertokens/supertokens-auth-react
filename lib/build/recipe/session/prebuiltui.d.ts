import { RecipeRouter } from "../recipeRouter";
import { AccessDeniedScreenTheme } from "./components/themes/accessDeniedScreenTheme";
import Session from "./recipe";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import type { PropsWithChildren, ReactElement } from "react";
export declare class SessionPreBuiltUI extends RecipeRouter {
    readonly recipeInstance: Session;
    static instance?: SessionPreBuiltUI;
    constructor(recipeInstance: Session);
    static getInstanceOrInitAndGetInstance(): SessionPreBuiltUI;
    static getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "accessDenied",
        props: FeatureBaseProps & {
            error?: string;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
    getFeatures: (_useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "accessDenied",
        props: FeatureBaseProps & {
            useShadowDom?: boolean;
            error?: string;
            userContext?: any;
        },
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    static reset(): void;
    static AccessDeniedScreen: (
        prop?: PropsWithChildren<{
            useShadowDom?: boolean;
            error?: string;
            userContext?: any;
        }>
    ) => ReactElement;
    static AccessDeniedScreenTheme: import("react").FC<import("./types").AccessDeniedThemeProps>;
}
declare const AccessDeniedScreen: (
    prop?: PropsWithChildren<{
        useShadowDom?: boolean;
        error?: string;
        userContext?: any;
    }>
) => ReactElement;
export { AccessDeniedScreen, AccessDeniedScreenTheme };
