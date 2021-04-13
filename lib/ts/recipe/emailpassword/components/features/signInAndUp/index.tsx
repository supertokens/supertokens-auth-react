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
import {
    FormFieldThemeProps,
    FormBaseAPIResponse,
    EmailPasswordGetRedirectionURLContext,
    EmailPasswordPreAPIHookContext,
    EmailPasswordOnHandleEventContext,
    NormalisedEmailPasswordConfig,
} from "../../../types";
import { SignInAndUpTheme } from "../../..";
import { APIFormField, FeatureBaseProps, NormalisedFormField } from "../../../../../types";
import { getRedirectToPathFromURL, validateForm } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { NormalisedAuthRecipeConfig, SignInAndUpState } from "../../../../authRecipeModule/types";
import AuthRecipeModule from "../../../../authRecipeModule";
import SuperTokens from "../../../../../superTokens";
import RecipeModule from "../../../../recipeModule";
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
            status: "LOADING",
        };
    }

    getRecipeInstanceOrThrow = (): AuthRecipeModule<
        EmailPasswordGetRedirectionURLContext,
        EmailPasswordPreAPIHookContext,
        EmailPasswordOnHandleEventContext,
        NormalisedEmailPasswordConfig
    > => {
        if (this.props.recipeId === undefined) {
            throw new Error("No recipeId props given to SignInAndUp component");
        }

        const recipe = SuperTokens.getInstanceOrThrow().getRecipeOrThrow(this.props.recipeId);
        if (recipe instanceof AuthRecipeModule === false) {
            throw new Error(`${recipe.recipeId} must be an instance of AuthRecipeModule to use SignInAndUp component.`);
        }

        return recipe as AuthRecipeModule<
            EmailPasswordGetRedirectionURLContext,
            EmailPasswordPreAPIHookContext,
            EmailPasswordOnHandleEventContext,
            NormalisedEmailPasswordConfig
        >;
    };

    getRecipeConfigOrThrow = (): NormalisedEmailPasswordConfig & NormalisedAuthRecipeConfig => {
        return this.getRecipeInstanceOrThrow().getConfig<NormalisedEmailPasswordConfig & NormalisedAuthRecipeConfig>();
    };

    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    /*
     * Methods.
     */

    signIn = async (formFields: APIFormField[]): Promise<FormBaseAPIResponse> => {
        // Front end validation.
        const validationErrors = await validateForm(
            formFields,
            this.getRecipeConfigOrThrow().signInAndUpFeature.signInForm.formFields
        );
        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: "FIELD_ERROR",
                formFields: validationErrors,
            };
        }

        const normalisedAPIResponse = await signInAPI(
            formFields,
            this.getRecipeInstanceOrThrow() as RecipeModule<unknown, unknown, unknown>
        );

        this.setStateOnSuccessfulAPICall(normalisedAPIResponse);

        return normalisedAPIResponse;
    };

    onSignInSuccess = async (): Promise<void> => {
        if (this.state.status !== "SUCCESSFUL") {
            return;
        }

        this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
            action: "SUCCESS",
            isNewUser: false,
            user: this.state.user,
        });

        return await this.getRecipeInstanceOrThrow().redirect(
            {
                action: "SUCCESS",
                isNewUser: false,
                redirectToPath: getRedirectToPathFromURL(),
            },
            this.props.history
        );
    };

    signUp = async (formFields: APIFormField[]): Promise<FormBaseAPIResponse> => {
        // Front end validation.
        const validationErrors = await validateForm(
            formFields,
            this.getRecipeConfigOrThrow().signInAndUpFeature.signUpForm.formFields
        );

        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: "FIELD_ERROR",
                formFields: validationErrors,
            };
        }

        const normalisedAPIResponse = await signUpAPI(
            formFields,
            this.getRecipeInstanceOrThrow() as RecipeModule<unknown, unknown, unknown>
        );

        this.setStateOnSuccessfulAPICall(normalisedAPIResponse);

        return normalisedAPIResponse;
    };

    setStateOnSuccessfulAPICall(normalisedAPIResponse: FormBaseAPIResponse): void {
        this.setState((oldState) => {
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
                    email: normalisedAPIResponse.user.email,
                },
            };
        });
    }

    onSignUpSuccess = async (): Promise<void> => {
        if (this.state.status !== "SUCCESSFUL") {
            return;
        }

        this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
            action: "SUCCESS",
            isNewUser: false,
            user: this.state.user,
        });

        // Redirect to email verification screen if sign up and email verification mode is required.
        let context: EmailPasswordGetRedirectionURLContext = {
            redirectToPath: getRedirectToPathFromURL(),
            isNewUser: true,
            action: "SUCCESS",
        };

        if (this.getRecipeInstanceOrThrow().isEmailVerificationRequired() === true) {
            // Or if sign up and email verification mode is not required, redirect to success screen.
            context = {
                action: "VERIFY_EMAIL",
            };
        }

        return await this.getRecipeInstanceOrThrow().redirect(context, this.props.history);
    };

    getThemeSignUpFeatureFormFields(formFields: NormalisedFormField[]): FormFieldThemeProps[] {
        const emailPasswordOnly = formFields.length === 2;
        return formFields.map((field) => ({
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
                        return await emailExistsAPI(
                            value,
                            this.getRecipeInstanceOrThrow() as RecipeModule<unknown, unknown, unknown>
                        );
                    } catch (e) {
                        // Fail silently.
                        return undefined;
                    }
                };
            })(),
        }));
    }

    /*
     * Init.
     */
    componentDidMount = async (): Promise<void> => {
        const sessionExists = await this.getRecipeInstanceOrThrow().doesSessionExist();
        if (sessionExists) {
            this.getRecipeInstanceOrThrow().hooks.onHandleEvent({
                action: "SESSION_ALREADY_EXISTS",
            });
            return await this.getRecipeInstanceOrThrow().redirect(
                { action: "SUCCESS", isNewUser: false },
                this.props.history
            );
        }

        this.setState((oldState) => {
            if (oldState.status !== "LOADING") {
                return oldState;
            }

            return {
                ...oldState,
                status: "READY",
            };
        });
    };

    render = (): JSX.Element => {
        const signInAndUpFeature = this.getRecipeConfigOrThrow().signInAndUpFeature;
        const signUpFeature = signInAndUpFeature.signUpForm;
        const signInFeature = signInAndUpFeature.signInForm;

        const signInForm = {
            styleFromInit: signInFeature.style,
            formFields: signInFeature.formFields,
            signInAPI: this.signIn,
            onSuccess: this.onSignInSuccess,
            forgotPasswordClick: () =>
                this.getRecipeInstanceOrThrow().redirect({ action: "RESET_PASSWORD" }, this.props.history),
        };

        const signUpForm = {
            styleFromInit: signUpFeature.style,
            formFields: this.getThemeSignUpFeatureFormFields(signUpFeature.formFields),
            privacyPolicyLink: signUpFeature.privacyPolicyLink,
            termsOfServiceLink: signUpFeature.termsOfServiceLink,
            onSuccess: this.onSignUpSuccess,
            signUpAPI: this.signUp,
        };

        // Before session is verified, return empty fragment, prevent UI glitch.
        if (this.state.status === "LOADING") {
            return <Fragment />;
        }

        /*
         * Render.
         */
        return (
            <FeatureWrapper useShadowDom={this.getRecipeConfigOrThrow().useShadowDom} isEmbedded={this.getIsEmbedded()}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {this.props.children === undefined && (
                        <SignInAndUpTheme
                            rawPalette={this.getRecipeInstanceOrThrow().config.palette}
                            defaultToSignUp={signInAndUpFeature.defaultToSignUp}
                            signInForm={signInForm}
                            signUpForm={signUpForm}
                        />
                    )}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {this.props.children &&
                        React.cloneElement(this.props.children, {
                            rawPalette: this.getRecipeInstanceOrThrow().config.palette,
                            defaultToSignUp: signInAndUpFeature.defaultToSignUp,
                            signInForm,
                            signUpForm,
                        })}
                </Fragment>
            </FeatureWrapper>
        );
    };
}

export default SignInAndUp;
