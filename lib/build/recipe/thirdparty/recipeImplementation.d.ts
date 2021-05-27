import { RecipeInterface, NormalisedConfig } from "./types";
import { User } from "../authRecipeModule/types";
import { PreAPIHookFunction } from "../../types";
import Querier from "../../querier";
export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;
    config: NormalisedConfig;
    constructor(config: NormalisedConfig);
    getOAuthAuthorisationURL: (thirdPartyId: string, preAPIHook?: PreAPIHookFunction | undefined) => Promise<string>;
    signInAndUp: (
        thirdPartyId: string,
        code: string,
        redirectURI: string,
        preAPIHook?: PreAPIHookFunction | undefined
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
