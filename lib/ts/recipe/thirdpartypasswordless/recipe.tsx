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

import AuthRecipe from "../authRecipe";
import {
    RecipeFeatureComponentMap,
    NormalisedAppInfo,
    FeatureBaseProps,
    RecipeInitResult,
    NormalisedConfigWithAppInfoAndRecipeID,
    WebJSRecipeInterface,
} from "../../types";
import {
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    UserInput,
    PreAndPostAPIHookAction,
} from "./types";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { normaliseThirdPartyPasswordlessConfig } from "./utils";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { SSR_ERROR } from "../../constants";
import RecipeModule from "../recipeModule";
import SignInAndUp from "./components/features/signInAndUp";
import Passwordless from "../passwordless/recipe";
import ThirdParty from "../thirdparty/recipe";
import getPasswordlessImpl from "./recipeImplementation/passwordlessImplementation";
import getThirdPartyImpl from "./recipeImplementation/thirdPartyImplementation";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import ThirdpartyPasswordlessWebJS from "supertokens-web-js/recipe/thirdpartypasswordless";
import { getFunctionOverrides } from "./functionOverrides";

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

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        recipes: {
            thirdPartyInstance: ThirdParty | undefined;
            passwordlessInstance: Passwordless | undefined;
        },
        public readonly webJSRecipe: WebJSRecipeInterface<
            typeof ThirdpartyPasswordlessWebJS
        > = ThirdpartyPasswordlessWebJS
    ) {
        super(config);

        this.passwordlessRecipe =
            recipes.passwordlessInstance !== undefined
                ? recipes.passwordlessInstance
                : this.config.passwordlessConfig === undefined
                ? undefined
                : new Passwordless(
                      {
                          ...this.config.passwordlessConfig,
                          appInfo: this.config.appInfo,
                          recipeId: this.config.recipeId,
                      },
                      // ThirdPartyPasswordless has passwordless and thirdparty instances initialized within it,
                      // so we pass the ThirdPartyPasswordless instance to getRecipeImpl functions to get each recipe instance
                      // importing the sub-recipes (thirdparty, passwordless) directly from web-js would throw an error due to them not being initialized
                      // getting the appropriate interfaces (the ones exposed by the recipe index files) through the web-js
                      // instance of ThirdPartyPasswordless would require reworking web-js and is impractical
                      getPasswordlessImpl(this.webJSRecipe)
                  );

        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : this.config.thirdpartyConfig === undefined
                ? undefined
                : new ThirdParty(
                      {
                          ...this.config.thirdpartyConfig,
                          appInfo: this.config.appInfo,
                          recipeId: this.config.recipeId,
                      },
                      getThirdPartyImpl(this.webJSRecipe)
                  );
    }

    getFeatures = (): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};

        if (this.passwordlessRecipe !== undefined) {
            features = {
                ...features,
                ...this.passwordlessRecipe.getFeatures(),
            };
        }

        if (this.thirdPartyRecipe !== undefined) {
            features = {
                ...features,
                ...this.thirdPartyRecipe.getFeatures(),
            };
        }

        if (
            (this.config.passwordlessConfig !== undefined &&
                this.config.passwordlessConfig.signInUpFeature?.disableDefaultUI !== true) ||
            (this.config.thirdpartyConfig !== undefined &&
                this.config.thirdpartyConfig.signInAndUpFeature?.disableDefaultUI !== true)
        ) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                component: (prop: any) => this.getFeatureComponent("signInUp", prop),
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
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
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
                            <SignInAndUp recipe={this} {...props} />
                        </AuthWidgetWrapper>
                    </UserContextWrapper>
                );
            } else {
                return (
                    <UserContextWrapper userContext={props.userContext}>
                        <SignInAndUp recipe={this} {...props} />
                    </UserContextWrapper>
                );
            }
        } else if (componentName === "linkClickedScreen") {
            if (this.passwordlessRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the passwordless recipe to be enabled. Please check the value of disablePasswordless in the configuration."
                );
            }
            return this.passwordlessRecipe.getFeatureComponent(componentName, props);
        } else if (componentName === "signinupcallback") {
            if (this.thirdPartyRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInUpFeature.providers in the configuration."
                );
            }
            return this.thirdPartyRecipe.getFeatureComponent(componentName, props);
        } else {
            throw new Error("Should never come here.");
        }
    };

    /*
     * Static methods.
     */

    static init(
        config: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        const normalisedConfig = normaliseThirdPartyPasswordlessConfig(config);

        return {
            authReact: (
                appInfo: NormalisedAppInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                ThirdPartyPasswordless.instance = new ThirdPartyPasswordless(
                    {
                        ...normalisedConfig,
                        appInfo,
                        recipeId: ThirdPartyPasswordless.RECIPE_ID,
                    },
                    {
                        passwordlessInstance: undefined,
                        thirdPartyInstance: undefined,
                    }
                );
                return ThirdPartyPasswordless.instance;
            },
            webJS: ThirdpartyPasswordlessWebJS.init({
                ...normalisedConfig,
                override: {
                    functions: (originalImpl, builder) => {
                        const functions = getFunctionOverrides(
                            ThirdPartyPasswordless.RECIPE_ID,
                            normalisedConfig.onHandleEvent
                        );
                        builder.override(functions);
                        builder.override(normalisedConfig.override.functions);
                        return originalImpl;
                    },
                },
            }),
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
