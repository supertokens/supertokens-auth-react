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
    ThirdPartyEmailPasswordConfig,
    ThirdPartyEmailPasswordGetRedirectionURLContext,
    ThirdPartyEmailPasswordUserInput,
    NormalisedThirdPartyEmailPasswordConfig,
    ThirdPartyEmailPasswordPreAPIHookContext,
    ThirdPartyEmailPasswordOnHandleEventContext,
} from "./types";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { normaliseThirdPartyEmailPasswordConfig } from "./utils";
import NormalisedURLPath from "../../normalisedURLPath";
import { SSR_ERROR } from "../../constants";
import RecipeModule from "../recipeModule";
import SignInAndUp from "./components/features/signInAndUp";
import SignInAndUpCallback from "../thirdparty/components/features/signInAndUpCallback";
import { DEFAULT_RESET_PASSWORD_PATH } from "../emailpassword/constants";
import { matchRecipeIdUsingState } from "../thirdparty/utils";
import ResetPasswordUsingToken from "../emailpassword/components/features/resetPasswordUsingToken";

/*
 * Class.
 */
export default class ThirdPartyEmailPassword extends AuthRecipeModule<
    ThirdPartyEmailPasswordGetRedirectionURLContext,
    ThirdPartyEmailPasswordPreAPIHookContext,
    ThirdPartyEmailPasswordOnHandleEventContext,
    NormalisedThirdPartyEmailPasswordConfig
> {
    /*
     * Static Attributes.
     */
    static instance?: ThirdPartyEmailPassword;
    static RECIPE_ID = "thirdpartyemailpassword";
    /*
     * Constructor.
     */
    constructor(config: ThirdPartyEmailPasswordConfig) {
        super(config, normaliseThirdPartyEmailPasswordConfig(config));
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
                component: SignInAndUp,
            };
        }

        if (this.config.resetPasswordUsingTokenFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.recipeId),
                rid: this.recipeId,
                component: ResetPasswordUsingToken,
            };
        }

        // Add callback route for each provider.
        this.config.signInAndUpFeature.providers.forEach((provider) => {
            const normalisedFullPath = this.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(`/callback/${provider.id}`)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                component: SignInAndUpCallback,
                rid: this.recipeId,
                matches: matchRecipeIdUsingState(this.recipeId),
            };
        });

        return {
            ...features,
            ...this.getAuthRecipeModuleFeatures(),
        };
    };

    getDefaultRedirectionURL = async (context: ThirdPartyEmailPasswordGetRedirectionURLContext): Promise<string> => {
        switch (context.action) {
            case "GET_REDIRECT_URL":
                return context.provider.getRedirectURL();
            case "RESET_PASSWORD": {
                const resetPasswordPath = new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH);
                return `${this.appInfo.websiteBasePath.appendPath(resetPasswordPath).getAsStringDangerous()}?rid=${
                    this.recipeId
                }`;
            }
            default:
                return this.getAuthRecipeModuleDefaultRedirectionURL(context);
        }
    };

    /*
     * Static methods.
     */

    static init(
        config: ThirdPartyEmailPasswordUserInput
    ): CreateRecipeFunction<
        ThirdPartyEmailPasswordGetRedirectionURLContext,
        ThirdPartyEmailPasswordPreAPIHookContext,
        ThirdPartyEmailPasswordOnHandleEventContext
    > {
        return (
            appInfo: NormalisedAppInfo
        ): RecipeModule<
            ThirdPartyEmailPasswordGetRedirectionURLContext,
            ThirdPartyEmailPasswordPreAPIHookContext,
            ThirdPartyEmailPasswordOnHandleEventContext
        > => {
            ThirdPartyEmailPassword.instance = new ThirdPartyEmailPassword({
                ...config,
                appInfo,
                recipeId: ThirdPartyEmailPassword.RECIPE_ID,
            });
            return ThirdPartyEmailPassword.instance;
        };
    }

    static signOut(): Promise<SuccessAPIResponse> {
        return ThirdPartyEmailPassword.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(): Promise<boolean> {
        return await ThirdPartyEmailPassword.getInstanceOrThrow().isEmailVerified();
    }

    static getInstanceOrThrow(): ThirdPartyEmailPassword {
        if (ThirdPartyEmailPassword.instance === undefined) {
            let error =
                "No instance of ThirdPartyEmailPassword found. Make sure to call the ThirdPartyEmailPassword.init method." +
                "See https://supertokens.io/docs/thirdpartyemailpassword/quick-setup/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return ThirdPartyEmailPassword.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        ThirdPartyEmailPassword.instance = undefined;
        return;
    }
}
