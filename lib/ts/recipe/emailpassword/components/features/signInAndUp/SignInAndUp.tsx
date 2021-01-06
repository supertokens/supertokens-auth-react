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
    SignInAndUpProps,
    SignInAndUpState,
    SignInThemeResponse,
    SignUpThemeResponse,
    OnHandleSignInAndUpSuccessContext,
    SignUpAPIResponse,
    SignInAPIResponse,
    EmailExistsAPIResponse,
    FormFieldThemeProps
} from "../../../types";
import { SignInAndUpTheme } from "../../..";
import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import { APIFormField, NormalisedFormField, RequestJson } from "../../../../../types";
import { redirectToInApp, redirectToWithReload } from "../../../../../utils";
import FeatureWrapper from "../../../../components/featureWrapper";
import {
    API_RESPONSE_STATUS,
    MANDATORY_FORM_FIELDS_ID,
    SIGN_IN_AND_UP_STATUS,
    SUCCESS_ACTION
} from "../../../constants";
import SuperTokens from "../../../../../superTokens";
import Session from "../../../../session/session";

/*
 * Component.
 */

class SignInAndUp extends PureComponent<SignInAndUpProps, SignInAndUpState> {
    /*
     * Constructor.
     */
    constructor(props: SignInAndUpProps) {
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

    getSessionRecipe(): Session | undefined {
        return SuperTokens.getDefaultSessionRecipe();
    }

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
            this.onCallSignInAPI
        );

        this.setStateOnSuccessfulAPICall(normalisedAPIResponse);

        return normalisedAPIResponse;
    };

    onSignInSuccess = async (): Promise<void> => {
        if (this.state.status !== SIGN_IN_AND_UP_STATUS.SUCCESSFUL) {
            throw Error(SOMETHING_WENT_WRONG_ERROR);
        }

        await this.onHandleSuccess({
            action: SUCCESS_ACTION.SIGN_IN_COMPLETE,
            user: this.state.user,
            responseJson: this.state.responseJson
        });
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
            this.onCallSignUpAPI
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

        return await this.onHandleSuccess({
            action: SUCCESS_ACTION.SIGN_UP_COMPLETE,
            user: this.state.user,
            responseJson: this.state.responseJson
        });
    };

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

    onHandleForgotPasswordClicked = async (): Promise<void> => {
        // If props provided by user, and successfully handled.
        if (this.props.onHandleForgotPasswordClicked !== undefined) {
            const isHandledByUser: boolean = await this.props.onHandleForgotPasswordClicked();
            if (isHandledByUser) {
                return;
            }
        }

        // Otherwise, redirect to resetPasswordURL, if defined.
        const resetPasswordUrl = this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.signInForm
            .resetPasswordURL;

        if (resetPasswordUrl === undefined) {
            return;
        }
        const rid = this.getRecipeInstanceOrThrow().getRecipeId();
        redirectToInApp(`${resetPasswordUrl.getAsStringDangerous()}?rid=${rid}`, "Reset password", this.props.history);
    };

    onHandleSuccess = async (context: OnHandleSignInAndUpSuccessContext): Promise<void> => {
        // If props provided by user, and successfully handled.
        if (this.props.onHandleSuccess !== undefined) {
            const isHandledByUser = await this.props.onHandleSuccess(context);
            if (isHandledByUser) {
                return;
            }
        }

        // Otherwise, use default, redirect to onSuccessRedirectURL
        const onSuccessRedirectURL = this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature
            .onSuccessRedirectURL;

        redirectToWithReload(onSuccessRedirectURL);
    };

    onCallSignUpAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<SignUpAPIResponse> => {
        // If props provided by user.
        if (this.props.onCallSignUpAPI !== undefined) {
            return this.props.onCallSignUpAPI(requestJson, headers);
        }

        // Otherwise, use default.
        return this.getRecipeInstanceOrThrow().signUpAPI(requestJson, headers);
    };

    onCallSignInAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<SignInAPIResponse> => {
        // If props provided by user.
        if (this.props.onCallSignInAPI !== undefined) {
            return this.props.onCallSignInAPI(requestJson, headers);
        }

        // Otherwise, use default.
        return this.getRecipeInstanceOrThrow().signInAPI(requestJson, headers);
    };

    onCallEmailExistAPI = async (value: string, headers: HeadersInit): Promise<EmailExistsAPIResponse> => {
        // If props provided by user.
        if (this.props.onCallEmailExistsAPI !== undefined) {
            return await this.props.onCallEmailExistsAPI(value, headers);
        }

        // Otherwise, use built in.
        return await this.getRecipeInstanceOrThrow().emailExistsAPI(value, headers);
    };

    doesEmailExist = async (value: string): Promise<string | undefined> => {
        return await handleEmailExistsAPICall(
            value,
            this.getRecipeInstanceOrThrow().getRecipeId(),
            this.onCallEmailExistAPI
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
        const sessionExists = await this.doesSessionExist();
        if (sessionExists) {
            return await this.onHandleSuccess({ action: SUCCESS_ACTION.SESSION_ALREADY_EXISTS });
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
