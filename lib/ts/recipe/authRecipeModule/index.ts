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

import Session from "../session/session";
import RecipeModule from "../recipeModule";
import { NormalisedAuthRecipeConfig, AuthRecipeModuleConfig, AuthRecipeModuleGetRedirectionURLContext } from "./types";
import { RecipeFeatureComponentMap, SuccessAPIResponse } from "../../types";
import { signOut } from "./api";
import { normaliseAuthRecipeModuleConfig } from "./utils";
import EmailVerification from "../emailverification";

/*
 * Class.
 */
export default abstract class AuthRecipeModule extends RecipeModule {
    /*
     * Instance attributes.
     */

    config: NormalisedAuthRecipeConfig;
    emailVerification?: EmailVerification;

    /*
     * Constructor.
     */
    constructor(config: AuthRecipeModuleConfig<unknown, unknown, unknown>) {
        super(config);
        this.config = {
            ...this.config,
            ...normaliseAuthRecipeModuleConfig(config)
        };

        if (this.config.emailVerificationFeature.mode === "REQUIRED") {
            this.emailVerification = new EmailVerification({
                ...this.config.emailVerificationFeature,
                palette: this.config.palette,
                useShadowDom: this.config.useShadowDom,
                ...this.hooks,
                appInfo: this.appInfo,
                recipeId: this.recipeId,
                signOut: this.signOut
            });
        }
    }

    getAuthRecipeModuleDefaultRedirectionURL = async (
        context: AuthRecipeModuleGetRedirectionURLContext
    ): Promise<string> => {
        switch (context.action) {
            case "SIGN_IN_AND_UP":
                return `${this.appInfo.websiteBasePath.getAsStringDangerous()}?rid=${this.recipeId}`;

            case "SUCCESS":
                return context.redirectToPath === undefined ? "/" : context.redirectToPath;

            case "VERIFY_EMAIL": {
                if (this.emailVerification === undefined) {
                    return "/";
                }
                return this.emailVerification.getEmailVerificationDefaultURL(context);
            }
        }
    };

    getAuthRecipeModuleFeatures = (): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};
        if (this.emailVerification !== undefined) {
            features = this.emailVerification.getFeatures();
        }

        return features;
    };

    /*
     * SignOut.
     */
    signOut = async (): Promise<SuccessAPIResponse> => {
        return await signOut(this);
    };

    /*
     * Email Verification
     */

    async isEmailVerified(): Promise<boolean> {
        if (this.emailVerification === undefined) {
            throw new Error("You need to set emailVerificationFeature mode to required to use this method.");
            return false;
        }
        return await this.emailVerification.isEmailVerified();
    }

    isEmailVerificationRequired(): boolean {
        return this.emailVerification !== undefined && this.emailVerification.config.mode === "REQUIRED";
    }

    /*
     * Session
     */

    doesSessionExist = (): boolean => {
        return Session.getInstanceOrThrow().doesSessionExist();
    };
}
