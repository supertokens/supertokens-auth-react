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
var tslib_1 = require("tslib");
var min_1 = tslib_1.__importStar(require("libphonenumber-js/min"));
var utils_1 = require("../authRecipe/utils");
var validators_1 = require("./validators");
var utils_2 = tslib_1.__importDefault(require("supertokens-web-js/recipe/passwordless/utils"));
function normalisePasswordlessConfig(config) {
    if (!["EMAIL", "PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod)) {
        throw new Error("Please pass one of 'PHONE', 'EMAIL' or 'EMAIL_OR_PHONE' as the contactMethod");
    }
    var signInUpFeature = normalizeSignInUpFeatureConfig(config.signInUpFeature, config);
    var override = tslib_1.__assign(
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
    return tslib_1.__assign(tslib_1.__assign({}, utils_1.normaliseAuthRecipe(config)), {
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
        (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.resendEmailOrSMSGapInSeconds) !==
            undefined &&
        signInUpInput.resendEmailOrSMSGapInSeconds <= 0
    ) {
        throw new Error("Please pass a positive number as resendEmailOrSMSGapInSeconds");
    }
    var signInUpFeature = tslib_1.__assign(tslib_1.__assign({}, signInUpInput), {
        resendEmailOrSMSGapInSeconds:
            (signInUpInput === null || signInUpInput === void 0
                ? void 0
                : signInUpInput.resendEmailOrSMSGapInSeconds) === undefined
                ? 15
                : signInUpInput.resendEmailOrSMSGapInSeconds,
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
    return tslib_1.__assign(tslib_1.__assign({}, config), { style: style });
}
function defaultGuessInternationPhoneNumberFromInputPhoneNumber(value, defaultCountryFromConfig) {
    var _a;
    if (defaultCountryFromConfig !== undefined) {
        try {
            return (_a = min_1.default(value, {
                defaultCountry: defaultCountryFromConfig,
                extract: false,
            })) === null || _a === void 0
                ? void 0
                : _a.formatInternational();
        } catch (_b) {
            // The lib couldn't make sense of it, so we keep it unchanged
        }
    }
    // This function "extracts" phone numbers from the string, e.g.: "asd2gmail.com" -> "2"
    var incomplete = min_1.parseIncompletePhoneNumber(value);
    // If the incomplete/extracted phonenumber is less than half the input we assume it's not a phone number.
    // I.e.: if less than half of the input is numbers
    if (value.includes("@") || incomplete.length < value.length / 2) {
        return undefined;
    }
    return value;
}
exports.defaultGuessInternationPhoneNumberFromInputPhoneNumber = defaultGuessInternationPhoneNumberFromInputPhoneNumber;
function getLoginAttemptInfo(input) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.getLoginAttemptInfo({
                            userContext: input.userContext,
                        }),
                    ];
                case 1:
                    return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getLoginAttemptInfo = getLoginAttemptInfo;
function setLoginAttemptInfo(input) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.setLoginAttemptInfo({
                            userContext: input.userContext,
                            attemptInfo: input.attemptInfo,
                        }),
                    ];
                case 1:
                    return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.setLoginAttemptInfo = setLoginAttemptInfo;
/**
 * These functions are helper functions so that the logic can be exposed from both
 * passwordless and thirdpartypasswordless recipes without having to duplicate code
 */
function createCode(input) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, utils_2.default.createCode(input)];
        });
    });
}
exports.createCode = createCode;
function resendCode(input) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, utils_2.default.resendCode(input)];
        });
    });
}
exports.resendCode = resendCode;
function consumeCode(input) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, utils_2.default.consumeCode(input)];
        });
    });
}
exports.consumeCode = consumeCode;
