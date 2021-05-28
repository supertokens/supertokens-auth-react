import { RecipeInterface, FunctionOptions } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    submitNewPassword: (
        formFields: {
            id: string;
            value: string;
        }[],
        token: string,
        options: FunctionOptions
    ) => Promise<SubmitNewPasswordAPIResponse>;
    sendPasswordResetEmail: (
        formFields: {
            id: string;
            value: string;
        }[],
        options: FunctionOptions
    ) => Promise<SendPasswordResetEmailAPIResponse>;
    signUp: (
        formFields: {
            id: string;
            value: string;
        }[],
        options: FunctionOptions
    ) => Promise<SignUpAPIResponse>;
    signIn: (
        formFields: {
            id: string;
            value: string;
        }[],
        options: FunctionOptions
    ) => Promise<SignInAPIResponse>;
    doesEmailExist: (email: string, options: FunctionOptions) => Promise<boolean>;
}
declare type SubmitNewPasswordAPIResponse =
    | {
          status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
      };
declare type SendPasswordResetEmailAPIResponse =
    | {
          status: "OK";
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
      };
declare type SignUpAPIResponse =
    | {
          status: "OK";
          user: User;
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
      };
declare type SignInAPIResponse =
    | {
          status: "OK";
          user: User;
      }
    | {
          status: "FIELD_ERROR";
          formFields: {
              id: string;
              error: string;
          }[];
      }
    | {
          status: "WRONG_CREDENTIALS_ERROR";
      };
export {};
