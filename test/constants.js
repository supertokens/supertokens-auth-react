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
 * Consts.
 */
export const ST_ROOT_ID = "supertokens-root";
export const TEST_CLIENT_BASE_URL = "http://localhost:3031";
export const TEST_SERVER_BASE_URL = "http://localhost:8082";
export const TEST_APPLICATION_SERVER_BASE_URL =
    "http://localhost:" + (process.env.APP_SERVER === undefined ? "8082" : process.env.APP_SERVER);
export const DEFAULT_WEBSITE_BASE_PATH = "/auth";
export const DEFAULT_API_BASE_PATH = "/auth";
export const SIGN_IN_API = `${TEST_APPLICATION_SERVER_BASE_URL}/auth/signin`;
export const EMAIL_EXISTS_API = `${TEST_APPLICATION_SERVER_BASE_URL}/auth/signup/email/exists`;
export const SIGN_OUT_API = `${TEST_APPLICATION_SERVER_BASE_URL}/auth/signout`;
export const SIGN_UP_API = `${TEST_APPLICATION_SERVER_BASE_URL}/auth/signup`;
export const RESET_PASSWORD_TOKEN_API = `${TEST_APPLICATION_SERVER_BASE_URL}/auth/user/password/reset/token`;
export const RESET_PASSWORD_API = `${TEST_APPLICATION_SERVER_BASE_URL}/auth/user/password/reset`;
export const SEND_VERIFY_EMAIL_API = `${TEST_APPLICATION_SERVER_BASE_URL}/auth/user/email/verify/token`;
export const VERIFY_EMAIL_API = `${TEST_APPLICATION_SERVER_BASE_URL}/auth/user/email/verify`;
export const SIGN_IN_UP_API = `${TEST_APPLICATION_SERVER_BASE_URL}/auth/signinup`;
export const GET_AUTH_URL_API = `${TEST_APPLICATION_SERVER_BASE_URL}/auth/authorisationurl`;
export const ST_ROOT_SELECTOR = `#${ST_ROOT_ID}`;

export const SOMETHING_WENT_WRONG_ERROR = "Something went wrong. Please try again.";
