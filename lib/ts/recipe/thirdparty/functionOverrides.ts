import { getQueryParams, getRedirectToPathFromURL } from "../../utils";
import Session from "../session/recipe";

import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        signInAndUp: async function (input) {
            let payloadBeforeCall;
            try {
                payloadBeforeCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                    userContext: input.userContext,
                });
            } catch {
                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                payloadBeforeCall = undefined;
            }

            const response = await originalImp.signInAndUp(input);

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
                    user: response.user,
                    createdNewSession:
                        payloadAfterCall !== undefined &&
                        (payloadBeforeCall === undefined ||
                            payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                    userContext: input.userContext,
                });
            }

            return response;
        },

        setStateAndOtherInfoToStorage: function (input) {
            const loginChallenge = getQueryParams("loginChallenge") ?? undefined;
            return originalImp.setStateAndOtherInfoToStorage<{
                rid?: string;
                redirectToPath?: string;
            }>({
                state: {
                    ...input.state,
                    rid: recipeId,
                    oauth2LoginChallenge: loginChallenge,
                    redirectToPath: getRedirectToPathFromURL(),
                },
                userContext: input.userContext,
            });
        },
    });
