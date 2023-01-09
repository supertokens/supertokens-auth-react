import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";

export const getFunctionOverrides =
    (onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>) => (originalImp: RecipeInterface) => ({
        submitNewPassword: async function (input: any) {
            const response = await originalImp.submitNewPassword({
                ...input,
                formFields: [input.formFields[0]],
            });

            if (response.status === "OK") {
                onHandleEvent?.({
                    action: "PASSWORD_RESET_SUCCESSFUL",
                    userContext: input.userContext,
                });
            }

            return response;
        },

        sendPasswordResetEmail: async function (input: any) {
            const response = await originalImp.sendPasswordResetEmail(input);

            if (response.status === "OK") {
                onHandleEvent?.({
                    action: "RESET_PASSWORD_EMAIL_SENT",
                    userContext: input.userContext,
                });
            }
            return response;
        },

        signUp: async function (input: any) {
            const response = await originalImp.signUp(input);

            if (response.status === "OK") {
                onHandleEvent?.({
                    action: "SUCCESS",
                    isNewUser: true,
                    user: response.user,
                    userContext: input.userContext,
                });
            }

            return response;
        },
        signIn: async function (input: any) {
            const response = await originalImp.signIn(input);

            if (response.status === "OK") {
                onHandleEvent?.({
                    action: "SUCCESS",
                    isNewUser: false,
                    user: response.user,
                    userContext: input.userContext,
                });
            }
            return response;
        },
        doesEmailExist: async function (input: any) {
            return await originalImp.doesEmailExist(input);
        },

        getResetPasswordTokenFromURL: function (input: any): string {
            return originalImp.getResetPasswordTokenFromURL({
                userContext: input.userContext,
            });
        },
    });
