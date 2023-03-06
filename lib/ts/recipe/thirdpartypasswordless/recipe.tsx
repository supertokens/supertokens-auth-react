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

import { OverrideableBuilder } from "supertokens-js-override";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import { SSR_ERROR } from "../../constants";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import AuthRecipe from "../authRecipe";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import Passwordless from "../passwordless/recipe";
import ThirdParty from "../thirdparty/recipe";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import SignInAndUp from "./components/features/signInAndUp";
import RecipeImplementation from "./recipeImplementation";
import getPasswordlessImpl from "./recipeImplementation/passwordlessImplementation";
import getThirdPartyImpl from "./recipeImplementation/thirdPartyImplementation";
import { normaliseThirdPartyPasswordlessConfig } from "./utils";

import type {
    Config,
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    UserInput,
    PreAndPostAPIHookAction,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { CreateRecipeFunction, FeatureBaseProps, NormalisedAppInfo, RecipeFeatureComponentMap } from "../../types";
import type RecipeModule from "../recipeModule";
import type { RecipeInterface as TPPWlessRecipeInterface } from "supertokens-web-js/recipe/thirdpartypasswordless";

export default class ThirdPartyPasswordless extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdPartyPasswordless;
    static RECIPE_ID = "thirdpartypasswordless";

    passwordlessRecipe: Passwordless | undefined;

    thirdPartyRecipe: ThirdParty | undefined;

    recipeImpl: TPPWlessRecipeInterface;

    constructor(
        config: Config,
        recipes: {
            thirdPartyInstance: ThirdParty | undefined;
            passwordlessInstance: Passwordless | undefined;
        }
    ) {
        super(normaliseThirdPartyPasswordlessConfig(config));

        {
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

        this.passwordlessRecipe =
            recipes.passwordlessInstance !== undefined
                ? recipes.passwordlessInstance
                : this.config.passwordlessUserInput === undefined
                ? undefined
                : new Passwordless({
                      ...this.config.passwordlessUserInput,
                      appInfo: this.config.appInfo,
                      recipeId: this.config.recipeId,
                      override: {
                          ...this.config.passwordlessUserInput.override,
                          functions: () => getPasswordlessImpl(this.recipeImpl),
                      },
                  });

        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : this.config.thirdpartyUserInput === undefined
                ? undefined
                : new ThirdParty({
                      ...this.config.thirdpartyUserInput,
                      appInfo: this.config.appInfo,
                      recipeId: this.config.recipeId,
                      override: {
                          ...this.config.thirdpartyUserInput.override,
                          functions: () => getThirdPartyImpl(this.recipeImpl),
                      },
                  });
    }

    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};

        if (this.passwordlessRecipe !== undefined) {
            features = {
                ...features,
                ...this.passwordlessRecipe.getFeatures(useComponentOverrides),
            };
        }

        if (this.thirdPartyRecipe !== undefined) {
            features = {
                ...features,
                ...this.thirdPartyRecipe.getFeatures(useComponentOverrides),
            };
        }

        if (
            (this.config.passwordlessUserInput !== undefined &&
                this.config.passwordlessUserInput.signInUpFeature?.disableDefaultUI !== true) ||
            (this.config.thirdpartyUserInput !== undefined &&
                this.config.thirdpartyUserInput.signInAndUpFeature?.disableDefaultUI !== true)
        ) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                component: (prop: any) => this.getFeatureComponent("signInUp", prop, useComponentOverrides),
            };
        }

        return {
            ...features,
        };
    };

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        return this.getAuthRecipeDefaultRedirectionURL(context);
    };

    getFeatureComponent = (
        componentName: "signInUp" | "linkClickedScreen" | "signinupcallback",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any },
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "signInUp") {
            if (props.redirectOnSessionExists !== false) {
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
                            <SignInAndUp recipe={this} {...props} useComponentOverrides={useComponentOverrides} />
                        </AuthWidgetWrapper>
                    </UserContextWrapper>
                );
            } else {
                return (
                    <UserContextWrapper userContext={props.userContext}>
                        <SignInAndUp recipe={this} {...props} useComponentOverrides={useComponentOverrides} />
                    </UserContextWrapper>
                );
            }
        } else if (componentName === "linkClickedScreen") {
            if (this.passwordlessRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                );
            }
            return this.passwordlessRecipe.getFeatureComponent(componentName, props, useComponentOverrides);
        } else if (componentName === "signinupcallback") {
            if (this.thirdPartyRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                );
            }
            return this.thirdPartyRecipe.getFeatureComponent(componentName, props, useComponentOverrides);
        } else {
            throw new Error("Should never come here.");
        }
    };

    /*
     * Static methods.
     */

    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        return (
            appInfo: NormalisedAppInfo
        ): RecipeModule<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> => {
            ThirdPartyPasswordless.instance = new ThirdPartyPasswordless(
                {
                    ...config,
                    appInfo,
                    recipeId: ThirdPartyPasswordless.RECIPE_ID,
                },
                {
                    passwordlessInstance: undefined,
                    thirdPartyInstance: undefined,
                }
            );
            return ThirdPartyPasswordless.instance;
        };
    }

    static getInstanceOrThrow(): ThirdPartyPasswordless {
        if (ThirdPartyPasswordless.instance === undefined) {
            let error =
                "No instance of ThirdPartyPasswordless found. Make sure to call the ThirdPartyPasswordless.init method." +
                "See https://supertokens.io/docs/thirdpartypasswordless/quick-setup/frontend";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return ThirdPartyPasswordless.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        ThirdPartyPasswordless.instance = undefined;
        return;
    }
}
