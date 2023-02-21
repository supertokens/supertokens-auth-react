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

import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";

import { getNormalisedUserContext } from "../../utils";
import RecipeModule from "../recipeModule";
import Session from "../session/recipe";
import SessionRecipe from "../session/recipe";

import type { NormalisedConfig, GetRedirectionURLContext, OnHandleEventContext } from "./types";

export default abstract class AuthRecipe<
    T,
    Action,
    R,
    N extends NormalisedConfig<T | GetRedirectionURLContext, Action, R | OnHandleEventContext>
> extends RecipeModule<T | GetRedirectionURLContext, Action, R | OnHandleEventContext, N> {
    constructor(config: N) {
        super(config);
        PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            const session = SessionRecipe.getInstance();
            if (session !== undefined) {
                session.addAuthRecipeRedirectionHandler(this.config.recipeId, this.redirect.bind(this));
            }
        });
    }

    getAuthRecipeDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "SUCCESS") {
            return context.redirectToPath === undefined ? "/" : context.redirectToPath;
        } else {
            throw new Error("Should never come here");
        }
    };

    signOut = async (input?: { userContext?: any }): Promise<void> => {
        return await Session.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    };

    doesSessionExist = async (input?: { userContext?: any }): Promise<boolean> => {
        return await Session.getInstanceOrThrow().doesSessionExist({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    };
}
