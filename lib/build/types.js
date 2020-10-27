"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mandatoryInputFields = exports.SuccessAction = exports.APIStatus = void 0;

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
var APIStatus;
exports.APIStatus = APIStatus;

(function(APIStatus) {
    APIStatus["FIELD_ERROR"] = "FIELD_ERROR";
    APIStatus["GENERAL_ERROR"] = "GENERAL_ERROR";
    APIStatus["OK"] = "OK";
    APIStatus["WRONG_CREDENTIALS_ERROR"] = "WRONG_CREDENTIALS_ERROR";
})(APIStatus || (exports.APIStatus = APIStatus = {}));

var SuccessAction;
exports.SuccessAction = SuccessAction;

(function(SuccessAction) {
    SuccessAction["SESSION_ALREADY_EXISTS"] = "SESSION_ALREADY_EXISTS";
    SuccessAction["SIGN_IN_COMPLETE"] = "SIGN_IN_COMPLETE";
    SuccessAction["SIGN_UP_COMPLETE"] = "SIGN_UP_COMPLETE";
})(SuccessAction || (exports.SuccessAction = SuccessAction = {}));

var mandatoryInputFields;
/*
 * Recipe Module Manager Config Types.
 */

exports.mandatoryInputFields = mandatoryInputFields;

(function(mandatoryInputFields) {
    mandatoryInputFields["EMAIL"] = "email";
    mandatoryInputFields["PASSWORD"] = "password";
})(mandatoryInputFields || (exports.mandatoryInputFields = mandatoryInputFields = {}));
