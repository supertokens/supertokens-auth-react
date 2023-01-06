import { OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import { NormalisedAppInfo } from "../../types";
import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../recipeModule/types";

export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
    webJSRecipe: RecipeInterface;
}): RecipeInterface {
    const { webJSRecipe } = recipeInput;
    return {
        createCode: async function (input) {
            const response = await webJSRecipe.createCode.bind(this)(input);

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "PASSWORDLESS_CODE_SENT",
                    isResend: false,
                });
            }

            return response;
        },
        resendCode: async function (input) {
            const response = await webJSRecipe.resendCode.bind(this)(input);

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
            const response = await webJSRecipe.consumeCode.bind(this)(input);

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
            return webJSRecipe.getLinkCodeFromURL.bind(this)(input);
        },
        getPreAuthSessionIdFromURL: function (input) {
            return webJSRecipe.getPreAuthSessionIdFromURL.bind(this)(input);
        },
        doesEmailExist: async function (input) {
            return await webJSRecipe.doesEmailExist.bind(this)(input);
        },

        doesPhoneNumberExist: async function (input) {
            return await webJSRecipe.doesPhoneNumberExist.bind(this)(input);
        },
        getLoginAttemptInfo: function <CustomAttemptInfoProperties>(input: { userContext: any }) {
            return webJSRecipe.getLoginAttemptInfo.bind(this)<CustomAttemptInfoProperties>(input);
        },
        setLoginAttemptInfo: async function (input) {
            return webJSRecipe.setLoginAttemptInfo.bind(this)(input);
        },
        clearLoginAttemptInfo: function (input) {
            return webJSRecipe.clearLoginAttemptInfo.bind(this)(input);
        },
    };
}
