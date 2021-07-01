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
import AuthRecipeModule from "../authRecipeModule";
import { CreateRecipeFunction, RecipeFeatureComponentMap, NormalisedAppInfo } from "../../types";
import {
    Config,
    GetRedirectionURLContext,
    NormalisedConfig,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
} from "./types";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { normaliseThirdPartyEmailPasswordConfig } from "./utils";
import NormalisedURLPath from "../../normalisedURLPath";
import { SSR_ERROR } from "../../constants";
import RecipeModule from "../recipeModule";
import SignInAndUp from "./components/features/signInAndUp";
import EmailPassword from "../emailpassword/recipe";
import ThirdParty from "../thirdparty/recipe";
import RecipeImplementation from "./recipeImplementation";
import getEmailPasswordImpl from "./recipeImplementation/emailPasswordImplementation";
import getThirdPartyImpl from "./recipeImplementation/thirdPartyImplementation";
import EmailVerification from "../emailverification/recipe";
import AuthWidgetWrapper from "../authRecipeModule/authWidgetWrapper";

export default class ThirdPartyEmailPassword extends AuthRecipeModule<
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdPartyEmailPassword;
    static RECIPE_ID = "thirdpartyemailpassword";

    emailPasswordRecipe: EmailPassword | undefined;

    thirdPartyRecipe: ThirdParty | undefined;

    recipeImpl: RecipeInterface;

    constructor(
        config: Config,
        recipes: {
            emailVerificationInstance: EmailVerification | undefined;
            thirdPartyInstance: ThirdParty | undefined;
            emailPasswordInstance: EmailPassword | undefined;
        }
    ) {
        super(normaliseThirdPartyEmailPasswordConfig(config), {
            emailVerificationInstance: recipes.emailVerificationInstance,
        });

        this.recipeImpl = this.config.override.functions(
            new RecipeImplementation(this.config.recipeId, this.config.appInfo)
        );

        this.emailPasswordRecipe =
            recipes.emailPasswordInstance !== undefined
                ? recipes.emailPasswordInstance
                : this.config.disableEmailPassword
                ? undefined
                : new EmailPassword(
                      {
                          appInfo: this.config.appInfo,
                          recipeId: this.config.recipeId,
                          emailVerificationFeature: this.config.emailVerificationFeature,
                          getRedirectionURL: this.config.getRedirectionURL,
                          onHandleEvent: this.config.onHandleEvent,
                          palette: this.config.palette,
                          preAPIHook: this.config.preAPIHook,
                          resetPasswordUsingTokenFeature: this.config.resetPasswordUsingTokenFeature,
                          signInAndUpFeature: this.config.signInAndUpFeature,
                          useShadowDom: this.config.useShadowDom,
                          override: {
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              functions: (_) => {
                                  return getEmailPasswordImpl(this.recipeImpl);
                              },
                              components: this.config.override.components,
                          },
                      },
                      {
                          emailVerificationInstance: this.emailVerification,
                      }
                  );

        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : this.config.signInAndUpFeature.providers === undefined ||
                  this.config.signInAndUpFeature.providers.length === 0
                ? undefined
                : new ThirdParty(
                      {
                          appInfo: this.config.appInfo,
                          recipeId: this.config.recipeId,
                          emailVerificationFeature: this.config.emailVerificationFeature,
                          getRedirectionURL: this.config.getRedirectionURL,
                          onHandleEvent: this.config.onHandleEvent,
                          palette: this.config.palette,
                          preAPIHook: this.config.preAPIHook,
                          signInAndUpFeature: this.config.signInAndUpFeature,
                          useShadowDom: this.config.useShadowDom,
                          override: {
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              functions: (_) => {
                                  return getThirdPartyImpl(this.recipeImpl);
                              },
                              components: this.config.override.components,
                          },
                      },
                      {
                          emailVerificationInstance: this.emailVerification,
                      }
                  );
    }

    getFeatures = (): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};

        if (this.emailPasswordRecipe !== undefined) {
            features = {
                ...features,
                ...this.emailPasswordRecipe.getFeatures(),
            };
        }

        if (this.thirdPartyRecipe !== undefined) {
            features = {
                ...features,
                ...this.thirdPartyRecipe.getFeatures(),
            };
        }

        if (this.config.signInAndUpFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                component: (prop: any) => this.getFeatureComponent("signinup", prop),
            };
        }

        return {
            ...features,
            ...this.getAuthRecipeModuleFeatures(),
        };
    };

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "RESET_PASSWORD") {
            if (this.emailPasswordRecipe === undefined) {
                throw new Error("Should not come here...");
            }
            return this.emailPasswordRecipe.getDefaultRedirectionURL(context);
        } else {
            return this.getAuthRecipeModuleDefaultRedirectionURL(context);
        }
    };

    getFeatureComponent = (
        componentName: "signinup" | "resetpassword" | "emailverification",
        props: any
    ): JSX.Element => {
        if (componentName === "signinup") {
            return (
                <AuthWidgetWrapper<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig>
                    authRecipe={this}
                    history={props.history}>
                    <SignInAndUp recipe={this} {...props} />
                </AuthWidgetWrapper>
            );
        } else if (componentName === "resetpassword") {
            if (this.emailPasswordRecipe === undefined) {
                throw new Error("Should not come here...");
            }
            return this.emailPasswordRecipe.getFeatureComponent(componentName, props);
        } else {
            return this.getAuthRecipeModuleFeatureComponent(componentName, props);
        }
    };

    /*
     * Static methods.
     */

    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig> {
        return (
            appInfo: NormalisedAppInfo
        ): RecipeModule<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig> => {
            ThirdPartyEmailPassword.instance = new ThirdPartyEmailPassword(
                {
                    ...config,
                    appInfo,
                    recipeId: ThirdPartyEmailPassword.RECIPE_ID,
                },
                {
                    emailPasswordInstance: undefined,
                    emailVerificationInstance: undefined,
                    thirdPartyInstance: undefined,
                }
            );
            return ThirdPartyEmailPassword.instance;
        };
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
