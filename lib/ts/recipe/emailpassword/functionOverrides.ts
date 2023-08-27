import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";

export const getFunctionOverrides =
    (onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        submitNewPassword: async function (input) {
            const response = await originalImp.submitNewPassword({
                ...input,
                formFields: [input.formFields[0]],
            });

            if (response.status === "OK") {
                onHandleEvent({
                    action: "PASSWORD_RESET_SUCCESSFUL",
                    email: response.email,
                    user: response.user,
                    userContext: input.userContext,
                });
            }

            return response;
        },

        sendPasswordResetEmail: async function (input) {
            const response = await originalImp.sendPasswordResetEmail(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "RESET_PASSWORD_EMAIL_SENT",
                    email: input.formFields.find(({ id }) => id === "email")!.value,
                    userContext: input.userContext,
                });
            }
            return response;
        },

        signUp: async function (input) {
            const response = await originalImp.signUp(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "SUCCESS",
                    isNewRecipeUser: true,
                    user: response.user,
                    userContext: input.userContext,
                });
            }

            return response;
        },
        signIn: async function (input) {
            const response = await originalImp.signIn(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "SUCCESS",
                    isNewRecipeUser: false,
                    user: response.user,
                    userContext: input.userContext,
                });
            }
            return response;
        },
    });
