/// <reference types="react" />
import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    PreAPIHookContext as AuthRecipeModulePreAPIHookContext,
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
export declare type ComponentOverrideMap = {
    ThirdPartySignUpFooter_Override?: ComponentOverride<typeof SignUpFooter>;
    ThirdPartySignInAndUpProvidersForm_Override?: ComponentOverride<typeof ProvidersForm>;
    ThirdPartySignInAndUpCallbackTheme_Override?: ComponentOverride<typeof SignInAndUpCallbackTheme>;
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
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
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
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
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
export declare type PreAPIHookContext =
    | AuthRecipeModulePreAPIHookContext
    | {
          action: "GET_AUTHORISATION_URL";
          requestInit: RequestInit;
          url: string;
      }
    | {
          action: "THIRD_PARTY_SIGN_IN_UP";
          requestInit: RequestInit;
          url: string;
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
    featureState: {
        error: string | undefined;
    };
    dispatch: (action: ThirdPartySignInUpActions) => void;
    providers: {
        id: string;
        buttonComponent: JSX.Element;
    }[];
    recipeImplementation: RecipeInterface;
    config: NormalisedConfig;
};
export declare type ThirdPartySignInUpChildProps = Omit<SignInAndUpThemeProps, "featureState" | "dispatch">;
export declare type ThirdPartySignInUpActions = {
    type: "setError";
    error: string | undefined;
};
export declare type ThirdPartySignInAndUpState = {
    error: string | undefined;
};
export declare type StateObject = {
    state?: string;
    rid?: string;
    thirdPartyId?: string;
    redirectToPath?: string;
};
export declare type RecipeInterface = {
    getOAuthState(): StateObject | undefined;
    setOAuthState(state: StateObject): void;
    redirectToThirdPartyLogin: (input: {
        thirdPartyId: string;
        config: NormalisedConfig;
        state?: StateObject;
    }) => Promise<{
        status: "OK" | "ERROR";
    }>;
    getOAuthAuthorisationURL: (input: { thirdPartyId: string; config: NormalisedConfig }) => Promise<string>;
    signInAndUp: (input: { thirdPartyId: string; config: NormalisedConfig }) => Promise<
        | {
              status: "OK";
              user: User;
              createdNewUser: boolean;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER" | "GENERAL_ERROR";
          }
        | {
              status: "FIELD_ERROR";
              error: string;
          }
    >;
};
