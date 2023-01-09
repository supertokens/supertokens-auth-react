import { RecipeInterface, ThirdPartyUserType } from "supertokens-web-js/recipe/thirdparty";
import { getRedirectToPathFromURL } from "../../utils";
import { RecipeOnHandleEventFunction } from "../recipeModule/types";
import { OnHandleEventContext, StateObject } from "./types";

export const getFunctionOverrides =
    (recipeId: string, onHandleEvent?: RecipeOnHandleEventFunction<OnHandleEventContext>) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        getAuthorisationURLFromBackend: async function (input): Promise<{
            status: "OK";
            url: string;
            fetchResponse: Response;
        }> {
            const response = await originalImp.getAuthorisationURLFromBackend(input);

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
            const response = await originalImp.signInAndUp(input);

            if (response.status === "OK") {
                onHandleEvent?.({
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
            return originalImp.getStateAndOtherInfoFromStorage<CustomStateProperties>({
                userContext: input.userContext,
            });
        },

        setStateAndOtherInfoToStorage: function (input): Promise<void> {
            return originalImp.setStateAndOtherInfoToStorage<{
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

        getAuthorisationURLWithQueryParamsAndSetState: async function (input) {
            return originalImp.getAuthorisationURLWithQueryParamsAndSetState(input);
        },

        getAuthStateFromURL: function (input): string {
            return originalImp.getAuthStateFromURL(input);
        },

        generateStateToSendToOAuthProvider: function (input) {
            return originalImp.generateStateToSendToOAuthProvider({
                ...input,
            });
        },
        verifyAndGetStateOrThrowError: function (input) {
            return originalImp.verifyAndGetStateOrThrowError({
                stateFromAuthProvider: input.stateFromAuthProvider,
                stateObjectFromStorage: input.stateObjectFromStorage,
                userContext: input.userContext,
            });
        },

        getAuthCodeFromURL: function (input): string {
            return originalImp.getAuthCodeFromURL({
                userContext: input.userContext,
            });
        },

        getAuthErrorFromURL: function (input): string | undefined {
            return originalImp.getAuthErrorFromURL({
                userContext: input.userContext,
            });
        },
    });
