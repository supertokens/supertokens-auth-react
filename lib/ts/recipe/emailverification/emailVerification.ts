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
import { CreateRecipeFunction, RouteToFeatureComponentMap, NormalisedAppInfo, SuccessAPIResponse } from "../../types";
import {
    EmailVerificationConfig,
    EmailVerificationUserInputAndHooks,
    NormalisedEmailVerificationConfig
} from "./types";
import { default as EmailVerificationFeature } from "./components/features/emailVerification/emailVerification";
import { isTest } from "../../utils";
import NormalisedURLPath from "../../normalisedURLPath";
import { DEFAULT_VERIFY_EMAIL_PATH } from "./constants";
import { SSR_ERROR } from "../../constants";
import { isEmailVerifiedAPI } from "./components/features/emailVerification/api";
import { normaliseEmailVerificationFeature } from "./utils";

/*
 * Class.
 */
export default class EmailVerification extends RecipeModule {
    /*
     * Static Attributes.
     */
    static instance?: EmailVerification;

    /*
     * Instance Attributes.
     */
    config: NormalisedEmailVerificationConfig;

    /*
     * Constructor.
     */
    constructor(config: EmailVerificationConfig) {
        super(config);
        this.config = normaliseEmailVerificationFeature(config);
    }

    /*
     * Instance methods.
     */

    getFeatures = (): RouteToFeatureComponentMap => {
        const features: RouteToFeatureComponentMap = {};
        if (this.config.mode !== "OFF" && this.config.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = EmailVerificationFeature;
        }
        return features;
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

    static init(config: EmailVerificationUserInputAndHooks): CreateRecipeFunction {
        return (appInfo: NormalisedAppInfo): RecipeModule => {
            EmailVerification.instance = new EmailVerification({
                ...config,
                appInfo,
                recipeId: config.authRecipe.recipeId
            });
            return EmailVerification.instance;
        };
    }

    static signOut(): Promise<SuccessAPIResponse> {
        return EmailVerification.getInstanceOrThrow().config.authRecipe.signOut();
    }

    static isEmailVerified(): Promise<boolean> {
        return EmailVerification.getInstanceOrThrow().isEmailVerified();
    }

    static getInstanceOrThrow(): EmailVerification {
        if (EmailVerification.instance === undefined) {
            // Show EmailPassword.init error since EmailVerification is initialised by EmailPassword only at the moment.
            let error =
                "No instance of EmailVerification found. Make sure to initialise EmailPassword using the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/starter-guide/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return EmailVerification.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        EmailVerification.instance = undefined;
        return;
    }
}
