import { RecipeFeatureComponentMap, FeatureBaseProps } from "../../types";
import Passwordless from "./recipe";
import { RecipeRoutes } from "../recipeRoutes";
import { PropsWithChildren } from "react";
import SignInUpTheme from "./components/themes/signInUp";
export declare class PasswordlessPreBuiltUIRoutes extends RecipeRoutes {
    private readonly recipeInstance;
    constructor(recipeInstance: Passwordless);
    static instance: PasswordlessPreBuiltUIRoutes;
    static init(recipeInstance: Passwordless): void;
    static getInstanceOrInitAndGetInstance(recipeInstance?: Passwordless): PasswordlessPreBuiltUIRoutes;
    static canHandleRoute(): boolean;
    static getRoutingComponent(): JSX.Element | null;
    static getFeatures(recipeInstance?: Passwordless): RecipeFeatureComponentMap;
    static getFeatureComponent(
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ): JSX.Element;
    static getRoutes(reactRouterDom: any): JSX.Element[];
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signInUp" | "linkClickedScreen",
        props: FeatureBaseProps & {
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }
    ) => JSX.Element;
    static SignInUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }>
    ) => JSX.Element;
    static LinkClicked: (prop?: any) => JSX.Element;
    static SignInUpTheme: typeof SignInUpTheme;
}
