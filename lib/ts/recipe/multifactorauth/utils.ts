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

import { logDebugMessage } from "../../logger";
import { normaliseRecipeModuleConfig } from "../recipeModule/utils";

import type MultiFactorAuth from "./recipe";
import type { Config, NormalisedConfig } from "./types";
import type { UserContext } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";
import type { MFAFactorInfo } from "supertokens-web-js/recipe/multifactorauth/types";

export function normaliseMultiFactorAuthFeature(config?: Config): NormalisedConfig {
    if (config === undefined) {
        config = {};
    }
    const disableDefaultUI = config.disableDefaultUI === true;

    const override = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    return {
        ...normaliseRecipeModuleConfig(config),
        disableDefaultUI,
        firstFactors: config?.firstFactors,
        getSecondaryFactorInfo: (orig) => orig,
        factorChooserScreen: config.factorChooserScreen ?? {},
        override,
    };
}

export function getAvailableFactors(
    factors: MFAFactorInfo,
    nextArrayQueryParam: string | undefined,
    recipe: MultiFactorAuth,
    userContext: UserContext
) {
    logDebugMessage(`getAvailableFactors: allowed to setup: ${factors.allowedToSetup}`);
    logDebugMessage(`getAvailableFactors: already setup: ${factors.alreadySetup}`);
    logDebugMessage(`getAvailableFactors: next from factorInfo: ${factors.next}`);
    logDebugMessage(`getAvailableFactors: nextArrayQueryParam: ${nextArrayQueryParam}`);
    logDebugMessage(
        `getAvailableFactors: secondary factors: ${recipe.getSecondaryFactors(userContext).map((f) => f.id)}`
    );

    // There are 3 cases here:
    // 1. The app provided an array of factors to show (nextArrayQueryParam) -> we show whatever is in the array
    // 2. no app provided list and validator passed -> we show all factors available to set up or complete
    // 3. no app provided list and validator failing -> we show whatever the BE tells us to (this is already filtered by allowedToSetup&alreadySetup on the BE)
    const nextArr = nextArrayQueryParam !== undefined ? nextArrayQueryParam.split(",") : factors.next;
    const availableFactors = recipe
        .getSecondaryFactors(userContext)
        .filter(({ id }) =>
            nextArr.length === 0
                ? factors.allowedToSetup.includes(id) || factors.alreadySetup.includes(id)
                : nextArr.includes(id)
        );
    return availableFactors;
}
