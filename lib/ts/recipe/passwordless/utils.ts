/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import { CountryCode, NumberType } from "libphonenumber-js";
import parsePhoneNumber, { formatIncompletePhoneNumber, parseIncompletePhoneNumber } from "libphonenumber-js/min";
import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import { normaliseAuthRecipe } from "../authRecipe/utils";
import {
    AdditionalLoginAttemptInfoProperties,
    Config,
    LoginAttemptInfo,
    NormalisedConfig,
    SignInUpFeatureConfigInput,
} from "./types";
import { RecipeFunctionOptions, RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import {
    defaultPhoneNumberValidator,
    defaultPhoneNumberValidatorForCombinedInput,
    defaultEmailValidator,
    defaultEmailValidatorForCombinedInput,
} from "./validators";
import { PasswordlessFlowType, PasswordlessUser } from "supertokens-web-js/recipe/passwordless/types";
import WebJSUtils from "supertokens-web-js/recipe/passwordless/utils";

export function normalisePasswordlessConfig(config: Config): NormalisedConfig {
    if (!["EMAIL", "PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod)) {
        throw new Error("Please pass one of 'PHONE', 'EMAIL' or 'EMAIL_OR_PHONE' as the contactMethod");
    }

    const signInUpFeature = normalizeSignInUpFeatureConfig(config.signInUpFeature, config);

    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        components: {},
        ...config.override,
    };

    let validateEmailAddress: NormalisedConfig["validateEmailAddress"] = defaultEmailValidator;
    if (
        (config.contactMethod === "EMAIL" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validateEmailAddress !== undefined
    ) {
        validateEmailAddress = config.validateEmailAddress;
    } else if (config.contactMethod === "EMAIL_OR_PHONE") {
        validateEmailAddress = defaultEmailValidatorForCombinedInput;
    }

    let validatePhoneNumber: NormalisedConfig["validatePhoneNumber"] = defaultPhoneNumberValidator;
    if (
        (config.contactMethod === "PHONE" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validatePhoneNumber !== undefined
    ) {
        validatePhoneNumber = config.validatePhoneNumber;
    } else if (config.contactMethod === "EMAIL_OR_PHONE") {
        validatePhoneNumber = defaultPhoneNumberValidatorForCombinedInput;
    }

    return {
        ...normaliseAuthRecipe(config),

        validateEmailAddress,
        validatePhoneNumber,

        signInUpFeature,

        linkClickedScreenFeature: normalisePasswordlessBaseConfig(config.linkClickedScreenFeature),

        contactMethod: config.contactMethod,

        override,
    };
}

function normalizeSignInUpFeatureConfig(
    signInUpInput:
        | SignInUpFeatureConfigInput
        | (SignInUpFeatureConfigInput & {
              defaultCountry?: CountryCode | undefined;
          })
        | (SignInUpFeatureConfigInput & {
              guessInternationPhoneNumberFromInputPhoneNumber?:
                  | ((
                        inputPhoneNumber: string,
                        defaultCountryFromConfig?: CountryCode | undefined
                    ) => string | Promise<string | undefined> | undefined)
                  | undefined;
          })
        | undefined,
    config: Config
) {
    if (signInUpInput?.resendEmailOrSMSGapInSeconds !== undefined && signInUpInput.resendEmailOrSMSGapInSeconds <= 0) {
        throw new Error("Please pass a positive number as resendEmailOrSMSGapInSeconds");
    }

    const signInUpFeature = {
        ...signInUpInput,
        resendEmailOrSMSGapInSeconds:
            signInUpInput?.resendEmailOrSMSGapInSeconds === undefined ? 15 : signInUpInput.resendEmailOrSMSGapInSeconds,

        emailOrPhoneFormStyle:
            signInUpInput?.emailOrPhoneFormStyle !== undefined ? signInUpInput.emailOrPhoneFormStyle : {},
        linkSentScreenStyle: signInUpInput?.linkSentScreenStyle !== undefined ? signInUpInput.linkSentScreenStyle : {},
        userInputCodeFormStyle:
            signInUpInput?.userInputCodeFormStyle !== undefined ? signInUpInput.userInputCodeFormStyle : {},
        closeTabScreenStyle: signInUpInput?.closeTabScreenStyle !== undefined ? signInUpInput.closeTabScreenStyle : {},
        defaultCountry:
            ["PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod) &&
            signInUpInput !== undefined &&
            "defaultCountry" in signInUpInput
                ? signInUpInput.defaultCountry
                : undefined,

        guessInternationPhoneNumberFromInputPhoneNumber:
            config.contactMethod === "EMAIL_OR_PHONE" &&
            signInUpInput !== undefined &&
            "guessInternationPhoneNumberFromInputPhoneNumber" in signInUpInput &&
            signInUpInput.guessInternationPhoneNumberFromInputPhoneNumber !== undefined
                ? signInUpInput.guessInternationPhoneNumberFromInputPhoneNumber
                : defaultGuessInternationPhoneNumberFromInputPhoneNumber,
    };

    return signInUpFeature;
}

function normalisePasswordlessBaseConfig<T>(config?: T & FeatureBaseConfig): T & NormalisedBaseConfig {
    const style = config && config.style !== undefined ? config.style : {};
    return {
        ...(config as T),
        style,
    };
}

export function defaultGuessInternationPhoneNumberFromInputPhoneNumber(
    value: string,
    defaultCountryFromConfig?: CountryCode
) {
    if (value === undefined || value.length === 0) {
        return value;
    }
    if (defaultCountryFromConfig !== undefined) {
        try {
            return parsePhoneNumber(value, {
                defaultCountry: defaultCountryFromConfig,
                extract: false,
            })?.formatInternational();
        } catch {
            // The lib couldn't make sense of it, so we keep it unchanged
        }
    }
    // This function "extracts" phone numbers from the string, e.g.: "asd2gmail.com" -> "2"
    const incomplete = parseIncompletePhoneNumber(value);

    // If the incomplete/extracted phonenumber is less than half the input we assume it's not a phone number.
    // I.e.: if less than half of the input is numbers
    if (value.includes("@") || incomplete.length < value.length / 2) {
        return undefined;
    }
    const incompleteIntlNum = formatIncompletePhoneNumber(value, defaultCountryFromConfig);
    if (incompleteIntlNum !== value) {
        return incompleteIntlNum;
    }

    // We want to return the value as an international number because the phone number input lib expects it this way
    return `+${value}`;
}

export async function getLoginAttemptInfo(input: {
    recipeImplementation: RecipeInterface;
    userContext: any;
}): Promise<LoginAttemptInfo | undefined> {
    return await input.recipeImplementation.getLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>({
        userContext: input.userContext,
    });
}

export async function setLoginAttemptInfo(input: {
    recipeImplementation: RecipeInterface;
    userContext: NumberType;
    attemptInfo: LoginAttemptInfo;
}): Promise<void> {
    return await input.recipeImplementation.setLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>({
        userContext: input.userContext,
        attemptInfo: input.attemptInfo,
    });
}

/**
 * These functions are helper functions so that the logic can be exposed from both
 * passwordless and thirdpartypasswordless recipes without having to duplicate code
 */

export async function createCode(
    input:
        | { email: string; userContext?: any; options?: RecipeFunctionOptions; recipeImplementation: RecipeInterface }
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
}> {
    return WebJSUtils.createCode(input);
}

export async function resendCode(input: {
    userContext?: any;
    options?: RecipeFunctionOptions;
    recipeImplementation: RecipeInterface;
}): Promise<{
    status: "OK" | "RESTART_FLOW_ERROR";
    fetchResponse: Response;
}> {
    return WebJSUtils.resendCode(input);
}

export async function consumeCode(
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
          createdUser: boolean;
          user: PasswordlessUser;
          fetchResponse: Response;
      }
    | {
          status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
          failedCodeInputAttemptCount: number;
          maximumCodeInputAttempts: number;
          fetchResponse: Response;
      }
    | { status: "RESTART_FLOW_ERROR"; fetchResponse: Response }
> {
    return WebJSUtils.consumeCode(input);
}
