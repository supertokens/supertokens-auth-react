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
import ThirdPartyEmailPassword from "./recipe";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";

import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, RecipeInterface } from "./types";
import ThirdPartyEmailPasswordAuth from "./thirdpartyEmailpasswordAuth";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
import { getNormalisedUserContext } from "../../utils";

export default class Wrapper {
    static init(config: UserInput) {
        return ThirdPartyEmailPassword.init(config);
    }

    static async signOut(): Promise<void> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(input?: { userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().emailVerification.isEmailVerified(
            getNormalisedUserContext(input?.userContext)
        );
    }

    static async verifyEmail(input: { userContext?: any }): Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        const recipeInstance: ThirdPartyEmailPassword = ThirdPartyEmailPassword.getInstanceOrThrow();

        return recipeInstance.emailVerification.recipeImpl.verifyEmail({
            config: recipeInstance.emailVerification.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static sendVerificationEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        const recipeInstance: ThirdPartyEmailPassword = ThirdPartyEmailPassword.getInstanceOrThrow();

        return recipeInstance.emailVerification.recipeImpl.sendVerificationEmail({
            config: recipeInstance.emailVerification.config,
            userContext: getNormalisedUserContext(input?.userContext),
        });
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
            return ThirdPartyEmailPassword.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input);
        } else {
            if (input.redirectBack === false || input.redirectBack === undefined) {
                return ThirdPartyEmailPassword.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input.show);
            } else {
                return ThirdPartyEmailPassword.getInstanceOrThrow().redirectToAuthWithRedirectToPath(input.show);
            }
        }
    }

    static Google = Google;
    static Apple = Apple;
    static Facebook = Facebook;
    static Github = Github;
    static ThirdPartyEmailPasswordAuth = ThirdPartyEmailPasswordAuth;
    static SignInAndUp = (prop?: any) =>
        ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    static SignInAndUpTheme = SignInAndUpTheme;
    static ResetPasswordUsingToken = (prop?: any) =>
        ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("resetpassword", prop);
    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;
    static EmailVerification = (prop?: any) =>
        ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    static EmailVerificationTheme = EmailVerificationTheme;
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const isEmailVerified = Wrapper.isEmailVerified;
const verifyEmail = Wrapper.verifyEmail;
const sendVerificationEmail = Wrapper.sendVerificationEmail;
const redirectToAuth = Wrapper.redirectToAuth;
const SignInAndUp = Wrapper.SignInAndUp;
const EmailVerification = Wrapper.EmailVerification;
const ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;

export {
    ThirdPartyEmailPasswordAuth,
    init,
    Apple,
    Google,
    Facebook,
    Github,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
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
    UserInput,
    RecipeInterface,
};
