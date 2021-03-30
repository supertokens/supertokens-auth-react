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

import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import RecipeModule from "../../../../recipeModule";
import {
    VerifyEmailThemeResponse,
    VerifyEmailAPIResponse,
    SendVerifyEmailThemeResponse,
    SendVerifyEmailAPIResponse,
    IsEmailVerifiedAPIResponse,
} from "../../../types";

/*
 * Imports.
 */

export async function verifyEmailAPI(
    recipe: RecipeModule<unknown, unknown, unknown>,
    token: string
): Promise<VerifyEmailThemeResponse> {
    const response: VerifyEmailAPIResponse = await recipe.httpRequest.post(
        "/user/email/verify",
        {
            body: JSON.stringify({
                method: "token",
                token,
            }),
        },
        "VERIFY_EMAIL"
    );

    // Otherwise, if email verification invalid token error.
    if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
        return {
            status: "INVALID",
        };
    }

    // Otherwise, status === OK
    if (response.status === "OK") {
        return {
            status: "SUCCESSFUL",
        };
    }

    throw Error(SOMETHING_WENT_WRONG_ERROR);
}

export async function sendVerifyEmailAPI(
    recipe: RecipeModule<unknown, unknown, unknown>
): Promise<SendVerifyEmailThemeResponse> {
    const response: SendVerifyEmailAPIResponse = await recipe.httpRequest.post(
        "/user/email/verify/token",
        {},
        "SEND_VERIFY_EMAIL"
    );

    // If email already verified.
    if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
        return {
            status: "EMAIL_ALREADY_VERIFIED_ERROR",
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

export async function isEmailVerifiedAPI<T, S, R>(recipe: RecipeModule<T, S, R>): Promise<boolean> {
    const response: IsEmailVerifiedAPIResponse = await recipe.httpRequest.get(
        "/user/email/verify",
        {},
        "IS_EMAIL_VERIFIED"
    );
    return response.isVerified;
}
