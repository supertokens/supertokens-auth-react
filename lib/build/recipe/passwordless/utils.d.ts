import { CountryCode } from "libphonenumber-js";
import { Config, NormalisedConfig } from "./types";
import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import { PasswordlessFlowType } from "supertokens-web-js/lib/build/recipe/passwordless/types";
export declare function normalisePasswordlessConfig(config: Config): NormalisedConfig;
export declare function defaultGuessInternationPhoneNumberFromInputPhoneNumber(
    value: string,
    defaultCountryFromConfig?: CountryCode
): string | undefined;
export declare function getLoginAttemptInfoFromStorage(input: {
    recipeImplementation: RecipeInterface;
    userContext: any;
}): Promise<
    | {
          deviceId: string;
          preAuthSessionId: string;
          flowType: PasswordlessFlowType;
          contactInfo: string;
          contactMethod: "EMAIL" | "PHONE";
          lastResend: number;
          redirectToPath?: string;
      }
    | undefined
>;
