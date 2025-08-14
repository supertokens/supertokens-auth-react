"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var componentOverrideContext = require("./thirdparty-shared.js");
require("react/jsx-runtime");
require("react");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/lib/build/error");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/recipe/thirdparty");
require("./authRecipe-shared2.js");
require("./recipeModule-shared.js");
require("./multifactorauth-shared.js");
require("supertokens-web-js/recipe/session");
require("./oauth2provider-shared.js");
require("supertokens-web-js/recipe/oauth2provider");
require("./authRecipe-shared.js");
require("./translationContext.js");
require("supertokens-web-js/lib/build/normalisedURLPath");

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
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    /*
     * Static attributes.
     */
    Wrapper.init = function (config) {
        return componentOverrideContext.ThirdParty.init(config);
    };
    Wrapper.signOut = function (input) {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdParty.getInstanceOrThrow().signOut({
                        userContext: genericComponentOverrideContext.getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return genericComponentOverrideContext.__generator(this, function (_a) {
                recipeInstance = componentOverrideContext.ThirdParty.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    componentOverrideContext.redirectToThirdPartyLogin({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.config,
                        userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
                        shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                        recipeImplementation: recipeInstance.webJSRecipe,
                    }),
                ];
            });
        });
    };
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return componentOverrideContext.ThirdParty.getInstanceOrThrow().webJSRecipe.getStateAndOtherInfoFromStorage(
            genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, input), {
                userContext: genericComponentOverrideContext.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdParty.getInstanceOrThrow().webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState(
                        genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, input), {
                            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.signInAndUp = function (input) {
        return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    componentOverrideContext.ThirdParty.getInstanceOrThrow().webJSRecipe.signInAndUp(
                        genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, input), {
                            userContext: genericComponentOverrideContext.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getProviders = function () {
        return componentOverrideContext.ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.map(
            function (provider) {
                return {
                    id: provider.id,
                    name: provider.name,
                };
            }
        );
    };
    /*
     * Providers
     */
    Wrapper.Apple = componentOverrideContext.Apple;
    Wrapper.Bitbucket = componentOverrideContext.Bitbucket;
    Wrapper.Discord = componentOverrideContext.Discord;
    Wrapper.Github = componentOverrideContext.Github;
    Wrapper.Gitlab = componentOverrideContext.Gitlab;
    Wrapper.Google = componentOverrideContext.Google;
    Wrapper.GoogleWorkspaces = componentOverrideContext.GoogleWorkspaces;
    Wrapper.Facebook = componentOverrideContext.Facebook;
    Wrapper.LinkedIn = componentOverrideContext.LinkedIn;
    Wrapper.ActiveDirectory = componentOverrideContext.ActiveDirectory;
    Wrapper.BoxySAML = componentOverrideContext.BoxySAML;
    Wrapper.Okta = componentOverrideContext.Okta;
    Wrapper.Twitter = componentOverrideContext.Twitter;
    Wrapper.ComponentsOverrideProvider = componentOverrideContext.Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
var signInAndUp = Wrapper.signInAndUp;
var getProviders = Wrapper.getProviders;
var ThirdpartyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.ActiveDirectory = componentOverrideContext.ActiveDirectory;
exports.Apple = componentOverrideContext.Apple;
exports.Bitbucket = componentOverrideContext.Bitbucket;
exports.BoxySAML = componentOverrideContext.BoxySAML;
exports.Discord = componentOverrideContext.Discord;
exports.Facebook = componentOverrideContext.Facebook;
exports.Github = componentOverrideContext.Github;
exports.Gitlab = componentOverrideContext.Gitlab;
exports.Google = componentOverrideContext.Google;
exports.GoogleWorkspaces = componentOverrideContext.GoogleWorkspaces;
exports.LinkedIn = componentOverrideContext.LinkedIn;
exports.Okta = componentOverrideContext.Okta;
exports.Twitter = componentOverrideContext.Twitter;
exports.ThirdpartyComponentsOverrideProvider = ThirdpartyComponentsOverrideProvider;
exports.default = Wrapper;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
exports.getProviders = getProviders;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.signInAndUp = signInAndUp;
exports.signOut = signOut;
