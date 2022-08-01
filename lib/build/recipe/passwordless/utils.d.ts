import { CountryCode, NumberType } from "libphonenumber-js";
import { Config, LoginAttemptInfo, NormalisedConfig } from "./types";
import { RecipeFunctionOptions, RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import { PasswordlessFlowType, PasswordlessUser } from "supertokens-web-js/recipe/passwordless/types";
export declare function normalisePasswordlessConfig(config: Config): NormalisedConfig;
export declare function defaultGuessInternationPhoneNumberFromInputPhoneNumber(
    value: string,
    defaultCountryFromConfig?: CountryCode
): string | undefined;
export declare function getLoginAttemptInfo(input: {
    recipeImplementation: RecipeInterface;
    userContext: any;
}): Promise<LoginAttemptInfo | undefined>;
export declare function setLoginAttemptInfo(input: {
    recipeImplementation: RecipeInterface;
    userContext: NumberType;
    attemptInfo: LoginAttemptInfo;
}): Promise<void>;
/**
 * These functions are helper functions so that the logic can be exposed from both
 * passwordless and thirdpartypasswordless recipes without having to duplicate code
 */
export declare function createCode(
    input:
        | {
              email: string;
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
        | {
              phoneNumber: string;
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
): Promise<{
    status: "OK";
    deviceId: string;
    preAuthSessionId: string;
    flowType: PasswordlessFlowType;
    fetchResponse: Response;
}>;
export declare function resendCode(input: {
    userContext?: any;
    options?: RecipeFunctionOptions;
    recipeImplementation: RecipeInterface;
}): Promise<{
    status: "OK" | "RESTART_FLOW_ERROR";
    fetchResponse: Response;
}>;
export declare function consumeCode(
    input:
        | {
              userInputCode: string;
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
        | {
              userContext?: any;
              options?: RecipeFunctionOptions;
              recipeImplementation: RecipeInterface;
          }
): Promise<
    | {
          status: "OK";
          createdNewUser: boolean;
          user: PasswordlessUser;
          fetchResponse: Response;
      }
    | {
          status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
          failedCodeInputAttemptCount: number;
          maximumCodeInputAttempts: number;
          fetchResponse: Response;
      }
    | {
          status: "RESTART_FLOW_ERROR";
          fetchResponse: Response;
      }
>;
