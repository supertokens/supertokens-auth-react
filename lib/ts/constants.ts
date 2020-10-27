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
 * Enums.
 */

export enum API_RESPONSE_STATUS {
    FIELD_ERROR = "FIELD_ERROR",
    GENERAL_ERROR = "GENERAL_ERROR",
    OK = "OK",
    WRONG_CREDENTIALS_ERROR = "WRONG_CREDENTIALS_ERROR"
}

export enum SuccessAction {
    SESSION_ALREADY_EXISTS = "SESSION_ALREADY_EXISTS",
    SIGN_IN_COMPLETE = "SIGN_IN_COMPLETE",
    SIGN_UP_COMPLETE = "SIGN_UP_COMPLETE"
}

export enum MANDATORY_FORM_FIELDS_ID {
    EMAIL = "email",
    PASSWORD = "password"
}

export const RECIPE_ID_QUERY_PARAM = "rid";

export const DEFAULT_API_BASE_PATH = "/auth";

export const DEFAULT_WEBSITE_BASE_PATH = "/auth";

export const ST_ROOT_CONTAINER = "supertokens-root";

export const MANDATORY_FORM_FIELDS_ID_ARRAY = (<any>Object).values(MANDATORY_FORM_FIELDS_ID);
