"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_VERIFY_EMAIL_PATH = exports.DEFAULT_RESET_PASSWORD_PATH = exports.MANDATORY_FORM_FIELDS_ID_ARRAY = exports.MANDATORY_FORM_FIELDS_ID = exports.SUCCESS_ACTION = exports.API_RESPONSE_STATUS = void 0;

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
var API_RESPONSE_STATUS;
exports.API_RESPONSE_STATUS = API_RESPONSE_STATUS;

(function(API_RESPONSE_STATUS) {
    API_RESPONSE_STATUS["FIELD_ERROR"] = "FIELD_ERROR";
    API_RESPONSE_STATUS["GENERAL_ERROR"] = "GENERAL_ERROR";
    API_RESPONSE_STATUS["OK"] = "OK";
    API_RESPONSE_STATUS["WRONG_CREDENTIALS_ERROR"] = "WRONG_CREDENTIALS_ERROR";
    API_RESPONSE_STATUS["RESET_PASSWORD_INVALID_TOKEN_ERROR"] = "RESET_PASSWORD_INVALID_TOKEN_ERROR";
    API_RESPONSE_STATUS["EMAIL_VERIFICATION_INVALID_TOKEN_ERROR"] = "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
})(API_RESPONSE_STATUS || (exports.API_RESPONSE_STATUS = API_RESPONSE_STATUS = {}));

var SUCCESS_ACTION;
exports.SUCCESS_ACTION = SUCCESS_ACTION;

(function(SUCCESS_ACTION) {
    SUCCESS_ACTION["SESSION_ALREADY_EXISTS"] = "SESSION_ALREADY_EXISTS";
    SUCCESS_ACTION["SIGN_IN_COMPLETE"] = "SIGN_IN_COMPLETE";
    SUCCESS_ACTION["SIGN_UP_COMPLETE"] = "SIGN_UP_COMPLETE";
    SUCCESS_ACTION["RESET_PASSWORD_EMAIL_SENT"] = "RESET_PASSWORD_EMAIL_SENT";
    SUCCESS_ACTION["PASSWORD_RESET_SUCCESSFUL"] = "PASSWORD_RESET_SUCCESSFUL";
    SUCCESS_ACTION["VERIFY_EMAIL_SENT"] = "VERIFY_EMAIL_SENT";
    SUCCESS_ACTION["EMAIL_VERIFIED_SUCCESSFUL"] = "EMAIL_VERIFIED_SUCCESSFUL";
})(SUCCESS_ACTION || (exports.SUCCESS_ACTION = SUCCESS_ACTION = {}));

var MANDATORY_FORM_FIELDS_ID;
exports.MANDATORY_FORM_FIELDS_ID = MANDATORY_FORM_FIELDS_ID;

(function(MANDATORY_FORM_FIELDS_ID) {
    MANDATORY_FORM_FIELDS_ID["EMAIL"] = "email";
    MANDATORY_FORM_FIELDS_ID["PASSWORD"] = "password";
})(MANDATORY_FORM_FIELDS_ID || (exports.MANDATORY_FORM_FIELDS_ID = MANDATORY_FORM_FIELDS_ID = {}));

var MANDATORY_FORM_FIELDS_ID_ARRAY = Object.values(MANDATORY_FORM_FIELDS_ID).filter(function(x) {
    return typeof x === "string";
});
exports.MANDATORY_FORM_FIELDS_ID_ARRAY = MANDATORY_FORM_FIELDS_ID_ARRAY;
var DEFAULT_RESET_PASSWORD_PATH = "/reset-password";
exports.DEFAULT_RESET_PASSWORD_PATH = DEFAULT_RESET_PASSWORD_PATH;
var DEFAULT_VERIFY_EMAIL_PATH = "/verify-email";
exports.DEFAULT_VERIFY_EMAIL_PATH = DEFAULT_VERIFY_EMAIL_PATH;
