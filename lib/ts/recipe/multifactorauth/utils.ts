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

import { normaliseRecipeModuleConfig } from "../recipeModule/utils";

import type { Config, NormalisedConfig } from "./types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";

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
