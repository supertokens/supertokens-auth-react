import { OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import { NormalisedAppInfo } from "../../types";
import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../recipeModule/types";
import WebJSRecipe from "supertokens-web-js/recipe/passwordless";

export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
}): RecipeInterface {
    return {
        createCode: async function (input) {
            const response = await WebJSRecipe.createCode.bind(this)(input);

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: false,
                });
            }

            return response;
        },
        resendCode: async function (input) {
            const response = await WebJSRecipe.resendCode.bind(this)(input);

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
            const response = await WebJSRecipe.consumeCode.bind(this)(input);

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
            return WebJSRecipe.getLinkCodeFromURL.bind(this)(input);
        },
        getPreAuthSessionIdFromURL: function (input) {
            return WebJSRecipe.getPreAuthSessionIdFromURL.bind(this)(input);
        },
        doesEmailExist: async function (input) {
            return await WebJSRecipe.doesEmailExist.bind(this)(input);
        },

        doesPhoneNumberExist: async function (input) {
            return await WebJSRecipe.doesPhoneNumberExist.bind(this)(input);
        },
        getLoginAttemptInfo: function <CustomAttemptInfoProperties>(input: { userContext: any }) {
            return WebJSRecipe.getLoginAttemptInfo.bind(this)<CustomAttemptInfoProperties>(input);
        },
        setLoginAttemptInfo: async function (input) {
            return WebJSRecipe.setLoginAttemptInfo.bind(this)(input);
        },
        clearLoginAttemptInfo: function (input) {
            return WebJSRecipe.clearLoginAttemptInfo.bind(this)(input);
        },
    };
}
