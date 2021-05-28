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
import {} from "../../../types";
import SignInAndUpCallbackTheme from "../../themes/signInAndUpCallback";
import { getOAuthState } from "../../../utils";
import Provider from "../../../providers";
import Recipe from "../../../recipe";

type PropType = FeatureBaseProps & { recipe: Recipe };

class SignInAndUpCallback extends PureComponent<PropType, unknown> {
    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    componentDidMount = async (): Promise<void> => {
        const providerId =
            getWindowOrThrow().location.pathname.split("/")[getWindowOrThrow().location.pathname.split("/").length - 1];
        const oauthCallbackError = this.getOAuthCallbackError(providerId);
        if (oauthCallbackError !== undefined) {
            return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                error: oauthCallbackError,
            });
        }
        // If no code params, redirect with error.
        const code = getQueryParams("code");
        if (code === null) {
            return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                error: "no_code",
            });
        }

        try {
            const provider = this.props.recipe.config.signInAndUpFeature.providers.find(
                (p) => p.id === providerId
            ) as Provider;
            if (provider === undefined) {
                throw new Error();
            }
            const redirectUrl = await this.props.recipe.getRedirectUrl({
                action: "GET_REDIRECT_URL",
                provider,
            });
            const response = await this.props.recipe.recipeImpl.signInAndUp({
                thirdPartyId: providerId,
                code,
                redirectURI: redirectUrl,
                config: this.props.recipe.config,
            });
            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                    error: "no_email_present",
                });
            }
            if (response.status === "FIELD_ERROR") {
                return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                    error: "custom",
                    message: response.error,
                });
            }
            if (response.status === "OK") {
                this.props.recipe.config.onHandleEvent({
                    action: "SUCCESS",
                    isNewUser: response.createdNewUser,
                    user: response.user,
                });

                const stateObject = getOAuthState();
                const redirectToPath = stateObject === undefined ? undefined : stateObject.redirectToPath;
                return this.props.recipe.redirect(
                    { action: "SUCCESS", isNewUser: response.createdNewUser, redirectToPath },
                    this.props.history
                );
            }
        } catch (e) {
            return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
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
            <FeatureWrapper useShadowDom={this.props.recipe.config.useShadowDom} isEmbedded={this.getIsEmbedded()}>
                <StyleProvider
                    rawPalette={this.props.recipe.config.palette}
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
