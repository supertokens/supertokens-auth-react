import EmailVerificationWebJS from "supertokens-web-js/recipe/emailverification";
import { WebJSRecipe } from "../../types";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";

type Recipe = WebJSRecipe<typeof EmailVerificationWebJS>;

export const getFunctionOverrides =
    (onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: Recipe): Recipe => ({
        ...originalImp,
        verifyEmail: async function (input): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await originalImp.verifyEmail(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "EMAIL_VERIFIED_SUCCESSFUL",
                    userContext: input?.userContext,
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
                onHandleEvent({
                    action: "VERIFY_EMAIL_SENT",
                    userContext: input?.userContext,
                });
            }

            return response;
        },
    });
