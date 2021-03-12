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
import { RecipeFeatureComponentMap, SuccessAPIResponse } from "../../types";
import { EmailVerificationConfig } from "./types";
import { default as EmailVerificationFeature } from "./components/features/emailVerification";
import NormalisedURLPath from "../../normalisedURLPath";
import { DEFAULT_VERIFY_EMAIL_PATH } from "./constants";
import { isEmailVerifiedAPI } from "./components/features/emailVerification/api";
import SuperTokens from "../../superTokens";
import { matchRecipeIdUsingQueryParams } from "../../utils";

/*
 * Class.
 */
export default class EmailVerification<T, S, R> extends RecipeModule<T, S, R> {
    /*
     * Instance Attributes.
     */
    config: EmailVerificationConfig<T, S, R>;

    /*
     * Constructor.
     */
    constructor(config: EmailVerificationConfig<T, S, R>) {
        super(config);
        this.config = config;
    }

    /*
     * Instance methods.
     */

    getFeatures = (): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.config.mode !== "OFF" && this.config.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeId),
                rid: this.recipeId,
                component: EmailVerificationFeature,
            };
        }
        return features;
    };

    /*
     * Email Verification
     */

    async isEmailVerified(): Promise<boolean> {
        return await isEmailVerifiedAPI(this);
    }

    async signOut(): Promise<SuccessAPIResponse> {
        return await this.config.signOut();
    }

    async getDefaultRedirectionURL(context: unknown): Promise<string> {
        return await SuperTokens.getInstanceOrThrow().getRecipeOrThrow(this.recipeId).getDefaultRedirectionURL(context);
    }

    async getEmailVerificationDefaultURL(context: { action: string }): Promise<string> {
        if (context.action !== "VERIFY_EMAIL") {
            return "/";
        }

        const verifyEmailPath = new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH);
        return `${this.appInfo.websiteBasePath.appendPath(verifyEmailPath).getAsStringDangerous()}?rid=${
            this.recipeId
        }`;
    }
}
