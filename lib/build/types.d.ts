import type { BaseRecipeModule } from "./recipe/recipeModule/baseRecipeModule";
import type { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import type { TranslationFunc, TranslationStore } from "./translation/translationHelpers";
import type { ComponentClass, PropsWithChildren } from "react";
import type { CreateRecipeFunction as CreateRecipeFunctionWebJS } from "supertokens-web-js/lib/build/types";
import type { SessionClaimValidator as SessionClaimValidatorWebJS } from "supertokens-web-js/recipe/session";
import type { CookieHandlerInput } from "supertokens-web-js/utils/cookieHandler/types";
import type NormalisedURLDomain from "supertokens-web-js/utils/normalisedURLDomain";
import type NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import type { WindowHandlerInput } from "supertokens-web-js/utils/windowHandler/types";
export declare type GetRedirectionURLContext = {
    action: "TO_AUTH";
    showSignIn?: boolean;
};
export declare type ValidationFailureCallback =
    | (({ userContext, reason }: { userContext: any; reason: any }) => Promise<string | undefined> | string | undefined)
    | undefined;
export declare type SessionClaimValidator = SessionClaimValidatorWebJS & {
    showAccessDeniedOnFailure?: boolean;
    onFailureRedirection?: ValidationFailureCallback;
};
export declare type SuperTokensConfig = {
    appInfo: AppInfoUserInput;
    /**
     * Identifier for the client, such as `web`, `ios`, etc. to be used with thirdparty, multitenancy recipes.
     */
    clientType?: string;
    recipeList: {
        recipeID: string;
        authReact: CreateRecipeFunction<any, any, any, any>;
        webJS: CreateRecipeFunctionWebJS<any>;
    }[];
    cookieHandler?: CookieHandlerInput;
    windowHandler?: WindowHandlerInput;
    usesDynamicLoginMethods?: boolean;
    languageTranslations?: {
        defaultLanguage?: string;
        currentLanguageCookieScope?: string;
        translations?: TranslationStore;
        translationFunc?: TranslationFunc;
    };
    enableDebugLogs?: boolean;
    getRedirectionURL?: (context: GetRedirectionURLContext) => Promise<string | undefined>;
};
export declare type WebJSRecipeInterface<T> = Omit<T, "default" | "init" | "signOut">;
export declare type CreateRecipeFunction<T, S, R, N extends NormalisedRecipeModuleConfig<T, S, R>> = (
    appInfo: NormalisedAppInfo,
    enableDebugLogs: boolean
) => BaseRecipeModule<T, S, R, N>;
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
export declare type RecipeInitResult<T, Action, R, P extends NormalisedRecipeModuleConfig<T, Action, R>> = {
    recipeID: string;
    authReact: CreateRecipeFunction<T, Action, R, P>;
    webJS: CreateRecipeFunctionWebJS<Action>;
};
export declare type NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig> = NormalisedConfig & {
    appInfo: NormalisedAppInfo;
    recipeId: string;
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
    /**
     * Recipe ID this component belongs
     */
    recipeID: string;
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
export declare type ReactComponentClass<P = any> = ComponentClass<P, any> | ((props: P) => JSX.Element);
export declare type FeatureBaseConfig = {
    style?: string;
};
export declare type NormalisedBaseConfig = {
    style: string;
};
export declare type ThemeBaseProps = {
    styleFromInit?: string;
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
