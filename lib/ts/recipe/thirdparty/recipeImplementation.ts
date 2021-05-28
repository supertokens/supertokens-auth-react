import { RecipeInterface, FunctionOptions } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";

export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;

    constructor(recipeId: string, appInfo: NormalisedAppInfo) {
        this.querier = new Querier(recipeId, appInfo);
    }

    getOAuthAuthorisationURL = async (thirdPartyId: string, options: FunctionOptions): Promise<string> => {
        const response: AuthorisationURLAPIResponse = await this.querier.get(
            "/authorisationurl",
            {},
            { thirdPartyId },
            options.preAPIHook
        );

        return response.url;
    };

    signInAndUp = async (
        thirdPartyId: string,
        code: string,
        redirectURI: string,
        options: FunctionOptions
    ): Promise<SignInAndUpAPIResponse> => {
        const response: SignInAndUpAPIResponse = await this.querier.post(
            "/signinup",
            {
                body: JSON.stringify({ code, thirdPartyId, redirectURI }),
            },
            options.preAPIHook
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
