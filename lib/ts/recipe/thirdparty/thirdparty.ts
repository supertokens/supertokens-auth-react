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
    ThirdPartyConfig,
    ThirdPartyGetRedirectionURLContext,
    ThirdPartyUserInput,
    NormalisedThirdPartyConfig
} from "./types";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { matchRecipeIdUsingState, normaliseThirdPartyConfig } from "./utils";
import NormalisedURLPath from "../../normalisedURLPath";
import { SSR_ERROR } from "../../constants";
import RecipeModule from "../recipeModule";
import { NormalisedAuthRecipeConfig } from "../authRecipeModule/types";
import SignInAndUp from "./components/features/signInAndUp";
import SignInAndUpCallback from "./components/features/signInAndUpCallback";

/*
 * Class.
 */
export default class ThirdParty extends AuthRecipeModule {
    /*
     * Static Attributes.
     */
    static instance?: ThirdParty;
    static RECIPE_ID = "thirdparty";

    /*
     * Instance Attributes.
     */
    config: NormalisedThirdPartyConfig & NormalisedAuthRecipeConfig;

    /*
     * Constructor.
     */
    constructor(config: ThirdPartyConfig) {
        super(config);
        this.config = {
            ...this.config,
            ...normaliseThirdPartyConfig(config)
        };
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

        // Add callback route for each provider.
        this.config.signInAndUpFeature.providers.forEach(provider => {
            const normalisedFullPath = this.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(`/callback/${provider.id}`)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                component: SignInAndUpCallback,
                rid: this.recipeId,
                matches: matchRecipeIdUsingState(this.recipeId)
            };
        });

        return {
            ...features,
            ...this.getAuthRecipeModuleFeatures()
        };
    };

    getDefaultRedirectionURL = async (context: ThirdPartyGetRedirectionURLContext): Promise<string> => {
        return this.getAuthRecipeModuleDefaultRedirectionURL(context);
    };

    /*
     * Static methods.
     */

    static init(config: ThirdPartyUserInput): CreateRecipeFunction {
        return (appInfo: NormalisedAppInfo): RecipeModule => {
            ThirdParty.instance = new ThirdParty({
                ...config,
                appInfo,
                recipeId: ThirdParty.RECIPE_ID
            });
            return ThirdParty.instance;
        };
    }

    static signOut(): Promise<SuccessAPIResponse> {
        return ThirdParty.getInstanceOrThrow().signOut();
    }

    static async isEmailVerified(): Promise<boolean> {
        return await ThirdParty.getInstanceOrThrow().isEmailVerified();
    }

    static getInstanceOrThrow(): ThirdParty {
        if (ThirdParty.instance === undefined) {
            // TODO Use correct doc link.
            let error =
                "No instance of ThirdParty found. Make sure to call the ThirdParty.init method." +
                "See https://supertokens.io/docs/thirdparty/starter-guide/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return ThirdParty.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        ThirdParty.instance = undefined;
        return;
    }
}
