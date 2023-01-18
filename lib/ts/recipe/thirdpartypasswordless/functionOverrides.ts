import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";
import { getRedirectToPathFromURL } from "../../utils";

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        thirdPartySignInAndUp: async function (input) {
            const response = await originalImp.thirdPartySignInAndUp(input);

            if (response.status === "OK") {
                onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
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
            const response = await originalImp.consumePasswordlessCode(input);

            if (response.status === "RESTART_FLOW_ERROR") {
                onHandleEvent({
                    action: "PASSWORDLESS_RESTART_FLOW",
                });
            } else if (response.status === "OK") {
                onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
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
