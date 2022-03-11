import { OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import { NormalisedAppInfo } from "../../types";
import { getRedirectToPathFromURL } from "../../utils";
import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../recipeModule/types";
import WebJSRecipeImplementation from "supertokens-web-js/lib/build/recipe/passwordless/recipeImplementation";

export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
}): RecipeInterface {
    const webJsImplementation = WebJSRecipeImplementation(
        recipeInput.recipeId,
        recipeInput.appInfo,
        recipeInput.preAPIHook,
        recipeInput.postAPIHook
    );

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
                    isNewUser: response.createdUser,
                    user: response.user,
                });
            }
            return response;
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
            return webJsImplementation.setLoginAttemptInfo.bind(this)<{
                redirectToPath?: string;
            }>({
                attemptInfo: {
                    ...input.attemptInfo,
                    redirectToPath: getRedirectToPathFromURL(),
                },
                userContext: input.userContext,
            });
        },
        clearLoginAttemptInfo: function (input) {
            return webJsImplementation.clearLoginAttemptInfo.bind(this)(input);
        },
    };
}
