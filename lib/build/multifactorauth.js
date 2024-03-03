"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var componentOverrideContext = require("./multifactorauth-shared3.js");
var recipe = require("./multifactorauth-shared2.js");
var types = require("./multifactorauth-shared.js");
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
require("supertokens-web-js/recipe/session");

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
        return recipe.MultiFactorAuth.init(config);
    };
    Wrapper.resyncSessionAndFetchMFAInfo = function (input) {
        return recipe.MultiFactorAuth.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo(
            genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, input), {
                userContext: genericComponentOverrideContext.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.redirectToFactor = function (factorId, forceSetup, redirectBack, navigate, userContext) {
        if (forceSetup === void 0) {
            forceSetup = false;
        }
        if (redirectBack === void 0) {
            redirectBack = true;
        }
        return recipe.MultiFactorAuth.getInstanceOrThrow().redirectToFactor(
            factorId,
            forceSetup,
            redirectBack,
            navigate,
            userContext
        );
    };
    Wrapper.redirectToFactorChooser = function (redirectBack, nextFactorOptions, navigate, userContext) {
        if (redirectBack === void 0) {
            redirectBack = true;
        }
        if (nextFactorOptions === void 0) {
            nextFactorOptions = [];
        }
        return recipe.MultiFactorAuth.getInstanceOrThrow().redirectToFactorChooser(
            redirectBack,
            nextFactorOptions,
            navigate,
            userContext
        );
    };
    Wrapper.MultiFactorAuthClaim = recipe.MultiFactorAuth.MultiFactorAuthClaim;
    Wrapper.FactorIds = types.FactorIds;
    Wrapper.ComponentsOverrideProvider = componentOverrideContext.Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var resyncSessionAndFetchMFAInfo = Wrapper.resyncSessionAndFetchMFAInfo;
var redirectToFactor = Wrapper.redirectToFactor;
var redirectToFactorChooser = Wrapper.redirectToFactorChooser;
var MultiFactorAuthComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
var MultiFactorAuthClaim = recipe.MultiFactorAuth.MultiFactorAuthClaim;

exports.FactorIds = types.FactorIds;
exports.MultiFactorAuthClaim = MultiFactorAuthClaim;
exports.MultiFactorAuthComponentsOverrideProvider = MultiFactorAuthComponentsOverrideProvider;
exports.default = Wrapper;
exports.init = init;
exports.redirectToFactor = redirectToFactor;
exports.redirectToFactorChooser = redirectToFactorChooser;
exports.resyncSessionAndFetchMFAInfo = resyncSessionAndFetchMFAInfo;
