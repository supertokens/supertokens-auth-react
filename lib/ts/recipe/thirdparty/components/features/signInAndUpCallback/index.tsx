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
import { Fragment, PureComponent } from "react";

import { FeatureBaseProps } from "../../../../../types";
import { getQueryParams, getWindowOrThrow } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { getStyles } from "../../themes/styles";
import { signInAndUpAPI } from "./api";
import {
    NormalisedThirdPartyConfig,
    ThirdPartyGetRedirectionURLContext,
    ThirdPartyOnHandleEventContext,
    ThirdPartyPreAPIHookContext,
    ThirdPartySignInAndUpState,
} from "../../../types";
import SignInAndUpCallbackTheme from "../../themes/signInAndUpCallback";
import { getOAuthState } from "../../../utils";
import Provider from "../../../providers";
import AuthRecipeModule from "../../../../authRecipeModule";
import { NormalisedAuthRecipeConfig } from "../../../../authRecipeModule/types";
import SuperTokens from "../../../../../superTokens";

/*
 * Component.
 */

class SignInAndUpCallback extends PureComponent<FeatureBaseProps, ThirdPartySignInAndUpState> {
    /*
     * Methods.
     */

    getRecipeInstanceOrThrow = (): AuthRecipeModule<
        ThirdPartyGetRedirectionURLContext,
        ThirdPartyPreAPIHookContext,
        ThirdPartyOnHandleEventContext,
        NormalisedThirdPartyConfig
    > => {
        if (this.props.recipeId === undefined) {
            throw new Error("No recipeId props given to SignInAndUp component");
        }

        const recipe = SuperTokens.getInstanceOrThrow().getRecipeOrThrow(this.props.recipeId);
        if (recipe instanceof AuthRecipeModule === false) {
            throw new Error(`${recipe.recipeId} must be an instance of AuthRecipeModule to use SignInAndUp component.`);
        }

        return recipe as AuthRecipeModule<
            ThirdPartyGetRedirectionURLContext,
            ThirdPartyPreAPIHookContext,
            ThirdPartyOnHandleEventContext,
            NormalisedThirdPartyConfig
        >;
    };

    getRecipeConfigOrThrow = (): NormalisedThirdPartyConfig & NormalisedAuthRecipeConfig => {
        return this.getRecipeInstanceOrThrow().getConfig<NormalisedThirdPartyConfig & NormalisedAuthRecipeConfig>();
    };

    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    componentDidMount = async (): Promise<void> => {
        const providerId = getWindowOrThrow().location.pathname.split("/")[
            getWindowOrThrow().location.pathname.split("/").length - 1
        ];
        const oauthCallbackError = this.getOAuthCallbackError(providerId);
        if (oauthCallbackError !== undefined) {
            return this.getRecipeInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history, {
                error: oauthCallbackError,
            });
        }
        // If no code params, redirect with error.
        const code = getQueryParams("code");
        if (code === null) {
            return this.getRecipeInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history, {
                error: "no_code",
            });
        }

        try {
            const provider = this.getRecipeConfigOrThrow().signInAndUpFeature.providers.find(
                (p) => p.id === providerId
            ) as Provider;
            if (provider === undefined) {
                throw new Error();
            }
            const redirectUrl = await this.getRecipeInstanceOrThrow().getRedirectUrl({
                action: "GET_REDIRECT_URL",
                provider,
            });
            const response = await signInAndUpAPI(providerId, code, this.getRecipeInstanceOrThrow(), redirectUrl);
            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                return this.getRecipeInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history, {
                    error: "no_email_present",
                });
            }
            if (response.status === "OK") {
                this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
                    user: response.user,
                });
                return this.getRecipeInstanceOrThrow().redirect(
                    { action: "SUCCESS", isNewUser: response.createdNewUser },
                    this.props.history
                );
            }
        } catch (e) {
            return this.getRecipeInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history, {
                error: "signin",
            });
        }
    };

    getOAuthCallbackError = (providerIdFromPath: string): string | undefined => {
        // 1. error params is present.
        const error = getQueryParams("error");
        if (error !== null) {
            return error;
        }

        // 2. No state params.
        const state = getQueryParams("state");
        if (state === null) {
            return "no_query_state";
        }

        const stateObject = getOAuthState();
        if (stateObject === undefined) {
            return "error_reading_local_state";
        }

        // 4. State nonce mismatch.
        if (stateObject.state !== state) {
            return "state_mismatch";
        }

        // 5. State expired.
        if (Date.now() > stateObject.expiresAt) {
            return "state_expired";
        }

        // 6. Third party provider mismatch between route and state object.
        if (stateObject.thirdPartyId !== providerIdFromPath) {
            return "provider_mismatch";
        }

        return undefined;
    };

    render = (): JSX.Element => {
        /*
         * Render.
         */
        return (
            <FeatureWrapper useShadowDom={this.getRecipeConfigOrThrow().useShadowDom} isEmbedded={this.getIsEmbedded()}>
                <StyleProvider
                    rawPalette={this.getRecipeConfigOrThrow().palette}
                    defaultPalette={defaultPalette}
                    getDefaultStyles={getStyles}>
                    <Fragment>
                        {/* No custom theme, use default. */}
                        {this.props.children === undefined && <SignInAndUpCallbackTheme />}

                        {/* Otherwise, custom theme is provided, propagate props. */}
                        {this.props.children}
                    </Fragment>
                </StyleProvider>
            </FeatureWrapper>
        );
    };
}

export default SignInAndUpCallback;
