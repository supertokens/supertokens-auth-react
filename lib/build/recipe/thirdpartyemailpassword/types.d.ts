import { FeatureBaseConfig, NormalisedBaseConfig, Styles } from "../../types";
import {
    GetRedirectionURLContext as EmailPasswordGetRedirectionURLContext,
    OnHandleEventContext as EmailPasswordOnHandleEventContext,
    PreAPIHookContext as EmailPasswordPreAPIHookContext,
    FunctionOptions as EPFunctionOptions,
} from "../emailpassword";
import {
    NormalisedResetPasswordUsingTokenFeatureConfig,
    NormalisedSignInFormFeatureConfig,
    NormalisedSignUpFormFeatureConfig,
    ResetPasswordUsingTokenUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput,
} from "../emailpassword/types";
import {
    GetRedirectionURLContext as ThirdPartyGetRedirectionURLContext,
    OnHandleEventContext as ThirdPartyOnHandleEventContext,
    PreAPIHookContext as ThirdPartyPreAPIHookContext,
    FunctionOptions as TPFunctionOptions,
} from "../thirdparty";
import Provider from "../thirdparty/providers";
import { CustomProviderConfig } from "../thirdparty/providers/types";
import {
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    User,
} from "../authRecipeModule/types";
import EPRecipe from "../emailpassword/recipe";
import TPRecipe from "../thirdparty/recipe";
export { EPFunctionOptions, TPFunctionOptions };
import RecipeImplementation from "./recipeImplementation";
export declare type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    disableEmailPassword?: boolean;
    override?: {
        functions?: (originalImplementation: RecipeImplementation) => RecipeInterface;
    };
} & AuthRecipeModuleUserInput;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    disableEmailPassword: boolean;
    override: {
        functions: (originalImplementation: RecipeImplementation) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    disableDefaultImplementation?: boolean;
    defaultToSignUp?: boolean;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
    providers: (Provider | CustomProviderConfig)[];
};
export declare type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    disableDefaultImplementation: boolean;
    providers: Provider[];
    defaultToSignUp: boolean;
    signUpForm: NormalisedSignUpFormFeatureConfig;
    signInForm: NormalisedSignInFormFeatureConfig;
};
export declare type GetRedirectionURLContext =
    | EmailPasswordGetRedirectionURLContext
    | ThirdPartyGetRedirectionURLContext;
export declare type PreAPIHookContext = EmailPasswordPreAPIHookContext | ThirdPartyPreAPIHookContext;
export declare type OnHandleEventContext = ThirdPartyOnHandleEventContext | EmailPasswordOnHandleEventContext;
export declare type ThirdPartyEmailPasswordSignInAndUpThemeProps = {
    history?: any;
    defaultToSignUp: boolean;
    hideThirdParty?: boolean;
    hideEmailPassword?: boolean;
    rawPalette: Record<string, string>;
    styleFromInit: Styles;
    emailPasswordRecipe: EPRecipe;
    thirdPartyRecipe: TPRecipe;
};
export declare type SignInAndUpInput =
    | {
          type: "emailpassword";
          isSignIn: boolean;
          formFields: {
              id: string;
              value: string;
          }[];
          options: EPFunctionOptions;
      }
    | {
          type: "thirdparty";
          thirdPartyId: string;
          code: string;
          redirectURI: string;
          options: TPFunctionOptions;
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
          status: "NO_EMAIL_GIVEN_BY_PROVIDER";
      }
    | {
          type: "thirdparty";
          status: "FIELD_ERROR";
          error: string;
      };
export interface RecipeInterface {
    submitNewPassword: (
        formFields: {
            id: string;
            value: string;
        }[],
        token: string,
        options: EPFunctionOptions
    ) => Promise<
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
    sendPasswordResetEmail: (
        formFields: {
            id: string;
            value: string;
        }[],
        options: EPFunctionOptions
    ) => Promise<
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
    doesEmailExist: (email: string, options: EPFunctionOptions) => Promise<boolean>;
    getOAuthAuthorisationURL: (thirdPartyId: string, options: TPFunctionOptions) => Promise<string>;
    signInAndUp: (input: SignInAndUpInput) => Promise<SignInAndUpOutput>;
}
