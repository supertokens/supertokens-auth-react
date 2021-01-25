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

/*
 * Imports.
 */
import { SOMETHING_WENT_WRONG_ERROR, INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR } from "../../../../../constants";
import { APIFormField } from "../../../../../types";
import RecipeModule from "../../../../recipeModule";
import { API_RESPONSE_STATUS, FORM_BASE_API_RESPONSE, EMAIL_PASSWORD_PRE_API_HOOK_ACTION } from "../../../constants";
import { EmailExistsAPIResponse, FormBaseAPIResponse, SignInAPIResponse, SignUpAPIResponse } from "../../../types";

/*
 * Methods.
 */

export async function signUpAPI(formFields: APIFormField[], recipe: RecipeModule): Promise<FormBaseAPIResponse> {
    const response: SignUpAPIResponse = await recipe.getHttp().post(
        "/signup",
        {
            body: JSON.stringify({ formFields })
        },
        EMAIL_PASSWORD_PRE_API_HOOK_ACTION.SIGN_UP
    );

    // If success.
    if (response.status === API_RESPONSE_STATUS.OK) {
        return {
            status: FORM_BASE_API_RESPONSE.OK,
            user: response.user
        };
    }

    // Otherwise, if field errors.
    if (response.status === API_RESPONSE_STATUS.FIELD_ERROR) {
        return {
            status: FORM_BASE_API_RESPONSE.FIELD_ERROR,
            formFields: response.formFields
        };
    }

    throw new Error(SOMETHING_WENT_WRONG_ERROR);
}

export async function signInAPI(formFields: APIFormField[], recipe: RecipeModule): Promise<FormBaseAPIResponse> {
    const response: SignInAPIResponse = await recipe.getHttp().post(
        "/signin",
        {
            body: JSON.stringify({ formFields })
        },
        EMAIL_PASSWORD_PRE_API_HOOK_ACTION.SIGN_IN
    );

    // If success.
    if (response.status === API_RESPONSE_STATUS.OK) {
        return {
            status: FORM_BASE_API_RESPONSE.OK,
            user: response.user
        };
    }

    // Otherwise, if field errors.
    if (response.status === API_RESPONSE_STATUS.FIELD_ERROR) {
        return {
            status: FORM_BASE_API_RESPONSE.FIELD_ERROR,
            formFields: response.formFields
        };
    }

    // Otherwise, if wrong credentials error.
    if (response.status === API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR) {
        return {
            status: FORM_BASE_API_RESPONSE.GENERAL_ERROR,
            message: INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR
        };
    }

    throw new Error(SOMETHING_WENT_WRONG_ERROR);
}

export async function emailExistsAPI(email: string, recipe: RecipeModule): Promise<string | undefined> {
    const response: EmailExistsAPIResponse = await recipe
        .getHttp()
        .get("/signup/email/exists", {}, EMAIL_PASSWORD_PRE_API_HOOK_ACTION.EMAIL_EXISTS, { email });

    // If email already exists.
    if (response.status === API_RESPONSE_STATUS.OK) {
        // If email exists.
        if (response.exists === true) {
            return "This email already exists. Please sign in instead";
        }

        // Otherwise, no errors.
        return undefined;
    }

    // Fail silently.
    return undefined;
}
