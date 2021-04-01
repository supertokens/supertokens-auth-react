"use strict";
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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var utils_1 = require("../../utils");
var constants_1 = require("./constants");
var providers_1 = __importDefault(require("./providers"));
var custom_1 = __importDefault(require("./providers/custom"));
/*
 * Methods.
 */
function normaliseThirdPartyConfig(config, allowEmptyProviders) {
    if (allowEmptyProviders === void 0) {
        allowEmptyProviders = false;
    }
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature, allowEmptyProviders);
    return {
        signInAndUpFeature: signInAndUpFeature,
    };
}
exports.normaliseThirdPartyConfig = normaliseThirdPartyConfig;
function normaliseSignInAndUpFeature(config, allowEmptyProviders) {
    if (config === undefined) {
        config = {};
    }
    if (config.providers === undefined) {
        config.providers = [];
    }
    if (allowEmptyProviders === false && config.providers.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    var disableDefaultImplementation = config.disableDefaultImplementation === true;
    var style = config.style !== undefined ? config.style : {};
    var privacyPolicyLink = config.privacyPolicyLink;
    var termsOfServiceLink = config.termsOfServiceLink;
    /*
     * Convert custom configs to custom providers.
     */
    var providersWithCustom = config.providers.map(function (provider) {
        if (provider instanceof providers_1.default) {
            return provider;
        }
        return custom_1.default.init(provider);
    });
    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    var providers = Array.from(
        new Set(
            providersWithCustom.map(function (provider) {
                return provider.id;
            })
        )
    ).map(function (id) {
        return providersWithCustom.find(function (provider) {
            return provider.id === id;
        });
    });
    return {
        disableDefaultImplementation: disableDefaultImplementation,
        privacyPolicyLink: privacyPolicyLink,
        termsOfServiceLink: termsOfServiceLink,
        style: style,
        providers: providers,
    };
}
exports.normaliseSignInAndUpFeature = normaliseSignInAndUpFeature;
/*
 * getOAuthState
 */
function getOAuthState() {
    try {
        var state = JSON.parse(
            utils_1.getWindowOrThrow().sessionStorage.getItem(constants_1.SESSION_STORAGE_STATE_KEY)
        );
        if (state === null) {
            return undefined;
        }
        return state;
    } catch (e) {
        return undefined;
    }
}
exports.getOAuthState = getOAuthState;
/*
 * matchRecipeIdUsingState
 */
function matchRecipeIdUsingState(recipeId) {
    return function () {
        var state = getOAuthState();
        if (state === undefined) {
            return false;
        }
        if (state.rid === recipeId) {
            return true;
        }
        return false;
    };
}
exports.matchRecipeIdUsingState = matchRecipeIdUsingState;
//# sourceMappingURL=utils.js.map
