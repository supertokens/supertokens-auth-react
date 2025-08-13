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
declare type SuccessRedirectContextCommon = {
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
export declare type SuccessRedirectContextInApp = SuccessRedirectContextCommon & {
    action: "SUCCESS";
    redirectToPath?: string;
};
export declare type SuccessRedirectContextOAuth2 = SuccessRedirectContextCommon & {
    action: "SUCCESS_OAUTH2";
    frontendRedirectTo: string;
};
export declare type SuccessRedirectContext = SuccessRedirectContextInApp | SuccessRedirectContextOAuth2;
export declare type GetRedirectionURLContext = NormalisedGetRedirectionURLContext<
    | {
          action: "TO_AUTH";
          showSignIn?: boolean;
      }
    | SuccessRedirectContextInApp
>;
export declare type ValidationFailureCallback =
    | (({
          userContext,
          reason,
      }: {
          userContext: UserContext;
          reason: any;
      }) => Promise<string | undefined> | string | undefined)
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
    dateProvider?: DateProviderInput;
    usesDynamicLoginMethods?: boolean;
    languageTranslations?: {
        defaultLanguage?: string;
        currentLanguageCookieScope?: string;
        translations?: TranslationStore;
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
    defaultToSignUp?: boolean;
    privacyPolicyLink?: string;
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
    getDefaultValue?: () => string;
    nonOptionalErrorMsg?: string;
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
    nonOptionalErrorMsg?: string;
    autoComplete?: string;
    autofocus?: boolean;
    getDefaultValue?: () => string;
    hidden?: boolean;
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
export declare type FeatureBaseProps<T = Record<string, unknown>> = PropsWithChildren<
    {
        navigate?: Navigate;
    } & T
>;
export declare type Awaited<T> = T extends null | undefined
    ? T
    : T extends object & {
          then(onfulfilled: infer F): any;
      }
    ? F extends (value: infer V, ...args: any) => any
        ? V
        : never
    : T;
interface NavigateFunction {
    (to: string): void;
    (delta: number): void;
}
export declare type Navigate =
    | {
          push: (path: string) => void;
          goBack: () => void;
      }
    | NavigateFunction;
export declare type UserContext = Record<string, any>;
export declare type AuthComponentProps = {
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
export declare type PartialAuthComponentProps = AuthComponentProps;
export declare type FullPageAuthComponentProps<PreloadInfoType> = AuthComponentProps & {
    preloadInfo: PreloadInfoType;
};
export declare type FullPageAuthComponent<PreloadInfoType = any> = {
    type: "FULL_PAGE";
    preloadInfoAndRunChecks: (
        firstFactors: string[],
        userContext: UserContext,
        isSignUp: boolean
    ) => Promise<
        | {
              shouldDisplay: true;
              preloadInfo: PreloadInfoType;
          }
        | {
              shouldDisplay: false;
          }
    >;
    component: React.FC<FullPageAuthComponentProps<PreloadInfoType>>;
};
export declare type PartialAuthComponent = {
    type: "SIGN_IN_UP" | "SIGN_IN" | "SIGN_UP";
    factorIds: string[];
    displayOrder: number;
    component: React.FC<PartialAuthComponentProps>;
};
export declare type AuthComponent<T = any> = PartialAuthComponent | FullPageAuthComponent<T>;
export declare type NormalisedGetRedirectionURLContext<RecipeContext> = RecipeContext & {
    tenantIdFromQueryParams: string | undefined;
};
export declare type AllRecipeConfigs = {
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
export declare type AllRecipeComponentOverrides = {
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
export declare type RecipePluginOverride<T extends keyof AllRecipeConfigs> = {
    functions?: NonNullable<AllRecipeConfigs[T]["override"]>["functions"];
    components?: AllRecipeComponentOverrides[T];
    config?: (config: AllRecipeConfigs[T]) => AllRecipeConfigs[T];
};
export declare type PluginRouteHandler = {
    path: string;
    handler: () => JSX.Element;
};
export declare type SuperTokensPlugin = {
    id: string;
    version?: string;
    compatibleAuthReactSDKVersions?: string | string[];
    compatibleWebJSSDKVersions?: string | string[];
    init?: (config: SuperTokensPublicConfig, allPlugins: SuperTokensPublicPlugin[], sdkVersion: string) => void;
    dependencies?: (
        config: SuperTokensPublicConfig,
        pluginsAbove: SuperTokensPublicPlugin[],
        sdkVersion: string
    ) =>
        | {
              status: "OK";
              pluginsToAdd?: SuperTokensPlugin[];
          }
        | {
              status: "ERROR";
              message: string;
          };
    overrideMap?: {
        [recipeId in keyof AllRecipeConfigs]?: RecipePluginOverride<recipeId> & {
            recipeInitRequired?: boolean | ((sdkVersion: string) => boolean);
        };
    };
    generalAuthRecipeComponentOverrides?: AuthRecipeComponentOverrideMap;
    routeHandlers?:
        | ((
              config: SuperTokensPublicConfig,
              allPlugins: SuperTokensPublicPlugin[],
              sdkVersion: string
          ) =>
              | {
                    status: "OK";
                    routeHandlers: PluginRouteHandler[];
                }
              | {
                    status: "ERROR";
                    message: string;
                })
        | PluginRouteHandler[];
    config?: (config: SuperTokensPublicConfig) => Omit<SuperTokensPublicConfig, "appInfo"> | undefined;
    exports?: Record<string, any>;
};
export declare const nonPublicConfigProperties: readonly ["experimental"];
export declare type NonPublicConfigPropertiesType = (typeof nonPublicConfigProperties)[number];
export declare type SuperTokensConfigWithNormalisedAppInfo = Omit<SuperTokensConfig, "appInfo"> & {
    appInfo: NormalisedAppInfo;
};
export declare type SuperTokensPublicPlugin = Pick<
    SuperTokensPlugin,
    "id" | "version" | "exports" | "compatibleAuthReactSDKVersions" | "compatibleWebJSSDKVersions"
> & {
    initialized: boolean;
};
export declare type SuperTokensPublicConfig = Omit<
    Omit<SuperTokensConfig, NonPublicConfigPropertiesType>,
    "appInfo"
> & {
    appInfo: NormalisedAppInfo;
};
export {};
