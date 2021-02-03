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
 * Imports.
 */

import RecipeModule from "../recipeModule";
import {
    CreateRecipeFunction,
    RouteToFeatureComponentMap,
    NormalisedAppInfo,
    SuccessAPIResponse,
    NormalisedAuthRecipeConfig
} from "../../types";
import {
    EmailPasswordConfig,
    EmailPasswordGetRedirectionURLContext,
    EmailPasswordUserInput,
    NormalisedEmailPasswordConfig
} from "./types";
import { isTest } from "../../utils";
import { normaliseEmailPasswordConfig } from "./utils";
import { ResetPasswordUsingToken, SignInAndUp } from ".";
import EmailVerificationRecipe from "../emailverification/emailVerification";
import NormalisedURLPath from "../../normalisedURLPath";
import { DEFAULT_RESET_PASSWORD_PATH, DEFAULT_VERIFY_EMAIL_PATH } from "./constants";
import { SSR_ERROR } from "../../constants";
import Session from "../session/session";
import SuperTokens from "../../superTokens";
import { signOut } from "./components/features/signOut/api";
import AuthRecipeModule from "../authRecipeModule";
import { EmailVerificationUserInput } from "../emailverification/types";

/*
 * Class.
 */
export default class EmailPassword extends AuthRecipeModule {
    /*
     * Static Attributes.
     */
    static instance?: EmailPassword;
    static RECIPE_ID = "emailpassword";

    /*
     * Instance Attributes.
     */
    config: NormalisedEmailPasswordConfig & NormalisedAuthRecipeConfig;

    /*
     * Constructor.
     */
    constructor(config: EmailPasswordConfig) {
        super(config);
        this.config = {
            ...this.config,
            ...normaliseEmailPasswordConfig(config)
        };
    }

    /*
     * Instance methods.
     */

    getConfig = (): NormalisedEmailPasswordConfig => {
        return this.config;
    };

    getFeatures = (): RouteToFeatureComponentMap => {
        const features: RouteToFeatureComponentMap = {};
        if (this.config.signInAndUpFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = SignInAndUp;
        }

        if (this.config.resetPasswordUsingTokenFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = ResetPasswordUsingToken;
        }

        return {
            ...features,
            ...EmailVerificationRecipe.getInstanceOrThrow().getFeatures()
        };
    };

    getDefaultRedirectionURL = async (context: EmailPasswordGetRedirectionURLContext): Promise<string> => {
        switch (context.action) {
            case "SIGN_IN_AND_UP":
                return `${this.appInfo.websiteBasePath.getAsStringDangerous()}?rid=${this.recipeId}`;

            case "VERIFY_EMAIL":
                return `${this.appInfo.websiteBasePath.getAsStringDangerous()}${DEFAULT_VERIFY_EMAIL_PATH}?rid=${
                    this.recipeId
                }`;

            case "RESET_PASSWORD":
                return `${this.appInfo.websiteBasePath.getAsStringDangerous()}${DEFAULT_RESET_PASSWORD_PATH}?rid=${
                    this.recipeId
                }`;

            case "SUCCESS":
                return context.redirectToPath === undefined ? "/" : context.redirectToPath;
        }
    };

    getSessionRecipe = (): Session | undefined => {
        return SuperTokens.getInstanceOrThrow().getDefaultSessionRecipe();
    };

    doesSessionExist = (): boolean => {
        const sessionRecipe = this.getSessionRecipe();
        if (sessionRecipe !== undefined) {
            return sessionRecipe.doesSessionExist();
        }

        // Otherwise, return false.
        return false;
    };

    signOut = async (): Promise<SuccessAPIResponse> => {
        return await signOut(this);
    };

    /*
     * Email Verification
     */

    async isEmailVerified(): Promise<boolean> {
        return await EmailVerificationRecipe.isEmailVerified();
    }

    /*
     * Static methods.
     */

    static init(config?: EmailPasswordUserInput): CreateRecipeFunction {
        return (appInfo: NormalisedAppInfo): RecipeModule => {
            EmailPassword.instance = new EmailPassword({
                ...config,
                appInfo,
                recipeId: EmailPassword.RECIPE_ID
            });

            let emailVerificationUserInput: EmailVerificationUserInput = {};
            if (config !== undefined && config.emailVerificationFeature !== undefined) {
                emailVerificationUserInput = config.emailVerificationFeature;
            }
            EmailVerificationRecipe.init({
                ...emailVerificationUserInput,
                authRecipe: EmailPassword.instance,
                preAPIHook: config === undefined ? undefined : config.preAPIHook,
                onHandleEvent: config === undefined ? undefined : config.onHandleEvent
            })(appInfo);

            return EmailPassword.instance;
        };
    }

    static signOut(): Promise<SuccessAPIResponse> {
        return EmailPassword.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(): Promise<boolean> {
        return await EmailPassword.getInstanceOrThrow().isEmailVerified();
    }

    static getInstanceOrThrow(): EmailPassword {
        if (EmailPassword.instance === undefined) {
            let error =
                "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/starter-guide/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return EmailPassword.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        EmailPassword.instance = undefined;
        return;
    }
}
