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
import { Fragment, PureComponent } from "react";

import ThirdParty from "../../../thirdparty";
import { FeatureBaseProps } from "../../../../../types";
import { getQueryParams, getWindowOrThrow } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { getStyles } from "../../themes/styles";
import { signInAndUpAPI } from "./api";
import { ThirdPartySignInAndUpState } from "../../../types";
import SignInAndUpCallbackTheme from "../../themes/signInAndUpCallback";
import { getOAuthState } from "../../../utils";

/*
 * Component.
 */

class SignInAndUpCallback extends PureComponent<FeatureBaseProps, ThirdPartySignInAndUpState> {
    /*
     * Methods.
     */

    componentDidMount = async (): Promise<void> => {
        const providerId = getWindowOrThrow().location.pathname.split("/")[
            getWindowOrThrow().location.pathname.split("/").length - 1
        ];
        const oauthCallbackError = this.getOAuthCallbackError(providerId);
        if (oauthCallbackError !== undefined) {
            return ThirdParty.getInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history, {
                error: oauthCallbackError
            });
        }
        // If no code params, redirect with error.
        const code = getQueryParams("code");
        if (code === null) {
            return ThirdParty.getInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history, {
                error: "no_code"
            });
        }

        try {
            const response = await signInAndUpAPI(providerId, code, ThirdParty.getInstanceOrThrow());
            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                return ThirdParty.getInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history, {
                    error: "no_email_present"
                });
            }
            if (response.status === "OK") {
                ThirdParty.getInstanceOrThrow().hooks.onHandleEvent({ action: "SIGN_IN" });
                return ThirdParty.getInstanceOrThrow().redirect({ action: "SUCCESS" }, this.props.history);
            }
        } catch (e) {
            return ThirdParty.getInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history, {
                error: "signin"
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
        const useShadowDom = ThirdParty.getInstanceOrThrow().config.useShadowDom;

        /*
         * Render.
         */
        return (
            <FeatureWrapper useShadowDom={useShadowDom}>
                <StyleProvider
                    rawPalette={ThirdParty.getInstanceOrThrow().config.palette}
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
