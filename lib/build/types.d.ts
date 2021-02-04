import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { CSSObject } from "@emotion/react/types/index";
import { ComponentClass } from "react";
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    recipeList: CreateRecipeFunction[];
};
export declare type CreateRecipeFunction = (appInfo: NormalisedAppInfo) => RecipeModule;
export declare type AppInfoUserInput = {
    appName: string;
    apiDomain: string;
    websiteDomain: string;
    apiBasePath?: string;
    websiteBasePath?: string;
};
export declare type NormalisedAppInfo = {
    appName: string;
    apiDomain: NormalisedURLDomain;
    websiteDomain: NormalisedURLDomain;
    apiBasePath: NormalisedURLPath;
    websiteBasePath: NormalisedURLPath;
};
export declare type RecipeModuleConfig<S, R> = RecipeModuleHooks<S, R> & {
    recipeId: string;
    /**
     *
     * AppInfo as present in the recipe module manager
     */
    appInfo: NormalisedAppInfo;
};
export declare type RecipeModuleHooks<S, R> = {
    preAPIHook?: (context: S) => Promise<RequestInit>;
    onHandleEvent?: (context: R) => void;
};
export declare type NormalisedRecipeModuleHooks = {
    preAPIHook: (context: unknown) => Promise<RequestInit>;
    onHandleEvent: (context: unknown) => void;
};
export declare type NormalisedAuthRecipeConfigHooks = {
    getRedirectionURL: (context: unknown) => Promise<string | undefined>;
};
export declare type AuthRecipeModuleConfig<T, S, R> = AuthRecipeModuleUserInput<T, S, R> & RecipeModuleConfig<S, R>;
export declare type AuthRecipeModuleUserInput<T, S, R> = RecipeModuleHooks<S, R> & {
    useShadowDom?: boolean;
    palette?: Record<string, string>;
    getRedirectionURL?: (context: T) => Promise<string | undefined>;
};
export declare type NormalisedAuthRecipeConfig = {
    useShadowDom: boolean;
    palette: Record<string, string>;
};
export declare type RouteToFeatureComponentMap = Record<string, ReactComponentClass>;
export declare type ComponentWithRecipeId = {
    rid: string;
    component: ReactComponentClass;
};
export declare type PathToComponentWithRecipeIdMap = Record<string, ComponentWithRecipeId[]>;
export declare type FormFieldBaseConfig = {
    id: string;
    label: string;
    placeholder?: string;
};
export declare type FormField = FormFieldBaseConfig & {
    validate?: (value: any) => Promise<string | undefined>;
    optional?: boolean;
};
export declare type APIFormField = {
    id: string;
    value: string;
};
export declare type NormalisedFormField = {
    id: string;
    label: string;
    placeholder: string;
    validate: (value: any) => Promise<string | undefined>;
    optional: boolean;
    autoComplete?: string;
};
export declare type ReactComponentClass = ComponentClass | (<T>(props: T) => JSX.Element);
export declare type WithRouterType = (Component: ReactComponentClass) => ReactComponentClass;
export declare type Styles = Record<string, CSSObject>;
export declare type FeatureBaseConfig = {
    style?: Styles;
};
export declare type NormalisedBaseConfig = {
    style: Styles;
};
export declare type SuccessAPIResponse = {
    status: "OK";
};
