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
import { normaliseThirdPartyEmailPasswordConfig } from "./utils";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { SSR_ERROR } from "../../constants";
import RecipeModule from "../recipeModule";
import SignInAndUp from "./components/features/signInAndUp";
import EmailPassword from "../emailpassword/recipe";
import ThirdParty from "../thirdparty/recipe";
import AuthWidgetWrapper from "../authRecipe/authWidgetWrapper";
import getEmailPasswordImpl from "./recipeImplementation/emailPasswordImplementation";
import getThirdPartyImpl from "./recipeImplementation/thirdPartyImplementation";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import ThirdPartyEmailPasswordWebJS from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { getFunctionOverrides } from "./functionOverrides";
import { PreAndPostAPIHookAction as PreAndPostAPIHookActionWebJS } from "supertokens-web-js/recipe/thirdpartyemailpassword/types";

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

    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        recipes: {
            thirdPartyInstance: ThirdParty | undefined;
            emailPasswordInstance: EmailPassword | undefined;
        },
        public readonly webJSRecipe: WebJSRecipeInterface<
            typeof ThirdPartyEmailPasswordWebJS
        > = ThirdPartyEmailPasswordWebJS
    ) {
        super(config);

        this.emailPasswordRecipe =
            recipes.emailPasswordInstance !== undefined
                ? recipes.emailPasswordInstance
                : this.config.disableEmailPassword
                ? undefined
                : new EmailPassword(
                      {
                          ...this.config.emailPasswordConfig,
                          appInfo: this.config.appInfo,
                          recipeId: this.config.recipeId,
                      },
                      // ThirdPartyEmailPassword has emailPassword and thirdparty instances initialized within it,
                      // so we pass the ThirdPartyEmailPassword instance to getRecipeImpl functions to get each recipe instance
                      // importing the sub-recipes (thirdparty, emailpassword) directly from web-js would throw an error due to them not being initialized
                      // getting the appropriate interfaces (the ones exposed by the recipe index files) through the web-js
                      // instance of ThirdPartyEmailPassword would require reworking web-js and is impractical
                      getEmailPasswordImpl(this.webJSRecipe)
                  );

        // we initialise this recipe only if the user has provided thirdparty
        // providers.
        this.thirdPartyRecipe =
            recipes.thirdPartyInstance !== undefined
                ? recipes.thirdPartyInstance
                : this.config.thirdPartyConfig === undefined
                ? undefined
                : new ThirdParty(
                      {
                          ...this.config.thirdPartyConfig,
                          appInfo: this.config.appInfo,
                          recipeId: this.config.recipeId,
                      },
                      getThirdPartyImpl(this.webJSRecipe)
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

        if (this.config.signInAndUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                component: (prop: any) => this.getFeatureComponent("signinup", prop),
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
        props: FeatureBaseProps & { redirectOnSessionExists?: boolean; userContext?: any }
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
        } else if (componentName === "resetpassword") {
            if (this.emailPasswordRecipe === undefined) {
                throw new Error("Should not come here...");
            }
            return this.emailPasswordRecipe.getFeatureComponent(componentName, props);
        } else if (componentName === "signinupcallback") {
            if (this.thirdPartyRecipe === undefined) {
                throw new Error(
                    "Embedding this component requires the thirdparty recipe to be enabled. Please check the value of signInAndUpFeature.providers in the configuration."
                );
            }
            return this.thirdPartyRecipe.getFeatureComponent(componentName, props);
        } else {
            throw new Error("Should not come here...");
        }
    };

    /*
     * Static methods.
     */

    static init(
        config: UserInput
    ): RecipeInitResult<
        GetRedirectionURLContext,
        PreAndPostAPIHookAction,
        OnHandleEventContext,
        NormalisedConfig,
        PreAndPostAPIHookActionWebJS
    > {
        const normalisedConfig = normaliseThirdPartyEmailPasswordConfig(config);

        return {
            authReact: (
                appInfo: NormalisedAppInfo
            ): RecipeModule<
                GetRedirectionURLContext,
                PreAndPostAPIHookAction,
                OnHandleEventContext,
                NormalisedConfig
            > => {
                ThirdPartyEmailPassword.instance = new ThirdPartyEmailPassword(
                    {
                        ...normalisedConfig,
                        appInfo,
                        recipeId: ThirdPartyEmailPassword.RECIPE_ID,
                    },
                    {
                        emailPasswordInstance: undefined,
                        thirdPartyInstance: undefined,
                    }
                );
                return ThirdPartyEmailPassword.instance;
            },
            webJS: ThirdPartyEmailPasswordWebJS.init({
                ...normalisedConfig,
                override: {
                    functions: (originalImpl, builder) => {
                        const functions = getFunctionOverrides(
                            ThirdPartyEmailPassword.RECIPE_ID,
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
