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

import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";

import { getNormalisedUserContext } from "../../utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import EmailPassword from "./recipe";
import { UserInput } from "./types";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";

import type { User } from "../authRecipe/types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/emailpassword";

export default class Wrapper {
    static init(config?: UserInput) {
        return EmailPassword.init(config);
    }

    static async signOut(input?: { userContext?: any }): Promise<void> {
        return EmailPassword.getInstanceOrThrow().signOut({
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
        return EmailPassword.getInstanceOrThrow().webJSRecipe.submitNewPassword({
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
        return EmailPassword.getInstanceOrThrow().webJSRecipe.sendPasswordResetEmail({
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
        return EmailPassword.getInstanceOrThrow().webJSRecipe.signUp({
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
        return EmailPassword.getInstanceOrThrow().webJSRecipe.signIn({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return EmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getResetPasswordTokenFromURL(input?: { userContext?: any }): string {
        return EmailPassword.getInstanceOrThrow().webJSRecipe.getResetPasswordTokenFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const submitNewPassword = Wrapper.submitNewPassword;
const sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
const signUp = Wrapper.signUp;
const signIn = Wrapper.signIn;
const doesEmailExist = Wrapper.doesEmailExist;
const getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
const EmailPasswordComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    init,
    signOut,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
    getResetPasswordTokenFromURL,
    EmailPasswordComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
