import { ComponentClass } from "react";
import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { CSSInterpolation } from "@emotion/serialize/types/index";
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
    [route: string]: ComponentClass;
};
export declare type ComponentWithRecipeId = {
    rid: string;
    component: ComponentClass;
};
export declare type PathToComponentWithRecipeIdMap = {
    [path: string]: ComponentWithRecipeId[];
};
export declare type FeatureConfigBase = {
    style?: CSSInterpolation;
};
export declare type FormFieldsBaseConfig = {
    id: string;
    label: string;
    placeholder?: string;
};
export declare type FormFields = FormFieldsBaseConfig & {
    validate?: (value: string) => Promise<string | undefined>;
    optional: boolean;
};
export declare type SuperTokensRouteWithRecipeIdProps = {
    path: string;
};
