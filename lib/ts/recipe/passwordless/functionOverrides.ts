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
            const response = await originalImp.consumeCode(input);

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
