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

import { normaliseRecipeModuleConfig } from "../recipeModule/utils";

import type { Config, NormalisedConfig } from "./types";
import type { PartialAuthComponent } from "../../types";

export function normaliseAuthRecipe<T, S, R>(config: Config<T, S, R>): NormalisedConfig<T, S, R> {
    return normaliseRecipeModuleConfig(config);
}

export function selectComponentsToCoverAllFirstFactors(
    comps: PartialAuthComponent[],
    firstFactorIds: string[]
): PartialAuthComponent[] | undefined {
    if (firstFactorIds.length === 0) {
        return undefined;
    }

    for (let i = 0; i < comps.length; ++i) {
        const c = comps[i];

        // We check what factorIds are left if we select c
        const factorIdsLeft = firstFactorIds.filter((id) => !c.factorIds.includes(id));
        if (factorIdsLeft.length === 0) {
            return [c];
        }
        // If there are other factors we need to cover, we filter down the component list to things that
        // fit the remaining factor ids. This will remove overlapping components
        // E.g.: if we just selected the emailpassword+pwless component, the emailpassword sign in/up components
        // will be removed, since emailpassword is not in factorIdsLeft
        const componentsLeft = comps.filter((c) => c.factorIds.every((id) => factorIdsLeft.includes(id)));

        // if we both have components and factors left after selecting c, we recurse
        if (componentsLeft.length !== 0) {
            const nextComps = selectComponentsToCoverAllFirstFactors(componentsLeft, factorIdsLeft);
            if (nextComps !== undefined) {
                return [c, ...nextComps];
            }
        }
        // if we do not have any components left after selecting c (but it didn't cover all factors),
        // or if we couldn't cover all factors after selecting c
        // we check the next option in the list
    }
    // if we run out of components, we can't cover all factorids with this set of components
    return undefined;
}
