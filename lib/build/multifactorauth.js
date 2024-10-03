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
require("./oauth2provider-shared.js");
require("supertokens-web-js/recipe/oauth2provider");

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
    Wrapper.redirectToFactor = function (input) {
        var _a, _b, _c;
        return recipe.MultiFactorAuth.getInstanceOrThrow().redirectToFactor({
            factorId: input.factorId,
            forceSetup: (_a = input.forceSetup) !== null && _a !== void 0 ? _a : false,
            redirectBack: (_b = input.redirectBack) !== null && _b !== void 0 ? _b : true,
            stepUp: (_c = input.stepUp) !== null && _c !== void 0 ? _c : false,
            navigate: input.navigate,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
    };
    Wrapper.redirectToFactorChooser = function (input) {
        var _a, _b, _c;
        return recipe.MultiFactorAuth.getInstanceOrThrow().redirectToFactorChooser({
            nextFactorOptions: (_a = input.nextFactorOptions) !== null && _a !== void 0 ? _a : [],
            redirectBack: (_b = input.redirectBack) !== null && _b !== void 0 ? _b : true,
            stepUp: (_c = input.stepUp) !== null && _c !== void 0 ? _c : false,
            navigate: input.navigate,
            userContext: genericComponentOverrideContext.getNormalisedUserContext(input.userContext),
        });
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
