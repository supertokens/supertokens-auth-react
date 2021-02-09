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
import { getWindowOrThrow } from "../../utils";
import { SESSION_STORAGE_STATE_KEY } from "./constants";
import {
    NormalisedSignInAndUpFeatureConfig,
    NormalisedThirdPartyConfig,
    SignInAndUpFeatureUserInput,
    StateObject,
    ThirdPartyConfig
} from "./types";

/*
 * Methods.
 */
export function normaliseThirdPartyConfig(config: ThirdPartyConfig): NormalisedThirdPartyConfig {
    const signInAndUpFeature: NormalisedSignInAndUpFeatureConfig = normaliseSignInAndUpFeature(
        config.signInAndUpFeature
    );
    return {
        signInAndUpFeature
    };
}

export function normaliseSignInAndUpFeature(config: SignInAndUpFeatureUserInput): NormalisedSignInAndUpFeatureConfig {
    if (config.providers.length === 0) {
        throw new Error("ThirdParty configs providers cannot be empty.");
    }

    const disableDefaultImplementation = config.disableDefaultImplementation === true;
    const style = config.style !== undefined ? config.style : {};
    const privacyPolicyLink = config.privacyPolicyLink;
    const termsOfServiceLink = config.termsOfServiceLink;
    const providers = config.providers;

    return {
        disableDefaultImplementation,
        privacyPolicyLink,
        termsOfServiceLink,
        style,
        providers
    };
}

/*
 * getOAuthState
 */
export function getOAuthState(): StateObject | undefined {
    try {
        const state = JSON.parse(getWindowOrThrow().sessionStorage.getItem(SESSION_STORAGE_STATE_KEY));
        if (state === null) {
            return undefined;
        }

        return state;
    } catch (e) {
        return undefined;
    }
}

/*
 * matchRecipeIdUsingState
 */
export function matchRecipeIdUsingState(recipeId: string): () => boolean {
    return () => {
        const state = getOAuthState();
        if (state === undefined) {
            return false;
        }
        if (state.rid === recipeId) {
            return true;
        }
        return false;
    };
}
