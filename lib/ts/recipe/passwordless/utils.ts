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

import { normaliseAuthRecipe } from "../authRecipe/utils";
import MultiFactorAuth from "../multifactorauth/recipe";

import {
    defaultPhoneNumberValidator,
    defaultPhoneNumberValidatorForCombinedInput,
    defaultEmailValidator,
    defaultEmailValidatorForCombinedInput,
    defaultGuessInternationPhoneNumberFromInputPhoneNumber,
} from "./validators";

import type { Config, NormalisedConfig, SignInUpFeatureConfigInput } from "./types";
import type { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import type { DynamicLoginMethodsContextValue } from "../multitenancy/dynamicLoginMethodsContext";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";

export function normalisePasswordlessConfig(config: Config): NormalisedConfig {
    if (config === undefined) {
        throw new Error("Passwordless config should not be empty");
    }
    if (!["EMAIL", "PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod)) {
        throw new Error("Please pass one of 'PHONE', 'EMAIL' or 'EMAIL_OR_PHONE' as the contactMethod");
    }

    const signInUpFeature = normalizeSignInUpFeatureConfig(config.signInUpFeature, config);

    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
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
        mfaFeature: normalisePasswordlessBaseConfig(config.mfaFeature),

        contactMethod: config.contactMethod,

        override,
    };
}

function normalizeSignInUpFeatureConfig(
    signInUpInput:
        | SignInUpFeatureConfigInput
        | (SignInUpFeatureConfigInput & {
              defaultCountry?: string | undefined;
          })
        | (SignInUpFeatureConfigInput & {
              guessInternationPhoneNumberFromInputPhoneNumber?:
                  | ((
                        inputPhoneNumber: string,
                        defaultCountryFromConfig?: string | undefined
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
            signInUpInput?.emailOrPhoneFormStyle !== undefined ? signInUpInput.emailOrPhoneFormStyle : "",
        linkSentScreenStyle: signInUpInput?.linkSentScreenStyle !== undefined ? signInUpInput.linkSentScreenStyle : "",
        userInputCodeFormStyle:
            signInUpInput?.userInputCodeFormStyle !== undefined ? signInUpInput.userInputCodeFormStyle : "",
        closeTabScreenStyle: signInUpInput?.closeTabScreenStyle !== undefined ? signInUpInput.closeTabScreenStyle : "",
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
    const style = config && config.style !== undefined ? config.style : "";
    return {
        ...(config as T),
        style,
    };
}

export function getEnabledContactMethods(
    contactMethod: "PHONE" | "EMAIL" | "EMAIL_OR_PHONE",
    currentDynamicLoginMethods: DynamicLoginMethodsContextValue
) {
    let enabledContactMethods = contactMethod === "EMAIL_OR_PHONE" ? ["EMAIL", "PHONE"] : [contactMethod];

    let firstFactors;
    if (currentDynamicLoginMethods.loaded && currentDynamicLoginMethods.loginMethods.firstFactors) {
        firstFactors = currentDynamicLoginMethods.loginMethods.firstFactors;
    } else {
        firstFactors = MultiFactorAuth.getInstance()?.config.firstFactors;
    }

    if (firstFactors !== undefined) {
        if (enabledContactMethods.includes("PHONE")) {
            if (!firstFactors.includes("otp-phone") && !firstFactors.includes("link-phone")) {
                enabledContactMethods = enabledContactMethods.filter((c) => c !== "PHONE");
            }
        } else {
            if (firstFactors.includes("otp-phone") || firstFactors.includes("link-phone")) {
                throw new Error("The enabled contact method is not a superset of the requested first factors");
            }
        }

        if (enabledContactMethods.includes("EMAIL")) {
            if (!firstFactors.includes("otp-email") && !firstFactors.includes("link-email")) {
                enabledContactMethods = enabledContactMethods.filter((c) => c !== "EMAIL");
            }
        } else {
            if (firstFactors.includes("otp-email") || firstFactors.includes("link-email")) {
                throw new Error("The enabled contact method is not a superset of the requested first factors");
            }
        }
    }

    if (enabledContactMethods.length === 0) {
        // It should never get here, but as a sanity check this is fine
        throw new Error("The enabled contact method is not a superset of the requested first factors");
    }
    return enabledContactMethods;
}
