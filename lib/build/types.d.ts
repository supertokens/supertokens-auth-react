/// <reference types="react" />
import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { CSSInterpolation } from "@emotion/serialize/types/index";
export declare enum APIStatus {
    FIELD_ERROR = "FIELD_ERROR",
    GENERAL_ERROR = "GENERAL_ERROR",
    OK = "OK",
    WRONG_CREDENTIALS_ERROR = "WRONG_CREDENTIALS_ERROR"
}
export declare enum SuccessAction {
    SESSION_ALREADY_EXISTS = "SESSION_ALREADY_EXISTS",
    SIGN_IN_COMPLETE = "SIGN_IN_COMPLETE",
    SIGN_UP_COMPLETE = "SIGN_UP_COMPLETE"
}
export declare enum mandatoryInputFields {
    EMAIL = "email",
    PASSWORD = "password"
}
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
