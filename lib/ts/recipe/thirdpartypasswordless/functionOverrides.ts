import { getRedirectToPathFromURL } from "../../utils";
import Session from "../session/recipe";

import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        thirdPartySignInAndUp: async function (input) {
            let payloadBeforeCall;
            try {
                payloadBeforeCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                    userContext: input.userContext,
                });
            } catch {
                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                payloadBeforeCall = undefined;
            }

            const response = await originalImp.thirdPartySignInAndUp(input);

            if (response.status === "OK") {
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
                    rid: "thirdparty",
                    isNewRecipeUser: response.createdNewRecipeUser,
                    createdNewSession:
                        payloadAfterCall !== undefined &&
                        (payloadBeforeCall === undefined ||
                            payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                    user: response.user,
                    userContext: input.userContext,
                });
            }

            return response;
        },

        setThirdPartyStateAndOtherInfoToStorage: function (input) {
            return originalImp.setThirdPartyStateAndOtherInfoToStorage<{
                rid?: string;
                redirectToPath?: string;
            }>({
                state: {
                    ...input.state,
                    rid: recipeId,
                    redirectToPath: getRedirectToPathFromURL(),
                },
                userContext: input.userContext,
            });
        },
        createPasswordlessCode: async function (input) {
            const response = await originalImp.createPasswordlessCode(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: false,
                });
            }

            return response;
        },
        resendPasswordlessCode: async function (input) {
            const response = await originalImp.resendPasswordlessCode(input);

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
        consumePasswordlessCode: async function (input) {
            let payloadBeforeCall;
            try {
                payloadBeforeCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                    userContext: input.userContext,
                });
            } catch {
                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                payloadBeforeCall = undefined;
            }

            const response = await originalImp.consumePasswordlessCode(input);

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
                    rid: "passwordless",
                    isNewRecipeUser: response.createdNewRecipeUser,
                    createdNewSession:
                        payloadAfterCall !== undefined &&
                        (payloadBeforeCall === undefined ||
                            payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                    user: response.user,
                });
            }
            return response;
        },
        setPasswordlessLoginAttemptInfo: async function (input) {
            return originalImp.setPasswordlessLoginAttemptInfo({
                ...input,
                attemptInfo: {
                    ...input.attemptInfo,
                    ...input.userContext.additionalAttemptInfo,
                },
            });
        },
    });
