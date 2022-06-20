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
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { getNormalisedUserContext } from "../../utils";
import { User } from "../authRecipeWithEmailVerification/types";
import { RecipeFunctionOptions, RecipeInterface } from "supertokens-web-js/recipe/emailpassword";

export default class Wrapper {
    static init(config?: UserInput) {
        return EmailPassword.init(config);
    }

    static async signOut(input?: { userContext?: any }): Promise<void> {
        return EmailPassword.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async isEmailVerified(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return EmailPassword.getInstanceOrThrow().emailVerification.recipeImpl.isEmailVerified({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async verifyEmail(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }> {
        return EmailPassword.getInstanceOrThrow().emailVerification.recipeImpl.verifyEmail({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async sendVerificationEmail(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return EmailPassword.getInstanceOrThrow().emailVerification.recipeImpl.sendVerificationEmail({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getEmailVerificationTokenFromURL(input?: { userContext?: any }): string {
        return EmailPassword.getInstanceOrThrow().emailVerification.recipeImpl.getEmailVerificationTokenFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    // have backwards compatibility to allow input as "signin" | "signup"
    static async redirectToAuth(
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

    static async submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    > {
        return EmailPassword.getInstanceOrThrow().recipeImpl.submitNewPassword({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async sendPasswordResetEmail(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    > {
        return EmailPassword.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async signUp(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    > {
        return EmailPassword.getInstanceOrThrow().recipeImpl.signUp({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async signIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
        | {
              status: "WRONG_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
    > {
        return EmailPassword.getInstanceOrThrow().recipeImpl.signIn({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return EmailPassword.getInstanceOrThrow().recipeImpl.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getResetPasswordTokenFromURL(input?: { userContext?: any }): string {
        return EmailPassword.getInstanceOrThrow().recipeImpl.getResetPasswordTokenFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
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
const verifyEmail = Wrapper.verifyEmail;
const sendVerificationEmail = Wrapper.sendVerificationEmail;
const getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
const redirectToAuth = Wrapper.redirectToAuth;
const submitNewPassword = Wrapper.submitNewPassword;
const sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
const signUp = Wrapper.signUp;
const signIn = Wrapper.signIn;
const doesEmailExist = Wrapper.doesEmailExist;
const SignInAndUp = Wrapper.SignInAndUp;
const getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
const ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;
const EmailVerification = Wrapper.EmailVerification;

export {
    EmailPasswordAuth,
    init,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
    getEmailVerificationTokenFromURL,
    SignInAndUp,
    SignInAndUpTheme,
    signOut,
    redirectToAuth,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
    getResetPasswordTokenFromURL,
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
