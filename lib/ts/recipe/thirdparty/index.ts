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
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import Apple from "./providers/apple";
import Google from "./providers/google";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
import { getNormalisedUserContext } from "../../utils";
import { RecipeInterface, StateObject, ThirdPartyUserType as User } from "supertokens-web-js/recipe/thirdparty";
import { redirectToThirdPartyLogin as UtilsRedirectToThirdPartyLogin } from "./utils";
import { RecipeFunctionOptions } from "supertokens-web-js/recipe/thirdpartyemailpassword";
export default class Wrapper {
    /*
     * Static attributes.
     */

    static init(config: UserInput) {
        return ThirdParty.init(config);
    }

    static async signOut(input?: { userContext?: any }): Promise<void> {
        return ThirdParty.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async isEmailVerified(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return ThirdParty.getInstanceOrThrow().emailVerification.recipeImpl.isEmailVerified({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async verifyEmail(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }> {
        return ThirdParty.getInstanceOrThrow().emailVerification.recipeImpl.verifyEmail({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async sendVerificationEmail(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return ThirdParty.getInstanceOrThrow().emailVerification.recipeImpl.sendVerificationEmail({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getEmailVerificationTokenFromURL(input?: { userContext?: any }): string {
        return ThirdParty.getInstanceOrThrow().emailVerification.recipeImpl.getEmailVerificationTokenFromURL({
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
            return ThirdParty.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input);
        } else {
            if (input.redirectBack === false || input.redirectBack === undefined) {
                return ThirdParty.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input.show);
            } else {
                return ThirdParty.getInstanceOrThrow().redirectToAuthWithRedirectToPath(input.show);
            }
        }
    }

    static async redirectToThirdPartyLogin(input: {
        thirdPartyId: string;
        userContext?: any;
    }): Promise<{ status: "OK" | "ERROR" }> {
        const recipeInstance: ThirdParty = ThirdParty.getInstanceOrThrow();

        return UtilsRedirectToThirdPartyLogin({
            thirdPartyId: input.thirdPartyId,
            config: recipeInstance.config,
            userContext: getNormalisedUserContext(input.userContext),
            recipeImplementation: recipeInstance.recipeImpl,
        });
    }

    static getStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getStateAndOtherInfoFromStorage({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async setStateAndOtherInfoToStorage<CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext?: any;
    }): Promise<void> {
        return ThirdParty.getInstanceOrThrow().recipeImpl.setStateAndOtherInfoToStorage({
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
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthorisationURLWithQueryParamsAndSetState({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
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
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthorisationURLFromBackend({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async signInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
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
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static generateStateToSendToOAuthProvider(input?: { userContext?: any }): string {
        return ThirdParty.getInstanceOrThrow().recipeImpl.generateStateToSendToOAuthProvider({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async verifyAndGetStateOrThrowError<CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext?: any;
    }): Promise<StateObject & CustomStateProperties> {
        return ThirdParty.getInstanceOrThrow().recipeImpl.verifyAndGetStateOrThrowError({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getAuthCodeFromURL(input?: { userContext?: any }): string {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthCodeFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getAuthErrorFromURL(input?: { userContext?: any }): string | undefined {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthErrorFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getAuthStateFromURL(input?: { userContext?: any }): string {
        return ThirdParty.getInstanceOrThrow().recipeImpl.getAuthStateFromURL({
            ...input,
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
    static SignInAndUp = (prop?: any) => ThirdParty.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    static SignInAndUpTheme = SignInAndUpTheme;
    static SignInAndUpCallback = (prop?: any) =>
        ThirdParty.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    static SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
    static EmailVerification = (prop?: any) =>
        ThirdParty.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    static EmailVerificationTheme = EmailVerificationTheme;
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const isEmailVerified = Wrapper.isEmailVerified;
const verifyEmail = Wrapper.verifyEmail;
const sendVerificationEmail = Wrapper.sendVerificationEmail;
const getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
const setStateAndOtherInfoToStorage = Wrapper.setStateAndOtherInfoToStorage;
const getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
const getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
const generateStateToSendToOAuthProvider = Wrapper.generateStateToSendToOAuthProvider;
const verifyAndGetStateOrThrowError = Wrapper.verifyAndGetStateOrThrowError;
const getAuthCodeFromURL = Wrapper.getAuthCodeFromURL;
const getAuthErrorFromURL = Wrapper.getAuthErrorFromURL;
const getAuthStateFromURL = Wrapper.getAuthStateFromURL;
const signInAndUp = Wrapper.signInAndUp;
const redirectToAuth = Wrapper.redirectToAuth;
const SignInAndUp = Wrapper.SignInAndUp;
const SignInAndUpCallback = Wrapper.SignInAndUpCallback;
const EmailVerification = Wrapper.EmailVerification;

export {
    init,
    Apple,
    Google,
    Facebook,
    Github,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
    getEmailVerificationTokenFromURL,
    getStateAndOtherInfoFromStorage,
    setStateAndOtherInfoToStorage,
    getAuthorisationURLWithQueryParamsAndSetState,
    getAuthorisationURLFromBackend,
    generateStateToSendToOAuthProvider,
    verifyAndGetStateOrThrowError,
    getAuthCodeFromURL,
    getAuthErrorFromURL,
    getAuthStateFromURL,
    signInAndUp,
    redirectToThirdPartyLogin,
    SignInAndUp,
    SignInAndUpTheme,
    SignInAndUpCallback,
    SignInAndUpCallbackTheme,
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
