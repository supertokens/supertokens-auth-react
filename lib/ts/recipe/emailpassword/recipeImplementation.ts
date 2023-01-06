import { OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import { User } from "../authRecipe/types";
import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import { NormalisedAppInfo } from "../../types";
import {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../recipeModule/types";

export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
    webJSRecipe: RecipeInterface;
}): RecipeInterface {
    const { webJSRecipe } = recipeInput;
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
            const response = await webJSRecipe.submitNewPassword.bind(this)({
                ...input,
                formFields: [input.formFields[0]],
            });

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "PASSWORD_RESET_SUCCESSFUL",
                    userContext: input.userContext,
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
            const response = await webJSRecipe.sendPasswordResetEmail.bind(this)({
                ...input,
            });

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "RESET_PASSWORD_EMAIL_SENT",
                    userContext: input.userContext,
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
            const response = await webJSRecipe.signUp.bind(this)({
                ...input,
            });

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: true,
                    user: response.user,
                    userContext: input.userContext,
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
            const response = await webJSRecipe.signIn.bind(this)({
                ...input,
            });

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: false,
                    user: response.user,
                    userContext: input.userContext,
                });
            }
            return response;
        },
        doesEmailExist: async function (input): Promise<{
            status: "OK";
            doesExist: boolean;
            fetchResponse: Response;
        }> {
            return await webJSRecipe.doesEmailExist.bind(this)({
                ...input,
            });
        },

        getResetPasswordTokenFromURL: function (input): string {
            return webJSRecipe.getResetPasswordTokenFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}
