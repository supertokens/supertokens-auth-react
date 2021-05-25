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

import { EmailVerificationUserInput, NormalisedEmailVerificationConfig } from "../emailverification/types";
import {
    Config as RecipeModuleConfig,
    NormalisedConfig as NormalisedRecipeModuleConfig
} from "../recipeModule/types"

export type User = {
    id: string;
    email: string;
};

export type Config<T, S, R> = {
    emailVerificationFeature?: EmailVerificationUserInput;
} & RecipeModuleConfig<T, S, R>;

export type NormalisedConfig<T, S, R> = {
    emailVerificationFeature: NormalisedEmailVerificationConfig;
} & NormalisedRecipeModuleConfig<T, S, R>;

export type GetRedirectionURLContext =
    | {
        action: "SUCCESS";
        isNewUser: boolean;
        redirectToPath?: string;
    }
    | {
        action: "SIGN_IN_AND_UP" | "VERIFY_EMAIL";
    };

export type PreAPIHookContext = {
    action: "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED" | "SIGN_OUT" | "SIGN_IN";
    requestInit: RequestInit;
    url: string;
};

export type OnHandleEventContext =
    | {
        action: "SESSION_ALREADY_EXISTS" | "VERIFY_EMAIL_SENT" | "EMAIL_VERIFIED_SUCCESSFUL";
    }
    | {
        action: "SUCCESS";
        isNewUser: boolean;
        user: { id: string; email: string };
    };

export type SignInAndUpState =
    | {
        status: "LOADING" | "READY";
    }
    | {
        status: "SUCCESSFUL";
        user: User;
    };
