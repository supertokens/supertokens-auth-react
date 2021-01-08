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

import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import { API_RESPONSE_STATUS, VERIFY_EMAIL_LINK_CLICKED_STATUS } from "../../../constants";
import {
    VerifyEmailAPI,
    SendVerifyEmailAPI,
    VerifyEmailThemeResponse,
    SendVerifyEmailThemeResponse
} from "../../../types";

/*
 * Imports.
 */

export async function handleVerifyEmailAPI(
    rid: string,
    verifyEmailAPI: VerifyEmailAPI,
    token: string
): Promise<VerifyEmailThemeResponse> {
    try {
        const headers: HeadersInit = {
            rid
        };
        const response = await verifyEmailAPI(
            {
                method: "token",
                token
            },
            headers
        );

        // Otherwise, if email verification invalid token error.
        if (response.status === API_RESPONSE_STATUS.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR) {
            return {
                status: VERIFY_EMAIL_LINK_CLICKED_STATUS.INVALID
            };
        }

        // Otherwise, status === OK
        if (response.status === API_RESPONSE_STATUS.OK) {
            return {
                status: VERIFY_EMAIL_LINK_CLICKED_STATUS.SUCCESSFUL
            };
        }

        console.error(
            "There was an error handling the output format of onVerifyEmailAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks/email-verification"
        );
        return {
            status: VERIFY_EMAIL_LINK_CLICKED_STATUS.GENERAL_ERROR
        };
    } catch (e) {
        return {
            status: VERIFY_EMAIL_LINK_CLICKED_STATUS.GENERAL_ERROR
        };
    }
}

export async function handleSendVerifyEmailAPI(
    rid: string,
    sendVerifyEmailAPI: SendVerifyEmailAPI
): Promise<SendVerifyEmailThemeResponse> {
    try {
        const headers: HeadersInit = {
            rid
        };
        const response = await sendVerifyEmailAPI(headers);

        // If email already verified.
        if (response.status === API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR) {
            return {
                status: API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR
            };
        }

        // Otherwise, success.
        if (response.status === API_RESPONSE_STATUS.OK) {
            return {
                status: API_RESPONSE_STATUS.OK
            };
        }

        console.error(
            "There was an error handling the output format of onCallSendVerifyEmailAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks/email-verification"
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
