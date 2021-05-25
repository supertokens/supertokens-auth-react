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
import { Config } from "./types";

import EmailPassword from "./recipe";
import EmailPasswordAuth from "./components/emailPasswordAuth";
import SignInAndUp from "./components/features/signInAndUp/wrapper";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ResetPasswordUsingToken from "./components/features/resetPasswordUsingToken/wrapper";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import EmailVerification from "./components/features/emailVerification/wrapper";
import {
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
} from "./types";
/*
 * Class.
 */
export default class EmailPasswordAPIWrapper {
    /*
     * Static attributes.
     */

    static EmailPasswordAuth = EmailPasswordAuth;
    static SignInAndUp = SignInAndUp;
    static SignInAndUpTheme = SignInAndUpTheme;

    static ResetPasswordUsingToken = ResetPasswordUsingToken;
    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;

    static EmailVerification = EmailVerification;
    static EmailVerificationTheme = EmailVerificationTheme;

    /*
     * Methods.
     */

    static init(
        config?: Config
    ) {
        return EmailPassword.init(config);
    }

    static async signOut(): Promise<SuccessAPIResponse> {
        return EmailPassword.signOut();
    }

    static async isEmailVerified(): Promise<boolean> {
        return EmailPassword.isEmailVerified();
    }

    static redirectToAuth(show?: "signin" | "signup"): void {
        return EmailPassword.redirectToAuth(show);
    }
}

const init = EmailPasswordAPIWrapper.init;
const signOut = EmailPasswordAPIWrapper.signOut;
const isEmailVerified = EmailPasswordAPIWrapper.isEmailVerified;
const redirectToAuth = EmailPasswordAPIWrapper.redirectToAuth;

export {
    EmailPasswordAuth,
    EmailPasswordAPIWrapper,
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
    Config
};
