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

import { RESET_PASSWORD_INVALID_TOKEN_ERROR, SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import { APIFormField } from "../../../../../types";
import { API_RESPONSE_STATUS } from "../../../constants";
import {
    SubmitNewPasswordThemeResponse,
    EnterEmailThemeResponse,
    EnterEmailAPI,
    SubmitNewPasswordAPI
} from "../../../types";

/*
 * Imports.
 */

export async function handleSubmitNewPasswordAPI(
    formFields: APIFormField[],
    rid: string,
    submitNewPasswordAPI: SubmitNewPasswordAPI,
    token: string
): Promise<SubmitNewPasswordThemeResponse> {
    try {
        const headers: HeadersInit = {
            rid
        };
        const response = await submitNewPasswordAPI(
            {
                formFields,
                token: token
            },
            headers
        );

        // Otherwise, if field errors.
        if (response.status === API_RESPONSE_STATUS.FIELD_ERROR) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                formFields: response.formFields
            };
        }

        // Otherwise, if reset password invalid token error.
        if (response.status === API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR) {
            return {
                status: API_RESPONSE_STATUS.GENERAL_ERROR,
                message: RESET_PASSWORD_INVALID_TOKEN_ERROR
            };
        }

        // Otherwise, status === OK
        if (response.status === API_RESPONSE_STATUS.OK) {
            return {
                status: API_RESPONSE_STATUS.OK
            };
        }

        console.error(
            "There was an error handling the output format of onCallSubmitNewPasswordAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks/reset-password#output"
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

export async function handleEnterEmailAPI(
    formFields: APIFormField[],
    rid: string,
    enterEmailAPI: EnterEmailAPI
): Promise<EnterEmailThemeResponse> {
    try {
        const headers: HeadersInit = {
            rid
        };
        const response = await enterEmailAPI({ formFields }, headers);

        // Otherwise, if field errors.
        if (response.status === API_RESPONSE_STATUS.FIELD_ERROR) {
            return {
                status: API_RESPONSE_STATUS.FIELD_ERROR,
                formFields: response.formFields
            };
        }

        // Otherwise, success.
        if (response.status === API_RESPONSE_STATUS.OK) {
            return {
                status: API_RESPONSE_STATUS.OK
            };
        }

        console.error(
            "There was an error handling the output format of onCallSendResetEmailAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks/reset-password#output-1"
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
