import { RecipeInterface, NormalisedConfig, StateObject } from "./types";
import { User } from "../authRecipeWithEmailVerification/types";
import { redirectWithFullPageReload } from "../../utils";
import WebJSThirdPartyRecipe from "supertokens-web-js/lib/build/recipe/thirdparty/recipe";
import STGeneralError from "supertokens-web-js/lib/build/error";

export default function getRecipeImplementation(webJsRecipe: WebJSThirdPartyRecipe): RecipeInterface {
    return {
        getOAuthAuthorisationURLFromBackend: async function (input: {
            thirdPartyId: string;
            config: NormalisedConfig;
            userContext: any;
        }): Promise<{
            status: "OK";
            url: string;
            fetchResponse: Response;
        }> {
            const response = await webJsRecipe.recipeImplementation.getOAuthAuthorisationURLFromBackend({
                providerId: input.thirdPartyId,
                config: webJsRecipe.config,
                userContext: input.userContext,
            });

            return response;
        },

        signInAndUp: async function (input: {
            thirdPartyId: string;
            config: NormalisedConfig;
            userContext: any;
            authCode?: string;
        }): Promise<
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
            const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);

            if (provider === undefined) {
                throw new STGeneralError("");
            }

            const response = await webJsRecipe.recipeImplementation.signInAndUp({
                config: webJsRecipe.config,
                providerId: input.thirdPartyId,
                providerClientId: provider.clientId,
                redirectionURL: provider.getRedirectURL(),
                userContext: input.userContext,
                authCode: input.authCode,
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
        getStateAndOtherInfoFromStorage: function <CustomStateProperties>(input: {
            userContext: any;
            config: NormalisedConfig;
        }): (StateObject & CustomStateProperties) | undefined {
            return webJsRecipe.recipeImplementation.getStateAndOtherInfoFromStorage<CustomStateProperties>({
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
                    stateForAuthProvider: input.state.state,
                    thirdPartyId: input.state.thirdPartyId,
                    rid: input.state.rid,
                    redirectToPath: input.state.redirectToPath,
                },
                userContext: input.userContext,
            });
        },

        redirectToThirdPartyLogin: async function (input: {
            thirdPartyId: string;
            config: NormalisedConfig;
            state?: StateObject;
            userContext: any;
        }): Promise<{ status: "OK" | "ERROR" }> {
            const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);
            if (provider === undefined) {
                return { status: "ERROR" };
            }

            const response = await webJsRecipe.recipeImplementation.getLoginRedirectURLWithQueryParamsAndSetState({
                config: webJsRecipe.config,
                providerId: input.thirdPartyId,
                redirectionURL: provider.getRedirectURL(),
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
        verifyStateFromOAuthProvider: function (input) {
            return webJsRecipe.recipeImplementation.verifyStateFromOAuthProvider({
                ...input,
                config: webJsRecipe.config,
            });
        },
    };
}
