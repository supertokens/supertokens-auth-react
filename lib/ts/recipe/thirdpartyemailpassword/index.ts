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
import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { getNormalisedUserContext } from "../../utils";
import {
    Apple,
    Google,
    GoogleWorkspaces,
    Facebook,
    Github,
    Gitlab,
    Bitbucket,
    Discord,
    LinkedIn,
    ActiveDirectory,
    BoxySAML,
    Okta,
    Twitter,
} from "../thirdparty/";
import { redirectToThirdPartyLogin as UtilsRedirectToThirdPartyLogin } from "../thirdparty/utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import ThirdPartyEmailPassword from "./recipe";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";

import type { UserContext } from "../../types";
import type { StateObject } from "supertokens-web-js/recipe/thirdparty";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import type { User } from "supertokens-web-js/types";

export default class Wrapper {
    static init(config?: UserInput) {
        return ThirdPartyEmailPassword.init(config);
    }

    static async signOut(input?: { userContext?: UserContext }): Promise<void> {
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
        userContext?: UserContext;
    }): Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "RESET_PASSWORD_INVALID_TOKEN_ERROR";
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
        return ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.submitNewPassword({
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
        userContext?: UserContext;
    }): Promise<
        | {
              status: "OK" | "PASSWORD_RESET_NOT_ALLOWED";
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
        return ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.sendPasswordResetEmail({
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
        userContext?: UserContext;
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
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    > {
        return ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.emailPasswordSignUp({
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
        userContext?: UserContext;
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
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    > {
        return ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.emailPasswordSignIn({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static async doesEmailExist(input: {
        email: string;
        options?: RecipeFunctionOptions;
        userContext?: UserContext;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static getResetPasswordTokenFromURL(input?: { userContext?: UserContext }): string {
        return ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.getResetPasswordTokenFromURL({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async redirectToThirdPartyLogin(input: {
        thirdPartyId: string;
        userContext?: UserContext;
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
            recipeImplementation: recipeInstance.thirdPartyRecipe.webJSRecipe,
        });
    }

    static async thirdPartySignInAndUp(input?: { userContext?: UserContext; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: User;
              createdNewRecipeUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    > {
        return ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.thirdPartySignInAndUp({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static getStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: UserContext;
    }): (StateObject & CustomStateProperties) | undefined {
        return ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.getStateAndOtherInfoFromStorage({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static async getAuthorisationURLWithQueryParamsAndSetState(input: {
        thirdPartyId: string;
        frontendRedirectURI: string;
        redirectURIOnProviderDashboard?: string;
        userContext?: UserContext;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static Google = Google;
    static GoogleWorkspaces = GoogleWorkspaces;
    static Apple = Apple;
    static Bitbucket = Bitbucket;
    static Discord = Discord;
    static Github = Github;
    static Gitlab = Gitlab;
    static Facebook = Facebook;
    static LinkedIn = LinkedIn;
    static ActiveDirectory = ActiveDirectory;
    static BoxySAML = BoxySAML;
    static Okta = Okta;
    static Twitter = Twitter;
    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const ThirdpartyEmailPasswordComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
const submitNewPassword = Wrapper.submitNewPassword;
const sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
const emailPasswordSignIn = Wrapper.emailPasswordSignIn;
const emailPasswordSignUp = Wrapper.emailPasswordSignUp;
const doesEmailExist = Wrapper.doesEmailExist;
const getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
const getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
const getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;

export {
    init,
    Apple,
    Bitbucket,
    Discord,
    Github,
    Gitlab,
    Google,
    GoogleWorkspaces,
    Facebook,
    LinkedIn,
    ActiveDirectory,
    BoxySAML,
    Okta,
    Twitter,
    ThirdpartyEmailPasswordComponentsOverrideProvider,
    signOut,
    submitNewPassword,
    sendPasswordResetEmail,
    emailPasswordSignIn,
    emailPasswordSignUp,
    doesEmailExist,
    getResetPasswordTokenFromURL,
    redirectToThirdPartyLogin,
    thirdPartySignInAndUp,
    getStateAndOtherInfoFromStorage,
    getAuthorisationURLWithQueryParamsAndSetState,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
