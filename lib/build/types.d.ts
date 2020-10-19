import { ComponentClass } from "react";
import RecipeModule from "./recipes/recipeModule";
export declare type SuperTokensConfig = {
    appInfo: AppInfoConfig;
    recipeList: RecipeModule[];
};
declare type AppInfoBase = {
    appName: string;
    apiDomain: string;
    apiBasePath?: string;
    websiteDomain: string;
    websiteBasePath?: string;
    logoFullURL?: string;
};
export declare type AppInfoConfig = AppInfoBase & {
    apiBasePath?: string;
    websiteBasePath?: string;
};
export declare type AppInfo = AppInfoBase & {
    apiBasePath: string;
    websiteBasePath: string;
};
export declare type FeatureHash = {
    [route: string]: ComponentClass;
};
export declare type RecipeModuleConfig = {
    features: FeatureHash;
    recipeId: string;
};
export declare type EmailPasswordConfig = RecipeModuleConfig & {
    signInAndUpFeature: any;
    resetPasswordUsingTokenFeature: any;
};
export {};
