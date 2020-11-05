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

import { SOMETHING_WENT_WRONG_ERROR } from "../../../../constants";
import { APIFormField } from "../../../../types";
import { API_RESPONSE_STATUS } from "../../constants";
import { SignInThemeResponse, SignUpAPI, SignInAPI, SignUpThemeResponse } from "../../types";

/*
 * Methods.
 */

export async function handleSignUpAPI(
    formFields: APIFormField[],
    rid: string,
    signUpAPI: SignUpAPI
): Promise<{ normalisedAPIResponse: SignUpThemeResponse; responseJson?: any }> {
    try {
        const headers: HeadersInit = {
            rid
        };
        const responseJson = await signUpAPI({ formFields }, headers);

        // Otherwise, if field errors.
        if (responseJson.status === API_RESPONSE_STATUS.FIELD_ERROR) {
            return {
                normalisedAPIResponse: {
                    status: API_RESPONSE_STATUS.FIELD_ERROR,
                    formFields: responseJson.formFields
                }
            };
        }

        // Otherwise, if success.
        if (responseJson.status === API_RESPONSE_STATUS.OK) {
            return {
                normalisedAPIResponse: {
                    status: API_RESPONSE_STATUS.OK
                },
                responseJson
            };
        }

        // Otherwise, something went wrong.
        return {
            normalisedAPIResponse: {
                status: API_RESPONSE_STATUS.GENERAL_ERROR,
                message: SOMETHING_WENT_WRONG_ERROR
            }
        };
    } catch (e) {
        return {
            normalisedAPIResponse: {
                status: API_RESPONSE_STATUS.GENERAL_ERROR,
                message: SOMETHING_WENT_WRONG_ERROR
            }
        };
    }
}

export async function handleSignInAPI(
    formFields: APIFormField[],
    rid: string,
    signInAPI: SignInAPI
): Promise<{ normalisedAPIResponse: SignInThemeResponse; responseJson?: any }> {
    try {
        const headers: HeadersInit = {
            rid
        };
        const responseJson = await signInAPI({ formFields }, headers);

        // Otherwise, if field errors.
        if (responseJson.status === API_RESPONSE_STATUS.FIELD_ERROR) {
            return {
                normalisedAPIResponse: {
                    status: API_RESPONSE_STATUS.FIELD_ERROR,
                    formFields: responseJson.formFields
                }
            };
        }

        // Otherwise, if wrong credentials error.
        if (responseJson.status === API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR) {
            return {
                normalisedAPIResponse: {
                    status: API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR,
                    message: "Incorrect email and password combination"
                }
            };
        }

        // Otherwise, if success.
        if (responseJson.status === API_RESPONSE_STATUS.OK) {
            return {
                normalisedAPIResponse: {
                    status: API_RESPONSE_STATUS.OK
                },
                responseJson
            };
        }

        // Otherwise, something went wrong.
        return {
            normalisedAPIResponse: {
                status: API_RESPONSE_STATUS.GENERAL_ERROR,
                message: SOMETHING_WENT_WRONG_ERROR
            }
        };
    } catch (e) {
        return {
            normalisedAPIResponse: {
                status: API_RESPONSE_STATUS.GENERAL_ERROR,
                message: SOMETHING_WENT_WRONG_ERROR
            }
        };
    }
}
