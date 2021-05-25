import { UserInputForAuthRecipeModule as EmailVerificationUserInput } from "../emailverification/types";
import { Config as RecipeModuleConfig, NormalisedConfig as NormalisedRecipeModuleConfig } from "../recipeModule/types";
export declare type User = {
    id: string;
    email: string;
};
export declare type UserInput = {
    emailVerificationFeature?: EmailVerificationUserInput;
};
export declare type Config<T, S, R> = UserInput & RecipeModuleConfig<T, S, R>;
export declare type NormalisedConfig<T, S, R> = {
    emailVerificationFeature?: EmailVerificationUserInput;
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
