import { NormalisedConfig, StateObject } from "./types";
import { User } from "../authRecipeWithEmailVerification/types";
import { getRedirectToPathFromURL } from "../../utils";
import { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";
import { NormalisedInputType } from "supertokens-web-js/lib/build/recipe/thirdparty/types";

export default function getRecipeImplementation(
    webJsRecipe: RecipeInterface,
    authReactConfig: NormalisedConfig
): RecipeInterface {
    return {
        getAuthorisationURLFromBackend: async function (input): Promise<{
            status: "OK";
            url: string;
            fetchResponse: Response;
        }> {
            const response = await webJsRecipe.getAuthorisationURLFromBackend({
                providerId: input.providerId,
                config: input.config,
                userContext: input.userContext,
            });

            return response;
        },

        signInAndUp: async function (input): Promise<
            | {
                  status: "OK";
                  user: User;
                  createdNewUser: boolean;
                  fetchResponse: Response;
              }
            | {
                  status: "NO_EMAIL_GIVEN_BY_PROVIDER";
                  fetchResponse: Response;
              }
        > {
            const response = await webJsRecipe.signInAndUp({
                config: input.config,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                authReactConfig.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
                    user: response.user,
                });
            }

            return response;
        },
        getStateAndOtherInfoFromStorage: function <CustomStateProperties>(input: {
            config: NormalisedInputType;
            userContext: any;
        }): (StateObject & CustomStateProperties) | undefined {
            return webJsRecipe.getStateAndOtherInfoFromStorage<CustomStateProperties>({
                config: input.config,
                userContext: input.userContext,
            });
        },

        setStateAndOtherInfoToStorage: function (input): void {
            return webJsRecipe.setStateAndOtherInfoToStorage<{
                rid?: string;
                redirectToPath?: string;
            }>({
                config: input.config,
                state: {
                    ...input.state,
                    rid: authReactConfig.recipeId,
                    redirectToPath: getRedirectToPathFromURL(),
                },
                userContext: input.userContext,
            });
        },

        getAuthorizationURLWithQueryParamsAndSetState: async function (input) {
            return webJsRecipe.getAuthorizationURLWithQueryParamsAndSetState({
                ...input,
            });
        },

        getAuthStateFromURL: function (input): string | undefined {
            return webJsRecipe.getAuthStateFromURL(input);
        },

        generateStateToSendToOAuthProvider: function (input) {
            return webJsRecipe.generateStateToSendToOAuthProvider({
                ...input,
                config: input.config,
            });
        },
        verifyAndGetStateOrThrowError: function (input) {
            return webJsRecipe.verifyAndGetStateOrThrowError({
                stateFromAuthProvider: input.stateFromAuthProvider,
                stateObjectFromStorage: input.stateObjectFromStorage,
                config: input.config,
                userContext: input.userContext,
            });
        },

        getAuthCodeFromURL: function (input): string {
            return webJsRecipe.getAuthCodeFromURL({
                config: input.config,
                userContext: input.userContext,
            });
        },

        getAuthErrorFromURL: function (input): string | undefined {
            return webJsRecipe.getAuthErrorFromURL({
                config: input.config,
                userContext: input.userContext,
            });
        },
    };
}
