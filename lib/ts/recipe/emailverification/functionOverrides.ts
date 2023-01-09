import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";

export const getFunctionOverrides =
    (onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        verifyEmail: async function (input): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await originalImp.verifyEmail(input);

            if (response.status === "OK") {
                onHandleEvent?.({
                    action: "EMAIL_VERIFIED_SUCCESSFUL",
                    userContext: input.userContext,
                });
            }

            return response;
        },

        sendVerificationEmail: async function (input): Promise<{
            status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await originalImp.sendVerificationEmail(input);

            if (response.status === "OK") {
                onHandleEvent?.({
                    action: "VERIFY_EMAIL_SENT",
                    userContext: input.userContext,
                });
            }

            return response;
        },

        isEmailVerified: async function (input): Promise<{
            status: "OK";
            isVerified: boolean;
            fetchResponse: Response;
        }> {
            return originalImp.isEmailVerified(input);
        },

        getEmailVerificationTokenFromURL: function (input) {
            return originalImp.getEmailVerificationTokenFromURL({
                userContext: input.userContext,
            });
        },
    });
