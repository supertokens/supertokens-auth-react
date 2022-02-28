import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import { NormalisedConfig } from "./types";

export default function getRecipeImplementation(
    webJsImplementation: RecipeInterface,
    authReactConfig: NormalisedConfig
): RecipeInterface {
    return {
        verifyEmail: async function (input): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.verifyEmail({
                config: input.config,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                authReactConfig.onHandleEvent({
                    action: "EMAIL_VERIFIED_SUCCESSFUL",
                });
            }

            return response;
        },

        sendVerificationEmail: async function (input): Promise<{
            status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.sendVerificationEmail({
                config: input.config,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                authReactConfig.onHandleEvent({
                    action: "VERIFY_EMAIL_SENT",
                });
            }

            return response;
        },

        isEmailVerified: async function (input): Promise<{
            status: "OK";
            isVerified: boolean;
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.isEmailVerified({
                config: input.config,
                userContext: input.userContext,
            });

            return response;
        },

        getEmailVerificationTokenFromURL: function (input) {
            return webJsImplementation.getEmailVerificationTokenFromURL({
                config: input.config,
                userContext: input.userContext,
            });
        },
    };
}
