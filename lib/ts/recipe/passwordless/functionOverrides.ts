import Session from "../session/recipe";

import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";

export const getFunctionOverrides =
    (onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        createCode: async function (input) {
            const response = await originalImp.createCode(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: false,
                });
            }

            return response;
        },
        resendCode: async function (input) {
            const response = await originalImp.resendCode(input);

            if (response.status === "RESTART_FLOW_ERROR") {
                onHandleEvent({
                    action: "PASSWORDLESS_RESTART_FLOW",
                });
            } else if (response.status === "OK") {
                onHandleEvent({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: true,
                });
            }
            return response;
        },
        consumeCode: async function (input) {
            let payloadBeforeCall;
            try {
                payloadBeforeCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                    userContext: input.userContext,
                });
            } catch {
                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                payloadBeforeCall = undefined;
            }

            const response = await originalImp.consumeCode(input);

            if (response.status === "RESTART_FLOW_ERROR") {
                onHandleEvent({
                    action: "PASSWORDLESS_RESTART_FLOW",
                });
            } else if (response.status === "OK") {
                let payloadAfterCall;
                try {
                    payloadAfterCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                        userContext: input.userContext,
                    });
                } catch {
                    // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                    payloadAfterCall = undefined;
                }

                onHandleEvent({
                    action: "SUCCESS",
                    isNewRecipeUser: response.createdNewRecipeUser,
                    user: response.user,
                    createdNewSession:
                        payloadAfterCall !== undefined &&
                        (payloadBeforeCall === undefined ||
                            payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                });
            }
            return response;
        },
        setLoginAttemptInfo: async function (input) {
            return originalImp.setLoginAttemptInfo({
                ...input,
                attemptInfo: {
                    ...input.attemptInfo,
                    ...input.userContext.additionalAttemptInfo,
                },
            });
        },
    });
