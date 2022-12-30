import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import { OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import { NormalisedAppInfo } from "../../types";
import {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../recipeModule/types";
import WebJSRecipe from "supertokens-web-js/recipe/emailverification";

export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
}): RecipeInterface {
    return {
        verifyEmail: async function (input): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await WebJSRecipe.verifyEmail.bind(this)({
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
            const response = await WebJSRecipe.sendVerificationEmail.bind(this)({
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
            const response = await WebJSRecipe.isEmailVerified.bind(this)({
                ...input,
            });

            return response;
        },

        getEmailVerificationTokenFromURL: function (input) {
            return WebJSRecipe.getEmailVerificationTokenFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}
