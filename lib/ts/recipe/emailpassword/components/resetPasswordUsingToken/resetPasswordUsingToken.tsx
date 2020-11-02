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
import { Component, Fragment } from "react";
import {
    EnterEmailThemeResponse,
    NormalisedDefaultStyles,
    NormalisedPalette,
    SubmitNewPasswordThemeProps,
    ResetPasswordUsingTokenProps,
    onHandleResetPasswordUsingTokenSuccessContext,
    SubmitNewPasswordThemeResponse,
    EmailPasswordFeature
} from "../../types";
import EmailPassword from "../../emailPassword";
import { ResetPasswordUsingTokenTheme } from "../..";
import { APIFormField, RequestJson } from "../../../../types";
import FeatureWrapper from "../../../components/featureWrapper";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import { getDefaultStyles } from "../../styles/styles";
import { API_RESPONSE_STATUS, SUCCESS_ACTION } from "../../constants";
import { redirectToInApp } from "../../../../utils";

/*
 * Component.
 */

class ResetPasswordUsingToken extends Component<ResetPasswordUsingTokenProps, { token: string }> {
    /*
     * Constructor.
     */
    constructor(props: ResetPasswordUsingTokenProps) {
        super(props);

        const urlParams = new URLSearchParams(window.location.search);
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
    getRecipeInstanceOrThrow = (): EmailPasswordFeature => {
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
                fields: validationErrors
            };
        }

        // Verify that both passwords match.
        if (formFields[0].value !== formFields[1].value) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                fields: [
                    {
                        id: "confirm-password",
                        error: "Confirmation password doesn't match"
                    }
                ]
            };
        }

        // Call API, only send first password.
        return await this.submitNewPasswordAPI([formFields[0]]);
    };

    submitNewPasswordAPI = async (formFields: APIFormField[]): Promise<SubmitNewPasswordThemeResponse> => {
        try {
            const headers: HeadersInit = {
                rid: this.getRecipeInstanceOrThrow().getRecipeId()
            };
            const responseJson = await this.onCallSubmitNewPasswordAPI(
                {
                    formFields,
                    token: this.state.token
                },
                headers
            );

            // Otherwise, if field errors.
            if (responseJson.status === API_RESPONSE_STATUS.FIELD_ERROR) {
                return {
                    status: API_RESPONSE_STATUS.FIELD_ERROR,
                    fields: responseJson.fields
                };
            }

            // Otherwise, if wrong credentials error.
            if (responseJson.status === API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR) {
                return {
                    status: API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR
                };
            }

            // Otherwise, status === OK
            return {
                status: API_RESPONSE_STATUS.OK
            };
        } catch (e) {
            return {
                status: API_RESPONSE_STATUS.OK
                // message: "Something went wrong. Please try again"
            };
        }
    };

    onSubmitNewPasswordFormSuccess = async (): Promise<void> => {
        await this.onHandleSuccess({
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
                fields: validationErrors
            };
        }

        return await this.enterEmailAPI(formFields);
    };

    enterEmailAPI = async (formFields: APIFormField[]): Promise<EnterEmailThemeResponse> => {
        try {
            const headers: HeadersInit = {
                rid: this.getRecipeInstanceOrThrow().getRecipeId()
            };
            const responseJson = await this.onCallEnterEmailAPI({ formFields }, headers);

            // Otherwise, if field errors.
            if (responseJson.status === API_RESPONSE_STATUS.FIELD_ERROR) {
                return {
                    status: API_RESPONSE_STATUS.FIELD_ERROR,
                    fields: responseJson.fields
                };
            }

            // Otherwise, if success.
            if (responseJson.status === API_RESPONSE_STATUS.OK) {
                return {
                    status: API_RESPONSE_STATUS.OK
                };
            }

            // Otherwise, something went wrong.
            return {
                status: API_RESPONSE_STATUS.GENERAL_ERROR,
                message: "Something went wrong. Please try again"
            };
        } catch (e) {
            return {
                status: API_RESPONSE_STATUS.GENERAL_ERROR,
                message: "Something went wrong. Please try again"
            };
        }
    };

    onEnterEmailFormSuccess = async (): Promise<void> => {
        await this.onHandleSuccess({
            action: SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT
        });
    };

    onHandleSuccess = async (context: onHandleResetPasswordUsingTokenSuccessContext): Promise<void> => {
        // If props provided by user, and successfully handled.
        if (this.props.onHandleSuccess) {
            await this.props.onHandleSuccess(context);
        }

        // Otherwise, do nothing.
    };

    onSignInClicked = (): void => {
        // Otherwise, use default, redirect to onSuccessRedirectURL
        const onSuccessRedirectURL = this.getRecipeInstanceOrThrow().getConfig().resetPasswordUsingTokenFeature
            .onSuccessRedirectURL;
        redirectToInApp(onSuccessRedirectURL, "Sign In", this.props.history);
    };

    onCallEnterEmailAPI = (requestJson: RequestJson, headers: HeadersInit): Promise<any> => {
        // If props provided by user.
        if (this.props.onCallEnterEmailAPI) {
            return this.props.onCallEnterEmailAPI(requestJson, headers);
        }

        // Otherwise, use default.
        return this.getRecipeInstanceOrThrow().enterEmailAPI(requestJson, headers);
    };

    onCallSubmitNewPasswordAPI = (requestJson: RequestJson, headers: HeadersInit): Promise<any> => {
        // If props provided by user.
        if (this.props.onCallSubmitNewPasswordAPI) {
            return this.props.onCallSubmitNewPasswordAPI(requestJson, headers);
        }

        // Otherwise, use default.
        return this.getRecipeInstanceOrThrow().submitNewPasswordAPI(requestJson, headers);
    };

    render = (): JSX.Element => {
        const enterEmailFormFeature = this.getRecipeInstanceOrThrow().getConfig().resetPasswordUsingTokenFeature
            .enterEmailForm;

        const submitNewPasswordFormFeature = this.getRecipeInstanceOrThrow().getConfig().resetPasswordUsingTokenFeature
            .submitNewPasswordForm;

        const defaultStyles: NormalisedDefaultStyles = getDefaultStyles(
            this.getRecipeInstanceOrThrow().getConfig().palette
        );
        const palette: NormalisedPalette = this.getRecipeInstanceOrThrow().getConfig().palette;

        const submitNewPasswordForm: SubmitNewPasswordThemeProps = {
            styleFromInit: submitNewPasswordFormFeature.style,
            formFields: submitNewPasswordFormFeature.formFields,
            callAPI: this.submitNewPassword,
            onSuccess: this.onSubmitNewPasswordFormSuccess,
            defaultStyles,
            palette,
            onSignInClicked: this.onSignInClicked
        };

        const enterEmailForm = {
            styleFromInit: enterEmailFormFeature.style,
            formFields: enterEmailFormFeature.formFields,
            onSuccess: this.onEnterEmailFormSuccess,
            callAPI: this.enterEmail,
            defaultStyles,
            palette
        };

        const hasToken = this.state.token.length !== 0;

        /*
         * Render.
         */
        return (
            <FeatureWrapper defaultStyles={defaultStyles}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {this.props.children === undefined && (
                        <ResetPasswordUsingTokenTheme
                            submitNewPassword={submitNewPasswordForm}
                            enterEmail={enterEmailForm}
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
