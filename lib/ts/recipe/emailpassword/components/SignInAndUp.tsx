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
import { SignInThemeResponse, EmailPasswordProps, User, SignUpThemeResponse } from "../types";
import EmailPassword from "../emailPassword";
import { SignInAndUpTheme } from "..";
import { APIFormField, RequestJson } from "../../../types";
import { API_RESPONSE_STATUS, SUCCESS_ACTION } from "../../../constants";
import FeatureWrapper from "../../components/featureWrapper";

/** @jsx jsx */
import { jsx } from "@emotion/core";

/*
 * Component.
 */

function SignInAndUp(props: EmailPasswordProps) {
    /*
     * States.
     */
    const [user, setUser] = useState<User | undefined>(undefined);
    const [responseJson, setResponseJson] = useState<any>(undefined);

    /*
     * Methods.
     */
    const getRecipeInstanceOrThrow = useCallback(() => {
        let instance;
        if (props.__internal !== undefined && props.__internal.instance !== undefined) {
            instance = props.__internal.instance;
        } else {
            instance = EmailPassword.getInstanceOrThrow();
        }
        return instance;
    }, [props.__internal]);

    const signInAPI = async (formFields: APIFormField[]): Promise<SignInThemeResponse> => {
        // Front end validation.
        const validationErrors = await getRecipeInstanceOrThrow()
            .getSignInFeature()
            .validate(formFields);

        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                fields: validationErrors
            };
        }

        // Otherwise, call API.
        try {
            const headers: HeadersInit = {
                rid: getRecipeInstanceOrThrow().getRecipeId()
            };
            const result = await onCallSignInAPI({ formFields }, headers);
            const { data } = await result.json();

            // If status >= 300, it means there is a GENERAL_ERROR.
            if (result.status >= 300) {
                return {
                    status: API_RESPONSE_STATUS.GENERAL_ERROR,
                    message: data.message
                };
            }

            // Otherwise, if field errors.
            if (data.status === API_RESPONSE_STATUS.FIELD_ERROR) {
                return {
                    status: API_RESPONSE_STATUS.FIELD_ERROR,
                    fields: data.fields
                };
            }

            // Otherwise, if wrong credentials error.
            if (data.status === API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR) {
                return {
                    status: API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR,
                    message: "Incorrect email & password combination"
                };
            }

            // Otherwise, status === OK, update state with user and responseJSON.
            const user: User = {
                id: data.user.id,
                email: data.user.email
            };

            setUser(user);
            setResponseJson(data);

            return {
                status: API_RESPONSE_STATUS.OK
            };
        } catch (e) {
            return {
                status: API_RESPONSE_STATUS.GENERAL_ERROR,
                message: "Something went wrong. Please try again"
            };
        }
    };

    const onSignInSuccess = async () => {
        await onHandleSuccess({ action: SUCCESS_ACTION.SIGN_IN_COMPLETE }, user, responseJson);
    };

    const signUpAPI = async (formFields: APIFormField[]): Promise<SignUpThemeResponse> => {
        // Front end validation.
        const validationErrors = await getRecipeInstanceOrThrow()
            .getSignUpFeature()
            .validate(formFields);

        // If errors, return.
        if (validationErrors.length > 0) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                fields: validationErrors
            };
        }

        // Otherwise, call API.
        try {
            const headers: HeadersInit = {
                rid: getRecipeInstanceOrThrow().getRecipeId()
            };
            const result = await onCallSignUpAPI({ formFields }, headers);
            const { data } = await result.json();

            // If status >= 300, it means there is a GENERAL_ERROR.
            if (result.status >= 300) {
                return {
                    status: API_RESPONSE_STATUS.GENERAL_ERROR,
                    message: data.message
                };
            }

            // Otherwise, if field errors.
            if (data.status === API_RESPONSE_STATUS.FIELD_ERROR) {
                return {
                    status: API_RESPONSE_STATUS.FIELD_ERROR,
                    fields: data.fields
                };
            }

            // Otherwise, status === OK, update state with user and responseJSON.
            const user: User = {
                id: data.user.id,
                email: data.user.email
            };

            setUser(user);
            setResponseJson(data);

            return {
                status: API_RESPONSE_STATUS.OK
            };
        } catch (e) {
            return {
                status: API_RESPONSE_STATUS.GENERAL_ERROR,
                message: "Something went wrong. Please try again"
            };
        }
    };

    const onSignUpSuccess = async () => {
        await onHandleSuccess({ action: SUCCESS_ACTION.SIGN_UP_COMPLETE }, user, responseJson);
    };

    const doesSessionExist = useCallback(async (): Promise<boolean> => {
        // If props provided by user.
        if (props.doesSessionExist) {
            return await props.doesSessionExist();
        }

        // TODO Otherwise, use supertokens session management.
        return false;
    }, [props]);

    const onHandleForgotPasswordClicked = async () => {
        // If props provided by user, and successfully handled.
        if (props.onHandleForgotPasswordClicked) {
            const isHandledByUser: boolean = await props.onHandleForgotPasswordClicked();
            if (isHandledByUser) {
                return;
            }
        }

        // Otherwise, redirect to resetPasswordURL if defined.
        const resetPasswordUrl = getRecipeInstanceOrThrow()
            .getSignInFeature()
            .getResetPasswordURL();

        if (resetPasswordUrl === undefined) {
            return;
        }

        window.history.pushState(null, "", resetPasswordUrl);
    };

    const onHandleSuccess = useCallback(
        async (context: any, user?: any, responseJson?: any) => {
            // If props provided by user, and successfully handled.
            if (props.onHandleSuccess) {
                const isHandledByUser = await props.onHandleSuccess(context, user, responseJson);
                if (isHandledByUser) {
                    return;
                }
            }

            // Otherwise, use default, redirect to onSuccessRedirectURL
            const onSuccessRedirectURL = getRecipeInstanceOrThrow().getOnSuccessRedirectURL();
            window.history.pushState(null, "", onSuccessRedirectURL);
        },
        [props, getRecipeInstanceOrThrow]
    );

    const onCallSignUpAPI = (requestJson: RequestJson, headers: HeadersInit): Promise<Response> => {
        // If props provided by user.
        if (props.onCallSignUpAPI) {
            return props.onCallSignUpAPI(requestJson, headers);
        }

        // Otherwise, use default.
        return getRecipeInstanceOrThrow().signUpApi(requestJson, headers);
    };

    const onCallSignInAPI = (requestJson: RequestJson, headers: HeadersInit): Promise<Response> => {
        // If props provided by user.
        if (props.onCallSignInAPI) {
            return props.onCallSignInAPI(requestJson, headers);
        }

        // Otherwise, use default.
        return getRecipeInstanceOrThrow().signInApi(requestJson, headers);
    };

    /*
     * Init.
     */
    useEffect(() => {
        (async () => {
            const sessionExists = await doesSessionExist();
            if (sessionExists) {
                await onHandleSuccess({ action: "SESSION_ALREADY_EXISTS" });
            }
        })();
    }, [doesSessionExist, onHandleSuccess]);

    const signUpFeature = getRecipeInstanceOrThrow().getSignUpFeature();

    const signInFeature = getRecipeInstanceOrThrow().getSignInFeature();

    const signInForm = {
        styleFromInit: signInFeature.getStyle(),
        formFields: signInFeature.getFormFields(),
        resetPasswordURL: signInFeature.getResetPasswordURL(),
        callAPI: signInAPI,
        onSuccess: onSignInSuccess,
        forgotPasswordClick: onHandleForgotPasswordClicked
    };

    const signUpForm = {
        styleFromInit: signUpFeature.getStyle(),
        formFields: signUpFeature.getFormFields(),
        privacyPolicyLink: signUpFeature.getPrivacyPolicyLink(),
        termsAndConditionsLink: signUpFeature.getTermsAndConditionsLink(),
        onSuccess: onSignUpSuccess,
        callAPI: signUpAPI
    };

    /*
     * Render.
     */
    return (
        <FeatureWrapper>
            <>
                {/* No custom theme, use default. */}
                {props.children === undefined && <SignInAndUpTheme signInForm={signInForm} signUpForm={signUpForm} />}
                {/* Otherwise, custom theme is provided, propagate props. */}
                {props.children && React.cloneElement(props.children, { signInForm, signUpForm })}
            </>
        </FeatureWrapper>
    );
}

export default SignInAndUp;
