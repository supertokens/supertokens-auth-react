"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var recipe = require("./multifactorauth-shared.js");

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

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
    Wrapper.redirectToFactor = function (factorId, forceSetup, redirectBack, history) {
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
            history
        );
    };
    Wrapper.redirectToFactorChooser = function (redirectBack, history) {
        if (redirectBack === void 0) {
            redirectBack = true;
        }
        return recipe.MultiFactorAuth.getInstanceOrThrow().redirectToFactorChooser(redirectBack, history);
    };
    Wrapper.MultiFactorAuthClaim = recipe.MultiFactorAuth.MultiFactorAuthClaim;
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var getMFAInfo = Wrapper.getMFAInfo;
var redirectToFactor = Wrapper.redirectToFactor;
var redirectToFactorChooser = Wrapper.redirectToFactorChooser;
var MultiFactorAuthComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
var MultiFactorAuthClaim = recipe.MultiFactorAuth.MultiFactorAuthClaim;

exports.MultiFactorAuthClaim = MultiFactorAuthClaim;
exports.MultiFactorAuthComponentsOverrideProvider = MultiFactorAuthComponentsOverrideProvider;
exports.Wrapper = Wrapper;
exports.getMFAInfo = getMFAInfo;
exports.init = init;
exports.redirectToFactor = redirectToFactor;
exports.redirectToFactorChooser = redirectToFactorChooser;
exports.useContext = useContext;
