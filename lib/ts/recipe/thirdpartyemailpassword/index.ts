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
import ThirdPartyEmailPassword from "./thirdpartyEmailpassword";
import { SuccessAPIResponse } from "../../types";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import EmailVerification from "./components/features/emailVerification/wrapper";
import ResetPasswordUsingToken from "./components/features/resetPasswordUsingToken/wrapper";
import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";

import {
    Config,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
} from "./types";
import ThirdPartyEmailPasswordAuth from "./thirdpartyEmailpasswordAuth";
import SignInAndUp from "./components/features/signInAndUp/wrapper";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
/*
 * Class.
 */
export default class ThirdPartyEmailPasswordAPIWrapper {
    /*
     * Static attributes.
     */

    static init(
        config: Config
    ) {
        return ThirdPartyEmailPassword.init(config);
    }

    static async signOut(): Promise<SuccessAPIResponse> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(): Promise<boolean> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().emailVerification.isEmailVerified();
    }

    static redirectToAuth(show?: "signin" | "signup"): void {
        return ThirdPartyEmailPassword.getInstanceOrThrow().redirectToAuth(show);
    }

    /*
     * Providers
     */
    static Google = Google;
    static Apple = Apple;
    static Facebook = Facebook;
    static Github = Github;
    static ThirdPartyEmailPasswordAuth = ThirdPartyEmailPasswordAuth;
    static SignInAndUp = SignInAndUp;
    static SignInAndUpTheme = SignInAndUpTheme;
    static ResetPasswordUsingToken = ResetPasswordUsingToken;
    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;
    static EmailVerification = EmailVerification;
    static EmailVerificationTheme = EmailVerificationTheme;
}

const init = ThirdPartyEmailPasswordAPIWrapper.init;
const signOut = ThirdPartyEmailPasswordAPIWrapper.signOut;
const isEmailVerified = ThirdPartyEmailPasswordAPIWrapper.isEmailVerified;
const redirectToAuth = ThirdPartyEmailPasswordAPIWrapper.redirectToAuth;

export {
    ThirdPartyEmailPasswordAuth,
    ThirdPartyEmailPasswordAPIWrapper,
    init,
    Apple,
    Google,
    Facebook,
    Github,
    isEmailVerified,
    SignInAndUp,
    SignInAndUpTheme,
    signOut,
    redirectToAuth,
    EmailVerification,
    EmailVerificationTheme,
    ResetPasswordUsingToken,
    ResetPasswordUsingTokenTheme,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
};
