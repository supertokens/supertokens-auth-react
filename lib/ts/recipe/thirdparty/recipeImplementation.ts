import { getRecipeImplementation as WebJSRecipeImplementation } from "supertokens-web-js/recipe/thirdparty/recipeImplementation";

import { getRedirectToPathFromURL } from "../../utils";

import type { OnHandleEventContext, PreAndPostAPIHookAction, StateObject } from "./types";
import type { NormalisedAppInfo } from "../../types";
import type {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../recipeModule/types";
import type { RecipeInterface, ThirdPartyUserType } from "supertokens-web-js/recipe/thirdparty";

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
        getAuthorisationURLFromBackend: async function (input): Promise<{
            status: "OK";
            url: string;
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.getAuthorisationURLFromBackend.bind(this)({
                ...input,
            });

            return response;
        },

        signInAndUp: async function (input): Promise<
            | {
                  status: "OK";
                  user: ThirdPartyUserType;
                  createdNewUser: boolean;
                  fetchResponse: Response;
              }
            | {
                  status: "NO_EMAIL_GIVEN_BY_PROVIDER";
                  fetchResponse: Response;
              }
        > {
            const response = await webJsImplementation.signInAndUp.bind(this)({
                ...input,
            });

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
                    user: response.user,
                    userContext: input.userContext,
                });
            }

            return response;
        },
        getStateAndOtherInfoFromStorage: function <CustomStateProperties>(input: {
            userContext: any;
        }): (StateObject & CustomStateProperties) | undefined {
            return webJsImplementation.getStateAndOtherInfoFromStorage.bind(this)<CustomStateProperties>({
                userContext: input.userContext,
            });
        },

        setStateAndOtherInfoToStorage: function (input): Promise<void> {
            return webJsImplementation.setStateAndOtherInfoToStorage.bind(this)<{
                rid?: string;
                redirectToPath?: string;
            }>({
                state: {
                    ...input.state,
                    rid: recipeInput.recipeId,
                    redirectToPath: getRedirectToPathFromURL(),
                },
                userContext: input.userContext,
            });
        },

        getAuthorisationURLWithQueryParamsAndSetState: async function (input) {
            return webJsImplementation.getAuthorisationURLWithQueryParamsAndSetState.bind(this)({
                ...input,
            });
        },

        getAuthStateFromURL: function (input): string {
            return webJsImplementation.getAuthStateFromURL.bind(this)(input);
        },

        generateStateToSendToOAuthProvider: function (input) {
            return webJsImplementation.generateStateToSendToOAuthProvider.bind(this)({
                ...input,
            });
        },
        verifyAndGetStateOrThrowError: function (input) {
            return webJsImplementation.verifyAndGetStateOrThrowError.bind(this)({
                stateFromAuthProvider: input.stateFromAuthProvider,
                stateObjectFromStorage: input.stateObjectFromStorage,
                userContext: input.userContext,
            });
        },

        getAuthCodeFromURL: function (input): string {
            return webJsImplementation.getAuthCodeFromURL.bind(this)({
                userContext: input.userContext,
            });
        },

        getAuthErrorFromURL: function (input): string | undefined {
            return webJsImplementation.getAuthErrorFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}
