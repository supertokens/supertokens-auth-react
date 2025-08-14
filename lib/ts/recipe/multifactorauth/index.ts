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

/*
 * Imports.
 */
import { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";

import { getNormalisedUserContext } from "../../utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import MultiFactorAuthRecipe from "./recipe";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { UserInput, FactorIds } from "./types";

import type { Navigate, UserContext } from "../../types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/multifactorauth";
import type { MFAFactorInfo } from "supertokens-web-js/recipe/multifactorauth/types";

export default class Wrapper {
    static MultiFactorAuthClaim = MultiFactorAuthRecipe.MultiFactorAuthClaim;
    static FactorIds = FactorIds;

    static init(config?: UserInput) {
        return MultiFactorAuthRecipe.init(config);
    }

    static resyncSessionAndFetchMFAInfo(input?: {
        userContext?: UserContext;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        factors: MFAFactorInfo;
        emails: Record<string, string[] | undefined>;
        phoneNumbers: Record<string, string[] | undefined>;
        fetchResponse: Response;
    }> {
        return MultiFactorAuthRecipe.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static redirectToFactor(input: {
        factorId: string;
        forceSetup?: boolean;
        stepUp?: boolean;
        redirectBack?: boolean;
        navigate?: Navigate;
        userContext?: UserContext;
    }) {
        return MultiFactorAuthRecipe.getInstanceOrThrow().redirectToFactor({
            factorId: input.factorId,
            forceSetup: input.forceSetup ?? false,
            redirectBack: input.redirectBack ?? true,
            stepUp: input.stepUp ?? false,
            navigate: input.navigate,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static redirectToFactorChooser(input: {
        redirectBack?: boolean;
        nextFactorOptions?: string[];
        stepUp?: boolean;
        navigate?: Navigate;
        userContext?: UserContext;
    }) {
        return MultiFactorAuthRecipe.getInstanceOrThrow().redirectToFactorChooser({
            nextFactorOptions: input.nextFactorOptions ?? [],
            redirectBack: input.redirectBack ?? true,
            stepUp: input.stepUp ?? false,
            navigate: input.navigate,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getSecondaryFactors(input: { userContext?: UserContext }) {
        return MultiFactorAuthRecipe.getInstanceOrThrow().getSecondaryFactors(
            getNormalisedUserContext(input.userContext)
        );
    }

    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const resyncSessionAndFetchMFAInfo = Wrapper.resyncSessionAndFetchMFAInfo;
const redirectToFactor = Wrapper.redirectToFactor;
const redirectToFactorChooser = Wrapper.redirectToFactorChooser;
const getSecondaryFactors = Wrapper.getSecondaryFactors;
const MultiFactorAuthComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
const MultiFactorAuthClaim = MultiFactorAuthRecipe.MultiFactorAuthClaim;

export {
    init,
    resyncSessionAndFetchMFAInfo,
    redirectToFactor,
    redirectToFactorChooser,
    getSecondaryFactors,
    MultiFactorAuthComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    MultiFactorAuthClaim,
    FactorIds,
};
