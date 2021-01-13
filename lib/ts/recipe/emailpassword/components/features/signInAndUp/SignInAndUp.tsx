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

/** @jsx jsx */
import { jsx } from "@emotion/react";
import { handleSignInAPI, handleSignUpAPI, handleEmailExistsAPICall } from "./api";
import EmailPassword from "../../../emailPassword";
import {
    SignInAndUpState,
    SignInThemeResponse,
    SignUpThemeResponse,
    FormFieldThemeProps,
    FeatureBaseProps
} from "../../../types";
import { SignInAndUpTheme } from "../../..";
import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import { APIFormField, NormalisedFormField } from "../../../../../types";
import FeatureWrapper from "../../../../components/featureWrapper";
import {
    API_RESPONSE_STATUS,
    EMAIL_VERIFICATION_MODE,
    GET_REDIRECTION_URL_ACTION,
    MANDATORY_FORM_FIELDS_ID,
    SIGN_IN_AND_UP_STATUS,
    SUCCESS_ACTION
} from "../../../constants";

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

    signIn = async (formFields: APIFormField[]): Promise<SignInThemeResponse> => {
        // Front end validation.
        const validationErrors = await this.getRecipeInstanceOrThrow().signInValidate(formFields);

        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                formFields: validationErrors
            };
        }

        const normalisedAPIResponse = await handleSignInAPI(
            formFields,
            this.getRecipeInstanceOrThrow().getRecipeId(),
            this.getRecipeInstanceOrThrow().signInAPI
        );

        this.setStateOnSuccessfulAPICall(normalisedAPIResponse);

        return normalisedAPIResponse;
    };

    onSignInSuccess = async (): Promise<void> => {
        if (this.state.status !== SIGN_IN_AND_UP_STATUS.SUCCESSFUL) {
            throw Error(SOMETHING_WENT_WRONG_ERROR);
        }

        this.getRecipeInstanceOrThrow().onHandleEvent({
            action: SUCCESS_ACTION.SIGN_IN_COMPLETE,
            user: this.state.user,
            responseJson: this.state.responseJson
        });

        return await this.getRecipeInstanceOrThrow().redirect({ action: GET_REDIRECTION_URL_ACTION.SUCCESS });
    };

    signUp = async (formFields: APIFormField[]): Promise<SignUpThemeResponse> => {
        // Front end validation.
        const validationErrors = await this.getRecipeInstanceOrThrow().signUpValidate(formFields);

        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                formFields: validationErrors
            };
        }

        const normalisedAPIResponse = await handleSignUpAPI(
            formFields,
            this.getRecipeInstanceOrThrow().getRecipeId(),
            this.getRecipeInstanceOrThrow().signUpAPI
        );

        this.setStateOnSuccessfulAPICall(normalisedAPIResponse);

        return normalisedAPIResponse;
    };

    setStateOnSuccessfulAPICall(normalisedAPIResponse: SignInThemeResponse | SignUpThemeResponse): void {
        this.setState(oldState => {
            if (
                oldState.status !== SIGN_IN_AND_UP_STATUS.READY ||
                normalisedAPIResponse.status !== API_RESPONSE_STATUS.OK
            ) {
                return oldState;
            }

            return {
                status: SIGN_IN_AND_UP_STATUS.SUCCESSFUL,
                responseJson: normalisedAPIResponse,
                user: {
                    id: normalisedAPIResponse.user.id,
                    email: normalisedAPIResponse.user.email
                }
            };
        });
    }

    onSignUpSuccess = async (): Promise<void> => {
        if (this.state.status !== SIGN_IN_AND_UP_STATUS.SUCCESSFUL) {
            throw Error(SOMETHING_WENT_WRONG_ERROR);
        }

        this.getRecipeInstanceOrThrow().onHandleEvent({
            action: SUCCESS_ACTION.SIGN_UP_COMPLETE,
            user: this.state.user,
            responseJson: this.state.responseJson
        });

        // Otherwise, redirect to email verification screen if sign up and email verification mode is required.
        let action = GET_REDIRECTION_URL_ACTION.SUCCESS;
        if (
            this.getRecipeInstanceOrThrow().getConfig().emailVerificationFeature.mode ===
            EMAIL_VERIFICATION_MODE.REQUIRED
        ) {
            action = GET_REDIRECTION_URL_ACTION.VERIFY_EMAIL;
        }

        return await this.getRecipeInstanceOrThrow().redirect({ action });
    };

    onHandleForgotPasswordClicked = async (): Promise<void> => {
        return this.getRecipeInstanceOrThrow().redirect(
            { action: GET_REDIRECTION_URL_ACTION.RESET_PASSWORD },
            false,
            "Reset password",
            this.props.history
        );
    };

    doesEmailExist = async (value: string): Promise<string | undefined> => {
        return await handleEmailExistsAPICall(
            value,
            this.getRecipeInstanceOrThrow().getRecipeId(),
            this.getRecipeInstanceOrThrow().emailExistsAPI
        );
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
                    return await this.doesEmailExist(value);
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
            this.getRecipeInstanceOrThrow().onHandleEvent({ action: SUCCESS_ACTION.SESSION_ALREADY_EXISTS });
            return await this.getRecipeInstanceOrThrow().redirect(
                { action: GET_REDIRECTION_URL_ACTION.SUCCESS },
                false,
                undefined,
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
            callAPI: this.signIn,
            onSuccess: this.onSignInSuccess,
            forgotPasswordClick: this.onHandleForgotPasswordClicked
        };

        const signUpForm = {
            styleFromInit: signUpFeature.style,
            formFields: this.getThemeSignUpFeatureFormFields(signUpFeature.formFields),
            privacyPolicyLink: signUpFeature.privacyPolicyLink,
            termsOfServiceLink: signUpFeature.termsOfServiceLink,
            onSuccess: this.onSignUpSuccess,
            callAPI: this.signUp
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
