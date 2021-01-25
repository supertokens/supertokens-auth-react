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
export declare type RecipeModuleConfig = RecipeModuleHooks & {
    recipeId: string;
    /**
     *
     * AppInfo as present in the recipe module manager
     */
    appInfo: NormalisedAppInfo;
};
export declare type RecipeModuleHooks = {
    preAPIHook?: (context: {
        action: string;
        requestInit: RequestInit;
    }) => Promise<RequestInit>;
    getRedirectionURL?: (context: {
        action: string;
    }) => Promise<string | undefined>;
    onHandleEvent?: (context: {
        action: string;
        user?: {
            id: string;
            email: string;
        };
    }) => void;
};
export declare type RouteToFeatureComponentMap = Record<string, ReactComponentClass>;
export declare type RouteWithPathAndRecipeId = {
    path: NormalisedURLPath;
    recipeId: string | null;
};
export declare type ComponentWithRecipeId = {
    rid: string;
    component: ReactComponentClass;
};
export declare type PathToComponentWithRecipeIdMap = Record<string, ComponentWithRecipeId[]>;
export declare type FeatureBaseConfig = {
    style?: Styles;
};
export declare type NormalisedBaseConfig = {
    style: Styles;
};
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
export declare type RequestJson = {
    formFields?: APIFormField[];
    token?: string;
    method?: "token";
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
