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

/*
 * Imports.
 */
import { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";

import { getNormalisedUserContext } from "../../utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import MultiFactorAuthRecipe from "./recipe";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { UserInput } from "./types";

import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/multifactorauth";
import type { MFAFactorInfo } from "supertokens-web-js/recipe/multifactorauth/types";

export default class Wrapper {
    static MultiFactorAuthClaim = MultiFactorAuthRecipe.MultiFactorAuthClaim;

    static init(config?: UserInput) {
        return MultiFactorAuthRecipe.init(config);
    }

    static getMFAInfo(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        factors: MFAFactorInfo;
        fetchResponse: Response;
    }> {
        return MultiFactorAuthRecipe.getInstanceOrThrow().webJSRecipe.getMFAInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const getMFAInfo = Wrapper.getMFAInfo;
const MultiFactorAuthComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
const MultiFactorAuthClaim = MultiFactorAuthRecipe.MultiFactorAuthClaim;

export {
    init,
    getMFAInfo,
    MultiFactorAuthComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    MultiFactorAuthClaim,
};