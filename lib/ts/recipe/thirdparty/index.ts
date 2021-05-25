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
 * Import
 */

// /!\ ThirdParty must be imported before any of the providers to prevent circular dependencies.
import ThirdParty from "./recipe";
import { SuccessAPIResponse } from "../../types";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import EmailVerification from "./components/features/emailVerification/wrapper";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import ThirdPartyAuth from "./thirdpartyAuth";
import SignInAndUp from "./components/features/signInAndUp/wrapper";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import Apple from "./providers/apple";
import Google from "./providers/google";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
/*
 * Class.
 */
export default class ThirdPartyAPIWrapper {
    /*
     * Static attributes.
     */

    static init(config: UserInput) {
        return ThirdParty.init(config);
    }

    static async signOut(): Promise<SuccessAPIResponse> {
        return ThirdParty.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(): Promise<boolean> {
        return ThirdParty.getInstanceOrThrow().emailVerification.isEmailVerified();
    }

    static redirectToAuth(show?: "signin" | "signup"): void {
        return ThirdParty.getInstanceOrThrow().redirectToAuth(show);
    }

    /*
     * Providers
     */
    static Google = Google;
    static Apple = Apple;
    static Facebook = Facebook;
    static Github = Github;
    static ThirdPartyAuth = ThirdPartyAuth;
    static SignInAndUp = SignInAndUp;
    static SignInAndUpTheme = SignInAndUpTheme;
    static EmailVerification = EmailVerification;
    static EmailVerificationTheme = EmailVerificationTheme;
}

const init = ThirdPartyAPIWrapper.init;
const signOut = ThirdPartyAPIWrapper.signOut;
const isEmailVerified = ThirdPartyAPIWrapper.isEmailVerified;
const redirectToAuth = ThirdPartyAPIWrapper.redirectToAuth;

export {
    ThirdPartyAuth,
    ThirdPartyAPIWrapper,
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
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
};
