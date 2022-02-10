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
import { UserInput } from "./types";
import EmailVerificationRecipe from "./recipe";
import EmailVerificationTheme from "./components/themes/emailVerification";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, RecipeInterface } from "./types";
import { getNormalisedUserContext } from "../../utils";

export default class Wrapper {
    static EmailVerification = (prop?: any) =>
        EmailVerificationRecipe.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    static EmailVerificationTheme = EmailVerificationTheme;

    static init(config: UserInput) {
        return EmailVerificationRecipe.init(config);
    }

    static async isEmailVerified(input?: { userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return EmailVerificationRecipe.getInstanceOrThrow().isEmailVerified(
            getNormalisedUserContext(input?.userContext)
        );
    }

    static async verifyEmail(input: { token: string; userContext?: any }): Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        let recipeInstance: EmailVerificationRecipe = EmailVerificationRecipe.getInstanceOrThrow();

        return recipeInstance.recipeImpl.verifyEmail({
            token: input.token,
            config: recipeInstance.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static sendVerificationEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        let recipeInstance: EmailVerificationRecipe = EmailVerificationRecipe.getInstanceOrThrow();

        return recipeInstance.recipeImpl.sendVerificationEmail({
            config: recipeInstance.config,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
}

const init = Wrapper.init;
const isEmailVerified = Wrapper.isEmailVerified;
const verifyEmail = Wrapper.verifyEmail;
const sendVerificationEmail = Wrapper.sendVerificationEmail;
const EmailVerification = Wrapper.EmailVerification;

export {
    init,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
    EmailVerification,
    EmailVerificationTheme,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
