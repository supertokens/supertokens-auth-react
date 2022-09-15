import RecipeModule from "./recipe/recipeModule";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import NormalisedURLDomain from "supertokens-web-js/utils/normalisedURLDomain";
import { CSSObject } from "@emotion/react/types/index";
import { ComponentClass, PropsWithChildren } from "react";
import { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import { TranslationFunc, TranslationStore } from "./translation/translationHelpers";
import { CookieHandlerInput } from "supertokens-website/utils/cookieHandler/types";
import { WindowHandlerInput } from "supertokens-website/utils/windowHandler/types";
export declare type GetRedirectionURLContext = {
    action: "TO_AUTH";
    showSignIn: boolean | undefined;
};
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    recipeList: CreateRecipeFunction<any, any, any, any>[];
    cookieHandler?: CookieHandlerInput;
    windowHandler?: WindowHandlerInput;
    languageTranslations?: {
        defaultLanguage?: string;
        currentLanguageCookieScope?: string;
        translations?: TranslationStore;
        translationFunc?: TranslationFunc;
    };
    enableDebugLogs?: boolean;
    getRedirectionURL?: (context: GetRedirectionURLContext) => Promise<string | undefined>;
};
export declare type CreateRecipeFunction<T, S, R, N extends NormalisedRecipeModuleConfig<T, S, R>> = (
    appInfo: NormalisedAppInfo,
    enableDebugLogs: boolean
) => RecipeModule<T, S, R, N>;
export declare type AppInfoUserInput = {
    appName: string;
    apiDomain: string;
    websiteDomain: string;
    apiBasePath?: string;
    websiteBasePath?: string;
    /**
     * An API gateway may be used which prepends a path to the API route.
     * That path should be specified here.
     */
    apiGatewayPath?: string;
};
export declare type NormalisedAppInfo = {
    appName: string;
    apiDomain: NormalisedURLDomain;
    websiteDomain: NormalisedURLDomain;
    apiBasePath: NormalisedURLPath;
    websiteBasePath: NormalisedURLPath;
};
export declare type ComponentWithRecipeAndMatchingMethod = {
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
    validate: (value: any) => Promise<string | undefined> | string | undefined;
    optional: boolean;
    autoComplete?: string;
    autofocus?: boolean;
};
export declare type ReactComponentClass = ComponentClass<any, any> | (<T>(props: T) => JSX.Element);
export declare type Styles = Record<string, CSSObject>;
export declare type FeatureBaseConfig = {
    style?: Styles;
};
export declare type NormalisedBaseConfig = {
    style: Styles;
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
};
export declare type FeatureBaseProps = PropsWithChildren<{
    history?: any;
}>;
export declare type Awaited<T> = T extends null | undefined
    ? T
    : T extends object & {
          then(onfulfilled: infer F): any;
      }
    ? F extends (value: infer V, ...args: any) => any
        ? V
        : never
    : T;
