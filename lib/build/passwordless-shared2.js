"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var PasswordlessWebJS = require("supertokens-web-js/recipe/passwordless");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var jsxRuntime = require("react/jsx-runtime");
var utils = require("./authRecipe-shared.js");
var recipe = require("./multifactorauth-shared.js");
var windowHandler = require("supertokens-web-js/utils/windowHandler");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var PasswordlessWebJS__default = /*#__PURE__*/ _interopDefault(PasswordlessWebJS);

var LinkIcon = function () {
    return jsxRuntime.jsxs(
        "svg",
        genericComponentOverrideContext.__assign(
            { xmlns: "http://www.w3.org/2000/svg", width: "19", height: "16", viewBox: "0 0 19 16", fill: "none" },
            {
                children: [
                    jsxRuntime.jsx("path", {
                        d: "M10.9871 11.7876C10.2967 11.7898 9.61895 11.6022 9.0279 11.2453C8.43684 10.8885 7.95517 10.3762 7.63545 9.76427C7.31574 9.15235 7.17027 8.46436 7.21492 7.7754C7.25958 7.08644 7.49264 6.42298 7.88867 5.85745C7.99951 5.70075 8.16806 5.59449 8.35725 5.56206C8.54643 5.52963 8.74075 5.57368 8.89745 5.68452C9.05416 5.79536 9.16042 5.96391 9.19285 6.15309C9.22528 6.34228 9.18123 6.53659 9.07039 6.6933C8.75488 7.13913 8.60843 7.68273 8.65728 8.22672C8.70614 8.77071 8.9471 9.27952 9.337 9.662C9.55327 9.87943 9.81039 10.052 10.0936 10.1697C10.3767 10.2874 10.6804 10.348 10.9871 10.348C11.2938 10.348 11.5974 10.2874 11.8806 10.1697C12.1638 10.052 12.4209 9.87943 12.6372 9.662L16.9605 5.33865C17.3767 4.89673 17.6045 4.31005 17.5954 3.70303C17.5863 3.09602 17.3411 2.51642 16.9118 2.08715C16.4826 1.65788 15.903 1.4127 15.296 1.40362C14.6889 1.39454 14.1023 1.62226 13.6603 2.03849L11.8229 3.87592C11.7557 3.9431 11.676 3.99639 11.5882 4.03275C11.5004 4.06911 11.4063 4.08782 11.3113 4.08782C11.2163 4.08782 11.1222 4.06911 11.0345 4.03275C10.9467 3.99639 10.8669 3.9431 10.7997 3.87592C10.7325 3.80873 10.6793 3.72897 10.6429 3.64119C10.6065 3.55341 10.5878 3.45933 10.5878 3.36432C10.5878 3.26931 10.6065 3.17522 10.6429 3.08744C10.6793 2.99966 10.7325 2.91991 10.7997 2.85272L12.6372 1.0153C13.3543 0.347081 14.3028 -0.0167022 15.2828 0.000589365C16.2628 0.017881 17.1979 0.414897 17.891 1.108C18.5841 1.80109 18.9811 2.73616 18.9984 3.7162C19.0157 4.69623 18.6519 5.64472 17.9837 6.36184L13.6603 10.6852C13.309 11.0356 12.8921 11.3133 12.4334 11.5025C11.9747 11.6916 11.4832 11.7885 10.9871 11.7876Z",
                        fill: "#1485FF",
                    }),
                    jsxRuntime.jsx("path", {
                        d: "M3.7826 15.3866C3.03483 15.3879 2.3035 15.1672 1.68132 14.7524C1.05914 14.3376 0.574138 13.7474 0.287796 13.0567C0.00145422 12.3659 -0.0733288 11.6057 0.0729281 10.8723C0.219185 10.139 0.579895 9.46563 1.10933 8.93756L5.43268 4.61421C5.78326 4.26285 6.20004 3.9845 6.65891 3.79526C7.11777 3.60603 7.6096 3.50966 8.10595 3.51175C9.10694 3.5154 10.0666 3.91118 10.7792 4.61421C11.4078 5.23969 11.7952 6.06714 11.873 6.95048C11.9508 7.83382 11.7139 8.71624 11.2043 9.44195C11.0935 9.59865 10.925 9.70491 10.7358 9.73734C10.5466 9.76977 10.3523 9.72572 10.1956 9.61488C10.0389 9.50404 9.93261 9.33549 9.90018 9.14631C9.86774 8.95712 9.91179 8.7628 10.0226 8.6061C10.3381 8.16027 10.4846 7.61667 10.4357 7.07268C10.3869 6.52869 10.1459 6.01988 9.75603 5.6374C9.32308 5.18824 8.72968 4.92911 8.10595 4.91684C7.7967 4.92053 7.49134 4.9862 7.20792 5.10997C6.92449 5.23373 6.66877 5.41308 6.45587 5.6374L2.13252 9.96075C1.71629 10.4027 1.48857 10.9894 1.49765 11.5964C1.50673 12.2034 1.75191 12.783 2.18118 13.2122C2.61045 13.6415 3.19005 13.8867 3.79706 13.8958C4.40407 13.9049 4.99075 13.6771 5.43268 13.2609L7.2701 11.4235C7.33729 11.3563 7.41704 11.303 7.50482 11.2666C7.5926 11.2303 7.68669 11.2116 7.7817 11.2116C7.87671 11.2116 7.97079 11.2303 8.05857 11.2666C8.14635 11.303 8.22611 11.3563 8.29329 11.4235C8.36048 11.4907 8.41377 11.5704 8.45013 11.6582C8.48649 11.746 8.5052 11.8401 8.5052 11.9351C8.5052 12.0301 8.48649 12.1242 8.45013 12.212C8.41377 12.2997 8.36048 12.3795 8.29329 12.4467L6.45587 14.2841C6.10457 14.6345 5.68765 14.9122 5.22896 15.1014C4.77026 15.2906 4.27877 15.3875 3.7826 15.3866Z",
                        fill: "#1485FF",
                    }),
                ],
            }
        )
    );
};

var OTPIcon = function () {
    return jsxRuntime.jsxs(
        "svg",
        genericComponentOverrideContext.__assign(
            { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "23", viewBox: "0 4 22 23", fill: "none" },
            {
                children: [
                    jsxRuntime.jsx("path", {
                        d: "M7.56428 15.8664L5.26639 18.1643C5.11403 18.3167 4.90738 18.4023 4.69192 18.4023C4.47645 18.4023 4.2698 18.3167 4.11744 18.1643C3.96508 18.012 3.87949 17.8053 3.87949 17.5898C3.87949 17.3744 3.96508 17.1677 4.11744 17.0154L6.41533 14.7175C6.56769 14.5651 6.77434 14.4795 6.98981 14.4795C7.20528 14.4795 7.41192 14.5651 7.56428 14.7175C7.71664 14.8698 7.80224 15.0765 7.80224 15.292C7.80224 15.5074 7.71664 15.7141 7.56428 15.8664Z",
                        fill: "#73B6FF",
                    }),
                    jsxRuntime.jsx("path", {
                        d: "M5.17026 13.4675L1.72342 16.9143C1.57106 17.0667 1.36442 17.1523 1.14895 17.1523C0.933477 17.1523 0.726833 17.0667 0.574473 16.9143C0.422113 16.762 0.336519 16.5553 0.336519 16.3398C0.336519 16.1244 0.422113 15.9177 0.574473 15.7654L4.02131 12.3185C4.17367 12.1662 4.38032 12.0806 4.59579 12.0806C4.81125 12.0806 5.0179 12.1662 5.17026 12.3185C5.32262 12.4709 5.40821 12.6775 5.40821 12.893C5.40821 13.1085 5.32262 13.3151 5.17026 13.4675Z",
                        fill: "#73B6FF",
                    }),
                    jsxRuntime.jsx("path", {
                        d: "M10.0492 18.1315L6.60233 21.5784C6.44997 21.7307 6.24332 21.8163 6.02785 21.8163C5.81238 21.8163 5.60574 21.7307 5.45338 21.5784C5.30102 21.426 5.21542 21.2194 5.21542 21.0039C5.21542 20.7884 5.30102 20.5818 5.45338 20.4294L8.90022 16.9826C9.05258 16.8302 9.25922 16.7446 9.47469 16.7446C9.69016 16.7446 9.89681 16.8302 10.0492 16.9826C10.2015 17.135 10.2871 17.3416 10.2871 17.5571C10.2871 17.7725 10.2015 17.9792 10.0492 18.1315Z",
                        fill: "#73B6FF",
                    }),
                    jsxRuntime.jsx("path", {
                        d: "M16.935 4.28797L4.96211 8.24925C4.38349 8.47179 4.29448 9.27295 4.87309 9.49549L8.96789 11.3649L14.8876 7.13653L10.6592 13.0562L12.5286 17.151C12.7956 17.6851 13.5523 17.6406 13.7303 17.0175L17.6916 5.04462C17.8696 4.59953 17.4246 4.15444 16.935 4.28797Z",
                        fill: "url(#paint0_linear_3828_8733)",
                    }),
                    jsxRuntime.jsx("defs", {
                        children: jsxRuntime.jsxs(
                            "linearGradient",
                            genericComponentOverrideContext.__assign(
                                {
                                    id: "paint0_linear_3828_8733",
                                    x1: "16.9576",
                                    y1: "4.56946",
                                    x2: "9.50502",
                                    y2: "12.0221",
                                    gradientUnits: "userSpaceOnUse",
                                },
                                {
                                    children: [
                                        jsxRuntime.jsx("stop", { stopColor: "#5FABFF" }),
                                        jsxRuntime.jsx("stop", { offset: "1", stopColor: "#1485FF" }),
                                    ],
                                }
                            )
                        ),
                    }),
                ],
            }
        )
    );
};

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) {
        return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImp), {
            createCode: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
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
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
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
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
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
                                        isNewRecipeUser: response.createdNewRecipeUser,
                                        user: response.user,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            setLoginAttemptInfo: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        return [
                            2 /*return*/,
                            originalImp.setLoginAttemptInfo(
                                genericComponentOverrideContext.__assign(
                                    genericComponentOverrideContext.__assign({}, input),
                                    {
                                        attemptInfo: genericComponentOverrideContext.__assign(
                                            genericComponentOverrideContext.__assign({}, input.attemptInfo),
                                            input.userContext.additionalAttemptInfo
                                        ),
                                    }
                                )
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
    var override = genericComponentOverrideContext.__assign(
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
    return genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, utils.normaliseAuthRecipe(config)),
        {
            validateEmailAddress: validateEmailAddress,
            validatePhoneNumber: validatePhoneNumber,
            signInUpFeature: signInUpFeature,
            linkClickedScreenFeature: normalisePasswordlessBaseConfig(config.linkClickedScreenFeature),
            contactMethod: config.contactMethod,
            override: override,
        }
    );
}
function normalizeSignInUpFeatureConfig(signInUpInput, config) {
    if (
        (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.resendEmailOrSMSGapInSeconds) !==
            undefined &&
        signInUpInput.resendEmailOrSMSGapInSeconds <= 0
    ) {
        throw new Error("Please pass a positive number as resendEmailOrSMSGapInSeconds");
    }
    var signInUpFeature = genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, signInUpInput),
        {
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
        }
    );
    return signInUpFeature;
}
function normalisePasswordlessBaseConfig(config) {
    var style = config && config.style !== undefined ? config.style : "";
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, config), {
        style: style,
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
    genericComponentOverrideContext.__extends(Passwordless, _super);
    function Passwordless(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = PasswordlessWebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Passwordless.RECIPE_ID;
        _this.getDefaultRedirectionURL = function (context) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        return _this;
    }
    Passwordless.init = function (config) {
        var normalisedConfig = normalisePasswordlessConfig(config);
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var mfa = recipe.MultiFactorAuth.getInstance();
            if (mfa !== undefined) {
                mfa.addMFAFactors(
                    ["otp-phone", "otp-email", "link-phone", "link-email"],
                    [
                        {
                            id: "otp-phone",
                            name: "SMS based OTP",
                            description: "Get an OTP code on your phone to complete the authentication request",
                            path: "/check-auth/otp-phone",
                            logo: OTPIcon,
                        },
                        {
                            id: "link-phone",
                            name: "SMS based Magic link",
                            description: "Get a magic link on your phone to complete the authentication request",
                            path: "/check-auth/link-phone",
                            logo: LinkIcon,
                        },
                        {
                            id: "otp-email",
                            name: "SMS based OTP",
                            description: "Get an OTP code on your email address to complete the authentication request",
                            path: "/check-auth/otp-email",
                            logo: OTPIcon,
                        },
                        {
                            id: "link-email",
                            name: "SMS based Magic link",
                            description:
                                "Get a magic link on your email address to complete the authentication request",
                            path: "/check-auth/link-email",
                            logo: LinkIcon,
                        },
                    ]
                );
            }
        });
        return {
            recipeID: Passwordless.RECIPE_ID,
            authReact: function (appInfo) {
                Passwordless.instance = new Passwordless(
                    genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, normalisedConfig),
                        { appInfo: appInfo, recipeId: Passwordless.RECIPE_ID }
                    )
                );
                return Passwordless.instance;
            },
            webJS: PasswordlessWebJS__default.default.init(
                genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, normalisedConfig),
                    {
                        override: {
                            functions: function (originalImpl, builder) {
                                var functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                                builder.override(functions);
                                builder.override(normalisedConfig.override.functions);
                                return originalImpl;
                            },
                        },
                    }
                )
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
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return Passwordless.instance;
    };
    /*
     * Tests methods.
     */
    Passwordless.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Passwordless.instance = undefined;
        return;
    };
    Passwordless.RECIPE_ID = "passwordless";
    return Passwordless;
})(utils.AuthRecipe);

exports.Passwordless = Passwordless;
exports.defaultEmailValidator = defaultEmailValidator;
exports.defaultValidate = defaultValidate;
exports.getPhoneNumberUtils = getPhoneNumberUtils;
exports.normalisePasswordlessConfig = normalisePasswordlessConfig;
exports.preloadPhoneNumberUtils = preloadPhoneNumberUtils;
exports.userInputCodeValidate = userInputCodeValidate;
