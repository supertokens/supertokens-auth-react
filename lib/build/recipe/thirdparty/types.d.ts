/// <reference types="react" />
import { FeatureBaseConfig, NormalisedBaseConfig, PreAPIHookFunction } from "../../types";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    PreAPIHookContext as AuthRecipeModulePreAPIHookContext,
    User,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipeModule/types";
import Provider from "./providers";
import { CustomProviderConfig } from "./providers/types";
import RecipeImplementation from "./recipeImplementation";
export declare type UserInput = {
    signInAndUpFeature: SignInAndUpFeatureUserInput;
    override?: {
        functions?: (originalImplementation: RecipeImplementation) => RecipeInterface;
    };
} & AuthRecipeModuleUserInput;
export declare type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    override: {
        functions: (originalImplementation: RecipeImplementation) => RecipeInterface;
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
export declare type GetRedirectionURLContext =
    | AuthRecipeModuleGetRedirectionURLContext
    | {
          action: "GET_REDIRECT_URL";
          provider: Provider;
      };
export declare type PreAPIHookContext =
    | AuthRecipeModulePreAPIHookContext
    | {
          action: "GET_AUTHORISATION_URL";
          requestInit: RequestInit;
          url: string;
      };
export declare type OnHandleEventContext = AuthRecipeModuleOnHandleEventContext;
export declare type SignInAndUpThemeProps = {
    providers: {
        id: string;
        buttonComponent: JSX.Element;
    }[];
    signInAndUpClick: (id: string) => Promise<string | void>;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    error: string | undefined;
};
export declare type ThirdPartySignInAndUpState =
    | {
          status: "LOADING" | "READY" | "GENERAL_ERROR";
      }
    | {
          status: "SUCCESSFUL";
          user: User;
      }
    | {
          status: "CUSTOM_ERROR";
          error: string;
      };
export declare type StateObject = {
    state: string;
    expiresAt: number;
    rid: string;
    thirdPartyId: string;
    redirectToPath: string | undefined;
};
export declare type FunctionOptions = {
    preAPIHook?: PreAPIHookFunction;
    config: NormalisedConfig;
};
export interface RecipeInterface {
    getOAuthAuthorisationURL: (thirdPartyId: string, options: FunctionOptions) => Promise<string>;
    signInAndUp: (
        thirdPartyId: string,
        code: string,
        redirectURI: string,
        options: FunctionOptions
    ) => Promise<
        | {
              status: "OK";
              user: User;
              createdNewUser: boolean;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
          }
        | {
              status: "FIELD_ERROR";
              error: string;
          }
    >;
}
