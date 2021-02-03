"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Enums.
 */
var MANDATORY_FORM_FIELDS_ID;
(function(MANDATORY_FORM_FIELDS_ID) {
    MANDATORY_FORM_FIELDS_ID["EMAIL"] = "email";
    MANDATORY_FORM_FIELDS_ID["PASSWORD"] = "password";
})((MANDATORY_FORM_FIELDS_ID = exports.MANDATORY_FORM_FIELDS_ID || (exports.MANDATORY_FORM_FIELDS_ID = {})));
exports.MANDATORY_FORM_FIELDS_ID_ARRAY = Object.values(MANDATORY_FORM_FIELDS_ID).filter(function(x) {
    return typeof x === "string";
});
exports.DEFAULT_RESET_PASSWORD_PATH = "/reset-password";
exports.DEFAULT_VERIFY_EMAIL_PATH = "/verify-email";
