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
import RecipeModule from "../../../../recipeModule";
import {
    API_RESPONSE_STATUS,
    EMAIL_PASSWORD_PRE_API_HOOK_ACTION,
    VERIFY_EMAIL_LINK_CLICKED_STATUS
} from "../../../constants";
import {
    VerifyEmailThemeResponse,
    SendVerifyEmailThemeResponse,
    VerifyEmailAPIResponse,
    SendVerifyEmailAPIResponse,
    IsEmailVerifiedAPIResponse
} from "../../../types";

/*
 * Imports.
 */

export async function verifyEmailAPI(recipe: RecipeModule, token: string): Promise<VerifyEmailThemeResponse> {
    const response: VerifyEmailAPIResponse = await recipe.getHttp().post(
        "/user/email/verify",
        {
            body: JSON.stringify({
                method: "token",
                token
            })
        },
        EMAIL_PASSWORD_PRE_API_HOOK_ACTION.VERIFY_EMAIL
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

    throw Error(SOMETHING_WENT_WRONG_ERROR);
}

export async function sendVerifyEmailAPI(recipe: RecipeModule): Promise<SendVerifyEmailThemeResponse> {
    const response: SendVerifyEmailAPIResponse = await recipe
        .getHttp()
        .post("/user/email/verify/token", {}, EMAIL_PASSWORD_PRE_API_HOOK_ACTION.SEND_VERIFY_EMAIL);

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

    throw Error(SOMETHING_WENT_WRONG_ERROR);
}

export async function isEmailVerifiedAPI(recipe: RecipeModule): Promise<boolean> {
    const response: IsEmailVerifiedAPIResponse = await recipe
        .getHttp()
        .get("/user/email/verify", {}, EMAIL_PASSWORD_PRE_API_HOOK_ACTION.IS_EMAIL_VERIFIED);
    return response.isVerified;
}
