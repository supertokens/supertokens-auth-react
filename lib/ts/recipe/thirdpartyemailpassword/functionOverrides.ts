import { getRedirectToPathFromURL } from "../../utils";
import Session from "../session/recipe";

import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";

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

        setStateAndOtherInfoToStorage: function (input) {
            return originalImp.setStateAndOtherInfoToStorage<{
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
        submitNewPassword: async function (input) {
            const response = await originalImp.submitNewPassword({
                ...input,
                formFields: [input.formFields[0]],
            });

            if (response.status === "OK") {
                onHandleEvent({
                    action: "PASSWORD_RESET_SUCCESSFUL",
                    userContext: input.userContext,
                });
            }

            return response;
        },

        sendPasswordResetEmail: async function (input) {
            const response = await originalImp.sendPasswordResetEmail(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "RESET_PASSWORD_EMAIL_SENT",
                    email: input.formFields.find(({ id }) => id === "email")!.value,
                    userContext: input.userContext,
                });
            }
            return response;
        },

        emailPasswordSignUp: async function (input) {
            let payloadBeforeCall;
            try {
                payloadBeforeCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                    userContext: input.userContext,
                });
            } catch {
                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                payloadBeforeCall = undefined;
            }

            const response = await originalImp.emailPasswordSignUp(input);

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
                    isNewRecipeUser: true,
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
        emailPasswordSignIn: async function (input) {
            let payloadBeforeCall;
            try {
                payloadBeforeCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                    userContext: input.userContext,
                });
            } catch {
                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                payloadBeforeCall = undefined;
            }

            const response = await originalImp.emailPasswordSignIn(input);

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
                    isNewRecipeUser: false,
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
    });
