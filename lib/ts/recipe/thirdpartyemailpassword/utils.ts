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
import { Config, NormalisedConfig, NormalisedSignInAndUpFeatureConfig, SignInAndUpFeatureUserInput } from "./types";
import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { normaliseAuthRecipe } from "../authRecipe/utils";
import { normaliseThirdPartyConfig } from "../thirdparty/utils";
import { normaliseEmailPasswordConfig } from "../emailpassword/utils";

/*
 * Methods.
 */
export function normaliseThirdPartyEmailPasswordConfig(config: Config): NormalisedConfig {
    if (config === undefined) {
        throw new Error("ThirdpartyEmailPassword config should not be empty");
    }
    const disableEmailPassword = config.disableEmailPassword === true;
    const disableThirdParty = !config.signInAndUpFeature?.providers?.length;
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

    let thirdpartyNormalisedConfig;
    if (!disableThirdParty) {
        thirdpartyNormalisedConfig = normaliseThirdPartyConfig({
            getRedirectionURL: config.getRedirectionURL,
            style: config.style,
            onHandleEvent: config.onHandleEvent,
            preAPIHook: config.preAPIHook,
            signInAndUpFeature: config.signInAndUpFeature,
            oAuthCallbackScreen: config.oAuthCallbackScreen,
            useShadowDom: config.useShadowDom,
        });
    }

    const emailPasswordNormalisedConfig = normaliseEmailPasswordConfig({
        getRedirectionURL: config.getRedirectionURL,
        onHandleEvent: config.onHandleEvent,
        style: config.style,
        preAPIHook: config.preAPIHook,
        resetPasswordUsingTokenFeature: config.resetPasswordUsingTokenFeature,
        signInAndUpFeature: config.signInAndUpFeature,
        useShadowDom: config.useShadowDom,
    });

    return {
        ...normaliseAuthRecipe(config),
        emailPasswordConfig: emailPasswordNormalisedConfig,
        thirdPartyConfig: thirdpartyNormalisedConfig,
        disableEmailPassword,
        signInAndUpFeature,
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
