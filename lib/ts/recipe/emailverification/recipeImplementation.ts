import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import { OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
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
        verifyEmail: async function (input): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await webJSRecipe.verifyEmail.bind(this)({
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
            const response = await webJSRecipe.sendVerificationEmail.bind(this)({
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
            const response = await webJSRecipe.isEmailVerified.bind(this)({
                ...input,
            });

            return response;
        },

        getEmailVerificationTokenFromURL: function (input) {
            return webJSRecipe.getEmailVerificationTokenFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}
