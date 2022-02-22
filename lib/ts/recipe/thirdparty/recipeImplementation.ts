import { RecipeInterface, NormalisedConfig, StateObject } from "./types";
import { User } from "../authRecipeWithEmailVerification/types";
import { redirectWithFullPageReload } from "../../utils";
import WebJSThirdPartyRecipe from "supertokens-web-js/lib/build/recipe/thirdparty/recipe";
import STGeneralError from "supertokens-web-js/lib/build/error";

export default function getRecipeImplementation(webJsRecipe: WebJSThirdPartyRecipe): RecipeInterface {
    return {
        getOAuthAuthorisationURL: async function (input: {
            thirdPartyId: string;
            config: NormalisedConfig;
            userContext: any;
        }): Promise<{
            status: "OK";
            url: string;
            fetchResponse: Response;
        }> {
            const response = await webJsRecipe.recipeImplementation.getOAuthAuthorisationURL({
                thirdPartyProviderId: input.thirdPartyId,
                config: webJsRecipe.config,
                userContext: input.userContext,
            });

            return response;
        },

        signInAndUp: async function (input: {
            thirdPartyId: string;
            config: NormalisedConfig;
            userContext: any;
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
            | {
                  status: "FIELD_ERROR";
                  error: string;
                  fetchResponse: Response;
              }
        > {
            const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);

            if (provider === undefined) {
                throw new STGeneralError("");
            }

            const response = await webJsRecipe.recipeImplementation.signInAndUp({
                config: webJsRecipe.config,
                thirdPartyProviderId: input.thirdPartyId,
                thirdPartyProviderClientId: provider.clientId,
                thirdPartyRedirectionURL: provider.getRedirectURL(),
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
        getOAuthState: function (input: { userContext: any; config: NormalisedConfig }): {
            status: "OK";
            state: StateObject | undefined;
        } {
            return webJsRecipe.recipeImplementation.getOAuthState({
                config: webJsRecipe.config,
                userContext: input.userContext,
            });
        },

        setOAuthState: function (input: { state: StateObject; config: NormalisedConfig; userContext: any }): {
            status: "OK";
        } {
            return webJsRecipe.recipeImplementation.setOAuthState({
                config: webJsRecipe.config,
                state: input.state,
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

            const response = await webJsRecipe.recipeImplementation.getThirdPartyLoginRedirectURLWithQueryParams({
                config: webJsRecipe.config,
                thirdPartyProviderId: input.thirdPartyId,
                thirdPartyRedirectionURL: provider.getRedirectURL(),
                userContext: input.userContext,
                state: input.state,
            });

            // 4. Redirect to provider authorisation URL.
            redirectWithFullPageReload(response.url);

            return { status: "OK" };
        },
    };
}
