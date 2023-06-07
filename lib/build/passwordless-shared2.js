"use strict";

var utils = require("./utils.js");
var PasswordlessWebJS = require("supertokens-web-js/recipe/passwordless");
var utils$1 = require("./authRecipe-shared.js");
var WebJSUtils = require("supertokens-web-js/recipe/passwordless/utils");
var windowHandler = require("supertokens-web-js/utils/windowHandler");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var PasswordlessWebJS__default = /*#__PURE__*/ _interopDefault(PasswordlessWebJS);
var WebJSUtils__default = /*#__PURE__*/ _interopDefault(WebJSUtils);

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) {
        return utils.__assign(utils.__assign({}, originalImp), {
            createCode: function (input) {
                return utils.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return utils.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.createCode(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "PASSWORDLESS_CODE_SENT",
                                        isResend: false,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            resendCode: function (input) {
                return utils.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return utils.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.resendCode(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "RESTART_FLOW_ERROR") {
                                    onHandleEvent({
                                        action: "PASSWORDLESS_RESTART_FLOW",
                                    });
                                } else if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "PASSWORDLESS_CODE_SENT",
                                        isResend: true,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            consumeCode: function (input) {
                return utils.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return utils.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.consumeCode(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "RESTART_FLOW_ERROR") {
                                    onHandleEvent({
                                        action: "PASSWORDLESS_RESTART_FLOW",
                                    });
                                } else if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "SUCCESS",
                                        isNewUser: response.createdNewUser,
                                        user: response.user,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            setLoginAttemptInfo: function (input) {
                return utils.__awaiter(this, void 0, void 0, function () {
                    return utils.__generator(this, function (_a) {
                        return [
                            2 /*return*/,
                            originalImp.setLoginAttemptInfo(
                                utils.__assign(utils.__assign({}, input), {
                                    attemptInfo: utils.__assign(
                                        utils.__assign({}, input.attemptInfo),
                                        input.userContext.additionalAttemptInfo
                                    ),
                                })
                            ),
                        ];
                    });
                });
            },
        });
    };
};

var phoneNumberUtilsImport;
function getPhoneNumberUtils() {
    return utils.__awaiter(this, void 0, void 0, function () {
        var global;
        return utils.__generator(this, function (_a) {
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
            return require("./utils2.js");
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
    return utils.__awaiter(this, void 0, void 0, function () {
        var intlTelInputUtils;
        return utils.__generator(this, function (_a) {
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
    return utils.__awaiter(this, void 0, void 0, function () {
        var intlTelInputUtils;
        return utils.__generator(this, function (_a) {
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
    return utils.__awaiter(this, void 0, void 0, function () {
        return utils.__generator(this, function (_a) {
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
    return utils.__awaiter(this, void 0, void 0, function () {
        return utils.__generator(this, function (_a) {
            return [2 /*return*/, undefined];
        });
    });
}
function defaultGuessInternationPhoneNumberFromInputPhoneNumber(value, defaultCountryFromConfig) {
    return utils.__awaiter(this, void 0, void 0, function () {
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
        return utils.__generator(this, function (_a) {
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
function normalisePasswordlessConfig(config) {
    if (config === undefined) {
        throw new Error("Passwordless config should not be empty");
    }
    if (!["EMAIL", "PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod)) {
        throw new Error("Please pass one of 'PHONE', 'EMAIL' or 'EMAIL_OR_PHONE' as the contactMethod");
    }
    var signInUpFeature = normalizeSignInUpFeatureConfig(config.signInUpFeature, config);
    var override = utils.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    var validateEmailAddress = defaultEmailValidator;
    if (
        (config.contactMethod === "EMAIL" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validateEmailAddress !== undefined
    ) {
        validateEmailAddress = config.validateEmailAddress;
    } else if (config.contactMethod === "EMAIL_OR_PHONE") {
        validateEmailAddress = defaultEmailValidatorForCombinedInput;
    }
    var validatePhoneNumber = defaultPhoneNumberValidator;
    if (
        (config.contactMethod === "PHONE" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validatePhoneNumber !== undefined
    ) {
        validatePhoneNumber = config.validatePhoneNumber;
    } else if (config.contactMethod === "EMAIL_OR_PHONE") {
        validatePhoneNumber = defaultPhoneNumberValidatorForCombinedInput;
    }
    return utils.__assign(utils.__assign({}, utils$1.normaliseAuthRecipe(config)), {
        validateEmailAddress: validateEmailAddress,
        validatePhoneNumber: validatePhoneNumber,
        signInUpFeature: signInUpFeature,
        linkClickedScreenFeature: normalisePasswordlessBaseConfig(config.linkClickedScreenFeature),
        contactMethod: config.contactMethod,
        override: override,
    });
}
function normalizeSignInUpFeatureConfig(signInUpInput, config) {
    if (
        (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.resendEmailOrSMSGapInSeconds) !==
            undefined &&
        signInUpInput.resendEmailOrSMSGapInSeconds <= 0
    ) {
        throw new Error("Please pass a positive number as resendEmailOrSMSGapInSeconds");
    }
    var signInUpFeature = utils.__assign(utils.__assign({}, signInUpInput), {
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
                : "",
        linkSentScreenStyle:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.linkSentScreenStyle) !==
            undefined
                ? signInUpInput.linkSentScreenStyle
                : "",
        userInputCodeFormStyle:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.userInputCodeFormStyle) !==
            undefined
                ? signInUpInput.userInputCodeFormStyle
                : "",
        closeTabScreenStyle:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.closeTabScreenStyle) !==
            undefined
                ? signInUpInput.closeTabScreenStyle
                : "",
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
    var style = config && config.style !== undefined ? config.style : "";
    return utils.__assign(utils.__assign({}, config), { style: style });
}
function getLoginAttemptInfo(input) {
    return utils.__awaiter(this, void 0, void 0, function () {
        return utils.__generator(this, function (_a) {
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
function setLoginAttemptInfo(input) {
    return utils.__awaiter(this, void 0, void 0, function () {
        return utils.__generator(this, function (_a) {
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
/**
 * These functions are helper functions so that the logic can be exposed from both
 * passwordless and thirdpartypasswordless recipes without having to duplicate code
 */
function createCode(input) {
    return utils.__awaiter(this, void 0, void 0, function () {
        return utils.__generator(this, function (_a) {
            return [2 /*return*/, WebJSUtils__default.default.createCode(input)];
        });
    });
}
function resendCode(input) {
    return utils.__awaiter(this, void 0, void 0, function () {
        return utils.__generator(this, function (_a) {
            return [2 /*return*/, WebJSUtils__default.default.resendCode(input)];
        });
    });
}
function consumeCode(input) {
    return utils.__awaiter(this, void 0, void 0, function () {
        return utils.__generator(this, function (_a) {
            return [2 /*return*/, WebJSUtils__default.default.consumeCode(input)];
        });
    });
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
/*
 * Class.
 */
var Passwordless = /** @class */ (function (_super) {
    utils.__extends(Passwordless, _super);
    function Passwordless(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = PasswordlessWebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.getDefaultRedirectionURL = function (context) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        return _this;
    }
    Passwordless.init = function (config) {
        var normalisedConfig = normalisePasswordlessConfig(config);
        return {
            authReact: function (appInfo) {
                Passwordless.instance = new Passwordless(
                    utils.__assign(utils.__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: Passwordless.RECIPE_ID,
                    })
                );
                return Passwordless.instance;
            },
            webJS: PasswordlessWebJS__default.default.init(
                utils.__assign(utils.__assign({}, normalisedConfig), {
                    override: {
                        functions: function (originalImpl, builder) {
                            var functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                            builder.override(functions);
                            builder.override(normalisedConfig.override.functions);
                            return originalImpl;
                        },
                    },
                })
            ),
        };
    };
    Passwordless.getInstanceOrThrow = function () {
        if (Passwordless.instance === undefined) {
            var error =
                "No instance of Passwordless found. Make sure to call the Passwordless.init method." +
                "See https://supertokens.io/docs/passwordless/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + utils.SSR_ERROR;
            }
            throw Error(error);
        }
        return Passwordless.instance;
    };
    /*
     * Tests methods.
     */
    Passwordless.reset = function () {
        if (!utils.isTest()) {
            return;
        }
        Passwordless.instance = undefined;
        return;
    };
    Passwordless.RECIPE_ID = "passwordless";
    return Passwordless;
})(utils$1.AuthRecipe);

exports.Passwordless = Passwordless;
exports.consumeCode = consumeCode;
exports.createCode = createCode;
exports.defaultEmailValidator = defaultEmailValidator;
exports.defaultValidate = defaultValidate;
exports.getLoginAttemptInfo = getLoginAttemptInfo;
exports.getPhoneNumberUtils = getPhoneNumberUtils;
exports.normalisePasswordlessConfig = normalisePasswordlessConfig;
exports.preloadPhoneNumberUtils = preloadPhoneNumberUtils;
exports.resendCode = resendCode;
exports.setLoginAttemptInfo = setLoginAttemptInfo;
exports.userInputCodeValidate = userInputCodeValidate;
