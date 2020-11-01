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
    WRONG_CREDENTIALS_ERROR = "WRONG_CREDENTIALS_ERROR",
    RESET_PASSWORD_INVALID_TOKEN_ERROR = "RESET_PASSWORD_INVALID_TOKEN_ERROR"
}

export enum SUCCESS_ACTION {
    SESSION_ALREADY_EXISTS = "SESSION_ALREADY_EXISTS",
    SIGN_IN_COMPLETE = "SIGN_IN_COMPLETE",
    SIGN_UP_COMPLETE = "SIGN_UP_COMPLETE",
    RESET_PASSWORD_EMAIL_SENT = "RESET_PASSWORD_EMAIL_SENT",
    PASSWORD_RESET_SUCCESSFUL = "PASSWORD_RESET_SUCCESSFUL"
}

export enum MANDATORY_FORM_FIELDS_ID {
    EMAIL = "email",
    PASSWORD = "password"
}

export const MANDATORY_FORM_FIELDS_ID_ARRAY = (<any>Object).values(MANDATORY_FORM_FIELDS_ID);

export const DEFAULT_RESET_PASSWORD_PATH = "/reset-password";
