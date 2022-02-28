import { RecipeInterface, NormalisedConfig, StateObject } from "./types";
import { User } from "../authRecipeWithEmailVerification/types";
import { getRedirectToPathFromURL, redirectWithFullPageReload } from "../../utils";
import WebJSThirdPartyRecipe from "supertokens-web-js/lib/build/recipe/thirdparty/recipe";

export default function getRecipeImplementation(webJsRecipe: WebJSThirdPartyRecipe, recipeId: string): RecipeInterface {
    return {
        getAuthorisationURLFromBackend: async function (input: {
            thirdPartyId: string;
            config: NormalisedConfig;
            userContext: any;
        }): Promise<{
            status: "OK";
            url: string;
            fetchResponse: Response;
        }> {
            const response = await webJsRecipe.recipeImplementation.getAuthorisationURLFromBackend({
                providerId: input.thirdPartyId,
                config: webJsRecipe.config,
                userContext: input.userContext,
            });

            return response;
        },

        signInAndUp: async function (input: { config: NormalisedConfig; userContext: any }): Promise<
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
            const response = await webJsRecipe.recipeImplementation.signInAndUp({
                config: webJsRecipe.config,
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
                    user: response.user,
                });
            }

            return response;
        },
        getStateAndOtherInfoFromStorage: function (input: {
            userContext: any;
            config: NormalisedConfig;
        }): StateObject | undefined {
            return webJsRecipe.recipeImplementation.getStateAndOtherInfoFromStorage<{
                rid?: string;
                redirectToPath?: string;
            }>({
                config: webJsRecipe.config,
                userContext: input.userContext,
            });
        },

        setStateAndOtherInfoToStorage: function (input: {
            state: StateObject;
            config: NormalisedConfig;
            userContext: any;
        }): void {
            return webJsRecipe.recipeImplementation.setStateAndOtherInfoToStorage<{
                rid?: string;
                redirectToPath?: string;
            }>({
                config: webJsRecipe.config,
                state: {
                    ...input.state,
                    rid: recipeId,
                    redirectToPath: getRedirectToPathFromURL(),
                },
                userContext: input.userContext,
            });
        },

        redirectToThirdPartyLogin: async function (input: {
            thirdPartyId: string;
            config: NormalisedConfig;
            userContext: any;
        }): Promise<{ status: "OK" | "ERROR" }> {
            const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);
            if (provider === undefined) {
                return { status: "ERROR" };
            }

            const response = await webJsRecipe.recipeImplementation.getAuthorizationURLWithQueryParamsAndSetState({
                config: webJsRecipe.config,
                providerId: input.thirdPartyId,
                authorisationURL: provider.getRedirectURL(),
                providerClientId: provider.clientId,
                userContext: input.userContext,
            });

            // 4. Redirect to provider authorisation URL.
            redirectWithFullPageReload(response);

            return { status: "OK" };
        },
        generateStateToSendToOAuthProvider: function (input) {
            return webJsRecipe.recipeImplementation.generateStateToSendToOAuthProvider({
                ...input,
                config: webJsRecipe.config,
            });
        },
        verifyAndGetStateOrThrowError: function (input) {
            return webJsRecipe.recipeImplementation.verifyAndGetStateOrThrowError({
                stateFromAuthProvider: input.stateFromAuthProvider,
                stateObjectFromStorage: input.stateObjectFromStorage,
                config: webJsRecipe.config,
                userContext: input.userContext,
            });
        },

        getAuthCodeFromURL: function (input): string {
            return webJsRecipe.recipeImplementation.getAuthCodeFromURL({
                config: webJsRecipe.config,
                userContext: input.userContext,
            });
        },

        getAuthErrorFromURL: function (input): string | undefined {
            return webJsRecipe.recipeImplementation.getAuthErrorFromURL({
                config: webJsRecipe.config,
                userContext: input.userContext,
            });
        },
    };
}
