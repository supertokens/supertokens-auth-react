import { ComponentClass } from "react";
import RecipeModule from "./recipe/recipeModule";
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    recipeList: RecipeModule[];
};
declare type AppInfoBase = {
    appName: string;
    apiDomain: string;
    websiteDomain: string;
    logoFullURL?: string;
};
export declare type AppInfoUserInput = AppInfoBase & {
    apiBasePath?: string;
    websiteBasePath?: string;
};
export declare type AppInfo = AppInfoBase & {
    apiBasePath: string;
    websiteBasePath: string;
};
export declare type RouteToFeatureComponentMap = {
    [route: string]: ComponentClass;
};
export declare type RecipeModuleConfig = {
    features: RouteToFeatureComponentMap;
    recipeId: string;
};
export declare type EmailPasswordConfig = RecipeModuleConfig & {
    signInAndUpFeature: any;
    resetPasswordUsingTokenFeature: any;
};
export declare type ComponentWithRecipeId = {
    rid: string;
    component: ComponentClass;
};
export declare type PathToComponentWithRecipeIdMap = {
    [route: string]: ComponentWithRecipeId[];
};
export {};
