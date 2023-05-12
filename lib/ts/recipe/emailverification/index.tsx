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
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";

import { getNormalisedUserContext } from "../../utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import EmailVerificationRecipe from "./recipe";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { UserInput } from "./types";

import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/emailverification";

export default class Wrapper {
    static EmailVerificationClaim = EmailVerificationRecipe.EmailVerificationClaim;

    static init(config: UserInput) {
        return EmailVerificationRecipe.init(config);
    }

    static async isEmailVerified(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return EmailVerificationRecipe.getInstanceOrThrow().webJSRecipe.isEmailVerified({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async verifyEmail(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }> {
        return EmailVerificationRecipe.getInstanceOrThrow().webJSRecipe.verifyEmail({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async sendVerificationEmail(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return EmailVerificationRecipe.getInstanceOrThrow().webJSRecipe.sendVerificationEmail({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getEmailVerificationTokenFromURL(input?: { userContext?: any }): string {
        return EmailVerificationRecipe.getInstanceOrThrow().webJSRecipe.getEmailVerificationTokenFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const isEmailVerified = Wrapper.isEmailVerified;
const verifyEmail = Wrapper.verifyEmail;
const sendVerificationEmail = Wrapper.sendVerificationEmail;
const getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
const EmailVerificationComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
const EmailVerificationClaim = EmailVerificationRecipe.EmailVerificationClaim;

export {
    init,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
    getEmailVerificationTokenFromURL,
    EmailVerificationComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    EmailVerificationClaim,
};
