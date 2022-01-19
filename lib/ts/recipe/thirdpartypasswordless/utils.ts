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

/*
 * Imports.
 */
import { Config, NormalisedConfig, TPPWlessRecipeInterface, NormalizedSignInUpFeatureConfig } from "./types";

import { normaliseAuthRecipeWithEmailVerificationConfig } from "../authRecipeWithEmailVerification/utils";
import Provider from "../thirdparty/providers";
import Custom from "../thirdparty/providers/custom";
import {
    defaultEmailValidator,
    defaultEmailValidatorForCombinedInput,
    defaultPhoneNumberValidator,
    defaultPhoneNumberValidatorForCombinedInput,
} from "../passwordless/validators";
import { defaultGuessInternationPhoneNumberFromInputPhoneNumber } from "../passwordless/utils";

/*
 * Methods.
 */
export function normaliseThirdPartyPasswordlessConfig(config: Config): NormalisedConfig {
    const disablePasswordless = config.disablePasswordless === true;
    if (
        disablePasswordless &&
        (config.signInUpFeature === undefined ||
            config.signInUpFeature.providers === undefined ||
            config.signInUpFeature.providers.length === 0)
    ) {
        throw new Error("You need to enable either email password or third party providers login.");
    }

    const override: any = {
        functions: (originalImplementation: TPPWlessRecipeInterface) => originalImplementation,
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

    const signInUpFeature: NormalizedSignInUpFeatureConfig = normaliseSignInUpFeatureConfig(config);

    return {
        ...normaliseAuthRecipeWithEmailVerificationConfig(config),
        contactMethod: config.contactMethod,
        validateEmailAddress,
        validatePhoneNumber,

        signInUpFeature,
        oAuthCallbackScreen: {
            style:
                config.oAuthCallbackScreen === undefined || config.oAuthCallbackScreen.style === undefined
                    ? {}
                    : config.oAuthCallbackScreen.style,
        },
        linkClickedScreenFeature: {
            disableDefaultImplementation: config.linkClickedScreenFeature?.disableDefaultImplementation === true,
            style:
                config.linkClickedScreenFeature === undefined || config.linkClickedScreenFeature.style === undefined
                    ? {}
                    : config.linkClickedScreenFeature.style,
        },
        disablePasswordless,
        override,
    };
}

function normaliseSignInUpFeatureConfig(config: Config): NormalizedSignInUpFeatureConfig {
    const disableDefaultImplementation =
        config?.signInUpFeature?.disableDefaultImplementation === undefined
            ? false
            : config?.signInUpFeature?.disableDefaultImplementation;

    /*
     * Convert custom configs to custom providers.
     */
    const providersWithCustom = (config?.signInUpFeature?.providers || []).map((provider) => {
        if (provider instanceof Provider) {
            return provider;
        }
        return Custom.init(provider);
    });

    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    const providers = Array.from(new Set(providersWithCustom.map((provider) => provider.id))).map(
        (id) => providersWithCustom.find((provider) => provider.id === id) as Provider
    );

    config && config.contactMethod === "PHONE" && config.signInUpFeature?.defaultCountry;

    return {
        ...config,
        providers,
        disableDefaultImplementation,
        resendEmailOrSMSGapInSeconds:
            config?.signInUpFeature?.resendEmailOrSMSGapInSeconds === undefined
                ? 15
                : config?.signInUpFeature.resendEmailOrSMSGapInSeconds,

        providerAndEmailOrPhoneFormStyle:
            config?.signInUpFeature?.providerAndEmailOrPhoneFormStyle === undefined
                ? {}
                : config?.signInUpFeature.providerAndEmailOrPhoneFormStyle,
        linkSentScreenStyle:
            config?.signInUpFeature?.linkSentScreenStyle === undefined
                ? {}
                : config?.signInUpFeature.linkSentScreenStyle,
        userInputCodeFormStyle:
            config?.signInUpFeature?.userInputCodeFormStyle === undefined
                ? {}
                : config?.signInUpFeature.userInputCodeFormStyle,
        closeTabScreenStyle:
            config?.signInUpFeature?.closeTabScreenStyle === undefined
                ? {}
                : config?.signInUpFeature.closeTabScreenStyle,

        defaultCountry:
            ["PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod) &&
            config?.signInUpFeature &&
            "defaultCountry" in config.signInUpFeature
                ? config?.signInUpFeature.defaultCountry
                : undefined,

        guessInternationPhoneNumberFromInputPhoneNumber:
            config.contactMethod === "EMAIL_OR_PHONE" &&
            config?.signInUpFeature &&
            "guessInternationPhoneNumberFromInputPhoneNumber" in config?.signInUpFeature &&
            config?.signInUpFeature.guessInternationPhoneNumberFromInputPhoneNumber !== undefined
                ? config?.signInUpFeature.guessInternationPhoneNumberFromInputPhoneNumber
                : defaultGuessInternationPhoneNumberFromInputPhoneNumber,
    };
}
