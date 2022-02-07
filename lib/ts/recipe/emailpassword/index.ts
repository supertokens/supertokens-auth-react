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

import { UserInput } from "./types";

import EmailPassword from "./recipe";
import EmailPasswordAuth from "./emailPasswordAuth";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, RecipeInterface } from "./types";

export default class Wrapper {
    static init(config?: UserInput) {
        return EmailPassword.init(config);
    }

    static async signOut(): Promise<void> {
        return EmailPassword.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(userContext?: any): Promise<boolean> {
        userContext = userContext === undefined ? {} : userContext;
        return EmailPassword.getInstanceOrThrow().emailVerification.isEmailVerified(userContext);
    }

    // have backwards compatibility to allow input as "signin" | "signup"
    static redirectToAuth(
        input?:
            | ("signin" | "signup")
            | {
                  show?: "signin" | "signup";
                  redirectBack?: boolean;
              }
    ): Promise<void> {
        if (input === undefined || typeof input === "string") {
            return EmailPassword.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input);
        } else {
            if (input.redirectBack === false || input.redirectBack === undefined) {
                return EmailPassword.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input.show);
            } else {
                return EmailPassword.getInstanceOrThrow().redirectToAuthWithRedirectToPath(input.show);
            }
        }
    }

    static EmailPasswordAuth = EmailPasswordAuth;
    static SignInAndUp = (prop?: any) => EmailPassword.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    static SignInAndUpTheme = SignInAndUpTheme;
    static ResetPasswordUsingToken = (prop?: any) =>
        EmailPassword.getInstanceOrThrow().getFeatureComponent("resetpassword", prop);
    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;
    static EmailVerification = (prop?: any) =>
        EmailPassword.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    static EmailVerificationTheme = EmailVerificationTheme;
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const isEmailVerified = Wrapper.isEmailVerified;
const redirectToAuth = Wrapper.redirectToAuth;
const SignInAndUp = Wrapper.SignInAndUp;
const ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;
const EmailVerification = Wrapper.EmailVerification;

export {
    EmailPasswordAuth,
    init,
    isEmailVerified,
    SignInAndUp,
    SignInAndUpTheme,
    signOut,
    redirectToAuth,
    ResetPasswordUsingToken,
    ResetPasswordUsingTokenTheme,
    EmailVerification,
    EmailVerificationTheme,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
