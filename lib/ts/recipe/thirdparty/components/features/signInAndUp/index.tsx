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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import { PureComponent, Fragment } from "react";
import { SignInAndUpTheme } from "../../..";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import SuperTokens from "../../../../../superTokens";
import { FeatureBaseProps } from "../../../../../types";
import {
    getQueryParams,
    getRedirectToPathFromURL,
    appendQueryParamsToURL,
    getWindowOrThrow,
} from "../../../../../utils";
import AuthRecipeModule from "../../../../authRecipeModule";
import { getStyles } from "../../../components/themes/styles";
import { SESSION_STORAGE_STATE_KEY } from "../../../constants";
import Provider from "../../../providers";
import {
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAPIHookContext,
    ThirdPartySignInAndUpState,
    RecipeInterface,
} from "../../../types";

type PropType = FeatureBaseProps & { recipeImplementation: RecipeInterface };
class SignInAndUp extends PureComponent<PropType, ThirdPartySignInAndUpState> {
    constructor(props: PropType) {
        super(props);

        const error = getQueryParams("error");
        if (error !== null) {
            if (error === "signin") {
                this.state = {
                    status: "GENERAL_ERROR",
                };
            } else if (error === "no_email_present") {
                this.state = {
                    status: "CUSTOM_ERROR",
                    error: "Could not retrieve email. Please try a different method.",
                };
            } else {
                const customError = getQueryParams("message");
                if (customError === null) {
                    this.state = {
                        status: "GENERAL_ERROR",
                    };
                } else {
                    this.state = {
                        status: "CUSTOM_ERROR",
                        error: customError,
                    };
                }
            }
        } else {
            this.state = {
                status: "LOADING",
            };
        }
    }

    getRecipeInstanceOrThrow = (): AuthRecipeModule<
        GetRedirectionURLContext,
        PreAPIHookContext,
        OnHandleEventContext,
        NormalisedConfig
    > => {
        if (this.props.recipeId === undefined) {
            throw new Error("No recipeId props given to SignInAndUp component");
        }

        const recipe = SuperTokens.getInstanceOrThrow().getRecipeOrThrow(this.props.recipeId);
        if (!(recipe instanceof AuthRecipeModule)) {
            throw new Error(
                `${recipe.config.recipeId} must be an instance of AuthRecipeModule to use SignInAndUp component.`
            );
        }

        return recipe;
    };

    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    /*
     * Methods.
     */

    componentDidMount = async (): Promise<void> => {
        const sessionExists = await this.getRecipeInstanceOrThrow().doesSessionExist();
        if (sessionExists) {
            this.getRecipeInstanceOrThrow().config.onHandleEvent({
                action: "SESSION_ALREADY_EXISTS",
            });
            await this.getRecipeInstanceOrThrow().redirect({ action: "SUCCESS", isNewUser: false }, this.props.history);
            return;
        }

        this.setState((oldState) => {
            if (oldState.status !== "LOADING") {
                return oldState;
            }

            return {
                ...oldState,
                status: "READY",
            };
        });
    };

    signInAndUpClick = async (providerId: string): Promise<string | void> => {
        const provider = this.getRecipeInstanceOrThrow().config.signInAndUpFeature.providers.find(
            (p) => p.id === providerId
        ) as Provider;
        if (provider === undefined) {
            return "Unknown Provider";
        }

        // 1. Generate state.
        const state = provider.generateState();

        // 2. Get Authorisation URL.
        const url = await this.props.recipeImplementation.getOAuthAuthorisationURL(provider.id);

        // 3. Store state in Session Storage.
        const redirectToPath = getRedirectToPathFromURL();
        const redirect_uri = await this.getRecipeInstanceOrThrow().getRedirectUrl({
            action: "GET_REDIRECT_URL",
            provider,
        });
        const urlWithState = appendQueryParamsToURL(url, {
            state,
            redirect_uri,
        });
        const expiresAt = Date.now() + 1000 * 60 * 10; // 10 minutes expiry.
        const value = JSON.stringify({
            redirectToPath,
            state,
            thirdPartyId: provider.id,
            rid: this.getRecipeInstanceOrThrow().config.recipeId,
            expiresAt,
        });
        getWindowOrThrow().sessionStorage.setItem(SESSION_STORAGE_STATE_KEY, value);

        // 4. Redirect to provider authorisation URL.
        getWindowOrThrow().location.href = urlWithState;
    };

    render = (): JSX.Element => {
        // Before session is verified, return empty fragment, prevent UI glitch.
        if (this.state.status === "LOADING") {
            return <Fragment />;
        }

        const signInAndUpFeature = this.getRecipeInstanceOrThrow().config.signInAndUpFeature;

        const providers = signInAndUpFeature.providers.map((provider) => ({
            id: provider.id,
            buttonComponent: provider.getButton(),
        }));

        /*
         * Render.
         */
        return (
            <FeatureWrapper
                useShadowDom={this.getRecipeInstanceOrThrow().config.useShadowDom}
                isEmbedded={this.getIsEmbedded()}>
                <StyleProvider
                    rawPalette={this.getRecipeInstanceOrThrow().config.palette}
                    defaultPalette={defaultPalette}
                    styleFromInit={signInAndUpFeature.style}
                    getDefaultStyles={getStyles}>
                    <Fragment>
                        {/* No custom theme, use default. */}
                        {this.props.children === undefined &&
                            (this.state.status === "CUSTOM_ERROR" ? (
                                <SignInAndUpTheme
                                    status={this.state.status}
                                    error={this.state.error}
                                    providers={providers}
                                    signInAndUpClick={this.signInAndUpClick}
                                    privacyPolicyLink={signInAndUpFeature.privacyPolicyLink}
                                    termsOfServiceLink={signInAndUpFeature.termsOfServiceLink}
                                />
                            ) : (
                                <SignInAndUpTheme
                                    status={this.state.status}
                                    providers={providers}
                                    signInAndUpClick={this.signInAndUpClick}
                                    privacyPolicyLink={signInAndUpFeature.privacyPolicyLink}
                                    termsOfServiceLink={signInAndUpFeature.termsOfServiceLink}
                                />
                            ))}

                        {/* Otherwise, custom theme is provided, propagate props. */}
                        {this.props.children &&
                            React.cloneElement(this.props.children, {
                                status: this.state.status,
                                error: this.state.status === "CUSTOM_ERROR" ? this.state.error : undefined,
                                rawPalette: this.getRecipeInstanceOrThrow().config.palette,
                                termsOfServiceLink: signInAndUpFeature.termsOfServiceLink,
                                privacyPolicyLink: signInAndUpFeature.privacyPolicyLink,
                                signInAndUpClick: this.signInAndUpClick,
                                providers: providers,
                            })}
                    </Fragment>
                </StyleProvider>
            </FeatureWrapper>
        );
    };
}

export default SignInAndUp;
