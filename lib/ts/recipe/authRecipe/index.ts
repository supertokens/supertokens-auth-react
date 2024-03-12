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
import { getNormalisedUserContext } from "../../utils";
import RecipeModule from "../recipeModule";
import Session from "../session/recipe";

import type { NormalisedConfig, OnHandleEventContext } from "./types";
import type { UserContext } from "../../types";

export default abstract class AuthRecipe<
    T,
    Action,
    R,
    N extends NormalisedConfig<T, Action, R | OnHandleEventContext>
> extends RecipeModule<T, Action, R | OnHandleEventContext, N> {
    public abstract firstFactorIds: string[];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAuthRecipeDefaultRedirectionURL = async (_context: T): Promise<string> => {
        throw new Error("Should never come here");
    };

    signOut = async (input?: { userContext?: UserContext }): Promise<void> => {
        return await Session.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    };

    doesSessionExist = async (input?: { userContext?: UserContext }): Promise<boolean> => {
        return await Session.getInstanceOrThrow().doesSessionExist({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    };
}
