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
import * as React from "react";
import { PureComponent, Fragment } from "react";

/** @jsx jsx */
import { jsx } from "@emotion/react";
import { signInAPI, signUpAPI, emailExistsAPI } from "./api";
import EmailPassword from "../../../emailPassword";
import {
    SignInAndUpState,
    FormFieldThemeProps,
    FeatureBaseProps,
    FormBaseAPIResponse,
    EmailPasswordRedirectionUrlAction
} from "../../../types";
import { SignInAndUpTheme } from "../../..";
import { APIFormField, NormalisedFormField } from "../../../../../types";
import FeatureWrapper from "../../../../components/featureWrapper";
import {
    EMAIL_VERIFICATION_MODE,
    FORM_BASE_API_RESPONSE,
    EMAIL_PASSWORD_REDIRECTION_URL_ACTION,
    MANDATORY_FORM_FIELDS_ID,
    SIGN_IN_AND_UP_STATUS,
    EMAIL_PASSWORD_SUCCESS_ACTION
} from "../../../constants";
import { validateForm } from "../../../../../utils";

/*
 * Component.
 */

class SignInAndUp extends PureComponent<FeatureBaseProps, SignInAndUpState> {
    /*
     * Constructor.
     */
    constructor(props: FeatureBaseProps) {
        super(props);

        this.state = {
            status: SIGN_IN_AND_UP_STATUS.LOADING
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

    signIn = async (formFields: APIFormField[]): Promise<FormBaseAPIResponse> => {
        // Front end validation.
        const validationErrors = await validateForm(
            formFields,
            this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.signInForm.formFields
        );
        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: FORM_BASE_API_RESPONSE.FIELD_ERROR,
                formFields: validationErrors
            };
        }

        const normalisedAPIResponse = await signInAPI(formFields, this.getRecipeInstanceOrThrow());

        this.setStateOnSuccessfulAPICall(normalisedAPIResponse);

        return normalisedAPIResponse;
    };

    onSignInSuccess = async (): Promise<void> => {
        if (this.state.status !== SIGN_IN_AND_UP_STATUS.SUCCESSFUL) {
            return;
        }

        this.getRecipeInstanceOrThrow().onHandleEvent({
            action: EMAIL_PASSWORD_SUCCESS_ACTION.SIGN_IN_COMPLETE,
            user: this.state.user
        });

        return await this.getRecipeInstanceOrThrow().redirect(
            {
                action: EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SUCCESS
            },
            this.props.history
        );
    };

    signUp = async (formFields: APIFormField[]): Promise<FormBaseAPIResponse> => {
        // Front end validation.
        const validationErrors = await validateForm(
            formFields,
            this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.signUpForm.formFields
        );

        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: FORM_BASE_API_RESPONSE.FIELD_ERROR,
                formFields: validationErrors
            };
        }

        const normalisedAPIResponse = await signUpAPI(formFields, this.getRecipeInstanceOrThrow());

        this.setStateOnSuccessfulAPICall(normalisedAPIResponse);

        return normalisedAPIResponse;
    };

    setStateOnSuccessfulAPICall(normalisedAPIResponse: FormBaseAPIResponse): void {
        this.setState(oldState => {
            if (
                oldState.status !== SIGN_IN_AND_UP_STATUS.READY ||
                normalisedAPIResponse.status !== FORM_BASE_API_RESPONSE.OK ||
                normalisedAPIResponse.user === undefined
            ) {
                return oldState;
            }

            return {
                status: SIGN_IN_AND_UP_STATUS.SUCCESSFUL,
                user: {
                    id: normalisedAPIResponse.user.id,
                    email: normalisedAPIResponse.user.email
                }
            };
        });
    }

    onSignUpSuccess = async (): Promise<void> => {
        if (this.state.status !== SIGN_IN_AND_UP_STATUS.SUCCESSFUL) {
            return;
        }

        this.getRecipeInstanceOrThrow().onHandleEvent({
            action: EMAIL_PASSWORD_SUCCESS_ACTION.SIGN_UP_COMPLETE,
            user: this.state.user
        });

        // Otherwise, redirect to email verification screen if sign up and email verification mode is required.
        let action: EmailPasswordRedirectionUrlAction = EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SUCCESS;
        if (
            this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature.mode ===
            EMAIL_VERIFICATION_MODE.REQUIRED
        ) {
            action = EMAIL_PASSWORD_REDIRECTION_URL_ACTION.VERIFY_EMAIL;
        }

        return await this.getRecipeInstanceOrThrow().redirect({ action }, this.props.history);
    };

    getThemeSignUpFeatureFormFields(formFields: NormalisedFormField[]): FormFieldThemeProps[] {
        const emailPasswordOnly = formFields.length === 2;
        return formFields.map(field => ({
            ...field,
            showIsRequired: (() => {
                // If email and password only, do not show required indicator (*).
                if (emailPasswordOnly) {
                    return false;
                }
                // Otherwise, show for all non optional fields (including email and password).
                return field.optional === false;
            })(),
            validate: (() => {
                // If field is not email, return field validate unchanged.
                if (field.id !== MANDATORY_FORM_FIELDS_ID.EMAIL) {
                    return field.validate;
                }

                // Otherwise, if email, use syntax validate method and check if email exists.
                return async (value: any): Promise<string | undefined> => {
                    const syntaxError = await field.validate(value);

                    if (syntaxError !== undefined) {
                        return syntaxError;
                    }

                    if (typeof value !== "string") {
                        return "Email must be of type string";
                    }
                    try {
                        return await emailExistsAPI(value, this.getRecipeInstanceOrThrow());
                    } catch (e) {
                        // Fail silently.
                        return undefined;
                    }
                };
            })()
        }));
    }

    /*
     * Init.
     */
    componentDidMount = async (): Promise<void> => {
        const sessionExists = this.getRecipeInstanceOrThrow().doesSessionExist();
        if (sessionExists) {
            this.getRecipeInstanceOrThrow().onHandleEvent({
                action: EMAIL_PASSWORD_SUCCESS_ACTION.SESSION_ALREADY_EXISTS
            });
            return await this.getRecipeInstanceOrThrow().redirect(
                { action: EMAIL_PASSWORD_REDIRECTION_URL_ACTION.SUCCESS },
                this.props.history
            );
        }

        this.setState(oldState => {
            if (oldState.status !== SIGN_IN_AND_UP_STATUS.LOADING) {
                return oldState;
            }

            return {
                ...oldState,
                status: SIGN_IN_AND_UP_STATUS.READY
            };
        });
    };

    render = (): JSX.Element => {
        const signInAndUpFeature = this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature;
        const signUpFeature = signInAndUpFeature.signUpForm;
        const signInFeature = signInAndUpFeature.signInForm;

        const signInForm = {
            styleFromInit: signInFeature.style,
            formFields: signInFeature.formFields,
            resetPasswordURL: signInFeature.resetPasswordURL,
            signInAPI: this.signIn,
            onSuccess: this.onSignInSuccess,
            forgotPasswordClick: () =>
                this.getRecipeInstanceOrThrow().redirect(
                    { action: EMAIL_PASSWORD_REDIRECTION_URL_ACTION.RESET_PASSWORD },
                    this.props.history
                )
        };

        const signUpForm = {
            styleFromInit: signUpFeature.style,
            formFields: this.getThemeSignUpFeatureFormFields(signUpFeature.formFields),
            privacyPolicyLink: signUpFeature.privacyPolicyLink,
            termsOfServiceLink: signUpFeature.termsOfServiceLink,
            onSuccess: this.onSignUpSuccess,
            signUpAPI: this.signUp
        };

        const useShadowDom = this.getRecipeInstanceOrThrow().getConfig().useShadowDom;

        // Before session is verified, return empty fragment, prevent UI glitch.
        if (this.state.status === SIGN_IN_AND_UP_STATUS.LOADING) {
            return <Fragment />;
        }

        /*
         * Render.
         */
        return (
            <FeatureWrapper useShadowDom={useShadowDom}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {this.props.children === undefined && (
                        <SignInAndUpTheme
                            defaultToSignUp={signInAndUpFeature.defaultToSignUp}
                            signInForm={signInForm}
                            signUpForm={signUpForm}
                        />
                    )}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {this.props.children &&
                        React.cloneElement(this.props.children, {
                            defaultToSignUp: signInAndUpFeature.defaultToSignUp,
                            signInForm,
                            signUpForm
                        })}
                </Fragment>
            </FeatureWrapper>
        );
    };
}

export default SignInAndUp;
