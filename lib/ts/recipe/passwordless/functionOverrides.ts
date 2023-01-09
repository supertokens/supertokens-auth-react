import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext } from "./types";

export const getFunctionOverrides =
    (onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        createCode: async function (input) {
            const response = await originalImp.createCode(input);

            if (response.status === "OK") {
                onHandleEvent?.({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: false,
                });
            }

            return response;
        },
        resendCode: async function (input) {
            const response = await originalImp.resendCode(input);

            if (response.status === "RESTART_FLOW_ERROR") {
                onHandleEvent?.({
                    action: "PASSWORDLESS_RESTART_FLOW",
                });
            } else if (response.status === "OK") {
                onHandleEvent?.({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: true,
                });
            }
            return response;
        },
        consumeCode: async function (input) {
            const response = await originalImp.consumeCode(input);

            if (response.status === "RESTART_FLOW_ERROR") {
                onHandleEvent?.({
                    action: "PASSWORDLESS_RESTART_FLOW",
                });
            } else if (response.status === "OK") {
                onHandleEvent?.({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
                    user: response.user,
                });
            }
            return response;
        },
        getLinkCodeFromURL: function (input) {
            return originalImp.getLinkCodeFromURL(input);
        },
        getPreAuthSessionIdFromURL: function (input) {
            return originalImp.getPreAuthSessionIdFromURL(input);
        },
        doesEmailExist: async function (input) {
            return await originalImp.doesEmailExist(input);
        },
        doesPhoneNumberExist: async function (input) {
            return await originalImp.doesPhoneNumberExist(input);
        },
        getLoginAttemptInfo: function <CustomAttemptInfoProperties>(input: { userContext: any }) {
            return originalImp.getLoginAttemptInfo<CustomAttemptInfoProperties>(input);
        },
        setLoginAttemptInfo: async function (input) {
            return originalImp.setLoginAttemptInfo(input);
        },
        clearLoginAttemptInfo: function (input) {
            return originalImp.clearLoginAttemptInfo(input);
        },
    });
