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

import React from "react";
import RecipeModule from "../recipeModule";
import { RecipeFeatureComponentMap } from "../../types";
import {
    Config,
    NormalisedConfig,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
} from "./types";
import { default as EmailVerificationFeature } from "./components/features/emailVerification";
import NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";
import { DEFAULT_VERIFY_EMAIL_PATH } from "./constants";
import { matchRecipeIdUsingQueryParams } from "../../utils";
import { normaliseEmailVerificationFeature } from "./utils";
import { CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import { SSR_ERROR } from "../../constants";
import RecipeImplementation from "./recipeImplementation";
import { SessionAuth } from "../session";
import OverrideableBuilder from "supertokens-js-override";
import WebJSEmailVerification from "supertokens-web-js/lib/build/recipe/emailverification/recipe";

export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailVerification;
    static RECIPE_ID = "emailverification";

    recipeImpl: RecipeInterface;

    constructor(config: Config) {
        super(normaliseEmailVerificationFeature(config));

        {
            const webJsImplementation = new WebJSEmailVerification({
                appInfo: config.appInfo,
                recipeId: config.recipeId,
                preAPIHook: config.preAPIHook,
            });

            const builder = new OverrideableBuilder(RecipeImplementation(webJsImplementation));
            this.recipeImpl = builder.override(this.config.override.functions).build();
        }
    }

    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig> {
        return (
            appInfo: NormalisedAppInfo
        ): RecipeModule<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig> => {
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
            let error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";

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
                component: (props: any) => this.getFeatureComponent("emailverification", props),
            };
        }
        return features;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getFeatureComponent = (_: "emailverification", props: any): JSX.Element => {
        return (
            <SessionAuth requireAuth={false}>
                <EmailVerificationFeature recipe={this} {...props} />
            </SessionAuth>
        );
    };

    async isEmailVerified(userContext: any): Promise<{
        status: "OK";
        isVerified: boolean;
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }> {
        return await this.recipeImpl.isEmailVerified({
            config: this.config,
            userContext,
        });
    }

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "VERIFY_EMAIL") {
            const verifyEmailPath = new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH);
            return `${this.config.appInfo.websiteBasePath.appendPath(verifyEmailPath).getAsStringDangerous()}?rid=${this.config.recipeId
                }`;
        } else {
            return "/";
        }
    };
}
