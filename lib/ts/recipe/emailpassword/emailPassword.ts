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

import AuthRecipeModule from "../authRecipeModule";
import { CreateRecipeFunction, RecipeFeatureComponentMap, NormalisedAppInfo, SuccessAPIResponse } from "../../types";
import {
    EmailPasswordConfig,
    EmailPasswordGetRedirectionURLContext,
    EmailPasswordOnHandleEventContext,
    EmailPasswordPreAPIHookContext,
    EmailPasswordUserInput,
    NormalisedEmailPasswordConfig
} from "./types";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { normaliseEmailPasswordConfig } from "./utils";
import NormalisedURLPath from "../../normalisedURLPath";
import { DEFAULT_RESET_PASSWORD_PATH } from "./constants";
import { SSR_ERROR } from "../../constants";
import RecipeModule from "../recipeModule";
import SignInAndUp from "./components/features/signInAndUp/wrapper";
import ResetPasswordUsingToken from "./components/features/resetPasswordUsingToken/wrapper";

/*
 * Class.
 */
export default class EmailPassword extends AuthRecipeModule<
    EmailPasswordGetRedirectionURLContext,
    EmailPasswordPreAPIHookContext,
    EmailPasswordOnHandleEventContext,
    NormalisedEmailPasswordConfig
> {
    /*
     * Static Attributes.
     */
    static instance?: EmailPassword;
    static RECIPE_ID = "emailpassword";

    /*
     * Constructor.
     */
    constructor(config: EmailPasswordConfig) {
        super(config, normaliseEmailPasswordConfig(config));
    }

    /*
     * Instance methods.
     */

    getFeatures = (): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.config.signInAndUpFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeId),
                rid: this.recipeId,
                component: SignInAndUp
            };
        }

        if (this.config.resetPasswordUsingTokenFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeId),
                rid: this.recipeId,
                component: ResetPasswordUsingToken
            };
        }

        return {
            ...features,
            ...this.getAuthRecipeModuleFeatures()
        };
    };

    getDefaultRedirectionURL = async (context: EmailPasswordGetRedirectionURLContext): Promise<string> => {
        if (context.action === "RESET_PASSWORD") {
            const resetPasswordPath = new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH);
            return `${this.appInfo.websiteBasePath.appendPath(resetPasswordPath).getAsStringDangerous()}?rid=${
                this.recipeId
            }`;
        }

        return this.getAuthRecipeModuleDefaultRedirectionURL(context);
    };

    /*
     * Static methods.
     */

    static init(
        config?: EmailPasswordUserInput
    ): CreateRecipeFunction<
        EmailPasswordGetRedirectionURLContext,
        EmailPasswordPreAPIHookContext,
        EmailPasswordOnHandleEventContext
    > {
        return (
            appInfo: NormalisedAppInfo
        ): RecipeModule<
            EmailPasswordGetRedirectionURLContext,
            EmailPasswordPreAPIHookContext,
            EmailPasswordOnHandleEventContext
        > => {
            EmailPassword.instance = new EmailPassword({
                ...config,
                appInfo,
                recipeId: EmailPassword.RECIPE_ID
            });
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
                "See https://supertokens.io/docs/emailpassword/quick-setup/frontend";

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
