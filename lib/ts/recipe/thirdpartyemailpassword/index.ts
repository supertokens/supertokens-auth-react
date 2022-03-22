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

import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import ThirdPartyEmailPasswordAuth from "./thirdpartyEmailpasswordAuth";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
import { getNormalisedUserContext } from "../../utils";
import { RecipeInterface, UserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { redirectToThirdPartyLogin as UtilsRedirectToThirdPartyLogin } from "../thirdparty/utils";
import { SignInAndUpCallbackTheme } from "../thirdparty/components/themes/signInAndUpCallback";

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

    static async verifyEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().emailVerification.recipeImpl.verifyEmail({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static sendVerificationEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().emailVerification.recipeImpl.sendVerificationEmail({
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
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.submitNewPassword({
            ...input,
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
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static emailPasswordSignUp(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: UserType;
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
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.emailPasswordSignUp({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static emailPasswordSignIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: UserType;
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
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.emailPasswordSignIn({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static doesEmailExist(input: { email: string; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async redirectToThirdPartyLogin(input: {
        thirdPartyId: string;
        userContext?: any;
    }): Promise<{ status: "OK" | "ERROR" }> {
        const recipeInstance: ThirdPartyEmailPassword = ThirdPartyEmailPassword.getInstanceOrThrow();

        if (recipeInstance.thirdPartyRecipe === undefined) {
            throw new Error(
                "Third party email password was initialised without any social providers. This function is only available if at least one social provider is initialised"
            );
        }

        return UtilsRedirectToThirdPartyLogin({
            thirdPartyId: input.thirdPartyId,
            config: recipeInstance.thirdPartyRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
            recipeImplementation: recipeInstance.thirdPartyRecipe.recipeImpl,
        });
    }

    static thirdPartySignInAndUp(input?: { userContext?: any }): Promise<
        | {
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    > {
        /**
         * We do it this way here because prettier behaves in a weird way without it.
         * If you return directly, build-pretty will succeed but pretty-check will fail
         * when you try to commit and you will have to run pretty manually every time
         */
        const recipeInstance: ThirdPartyEmailPassword = ThirdPartyEmailPassword.getInstanceOrThrow();
        return recipeInstance.recipeImpl.thirdPartySignInAndUp({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
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
    static SignInAndUpCallback = (prop?: any) =>
        ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    static SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
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
const submitNewPassword = Wrapper.submitNewPassword;
const sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
const emailPasswordSignIn = Wrapper.emailPasswordSignIn;
const emailPasswordSignUp = Wrapper.emailPasswordSignUp;
const doesEmailExist = Wrapper.doesEmailExist;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
const SignInAndUpCallback = Wrapper.SignInAndUpCallback;

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
    SignInAndUpCallback,
    SignInAndUpCallbackTheme,
    signOut,
    redirectToAuth,
    submitNewPassword,
    sendPasswordResetEmail,
    emailPasswordSignIn,
    emailPasswordSignUp,
    doesEmailExist,
    redirectToThirdPartyLogin,
    thirdPartySignInAndUp,
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
