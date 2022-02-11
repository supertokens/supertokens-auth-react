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

import {
    UserInputForAuthRecipeModule as EmailVerificationUserInput,
    GetRedirectionURLContext as EmailVerificationGetRedirectionURLContext,
    OnHandleEventContext as EmailVerificationOnHandleEventContext,
    PreAPIHookContext as EmailVerificationPreAPIHookContext,
    PreAndPostAPIHookAction as EmailVerificationPreAndPostAPIHookAction,
    ComponentOverrideMap as EmailVerificationComponentOverrideMap,
    RecipeInterface,
} from "../emailverification/types";
import * as AuthRecipeType from "../authRecipe/types";

export type User = AuthRecipeType.User;

export type UserInputOverride = {
    emailVerification?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
        components?: EmailVerificationComponentOverrideMap;
    };
};

export type UserInput<T, PreAndPostAPIHookAction, R> = {
    emailVerificationFeature?: EmailVerificationUserInput;
} & AuthRecipeType.UserInput<T, PreAndPostAPIHookAction, R>;

export type Config<T, PreAndPostAPIHookAction, R> = UserInput<T, PreAndPostAPIHookAction, R> &
    AuthRecipeType.Config<T, PreAndPostAPIHookAction, R>;

export type NormalisedConfig<T, PreAndPostAPIHookAction, R> = {
    emailVerificationFeature?: EmailVerificationUserInput;
    override?: {
        emailVerification?: {
            functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
            components?: EmailVerificationComponentOverrideMap;
        };
    };
} & AuthRecipeType.NormalisedConfig<T, PreAndPostAPIHookAction, R>;

export type GetRedirectionURLContext =
    | AuthRecipeType.GetRedirectionURLContext
    | EmailVerificationGetRedirectionURLContext;

export type PreAndPostAPIHookAction = EmailVerificationPreAndPostAPIHookAction;

export type PreAPIHookContext = EmailVerificationPreAPIHookContext;

export type OnHandleEventContext = AuthRecipeType.OnHandleEventContext | EmailVerificationOnHandleEventContext;
