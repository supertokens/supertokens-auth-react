import {
    UserInputForAuthRecipeModule as EmailVerificationUserInput,
    GetRedirectionURLContext as EmailVerificationGetRedirectionURLContext,
    OnHandleEventContext as EmailVerificationOnHandleEventContext,
    PreAPIHookContext as EmailVerificationPreAPIHookContext,
} from "../emailverification/types";
import {
    Config as RecipeModuleConfig,
    NormalisedConfig as NormalisedRecipeModuleConfig,
    UserInput as UserInputRecipeModule,
} from "../recipeModule/types";
export declare type User = {
    id: string;
    email: string;
};
export declare type UserInput<T, S, R> = {
    emailVerificationFeature?: EmailVerificationUserInput;
} & UserInputRecipeModule<T, S, R>;
export declare type Config<T, S, R> = UserInput<T, S, R> & RecipeModuleConfig<T, S, R>;
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
      }
    | EmailVerificationGetRedirectionURLContext;
export declare type PreAPIHookContext =
    | {
          action: "SIGN_OUT" | "SIGN_IN";
          requestInit: RequestInit;
          url: string;
      }
    | EmailVerificationPreAPIHookContext;
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
      }
    | EmailVerificationOnHandleEventContext;
