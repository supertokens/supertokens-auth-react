/// <reference types="react" />
import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    PreAndPostAPIHookAction as AuthRecipePreAndPostAPIHookAction,
    User,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    UserInputOverride as AuthRecipeUserInputOverride,
} from "../authRecipeWithEmailVerification/types";
import Provider from "./providers";
import { CustomProviderConfig } from "./providers/types";
import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { ProvidersForm } from "./components/themes/signInAndUp/providersForm";
import { SignUpFooter } from "./components/themes/signInAndUp/signUpFooter";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import OverrideableBuilder from "supertokens-js-override";
import { StateObject as WebJsStateObject } from "supertokens-web-js/recipe/thirdparty";
export declare type ComponentOverrideMap = {
    ThirdPartySignUpFooter?: ComponentOverride<typeof SignUpFooter>;
    ThirdPartySignInAndUpProvidersForm?: ComponentOverride<typeof ProvidersForm>;
    ThirdPartySignInAndUpCallbackTheme?: ComponentOverride<typeof SignInAndUpCallbackTheme>;
};
export declare type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    oAuthCallbackScreen?: FeatureBaseConfig;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components?: ComponentOverrideMap;
    } & AuthRecipeUserInputOverride;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookContext, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookContext, OnHandleEventContext>;
export declare type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    oAuthCallbackScreen: FeatureBaseConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookContext, OnHandleEventContext>;
export declare type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    disableDefaultImplementation?: boolean;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    providers?: (Provider | CustomProviderConfig)[];
};
export declare type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    disableDefaultImplementation: boolean;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    providers: Provider[];
};
export declare type GetRedirectionURLContext = AuthRecipeModuleGetRedirectionURLContext;
export declare type PreAndPostAPIHookContext =
    | AuthRecipePreAndPostAPIHookAction
    | "GET_AUTHORISATION_URL"
    | "THIRD_PARTY_SIGN_IN_UP";
export declare type PreAPIHookContext = {
    action: PreAndPostAPIHookContext;
    requestInit: RequestInit;
    url: string;
    userContext: any;
};
export declare type OnHandleEventContext =
    | AuthRecipeModuleOnHandleEventContext
    | {
          action: "SUCCESS";
          isNewUser: boolean;
          user: {
              id: string;
              email: string;
          };
      };
export declare type SignInAndUpThemeProps = {
    providers: {
        id: string;
        buttonComponent: JSX.Element;
    }[];
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
    error: string | undefined;
};
export declare type ThirdPartySignInAndUpState = {
    error?: string;
};
export declare type StateObject = WebJsStateObject & {
    rid?: string;
    redirectToPath?: string;
};
export declare type RecipeInterface = {
    getStateAndOtherInfoFromStorage: (input: { userContext: any; config: NormalisedConfig }) => StateObject | undefined;
    setStateAndOtherInfoToStorage: (input: { state: StateObject; config: NormalisedConfig; userContext: any }) => void;
    redirectToThirdPartyLogin: (input: {
        thirdPartyId: string;
        config: NormalisedConfig;
        userContext: any;
    }) => Promise<{
        status: "OK" | "ERROR";
    }>;
    getAuthorisationURLFromBackend: (input: {
        thirdPartyId: string;
        config: NormalisedConfig;
        userContext: any;
    }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    signInAndUp: (input: { config: NormalisedConfig; userContext: any }) => Promise<
        | {
              status: "OK";
              user: User;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    >;
    generateStateToSendToOAuthProvider: (input: { userContext: any; config: NormalisedConfig }) => string;
    verifyAndGetStateOrThrowError: (input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: StateObject | undefined;
        config: NormalisedConfig;
        userContext: any;
    }) => Promise<StateObject>;
    getAuthCodeFromURL: (input: { config: NormalisedConfig; userContext: any }) => string;
    getAuthErrorFromURL: (input: { config: NormalisedConfig; userContext: any }) => string | undefined;
};
