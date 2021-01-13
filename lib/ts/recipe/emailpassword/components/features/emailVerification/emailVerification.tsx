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
import {
    EmailVerificationProps,
    onHandleEmailVerificationSuccessContext,
    SendVerifyEmailThemeResponse,
    VerifyEmailLinkClickedThemeProps,
    VerifyEmailThemeResponse,
    SendVerifyEmailThemeProps
} from "../../../types";
import EmailPassword from "../../../emailPassword";
import { EmailVerificationScreenTheme, signOut } from "../../..";
import FeatureWrapper from "../../../../components/featureWrapper";

/** @jsx jsx */
import { jsx } from "@emotion/react";
import { API_RESPONSE_STATUS, EMAIL_VERIFICATION_MODE, SUCCESS_ACTION } from "../../../constants";
import { getWindowOrThrow, redirectToInApp } from "../../../../../utils";
import { handleVerifyEmailAPI, handleSendVerifyEmailAPI } from "./api";
import Session from "../../../../session/session";
import SuperTokens from "../../../../../superTokens";

/*
 * Component.
 */

class EmailVerification extends PureComponent<EmailVerificationProps, { token: string }> {
    /*
     * Constructor.
     */
    constructor(props: EmailVerificationProps) {
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

    verifyEmail = async (): Promise<VerifyEmailThemeResponse> => {
        return await handleVerifyEmailAPI(
            this.getRecipeInstanceOrThrow().getRecipeId(),
            this.getRecipeInstanceOrThrow().verifyEmailAPI,
            this.state.token
        );
    };

    onEmailVerifiedSuccess = async (): Promise<void> => {
        return await this.onHandleSuccess({
            action: SUCCESS_ACTION.EMAIL_VERIFIED_SUCCESSFUL
        });
    };

    sendVerifyEmail = async (): Promise<SendVerifyEmailThemeResponse> => {
        return await handleSendVerifyEmailAPI(
            this.getRecipeInstanceOrThrow().getRecipeId(),
            this.getRecipeInstanceOrThrow().sendVerificationEmailAPI
        );
    };

    onSendVerifyEmailSuccess = async (): Promise<void> => {
        return await this.onHandleSuccess({
            action: SUCCESS_ACTION.VERIFY_EMAIL_SENT
        });
    };

    onHandleSuccess = async (context: onHandleEmailVerificationSuccessContext): Promise<void> => {
        // If props provided by user, and successfully handled.
        if (this.props.onHandleSuccess !== undefined) {
            await this.props.onHandleSuccess(context);
        }

        // Otherwise, do nothing.
    };

    signOut = async (): Promise<void> => {
        // If props provided by user.
        if (this.props.signOut !== undefined) {
            await this.props.signOut();
            return;
        }

        // Otherwise, use default.
        try {
            await signOut();
            redirectToInApp(
                this.getRecipeInstanceOrThrow()
                    .getAppInfo()
                    .websiteBasePath.getAsStringDangerous(),
                undefined,
                this.props.history
            );
        } catch (e) {}
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

    redirectToVerifyEmailScreen = async (): Promise<void> => {
        return redirectToInApp(
            `${getWindowOrThrow().location.pathname}?rid=${this.getRecipeInstanceOrThrow().getRecipeId()}`,
            undefined,
            undefined
        ); // No history object, we want to reload the page with current pathname but without the token in the url.
    };

    onSuccessRedirect = async (): Promise<void> => {
        redirectToInApp(
            this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.onSuccessRedirectURL,
            undefined,
            this.props.history
        );
    };

    async componentDidMount(): Promise<void> {
        // In case Email Verification Mode is not required, redirect to onSuccessRedirectURL.
        if (
            this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature.mode !==
            EMAIL_VERIFICATION_MODE.REQUIRED
        ) {
            return redirectToInApp(
                this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.onSuccessRedirectURL,
                undefined,
                this.props.history
            );
        }

        const hasToken = this.state.token.length !== 0;

        // Redirect to login if no existing session and no token in URL.
        const hasValidSession = await this.doesSessionExist();
        if (hasValidSession === false && hasToken === false) {
            return redirectToInApp(
                this.getRecipeInstanceOrThrow()
                    .getAppInfo()
                    .websiteBasePath.getAsStringDangerous(),
                undefined,
                this.props.history
            );
        }

        try {
            if (hasToken === false) {
                const response = await this.sendVerifyEmail();
                if (response.status === API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR) {
                    return this.onSuccessRedirect();
                }
            }
        } catch (e) {}
    }

    render = (): JSX.Element => {
        const verifyEmailLinkClickedScreenFeature = this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
            .verifyEmailLinkClickedScreen;

        const sendVerifyEmailScreenFeature = this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
            .sendVerifyEmailScreen;

        const sendVerifyEmailScreen: SendVerifyEmailThemeProps = {
            styleFromInit: sendVerifyEmailScreenFeature.style,
            callAPI: this.sendVerifyEmail,
            signOut: this.signOut,
            onSuccess: this.onSendVerifyEmailSuccess,
            onEmailAlreadyVerified: this.onSuccessRedirect
        };

        const verifyEmailLinkClickedScreen: VerifyEmailLinkClickedThemeProps = {
            styleFromInit: verifyEmailLinkClickedScreenFeature.style,
            redirectToVerifyEmailScreen: this.redirectToVerifyEmailScreen,
            callAPI: this.verifyEmail,
            onSuccess: this.onEmailVerifiedSuccess,
            onContinueClicked: this.onSuccessRedirect
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
