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

import { normaliseAuthRecipe } from "../authRecipe/utils";

import type {
    Config,
    NormalisedConfig,
    NormalisedSignInAndUpFeatureConfig,
    SignInAndUpFeatureUserInput,
} from "./types";
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";

/*
 * Methods.
 */
export function normaliseThirdPartyEmailPasswordConfig(config: Config): NormalisedConfig {
    const disableEmailPassword = config.disableEmailPassword === true;

    if (
        disableEmailPassword &&
        (config.signInAndUpFeature === undefined ||
            config.signInAndUpFeature.providers === undefined ||
            config.signInAndUpFeature.providers.length === 0)
    ) {
        throw new Error("You need to enable either email password or third party providers login.");
    }

    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    const signInAndUpFeature: NormalisedSignInAndUpFeatureConfig = normaliseSignInUpFeatureConfig(
        config.signInAndUpFeature
    );

    return {
        ...normaliseAuthRecipe(config),
        signInAndUpFeature,
        oAuthCallbackScreen: config.oAuthCallbackScreen,
        resetPasswordUsingTokenFeature: config.resetPasswordUsingTokenFeature,
        disableEmailPassword,
        override,
    };
}

function normaliseSignInUpFeatureConfig(config?: SignInAndUpFeatureUserInput): NormalisedSignInAndUpFeatureConfig {
    const disableDefaultUI =
        config === undefined || config.disableDefaultUI === undefined ? false : config.disableDefaultUI;

    const defaultToSignUp =
        config === undefined || config.defaultToSignUp === undefined ? false : config.defaultToSignUp;

    return {
        ...config,
        disableDefaultUI,
        defaultToSignUp,
        style: config === undefined || config.style === undefined ? "" : config.style,
    };
}
