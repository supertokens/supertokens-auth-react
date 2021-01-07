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
import { SOMETHING_WENT_WRONG_ERROR, INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR } from "../../../../../constants";
import { APIFormField } from "../../../../../types";
import { API_RESPONSE_STATUS } from "../../../constants";
import { SignUpAPI, SignUpThemeResponse, SignInAPI, SignInThemeResponse, EmailExistsAPI } from "../../../types";

/*
 * Methods.
 */

export async function handleSignUpAPI(
    formFields: APIFormField[],
    rid: string,
    signUpAPI: SignUpAPI
): Promise<SignUpThemeResponse> {
    try {
        const headers: HeadersInit = {
            rid
        };
        const response = await signUpAPI({ formFields }, headers);

        // Otherwise, if field errors.
        if (response.status === API_RESPONSE_STATUS.FIELD_ERROR) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                formFields: response.formFields
            };
        }

        // Otherwise, success.
        if (response.status === API_RESPONSE_STATUS.OK) {
            return response;
        }

        console.error(
            "There was an error handling the output format of onCallSignUpAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks//sign-in-up#output"
        );
        return {
            status: API_RESPONSE_STATUS.GENERAL_ERROR,
            message: SOMETHING_WENT_WRONG_ERROR
        };
    } catch (e) {
        return {
            status: API_RESPONSE_STATUS.GENERAL_ERROR,
            message: SOMETHING_WENT_WRONG_ERROR
        };
    }
}

export async function handleSignInAPI(
    formFields: APIFormField[],
    rid: string,
    signInAPI: SignInAPI
): Promise<SignInThemeResponse> {
    try {
        const headers: HeadersInit = {
            rid
        };
        const response = await signInAPI({ formFields }, headers);
        // Otherwise, if field errors.
        if (response.status === API_RESPONSE_STATUS.FIELD_ERROR) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                formFields: response.formFields
            };
        }

        // Otherwise, if wrong credentials error.
        if (response.status === API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR) {
            return {
                status: API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR,
                message: INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR
            };
        }

        // Otherwise, if success.
        if (response.status === API_RESPONSE_STATUS.OK) {
            return response;
        }

        // Otherwise, something went wrong.
        console.error(
            "There was an error handling the output format of onCallSignInAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks//sign-in-up#output-1"
        );
        return {
            status: API_RESPONSE_STATUS.GENERAL_ERROR,
            message: SOMETHING_WENT_WRONG_ERROR
        };
    } catch (e) {
        return {
            status: API_RESPONSE_STATUS.GENERAL_ERROR,
            message: SOMETHING_WENT_WRONG_ERROR
        };
    }
}

export async function handleEmailExistsAPICall(
    value: string,
    rid: string,
    onCallEmailExistsAPI: EmailExistsAPI
): Promise<string | undefined> {
    try {
        const headers: HeadersInit = {
            rid
        };
        const response = await onCallEmailExistsAPI(value, headers);

        // If email already exists.
        if (response.status === API_RESPONSE_STATUS.OK) {
            // If email exists.
            if (response.exists === true) {
                return "This email already exists. Please sign in instead";
            }

            // Otherwise, no errors.
            return undefined;
        }

        // Otherwise, something went wrong.
        console.error(
            "There was an error handling the output format of onCallEmailExistsAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks//sign-in-up#output-1"
        );
        // Fail silently.
        return undefined;
    } catch (e) {
        // Fail silently.
        return undefined;
    }
}
