import { RecipeInterface, NormalisedConfig, StateObject } from "./types";
import { User } from "../authRecipeModule/types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    getOAuthAuthorisationURL: (input: { thirdPartyId: string; config: NormalisedConfig }) => Promise<string>;
    signInAndUp: (input: { thirdPartyId: string; config: NormalisedConfig }) => Promise<
        | {
              status: "OK";
              user: User;
              createdNewUser: boolean;
          }
        | {
              status: "GENERAL_ERROR" | "NO_EMAIL_GIVEN_BY_PROVIDER";
          }
        | {
              status: "FIELD_ERROR";
              error: string;
          }
    >;
    getOAuthState: () => StateObject | undefined;
    setOAuthState: (state: StateObject) => void;
    redirectToThirdPartyLogin: (input: {
        thirdPartyId: string;
        config: NormalisedConfig;
        state?: StateObject | undefined;
    }) => Promise<{
        status: "ERROR" | "OK";
    }>;
}
