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
import { EmailPasswordAuthProps, EmailPasswordAuthState, IsEmailVerifiedAPIResponse } from "../types";
import Session from "../../session/session";
import SuperTokens from "../../../superTokens";
import { redirectToInApp } from "../../../utils";
import EmailPassword from "../emailPassword";
import { DEFAULT_VERIFY_EMAIL_PATH, EMAIL_PASSWORD_AUTH, EMAIL_VERIFICATION_MODE } from "../constants";
import SpinnerIcon from "../assets/spinnerIcon";
import { defaultPalette } from "./themes/default/styles/styles";

/*
 * Component.
 */

class EmailPasswordAuth extends PureComponent<EmailPasswordAuthProps, EmailPasswordAuthState> {
    /*
     * Constructor.
     */
    constructor(props: EmailPasswordAuthProps) {
        super(props);
        this.state = {
            status: EMAIL_PASSWORD_AUTH.LOADING
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

    getSessionRecipe(): Session | undefined {
        return SuperTokens.getDefaultSessionRecipe();
    }

    doesSessionExist = async (): Promise<boolean> => {
        // If props provided by user.
        if (this.props.doesSessionExist !== undefined) {
            return await this.props.doesSessionExist();
        }

        const sessionRecipe = this.getSessionRecipe();
        if (sessionRecipe !== undefined) {
            return sessionRecipe.doesSessionExist();
        }

        // Otherwise, return false.
        return false;
    };

    onCallIsEmailVerifiedAPI = async (headers: HeadersInit): Promise<IsEmailVerifiedAPIResponse> => {
        // If props provided by user.
        if (this.props.onCallIsEmailVerifiedAPI) {
            return await this.props.onCallIsEmailVerifiedAPI(headers);
        }

        // Otherwise, use SuperTokens API.
        return await this.getRecipeInstanceOrThrow().isEmailVerifiedAPI(headers);
    };

    isEmailVerifiedAPI = async (): Promise<boolean> => {
        try {
            const response = await this.onCallIsEmailVerifiedAPI({
                rid: this.getRecipeInstanceOrThrow().getRecipeId()
            });
            return response.isVerified;
        } catch (e) {
            // In case of API failure, continue, do not break the application.
            return false;
        }
    };

    onHandleShowEmailVerificationScreen = async (): Promise<void> => {
        // If props provided by user.
        if (this.props.onHandleShowEmailVerificationScreen) {
            const handled = await this.props.onHandleShowEmailVerificationScreen();

            // And if successfully handled, return.
            if (handled === true) {
                return;
            }
        }

        // Otherwise, redirect to default email verification screen.
        redirectToInApp(
            `${this.getRecipeInstanceOrThrow()
                .getAppInfo()
                .websiteBasePath.getAsStringDangerous()}${DEFAULT_VERIFY_EMAIL_PATH}?rid=emailpassword`,
            undefined,
            this.props.history
        );
        return;
    };

    async componentDidMount(): Promise<void> {
        const hasValidSession = await this.doesSessionExist();
        if (hasValidSession === false) {
            redirectToInApp(
                this.getRecipeInstanceOrThrow()
                    .getAppInfo()
                    .websiteBasePath.getAsStringDangerous(),
                undefined,
                this.props.history
            );
            return;
        }

        // Update status to ready.
        this.setState({
            status: EMAIL_PASSWORD_AUTH.READY
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
            return this.onHandleShowEmailVerificationScreen();
        }
        return;
    }

    /*
     * Render.
     */
    render = (): JSX.Element => {
        const primary = EmailPassword.getInstanceOrThrow().getConfig().palette.primary || defaultPalette.colors.primary;
        if (this.state.status === EMAIL_PASSWORD_AUTH.LOADING) {
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
