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

import { NormalisedBaseConfig } from "../../types";
import { normaliseRecipeModuleConfig } from "../recipeModule/utils";
import { RecipeInterface } from "supertokens-web-js/recipe/session";
import { ConfigType, NormalisedSessionConfig } from "./types";
import { getGlobalClaimValidators } from "supertokens-web-js/utils";
import { ClaimValidationError } from "supertokens-web-js/recipe/session";
import { SessionClaimValidator } from "../../types";

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
    overrideGlobalClaimValidators?:
        | ((globalClaimValidators: SessionClaimValidator[], userContext: any) => SessionClaimValidator[])
        | undefined;
    userContext: any;
}): Promise<{ accessForbidden: boolean; redirectPath?: string; failedClaim?: ClaimValidationError }> => {
    const globalValidatorsMap = getGlobalClaimValidators({
        overrideGlobalClaimValidators,
        userContext,
    }).reduce((map, validator) => {
        map[validator.id] = validator;
        return map;
    }, {} as Record<string, SessionClaimValidator>);

    for (const claim of invalidClaims) {
        const validator = globalValidatorsMap[claim.validatorId];
        const failureCallback = validator.onFailureRedirection;
        if (failureCallback) {
            const redirectPath = await failureCallback({ reason: claim.reason, userContext });
            if (redirectPath) {
                return {
                    accessForbidden: false,
                    redirectPath,
                    failedClaim: claim,
                };
            } else {
                return {
                    accessForbidden: true,
                    failedClaim: claim,
                };
            }
        }
    }

    return {
        accessForbidden: false,
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
