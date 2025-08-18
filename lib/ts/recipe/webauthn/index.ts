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

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import Webauthn from "./recipe";

import type { UserInput } from "./types";
import type { RegistrationResponseJSON } from "@simplewebauthn/types";
import type { AuthenticationResponseJSON } from "@simplewebauthn/types";
import type { RecipeFunctionOptions } from "supertokens-web-js/lib/build/recipe/recipeModule/types";
import type { AuthenticationOptions, UserVerification } from "supertokens-web-js/lib/build/recipe/webauthn/types";
import type { ResidentKey } from "supertokens-web-js/lib/build/recipe/webauthn/types";
import type { RegistrationOptions } from "supertokens-web-js/lib/build/recipe/webauthn/types";
import type { GeneralErrorResponse, User } from "supertokens-web-js/lib/build/types";

export default class Wrapper {
    static init(config?: UserInput) {
        return Webauthn.init(config);
    }

    static getRegisterOptions(
        input: {
            options?: RecipeFunctionOptions;
            userContext: any;
        } & (
            | {
                  email: string;
              }
            | {
                  recoverAccountToken: string;
              }
        )
    ): Promise<
        | {
              status: "OK";
              webauthnGeneratedOptionsId: string;
              createdAt: string;
              expiresAt: string;
              rp: {
                  id: string;
                  name: string;
              };
              user: {
                  id: string;
                  name: string;
                  displayName: string;
              };
              challenge: string;
              timeout: number;
              excludeCredentials: {
                  id: string;
                  type: "public-key";
                  transports: ("ble" | "hybrid" | "internal" | "nfc" | "usb")[];
              }[];
              attestation: "none" | "indirect" | "direct" | "enterprise";
              pubKeyCredParams: {
                  alg: number;
                  type: "public-key";
              }[];
              authenticatorSelection: {
                  requireResidentKey: boolean;
                  residentKey: ResidentKey;
                  userVerification: UserVerification;
              };
              fetchResponse: Response;
          }
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_EMAIL_ERROR";
              err: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.getRegisterOptions(input);
    }

    static getSignInOptions(input: { options?: RecipeFunctionOptions; userContext: any }): Promise<
        | {
              status: "OK";
              webauthnGeneratedOptionsId: string;
              challenge: string;
              timeout: number;
              userVerification: UserVerification;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.getSignInOptions(input);
    }

    static signUp(input: {
        webauthnGeneratedOptionsId: string;
        credential: RegistrationResponseJSON;
        shouldTryLinkingWithSessionUser?: boolean;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "EMAIL_ALREADY_EXISTS_ERROR";
              fetchResponse: Response;
          }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.signUp(input);
    }

    static signIn(input: {
        webauthnGeneratedOptionsId: string;
        credential: AuthenticationResponseJSON;
        shouldTryLinkingWithSessionUser?: boolean;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.signIn(input);
    }

    static getEmailExists(input: { email: string; options?: RecipeFunctionOptions; userContext: any }): Promise<
        | {
              status: "OK";
              exists: boolean;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.getEmailExists(input);
    }

    static generateRecoverAccountToken(input: {
        email: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "RECOVER_ACCOUNT_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.generateRecoverAccountToken(input);
    }

    static recoverAccount(input: {
        token: string;
        webauthnGeneratedOptionsId: string;
        credential: RegistrationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              email: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.recoverAccount(input);
    }

    static createCredential(input: {
        registrationOptions: Omit<RegistrationOptions, "fetchResponse" | "status">;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              registrationResponse: RegistrationResponseJSON;
          }
        | {
              status: "AUTHENTICATOR_ALREADY_REGISTERED";
          }
        | {
              status: "FAILED_TO_REGISTER_USER";
              error: any;
          }
        | {
              status: "WEBAUTHN_NOT_SUPPORTED";
              error: any;
          }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.createCredential(input);
    }

    static authenticateCredential(input: {
        authenticationOptions: Omit<AuthenticationOptions, "fetchResponse" | "status">;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              authenticationResponse: AuthenticationResponseJSON;
          }
        | {
              status: "FAILED_TO_AUTHENTICATE_USER";
              error: any;
          }
        | {
              status: "WEBAUTHN_NOT_SUPPORTED";
              error: any;
          }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.authenticateCredential(input);
    }

    static registerCredentialWithSignUp(input: {
        email: string;
        shouldTryLinkingWithSessionUser?: boolean;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_EMAIL_ERROR";
              err: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "EMAIL_ALREADY_EXISTS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "AUTHENTICATOR_ALREADY_REGISTERED";
          }
        | {
              status: "FAILED_TO_REGISTER_USER";
              error: any;
          }
        | {
              status: "WEBAUTHN_NOT_SUPPORTED";
              error: any;
          }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.registerCredentialWithSignUp(input);
    }

    static authenticateCredentialWithSignIn(input: {
        shouldTryLinkingWithSessionUser?: boolean;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "FAILED_TO_AUTHENTICATE_USER";
              error: any;
          }
        | {
              status: "WEBAUTHN_NOT_SUPPORTED";
              error: any;
          }
        | GeneralErrorResponse
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.authenticateCredentialWithSignIn(input);
    }

    static registerCredentialWithRecoverAccount(input: {
        recoverAccountToken: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              email: string;
              fetchResponse: Response;
          }
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "AUTHENTICATOR_ALREADY_REGISTERED";
          }
        | {
              status: "FAILED_TO_REGISTER_USER";
              error: any;
          }
        | {
              status: "WEBAUTHN_NOT_SUPPORTED";
              error: any;
          }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.registerCredentialWithRecoverAccount(input);
    }

    static listCredentials(input: { options?: RecipeFunctionOptions; userContext: any }): Promise<
        | {
              status: "OK";
              credentials: {
                  webauthnCredentialId: string;
                  relyingPartyId: string;
                  recipeUserId: string;
                  createdAt: number;
              }[];
          }
        | GeneralErrorResponse
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.listCredentials(input);
    }

    static removeCredential(input: {
        webauthnCredentialId: string;
        userContext: any;
    }): Promise<
        { status: "OK" } | GeneralErrorResponse | { status: "CREDENTIAL_NOT_FOUND_ERROR"; fetchResponse: Response }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.removeCredential(input);
    }

    static createAndRegisterCredentialForSessionUser(input: {
        recipeUserId: string;
        email: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | { status: "OK" }
        | GeneralErrorResponse
        | { status: "REGISTER_CREDENTIAL_NOT_ALLOWED"; reason?: string }
        | { status: "INVALID_EMAIL_ERROR"; err: string }
        | { status: "INVALID_CREDENTIALS_ERROR" }
        | { status: "OPTIONS_NOT_FOUND_ERROR" }
        | { status: "INVALID_OPTIONS_ERROR" }
        | { status: "INVALID_AUTHENTICATOR_ERROR"; reason?: string }
        | { status: "AUTHENTICATOR_ALREADY_REGISTERED" }
        | { status: "FAILED_TO_REGISTER_USER"; error: any }
        | { status: "WEBAUTHN_NOT_SUPPORTED"; error: any }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.createAndRegisterCredentialForSessionUser(input);
    }

    static registerCredential(input: {
        recipeUserId: string;
        webauthnGeneratedOptionsId: string;
        credential: RegistrationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | { status: "OK" }
        | GeneralErrorResponse
        | { status: "REGISTER_CREDENTIAL_NOT_ALLOWED"; reason?: string }
        | { status: "INVALID_CREDENTIALS_ERROR" }
        | { status: "OPTIONS_NOT_FOUND_ERROR" }
        | { status: "INVALID_OPTIONS_ERROR" }
        | { status: "INVALID_AUTHENTICATOR_ERROR"; reason?: string }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.registerCredential(input);
    }

    static doesBrowserSupportWebAuthn(input: { userContext: any }): Promise<
        | {
              status: "OK";
              browserSupportsWebauthn: boolean;
              platformAuthenticatorIsAvailable: boolean;
          }
        | {
              status: "ERROR";
              error: any;
          }
    > {
        return Webauthn.getInstanceOrThrow().webJSRecipe.doesBrowserSupportWebAuthn(input);
    }

    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const getRegisterOptions = Wrapper.getRegisterOptions;
const getSignInOptions = Wrapper.getSignInOptions;
const signUp = Wrapper.signUp;
const signIn = Wrapper.signIn;
const getEmailExists = Wrapper.getEmailExists;
const generateRecoverAccountToken = Wrapper.generateRecoverAccountToken;
const recoverAccount = Wrapper.recoverAccount;
const createCredential = Wrapper.createCredential;
const authenticateCredential = Wrapper.authenticateCredential;
const registerCredentialWithSignUp = Wrapper.registerCredentialWithSignUp;
const authenticateCredentialWithSignIn = Wrapper.authenticateCredentialWithSignIn;
const registerCredentialWithRecoverAccount = Wrapper.registerCredentialWithRecoverAccount;
const createAndRegisterCredentialForSessionUser = Wrapper.createAndRegisterCredentialForSessionUser;
const listCredentials = Wrapper.listCredentials;
const removeCredential = Wrapper.removeCredential;
const registerCredential = Wrapper.registerCredential;
const doesBrowserSupportWebAuthn = Wrapper.doesBrowserSupportWebAuthn;
const WebauthnComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    init,
    getRegisterOptions,
    getSignInOptions,
    signUp,
    signIn,
    getEmailExists,
    generateRecoverAccountToken,
    recoverAccount,
    createCredential,
    authenticateCredential,
    registerCredentialWithSignUp,
    authenticateCredentialWithSignIn,
    registerCredentialWithRecoverAccount,
    createAndRegisterCredentialForSessionUser,
    doesBrowserSupportWebAuthn,
    WebauthnComponentsOverrideProvider,
    listCredentials,
    removeCredential,
    registerCredential,
};
