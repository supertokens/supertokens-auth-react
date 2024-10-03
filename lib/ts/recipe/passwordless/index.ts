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
import Passwordless from "./recipe";
import { UserInput } from "./types";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";

import type { UserContext } from "../../types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/passwordless";
import type { PasswordlessFlowType } from "supertokens-web-js/recipe/passwordless/types";
import type { User } from "supertokens-web-js/types";

export default class Wrapper {
    static init(config: UserInput) {
        return Passwordless.init(config);
    }

    static async signOut(input?: { userContext?: UserContext }): Promise<void> {
        return Passwordless.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async createCode(
        input:
            | {
                  email: string;
                  shouldTryLinkingWithSessionUser?: boolean;
                  userContext?: UserContext;
                  options?: RecipeFunctionOptions;
              }
            | {
                  phoneNumber: string;
                  shouldTryLinkingWithSessionUser?: boolean;
                  userContext?: UserContext;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<
        | {
              status: "OK";
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_UP_NOT_ALLOWED";
              reason: string;
          }
    > {
        return Passwordless.getInstanceOrThrow().webJSRecipe.createCode({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async resendCode(input?: { userContext?: UserContext; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }> {
        return Passwordless.getInstanceOrThrow().webJSRecipe.resendCode({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async consumeCode(
        input?:
            | {
                  userInputCode: string;
                  userContext?: UserContext;
                  options?: RecipeFunctionOptions;
              }
            | {
                  userContext?: UserContext;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<
        | {
              status: "OK";
              createdNewRecipeUser: boolean;
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
              fetchResponse: Response;
          }
        | { status: "RESTART_FLOW_ERROR"; fetchResponse: Response }
        | { status: "SIGN_IN_UP_NOT_ALLOWED"; reason: string; fetchResponse: Response }
    > {
        return Passwordless.getInstanceOrThrow().webJSRecipe.consumeCode({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getLinkCodeFromURL(input?: { userContext?: UserContext }): string {
        return Passwordless.getInstanceOrThrow().webJSRecipe.getLinkCodeFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getPreAuthSessionIdFromURL(input?: { userContext?: UserContext }): string {
        return Passwordless.getInstanceOrThrow().webJSRecipe.getPreAuthSessionIdFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async doesEmailExist(input: {
        email: string;
        userContext?: UserContext;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Passwordless.getInstanceOrThrow().webJSRecipe.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async doesPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: UserContext;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return Passwordless.getInstanceOrThrow().webJSRecipe.doesPhoneNumberExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async getLoginAttemptInfo<CustomLoginAttemptInfoProperties>(input?: { userContext?: UserContext }): Promise<
        | undefined
        | ({
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    > {
        return Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo({
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
        userContext?: UserContext;
    }): Promise<void> {
        return Passwordless.getInstanceOrThrow().webJSRecipe.setLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async clearLoginAttemptInfo(input?: { userContext?: UserContext }): Promise<void> {
        return Passwordless.getInstanceOrThrow().webJSRecipe.clearLoginAttemptInfo({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

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
const PasswordlessComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    PasswordlessComponentsOverrideProvider,
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
