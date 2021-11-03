import { RecipeInterface, NormalisedConfig, StateObject } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
import {
    appendQueryParamsToURL,
    getSessionStorage,
    setSessionStorage,
    getQueryParams,
    redirectWithFullPageReload,
} from "../../utils";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): RecipeInterface {
    const querier = new Querier(recipeId, appInfo);
    return {
        getOAuthAuthorisationURL: async function (input: {
            thirdPartyId: string;
            config: NormalisedConfig;
        }): Promise<string> {
            const response: AuthorisationURLAPIResponse = await querier.get(
                "/authorisationurl",
                {},
                { thirdPartyId: input.thirdPartyId },
                (context) => {
                    return input.config.preAPIHook({
                        ...context,
                        action: "GET_AUTHORISATION_URL",
                    });
                }
            );

            return response.url;
        },

        signInAndUp: async function (input: { thirdPartyId: string; config: NormalisedConfig }): Promise<
            | {
                  status: "OK";
                  user: User;
                  createdNewUser: boolean;
              }
            | {
                  status: "NO_EMAIL_GIVEN_BY_PROVIDER" | "GENERAL_ERROR";
              }
            | {
                  status: "FIELD_ERROR";
                  error: string;
              }
        > {
            const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);

            const stateFromStorage = this.getOAuthState();

            const code = getQueryParams("code");

            const stateFromQueryParams = getQueryParams("state");

            if (
                getQueryParams("error") !== null ||
                stateFromStorage === undefined ||
                stateFromStorage.thirdPartyId !== input.thirdPartyId ||
                stateFromStorage.state !== stateFromQueryParams ||
                code === null ||
                provider === undefined
            ) {
                return { status: "GENERAL_ERROR" };
            }

            const redirectURI = await provider.getRedirectURL();

            const response: SignInAndUpAPIResponse = await querier.post(
                "/signinup",
                {
                    body: JSON.stringify({
                        code,
                        thirdPartyId: input.thirdPartyId,
                        redirectURI,
                        clientId: provider.clientId,
                    }),
                },
                (context) => {
                    return input.config.preAPIHook({
                        ...context,
                        action: "THIRD_PARTY_SIGN_IN_UP",
                    });
                }
            );

            if (response.status === "OK") {
                input.config.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
                    user: response.user,
                });
            }

            return response;
        },
        getOAuthState: function (): StateObject | undefined {
            try {
                const state = JSON.parse(getSessionStorage("supertokens-oauth-state"));
                if (state === null) {
                    return undefined;
                }

                if (Date.now() > state.expiresAt) {
                    return undefined;
                }

                return state;
            } catch (e) {
                return undefined;
            }
        },

        setOAuthState: function (state: StateObject) {
            const expiresAt = Date.now() + 1000 * 60 * 10; // 10 minutes expiry.
            const value = JSON.stringify({
                redirectToPath: state.redirectToPath,
                state: state.state,
                thirdPartyId: state.thirdPartyId,
                rid: state.rid,
                expiresAt,
            });
            setSessionStorage("supertokens-oauth-state", value);
        },

        redirectToThirdPartyLogin: async function (input: {
            thirdPartyId: string;
            config: NormalisedConfig;
            state?: StateObject;
        }): Promise<{ status: "OK" | "ERROR" }> {
            const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);
            if (provider === undefined) {
                return { status: "ERROR" };
            }

            // 1. Generate state.
            const state =
                input.state === undefined || input.state.state === undefined
                    ? provider.generateState()
                    : input.state.state;

            // 2. Store state in Session Storage.
            this.setOAuthState({
                ...input.state,
                rid:
                    input.state === undefined || input.state.rid === undefined
                        ? input.config.recipeId
                        : input.state.rid,
                thirdPartyId:
                    input.state === undefined || input.state.thirdPartyId === undefined
                        ? input.thirdPartyId
                        : input.state.thirdPartyId,
                state,
            });

            // 3. Get Authorisation URL.
            const url = await this.getOAuthAuthorisationURL({
                thirdPartyId: provider.id,
                config: input.config,
            });

            // for some third party providers, the redirect_uri is set on the backend itself (for example in the case of apple). In these cases, we don't set them here...
            const urlObj = new URL(url);
            const alreadyContainsRedirectURI = urlObj.searchParams.get("redirect_uri") !== null;

            const urlWithState = alreadyContainsRedirectURI
                ? appendQueryParamsToURL(url, {
                      state,
                  })
                : appendQueryParamsToURL(url, {
                      state,
                      redirect_uri: provider.getRedirectURL(),
                  });

            // 4. Redirect to provider authorisation URL.
            redirectWithFullPageReload(urlWithState);

            return { status: "OK" };
        },
    };
}
type SignInAndUpAPIResponse =
    | {
          status: "OK";
          createdNewUser: boolean;
          user: User;
      }
    | {
          status: "NO_EMAIL_GIVEN_BY_PROVIDER";
      }
    | {
          status: "FIELD_ERROR";
          error: string;
      };

type AuthorisationURLAPIResponse = {
    status: "OK";
    url: string;
};
