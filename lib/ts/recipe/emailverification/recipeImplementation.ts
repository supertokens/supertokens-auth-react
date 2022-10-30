import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import { OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import { getRecipeImplementation as WebJSRecipeImplementation } from "supertokens-web-js/lib/build/recipe/emailverification/recipeImplementation";
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
}): RecipeInterface {
    const webJsImplementation = WebJSRecipeImplementation(recipeInput);

    return {
        verifyEmail: async function (input): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.verifyEmail.bind(this)({
                ...input,
            });

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
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
            const response = await webJsImplementation.sendVerificationEmail.bind(this)({
                ...input,
            });

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
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
            const response = await webJsImplementation.isEmailVerified.bind(this)({
                ...input,
            });

            return response;
        },

        getEmailVerificationTokenFromURL: function (input) {
            return webJsImplementation.getEmailVerificationTokenFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}
