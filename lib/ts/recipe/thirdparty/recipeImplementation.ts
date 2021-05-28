import { RecipeInterface, NormalisedConfig } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";

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
        code: string;
        redirectURI: string;
        config: NormalisedConfig;
    }): Promise<SignInAndUpAPIResponse> => {
        const response: SignInAndUpAPIResponse = await this.querier.post(
            "/signinup",
            {
                body: JSON.stringify({
                    code: input.code,
                    thirdPartyId: input.thirdPartyId,
                    redirectURI: input.redirectURI,
                }),
            },
            (context) => {
                return input.config.preAPIHook({
                    ...context,
                    action: "SIGN_IN",
                });
            }
        );

        return response;
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
