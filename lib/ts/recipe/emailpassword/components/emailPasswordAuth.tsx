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
import { PureComponent, ReactElement } from "react";

/** @jsx jsx */
import { jsx } from "@emotion/react";
import { FeatureBaseProps, EmailPasswordAuthState } from "../types";
import EmailPassword from "../emailPassword";
import { EMAIL_PASSWORD_AUTH_STATE, EMAIL_VERIFICATION_MODE, GET_REDIRECTION_URL_ACTION } from "../constants";
import SpinnerIcon from "../assets/spinnerIcon";
import { defaultPalette } from "./themes/default/styles/styles";

/*
 * Component.
 */

class EmailPasswordAuth extends PureComponent<FeatureBaseProps, EmailPasswordAuthState> {
    /*
     * Constructor.
     */
    constructor(props: FeatureBaseProps) {
        super(props);
        this.state = {
            status: EMAIL_PASSWORD_AUTH_STATE.LOADING
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

    isEmailVerifiedAPI = async (): Promise<boolean> => {
        try {
            const response = await this.getRecipeInstanceOrThrow().isEmailVerifiedAPI({
                rid: this.getRecipeInstanceOrThrow().getRecipeId()
            });
            return response.isVerified;
        } catch (e) {
            // In case of API failure, continue, do not break the application.
            return true;
        }
    };

    async componentDidMount(): Promise<void> {
        const sessionExists = this.getRecipeInstanceOrThrow().doesSessionExist();
        if (sessionExists === false) {
            return this.getRecipeInstanceOrThrow().redirect(
                { action: GET_REDIRECTION_URL_ACTION.SIGN_IN_AND_UP },
                false,
                undefined,
                this.props.history
            );
        }

        // Update status to ready.
        this.setState({
            status: EMAIL_PASSWORD_AUTH_STATE.READY
        });

        // If email verification mode is off or optional, return.
        if (
            this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature.mode !==
            EMAIL_VERIFICATION_MODE.REQUIRED
        ) {
            return;
        }

        // Otherwise, make sure that the email is valid, otherwise, redirect to email validation screen.
        const isEmailVerified = await this.isEmailVerifiedAPI();
        if (isEmailVerified === false) {
            return this.getRecipeInstanceOrThrow().redirect(
                { action: GET_REDIRECTION_URL_ACTION.VERIFY_EMAIL },
                false,
                undefined,
                this.props.history
            );
        }
        return;
    }

    /*
     * Render.
     */
    render = (): JSX.Element => {
        const primary = EmailPassword.getInstanceOrThrow().getConfig().palette.primary || defaultPalette.colors.primary;
        if (this.state.status === EMAIL_PASSWORD_AUTH_STATE.LOADING) {
            return (
                <div
                    style={{
                        left: "50%",
                        position: "absolute",
                        top: "50%",
                        width: "100px",
                        height: "auto",
                        transform: "translateX(-50%) translateY(-50%)"
                    }}>
                    <SpinnerIcon color={primary} />
                </div>
            );
        }

        return this.props.children as ReactElement<any>;
    };
}

export default EmailPasswordAuth;
