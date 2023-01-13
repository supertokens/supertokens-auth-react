import EmailPasswordWebJS from "supertokens-web-js/recipe/emailpassword";
import { WebJSRecipe } from "../../types";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";

type Recipe = WebJSRecipe<typeof EmailPasswordWebJS>;

export const getFunctionOverrides =
    (onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: Recipe): Recipe => ({
        ...originalImp,
        submitNewPassword: async function (input: any) {
            const response = await originalImp.submitNewPassword({
                ...input,
                formFields: [input.formFields[0]],
            });

            if (response.status === "OK") {
                onHandleEvent({
                    action: "PASSWORD_RESET_SUCCESSFUL",
                    userContext: input.userContext,
                });
            }

            return response;
        },

        sendPasswordResetEmail: async function (input: any) {
            const response = await originalImp.sendPasswordResetEmail(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "RESET_PASSWORD_EMAIL_SENT",
                    userContext: input.userContext,
                });
            }
            return response;
        },

        signUp: async function (input: any) {
            const response = await originalImp.signUp(input);

            if (response.status === "OK") {
                onHandleEvent({
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
                onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: false,
                    user: response.user,
                    userContext: input.userContext,
                });
            }
            return response;
        },
    });
