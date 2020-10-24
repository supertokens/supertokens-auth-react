import { ComponentClass } from "react";
import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    recipeList: (() => RecipeModule)[];
};
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
export declare type RouteToFeatureComponentMap = {
    [route: string]: ComponentClass;
};
export declare type RecipeModuleConfig = {
    features: RouteToFeatureComponentMap;
    recipeId: string;
};
export declare type ComponentWithRecipeId = {
    rid: string;
    component: ComponentClass;
};
export declare type PathToComponentWithRecipeIdMap = {
    [path: string]: ComponentWithRecipeId[];
};
export declare type RecipeModuleProps = {
    __internal?: InternalRecipeModuleProps;
};
declare type InternalRecipeModuleProps = {
    instance: RecipeModule;
};
export declare type ThemeProps = {
    formFields: FormFieldsProps[];
};
export declare type FormFieldsProps = {
    id: string;
    label: string;
    placeholder?: string;
    validate?: (value: string) => Promise<boolean | undefined>;
    optional?: boolean;
};
export {};
