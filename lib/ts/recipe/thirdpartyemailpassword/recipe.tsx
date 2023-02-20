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
import EmailPassword from "../emailpassword/recipe";
import ThirdParty from "../thirdparty/recipe";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import SignInAndUp from "./components/features/signInAndUp";
import RecipeImplementation from "./recipeImplementation";
import getEmailPasswordImpl from "./recipeImplementation/emailPasswordImplementation";
import getThirdPartyImpl from "./recipeImplementation/thirdPartyImplementation";
import { normaliseThirdPartyEmailPasswordConfig } from "./utils";

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
import type { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export default class ThirdPartyEmailPassword extends AuthRecipe<
    GetRedirectionURLContext,
    never,
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
            thirdPartyInstance: ThirdParty | undefined;
            emailPasswordInstance: EmailPassword | undefined;
        }
    ) {
        super(normaliseThirdPartyEmailPasswordConfig(config));

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

        this.emailPasswordRecipe =
            recipes.emailPasswordInstance !== undefined
                ? recipes.emailPasswordInstance
                : this.config.disableEmailPassword
                ? undefined
                : new EmailPassword({
                      appInfo: this.config.appInfo,
                      recipeId: this.config.recipeId,
                      getRedirectionURL: this.config.getRedirectionURL,
                      onHandleEvent: this.config.onHandleEvent,
                      style: this.config.rootStyle,
                      preAPIHook: this.config.preAPIHook,
                      resetPasswordUsingTokenFeature: this.config.resetPasswordUsingTokenFeature,
                      signInAndUpFeature: this.config.signInAndUpFeature,
                      useShadowDom: this.config.useShadowDom,
                      override: {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          functions: (_: any) => {
                              return getEmailPasswordImpl(this.recipeImpl);
                          },
                      },
                  });

        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : this.config.signInAndUpFeature.providers === undefined ||
                  this.config.signInAndUpFeature.providers.length === 0
                ? undefined
                : new ThirdParty({
                      appInfo: this.config.appInfo,
                      recipeId: this.config.recipeId,
                      getRedirectionURL: this.config.getRedirectionURL,
                      style: this.config.rootStyle,
                      onHandleEvent: this.config.onHandleEvent,
                      preAPIHook: this.config.preAPIHook,
                      signInAndUpFeature: this.config.signInAndUpFeature,
                      oAuthCallbackScreen: this.config.oAuthCallbackScreen,
                      useShadowDom: this.config.useShadowDom,
                      override: {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          functions: (_: any) => {
                              return getThirdPartyImpl(this.recipeImpl);
                          },
                      },
                  });
    }

    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        let features: RecipeFeatureComponentMap = {};

        if (this.emailPasswordRecipe !== undefined) {
            features = {
                ...features,
                ...this.emailPasswordRecipe.getFeatures(useComponentOverrides),
            };
        }

        if (this.thirdPartyRecipe !== undefined) {
            features = {
                ...features,
                ...this.thirdPartyRecipe.getFeatures(useComponentOverrides),
            };
        }

        if (this.config.signInAndUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                component: (prop: any) => this.getFeatureComponent("signinup", prop, useComponentOverrides),
            };
        }

        return features;
    };

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "RESET_PASSWORD") {
            if (this.emailPasswordRecipe === undefined) {
                throw new Error("Should not come here...");
            }
            return this.emailPasswordRecipe.getDefaultRedirectionURL(context);
        } else {
            return this.getAuthRecipeDefaultRedirectionURL(context);
        }
    };

    getFeatureComponent = (
        componentName: "signinup" | "signinupcallback" | "resetpassword",
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any },
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        if (componentName === "signinup") {
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
        } else if (componentName === "resetpassword") {
            if (this.emailPasswordRecipe === undefined) {
                throw new Error("Should not come here...");
            }
            return this.emailPasswordRecipe.getFeatureComponent(componentName, props, useComponentOverrides);
        } else if (componentName === "signinupcallback") {
            if (this.thirdPartyRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInAndUpFeature.providers in the configuration."
                );
            }
            return this.thirdPartyRecipe.getFeatureComponent(componentName, props, useComponentOverrides);
        } else {
            throw new Error("Should not come here...");
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
            ThirdPartyEmailPassword.instance = new ThirdPartyEmailPassword(
                {
                    ...config,
                    appInfo,
                    recipeId: ThirdPartyEmailPassword.RECIPE_ID,
                },
                {
                    emailPasswordInstance: undefined,
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
