import { RecipeInterface, NormalisedConfig } from "./types";
import WebJSEmailVerification from "supertokens-web-js/lib/build/recipe/emailverification/recipe";

export default function getRecipeImplementation(webJsImplementation: WebJSEmailVerification): RecipeInterface {
    return {
        verifyEmail: async function (input: { token: string; config: NormalisedConfig; userContext: any }): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.recipeImplementation.verifyEmail({
                config: webJsImplementation.config,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "EMAIL_VERIFIED_SUCCESSFUL",
                });
            }

            return response;
        },

        sendVerificationEmail: async function (input: { config: NormalisedConfig; userContext: any }): Promise<{
            status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.recipeImplementation.sendVerificationEmail({
                config: webJsImplementation.config,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "VERIFY_EMAIL_SENT",
                });
            }

            return response;
        },

        isEmailVerified: async function (input: { config: NormalisedConfig; userContext: any }): Promise<{
            status: "OK";
            isVerified: boolean;
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.recipeImplementation.isEmailVerified({
                config: webJsImplementation.config,
                userContext: input.userContext,
            });

            return response;
        },
    };
}
