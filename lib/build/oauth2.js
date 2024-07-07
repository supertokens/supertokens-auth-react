"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var recipe = require("./oauth2-shared.js");
require("./superTokens.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/recipe/oauth2");
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
        return recipe.OAuth2.init(config);
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
        return recipe.OAuth2.getInstanceOrThrow().webJSRecipe.getLoginChallengeInfo(input);
    };
    return Wrapper;
})();
var init = Wrapper.init;
var getLoginChallengeInfo = Wrapper.getLoginChallengeInfo;

exports.default = Wrapper;
exports.getLoginChallengeInfo = getLoginChallengeInfo;
exports.init = init;
