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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*
 * Imports.
 */
var providers_1 = tslib_1.__importDefault(require("./providers"));
var custom_1 = tslib_1.__importDefault(require("./providers/custom"));
var utils_1 = require("../authRecipeWithEmailVerification/utils");
var utils_2 = require("../../utils");
/*
 * Methods.
 */
function normaliseThirdPartyConfig(config) {
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    var oAuthCallbackScreen =
        config.oAuthCallbackScreen === undefined ? {} : { style: config.oAuthCallbackScreen.style };
    var override = tslib_1.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
        },
        config.override
    );
    return tslib_1.__assign(tslib_1.__assign({}, utils_1.normaliseAuthRecipeWithEmailVerificationConfig(config)), {
        signInAndUpFeature: signInAndUpFeature,
        oAuthCallbackScreen: oAuthCallbackScreen,
        override: override,
    });
}
exports.normaliseThirdPartyConfig = normaliseThirdPartyConfig;
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    if (config.providers === undefined) {
        config.providers = [];
    }
    if (config.providers.length === 0) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    var disableDefaultUI = config.disableDefaultUI === true;
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
        disableDefaultUI: disableDefaultUI,
        privacyPolicyLink: privacyPolicyLink,
        termsOfServiceLink: termsOfServiceLink,
        style: style,
        providers: providers,
    };
}
exports.normaliseSignInAndUpFeature = normaliseSignInAndUpFeature;
function matchRecipeIdUsingState(recipe, userContext) {
    var stateResponse = recipe.recipeImpl.getStateAndOtherInfoFromStorage({
        userContext: userContext,
    });
    if (stateResponse === undefined) {
        return false;
    }
    if (stateResponse.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}
exports.matchRecipeIdUsingState = matchRecipeIdUsingState;
function redirectToThirdPartyLogin(input) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var provider, response;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = input.config.signInAndUpFeature.providers.find(function (p) {
                        return p.id === input.thirdPartyId;
                    });
                    if (provider === undefined) {
                        return [2 /*return*/, { status: "ERROR" }];
                    }
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
                            providerId: input.thirdPartyId,
                            authorisationURL: provider.getRedirectURL(),
                            providerClientId: provider.clientId,
                            userContext: input.userContext,
                        }),
                    ];
                case 1:
                    response = _a.sent();
                    utils_2.redirectWithFullPageReload(response);
                    return [2 /*return*/, { status: "OK" }];
            }
        });
    });
}
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
