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
 * Enums.
 */

export enum API_RESPONSE_STATUS {
    FIELD_ERROR = "FIELD_ERROR",
    GENERAL_ERROR = "GENERAL_ERROR",
    OK = "OK",
    WRONG_CREDENTIALS_ERROR = "WRONG_CREDENTIALS_ERROR",
    RESET_PASSWORD_INVALID_TOKEN_ERROR = "RESET_PASSWORD_INVALID_TOKEN_ERROR",
    EMAIL_VERIFICATION_INVALID_TOKEN_ERROR = "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR",
    EMAIL_ALREADY_VERIFIED_ERROR = "EMAIL_ALREADY_VERIFIED_ERROR"
}

export enum FORM_BASE_API_RESPONSE {
    OK = "OK",
    FIELD_ERROR = "FIELD_ERROR",
    GENERAL_ERROR = "GENERAL_ERROR"
}

export enum EMAIL_PASSWORD_AUTH_STATE {
    LOADING = "LOADING",
    READY = "READY"
}

export enum SIGN_IN_AND_UP_STATUS {
    LOADING = "LOADING",
    READY = "READY",
    SUCCESSFUL = "SUCCESSFUL"
}

export enum SEND_VERIFY_EMAIL_STATUS {
    READY = "READY",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}

export enum ENTER_EMAIL_STATUS {
    READY = "READY",
    SENT = "SENT"
}

export enum SUBMIT_NEW_PASSWORD_STATUS {
    READY = "READY",
    SUCCESS = "SUCCESS"
}

export enum VERIFY_EMAIL_LINK_CLICKED_STATUS {
    LOADING = "LOADING",
    INVALID = "INVALID",
    GENERAL_ERROR = "GENERAL_ERROR",
    SUCCESSFUL = "SUCCESSFUL"
}

export enum FORM_BASE_STATUS {
    IN_PROGRESS = "IN_PROGRESS",
    READY = "READY",
    LOADING = "LOADING",
    FIELD_ERRORS = "FIELD_ERRORS",
    SUCCESS = "SUCCESS",
    GENERAL_ERROR = "GENERAL_ERROR"
}

export enum MANDATORY_FORM_FIELDS_ID {
    EMAIL = "email",
    PASSWORD = "password"
}

export enum EMAIL_VERIFICATION_MODE {
    OFF = "OFF",
    REQUIRED = "REQUIRED"
}

export const MANDATORY_FORM_FIELDS_ID_ARRAY = Object.values(MANDATORY_FORM_FIELDS_ID).filter(
    x => typeof x === "string"
);

export const DEFAULT_RESET_PASSWORD_PATH = "/reset-password";
export const DEFAULT_VERIFY_EMAIL_PATH = "/verify-email";
