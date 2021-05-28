import { RecipeInterface, NormalisedConfig } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    getOAuthAuthorisationURL: (input: { thirdPartyId: string; config: NormalisedConfig }) => Promise<string>;
    signInAndUp: (input: {
        thirdPartyId: string;
        code: string;
        redirectURI: string;
        config: NormalisedConfig;
    }) => Promise<SignInAndUpAPIResponse>;
}
declare type SignInAndUpAPIResponse =
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
export {};
