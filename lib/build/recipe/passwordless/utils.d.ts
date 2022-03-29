import { CountryCode } from "libphonenumber-js";
import { Config, LoginAttemptInfo, NormalisedConfig } from "./types";
import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
export declare function normalisePasswordlessConfig(config: Config): NormalisedConfig;
export declare function defaultGuessInternationPhoneNumberFromInputPhoneNumber(
    value: string,
    defaultCountryFromConfig?: CountryCode
): string | undefined;
export declare function getLoginAttemptInfoFromStorage(input: {
    recipeImplementation: RecipeInterface;
    userContext: any;
}): Promise<LoginAttemptInfo | undefined>;
