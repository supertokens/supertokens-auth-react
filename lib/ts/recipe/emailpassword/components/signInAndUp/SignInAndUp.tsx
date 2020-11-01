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
import { Component } from "react";
import {
    SignInThemeResponse,
    SignInAndUpProps,
    User,
    SignUpThemeResponse,
    NormalisedDefaultStyles,
    NormalisedPalette,
    onHandleSignInAndUpSuccessContext
} from "../../types";
import EmailPassword from "../../emailPassword";
import { SignInAndUpTheme } from "../..";
import { APIFormField, RequestJson } from "../../../../types";
import { API_RESPONSE_STATUS, SUCCESS_ACTION } from "../../constants";
import FeatureWrapper from "../../../components/featureWrapper";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import { getDefaultStyles } from "../../styles/styles";
import { redirectTo } from "../../../../utils";

/*
 * Component.
 */

class SignInAndUp extends Component<SignInAndUpProps, { user?: User; responseJson: any }> {
    /*
     * Constructor.
     */
    constructor(props: SignInAndUpProps) {
        super(props);

        this.state = {
            user: undefined,
            responseJson: undefined
        };
    }

    /*
     * Methods.
     */
    getRecipeInstanceOrThrow = () => {
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
                fields: validationErrors
            };
        }

        const { response, responseJson } = await this.signInAPI(formFields);

        if (responseJson !== undefined && responseJson.user !== undefined) {
            const user: User = {
                id: responseJson.user.id,
                email: responseJson.user.email
            };
            this.setState({
                user,
                responseJson
            });
        }

        return response;
    };

    signInAPI = async (formFields: APIFormField[]): Promise<{ response: SignInThemeResponse; responseJson?: any }> => {
        try {
            const headers: HeadersInit = {
                rid: this.getRecipeInstanceOrThrow().getRecipeId()
            };
            const responseJson = await this.onCallSignInAPI({ formFields }, headers);

            // Otherwise, if field errors.
            if (responseJson.status === API_RESPONSE_STATUS.FIELD_ERROR) {
                return {
                    response: {
                        status: API_RESPONSE_STATUS.FIELD_ERROR,
                        fields: responseJson.fields
                    }
                };
            }

            // Otherwise, if wrong credentials error.
            if (responseJson.status === API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR) {
                return {
                    response: {
                        status: API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR,
                        message: "Incorrect email & password combination"
                    }
                };
            }

            // Otherwise, if success.
            if (responseJson.status === API_RESPONSE_STATUS.OK) {
                return {
                    response: {
                        status: API_RESPONSE_STATUS.OK
                    },
                    responseJson
                };
            }

            // Otherwise, something went wrong.
            return {
                response: {
                    status: API_RESPONSE_STATUS.GENERAL_ERROR,
                    message: "Something went wrong. Please try again"
                }
            };
        } catch (e) {
            return {
                response: {
                    status: API_RESPONSE_STATUS.OK
                    // message: "Something went wrong. Please try again"
                }
            };
        }
    };

    onSignInSuccess = async () => {
        // if (this.state.user === undefined) {
        //     throw Error("Something went wrong. Please try again");
        // }

        await this.onHandleSuccess({
            action: SUCCESS_ACTION.SIGN_IN_COMPLETE,
            user: { id: "1", email: "lol@ile.co" },
            // user: this.state.user,
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
                fields: validationErrors
            };
        }

        const { response, responseJson } = await this.signUpAPI(formFields);
        if (responseJson !== undefined && responseJson.user !== undefined) {
            const user: User = {
                id: responseJson.user.id,
                email: responseJson.user.email
            };
            this.setState({
                user,
                responseJson
            });
        }
        return response;
    };

    signUpAPI = async (formFields: APIFormField[]): Promise<{ response: SignUpThemeResponse; responseJson?: any }> => {
        try {
            const headers: HeadersInit = {
                rid: this.getRecipeInstanceOrThrow().getRecipeId()
            };
            const responseJson = await this.onCallSignUpAPI({ formFields }, headers);

            // Otherwise, if field errors.
            if (responseJson.status === API_RESPONSE_STATUS.FIELD_ERROR) {
                return {
                    response: {
                        status: API_RESPONSE_STATUS.FIELD_ERROR,
                        fields: responseJson.fields
                    }
                };
            }

            // Otherwise, if success.
            if (responseJson.status === API_RESPONSE_STATUS.OK) {
                return {
                    response: {
                        status: API_RESPONSE_STATUS.OK
                    },
                    responseJson
                };
            }

            // Otherwise, something went wrong.
            return {
                response: {
                    status: API_RESPONSE_STATUS.GENERAL_ERROR,
                    message: "Something went wrong. Please try again"
                }
            };
        } catch (e) {
            return {
                response: {
                    status: API_RESPONSE_STATUS.GENERAL_ERROR,
                    message: "Something went wrong. Please try again"
                }
            };
        }
    };

    onSignUpSuccess = async () => {
        if (this.state.user === undefined) {
            throw Error("Something went wrong. Please try again");
        }

        await this.onHandleSuccess({
            action: SUCCESS_ACTION.SIGN_UP_COMPLETE,
            user: this.state.user,
            responseJson: this.state.responseJson
        });
    };

    doesSessionExist = async (): Promise<boolean> => {
        // If props provided by user.
        if (this.props.doesSessionExist) {
            return await this.props.doesSessionExist();
        }

        // TODO Otherwise, use supertokens session management.
        return false;
    };

    onHandleForgotPasswordClicked = async () => {
        // If props provided by user, and successfully handled.
        if (this.props.onHandleForgotPasswordClicked) {
            const isHandledByUser: boolean = await this.props.onHandleForgotPasswordClicked();
            if (isHandledByUser) {
                return;
            }
        }

        // Otherwise, redirect to resetPasswordURL if defined.
        const resetPasswordUrl = this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.signInForm
            .resetPasswordURL;

        if (resetPasswordUrl === undefined) {
            return;
        }

        window.history.pushState(null, "", resetPasswordUrl.getAsStringDangerous());
    };

    onHandleSuccess = async (context: onHandleSignInAndUpSuccessContext) => {
        // If props provided by user, and successfully handled.
        if (this.props.onHandleSuccess) {
            const isHandledByUser = await this.props.onHandleSuccess(context);
            if (isHandledByUser) {
                return;
            }
        }

        // Otherwise, use default, redirect to onSuccessRedirectURL
        const onSuccessRedirectURL = this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature
            .onSuccessRedirectURL;

        redirectTo(onSuccessRedirectURL);
    };

    onCallSignUpAPI = (requestJson: RequestJson, headers: HeadersInit): Promise<any> => {
        // If props provided by user.
        if (this.props.onCallSignUpAPI) {
            return this.props.onCallSignUpAPI(requestJson, headers);
        }

        // Otherwise, use default.
        return this.getRecipeInstanceOrThrow().signUpApi(requestJson, headers);
    };

    onCallSignInAPI = (requestJson: RequestJson, headers: HeadersInit): Promise<any> => {
        // If props provided by user.
        if (this.props.onCallSignInAPI) {
            return this.props.onCallSignInAPI(requestJson, headers);
        }

        // Otherwise, use default.
        return this.getRecipeInstanceOrThrow().signInApi(requestJson, headers);
    };

    /*
     * Init.
     */
    componentDidMount = async () => {
        const sessionExists = await this.doesSessionExist();
        if (sessionExists) {
            await this.onHandleSuccess({ action: SUCCESS_ACTION.SESSION_ALREADY_EXISTS });
        }
    };

    render = () => {
        const signUpFeature = this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.signUpForm;

        const signInFeature = this.getRecipeInstanceOrThrow().getConfig().signInAndUpFeature.signInForm;

        const defaultStyles: NormalisedDefaultStyles = getDefaultStyles(
            this.getRecipeInstanceOrThrow().getConfig().palette
        );
        const palette: NormalisedPalette = this.getRecipeInstanceOrThrow().getConfig().palette;

        const signInForm = {
            styleFromInit: signInFeature.style,
            formFields: signInFeature.formFields,
            resetPasswordURL: signInFeature.resetPasswordURL,
            callAPI: this.signIn,
            onSuccess: this.onSignInSuccess,
            forgotPasswordClick: this.onHandleForgotPasswordClicked,
            defaultStyles,
            palette
        };

        const signUpForm = {
            styleFromInit: signUpFeature.style,
            formFields: signUpFeature.formFields,
            privacyPolicyLink: signUpFeature.privacyPolicyLink,
            termsAndConditionsLink: signUpFeature.termsAndConditionsLink,
            onSuccess: this.onSignUpSuccess,
            callAPI: this.signUp,
            defaultStyles,
            palette
        };

        /*
         * Render.
         */
        return (
            <FeatureWrapper defaultStyles={defaultStyles}>
                <>
                    {/* No custom theme, use default. */}
                    {this.props.children === undefined && (
                        <SignInAndUpTheme signInForm={signInForm} signUpForm={signUpForm} />
                    )}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {this.props.children &&
                        React.cloneElement(this.props.children, {
                            signInForm,
                            signUpForm
                        })}
                </>
            </FeatureWrapper>
        );
    };
}

export default SignInAndUp;
