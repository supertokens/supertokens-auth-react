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
import { CreateRecipeFunction, RecipeFeatureComponentMap, NormalisedAppInfo } from "../../types";
import {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    Config,
    NormalisedConfig,
    UserInput,
} from "./types";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { normalisePasswordlessConfig } from "./utils";
import RecipeModule from "../recipeModule";
import RecipeImplementation from "./recipeImplementation";
import OverrideableBuilder from "supertokens-js-override";
import AuthRecipe from "../authRecipe";
import { SSR_ERROR } from "../../constants";
import SignInUp from "./components/features/signInAndUp";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import LinkClickedScreen from "./components/features/linkClickedScreen";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import UserContextWrapper from "../../usercontext/userContextWrapper";

/*
 * Class.
 */
export default class Passwordless extends AuthRecipe<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: Passwordless;
    static RECIPE_ID = "passwordless";

    recipeImpl: RecipeInterface;

    constructor(config: Config) {
        super(normalisePasswordlessConfig(config));

        const builder = new OverrideableBuilder(
            RecipeImplementation({
                appInfo: this.config.appInfo,
                recipeId: this.config.recipeId,
                onHandleEvent: this.config.onHandleEvent,
                preAPIHook: this.config.preAPIHook,
                postAPIHook: this.config.postAPIHook,
            })
        );
        this.recipeImpl = builder.override(this.config.override.functions).build();
    }

    getFeatures = (): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.config.signInUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                component: (props) => this.getFeatureComponent("signInUp", props),
            };
        }
        if (this.config.linkClickedScreenFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/verify"));
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                component: (props) => this.getFeatureComponent("linkClickedScreen", props),
            };
        }

        return features;
    };

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        return this.getAuthRecipeDefaultRedirectionURL(context);
    };

    getFeatureComponent = (componentName: "signInUp" | "linkClickedScreen", props: any | undefined): JSX.Element => {
        if (componentName === "signInUp") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <AuthWidgetWrapper<
                        GetRedirectionURLContext,
                        PreAndPostAPIHookAction,
                        OnHandleEventContext,
                        NormalisedConfig
                    >
                        authRecipe={this}
                        history={props.history}>
                        <SignInUp recipe={this} {...props} />
                    </AuthWidgetWrapper>
                </UserContextWrapper>
            );
        }
        if (componentName === "linkClickedScreen") {
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <LinkClickedScreen recipe={this} {...props} />
                </UserContextWrapper>
            );
        }
        return <div>Not implemented</div>;
    };

    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        return (
            appInfo: NormalisedAppInfo
        ): RecipeModule<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> => {
            Passwordless.instance = new Passwordless({
                ...config,
                appInfo,
                recipeId: Passwordless.RECIPE_ID,
            });
            return Passwordless.instance;
        };
    }

    static getInstanceOrThrow(): Passwordless {
        if (Passwordless.instance === undefined) {
            let error =
                "No instance of Passwordless found. Make sure to call the Passwordless.init method." +
                "See https://supertokens.io/docs/passwordless/quick-setup/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return Passwordless.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        Passwordless.instance = undefined;
        return;
    }
}
