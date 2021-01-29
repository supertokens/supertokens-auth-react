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
import { CreateRecipeFunction, RouteToFeatureComponentMap, NormalisedAppInfo } from "../../types";
import {
    EmailPasswordConfig,
    EmailPasswordRedirectionUrlAction,
    EmailPasswordUserInput,
    NormalisedEmailPasswordConfig,
    SignOutAPIResponse
} from "./types";
import { isTest } from "../../utils";
import { normaliseEmailPasswordConfig } from "./utils";
import { ResetPasswordUsingToken, SignInAndUp, EmailVerification } from ".";
import NormalisedURLPath from "../../normalisedURLPath";
import { DEFAULT_RESET_PASSWORD_PATH, DEFAULT_VERIFY_EMAIL_PATH, EMAIL_VERIFICATION_MODE } from "./constants";
import { SSR_ERROR } from "../../constants";
import Session from "../session/session";
import SuperTokens from "../../superTokens";
import { isEmailVerifiedAPI } from "./components/features/emailVerification/api";
import { signOut } from "./components/features/signOut/api";

/*
 * Class.
 */
export default class EmailPassword extends RecipeModule {
    /*
     * Static Attributes.
     */
    static instance?: EmailPassword;
    static RECIPE_ID = "emailpassword";

    /*
     * Instance Attributes.
     */
    private config: NormalisedEmailPasswordConfig;

    /*
     * Constructor.
     */
    constructor(config: EmailPasswordConfig) {
        super(config);
        this.config = normaliseEmailPasswordConfig(config);
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
            const normalisedFullPath = this.getAppInfo().websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = SignInAndUp;
        }

        if (this.config.resetPasswordUsingTokenFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.getAppInfo().websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = ResetPasswordUsingToken;
        }

        if (
            this.config.emailVerificationFeature.disableDefaultImplementation !== true &&
            this.config.emailVerificationFeature.mode !== EMAIL_VERIFICATION_MODE.OFF
        ) {
            const normalisedFullPath = this.getAppInfo().websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = EmailVerification;
        }

        return features;
    };

    getDefaultRedirectionURL = async (context: { action: EmailPasswordRedirectionUrlAction }): Promise<string> => {
        switch (context.action) {
            case "SIGN_IN_AND_UP":
                return `${this.getAppInfo().websiteBasePath.getAsStringDangerous()}?rid=${this.getRecipeId()}`;

            case "VERIFY_EMAIL":
                return `${this.getAppInfo().websiteBasePath.getAsStringDangerous()}${DEFAULT_VERIFY_EMAIL_PATH}?rid=${this.getRecipeId()}`;

            case "RESET_PASSWORD":
                return `${this.getAppInfo().websiteBasePath.getAsStringDangerous()}${DEFAULT_RESET_PASSWORD_PATH}?rid=${this.getRecipeId()}`;

            case "SUCCESS":
            default:
                return "/";
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

    signOut = async (): Promise<SignOutAPIResponse> => {
        return await signOut(this);
    };

    /*
     * Email Verification
     */

    async isEmailVerified(): Promise<boolean> {
        return await isEmailVerifiedAPI(this);
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
            return EmailPassword.instance;
        };
    }

    static signOut(): Promise<SignOutAPIResponse> {
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
