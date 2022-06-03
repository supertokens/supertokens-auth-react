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

import { NormalisedBaseConfig } from "../../types";
import { Config, NormalisedConfig } from "./types";
import { normaliseRecipeModuleConfig } from "../recipeModule/utils";
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";

export function normaliseEmailVerificationFeature(config: Config): NormalisedConfig {
    const disableDefaultUI = config.disableDefaultUI === true;
    const mode = config.mode === undefined ? "OFF" : config.mode;

    const sendVerifyEmailScreenStyle =
        config.sendVerifyEmailScreen !== undefined && config.sendVerifyEmailScreen.style !== undefined
            ? config.sendVerifyEmailScreen.style
            : {};

    const sendVerifyEmailScreen: NormalisedBaseConfig = {
        style: sendVerifyEmailScreenStyle,
    };

    const verifyEmailLinkClickedScreenStyle =
        config.verifyEmailLinkClickedScreen !== undefined && config.verifyEmailLinkClickedScreen.style !== undefined
            ? config.verifyEmailLinkClickedScreen.style
            : {};

    const verifyEmailLinkClickedScreen: NormalisedBaseConfig = {
        style: verifyEmailLinkClickedScreenStyle,
    };

    const override = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        components: {},
        ...config.override,
    };

    return {
        ...normaliseRecipeModuleConfig(config),
        disableDefaultUI,
        mode,
        sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen,
        signOut: config.signOut,
        postVerificationRedirect: config.postVerificationRedirect,
        redirectToSignIn: config.redirectToSignIn,
        override,
    };
}
