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
    EnterEmailThemeResponse,
    FeatureBaseProps,
    SubmitNewPasswordThemeProps,
    SubmitNewPasswordThemeResponse
} from "../../../types";
import EmailPassword from "../../../emailPassword";
import { ResetPasswordUsingTokenTheme } from "../../..";
import { APIFormField } from "../../../../../types";
import FeatureWrapper from "../../../../components/featureWrapper";

/** @jsx jsx */
import { jsx } from "@emotion/react";
import { API_RESPONSE_STATUS, GET_REDIRECTION_URL_ACTION, SUCCESS_ACTION } from "../../../constants";
import { getWindowOrThrow } from "../../../../../utils";
import { handleEnterEmailAPI, handleSubmitNewPasswordAPI } from "./api";

/*
 * Component.
 */

class ResetPasswordUsingToken extends PureComponent<FeatureBaseProps, { token: string }> {
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

    submitNewPassword = async (formFields: APIFormField[]): Promise<SubmitNewPasswordThemeResponse> => {
        // Front end validation.
        const validationErrors = await this.getRecipeInstanceOrThrow().submitNewPasswordValidate(formFields);

        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                formFields: validationErrors
            };
        }

        // Verify that both passwords match.
        if (formFields[0].value !== formFields[1].value) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                formFields: [
                    {
                        id: "confirm-password",
                        error: "Confirmation password doesn't match"
                    }
                ]
            };
        }

        // Call API, only send first password.
        return await handleSubmitNewPasswordAPI(
            [formFields[0]],
            this.getRecipeInstanceOrThrow().getRecipeId(),
            this.getRecipeInstanceOrThrow().submitNewPasswordAPI,
            this.state.token
        );
    };

    onSubmitNewPasswordFormSuccess = async (): Promise<void> => {
        await this.getRecipeInstanceOrThrow().onHandleEvent({
            action: SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL
        });
    };

    enterEmail = async (formFields: APIFormField[]): Promise<EnterEmailThemeResponse> => {
        // Front end validation.
        const validationErrors = await this.getRecipeInstanceOrThrow().enterEmailValidate(formFields);

        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                formFields: validationErrors
            };
        }

        return await handleEnterEmailAPI(
            formFields,
            this.getRecipeInstanceOrThrow().getRecipeId(),
            this.getRecipeInstanceOrThrow().enterEmailAPI
        );
    };

    onEnterEmailFormSuccess = async (): Promise<void> => {
        await this.getRecipeInstanceOrThrow().onHandleEvent({
            action: SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT
        });
    };

    onSignInClicked = (): void => {
        this.getRecipeInstanceOrThrow().redirect(
            { action: GET_REDIRECTION_URL_ACTION.SIGN_IN_AND_UP },
            false,
            undefined,
            this.props.history
        );
    };

    render = (): JSX.Element => {
        const enterEmailFormFeature = this.getRecipeInstanceOrThrow().getConfig().resetPasswordUsingTokenFeature
            .enterEmailForm;

        const submitNewPasswordFormFeature = this.getRecipeInstanceOrThrow().getConfig().resetPasswordUsingTokenFeature
            .submitNewPasswordForm;

        const submitNewPasswordForm: SubmitNewPasswordThemeProps = {
            styleFromInit: submitNewPasswordFormFeature.style,
            formFields: submitNewPasswordFormFeature.formFields,
            callAPI: this.submitNewPassword,
            onSuccess: this.onSubmitNewPasswordFormSuccess,
            onSignInClicked: this.onSignInClicked
        };

        const enterEmailForm = {
            styleFromInit: enterEmailFormFeature.style,
            formFields: enterEmailFormFeature.formFields,
            onSuccess: this.onEnterEmailFormSuccess,
            callAPI: this.enterEmail
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
                        <ResetPasswordUsingTokenTheme
                            submitNewPasswordForm={submitNewPasswordForm}
                            enterEmailForm={enterEmailForm}
                            hasToken={hasToken}
                        />
                    )}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {this.props.children &&
                        React.cloneElement(this.props.children, {
                            submitNewPasswordForm,
                            enterEmailForm,
                            hasToken
                        })}
                </Fragment>
            </FeatureWrapper>
        );
    };
}

export default ResetPasswordUsingToken;
