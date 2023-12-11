"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var windowHandler = require("supertokens-web-js/utils/windowHandler");

var phoneNumberUtilsImport;
function getPhoneNumberUtils() {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        var global;
        return genericComponentOverrideContext.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, preloadPhoneNumberUtils()];
                case 1:
                    _a.sent();
                    global = windowHandler.WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe();
                    return [2 /*return*/, global.intlTelInputUtils];
            }
        });
    });
}
function preloadPhoneNumberUtils() {
    if (phoneNumberUtilsImport === undefined) {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore: We need to disable no implicit any here, otherwise we'd need to add types for this module
        phoneNumberUtilsImport = Promise.resolve().then(function () {
            return require("./utils.js");
        });
        /* eslint-enable @typescript-eslint/ban-ts-comment */
    }
    return phoneNumberUtilsImport;
}

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
function defaultEmailValidator(value) {
    if (typeof value !== "string") {
        return "GENERAL_ERROR_EMAIL_NON_STRING";
    }
    value = value.trim();
    var defaultEmailValidatorRegexp =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // We check if the email syntax is correct
    // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
    // Regex from https://stackoverflow.com/a/46181/3867175
    if (value.match(defaultEmailValidatorRegexp) === null) {
        return "GENERAL_ERROR_EMAIL_INVALID";
    }
    return undefined;
}
function defaultPhoneNumberValidator(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        var intlTelInputUtils;
        return genericComponentOverrideContext.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof value !== "string") {
                        return [2 /*return*/, "GENERAL_ERROR_PHONE_NON_STRING"];
                    }
                    value = value.trim();
                    return [4 /*yield*/, getPhoneNumberUtils()];
                case 1:
                    intlTelInputUtils = _a.sent();
                    if (!intlTelInputUtils.isValidNumber(value, undefined)) {
                        return [2 /*return*/, "GENERAL_ERROR_PHONE_INVALID"];
                    }
                    return [2 /*return*/, undefined];
            }
        });
    });
}
function defaultEmailValidatorForCombinedInput(value) {
    if (typeof value !== "string") {
        return "GENERAL_ERROR_EMAIL_OR_PHONE_NON_STRING";
    }
    value = value.trim();
    var defaultEmailValidatorRegexp =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // We check if the email syntax is correct
    // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
    // Regex from https://stackoverflow.com/a/46181/3867175
    if (value.match(defaultEmailValidatorRegexp) === null) {
        return "GENERAL_ERROR_EMAIL_OR_PHONE_INVALID";
    }
    return undefined;
}
function defaultPhoneNumberValidatorForCombinedInput(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        var intlTelInputUtils;
        return genericComponentOverrideContext.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof value !== "string") {
                        return [2 /*return*/, "GENERAL_ERROR_EMAIL_OR_PHONE_NON_STRING"];
                    }
                    value = value.trim();
                    return [4 /*yield*/, getPhoneNumberUtils()];
                case 1:
                    intlTelInputUtils = _a.sent();
                    if (!intlTelInputUtils.isValidNumber(value, undefined)) {
                        return [2 /*return*/, "GENERAL_ERROR_EMAIL_OR_PHONE_INVALID"];
                    }
                    return [2 /*return*/, undefined];
            }
        });
    });
}
function userInputCodeValidate(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        return genericComponentOverrideContext.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "GENERAL_ERROR_OTP_NON_STRING"];
            }
            if (value.length === 0) {
                return [2 /*return*/, "GENERAL_ERROR_OTP_EMPTY"];
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
function defaultGuessInternationPhoneNumberFromInputPhoneNumber(value, defaultCountryFromConfig) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        var intlTelInputUtils,
            libGuess,
            phoneNumberCharCount,
            filteredInput,
            countryData,
            matchingCountryCodes,
            _i,
            matchingCountryCodes_1,
            code,
            defaultCountry;
        return genericComponentOverrideContext.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (value === undefined || value.length === 0) {
                        return [2 /*return*/, value];
                    }
                    return [4 /*yield*/, getPhoneNumberUtils()];
                case 1:
                    intlTelInputUtils = _a.sent();
                    libGuess = intlTelInputUtils.formatNumber(
                        value,
                        defaultCountryFromConfig,
                        intlTelInputUtils.numberFormat.E164
                    );
                    if (intlTelInputUtils.isValidNumber(libGuess, defaultCountryFromConfig)) {
                        return [2 /*return*/, libGuess];
                    }
                    phoneNumberCharCount = (value.match(/(\d|[+\-().])/g) || []).length;
                    // If the number of valid characters for a phonenumber is less than half the input we assume it's not a phone number.
                    // I.e.: if less than half of the input is numbers or in: "+-()."
                    if (value.includes("@") || phoneNumberCharCount < value.length / 2) {
                        return [2 /*return*/, undefined];
                    }
                    filteredInput = "+" + value.replace(/\D/g, "").replace(/^00/, "");
                    if (intlTelInputUtils.isValidNumber(filteredInput, defaultCountryFromConfig)) {
                        return [
                            2 /*return*/,
                            intlTelInputUtils.formatNumber(
                                filteredInput,
                                defaultCountryFromConfig,
                                intlTelInputUtils.numberFormat.E164
                            ),
                        ];
                    }
                    countryData = windowHandler.WindowHandlerReference.getReferenceOrThrow()
                        .windowHandler.getWindowUnsafe()
                        .intlTelInputGlobals.getCountryData();
                    matchingCountryCodes = countryData
                        .filter(function (c) {
                            return filteredInput.startsWith("+" + c.dialCode);
                        })
                        .map(function (c) {
                            return c.iso2;
                        });
                    for (
                        _i = 0, matchingCountryCodes_1 = matchingCountryCodes;
                        _i < matchingCountryCodes_1.length;
                        _i++
                    ) {
                        code = matchingCountryCodes_1[_i];
                        if (intlTelInputUtils.isValidNumber(filteredInput, code)) {
                            return [
                                2 /*return*/,
                                intlTelInputUtils.formatNumber(
                                    filteredInput,
                                    code,
                                    intlTelInputUtils.numberFormat.E164
                                ),
                            ];
                        }
                    }
                    if (defaultCountryFromConfig) {
                        defaultCountry = countryData.find(function (c) {
                            return c.iso2 === defaultCountryFromConfig.toLowerCase();
                        });
                        if (defaultCountry) {
                            return [2 /*return*/, "+" + defaultCountry.dialCode + filteredInput.substring(1)];
                        }
                    }
                    // We want to return the value as an international number because the phone number input lib expects it this way
                    return [2 /*return*/, filteredInput];
            }
        });
    });
}

exports.defaultEmailValidator = defaultEmailValidator;
exports.defaultEmailValidatorForCombinedInput = defaultEmailValidatorForCombinedInput;
exports.defaultGuessInternationPhoneNumberFromInputPhoneNumber = defaultGuessInternationPhoneNumberFromInputPhoneNumber;
exports.defaultPhoneNumberValidator = defaultPhoneNumberValidator;
exports.defaultPhoneNumberValidatorForCombinedInput = defaultPhoneNumberValidatorForCombinedInput;
exports.defaultValidate = defaultValidate;
exports.getPhoneNumberUtils = getPhoneNumberUtils;
exports.preloadPhoneNumberUtils = preloadPhoneNumberUtils;
exports.userInputCodeValidate = userInputCodeValidate;
