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

import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";

import { getNormalisedUserContext } from "../../utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import SignInUpThemeWrapper from "./components/themes/signInUp";
import Passwordless from "./recipe";
import { UserInput } from "./types";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import * as UtilFunctions from "./utils";

import type { PropsWithChildren } from "react";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/passwordless";
import type { PasswordlessFlowType, PasswordlessUser } from "supertokens-web-js/recipe/passwordless/types";

export default class Wrapper {
    static init(config: UserInput) {
        return Passwordless.init(config);
    }

    static async signOut(input?: { userContext?: any }): Promise<void> {
        return Passwordless.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async createCode(
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
        return UtilFunctions.createCode({
            ...input,
            recipeImplementation: Passwordless.getInstanceOrThrow().recipeImpl,
        });
    }

    static async resendCode(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }> {
        return UtilFunctions.resendCode({
            ...input,
            recipeImplementation: Passwordless.getInstanceOrThrow().recipeImpl,
        });
    }

    static async consumeCode(
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
        return UtilFunctions.consumeCode({
            ...input,
            recipeImplementation: Passwordless.getInstanceOrThrow().recipeImpl,
        });
    }

    static getLinkCodeFromURL(input?: { userContext?: any }): string {
        return Passwordless.getInstanceOrThrow().recipeImpl.getLinkCodeFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getPreAuthSessionIdFromURL(input?: { userContext?: any }): string {
        return Passwordless.getInstanceOrThrow().recipeImpl.getPreAuthSessionIdFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async doesEmailExist(input: { email: string; userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Passwordless.getInstanceOrThrow().recipeImpl.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async doesPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Passwordless.getInstanceOrThrow().recipeImpl.doesPhoneNumberExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async getLoginAttemptInfo<CustomLoginAttemptInfoProperties>(input?: { userContext?: any }): Promise<
        | undefined
        | ({
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    > {
        return Passwordless.getInstanceOrThrow().recipeImpl.getLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async setLoginAttemptInfo<CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext?: any;
    }): Promise<void> {
        return Passwordless.getInstanceOrThrow().recipeImpl.setLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async clearLoginAttemptInfo(input?: { userContext?: any }): Promise<void> {
        return Passwordless.getInstanceOrThrow().recipeImpl.clearLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static SignInUp = (prop: PropsWithChildren<{ redirectOnSessionExists?: boolean; userContext?: any }> = {}) =>
        Passwordless.getInstanceOrThrow().getFeatureComponent("signInUp", prop);
    static SignInUpTheme = SignInUpThemeWrapper;

    static LinkClicked = (prop?: any) =>
        Passwordless.getInstanceOrThrow().getFeatureComponent("linkClickedScreen", prop);
    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const createCode = Wrapper.createCode;
const resendCode = Wrapper.resendCode;
const consumeCode = Wrapper.consumeCode;
const getLinkCodeFromURL = Wrapper.getLinkCodeFromURL;
const getPreAuthSessionIdFromURL = Wrapper.getPreAuthSessionIdFromURL;
const doesEmailExist = Wrapper.doesEmailExist;
const doesPhoneNumberExist = Wrapper.doesPhoneNumberExist;
const getLoginAttemptInfo = Wrapper.getLoginAttemptInfo;
const setLoginAttemptInfo = Wrapper.setLoginAttemptInfo;
const clearLoginAttemptInfo = Wrapper.clearLoginAttemptInfo;
const signOut = Wrapper.signOut;
const SignInUp = Wrapper.SignInUp;
const SignInUpTheme = Wrapper.SignInUpTheme;
const LinkClicked = Wrapper.LinkClicked;
const PasswordlessComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    SignInUp,
    SignInUpTheme,
    PasswordlessComponentsOverrideProvider,
    LinkClicked,
    init,
    createCode,
    resendCode,
    consumeCode,
    getLinkCodeFromURL,
    getPreAuthSessionIdFromURL,
    doesEmailExist,
    doesPhoneNumberExist,
    getLoginAttemptInfo,
    setLoginAttemptInfo,
    clearLoginAttemptInfo,
    signOut,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
