"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");

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
 * defaultEmailValidator.
 */
function defaultEmailValidator(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        var defaultEmailValidatorRegexp;
        return genericComponentOverrideContext.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "ERROR_EMAIL_NON_STRING"];
            }
            value = value.trim();
            defaultEmailValidatorRegexp =
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // We check if the email syntax is correct
            // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
            // Regex from https://stackoverflow.com/a/46181/3867175
            if (value.match(defaultEmailValidatorRegexp) === null) {
                return [2 /*return*/, "ERROR_EMAIL_INVALID"];
            }
            return [2 /*return*/, undefined];
        });
    });
}
/*
 * defaultPasswordValidator.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */
function defaultPasswordValidator(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        return genericComponentOverrideContext.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "ERROR_PASSWORD_NON_STRING"];
            }
            // length >= 8 && < 100
            // must have a number and a character
            // as per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
            if (value.length < 8) {
                return [2 /*return*/, "ERROR_PASSWORD_TOO_SHORT"];
            }
            if (value.length >= 100) {
                return [2 /*return*/, "ERROR_PASSWORD_TOO_LONG"];
            }
            if (value.match(/^.*[A-Za-z]+.*$/) === null) {
                return [2 /*return*/, "ERROR_PASSWORD_NO_ALPHA"];
            }
            if (value.match(/^.*[0-9]+.*$/) === null) {
                return [2 /*return*/, "ERROR_PASSWORD_NO_NUM"];
            }
            return [2 /*return*/, undefined];
        });
    });
}
/*
 * defaultLoginPasswordValidator.
 * type string
 */
function defaultLoginPasswordValidator(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        return genericComponentOverrideContext.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "ERROR_PASSWORD_NON_STRING"];
            }
            return [2 /*return*/, undefined];
        });
    });
}
/*
 * defaultValidate
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function defaultValidate(_) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        return genericComponentOverrideContext.__generator(this, function (_a) {
            return [2 /*return*/, undefined];
        });
    });
}

exports.defaultEmailValidator = defaultEmailValidator;
exports.defaultLoginPasswordValidator = defaultLoginPasswordValidator;
exports.defaultPasswordValidator = defaultPasswordValidator;
exports.defaultValidate = defaultValidate;
