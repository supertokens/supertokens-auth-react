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
    VerifyEmailAPIResponse,
    SendVerifyEmailThemeResponse,
    VerifyEmailLinkClickedThemeProps,
    SendVerificationEmailAPIResponse,
    VerifyEmailThemeResponse,
    SendVerifyEmailThemeProps
} from "../../../types";
import EmailPassword from "../../../emailPassword";
import { EmailVerificationScreenTheme, signOut } from "../../..";
import { RequestJson } from "../../../../../types";
import FeatureWrapper from "../../../../components/featureWrapper";

/** @jsx jsx */
import { jsx } from "@emotion/react";
import {
    API_RESPONSE_STATUS,
    DEFAULT_VERIFY_EMAIL_PATH,
    EMAIL_VERIFICATION_MODE,
    SUCCESS_ACTION
} from "../../../constants";
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
            this.onCallVerifyEmailAPI,
            this.state.token
        );
    };

    onEmailVerifiedSuccess = async (): Promise<void> => {
        await this.onHandleSuccess({
            action: SUCCESS_ACTION.EMAIL_VERIFIED_SUCCESSFUL
        });
    };

    sendVerifyEmail = async (): Promise<SendVerifyEmailThemeResponse> => {
        return await handleSendVerifyEmailAPI(
            this.getRecipeInstanceOrThrow().getRecipeId(),
            this.onCallSendVerifyEmailAPI
        );
    };

    onSendVerifyEmailSuccess = async (): Promise<void> => {
        await this.onHandleSuccess({
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

    onSignInClicked = (): void => {
        const onSuccessRedirectURL = this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature
            .onSuccessRedirectURL;
        redirectToInApp(onSuccessRedirectURL, undefined, this.props.history);
    };

    onCallVerifyEmailAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<VerifyEmailAPIResponse> => {
        // If props provided by user.
        if (this.props.onCallVerifyEmailAPI !== undefined) {
            return this.props.onCallVerifyEmailAPI(requestJson, headers);
        }

        // Otherwise, use default.
        return this.getRecipeInstanceOrThrow().verifyEmailAPI(requestJson, headers);
    };

    onCallSendVerifyEmailAPI = async (headers: HeadersInit): Promise<SendVerificationEmailAPIResponse> => {
        // If props provided by user.
        if (this.props.onCallSendVerifyEmailAPI !== undefined) {
            return this.props.onCallSendVerifyEmailAPI(headers);
        }

        // Otherwise, use default.
        return this.getRecipeInstanceOrThrow().sendVerificationEmailAPI(headers);
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
        return;
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
        redirectToInApp(
            `${this.getRecipeInstanceOrThrow()
                .getAppInfo()
                .websiteBasePath.getAsStringDangerous()}${DEFAULT_VERIFY_EMAIL_PATH}?rid=emailpassword`,
            undefined,
            undefined
        ); // No history object provided here, we need to reload the page.
        return;
    };

    onSuccessfulEmailVerificationContinueClicked = async (): Promise<void> => {
        redirectToInApp(
            this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.onSuccessRedirectURL,
            undefined,
            this.props.history
        );
        return;
    };

    async componentDidMount(): Promise<void> {
        const hasToken = this.state.token.length !== 0;

        // Redirect to login if no existing session and no token in URL.
        const hasValidSession = await this.doesSessionExist();
        if (hasValidSession === false && hasToken === false) {
            redirectToInApp(
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
                    redirectToInApp(
                        this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.onSuccessRedirectURL,
                        undefined,
                        this.props.history
                    );
                }
            }
        } catch (e) {}

        return;
    }

    render = (): JSX.Element => {
        // In case Email Verification Mode is not required, redirect to onSuccessRedirectURL.
        if (
            this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature.mode !==
            EMAIL_VERIFICATION_MODE.REQUIRED
        ) {
            redirectToInApp(
                this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.onSuccessRedirectURL,
                undefined,
                this.props.history
            );
        }

        const verifyEmailLinkClickedScreenFeature = this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
            .verifyEmailLinkClickedScreen;

        const sendVerifyEmailScreenFeature = this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature
            .sendVerifyEmailScreen;

        const sendVerifyEmailScreen: SendVerifyEmailThemeProps = {
            styleFromInit: sendVerifyEmailScreenFeature.style,
            callAPI: this.sendVerifyEmail,
            signOut: this.signOut,
            onSuccess: this.onEmailVerifiedSuccess
        };

        const verifyEmailLinkClickedScreen: VerifyEmailLinkClickedThemeProps = {
            styleFromInit: verifyEmailLinkClickedScreenFeature.style,
            redirectToVerifyEmailScreen: this.redirectToVerifyEmailScreen,
            callAPI: this.verifyEmail,
            onSuccess: this.onEmailVerifiedSuccess,
            onContinueClicked: this.onSuccessfulEmailVerificationContinueClicked
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
