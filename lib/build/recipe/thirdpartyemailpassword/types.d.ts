import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import {
    GetRedirectionURLContext as EmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as EmailPasswordOnHandleEventContext,
    PreAPIHookContext as EmailPasswordPreAPIHookContext,
} from "../emailpassword";
import {
    ResetPasswordUsingTokenUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput,
    NormalisedConfig as EPConfig,
    SignInAndUpState as EmailPasswordSignInAndUpState,
} from "../emailpassword/types";
import {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../thirdparty";
import { NormalisedConfig as TPConfig, StateObject, ThirdPartySignInAndUpState } from "../thirdparty/types";
import Provider from "../thirdparty/providers";
import { CustomProviderConfig } from "../thirdparty/providers/types";
import {
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    User,
    UserInputOverride as AuthRecipeUserInputOverride,
} from "../authRecipeWithEmailVerification/types";
import EPRecipe from "../emailpassword/recipe";
import TPRecipe from "../thirdparty/recipe";
import OverrideableBuilder from "supertokens-js-override";
import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { ComponentOverrideMap as EmailPasswordOverrideMap } from "../emailpassword/types";
import { ComponentOverrideMap as ThirdPartyOverrideMap } from "../thirdparty/types";
import { Header } from "./components/themes/signInAndUp/header";
import { SignInAndUpForm } from "./components/themes/signInAndUp/signInAndUpForm";
import { Dispatch } from "react";
import {
    ChildProps as EmailPasswordChildProps,
    EmailPasswordSignInAndUpAction,
} from "../emailpassword/components/features/signInAndUp";
import {
    ChildProps as ThirdPartyChildProps,
    ThirdPartySignInUpActions,
} from "../thirdparty/components/features/signInAndUp";
export declare type ComponentOverrideMap = EmailPasswordOverrideMap &
    ThirdPartyOverrideMap & {
        ThirdPartyEmailPasswordHeader?: ComponentOverride<typeof Header>;
        ThirdPartyEmailPasswordSignInAndUpForm?: ComponentOverride<typeof SignInAndUpForm>;
    };
export declare type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    oAuthCallbackScreen?: FeatureBaseConfig;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    disableEmailPassword?: boolean;
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
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    oAuthCallbackScreen?: FeatureBaseConfig;
    disableEmailPassword: boolean;
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
    defaultToSignUp?: boolean;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
    providers?: (Provider | CustomProviderConfig)[];
};
export declare type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    disableDefaultImplementation: boolean;
    defaultToSignUp: boolean;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
    providers?: (Provider | CustomProviderConfig)[];
};
export declare type GetRedirectionURLContext =
    | EmailPasswordGetRedirectionURLContext
    | ThirdPartyGetRedirectionURLContext;
export declare type PreAPIHookContext = EmailPasswordPreAPIHookContext | ThirdPartyPreAPIHookContext;
export declare type OnHandleEventContext = ThirdPartyOnHandleEventContext | EmailPasswordOnHandleEventContext;
export declare type ThirdPartyEmailPasswordSignInAndUpThemeProps = {
    history?: any;
    emailPasswordRecipe?: EPRecipe;
    epState: EmailPasswordSignInAndUpState;
    epDispatch: Dispatch<EmailPasswordSignInAndUpAction>;
    epChildProps: EmailPasswordChildProps;
    tpState: ThirdPartySignInAndUpState;
    tpDispatch: Dispatch<ThirdPartySignInUpActions>;
    tpChildProps: ThirdPartyChildProps;
    thirdPartyRecipe?: TPRecipe;
    config: NormalisedConfig;
};
export declare type SignInAndUpInput =
    | {
          type: "emailpassword";
          isSignIn: boolean;
          formFields: {
              id: string;
              value: string;
          }[];
          config: EPConfig;
      }
    | {
          type: "thirdparty";
          thirdPartyId: string;
          config: TPConfig;
      };
export declare type SignInAndUpOutput =
    | {
          type: "emailpassword" | "thirdparty";
          status: "OK";
          user: User;
          createdNewUser: boolean;
      }
    | {
          type: "emailpassword";
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
      }
    | {
          type: "emailpassword";
          status: "WRONG_CREDENTIALS_ERROR";
      }
    | {
          type: "thirdparty";
          status: "NO_EMAIL_GIVEN_BY_PROVIDER" | "GENERAL_ERROR";
      }
    | {
          type: "thirdparty";
          status: "FIELD_ERROR";
          error: string;
      };
export declare type RecipeInterface = {
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token: string;
        config: EPConfig;
    }) => Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;
    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: EPConfig;
    }) => Promise<
        | {
              status: "OK";
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;
    doesEmailExist: (input: { email: string; config: EPConfig }) => Promise<boolean>;
    getOAuthAuthorisationURL: (input: { thirdPartyId: string; config: TPConfig }) => Promise<string>;
    signInAndUp: (input: SignInAndUpInput) => Promise<SignInAndUpOutput>;
    getOAuthState(): StateObject | undefined;
    setOAuthState(state: StateObject): void;
    redirectToThirdPartyLogin: (input: { thirdPartyId: string; config: TPConfig; state?: StateObject }) => Promise<{
        status: "OK" | "ERROR";
    }>;
};
