import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "./normalisedURLPath";
import NormalisedURLDomain from "./normalisedURLDomain";
import { CSSObject } from "@emotion/react/types/index";
import { ComponentClass } from "react";
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    recipeList: CreateRecipeFunction<any, any, any>[];
    useReactRouterDom?: boolean;
};
export declare type CreateRecipeFunction<T, S, R> = (appInfo: NormalisedAppInfo) => RecipeModule<T, S, R>;
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
export declare type ComponentWithRecipeAndMatchingMethod = {
    rid: string;
    component: ReactComponentClass;
    matches: () => boolean;
};
export declare type RecipeFeatureComponentMap = Record<string, ComponentWithRecipeAndMatchingMethod>;
export declare type BaseFeatureComponentMap = Record<string, ComponentWithRecipeAndMatchingMethod[]>;
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
export declare type ReactComponentClass = ComponentClass<any, any> | (<T>(props: T) => JSX.Element);
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
export declare type NormalisedPalette = {
    colors: Record<string, string>;
    fonts: {
        size: string[];
    };
};
export declare type NormalisedDefaultStyles = Record<string, CSSObject>;
export declare type ThemeBaseProps = {
    styleFromInit?: Styles;
    onSuccess: () => void;
};
export declare type FeatureBaseProps = {
    recipeId: string;
    children?: JSX.Element;
    history?: any;
    isEmbedded?: boolean;
};
export declare type FeatureBaseOptionalRidProps = {
    recipeId?: string;
    children?: JSX.Element;
    history?: any;
    isEmbedded?: boolean;
};
