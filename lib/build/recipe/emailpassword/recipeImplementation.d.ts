import { RecipeInterface, NormalisedConfig } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token: string;
        config: NormalisedConfig;
    }) => Promise<SubmitNewPasswordAPIResponse>;
    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
    }) => Promise<SendPasswordResetEmailAPIResponse>;
    signUp: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
    }) => Promise<SignUpAPIResponse>;
    signIn: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: NormalisedConfig;
    }) => Promise<SignInAPIResponse>;
    doesEmailExist: (input: { email: string; config: NormalisedConfig }) => Promise<boolean>;
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
