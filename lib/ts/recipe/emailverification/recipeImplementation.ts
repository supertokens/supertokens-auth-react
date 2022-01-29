import { RecipeInterface, NormalisedConfig } from "./types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
import Session from "../session/recipe";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const querier = new Querier(recipeId, appInfo);
    return {
        verifyEmail: async function (input: {
            token: string;
            config: NormalisedConfig;
        }): Promise<{ status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK" }> {
            const response: VerifyEmailAPIResponse = await querier.post(
                "/user/email/verify",
                {
                    body: JSON.stringify({
                        method: "token",
                        token: input.token,
                    }),
                },
                (context) => {
                    return input.config.preAPIHook({
                        ...context,
                        action: "VERIFY_EMAIL",
                    });
                }
            );

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "EMAIL_VERIFIED_SUCCESSFUL",
                });
            }

            return response;
        },

        sendVerificationEmail: async function (input: {
            config: NormalisedConfig;
        }): Promise<{ status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK" }> {
            const response: SendVerifyEmailAPIResponse = await querier.post(
                "/user/email/verify/token",
                {
                    body: JSON.stringify({}),
                },
                async (context) => {
                    return input.config.preAPIHook({
                        ...context,
                        action: "SEND_VERIFY_EMAIL",
                    });
                }
            );

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "VERIFY_EMAIL_SENT",
                });
            }

            return response;
        },

        isEmailVerified: async function (input: { config: NormalisedConfig }): Promise<boolean> {
            const accessTokenPayload = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely();
            const tokenGrant = accessTokenPayload["st-grant-email-verified"];
            if (tokenGrant) {
                return tokenGrant.v;
            }
            const response: IsEmailVerifiedAPIResponse = await querier.get(
                "/user/email/verify",
                {},
                undefined,
                async (context) => {
                    return input.config.preAPIHook({
                        ...context,
                        action: "IS_EMAIL_VERIFIED",
                    });
                }
            );
            return response.isVerified;
        },
    };
}

type VerifyEmailAPIResponse = {
    status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
};

type SendVerifyEmailAPIResponse = {
    status: "OK" | "EMAIL_ALREADY_VERIFIED_ERROR";
};

type IsEmailVerifiedAPIResponse = {
    status: "OK";
    isVerified: boolean;
};
