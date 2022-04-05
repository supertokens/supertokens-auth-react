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
import ThirdPartyPasswordless from "./recipe";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";

import {
    UserInput,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    TPPWlessRecipeInterface as RecipeInterface,
} from "./types";
import ThirdPartyPasswordlessAuth from "./thirdpartyPasswordlessAuth";
import SignInUpTheme from "./components/themes/signInUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
import { LinkClickedScreen } from "../passwordless/components/themes/linkClickedScreen";
import { getNormalisedUserContext } from "../../utils";

export default class Wrapper {
    static init(config: UserInput) {
        return ThirdPartyPasswordless.init(config);
    }

    static async signOut(): Promise<void> {
        return ThirdPartyPasswordless.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(input?: { userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return ThirdPartyPasswordless.getInstanceOrThrow().emailVerification.isEmailVerified(
            getNormalisedUserContext(input?.userContext)
        );
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
            return ThirdPartyPasswordless.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input);
        } else {
            if (input.redirectBack === false || input.redirectBack === undefined) {
                return ThirdPartyPasswordless.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input.show);
            } else {
                return ThirdPartyPasswordless.getInstanceOrThrow().redirectToAuthWithRedirectToPath(input.show);
            }
        }
    }

    static Google = Google;
    static Apple = Apple;
    static Facebook = Facebook;
    static Github = Github;
    static ThirdPartyPasswordlessAuth = ThirdPartyPasswordlessAuth;
    static SignInAndUp = (prop?: any) =>
        ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("signInUp", prop);
    static SignInAndUpTheme = SignInUpTheme;
    static ThirdPartySignInAndUpCallback = (prop?: any) =>
        ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    static EmailVerification = (prop?: any) =>
        ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    static EmailVerificationTheme = EmailVerificationTheme;

    static PasswordlessLinkClickedTheme = LinkClickedScreen;
    static PasswordlessLinkClicked = (prop?: any) =>
        ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("linkClickedScreen", prop);
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const isEmailVerified = Wrapper.isEmailVerified;
const redirectToAuth = Wrapper.redirectToAuth;
const SignInAndUp = Wrapper.SignInAndUp;
const ThirdPartySignInAndUpCallback = Wrapper.ThirdPartySignInAndUpCallback;
const EmailVerification = Wrapper.EmailVerification;
const PasswordlessLinkClicked = Wrapper.PasswordlessLinkClicked;

export {
    ThirdPartyPasswordlessAuth,
    init,
    Apple,
    Google,
    Facebook,
    Github,
    isEmailVerified,
    SignInAndUp,
    SignInUpTheme,
    ThirdPartySignInAndUpCallback,
    signOut,
    redirectToAuth,
    EmailVerification,
    EmailVerificationTheme,
    PasswordlessLinkClicked,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
