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
import { RecipeFeatureComponentMap } from "../../types";
import { Config, NormalisedConfig, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { default as EmailVerificationFeature } from "./components/features/emailVerification";
import NormalisedURLPath from "../../normalisedURLPath";
import { DEFAULT_VERIFY_EMAIL_PATH } from "./constants";
import { isEmailVerifiedAPI } from "./components/features/emailVerification/api";
import { matchRecipeIdUsingQueryParams } from "../../utils";
import { normaliseEmailVerificationFeature } from "./utils";
import { CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import { SSR_ERROR } from "../../constants";

export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig
> {

    static instance?: EmailVerification
    static RECIPE_ID = "emailverification";

    constructor(config: Config) {
        super(normaliseEmailVerificationFeature(config));
    }

    static init(
        config: Config
    ): CreateRecipeFunction<
        GetRedirectionURLContext,
        PreAPIHookContext,
        OnHandleEventContext,
        NormalisedConfig
    > {
        return (
            appInfo: NormalisedAppInfo
        ): RecipeModule<
            GetRedirectionURLContext,
            PreAPIHookContext,
            OnHandleEventContext,
            NormalisedConfig
        > => {
            EmailVerification.instance = new EmailVerification({
                ...config,
                appInfo,
                recipeId: EmailVerification.RECIPE_ID,
            });
            return EmailVerification.instance;
        };
    }

    static getInstanceOrThrow(): EmailVerification {
        if (EmailVerification.instance === undefined) {
            let error =
                "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return EmailVerification.instance;
    }

    getFeatures = (): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.config.mode !== "OFF" && this.config.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                rid: this.config.recipeId,
                component: EmailVerificationFeature,
            };
        }
        return features;
    };

    async isEmailVerified(): Promise<boolean> {
        return await isEmailVerifiedAPI(this);
    }

    getDefaultRedirectionURL = async (
        context: GetRedirectionURLContext
    ): Promise<string> => {
        if (context.action === "VERIFY_EMAIL") {
            const verifyEmailPath = new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH);
            return `${this.config.appInfo.websiteBasePath.appendPath(verifyEmailPath).getAsStringDangerous()}?rid=${this.config.recipeId
                }`;
        } else {
            return "/";
        }
    };
}
