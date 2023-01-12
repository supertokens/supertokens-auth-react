import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
export declare const getFunctionOverrides: (onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>) => (
    originalImp: RecipeInterface
) => {
    submitNewPassword: (input: any) => Promise<
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
    sendPasswordResetEmail: (input: any) => Promise<
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
    signUp: (input: any) => Promise<
        | {
              status: "OK";
              user: import("supertokens-web-js/recipe/emailpassword").UserType;
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
    signIn: (input: any) => Promise<
        | {
              status: "OK";
              user: import("supertokens-web-js/recipe/emailpassword").UserType;
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
        | {
              status: "WRONG_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
    >;
    doesEmailExist: (input: {
        email: string;
        options?: import("supertokens-web-js/recipe/emailpassword").RecipeFunctionOptions | undefined;
        userContext: any;
    }) => Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    getResetPasswordTokenFromURL: (input: { userContext: any }) => string;
};
