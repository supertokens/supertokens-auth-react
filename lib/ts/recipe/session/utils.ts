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

import type { ConfigType, NormalisedSessionConfig } from "./types";
import type { NormalisedBaseConfig } from "../../types";
import type { SessionClaimValidator } from "../../types";
import type { ClaimValidationError } from "supertokens-web-js/recipe/session";
import type { RecipeInterface } from "supertokens-web-js/recipe/session";

export function normaliseSessionConfig(config: ConfigType): NormalisedSessionConfig {
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
        userContext: any
    ) => SessionClaimValidator[];
    userContext: any;
}): Promise<{ accessForbidden: boolean; redirectPath?: string; failedClaim?: ClaimValidationError }> => {
    const invalidClaimsMap = invalidClaims.reduce((map, validator) => {
        map[validator.validatorId] = validator;
        return map;
    }, {} as Record<string, ClaimValidationError>);
    const globalValidators = getGlobalClaimValidators({
        overrideGlobalClaimValidators,
        userContext,
    }) as SessionClaimValidator[];
    let failedClaimWithoutCallback: ClaimValidationError | undefined;
    for (const validator of globalValidators) {
        const claim = invalidClaimsMap[validator.id];
        if (claim !== undefined) {
            const failureCallback = validator.onFailureRedirection;
            if (failureCallback) {
                const redirectPath = await failureCallback({ reason: claim.reason, userContext });
                if (redirectPath !== undefined) {
                    return {
                        accessForbidden: false,
                        redirectPath,
                        failedClaim: claim,
                    };
                }
            } else if (failedClaimWithoutCallback === undefined) {
                failedClaimWithoutCallback = claim;
            }
        }
    }

    return {
        accessForbidden: failedClaimWithoutCallback !== undefined,
        failedClaim: failedClaimWithoutCallback,
    };
};

export const getSuccessRedirectionPath = async ({
    invalidClaims,
    overrideGlobalClaimValidators,
    userContext,
}: {
    invalidClaims: ClaimValidationError[];
    overrideGlobalClaimValidators?: (
        globalClaimValidators: SessionClaimValidator[],
        userContext: any
    ) => SessionClaimValidator[];
    userContext: any;
}): Promise<string | undefined> => {
    const globalValidators: SessionClaimValidator[] = getGlobalClaimValidators({
        overrideGlobalClaimValidators,
        userContext,
    });
    const invalidClaimsIDs = invalidClaims.map(({ validatorId }) => validatorId);
    let succeededClaimValidatorRedirectString;
    for (const validator of globalValidators) {
        if (!invalidClaimsIDs.includes(validator.id)) {
            const redirectPath = await validator.onSuccessRedirection?.({ userContext });
            if (redirectPath !== undefined) {
                succeededClaimValidatorRedirectString = redirectPath;
                break;
            }
        }
    }
    return succeededClaimValidatorRedirectString;
};
