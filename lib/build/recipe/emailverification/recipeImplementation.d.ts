import { RecipeInterface, NormalisedConfig } from "./types";
import { NormalisedAppInfo } from "../../types";
import Querier from "../../querier";
export default class RecipeImplementation implements RecipeInterface {
    querier: Querier;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    verifyEmail: (input: { token: string; config: NormalisedConfig }) => Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
    }>;
    sendVerificationEmail: (input: { config: NormalisedConfig }) => Promise<{
        status: "OK" | "EMAIL_ALREADY_VERIFIED_ERROR";
    }>;
    isEmailVerified: (input: { config: NormalisedConfig }) => Promise<boolean>;
}
