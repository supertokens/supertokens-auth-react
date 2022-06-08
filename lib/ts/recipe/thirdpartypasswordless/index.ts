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
import ThirdPartyPasswordless from "./recipe";
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";

import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import ThirdPartyPasswordlessAuth from "./thirdpartyPasswordlessAuth";
import SignInUpTheme from "./components/themes/signInUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
import { LinkClickedScreen } from "../passwordless/components/themes/linkClickedScreen";
import { getNormalisedUserContext } from "../../utils";
import {
    PasswordlessFlowType,
    PasswordlessUser,
    RecipeFunctionOptions,
    RecipeInterface,
} from "supertokens-web-js/recipe/thirdpartypasswordless";
import { ThirdPartyUserType as UserType } from "supertokens-web-js/recipe/thirdparty";
import { redirectToThirdPartyLogin as UtilsRedirectToThirdPartyLogin } from "../thirdparty/utils";
import * as PasswordlessUtilFunctions from "../passwordless/utils";

export default class Wrapper {
    static init(config: UserInput) {
        return ThirdPartyPasswordless.init(config);
    }

    static async signOut(): Promise<void> {
        return ThirdPartyPasswordless.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(input?: { userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return ThirdPartyPasswordless.getInstanceOrThrow().emailVerification.isEmailVerified(
            getNormalisedUserContext(input?.userContext)
        );
    }

    static async verifyEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return ThirdPartyPasswordless.getInstanceOrThrow().emailVerification.recipeImpl.verifyEmail({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static sendVerificationEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return ThirdPartyPasswordless.getInstanceOrThrow().emailVerification.recipeImpl.sendVerificationEmail({
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
        const recipeInstance: ThirdPartyPasswordless = ThirdPartyPasswordless.getInstanceOrThrow();
        return recipeInstance.recipeImpl.thirdPartySignInAndUp({
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
            recipeImplementation: recipe.passwordlessRecipe.recipeImpl,
        });
    }

    static async resendPasswordlessCode(input: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
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
            recipeImplementation: recipe.passwordlessRecipe.recipeImpl,
        });
    }

    static async consumePasswordlessCode(
        input:
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
              createdUser: boolean;
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
            recipeImplementation: recipe.passwordlessRecipe.recipeImpl,
        });
    }

    static doesPasswordlessUserEmailExist(input: {
        email: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.doesPasswordlessUserEmailExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    static doesPasswordlessUserPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }> {
        return ThirdPartyPasswordless.getInstanceOrThrow().recipeImpl.doesPasswordlessUserPhoneNumberExist({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
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
            return ThirdPartyPasswordless.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input);
        } else {
            if (input.redirectBack === false || input.redirectBack === undefined) {
                return ThirdPartyPasswordless.getInstanceOrThrow().redirectToAuthWithoutRedirectToPath(input.show);
            } else {
                return ThirdPartyPasswordless.getInstanceOrThrow().redirectToAuthWithRedirectToPath(input.show);
            }
        }
    }

    static Google = Google;
    static Apple = Apple;
    static Facebook = Facebook;
    static Github = Github;
    static ThirdPartyPasswordlessAuth = ThirdPartyPasswordlessAuth;
    static SignInAndUp = (prop?: any) =>
        ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("signInUp", prop);
    static SignInAndUpTheme = SignInUpTheme;
    static ThirdPartySignInAndUpCallback = (prop?: any) =>
        ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("signinupcallback", prop);
    static EmailVerification = (prop?: any) =>
        ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    static EmailVerificationTheme = EmailVerificationTheme;

    static PasswordlessLinkClickedTheme = LinkClickedScreen;
    static PasswordlessLinkClicked = (prop?: any) =>
        ThirdPartyPasswordless.getInstanceOrThrow().getFeatureComponent("linkClickedScreen", prop);
}

const init = Wrapper.init;
const signOut = Wrapper.signOut;
const isEmailVerified = Wrapper.isEmailVerified;
const sendVerificationEmail = Wrapper.sendVerificationEmail;
const verifyEmail = Wrapper.verifyEmail;
const redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
const thirdPartySignInAndUp = Wrapper.thirdPartySignInAndUp;
const createPasswordlessCode = Wrapper.createPasswordlessCode;
const resendPasswordlessCode = Wrapper.resendPasswordlessCode;
const consumePasswordlessCode = Wrapper.consumePasswordlessCode;
const doesPasswordlessUserEmailExist = Wrapper.doesPasswordlessUserEmailExist;
const doesPasswordlessUserPhoneNumberExist = Wrapper.doesPasswordlessUserPhoneNumberExist;
const redirectToAuth = Wrapper.redirectToAuth;
const SignInAndUp = Wrapper.SignInAndUp;
const ThirdPartySignInAndUpCallback = Wrapper.ThirdPartySignInAndUpCallback;
const EmailVerification = Wrapper.EmailVerification;
const PasswordlessLinkClicked = Wrapper.PasswordlessLinkClicked;

export {
    ThirdPartyPasswordlessAuth,
    init,
    Apple,
    Google,
    Facebook,
    Github,
    isEmailVerified,
    sendVerificationEmail,
    verifyEmail,
    redirectToThirdPartyLogin,
    thirdPartySignInAndUp,
    createPasswordlessCode,
    resendPasswordlessCode,
    consumePasswordlessCode,
    doesPasswordlessUserEmailExist,
    doesPasswordlessUserPhoneNumberExist,
    SignInAndUp,
    SignInUpTheme,
    ThirdPartySignInAndUpCallback,
    signOut,
    redirectToAuth,
    EmailVerification,
    EmailVerificationTheme,
    PasswordlessLinkClicked,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
