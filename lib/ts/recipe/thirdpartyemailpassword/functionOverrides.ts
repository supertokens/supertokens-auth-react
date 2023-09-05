import { getRedirectToPathFromURL } from "../../utils";

import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        thirdPartySignInAndUp: async function (input) {
            const response = await originalImp.thirdPartySignInAndUp(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "SUCCESS",
                    isNewRecipeUser: response.createdNewRecipeUser,
                    user: response.user,
                    userContext: input.userContext,
                });
            }

            return response;
        },

        setStateAndOtherInfoToStorage: function (input) {
            return originalImp.setStateAndOtherInfoToStorage<{
                rid?: string;
                redirectToPath?: string;
            }>({
                state: {
                    ...input.state,
                    rid: recipeId,
                    redirectToPath: getRedirectToPathFromURL(),
                },
                userContext: input.userContext,
            });
        },
        submitNewPassword: async function (input) {
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

        emailPasswordSignUp: async function (input) {
            const response = await originalImp.emailPasswordSignUp(input);

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
        emailPasswordSignIn: async function (input) {
            const response = await originalImp.emailPasswordSignIn(input);

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
