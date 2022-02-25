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
    PreAndPostAPIHookAction as EmailPasswordPreAndPostAPIHookAction,
} from "../emailpassword/types";
import {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
} from "../thirdparty";
import {
    NormalisedConfig as TPConfig,
    PreAndPostAPIHookContext as ThirdPartyPreAndPostAPIHookAction,
    StateObject,
} from "../thirdparty/types";
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
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
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
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
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
export declare type PreAndPostAPIHookAction = EmailPasswordPreAndPostAPIHookAction | ThirdPartyPreAndPostAPIHookAction;
export declare type PreAPIHookContext = EmailPasswordPreAPIHookContext | ThirdPartyPreAPIHookContext;
export declare type OnHandleEventContext = ThirdPartyOnHandleEventContext | EmailPasswordOnHandleEventContext;
export declare type ThirdPartyEmailPasswordSignInAndUpThemeProps = {
    history?: any;
    emailPasswordRecipe?: EPRecipe;
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
          userContext: any;
      }
    | {
          type: "thirdparty";
          config: TPConfig;
          userContext: any;
      };
export declare type SignInAndUpOutput =
    | {
          type: "emailpassword" | "thirdparty";
          status: "OK";
          user: User;
          createdNewUser: boolean;
          fetchResponse: Response;
      }
    | {
          type: "emailpassword";
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
          fetchResponse: Response;
      }
    | {
          type: "emailpassword";
          status: "WRONG_CREDENTIALS_ERROR";
          fetchResponse: Response;
      }
    | {
          type: "thirdparty";
          status: "NO_EMAIL_GIVEN_BY_PROVIDER";
          fetchResponse: Response;
      };
export declare type RecipeInterface = {
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: EPConfig;
        userContext: any;
    }) => Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    >;
    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: EPConfig;
        userContext: any;
    }) => Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    >;
    doesEmailExist: (input: { email: string; config: EPConfig; userContext: any }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    getSubmitPasswordTokenFromURL: (input: { config: EPConfig; userContext: any }) => string;
    getAuthorisationURLFromBackend: (input: { thirdPartyId: string; config: TPConfig; userContext: any }) => Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    signInAndUp: (input: SignInAndUpInput) => Promise<SignInAndUpOutput>;
    getStateAndOtherInfoFromStorage: (input: { userContext: any; config: TPConfig }) => StateObject | undefined;
    setStateAndOtherInfoToStorage: (input: { state: StateObject; config: TPConfig; userContext: any }) => void;
    redirectToThirdPartyLogin: (input: { thirdPartyId: string; config: TPConfig; userContext: any }) => Promise<{
        status: "OK" | "ERROR";
    }>;
    generateStateToSendToOAuthProvider: (input: { userContext: any; config: TPConfig }) => string;
    verifyAndGetStateOrThrowError: (input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: StateObject | undefined;
        config: TPConfig;
        userContext: any;
    }) => Promise<StateObject>;
    getAuthCodeFromURL: (input: { config: TPConfig; userContext: any }) => string;
    getAuthErrorFromURL: (input: { config: TPConfig; userContext: any }) => string | undefined;
};
