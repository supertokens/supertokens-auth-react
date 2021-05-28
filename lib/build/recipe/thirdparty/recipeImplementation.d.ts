import { RecipeInterface, FunctionOptions } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    getOAuthAuthorisationURL: (thirdPartyId: string, options: FunctionOptions) => Promise<string>;
    signInAndUp: (
        thirdPartyId: string,
        code: string,
        redirectURI: string,
        options: FunctionOptions
    ) => Promise<SignInAndUpAPIResponse>;
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
