/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
import * as React from "react";
import { PureComponent, Fragment } from "react";
import { VerifyEmailLinkClickedThemeProps, SendVerifyEmailThemeProps, FeatureBaseProps } from "../../../types";
import EmailPassword from "../../../emailPassword";
import { EmailVerificationScreenTheme, signOut } from "../../..";
import FeatureWrapper from "../../../../components/featureWrapper";

/** @jsx jsx */
import { jsx } from "@emotion/react";
import { API_RESPONSE_STATUS, EMAIL_VERIFICATION_MODE, EMAIL_PASSWORD_SUCCESS_ACTION } from "../../../constants";
import { getWindowOrThrow } from "../../../../../utils";
import { verifyEmailAPI, sendVerifyEmailAPI } from "./api";

/*
 * Component.
 */

class EmailVerification extends PureComponent<FeatureBaseProps, { token: string }> {
    /*
     * Constructor.
     */
    constructor(props: FeatureBaseProps) {
        super(props);

        const urlParams = new URLSearchParams(getWindowOrThrow().location.search);
        let token = urlParams.get("token");
        if (token === null) {
            token = "";
        }

        this.state = {
            token
        };
    }

    /*
     * Methods.
     */
    getRecipeInstanceOrThrow = (): EmailPassword => {
        let instance;
        if (this.props.__internal !== undefined && this.props.__internal.instance !== undefined) {
            instance = this.props.__internal.instance;
        } else {
            instance = EmailPassword.getInstanceOrThrow();
        }
        return instance;
    };

    signOut = async (): Promise<void> => {
        try {
            await signOut();
            return await this.getRecipeInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history);
        } catch (e) {}
    };

    onTokenInvalidRedirect = async (): Promise<void> => {
        if (this.getRecipeInstanceOrThrow().doesSessionExist() !== true) {
            return await this.getRecipeInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history);
        }

        try {
            const response = await sendVerifyEmailAPI(this.getRecipeInstanceOrThrow());
            if (response.status === API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR) {
                return await this.getRecipeInstanceOrThrow().redirect({ action: "SUCCESS" }, this.props.history);
            }
        } catch (e) {}

        this.setState(() => ({
            token: ""
        }));
    };

    async componentDidMount(): Promise<void> {
        // In case Email Verification Mode is not required, redirect to success URL.
        if (
            this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature.mode !==
            EMAIL_VERIFICATION_MODE.REQUIRED
        ) {
            return await this.getRecipeInstanceOrThrow().redirect({ action: "SUCCESS" }, this.props.history);
        }

        const hasToken = this.state.token.length !== 0;

        // Redirect to login if no existing session and no token in URL.
        const sessionExists = this.getRecipeInstanceOrThrow().doesSessionExist();
        if (sessionExists === false && hasToken === false) {
            return await this.getRecipeInstanceOrThrow().redirect({ action: "SIGN_IN_AND_UP" }, this.props.history);
        }

        try {
            if (hasToken === false) {
                const response = await sendVerifyEmailAPI(this.getRecipeInstanceOrThrow());
                if (response.status === API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR) {
                    return await this.getRecipeInstanceOrThrow().redirect({ action: "SUCCESS" }, this.props.history);
                }
            }
        } catch (e) {}
    }

    render = (): JSX.Element => {
        const sendVerifyEmailScreenFeature = this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
            .sendVerifyEmailScreen;

        const sendVerifyEmailScreen: SendVerifyEmailThemeProps = {
            styleFromInit: sendVerifyEmailScreenFeature.style,
            sendVerifyEmailAPI: async () => await sendVerifyEmailAPI(this.getRecipeInstanceOrThrow()),
            signOut: this.signOut,
            onSuccess: () =>
                this.getRecipeInstanceOrThrow().onHandleEvent({
                    action: EMAIL_PASSWORD_SUCCESS_ACTION.VERIFY_EMAIL_SENT
                }),
            onEmailAlreadyVerified: () =>
                this.getRecipeInstanceOrThrow().redirect({ action: "SUCCESS" }, this.props.history)
        };

        const verifyEmailLinkClickedScreenFeature = this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
            .verifyEmailLinkClickedScreen;

        const verifyEmailLinkClickedScreen: VerifyEmailLinkClickedThemeProps = {
            styleFromInit: verifyEmailLinkClickedScreenFeature.style,
            onTokenInvalidRedirect: this.onTokenInvalidRedirect,
            onSuccess: () =>
                this.getRecipeInstanceOrThrow().onHandleEvent({
                    action: EMAIL_PASSWORD_SUCCESS_ACTION.EMAIL_VERIFIED_SUCCESSFUL
                }),
            onContinueClicked: () =>
                this.getRecipeInstanceOrThrow().redirect({ action: "SUCCESS" }, this.props.history),
            verifyEmailAPI: async () => await verifyEmailAPI(this.getRecipeInstanceOrThrow(), this.state.token)
        };

        const useShadowDom = this.getRecipeInstanceOrThrow().getConfig().useShadowDom;

        const hasToken = this.state.token.length !== 0;

        /*
         * Render.
         */
        return (
            <FeatureWrapper useShadowDom={useShadowDom}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {this.props.children === undefined && (
                        <EmailVerificationScreenTheme
                            sendVerifyEmailScreen={sendVerifyEmailScreen}
                            verifyEmailLinkClickedScreen={verifyEmailLinkClickedScreen}
                            hasToken={hasToken}
                        />
                    )}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {this.props.children &&
                        React.cloneElement(this.props.children, {
                            sendVerifyEmailScreen,
                            verifyEmailLinkClickedScreen,
                            hasToken
                        })}
                </Fragment>
            </FeatureWrapper>
        );
    };
}

export default EmailVerification;
