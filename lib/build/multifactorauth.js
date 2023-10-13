"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var componentOverrideContext = require("./multifactorauth-shared2.js");
var recipe = require("./multifactorauth-shared.js");
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
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");

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
    Wrapper.init = function (config) {
        return recipe.MultiFactorAuth.init(config);
    };
    Wrapper.getMFAInfo = function (input) {
        return recipe.MultiFactorAuth.getInstanceOrThrow().webJSRecipe.getMFAInfo(
            genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, input), {
                userContext: genericComponentOverrideContext.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.MultiFactorAuthClaim = recipe.MultiFactorAuth.MultiFactorAuthClaim;
    Wrapper.ComponentsOverrideProvider = componentOverrideContext.Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var getMFAInfo = Wrapper.getMFAInfo;
var MultiFactorAuthComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
var MultiFactorAuthClaim = recipe.MultiFactorAuth.MultiFactorAuthClaim;

exports.MultiFactorAuthClaim = MultiFactorAuthClaim;
exports.MultiFactorAuthComponentsOverrideProvider = MultiFactorAuthComponentsOverrideProvider;
exports.default = Wrapper;
exports.getMFAInfo = getMFAInfo;
exports.init = init;
