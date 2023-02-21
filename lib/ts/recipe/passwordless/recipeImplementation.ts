import { getRecipeImplementation as WebJSRecipeImplementation } from "supertokens-web-js/recipe/passwordless/recipeImplementation";

import type { OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import type { NormalisedAppInfo } from "../../types";
import type {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";

export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
}): RecipeInterface {
    const webJsImplementation = WebJSRecipeImplementation({
        recipeId: recipeInput.recipeId,
        appInfo: recipeInput.appInfo,
        preAPIHook: recipeInput.preAPIHook,
        postAPIHook: recipeInput.postAPIHook,
    });

    return {
        createCode: async function (input) {
            const response = await webJsImplementation.createCode.bind(this)(input);

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: false,
                });
            }

            return response;
        },
        resendCode: async function (input) {
            const response = await webJsImplementation.resendCode.bind(this)(input);

            if (response.status === "RESTART_FLOW_ERROR") {
                recipeInput.onHandleEvent({
                    action: "PASSWORDLESS_RESTART_FLOW",
                });
            } else if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: true,
                });
            }
            return response;
        },
        consumeCode: async function (input) {
            const response = await webJsImplementation.consumeCode.bind(this)(input);

            if (response.status === "RESTART_FLOW_ERROR") {
                recipeInput.onHandleEvent({
                    action: "PASSWORDLESS_RESTART_FLOW",
                });
            } else if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
                    user: response.user,
                });
            }
            return response;
        },
        getLinkCodeFromURL: function (input) {
            return webJsImplementation.getLinkCodeFromURL.bind(this)(input);
        },
        getPreAuthSessionIdFromURL: function (input) {
            return webJsImplementation.getPreAuthSessionIdFromURL.bind(this)(input);
        },
        doesEmailExist: async function (input) {
            return await webJsImplementation.doesEmailExist.bind(this)(input);
        },

        doesPhoneNumberExist: async function (input) {
            return await webJsImplementation.doesPhoneNumberExist.bind(this)(input);
        },
        getLoginAttemptInfo: function <CustomAttemptInfoProperties>(input: { userContext: any }) {
            return webJsImplementation.getLoginAttemptInfo.bind(this)<CustomAttemptInfoProperties>(input);
        },
        setLoginAttemptInfo: async function (input) {
            return webJsImplementation.setLoginAttemptInfo.bind(this)(input);
        },
        clearLoginAttemptInfo: function (input) {
            return webJsImplementation.clearLoginAttemptInfo.bind(this)(input);
        },
    };
}
