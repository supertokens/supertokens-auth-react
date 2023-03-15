import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailverification";

export const getFunctionOverrides =
    (onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        verifyEmail: async function (input) {
            const response = await originalImp.verifyEmail(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "EMAIL_VERIFIED_SUCCESSFUL",
                    userContext: input.userContext,
                });
            }

            return response;
        },

        sendVerificationEmail: async function (input) {
            const response = await originalImp.sendVerificationEmail(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "VERIFY_EMAIL_SENT",
                    userContext: input.userContext,
                });
            }

            return response;
        },
    });
