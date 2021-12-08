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
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../authRecipe/utils");
var validators_1 = require("../emailpassword/validators");
var validators_2 = require("./validators");
function normalisePasswordlessConfig(config) {
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
        },
        config.override
    );
    return __assign(__assign({}, utils_1.normaliseAuthRecipe(config)), {
        resendCodeTimeGapInSeconds:
            config.resendCodeTimeGapInSeconds === undefined ? 900 : config.resendCodeTimeGapInSeconds,
        validateEmailAddress:
            config.validateEmailAddress === undefined
                ? validators_1.defaultEmailValidator
                : config.validateEmailAddress,
        validatePhoneNumber:
            config.validatePhoneNumber === undefined
                ? validators_2.defaultPhoneNumberValidator
                : config.validatePhoneNumber,
        emailForm: __assign(__assign({}, config.emailForm), normalisePasswordlessBaseConfig(config.emailForm)),
        mobileForm: __assign(__assign({}, config.mobileForm), normalisePasswordlessBaseConfig(config.mobileForm)),
        userInputCodeForm: normalisePasswordlessBaseConfig(config.userInputCodeForm),
        linkClickedScreen: normalisePasswordlessBaseConfig(config.linkClickedScreen),
        contactMethod: config.contactMethod,
        override: override,
    });
}
exports.normalisePasswordlessConfig = normalisePasswordlessConfig;
function normalisePasswordlessBaseConfig(config) {
    var style = config && config.style !== undefined ? config.style : {};
    return __assign(__assign({}, config), { style: style });
}
