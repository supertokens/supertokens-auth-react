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

import { RESET_PASSWORD_INVALID_TOKEN_ERROR, SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import { APIFormField } from "../../../../../types";
import RecipeModule from "../../../../recipeModule";
import { EnterEmailAPIResponse, FormBaseAPIResponse, SubmitNewPasswordAPIResponse } from "../../../types";

/*
 * Imports.
 */

export async function handleSubmitNewPasswordAPI(
    formFields: APIFormField[],
    recipe: RecipeModule<any, any, any, any>,
    token: string
): Promise<FormBaseAPIResponse> {
    const response: SubmitNewPasswordAPIResponse = await recipe.httpRequest.post(
        "/user/password/reset",
        {
            body: JSON.stringify({ formFields, token }),
        },
        "SUBMIT_NEW_PASSWORD"
    );

    // Otherwise, if field errors.
    if (response.status === "FIELD_ERROR") {
        return {
            status: "FIELD_ERROR",
            formFields: response.formFields,
        };
    }

    // Otherwise, if reset password invalid token error.
    if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
        return {
            status: "GENERAL_ERROR",
            message: RESET_PASSWORD_INVALID_TOKEN_ERROR,
        };
    }

    // Otherwise, status === OK
    if (response.status === "OK") {
        return {
            status: "OK",
        };
    }

    throw Error(SOMETHING_WENT_WRONG_ERROR);
}

export async function enterEmailAPI(
    formFields: APIFormField[],
    recipe: RecipeModule<any, any, any, any>
): Promise<FormBaseAPIResponse> {
    const response: EnterEmailAPIResponse = await recipe.httpRequest.post(
        "/user/password/reset/token",
        {
            body: JSON.stringify({ formFields }),
        },
        "SEND_RESET_PASSWORD_EMAIL"
    );

    // Otherwise, if field errors.
    if (response.status === "FIELD_ERROR") {
        return {
            status: "FIELD_ERROR",
            formFields: response.formFields,
        };
    }

    // Otherwise, success.
    if (response.status === "OK") {
        return {
            status: "OK",
        };
    }

    throw Error(SOMETHING_WENT_WRONG_ERROR);
}
