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
import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";

export default class Wrapper {
    static init(config?: UserInput) {
        return EmailPassword.init(config);
    }

    static async signOut(): Promise<void> {
        return EmailPassword.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(input?: { userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return EmailPassword.getInstanceOrThrow().emailVerification.isEmailVerified(
            getNormalisedUserContext(input?.userContext)
        );
    }

    static async verifyEmail(input: { userContext?: any }): Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        const recipeInstance: EmailPassword = EmailPassword.getInstanceOrThrow();

        return recipeInstance.emailVerification.recipeImpl.verifyEmail({
            config: recipeInstance.emailVerification.webJsRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static sendVerificationEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        const recipeInstance: EmailPassword = EmailPassword.getInstanceOrThrow();

        return recipeInstance.emailVerification.recipeImpl.sendVerificationEmail({
            config: recipeInstance.emailVerification.webJsRecipe.config,
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
            return EmailPassword.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input);
        } else {
            if (input.redirectBack === false || input.redirectBack === undefined) {
                return EmailPassword.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input.show);
            } else {
                return EmailPassword.getInstanceOrThrow().redirectToAuthWithRedirectToPath(input.show);
            }
        }
    }

    static submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token: string;
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
        const recipeInstance: EmailPassword = EmailPassword.getInstanceOrThrow();

        return recipeInstance.recipeImpl.submitNewPassword({
            ...input,
            config: recipeInstance.webJsRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static sendPasswordResetEmail(input: {
        formFields: {
            id: string;
            value: string;
        }[];
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
        const recipeInstance: EmailPassword = EmailPassword.getInstanceOrThrow();

        return recipeInstance.recipeImpl.sendPasswordResetEmail({
            ...input,
            config: recipeInstance.webJsRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signUp(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        userContext: any;
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
        const recipeInstance: EmailPassword = EmailPassword.getInstanceOrThrow();

        return recipeInstance.recipeImpl.signUp({
            ...input,
            config: recipeInstance.webJsRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static signIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        userContext: any;
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
        const recipeInstance: EmailPassword = EmailPassword.getInstanceOrThrow();

        return recipeInstance.recipeImpl.signIn({
            ...input,
            config: recipeInstance.webJsRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static doesEmailExist(input: { email: string; userContext: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        const recipeInstance: EmailPassword = EmailPassword.getInstanceOrThrow();

        return recipeInstance.recipeImpl.doesEmailExist({
            ...input,
            config: recipeInstance.webJsRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
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
const redirectToAuth = Wrapper.redirectToAuth;
const submitNewPassword = Wrapper.submitNewPassword;
const sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
const signUp = Wrapper.signUp;
const signIn = Wrapper.signIn;
const doesEmailExist = Wrapper.doesEmailExist;
const SignInAndUp = Wrapper.SignInAndUp;
const ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;
const EmailVerification = Wrapper.EmailVerification;

export {
    EmailPasswordAuth,
    init,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
    SignInAndUp,
    SignInAndUpTheme,
    signOut,
    redirectToAuth,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
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
