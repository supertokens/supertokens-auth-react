/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import type { DateProviderInput } from "./dateProvider/types";
import type { AuthSuccessContext } from "./recipe/authRecipe/types";
import type { ComponentOverrideMap as AuthRecipeComponentOverrideMap } from "./recipe/authRecipe/types";
import type { Config as EmailPasswordConfig } from "./recipe/emailpassword/types";
import type { ComponentOverrideMap as EmailPasswordComponentOverrideMap } from "./recipe/emailpassword/types";
import type { Config as EmailVerificationConfig } from "./recipe/emailverification/types";
import type { ComponentOverrideMap as EmailVerificationComponentOverrideMap } from "./recipe/emailverification/types";
import type { Config as MultiFactorAuthConfig } from "./recipe/multifactorauth/types";
import type { ComponentOverrideMap as MultiFactorAuthComponentOverrideMap } from "./recipe/multifactorauth/types";
import type { UserInput as MultitenancyConfig } from "./recipe/multitenancy/types";
import type { ComponentOverrideMap as MultitenancyComponentOverrideMap } from "./recipe/multitenancy/types";
import type { UserInput as OAuth2ProviderConfig } from "./recipe/oauth2provider/types";
import type { ComponentOverrideMap as OAuth2ProviderComponentOverrideMap } from "./recipe/oauth2provider/types";
import type { Config as PasswordlessConfig } from "./recipe/passwordless/types";
import type { ComponentOverrideMap as PasswordlessComponentOverrideMap } from "./recipe/passwordless/types";
import type { BaseRecipeModule } from "./recipe/recipeModule/baseRecipeModule";
import type { NormalisedConfig as NormalisedRecipeModuleConfig } from "./recipe/recipeModule/types";
import type { InputType as SessionConfig } from "./recipe/session/types";
import type { ComponentOverrideMap as SessionComponentOverrideMap } from "./recipe/session/types";
import type { Config as ThirdPartyConfig } from "./recipe/thirdparty/types";
import type { ComponentOverrideMap as ThirdPartyComponentOverrideMap } from "./recipe/thirdparty/types";
import type { Config as TotpConfig } from "./recipe/totp/types";
import type { ComponentOverrideMap as TotpComponentOverrideMap } from "./recipe/totp/types";
import type { Config as WebauthnConfig } from "./recipe/webauthn/types";
import type { ComponentOverrideMap as WebauthnComponentOverrideMap } from "./recipe/webauthn/types";
import type { TranslationFunc, TranslationStore } from "./translation/translationHelpers";
import type { ComponentClass, PropsWithChildren } from "react";
import type { CreateRecipeFunction as CreateRecipeFunctionWebJS } from "supertokens-web-js/lib/build/types";
import type { SessionClaimValidator as SessionClaimValidatorWebJS } from "supertokens-web-js/recipe/session";
import type { CookieHandlerInput } from "supertokens-web-js/utils/cookieHandler/types";
import type NormalisedURLDomain from "supertokens-web-js/utils/normalisedURLDomain";
import type NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import type { WindowHandlerInput } from "supertokens-web-js/utils/windowHandler/types";

type SuccessRedirectContextCommon = {
    recipeId:
        | "emailpassword"
        | "thirdparty"
        | "passwordless"
        | "thirdpartypasswordless"
        | "thirdpartyemailpassword"
        | "emailverification"
        | "totp";
    isNewRecipeUser: boolean;
    createdNewUser: boolean;
    newSessionCreated: boolean;
};

export type SuccessRedirectContextInApp = SuccessRedirectContextCommon & { action: "SUCCESS"; redirectToPath?: string };
export type SuccessRedirectContextOAuth2 = SuccessRedirectContextCommon & {
    action: "SUCCESS_OAUTH2";
    frontendRedirectTo: string;
};

export type SuccessRedirectContext = SuccessRedirectContextInApp | SuccessRedirectContextOAuth2;

export type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<
    | {
          action: "TO_AUTH";
          showSignIn?: boolean;
      }
    | SuccessRedirectContextInApp
>;

export type ValidationFailureCallback =
    | (({
          userContext,
          reason,
      }: {
          userContext: UserContext;
          reason: any;
      }) => Promise<string | undefined> | string | undefined)
    | undefined;

export type SessionClaimValidator = SessionClaimValidatorWebJS & {
    showAccessDeniedOnFailure?: boolean;
    onFailureRedirection?: ValidationFailureCallback;
};

/*
 * Recipe Module Manager Config Types.
 */

export type SuperTokensConfig = {
    /*
     * App Info configurations.
     */
    appInfo: AppInfoUserInput;

    /**
     * Identifier for the client, such as `web`, `ios`, etc. to be used with thirdparty, multitenancy recipes.
     */
    clientType?: string;

    /*
     * List of recipes for authentication and session management.
     */
    recipeList: {
        recipeID: string;
        authReact: CreateRecipeFunction<any, any, any, any>;
        webJS: CreateRecipeFunctionWebJS<any>;
    }[];

    cookieHandler?: CookieHandlerInput;

    windowHandler?: WindowHandlerInput;

    dateProvider?: DateProviderInput;

    usesDynamicLoginMethods?: boolean;

    languageTranslations?: {
        /*
         * Default (and fallback) language
         */
        defaultLanguage?: string;

        /*
         * The scope of the cookie storing the current language.
         * This is used to save the language choice between refreshes
         */
        currentLanguageCookieScope?: string;

        /*
         * Language -> translation key -> copy string mapping object.
         *
         * e.g.:
         * {
         *     en: {
         *         AUTH_PAGE_FOOTER_TOS: "TOS",
         *     }
         * }
         */
        translations?: TranslationStore;

        /*
         * By providing this you can take direct control of the entire translation process.
         */
        translationFunc?: TranslationFunc;
    };
    enableDebugLogs?: boolean;
    getRedirectionURL?: (
        context: NormalisedGetRedirectionURLContext<GetRedirectionURLContext>,
        userContext: UserContext
    ) => Promise<string | undefined | null>;

    style?: string;
    useShadowDom?: boolean;
    disableAuthRoute?: boolean;

    /*
     * Should default to Sign up form.
     */
    defaultToSignUp?: boolean;

    /*
     * Privacy policy link for sign up form.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link for sign up form.
     */
    termsOfServiceLink?: string;

    /**
     *
     * Our experimental features are not yet stable and are subject to change. In practical terms, this means that their interface is subject to change without a major version update.
     * They are also not tested as much as our "normal" features.
     *
     * If you want to use these features, or if you have any feedback please let us know at:
     * https://supertokens.com/discord
     *
     */
    experimental?: {
        plugins?: SuperTokensPlugin[];
    };
};

export type WebJSRecipeInterface<T> = Omit<T, "default" | "init" | "signOut">;

export type CreateRecipeFunction<T, S, R, N extends NormalisedRecipeModuleConfig<T, S, R>> = (
    appInfo: NormalisedAppInfo,
    enableDebugLogs: boolean
) => BaseRecipeModule<T, S, R, N>;

export type AppInfoUserInput = {
    /*
     * The name of the application.
     */
    appName: string;

    /*
     * The API that connects with the application.
     */
    apiDomain: string;

    /*
     * The domain on which the application runs.
     */
    websiteDomain: string;

    /*
     * The base path for SuperTokens middleware in the API.
     * Default to `/auth`
     */
    apiBasePath?: string;

    /*
     * The base path for SuperTokens middleware in the front end application.
     * Default to `/auth`
     */
    websiteBasePath?: string;

    /**
     * An API gateway may be used which prepends a path to the API route.
     * That path should be specified here.
     */
    apiGatewayPath?: string;
};

export type RecipeInitResult<T, Action, R, P extends NormalisedRecipeModuleConfig<T, Action, R>> = {
    recipeID: string;
    authReact: CreateRecipeFunction<T, Action, R, P>;
    webJS: CreateRecipeFunctionWebJS<Action>;
};

export type NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig> = NormalisedConfig & {
    appInfo: NormalisedAppInfo;
    recipeId: string;
};

export type NormalisedAppInfo = {
    /*
     * The name of the application.
     */
    appName: string;

    /*
     * The API that connects with the application.
     */
    apiDomain: NormalisedURLDomain;

    /*
     * The domain on which the application runs.
     */
    websiteDomain: NormalisedURLDomain;

    /*
     * The base path for SuperTokens middleware in the API.
     * Default to `/auth`
     */
    apiBasePath: NormalisedURLPath;

    /*
     * The base path for SuperTokens middleware in the front end application.
     * Default to `/auth`
     */
    websiteBasePath: NormalisedURLPath;
};

/*
 * Routing manipulation types.
 */
export type ComponentWithRecipeAndMatchingMethod = {
    /*
     * Component.
     */
    component: ReactComponentClass;

    /*
     * Matching method.
     */
    matches: () => boolean;

    /**
     * Recipe ID this component belongs
     */
    recipeID: string;
};

export type RecipeFeatureComponentMap = Record<string, ComponentWithRecipeAndMatchingMethod>;

export type BaseFeatureComponentMap = Record<string, ComponentWithRecipeAndMatchingMethod[]>;

export type FormFieldBaseConfig = {
    /*
     * name of the input field.
     */
    id: string;

    /*
     * Label of the input field.
     */
    label: string;

    /*
     * placeholder of the input field.
     */
    placeholder?: string;

    /*
     *Ability to provide default value to input field.
     */
    getDefaultValue?: () => string;

    /*
     * Error message for non optional field.
     */
    nonOptionalErrorMsg?: string;
};

export type FormField = FormFieldBaseConfig & {
    /*
     * Validation function of the input field. Returns an error as a string, or undefined.
     */
    validate?: (value: any) => Promise<string | undefined>;

    /*
     * Whether the field is optional or not.
     */
    optional?: boolean;
};

export type APIFormField = {
    /*
     * Id, or name of the input.
     */
    id: string;

    /*
     * Value of the corresponding id.
     */
    value: string;
};

export type NormalisedFormField = {
    /*
     * name of the input field.
     */
    id: string;

    /*
     * Label of the input field.
     */
    label: string;

    /*
     * placeholder of the input field.
     */
    placeholder: string;

    /*
     * Validation function of the input field. Returns an error as a string, or undefined.
     */
    validate: (value: any) => Promise<string | undefined> | string | undefined;

    /*
     * Whether the field is optional or not.
     */
    optional: boolean;

    /*
     * Error message for non optional field.
     */
    nonOptionalErrorMsg?: string;

    /*
     * Autocomplete input.
     */
    autoComplete?: string;

    /*
     * Moves focus to the input element when it mounts
     */
    autofocus?: boolean;

    /*
     *Ability to provide default value to input field.
     */
    getDefaultValue?: () => string;

    hidden?: boolean;
};

export type ReactComponentClass<P = any> = ComponentClass<P, any> | ((props: P) => JSX.Element);

/*
 * Features Config Types.
 */

export type FeatureBaseConfig = {
    /*
     * Additional styles to override themes.
     */
    style?: string;
};

export type NormalisedBaseConfig = {
    /*
     * Additional styles to override themes.
     */
    style: string;
};

export type ThemeBaseProps = {
    styleFromInit?: string;
};

export type FeatureBaseProps<T = Record<string, unknown>> = PropsWithChildren<
    {
        navigate?: Navigate;
    } & T
>;

// Built-in in later versions of TS
export type Awaited<T> = T extends null | undefined
    ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
    : // eslint-disable-next-line @typescript-eslint/ban-types
    T extends object & { then(onfulfilled: infer F): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
    ? F extends (value: infer V, ...args: any) => any // if the argument to `then` is callable, extracts the first argument
        ? V // unwrap the value (this is recursive in the built-in version, but that needs features from a later version to work)
        : never // the argument to `then` was not callable
    : T; // non-object or non-thenable

// This Navigate interface is inspired by the signatures of react-router-dom v5 history and navigate in react-router-dom v6.
// This also allows users to use any other navigate object with a matching signature.
interface NavigateFunction {
    (to: string): void;
    (delta: number): void;
}

export type Navigate =
    | {
          push: (path: string) => void;
          goBack: () => void;
      }
    | NavigateFunction;

export type UserContext = Record<string, any>;

export type AuthComponentProps = {
    setFactorList: (factorIds: string[]) => void;
    resetFactorList: () => void;
    onSignInUpSwitcherClick: () => void;
    rebuildAuthPage: () => void;
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>;
    navigate: Navigate | undefined;
    userContext: UserContext;
    error: string | undefined;
    onError: (err: string) => void;
    clearError: () => void;
    showBackButton: boolean;
    children?: React.ReactNode;
};
export type PartialAuthComponentProps = AuthComponentProps;
export type FullPageAuthComponentProps<PreloadInfoType> = AuthComponentProps & { preloadInfo: PreloadInfoType };

export type FullPageAuthComponent<PreloadInfoType = any> = {
    type: "FULL_PAGE";
    preloadInfoAndRunChecks: (
        firstFactors: string[],
        userContext: UserContext,
        isSignUp: boolean
    ) => Promise<{ shouldDisplay: true; preloadInfo: PreloadInfoType } | { shouldDisplay: false }>;
    component: React.FC<FullPageAuthComponentProps<PreloadInfoType>>;
};

export type PartialAuthComponent = {
    type: "SIGN_IN_UP" | "SIGN_IN" | "SIGN_UP";
    factorIds: string[];
    displayOrder: number;
    component: React.FC<PartialAuthComponentProps>;
};

export type AuthComponent<T = any> = PartialAuthComponent | FullPageAuthComponent<T>;
export type NormalisedGetRedirectionURLContext<RecipeContext> = RecipeContext & {
    tenantIdFromQueryParams: string | undefined;
};

export type AllRecipeConfigs = {
    emailpassword: EmailPasswordConfig;
    emailverification: EmailVerificationConfig;
    multifactorauth: MultiFactorAuthConfig;
    multitenancy: MultitenancyConfig;
    oauth2provider: OAuth2ProviderConfig;
    passwordless: PasswordlessConfig;
    session: SessionConfig;
    thirdparty: ThirdPartyConfig;
    totp: TotpConfig;
    webauthn: WebauthnConfig;
};

export type AllRecipeComponentOverrides = {
    emailpassword: EmailPasswordComponentOverrideMap;
    emailverification: EmailVerificationComponentOverrideMap;
    multifactorauth: MultiFactorAuthComponentOverrideMap;
    multitenancy: MultitenancyComponentOverrideMap;
    oauth2provider: OAuth2ProviderComponentOverrideMap;
    passwordless: PasswordlessComponentOverrideMap;
    session: SessionComponentOverrideMap;
    thirdparty: ThirdPartyComponentOverrideMap;
    totp: TotpComponentOverrideMap;
    authRecipe: AuthRecipeComponentOverrideMap;
    webauthn: WebauthnComponentOverrideMap;
};

export type RecipePluginOverride<T extends keyof AllRecipeConfigs> = {
    functions?: NonNullable<AllRecipeConfigs[T]["override"]>["functions"];
    components?: AllRecipeComponentOverrides[T];
    config?: (config: AllRecipeConfigs[T]) => AllRecipeConfigs[T];
};

export type PluginRouteHandler = {
    path: string; // this is appended to apiBasePath
    handler: () => JSX.Element;
};

// TODO: this should probably derive from the web-js version
export type SuperTokensPlugin = {
    id: string; // TODO: validate that no two plugins have the same id
    version?: string;
    compatibleAuthReactSDKVersions?: string | string[]; // match the syntax of the engines field in package.json
    compatibleWebJSSDKVersions?: string | string[]; // match the syntax of the engines field in package.json
    dependencies?: (
        pluginsAbove: Pick<SuperTokensPlugin, "id" | "version">[],
        sdkVersion: string
    ) => { status: "OK"; pluginsToAdd?: SuperTokensPlugin[] } | { status: "ERROR"; message: string };
    overrideMap?: {
        [recipeId in keyof AllRecipeConfigs]?: RecipePluginOverride<recipeId> & {
            recipeInitRequired?: boolean | ((sdkVersion: string) => boolean);
        };
    };
    generalAuthRecipeComponentOverrides?: AuthRecipeComponentOverrideMap;
    routeHandlers?: PluginRouteHandler[];
    config?: (
        config: Omit<SuperTokensConfig, "experimental" | "recipeList">
    ) => Omit<SuperTokensConfig, "experimental" | "recipeList"> | undefined;
};
