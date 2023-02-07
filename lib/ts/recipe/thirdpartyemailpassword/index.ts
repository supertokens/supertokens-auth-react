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
import {
    RecipeInterface,
    EmailPasswordUserType as UserType,
    ThirdPartyUserType,
} from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { getNormalisedUserContext } from "../../utils";
import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
import { SignInAndUpCallbackTheme as ThirdPartySignInAndUpCallbackTheme } from "../thirdparty/components/themes/signInAndUpCallback";
import { redirectToThirdPartyLogin as UtilsRedirectToThirdPartyLogin } from "../thirdparty/utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import ThirdPartyEmailPassword from "./recipe";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";

import type { PropsWithChildren } from "react";
import type { StateObject } from "supertokens-web-js/recipe/thirdparty";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export default class Wrapper {
    static init(config: UserInput) {
        return ThirdPartyEmailPassword.init(config);
    }

    static async signOut(input?: { userContext?: any }): Promise<void> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
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
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.submitNewPassword({
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
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.sendPasswordResetEmail({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async emailPasswordSignUp(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
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

    static async emailPasswordSignIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
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

    static async doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getResetPasswordTokenFromURL(input?: { userContext?: any }): string {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getResetPasswordTokenFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
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

    static async getAuthorisationURLFromBackend(input: {
        providerId: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async thirdPartySignInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: ThirdPartyUserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    > {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.thirdPartySignInAndUp({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getStateAndOtherInfoFromStorage({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async setStateAndOtherInfoToStorage<CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext?: any;
    }): Promise<void> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.setStateAndOtherInfoToStorage({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async getAuthorisationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        authorisationURL: string;
        providerClientId?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthorisationURLWithQueryParamsAndSetState({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static generateStateToSendToOAuthProvider(input?: { userContext?: any }): string {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.generateStateToSendToOAuthProvider({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async verifyAndGetStateOrThrowError<CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext?: any;
    }): Promise<StateObject & CustomStateProperties> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.verifyAndGetStateOrThrowError({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getAuthCodeFromURL(input?: { userContext?: any }): string {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthCodeFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getAuthErrorFromURL(input?: { userContext?: any }): string | undefined {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthErrorFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getAuthStateFromURL(input?: { userContext?: any }): string {
        return ThirdPartyEmailPassword.getInstanceOrThrow().recipeImpl.getAuthStateFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static Google = Google;
    static Apple = Apple;
    static Facebook = Facebook;
    static Github = Github;
    static SignInAndUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    static SignInAndUpTheme = SignInAndUpTheme;
    static ThirdPartySignInAndUpCallback = (prop?: any) =>
        ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    static ResetPasswordUsingToken = (prop?: any) =>
        ThirdPartyEmailPassword.getInstanceOrThrow().getFeatureComponent("resetpassword", prop);
    static ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenTheme;
    static ThirdPartySignInAndUpCallbackTheme = ThirdPartySignInAndUpCallbackTheme;
    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const SignInAndUp = Wrapper.SignInAndUp;
const ThirdPartySignInAndUpCallback = Wrapper.ThirdPartySignInAndUpCallback;
const ResetPasswordUsingToken = Wrapper.ResetPasswordUsingToken;
const ThirdpartyEmailPasswordComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
const submitNewPassword = Wrapper.submitNewPassword;
const sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
const emailPasswordSignIn = Wrapper.emailPasswordSignIn;
const emailPasswordSignUp = Wrapper.emailPasswordSignUp;
const doesEmailExist = Wrapper.doesEmailExist;
const getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
const thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
const getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
const setStateAndOtherInfoToStorage = Wrapper.setStateAndOtherInfoToStorage;
const getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
const generateStateToSendToOAuthProvider = Wrapper.generateStateToSendToOAuthProvider;
const verifyAndGetStateOrThrowError = Wrapper.verifyAndGetStateOrThrowError;
const getAuthCodeFromURL = Wrapper.getAuthCodeFromURL;
const getAuthErrorFromURL = Wrapper.getAuthErrorFromURL;
const getAuthStateFromURL = Wrapper.getAuthStateFromURL;

export {
    init,
    Apple,
    Google,
    Facebook,
    Github,
    SignInAndUp,
    SignInAndUpTheme,
    ThirdpartyEmailPasswordComponentsOverrideProvider,
    ThirdPartySignInAndUpCallback,
    ThirdPartySignInAndUpCallbackTheme,
    signOut,
    submitNewPassword,
    sendPasswordResetEmail,
    emailPasswordSignIn,
    emailPasswordSignUp,
    doesEmailExist,
    getResetPasswordTokenFromURL,
    redirectToThirdPartyLogin,
    getAuthorisationURLFromBackend,
    thirdPartySignInAndUp,
    getStateAndOtherInfoFromStorage,
    setStateAndOtherInfoToStorage,
    getAuthorisationURLWithQueryParamsAndSetState,
    generateStateToSendToOAuthProvider,
    verifyAndGetStateOrThrowError,
    getAuthCodeFromURL,
    getAuthErrorFromURL,
    getAuthStateFromURL,
    ResetPasswordUsingToken,
    ResetPasswordUsingTokenTheme,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    UserType,
    ThirdPartyUserType,
};
