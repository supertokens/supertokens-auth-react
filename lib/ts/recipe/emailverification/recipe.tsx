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
import { EmailVerificationClaimClass } from "supertokens-web-js/recipe/emailverification";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import { SessionClaimValidatorStore } from "supertokens-web-js/utils/sessionClaimValidatorStore";

import { SSR_ERROR } from "../../constants";
import { UserContextContext } from "../../usercontext";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { matchRecipeIdUsingQueryParams, saveInvalidClaimRedirectPathInContext } from "../../utils";
import RecipeModule from "../recipeModule";
import { SessionAuth } from "../session";

import { useRecipeComponentOverrideContext } from "./componentOverrideContext";
import { default as EmailVerificationFeature } from "./components/features/emailVerification";
import { DEFAULT_VERIFY_EMAIL_PATH } from "./constants";
import RecipeImplementation from "./recipeImplementation";
import { normaliseEmailVerificationFeature } from "./utils";

import type {
    UserInput,
    Config,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap } from "../../types";
import type { CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailverification";

export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailVerification;
    static RECIPE_ID = "emailverification";
    static EmailVerificationClaim = new EmailVerificationClaimClass(
        () => EmailVerification.getInstanceOrThrow().recipeImpl,
        async (userContext: any) => {
            const recipe = EmailVerification.getInstanceOrThrow();
            if (recipe.config.mode === "REQUIRED") {
                saveInvalidClaimRedirectPathInContext(
                    userContext,
                    await recipe.getRedirectUrl({ action: "VERIFY_EMAIL" })
                );
            }
        }
    );

    recipeImpl: RecipeInterface;

    constructor(config: Config) {
        super(normaliseEmailVerificationFeature(config));

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

        PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                EmailVerification.EmailVerificationClaim.validators.isVerified(10)
            );
        });
    }

    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> {
        return (
            appInfo: NormalisedAppInfo
        ): RecipeModule<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig> => {
            EmailVerification.instance = new EmailVerification({
                ...config,
                appInfo,
                recipeId: EmailVerification.RECIPE_ID,
            });
            return EmailVerification.instance;
        };
    }

    static getInstanceOrThrow(): EmailVerification {
        if (EmailVerification.instance === undefined) {
            let error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";

            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return EmailVerification.instance;
    }

    getFeatures = (
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): RecipeFeatureComponentMap => {
        const features: RecipeFeatureComponentMap = {};
        if (this.config.disableDefaultUI !== true) {
            const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: matchRecipeIdUsingQueryParams(this.config.recipeId),
                component: (props: any) => this.getFeatureComponent("emailverification", props, useComponentOverrides),
            };
        }
        return features;
    };

    getFeatureComponent = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _: "emailverification",
        props: any,
        useComponentOverrides: () => GenericComponentOverrideMap<any> = useRecipeComponentOverrideContext
    ): JSX.Element => {
        return (
            <UserContextWrapper userContext={props.userContext}>
                <SessionAuth requireAuth={false} overrideGlobalClaimValidators={() => []}>
                    {/**
                     * EmailVerificationFeature is a class component that accepts userContext
                     * as a prop. If we pass userContext as a prop directly then Emailverification
                     * will not respond to changes when the userContext in UserContextWrapper
                     * changes. In order to prevent this we use a Consumer that will respond
                     * to changes in UserContextWrapper and update the prop for EmailVerificationFeature
                     *
                     * NOTE: We cannot use static contextType in EmailVerificationFeature to solve
                     * this because EmailVerificationFeature already uses SessionContext as its
                     * context type. Read more here:
                     * https://reactjs.org/docs/context.html#consuming-multiple-contexts
                     */}
                    <UserContextContext.Consumer>
                        {(value) => {
                            return (
                                <EmailVerificationFeature
                                    recipe={this}
                                    useComponentOverrides={useComponentOverrides}
                                    {...{
                                        ...props,
                                        // We do this to make sure it does not add another provider
                                        userContext: value,
                                    }}
                                />
                            );
                        }}
                    </UserContextContext.Consumer>
                </SessionAuth>
            </UserContextWrapper>
        );
    };

    async isEmailVerified(userContext: any): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return await this.recipeImpl.isEmailVerified({
            userContext,
        });
    }

    getDefaultRedirectionURL = async (context: GetRedirectionURLContext): Promise<string> => {
        if (context.action === "VERIFY_EMAIL") {
            const verifyEmailPath = new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH);
            return `${this.config.appInfo.websiteBasePath.appendPath(verifyEmailPath).getAsStringDangerous()}?rid=${
                this.config.recipeId
            }`;
        } else {
            return "/";
        }
    };
}
