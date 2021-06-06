import { RecipeInterface, NormalisedConfig, StateObject } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
import { appendQueryParamsToURL, getWindowOrThrow, getQueryParams } from "../../utils";

export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;

    constructor(recipeId: string, appInfo: NormalisedAppInfo) {
        this.querier = new Querier(recipeId, appInfo);
    }

    getOAuthAuthorisationURL = async (input: { thirdPartyId: string; config: NormalisedConfig }): Promise<string> => {
        const response: AuthorisationURLAPIResponse = await this.querier.get(
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
    };

    signInAndUp = async (input: {
        thirdPartyId: string;
        config: NormalisedConfig;
    }): Promise<
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
    > => {
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

        const response: SignInAndUpAPIResponse = await this.querier.post(
            "/signinup",
            {
                body: JSON.stringify({
                    code,
                    thirdPartyId: input.thirdPartyId,
                    redirectURI,
                }),
            },
            (context) => {
                return input.config.preAPIHook({
                    ...context,
                    action: "SIGN_IN",
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
    };

    getOAuthState = (): StateObject | undefined => {
        try {
            const state = JSON.parse(getWindowOrThrow().sessionStorage.getItem("supertokens-oauth-state"));
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
    };

    setOAuthState = (state: StateObject) => {
        const expiresAt = Date.now() + 1000 * 60 * 10; // 10 minutes expiry.
        const value = JSON.stringify({
            redirectToPath: state.redirectToPath,
            state: state.state,
            thirdPartyId: state.thirdPartyId,
            rid: state.rid,
            expiresAt,
        });
        getWindowOrThrow().sessionStorage.setItem("supertokens-oauth-state", value);
    };

    redirectToThirdPartyLogin = async (input: {
        thirdPartyId: string;
        config: NormalisedConfig;
        state?: StateObject;
    }): Promise<{ status: "OK" | "ERROR" }> => {
        const provider = input.config.signInAndUpFeature.providers.find((p) => p.id === input.thirdPartyId);
        if (provider === undefined) {
            return { status: "ERROR" };
        }

        // 1. Generate state.
        const state =
            input.state === undefined || input.state.state === undefined ? provider.generateState() : input.state.state;

        // 2. Store state in Session Storage.
        this.setOAuthState({
            ...input.state,
            rid: input.state === undefined || input.state.rid === undefined ? input.config.recipeId : input.state.rid,
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

        const urlWithState = appendQueryParamsToURL(url, {
            state,
            redirect_uri: provider.getRedirectURL(),
        });

        // 4. Redirect to provider authorisation URL.
        getWindowOrThrow().location.href = urlWithState;

        return { status: "OK" };
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
