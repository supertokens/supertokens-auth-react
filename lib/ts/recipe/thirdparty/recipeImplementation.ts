import { OnHandleEventContext, PreAndPostAPIHookAction, StateObject } from "./types";
import { getRedirectToPathFromURL } from "../../utils";
import { RecipeInterface, ThirdPartyUserType } from "supertokens-web-js/recipe/thirdparty";
import { NormalisedAppInfo } from "../../types";
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
        getAuthorisationURLFromBackend: async function (input): Promise<{
            status: "OK";
            url: string;
            fetchResponse: Response;
        }> {
            const response = await webJSRecipe.getAuthorisationURLFromBackend.bind(this)({
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
            const response = await webJSRecipe.signInAndUp.bind(this)({
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
            return webJSRecipe.getStateAndOtherInfoFromStorage.bind(this)<CustomStateProperties>({
                userContext: input.userContext,
            });
        },

        setStateAndOtherInfoToStorage: function (input): Promise<void> {
            return webJSRecipe.setStateAndOtherInfoToStorage.bind(this)<{
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
            return webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState.bind(this)({
                ...input,
            });
        },

        getAuthStateFromURL: function (input): string {
            return webJSRecipe.getAuthStateFromURL.bind(this)(input);
        },

        generateStateToSendToOAuthProvider: function (input) {
            return webJSRecipe.generateStateToSendToOAuthProvider.bind(this)({
                ...input,
            });
        },
        verifyAndGetStateOrThrowError: function (input) {
            return webJSRecipe.verifyAndGetStateOrThrowError.bind(this)({
                stateFromAuthProvider: input.stateFromAuthProvider,
                stateObjectFromStorage: input.stateObjectFromStorage,
                userContext: input.userContext,
            });
        },

        getAuthCodeFromURL: function (input): string {
            return webJSRecipe.getAuthCodeFromURL.bind(this)({
                userContext: input.userContext,
            });
        },

        getAuthErrorFromURL: function (input): string | undefined {
            return webJSRecipe.getAuthErrorFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}
