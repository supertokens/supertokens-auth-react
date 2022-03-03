import { RecipeInterface, NormalisedConfig } from "./types";
import { User } from "../authRecipeWithEmailVerification/types";
import WebJSEmailPassword from "supertokens-web-js/lib/build/recipe/emailpassword/recipe";

export default function getRecipeImplementation(webJsRecipe: WebJSEmailPassword): RecipeInterface {
    return {
        submitNewPassword: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            token: string;
            config: NormalisedConfig;
            userContext: any;
        }): Promise<
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
            const response = await webJsRecipe.recipeImplementation.submitNewPassword({
                config: webJsRecipe.config,
                formFields: [input.formFields[0]],
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "PASSWORD_RESET_SUCCESSFUL",
                });
            }

            return response;
        },

        sendPasswordResetEmail: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: NormalisedConfig;
            userContext: any;
        }): Promise<
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
            const response = await webJsRecipe.recipeImplementation.sendPasswordResetEmail({
                config: webJsRecipe.config,
                formFields: input.formFields,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "RESET_PASSWORD_EMAIL_SENT",
                });
            }
            return response;
        },

        signUp: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: NormalisedConfig;
            userContext: any;
        }): Promise<
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
            const response = await webJsRecipe.recipeImplementation.signUp({
                config: webJsRecipe.config,
                formFields: input.formFields,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: true,
                    user: response.user,
                });
            }

            return response;
        },
        signIn: async function (input: {
            formFields: {
                id: string;
                value: string;
            }[];
            config: NormalisedConfig;
            userContext: any;
        }): Promise<
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
            const response = await webJsRecipe.recipeImplementation.signIn({
                config: webJsRecipe.config,
                formFields: input.formFields,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: false,
                    user: response.user,
                });
            }
            return response;
        },
        doesEmailExist: async function (input: { email: string; config: NormalisedConfig; userContext: any }): Promise<{
            status: "OK";
            doesExist: boolean;
            fetchResponse: Response;
        }> {
            return await webJsRecipe.recipeImplementation.doesEmailExist({
                config: webJsRecipe.config,
                email: input.email,
                userContext: input.userContext,
            });
        },
    };
}
