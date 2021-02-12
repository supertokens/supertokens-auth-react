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
import Provider from "./providers";
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
    if (config === undefined || config.providers === undefined || config.providers.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }

    const disableDefaultImplementation = config.disableDefaultImplementation === true;
    const style = config.style !== undefined ? config.style : {};
    const privacyPolicyLink = config.privacyPolicyLink;
    const termsOfServiceLink = config.termsOfServiceLink;

    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    const providers = Array.from(new Set(config.providers.map(provider => provider.id))).map(
        id => config.providers.find(provider => provider.id === id) as Provider
    );

    /*
     * Make sure providers array contains only Provider instances, throw otherwise.
     */
    const providersOnly = providers.some(provider => provider instanceof Provider === false) === false;
    if (providersOnly !== true) {
        throw new Error(
            "ThridParty providers must all be instances of Providers. If you are adding a custom provider, make sure to use ThirdParty.Custom({...})"
        );
    }

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
