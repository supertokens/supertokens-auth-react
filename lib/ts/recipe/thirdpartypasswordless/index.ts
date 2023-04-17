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
import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";

import { getNormalisedUserContext } from "../../utils";
import * as PasswordlessUtilFunctions from "../passwordless/utils";
import {
    Apple,
    Google,
    Facebook,
    Github,
    Gitlab,
    Bitbucket,
    Discord,
    Boxy,
    LinkedIn,
    ActiveDirectory,
    Twitter,
    Saml,
    Okta,
} from "../thirdparty/";
import { redirectToThirdPartyLogin as UtilsRedirectToThirdPartyLogin } from "../thirdparty/utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import ThirdPartyPasswordless from "./recipe";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";

import type { StateObject, ThirdPartyUserType as UserType } from "supertokens-web-js/recipe/thirdparty";
import type {
    PasswordlessFlowType,
    PasswordlessUser,
    RecipeFunctionOptions,
} from "supertokens-web-js/recipe/thirdpartypasswordless";

export default class Wrapper {
    static init(config: UserInput) {
        return ThirdPartyPasswordless.init(config);
    }

    static async signOut(input?: { userContext?: any }): Promise<void> {
        return ThirdPartyPasswordless.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async redirectToThirdPartyLogin(input: {
        thirdPartyId: string;
        userContext?: any;
    }): Promise<{ status: "OK" | "ERROR" }> {
        const recipeInstance: ThirdPartyPasswordless = ThirdPartyPasswordless.getInstanceOrThrow();

        if (recipeInstance.thirdPartyRecipe === undefined) {
            throw new Error(
                "Third party passwordless was initialised without any social providers. This function is only available if at least one social provider is initialised"
            );
        }

        return UtilsRedirectToThirdPartyLogin({
            thirdPartyId: input.thirdPartyId,
            config: recipeInstance.thirdPartyRecipe.config,
            userContext: getNormalisedUserContext(input.userContext),
            recipeImplementation: recipeInstance.thirdPartyRecipe.webJSRecipe,
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
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getAuthorisationURLFromBackend({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async thirdPartySignInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
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
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.thirdPartySignInAndUp({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getThirdPartyStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getThirdPartyStateAndOtherInfoFromStorage({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async setThirdPartyStateAndOtherInfoToStorage<CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext?: any;
    }): Promise<void> {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.setThirdPartyStateAndOtherInfoToStorage({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async getThirdPartyAuthorisationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        authorisationURL: string;
        userContext?: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(
            {
                ...input,
                userContext: getNormalisedUserContext(input.userContext),
            }
        );
    }

    static generateThirdPartyStateToSendToOAuthProvider(input?: { userContext?: any }): string {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.generateThirdPartyStateToSendToOAuthProvider({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async verifyAndGetThirdPartyStateOrThrowError<CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext?: any;
    }): Promise<StateObject & CustomStateProperties> {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.verifyAndGetThirdPartyStateOrThrowError({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getThirdPartyAuthCodeFromURL(input?: { userContext?: any }): string {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getThirdPartyAuthCodeFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getThirdPartyAuthErrorFromURL(input?: { userContext?: any }): string | undefined {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getThirdPartyAuthErrorFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getThirdPartyAuthStateFromURL(input?: { userContext?: any }): string {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getThirdPartyAuthStateFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async createPasswordlessCode(
        input:
            | { email: string; userContext?: any; options?: RecipeFunctionOptions }
            | { phoneNumber: string; userContext?: any; options?: RecipeFunctionOptions }
    ): Promise<{
        status: "OK";
        deviceId: string;
        preAuthSessionId: string;
        flowType: PasswordlessFlowType;
        fetchResponse: Response;
    }> {
        const recipe: ThirdPartyPasswordless = ThirdPartyPasswordless.getInstanceOrThrow();

        if (recipe.passwordlessRecipe === undefined) {
            throw new Error(
                "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
            );
        }

        return PasswordlessUtilFunctions.createCode({
            ...input,
            recipeImplementation: recipe.passwordlessRecipe.webJSRecipe,
        });
    }

    static async resendPasswordlessCode(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }> {
        const recipe: ThirdPartyPasswordless = ThirdPartyPasswordless.getInstanceOrThrow();

        if (recipe.passwordlessRecipe === undefined) {
            throw new Error(
                "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
            );
        }

        return PasswordlessUtilFunctions.resendCode({
            ...input,
            recipeImplementation: recipe.passwordlessRecipe.webJSRecipe,
        });
    }

    static async consumePasswordlessCode(
        input?:
            | {
                  userInputCode: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<
        | {
              status: "OK";
              createdNewUser: boolean;
              user: PasswordlessUser;
              fetchResponse: Response;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
              fetchResponse: Response;
          }
        | { status: "RESTART_FLOW_ERROR"; fetchResponse: Response }
    > {
        const recipe: ThirdPartyPasswordless = ThirdPartyPasswordless.getInstanceOrThrow();

        if (recipe.passwordlessRecipe === undefined) {
            throw new Error(
                "createCode requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
            );
        }

        return PasswordlessUtilFunctions.consumeCode({
            ...input,
            recipeImplementation: recipe.passwordlessRecipe.webJSRecipe,
        });
    }

    static getPasswordlessLinkCodeFromURL(input?: { userContext?: any }): string {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessLinkCodeFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getPasswordlessPreAuthSessionIdFromURL(input?: { userContext?: any }): string {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessPreAuthSessionIdFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async doesPasswordlessUserEmailExist(input: {
        email: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.doesPasswordlessUserEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async doesPasswordlessUserPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.doesPasswordlessUserPhoneNumberExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async getPasswordlessLoginAttemptInfo<CustomLoginAttemptInfoProperties>(input?: {
        userContext?: any;
    }): Promise<
        | undefined
        | ({
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    > {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.getPasswordlessLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async setPasswordlessLoginAttemptInfo<CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext?: any;
    }): Promise<void> {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.setPasswordlessLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async clearPasswordlessLoginAttemptInfo(input?: { userContext?: any }): Promise<void> {
        return ThirdPartyPasswordless.getInstanceOrThrow().webJSRecipe.clearPasswordlessLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static Apple = Apple;
    static Bitbucket = Bitbucket;
    static Discord = Discord;
    static Github = Github;
    static Gitlab = Gitlab;
    static Google = Google;
    static Facebook = Facebook;
    static Boxy = Boxy;
    static LinkedIn = LinkedIn;
    static ActiveDirectory = ActiveDirectory;
    static Twitter = Twitter;
    static Saml = Saml;
    static Okta = Okta;
    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const getAuthorisationURLFromBackend = Wrapper.getAuthorisationURLFromBackend;
const thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
const getThirdPartyStateAndOtherInfoFromStorage = Wrapper.getThirdPartyStateAndOtherInfoFromStorage;
const setThirdPartyStateAndOtherInfoToStorage = Wrapper.setThirdPartyStateAndOtherInfoToStorage;
const getThirdPartyAuthorisationURLWithQueryParamsAndSetState =
    Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
const generateThirdPartyStateToSendToOAuthProvider = Wrapper.generateThirdPartyStateToSendToOAuthProvider;
const verifyAndGetThirdPartyStateOrThrowError = Wrapper.verifyAndGetThirdPartyStateOrThrowError;
const getThirdPartyAuthCodeFromURL = Wrapper.getThirdPartyAuthCodeFromURL;
const getThirdPartyAuthErrorFromURL = Wrapper.getThirdPartyAuthErrorFromURL;
const getThirdPartyAuthStateFromURL = Wrapper.getThirdPartyAuthStateFromURL;
const createPasswordlessCode = Wrapper.createPasswordlessCode;
const resendPasswordlessCode = Wrapper.resendPasswordlessCode;
const consumePasswordlessCode = Wrapper.consumePasswordlessCode;
const getPasswordlessLinkCodeFromURL = Wrapper.getPasswordlessLinkCodeFromURL;
const getPasswordlessPreAuthSessionIdFromURL = Wrapper.getPasswordlessPreAuthSessionIdFromURL;
const doesPasswordlessUserEmailExist = Wrapper.doesPasswordlessUserEmailExist;
const doesPasswordlessUserPhoneNumberExist = Wrapper.doesPasswordlessUserPhoneNumberExist;
const getPasswordlessLoginAttemptInfo = Wrapper.getPasswordlessLoginAttemptInfo;
const setPasswordlessLoginAttemptInfo = Wrapper.setPasswordlessLoginAttemptInfo;
const clearPasswordlessLoginAttemptInfo = Wrapper.clearPasswordlessLoginAttemptInfo;
const ThirdpartyPasswordlessComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    init,
    Apple,
    Bitbucket,
    Discord,
    Github,
    Gitlab,
    Google,
    Facebook,
    Boxy,
    LinkedIn,
    ActiveDirectory,
    Twitter,
    Saml,
    Okta,
    redirectToThirdPartyLogin,
    getAuthorisationURLFromBackend,
    thirdPartySignInAndUp,
    getThirdPartyStateAndOtherInfoFromStorage,
    setThirdPartyStateAndOtherInfoToStorage,
    getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
    generateThirdPartyStateToSendToOAuthProvider,
    verifyAndGetThirdPartyStateOrThrowError,
    getThirdPartyAuthCodeFromURL,
    getThirdPartyAuthErrorFromURL,
    getThirdPartyAuthStateFromURL,
    createPasswordlessCode,
    resendPasswordlessCode,
    consumePasswordlessCode,
    getPasswordlessLinkCodeFromURL,
    getPasswordlessPreAuthSessionIdFromURL,
    doesPasswordlessUserEmailExist,
    doesPasswordlessUserPhoneNumberExist,
    getPasswordlessLoginAttemptInfo,
    setPasswordlessLoginAttemptInfo,
    clearPasswordlessLoginAttemptInfo,
    ThirdpartyPasswordlessComponentsOverrideProvider,
    signOut,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
