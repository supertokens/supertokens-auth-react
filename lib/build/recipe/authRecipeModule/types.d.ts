import { Config as EmailVerificationConfig } from "../emailverification/types";
import { Config as RecipeModuleConfig, NormalisedConfig as NormalisedRecipeModuleConfig } from "../recipeModule/types";
export declare type User = {
    id: string;
    email: string;
};
export declare type Config<T, S, R> = {
    emailVerificationFeature?: EmailVerificationConfig;
} & RecipeModuleConfig<T, S, R>;
export declare type NormalisedConfig<T, S, R> = {
    emailVerificationFeature?: EmailVerificationConfig;
} & NormalisedRecipeModuleConfig<T, S, R>;
export declare type GetRedirectionURLContext =
    | {
          action: "SUCCESS";
          isNewUser: boolean;
          redirectToPath?: string;
      }
    | {
          action: "SIGN_IN_AND_UP";
      };
export declare type PreAPIHookContext = {
    action: "SIGN_OUT" | "SIGN_IN";
    requestInit: RequestInit;
    url: string;
};
export declare type OnHandleEventContext =
    | {
          action: "SESSION_ALREADY_EXISTS";
      }
    | {
          action: "SUCCESS";
          isNewUser: boolean;
          user: {
              id: string;
              email: string;
          };
      };
