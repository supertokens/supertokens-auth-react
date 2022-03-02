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
import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { CreateRecipeFunction, RecipeFeatureComponentMap, NormalisedAppInfo } from "../../types";
import {
    Config,
    GetRedirectionURLContext,
    NormalisedConfig,
    OnHandleEventContext,
    UserInput,
    PreAndPostAPIHookAction,
} from "./types";
import { isTest, matchRecipeIdUsingQueryParams } from "../../utils";
import { normaliseThirdPartyEmailPasswordConfig } from "./utils";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { SSR_ERROR } from "../../constants";
import RecipeModule from "../recipeModule";
import SignInAndUp from "./components/features/signInAndUp";
import EmailPassword from "../emailpassword/recipe";
import ThirdParty from "../thirdparty/recipe";
import RecipeImplementation from "./recipeImplementation";
import EmailVerification from "../emailverification/recipe";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import WebJSThirdPartyEmailPassword from "supertokens-web-js/lib/build/recipe/thirdpartyemailpassword/recipe";
import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export default class ThirdPartyEmailPassword extends AuthRecipeWithEmailVerification<
    GetRedirectionURLContext,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdPartyEmailPassword;
    static RECIPE_ID = "thirdpartyemailpassword";

    emailPasswordRecipe: EmailPassword | undefined;

    thirdPartyRecipe: ThirdParty | undefined;

    webJsRecipe: WebJSThirdPartyEmailPassword;

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

        this.webJsRecipe = new WebJSThirdPartyEmailPassword(
            {
                appInfo: config.appInfo,
                recipeId: config.recipeId,
                preAPIHook: config.preAPIHook,
                postAPIHook: config.postAPIHook,
                override: {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    functions: (_, builder) => {
                        builder = builder.override((oI) => RecipeImplementation(oI));
                        if (this.config.override.functions !== undefined) {
                            builder = builder.override(this.config.override.functions);
                        }
                        return builder.build();
                    },
                },
            },
            {
                emailVerification:
                    recipes.emailVerificationInstance === undefined
                        ? undefined
                        : recipes.emailVerificationInstance.webJsRecipe,
                emailPassword:
                    recipes.emailPasswordInstance === undefined ? undefined : recipes.emailPasswordInstance.webJsRecipe,
                thirdParty:
                    recipes.thirdPartyInstance === undefined ? undefined : recipes.thirdPartyInstance.webJsRecipe,
            }
        );

        this.recipeImpl = this.webJsRecipe.recipeImplementation;
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
            ...this.getAuthRecipeWithEmailVerificationFeatures(),
        };
    };

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "RESET_PASSWORD") {
            if (this.emailPasswordRecipe === undefined) {
                throw new Error("Should not come here...");
            }
            return this.emailPasswordRecipe.getDefaultRedirectionURL(context);
        } else {
            return this.getAuthRecipeWithEmailVerificationDefaultRedirectionURL(context);
        }
    };

    getFeatureComponent = (
        componentName: "signinup" | "resetpassword" | "emailverification",
        props: any
    ): JSX.Element => {
        if (componentName === "signinup") {
            return (
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
            );
        } else if (componentName === "resetpassword") {
            if (this.emailPasswordRecipe === undefined) {
                throw new Error("Should not come here...");
            }
            return this.emailPasswordRecipe.getFeatureComponent(componentName, props);
        } else {
            return this.getAuthRecipeWithEmailVerificationFeatureComponent(componentName, props);
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
