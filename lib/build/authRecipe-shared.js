"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");

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
function normaliseAuthRecipe(config) {
    return genericComponentOverrideContext.normaliseRecipeModuleConfig(config);
}
function selectComponentsToCoverAllFirstFactors(comps, firstFactorIds) {
    if (firstFactorIds.length === 0) {
        return undefined;
    }
    var _loop_1 = function (i) {
        var c = comps[i];
        // We check what factorIds are left if we select c
        var factorIdsLeft = firstFactorIds.filter(function (id) {
            return !c.factorIds.includes(id);
        });
        if (factorIdsLeft.length === 0) {
            return { value: [c] };
        }
        // If there are other factors we need to cover, we filter down the component list to things that
        // fit the remaining factor ids. This will remove overlapping components
        // E.g.: if we just selected the emailpassword+pwless component, the emailpassword sign in/up components
        // will be removed, since emailpassword is not in factorIdsLeft
        var componentsLeft = comps.filter(function (c) {
            return c.factorIds.every(function (id) {
                return factorIdsLeft.includes(id);
            });
        });
        // if we both have components and factors left after selecting c, we recurse
        if (componentsLeft.length !== 0) {
            var nextComps = selectComponentsToCoverAllFirstFactors(componentsLeft, factorIdsLeft);
            if (nextComps !== undefined) {
                return { value: genericComponentOverrideContext.__spreadArray([c], nextComps, true) };
            }
        }
    };
    for (var i = 0; i < comps.length; ++i) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object") return state_1.value;
    }
    // if we run out of components, we can't cover all factorids with this set of components
    return undefined;
}

exports.normaliseAuthRecipe = normaliseAuthRecipe;
exports.selectComponentsToCoverAllFirstFactors = selectComponentsToCoverAllFirstFactors;
