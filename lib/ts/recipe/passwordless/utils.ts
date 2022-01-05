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

import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import { normaliseAuthRecipe } from "../authRecipe/utils";
import { defaultEmailValidator } from "../emailpassword/validators";
import { Config, NormalisedConfig } from "./types";
import { RecipeInterface } from "./types";
import { defaultPhoneNumberValidator } from "./validators";

export function normalisePasswordlessConfig(config: Config): NormalisedConfig {
    if (!["EMAIL", "PHONE"].includes(config.contactMethod)) {
        throw new Error("Please pass one of 'PHONE' or 'EMAIL' as the contactMethod");
    }

    if (config.resendCodeTimeGapInSeconds !== undefined && config.resendCodeTimeGapInSeconds <= 0) {
        throw new Error("Please pass a positive number as resendCodeTimeGapInSeconds");
    }

    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        components: {},
        ...config.override,
    };

    return {
        ...normaliseAuthRecipe(config),
        resendCodeTimeGapInSeconds:
            config.resendCodeTimeGapInSeconds === undefined ? 60 : config.resendCodeTimeGapInSeconds,

        validateEmailAddress:
            config.validateEmailAddress === undefined ? defaultEmailValidator : config.validateEmailAddress,
        validatePhoneNumber:
            config.validatePhoneNumber === undefined ? defaultPhoneNumberValidator : config.validatePhoneNumber,

        emailForm: {
            ...config.emailForm,
            ...normalisePasswordlessBaseConfig(config.emailForm),
        },

        mobileForm: {
            ...config.mobileForm,
            ...normalisePasswordlessBaseConfig(config.mobileForm),
        },
        userInputCodeForm: normalisePasswordlessBaseConfig(config.userInputCodeForm),
        linkClickedScreen: normalisePasswordlessBaseConfig(config.linkClickedScreen),

        contactMethod: config.contactMethod,

        override,
    };
}

function normalisePasswordlessBaseConfig<T>(config?: T & FeatureBaseConfig): T & NormalisedBaseConfig {
    const style = config && config.style !== undefined ? config.style : {};
    return {
        ...(config as T),
        style,
    };
}
