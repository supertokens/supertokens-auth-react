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

import { CountryCode } from "libphonenumber-js";
import parsePhoneNumber, { parseIncompletePhoneNumber } from "libphonenumber-js/min";
import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import { normaliseAuthRecipe } from "../authRecipe/utils";
import { Config, NormalisedConfig, SignInUpFeatureConfigInput } from "./types";
import { RecipeInterface } from "./types";
import {
    defaultPhoneNumberValidator,
    defaultPhoneNumberValidatorForCombinedInput,
    defaultEmailValidator,
    defaultEmailValidatorForCombinedInput,
} from "./validators";

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
            signInUpInput?.resendEmailOrSMSGapInSeconds === undefined ? 60 : signInUpInput.resendEmailOrSMSGapInSeconds,

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
    const incomplete = parseIncompletePhoneNumber(value);

    // If the incomplete/extracted phonenumber is less than half the input we assume it's not a phone number.
    // I.e.: if more than half of the input is numbers
    if (incomplete.length < value.length / 2) {
        return undefined;
    }
    return value;
}
