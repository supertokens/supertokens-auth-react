import { NormalisedConfig } from "./types";
import { User } from "../authRecipeWithEmailVerification/types";
import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";

export default function getRecipeImplementation(
    webJsImplementation: RecipeInterface,
    authReactConfig: NormalisedConfig
): RecipeInterface {
    return {
        submitNewPassword: async function (input): Promise<
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
        > {
            const response = await webJsImplementation.submitNewPassword({
                config: input.config,
                formFields: [input.formFields[0]],
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                authReactConfig.onHandleEvent({
                    action: "PASSWORD_RESET_SUCCESSFUL",
                });
            }

            return response;
        },

        sendPasswordResetEmail: async function (input): Promise<
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
        > {
            const response = await webJsImplementation.sendPasswordResetEmail({
                config: input.config,
                formFields: input.formFields,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                authReactConfig.onHandleEvent({
                    action: "RESET_PASSWORD_EMAIL_SENT",
                });
            }
            return response;
        },

        signUp: async function (input): Promise<
            | {
                  status: "OK";
                  user: User;
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
        > {
            const response = await webJsImplementation.signUp({
                config: input.config,
                formFields: input.formFields,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                authReactConfig.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: true,
                    user: response.user,
                });
            }

            return response;
        },
        signIn: async function (input): Promise<
            | {
                  status: "OK";
                  user: User;
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
        > {
            const response = await webJsImplementation.signIn({
                config: input.config,
                formFields: input.formFields,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                authReactConfig.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: false,
                    user: response.user,
                });
            }
            return response;
        },
        doesEmailExist: async function (input): Promise<{
            status: "OK";
            doesExist: boolean;
            fetchResponse: Response;
        }> {
            return await webJsImplementation.doesEmailExist({
                config: input.config,
                email: input.email,
                userContext: input.userContext,
            });
        },

        getResetPasswordTokenFromURL: function (input): string {
            return webJsImplementation.getResetPasswordTokenFromURL({
                config: input.config,
                userContext: input.userContext,
            });
        },
    };
}
