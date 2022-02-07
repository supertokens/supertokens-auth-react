import { RecipeInterface, NormalisedConfig } from "./types";
import WebJSEmailVerification from "supertokens-web-js/lib/build/recipe/emailverification/recipe";

export default function getRecipeImplementation(config: NormalisedConfig): RecipeInterface {
    const webJsImplementation = new WebJSEmailVerification({
        appInfo: config.appInfo,
        recipeId: config.recipeId,
        preAPIHook: config.preAPIHook,
    });
    return {
        verifyEmail: async function (input: {
            token: string;
            config: NormalisedConfig;
            userContext: any;
        }): Promise<{ status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK" }> {
            const response = await webJsImplementation.recipeImplementation.verifyEmail({
                token: input.token,
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

        sendVerificationEmail: async function (input: {
            config: NormalisedConfig;
            userContext: any;
        }): Promise<{ status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK" }> {
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

        isEmailVerified: async function (input: { config: NormalisedConfig; userContext: any }): Promise<boolean> {
            const response = await webJsImplementation.recipeImplementation.isEmailVerified({
                config: webJsImplementation.config,
                userContext: input.userContext,
            });

            return response.isVerified;
        },
    };
}
