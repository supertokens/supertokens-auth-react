"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var componentOverrideContext = require("./oauth2provider-shared2.js");
var recipe = require("./oauth2provider-shared.js");
require("./genericComponentOverrideContext.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("react/jsx-runtime");
require("supertokens-web-js/recipe/oauth2provider");
require("./recipeModule-shared.js");

/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
    Wrapper.init = function (config) {
        return recipe.OAuth2Provider.init(config);
    };
    /**
     * Returns information about an OAuth login in progress
     *
     * @param loginChallenge The login challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", info: LoginInfo}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    Wrapper.getLoginChallengeInfo = function (input) {
        return recipe.OAuth2Provider.getInstanceOrThrow().webJSRecipe.getLoginChallengeInfo(input);
    };
    /**
     * Accepts the OAuth2 Login request and returns the redirect URL to continue the OAuth flow.
     *
     * @param loginChallenge The login challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", frontendRedirectTo: string}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    Wrapper.getRedirectURLToContinueOAuthFlow = function (input) {
        return recipe.OAuth2Provider.getInstanceOrThrow().webJSRecipe.getRedirectURLToContinueOAuthFlow(input);
    };
    /**
     * Accepts the OAuth2 Logout request, clears the SuperTokens session and returns post logout redirect URL.
     *
     * @param logoutChallenge The logout challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", frontendRedirectTo: string}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    Wrapper.logOut = function (input) {
        return recipe.OAuth2Provider.getInstanceOrThrow().webJSRecipe.logOut(input);
    };
    Wrapper.ComponentsOverrideProvider = componentOverrideContext.Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var getLoginChallengeInfo = Wrapper.getLoginChallengeInfo;
var logOut = Wrapper.logOut;

exports.RecipeComponentsOverrideContextProvider = componentOverrideContext.Provider;
exports.default = Wrapper;
exports.getLoginChallengeInfo = getLoginChallengeInfo;
exports.init = init;
exports.logOut = logOut;
