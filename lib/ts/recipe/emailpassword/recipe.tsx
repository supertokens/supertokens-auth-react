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

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import ResetPasswordUsingToken from "./components/features/resetPasswordUsingToken";
import SignInAndUp from "./components/features/signInAndUp";
import { DEFAULT_RESET_PASSWORD_PATH } from "./constants";
import RecipeImplementation from "./recipeImplementation";
import { normaliseEmailPasswordConfig } from "./utils";

import type {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    Config,
    NormalisedConfig,
    UserInput,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { CreateRecipeFunction, FeatureBaseProps, NormalisedAppInfo, RecipeFeatureComponentMap } from "../../types";
import type RecipeModule from "../recipeModule";
import type { RecipeInterface as WebJsRecipeInterface } from "supertokens-web-js/recipe/emailpassword";

/*
 * Class.
 */
export default class EmailPassword extends AuthRecipe<
    GetRedirectionURLContext,
    never,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailPassword;
    static RECIPE_ID = "emailpassword";

    recipeImpl: WebJsRecipeInterface;

    constructor(config: Config) {
        super(normaliseEmailPasswordConfig(config));

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

    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.config.signInAndUpFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                component: (props) => this.getFeatureComponent("signinup", props, useComponentOverrides),
            };
        }

        if (this.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                component: (props) => this.getFeatureComponent("resetpassword", props, useComponentOverrides),
            };
        }

        return features;
    };

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "RESET_PASSWORD") {
            const resetPasswordPath = new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH);
            return `${this.config.appInfo.websiteBasePath.appendPath(resetPasswordPath).getAsStringDangerous()}?rid=${
                this.config.recipeId
            }`;
        }

        return this.getAuthRecipeDefaultRedirectionURL(context);
    };

    getFeatureComponent = (
        componentName: "signinup" | "resetpassword",
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
            return (
                <UserContextWrapper userContext={props.userContext}>
                    <ResetPasswordUsingToken recipe={this} {...props} useComponentOverrides={useComponentOverrides} />
                </UserContextWrapper>
            );
        } else {
            throw new Error("Should never come here.");
        }
    };

    static init(
        config?: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        return (
            appInfo: NormalisedAppInfo
        ): RecipeModule<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> => {
            EmailPassword.instance = new EmailPassword({
                ...config,
                appInfo,
                recipeId: EmailPassword.RECIPE_ID,
            });
            return EmailPassword.instance;
        };
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
