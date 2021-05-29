import { RecipeInterface, NormalisedConfig } from "./types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";

export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;

    constructor(recipeId: string, appInfo: NormalisedAppInfo) {
        this.querier = new Querier(recipeId, appInfo);
    }

    verifyEmail = async (input: {
        token: string;
        config: NormalisedConfig;
    }): Promise<{ status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK" }> => {
        const response: VerifyEmailAPIResponse = await this.querier.post(
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
    };

    sendVerificationEmail = async (input: {
        config: NormalisedConfig;
    }): Promise<{ status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK" }> => {
        const response: SendVerifyEmailAPIResponse = await this.querier.post(
            "/user/email/verify/token",
            {},
            (context) => {
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
    };

    isEmailVerified = async (input: { config: NormalisedConfig }): Promise<boolean> => {
        const response: IsEmailVerifiedAPIResponse = await this.querier.get(
            "/user/email/verify",
            {},
            undefined,
            (context) => {
                return input.config.preAPIHook({
                    ...context,
                    action: "IS_EMAIL_VERIFIED",
                });
            }
        );
        return response.isVerified;
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
