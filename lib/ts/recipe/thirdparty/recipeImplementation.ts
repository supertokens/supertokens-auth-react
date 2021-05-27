import { RecipeInterface, NormalisedConfig } from "./types";
import { User } from "../authRecipeModule/types";
import { PreAPIHookFunction } from "../../types";
import Querier from "../../querier";

export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;
    config: NormalisedConfig;

    constructor(config: NormalisedConfig) {
        this.querier = new Querier(config.recipeId, config.appInfo);
        this.config = config;
    }

    getOAuthAuthorisationURL = async (thirdPartyId: string, preAPIHook?: PreAPIHookFunction): Promise<string> => {
        const response: AuthorisationURLAPIResponse = await this.querier.get(
            "/authorisationurl",
            {},
            { thirdPartyId },
            preAPIHook
        );

        return response.url;
    };

    signInAndUp = async (
        thirdPartyId: string,
        code: string,
        redirectURI: string,
        preAPIHook?: PreAPIHookFunction
    ): Promise<SignInAndUpAPIResponse> => {
        const response: SignInAndUpAPIResponse = await this.querier.post(
            "/signinup",
            {
                body: JSON.stringify({ code, thirdPartyId, redirectURI }),
            },
            preAPIHook
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
