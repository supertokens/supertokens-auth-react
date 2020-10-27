/// <reference types="react" />
import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { CSSInterpolation } from "@emotion/serialize/types/index";
export declare type ReactComponentClass = <T>(props: T) => JSX.Element;
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    recipeList: CreateRecipeFunction[];
};
export declare type RouteWithPathAndRecipeId = {
    path: NormalisedURLPath;
    recipeId: string | null;
};
export declare type CreateRecipeFunction = (appInfo: AppInfo) => RecipeModule;
export declare type AppInfoUserInput = {
    appName: string;
    apiDomain: string;
    websiteDomain: string;
    apiBasePath?: string;
    websiteBasePath?: string;
};
export declare type AppInfo = {
    appName: string;
    apiDomain: NormalisedURLDomain;
    websiteDomain: NormalisedURLDomain;
    apiBasePath: NormalisedURLPath;
    websiteBasePath: NormalisedURLPath;
};
export declare type RecipeModuleConfig = {
    features: RouteToFeatureComponentMap;
    recipeId: string;
    /**
     *
     * AppInfo as present in the recipe module manager
     */
    appInfo: AppInfo;
};
export declare type RouteToFeatureComponentMap = {
    [route: string]: ReactComponentClass;
};
export declare type ComponentWithRecipeId = {
    rid: string;
    component: ReactComponentClass;
};
export declare type PathToComponentWithRecipeIdMap = {
    [path: string]: ComponentWithRecipeId[];
};
export declare type FeatureConfigBase = {
    style?: CSSInterpolation;
};
export declare type FormFieldBaseConfig = {
    id: string;
    label: string;
    placeholder?: string;
};
export declare type FormField = FormFieldBaseConfig & {
    validate?: (value: string) => Promise<string | undefined>;
    optional?: boolean;
};
export declare type APIFormField = {
    id: string;
    value: string;
};
export declare type RequestJson = {
    formFields: APIFormField[];
};
export declare type NormalisedFormField = {
    id: string;
    label: string;
    placeholder: string;
    validate: (value: string) => Promise<string | undefined>;
    optional: boolean;
};
