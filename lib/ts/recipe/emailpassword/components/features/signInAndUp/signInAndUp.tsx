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
import { PureComponent, Fragment } from "react";

import { signInAPI, signUpAPI, emailExistsAPI } from "./api";
import EmailPassword from "../../../emailPassword";
import {
    SignInAndUpState,
    FormFieldThemeProps,
    FeatureBaseProps,
    FormBaseAPIResponse,
    EmailPasswordGetRedirectionURLContext
} from "../../../types";
import { SignInAndUpTheme } from "../../..";
import { APIFormField, NormalisedFormField } from "../../../../../types";
import FeatureWrapper from "../../../../components/featureWrapper";
import { getRedirectToPathFromURL, validateForm } from "../../../../../utils";

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
            status: "LOADING"
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
            this.getRecipeInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields
        );
        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: "FIELD_ERROR",
                formFields: validationErrors
            };
        }

        const normalisedAPIResponse = await signInAPI(formFields, this.getRecipeInstanceOrThrow());

        this.setStateOnSuccessfulAPICall(normalisedAPIResponse);

        return normalisedAPIResponse;
    };

    onSignInSuccess = async (): Promise<void> => {
        if (this.state.status !== "SUCCESSFUL") {
            return;
        }

        this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
            action: "SIGN_IN_COMPLETE",
            user: this.state.user
        });

        return await this.getRecipeInstanceOrThrow().redirect(
            {
                action: "SUCCESS",
                redirectToPath: getRedirectToPathFromURL()
            },
            this.props.history
        );
    };

    signUp = async (formFields: APIFormField[]): Promise<FormBaseAPIResponse> => {
        // Front end validation.
        const validationErrors = await validateForm(
            formFields,
            this.getRecipeInstanceOrThrow().config.signInAndUpFeature.signUpForm.formFields
        );

        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: "FIELD_ERROR",
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
                oldState.status !== "READY" ||
                normalisedAPIResponse.status !== "OK" ||
                normalisedAPIResponse.user === undefined
            ) {
                return oldState;
            }

            return {
                status: "SUCCESSFUL",
                user: {
                    id: normalisedAPIResponse.user.id,
                    email: normalisedAPIResponse.user.email
                }
            };
        });
    }

    onSignUpSuccess = async (): Promise<void> => {
        if (this.state.status !== "SUCCESSFUL") {
            return;
        }

        this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
            action: "SIGN_UP_COMPLETE",
            user: this.state.user
        });

        // Redirect to email verification screen if sign up and email verification mode is required.
        let context: EmailPasswordGetRedirectionURLContext = {
            action: "VERIFY_EMAIL"
        };
        if (this.getRecipeInstanceOrThrow().config.emailVerificationFeature.mode !== "REQUIRED") {
            // Or if sign up and email verification mode is not required, redirect to success screen.
            context = {
                redirectToPath: getRedirectToPathFromURL(),
                action: "SUCCESS"
            };
        }

        return await this.getRecipeInstanceOrThrow().redirect(context, this.props.history);
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
                if (field.id !== "email") {
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
            this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
                action: "SESSION_ALREADY_EXISTS"
            });
            return await this.getRecipeInstanceOrThrow().redirect({ action: "SUCCESS" }, this.props.history);
        }

        this.setState(oldState => {
            if (oldState.status !== "LOADING") {
                return oldState;
            }

            return {
                ...oldState,
                status: "READY"
            };
        });
    };

    render = (): JSX.Element => {
        const signInAndUpFeature = this.getRecipeInstanceOrThrow().config.signInAndUpFeature;
        const signUpFeature = signInAndUpFeature.signUpForm;
        const signInFeature = signInAndUpFeature.signInForm;

        const signInForm = {
            styleFromInit: signInFeature.style,
            formFields: signInFeature.formFields,
            resetPasswordURL: signInFeature.resetPasswordURL,
            signInAPI: this.signIn,
            onSuccess: this.onSignInSuccess,
            forgotPasswordClick: () =>
                this.getRecipeInstanceOrThrow().redirect({ action: "RESET_PASSWORD" }, this.props.history)
        };

        const signUpForm = {
            styleFromInit: signUpFeature.style,
            formFields: this.getThemeSignUpFeatureFormFields(signUpFeature.formFields),
            privacyPolicyLink: signUpFeature.privacyPolicyLink,
            termsOfServiceLink: signUpFeature.termsOfServiceLink,
            onSuccess: this.onSignUpSuccess,
            signUpAPI: this.signUp
        };

        const useShadowDom = this.getRecipeInstanceOrThrow().config.useShadowDom;

        // Before session is verified, return empty fragment, prevent UI glitch.
        if (this.state.status === "LOADING") {
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
