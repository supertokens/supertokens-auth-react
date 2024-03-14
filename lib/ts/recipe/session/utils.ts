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

import { getGlobalClaimValidators } from "supertokens-web-js/utils";

import { normaliseRecipeModuleConfig } from "../recipeModule/utils";

import type { InputType, NormalisedSessionConfig } from "./types";
import type { NormalisedBaseConfig, UserContext } from "../../types";
import type { SessionClaimValidator } from "../../types";
import type { ClaimValidationError } from "supertokens-web-js/recipe/session";
import type { RecipeInterface } from "supertokens-web-js/recipe/session";

export function normaliseSessionConfig(config?: InputType): NormalisedSessionConfig {
    if (config === undefined) {
        config = {};
    }

    const accessDeniedScreenStyle = config.accessDeniedScreen?.style ?? "";

    const accessDeniedScreen: NormalisedBaseConfig = {
        style: accessDeniedScreenStyle,
    };

    const override = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    return {
        ...normaliseRecipeModuleConfig(config),
        // TODO: ideally we'd get the default (or normalized) value from supertokens-website
        invalidClaimStatusCode: config.invalidClaimStatusCode ?? 403,
        accessDeniedScreen,
        override,
    };
}

export const getFailureRedirectionInfo = async ({
    invalidClaims,
    overrideGlobalClaimValidators,
    userContext,
}: {
    invalidClaims: ClaimValidationError[];
    overrideGlobalClaimValidators?: (
        globalClaimValidators: SessionClaimValidator[],
        userContext: UserContext
    ) => SessionClaimValidator[];
    userContext: UserContext;
}): Promise<{ redirectPath?: string; failedClaim?: ClaimValidationError }> => {
    const globalValidators = getGlobalClaimValidators({
        overrideGlobalClaimValidators,
        userContext,
    }) as SessionClaimValidator[];

    let failedClaim: ClaimValidationError | undefined = undefined;
    for (const validator of globalValidators) {
        const claim = invalidClaims.find((c) => c.id === validator.id);
        if (claim !== undefined) {
            const failureCallback = validator.onFailureRedirection;
            if (failureCallback) {
                const redirectPath = await failureCallback({ reason: claim.reason, userContext });
                if (redirectPath !== undefined) {
                    return {
                        redirectPath,
                        failedClaim: claim,
                    };
                }
            }
        }
        if (validator.showAccessDeniedOnFailure !== false && failedClaim === undefined) {
            failedClaim = claim;
        }
    }

    return {
        redirectPath: undefined,
        failedClaim,
    };
};
