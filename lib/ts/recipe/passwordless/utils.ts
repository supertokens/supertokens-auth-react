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
import { defaultEmailValidator } from "../emailpassword/validators";
import { Config, NormalisedConfig, PasswordlessNormalisedBaseConfig, PasswordlessFeatureBaseConfig } from "./types";
import { RecipeInterface } from "./types";
import { defaultPhoneNumberValidator } from "./validators";

export function normalisePasswordlessConfig(config: Config): NormalisedConfig {
    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        components: {},
        ...config.override,
    };

    return {
        ...normaliseAuthRecipe(config),
        resendCodeTimeGapInSeconds:
            config.resendCodeTimeGapInSeconds === undefined ? 900 : config.resendCodeTimeGapInSeconds,

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
        closeTabScreen: normalisePasswordlessBaseConfig(config.closeTabScreen),

        contactMethod: config.contactMethod,

        override,
    };
}

function normalisePasswordlessBaseConfig(config?: PasswordlessFeatureBaseConfig): PasswordlessNormalisedBaseConfig {
    const style = config && config.style !== undefined ? config.style : {};
    return {
        ...config,
        style,
    };
}
