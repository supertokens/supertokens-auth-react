'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('./utils.js');
var recipe = require('./thirdparty-shared.js');
require('react');
require('supertokens-web-js/utils/cookieHandler');
require('supertokens-web-js/utils/normalisedURLDomain');
require('supertokens-web-js/utils/normalisedURLPath');
require('supertokens-web-js/utils/windowHandler');
require('crypto');
require('./genericComponentOverrideContext.js');
require('react/jsx-runtime');
require('supertokens-web-js/recipe/thirdparty');
require('./superTokens.js');
require('supertokens-web-js');
require('supertokens-web-js/utils/postSuperTokensInitCallbacks');
require('supertokens-web-js/recipe/multitenancy');
require('supertokens-web-js/utils');
require('./authRecipe-shared2.js');
require('./recipeModule-shared.js');
require('./multifactorauth-shared.js');
require('supertokens-web-js/recipe/session');
require('./oauth2provider-shared.js');
require('supertokens-web-js/recipe/oauth2provider');
require('./authRecipe-shared.js');
require('./translationContext.js');
require('supertokens-web-js/lib/build/normalisedURLPath');

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
    function Wrapper() {
    }
    /*
     * Static attributes.
     */
    Wrapper.init = function (config) {
        return recipe.ThirdParty.init(config);
    };
    Wrapper.signOut = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [2 /*return*/, recipe.ThirdParty.getInstanceOrThrow().signOut({
                        userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
                    })];
            });
        });
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return utils.__generator(this, function (_a) {
                recipeInstance = recipe.ThirdParty.getInstanceOrThrow();
                return [2 /*return*/, recipe.redirectToThirdPartyLogin({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.config,
                        userContext: utils.getNormalisedUserContext(input.userContext),
                        shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                        recipeImplementation: recipeInstance.webJSRecipe,
                    })];
            });
        });
    };
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return recipe.ThirdParty.getInstanceOrThrow().webJSRecipe.getStateAndOtherInfoFromStorage(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [2 /*return*/, recipe.ThirdParty.getInstanceOrThrow().webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.signInAndUp = function (input) {
        return utils.__awaiter(this, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                return [2 /*return*/, recipe.ThirdParty.getInstanceOrThrow().webJSRecipe.signInAndUp(utils.__assign(utils.__assign({}, input), { userContext: utils.getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }))];
            });
        });
    };
    /*
     * Providers
     */
    Wrapper.Apple = recipe.Apple;
    Wrapper.Bitbucket = recipe.Bitbucket;
    Wrapper.Discord = recipe.Discord;
    Wrapper.Github = recipe.Github;
    Wrapper.Gitlab = recipe.Gitlab;
    Wrapper.Google = recipe.Google;
    Wrapper.GoogleWorkspaces = recipe.GoogleWorkspaces;
    Wrapper.Facebook = recipe.Facebook;
    Wrapper.LinkedIn = recipe.LinkedIn;
    Wrapper.ActiveDirectory = recipe.ActiveDirectory;
    Wrapper.BoxySAML = recipe.BoxySAML;
    Wrapper.Okta = recipe.Okta;
    Wrapper.Twitter = recipe.Twitter;
    Wrapper.ComponentsOverrideProvider = recipe.Provider;
    return Wrapper;
}());
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
var signInAndUp = Wrapper.signInAndUp;
var ThirdpartyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

exports.ActiveDirectory = recipe.ActiveDirectory;
exports.Apple = recipe.Apple;
exports.Bitbucket = recipe.Bitbucket;
exports.BoxySAML = recipe.BoxySAML;
exports.Discord = recipe.Discord;
exports.Facebook = recipe.Facebook;
exports.Github = recipe.Github;
exports.Gitlab = recipe.Gitlab;
exports.Google = recipe.Google;
exports.GoogleWorkspaces = recipe.GoogleWorkspaces;
exports.LinkedIn = recipe.LinkedIn;
exports.Okta = recipe.Okta;
exports.Twitter = recipe.Twitter;
exports.ThirdpartyComponentsOverrideProvider = ThirdpartyComponentsOverrideProvider;
exports.default = Wrapper;
exports.getAuthorisationURLWithQueryParamsAndSetState = getAuthorisationURLWithQueryParamsAndSetState;
exports.getStateAndOtherInfoFromStorage = getStateAndOtherInfoFromStorage;
exports.init = init;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.signInAndUp = signInAndUp;
exports.signOut = signOut;
