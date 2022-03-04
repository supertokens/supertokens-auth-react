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
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import ThirdPartyAuth from "./thirdpartyAuth";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import Apple from "./providers/apple";
import Google from "./providers/google";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
import { getNormalisedUserContext } from "../../utils";
import { User } from "../authRecipeWithEmailVerification/types";
import { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";
export default class Wrapper {
    /*
     * Static attributes.
     */

    static init(config: UserInput) {
        return ThirdParty.init(config);
    }

    static async signOut(): Promise<void> {
        return ThirdParty.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(input?: { userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return ThirdParty.getInstanceOrThrow().emailVerification.isEmailVerified(
            getNormalisedUserContext(input?.userContext)
        );
    }

    static async verifyEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return ThirdParty.getInstanceOrThrow().emailVerification.recipeImpl.verifyEmail({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static sendVerificationEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return ThirdParty.getInstanceOrThrow().emailVerification.recipeImpl.sendVerificationEmail({
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
            return ThirdParty.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input);
        } else {
            if (input.redirectBack === false || input.redirectBack === undefined) {
                return ThirdParty.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input.show);
            } else {
                return ThirdParty.getInstanceOrThrow().redirectToAuthWithRedirectToPath(input.show);
            }
        }
    }

    static getAuthorizationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        authorisationURL: string;
        userContext?: any;
        providerClientId?: string;
    }): Promise<string> {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthorizationURLWithQueryParamsAndSetState({
            providerId: input.providerId,
            authorisationURL: input.authorisationURL,
            providerClientId: input.providerClientId,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signInAndUp(input?: { userContext?: any }): Promise<
        | {
              status: "OK";
              user: User;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    > {
        return ThirdParty.getInstanceOrThrow().recipeImpl.signInAndUp({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /*
     * Providers
     */
    static Google = Google;
    static Apple = Apple;
    static Facebook = Facebook;
    static Github = Github;
    static ThirdPartyAuth = ThirdPartyAuth;
    static SignInAndUp = (prop?: any) => ThirdParty.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    static SignInAndUpTheme = SignInAndUpTheme;
    static EmailVerification = (prop?: any) =>
        ThirdParty.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    static EmailVerificationTheme = EmailVerificationTheme;
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const isEmailVerified = Wrapper.isEmailVerified;
const verifyEmail = Wrapper.verifyEmail;
const sendVerificationEmail = Wrapper.sendVerificationEmail;
const getAuthorizationURLWithQueryParamsAndSetState = Wrapper.getAuthorizationURLWithQueryParamsAndSetState;
const signInAndUp = Wrapper.signInAndUp;
const redirectToAuth = Wrapper.redirectToAuth;
const SignInAndUp = Wrapper.SignInAndUp;
const EmailVerification = Wrapper.EmailVerification;

export {
    ThirdPartyAuth,
    init,
    Apple,
    Google,
    Facebook,
    Github,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
    signInAndUp,
    getAuthorizationURLWithQueryParamsAndSetState,
    SignInAndUp,
    SignInAndUpTheme,
    signOut,
    redirectToAuth,
    EmailVerification,
    EmailVerificationTheme,
    User,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
