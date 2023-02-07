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
import { RecipeInterface, ThirdPartyUserType as User } from "supertokens-web-js/recipe/thirdparty";

import { getNormalisedUserContext } from "../../utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import Apple from "./providers/apple";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
import Google from "./providers/google";
import ThirdParty from "./recipe";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { redirectToThirdPartyLogin as UtilsRedirectToThirdPartyLogin } from "./utils";

import type { PropsWithChildren } from "react";
import type { StateObject } from "supertokens-web-js/recipe/thirdparty";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/thirdpartyemailpassword";

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
    static SignInAndUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        ThirdParty.getInstanceOrThrow().getFeatureComponent("signinup", prop);
    static SignInAndUpTheme = SignInAndUpTheme;
    static SignInAndUpCallback = (prop?: any) =>
        ThirdParty.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    static SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
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
const SignInAndUp = Wrapper.SignInAndUp;
const SignInAndUpCallback = Wrapper.SignInAndUpCallback;
const ThirdpartyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    init,
    Apple,
    Google,
    Facebook,
    Github,
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
    ThirdpartyComponentsOverrideProvider,
    signOut,
    User,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
