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
var min_1 = require("libphonenumber-js/min");
var utils_1 = require("../authRecipe/utils");
var validators_1 = require("./validators");
function normalisePasswordlessConfig(config) {
    if (!["EMAIL", "PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod)) {
        throw new Error("Please pass one of 'PHONE' or 'EMAIL' as the contactMethod");
    }
    var signInUpFeature = normalizeSignInUpFeatureConfig(config.signInUpFeature, config);
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
        },
        config.override
    );
    var validateEmailAddress = validators_1.defaultEmailValidator;
    if (
        (config.contactMethod === "EMAIL" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validateEmailAddress !== undefined
    ) {
        validateEmailAddress = config.validateEmailAddress;
    } else if (config.contactMethod === "EMAIL_OR_PHONE") {
        validateEmailAddress = validators_1.defaultEmailValidatorForCombinedInput;
    }
    var validatePhoneNumber = validators_1.defaultPhoneNumberValidator;
    if (
        (config.contactMethod === "PHONE" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validatePhoneNumber !== undefined
    ) {
        validatePhoneNumber = config.validatePhoneNumber;
    } else if (config.contactMethod === "EMAIL_OR_PHONE") {
        validatePhoneNumber = validators_1.defaultPhoneNumberValidatorForCombinedInput;
    }
    return __assign(__assign({}, utils_1.normaliseAuthRecipe(config)), {
        validateEmailAddress: validateEmailAddress,
        validatePhoneNumber: validatePhoneNumber,
        signInUpFeature: signInUpFeature,
        linkClickedScreenFeature: normalisePasswordlessBaseConfig(config.linkClickedScreenFeature),
        contactMethod: config.contactMethod,
        override: override,
    });
}
exports.normalisePasswordlessConfig = normalisePasswordlessConfig;
function normalizeSignInUpFeatureConfig(signInUpInput, config) {
    if (
        (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.resendCodeTimeGapInSeconds) !==
            undefined &&
        signInUpInput.resendCodeTimeGapInSeconds <= 0
    ) {
        throw new Error("Please pass a positive number as resendCodeTimeGapInSeconds");
    }
    var signInUpFeature = __assign(__assign({}, signInUpInput), {
        resendCodeTimeGapInSeconds:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.resendCodeTimeGapInSeconds) ===
            undefined
                ? 60
                : signInUpInput.resendCodeTimeGapInSeconds,
        emailOrPhoneFormStyle:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.emailOrPhoneFormStyle) !==
            undefined
                ? signInUpInput.emailOrPhoneFormStyle
                : {},
        linkSentScreenStyle:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.linkSentScreenStyle) !==
            undefined
                ? signInUpInput.linkSentScreenStyle
                : {},
        userInputCodeFormStyle:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.userInputCodeFormStyle) !==
            undefined
                ? signInUpInput.userInputCodeFormStyle
                : {},
        closeTabScreenStyle:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.closeTabScreenStyle) !==
            undefined
                ? signInUpInput.closeTabScreenStyle
                : {},
        defaultCountry:
            ["PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod) &&
            signInUpInput !== undefined &&
            "defaultCountry" in signInUpInput
                ? signInUpInput.defaultCountry
                : undefined,
        guessInternationPhoneNumberFromInputPhoneNumber:
            config.contactMethod === "EMAIL_OR_PHONE" &&
            signInUpInput !== undefined &&
            "guessInternationPhoneNumberFromInputPhoneNumber" in signInUpInput &&
            signInUpInput.guessInternationPhoneNumberFromInputPhoneNumber !== undefined
                ? signInUpInput.guessInternationPhoneNumberFromInputPhoneNumber
                : defaultGuessInternationPhoneNumberFromInputPhoneNumber,
    });
    return signInUpFeature;
}
function normalisePasswordlessBaseConfig(config) {
    var style = config && config.style !== undefined ? config.style : {};
    return __assign(__assign({}, config), { style: style });
}
function defaultGuessInternationPhoneNumberFromInputPhoneNumber(value, defaultCountryFromConfig) {
    if (defaultCountryFromConfig !== undefined) {
        try {
            return min_1.parsePhoneNumber(value, defaultCountryFromConfig).formatInternational();
        } catch (_a) {
            // The lib couldn't make sense of it, so we keep it unchanged
        }
    }
    return value;
}
exports.defaultGuessInternationPhoneNumberFromInputPhoneNumber = defaultGuessInternationPhoneNumberFromInputPhoneNumber;
