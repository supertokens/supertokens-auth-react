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
import { SuccessAPIResponse } from "../../types";
import { UserInput } from "./types";

import EmailPassword from "./recipe";
import EmailPasswordAuth from "./emailPasswordAuth";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";

export default class Wrapper {
    static init(config?: UserInput) {
        return EmailPassword.init(config);
    }

    static async signOut(): Promise<SuccessAPIResponse> {
        return EmailPassword.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(): Promise<boolean> {
        return EmailPassword.getInstanceOrThrow().emailVerification.isEmailVerified();
    }

    static redirectToAuth(show?: "signin" | "signup"): void {
        return EmailPassword.getInstanceOrThrow().redirectToAuthWithRedirectToPath(show);
    }

    static EmailPasswordAuth = EmailPasswordAuth;
    static SignInAndUp = EmailPassword.getInstanceOrThrow().getFeatureComponent("signinup");
    static SignInAndUpTheme = SignInAndUpTheme;
    static ResetPasswordUsingToken = EmailPassword.getInstanceOrThrow().getFeatureComponent("resetpassword");
    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;
    static EmailVerification = EmailPassword.getInstanceOrThrow().getFeatureComponent("emailverification");
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
};
