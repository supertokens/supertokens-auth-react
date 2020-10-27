"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MANDATORY_FORM_FIELDS_ID_ARRAY = exports.ST_ROOT_CONTAINER = exports.DEFAULT_WEBSITE_BASE_PATH = exports.DEFAULT_API_BASE_PATH = exports.RECIPE_ID_QUERY_PARAM = exports.MANDATORY_FORM_FIELDS_ID = exports.SuccessAction = exports.API_RESPONSE_STATUS = void 0;

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
})(API_RESPONSE_STATUS || (exports.API_RESPONSE_STATUS = API_RESPONSE_STATUS = {}));

var SuccessAction;
exports.SuccessAction = SuccessAction;

(function(SuccessAction) {
    SuccessAction["SESSION_ALREADY_EXISTS"] = "SESSION_ALREADY_EXISTS";
    SuccessAction["SIGN_IN_COMPLETE"] = "SIGN_IN_COMPLETE";
    SuccessAction["SIGN_UP_COMPLETE"] = "SIGN_UP_COMPLETE";
})(SuccessAction || (exports.SuccessAction = SuccessAction = {}));

var MANDATORY_FORM_FIELDS_ID;
exports.MANDATORY_FORM_FIELDS_ID = MANDATORY_FORM_FIELDS_ID;

(function(MANDATORY_FORM_FIELDS_ID) {
    MANDATORY_FORM_FIELDS_ID["EMAIL"] = "email";
    MANDATORY_FORM_FIELDS_ID["PASSWORD"] = "password";
})(MANDATORY_FORM_FIELDS_ID || (exports.MANDATORY_FORM_FIELDS_ID = MANDATORY_FORM_FIELDS_ID = {}));

var RECIPE_ID_QUERY_PARAM = "rid";
exports.RECIPE_ID_QUERY_PARAM = RECIPE_ID_QUERY_PARAM;
var DEFAULT_API_BASE_PATH = "/auth";
exports.DEFAULT_API_BASE_PATH = DEFAULT_API_BASE_PATH;
var DEFAULT_WEBSITE_BASE_PATH = "/auth";
exports.DEFAULT_WEBSITE_BASE_PATH = DEFAULT_WEBSITE_BASE_PATH;
var ST_ROOT_CONTAINER = "supertokens-root";
exports.ST_ROOT_CONTAINER = ST_ROOT_CONTAINER;
var MANDATORY_FORM_FIELDS_ID_ARRAY = Object.values(MANDATORY_FORM_FIELDS_ID);
exports.MANDATORY_FORM_FIELDS_ID_ARRAY = MANDATORY_FORM_FIELDS_ID_ARRAY;
