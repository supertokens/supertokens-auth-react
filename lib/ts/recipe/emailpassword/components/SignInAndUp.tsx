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
import { ST_ROOT_CONTAINER } from "../../../constants";
import { APIResponse, EmailPasswordProps, User } from '../types';
import EmailPassword from "../emailPassword";
import {SignInAndUpTheme} from "..";
import root from "react-shadow/emotion";
import { defaultStyles } from "../../../styles/styles";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { APIFormFields, APIStatus, RequestJson, SuccessAction } from "../../../types";

/*
 * Component.
 */
class SignInAndUp extends React.Component<EmailPasswordProps> {
    getRecipeInstanceOrThrow = () => {
		let instance;
		if (this.props.__internal !== undefined && this.props.__internal.instance !== undefined) {
			instance = this.props.__internal.instance;
		} else {
			instance = EmailPassword.getInstanceOrThrow();
		}
		return instance;
    }

    async componentDidMount () {
        // First, check if a session already exists.
        const hasSession = await this.doesSessionExist();
        if (hasSession) {
            this.onHandleSuccess({action: "SESSION_ALREADY_EXISTS"});
        }
    }

    render () {
        const signUpFeature = this.getRecipeInstanceOrThrow().getSignUpFeature();
        const privacyPolicyLink = signUpFeature.getPrivacyPolicyLink();
        const termsAndConditionsLink = signUpFeature.getTermsAndConditionsLink();
        const signUpFormFields = signUpFeature.getFormFields();

        const signInFeature = this.getRecipeInstanceOrThrow().getSignInFeature();
        const resetPasswordURL = signInFeature.getResetPasswordURL();
        const signInFormFields = signInFeature.getFormFields();

        return (
            <root.div css={defaultStyles.root} id={ST_ROOT_CONTAINER}>

                <SignInAndUpTheme

                    signInForm={{
                        formFields: signInFormFields,
                        resetPasswordURL,
                        callAPI: this.signInAPI
                    }}

                    signUpForm={{
                        formFields: signUpFormFields,
                        privacyPolicyLink,
                        termsAndConditionsLink,
                        callAPI: this.signUpAPI
                    }}

                />

            </root.div>
        );
    }

    signInAPI = async (formFields: APIFormFields[]): Promise<APIResponse>  => {
        const headers: HeadersInit = {
            rid: this.getRecipeInstanceOrThrow().getRecipeId()
        }
        const result = await this.onCallSignInAPI({formFields}, headers);
        const {data} = await result.json();

        // If status > 300, it means there is a GENERAL_ERROR.
        if (result.status >= 300) {
            return new Promise(resolve => {
                resolve({
                    status: APIStatus.GENERAL_ERROR,
                    message: data.message
                });
            });
        }
        
        // Otherwise, if field errors.
        if (data.status === APIStatus.FIELD_ERROR) {
            return new Promise(resolve => {
                resolve({
                    status: APIStatus.FIELD_ERROR,
                    fields: data.fields
                });
            });
        }

        // Otherwise, if wrong credentials error.
        if (data.status === APIStatus.WRONG_CREDENTIALS_ERROR) {
            return new Promise(resolve => {
                resolve({
                    status: APIStatus.WRONG_CREDENTIALS_ERROR
                });
            });
        }


        // Otherwise, status === OK.
        const user: User = {
            id: data.user.id,
            email: data.user.email
        }

        // Call onHandleSuccess, and return OK.
        await this.onHandleSuccess({ action: SuccessAction.SIGN_IN_COMPLETE }, user, data);
        return new Promise(resolve => {
            resolve({
                status: APIStatus.OK
            });
        });
    }

    signUpAPI = async (formFields: APIFormFields[]): Promise<Response>  => {
        const headers: Headers = new Headers({
            rid: this.getRecipeInstanceOrThrow().getRecipeId()
        });
        return this.onCallSignUpAPI({formFields}, headers);
    }

    doesSessionExist = async (): Promise<boolean> => {
        // If props provided by user.
        if (this.props.doesSessionExist) {
            return await this.props.doesSessionExist();
        }

        // TODO Otherwise, use supertokens session management.
        return new Promise(resolve => resolve(false));
    }

    onHandleForgotPasswordClicked = async () => {
        // If props provided by user, and successfully handled.
        if (this.props.onHandleForgotPasswordClicked) {
            const isHandledByUser: boolean = await this.props.onHandleForgotPasswordClicked();
            if (isHandledByUser) {
                return;
            }
        }

        // Otherwise, use default, redirect to resetPasswordURL
        const onResetPasswordUrl = this.getRecipeInstanceOrThrow().getSignInFeature().getResetPasswordURL;
        // TODO What if user uses react-router-dom history? => take router from props correctly (see withOrWithoutRouter)
        window.history.pushState(onResetPasswordUrl, '');
        return;
    }

    onHandleSuccess = async (context: any, user?: any, responseJson?: any) => {
        // If props provided by user, and successfully handled.
        if (this.props.onHandleSuccess) {
            const isHandledByUser = await this.props.onHandleSuccess(context, user, responseJson);
            if (isHandledByUser) {
                return;
            }
        }

        // Otherwise, use default, redirect to onSuccessRedirectURL
        const onSuccessRedirectURL = this.getRecipeInstanceOrThrow().getOnSuccessRedirectURL();
         // TODO What if user uses react-router-dom history? => take router from props correctly (see withOrWithoutRouter)
        window.history.pushState(onSuccessRedirectURL, '');
    }

    onCallSignUpAPI = (requestJson: RequestJson, headers: HeadersInit): Promise<Response> => {
        // If props provided by user.
        if (this.props.onCallSignUpAPI) {
            return this.props.onCallSignUpAPI(requestJson, headers);
        }

        return this.getRecipeInstanceOrThrow().signUpApi(requestJson, headers);
    }

    onCallSignInAPI = (requestJson: RequestJson, headers: HeadersInit): Promise<Response> => {
        if (this.props.onCallSignInAPI) {
            return this.props.onCallSignInAPI(requestJson, headers);
        }

        return this.getRecipeInstanceOrThrow().signInApi(requestJson, headers);
    }

}

export default SignInAndUp;