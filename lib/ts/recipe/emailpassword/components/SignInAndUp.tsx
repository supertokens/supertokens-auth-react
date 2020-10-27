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
import { useCallback, useEffect, useState } from "react";
import { ST_ROOT_CONTAINER } from "../../../constants";
import { APIResponse, EmailPasswordProps, User } from '../types';
import EmailPassword from "../emailPassword";
import {SignInAndUpTheme} from "..";
import root from "react-shadow/emotion";
import { defaultStyles } from "../../../styles/styles";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { APIFormField, APIStatus, RequestJson, SuccessAction } from "../../../types";

/*
 * Component.
 */
function SignInAndUp (props: EmailPasswordProps) {
    /*
     * States.
     */
    const [user, setUser] = useState<User | undefined>(undefined);
    const [responseJson, setResponseJson] = useState<any>(undefined);

    /*
     * Methods.
     */
    const getRecipeInstanceOrThrow = () => {
		let instance;
		if (props.__internal !== undefined && props.__internal.instance !== undefined) {
			instance = props.__internal.instance;
		} else {
			instance = EmailPassword.getInstanceOrThrow();
		}
		return instance;
    }

    const signInAPI = useCallback(
        async (formFields: APIFormField[]): Promise<APIResponse> => {
            return await (
                async (formFields: APIFormField[]): Promise<APIResponse>  => {
                    const headers: HeadersInit = {
                        rid: getRecipeInstanceOrThrow().getRecipeId()
                    }
                    const result = await onCallSignInAPI({formFields}, headers);
                    const {data} = await result.json();

                    // If status >= 300, it means there is a GENERAL_ERROR.
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


                    // Otherwise, status === OK, update state wit huser and responseJSON.
                    const user: User = {
                        id: data.user.id,
                        email: data.user.email
                    }

                    setUser(user);
                    setResponseJson(data);

                    return new Promise(resolve => {
                        resolve({
                            status: APIStatus.OK
                        });
                    });
                }
            )(formFields);
            },
            [getRecipeInstanceOrThrow, setUser, setResponseJson]
    )

    const onSignInSuccess = async () => {
        await onHandleSuccess({ action: SuccessAction.SIGN_IN_COMPLETE }, user, responseJson);
    }

    const signUpAPI = async (formFields: APIFormField[]): Promise<Response>  => {
        const headers: Headers = new Headers({
            rid: getRecipeInstanceOrThrow().getRecipeId()
        });
        return onCallSignUpAPI({formFields}, headers);
    }

    const onSignUpSuccess = async () => {
        await onHandleSuccess({ action: SuccessAction.SIGN_UP_COMPLETE }, user, responseJson);
    }
    const doesSessionExist = async (): Promise<boolean> => {
        // If props provided by user.
        if (props.doesSessionExist) {
            return await props.doesSessionExist();
        }

        // TODO Otherwise, use supertokens session management.
        return new Promise(resolve => resolve(false));
    }

    const onHandleForgotPasswordClicked = async () => {
        // If props provided by user, and successfully handled.
        if (props.onHandleForgotPasswordClicked) {
            const isHandledByUser: boolean = await props.onHandleForgotPasswordClicked();
            if (isHandledByUser) {
                return;
            }
        }

        // Otherwise, use default, redirect to resetPasswordURL
        const onResetPasswordUrl = getRecipeInstanceOrThrow().getSignInFeature().getResetPasswordURL;
        // TODO What if user uses react-router-dom history? => take router from props correctly (see withOrWithoutRouter)
        window.history.pushState(onResetPasswordUrl, '');
        return;
    }

    const onHandleSuccess = async (context: any, user?: any, responseJson?: any) => {
        // If props provided by user, and successfully handled.
        if (props.onHandleSuccess) {
            const isHandledByUser = await props.onHandleSuccess(context, user, responseJson);
            if (isHandledByUser) {
                return;
            }
        }

        // Otherwise, use default, redirect to onSuccessRedirectURL
        const onSuccessRedirectURL = getRecipeInstanceOrThrow().getOnSuccessRedirectURL();
         // TODO What if user uses react-router-dom history? => take router from props correctly (see withOrWithoutRouter)
        window.history.pushState(onSuccessRedirectURL, '');
    }

    const onCallSignUpAPI = (requestJson: RequestJson, headers: HeadersInit): Promise<Response> => {
        // If props provided by user.
        if (props.onCallSignUpAPI) {
            return props.onCallSignUpAPI(requestJson, headers);
        }

        return getRecipeInstanceOrThrow().signUpApi(requestJson, headers);
    }

    const onCallSignInAPI = (requestJson: RequestJson, headers: HeadersInit): Promise<Response> => {
        if (props.onCallSignInAPI) {
            return props.onCallSignInAPI(requestJson, headers);
        }

        return getRecipeInstanceOrThrow().signInApi(requestJson, headers);
    }

    /*
     * Init.
     */
    useEffect(() => {
        (
            async () => {
                const sessionExists = await doesSessionExist();
                if (sessionExists) {
                    await onHandleSuccess({action: "SESSION_ALREADY_EXISTS"});
                }
            }
        )();
    }, [doesSessionExist, onHandleSuccess]);

    const signUpFeature = getRecipeInstanceOrThrow().getSignUpFeature();
    const privacyPolicyLink = signUpFeature.getPrivacyPolicyLink();
    const termsAndConditionsLink = signUpFeature.getTermsAndConditionsLink();
    const signUpFormFields = signUpFeature.getFormFields();

    const signInFeature = getRecipeInstanceOrThrow().getSignInFeature();
    const resetPasswordURL = signInFeature.getResetPasswordURL();
    const signInFormFields = signInFeature.getFormFields();

        
    /*
     * Render.
     */
    return (
        <root.div css={defaultStyles.root} id={ST_ROOT_CONTAINER}>

            <SignInAndUpTheme

                signInForm={{
                    formFields: signInFormFields,
                    resetPasswordURL,
                    callAPI: signInAPI,
                    onSuccess: onSignInSuccess
                }}

                signUpForm={{
                    formFields: signUpFormFields,
                    privacyPolicyLink,
                    termsAndConditionsLink,
                    onSuccess: onSignUpSuccess,
                    callAPI: signUpAPI
                }}

            />

        </root.div>
    );
}

export default SignInAndUp;