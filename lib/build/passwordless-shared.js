"use strict";

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var authWidgetWrapper = require("./authRecipe-shared.js");
var recipe = require("./recipe.js");
var utils$3 = require("./utils.js");
var index = require("./index3.js");
var React = require("react");
var translationContext = require("./translationContext.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
require("./index.js");
var session = require("./session-shared2.js");
var spinnerIcon = require("./spinnerIcon.js");
var button = require("./emailpassword-shared.js");

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== "default") {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(
                    n,
                    k,
                    d.get
                        ? d
                        : {
                              enumerable: true,
                              get: function () {
                                  return e[k];
                              },
                          }
                );
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/ _interopNamespaceDefault(React);

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
var phoneNumberUtilsImport = Promise.resolve().then(function () {
    return require("./utils2.js");
});
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
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        return sessionAuth.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof value !== "string") {
                        return [2 /*return*/, "GENERAL_ERROR_PHONE_NON_STRING"];
                    }
                    value = value.trim();
                    return [4 /*yield*/, phoneNumberUtilsImport];
                case 1:
                    _a.sent();
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
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        return sessionAuth.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof value !== "string") {
                        return [2 /*return*/, "GENERAL_ERROR_EMAIL_OR_PHONE_NON_STRING"];
                    }
                    value = value.trim();
                    return [4 /*yield*/, phoneNumberUtilsImport];
                case 1:
                    _a.sent();
                    if (!intlTelInputUtils.isValidNumber(value, undefined)) {
                        return [2 /*return*/, "GENERAL_ERROR_EMAIL_OR_PHONE_INVALID"];
                    }
                    return [2 /*return*/, undefined];
            }
        });
    });
}
function userInputCodeValidate(value) {
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        return sessionAuth.__generator(this, function (_a) {
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
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        return sessionAuth.__generator(this, function (_a) {
            return [2 /*return*/, undefined];
        });
    });
}
function defaultGuessInternationPhoneNumberFromInputPhoneNumber(value, defaultCountryFromConfig) {
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        var libGuess,
            phoneNumberCharCount,
            onlyNumbers,
            countryData,
            matchingCountryCodes,
            _i,
            matchingCountryCodes_1,
            code,
            defaultCountry;
        return sessionAuth.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (value === undefined || value.length === 0) {
                        return [2 /*return*/, value];
                    }
                    return [4 /*yield*/, phoneNumberUtilsImport];
                case 1:
                    _a.sent();
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
                    onlyNumbers = value.replace(/\D/g, "");
                    if (intlTelInputUtils.isValidNumber(onlyNumbers, defaultCountryFromConfig)) {
                        return [
                            2 /*return*/,
                            intlTelInputUtils.formatNumber(
                                onlyNumbers,
                                defaultCountryFromConfig,
                                intlTelInputUtils.numberFormat.E164
                            ),
                        ];
                    }
                    countryData = window.intlTelInputGlobals.getCountryData();
                    matchingCountryCodes = countryData
                        .filter(function (c) {
                            return onlyNumbers.startsWith(c.dialCode);
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
                        if (intlTelInputUtils.isValidNumber(onlyNumbers, code)) {
                            return [
                                2 /*return*/,
                                intlTelInputUtils.formatNumber(onlyNumbers, code, intlTelInputUtils.numberFormat.E164),
                            ];
                        }
                    }
                    if (defaultCountryFromConfig) {
                        defaultCountry = countryData.find(function (c) {
                            return c.iso2 === defaultCountryFromConfig.toLowerCase();
                        });
                        if (defaultCountry) {
                            return [2 /*return*/, "+" + defaultCountry.dialCode + onlyNumbers];
                        }
                    }
                    // We want to return the value as an international number because the phone number input lib expects it this way
                    return [2 /*return*/, "+" + onlyNumbers];
            }
        });
    });
}

var utils$2 = {};

var utils$1 = {};

var utils = {};

Object.defineProperty(utils, "__esModule", { value: true });
utils.normaliseAuthRecipe = void 0;
/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
var utils_1$2 = utils$3.utils;
function normaliseAuthRecipe(config) {
    return (0, utils_1$2.normaliseRecipeModuleConfig)(config);
}
utils.normaliseAuthRecipe = normaliseAuthRecipe;

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
var __assign$1 =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__assign) ||
    function () {
        __assign$1 =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign$1.apply(this, arguments);
    };
var __awaiter$1 =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator$1 =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
Object.defineProperty(utils$1, "__esModule", { value: true });
utils$1.consumeCode = utils$1.resendCode = utils$1.createCode = utils$1.normaliseUserInput = void 0;
var utils_1$1 = recipe.utils;
var utils_2 = utils;
function normaliseUserInput(config) {
    var override = __assign$1(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return __assign$1(__assign$1({}, (0, utils_2.normaliseAuthRecipe)(config)), { override: override });
}
utils$1.normaliseUserInput = normaliseUserInput;
/**
 * These functions are helper functions so that the logic can be exposed from both
 * passwordless and thirdpartypasswordless recipes without having to duplicate code
 */
function createCode$1(input) {
    return __awaiter$1(this, void 0, void 0, function () {
        var normalisedUserContext, createCodeResponse;
        return __generator$1(this, function (_a) {
            switch (_a.label) {
                case 0:
                    normalisedUserContext = (0, utils_1$1.getNormalisedUserContext)(input.userContext);
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.createCode(
                            __assign$1(__assign$1({}, input), { userContext: normalisedUserContext })
                        ),
                    ];
                case 1:
                    createCodeResponse = _a.sent();
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.setLoginAttemptInfo({
                            attemptInfo: {
                                deviceId: createCodeResponse.deviceId,
                                preAuthSessionId: createCodeResponse.preAuthSessionId,
                                flowType: createCodeResponse.flowType,
                            },
                            userContext: normalisedUserContext,
                        }),
                    ];
                case 2:
                    _a.sent();
                    return [2 /*return*/, createCodeResponse];
            }
        });
    });
}
utils$1.createCode = createCode$1;
function resendCode$1(input) {
    return __awaiter$1(this, void 0, void 0, function () {
        var normalisedUserContext, previousAttemptInfo;
        return __generator$1(this, function (_a) {
            switch (_a.label) {
                case 0:
                    normalisedUserContext = (0, utils_1$1.getNormalisedUserContext)(input.userContext);
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.getLoginAttemptInfo({
                            userContext: normalisedUserContext,
                        }),
                    ];
                case 1:
                    previousAttemptInfo = _a.sent();
                    /**
                     * If previousAttemptInfo is undefined then local storage was probably cleared by another tab.
                     * In this case we use empty strings when calling the API because we want to
                     * return "RESTART_FLOW_ERROR"
                     */
                    return [
                        2 /*return*/,
                        input.recipeImplementation.resendCode(
                            __assign$1(__assign$1({}, input), {
                                userContext: normalisedUserContext,
                                deviceId: previousAttemptInfo === undefined ? "" : previousAttemptInfo.deviceId,
                                preAuthSessionId:
                                    previousAttemptInfo === undefined ? "" : previousAttemptInfo.preAuthSessionId,
                            })
                        ),
                    ];
            }
        });
    });
}
utils$1.resendCode = resendCode$1;
function consumeCode$1(input) {
    return __awaiter$1(this, void 0, void 0, function () {
        var normalisedUserContext, additionalParams, attemptInfoFromStorage, linkCode, preAuthSessionId;
        return __generator$1(this, function (_a) {
            switch (_a.label) {
                case 0:
                    normalisedUserContext = (0, utils_1$1.getNormalisedUserContext)(input.userContext);
                    if (!("userInputCode" in input)) return [3 /*break*/, 2];
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.getLoginAttemptInfo({
                            userContext: normalisedUserContext,
                        }),
                    ];
                case 1:
                    attemptInfoFromStorage = _a.sent();
                    /**
                     * If attemptInfoFromStorage is undefined then local storage was probably cleared by another tab.
                     * In this case we use empty strings when calling the API because we want to
                     * return "RESTART_FLOW_ERROR"
                     *
                     * Note: We dont do this for the linkCode flow because that does not depend on local storage.
                     */
                    additionalParams = {
                        userInputCode: input.userInputCode,
                        deviceId: attemptInfoFromStorage === undefined ? "" : attemptInfoFromStorage.deviceId,
                        preAuthSessionId:
                            attemptInfoFromStorage === undefined ? "" : attemptInfoFromStorage.preAuthSessionId,
                    };
                    return [3 /*break*/, 3];
                case 2:
                    linkCode = input.recipeImplementation.getLinkCodeFromURL({
                        userContext: input.userContext,
                    });
                    preAuthSessionId = input.recipeImplementation.getPreAuthSessionIdFromURL({
                        userContext: input.userContext,
                    });
                    additionalParams = {
                        linkCode: linkCode,
                        preAuthSessionId: preAuthSessionId,
                    };
                    _a.label = 3;
                case 3:
                    return [
                        2 /*return*/,
                        input.recipeImplementation.consumeCode(
                            __assign$1({ userContext: normalisedUserContext, options: input.options }, additionalParams)
                        ),
                    ];
            }
        });
    });
}
utils$1.consumeCode = consumeCode$1;

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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

(function (exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;

    let d = utils$1;

    if (d.default !== undefined) {
        __export(d);
    } else {
        __export({
            default: d,
            ...d,
        });
    }
})(utils$2);

var WebJSUtils = /*@__PURE__*/ recipe.getDefaultExportFromCjs(utils$2);

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
    if (!["EMAIL", "PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod)) {
        throw new Error("Please pass one of 'PHONE', 'EMAIL' or 'EMAIL_OR_PHONE' as the contactMethod");
    }
    var signInUpFeature = normalizeSignInUpFeatureConfig(config.signInUpFeature, config);
    var override = sessionAuth.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
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
    return sessionAuth.__assign(sessionAuth.__assign({}, authWidgetWrapper.normaliseAuthRecipe(config)), {
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
    var signInUpFeature = sessionAuth.__assign(sessionAuth.__assign({}, signInUpInput), {
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
    return sessionAuth.__assign(sessionAuth.__assign({}, config), { style: style });
}
function getLoginAttemptInfo(input) {
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        return sessionAuth.__generator(this, function (_a) {
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
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        return sessionAuth.__generator(this, function (_a) {
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
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        return sessionAuth.__generator(this, function (_a) {
            return [2 /*return*/, WebJSUtils.createCode(input)];
        });
    });
}
function resendCode(input) {
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        return sessionAuth.__generator(this, function (_a) {
            return [2 /*return*/, WebJSUtils.resendCode(input)];
        });
    });
}
function consumeCode(input) {
    return sessionAuth.__awaiter(this, void 0, void 0, function () {
        return sessionAuth.__generator(this, function (_a) {
            return [2 /*return*/, WebJSUtils.consumeCode(input)];
        });
    });
}

var recipeImplementation = {};

var constants = {};

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
Object.defineProperty(constants, "__esModule", { value: true });
constants.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY = void 0;
constants.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY = "supertokens-passwordless-loginAttemptInfo";

/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__assign) ||
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
var __awaiter =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
Object.defineProperty(recipeImplementation, "__esModule", { value: true });
var getRecipeImplementation_1 = (recipeImplementation.getRecipeImplementation = void 0);
var windowHandler_1 = recipe.windowHandler;
var querier_1 = index.querier;
var utils_1 = recipe.utils;
var constants_1 = constants;
function getRecipeImplementation$1(recipeImplInput) {
    var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
    return {
        createCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var bodyObj, _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if ("email" in input) {
                                bodyObj = {
                                    email: input.email,
                                };
                            }
                            if ("phoneNumber" in input) {
                                bodyObj = {
                                    phoneNumber: input.phoneNumber,
                                };
                            }
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/signinup/code",
                                    { body: JSON.stringify(bodyObj) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "PASSWORDLESS_CREATE_CODE",
                                        userContext: input.userContext,
                                        options: input.options,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "PASSWORDLESS_CREATE_CODE",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        resendCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var bodyObj, _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            bodyObj = {
                                deviceId: input.deviceId,
                                preAuthSessionId: input.preAuthSessionId,
                            };
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/signinup/code/resend",
                                    { body: JSON.stringify(bodyObj) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "PASSWORDLESS_RESEND_CODE",
                                        userContext: input.userContext,
                                        options: input.options,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "PASSWORDLESS_RESEND_CODE",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [
                                2 /*return*/,
                                {
                                    status: jsonBody.status,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        consumeCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var bodyObj, _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if ("userInputCode" in input) {
                                bodyObj = {
                                    userInputCode: input.userInputCode,
                                    deviceId: input.deviceId,
                                    preAuthSessionId: input.preAuthSessionId,
                                };
                            } else {
                                bodyObj = {
                                    linkCode: input.linkCode,
                                    preAuthSessionId: input.preAuthSessionId,
                                };
                            }
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/signinup/code/consume",
                                    { body: JSON.stringify(bodyObj) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "PASSWORDLESS_CONSUME_CODE",
                                        userContext: input.userContext,
                                        options: input.options,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "PASSWORDLESS_CONSUME_CODE",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [2 /*return*/, __assign(__assign({}, jsonBody), { fetchResponse: fetchResponse })];
                    }
                });
            });
        },
        getLinkCodeFromURL: function () {
            return (0, utils_1.getHashFromLocation)();
        },
        getPreAuthSessionIdFromURL: function () {
            var idFromQuery = (0, utils_1.getQueryParams)("preAuthSessionId");
            if (idFromQuery === undefined) {
                return "";
            }
            return idFromQuery;
        },
        doesEmailExist: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.get(
                                    "/signup/email/exists",
                                    {},
                                    { email: input.email },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "EMAIL_EXISTS",
                                        userContext: input.userContext,
                                        options: input.options,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "EMAIL_EXISTS",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [
                                2 /*return*/,
                                {
                                    status: jsonBody.status,
                                    doesExist: jsonBody.exists,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        doesPhoneNumberExist: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, jsonBody, fetchResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.get(
                                    "/signup/phoneNumber/exists",
                                    {},
                                    { phoneNumber: input.phoneNumber },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "PHONE_NUMBER_EXISTS",
                                        userContext: input.userContext,
                                        options: input.options,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImplInput.postAPIHook,
                                        action: "PHONE_NUMBER_EXISTS",
                                        userContext: input.userContext,
                                    })
                                ),
                            ];
                        case 1:
                            (_a = _b.sent()), (jsonBody = _a.jsonBody), (fetchResponse = _a.fetchResponse);
                            return [
                                2 /*return*/,
                                {
                                    status: jsonBody.status,
                                    doesExist: jsonBody.exists,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        getLoginAttemptInfo: function () {
            return __awaiter(this, void 0, void 0, function () {
                var storedInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.getItem(
                                    constants_1.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY
                                ),
                            ];
                        case 1:
                            storedInfo = _a.sent();
                            if (storedInfo === null) {
                                return [2 /*return*/, undefined];
                            }
                            try {
                                return [2 /*return*/, JSON.parse(storedInfo)];
                            } catch (ex) {
                                return [2 /*return*/, undefined];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        setLoginAttemptInfo: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.setItem(
                                    constants_1.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY,
                                    JSON.stringify(
                                        __assign(
                                            {
                                                // This can make future changes/migrations a lot cleaner
                                                version: 1,
                                            },
                                            input.attemptInfo
                                        )
                                    )
                                ),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        clearLoginAttemptInfo: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    windowHandler_1.WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.removeItem(
                        constants_1.PASSWORDLESS_LOGIN_ATTEMPT_INFO_STORAGE_KEY
                    );
                    return [2 /*return*/];
                });
            });
        },
    };
}
recipeImplementation.default = getRecipeImplementation$1;
getRecipeImplementation_1 = recipeImplementation.getRecipeImplementation = getRecipeImplementation$1;

function getRecipeImplementation(recipeInput) {
    var webJsImplementation = getRecipeImplementation_1({
        recipeId: recipeInput.recipeId,
        appInfo: recipeInput.appInfo,
        preAPIHook: recipeInput.preAPIHook,
        postAPIHook: recipeInput.postAPIHook,
    });
    return {
        createCode: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.createCode.bind(this)(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
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
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.resendCode.bind(this)(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "RESTART_FLOW_ERROR") {
                                recipeInput.onHandleEvent({
                                    action: "PASSWORDLESS_RESTART_FLOW",
                                });
                            } else if (response.status === "OK") {
                                recipeInput.onHandleEvent({
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
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.consumeCode.bind(this)(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "RESTART_FLOW_ERROR") {
                                recipeInput.onHandleEvent({
                                    action: "PASSWORDLESS_RESTART_FLOW",
                                });
                            } else if (response.status === "OK") {
                                recipeInput.onHandleEvent({
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
        getLinkCodeFromURL: function (input) {
            return webJsImplementation.getLinkCodeFromURL.bind(this)(input);
        },
        getPreAuthSessionIdFromURL: function (input) {
            return webJsImplementation.getPreAuthSessionIdFromURL.bind(this)(input);
        },
        doesEmailExist: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.doesEmailExist.bind(this)(input)];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        doesPhoneNumberExist: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.doesPhoneNumberExist.bind(this)(input)];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        getLoginAttemptInfo: function (input) {
            return webJsImplementation.getLoginAttemptInfo.bind(this)(input);
        },
        setLoginAttemptInfo: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [2 /*return*/, webJsImplementation.setLoginAttemptInfo.bind(this)(input)];
                });
            });
        },
        clearLoginAttemptInfo: function (input) {
            return webJsImplementation.clearLoginAttemptInfo.bind(this)(input);
        },
    };
}

var styles =
    '/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n\n[data-supertokens~="container"] {\n    --palette-background: white;\n    --palette-inputBackground: #fafafa;\n    --palette-inputBorder: #fafafa;\n    --palette-selectedBackground: #eeeeee;\n    --palette-primary: #ff9b33;\n    --palette-primaryBorder: #ee8d23;\n    --palette-success: #41a700;\n    --palette-error: #ff1717;\n    --palette-textTitle: #222222;\n    --palette-textLabel: #222222;\n    --palette-textInput: #222222;\n    --palette-textPrimary: #656565;\n    --palette-textLink: #0076ff;\n    --palette-buttonText: white;\n    --palette-superTokensBrandingBackground: #f2f5f6;\n    --palette-superTokensBrandingText: #adbdc4;\n\n    --font-size-0: 12px;\n    --font-size-1: 14px;\n    --font-size-2: 16px;\n    --font-size-3: 19px;\n    --font-size-4: 24px;\n}\n\n/*\n * Default styles.\n */\n\n@-webkit-keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n\n@keyframes slideTop {\n    0% {\n        -webkit-transform: translateY(-5px);\n                transform: translateY(-5px);\n    }\n    100% {\n        -webkit-transform: translateY(0px);\n                transform: translateY(0px);\n    }\n}\n\n@-webkit-keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n\n@keyframes swing-in-top-fwd {\n    0% {\n        -webkit-transform: rotateX(-100deg);\n        transform: rotateX(-100deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 0;\n    }\n    100% {\n        -webkit-transform: rotateX(0deg);\n        transform: rotateX(0deg);\n        -webkit-transform-origin: top;\n        transform-origin: top;\n        opacity: 1;\n    }\n}\n\n[data-supertokens~="container"] {\n    font-family: Rubik, sans-serif;\n    margin: 12px auto;\n    margin-top: 26px;\n    margin-bottom: 26px;\n    width: 420px;\n    text-align: center;\n    border-radius: 8px;\n    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.16);\n    background-color: var(--palette-background);\n}\n\n@media (max-width: 440px) {\n    [data-supertokens~="container"] {\n        width: 95vw;\n    }\n}\n\n[data-supertokens~="row"] {\n    margin: 0 auto;\n    width: 76%;\n    padding-top: 30px;\n    padding-bottom: 10px;\n}\n\n[data-supertokens~="superTokensBranding"] {\n    display: block;\n    margin: 0 auto;\n    background: var(--palette-superTokensBrandingBackground);\n    color: var(--palette-superTokensBrandingText);\n    text-decoration: none;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-radius: 6px 6px 0 0;\n    padding: 4px 9px;\n    font-weight: 300;\n    font-size: var(--font-size-0);\n    letter-spacing: 0.4px;\n}\n\n[data-supertokens~="generalError"] {\n    background: var(--palette-error-bg);\n    padding-top: 10px;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n    padding-left: 18px;\n    padding-right: 18px;\n    letter-spacing: 0.2px;\n    font-size: var(--font-size-1);\n    border-radius: 8px;\n    color: var(--palette-error);\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    word-wrap: break-word;\n}\n\n[data-supertokens~="headerTitle"] {\n    font-size: var(--font-size-4);\n    line-height: 40px;\n    letter-spacing: 0.58px;\n    font-weight: 800;\n    margin-bottom: 2px;\n    color: var(--palette-textTitle);\n}\n\n[data-supertokens~="headerSubtitle"] {\n    margin-bottom: 21px;\n}\n\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] {\n    max-width: 300px;\n    margin-top: 10px;\n}\n\n[data-supertokens~="privacyPolicyAndTermsAndConditions"] a {\n    line-height: 21px;\n}\n\n/* TODO: split the link style into separate things*/\n\n/* We add this before primary and secondary text, because if they are applied to the same element the other ones take priority */\n\n[data-supertokens~="link"] {\n    padding-left: 3px;\n    padding-right: 3px;\n    color: var(--palette-textLink);\n    font-size: var(--font-size-1);\n    cursor: pointer;\n    letter-spacing: 0.16px;\n    line-height: 26px;\n}\n\n[data-supertokens~="primaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 500;\n    letter-spacing: 0.4px;\n    line-height: 21px;\n    color: var(--palette-textLabel);\n}\n\n[data-supertokens~="secondaryText"] {\n    font-size: var(--font-size-1);\n    font-weight: 300;\n    letter-spacing: 0.4px;\n    color: var(--palette-textPrimary);\n}\n\n[data-supertokens~="divider"] {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    border-bottom: 0.3px solid #dddddd;\n    align-items: center;\n    padding-bottom: 5px;\n}\n\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n\n[data-supertokens~="generalSuccess"] {\n    color: var(--palette-success);\n    font-size: var(--font-size-1);\n    background: var(--palette-success-bg);\n    -webkit-animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n            animation: swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n    padding: 9px 15px 9px 15px;\n    border-radius: 6px;\n    display: inline-block;\n}\n\n[data-supertokens~="spinner"] {\n    width: 80px;\n    height: auto;\n    padding-top: 20px;\n    padding-bottom: 40px;\n    margin: 0 auto;\n}\n\n[data-supertokens~="error"] {\n    color: var(--palette-error);\n}\n\n[data-supertokens~="linkButton"] {\n    background-color: transparent;\n    border: 0;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"] {\n    margin-top: 10px;\n    margin-bottom: 40px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"] svg {\n    margin-right: 0.3em;\n}\n\n[data-supertokens~="secondaryLinkWithLeftArrow"]:hover svg {\n    position: relative;\n    left: -4px;\n}\n\n[data-supertokens~="button"] {\n    background-color: var(--palette-primary);\n    color: var(--palette-buttonText);\n    width: 100%;\n    height: 34px;\n    font-weight: 700;\n    border-width: 1px;\n    border-style: solid;\n    border-radius: 6px;\n    border-color: var(--palette-primaryBorder);\n    background-position: center;\n    transition: all 0.4s;\n    background-size: 12000%;\n}\n\n[data-supertokens~="button"]:disabled {\n    border: none;\n    cursor: no-drop;\n}\n\n[data-supertokens~="button"]:active {\n    outline: none;\n    transition: all 0s;\n    background-size: 100%;\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n\n[data-supertokens~="button"]:focus {\n    outline: none;\n}\n\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    -webkit-filter: brightness(0.85);\n            filter: brightness(0.85);\n}\n\n[data-supertokens~="button"][data-supertokens~="brighten"]:active,\n[data-supertokens~="button"][data-supertokens~="brighten"]:hover {\n    -webkit-filter: brightness(1.1);\n            filter: brightness(1.1);\n}\n\n/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.\n *\n * This software is licensed under the Apache License, Version 2.0 (the\n * "License") as published by the Apache Software Foundation.\n *\n * You may not use this file except in compliance with the License. You may\n * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT\n * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n * License for the specific language governing permissions and limitations\n * under the License.\n */\n\n[data-supertokens~="inputContainer"] {\n    margin-top: 6px;\n}\n\n[data-supertokens~="inputWrapper"] {\n    box-sizing: border-box;\n    width: 100%;\n    display: flex;\n    align-items: center;\n    background-color: var(--palette-inputBackground);\n    height: 34px;\n    border-radius: 6px;\n    border: 1px solid var(--palette-inputBorder);\n}\n\n[data-supertokens~="inputWrapper"][focus-within] {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid var(--palette-primary);\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n\n[data-supertokens~="inputWrapper"]:focus-within {\n    background-color: rgba(var(--palette-inputBackground), 0.25);\n    border: 1px solid var(--palette-primary);\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-primary), 0.25);\n    outline: none;\n}\n\n[data-supertokens~="inputError"] {\n    border: 1px solid var(--palette-error);\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n\n[data-supertokens~="inputError"][focus-within] {\n    border: 1px solid var(--palette-error);\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n\n[data-supertokens~="inputError"]:focus-within {\n    border: 1px solid var(--palette-error);\n    box-shadow: 0 0 0 0.2rem rgba(var(--palette-error), 0.25);\n    outline: none;\n}\n\n[data-supertokens~="input"] {\n    box-sizing: border-box;\n    padding-left: 15px;\n    -webkit-filter: none;\n            filter: none;\n    color: var(--palette-textInput);\n    background-color: transparent;\n    border-radius: 6px;\n    font-size: var(--font-size-1);\n    border: none;\n    padding-right: 25px;\n    letter-spacing: 1.2px;\n    flex: 9 1 75%;\n    width: 75%;\n    height: 32px;\n}\n\n[data-supertokens~="input"]:focus {\n    border: none;\n    outline: none;\n}\n\n[data-supertokens~="input"]:-webkit-autofill,\n[data-supertokens~="input"]:-webkit-autofill:hover,\n[data-supertokens~="input"]:-webkit-autofill:focus,\n[data-supertokens~="input"]:-webkit-autofill:active {\n    -webkit-text-fill-color: var(--palette-textInput);\n    box-shadow: 0 0 0 30px var(--palette-inputBackground) inset;\n}\n\n[data-supertokens~="inputAdornment"] {\n    justify-content: center;\n    margin-right: 5px;\n}\n\n[data-supertokens~="showPassword"] {\n    cursor: pointer;\n}\n\n[data-supertokens~="forgotPasswordLink"] {\n    margin-top: 10px;\n}\n\n[data-supertokens~="enterEmailSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    word-break: break-word;\n}\n\n[data-supertokens~="submitNewPasswordSuccessMessage"] {\n    margin-top: 15px;\n    margin-bottom: 15px;\n}\n\n[data-supertokens~="inputErrorMessage"] {\n    padding-top: 5px;\n    padding-bottom: 5px;\n    color: var(--palette-error);\n    line-height: 24px;\n    font-weight: 400;\n    font-size: var(--font-size-1);\n    text-align: left;\n    -webkit-animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n            animation: slideTop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n    max-width: 330px;\n}\n\n@media (max-width: 440px) {\n    [data-supertokens~="inputErrorMessage"] {\n        max-width: 250px;\n    }\n}\n\n[data-supertokens~="inputErrorSymbol"] {\n    margin-right: 5px;\n    top: 1px;\n    position: relative;\n    left: 2px;\n}\n\n[data-supertokens~="label"] {\n    text-align: left;\n    font-weight: 600;\n    font-size: var(--font-size-1);\n    line-height: 24px;\n    color: var(--palette-textLabel);\n}\n\n[data-supertokens~="formRow"] {\n    display: flex;\n    flex-direction: column;\n    padding-top: 0px;\n    padding-bottom: 34px;\n}\n\n[data-supertokens~="formRow"][data-supertokens~="hasError"] {\n    padding-bottom: 0;\n}\n\n[data-supertokens~="sendVerifyEmailIcon"] {\n    margin-top: 11px;\n}\n\n[data-supertokens~="headerTinyTitle"] {\n    margin-top: 13px;\n    font-size: var(--font-size-3);\n    letter-spacing: 1.1px;\n    font-weight: 500;\n    line-height: 28px;\n}\n\n[data-supertokens~="sendVerifyEmailText"] {\n    line-height: 21px;\n    font-size: var(--font-size-1);\n    text-align: center;\n    font-weight: 300;\n    letter-spacing: 0.8px;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n    cursor: pointer;\n}\n\n[data-supertokens~="secondaryLinkWithArrow"]:hover {\n    position: relative;\n    left: 2px;\n    word-spacing: 4px;\n}\n\n[data-supertokens~="sendVerifyEmailResend"] {\n    margin-top: 13px;\n    font-weight: 300;\n}\n\n[data-supertokens~="sendVerifyEmailResend"]:hover {\n    text-decoration: underline;\n}\n\n[data-supertokens~="noFormRow"] {\n    padding-bottom: 25px;\n}\n\n[data-supertokens~="emailVerificationButtonWrapper"] {\n    padding-top: 25px;\n    max-width: 96px;\n    margin: 0 auto;\n}\n\n[data-supertokens~="resetPasswordHeaderTitle"] {\n    position: relative;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n[data-supertokens~="backButtonCommon"] {\n    width: 16px;\n    height: 13px;\n}\n\n[data-supertokens~="backButton"] {\n    cursor: pointer;\n    border: none;\n    background-color: transparent;\n    padding: 0px;\n}\n\n[data-supertokens~="backButtonPlaceholder"] {\n    display: block;\n}\n\n[data-supertokens~="resendEmailLink"] {\n    display: inline-block;\n}\n\n[data-supertokens~="generalSuccess"] {\n    margin-bottom: 20px;\n    -webkit-animation: swingIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate 2 both;\n            animation: swingIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate 2 both;\n}\n\n[data-supertokens~="codeInputLabelWrapper"] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n[data-supertokens~="headerSubtitle"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n[data-supertokens~="sendCodeText"] {\n    margin-top: 15px;\n    margin-bottom: 20px;\n}\n\n[data-supertokens~="sendCodeText"] strong {\n    max-width: 100%;\n    display: inline-block;\n    vertical-align: bottom;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n[data-supertokens~="resendCodeBtn"] {\n    width: auto;\n    margin-top: 0;\n    line-height: 24px;\n}\n\n[data-supertokens~="resendCodeBtn"]:hover {\n    text-decoration: underline;\n}\n\n[data-supertokens~="resendCodeBtn"]:disabled {\n    color: var(--palette-textPrimary);\n    cursor: default;\n    text-decoration: none;\n}\n\n[data-supertokens~="phoneInputLibRoot"] {\n    display: flex;\n    align-items: center;\n}\n\n[data-supertokens~="phoneInputWrapper"] {\n    display: flex;\n    align-items: center;\n}\n\n[data-supertokens~="phoneInputWrapper"] .iti {\n    flex: 1 1;\n    min-width: 0;\n    width: 100%;\n    background: transparent;\n    border: none;\n    color: inherit;\n    outline: none;\n}\n\n[data-supertokens~="continueButtonWrapper"] {\n    margin-top: 10px;\n    margin-bottom: 30px;\n}\n';

var ThemeBase = function (_a) {
    var children = _a.children,
        userStyles = _a.userStyles,
        loadDefaultFont = _a.loadDefaultFont;
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            children,
            loadDefaultFont &&
                jsxRuntime.jsx("link", {
                    href: "//fonts.googleapis.com/css?family=Rubik:wght@300;400;600;500;700",
                    rel: "stylesheet",
                    type: "text/css",
                }),
            jsxRuntime.jsxs("style", { children: [styles, userStyles.join("\n")] }),
        ],
    });
};

var PasswordlessCloseTabScreen = function () {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    sessionAuth.__assign(
                        { "data-supertokens": "row noFormRow" },
                        {
                            children: [
                                jsxRuntime.jsx(utils$3.CheckedRoundIcon, {}),
                                jsxRuntime.jsx(
                                    "div",
                                    sessionAuth.__assign(
                                        { "data-supertokens": "headerTitle" },
                                        { children: t("PWLESS_CLOSE_TAB_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                jsxRuntime.jsxs(
                                    "div",
                                    sessionAuth.__assign(
                                        { "data-supertokens": "headerSubtitle secondaryText" },
                                        {
                                            children: [
                                                t("PWLESS_CLOSE_TAB_SUBTITLE_LINE1"),
                                                jsxRuntime.jsx("br", {}),
                                                t("PWLESS_CLOSE_TAB_SUBTITLE_LINE2"),
                                            ],
                                        }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
var CloseTabScreen = index.withOverride("PasswordlessCloseTabScreen", PasswordlessCloseTabScreen);

var SignInUpFooter = index.withOverride("PasswordlessSignInUpFooter", function PasswordlessSignInUpFooter(_a) {
    var termsOfServiceLink = _a.termsOfServiceLink,
        privacyPolicyLink = _a.privacyPolicyLink;
    var t = translationContext.useTranslation();
    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }
    return jsxRuntime.jsxs(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions" },
            {
                children: [
                    t("PWLESS_SIGN_IN_UP_FOOTER_START"),
                    termsOfServiceLink !== undefined &&
                        jsxRuntime.jsx(
                            "a",
                            sessionAuth.__assign(
                                {
                                    "data-supertokens": "link",
                                    href: termsOfServiceLink,
                                    target: "_blank",
                                    rel: "noopener noreferer",
                                },
                                { children: t("PWLESS_SIGN_IN_UP_FOOTER_TOS") }
                            )
                        ),
                    termsOfServiceLink !== undefined &&
                        privacyPolicyLink !== undefined &&
                        t("PWLESS_SIGN_IN_UP_FOOTER_AND"),
                    privacyPolicyLink !== undefined &&
                        jsxRuntime.jsx(
                            "a",
                            sessionAuth.__assign(
                                {
                                    "data-supertokens": "link",
                                    href: privacyPolicyLink,
                                    target: "_blank",
                                    rel: "noopener noreferer",
                                },
                                { children: t("PWLESS_SIGN_IN_UP_FOOTER_PP") }
                            )
                        ),
                    t("PWLESS_SIGN_IN_UP_FOOTER_END"),
                ],
            }
        )
    );
});

var EmailForm = index.withOverride("PasswordlessEmailForm", function PasswordlessEmailForm(props) {
    var _this = this;
    var userContext = sessionAuth.useUserContext();
    return jsxRuntime.jsx(arrowLeftIcon.FormBase, {
        clearError: props.clearError,
        onError: props.onError,
        formFields: [
            {
                id: "email",
                label: "PWLESS_SIGN_IN_UP_EMAIL_LABEL",
                optional: false,
                autofocus: true,
                placeholder: "",
                // We are using the default validator that allows any string
                validate: arrowLeftIcon.defaultValidate,
            },
        ],
        buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                var email, validationRes, response;
                var _a;
                return sessionAuth.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            email =
                                (_a = formFields.find(function (field) {
                                    return field.id === "email";
                                })) === null || _a === void 0
                                    ? void 0
                                    : _a.value;
                            if (email === undefined) {
                                throw new index.STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                            }
                            return [4 /*yield*/, props.config.validateEmailAddress(email)];
                        case 1:
                            validationRes = _b.sent();
                            if (validationRes !== undefined) {
                                throw new index.STGeneralError(validationRes);
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    email: email,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _b.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
        footer: jsxRuntime.jsx(SignInUpFooter, {
            privacyPolicyLink: props.config.signInUpFeature.privacyPolicyLink,
            termsOfServiceLink: props.config.signInUpFeature.termsOfServiceLink,
        }),
    });
});

var phoneNumberInputLibStyles =
    '.iti {\n  position: relative;\n  display: inline-block; }\n  .iti * {\n    box-sizing: border-box;\n    -moz-box-sizing: border-box; }\n  .iti__hide {\n    display: none; }\n  .iti__v-hide {\n    visibility: hidden; }\n  .iti input, .iti input[type=text], .iti input[type=tel] {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important; }\n  .iti input, .iti input[type=text], .iti input[type=tel] {\n    position: relative;\n    z-index: 0;\n    padding-right: 36px;\n    margin-right: 0; }\n  .iti__flag-container {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    padding: 1px; }\n  .iti__selected-flag {\n    z-index: 1;\n    position: relative;\n    display: flex;\n    align-items: center;\n    height: 100%;\n    padding: 0 6px 0 8px; }\n  .iti__arrow {\n    margin-left: 6px;\n    width: 0;\n    height: 0;\n    border-left: 3px solid transparent;\n    border-right: 3px solid transparent;\n    border-top: 4px solid #555; }\n  .iti__arrow--up {\n      border-top: none;\n      border-bottom: 4px solid #555; }\n  .iti__country-list {\n    position: absolute;\n    z-index: 2;\n    list-style: none;\n    text-align: left;\n    padding: 0;\n    margin: 0 0 0 -1px;\n    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);\n    background-color: white;\n    border: 1px solid #CCC;\n    white-space: nowrap;\n    max-height: 200px;\n    overflow-y: scroll;\n    -webkit-overflow-scrolling: touch; }\n  .iti__country-list--dropup {\n      bottom: 100%;\n      margin-bottom: -1px; }\n  @media (max-width: 500px) {\n      .iti__country-list {\n        white-space: normal; } }\n  .iti__flag-box {\n    display: inline-block;\n    width: 20px; }\n  .iti__divider {\n    padding-bottom: 5px;\n    margin-bottom: 5px;\n    border-bottom: 1px solid #CCC; }\n  .iti__country {\n    padding: 5px 10px;\n    outline: none; }\n  .iti__dial-code {\n    color: #999; }\n  .iti__country.iti__highlight {\n    background-color: rgba(0, 0, 0, 0.05); }\n  .iti__flag-box, .iti__country-name, .iti__dial-code {\n    vertical-align: middle; }\n  .iti__flag-box, .iti__country-name {\n    margin-right: 6px; }\n  .iti--allow-dropdown input, .iti--allow-dropdown input[type=text], .iti--allow-dropdown input[type=tel], .iti--separate-dial-code input, .iti--separate-dial-code input[type=text], .iti--separate-dial-code input[type=tel] {\n    padding-right: 6px;\n    padding-left: 52px;\n    margin-left: 0; }\n  .iti--allow-dropdown .iti__flag-container, .iti--separate-dial-code .iti__flag-container {\n    right: auto;\n    left: 0; }\n  .iti--allow-dropdown .iti__flag-container:hover {\n    cursor: pointer; }\n  .iti--allow-dropdown .iti__flag-container:hover .iti__selected-flag {\n      background-color: rgba(0, 0, 0, 0.05); }\n  .iti--allow-dropdown input[disabled] + .iti__flag-container:hover,\n  .iti--allow-dropdown input[readonly] + .iti__flag-container:hover {\n    cursor: default; }\n  .iti--allow-dropdown input[disabled] + .iti__flag-container:hover .iti__selected-flag,\n    .iti--allow-dropdown input[readonly] + .iti__flag-container:hover .iti__selected-flag {\n      background-color: transparent; }\n  .iti--separate-dial-code .iti__selected-flag {\n    background-color: rgba(0, 0, 0, 0.05); }\n  .iti--separate-dial-code .iti__selected-dial-code {\n    margin-left: 6px; }\n  .iti--container {\n    position: absolute;\n    top: -1000px;\n    left: -1000px;\n    z-index: 1060;\n    padding: 1px; }\n  .iti--container:hover {\n      cursor: pointer; }\n  .iti-mobile .iti--container {\n  top: 30px;\n  bottom: 30px;\n  left: 30px;\n  right: 30px;\n  position: fixed; }\n  .iti-mobile .iti__country-list {\n  max-height: 100%;\n  width: 100%; }\n  .iti-mobile .iti__country {\n  padding: 10px 10px;\n  line-height: 1.5em; }\n  .iti__flag {\n  width: 20px; }\n  .iti__flag.iti__be {\n    width: 18px; }\n  .iti__flag.iti__ch {\n    width: 15px; }\n  .iti__flag.iti__mc {\n    width: 19px; }\n  .iti__flag.iti__ne {\n    width: 18px; }\n  .iti__flag.iti__np {\n    width: 13px; }\n  .iti__flag.iti__va {\n    width: 15px; }\n  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n    .iti__flag {\n      background-size: 5652px 15px; } }\n  .iti__flag.iti__ac {\n    height: 10px;\n    background-position: 0px 0px; }\n  .iti__flag.iti__ad {\n    height: 14px;\n    background-position: -22px 0px; }\n  .iti__flag.iti__ae {\n    height: 10px;\n    background-position: -44px 0px; }\n  .iti__flag.iti__af {\n    height: 14px;\n    background-position: -66px 0px; }\n  .iti__flag.iti__ag {\n    height: 14px;\n    background-position: -88px 0px; }\n  .iti__flag.iti__ai {\n    height: 10px;\n    background-position: -110px 0px; }\n  .iti__flag.iti__al {\n    height: 15px;\n    background-position: -132px 0px; }\n  .iti__flag.iti__am {\n    height: 10px;\n    background-position: -154px 0px; }\n  .iti__flag.iti__ao {\n    height: 14px;\n    background-position: -176px 0px; }\n  .iti__flag.iti__aq {\n    height: 14px;\n    background-position: -198px 0px; }\n  .iti__flag.iti__ar {\n    height: 13px;\n    background-position: -220px 0px; }\n  .iti__flag.iti__as {\n    height: 10px;\n    background-position: -242px 0px; }\n  .iti__flag.iti__at {\n    height: 14px;\n    background-position: -264px 0px; }\n  .iti__flag.iti__au {\n    height: 10px;\n    background-position: -286px 0px; }\n  .iti__flag.iti__aw {\n    height: 14px;\n    background-position: -308px 0px; }\n  .iti__flag.iti__ax {\n    height: 13px;\n    background-position: -330px 0px; }\n  .iti__flag.iti__az {\n    height: 10px;\n    background-position: -352px 0px; }\n  .iti__flag.iti__ba {\n    height: 10px;\n    background-position: -374px 0px; }\n  .iti__flag.iti__bb {\n    height: 14px;\n    background-position: -396px 0px; }\n  .iti__flag.iti__bd {\n    height: 12px;\n    background-position: -418px 0px; }\n  .iti__flag.iti__be {\n    height: 15px;\n    background-position: -440px 0px; }\n  .iti__flag.iti__bf {\n    height: 14px;\n    background-position: -460px 0px; }\n  .iti__flag.iti__bg {\n    height: 12px;\n    background-position: -482px 0px; }\n  .iti__flag.iti__bh {\n    height: 12px;\n    background-position: -504px 0px; }\n  .iti__flag.iti__bi {\n    height: 12px;\n    background-position: -526px 0px; }\n  .iti__flag.iti__bj {\n    height: 14px;\n    background-position: -548px 0px; }\n  .iti__flag.iti__bl {\n    height: 14px;\n    background-position: -570px 0px; }\n  .iti__flag.iti__bm {\n    height: 10px;\n    background-position: -592px 0px; }\n  .iti__flag.iti__bn {\n    height: 10px;\n    background-position: -614px 0px; }\n  .iti__flag.iti__bo {\n    height: 14px;\n    background-position: -636px 0px; }\n  .iti__flag.iti__bq {\n    height: 14px;\n    background-position: -658px 0px; }\n  .iti__flag.iti__br {\n    height: 14px;\n    background-position: -680px 0px; }\n  .iti__flag.iti__bs {\n    height: 10px;\n    background-position: -702px 0px; }\n  .iti__flag.iti__bt {\n    height: 14px;\n    background-position: -724px 0px; }\n  .iti__flag.iti__bv {\n    height: 15px;\n    background-position: -746px 0px; }\n  .iti__flag.iti__bw {\n    height: 14px;\n    background-position: -768px 0px; }\n  .iti__flag.iti__by {\n    height: 10px;\n    background-position: -790px 0px; }\n  .iti__flag.iti__bz {\n    height: 14px;\n    background-position: -812px 0px; }\n  .iti__flag.iti__ca {\n    height: 10px;\n    background-position: -834px 0px; }\n  .iti__flag.iti__cc {\n    height: 10px;\n    background-position: -856px 0px; }\n  .iti__flag.iti__cd {\n    height: 15px;\n    background-position: -878px 0px; }\n  .iti__flag.iti__cf {\n    height: 14px;\n    background-position: -900px 0px; }\n  .iti__flag.iti__cg {\n    height: 14px;\n    background-position: -922px 0px; }\n  .iti__flag.iti__ch {\n    height: 15px;\n    background-position: -944px 0px; }\n  .iti__flag.iti__ci {\n    height: 14px;\n    background-position: -961px 0px; }\n  .iti__flag.iti__ck {\n    height: 10px;\n    background-position: -983px 0px; }\n  .iti__flag.iti__cl {\n    height: 14px;\n    background-position: -1005px 0px; }\n  .iti__flag.iti__cm {\n    height: 14px;\n    background-position: -1027px 0px; }\n  .iti__flag.iti__cn {\n    height: 14px;\n    background-position: -1049px 0px; }\n  .iti__flag.iti__co {\n    height: 14px;\n    background-position: -1071px 0px; }\n  .iti__flag.iti__cp {\n    height: 14px;\n    background-position: -1093px 0px; }\n  .iti__flag.iti__cr {\n    height: 12px;\n    background-position: -1115px 0px; }\n  .iti__flag.iti__cu {\n    height: 10px;\n    background-position: -1137px 0px; }\n  .iti__flag.iti__cv {\n    height: 12px;\n    background-position: -1159px 0px; }\n  .iti__flag.iti__cw {\n    height: 14px;\n    background-position: -1181px 0px; }\n  .iti__flag.iti__cx {\n    height: 10px;\n    background-position: -1203px 0px; }\n  .iti__flag.iti__cy {\n    height: 14px;\n    background-position: -1225px 0px; }\n  .iti__flag.iti__cz {\n    height: 14px;\n    background-position: -1247px 0px; }\n  .iti__flag.iti__de {\n    height: 12px;\n    background-position: -1269px 0px; }\n  .iti__flag.iti__dg {\n    height: 10px;\n    background-position: -1291px 0px; }\n  .iti__flag.iti__dj {\n    height: 14px;\n    background-position: -1313px 0px; }\n  .iti__flag.iti__dk {\n    height: 15px;\n    background-position: -1335px 0px; }\n  .iti__flag.iti__dm {\n    height: 10px;\n    background-position: -1357px 0px; }\n  .iti__flag.iti__do {\n    height: 14px;\n    background-position: -1379px 0px; }\n  .iti__flag.iti__dz {\n    height: 14px;\n    background-position: -1401px 0px; }\n  .iti__flag.iti__ea {\n    height: 14px;\n    background-position: -1423px 0px; }\n  .iti__flag.iti__ec {\n    height: 14px;\n    background-position: -1445px 0px; }\n  .iti__flag.iti__ee {\n    height: 13px;\n    background-position: -1467px 0px; }\n  .iti__flag.iti__eg {\n    height: 14px;\n    background-position: -1489px 0px; }\n  .iti__flag.iti__eh {\n    height: 10px;\n    background-position: -1511px 0px; }\n  .iti__flag.iti__er {\n    height: 10px;\n    background-position: -1533px 0px; }\n  .iti__flag.iti__es {\n    height: 14px;\n    background-position: -1555px 0px; }\n  .iti__flag.iti__et {\n    height: 10px;\n    background-position: -1577px 0px; }\n  .iti__flag.iti__eu {\n    height: 14px;\n    background-position: -1599px 0px; }\n  .iti__flag.iti__fi {\n    height: 12px;\n    background-position: -1621px 0px; }\n  .iti__flag.iti__fj {\n    height: 10px;\n    background-position: -1643px 0px; }\n  .iti__flag.iti__fk {\n    height: 10px;\n    background-position: -1665px 0px; }\n  .iti__flag.iti__fm {\n    height: 11px;\n    background-position: -1687px 0px; }\n  .iti__flag.iti__fo {\n    height: 15px;\n    background-position: -1709px 0px; }\n  .iti__flag.iti__fr {\n    height: 14px;\n    background-position: -1731px 0px; }\n  .iti__flag.iti__ga {\n    height: 15px;\n    background-position: -1753px 0px; }\n  .iti__flag.iti__gb {\n    height: 10px;\n    background-position: -1775px 0px; }\n  .iti__flag.iti__gd {\n    height: 12px;\n    background-position: -1797px 0px; }\n  .iti__flag.iti__ge {\n    height: 14px;\n    background-position: -1819px 0px; }\n  .iti__flag.iti__gf {\n    height: 14px;\n    background-position: -1841px 0px; }\n  .iti__flag.iti__gg {\n    height: 14px;\n    background-position: -1863px 0px; }\n  .iti__flag.iti__gh {\n    height: 14px;\n    background-position: -1885px 0px; }\n  .iti__flag.iti__gi {\n    height: 10px;\n    background-position: -1907px 0px; }\n  .iti__flag.iti__gl {\n    height: 14px;\n    background-position: -1929px 0px; }\n  .iti__flag.iti__gm {\n    height: 14px;\n    background-position: -1951px 0px; }\n  .iti__flag.iti__gn {\n    height: 14px;\n    background-position: -1973px 0px; }\n  .iti__flag.iti__gp {\n    height: 14px;\n    background-position: -1995px 0px; }\n  .iti__flag.iti__gq {\n    height: 14px;\n    background-position: -2017px 0px; }\n  .iti__flag.iti__gr {\n    height: 14px;\n    background-position: -2039px 0px; }\n  .iti__flag.iti__gs {\n    height: 10px;\n    background-position: -2061px 0px; }\n  .iti__flag.iti__gt {\n    height: 13px;\n    background-position: -2083px 0px; }\n  .iti__flag.iti__gu {\n    height: 11px;\n    background-position: -2105px 0px; }\n  .iti__flag.iti__gw {\n    height: 10px;\n    background-position: -2127px 0px; }\n  .iti__flag.iti__gy {\n    height: 12px;\n    background-position: -2149px 0px; }\n  .iti__flag.iti__hk {\n    height: 14px;\n    background-position: -2171px 0px; }\n  .iti__flag.iti__hm {\n    height: 10px;\n    background-position: -2193px 0px; }\n  .iti__flag.iti__hn {\n    height: 10px;\n    background-position: -2215px 0px; }\n  .iti__flag.iti__hr {\n    height: 10px;\n    background-position: -2237px 0px; }\n  .iti__flag.iti__ht {\n    height: 12px;\n    background-position: -2259px 0px; }\n  .iti__flag.iti__hu {\n    height: 10px;\n    background-position: -2281px 0px; }\n  .iti__flag.iti__ic {\n    height: 14px;\n    background-position: -2303px 0px; }\n  .iti__flag.iti__id {\n    height: 14px;\n    background-position: -2325px 0px; }\n  .iti__flag.iti__ie {\n    height: 10px;\n    background-position: -2347px 0px; }\n  .iti__flag.iti__il {\n    height: 15px;\n    background-position: -2369px 0px; }\n  .iti__flag.iti__im {\n    height: 10px;\n    background-position: -2391px 0px; }\n  .iti__flag.iti__in {\n    height: 14px;\n    background-position: -2413px 0px; }\n  .iti__flag.iti__io {\n    height: 10px;\n    background-position: -2435px 0px; }\n  .iti__flag.iti__iq {\n    height: 14px;\n    background-position: -2457px 0px; }\n  .iti__flag.iti__ir {\n    height: 12px;\n    background-position: -2479px 0px; }\n  .iti__flag.iti__is {\n    height: 15px;\n    background-position: -2501px 0px; }\n  .iti__flag.iti__it {\n    height: 14px;\n    background-position: -2523px 0px; }\n  .iti__flag.iti__je {\n    height: 12px;\n    background-position: -2545px 0px; }\n  .iti__flag.iti__jm {\n    height: 10px;\n    background-position: -2567px 0px; }\n  .iti__flag.iti__jo {\n    height: 10px;\n    background-position: -2589px 0px; }\n  .iti__flag.iti__jp {\n    height: 14px;\n    background-position: -2611px 0px; }\n  .iti__flag.iti__ke {\n    height: 14px;\n    background-position: -2633px 0px; }\n  .iti__flag.iti__kg {\n    height: 12px;\n    background-position: -2655px 0px; }\n  .iti__flag.iti__kh {\n    height: 13px;\n    background-position: -2677px 0px; }\n  .iti__flag.iti__ki {\n    height: 10px;\n    background-position: -2699px 0px; }\n  .iti__flag.iti__km {\n    height: 12px;\n    background-position: -2721px 0px; }\n  .iti__flag.iti__kn {\n    height: 14px;\n    background-position: -2743px 0px; }\n  .iti__flag.iti__kp {\n    height: 10px;\n    background-position: -2765px 0px; }\n  .iti__flag.iti__kr {\n    height: 14px;\n    background-position: -2787px 0px; }\n  .iti__flag.iti__kw {\n    height: 10px;\n    background-position: -2809px 0px; }\n  .iti__flag.iti__ky {\n    height: 10px;\n    background-position: -2831px 0px; }\n  .iti__flag.iti__kz {\n    height: 10px;\n    background-position: -2853px 0px; }\n  .iti__flag.iti__la {\n    height: 14px;\n    background-position: -2875px 0px; }\n  .iti__flag.iti__lb {\n    height: 14px;\n    background-position: -2897px 0px; }\n  .iti__flag.iti__lc {\n    height: 10px;\n    background-position: -2919px 0px; }\n  .iti__flag.iti__li {\n    height: 12px;\n    background-position: -2941px 0px; }\n  .iti__flag.iti__lk {\n    height: 10px;\n    background-position: -2963px 0px; }\n  .iti__flag.iti__lr {\n    height: 11px;\n    background-position: -2985px 0px; }\n  .iti__flag.iti__ls {\n    height: 14px;\n    background-position: -3007px 0px; }\n  .iti__flag.iti__lt {\n    height: 12px;\n    background-position: -3029px 0px; }\n  .iti__flag.iti__lu {\n    height: 12px;\n    background-position: -3051px 0px; }\n  .iti__flag.iti__lv {\n    height: 10px;\n    background-position: -3073px 0px; }\n  .iti__flag.iti__ly {\n    height: 10px;\n    background-position: -3095px 0px; }\n  .iti__flag.iti__ma {\n    height: 14px;\n    background-position: -3117px 0px; }\n  .iti__flag.iti__mc {\n    height: 15px;\n    background-position: -3139px 0px; }\n  .iti__flag.iti__md {\n    height: 10px;\n    background-position: -3160px 0px; }\n  .iti__flag.iti__me {\n    height: 10px;\n    background-position: -3182px 0px; }\n  .iti__flag.iti__mf {\n    height: 14px;\n    background-position: -3204px 0px; }\n  .iti__flag.iti__mg {\n    height: 14px;\n    background-position: -3226px 0px; }\n  .iti__flag.iti__mh {\n    height: 11px;\n    background-position: -3248px 0px; }\n  .iti__flag.iti__mk {\n    height: 10px;\n    background-position: -3270px 0px; }\n  .iti__flag.iti__ml {\n    height: 14px;\n    background-position: -3292px 0px; }\n  .iti__flag.iti__mm {\n    height: 14px;\n    background-position: -3314px 0px; }\n  .iti__flag.iti__mn {\n    height: 10px;\n    background-position: -3336px 0px; }\n  .iti__flag.iti__mo {\n    height: 14px;\n    background-position: -3358px 0px; }\n  .iti__flag.iti__mp {\n    height: 10px;\n    background-position: -3380px 0px; }\n  .iti__flag.iti__mq {\n    height: 14px;\n    background-position: -3402px 0px; }\n  .iti__flag.iti__mr {\n    height: 14px;\n    background-position: -3424px 0px; }\n  .iti__flag.iti__ms {\n    height: 10px;\n    background-position: -3446px 0px; }\n  .iti__flag.iti__mt {\n    height: 14px;\n    background-position: -3468px 0px; }\n  .iti__flag.iti__mu {\n    height: 14px;\n    background-position: -3490px 0px; }\n  .iti__flag.iti__mv {\n    height: 14px;\n    background-position: -3512px 0px; }\n  .iti__flag.iti__mw {\n    height: 14px;\n    background-position: -3534px 0px; }\n  .iti__flag.iti__mx {\n    height: 12px;\n    background-position: -3556px 0px; }\n  .iti__flag.iti__my {\n    height: 10px;\n    background-position: -3578px 0px; }\n  .iti__flag.iti__mz {\n    height: 14px;\n    background-position: -3600px 0px; }\n  .iti__flag.iti__na {\n    height: 14px;\n    background-position: -3622px 0px; }\n  .iti__flag.iti__nc {\n    height: 10px;\n    background-position: -3644px 0px; }\n  .iti__flag.iti__ne {\n    height: 15px;\n    background-position: -3666px 0px; }\n  .iti__flag.iti__nf {\n    height: 10px;\n    background-position: -3686px 0px; }\n  .iti__flag.iti__ng {\n    height: 10px;\n    background-position: -3708px 0px; }\n  .iti__flag.iti__ni {\n    height: 12px;\n    background-position: -3730px 0px; }\n  .iti__flag.iti__nl {\n    height: 14px;\n    background-position: -3752px 0px; }\n  .iti__flag.iti__no {\n    height: 15px;\n    background-position: -3774px 0px; }\n  .iti__flag.iti__np {\n    height: 15px;\n    background-position: -3796px 0px; }\n  .iti__flag.iti__nr {\n    height: 10px;\n    background-position: -3811px 0px; }\n  .iti__flag.iti__nu {\n    height: 10px;\n    background-position: -3833px 0px; }\n  .iti__flag.iti__nz {\n    height: 10px;\n    background-position: -3855px 0px; }\n  .iti__flag.iti__om {\n    height: 10px;\n    background-position: -3877px 0px; }\n  .iti__flag.iti__pa {\n    height: 14px;\n    background-position: -3899px 0px; }\n  .iti__flag.iti__pe {\n    height: 14px;\n    background-position: -3921px 0px; }\n  .iti__flag.iti__pf {\n    height: 14px;\n    background-position: -3943px 0px; }\n  .iti__flag.iti__pg {\n    height: 15px;\n    background-position: -3965px 0px; }\n  .iti__flag.iti__ph {\n    height: 10px;\n    background-position: -3987px 0px; }\n  .iti__flag.iti__pk {\n    height: 14px;\n    background-position: -4009px 0px; }\n  .iti__flag.iti__pl {\n    height: 13px;\n    background-position: -4031px 0px; }\n  .iti__flag.iti__pm {\n    height: 14px;\n    background-position: -4053px 0px; }\n  .iti__flag.iti__pn {\n    height: 10px;\n    background-position: -4075px 0px; }\n  .iti__flag.iti__pr {\n    height: 14px;\n    background-position: -4097px 0px; }\n  .iti__flag.iti__ps {\n    height: 10px;\n    background-position: -4119px 0px; }\n  .iti__flag.iti__pt {\n    height: 14px;\n    background-position: -4141px 0px; }\n  .iti__flag.iti__pw {\n    height: 13px;\n    background-position: -4163px 0px; }\n  .iti__flag.iti__py {\n    height: 11px;\n    background-position: -4185px 0px; }\n  .iti__flag.iti__qa {\n    height: 8px;\n    background-position: -4207px 0px; }\n  .iti__flag.iti__re {\n    height: 14px;\n    background-position: -4229px 0px; }\n  .iti__flag.iti__ro {\n    height: 14px;\n    background-position: -4251px 0px; }\n  .iti__flag.iti__rs {\n    height: 14px;\n    background-position: -4273px 0px; }\n  .iti__flag.iti__ru {\n    height: 14px;\n    background-position: -4295px 0px; }\n  .iti__flag.iti__rw {\n    height: 14px;\n    background-position: -4317px 0px; }\n  .iti__flag.iti__sa {\n    height: 14px;\n    background-position: -4339px 0px; }\n  .iti__flag.iti__sb {\n    height: 10px;\n    background-position: -4361px 0px; }\n  .iti__flag.iti__sc {\n    height: 10px;\n    background-position: -4383px 0px; }\n  .iti__flag.iti__sd {\n    height: 10px;\n    background-position: -4405px 0px; }\n  .iti__flag.iti__se {\n    height: 13px;\n    background-position: -4427px 0px; }\n  .iti__flag.iti__sg {\n    height: 14px;\n    background-position: -4449px 0px; }\n  .iti__flag.iti__sh {\n    height: 10px;\n    background-position: -4471px 0px; }\n  .iti__flag.iti__si {\n    height: 10px;\n    background-position: -4493px 0px; }\n  .iti__flag.iti__sj {\n    height: 15px;\n    background-position: -4515px 0px; }\n  .iti__flag.iti__sk {\n    height: 14px;\n    background-position: -4537px 0px; }\n  .iti__flag.iti__sl {\n    height: 14px;\n    background-position: -4559px 0px; }\n  .iti__flag.iti__sm {\n    height: 15px;\n    background-position: -4581px 0px; }\n  .iti__flag.iti__sn {\n    height: 14px;\n    background-position: -4603px 0px; }\n  .iti__flag.iti__so {\n    height: 14px;\n    background-position: -4625px 0px; }\n  .iti__flag.iti__sr {\n    height: 14px;\n    background-position: -4647px 0px; }\n  .iti__flag.iti__ss {\n    height: 10px;\n    background-position: -4669px 0px; }\n  .iti__flag.iti__st {\n    height: 10px;\n    background-position: -4691px 0px; }\n  .iti__flag.iti__sv {\n    height: 12px;\n    background-position: -4713px 0px; }\n  .iti__flag.iti__sx {\n    height: 14px;\n    background-position: -4735px 0px; }\n  .iti__flag.iti__sy {\n    height: 14px;\n    background-position: -4757px 0px; }\n  .iti__flag.iti__sz {\n    height: 14px;\n    background-position: -4779px 0px; }\n  .iti__flag.iti__ta {\n    height: 10px;\n    background-position: -4801px 0px; }\n  .iti__flag.iti__tc {\n    height: 10px;\n    background-position: -4823px 0px; }\n  .iti__flag.iti__td {\n    height: 14px;\n    background-position: -4845px 0px; }\n  .iti__flag.iti__tf {\n    height: 14px;\n    background-position: -4867px 0px; }\n  .iti__flag.iti__tg {\n    height: 13px;\n    background-position: -4889px 0px; }\n  .iti__flag.iti__th {\n    height: 14px;\n    background-position: -4911px 0px; }\n  .iti__flag.iti__tj {\n    height: 10px;\n    background-position: -4933px 0px; }\n  .iti__flag.iti__tk {\n    height: 10px;\n    background-position: -4955px 0px; }\n  .iti__flag.iti__tl {\n    height: 10px;\n    background-position: -4977px 0px; }\n  .iti__flag.iti__tm {\n    height: 14px;\n    background-position: -4999px 0px; }\n  .iti__flag.iti__tn {\n    height: 14px;\n    background-position: -5021px 0px; }\n  .iti__flag.iti__to {\n    height: 10px;\n    background-position: -5043px 0px; }\n  .iti__flag.iti__tr {\n    height: 14px;\n    background-position: -5065px 0px; }\n  .iti__flag.iti__tt {\n    height: 12px;\n    background-position: -5087px 0px; }\n  .iti__flag.iti__tv {\n    height: 10px;\n    background-position: -5109px 0px; }\n  .iti__flag.iti__tw {\n    height: 14px;\n    background-position: -5131px 0px; }\n  .iti__flag.iti__tz {\n    height: 14px;\n    background-position: -5153px 0px; }\n  .iti__flag.iti__ua {\n    height: 14px;\n    background-position: -5175px 0px; }\n  .iti__flag.iti__ug {\n    height: 14px;\n    background-position: -5197px 0px; }\n  .iti__flag.iti__um {\n    height: 11px;\n    background-position: -5219px 0px; }\n  .iti__flag.iti__un {\n    height: 14px;\n    background-position: -5241px 0px; }\n  .iti__flag.iti__us {\n    height: 11px;\n    background-position: -5263px 0px; }\n  .iti__flag.iti__uy {\n    height: 14px;\n    background-position: -5285px 0px; }\n  .iti__flag.iti__uz {\n    height: 10px;\n    background-position: -5307px 0px; }\n  .iti__flag.iti__va {\n    height: 15px;\n    background-position: -5329px 0px; }\n  .iti__flag.iti__vc {\n    height: 14px;\n    background-position: -5346px 0px; }\n  .iti__flag.iti__ve {\n    height: 14px;\n    background-position: -5368px 0px; }\n  .iti__flag.iti__vg {\n    height: 10px;\n    background-position: -5390px 0px; }\n  .iti__flag.iti__vi {\n    height: 14px;\n    background-position: -5412px 0px; }\n  .iti__flag.iti__vn {\n    height: 14px;\n    background-position: -5434px 0px; }\n  .iti__flag.iti__vu {\n    height: 12px;\n    background-position: -5456px 0px; }\n  .iti__flag.iti__wf {\n    height: 14px;\n    background-position: -5478px 0px; }\n  .iti__flag.iti__ws {\n    height: 10px;\n    background-position: -5500px 0px; }\n  .iti__flag.iti__xk {\n    height: 15px;\n    background-position: -5522px 0px; }\n  .iti__flag.iti__ye {\n    height: 14px;\n    background-position: -5544px 0px; }\n  .iti__flag.iti__yt {\n    height: 14px;\n    background-position: -5566px 0px; }\n  .iti__flag.iti__za {\n    height: 14px;\n    background-position: -5588px 0px; }\n  .iti__flag.iti__zm {\n    height: 14px;\n    background-position: -5610px 0px; }\n  .iti__flag.iti__zw {\n    height: 10px;\n    background-position: -5632px 0px; }\n  .iti__flag {\n  height: 15px;\n  box-shadow: 0px 0px 1px 0px #888;\n  background-image: url("../img/flags.png");\n  background-repeat: no-repeat;\n  background-color: #DBDBDB;\n  background-position: 20px 0; }\n  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n    .iti__flag {\n      background-image: url("../img/flags@2x.png"); } }\n  .iti__flag.iti__np {\n  background-color: transparent; }\n';

var intlTelInput$2 = { exports: {} };

var intlTelInput$1 = { exports: {} };

/*
 * International Telephone Input v17.0.19
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

(function (module) {
    // wrap in UMD
    (function (factory) {
        if (module.exports) module.exports = factory();
        else window.intlTelInput = factory();
    })(function (undefined$1) {
        return (function () {
            // Array of country objects for the flag dropdown.
            // Here is the criteria for the plugin to support a given country/territory
            // - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
            // - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
            // - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
            // - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml
            // Each country array has the following information:
            // [
            //    Country name,
            //    iso2 code,
            //    International dial code,
            //    Order (if >1 country with same dial code),
            //    Area codes
            // ]
            var allCountries = [
                ["Afghanistan (‫افغانستان‬‎)", "af", "93"],
                ["Albania (Shqipëri)", "al", "355"],
                ["Algeria (‫الجزائر‬‎)", "dz", "213"],
                ["American Samoa", "as", "1", 5, ["684"]],
                ["Andorra", "ad", "376"],
                ["Angola", "ao", "244"],
                ["Anguilla", "ai", "1", 6, ["264"]],
                ["Antigua and Barbuda", "ag", "1", 7, ["268"]],
                ["Argentina", "ar", "54"],
                ["Armenia (Հայաստան)", "am", "374"],
                ["Aruba", "aw", "297"],
                ["Ascension Island", "ac", "247"],
                ["Australia", "au", "61", 0],
                ["Austria (Österreich)", "at", "43"],
                ["Azerbaijan (Azərbaycan)", "az", "994"],
                ["Bahamas", "bs", "1", 8, ["242"]],
                ["Bahrain (‫البحرين‬‎)", "bh", "973"],
                ["Bangladesh (বাংলাদেশ)", "bd", "880"],
                ["Barbados", "bb", "1", 9, ["246"]],
                ["Belarus (Беларусь)", "by", "375"],
                ["Belgium (België)", "be", "32"],
                ["Belize", "bz", "501"],
                ["Benin (Bénin)", "bj", "229"],
                ["Bermuda", "bm", "1", 10, ["441"]],
                ["Bhutan (འབྲུག)", "bt", "975"],
                ["Bolivia", "bo", "591"],
                ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"],
                ["Botswana", "bw", "267"],
                ["Brazil (Brasil)", "br", "55"],
                ["British Indian Ocean Territory", "io", "246"],
                ["British Virgin Islands", "vg", "1", 11, ["284"]],
                ["Brunei", "bn", "673"],
                ["Bulgaria (България)", "bg", "359"],
                ["Burkina Faso", "bf", "226"],
                ["Burundi (Uburundi)", "bi", "257"],
                ["Cambodia (កម្ពុជា)", "kh", "855"],
                ["Cameroon (Cameroun)", "cm", "237"],
                [
                    "Canada",
                    "ca",
                    "1",
                    1,
                    [
                        "204",
                        "226",
                        "236",
                        "249",
                        "250",
                        "289",
                        "306",
                        "343",
                        "365",
                        "387",
                        "403",
                        "416",
                        "418",
                        "431",
                        "437",
                        "438",
                        "450",
                        "506",
                        "514",
                        "519",
                        "548",
                        "579",
                        "581",
                        "587",
                        "604",
                        "613",
                        "639",
                        "647",
                        "672",
                        "705",
                        "709",
                        "742",
                        "778",
                        "780",
                        "782",
                        "807",
                        "819",
                        "825",
                        "867",
                        "873",
                        "902",
                        "905",
                    ],
                ],
                ["Cape Verde (Kabu Verdi)", "cv", "238"],
                ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]],
                ["Cayman Islands", "ky", "1", 12, ["345"]],
                ["Central African Republic (République centrafricaine)", "cf", "236"],
                ["Chad (Tchad)", "td", "235"],
                ["Chile", "cl", "56"],
                ["China (中国)", "cn", "86"],
                ["Christmas Island", "cx", "61", 2, ["89164"]],
                ["Cocos (Keeling) Islands", "cc", "61", 1, ["89162"]],
                ["Colombia", "co", "57"],
                ["Comoros (‫جزر القمر‬‎)", "km", "269"],
                ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
                ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
                ["Cook Islands", "ck", "682"],
                ["Costa Rica", "cr", "506"],
                ["Côte d’Ivoire", "ci", "225"],
                ["Croatia (Hrvatska)", "hr", "385"],
                ["Cuba", "cu", "53"],
                ["Curaçao", "cw", "599", 0],
                ["Cyprus (Κύπρος)", "cy", "357"],
                ["Czech Republic (Česká republika)", "cz", "420"],
                ["Denmark (Danmark)", "dk", "45"],
                ["Djibouti", "dj", "253"],
                ["Dominica", "dm", "1", 13, ["767"]],
                ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]],
                ["Ecuador", "ec", "593"],
                ["Egypt (‫مصر‬‎)", "eg", "20"],
                ["El Salvador", "sv", "503"],
                ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
                ["Eritrea", "er", "291"],
                ["Estonia (Eesti)", "ee", "372"],
                ["Eswatini", "sz", "268"],
                ["Ethiopia", "et", "251"],
                ["Falkland Islands (Islas Malvinas)", "fk", "500"],
                ["Faroe Islands (Føroyar)", "fo", "298"],
                ["Fiji", "fj", "679"],
                ["Finland (Suomi)", "fi", "358", 0],
                ["France", "fr", "33"],
                ["French Guiana (Guyane française)", "gf", "594"],
                ["French Polynesia (Polynésie française)", "pf", "689"],
                ["Gabon", "ga", "241"],
                ["Gambia", "gm", "220"],
                ["Georgia (საქართველო)", "ge", "995"],
                ["Germany (Deutschland)", "de", "49"],
                ["Ghana (Gaana)", "gh", "233"],
                ["Gibraltar", "gi", "350"],
                ["Greece (Ελλάδα)", "gr", "30"],
                ["Greenland (Kalaallit Nunaat)", "gl", "299"],
                ["Grenada", "gd", "1", 14, ["473"]],
                ["Guadeloupe", "gp", "590", 0],
                ["Guam", "gu", "1", 15, ["671"]],
                ["Guatemala", "gt", "502"],
                ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]],
                ["Guinea (Guinée)", "gn", "224"],
                ["Guinea-Bissau (Guiné Bissau)", "gw", "245"],
                ["Guyana", "gy", "592"],
                ["Haiti", "ht", "509"],
                ["Honduras", "hn", "504"],
                ["Hong Kong (香港)", "hk", "852"],
                ["Hungary (Magyarország)", "hu", "36"],
                ["Iceland (Ísland)", "is", "354"],
                ["India (भारत)", "in", "91"],
                ["Indonesia", "id", "62"],
                ["Iran (‫ایران‬‎)", "ir", "98"],
                ["Iraq (‫العراق‬‎)", "iq", "964"],
                ["Ireland", "ie", "353"],
                ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]],
                ["Israel (‫ישראל‬‎)", "il", "972"],
                ["Italy (Italia)", "it", "39", 0],
                ["Jamaica", "jm", "1", 4, ["876", "658"]],
                ["Japan (日本)", "jp", "81"],
                ["Jersey", "je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"]],
                ["Jordan (‫الأردن‬‎)", "jo", "962"],
                ["Kazakhstan (Казахстан)", "kz", "7", 1, ["33", "7"]],
                ["Kenya", "ke", "254"],
                ["Kiribati", "ki", "686"],
                ["Kosovo", "xk", "383"],
                ["Kuwait (‫الكويت‬‎)", "kw", "965"],
                ["Kyrgyzstan (Кыргызстан)", "kg", "996"],
                ["Laos (ລາວ)", "la", "856"],
                ["Latvia (Latvija)", "lv", "371"],
                ["Lebanon (‫لبنان‬‎)", "lb", "961"],
                ["Lesotho", "ls", "266"],
                ["Liberia", "lr", "231"],
                ["Libya (‫ليبيا‬‎)", "ly", "218"],
                ["Liechtenstein", "li", "423"],
                ["Lithuania (Lietuva)", "lt", "370"],
                ["Luxembourg", "lu", "352"],
                ["Macau (澳門)", "mo", "853"],
                ["North Macedonia (Македонија)", "mk", "389"],
                ["Madagascar (Madagasikara)", "mg", "261"],
                ["Malawi", "mw", "265"],
                ["Malaysia", "my", "60"],
                ["Maldives", "mv", "960"],
                ["Mali", "ml", "223"],
                ["Malta", "mt", "356"],
                ["Marshall Islands", "mh", "692"],
                ["Martinique", "mq", "596"],
                ["Mauritania (‫موريتانيا‬‎)", "mr", "222"],
                ["Mauritius (Moris)", "mu", "230"],
                ["Mayotte", "yt", "262", 1, ["269", "639"]],
                ["Mexico (México)", "mx", "52"],
                ["Micronesia", "fm", "691"],
                ["Moldova (Republica Moldova)", "md", "373"],
                ["Monaco", "mc", "377"],
                ["Mongolia (Монгол)", "mn", "976"],
                ["Montenegro (Crna Gora)", "me", "382"],
                ["Montserrat", "ms", "1", 16, ["664"]],
                ["Morocco (‫المغرب‬‎)", "ma", "212", 0],
                ["Mozambique (Moçambique)", "mz", "258"],
                ["Myanmar (Burma) (မြန်မာ)", "mm", "95"],
                ["Namibia (Namibië)", "na", "264"],
                ["Nauru", "nr", "674"],
                ["Nepal (नेपाल)", "np", "977"],
                ["Netherlands (Nederland)", "nl", "31"],
                ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"],
                ["New Zealand", "nz", "64"],
                ["Nicaragua", "ni", "505"],
                ["Niger (Nijar)", "ne", "227"],
                ["Nigeria", "ng", "234"],
                ["Niue", "nu", "683"],
                ["Norfolk Island", "nf", "672"],
                ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"],
                ["Northern Mariana Islands", "mp", "1", 17, ["670"]],
                ["Norway (Norge)", "no", "47", 0],
                ["Oman (‫عُمان‬‎)", "om", "968"],
                ["Pakistan (‫پاکستان‬‎)", "pk", "92"],
                ["Palau", "pw", "680"],
                ["Palestine (‫فلسطين‬‎)", "ps", "970"],
                ["Panama (Panamá)", "pa", "507"],
                ["Papua New Guinea", "pg", "675"],
                ["Paraguay", "py", "595"],
                ["Peru (Perú)", "pe", "51"],
                ["Philippines", "ph", "63"],
                ["Poland (Polska)", "pl", "48"],
                ["Portugal", "pt", "351"],
                ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
                ["Qatar (‫قطر‬‎)", "qa", "974"],
                ["Réunion (La Réunion)", "re", "262", 0],
                ["Romania (România)", "ro", "40"],
                ["Russia (Россия)", "ru", "7", 0],
                ["Rwanda", "rw", "250"],
                ["Saint Barthélemy", "bl", "590", 1],
                ["Saint Helena", "sh", "290"],
                ["Saint Kitts and Nevis", "kn", "1", 18, ["869"]],
                ["Saint Lucia", "lc", "1", 19, ["758"]],
                ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2],
                ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
                ["Saint Vincent and the Grenadines", "vc", "1", 20, ["784"]],
                ["Samoa", "ws", "685"],
                ["San Marino", "sm", "378"],
                ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"],
                ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"],
                ["Senegal (Sénégal)", "sn", "221"],
                ["Serbia (Србија)", "rs", "381"],
                ["Seychelles", "sc", "248"],
                ["Sierra Leone", "sl", "232"],
                ["Singapore", "sg", "65"],
                ["Sint Maarten", "sx", "1", 21, ["721"]],
                ["Slovakia (Slovensko)", "sk", "421"],
                ["Slovenia (Slovenija)", "si", "386"],
                ["Solomon Islands", "sb", "677"],
                ["Somalia (Soomaaliya)", "so", "252"],
                ["South Africa", "za", "27"],
                ["South Korea (대한민국)", "kr", "82"],
                ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"],
                ["Spain (España)", "es", "34"],
                ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"],
                ["Sudan (‫السودان‬‎)", "sd", "249"],
                ["Suriname", "sr", "597"],
                ["Svalbard and Jan Mayen", "sj", "47", 1, ["79"]],
                ["Sweden (Sverige)", "se", "46"],
                ["Switzerland (Schweiz)", "ch", "41"],
                ["Syria (‫سوريا‬‎)", "sy", "963"],
                ["Taiwan (台灣)", "tw", "886"],
                ["Tajikistan", "tj", "992"],
                ["Tanzania", "tz", "255"],
                ["Thailand (ไทย)", "th", "66"],
                ["Timor-Leste", "tl", "670"],
                ["Togo", "tg", "228"],
                ["Tokelau", "tk", "690"],
                ["Tonga", "to", "676"],
                ["Trinidad and Tobago", "tt", "1", 22, ["868"]],
                ["Tunisia (‫تونس‬‎)", "tn", "216"],
                ["Turkey (Türkiye)", "tr", "90"],
                ["Turkmenistan", "tm", "993"],
                ["Turks and Caicos Islands", "tc", "1", 23, ["649"]],
                ["Tuvalu", "tv", "688"],
                ["U.S. Virgin Islands", "vi", "1", 24, ["340"]],
                ["Uganda", "ug", "256"],
                ["Ukraine (Україна)", "ua", "380"],
                ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"],
                ["United Kingdom", "gb", "44", 0],
                ["United States", "us", "1", 0],
                ["Uruguay", "uy", "598"],
                ["Uzbekistan (Oʻzbekiston)", "uz", "998"],
                ["Vanuatu", "vu", "678"],
                ["Vatican City (Città del Vaticano)", "va", "39", 1, ["06698"]],
                ["Venezuela", "ve", "58"],
                ["Vietnam (Việt Nam)", "vn", "84"],
                ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"],
                ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, ["5288", "5289"]],
                ["Yemen (‫اليمن‬‎)", "ye", "967"],
                ["Zambia", "zm", "260"],
                ["Zimbabwe", "zw", "263"],
                ["Åland Islands", "ax", "358", 1, ["18"]],
            ];
            // loop over all of the countries above, restructuring the data to be objects with named keys
            for (var i = 0; i < allCountries.length; i++) {
                var c = allCountries[i];
                allCountries[i] = {
                    name: c[0],
                    iso2: c[1],
                    dialCode: c[2],
                    priority: c[3] || 0,
                    areaCodes: c[4] || null,
                };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                if (staticProps) _defineProperties(Constructor, staticProps);
                return Constructor;
            }
            var intlTelInputGlobals = {
                getInstance: function getInstance(input) {
                    var id = input.getAttribute("data-intl-tel-input-id");
                    return window.intlTelInputGlobals.instances[id];
                },
                instances: {},
                // using a global like this allows us to mock it in the tests
                documentReady: function documentReady() {
                    return document.readyState === "complete";
                },
            };
            if (typeof window === "object") window.intlTelInputGlobals = intlTelInputGlobals;
            // these vars persist through all instances of the plugin
            var id = 0;
            var defaults = {
                // whether or not to allow the dropdown
                allowDropdown: true,
                // if there is just a dial code in the input: remove it on blur
                autoHideDialCode: true,
                // add a placeholder in the input with an example number for the selected country
                autoPlaceholder: "polite",
                // modify the parentClass
                customContainer: "",
                // modify the auto placeholder
                customPlaceholder: null,
                // append menu to specified element
                dropdownContainer: null,
                // don't display these countries
                excludeCountries: [],
                // format the input value during initialisation and on setNumber
                formatOnDisplay: true,
                // geoIp lookup function
                geoIpLookup: null,
                // inject a hidden input with this name, and on submit, populate it with the result of getNumber
                hiddenInput: "",
                // initial country
                initialCountry: "",
                // localized country names e.g. { 'de': 'Deutschland' }
                localizedCountries: null,
                // don't insert international dial codes
                nationalMode: true,
                // display only these countries
                onlyCountries: [],
                // number type to use for placeholders
                placeholderNumberType: "MOBILE",
                // the countries at the top of the list. defaults to united states and united kingdom
                preferredCountries: ["us", "gb"],
                // display the country dial code next to the selected flag so it's not part of the typed number
                separateDialCode: false,
                // specify the path to the libphonenumber script to enable validation/formatting
                utilsScript: "",
            };
            // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
            var regionlessNanpNumbers = [
                "800",
                "822",
                "833",
                "844",
                "855",
                "866",
                "877",
                "880",
                "881",
                "882",
                "883",
                "884",
                "885",
                "886",
                "887",
                "888",
                "889",
            ];
            // utility function to iterate over an object. can't use Object.entries or native forEach because
            // of IE11
            var forEachProp = function forEachProp(obj, callback) {
                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length; i++) {
                    callback(keys[i], obj[keys[i]]);
                }
            };
            // run a method on each instance of the plugin
            var forEachInstance = function forEachInstance(method) {
                forEachProp(window.intlTelInputGlobals.instances, function (key) {
                    window.intlTelInputGlobals.instances[key][method]();
                });
            };
            // this is our plugin class that we will create an instance of
            // eslint-disable-next-line no-unused-vars
            var Iti =
                /*#__PURE__*/
                (function () {
                    function Iti(input, options) {
                        var _this = this;
                        _classCallCheck(this, Iti);
                        this.id = id++;
                        this.telInput = input;
                        this.activeItem = null;
                        this.highlightedItem = null;
                        // process specified options / defaults
                        // alternative to Object.assign, which isn't supported by IE11
                        var customOptions = options || {};
                        this.options = {};
                        forEachProp(defaults, function (key, value) {
                            _this.options[key] = customOptions.hasOwnProperty(key) ? customOptions[key] : value;
                        });
                        this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
                    }
                    _createClass(Iti, [
                        {
                            key: "_init",
                            value: function _init() {
                                var _this2 = this;
                                // if in nationalMode, disable options relating to dial codes
                                if (this.options.nationalMode) this.options.autoHideDialCode = false;
                                // if separateDialCode then doesn't make sense to A) insert dial code into input
                                // (autoHideDialCode), and B) display national numbers (because we're displaying the country
                                // dial code next to them)
                                if (this.options.separateDialCode) {
                                    this.options.autoHideDialCode = this.options.nationalMode = false;
                                }
                                // we cannot just test screen size as some smartphones/website meta tags will report desktop
                                // resolutions
                                // Note: for some reason jasmine breaks if you put this in the main Plugin function with the
                                // rest of these declarations
                                // Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
                                this.isMobile =
                                    /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                                        navigator.userAgent
                                    );
                                if (this.isMobile) {
                                    // trigger the mobile dropdown css
                                    document.body.classList.add("iti-mobile");
                                    // on mobile, we want a full screen dropdown, so we must append it to the body
                                    if (!this.options.dropdownContainer) this.options.dropdownContainer = document.body;
                                }
                                // these promises get resolved when their individual requests complete
                                // this way the dev can do something like iti.promise.then(...) to know when all requests are
                                // complete
                                if (typeof Promise !== "undefined") {
                                    var autoCountryPromise = new Promise(function (resolve, reject) {
                                        _this2.resolveAutoCountryPromise = resolve;
                                        _this2.rejectAutoCountryPromise = reject;
                                    });
                                    var utilsScriptPromise = new Promise(function (resolve, reject) {
                                        _this2.resolveUtilsScriptPromise = resolve;
                                        _this2.rejectUtilsScriptPromise = reject;
                                    });
                                    this.promise = Promise.all([autoCountryPromise, utilsScriptPromise]);
                                } else {
                                    // prevent errors when Promise doesn't exist
                                    this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function () {};
                                    this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function () {};
                                }
                                // in various situations there could be no country selected initially, but we need to be able
                                // to assume this variable exists
                                this.selectedCountryData = {};
                                // process all the data: onlyCountries, excludeCountries, preferredCountries etc
                                this._processCountryData();
                                // generate the markup
                                this._generateMarkup();
                                // set the initial state of the input value and the selected flag
                                this._setInitialState();
                                // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
                                this._initListeners();
                                // utils script, and auto country
                                this._initRequests();
                            },
                        },
                        {
                            key: "_processCountryData",
                            value: function _processCountryData() {
                                // process onlyCountries or excludeCountries array if present
                                this._processAllCountries();
                                // process the countryCodes map
                                this._processCountryCodes();
                                // process the preferredCountries
                                this._processPreferredCountries();
                                // translate countries according to localizedCountries option
                                if (this.options.localizedCountries) this._translateCountriesByLocale();
                                // sort countries by name
                                if (this.options.onlyCountries.length || this.options.localizedCountries) {
                                    this.countries.sort(this._countryNameSort);
                                }
                            },
                        },
                        {
                            key: "_addCountryCode",
                            value: function _addCountryCode(iso2, countryCode, priority) {
                                if (countryCode.length > this.countryCodeMaxLen) {
                                    this.countryCodeMaxLen = countryCode.length;
                                }
                                if (!this.countryCodes.hasOwnProperty(countryCode)) {
                                    this.countryCodes[countryCode] = [];
                                }
                                // bail if we already have this country for this countryCode
                                for (var i = 0; i < this.countryCodes[countryCode].length; i++) {
                                    if (this.countryCodes[countryCode][i] === iso2) return;
                                }
                                // check for undefined as 0 is falsy
                                var index = priority !== undefined$1 ? priority : this.countryCodes[countryCode].length;
                                this.countryCodes[countryCode][index] = iso2;
                            },
                        },
                        {
                            key: "_processAllCountries",
                            value: function _processAllCountries() {
                                if (this.options.onlyCountries.length) {
                                    var lowerCaseOnlyCountries = this.options.onlyCountries.map(function (country) {
                                        return country.toLowerCase();
                                    });
                                    this.countries = allCountries.filter(function (country) {
                                        return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
                                    });
                                } else if (this.options.excludeCountries.length) {
                                    var lowerCaseExcludeCountries = this.options.excludeCountries.map(function (
                                        country
                                    ) {
                                        return country.toLowerCase();
                                    });
                                    this.countries = allCountries.filter(function (country) {
                                        return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
                                    });
                                } else {
                                    this.countries = allCountries;
                                }
                            },
                        },
                        {
                            key: "_translateCountriesByLocale",
                            value: function _translateCountriesByLocale() {
                                for (var i = 0; i < this.countries.length; i++) {
                                    var iso = this.countries[i].iso2.toLowerCase();
                                    if (this.options.localizedCountries.hasOwnProperty(iso)) {
                                        this.countries[i].name = this.options.localizedCountries[iso];
                                    }
                                }
                            },
                        },
                        {
                            key: "_countryNameSort",
                            value: function _countryNameSort(a, b) {
                                return a.name.localeCompare(b.name);
                            },
                        },
                        {
                            key: "_processCountryCodes",
                            value: function _processCountryCodes() {
                                this.countryCodeMaxLen = 0;
                                // here we store just dial codes
                                this.dialCodes = {};
                                // here we store "country codes" (both dial codes and their area codes)
                                this.countryCodes = {};
                                // first: add dial codes
                                for (var i = 0; i < this.countries.length; i++) {
                                    var c = this.countries[i];
                                    if (!this.dialCodes[c.dialCode]) this.dialCodes[c.dialCode] = true;
                                    this._addCountryCode(c.iso2, c.dialCode, c.priority);
                                }
                                // next: add area codes
                                // this is a second loop over countries, to make sure we have all of the "root" countries
                                // already in the map, so that we can access them, as each time we add an area code substring
                                // to the map, we also need to include the "root" country's code, as that also matches
                                for (var _i = 0; _i < this.countries.length; _i++) {
                                    var _c = this.countries[_i];
                                    // area codes
                                    if (_c.areaCodes) {
                                        var rootCountryCode = this.countryCodes[_c.dialCode][0];
                                        // for each area code
                                        for (var j = 0; j < _c.areaCodes.length; j++) {
                                            var areaCode = _c.areaCodes[j];
                                            // for each digit in the area code to add all partial matches as well
                                            for (var k = 1; k < areaCode.length; k++) {
                                                var partialDialCode = _c.dialCode + areaCode.substr(0, k);
                                                // start with the root country, as that also matches this dial code
                                                this._addCountryCode(rootCountryCode, partialDialCode);
                                                this._addCountryCode(_c.iso2, partialDialCode);
                                            }
                                            // add the full area code
                                            this._addCountryCode(_c.iso2, _c.dialCode + areaCode);
                                        }
                                    }
                                }
                            },
                        },
                        {
                            key: "_processPreferredCountries",
                            value: function _processPreferredCountries() {
                                this.preferredCountries = [];
                                for (var i = 0; i < this.options.preferredCountries.length; i++) {
                                    var countryCode = this.options.preferredCountries[i].toLowerCase();
                                    var countryData = this._getCountryData(countryCode, false, true);
                                    if (countryData) this.preferredCountries.push(countryData);
                                }
                            },
                        },
                        {
                            key: "_createEl",
                            value: function _createEl(name, attrs, container) {
                                var el = document.createElement(name);
                                if (attrs)
                                    forEachProp(attrs, function (key, value) {
                                        return el.setAttribute(key, value);
                                    });
                                if (container) container.appendChild(el);
                                return el;
                            },
                        },
                        {
                            key: "_generateMarkup",
                            value: function _generateMarkup() {
                                // if autocomplete does not exist on the element and its form, then
                                // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
                                // easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
                                // autocompleted number, which on submit could mean wrong number is saved (esp in nationalMode)
                                if (
                                    !this.telInput.hasAttribute("autocomplete") &&
                                    !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))
                                ) {
                                    this.telInput.setAttribute("autocomplete", "off");
                                }
                                // containers (mostly for positioning)
                                var parentClass = "iti";
                                if (this.options.allowDropdown) parentClass += " iti--allow-dropdown";
                                if (this.options.separateDialCode) parentClass += " iti--separate-dial-code";
                                if (this.options.customContainer) {
                                    parentClass += " ";
                                    parentClass += this.options.customContainer;
                                }
                                var wrapper = this._createEl("div", {
                                    class: parentClass,
                                });
                                this.telInput.parentNode.insertBefore(wrapper, this.telInput);
                                this.flagsContainer = this._createEl(
                                    "div",
                                    {
                                        class: "iti__flag-container",
                                    },
                                    wrapper
                                );
                                wrapper.appendChild(this.telInput);
                                // selected flag (displayed to left of input)
                                this.selectedFlag = this._createEl(
                                    "div",
                                    {
                                        class: "iti__selected-flag",
                                        role: "combobox",
                                        "aria-controls": "iti-".concat(this.id, "__country-listbox"),
                                        "aria-owns": "iti-".concat(this.id, "__country-listbox"),
                                        "aria-expanded": "false",
                                    },
                                    this.flagsContainer
                                );
                                this.selectedFlagInner = this._createEl(
                                    "div",
                                    {
                                        class: "iti__flag",
                                    },
                                    this.selectedFlag
                                );
                                if (this.options.separateDialCode) {
                                    this.selectedDialCode = this._createEl(
                                        "div",
                                        {
                                            class: "iti__selected-dial-code",
                                        },
                                        this.selectedFlag
                                    );
                                }
                                if (this.options.allowDropdown) {
                                    // make element focusable and tab navigable
                                    this.selectedFlag.setAttribute("tabindex", "0");
                                    this.dropdownArrow = this._createEl(
                                        "div",
                                        {
                                            class: "iti__arrow",
                                        },
                                        this.selectedFlag
                                    );
                                    // country dropdown: preferred countries, then divider, then all countries
                                    this.countryList = this._createEl("ul", {
                                        class: "iti__country-list iti__hide",
                                        id: "iti-".concat(this.id, "__country-listbox"),
                                        role: "listbox",
                                        "aria-label": "List of countries",
                                    });
                                    if (this.preferredCountries.length) {
                                        this._appendListItems(this.preferredCountries, "iti__preferred", true);
                                        this._createEl(
                                            "li",
                                            {
                                                class: "iti__divider",
                                                role: "separator",
                                                "aria-disabled": "true",
                                            },
                                            this.countryList
                                        );
                                    }
                                    this._appendListItems(this.countries, "iti__standard");
                                    // create dropdownContainer markup
                                    if (this.options.dropdownContainer) {
                                        this.dropdown = this._createEl("div", {
                                            class: "iti iti--container",
                                        });
                                        this.dropdown.appendChild(this.countryList);
                                    } else {
                                        this.flagsContainer.appendChild(this.countryList);
                                    }
                                }
                                if (this.options.hiddenInput) {
                                    var hiddenInputName = this.options.hiddenInput;
                                    var name = this.telInput.getAttribute("name");
                                    if (name) {
                                        var i = name.lastIndexOf("[");
                                        // if input name contains square brackets, then give the hidden input the same name,
                                        // replacing the contents of the last set of brackets with the given hiddenInput name
                                        if (i !== -1)
                                            hiddenInputName = ""
                                                .concat(name.substr(0, i), "[")
                                                .concat(hiddenInputName, "]");
                                    }
                                    this.hiddenInput = this._createEl("input", {
                                        type: "hidden",
                                        name: hiddenInputName,
                                    });
                                    wrapper.appendChild(this.hiddenInput);
                                }
                            },
                        },
                        {
                            key: "_appendListItems",
                            value: function _appendListItems(countries, className, preferred) {
                                // we create so many DOM elements, it is faster to build a temp string
                                // and then add everything to the DOM in one go at the end
                                var tmp = "";
                                // for each country
                                for (var i = 0; i < countries.length; i++) {
                                    var c = countries[i];
                                    var idSuffix = preferred ? "-preferred" : "";
                                    // open the list item
                                    tmp += "<li class='iti__country "
                                        .concat(className, "' tabIndex='-1' id='iti-")
                                        .concat(this.id, "__item-")
                                        .concat(c.iso2)
                                        .concat(idSuffix, "' role='option' data-dial-code='")
                                        .concat(c.dialCode, "' data-country-code='")
                                        .concat(c.iso2, "' aria-selected='false'>");
                                    // add the flag
                                    tmp += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(
                                        c.iso2,
                                        "'></div></div>"
                                    );
                                    // and the country name and dial code
                                    tmp += "<span class='iti__country-name'>".concat(c.name, "</span>");
                                    tmp += "<span class='iti__dial-code'>+".concat(c.dialCode, "</span>");
                                    // close the list item
                                    tmp += "</li>";
                                }
                                this.countryList.insertAdjacentHTML("beforeend", tmp);
                            },
                        },
                        {
                            key: "_setInitialState",
                            value: function _setInitialState() {
                                // fix firefox bug: when first load page (with input with value set to number with intl dial
                                // code) and initialising plugin removes the dial code from the input, then refresh page,
                                // and we try to init plugin again but this time on number without dial code so get grey flag
                                var attributeValue = this.telInput.getAttribute("value");
                                var inputValue = this.telInput.value;
                                var useAttribute =
                                    attributeValue &&
                                    attributeValue.charAt(0) === "+" &&
                                    (!inputValue || inputValue.charAt(0) !== "+");
                                var val = useAttribute ? attributeValue : inputValue;
                                var dialCode = this._getDialCode(val);
                                var isRegionlessNanp = this._isRegionlessNanp(val);
                                var _this$options = this.options,
                                    initialCountry = _this$options.initialCountry,
                                    nationalMode = _this$options.nationalMode,
                                    autoHideDialCode = _this$options.autoHideDialCode,
                                    separateDialCode = _this$options.separateDialCode;
                                // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
                                // flag, else fall back to the default country
                                if (dialCode && !isRegionlessNanp) {
                                    this._updateFlagFromNumber(val);
                                } else if (initialCountry !== "auto") {
                                    // see if we should select a flag
                                    if (initialCountry) {
                                        this._setFlag(initialCountry.toLowerCase());
                                    } else {
                                        if (dialCode && isRegionlessNanp) {
                                            // has intl dial code, is regionless nanp, and no initialCountry, so default to US
                                            this._setFlag("us");
                                        } else {
                                            // no dial code and no initialCountry, so default to first in list
                                            this.defaultCountry = this.preferredCountries.length
                                                ? this.preferredCountries[0].iso2
                                                : this.countries[0].iso2;
                                            if (!val) {
                                                this._setFlag(this.defaultCountry);
                                            }
                                        }
                                    }
                                    // if empty and no nationalMode and no autoHideDialCode then insert the default dial code
                                    if (!val && !nationalMode && !autoHideDialCode && !separateDialCode) {
                                        this.telInput.value = "+".concat(this.selectedCountryData.dialCode);
                                    }
                                }
                                // NOTE: if initialCountry is set to auto, that will be handled separately
                                // format - note this wont be run after _updateDialCode as that's only called if no val
                                if (val) this._updateValFromNumber(val);
                            },
                        },
                        {
                            key: "_initListeners",
                            value: function _initListeners() {
                                this._initKeyListeners();
                                if (this.options.autoHideDialCode) this._initBlurListeners();
                                if (this.options.allowDropdown) this._initDropdownListeners();
                                if (this.hiddenInput) this._initHiddenInputListener();
                            },
                        },
                        {
                            key: "_initHiddenInputListener",
                            value: function _initHiddenInputListener() {
                                var _this3 = this;
                                this._handleHiddenInputSubmit = function () {
                                    _this3.hiddenInput.value = _this3.getNumber();
                                };
                                if (this.telInput.form)
                                    this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
                            },
                        },
                        {
                            key: "_getClosestLabel",
                            value: function _getClosestLabel() {
                                var el = this.telInput;
                                while (el && el.tagName !== "LABEL") {
                                    el = el.parentNode;
                                }
                                return el;
                            },
                        },
                        {
                            key: "_initDropdownListeners",
                            value: function _initDropdownListeners() {
                                var _this4 = this;
                                // hack for input nested inside label (which is valid markup): clicking the selected-flag to
                                // open the dropdown would then automatically trigger a 2nd click on the input which would
                                // close it again
                                this._handleLabelClick = function (e) {
                                    // if the dropdown is closed, then focus the input, else ignore the click
                                    if (_this4.countryList.classList.contains("iti__hide")) _this4.telInput.focus();
                                    else e.preventDefault();
                                };
                                var label = this._getClosestLabel();
                                if (label) label.addEventListener("click", this._handleLabelClick);
                                // toggle country dropdown on click
                                this._handleClickSelectedFlag = function () {
                                    // only intercept this event if we're opening the dropdown
                                    // else let it bubble up to the top ("click-off-to-close" listener)
                                    // we cannot just stopPropagation as it may be needed to close another instance
                                    if (
                                        _this4.countryList.classList.contains("iti__hide") &&
                                        !_this4.telInput.disabled &&
                                        !_this4.telInput.readOnly
                                    ) {
                                        _this4._showDropdown();
                                    }
                                };
                                this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag);
                                // open dropdown list if currently focused
                                this._handleFlagsContainerKeydown = function (e) {
                                    var isDropdownHidden = _this4.countryList.classList.contains("iti__hide");
                                    if (
                                        isDropdownHidden &&
                                        ["ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter"].indexOf(e.key) !== -1
                                    ) {
                                        // prevent form from being submitted if "ENTER" was pressed
                                        e.preventDefault();
                                        // prevent event from being handled again by document
                                        e.stopPropagation();
                                        _this4._showDropdown();
                                    }
                                    // allow navigation from dropdown to input on TAB
                                    if (e.key === "Tab") _this4._closeDropdown();
                                };
                                this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown);
                            },
                        },
                        {
                            key: "_initRequests",
                            value: function _initRequests() {
                                var _this5 = this;
                                // if the user has specified the path to the utils script, fetch it on window.load, else resolve
                                if (this.options.utilsScript && !window.intlTelInputUtils) {
                                    // if the plugin is being initialised after the window.load event has already been fired
                                    if (window.intlTelInputGlobals.documentReady()) {
                                        window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
                                    } else {
                                        // wait until the load event so we don't block any other requests e.g. the flags image
                                        window.addEventListener("load", function () {
                                            window.intlTelInputGlobals.loadUtils(_this5.options.utilsScript);
                                        });
                                    }
                                } else this.resolveUtilsScriptPromise();
                                if (this.options.initialCountry === "auto") this._loadAutoCountry();
                                else this.resolveAutoCountryPromise();
                            },
                        },
                        {
                            key: "_loadAutoCountry",
                            value: function _loadAutoCountry() {
                                // 3 options:
                                // 1) already loaded (we're done)
                                // 2) not already started loading (start)
                                // 3) already started loading (do nothing - just wait for loading callback to fire)
                                if (window.intlTelInputGlobals.autoCountry) {
                                    this.handleAutoCountry();
                                } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
                                    // don't do this twice!
                                    window.intlTelInputGlobals.startedLoadingAutoCountry = true;
                                    if (typeof this.options.geoIpLookup === "function") {
                                        this.options.geoIpLookup(
                                            function (countryCode) {
                                                window.intlTelInputGlobals.autoCountry = countryCode.toLowerCase();
                                                // tell all instances the auto country is ready
                                                // TODO: this should just be the current instances
                                                // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
                                                // away (e.g. if they have already done the geo ip lookup somewhere else). Using
                                                // setTimeout means that the current thread of execution will finish before executing
                                                // this, which allows the plugin to finish initialising.
                                                setTimeout(function () {
                                                    return forEachInstance("handleAutoCountry");
                                                });
                                            },
                                            function () {
                                                return forEachInstance("rejectAutoCountryPromise");
                                            }
                                        );
                                    }
                                }
                            },
                        },
                        {
                            key: "_initKeyListeners",
                            value: function _initKeyListeners() {
                                var _this6 = this;
                                // update flag on keyup
                                this._handleKeyupEvent = function () {
                                    if (_this6._updateFlagFromNumber(_this6.telInput.value)) {
                                        _this6._triggerCountryChange();
                                    }
                                };
                                this.telInput.addEventListener("keyup", this._handleKeyupEvent);
                                // update flag on cut/paste events (now supported in all major browsers)
                                this._handleClipboardEvent = function () {
                                    // hack because "paste" event is fired before input is updated
                                    setTimeout(_this6._handleKeyupEvent);
                                };
                                this.telInput.addEventListener("cut", this._handleClipboardEvent);
                                this.telInput.addEventListener("paste", this._handleClipboardEvent);
                            },
                        },
                        {
                            key: "_cap",
                            value: function _cap(number) {
                                var max = this.telInput.getAttribute("maxlength");
                                return max && number.length > max ? number.substr(0, max) : number;
                            },
                        },
                        {
                            key: "_initBlurListeners",
                            value: function _initBlurListeners() {
                                var _this7 = this;
                                // on blur or form submit: if just a dial code then remove it
                                this._handleSubmitOrBlurEvent = function () {
                                    _this7._removeEmptyDialCode();
                                };
                                if (this.telInput.form)
                                    this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent);
                                this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent);
                            },
                        },
                        {
                            key: "_removeEmptyDialCode",
                            value: function _removeEmptyDialCode() {
                                if (this.telInput.value.charAt(0) === "+") {
                                    var numeric = this._getNumeric(this.telInput.value);
                                    // if just a plus, or if just a dial code
                                    if (!numeric || this.selectedCountryData.dialCode === numeric) {
                                        this.telInput.value = "";
                                    }
                                }
                            },
                        },
                        {
                            key: "_getNumeric",
                            value: function _getNumeric(s) {
                                return s.replace(/\D/g, "");
                            },
                        },
                        {
                            key: "_trigger",
                            value: function _trigger(name) {
                                // have to use old school document.createEvent as IE11 doesn't support `new Event()` syntax
                                var e = document.createEvent("Event");
                                e.initEvent(name, true, true);
                                // can bubble, and is cancellable
                                this.telInput.dispatchEvent(e);
                            },
                        },
                        {
                            key: "_showDropdown",
                            value: function _showDropdown() {
                                this.countryList.classList.remove("iti__hide");
                                this.selectedFlag.setAttribute("aria-expanded", "true");
                                this._setDropdownPosition();
                                // update highlighting and scroll to active list item
                                if (this.activeItem) {
                                    this._highlightListItem(this.activeItem, false);
                                    this._scrollTo(this.activeItem, true);
                                }
                                // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
                                this._bindDropdownListeners();
                                // update the arrow
                                this.dropdownArrow.classList.add("iti__arrow--up");
                                this._trigger("open:countrydropdown");
                            },
                        },
                        {
                            key: "_toggleClass",
                            value: function _toggleClass(el, className, shouldHaveClass) {
                                if (shouldHaveClass && !el.classList.contains(className)) el.classList.add(className);
                                else if (!shouldHaveClass && el.classList.contains(className))
                                    el.classList.remove(className);
                            },
                        },
                        {
                            key: "_setDropdownPosition",
                            value: function _setDropdownPosition() {
                                var _this8 = this;
                                if (this.options.dropdownContainer) {
                                    this.options.dropdownContainer.appendChild(this.dropdown);
                                }
                                if (!this.isMobile) {
                                    var pos = this.telInput.getBoundingClientRect();
                                    // windowTop from https://stackoverflow.com/a/14384091/217866
                                    var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                                    var inputTop = pos.top + windowTop;
                                    var dropdownHeight = this.countryList.offsetHeight;
                                    // dropdownFitsBelow = (dropdownBottom < windowBottom)
                                    var dropdownFitsBelow =
                                        inputTop + this.telInput.offsetHeight + dropdownHeight <
                                        windowTop + window.innerHeight;
                                    var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
                                    // by default, the dropdown will be below the input. If we want to position it above the
                                    // input, we add the dropup class.
                                    this._toggleClass(
                                        this.countryList,
                                        "iti__country-list--dropup",
                                        !dropdownFitsBelow && dropdownFitsAbove
                                    );
                                    // if dropdownContainer is enabled, calculate postion
                                    if (this.options.dropdownContainer) {
                                        // by default the dropdown will be directly over the input because it's not in the flow.
                                        // If we want to position it below, we need to add some extra top value.
                                        var extraTop =
                                            !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.offsetHeight;
                                        // calculate placement
                                        this.dropdown.style.top = "".concat(inputTop + extraTop, "px");
                                        this.dropdown.style.left = "".concat(pos.left + document.body.scrollLeft, "px");
                                        // close menu on window scroll
                                        this._handleWindowScroll = function () {
                                            return _this8._closeDropdown();
                                        };
                                        window.addEventListener("scroll", this._handleWindowScroll);
                                    }
                                }
                            },
                        },
                        {
                            key: "_getClosestListItem",
                            value: function _getClosestListItem(target) {
                                var el = target;
                                while (el && el !== this.countryList && !el.classList.contains("iti__country")) {
                                    el = el.parentNode;
                                }
                                // if we reached the countryList element, then return null
                                return el === this.countryList ? null : el;
                            },
                        },
                        {
                            key: "_bindDropdownListeners",
                            value: function _bindDropdownListeners() {
                                var _this9 = this;
                                // when mouse over a list item, just highlight that one
                                // we add the class "highlight", so if they hit "enter" we know which one to select
                                this._handleMouseoverCountryList = function (e) {
                                    // handle event delegation, as we're listening for this event on the countryList
                                    var listItem = _this9._getClosestListItem(e.target);
                                    if (listItem) _this9._highlightListItem(listItem, false);
                                };
                                this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
                                // listen for country selection
                                this._handleClickCountryList = function (e) {
                                    var listItem = _this9._getClosestListItem(e.target);
                                    if (listItem) _this9._selectListItem(listItem);
                                };
                                this.countryList.addEventListener("click", this._handleClickCountryList);
                                // click off to close
                                // (except when this initial opening click is bubbling up)
                                // we cannot just stopPropagation as it may be needed to close another instance
                                var isOpening = true;
                                this._handleClickOffToClose = function () {
                                    if (!isOpening) _this9._closeDropdown();
                                    isOpening = false;
                                };
                                document.documentElement.addEventListener("click", this._handleClickOffToClose);
                                // listen for up/down scrolling, enter to select, or letters to jump to country name.
                                // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
                                // just hit down and hold it to scroll down (no keyup event).
                                // listen on the document because that's where key events are triggered if no input has focus
                                var query = "";
                                var queryTimer = null;
                                this._handleKeydownOnDropdown = function (e) {
                                    // prevent down key from scrolling the whole page,
                                    // and enter key from submitting a form etc
                                    e.preventDefault();
                                    // up and down to navigate
                                    if (
                                        e.key === "ArrowUp" ||
                                        e.key === "Up" ||
                                        e.key === "ArrowDown" ||
                                        e.key === "Down"
                                    )
                                        _this9._handleUpDownKey(e.key);
                                    else if (e.key === "Enter") _this9._handleEnterKey();
                                    else if (e.key === "Escape") _this9._closeDropdown();
                                    else if (/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
                                        // jump to countries that start with the query string
                                        if (queryTimer) clearTimeout(queryTimer);
                                        query += e.key.toLowerCase();
                                        _this9._searchForCountry(query);
                                        // if the timer hits 1 second, reset the query
                                        queryTimer = setTimeout(function () {
                                            query = "";
                                        }, 1e3);
                                    }
                                };
                                document.addEventListener("keydown", this._handleKeydownOnDropdown);
                            },
                        },
                        {
                            key: "_handleUpDownKey",
                            value: function _handleUpDownKey(key) {
                                var next =
                                    key === "ArrowUp" || key === "Up"
                                        ? this.highlightedItem.previousElementSibling
                                        : this.highlightedItem.nextElementSibling;
                                if (next) {
                                    // skip the divider
                                    if (next.classList.contains("iti__divider")) {
                                        next =
                                            key === "ArrowUp" || key === "Up"
                                                ? next.previousElementSibling
                                                : next.nextElementSibling;
                                    }
                                    this._highlightListItem(next, true);
                                }
                            },
                        },
                        {
                            key: "_handleEnterKey",
                            value: function _handleEnterKey() {
                                if (this.highlightedItem) this._selectListItem(this.highlightedItem);
                            },
                        },
                        {
                            key: "_searchForCountry",
                            value: function _searchForCountry(query) {
                                for (var i = 0; i < this.countries.length; i++) {
                                    if (this._startsWith(this.countries[i].name, query)) {
                                        var listItem = this.countryList.querySelector(
                                            "#iti-".concat(this.id, "__item-").concat(this.countries[i].iso2)
                                        );
                                        // update highlighting and scroll
                                        this._highlightListItem(listItem, false);
                                        this._scrollTo(listItem, true);
                                        break;
                                    }
                                }
                            },
                        },
                        {
                            key: "_startsWith",
                            value: function _startsWith(a, b) {
                                return a.substr(0, b.length).toLowerCase() === b;
                            },
                        },
                        {
                            key: "_updateValFromNumber",
                            value: function _updateValFromNumber(originalNumber) {
                                var number = originalNumber;
                                if (
                                    this.options.formatOnDisplay &&
                                    window.intlTelInputUtils &&
                                    this.selectedCountryData
                                ) {
                                    var useNational =
                                        !this.options.separateDialCode &&
                                        (this.options.nationalMode || number.charAt(0) !== "+");
                                    var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat,
                                        NATIONAL = _intlTelInputUtils$nu.NATIONAL,
                                        INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
                                    var format = useNational ? NATIONAL : INTERNATIONAL;
                                    number = intlTelInputUtils.formatNumber(
                                        number,
                                        this.selectedCountryData.iso2,
                                        format
                                    );
                                }
                                number = this._beforeSetNumber(number);
                                this.telInput.value = number;
                            },
                        },
                        {
                            key: "_updateFlagFromNumber",
                            value: function _updateFlagFromNumber(originalNumber) {
                                // if we're in nationalMode and we already have US/Canada selected, make sure the number starts
                                // with a +1 so _getDialCode will be able to extract the area code
                                // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag
                                // from the number), that means we're initialising the plugin with a number that already has a
                                // dial code, so fine to ignore this bit
                                var number = originalNumber;
                                var selectedDialCode = this.selectedCountryData.dialCode;
                                var isNanp = selectedDialCode === "1";
                                if (number && this.options.nationalMode && isNanp && number.charAt(0) !== "+") {
                                    if (number.charAt(0) !== "1") number = "1".concat(number);
                                    number = "+".concat(number);
                                }
                                // update flag if user types area code for another country
                                if (this.options.separateDialCode && selectedDialCode && number.charAt(0) !== "+") {
                                    number = "+".concat(selectedDialCode).concat(number);
                                }
                                // try and extract valid dial code from input
                                var dialCode = this._getDialCode(number, true);
                                var numeric = this._getNumeric(number);
                                var countryCode = null;
                                if (dialCode) {
                                    var countryCodes = this.countryCodes[this._getNumeric(dialCode)];
                                    // check if the right country is already selected. this should be false if the number is
                                    // longer than the matched dial code because in this case we need to make sure that if
                                    // there are multiple country matches, that the first one is selected (note: we could
                                    // just check that here, but it requires the same loop that we already have later)
                                    var alreadySelected =
                                        countryCodes.indexOf(this.selectedCountryData.iso2) !== -1 &&
                                        numeric.length <= dialCode.length - 1;
                                    var isRegionlessNanpNumber =
                                        selectedDialCode === "1" && this._isRegionlessNanp(numeric);
                                    // only update the flag if:
                                    // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
                                    // AND
                                    // B) the right country is not already selected
                                    if (!isRegionlessNanpNumber && !alreadySelected) {
                                        // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first
                                        // non-empty index
                                        for (var j = 0; j < countryCodes.length; j++) {
                                            if (countryCodes[j]) {
                                                countryCode = countryCodes[j];
                                                break;
                                            }
                                        }
                                    }
                                } else if (number.charAt(0) === "+" && numeric.length) {
                                    // invalid dial code, so empty
                                    // Note: use getNumeric here because the number has not been formatted yet, so could contain
                                    // bad chars
                                    countryCode = "";
                                } else if (!number || number === "+") {
                                    // empty, or just a plus, so default
                                    countryCode = this.defaultCountry;
                                }
                                if (countryCode !== null) {
                                    return this._setFlag(countryCode);
                                }
                                return false;
                            },
                        },
                        {
                            key: "_isRegionlessNanp",
                            value: function _isRegionlessNanp(number) {
                                var numeric = this._getNumeric(number);
                                if (numeric.charAt(0) === "1") {
                                    var areaCode = numeric.substr(1, 3);
                                    return regionlessNanpNumbers.indexOf(areaCode) !== -1;
                                }
                                return false;
                            },
                        },
                        {
                            key: "_highlightListItem",
                            value: function _highlightListItem(listItem, shouldFocus) {
                                var prevItem = this.highlightedItem;
                                if (prevItem) prevItem.classList.remove("iti__highlight");
                                this.highlightedItem = listItem;
                                this.highlightedItem.classList.add("iti__highlight");
                                if (shouldFocus) this.highlightedItem.focus();
                            },
                        },
                        {
                            key: "_getCountryData",
                            value: function _getCountryData(countryCode, ignoreOnlyCountriesOption, allowFail) {
                                var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
                                for (var i = 0; i < countryList.length; i++) {
                                    if (countryList[i].iso2 === countryCode) {
                                        return countryList[i];
                                    }
                                }
                                if (allowFail) {
                                    return null;
                                }
                                throw new Error("No country data for '".concat(countryCode, "'"));
                            },
                        },
                        {
                            key: "_setFlag",
                            value: function _setFlag(countryCode) {
                                var prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
                                // do this first as it will throw an error and stop if countryCode is invalid
                                this.selectedCountryData = countryCode
                                    ? this._getCountryData(countryCode, false, false)
                                    : {};
                                // update the defaultCountry - we only need the iso2 from now on, so just store that
                                if (this.selectedCountryData.iso2) {
                                    this.defaultCountry = this.selectedCountryData.iso2;
                                }
                                this.selectedFlagInner.setAttribute("class", "iti__flag iti__".concat(countryCode));
                                // update the selected country's title attribute
                                var title = countryCode
                                    ? ""
                                          .concat(this.selectedCountryData.name, ": +")
                                          .concat(this.selectedCountryData.dialCode)
                                    : "Unknown";
                                this.selectedFlag.setAttribute("title", title);
                                if (this.options.separateDialCode) {
                                    var dialCode = this.selectedCountryData.dialCode
                                        ? "+".concat(this.selectedCountryData.dialCode)
                                        : "";
                                    this.selectedDialCode.innerHTML = dialCode;
                                    // offsetWidth is zero if input is in a hidden container during initialisation
                                    var selectedFlagWidth =
                                        this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
                                    // add 6px of padding after the grey selected-dial-code box, as this is what we use in the css
                                    this.telInput.style.paddingLeft = "".concat(selectedFlagWidth + 6, "px");
                                }
                                // and the input's placeholder
                                this._updatePlaceholder();
                                // update the active list item
                                if (this.options.allowDropdown) {
                                    var prevItem = this.activeItem;
                                    if (prevItem) {
                                        prevItem.classList.remove("iti__active");
                                        prevItem.setAttribute("aria-selected", "false");
                                    }
                                    if (countryCode) {
                                        // check if there is a preferred item first, else fall back to standard
                                        var nextItem =
                                            this.countryList.querySelector(
                                                "#iti-".concat(this.id, "__item-").concat(countryCode, "-preferred")
                                            ) ||
                                            this.countryList.querySelector(
                                                "#iti-".concat(this.id, "__item-").concat(countryCode)
                                            );
                                        nextItem.setAttribute("aria-selected", "true");
                                        nextItem.classList.add("iti__active");
                                        this.activeItem = nextItem;
                                        this.selectedFlag.setAttribute(
                                            "aria-activedescendant",
                                            nextItem.getAttribute("id")
                                        );
                                    }
                                }
                                // return if the flag has changed or not
                                return prevCountry.iso2 !== countryCode;
                            },
                        },
                        {
                            key: "_getHiddenSelectedFlagWidth",
                            value: function _getHiddenSelectedFlagWidth() {
                                // to get the right styling to apply, all we need is a shallow clone of the container,
                                // and then to inject a deep clone of the selectedFlag element
                                var containerClone = this.telInput.parentNode.cloneNode();
                                containerClone.style.visibility = "hidden";
                                document.body.appendChild(containerClone);
                                var flagsContainerClone = this.flagsContainer.cloneNode();
                                containerClone.appendChild(flagsContainerClone);
                                var selectedFlagClone = this.selectedFlag.cloneNode(true);
                                flagsContainerClone.appendChild(selectedFlagClone);
                                var width = selectedFlagClone.offsetWidth;
                                containerClone.parentNode.removeChild(containerClone);
                                return width;
                            },
                        },
                        {
                            key: "_updatePlaceholder",
                            value: function _updatePlaceholder() {
                                var shouldSetPlaceholder =
                                    this.options.autoPlaceholder === "aggressive" ||
                                    (!this.hadInitialPlaceholder && this.options.autoPlaceholder === "polite");
                                if (window.intlTelInputUtils && shouldSetPlaceholder) {
                                    var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType];
                                    var placeholder = this.selectedCountryData.iso2
                                        ? intlTelInputUtils.getExampleNumber(
                                              this.selectedCountryData.iso2,
                                              this.options.nationalMode,
                                              numberType
                                          )
                                        : "";
                                    placeholder = this._beforeSetNumber(placeholder);
                                    if (typeof this.options.customPlaceholder === "function") {
                                        placeholder = this.options.customPlaceholder(
                                            placeholder,
                                            this.selectedCountryData
                                        );
                                    }
                                    this.telInput.setAttribute("placeholder", placeholder);
                                }
                            },
                        },
                        {
                            key: "_selectListItem",
                            value: function _selectListItem(listItem) {
                                // update selected flag and active list item
                                var flagChanged = this._setFlag(listItem.getAttribute("data-country-code"));
                                this._closeDropdown();
                                this._updateDialCode(listItem.getAttribute("data-dial-code"), true);
                                // focus the input
                                this.telInput.focus();
                                // put cursor at end - this fix is required for FF and IE11 (with nationalMode=false i.e. auto
                                // inserting dial code), who try to put the cursor at the beginning the first time
                                var len = this.telInput.value.length;
                                this.telInput.setSelectionRange(len, len);
                                if (flagChanged) {
                                    this._triggerCountryChange();
                                }
                            },
                        },
                        {
                            key: "_closeDropdown",
                            value: function _closeDropdown() {
                                this.countryList.classList.add("iti__hide");
                                this.selectedFlag.setAttribute("aria-expanded", "false");
                                // update the arrow
                                this.dropdownArrow.classList.remove("iti__arrow--up");
                                // unbind key events
                                document.removeEventListener("keydown", this._handleKeydownOnDropdown);
                                document.documentElement.removeEventListener("click", this._handleClickOffToClose);
                                this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList);
                                this.countryList.removeEventListener("click", this._handleClickCountryList);
                                // remove menu from container
                                if (this.options.dropdownContainer) {
                                    if (!this.isMobile) window.removeEventListener("scroll", this._handleWindowScroll);
                                    if (this.dropdown.parentNode) this.dropdown.parentNode.removeChild(this.dropdown);
                                }
                                this._trigger("close:countrydropdown");
                            },
                        },
                        {
                            key: "_scrollTo",
                            value: function _scrollTo(element, middle) {
                                var container = this.countryList;
                                // windowTop from https://stackoverflow.com/a/14384091/217866
                                var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                                var containerHeight = container.offsetHeight;
                                var containerTop = container.getBoundingClientRect().top + windowTop;
                                var containerBottom = containerTop + containerHeight;
                                var elementHeight = element.offsetHeight;
                                var elementTop = element.getBoundingClientRect().top + windowTop;
                                var elementBottom = elementTop + elementHeight;
                                var newScrollTop = elementTop - containerTop + container.scrollTop;
                                var middleOffset = containerHeight / 2 - elementHeight / 2;
                                if (elementTop < containerTop) {
                                    // scroll up
                                    if (middle) newScrollTop -= middleOffset;
                                    container.scrollTop = newScrollTop;
                                } else if (elementBottom > containerBottom) {
                                    // scroll down
                                    if (middle) newScrollTop += middleOffset;
                                    var heightDifference = containerHeight - elementHeight;
                                    container.scrollTop = newScrollTop - heightDifference;
                                }
                            },
                        },
                        {
                            key: "_updateDialCode",
                            value: function _updateDialCode(newDialCodeBare, hasSelectedListItem) {
                                var inputVal = this.telInput.value;
                                // save having to pass this every time
                                var newDialCode = "+".concat(newDialCodeBare);
                                var newNumber;
                                if (inputVal.charAt(0) === "+") {
                                    // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not)
                                    var prevDialCode = this._getDialCode(inputVal);
                                    if (prevDialCode) {
                                        // current number contains a valid dial code, so replace it
                                        newNumber = inputVal.replace(prevDialCode, newDialCode);
                                    } else {
                                        // current number contains an invalid dial code, so ditch it
                                        // (no way to determine where the invalid dial code ends and the rest of the number begins)
                                        newNumber = newDialCode;
                                    }
                                } else if (this.options.nationalMode || this.options.separateDialCode) {
                                    // don't do anything
                                    return;
                                } else {
                                    // nationalMode is disabled
                                    if (inputVal) {
                                        // there is an existing value with no dial code: prefix the new dial code
                                        newNumber = newDialCode + inputVal;
                                    } else if (hasSelectedListItem || !this.options.autoHideDialCode) {
                                        // no existing value and either they've just selected a list item, or autoHideDialCode is
                                        // disabled: insert new dial code
                                        newNumber = newDialCode;
                                    } else {
                                        return;
                                    }
                                }
                                this.telInput.value = newNumber;
                            },
                        },
                        {
                            key: "_getDialCode",
                            value: function _getDialCode(number, includeAreaCode) {
                                var dialCode = "";
                                // only interested in international numbers (starting with a plus)
                                if (number.charAt(0) === "+") {
                                    var numericChars = "";
                                    // iterate over chars
                                    for (var i = 0; i < number.length; i++) {
                                        var c = number.charAt(i);
                                        // if char is number (https://stackoverflow.com/a/8935649/217866)
                                        if (!isNaN(parseInt(c, 10))) {
                                            numericChars += c;
                                            // if current numericChars make a valid dial code
                                            if (includeAreaCode) {
                                                if (this.countryCodes[numericChars]) {
                                                    // store the actual raw string (useful for matching later)
                                                    dialCode = number.substr(0, i + 1);
                                                }
                                            } else {
                                                if (this.dialCodes[numericChars]) {
                                                    dialCode = number.substr(0, i + 1);
                                                    // if we're just looking for a dial code, we can break as soon as we find one
                                                    break;
                                                }
                                            }
                                            // stop searching as soon as we can - in this case when we hit max len
                                            if (numericChars.length === this.countryCodeMaxLen) {
                                                break;
                                            }
                                        }
                                    }
                                }
                                return dialCode;
                            },
                        },
                        {
                            key: "_getFullNumber",
                            value: function _getFullNumber() {
                                var val = this.telInput.value.trim();
                                var dialCode = this.selectedCountryData.dialCode;
                                var prefix;
                                var numericVal = this._getNumeric(val);
                                if (this.options.separateDialCode && val.charAt(0) !== "+" && dialCode && numericVal) {
                                    // when using separateDialCode, it is visible so is effectively part of the typed number
                                    prefix = "+".concat(dialCode);
                                } else {
                                    prefix = "";
                                }
                                return prefix + val;
                            },
                        },
                        {
                            key: "_beforeSetNumber",
                            value: function _beforeSetNumber(originalNumber) {
                                var number = originalNumber;
                                if (this.options.separateDialCode) {
                                    var dialCode = this._getDialCode(number);
                                    // if there is a valid dial code
                                    if (dialCode) {
                                        // in case _getDialCode returned an area code as well
                                        dialCode = "+".concat(this.selectedCountryData.dialCode);
                                        // a lot of numbers will have a space separating the dial code and the main number, and
                                        // some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get
                                        // rid of it
                                        // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
                                        var start =
                                            number[dialCode.length] === " " || number[dialCode.length] === "-"
                                                ? dialCode.length + 1
                                                : dialCode.length;
                                        number = number.substr(start);
                                    }
                                }
                                return this._cap(number);
                            },
                        },
                        {
                            key: "_triggerCountryChange",
                            value: function _triggerCountryChange() {
                                this._trigger("countrychange");
                            },
                        },
                        {
                            key: "handleAutoCountry",
                            value: function handleAutoCountry() {
                                if (this.options.initialCountry === "auto") {
                                    // we must set this even if there is an initial val in the input: in case the initial val is
                                    // invalid and they delete it - they should see their auto country
                                    this.defaultCountry = window.intlTelInputGlobals.autoCountry;
                                    // if there's no initial value in the input, then update the flag
                                    if (!this.telInput.value) {
                                        this.setCountry(this.defaultCountry);
                                    }
                                    this.resolveAutoCountryPromise();
                                }
                            },
                        },
                        {
                            key: "handleUtils",
                            value: function handleUtils() {
                                // if the request was successful
                                if (window.intlTelInputUtils) {
                                    // if there's an initial value in the input, then format it
                                    if (this.telInput.value) {
                                        this._updateValFromNumber(this.telInput.value);
                                    }
                                    this._updatePlaceholder();
                                }
                                this.resolveUtilsScriptPromise();
                            },
                        },
                        {
                            key: "destroy",
                            value: function destroy() {
                                var form = this.telInput.form;
                                if (this.options.allowDropdown) {
                                    // make sure the dropdown is closed (and unbind listeners)
                                    this._closeDropdown();
                                    this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag);
                                    this.flagsContainer.removeEventListener(
                                        "keydown",
                                        this._handleFlagsContainerKeydown
                                    );
                                    // label click hack
                                    var label = this._getClosestLabel();
                                    if (label) label.removeEventListener("click", this._handleLabelClick);
                                }
                                // unbind hiddenInput listeners
                                if (this.hiddenInput && form)
                                    form.removeEventListener("submit", this._handleHiddenInputSubmit);
                                // unbind autoHideDialCode listeners
                                if (this.options.autoHideDialCode) {
                                    if (form) form.removeEventListener("submit", this._handleSubmitOrBlurEvent);
                                    this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent);
                                }
                                // unbind key events, and cut/paste events
                                this.telInput.removeEventListener("keyup", this._handleKeyupEvent);
                                this.telInput.removeEventListener("cut", this._handleClipboardEvent);
                                this.telInput.removeEventListener("paste", this._handleClipboardEvent);
                                // remove attribute of id instance: data-intl-tel-input-id
                                this.telInput.removeAttribute("data-intl-tel-input-id");
                                // remove markup (but leave the original input)
                                var wrapper = this.telInput.parentNode;
                                wrapper.parentNode.insertBefore(this.telInput, wrapper);
                                wrapper.parentNode.removeChild(wrapper);
                                delete window.intlTelInputGlobals.instances[this.id];
                            },
                        },
                        {
                            key: "getExtension",
                            value: function getExtension() {
                                if (window.intlTelInputUtils) {
                                    return intlTelInputUtils.getExtension(
                                        this._getFullNumber(),
                                        this.selectedCountryData.iso2
                                    );
                                }
                                return "";
                            },
                        },
                        {
                            key: "getNumber",
                            value: function getNumber(format) {
                                if (window.intlTelInputUtils) {
                                    var iso2 = this.selectedCountryData.iso2;
                                    return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format);
                                }
                                return "";
                            },
                        },
                        {
                            key: "getNumberType",
                            value: function getNumberType() {
                                if (window.intlTelInputUtils) {
                                    return intlTelInputUtils.getNumberType(
                                        this._getFullNumber(),
                                        this.selectedCountryData.iso2
                                    );
                                }
                                return -99;
                            },
                        },
                        {
                            key: "getSelectedCountryData",
                            value: function getSelectedCountryData() {
                                return this.selectedCountryData;
                            },
                        },
                        {
                            key: "getValidationError",
                            value: function getValidationError() {
                                if (window.intlTelInputUtils) {
                                    var iso2 = this.selectedCountryData.iso2;
                                    return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
                                }
                                return -99;
                            },
                        },
                        {
                            key: "isValidNumber",
                            value: function isValidNumber() {
                                var val = this._getFullNumber().trim();
                                var countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
                                return window.intlTelInputUtils
                                    ? intlTelInputUtils.isValidNumber(val, countryCode)
                                    : null;
                            },
                        },
                        {
                            key: "setCountry",
                            value: function setCountry(originalCountryCode) {
                                var countryCode = originalCountryCode.toLowerCase();
                                // check if already selected
                                if (!this.selectedFlagInner.classList.contains("iti__".concat(countryCode))) {
                                    this._setFlag(countryCode);
                                    this._updateDialCode(this.selectedCountryData.dialCode, false);
                                    this._triggerCountryChange();
                                }
                            },
                        },
                        {
                            key: "setNumber",
                            value: function setNumber(number) {
                                // we must update the flag first, which updates this.selectedCountryData, which is used for
                                // formatting the number before displaying it
                                var flagChanged = this._updateFlagFromNumber(number);
                                this._updateValFromNumber(number);
                                if (flagChanged) {
                                    this._triggerCountryChange();
                                }
                            },
                        },
                        {
                            key: "setPlaceholderNumberType",
                            value: function setPlaceholderNumberType(type) {
                                this.options.placeholderNumberType = type;
                                this._updatePlaceholder();
                            },
                        },
                    ]);
                    return Iti;
                })();
            /********************
             *  STATIC METHODS
             ********************/
            // get the country data object
            intlTelInputGlobals.getCountryData = function () {
                return allCountries;
            };
            // inject a <script> element to load utils.js
            var injectScript = function injectScript(path, handleSuccess, handleFailure) {
                // inject a new script element into the page
                var script = document.createElement("script");
                script.onload = function () {
                    forEachInstance("handleUtils");
                    if (handleSuccess) handleSuccess();
                };
                script.onerror = function () {
                    forEachInstance("rejectUtilsScriptPromise");
                    if (handleFailure) handleFailure();
                };
                script.className = "iti-load-utils";
                script.async = true;
                script.src = path;
                document.body.appendChild(script);
            };
            // load the utils script
            intlTelInputGlobals.loadUtils = function (path) {
                // 2 options:
                // 1) not already started loading (start)
                // 2) already started loading (do nothing - just wait for the onload callback to fire, which will
                // trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
                if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
                    // only do this once
                    window.intlTelInputGlobals.startedLoadingUtilsScript = true;
                    // if we have promises, then return a promise
                    if (typeof Promise !== "undefined") {
                        return new Promise(function (resolve, reject) {
                            return injectScript(path, resolve, reject);
                        });
                    }
                    injectScript(path);
                }
                return null;
            };
            // default options
            intlTelInputGlobals.defaults = defaults;
            // version
            intlTelInputGlobals.version = "17.0.19";
            // convenience wrapper
            return function (input, options) {
                var iti = new Iti(input, options);
                iti._init();
                input.setAttribute("data-intl-tel-input-id", iti.id);
                window.intlTelInputGlobals.instances[iti.id] = iti;
                return iti;
            };
        })();
    });
})(intlTelInput$1);

/**
 * Exposing intl-tel-input as a component
 */

(function (module) {
    module.exports = intlTelInput$1.exports;
})(intlTelInput$2);

var intlTelInput = /*@__PURE__*/ recipe.getDefaultExportFromCjs(intlTelInput$2.exports);

/*
 * Component.
 */
function PhoneNumberInput$1(_a) {
    var defaultCountry = _a.defaultCountry,
        autoComplete = _a.autoComplete,
        autofocus = _a.autofocus,
        name = _a.name,
        onInputBlur = _a.onInputBlur,
        onInputFocus = _a.onInputFocus,
        onChange = _a.onChange,
        hasError = _a.hasError,
        value = _a.value;
    function handleFocus() {
        if (onInputFocus !== undefined) {
            onInputFocus({
                id: name,
                value: value,
            });
        }
    }
    function handleBlur() {
        if (onInputBlur !== undefined) {
            onInputBlur({
                id: name,
                value: value,
            });
        }
    }
    var onChangeRef = React.useRef(onChange);
    React.useEffect(
        function () {
            onChangeRef.current = onChange;
        },
        [onChange]
    );
    var handleChange = React.useCallback(
        function (newValue) {
            if (onChangeRef.current !== undefined) {
                onChangeRef.current({
                    id: name,
                    value: newValue,
                });
            }
        },
        [onChangeRef]
    );
    var handleCountryChange = React.useCallback(
        function (ev) {
            if (onChangeRef.current !== undefined) {
                onChangeRef.current({
                    id: name,
                    value: ev.target.value,
                });
            }
        },
        [onChangeRef]
    );
    var inputRef = React.useRef(null);
    React.useEffect(function () {
        if (inputRef.current !== null && inputRef.current.dataset["intl-tel-input-id"] === undefined) {
            inputRef.current.value = value;
            intlTelInput(inputRef.current, {
                initialCountry: defaultCountry,
                nationalMode: false,
                preferredCountries: defaultCountry ? [defaultCountry] : [],
            });
            inputRef.current.addEventListener("countrychange", handleCountryChange);
        }
    }, []);
    /*
     * Render.
     */
    return jsxRuntime.jsxs(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "inputContainer" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "style",
                        sessionAuth.__assign(
                            { type: "text/css" },
                            {
                                children: [
                                    // There should be a better way around this... :/
                                    phoneNumberInputLibStyles.replace(":root", '[data-supertokens~="container"]'),
                                    '\n                    .iti__flag {background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/img/flags.png");}\n\n                    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n                        .iti__flag {background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/img/flags@2x.png");}\n                    }\n                ',
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            {
                                "data-supertokens": "phoneInputWrapper inputWrapper ".concat(
                                    hasError ? "inputError" : ""
                                ),
                            },
                            {
                                children: [
                                    jsxRuntime.jsx("input", {
                                        type: "tel",
                                        "data-supertokens": "input",
                                        name: name + "_text",
                                        autoFocus: autofocus,
                                        autoComplete: autoComplete,
                                        onChange: function (ev) {
                                            handleChange(ev.target.value);
                                        },
                                        onFocus: handleFocus,
                                        onBlur: handleBlur,
                                        ref: inputRef,
                                    }),
                                    hasError === true &&
                                        jsxRuntime.jsx(
                                            "div",
                                            sessionAuth.__assign(
                                                { "data-supertokens": "inputAdornment inputAdornmentError" },
                                                { children: jsxRuntime.jsx(arrowLeftIcon.ErrorIcon, {}) }
                                            )
                                        ),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
}
// TODO: type props
var phoneNumberInputWithInjectedProps = function (injectedProps) {
    return function (props) {
        return jsxRuntime.jsx(PhoneNumberInput$1, sessionAuth.__assign({}, injectedProps, props));
    };
};

var EmailOrPhoneForm = index.withOverride("PasswordlessEmailOrPhoneForm", function PasswordlessEmailOrPhoneForm(props) {
    var _this = this;
    var _a = React.useState(false),
        isPhoneNumber = _a[0],
        setIsPhoneNumber = _a[1];
    var userContext = sessionAuth.useUserContext();
    var emailOrPhoneInput = React.useMemo(
        function () {
            return isPhoneNumber
                ? phoneNumberInputWithInjectedProps({
                      defaultCountry: props.config.signInUpFeature.defaultCountry,
                  })
                : undefined;
        },
        [props.config.signInUpFeature.defaultCountry, isPhoneNumber]
    );
    return jsxRuntime.jsx(arrowLeftIcon.FormBase, {
        clearError: props.clearError,
        onError: props.onError,
        formFields: [
            {
                id: "emailOrPhone",
                label: "PWLESS_SIGN_IN_UP_EMAIL_OR_PHONE_LABEL",
                inputComponent: emailOrPhoneInput,
                optional: false,
                autofocus: true,
                placeholder: "",
                validate: defaultValidate,
            },
        ],
        buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields, setValue) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                var emailOrPhone,
                    emailValidationRes,
                    response,
                    phoneValidationRes,
                    response,
                    intPhoneNumber,
                    phoneValidationResAfterGuess,
                    ex_1;
                var _a;
                return sessionAuth.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            emailOrPhone =
                                (_a = formFields.find(function (field) {
                                    return field.id === "emailOrPhone";
                                })) === null || _a === void 0
                                    ? void 0
                                    : _a.value;
                            if (emailOrPhone === undefined) {
                                throw new index.STGeneralError("GENERAL_ERROR_EMAIL_OR_PHONE_UNDEFINED");
                            }
                            return [4 /*yield*/, defaultEmailValidator(emailOrPhone)];
                        case 1:
                            if (!(_b.sent() === undefined)) return [3 /*break*/, 6];
                            return [4 /*yield*/, props.config.validateEmailAddress(emailOrPhone)];
                        case 2:
                            emailValidationRes = _b.sent();
                            if (!(emailValidationRes === undefined)) return [3 /*break*/, 4];
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    email: emailOrPhone,
                                    userContext: userContext,
                                }),
                            ];
                        case 3:
                            response = _b.sent();
                            return [2 /*return*/, response];
                        case 4:
                            throw new index.STGeneralError(emailValidationRes);
                        case 5:
                            return [3 /*break*/, 19];
                        case 6:
                            return [4 /*yield*/, props.config.validatePhoneNumber(emailOrPhone)];
                        case 7:
                            phoneValidationRes = _b.sent();
                            if (!(phoneValidationRes === undefined)) return [3 /*break*/, 9];
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    phoneNumber: emailOrPhone,
                                    userContext: userContext,
                                }),
                            ];
                        case 8:
                            response = _b.sent();
                            return [2 /*return*/, response];
                        case 9:
                            return [
                                4 /*yield*/,
                                props.config.signInUpFeature.guessInternationPhoneNumberFromInputPhoneNumber(
                                    emailOrPhone,
                                    props.config.signInUpFeature.defaultCountry
                                ),
                            ];
                        case 10:
                            intPhoneNumber = _b.sent();
                            if (!(intPhoneNumber && isPhoneNumber !== true)) return [3 /*break*/, 18];
                            return [4 /*yield*/, props.config.validatePhoneNumber(intPhoneNumber)];
                        case 11:
                            phoneValidationResAfterGuess = _b.sent();
                            if (!(phoneValidationResAfterGuess === undefined)) return [3 /*break*/, 16];
                            _b.label = 12;
                        case 12:
                            _b.trys.push([12, 14, , 15]);
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    phoneNumber: intPhoneNumber,
                                    userContext: userContext,
                                }),
                            ];
                        case 13:
                            return [2 /*return*/, _b.sent()];
                        case 14:
                            ex_1 = _b.sent();
                            // General errors from the API can make createCode throw but we want to switch to the phone UI anyway
                            setValue("emailOrPhone", intPhoneNumber);
                            setIsPhoneNumber(true);
                            throw ex_1;
                        case 15:
                            return [3 /*break*/, 17];
                        case 16:
                            // In this case we could get a phonenumber but not a completely valid one
                            // We want to switch to the phone UI and pre-fill the number
                            setValue("emailOrPhone", intPhoneNumber);
                            setIsPhoneNumber(true);
                            throw new index.STGeneralError("PWLESS_EMAIL_OR_PHONE_INVALID_INPUT_GUESS_PHONE_ERR");
                        case 17:
                            return [3 /*break*/, 19];
                        case 18:
                            throw new index.STGeneralError(phoneValidationRes);
                        case 19:
                            return [2 /*return*/];
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
        footer: jsxRuntime.jsx(SignInUpFooter, {
            privacyPolicyLink: props.config.signInUpFeature.privacyPolicyLink,
            termsOfServiceLink: props.config.signInUpFeature.termsOfServiceLink,
        }),
    });
});

var ResendButton = index.withOverride("PasswordlessResendButton", function PasswordlessResendButton(_a) {
    var loginAttemptInfo = _a.loginAttemptInfo,
        resendEmailOrSMSGapInSeconds = _a.resendEmailOrSMSGapInSeconds,
        onClick = _a.onClick;
    var t = translationContext.useTranslation();
    var getTimeLeft = React.useCallback(
        function () {
            var timeLeft = loginAttemptInfo.lastResend + resendEmailOrSMSGapInSeconds * 1000 - Date.now();
            return timeLeft < 0 ? undefined : Math.ceil(timeLeft / 1000);
        },
        [loginAttemptInfo, resendEmailOrSMSGapInSeconds]
    );
    var _b = React.useState(getTimeLeft()),
        secsUntilResend = _b[0],
        setSecsUntilResend = _b[1];
    React.useEffect(
        function () {
            // This runs every time the loginAttemptInfo updates, so after every resend
            var interval = setInterval(function () {
                var timeLeft = getTimeLeft();
                if (timeLeft === undefined) {
                    clearInterval(interval);
                }
                setSecsUntilResend(timeLeft);
            }, 500);
            return function () {
                // This can safely run twice
                clearInterval(interval);
            };
        },
        [getTimeLeft, setSecsUntilResend]
    );
    return jsxRuntime.jsx(
        "button",
        sessionAuth.__assign(
            {
                type: "button",
                disabled: secsUntilResend !== undefined,
                onClick: onClick,
                "data-supertokens": "link linkButton resendCodeBtn",
            },
            {
                children:
                    secsUntilResend !== undefined
                        ? jsxRuntime.jsxs(React.Fragment, {
                              children: [
                                  t("PWLESS_RESEND_BTN_DISABLED_START"),
                                  jsxRuntime.jsxs("strong", {
                                      children: [
                                          Math.floor(secsUntilResend / 60)
                                              .toString()
                                              .padStart(2, "0"),
                                          ":",
                                          (secsUntilResend % 60).toString().padStart(2, "0"),
                                      ],
                                  }),
                                  t("PWLESS_RESEND_BTN_DISABLED_END"),
                              ],
                          })
                        : loginAttemptInfo.contactMethod === "EMAIL"
                        ? t("PWLESS_RESEND_BTN_EMAIL")
                        : t("PWLESS_RESEND_BTN_PHONE"),
            }
        )
    );
});

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http="//www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Imports.
 */
/*
 * Component.
 */
function SMSLargeIcon() {
    return jsxRuntime.jsx(
        "svg",
        sessionAuth.__assign(
            { xmlns: "http://www.w3.org/2000/svg", width: "52.013", height: "41.889", viewBox: "0 0 52.013 41.889" },
            {
                children: jsxRuntime.jsx(
                    "g",
                    sessionAuth.__assign(
                        { id: "Group_10400", "data-name": "Group 10400", transform: "translate(-724.625 -241.125)" },
                        {
                            children: jsxRuntime.jsxs(
                                "g",
                                sessionAuth.__assign(
                                    { id: "Group_10399", "data-name": "Group 10399" },
                                    {
                                        children: [
                                            jsxRuntime.jsxs(
                                                "g",
                                                sessionAuth.__assign(
                                                    { id: "Group_10398", "data-name": "Group 10398" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsxs(
                                                                "g",
                                                                sessionAuth.__assign(
                                                                    {
                                                                        id: "_2639922_sms_icon",
                                                                        "data-name": "2639922_sms_icon",
                                                                        transform: "translate(732.916 242)",
                                                                    },
                                                                    {
                                                                        children: [
                                                                            jsxRuntime.jsx("path", {
                                                                                id: "Union_52",
                                                                                "data-name": "Union 52",
                                                                                d: "M7.124 37.96a6.26 6.26 0 0 0 3.652-5H6.593A6.592 6.592 0 0 1 0 26.367V6.592A6.592 6.592 0 0 1 6.593 0h29.664a6.592 6.592 0 0 1 6.593 6.592v19.775a6.592 6.592 0 0 1-6.593 6.592h-17.68a13.355 13.355 0 0 1-11.159 6.576zm20.893-21.48a3.3 3.3 0 1 0 3.3-3.3 3.3 3.3 0 0 0-3.3 3.3zm-9.887 0a3.3 3.3 0 1 0 3.3-3.3 3.295 3.295 0 0 0-3.3 3.3zm-9.888 0a3.3 3.3 0 1 0 3.3-3.3 3.3 3.3 0 0 0-3.301 3.3z",
                                                                                transform: "translate(-.001)",
                                                                                strokeWidth: "1.75px",
                                                                                stroke: "#000",
                                                                                fill: "#c4f3ff",
                                                                            }),
                                                                            jsxRuntime.jsx("ellipse", {
                                                                                id: "Ellipse_3013",
                                                                                "data-name": "Ellipse 3013",
                                                                                cy: ".917",
                                                                                ry: ".917",
                                                                                transform: "translate(7.335 38.506)",
                                                                                stroke: "#000",
                                                                                fill: "#c4f3ff",
                                                                            }),
                                                                        ],
                                                                    }
                                                                )
                                                            ),
                                                            jsxRuntime.jsx("path", {
                                                                id: "Intersection_2",
                                                                "data-name": "Intersection 2",
                                                                fill: "#8ae7ff",
                                                                d: "M177.409-21836.576v-.33l-.214-1.131a6.271 6.271 0 0 0 3.651-5h-4.184a6.59 6.59 0 0 1-6.512-5.588h42.495a7.846 7.846 0 0 1-1.607 3.605 6.576 6.576 0 0 1-4.712 1.982h-14.845c-1.545-.09-2.537-.164-2.537-.164l-.077.164h-.219a13.342 13.342 0 0 1-11.156 6.572l-.082-.439z",
                                                                transform: "translate(562.766 22118)",
                                                            }),
                                                            jsxRuntime.jsx("path", {
                                                                id: "Intersection_1",
                                                                "data-name": "Intersection 1",
                                                                fill: "#8ae7ff",
                                                                d: "M209.246-21846.41s.494-22.641 0-25.178a8.7 8.7 0 0 0-2.767-4.41 6.6 6.6 0 0 1 6.369 6.59v19.775a6.6 6.6 0 0 1-5.724 6.537 6.213 6.213 0 0 0 2.122-3.314z",
                                                                transform: "translate(561.882 22118.172)",
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsxs(
                                                "g",
                                                sessionAuth.__assign(
                                                    {
                                                        id: "_2639922_sms_icon-2",
                                                        "data-name": "2639922_sms_icon",
                                                        transform: "translate(732.916 242.174)",
                                                    },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx("path", {
                                                                id: "Union_52-2",
                                                                "data-name": "Union 52",
                                                                d: "M7.124 37.96a6.26 6.26 0 0 0 3.652-5H6.593A6.592 6.592 0 0 1 0 26.367V6.592A6.592 6.592 0 0 1 6.593 0h29.664a6.592 6.592 0 0 1 6.593 6.592v19.775a6.592 6.592 0 0 1-6.593 6.592h-17.68a13.355 13.355 0 0 1-11.159 6.576zm20.893-21.48a3.3 3.3 0 1 0 3.3-3.3 3.3 3.3 0 0 0-3.3 3.3zm-9.887 0a3.3 3.3 0 1 0 3.3-3.3 3.295 3.295 0 0 0-3.3 3.3zm-9.888 0a3.3 3.3 0 1 0 3.3-3.3 3.3 3.3 0 0 0-3.301 3.3z",
                                                                transform: "translate(-.001)",
                                                                fill: "none",
                                                                strokeWidth: "1.75px",
                                                                stroke: "#000",
                                                            }),
                                                            jsxRuntime.jsx("ellipse", {
                                                                id: "Ellipse_3013-2",
                                                                "data-name": "Ellipse 3013",
                                                                cy: ".917",
                                                                ry: ".917",
                                                                transform: "translate(7.335 38.506)",
                                                                fill: "none",
                                                                stroke: "#000",
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsxs(
                                                "g",
                                                sessionAuth.__assign(
                                                    { id: "Group_10397", "data-name": "Group 10397" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_104",
                                                                "data-name": "Line 104",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#000",
                                                                transform: "translate(725.5 266.84)",
                                                                d: "M0 0h9.872",
                                                            }),
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_105",
                                                                "data-name": "Line 105",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#fff",
                                                                transform: "translate(725.5 268.59)",
                                                                d: "M0 0h9.872",
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsxs(
                                                "g",
                                                sessionAuth.__assign(
                                                    { id: "Group_10396", "data-name": "Group 10396" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_103",
                                                                "data-name": "Line 103",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#000",
                                                                transform: "translate(725.5 260.17)",
                                                                d: "M0 0h12.461",
                                                            }),
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_102",
                                                                "data-name": "Line 102",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#fff",
                                                                transform: "translate(725.5 261.92)",
                                                                d: "M0 0h12.461",
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsx("path", {
                                                id: "Path_91918",
                                                "data-name": "Path 91918",
                                                fill: "#8ae7ff",
                                                d: "M599.827 22145.373a1.62 1.62 0 0 0 1.38-1.336c.247-1.234.267 1.752.267 1.752l-1.647-.178z",
                                                transform: "translate(170 -21876)",
                                            }),
                                            jsxRuntime.jsxs(
                                                "g",
                                                sessionAuth.__assign(
                                                    { id: "Group_10395", "data-name": "Group 10395" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_100",
                                                                "data-name": "Line 100",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#000",
                                                                transform: "translate(725.5 253.5)",
                                                                d: "M0 0h9.872",
                                                            }),
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_101",
                                                                "data-name": "Line 101",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#fff",
                                                                transform: "translate(725.5 255.25)",
                                                                d: "M0 0h9.872",
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                        ],
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
}

var PasswordlessLinkSent = function (props) {
    var t = translationContext.useTranslation();
    var userContext = sessionAuth.useUserContext();
    var _a = React.useState(props.error !== undefined ? "ERROR" : "READY"),
        status = _a[0],
        setStatus = _a[1];
    // Any because node types are included here, messing with return type of setTimeout
    var resendNotifTimeout = React.useRef();
    React.useEffect(function () {
        return function () {
            // This can safely run even if it was cleared before
            if (resendNotifTimeout.current) {
                clearTimeout(resendNotifTimeout.current);
            }
        };
    }, []);
    var resendEmail = React.useCallback(
        function () {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                var response, generalError, e_1;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            props.clearError();
                            response = void 0;
                            generalError = void 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.resendCode({
                                    deviceId: props.loginAttemptInfo.deviceId,
                                    preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            if (index.STGeneralError.isThisError(e_1)) {
                                generalError = e_1;
                            } else {
                                throw e_1;
                            }
                            return [3 /*break*/, 4];
                        case 4:
                            if (response !== undefined && response.status === "OK") {
                                setStatus("LINK_RESENT");
                                resendNotifTimeout.current = setTimeout(function () {
                                    setStatus(function (status) {
                                        return status === "LINK_RESENT" ? "READY" : status;
                                    });
                                    resendNotifTimeout.current = undefined;
                                }, 2000);
                            } else {
                                setStatus("ERROR");
                                if (generalError !== undefined) {
                                    props.onError(generalError.message);
                                }
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            _a.sent();
                            setStatus("ERROR");
                            return [3 /*break*/, 6];
                        case 6:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.recipeImplementation, props.loginAttemptInfo, props.config, setStatus]
    );
    var resendActive = status === "LINK_RESENT";
    return jsxRuntime.jsx(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    sessionAuth.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                status === "ERROR" &&
                                    jsxRuntime.jsx(index.GeneralError, {
                                        error: props.error === undefined ? "SOMETHING_WENT_WRONG_ERROR" : props.error,
                                    }),
                                resendActive &&
                                    jsxRuntime.jsx(
                                        "div",
                                        sessionAuth.__assign(
                                            { "data-supertokens": "generalSuccess" },
                                            { children: t("PWLESS_LINK_SENT_RESEND_SUCCESS") }
                                        )
                                    ),
                                jsxRuntime.jsx(
                                    "div",
                                    sessionAuth.__assign(
                                        { "data-supertokens": "sendCodeIcon" },
                                        {
                                            children:
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? jsxRuntime.jsx(utils$3.EmailLargeIcon, {})
                                                    : jsxRuntime.jsx(SMSLargeIcon, {}),
                                        }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    sessionAuth.__assign(
                                        { "data-supertokens": "headerTitle headerTinyTitle" },
                                        { children: t("PWLESS_LINK_SENT_RESEND_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsxs(
                                    "div",
                                    sessionAuth.__assign(
                                        { "data-supertokens": "primaryText sendCodeText" },
                                        {
                                            children: [
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? t("PWLESS_LINK_SENT_RESEND_DESC_START_EMAIL")
                                                    : t("PWLESS_LINK_SENT_RESEND_DESC_START_PHONE"),
                                                jsxRuntime.jsx("strong", {
                                                    children: props.loginAttemptInfo.contactInfo,
                                                }),
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? t("PWLESS_LINK_SENT_RESEND_DESC_END_EMAIL")
                                                    : t("PWLESS_LINK_SENT_RESEND_DESC_END_PHONE"),
                                            ],
                                        }
                                    )
                                ),
                                jsxRuntime.jsx(ResendButton, {
                                    loginAttemptInfo: props.loginAttemptInfo,
                                    resendEmailOrSMSGapInSeconds:
                                        props.config.signInUpFeature.resendEmailOrSMSGapInSeconds,
                                    onClick: resendEmail,
                                }),
                                jsxRuntime.jsxs(
                                    "div",
                                    sessionAuth.__assign(
                                        {
                                            "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                                            onClick: function () {
                                                return props.recipeImplementation.clearLoginAttemptInfo({
                                                    userContext: userContext,
                                                });
                                            },
                                        },
                                        {
                                            children: [
                                                jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, {}),
                                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                                    ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                                                    : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE"),
                                            ],
                                        }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
var LinkSent = index.withOverride("PasswordlessLinkSent", PasswordlessLinkSent);

var PhoneForm = index.withOverride("PasswordlessPhoneForm", function PasswordlessPhoneForm(props) {
    var _this = this;
    var userContext = sessionAuth.useUserContext();
    var phoneInput = React.useMemo(
        function () {
            return phoneNumberInputWithInjectedProps({
                defaultCountry: props.config.signInUpFeature.defaultCountry,
            });
        },
        [props.config.signInUpFeature.defaultCountry]
    );
    return jsxRuntime.jsx(arrowLeftIcon.FormBase, {
        clearError: props.clearError,
        onError: props.onError,
        formFields: [
            {
                id: "phoneNumber",
                label: "PWLESS_SIGN_IN_UP_PHONE_LABEL",
                inputComponent: phoneInput,
                optional: false,
                autofocus: true,
                placeholder: "",
                validate: arrowLeftIcon.defaultValidate,
            },
        ],
        buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                var phoneNumber, validationRes, response;
                var _a;
                return sessionAuth.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            phoneNumber =
                                (_a = formFields.find(function (field) {
                                    return field.id === "phoneNumber";
                                })) === null || _a === void 0
                                    ? void 0
                                    : _a.value;
                            if (phoneNumber === undefined) {
                                throw new index.STGeneralError("GENERAL_ERROR_PHONE_UNDEFINED");
                            }
                            return [4 /*yield*/, props.config.validatePhoneNumber(phoneNumber)];
                        case 1:
                            validationRes = _b.sent();
                            if (validationRes !== undefined) {
                                throw new index.STGeneralError(validationRes);
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    phoneNumber: phoneNumber,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _b.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
        footer: jsxRuntime.jsx(SignInUpFooter, {
            privacyPolicyLink: props.config.signInUpFeature.privacyPolicyLink,
            termsOfServiceLink: props.config.signInUpFeature.termsOfServiceLink,
        }),
    });
});

var SignInUpHeader = index.withOverride("PasswordlessSignInUpHeader", function PasswordlessSignInUpHeader() {
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                sessionAuth.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("PWLESS_SIGN_IN_UP_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

var UserInputCodeFormFooter = index.withOverride(
    "PasswordlessUserInputCodeFormFooter",
    function PasswordlessUserInputCodeFormFooter(_a) {
        var loginAttemptInfo = _a.loginAttemptInfo,
            recipeImplementation = _a.recipeImplementation;
        var t = translationContext.useTranslation();
        var userContext = sessionAuth.useUserContext();
        return jsxRuntime.jsx(React.Fragment, {
            children: jsxRuntime.jsxs(
                "div",
                sessionAuth.__assign(
                    {
                        "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                        onClick: function () {
                            return recipeImplementation.clearLoginAttemptInfo({
                                userContext: userContext,
                            });
                        },
                    },
                    {
                        children: [
                            jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, {}),
                            loginAttemptInfo.contactMethod === "EMAIL"
                                ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                                : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE"),
                        ],
                    }
                )
            ),
        });
    }
);

var UserInputCodeForm = index.withOverride(
    "PasswordlessUserInputCodeForm",
    function PasswordlessUserInputCodeForm(props) {
        var _this = this;
        var t = translationContext.useTranslation();
        var userContext = sessionAuth.useUserContext();
        // We need this any because the node types are also loaded
        var _a = React.useState(),
            clearResendNotifTimeout = _a[0],
            setClearResendNotifTimeout = _a[1];
        React.useEffect(
            function () {
                // This is just to clean up on unmount and if the clear timeout changes
                return function () {
                    clearTimeout(clearResendNotifTimeout);
                };
            },
            [clearResendNotifTimeout]
        );
        function resend() {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response, generalError, e_1;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            response = void 0;
                            generalError = void 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.resendCode({
                                    deviceId: props.loginAttemptInfo.deviceId,
                                    preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            if (index.STGeneralError.isThisError(e_1)) {
                                generalError = e_1;
                            } else {
                                throw e_1;
                            }
                            return [3 /*break*/, 4];
                        case 4:
                            if (generalError !== undefined) {
                                props.onError(generalError.message);
                            } else {
                                if (response === undefined) {
                                    throw new Error("Should not come here");
                                }
                                if (response.status === "OK") {
                                    setClearResendNotifTimeout(
                                        setTimeout(function () {
                                            setClearResendNotifTimeout(undefined);
                                        }, 2000)
                                    );
                                }
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            _a.sent();
                            props.onError("SOMETHING_WENT_WRONG_ERROR");
                            return [3 /*break*/, 6];
                        case 6:
                            return [2 /*return*/];
                    }
                });
            });
        }
        return jsxRuntime.jsxs(React.Fragment, {
            children: [
                clearResendNotifTimeout !== undefined &&
                    jsxRuntime.jsx(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "generalSuccess" },
                            {
                                children:
                                    props.loginAttemptInfo.contactMethod === "EMAIL"
                                        ? t("PWLESS_RESEND_SUCCESS_EMAIL")
                                        : t("PWLESS_RESEND_SUCCESS_PHONE"),
                            }
                        )
                    ),
                jsxRuntime.jsx(arrowLeftIcon.FormBase, {
                    clearError: props.clearError,
                    onError: props.onError,
                    formFields: [
                        {
                            id: "userInputCode",
                            label: "",
                            labelComponent: jsxRuntime.jsxs(
                                "div",
                                sessionAuth.__assign(
                                    { "data-supertokens": "codeInputLabelWrapper" },
                                    {
                                        children: [
                                            jsxRuntime.jsx(arrowLeftIcon.Label, {
                                                value: "PWLESS_USER_INPUT_CODE_INPUT_LABEL",
                                                "data-supertokens": "codeInputLabel",
                                            }),
                                            jsxRuntime.jsx(ResendButton, {
                                                loginAttemptInfo: props.loginAttemptInfo,
                                                resendEmailOrSMSGapInSeconds:
                                                    props.config.signInUpFeature.resendEmailOrSMSGapInSeconds,
                                                onClick: resend,
                                            }),
                                        ],
                                    }
                                )
                            ),
                            autofocus: true,
                            optional: false,
                            clearOnSubmit: true,
                            placeholder: "",
                            validate: userInputCodeValidate,
                        },
                    ],
                    onSuccess: props.onSuccess,
                    buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
                    callAPI: function (formFields) {
                        return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                            var userInputCode, response;
                            var _a;
                            return sessionAuth.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        userInputCode =
                                            (_a = formFields.find(function (field) {
                                                return field.id === "userInputCode";
                                            })) === null || _a === void 0
                                                ? void 0
                                                : _a.value;
                                        if (userInputCode === undefined || userInputCode.length === 0) {
                                            throw new index.STGeneralError("GENERAL_ERROR_OTP_UNDEFINED");
                                        }
                                        return [
                                            4 /*yield*/,
                                            props.recipeImplementation.consumeCode({
                                                deviceId: props.loginAttemptInfo.deviceId,
                                                preAuthSessionId: props.loginAttemptInfo.preAuthSessionId,
                                                userInputCode: userInputCode,
                                                userContext: userContext,
                                            }),
                                        ];
                                    case 1:
                                        response = _b.sent();
                                        if (response.status === "OK" || response.status === "RESTART_FLOW_ERROR") {
                                            return [2 /*return*/, response];
                                        }
                                        if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
                                            throw new index.STGeneralError("GENERAL_ERROR_OTP_INVALID");
                                        }
                                        if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
                                            throw new index.STGeneralError("GENERAL_ERROR_OTP_EXPIRED");
                                        }
                                        throw new index.STGeneralError("SOMETHING_WENT_WRONG_ERROR");
                                }
                            });
                        });
                    },
                    validateOnBlur: false,
                    showLabels: true,
                    footer: jsxRuntime.jsx(
                        UserInputCodeFormFooter,
                        sessionAuth.__assign({}, props, { loginAttemptInfo: props.loginAttemptInfo })
                    ),
                }),
            ],
        });
    }
);

var UserInputCodeFormHeader = index.withOverride(
    "PasswordlessUserInputCodeFormHeader",
    function PasswordlessUserInputCodeFormHeader(_a) {
        var loginAttemptInfo = _a.loginAttemptInfo;
        var t = translationContext.useTranslation();
        return jsxRuntime.jsxs(React.Fragment, {
            children: [
                jsxRuntime.jsx(
                    "div",
                    sessionAuth.__assign(
                        { "data-supertokens": "headerTitle" },
                        { children: t("PWLESS_USER_INPUT_CODE_HEADER_TITLE") }
                    )
                ),
                jsxRuntime.jsxs(
                    "div",
                    sessionAuth.__assign(
                        { "data-supertokens": "headerSubtitle secondaryText" },
                        {
                            children: [
                                loginAttemptInfo.flowType === "USER_INPUT_CODE"
                                    ? t("PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE")
                                    : t("PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE_LINK"),
                                jsxRuntime.jsx("br", {}),
                                jsxRuntime.jsx("strong", { children: loginAttemptInfo.contactInfo }),
                            ],
                        }
                    )
                ),
                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
            ],
        });
    }
);

exports.SignInUpScreens = void 0;
(function (SignInUpScreens) {
    SignInUpScreens[(SignInUpScreens["CloseTab"] = 0)] = "CloseTab";
    SignInUpScreens[(SignInUpScreens["LinkSent"] = 1)] = "LinkSent";
    SignInUpScreens[(SignInUpScreens["EmailForm"] = 2)] = "EmailForm";
    SignInUpScreens[(SignInUpScreens["PhoneForm"] = 3)] = "PhoneForm";
    SignInUpScreens[(SignInUpScreens["EmailOrPhoneForm"] = 4)] = "EmailOrPhoneForm";
    SignInUpScreens[(SignInUpScreens["UserInputCodeForm"] = 5)] = "UserInputCodeForm";
})(exports.SignInUpScreens || (exports.SignInUpScreens = {}));
/*
 * Component.
 */
var SignInUpTheme = function (_a) {
    var activeScreen = _a.activeScreen,
        featureState = _a.featureState,
        props = sessionAuth.__rest(_a, ["activeScreen", "featureState"]);
    var commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: function () {
            return props.dispatch({ type: "setError", error: undefined });
        },
        onError: function (error) {
            return props.dispatch({ type: "setError", error: error });
        },
        error: featureState.error,
    };
    return activeScreen === exports.SignInUpScreens.CloseTab
        ? jsxRuntime.jsx(CloseTabScreen, sessionAuth.__assign({}, commonProps))
        : activeScreen === exports.SignInUpScreens.LinkSent
        ? jsxRuntime.jsx(
              LinkSent,
              sessionAuth.__assign({}, commonProps, { loginAttemptInfo: featureState.loginAttemptInfo })
          )
        : jsxRuntime.jsxs(
              "div",
              sessionAuth.__assign(
                  { "data-supertokens": "container" },
                  {
                      children: [
                          jsxRuntime.jsx(
                              "div",
                              sessionAuth.__assign(
                                  { "data-supertokens": "row" },
                                  {
                                      children:
                                          featureState.loaded &&
                                          jsxRuntime.jsxs(React.Fragment, {
                                              children: [
                                                  activeScreen === exports.SignInUpScreens.UserInputCodeForm
                                                      ? jsxRuntime.jsx(
                                                            UserInputCodeFormHeader,
                                                            sessionAuth.__assign({}, commonProps, {
                                                                loginAttemptInfo: featureState.loginAttemptInfo,
                                                            })
                                                        )
                                                      : jsxRuntime.jsx(SignInUpHeader, {}),
                                                  featureState.error !== undefined &&
                                                      jsxRuntime.jsx(index.GeneralError, { error: featureState.error }),
                                                  activeScreen === exports.SignInUpScreens.EmailForm
                                                      ? jsxRuntime.jsx(EmailForm, sessionAuth.__assign({}, commonProps))
                                                      : activeScreen === exports.SignInUpScreens.PhoneForm
                                                      ? jsxRuntime.jsx(PhoneForm, sessionAuth.__assign({}, commonProps))
                                                      : activeScreen === exports.SignInUpScreens.EmailOrPhoneForm
                                                      ? jsxRuntime.jsx(
                                                            EmailOrPhoneForm,
                                                            sessionAuth.__assign({}, commonProps)
                                                        )
                                                      : activeScreen === exports.SignInUpScreens.UserInputCodeForm
                                                      ? jsxRuntime.jsx(
                                                            UserInputCodeForm,
                                                            sessionAuth.__assign({}, commonProps, {
                                                                loginAttemptInfo: featureState.loginAttemptInfo,
                                                                onSuccess: props.onSuccess,
                                                            })
                                                        )
                                                      : null,
                                              ],
                                          }),
                                  }
                              )
                          ),
                          jsxRuntime.jsx(authWidgetWrapper.SuperTokensBranding, {}),
                      ],
                  }
              )
          );
};
function SignInUpThemeWrapper(props) {
    var hasFont = index.hasFontDefined(props.config.rootStyle);
    var activeScreen = getActiveScreen(props);
    var activeStyle;
    if (activeScreen === exports.SignInUpScreens.CloseTab) {
        activeStyle = props.config.signInUpFeature.closeTabScreenStyle;
    } else if (activeScreen === exports.SignInUpScreens.LinkSent) {
        activeStyle = props.config.signInUpFeature.linkSentScreenStyle;
    } else if (activeScreen === exports.SignInUpScreens.UserInputCodeForm) {
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (activeScreen === exports.SignInUpScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === exports.SignInUpScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === exports.SignInUpScreens.EmailOrPhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    }
    return jsxRuntime.jsx(
        sessionAuth.UserContextWrapper,
        sessionAuth.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    ThemeBase,
                    sessionAuth.__assign(
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
                        {
                            children: jsxRuntime.jsx(
                                SignInUpTheme,
                                sessionAuth.__assign({}, props, { activeScreen: activeScreen })
                            ),
                        }
                    )
                ),
            }
        )
    );
}
function getActiveScreen(props) {
    if (props.featureState.successInAnotherTab) {
        return exports.SignInUpScreens.CloseTab;
    } else if (props.featureState.loginAttemptInfo && props.featureState.loginAttemptInfo.flowType === "MAGIC_LINK") {
        return exports.SignInUpScreens.LinkSent;
    } else if (props.featureState.loginAttemptInfo) {
        return exports.SignInUpScreens.UserInputCodeForm;
    } else if (props.config.contactMethod === "EMAIL") {
        return exports.SignInUpScreens.EmailForm;
    } else if (props.config.contactMethod === "PHONE") {
        return exports.SignInUpScreens.PhoneForm;
    } else if (props.config.contactMethod === "EMAIL_OR_PHONE") {
        return exports.SignInUpScreens.EmailOrPhoneForm;
    }
    throw new Error("Couldn't choose active screen; Should never happen");
}

var version = 4;
var country_calling_codes = {
    1: [
        "US",
        "AG",
        "AI",
        "AS",
        "BB",
        "BM",
        "BS",
        "CA",
        "DM",
        "DO",
        "GD",
        "GU",
        "JM",
        "KN",
        "KY",
        "LC",
        "MP",
        "MS",
        "PR",
        "SX",
        "TC",
        "TT",
        "VC",
        "VG",
        "VI",
    ],
    7: ["RU", "KZ"],
    20: ["EG"],
    27: ["ZA"],
    30: ["GR"],
    31: ["NL"],
    32: ["BE"],
    33: ["FR"],
    34: ["ES"],
    36: ["HU"],
    39: ["IT", "VA"],
    40: ["RO"],
    41: ["CH"],
    43: ["AT"],
    44: ["GB", "GG", "IM", "JE"],
    45: ["DK"],
    46: ["SE"],
    47: ["NO", "SJ"],
    48: ["PL"],
    49: ["DE"],
    51: ["PE"],
    52: ["MX"],
    53: ["CU"],
    54: ["AR"],
    55: ["BR"],
    56: ["CL"],
    57: ["CO"],
    58: ["VE"],
    60: ["MY"],
    61: ["AU", "CC", "CX"],
    62: ["ID"],
    63: ["PH"],
    64: ["NZ"],
    65: ["SG"],
    66: ["TH"],
    81: ["JP"],
    82: ["KR"],
    84: ["VN"],
    86: ["CN"],
    90: ["TR"],
    91: ["IN"],
    92: ["PK"],
    93: ["AF"],
    94: ["LK"],
    95: ["MM"],
    98: ["IR"],
    211: ["SS"],
    212: ["MA", "EH"],
    213: ["DZ"],
    216: ["TN"],
    218: ["LY"],
    220: ["GM"],
    221: ["SN"],
    222: ["MR"],
    223: ["ML"],
    224: ["GN"],
    225: ["CI"],
    226: ["BF"],
    227: ["NE"],
    228: ["TG"],
    229: ["BJ"],
    230: ["MU"],
    231: ["LR"],
    232: ["SL"],
    233: ["GH"],
    234: ["NG"],
    235: ["TD"],
    236: ["CF"],
    237: ["CM"],
    238: ["CV"],
    239: ["ST"],
    240: ["GQ"],
    241: ["GA"],
    242: ["CG"],
    243: ["CD"],
    244: ["AO"],
    245: ["GW"],
    246: ["IO"],
    247: ["AC"],
    248: ["SC"],
    249: ["SD"],
    250: ["RW"],
    251: ["ET"],
    252: ["SO"],
    253: ["DJ"],
    254: ["KE"],
    255: ["TZ"],
    256: ["UG"],
    257: ["BI"],
    258: ["MZ"],
    260: ["ZM"],
    261: ["MG"],
    262: ["RE", "YT"],
    263: ["ZW"],
    264: ["NA"],
    265: ["MW"],
    266: ["LS"],
    267: ["BW"],
    268: ["SZ"],
    269: ["KM"],
    290: ["SH", "TA"],
    291: ["ER"],
    297: ["AW"],
    298: ["FO"],
    299: ["GL"],
    350: ["GI"],
    351: ["PT"],
    352: ["LU"],
    353: ["IE"],
    354: ["IS"],
    355: ["AL"],
    356: ["MT"],
    357: ["CY"],
    358: ["FI", "AX"],
    359: ["BG"],
    370: ["LT"],
    371: ["LV"],
    372: ["EE"],
    373: ["MD"],
    374: ["AM"],
    375: ["BY"],
    376: ["AD"],
    377: ["MC"],
    378: ["SM"],
    380: ["UA"],
    381: ["RS"],
    382: ["ME"],
    383: ["XK"],
    385: ["HR"],
    386: ["SI"],
    387: ["BA"],
    389: ["MK"],
    420: ["CZ"],
    421: ["SK"],
    423: ["LI"],
    500: ["FK"],
    501: ["BZ"],
    502: ["GT"],
    503: ["SV"],
    504: ["HN"],
    505: ["NI"],
    506: ["CR"],
    507: ["PA"],
    508: ["PM"],
    509: ["HT"],
    590: ["GP", "BL", "MF"],
    591: ["BO"],
    592: ["GY"],
    593: ["EC"],
    594: ["GF"],
    595: ["PY"],
    596: ["MQ"],
    597: ["SR"],
    598: ["UY"],
    599: ["CW", "BQ"],
    670: ["TL"],
    672: ["NF"],
    673: ["BN"],
    674: ["NR"],
    675: ["PG"],
    676: ["TO"],
    677: ["SB"],
    678: ["VU"],
    679: ["FJ"],
    680: ["PW"],
    681: ["WF"],
    682: ["CK"],
    683: ["NU"],
    685: ["WS"],
    686: ["KI"],
    687: ["NC"],
    688: ["TV"],
    689: ["PF"],
    690: ["TK"],
    691: ["FM"],
    692: ["MH"],
    850: ["KP"],
    852: ["HK"],
    853: ["MO"],
    855: ["KH"],
    856: ["LA"],
    880: ["BD"],
    886: ["TW"],
    960: ["MV"],
    961: ["LB"],
    962: ["JO"],
    963: ["SY"],
    964: ["IQ"],
    965: ["KW"],
    966: ["SA"],
    967: ["YE"],
    968: ["OM"],
    970: ["PS"],
    971: ["AE"],
    972: ["IL"],
    973: ["BH"],
    974: ["QA"],
    975: ["BT"],
    976: ["MN"],
    977: ["NP"],
    992: ["TJ"],
    993: ["TM"],
    994: ["AZ"],
    995: ["GE"],
    996: ["KG"],
    998: ["UZ"],
};
var countries = {
    AC: ["247", "00", "(?:[01589]\\d|[46])\\d{4}", [5, 6]],
    AD: [
        "376",
        "00",
        "(?:1|6\\d)\\d{7}|[135-9]\\d{5}",
        [6, 8, 9],
        [
            ["(\\d{3})(\\d{3})", "$1 $2", ["[135-9]"]],
            ["(\\d{4})(\\d{4})", "$1 $2", ["1"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]],
        ],
    ],
    AE: [
        "971",
        "00",
        "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",
        [5, 6, 7, 8, 9, 10, 11, 12],
        [
            ["(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]],
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[236]|[479][2-8]"], "0$1"],
            ["(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"],
        ],
        "0",
    ],
    AF: ["93", "00", "[2-7]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], "0"],
    AG: ["1", "011", "(?:268|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([457]\\d{6})$", "268$1", 0, "268"],
    AI: ["1", "011", "(?:264|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2457]\\d{6})$", "264$1", 0, "264"],
    AL: [
        "355",
        "00",
        "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",
        [6, 7, 8, 9],
        [
            ["(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"],
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4"], "0$1"],
            ["(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"],
        ],
        "0",
    ],
    AM: [
        "374",
        "00",
        "(?:[1-489]\\d|55|60|77)\\d{6}",
        [8],
        [
            ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"],
            ["(\\d{3})(\\d{5})", "$1 $2", ["2|3[12]"], "(0$1)"],
            ["(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"],
            ["(\\d{2})(\\d{6})", "$1 $2", ["[3-9]"], "0$1"],
        ],
        "0",
    ],
    AO: ["244", "00", "[29]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]]],
    AR: [
        "54",
        "00",
        "(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}",
        [10, 11],
        [
            [
                "(\\d{4})(\\d{2})(\\d{4})",
                "$1 $2-$3",
                [
                    "2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])",
                    "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)",
                    "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
                    "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]",
                ],
                "0$1",
                1,
            ],
            ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", 1],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", 1],
            [
                "(\\d)(\\d{4})(\\d{2})(\\d{4})",
                "$2 15-$3-$4",
                [
                    "9(?:2[2-469]|3[3-578])",
                    "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))",
                    "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)",
                    "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
                    "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]",
                ],
                "0$1",
                0,
                "$1 $2 $3-$4",
            ],
            ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1", 0, "$1 $2 $3-$4"],
            ["(\\d{3})(\\d{3})(\\d{5})", "$1-$2-$3", ["8"], "0$1"],
            ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1", 0, "$1 $2 $3-$4"],
        ],
        "0",
        0,
        "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?",
        "9$1",
    ],
    AS: ["1", "011", "(?:[58]\\d\\d|684|900)\\d{7}", [10], 0, "1", 0, "1|([267]\\d{6})$", "684$1", 0, "684"],
    AT: [
        "43",
        "00",
        "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",
        [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        [
            ["(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"],
            ["(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"],
            ["(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"],
            ["(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"],
            ["(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"],
            ["(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"],
        ],
        "0",
    ],
    AU: [
        "61",
        "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
        "1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}",
        [5, 6, 7, 8, 9, 10, 12],
        [
            ["(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|4"], "0$1"],
            ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"],
            ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]],
        ],
        "0",
        0,
        "0|(183[12])",
        0,
        0,
        0,
        [
            [
                "(?:(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|3(?:[0-3589]\\d|4[0-578]|6[1-9]|7[0-35-9])|7(?:[013-57-9]\\d|2[0-8]))\\d{3}|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4]))|(?:6[0-8]|[78]\\d)\\d{3}|9(?:[02-9]\\d{3}|1(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79])))))\\d{3}",
                [9],
            ],
            [
                "4(?:83[0-38]|93[0-6])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}",
                [9],
            ],
            ["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
            ["190[0-26]\\d{6}", [10]],
            0,
            0,
            0,
            ["163\\d{2,6}", [5, 6, 7, 8, 9]],
            ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
            ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]],
        ],
        "0011",
    ],
    AW: ["297", "00", "(?:[25-79]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]]],
    AX: [
        "358",
        "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))",
        "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}",
        [5, 6, 7, 8, 9, 10, 11, 12],
        0,
        "0",
        0,
        0,
        0,
        0,
        "18",
        0,
        "00",
    ],
    AZ: [
        "994",
        "00",
        "365\\d{6}|(?:[124579]\\d|60|88)\\d{7}",
        [9],
        [
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"],
            [
                "(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
                "$1 $2 $3 $4",
                ["1[28]|2|365|46", "1[28]|2|365[45]|46", "1[28]|2|365(?:4|5[02])|46"],
                "(0$1)",
            ],
            ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"],
        ],
        "0",
    ],
    BA: [
        "387",
        "00",
        "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}",
        [8, 9],
        [
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"],
        ],
        "0",
    ],
    BB: ["1", "011", "(?:246|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "246$1", 0, "246"],
    BD: [
        "880",
        "00",
        "[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}",
        [6, 7, 8, 9, 10],
        [
            ["(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-8]|[459]1"], "0$1"],
            [
                "(\\d{3})(\\d{3,7})",
                "$1-$2",
                [
                    "3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:28|4[14]|5)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]",
                ],
                "0$1",
            ],
            ["(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]|22"], "0$1"],
            ["(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"],
        ],
        "0",
    ],
    BE: [
        "32",
        "00",
        "4\\d{8}|[1-9]\\d{7}",
        [8, 9],
        [
            ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"],
            ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[239]|4[23]"], "0$1"],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-8]"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"],
        ],
        "0",
    ],
    BF: ["226", "00", "[025-7]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[025-7]"]]]],
    BG: [
        "359",
        "00",
        "[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",
        [6, 7, 8, 9],
        [
            ["(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"],
            ["(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"],
            ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"],
        ],
        "0",
    ],
    BH: ["973", "00", "[136-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[047]"]]]],
    BI: ["257", "00", "(?:[267]\\d|31)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]]],
    BJ: ["229", "00", "[25689]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[25689]"]]]],
    BL: [
        "590",
        "00",
        "(?:590|(?:69|80)\\d|976)\\d{6}",
        [9],
        0,
        "0",
        0,
        0,
        0,
        0,
        0,
        [
            ["590(?:2[7-9]|5[12]|87)\\d{4}"],
            ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}"],
            ["80[0-5]\\d{6}"],
            0,
            0,
            0,
            0,
            0,
            ["976[01]\\d{5}"],
        ],
    ],
    BM: ["1", "011", "(?:441|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-8]\\d{6})$", "441$1", 0, "441"],
    BN: ["673", "00", "[2-578]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]]],
    BO: [
        "591",
        "00(?:1\\d)?",
        "(?:[2-467]\\d\\d|8001)\\d{5}",
        [8, 9],
        [
            ["(\\d)(\\d{7})", "$1 $2", ["[23]|4[46]"]],
            ["(\\d{8})", "$1", ["[67]"]],
            ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"]],
        ],
        "0",
        0,
        "0(1\\d)?",
    ],
    BQ: ["599", "00", "(?:[34]1|7\\d)\\d{5}", [7], 0, 0, 0, 0, 0, 0, "[347]"],
    BR: [
        "55",
        "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)",
        "(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",
        [8, 9, 10, 11],
        [
            ["(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"]],
            ["(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"],
            [
                "(\\d{2})(\\d{4})(\\d{4})",
                "$1 $2-$3",
                ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],
                "($1)",
            ],
            ["(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)"],
        ],
        "0",
        0,
        "(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?",
        "$2",
    ],
    BS: ["1", "011", "(?:242|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([3-8]\\d{6})$", "242$1", 0, "242"],
    BT: [
        "975",
        "00",
        "[17]\\d{7}|[2-8]\\d{6}",
        [7, 8],
        [
            ["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]],
        ],
    ],
    BW: [
        "267",
        "00",
        "(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}",
        [7, 8, 10],
        [
            ["(\\d{2})(\\d{5})", "$1 $2", ["90"]],
            ["(\\d{3})(\\d{4})", "$1 $2", ["[24-6]|3[15-79]"]],
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37]"]],
            ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["0"]],
            ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["8"]],
        ],
    ],
    BY: [
        "375",
        "810",
        "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",
        [6, 7, 8, 9, 10, 11],
        [
            ["(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"],
            ["(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"],
            [
                "(\\d{4})(\\d{2})(\\d{3})",
                "$1 $2-$3",
                [
                    "1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])",
                    "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])",
                ],
                "8 0$1",
            ],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:[56]|7[467])|2[1-3]"], "8 0$1"],
            ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-4]"], "8 0$1"],
            ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"],
        ],
        "8",
        0,
        "0|80?",
        0,
        0,
        0,
        0,
        "8~10",
    ],
    BZ: [
        "501",
        "00",
        "(?:0800\\d|[2-8])\\d{6}",
        [7, 11],
        [
            ["(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]],
            ["(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]],
        ],
    ],
    CA: [
        "1",
        "011",
        "(?:[2-8]\\d|90)\\d{8}",
        [10],
        0,
        "1",
        0,
        0,
        0,
        0,
        0,
        [
            [
                "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|6[578])|4(?:03|1[68]|3[178]|50|74)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47|72)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",
            ],
            [""],
            ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],
            ["900[2-9]\\d{6}"],
            [
                "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}",
            ],
            0,
            0,
            0,
            ["600[2-9]\\d{6}"],
        ],
    ],
    CC: [
        "61",
        "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
        "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}",
        [6, 7, 8, 9, 10, 12],
        0,
        "0",
        0,
        "0|([59]\\d{7})$",
        "8$1",
        0,
        0,
        [
            [
                "8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}",
                [9],
            ],
            [
                "4(?:83[0-38]|93[0-6])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}",
                [9],
            ],
            ["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
            ["190[0-26]\\d{6}", [10]],
            0,
            0,
            0,
            0,
            ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
            ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]],
        ],
        "0011",
    ],
    CD: [
        "243",
        "00",
        "[189]\\d{8}|[1-68]\\d{6}",
        [7, 9],
        [
            ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"],
            ["(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"],
        ],
        "0",
    ],
    CF: [
        "236",
        "00",
        "(?:[27]\\d{3}|8776)\\d{4}",
        [8],
        [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]],
    ],
    CG: [
        "242",
        "00",
        "(?:0\\d\\d|222|800)\\d{6}",
        [9],
        [
            ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]],
        ],
    ],
    CH: [
        "41",
        "00",
        "8\\d{11}|[2-9]\\d{8}",
        [9],
        [
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]|81"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["8"], "0$1"],
        ],
        "0",
    ],
    CI: [
        "225",
        "00",
        "[02]\\d{9}",
        [10],
        [
            ["(\\d{2})(\\d{2})(\\d)(\\d{5})", "$1 $2 $3 $4", ["2"]],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3 $4", ["0"]],
        ],
    ],
    CK: ["682", "00", "[2-578]\\d{4}", [5], [["(\\d{2})(\\d{3})", "$1 $2", ["[2-578]"]]]],
    CL: [
        "56",
        "(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0",
        "12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}",
        [9, 10, 11],
        [
            ["(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]],
            ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-3]"], "($1)"],
            ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"],
            ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]],
            ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
            ["(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]],
        ],
    ],
    CM: [
        "237",
        "00",
        "[26]\\d{8}|88\\d{6,7}",
        [8, 9],
        [
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]],
            ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]|88"]],
        ],
    ],
    CN: [
        "86",
        "00|1(?:[12]\\d|79)\\d\\d00",
        "1[127]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-689]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}",
        [7, 8, 9, 10, 11, 12],
        [
            [
                "(\\d{2})(\\d{5,6})",
                "$1 $2",
                ["(?:10|2[0-57-9])[19]", "(?:10|2[0-57-9])(?:10|9[56])", "(?:10|2[0-57-9])(?:100|9[56])"],
                "0$1",
            ],
            [
                "(\\d{3})(\\d{5,6})",
                "$1 $2",
                [
                    "3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]",
                    "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]",
                    "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])",
                    "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])",
                ],
                "0$1",
            ],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]],
            [
                "(\\d{2})(\\d{4})(\\d{4})",
                "$1 $2 $3",
                [
                    "10|2(?:[02-57-9]|1[1-9])",
                    "10|2(?:[02-57-9]|1[1-9])",
                    "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])",
                ],
                "0$1",
                1,
            ],
            [
                "(\\d{3})(\\d{3})(\\d{4})",
                "$1 $2 $3",
                [
                    "3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]",
                ],
                "0$1",
                1,
            ],
            ["(\\d{3})(\\d{7,8})", "$1 $2", ["9"]],
            ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", 1],
            ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", 1],
            ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"]],
            ["(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", 1],
        ],
        "0",
        0,
        "0|(1(?:[12]\\d|79)\\d\\d)",
        0,
        0,
        0,
        0,
        "00",
    ],
    CO: [
        "57",
        "00(?:4(?:[14]4|56)|[579])",
        "(?:(?:1\\d|[36])\\d{3}|9101)\\d{6}|[124-8]\\d{7}",
        [8, 10, 11],
        [
            ["(\\d)(\\d{7})", "$1 $2", ["[146][2-9]|[2578]"], "($1)"],
            ["(\\d{3})(\\d{7})", "$1 $2", ["6"], "($1)"],
            ["(\\d{3})(\\d{7})", "$1 $2", ["[39]"]],
            ["(\\d)(\\d{3})(\\d{7})", "$1-$2-$3", ["1"], "0$1", 0, "$1 $2 $3"],
        ],
        "0",
        0,
        "0([3579]|4(?:[14]4|56))?",
    ],
    CR: [
        "506",
        "00",
        "(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}",
        [8, 10],
        [
            ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[3-9]"]],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"]],
        ],
        0,
        0,
        "(19(?:0[0-2468]|1[09]|20|66|77|99))",
    ],
    CU: [
        "53",
        "119",
        "[27]\\d{6,7}|[34]\\d{5,7}|(?:5|8\\d\\d)\\d{7}",
        [6, 7, 8, 10],
        [
            ["(\\d{2})(\\d{4,6})", "$1 $2", ["2[1-4]|[34]"], "(0$1)"],
            ["(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"],
            ["(\\d)(\\d{7})", "$1 $2", ["5"], "0$1"],
            ["(\\d{3})(\\d{7})", "$1 $2", ["8"], "0$1"],
        ],
        "0",
    ],
    CV: ["238", "0", "(?:[2-59]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-589]"]]]],
    CW: [
        "599",
        "00",
        "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",
        [7, 8],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]],
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]],
        ],
        0,
        0,
        0,
        0,
        0,
        "[69]",
    ],
    CX: [
        "61",
        "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011",
        "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}",
        [6, 7, 8, 9, 10, 12],
        0,
        "0",
        0,
        "0|([59]\\d{7})$",
        "8$1",
        0,
        0,
        [
            [
                "8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",
                [9],
            ],
            [
                "4(?:83[0-38]|93[0-6])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-24-9]|9[0-27-9])\\d{6}",
                [9],
            ],
            ["180(?:0\\d{3}|2)\\d{3}", [7, 10]],
            ["190[0-26]\\d{6}", [10]],
            0,
            0,
            0,
            0,
            ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]],
            ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]],
        ],
        "0011",
    ],
    CY: ["357", "00", "(?:[279]\\d|[58]0)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]]],
    CZ: [
        "420",
        "00",
        "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",
        [9],
        [
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]],
            ["(\\d{2})(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["96"]],
            ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]],
            ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]],
        ],
    ],
    DE: [
        "49",
        "00",
        "[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:1\\d|2[02-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[05]\\d|[23]1|[46][1-8])\\d{1,9}",
        [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [
            ["(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"],
            [
                "(\\d{3})(\\d{3,12})",
                "$1 $2",
                [
                    "2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1",
                    "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1",
                ],
                "0$1",
            ],
            [
                "(\\d{4})(\\d{2,11})",
                "$1 $2",
                [
                    "[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]",
                    "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]",
                ],
                "0$1",
            ],
            ["(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"],
            ["(\\d{5})(\\d{2,10})", "$1 $2", ["3"], "0$1"],
            ["(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"],
            ["(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"],
            ["(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"],
            ["(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"],
            ["(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"],
            ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
            ["(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"],
            ["(\\d{5})(\\d{6})", "$1 $2", ["15[0568]"], "0$1"],
            ["(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"],
            ["(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"],
            ["(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"],
        ],
        "0",
    ],
    DJ: ["253", "00", "(?:2\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]]],
    DK: ["45", "00", "[2-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]]],
    DM: ["1", "011", "(?:[58]\\d\\d|767|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "767$1", 0, "767"],
    DO: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "8001|8[024]9"],
    DZ: [
        "213",
        "00",
        "(?:[1-4]|[5-79]\\d|80)\\d{7}",
        [8, 9],
        [
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"],
        ],
        "0",
    ],
    EC: [
        "593",
        "00",
        "1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}",
        [8, 9, 10, 11],
        [
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)", 0, "$1-$2-$3"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
            ["(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]],
        ],
        "0",
    ],
    EE: [
        "372",
        "00",
        "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}",
        [7, 8, 10],
        [
            [
                "(\\d{3})(\\d{4})",
                "$1 $2",
                [
                    "[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88",
                    "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88",
                ],
            ],
            ["(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]],
            ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]],
            ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]],
        ],
    ],
    EG: [
        "20",
        "00",
        "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",
        [8, 9, 10],
        [
            ["(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"],
            ["(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|8[2468]|9[235-7]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[189]"], "0$1"],
        ],
        "0",
    ],
    EH: ["212", "00", "[5-8]\\d{8}", [9], 0, "0", 0, 0, 0, 0, "528[89]"],
    ER: ["291", "00", "[178]\\d{6}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]], "0"],
    ES: [
        "34",
        "00",
        "[5-9]\\d{8}",
        [9],
        [
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]],
        ],
    ],
    ET: [
        "251",
        "00",
        "(?:11|[2-59]\\d)\\d{7}",
        [9],
        [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-59]"], "0$1"]],
        "0",
    ],
    FI: [
        "358",
        "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))",
        "[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}",
        [5, 6, 7, 8, 9, 10, 11, 12],
        [
            ["(\\d)(\\d{4,9})", "$1 $2", ["[2568][1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"],
            ["(\\d{3})(\\d{3,7})", "$1 $2", ["[12]00|[368]|70[07-9]"], "0$1"],
            ["(\\d{2})(\\d{4,8})", "$1 $2", ["[1245]|7[135]"], "0$1"],
            ["(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"],
        ],
        "0",
        0,
        0,
        0,
        0,
        "1[03-79]|[2-9]",
        0,
        "00",
    ],
    FJ: [
        "679",
        "0(?:0|52)",
        "45\\d{5}|(?:0800\\d|[235-9])\\d{6}",
        [7, 11],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]],
            ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]],
        ],
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "00",
    ],
    FK: ["500", "00", "[2-7]\\d{4}", [5]],
    FM: ["691", "00", "(?:[39]\\d\\d|820)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[389]"]]]],
    FO: ["298", "00", "[2-9]\\d{5}", [6], [["(\\d{6})", "$1", ["[2-9]"]]], 0, 0, "(10(?:01|[12]0|88))"],
    FR: [
        "33",
        "00",
        "[1-9]\\d{8}",
        [9],
        [
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"],
            ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"],
        ],
        "0",
    ],
    GA: [
        "241",
        "00",
        "(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}",
        [7, 8],
        [
            ["(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["11|[67]"], "0$1"],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]],
        ],
        0,
        0,
        "0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[47]\\d{6}|76\\d{6})",
        "$1",
    ],
    GB: [
        "44",
        "00",
        "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",
        [7, 9, 10],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"],
            ["(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"],
            [
                "(\\d{5})(\\d{4,5})",
                "$1 $2",
                [
                    "1(?:38|5[23]|69|76|94)",
                    "1(?:(?:38|69)7|5(?:24|39)|768|946)",
                    "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)",
                ],
                "0$1",
            ],
            ["(\\d{4})(\\d{5,6})", "$1 $2", ["1(?:[2-69][02-9]|[78])"], "0$1"],
            ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"], "0$1"],
            ["(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"],
        ],
        "0",
        0,
        0,
        0,
        0,
        0,
        [
            [
                "(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0235])|4(?:[0-5]\\d\\d|69[7-9]|70[0359])|(?:5[0-26-9]|[78][0-49])\\d\\d|6(?:[0-4]\\d\\d|50[0-24-69]))|2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d\\d|1(?:[0-7]\\d\\d|8(?:[02]\\d|1[0-278])))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}",
                [9, 10],
            ],
            [
                "7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}",
                [10],
            ],
            ["80[08]\\d{7}|800\\d{6}|8001111"],
            ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d", [7, 10]],
            ["70\\d{8}", [10]],
            0,
            ["(?:3[0347]|55)\\d{8}", [10]],
            ["76(?:464|652)\\d{5}|76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|81|9[139])\\d{6}", [10]],
            ["56\\d{8}", [10]],
        ],
        0,
        " x",
    ],
    GD: ["1", "011", "(?:473|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "473$1", 0, "473"],
    GE: [
        "995",
        "00",
        "(?:[3-57]\\d\\d|800)\\d{6}",
        [9],
        [
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["32"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"],
        ],
        "0",
    ],
    GF: [
        "594",
        "00",
        "(?:[56]94|80\\d|976)\\d{6}",
        [9],
        [
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"],
        ],
        "0",
    ],
    GG: [
        "44",
        "00",
        "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",
        [7, 9, 10],
        0,
        "0",
        0,
        "0|([25-9]\\d{5})$",
        "1481$1",
        0,
        0,
        [
            ["1481[25-9]\\d{5}", [10]],
            ["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]],
            ["80[08]\\d{7}|800\\d{6}|8001111"],
            ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d", [7, 10]],
            ["70\\d{8}", [10]],
            0,
            ["(?:3[0347]|55)\\d{8}", [10]],
            ["76(?:464|652)\\d{5}|76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|81|9[139])\\d{6}", [10]],
            ["56\\d{8}", [10]],
        ],
    ],
    GH: [
        "233",
        "00",
        "(?:[235]\\d{3}|800)\\d{5}",
        [8, 9],
        [
            ["(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"],
        ],
        "0",
    ],
    GI: ["350", "00", "(?:[25]\\d\\d|606)\\d{5}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["2"]]]],
    GL: ["299", "00", "(?:19|[2-689]\\d|70)\\d{4}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-9]"]]]],
    GM: ["220", "00", "[2-9]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]],
    GN: [
        "224",
        "00",
        "722\\d{6}|(?:3|6\\d)\\d{7}",
        [8, 9],
        [
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]],
        ],
    ],
    GP: [
        "590",
        "00",
        "(?:590|(?:69|80)\\d|976)\\d{6}",
        [9],
        [
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"],
        ],
        "0",
        0,
        0,
        0,
        0,
        0,
        [
            ["590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}"],
            ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}"],
            ["80[0-5]\\d{6}"],
            0,
            0,
            0,
            0,
            0,
            ["976[01]\\d{5}"],
        ],
    ],
    GQ: [
        "240",
        "00",
        "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}",
        [9],
        [
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]],
            ["(\\d{3})(\\d{6})", "$1 $2", ["[89]"]],
        ],
    ],
    GR: [
        "30",
        "00",
        "5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}",
        [10, 11, 12],
        [
            ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]],
            ["(\\d{4})(\\d{6})", "$1 $2", ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]],
            ["(\\d{3})(\\d{3,4})(\\d{5})", "$1 $2 $3", ["8"]],
        ],
    ],
    GT: [
        "502",
        "00",
        "(?:1\\d{3}|[2-7])\\d{7}",
        [8, 11],
        [
            ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]],
            ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
        ],
    ],
    GU: ["1", "011", "(?:[58]\\d\\d|671|900)\\d{7}", [10], 0, "1", 0, "1|([3-9]\\d{6})$", "671$1", 0, "671"],
    GW: [
        "245",
        "00",
        "[49]\\d{8}|4\\d{6}",
        [7, 9],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["40"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]],
        ],
    ],
    GY: [
        "592",
        "001",
        "(?:862\\d|9008)\\d{3}|(?:[2-46]\\d|77)\\d{5}",
        [7],
        [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46-9]"]]],
    ],
    HK: [
        "852",
        "00(?:30|5[09]|[126-9]?)",
        "8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}",
        [5, 6, 7, 8, 9, 11],
        [
            ["(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]],
            ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]],
            ["(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]],
        ],
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "00",
    ],
    HN: ["504", "00", "8\\d{10}|[237-9]\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]]],
    HR: [
        "385",
        "00",
        "(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}",
        [6, 7, 8, 9],
        [
            ["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"],
            ["(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[67]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-5]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"],
        ],
        "0",
    ],
    HT: ["509", "00", "[2-489]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-489]"]]]],
    HU: [
        "36",
        "00",
        "[235-7]\\d{8}|[1-9]\\d{7}",
        [8, 9],
        [
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "(06 $1)"],
            [
                "(\\d{2})(\\d{3})(\\d{3})",
                "$1 $2 $3",
                ["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"],
                "(06 $1)",
            ],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "06 $1"],
        ],
        "06",
    ],
    ID: [
        "62",
        "00[89]",
        "(?:(?:00[1-9]|8\\d)\\d{4}|[1-36])\\d{6}|00\\d{10}|[1-9]\\d{8,10}|[2-9]\\d{7}",
        [7, 8, 9, 10, 11, 12, 13],
        [
            ["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]],
            ["(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"],
            ["(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"],
            ["(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"],
            ["(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"],
            ["(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"],
            ["(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"],
            ["(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"],
        ],
        "0",
    ],
    IE: [
        "353",
        "00",
        "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",
        [7, 8, 9, 10],
        [
            ["(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"],
            ["(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"],
            ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2569]|4[1-69]|7[14]"], "(0$1)"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"],
            ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]],
            ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"],
            ["(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"],
        ],
        "0",
    ],
    IL: [
        "972",
        "0(?:0|1[2-9])",
        "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",
        [7, 8, 9, 10, 11, 12],
        [
            ["(\\d{4})(\\d{3})", "$1-$2", ["125"]],
            ["(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]],
            ["(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"],
            ["(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]],
            ["(\\d{4})(\\d{6})", "$1-$2", ["159"]],
            ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]],
            ["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]],
        ],
        "0",
    ],
    IM: [
        "44",
        "00",
        "1624\\d{6}|(?:[3578]\\d|90)\\d{8}",
        [10],
        0,
        "0",
        0,
        "0|([25-8]\\d{5})$",
        "1624$1",
        0,
        "74576|(?:16|7[56])24",
    ],
    IN: [
        "91",
        "00",
        "(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",
        [8, 9, 10, 11, 12, 13],
        [
            [
                "(\\d{8})",
                "$1",
                [
                    "5(?:0|2[23]|3[03]|[67]1|88)",
                    "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)",
                    "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)",
                ],
                0,
                1,
            ],
            ["(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], 0, 1],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], 0, 1],
            [
                "(\\d{2})(\\d{4})(\\d{4})",
                "$1 $2 $3",
                [
                    "11|2[02]|33|4[04]|79[1-7]|80[2-46]",
                    "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])",
                    "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])",
                ],
                "0$1",
                1,
            ],
            [
                "(\\d{3})(\\d{3})(\\d{4})",
                "$1 $2 $3",
                [
                    "1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]",
                    "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]",
                    "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]",
                ],
                "0$1",
                1,
            ],
            [
                "(\\d{4})(\\d{3})(\\d{3})",
                "$1 $2 $3",
                [
                    "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807",
                    "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]",
                    "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]",
                ],
                "0$1",
                1,
            ],
            ["(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", 1],
            ["(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["1(?:6|8[06])", "1(?:6|8[06]0)"], 0, 1],
            ["(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], 0, 1],
        ],
        "0",
    ],
    IO: ["246", "00", "3\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["3"]]]],
    IQ: [
        "964",
        "00",
        "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",
        [8, 9, 10],
        [
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
        ],
        "0",
    ],
    IR: [
        "98",
        "00",
        "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",
        [4, 5, 6, 7, 10],
        [
            ["(\\d{4,5})", "$1", ["96"], "0$1"],
            [
                "(\\d{2})(\\d{4,5})",
                "$1 $2",
                ["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"],
                "0$1",
            ],
            ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"],
            ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"],
        ],
        "0",
    ],
    IS: [
        "354",
        "00|1(?:0(?:01|[12]0)|100)",
        "(?:38\\d|[4-9])\\d{6}",
        [7, 9],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]],
        ],
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "00",
    ],
    IT: [
        "39",
        "00",
        "0\\d{5,10}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|55\\d{8}|8\\d{5}(?:\\d{2,4})?",
        [6, 7, 8, 9, 10, 11],
        [
            ["(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]],
            [
                "(\\d{3})(\\d{3,6})",
                "$1 $2",
                ["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"],
            ],
            ["(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]],
            ["(\\d{4})(\\d{4})", "$1 $2", ["894"]],
            ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]],
            ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[679])|[38]"]],
            ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]|14"]],
            ["(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]],
            ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]],
            ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["3"]],
        ],
        0,
        0,
        0,
        0,
        0,
        0,
        [
            [
                "0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}",
            ],
            ["3[1-9]\\d{8}|3[2-9]\\d{7}", [9, 10]],
            ["80(?:0\\d{3}|3)\\d{3}", [6, 9]],
            [
                "(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}",
                [6, 8, 9, 10],
            ],
            ["1(?:78\\d|99)\\d{6}", [9, 10]],
            0,
            0,
            0,
            ["55\\d{8}", [10]],
            ["84(?:[08]\\d{3}|[17])\\d{3}", [6, 9]],
        ],
    ],
    JE: [
        "44",
        "00",
        "1534\\d{6}|(?:[3578]\\d|90)\\d{8}",
        [10],
        0,
        "0",
        0,
        "0|([0-24-8]\\d{5})$",
        "1534$1",
        0,
        0,
        [
            ["1534[0-24-8]\\d{5}"],
            ["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}"],
            ["80(?:07(?:35|81)|8901)\\d{4}"],
            ["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"],
            ["701511\\d{4}"],
            0,
            [
                "(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}",
            ],
            ["76(?:464|652)\\d{5}|76(?:0[0-2]|2[356]|34|4[01347]|5[49]|6[0-369]|77|81|9[139])\\d{6}"],
            ["56\\d{8}"],
        ],
    ],
    JM: ["1", "011", "(?:[58]\\d\\d|658|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "658|876"],
    JO: [
        "962",
        "00",
        "(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}",
        [8, 9],
        [
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"],
            ["(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"],
            ["(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"],
            ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
        ],
        "0",
    ],
    JP: [
        "81",
        "010",
        "00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",
        [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        [
            ["(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"],
            [
                "(\\d{4})(\\d)(\\d{4})",
                "$1-$2-$3",
                [
                    "1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])",
                    "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9]|636)|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]",
                    "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9]|636[457-9])|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]",
                ],
                "0$1",
            ],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"],
            [
                "(\\d)(\\d{4})(\\d{4})",
                "$1-$2-$3",
                ["[36]|4(?:2[09]|7[01])", "[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"],
                "0$1",
            ],
            [
                "(\\d{2})(\\d{3})(\\d{4})",
                "$1-$2-$3",
                [
                    "1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[27-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])",
                    "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9])|5(?:2|3[045]|4[0-369]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|49|51|6(?:[0-24]|36|5[0-3589]|72|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:49|55|83)[29]|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]",
                    "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]",
                    "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|7[015-9]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17|3[015-9]))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|829(?:2|66)|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]",
                ],
                "0$1",
            ],
            ["(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[289][2-9]|5[3-9]|7[2-4679]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"],
            ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[257-9]"], "0$1"],
        ],
        "0",
    ],
    KE: [
        "254",
        "000",
        "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",
        [7, 8, 9, 10],
        [
            ["(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"],
            ["(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"],
        ],
        "0",
    ],
    KG: [
        "996",
        "00",
        "8\\d{9}|(?:[235-8]\\d|99)\\d{7}",
        [9, 10],
        [
            ["(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]|88"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"],
        ],
        "0",
    ],
    KH: [
        "855",
        "00[14-9]",
        "1\\d{9}|[1-9]\\d{7,8}",
        [8, 9, 10],
        [
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"],
            ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]],
        ],
        "0",
    ],
    KI: ["686", "00", "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", [5, 8], 0, "0"],
    KM: ["269", "00", "[3478]\\d{6}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]]],
    KN: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "869$1", 0, "869"],
    KP: [
        "850",
        "00|99",
        "85\\d{6}|(?:19\\d|[2-7])\\d{7}",
        [8, 10],
        [
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"],
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
        ],
        "0",
    ],
    KR: [
        "82",
        "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))",
        "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",
        [5, 6, 8, 9, 10, 11, 12, 13, 14],
        [
            ["(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1"],
            ["(\\d{4})(\\d{4})", "$1-$2", ["1"]],
            ["(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60|8"], "0$1"],
            ["(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1"],
            ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"],
            ["(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1"],
        ],
        "0",
        0,
        "0(8(?:[1-46-8]|5\\d\\d))?",
    ],
    KW: [
        "965",
        "00",
        "18\\d{5}|(?:[2569]\\d|41)\\d{6}",
        [7, 8],
        [
            ["(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]],
            ["(\\d{3})(\\d{5})", "$1 $2", ["[245]"]],
        ],
    ],
    KY: ["1", "011", "(?:345|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "345$1", 0, "345"],
    KZ: ["7", "810", "(?:33622|8\\d{8})\\d{5}|[78]\\d{9}", [10, 14], 0, "8", 0, 0, 0, 0, "33|7", 0, "8~10"],
    LA: [
        "856",
        "00",
        "[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}",
        [8, 9, 10],
        [
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30[013-9]"], "0$1"],
            ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[23]"], "0$1"],
        ],
        "0",
    ],
    LB: [
        "961",
        "00",
        "[27-9]\\d{7}|[13-9]\\d{6}",
        [7, 8],
        [
            ["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27-9]"]],
        ],
        "0",
    ],
    LC: ["1", "011", "(?:[58]\\d\\d|758|900)\\d{7}", [10], 0, "1", 0, "1|([2-8]\\d{6})$", "758$1", 0, "758"],
    LI: [
        "423",
        "00",
        "90\\d{5}|(?:[2378]|6\\d\\d)\\d{6}",
        [7, 9],
        [
            ["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[237-9]"]],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]],
        ],
        "0",
        0,
        "0|(1001)",
    ],
    LK: [
        "94",
        "00",
        "[1-9]\\d{8}",
        [9],
        [
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"],
        ],
        "0",
    ],
    LR: [
        "231",
        "00",
        "(?:2|33|5\\d|77|88)\\d{7}|[4-6]\\d{6}",
        [7, 8, 9],
        [
            ["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[4-6]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3578]"], "0$1"],
        ],
        "0",
    ],
    LS: ["266", "00", "(?:[256]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]]],
    LT: [
        "370",
        "00",
        "(?:[3469]\\d|52|[78]0)\\d{6}",
        [8],
        [
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["52[0-7]"], "(8-$1)", 1],
            ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", 1],
            ["(\\d{2})(\\d{6})", "$1 $2", ["37|4(?:[15]|6[1-8])"], "(8-$1)", 1],
            ["(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(8-$1)", 1],
        ],
        "8",
        0,
        "[08]",
    ],
    LU: [
        "352",
        "00",
        "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",
        [4, 5, 6, 7, 8, 9, 10, 11],
        [
            ["(\\d{2})(\\d{3})", "$1 $2", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]],
            [
                "(\\d{2})(\\d{2})(\\d{2})",
                "$1 $2 $3",
                ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"],
            ],
            ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20[2-689]"]],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"]],
            ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["80[01]|90[015]"]],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"]],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})", "$1 $2 $3 $4", ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]],
        ],
        0,
        0,
        "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)",
    ],
    LV: ["371", "00", "(?:[268]\\d|90)\\d{6}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]]],
    LY: ["218", "00", "[2-9]\\d{8}", [9], [["(\\d{2})(\\d{7})", "$1-$2", ["[2-9]"], "0$1"]], "0"],
    MA: [
        "212",
        "00",
        "[5-8]\\d{8}",
        [9],
        [
            ["(\\d{5})(\\d{4})", "$1-$2", ["5(?:29|38)", "5(?:29|38)[89]", "5(?:29|38)[89]0"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5[45]"], "0$1"],
            [
                "(\\d{4})(\\d{5})",
                "$1-$2",
                ["5(?:2[2-489]|3[5-9]|9)|892", "5(?:2(?:[2-49]|8[235-9])|3[5-9]|9)|892"],
                "0$1",
            ],
            ["(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"],
            ["(\\d{3})(\\d{6})", "$1-$2", ["[5-7]"], "0$1"],
        ],
        "0",
        0,
        0,
        0,
        0,
        0,
        [
            [
                "5(?:29(?:[189][05]|2[29]|3[01])|38[89][05])\\d{4}|5(?:2(?:[0-25-7]\\d|3[1-578]|4[02-46-8]|8[0235-7]|90)|3(?:[0-47]\\d|5[02-9]|6[02-8]|80|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}",
            ],
            ["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0\\d|1[0-5]|6[1267]|7[0-57]))\\d{6}"],
            ["80\\d{7}"],
            ["89\\d{7}"],
            0,
            0,
            0,
            0,
            ["592(?:4[0-2]|93)\\d{4}"],
        ],
    ],
    MC: [
        "377",
        "00",
        "(?:[3489]|6\\d)\\d{7}",
        [8, 9],
        [
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[389]"]],
            ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"],
        ],
        "0",
    ],
    MD: [
        "373",
        "00",
        "(?:[235-7]\\d|[89]0)\\d{6}",
        [8],
        [
            ["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"],
        ],
        "0",
    ],
    ME: [
        "382",
        "00",
        "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}",
        [8, 9],
        [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]],
        "0",
    ],
    MF: [
        "590",
        "00",
        "(?:590|(?:69|80)\\d|976)\\d{6}",
        [9],
        0,
        "0",
        0,
        0,
        0,
        0,
        0,
        [
            ["590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}"],
            ["69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}"],
            ["80[0-5]\\d{6}"],
            0,
            0,
            0,
            0,
            0,
            ["976[01]\\d{5}"],
        ],
    ],
    MG: [
        "261",
        "00",
        "[23]\\d{8}",
        [9],
        [["(\\d{2})(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]],
        "0",
        0,
        "0|([24-9]\\d{6})$",
        "20$1",
    ],
    MH: ["692", "011", "329\\d{4}|(?:[256]\\d|45)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]], "1"],
    MK: [
        "389",
        "00",
        "[2-578]\\d{7}",
        [8],
        [
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"],
            ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"],
        ],
        "0",
    ],
    ML: ["223", "00", "[24-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]]],
    MM: [
        "95",
        "00",
        "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",
        [6, 7, 8, 9, 10],
        [
            ["(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"],
            [
                "(\\d{2})(\\d{2})(\\d{3})",
                "$1 $2 $3",
                ["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"],
                "0$1",
            ],
            ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-7]|8[1-35]"], "0$1"],
            ["(\\d)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"],
            ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"],
            ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"],
            ["(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"],
        ],
        "0",
    ],
    MN: [
        "976",
        "001",
        "[12]\\d{7,9}|[57-9]\\d{7}",
        [8, 9, 10],
        [
            ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"],
            ["(\\d{4})(\\d{4})", "$1 $2", ["[57-9]"]],
            ["(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"],
            [
                "(\\d{4})(\\d{5,6})",
                "$1 $2",
                ["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"],
                "0$1",
            ],
            ["(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"],
        ],
        "0",
    ],
    MO: [
        "853",
        "00",
        "0800\\d{3}|(?:28|[68]\\d)\\d{6}",
        [7, 8],
        [
            ["(\\d{4})(\\d{3})", "$1 $2", ["0"]],
            ["(\\d{4})(\\d{4})", "$1 $2", ["[268]"]],
        ],
    ],
    MP: ["1", "011", "[58]\\d{9}|(?:67|90)0\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "670$1", 0, "670"],
    MQ: [
        "596",
        "00",
        "(?:69|80)\\d{7}|(?:59|97)6\\d{6}",
        [9],
        [
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"],
        ],
        "0",
    ],
    MR: [
        "222",
        "00",
        "(?:[2-4]\\d\\d|800)\\d{5}",
        [8],
        [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]],
    ],
    MS: ["1", "011", "(?:[58]\\d\\d|664|900)\\d{7}", [10], 0, "1", 0, "1|([34]\\d{6})$", "664$1", 0, "664"],
    MT: ["356", "00", "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]]],
    MU: [
        "230",
        "0(?:0|[24-7]0|3[03])",
        "(?:5|8\\d\\d)\\d{7}|[2-468]\\d{6}",
        [7, 8, 10],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]],
            ["(\\d{4})(\\d{4})", "$1 $2", ["5"]],
            ["(\\d{5})(\\d{5})", "$1 $2", ["8"]],
        ],
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "020",
    ],
    MV: [
        "960",
        "0(?:0|19)",
        "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",
        [7, 10],
        [
            ["(\\d{3})(\\d{4})", "$1-$2", ["[3467]|9[13-9]"]],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]],
        ],
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "00",
    ],
    MW: [
        "265",
        "00",
        "(?:[19]\\d|[23]1|77|88)\\d{7}|1\\d{6}",
        [7, 9],
        [
            ["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[137-9]"], "0$1"],
        ],
        "0",
    ],
    MX: [
        "52",
        "0[09]",
        "1(?:(?:44|99)[1-9]|65[0-689])\\d{7}|(?:1(?:[017]\\d|[235][1-9]|4[0-35-9]|6[0-46-9]|8[1-79]|9[1-8])|[2-9]\\d)\\d{8}",
        [10, 11],
        [
            ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"], 0, 1],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"], 0, 1],
            ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 $3 $4", ["1(?:33|5[56]|81)"], 0, 1],
            ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 $3 $4", ["1"], 0, 1],
        ],
        "01",
        0,
        "0(?:[12]|4[45])|1",
        0,
        0,
        0,
        0,
        "00",
    ],
    MY: [
        "60",
        "00",
        "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",
        [8, 9, 10],
        [
            ["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1(?:[02469]|[378][1-9])|8"], "0$1"],
            ["(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"],
            ["(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1[36-8]"]],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"],
            ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"],
        ],
        "0",
    ],
    MZ: [
        "258",
        "00",
        "(?:2|8\\d)\\d{7}",
        [8, 9],
        [
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-79]"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]],
        ],
    ],
    NA: [
        "264",
        "00",
        "[68]\\d{7,8}",
        [8, 9],
        [
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"],
        ],
        "0",
    ],
    NC: ["687", "00", "[2-57-9]\\d{5}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[2-57-9]"]]]],
    NE: [
        "227",
        "00",
        "[027-9]\\d{7}",
        [8],
        [
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[089]|2[013]|7[04]"]],
        ],
    ],
    NF: [
        "672",
        "00",
        "[13]\\d{5}",
        [6],
        [
            ["(\\d{2})(\\d{4})", "$1 $2", ["1[0-3]"]],
            ["(\\d)(\\d{5})", "$1 $2", ["[13]"]],
        ],
        0,
        0,
        "([0-258]\\d{4})$",
        "3$1",
    ],
    NG: [
        "234",
        "009",
        "(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}",
        [7, 8, 10, 11, 12, 13, 14],
        [
            ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"],
            ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|9(?:0[3-9]|[1-9])"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[3-7]|8[2-9]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"],
            ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"],
            ["(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"],
        ],
        "0",
    ],
    NI: ["505", "00", "(?:1800|[25-8]\\d{3})\\d{4}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]]],
    NL: [
        "31",
        "00",
        "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|[89]\\d{6,9}|1\\d{4,5}",
        [5, 6, 7, 8, 9, 10],
        [
            ["(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"],
            ["(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"],
            ["(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-57-9]"], "0$1"],
        ],
        "0",
    ],
    NO: [
        "47",
        "00",
        "(?:0|[2-9]\\d{3})\\d{4}",
        [5, 8],
        [
            ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[489]|59"]],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-7]"]],
        ],
        0,
        0,
        0,
        0,
        0,
        "[02-689]|7[0-8]",
    ],
    NP: [
        "977",
        "00",
        "(?:1\\d|9)\\d{9}|[1-9]\\d{7}",
        [8, 10, 11],
        [
            ["(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"],
            ["(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-579]|6[2-6])"], "0$1"],
            ["(\\d{3})(\\d{7})", "$1-$2", ["9"]],
        ],
        "0",
    ],
    NR: ["674", "00", "(?:444|(?:55|8\\d)\\d|666)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-68]"]]]],
    NU: ["683", "00", "(?:[47]|888\\d)\\d{3}", [4, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["8"]]]],
    NZ: [
        "64",
        "0(?:0|161)",
        "[29]\\d{7,9}|50\\d{5}(?:\\d{2,3})?|6[0-35-9]\\d{6}|7\\d{7,8}|8\\d{4,9}|(?:11\\d|[34])\\d{7}",
        [5, 6, 7, 8, 9, 10],
        [
            ["(\\d{2})(\\d{3,8})", "$1 $2", ["8[1-579]"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["50[036-8]|[89]0", "50(?:[0367]|88)|[89]0"], "0$1"],
            ["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["24|[346]|7[2-57-9]|9[2-9]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|[59]|80"], "0$1"],
            ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1|2[028]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:[169]|7[0-35-9])|7|86"], "0$1"],
        ],
        "0",
        0,
        0,
        0,
        0,
        0,
        0,
        "00",
    ],
    OM: [
        "968",
        "00",
        "(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}",
        [7, 8, 9],
        [
            ["(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]],
            ["(\\d{2})(\\d{6})", "$1 $2", ["2"]],
            ["(\\d{4})(\\d{4})", "$1 $2", ["[179]"]],
        ],
    ],
    PA: [
        "507",
        "00",
        "(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}",
        [7, 8, 10, 11],
        [
            ["(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]],
            ["(\\d{4})(\\d{4})", "$1-$2", ["[68]"]],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]],
        ],
    ],
    PE: [
        "51",
        "19(?:1[124]|77|90)00",
        "(?:[14-8]|9\\d)\\d{7}",
        [8, 9],
        [
            ["(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"],
            ["(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"],
            ["(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]],
        ],
        "0",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        " Anexo ",
    ],
    PF: [
        "689",
        "00",
        "4\\d{5}(?:\\d{2})?|8\\d{7,8}",
        [6, 8, 9],
        [
            ["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]],
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4|8[7-9]"]],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]],
        ],
    ],
    PG: [
        "675",
        "00|140[1-3]",
        "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",
        [7, 8],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85"]],
            ["(\\d{4})(\\d{4})", "$1 $2", ["[78]"]],
        ],
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "00",
    ],
    PH: [
        "63",
        "00",
        "(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}",
        [6, 8, 9, 10, 11, 12, 13],
        [
            ["(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"],
            [
                "(\\d{4})(\\d{4,6})",
                "$1 $2",
                [
                    "3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2",
                    "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))",
                ],
                "(0$1)",
            ],
            ["(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"],
            ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|8[2-8]"], "(0$1)"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"],
            ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
            ["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]],
        ],
        "0",
    ],
    PK: [
        "92",
        "00",
        "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",
        [8, 9, 10, 11, 12],
        [
            ["(\\d{3})(\\d{3})(\\d{2,7})", "$1 $2 $3", ["[89]0"], "0$1"],
            ["(\\d{4})(\\d{5})", "$1 $2", ["1"]],
            [
                "(\\d{3})(\\d{6,7})",
                "$1 $2",
                [
                    "2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])",
                    "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]",
                ],
                "(0$1)",
            ],
            ["(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"],
            ["(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"],
            ["(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"],
            [
                "(\\d{2})(\\d{3})(\\d{3})(\\d{3})",
                "$1 $2 $3 $4",
                ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],
                "(0$1)",
            ],
            ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[24-9]"], "(0$1)"],
        ],
        "0",
    ],
    PL: [
        "48",
        "00",
        "6\\d{5}(?:\\d{2})?|8\\d{9}|[1-9]\\d{6}(?:\\d{2})?",
        [6, 7, 8, 9, 10],
        [
            ["(\\d{5})", "$1", ["19"]],
            ["(\\d{3})(\\d{3})", "$1 $2", ["11|64"]],
            [
                "(\\d{2})(\\d{2})(\\d{3})",
                "$1 $2 $3",
                [
                    "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1",
                    "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19",
                ],
            ],
            ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]],
            ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2-8]|[2-7]|8[1-79]|9[145]"]],
            ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["8"]],
        ],
    ],
    PM: [
        "508",
        "00",
        "(?:[45]|80\\d\\d)\\d{5}",
        [6, 9],
        [
            ["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"],
        ],
        "0",
    ],
    PR: ["1", "011", "(?:[589]\\d\\d|787)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "787|939"],
    PS: [
        "970",
        "00",
        "[2489]2\\d{6}|(?:1\\d|5)\\d{8}",
        [8, 9, 10],
        [
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"],
            ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]],
        ],
        "0",
    ],
    PT: [
        "351",
        "00",
        "1693\\d{5}|(?:[26-9]\\d|30)\\d{7}",
        [9],
        [
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["16|[236-9]"]],
        ],
    ],
    PW: ["680", "01[12]", "(?:[24-8]\\d\\d|345|900)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]],
    PY: [
        "595",
        "00",
        "59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}",
        [6, 7, 8, 9, 10, 11],
        [
            ["(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"],
            ["(\\d{2})(\\d{5})", "$1 $2", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"],
            ["(\\d{3})(\\d{4,5})", "$1 $2", ["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"], "(0$1)"],
            [
                "(\\d{2})(\\d{3})(\\d{3,4})",
                "$1 $2 $3",
                ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"],
                "(0$1)",
            ],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]],
            ["(\\d{3})(\\d{6})", "$1 $2", ["9(?:[5-79]|8[1-6])"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"],
            ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]],
        ],
        "0",
    ],
    QA: [
        "974",
        "00",
        "[2-7]\\d{7}|800\\d{4}(?:\\d{2})?|2\\d{6}",
        [7, 8, 9],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["2[126]|8"]],
            ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]],
        ],
    ],
    RE: [
        "262",
        "00",
        "9769\\d{5}|(?:26|[68]\\d)\\d{7}",
        [9],
        [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2689]"], "0$1"]],
        "0",
        0,
        0,
        0,
        0,
        "26[23]|69|[89]",
    ],
    RO: [
        "40",
        "00",
        "(?:[2378]\\d|90)\\d{7}|[23]\\d{5}",
        [6, 9],
        [
            ["(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"],
            ["(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[237-9]"], "0$1"],
        ],
        "0",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        " int ",
    ],
    RS: [
        "381",
        "00",
        "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",
        [6, 7, 8, 9, 10, 11, 12],
        [
            ["(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"],
            ["(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"],
        ],
        "0",
    ],
    RU: [
        "7",
        "810",
        "8\\d{13}|[347-9]\\d{9}",
        [10, 14],
        [
            [
                "(\\d{4})(\\d{2})(\\d{2})(\\d{2})",
                "$1 $2 $3 $4",
                [
                    "7(?:1[0-8]|2[1-9])",
                    "7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))",
                    "7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2",
                ],
                "8 ($1)",
                1,
            ],
            [
                "(\\d{5})(\\d)(\\d{2})(\\d{2})",
                "$1 $2 $3 $4",
                [
                    "7(?:1[0-68]|2[1-9])",
                    "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))",
                    "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]",
                ],
                "8 ($1)",
                1,
            ],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", 1],
            ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[349]|8(?:[02-7]|1[1-8])"], "8 ($1)", 1],
            ["(\\d{4})(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["8"], "8 ($1)"],
        ],
        "8",
        0,
        0,
        0,
        0,
        "3[04-689]|[489]",
        0,
        "8~10",
    ],
    RW: [
        "250",
        "00",
        "(?:06|[27]\\d\\d|[89]00)\\d{6}",
        [8, 9],
        [
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]],
        ],
        "0",
    ],
    SA: [
        "966",
        "00",
        "92\\d{7}|(?:[15]|8\\d)\\d{8}",
        [9, 10],
        [
            ["(\\d{4})(\\d{5})", "$1 $2", ["9"]],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]],
        ],
        "0",
    ],
    SB: [
        "677",
        "0[01]",
        "(?:[1-6]|[7-9]\\d\\d)\\d{4}",
        [5, 7],
        [["(\\d{2})(\\d{5})", "$1 $2", ["7|8[4-9]|9(?:[1-8]|9[0-8])"]]],
    ],
    SC: [
        "248",
        "010|0[0-2]",
        "8000\\d{3}|(?:[249]\\d|64)\\d{5}",
        [7],
        [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]|9[57]"]]],
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "00",
    ],
    SD: ["249", "00", "[19]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]], "0"],
    SE: [
        "46",
        "00",
        "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",
        [6, 7, 8, 9, 10],
        [
            ["(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1", 0, "$1 $2 $3"],
            ["(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44)"], "0$1", 0, "$1 $2"],
            ["(\\d{2})(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3"],
            ["(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"],
            [
                "(\\d{3})(\\d{2,3})(\\d{2})",
                "$1-$2 $3",
                [
                    "1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])",
                ],
                "0$1",
                0,
                "$1 $2 $3",
            ],
            ["(\\d{3})(\\d{2,3})(\\d{3})", "$1-$2 $3", ["9(?:00|39|44)"], "0$1", 0, "$1 $2 $3"],
            [
                "(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})",
                "$1-$2 $3 $4",
                ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],
                "0$1",
                0,
                "$1 $2 $3 $4",
            ],
            ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["10|7"], "0$1", 0, "$1 $2 $3 $4"],
            ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"],
            [
                "(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
                "$1-$2 $3 $4",
                ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],
                "0$1",
                0,
                "$1 $2 $3 $4",
            ],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1", 0, "$1 $2 $3 $4"],
            ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["[26]"], "0$1", 0, "$1 $2 $3 $4 $5"],
        ],
        "0",
    ],
    SG: [
        "65",
        "0[0-3]\\d",
        "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",
        [8, 10, 11],
        [
            ["(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:0[1-4]|[1-9])"]],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]],
            ["(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]],
            ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]],
        ],
    ],
    SH: ["290", "00", "(?:[256]\\d|8)\\d{3}", [4, 5], 0, 0, 0, 0, 0, 0, "[256]"],
    SI: [
        "386",
        "00|10(?:22|66|88|99)",
        "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}",
        [5, 6, 7, 8],
        [
            ["(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"],
            ["(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"],
            ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-57]"], "(0$1)"],
        ],
        "0",
        0,
        0,
        0,
        0,
        0,
        0,
        "00",
    ],
    SJ: ["47", "00", "0\\d{4}|(?:[489]\\d|[57]9)\\d{6}", [5, 8], 0, 0, 0, 0, 0, 0, "79"],
    SK: [
        "421",
        "00",
        "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",
        [6, 7, 9],
        [
            ["(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"],
            ["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"],
            ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"],
        ],
        "0",
    ],
    SL: ["232", "00", "(?:[237-9]\\d|66)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[236-9]"], "(0$1)"]], "0"],
    SM: [
        "378",
        "00",
        "(?:0549|[5-7]\\d)\\d{6}",
        [8, 10],
        [
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]],
            ["(\\d{4})(\\d{6})", "$1 $2", ["0"]],
        ],
        0,
        0,
        "([89]\\d{5})$",
        "0549$1",
    ],
    SN: [
        "221",
        "00",
        "(?:[378]\\d|93)\\d{7}",
        [9],
        [
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]],
            ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]],
        ],
    ],
    SO: [
        "252",
        "00",
        "[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}",
        [6, 7, 8, 9],
        [
            ["(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]],
            ["(\\d{6})", "$1", ["[134]"]],
            ["(\\d)(\\d{6})", "$1 $2", ["[15]|2[0-79]|3[0-46-8]|4[0-7]"]],
            ["(\\d)(\\d{7})", "$1 $2", ["24|[67]"]],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3478]|64|90"]],
            ["(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|6(?:0[5-7]|[1-35-9])|9[2-9]"]],
        ],
        "0",
    ],
    SR: [
        "597",
        "00",
        "(?:[2-5]|68|[78]\\d)\\d{5}",
        [6, 7],
        [
            ["(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]],
            ["(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]],
            ["(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]],
        ],
    ],
    SS: ["211", "00", "[19]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]], "0"],
    ST: ["239", "00", "(?:22|9\\d)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]]],
    SV: [
        "503",
        "00",
        "[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?",
        [7, 8, 11],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["[89]"]],
            ["(\\d{4})(\\d{4})", "$1 $2", ["[267]"]],
            ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]],
        ],
    ],
    SX: ["1", "011", "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|(5\\d{6})$", "721$1", 0, "721"],
    SY: [
        "963",
        "00",
        "[1-39]\\d{8}|[1-5]\\d{7}",
        [8, 9],
        [
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-5]"], "0$1", 1],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", 1],
        ],
        "0",
    ],
    SZ: [
        "268",
        "00",
        "0800\\d{4}|(?:[237]\\d|900)\\d{6}",
        [8, 9],
        [
            ["(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]],
            ["(\\d{5})(\\d{4})", "$1 $2", ["9"]],
        ],
    ],
    TA: ["290", "00", "8\\d{3}", [4], 0, 0, 0, 0, 0, 0, "8"],
    TC: ["1", "011", "(?:[58]\\d\\d|649|900)\\d{7}", [10], 0, "1", 0, "1|([2-479]\\d{6})$", "649$1", 0, "649"],
    TD: [
        "235",
        "00|16",
        "(?:22|[69]\\d|77)\\d{6}",
        [8],
        [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2679]"]]],
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "00",
    ],
    TG: ["228", "00", "[279]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]]],
    TH: [
        "66",
        "00[1-9]",
        "(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}",
        [8, 9, 10, 13],
        [
            ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13-9]"], "0$1"],
            ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]],
        ],
        "0",
    ],
    TJ: [
        "992",
        "810",
        "(?:00|[1-57-9]\\d)\\d{7}",
        [9],
        [
            ["(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"]],
            ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[34]7|91[78]"]],
            ["(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3[1-5]"]],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[0-57-9]"]],
        ],
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "8~10",
    ],
    TK: ["690", "00", "[2-47]\\d{3,6}", [4, 5, 6, 7]],
    TL: [
        "670",
        "00",
        "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}",
        [7, 8],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]],
            ["(\\d{4})(\\d{4})", "$1 $2", ["7"]],
        ],
    ],
    TM: [
        "993",
        "810",
        "[1-6]\\d{7}",
        [8],
        [
            ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"],
            ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"],
            ["(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"],
        ],
        "8",
        0,
        0,
        0,
        0,
        0,
        0,
        "8~10",
    ],
    TN: ["216", "00", "[2-57-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]]],
    TO: [
        "676",
        "00",
        "(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}",
        [5, 7],
        [
            ["(\\d{2})(\\d{3})", "$1-$2", ["[2-4]|50|6[09]|7[0-24-69]|8[05]"]],
            ["(\\d{4})(\\d{3})", "$1 $2", ["0"]],
            ["(\\d{3})(\\d{4})", "$1 $2", ["[5-9]"]],
        ],
    ],
    TR: [
        "90",
        "00",
        "4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}",
        [7, 10, 12, 13],
        [
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[01589]|90"], "0$1", 1],
            [
                "(\\d{3})(\\d{3})(\\d{2})(\\d{2})",
                "$1 $2 $3 $4",
                ["5(?:[0-59]|61)", "5(?:[0-59]|616)", "5(?:[0-59]|6161)"],
                "0$1",
                1,
            ],
            ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", 1],
            ["(\\d{3})(\\d{3})(\\d{6,7})", "$1 $2 $3", ["80"], "0$1", 1],
        ],
        "0",
    ],
    TT: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-46-8]\\d{6})$", "868$1", 0, "868"],
    TV: [
        "688",
        "00",
        "(?:2|7\\d\\d|90)\\d{4}",
        [5, 6, 7],
        [
            ["(\\d{2})(\\d{3})", "$1 $2", ["2"]],
            ["(\\d{2})(\\d{4})", "$1 $2", ["90"]],
            ["(\\d{2})(\\d{5})", "$1 $2", ["7"]],
        ],
    ],
    TW: [
        "886",
        "0(?:0[25-79]|19)",
        "[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}",
        [7, 8, 9, 10, 11],
        [
            ["(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[258]0"], "0$1"],
            [
                "(\\d)(\\d{3,4})(\\d{4})",
                "$1 $2 $3",
                ["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]", "[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"],
                "0$1",
            ],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"], "0$1"],
            ["(\\d{2})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["7"], "0$1"],
        ],
        "0",
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        "#",
    ],
    TZ: [
        "255",
        "00[056]",
        "(?:[26-8]\\d|41|90)\\d{7}",
        [9],
        [
            ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"],
        ],
        "0",
    ],
    UA: [
        "380",
        "00",
        "[89]\\d{9}|[3-9]\\d{8}",
        [9, 10],
        [
            [
                "(\\d{3})(\\d{3})(\\d{3})",
                "$1 $2 $3",
                [
                    "6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]",
                    "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]",
                ],
                "0$1",
            ],
            [
                "(\\d{2})(\\d{3})(\\d{4})",
                "$1 $2 $3",
                [
                    "4[45][0-5]|5(?:0|6[37])|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]",
                    "4[45][0-5]|5(?:0|6(?:3[14-7]|7))|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]",
                ],
                "0$1",
            ],
            ["(\\d{4})(\\d{5})", "$1 $2", ["[3-6]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"],
        ],
        "0",
        0,
        0,
        0,
        0,
        0,
        0,
        "0~0",
    ],
    UG: [
        "256",
        "00[057]",
        "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",
        [9],
        [
            ["(\\d{4})(\\d{5})", "$1 $2", ["202", "2024"], "0$1"],
            ["(\\d{3})(\\d{6})", "$1 $2", ["[27-9]|4(?:6[45]|[7-9])"], "0$1"],
            ["(\\d{2})(\\d{7})", "$1 $2", ["[34]"], "0$1"],
        ],
        "0",
    ],
    US: [
        "1",
        "011",
        "[2-9]\\d{9}",
        [10],
        [["(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], 0, 1, "$1-$2-$3"]],
        "1",
        0,
        0,
        0,
        0,
        0,
        [
            [
                "5(?:05(?:[2-57-9]\\d\\d|6(?:[0-35-9]\\d|44))|82(?:2(?:0[0-3]|[268]2)|3(?:0[02]|33)|4(?:00|4[24]|65|82)|5(?:00|29|83)|6(?:00|66|82)|777|8(?:00|88)|9(?:00|9[89])))\\d{4}|(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[01356]|3[0-24679]|4[167]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[39]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[0-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[0179]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-289]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01579]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",
            ],
            [""],
            ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"],
            ["900[2-9]\\d{6}"],
            [
                "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
            ],
        ],
    ],
    UY: [
        "598",
        "0(?:0|1[3-9]\\d)",
        "4\\d{9}|[1249]\\d{7}|(?:[49]\\d|80)\\d{5}",
        [7, 8, 10],
        [
            ["(\\d{3})(\\d{4})", "$1 $2", ["405|8|90"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"],
            ["(\\d{4})(\\d{4})", "$1 $2", ["[124]"]],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["4"], "0$1"],
        ],
        "0",
        0,
        0,
        0,
        0,
        0,
        0,
        "00",
        " int. ",
    ],
    UZ: [
        "998",
        "810",
        "(?:33|55|[679]\\d|88)\\d{7}",
        [9],
        [["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[35-9]"], "8 $1"]],
        "8",
        0,
        0,
        0,
        0,
        0,
        0,
        "8~10",
    ],
    VA: [
        "39",
        "00",
        "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",
        [6, 7, 8, 9, 10, 11],
        0,
        0,
        0,
        0,
        0,
        0,
        "06698",
    ],
    VC: ["1", "011", "(?:[58]\\d\\d|784|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "784$1", 0, "784"],
    VE: [
        "58",
        "00",
        "[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}",
        [10],
        [["(\\d{3})(\\d{7})", "$1-$2", ["[24-689]"], "0$1"]],
        "0",
    ],
    VG: ["1", "011", "(?:284|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-578]\\d{6})$", "284$1", 0, "284"],
    VI: ["1", "011", "[58]\\d{9}|(?:34|90)0\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "340$1", 0, "340"],
    VN: [
        "84",
        "00",
        "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",
        [7, 8, 9, 10],
        [
            ["(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", 1],
            ["(\\d{4})(\\d{4,6})", "$1 $2", ["1"], 0, 1],
            ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[69]"], "0$1", 1],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3578]"], "0$1", 1],
            ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", 1],
            ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", 1],
        ],
        "0",
    ],
    VU: ["678", "00", "[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}", [5, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["[57-9]"]]]],
    WF: [
        "681",
        "00",
        "(?:40|72)\\d{4}|8\\d{5}(?:\\d{3})?",
        [6, 9],
        [
            ["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[478]"]],
            ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]],
        ],
    ],
    WS: [
        "685",
        "0",
        "(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}",
        [5, 6, 7, 10],
        [
            ["(\\d{5})", "$1", ["[2-5]|6[1-9]"]],
            ["(\\d{3})(\\d{3,7})", "$1 $2", ["[68]"]],
            ["(\\d{2})(\\d{5})", "$1 $2", ["7"]],
        ],
    ],
    XK: [
        "383",
        "00",
        "[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}",
        [8, 9],
        [
            ["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23]"], "0$1"],
        ],
        "0",
    ],
    YE: [
        "967",
        "00",
        "(?:1|7\\d)\\d{7}|[1-7]\\d{6}",
        [7, 8, 9],
        [
            ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7[24-68]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"],
        ],
        "0",
    ],
    YT: ["262", "00", "80\\d{7}|(?:26|63)9\\d{6}", [9], 0, "0", 0, 0, 0, 0, "269|63"],
    ZA: [
        "27",
        "00",
        "[1-79]\\d{8}|8\\d{4,9}",
        [5, 6, 7, 8, 9, 10],
        [
            ["(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"],
        ],
        "0",
    ],
    ZM: [
        "260",
        "00",
        "(?:63|80)0\\d{6}|(?:21|[79]\\d)\\d{7}",
        [9],
        [
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"],
            ["(\\d{2})(\\d{7})", "$1 $2", ["[79]"], "0$1"],
        ],
        "0",
    ],
    ZW: [
        "263",
        "00",
        "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",
        [5, 6, 7, 8, 9, 10],
        [
            [
                "(\\d{3})(\\d{3,5})",
                "$1 $2",
                ["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"],
                "0$1",
            ],
            ["(\\d)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["[49]"], "0$1"],
            ["(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"],
            [
                "(\\d{2})(\\d{7})",
                "$1 $2",
                [
                    "24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2",
                    "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]",
                ],
                "(0$1)",
            ],
            ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"],
            [
                "(\\d{3})(\\d{3})(\\d{3,4})",
                "$1 $2 $3",
                ["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"],
                "0$1",
            ],
            ["(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"],
            [
                "(\\d{2})(\\d{3,5})",
                "$1 $2",
                [
                    "1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]",
                ],
                "0$1",
            ],
            ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["29[013-9]|39|54"], "0$1"],
            ["(\\d{4})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258|5483"], "0$1"],
        ],
        "0",
    ],
};
var nonGeographic = {
    800: [
        "800",
        0,
        "(?:005|[1-9]\\d\\d)\\d{5}",
        [8],
        [["(\\d{4})(\\d{4})", "$1 $2", ["\\d"]]],
        0,
        0,
        0,
        0,
        0,
        0,
        [0, 0, ["(?:005|[1-9]\\d\\d)\\d{5}"]],
    ],
    808: [
        "808",
        0,
        "[1-9]\\d{7}",
        [8],
        [["(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]],
        0,
        0,
        0,
        0,
        0,
        0,
        [0, 0, 0, 0, 0, 0, 0, 0, 0, ["[1-9]\\d{7}"]],
    ],
    870: [
        "870",
        0,
        "7\\d{11}|[35-7]\\d{8}",
        [9, 12],
        [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[35-7]"]]],
        0,
        0,
        0,
        0,
        0,
        0,
        [0, ["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"]],
    ],
    878: [
        "878",
        0,
        "10\\d{10}",
        [12],
        [["(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]],
        0,
        0,
        0,
        0,
        0,
        0,
        [0, 0, 0, 0, 0, 0, 0, 0, ["10\\d{10}"]],
    ],
    881: [
        "881",
        0,
        "[0-36-9]\\d{8}",
        [9],
        [["(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[0-36-9]"]]],
        0,
        0,
        0,
        0,
        0,
        0,
        [0, ["[0-36-9]\\d{8}"]],
    ],
    882: [
        "882",
        0,
        "[13]\\d{6}(?:\\d{2,5})?|285\\d{9}|(?:[19]\\d|49)\\d{6}",
        [7, 8, 9, 10, 11, 12],
        [
            ["(\\d{2})(\\d{5})", "$1 $2", ["16|342"]],
            ["(\\d{2})(\\d{6})", "$1 $2", ["4"]],
            ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[19]"]],
            ["(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]],
            ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"]],
            ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["34[57]"]],
            ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]],
            ["(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[1-3]"]],
        ],
        0,
        0,
        0,
        0,
        0,
        0,
        [
            0,
            ["342\\d{4}|(?:337|49)\\d{6}|3(?:2|47|7\\d{3})\\d{7}", [7, 8, 9, 10, 12]],
            0,
            0,
            0,
            0,
            0,
            0,
            [
                "1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:(?:285\\d\\d|3(?:45|[69]\\d{3}))\\d|9[89])\\d{6}",
            ],
        ],
    ],
    883: [
        "883",
        0,
        "210\\d{7}|51\\d{7}(?:\\d{3})?",
        [9, 10, 12],
        [
            ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]],
            ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["2"]],
            ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["510"]],
            ["(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["5"]],
        ],
        0,
        0,
        0,
        0,
        0,
        0,
        [0, 0, 0, 0, 0, 0, 0, 0, ["(?:210|51[013]0\\d)\\d{7}|5100\\d{5}"]],
    ],
    888: [
        "888",
        0,
        "\\d{11}",
        [11],
        [["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]],
        0,
        0,
        0,
        0,
        0,
        0,
        [0, 0, 0, 0, 0, 0, ["\\d{11}"]],
    ],
    979: [
        "979",
        0,
        "[1359]\\d{8}",
        [9],
        [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[1359]"]]],
        0,
        0,
        0,
        0,
        0,
        0,
        [0, 0, 0, ["[1359]\\d{8}"]],
    ],
};
var metadata$1 = {
    version: version,
    country_calling_codes: country_calling_codes,
    countries: countries,
    nonGeographic: nonGeographic,
};

var propTypes = { exports: {} };

var reactIs = { exports: {} };

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min;

function requireReactIs_production_min() {
    if (hasRequiredReactIs_production_min) return reactIs_production_min;
    hasRequiredReactIs_production_min = 1;
    var b = "function" === typeof Symbol && Symbol.for,
        c = b ? Symbol.for("react.element") : 60103,
        d = b ? Symbol.for("react.portal") : 60106,
        e = b ? Symbol.for("react.fragment") : 60107,
        f = b ? Symbol.for("react.strict_mode") : 60108,
        g = b ? Symbol.for("react.profiler") : 60114,
        h = b ? Symbol.for("react.provider") : 60109,
        k = b ? Symbol.for("react.context") : 60110,
        l = b ? Symbol.for("react.async_mode") : 60111,
        m = b ? Symbol.for("react.concurrent_mode") : 60111,
        n = b ? Symbol.for("react.forward_ref") : 60112,
        p = b ? Symbol.for("react.suspense") : 60113,
        q = b ? Symbol.for("react.suspense_list") : 60120,
        r = b ? Symbol.for("react.memo") : 60115,
        t = b ? Symbol.for("react.lazy") : 60116,
        v = b ? Symbol.for("react.block") : 60121,
        w = b ? Symbol.for("react.fundamental") : 60117,
        x = b ? Symbol.for("react.responder") : 60118,
        y = b ? Symbol.for("react.scope") : 60119;
    function z(a) {
        if ("object" === typeof a && null !== a) {
            var u = a.$$typeof;
            switch (u) {
                case c:
                    switch (((a = a.type), a)) {
                        case l:
                        case m:
                        case e:
                        case g:
                        case f:
                        case p:
                            return a;
                        default:
                            switch (((a = a && a.$$typeof), a)) {
                                case k:
                                case n:
                                case t:
                                case r:
                                case h:
                                    return a;
                                default:
                                    return u;
                            }
                    }
                case d:
                    return u;
            }
        }
    }
    function A(a) {
        return z(a) === m;
    }
    reactIs_production_min.AsyncMode = l;
    reactIs_production_min.ConcurrentMode = m;
    reactIs_production_min.ContextConsumer = k;
    reactIs_production_min.ContextProvider = h;
    reactIs_production_min.Element = c;
    reactIs_production_min.ForwardRef = n;
    reactIs_production_min.Fragment = e;
    reactIs_production_min.Lazy = t;
    reactIs_production_min.Memo = r;
    reactIs_production_min.Portal = d;
    reactIs_production_min.Profiler = g;
    reactIs_production_min.StrictMode = f;
    reactIs_production_min.Suspense = p;
    reactIs_production_min.isAsyncMode = function (a) {
        return A(a) || z(a) === l;
    };
    reactIs_production_min.isConcurrentMode = A;
    reactIs_production_min.isContextConsumer = function (a) {
        return z(a) === k;
    };
    reactIs_production_min.isContextProvider = function (a) {
        return z(a) === h;
    };
    reactIs_production_min.isElement = function (a) {
        return "object" === typeof a && null !== a && a.$$typeof === c;
    };
    reactIs_production_min.isForwardRef = function (a) {
        return z(a) === n;
    };
    reactIs_production_min.isFragment = function (a) {
        return z(a) === e;
    };
    reactIs_production_min.isLazy = function (a) {
        return z(a) === t;
    };
    reactIs_production_min.isMemo = function (a) {
        return z(a) === r;
    };
    reactIs_production_min.isPortal = function (a) {
        return z(a) === d;
    };
    reactIs_production_min.isProfiler = function (a) {
        return z(a) === g;
    };
    reactIs_production_min.isStrictMode = function (a) {
        return z(a) === f;
    };
    reactIs_production_min.isSuspense = function (a) {
        return z(a) === p;
    };
    reactIs_production_min.isValidElementType = function (a) {
        return (
            "string" === typeof a ||
            "function" === typeof a ||
            a === e ||
            a === m ||
            a === g ||
            a === f ||
            a === p ||
            a === q ||
            ("object" === typeof a &&
                null !== a &&
                (a.$$typeof === t ||
                    a.$$typeof === r ||
                    a.$$typeof === h ||
                    a.$$typeof === k ||
                    a.$$typeof === n ||
                    a.$$typeof === w ||
                    a.$$typeof === x ||
                    a.$$typeof === y ||
                    a.$$typeof === v))
        );
    };
    reactIs_production_min.typeOf = z;
    return reactIs_production_min;
}

var reactIs_development = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_development;

function requireReactIs_development() {
    if (hasRequiredReactIs_development) return reactIs_development;
    hasRequiredReactIs_development = 1;

    if (process.env.NODE_ENV !== "production") {
        (function () {
            // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
            // nor polyfill, then a plain number is used for performance.
            var hasSymbol = typeof Symbol === "function" && Symbol.for;
            var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 0xeac7;
            var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 0xeaca;
            var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 0xeacb;
            var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 0xeacc;
            var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 0xead2;
            var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 0xeacd;
            var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
            // (unstable) APIs that have been removed. Can we remove the symbols?

            var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 0xeacf;
            var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 0xeacf;
            var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 0xead0;
            var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 0xead1;
            var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 0xead8;
            var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 0xead3;
            var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 0xead4;
            var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 0xead9;
            var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 0xead5;
            var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 0xead6;
            var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 0xead7;

            function isValidElementType(type) {
                return (
                    typeof type === "string" ||
                    typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
                    type === REACT_FRAGMENT_TYPE ||
                    type === REACT_CONCURRENT_MODE_TYPE ||
                    type === REACT_PROFILER_TYPE ||
                    type === REACT_STRICT_MODE_TYPE ||
                    type === REACT_SUSPENSE_TYPE ||
                    type === REACT_SUSPENSE_LIST_TYPE ||
                    (typeof type === "object" &&
                        type !== null &&
                        (type.$$typeof === REACT_LAZY_TYPE ||
                            type.$$typeof === REACT_MEMO_TYPE ||
                            type.$$typeof === REACT_PROVIDER_TYPE ||
                            type.$$typeof === REACT_CONTEXT_TYPE ||
                            type.$$typeof === REACT_FORWARD_REF_TYPE ||
                            type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
                            type.$$typeof === REACT_RESPONDER_TYPE ||
                            type.$$typeof === REACT_SCOPE_TYPE ||
                            type.$$typeof === REACT_BLOCK_TYPE))
                );
            }

            function typeOf(object) {
                if (typeof object === "object" && object !== null) {
                    var $$typeof = object.$$typeof;

                    switch ($$typeof) {
                        case REACT_ELEMENT_TYPE:
                            var type = object.type;

                            switch (type) {
                                case REACT_ASYNC_MODE_TYPE:
                                case REACT_CONCURRENT_MODE_TYPE:
                                case REACT_FRAGMENT_TYPE:
                                case REACT_PROFILER_TYPE:
                                case REACT_STRICT_MODE_TYPE:
                                case REACT_SUSPENSE_TYPE:
                                    return type;

                                default:
                                    var $$typeofType = type && type.$$typeof;

                                    switch ($$typeofType) {
                                        case REACT_CONTEXT_TYPE:
                                        case REACT_FORWARD_REF_TYPE:
                                        case REACT_LAZY_TYPE:
                                        case REACT_MEMO_TYPE:
                                        case REACT_PROVIDER_TYPE:
                                            return $$typeofType;

                                        default:
                                            return $$typeof;
                                    }
                            }

                        case REACT_PORTAL_TYPE:
                            return $$typeof;
                    }
                }

                return undefined;
            } // AsyncMode is deprecated along with isAsyncMode

            var AsyncMode = REACT_ASYNC_MODE_TYPE;
            var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
            var ContextConsumer = REACT_CONTEXT_TYPE;
            var ContextProvider = REACT_PROVIDER_TYPE;
            var Element = REACT_ELEMENT_TYPE;
            var ForwardRef = REACT_FORWARD_REF_TYPE;
            var Fragment = REACT_FRAGMENT_TYPE;
            var Lazy = REACT_LAZY_TYPE;
            var Memo = REACT_MEMO_TYPE;
            var Portal = REACT_PORTAL_TYPE;
            var Profiler = REACT_PROFILER_TYPE;
            var StrictMode = REACT_STRICT_MODE_TYPE;
            var Suspense = REACT_SUSPENSE_TYPE;
            var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

            function isAsyncMode(object) {
                {
                    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

                        console["warn"](
                            "The ReactIs.isAsyncMode() alias has been deprecated, " +
                                "and will be removed in React 17+. Update your code to use " +
                                "ReactIs.isConcurrentMode() instead. It has the exact same API."
                        );
                    }
                }

                return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
            }
            function isConcurrentMode(object) {
                return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
            }
            function isContextConsumer(object) {
                return typeOf(object) === REACT_CONTEXT_TYPE;
            }
            function isContextProvider(object) {
                return typeOf(object) === REACT_PROVIDER_TYPE;
            }
            function isElement(object) {
                return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
            }
            function isForwardRef(object) {
                return typeOf(object) === REACT_FORWARD_REF_TYPE;
            }
            function isFragment(object) {
                return typeOf(object) === REACT_FRAGMENT_TYPE;
            }
            function isLazy(object) {
                return typeOf(object) === REACT_LAZY_TYPE;
            }
            function isMemo(object) {
                return typeOf(object) === REACT_MEMO_TYPE;
            }
            function isPortal(object) {
                return typeOf(object) === REACT_PORTAL_TYPE;
            }
            function isProfiler(object) {
                return typeOf(object) === REACT_PROFILER_TYPE;
            }
            function isStrictMode(object) {
                return typeOf(object) === REACT_STRICT_MODE_TYPE;
            }
            function isSuspense(object) {
                return typeOf(object) === REACT_SUSPENSE_TYPE;
            }

            reactIs_development.AsyncMode = AsyncMode;
            reactIs_development.ConcurrentMode = ConcurrentMode;
            reactIs_development.ContextConsumer = ContextConsumer;
            reactIs_development.ContextProvider = ContextProvider;
            reactIs_development.Element = Element;
            reactIs_development.ForwardRef = ForwardRef;
            reactIs_development.Fragment = Fragment;
            reactIs_development.Lazy = Lazy;
            reactIs_development.Memo = Memo;
            reactIs_development.Portal = Portal;
            reactIs_development.Profiler = Profiler;
            reactIs_development.StrictMode = StrictMode;
            reactIs_development.Suspense = Suspense;
            reactIs_development.isAsyncMode = isAsyncMode;
            reactIs_development.isConcurrentMode = isConcurrentMode;
            reactIs_development.isContextConsumer = isContextConsumer;
            reactIs_development.isContextProvider = isContextProvider;
            reactIs_development.isElement = isElement;
            reactIs_development.isForwardRef = isForwardRef;
            reactIs_development.isFragment = isFragment;
            reactIs_development.isLazy = isLazy;
            reactIs_development.isMemo = isMemo;
            reactIs_development.isPortal = isPortal;
            reactIs_development.isProfiler = isProfiler;
            reactIs_development.isStrictMode = isStrictMode;
            reactIs_development.isSuspense = isSuspense;
            reactIs_development.isValidElementType = isValidElementType;
            reactIs_development.typeOf = typeOf;
        })();
    }
    return reactIs_development;
}

var hasRequiredReactIs;

function requireReactIs() {
    if (hasRequiredReactIs) return reactIs.exports;
    hasRequiredReactIs = 1;
    (function (module) {
        if (process.env.NODE_ENV === "production") {
            module.exports = requireReactIs_production_min();
        } else {
            module.exports = requireReactIs_development();
        }
    })(reactIs);
    return reactIs.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign() {
    if (hasRequiredObjectAssign) return objectAssign;
    hasRequiredObjectAssign = 1;
    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError("Object.assign cannot be called with null or undefined");
        }

        return Object(val);
    }

    function shouldUseNative() {
        try {
            if (!Object.assign) {
                return false;
            }

            // Detect buggy property enumeration order in older V8 versions.

            // https://bugs.chromium.org/p/v8/issues/detail?id=4118
            var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
            test1[5] = "de";
            if (Object.getOwnPropertyNames(test1)[0] === "5") {
                return false;
            }

            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test2 = {};
            for (var i = 0; i < 10; i++) {
                test2["_" + String.fromCharCode(i)] = i;
            }
            var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
                return test2[n];
            });
            if (order2.join("") !== "0123456789") {
                return false;
            }

            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test3 = {};
            "abcdefghijklmnopqrst".split("").forEach(function (letter) {
                test3[letter] = letter;
            });
            if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
                return false;
            }

            return true;
        } catch (err) {
            // We don't expect any of the above to throw, but better to be safe.
            return false;
        }
    }

    objectAssign = shouldUseNative()
        ? Object.assign
        : function (target, source) {
              var from;
              var to = toObject(target);
              var symbols;

              for (var s = 1; s < arguments.length; s++) {
                  from = Object(arguments[s]);

                  for (var key in from) {
                      if (hasOwnProperty.call(from, key)) {
                          to[key] = from[key];
                      }
                  }

                  if (getOwnPropertySymbols) {
                      symbols = getOwnPropertySymbols(from);
                      for (var i = 0; i < symbols.length; i++) {
                          if (propIsEnumerable.call(from, symbols[i])) {
                              to[symbols[i]] = from[symbols[i]];
                          }
                      }
                  }
              }

              return to;
          };
    return objectAssign;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;

function requireReactPropTypesSecret() {
    if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
    hasRequiredReactPropTypesSecret = 1;

    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";

    ReactPropTypesSecret_1 = ReactPropTypesSecret;
    return ReactPropTypesSecret_1;
}

var has;
var hasRequiredHas;

function requireHas() {
    if (hasRequiredHas) return has;
    hasRequiredHas = 1;
    has = Function.call.bind(Object.prototype.hasOwnProperty);
    return has;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var checkPropTypes_1;
var hasRequiredCheckPropTypes;

function requireCheckPropTypes() {
    if (hasRequiredCheckPropTypes) return checkPropTypes_1;
    hasRequiredCheckPropTypes = 1;

    var printWarning = function () {};

    if (process.env.NODE_ENV !== "production") {
        var ReactPropTypesSecret = requireReactPropTypesSecret();
        var loggedTypeFailures = {};
        var has = requireHas();

        printWarning = function (text) {
            var message = "Warning: " + text;
            if (typeof console !== "undefined") {
                console.error(message);
            }
            try {
                // --- Welcome to debugging React ---
                // This error was thrown as a convenience so that you can use this stack
                // to find the callsite that caused this warning to fire.
                throw new Error(message);
            } catch (x) {
                /**/
            }
        };
    }

    /**
     * Assert that the values match with the type specs.
     * Error messages are memorized and will only be shown once.
     *
     * @param {object} typeSpecs Map of name to a ReactPropType
     * @param {object} values Runtime values that need to be type-checked
     * @param {string} location e.g. "prop", "context", "child context"
     * @param {string} componentName Name of the component for error messages.
     * @param {?Function} getStack Returns the component stack.
     * @private
     */
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
        if (process.env.NODE_ENV !== "production") {
            for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                    var error;
                    // Prop type validation may throw. In case they do, we don't want to
                    // fail the render phase where it didn't fail before. So we log it.
                    // After these have been cleaned up, we'll let them throw.
                    try {
                        // This is intentionally an invariant that gets caught. It's the same
                        // behavior as without this statement except with a better message.
                        if (typeof typeSpecs[typeSpecName] !== "function") {
                            var err = Error(
                                (componentName || "React class") +
                                    ": " +
                                    location +
                                    " type `" +
                                    typeSpecName +
                                    "` is invalid; " +
                                    "it must be a function, usually from the `prop-types` package, but received `" +
                                    typeof typeSpecs[typeSpecName] +
                                    "`." +
                                    "This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                            );
                            err.name = "Invariant Violation";
                            throw err;
                        }
                        error = typeSpecs[typeSpecName](
                            values,
                            typeSpecName,
                            componentName,
                            location,
                            null,
                            ReactPropTypesSecret
                        );
                    } catch (ex) {
                        error = ex;
                    }
                    if (error && !(error instanceof Error)) {
                        printWarning(
                            (componentName || "React class") +
                                ": type specification of " +
                                location +
                                " `" +
                                typeSpecName +
                                "` is invalid; the type checker " +
                                "function must return `null` or an `Error` but returned a " +
                                typeof error +
                                ". " +
                                "You may have forgotten to pass an argument to the type checker " +
                                "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
                                "shape all require an argument)."
                        );
                    }
                    if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                        // Only monitor this failure once because there tends to be a lot of the
                        // same error.
                        loggedTypeFailures[error.message] = true;

                        var stack = getStack ? getStack() : "";

                        printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
                    }
                }
            }
        }
    }

    /**
     * Resets warning cache when testing.
     *
     * @private
     */
    checkPropTypes.resetWarningCache = function () {
        if (process.env.NODE_ENV !== "production") {
            loggedTypeFailures = {};
        }
    };

    checkPropTypes_1 = checkPropTypes;
    return checkPropTypes_1;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithTypeCheckers;
var hasRequiredFactoryWithTypeCheckers;

function requireFactoryWithTypeCheckers() {
    if (hasRequiredFactoryWithTypeCheckers) return factoryWithTypeCheckers;
    hasRequiredFactoryWithTypeCheckers = 1;

    var ReactIs = requireReactIs();
    var assign = requireObjectAssign();

    var ReactPropTypesSecret = requireReactPropTypesSecret();
    var has = requireHas();
    var checkPropTypes = requireCheckPropTypes();

    var printWarning = function () {};

    if (process.env.NODE_ENV !== "production") {
        printWarning = function (text) {
            var message = "Warning: " + text;
            if (typeof console !== "undefined") {
                console.error(message);
            }
            try {
                // --- Welcome to debugging React ---
                // This error was thrown as a convenience so that you can use this stack
                // to find the callsite that caused this warning to fire.
                throw new Error(message);
            } catch (x) {}
        };
    }

    function emptyFunctionThatReturnsNull() {
        return null;
    }

    factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
        /* global Symbol */
        var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator"; // Before Symbol spec.

        /**
         * Returns the iterator method function contained on the iterable object.
         *
         * Be sure to invoke the function with the iterable as context:
         *
         *     var iteratorFn = getIteratorFn(myIterable);
         *     if (iteratorFn) {
         *       var iterator = iteratorFn.call(myIterable);
         *       ...
         *     }
         *
         * @param {?object} maybeIterable
         * @return {?function}
         */
        function getIteratorFn(maybeIterable) {
            var iteratorFn =
                maybeIterable &&
                ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) || maybeIterable[FAUX_ITERATOR_SYMBOL]);
            if (typeof iteratorFn === "function") {
                return iteratorFn;
            }
        }

        /**
         * Collection of methods that allow declaration and validation of props that are
         * supplied to React components. Example usage:
         *
         *   var Props = require('ReactPropTypes');
         *   var MyArticle = React.createClass({
         *     propTypes: {
         *       // An optional string prop named "description".
         *       description: Props.string,
         *
         *       // A required enum prop named "category".
         *       category: Props.oneOf(['News','Photos']).isRequired,
         *
         *       // A prop named "dialog" that requires an instance of Dialog.
         *       dialog: Props.instanceOf(Dialog).isRequired
         *     },
         *     render: function() { ... }
         *   });
         *
         * A more formal specification of how these methods are used:
         *
         *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
         *   decl := ReactPropTypes.{type}(.isRequired)?
         *
         * Each and every declaration produces a function with the same signature. This
         * allows the creation of custom validation functions. For example:
         *
         *  var MyLink = React.createClass({
         *    propTypes: {
         *      // An optional string or URI prop named "href".
         *      href: function(props, propName, componentName) {
         *        var propValue = props[propName];
         *        if (propValue != null && typeof propValue !== 'string' &&
         *            !(propValue instanceof URI)) {
         *          return new Error(
         *            'Expected a string or an URI for ' + propName + ' in ' +
         *            componentName
         *          );
         *        }
         *      }
         *    },
         *    render: function() {...}
         *  });
         *
         * @internal
         */

        var ANONYMOUS = "<<anonymous>>";

        // Important!
        // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
        var ReactPropTypes = {
            array: createPrimitiveTypeChecker("array"),
            bigint: createPrimitiveTypeChecker("bigint"),
            bool: createPrimitiveTypeChecker("boolean"),
            func: createPrimitiveTypeChecker("function"),
            number: createPrimitiveTypeChecker("number"),
            object: createPrimitiveTypeChecker("object"),
            string: createPrimitiveTypeChecker("string"),
            symbol: createPrimitiveTypeChecker("symbol"),

            any: createAnyTypeChecker(),
            arrayOf: createArrayOfTypeChecker,
            element: createElementTypeChecker(),
            elementType: createElementTypeTypeChecker(),
            instanceOf: createInstanceTypeChecker,
            node: createNodeChecker(),
            objectOf: createObjectOfTypeChecker,
            oneOf: createEnumTypeChecker,
            oneOfType: createUnionTypeChecker,
            shape: createShapeTypeChecker,
            exact: createStrictShapeTypeChecker,
        };

        /**
         * inlined Object.is polyfill to avoid requiring consumers ship their own
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
         */
        /*eslint-disable no-self-compare*/
        function is(x, y) {
            // SameValue algorithm
            if (x === y) {
                // Steps 1-5, 7-10
                // Steps 6.b-6.e: +0 != -0
                return x !== 0 || 1 / x === 1 / y;
            } else {
                // Step 6.a: NaN == NaN
                return x !== x && y !== y;
            }
        }
        /*eslint-enable no-self-compare*/

        /**
         * We use an Error-like object for backward compatibility as people may call
         * PropTypes directly and inspect their output. However, we don't use real
         * Errors anymore. We don't inspect their stack anyway, and creating them
         * is prohibitively expensive if they are created too often, such as what
         * happens in oneOfType() for any type before the one that matched.
         */
        function PropTypeError(message, data) {
            this.message = message;
            this.data = data && typeof data === "object" ? data : {};
            this.stack = "";
        }
        // Make `instanceof Error` still work for returned errors.
        PropTypeError.prototype = Error.prototype;

        function createChainableTypeChecker(validate) {
            if (process.env.NODE_ENV !== "production") {
                var manualPropTypeCallCache = {};
                var manualPropTypeWarningCount = 0;
            }
            function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
                componentName = componentName || ANONYMOUS;
                propFullName = propFullName || propName;

                if (secret !== ReactPropTypesSecret) {
                    if (throwOnDirectAccess) {
                        // New behavior only for users of `prop-types` package
                        var err = new Error(
                            "Calling PropTypes validators directly is not supported by the `prop-types` package. " +
                                "Use `PropTypes.checkPropTypes()` to call them. " +
                                "Read more at http://fb.me/use-check-prop-types"
                        );
                        err.name = "Invariant Violation";
                        throw err;
                    } else if (process.env.NODE_ENV !== "production" && typeof console !== "undefined") {
                        // Old behavior for people using React.PropTypes
                        var cacheKey = componentName + ":" + propName;
                        if (
                            !manualPropTypeCallCache[cacheKey] &&
                            // Avoid spamming the console because they are often not actionable except for lib authors
                            manualPropTypeWarningCount < 3
                        ) {
                            printWarning(
                                "You are manually calling a React.PropTypes validation " +
                                    "function for the `" +
                                    propFullName +
                                    "` prop on `" +
                                    componentName +
                                    "`. This is deprecated " +
                                    "and will throw in the standalone `prop-types` package. " +
                                    "You may be seeing this warning due to a third-party PropTypes " +
                                    "library. See https://fb.me/react-warning-dont-call-proptypes " +
                                    "for details."
                            );
                            manualPropTypeCallCache[cacheKey] = true;
                            manualPropTypeWarningCount++;
                        }
                    }
                }
                if (props[propName] == null) {
                    if (isRequired) {
                        if (props[propName] === null) {
                            return new PropTypeError(
                                "The " +
                                    location +
                                    " `" +
                                    propFullName +
                                    "` is marked as required " +
                                    ("in `" + componentName + "`, but its value is `null`.")
                            );
                        }
                        return new PropTypeError(
                            "The " +
                                location +
                                " `" +
                                propFullName +
                                "` is marked as required in " +
                                ("`" + componentName + "`, but its value is `undefined`.")
                        );
                    }
                    return null;
                } else {
                    return validate(props, propName, componentName, location, propFullName);
                }
            }

            var chainedCheckType = checkType.bind(null, false);
            chainedCheckType.isRequired = checkType.bind(null, true);

            return chainedCheckType;
        }

        function createPrimitiveTypeChecker(expectedType) {
            function validate(props, propName, componentName, location, propFullName, secret) {
                var propValue = props[propName];
                var propType = getPropType(propValue);
                if (propType !== expectedType) {
                    // `propValue` being instance of, say, date/regexp, pass the 'object'
                    // check, but we can offer a more precise error message here rather than
                    // 'of type `object`'.
                    var preciseType = getPreciseType(propValue);

                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") +
                            ("`" + expectedType + "`."),
                        { expectedType: expectedType }
                    );
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createAnyTypeChecker() {
            return createChainableTypeChecker(emptyFunctionThatReturnsNull);
        }

        function createArrayOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
                if (typeof typeChecker !== "function") {
                    return new PropTypeError(
                        "Property `" +
                            propFullName +
                            "` of component `" +
                            componentName +
                            "` has invalid PropType notation inside arrayOf."
                    );
                }
                var propValue = props[propName];
                if (!Array.isArray(propValue)) {
                    var propType = getPropType(propValue);
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" + propType + "` supplied to `" + componentName + "`, expected an array.")
                    );
                }
                for (var i = 0; i < propValue.length; i++) {
                    var error = typeChecker(
                        propValue,
                        i,
                        componentName,
                        location,
                        propFullName + "[" + i + "]",
                        ReactPropTypesSecret
                    );
                    if (error instanceof Error) {
                        return error;
                    }
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createElementTypeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
                var propValue = props[propName];
                if (!isValidElement(propValue)) {
                    var propType = getPropType(propValue);
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement.")
                    );
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createElementTypeTypeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
                var propValue = props[propName];
                if (!ReactIs.isValidElementType(propValue)) {
                    var propType = getPropType(propValue);
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" +
                                propType +
                                "` supplied to `" +
                                componentName +
                                "`, expected a single ReactElement type.")
                    );
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createInstanceTypeChecker(expectedClass) {
            function validate(props, propName, componentName, location, propFullName) {
                if (!(props[propName] instanceof expectedClass)) {
                    var expectedClassName = expectedClass.name || ANONYMOUS;
                    var actualClassName = getClassName(props[propName]);
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") +
                            ("instance of `" + expectedClassName + "`.")
                    );
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createEnumTypeChecker(expectedValues) {
            if (!Array.isArray(expectedValues)) {
                if (process.env.NODE_ENV !== "production") {
                    if (arguments.length > 1) {
                        printWarning(
                            "Invalid arguments supplied to oneOf, expected an array, got " +
                                arguments.length +
                                " arguments. " +
                                "A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
                        );
                    } else {
                        printWarning("Invalid argument supplied to oneOf, expected an array.");
                    }
                }
                return emptyFunctionThatReturnsNull;
            }

            function validate(props, propName, componentName, location, propFullName) {
                var propValue = props[propName];
                for (var i = 0; i < expectedValues.length; i++) {
                    if (is(propValue, expectedValues[i])) {
                        return null;
                    }
                }

                var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
                    var type = getPreciseType(value);
                    if (type === "symbol") {
                        return String(value);
                    }
                    return value;
                });
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` of value `" +
                        String(propValue) +
                        "` " +
                        ("supplied to `" + componentName + "`, expected one of " + valuesString + ".")
                );
            }
            return createChainableTypeChecker(validate);
        }

        function createObjectOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
                if (typeof typeChecker !== "function") {
                    return new PropTypeError(
                        "Property `" +
                            propFullName +
                            "` of component `" +
                            componentName +
                            "` has invalid PropType notation inside objectOf."
                    );
                }
                var propValue = props[propName];
                var propType = getPropType(propValue);
                if (propType !== "object") {
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type " +
                            ("`" + propType + "` supplied to `" + componentName + "`, expected an object.")
                    );
                }
                for (var key in propValue) {
                    if (has(propValue, key)) {
                        var error = typeChecker(
                            propValue,
                            key,
                            componentName,
                            location,
                            propFullName + "." + key,
                            ReactPropTypesSecret
                        );
                        if (error instanceof Error) {
                            return error;
                        }
                    }
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createUnionTypeChecker(arrayOfTypeCheckers) {
            if (!Array.isArray(arrayOfTypeCheckers)) {
                process.env.NODE_ENV !== "production"
                    ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.")
                    : void 0;
                return emptyFunctionThatReturnsNull;
            }

            for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                var checker = arrayOfTypeCheckers[i];
                if (typeof checker !== "function") {
                    printWarning(
                        "Invalid argument supplied to oneOfType. Expected an array of check functions, but " +
                            "received " +
                            getPostfixForTypeWarning(checker) +
                            " at index " +
                            i +
                            "."
                    );
                    return emptyFunctionThatReturnsNull;
                }
            }

            function validate(props, propName, componentName, location, propFullName) {
                var expectedTypes = [];
                for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                    var checker = arrayOfTypeCheckers[i];
                    var checkerResult = checker(
                        props,
                        propName,
                        componentName,
                        location,
                        propFullName,
                        ReactPropTypesSecret
                    );
                    if (checkerResult == null) {
                        return null;
                    }
                    if (checkerResult.data && has(checkerResult.data, "expectedType")) {
                        expectedTypes.push(checkerResult.data.expectedType);
                    }
                }
                var expectedTypesMessage =
                    expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
                return new PropTypeError(
                    "Invalid " +
                        location +
                        " `" +
                        propFullName +
                        "` supplied to " +
                        ("`" + componentName + "`" + expectedTypesMessage + ".")
                );
            }
            return createChainableTypeChecker(validate);
        }

        function createNodeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
                if (!isNode(props[propName])) {
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` supplied to " +
                            ("`" + componentName + "`, expected a ReactNode.")
                    );
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function invalidValidatorError(componentName, location, propFullName, key, type) {
            return new PropTypeError(
                (componentName || "React class") +
                    ": " +
                    location +
                    " type `" +
                    propFullName +
                    "." +
                    key +
                    "` is invalid; " +
                    "it must be a function, usually from the `prop-types` package, but received `" +
                    type +
                    "`."
            );
        }

        function createShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
                var propValue = props[propName];
                var propType = getPropType(propValue);
                if (propType !== "object") {
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type `" +
                            propType +
                            "` " +
                            ("supplied to `" + componentName + "`, expected `object`.")
                    );
                }
                for (var key in shapeTypes) {
                    var checker = shapeTypes[key];
                    if (typeof checker !== "function") {
                        return invalidValidatorError(
                            componentName,
                            location,
                            propFullName,
                            key,
                            getPreciseType(checker)
                        );
                    }
                    var error = checker(
                        propValue,
                        key,
                        componentName,
                        location,
                        propFullName + "." + key,
                        ReactPropTypesSecret
                    );
                    if (error) {
                        return error;
                    }
                }
                return null;
            }
            return createChainableTypeChecker(validate);
        }

        function createStrictShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
                var propValue = props[propName];
                var propType = getPropType(propValue);
                if (propType !== "object") {
                    return new PropTypeError(
                        "Invalid " +
                            location +
                            " `" +
                            propFullName +
                            "` of type `" +
                            propType +
                            "` " +
                            ("supplied to `" + componentName + "`, expected `object`.")
                    );
                }
                // We need to check all keys in case some are required but missing from props.
                var allKeys = assign({}, props[propName], shapeTypes);
                for (var key in allKeys) {
                    var checker = shapeTypes[key];
                    if (has(shapeTypes, key) && typeof checker !== "function") {
                        return invalidValidatorError(
                            componentName,
                            location,
                            propFullName,
                            key,
                            getPreciseType(checker)
                        );
                    }
                    if (!checker) {
                        return new PropTypeError(
                            "Invalid " +
                                location +
                                " `" +
                                propFullName +
                                "` key `" +
                                key +
                                "` supplied to `" +
                                componentName +
                                "`." +
                                "\nBad object: " +
                                JSON.stringify(props[propName], null, "  ") +
                                "\nValid keys: " +
                                JSON.stringify(Object.keys(shapeTypes), null, "  ")
                        );
                    }
                    var error = checker(
                        propValue,
                        key,
                        componentName,
                        location,
                        propFullName + "." + key,
                        ReactPropTypesSecret
                    );
                    if (error) {
                        return error;
                    }
                }
                return null;
            }

            return createChainableTypeChecker(validate);
        }

        function isNode(propValue) {
            switch (typeof propValue) {
                case "number":
                case "string":
                case "undefined":
                    return true;
                case "boolean":
                    return !propValue;
                case "object":
                    if (Array.isArray(propValue)) {
                        return propValue.every(isNode);
                    }
                    if (propValue === null || isValidElement(propValue)) {
                        return true;
                    }

                    var iteratorFn = getIteratorFn(propValue);
                    if (iteratorFn) {
                        var iterator = iteratorFn.call(propValue);
                        var step;
                        if (iteratorFn !== propValue.entries) {
                            while (!(step = iterator.next()).done) {
                                if (!isNode(step.value)) {
                                    return false;
                                }
                            }
                        } else {
                            // Iterator will provide entry [k,v] tuples rather than values.
                            while (!(step = iterator.next()).done) {
                                var entry = step.value;
                                if (entry) {
                                    if (!isNode(entry[1])) {
                                        return false;
                                    }
                                }
                            }
                        }
                    } else {
                        return false;
                    }

                    return true;
                default:
                    return false;
            }
        }

        function isSymbol(propType, propValue) {
            // Native Symbol.
            if (propType === "symbol") {
                return true;
            }

            // falsy value can't be a Symbol
            if (!propValue) {
                return false;
            }

            // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
            if (propValue["@@toStringTag"] === "Symbol") {
                return true;
            }

            // Fallback for non-spec compliant Symbols which are polyfilled.
            if (typeof Symbol === "function" && propValue instanceof Symbol) {
                return true;
            }

            return false;
        }

        // Equivalent of `typeof` but with special handling for array and regexp.
        function getPropType(propValue) {
            var propType = typeof propValue;
            if (Array.isArray(propValue)) {
                return "array";
            }
            if (propValue instanceof RegExp) {
                // Old webkits (at least until Android 4.0) return 'function' rather than
                // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
                // passes PropTypes.object.
                return "object";
            }
            if (isSymbol(propType, propValue)) {
                return "symbol";
            }
            return propType;
        }

        // This handles more types than `getPropType`. Only used for error messages.
        // See `createPrimitiveTypeChecker`.
        function getPreciseType(propValue) {
            if (typeof propValue === "undefined" || propValue === null) {
                return "" + propValue;
            }
            var propType = getPropType(propValue);
            if (propType === "object") {
                if (propValue instanceof Date) {
                    return "date";
                } else if (propValue instanceof RegExp) {
                    return "regexp";
                }
            }
            return propType;
        }

        // Returns a string that is postfixed to a warning about an invalid type.
        // For example, "undefined" or "of type array"
        function getPostfixForTypeWarning(value) {
            var type = getPreciseType(value);
            switch (type) {
                case "array":
                case "object":
                    return "an " + type;
                case "boolean":
                case "date":
                case "regexp":
                    return "a " + type;
                default:
                    return type;
            }
        }

        // Returns class name of the object, if any.
        function getClassName(propValue) {
            if (!propValue.constructor || !propValue.constructor.name) {
                return ANONYMOUS;
            }
            return propValue.constructor.name;
        }

        ReactPropTypes.checkPropTypes = checkPropTypes;
        ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
        ReactPropTypes.PropTypes = ReactPropTypes;

        return ReactPropTypes;
    };
    return factoryWithTypeCheckers;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;

function requireFactoryWithThrowingShims() {
    if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
    hasRequiredFactoryWithThrowingShims = 1;

    var ReactPropTypesSecret = requireReactPropTypesSecret();

    function emptyFunction() {}
    function emptyFunctionWithReset() {}
    emptyFunctionWithReset.resetWarningCache = emptyFunction;

    factoryWithThrowingShims = function () {
        function shim(props, propName, componentName, location, propFullName, secret) {
            if (secret === ReactPropTypesSecret) {
                // It is still safe when called from React.
                return;
            }
            var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. " +
                    "Use PropTypes.checkPropTypes() to call them. " +
                    "Read more at http://fb.me/use-check-prop-types"
            );
            err.name = "Invariant Violation";
            throw err;
        }
        shim.isRequired = shim;
        function getShim() {
            return shim;
        } // Important!
        // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
        var ReactPropTypes = {
            array: shim,
            bigint: shim,
            bool: shim,
            func: shim,
            number: shim,
            object: shim,
            string: shim,
            symbol: shim,

            any: shim,
            arrayOf: getShim,
            element: shim,
            elementType: shim,
            instanceOf: getShim,
            node: shim,
            objectOf: getShim,
            oneOf: getShim,
            oneOfType: getShim,
            shape: getShim,
            exact: getShim,

            checkPropTypes: emptyFunctionWithReset,
            resetWarningCache: emptyFunction,
        };

        ReactPropTypes.PropTypes = ReactPropTypes;

        return ReactPropTypes;
    };
    return factoryWithThrowingShims;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== "production") {
    var ReactIs = requireReactIs();

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    propTypes.exports = requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
} else {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    propTypes.exports = requireFactoryWithThrowingShims()();
}

var classnames = { exports: {} };

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

(function (module) {
    /* global define */

    (function () {
        var hasOwn = {}.hasOwnProperty;

        function classNames() {
            var classes = [];

            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                if (!arg) continue;

                var argType = typeof arg;

                if (argType === "string" || argType === "number") {
                    classes.push(arg);
                } else if (Array.isArray(arg)) {
                    if (arg.length) {
                        var inner = classNames.apply(null, arg);
                        if (inner) {
                            classes.push(inner);
                        }
                    }
                } else if (argType === "object") {
                    if (
                        arg.toString !== Object.prototype.toString &&
                        !arg.toString.toString().includes("[native code]")
                    ) {
                        classes.push(arg.toString());
                        continue;
                    }

                    for (var key in arg) {
                        if (hasOwn.call(arg, key) && arg[key]) {
                            classes.push(key);
                        }
                    }
                }
            }

            return classes.join(" ");
        }

        if (module.exports) {
            classNames.default = classNames;
            module.exports = classNames;
        } else {
            window.classNames = classNames;
        }
    })();
})(classnames);

var classNames = classnames.exports;

// Edits text `value` (if `operation` is passed) and repositions the `caret` if needed.
//
// Example:
//
// value - '88005553535'
// caret - 2 // starting from 0; is positioned before the first zero
// operation - 'Backspace'
//
// Returns
// {
// 	value: '8005553535'
// 	caret: 1
// }
//
// Currently supports just 'Delete' and 'Backspace' operations
//
function edit(value, caret, operation) {
    switch (operation) {
        case "Backspace":
            // If there exists the previous character,
            // then erase it and reposition the caret.
            if (caret > 0) {
                // Remove the previous character
                value = value.slice(0, caret - 1) + value.slice(caret); // Position the caret where the previous (erased) character was

                caret--;
            }

            break;

        case "Delete":
            // Remove current digit (if any)
            value = value.slice(0, caret) + value.slice(caret + 1);
            break;
    }

    return {
        value: value,
        caret: caret,
    };
}

// Parses the `text`.
//
// Returns `{ value, caret }` where `caret` is
// the caret position inside `value`
// corresponding to the `caret_position` inside `text`.
//
// The `text` is parsed by feeding each character sequentially to
// `parse_character(character, value)` function
// and appending the result (if it's not `undefined`) to `value`.
//
// Example:
//
// `text` is `8 (800) 555-35-35`,
// `caret_position` is `4` (before the first `0`).
// `parse_character` is `(character, value) =>
//   if (character >= '0' && character <= '9') { return character }`.
//
// then `parse()` outputs `{ value: '88005553535', caret: 2 }`.
//
function parse$1(text, caret_position, parse_character) {
    var value = "";
    var focused_input_character_index = 0;
    var index = 0;

    while (index < text.length) {
        var character = parse_character(text[index], value);

        if (character !== undefined) {
            value += character;

            if (caret_position !== undefined) {
                if (caret_position === index) {
                    focused_input_character_index = value.length - 1;
                } else if (caret_position > index) {
                    focused_input_character_index = value.length;
                }
            }
        }

        index++;
    } // If caret position wasn't specified

    if (caret_position === undefined) {
        // Then set caret position to "after the last input character"
        focused_input_character_index = value.length;
    }

    var result = {
        value: value,
        caret: focused_input_character_index,
    };
    return result;
}

function _createForOfIteratorHelperLoose$1(o, allowArrayLike) {
    var it = (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray$1(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
    ) {
        if (it) o = it;
        var i = 0;
        return function () {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
        };
    }
    throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}

function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

// Counts all occurences of a symbol in a string
function count_occurences(symbol, string) {
    var count = 0; // Using `.split('')` here instead of normal `for ... of`
    // because the importing application doesn't neccessarily include an ES6 polyfill.
    // The `.split('')` approach discards "exotic" UTF-8 characters
    // (the ones consisting of four bytes)
    // but template placeholder characters don't fall into that range
    // so skipping such miscellaneous "exotic" characters
    // won't matter here for just counting placeholder character occurrences.

    for (var _iterator = _createForOfIteratorHelperLoose$1(string.split("")), _step; !(_step = _iterator()).done; ) {
        var character = _step.value;

        if (character === symbol) {
            count++;
        }
    }

    return count;
}

function closeBraces(retained_template, template) {
    var placeholder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "x";
    var empty_placeholder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : " ";
    var cut_before = retained_template.length;
    var opening_braces = count_occurences("(", retained_template);
    var closing_braces = count_occurences(")", retained_template);
    var dangling_braces = opening_braces - closing_braces;

    while (dangling_braces > 0 && cut_before < template.length) {
        retained_template += template[cut_before].replace(placeholder, empty_placeholder);

        if (template[cut_before] === ")") {
            dangling_braces--;
        }

        cut_before++;
    }

    return retained_template;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
    ) {
        if (it) o = it;
        var i = 0;
        return function () {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
        };
    }
    throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}
// are denoted by 'x'es (e.g. 'x (xxx) xxx-xx-xx').
//
// Returns a function which takes `value` characters
// and returns the `template` filled with those characters.
// If the `template` can only be partially filled
// then it is cut off.
//
// If `should_close_braces` is `true`,
// then it will also make sure all dangling braces are closed,
// e.g. "8 (8" -> "8 (8  )" (iPhone style phone number input).
//

function template_formatter(template) {
    var placeholder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "x";
    var should_close_braces = arguments.length > 2 ? arguments[2] : undefined;

    if (!template) {
        return function (value) {
            return {
                text: value,
            };
        };
    }

    var characters_in_template = count_occurences(placeholder, template);
    return function (value) {
        if (!value) {
            return {
                text: "",
                template: template,
            };
        }

        var value_character_index = 0;
        var filled_in_template = ""; // Using `.split('')` here instead of normal `for ... of`
        // because the importing application doesn't neccessarily include an ES6 polyfill.
        // The `.split('')` approach discards "exotic" UTF-8 characters
        // (the ones consisting of four bytes)
        // but template placeholder characters don't fall into that range
        // and appending UTF-8 characters to a string in parts still works.

        for (
            var _iterator = _createForOfIteratorHelperLoose(template.split("")), _step;
            !(_step = _iterator()).done;

        ) {
            var character = _step.value;

            if (character !== placeholder) {
                filled_in_template += character;
                continue;
            }

            filled_in_template += value[value_character_index];
            value_character_index++; // If the last available value character has been filled in,
            // then return the filled in template
            // (either trim the right part or retain it,
            //  if no more character placeholders in there)

            if (value_character_index === value.length) {
                // If there are more character placeholders
                // in the right part of the template
                // then simply trim it.
                if (value.length < characters_in_template) {
                    break;
                }
            }
        }

        if (should_close_braces) {
            filled_in_template = closeBraces(filled_in_template, template);
        }

        return {
            text: filled_in_template,
            template: template,
        };
    };
}

//
// `{ value, caret }` attribute is the result of `parse()` function call.
//
// Returns `{ text, caret }` where the new `caret` is the caret position
// inside `text` text corresponding to the original `caret` position inside `value`.
//
// `formatter(value)` is a function returning `{ text, template }`.
//
// `text` is the `value` value formatted using `template`.
// It may either cut off the non-filled right part of the `template`
// or it may fill the non-filled character placeholders
// in the right part of the `template` with `spacer`
// which is a space (' ') character by default.
//
// `template` is the template used to format the `value`.
// It can be either a full-length template or a partial template.
//
// `formatter` can also be a string — a `template`
// where character placeholders are denoted by 'x'es.
// In this case `formatter` function is automatically created.
//
// Example:
//
// `value` is '880',
// `caret` is `2` (before the first `0`)
//
// `formatter` is `'880' =>
//   { text: '8 (80 )', template: 'x (xxx) xxx-xx-xx' }`
//
// The result is `{ text: '8 (80 )', caret: 4 }`.
//

function format$1(value, caret, formatter) {
    if (typeof formatter === "string") {
        formatter = template_formatter(formatter);
    }

    var _ref = formatter(value) || {},
        text = _ref.text,
        template = _ref.template;

    if (text === undefined) {
        text = value;
    }

    if (template) {
        if (caret === undefined) {
            caret = text.length;
        } else {
            var index = 0;
            var found = false;
            var possibly_last_input_character_index = -1;

            while (index < text.length && index < template.length) {
                // Character placeholder found
                if (text[index] !== template[index]) {
                    if (caret === 0) {
                        found = true;
                        caret = index;
                        break;
                    }

                    possibly_last_input_character_index = index;
                    caret--;
                }

                index++;
            } // If the caret was positioned after last input character,
            // then the text caret index is just after the last input character.

            if (!found) {
                caret = possibly_last_input_character_index + 1;
            }
        }
    }

    return {
        text: text,
        caret: caret,
    };
}

function isReadOnly(element) {
    return element.hasAttribute("readonly");
} // Gets <input/> selection bounds

function getSelection(element) {
    // If no selection, return nothing
    if (element.selectionStart === element.selectionEnd) {
        return;
    }

    return {
        start: element.selectionStart,
        end: element.selectionEnd,
    };
} // Key codes

var Keys = {
    Backspace: 8,
    Delete: 46,
}; // Finds out the operation to be intercepted and performed
// based on the key down event `keyCode`.

function getOperation(event) {
    switch (event.keyCode) {
        case Keys.Backspace:
            return "Backspace";

        case Keys.Delete:
            return "Delete";
    }
} // Gets <input/> caret position

function getCaretPosition(element) {
    return element.selectionStart;
} // Sets <input/> caret position

function setCaretPosition(element, caret_position) {
    // Sanity check
    if (caret_position === undefined) {
        return;
    } // Set caret position.
    // There has been an issue with caret positioning on Android devices.
    // https://github.com/catamphetamine/input-format/issues/2
    // I was revisiting this issue and looked for similar issues in other libraries.
    // For example, there's [`text-mask`](https://github.com/text-mask/text-mask) library.
    // They've had exactly the same issue when the caret seemingly refused to be repositioned programmatically.
    // The symptoms were the same: whenever the caret passed through a non-digit character of a mask (a whitespace, a bracket, a dash, etc), it looked as if it placed itself one character before its correct position.
    // https://github.com/text-mask/text-mask/issues/300
    // They seem to have found a basic fix for it: calling `input.setSelectionRange()` in a timeout rather than instantly for Android devices.
    // https://github.com/text-mask/text-mask/pull/400/files
    // I've implemented the same workaround here.

    if (isAndroid()) {
        setTimeout(function () {
            return element.setSelectionRange(caret_position, caret_position);
        }, 0);
    } else {
        element.setSelectionRange(caret_position, caret_position);
    }
}

function isAndroid() {
    // `navigator` is not defined when running mocha tests.
    if (typeof navigator !== "undefined") {
        return ANDROID_USER_AGENT_REG_EXP.test(navigator.userAgent);
    }
}

var ANDROID_USER_AGENT_REG_EXP = /Android/i;

function onChange(event, input, _parse, _format, on_change) {
    formatInputText(input, _parse, _format, undefined, on_change);
} // "Delete" and "Backspace" keys are special
// in a way that they're not handled by the regular `onChange()` handler
// and instead are intercepted and re-applied manually.
// The reason is that normally hitting "Backspace" or "Delete"
// results in erasing a character, but that character might be any character,
// while it would be a better "user experience" if it erased not just any character
// but the closest "meaningful" character.
// For example, if a template is `(xxx) xxx-xxxx`,
// and the `<input/>` value is `(111) 222-3333`,
// then, if a user begins erasing the `3333` part via "Backspace"
// and reaches the "-" character, then it would just erase the "-" character.
// Nothing wrong with that, but it would be a better "user experience"
// if hitting "Backspace" at that position would erase the closest "meaningful"
// character, which would be the rightmost `2`.
// So, what this `onKeyDown()` handler does is it intercepts
// "Backspace" and "Delete" keys and re-applies those operations manually
// following the logic described above.

function onKeyDown(event, input, _parse, _format, on_change) {
    if (isReadOnly(input)) {
        return;
    }

    var operation = getOperation(event);

    switch (operation) {
        case "Delete":
        case "Backspace":
            // Intercept this operation and perform it manually.
            event.preventDefault();
            var selection = getSelection(input); // If a selection is made, just erase the selected text.

            if (selection) {
                eraseSelection(input, selection);
                return formatInputText(input, _parse, _format, undefined, on_change);
            } // Else, perform the (character erasing) operation manually.

            return formatInputText(input, _parse, _format, operation, on_change);
    }
}
/**
 * Erases the selected text inside an `<input/>`.
 * @param  {DOMElement} input
 * @param  {Selection} selection
 */

function eraseSelection(input, selection) {
    var text = input.value;
    text = text.slice(0, selection.start) + text.slice(selection.end);
    input.value = text;
    setCaretPosition(input, selection.start);
}
/**
 * Parses and re-formats `<input/>` textual value.
 * E.g. when a user enters something into the `<input/>`
 * that raw input must first be parsed and the re-formatted properly.
 * Is called either after some user input (e.g. entered a character, pasted something)
 * or after the user performed an `operation` (e.g. "Backspace", "Delete").
 * @param  {DOMElement} input
 * @param  {Function} parse
 * @param  {Function} format
 * @param  {string} [operation] - The operation that triggered `<input/>` textual value change. E.g. "Backspace", "Delete".
 * @param  {Function} onChange
 */

function formatInputText(input, _parse, _format, operation, on_change) {
    // Parse `<input/>` textual value.
    // Get the `value` and `caret` position.
    var _parse2 = parse$1(input.value, getCaretPosition(input), _parse),
        value = _parse2.value,
        caret = _parse2.caret; // If a user performed an operation ("Backspace", "Delete")
    // then apply that operation and get the new `value` and `caret` position.

    if (operation) {
        var newValueAndCaret = edit(value, caret, operation);
        value = newValueAndCaret.value;
        caret = newValueAndCaret.caret;
    } // Format the `value`.
    // (and reposition the caret accordingly)

    var formatted = format$1(value, caret, _format);
    var text = formatted.text;
    caret = formatted.caret; // Set `<input/>` textual value manually
    // to prevent React from resetting the caret position
    // later inside a subsequent `render()`.
    // Doesn't work for custom `inputComponent`s for some reason.

    input.value = text; // Position the caret properly.

    setCaretPosition(input, caret); // If the `<input/>` textual value did change,
    // then the parsed `value` may have changed too.

    on_change(value);
}

var _excluded = ["value", "parse", "format", "inputComponent", "onChange", "onKeyDown"];

function _extends$7() {
    _extends$7 =
        Object.assign ||
        function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends$7.apply(this, arguments);
}

function _objectWithoutProperties$6(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$6(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

function _objectWithoutPropertiesLoose$6(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
//
// <ReactInput
// 	value={this.state.phone}
// 	onChange={phone => this.setState({ phone })}
// 	parse={character => character}
// 	format={value => ({ text: value, template: 'xxxxxxxx' })}/>
//

function Input(_ref, ref) {
    var value = _ref.value,
        parse = _ref.parse,
        format = _ref.format,
        InputComponent = _ref.inputComponent,
        onChange$1 = _ref.onChange,
        onKeyDown$1 = _ref.onKeyDown,
        rest = _objectWithoutProperties$6(_ref, _excluded);

    var internalRef = React.useRef();
    var setRef = React.useCallback(
        function (instance) {
            internalRef.current = instance;

            if (ref) {
                if (typeof ref === "function") {
                    ref(instance);
                } else {
                    ref.current = instance;
                }
            }
        },
        [ref]
    );

    var _onChange = React.useCallback(
        function (event) {
            return onChange(event, internalRef.current, parse, format, onChange$1);
        },
        [internalRef, parse, format, onChange$1]
    );

    var _onKeyDown = React.useCallback(
        function (event) {
            if (onKeyDown$1) {
                onKeyDown$1(event);
            }

            return onKeyDown(event, internalRef.current, parse, format, onChange$1);
        },
        [internalRef, parse, format, onChange$1, onKeyDown$1]
    );

    return /*#__PURE__*/ React.createElement(
        InputComponent,
        _extends$7({}, rest, {
            ref: setRef,
            value: format(isEmptyValue(value) ? "" : value).text,
            onKeyDown: _onKeyDown,
            onChange: _onChange,
        })
    );
}

Input = /*#__PURE__*/ React.forwardRef(Input);
Input.propTypes = {
    // Parses a single characher of `<input/>` text.
    parse: propTypes.exports.func.isRequired,
    // Formats `value` into `<input/>` text.
    format: propTypes.exports.func.isRequired,
    // Renders `<input/>` by default.
    inputComponent: propTypes.exports.elementType.isRequired,
    // `<input/>` `type` attribute.
    type: propTypes.exports.string.isRequired,
    // Is parsed from <input/> text.
    value: propTypes.exports.string,
    // This handler is called each time `<input/>` text is changed.
    onChange: propTypes.exports.func.isRequired,
    // Passthrough
    onKeyDown: propTypes.exports.func,
    onCut: propTypes.exports.func,
    onPaste: propTypes.exports.func,
};
Input.defaultProps = {
    // Renders `<input/>` by default.
    inputComponent: "input",
    // `<input/>` `type` attribute.
    type: "text",
};
var Input$1 = Input;

function isEmptyValue(value) {
    return value === undefined || value === null;
}

function _classCallCheck$8(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

// https://stackoverflow.com/a/46971044/970769
var ParseError = function ParseError(code) {
    _classCallCheck$8(this, ParseError);

    this.name = this.constructor.name;
    this.message = code;
    this.stack = new Error(code).stack;
};
ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.constructor = ParseError;

// The minimum length of the national significant number.
var MIN_LENGTH_FOR_NSN = 2; // The ITU says the maximum length should be 15,
// but one can find longer numbers in Germany.

var MAX_LENGTH_FOR_NSN = 17; // The maximum length of the country calling code.

var MAX_LENGTH_COUNTRY_CODE = 3; // Digits accepted in phone numbers
// (ascii, fullwidth, arabic-indic, and eastern arabic digits).

var VALID_DIGITS = "0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9"; // `DASHES` will be right after the opening square bracket of the "character class"

var DASHES = "-\u2010-\u2015\u2212\u30FC\uFF0D";
var SLASHES = "\uFF0F/";
var DOTS = "\uFF0E.";
var WHITESPACE = " \xA0\xAD\u200B\u2060\u3000";
var BRACKETS = "()\uFF08\uFF09\uFF3B\uFF3D\\[\\]"; // export const OPENING_BRACKETS = '(\uFF08\uFF3B\\\['

var TILDES = "~\u2053\u223C\uFF5E"; // Regular expression of acceptable punctuation found in phone numbers. This
// excludes punctuation found as a leading character only. This consists of dash
// characters, white space characters, full stops, slashes, square brackets,
// parentheses and tildes. Full-width variants are also present.

var VALID_PUNCTUATION = ""
    .concat(DASHES)
    .concat(SLASHES)
    .concat(DOTS)
    .concat(WHITESPACE)
    .concat(BRACKETS)
    .concat(TILDES);
var PLUS_CHARS = "+\uFF0B"; // const LEADING_PLUS_CHARS_PATTERN = new RegExp('^[' + PLUS_CHARS + ']+')

// Copy-pasted from:
// https://github.com/substack/semver-compare/blob/master/index.js
//
// Inlining this function because some users reported issues with
// importing from `semver-compare` in a browser with ES6 "native" modules.
//
// Fixes `semver-compare` not being able to compare versions with alpha/beta/etc "tags".
// https://github.com/catamphetamine/libphonenumber-js/issues/381
function compare(a, b) {
    a = a.split("-");
    b = b.split("-");
    var pa = a[0].split(".");
    var pb = b[0].split(".");

    for (var i = 0; i < 3; i++) {
        var na = Number(pa[i]);
        var nb = Number(pb[i]);
        if (na > nb) return 1;
        if (nb > na) return -1;
        if (!isNaN(na) && isNaN(nb)) return 1;
        if (isNaN(na) && !isNaN(nb)) return -1;
    }

    if (a[1] && b[1]) {
        return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;
    }

    return !a[1] && b[1] ? 1 : a[1] && !b[1] ? -1 : 0;
}

function _typeof$4(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof$4 = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof$4 = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof$4(obj);
}

function _classCallCheck$7(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties$7(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass$7(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$7(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$7(Constructor, staticProps);
    return Constructor;
}

var V3 = "1.2.0"; // Moved `001` country code to "nonGeographic" section of metadata.

var V4 = "1.7.35";
var DEFAULT_EXT_PREFIX = " ext. ";
var CALLING_CODE_REG_EXP = /^\d+$/;
/**
 * See: https://gitlab.com/catamphetamine/libphonenumber-js/blob/master/METADATA.md
 */

var Metadata =
    /*#__PURE__*/
    (function () {
        function Metadata(metadata) {
            _classCallCheck$7(this, Metadata);

            validateMetadata(metadata);
            this.metadata = metadata;
            setVersion.call(this, metadata);
        }

        _createClass$7(Metadata, [
            {
                key: "getCountries",
                value: function getCountries() {
                    return Object.keys(this.metadata.countries).filter(function (_) {
                        return _ !== "001";
                    });
                },
            },
            {
                key: "getCountryMetadata",
                value: function getCountryMetadata(countryCode) {
                    return this.metadata.countries[countryCode];
                },
            },
            {
                key: "nonGeographic",
                value: function nonGeographic() {
                    if (this.v1 || this.v2 || this.v3) return; // `nonGeographical` was a typo.
                    // It's present in metadata generated from `1.7.35` to `1.7.37`.

                    return this.metadata.nonGeographic || this.metadata.nonGeographical;
                },
            },
            {
                key: "hasCountry",
                value: function hasCountry(country) {
                    return this.getCountryMetadata(country) !== undefined;
                },
            },
            {
                key: "hasCallingCode",
                value: function hasCallingCode(callingCode) {
                    if (this.getCountryCodesForCallingCode(callingCode)) {
                        return true;
                    }

                    if (this.nonGeographic()) {
                        if (this.nonGeographic()[callingCode]) {
                            return true;
                        }
                    } else {
                        // A hacky workaround for old custom metadata (generated before V4).
                        var countryCodes = this.countryCallingCodes()[callingCode];

                        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === "001") {
                            return true;
                        }
                    }
                },
            },
            {
                key: "isNonGeographicCallingCode",
                value: function isNonGeographicCallingCode(callingCode) {
                    if (this.nonGeographic()) {
                        return this.nonGeographic()[callingCode] ? true : false;
                    } else {
                        return this.getCountryCodesForCallingCode(callingCode) ? false : true;
                    }
                }, // Deprecated.
            },
            {
                key: "country",
                value: function country(countryCode) {
                    return this.selectNumberingPlan(countryCode);
                },
            },
            {
                key: "selectNumberingPlan",
                value: function selectNumberingPlan(countryCode, callingCode) {
                    // Supports just passing `callingCode` as the first argument.
                    if (countryCode && CALLING_CODE_REG_EXP.test(countryCode)) {
                        callingCode = countryCode;
                        countryCode = null;
                    }

                    if (countryCode && countryCode !== "001") {
                        if (!this.hasCountry(countryCode)) {
                            throw new Error("Unknown country: ".concat(countryCode));
                        }

                        this.numberingPlan = new NumberingPlan(this.getCountryMetadata(countryCode), this);
                    } else if (callingCode) {
                        if (!this.hasCallingCode(callingCode)) {
                            throw new Error("Unknown calling code: ".concat(callingCode));
                        }

                        this.numberingPlan = new NumberingPlan(this.getNumberingPlanMetadata(callingCode), this);
                    } else {
                        this.numberingPlan = undefined;
                    }

                    return this;
                },
            },
            {
                key: "getCountryCodesForCallingCode",
                value: function getCountryCodesForCallingCode(callingCode) {
                    var countryCodes = this.countryCallingCodes()[callingCode];

                    if (countryCodes) {
                        // Metadata before V4 included "non-geographic entity" calling codes
                        // inside `country_calling_codes` (for example, `"881":["001"]`).
                        // Now the semantics of `country_calling_codes` has changed:
                        // it's specifically for "countries" now.
                        // Older versions of custom metadata will simply skip parsing
                        // "non-geographic entity" phone numbers with new versions
                        // of this library: it's not considered a bug,
                        // because such numbers are extremely rare,
                        // and developers extremely rarely use custom metadata.
                        if (countryCodes.length === 1 && countryCodes[0].length === 3) {
                            return;
                        }

                        return countryCodes;
                    }
                },
            },
            {
                key: "getCountryCodeForCallingCode",
                value: function getCountryCodeForCallingCode(callingCode) {
                    var countryCodes = this.getCountryCodesForCallingCode(callingCode);

                    if (countryCodes) {
                        return countryCodes[0];
                    }
                },
            },
            {
                key: "getNumberingPlanMetadata",
                value: function getNumberingPlanMetadata(callingCode) {
                    var countryCode = this.getCountryCodeForCallingCode(callingCode);

                    if (countryCode) {
                        return this.getCountryMetadata(countryCode);
                    }

                    if (this.nonGeographic()) {
                        var metadata = this.nonGeographic()[callingCode];

                        if (metadata) {
                            return metadata;
                        }
                    } else {
                        // A hacky workaround for old custom metadata (generated before V4).
                        var countryCodes = this.countryCallingCodes()[callingCode];

                        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === "001") {
                            return this.metadata.countries["001"];
                        }
                    }
                }, // Deprecated.
            },
            {
                key: "countryCallingCode",
                value: function countryCallingCode() {
                    return this.numberingPlan.callingCode();
                }, // Deprecated.
            },
            {
                key: "IDDPrefix",
                value: function IDDPrefix() {
                    return this.numberingPlan.IDDPrefix();
                }, // Deprecated.
            },
            {
                key: "defaultIDDPrefix",
                value: function defaultIDDPrefix() {
                    return this.numberingPlan.defaultIDDPrefix();
                }, // Deprecated.
            },
            {
                key: "nationalNumberPattern",
                value: function nationalNumberPattern() {
                    return this.numberingPlan.nationalNumberPattern();
                }, // Deprecated.
            },
            {
                key: "possibleLengths",
                value: function possibleLengths() {
                    return this.numberingPlan.possibleLengths();
                }, // Deprecated.
            },
            {
                key: "formats",
                value: function formats() {
                    return this.numberingPlan.formats();
                }, // Deprecated.
            },
            {
                key: "nationalPrefixForParsing",
                value: function nationalPrefixForParsing() {
                    return this.numberingPlan.nationalPrefixForParsing();
                }, // Deprecated.
            },
            {
                key: "nationalPrefixTransformRule",
                value: function nationalPrefixTransformRule() {
                    return this.numberingPlan.nationalPrefixTransformRule();
                }, // Deprecated.
            },
            {
                key: "leadingDigits",
                value: function leadingDigits() {
                    return this.numberingPlan.leadingDigits();
                }, // Deprecated.
            },
            {
                key: "hasTypes",
                value: function hasTypes() {
                    return this.numberingPlan.hasTypes();
                }, // Deprecated.
            },
            {
                key: "type",
                value: function type(_type) {
                    return this.numberingPlan.type(_type);
                }, // Deprecated.
            },
            {
                key: "ext",
                value: function ext() {
                    return this.numberingPlan.ext();
                },
            },
            {
                key: "countryCallingCodes",
                value: function countryCallingCodes() {
                    if (this.v1) return this.metadata.country_phone_code_to_countries;
                    return this.metadata.country_calling_codes;
                }, // Deprecated.
            },
            {
                key: "chooseCountryByCountryCallingCode",
                value: function chooseCountryByCountryCallingCode(callingCode) {
                    return this.selectNumberingPlan(callingCode);
                },
            },
            {
                key: "hasSelectedNumberingPlan",
                value: function hasSelectedNumberingPlan() {
                    return this.numberingPlan !== undefined;
                },
            },
        ]);

        return Metadata;
    })();

var NumberingPlan =
    /*#__PURE__*/
    (function () {
        function NumberingPlan(metadata, globalMetadataObject) {
            _classCallCheck$7(this, NumberingPlan);

            this.globalMetadataObject = globalMetadataObject;
            this.metadata = metadata;
            setVersion.call(this, globalMetadataObject.metadata);
        }

        _createClass$7(NumberingPlan, [
            {
                key: "callingCode",
                value: function callingCode() {
                    return this.metadata[0];
                }, // Formatting information for regions which share
                // a country calling code is contained by only one region
                // for performance reasons. For example, for NANPA region
                // ("North American Numbering Plan Administration",
                //  which includes USA, Canada, Cayman Islands, Bahamas, etc)
                // it will be contained in the metadata for `US`.
            },
            {
                key: "getDefaultCountryMetadataForRegion",
                value: function getDefaultCountryMetadataForRegion() {
                    return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
                }, // Is always present.
            },
            {
                key: "IDDPrefix",
                value: function IDDPrefix() {
                    if (this.v1 || this.v2) return;
                    return this.metadata[1];
                }, // Is only present when a country supports multiple IDD prefixes.
            },
            {
                key: "defaultIDDPrefix",
                value: function defaultIDDPrefix() {
                    if (this.v1 || this.v2) return;
                    return this.metadata[12];
                },
            },
            {
                key: "nationalNumberPattern",
                value: function nationalNumberPattern() {
                    if (this.v1 || this.v2) return this.metadata[1];
                    return this.metadata[2];
                }, // Is always present.
            },
            {
                key: "possibleLengths",
                value: function possibleLengths() {
                    if (this.v1) return;
                    return this.metadata[this.v2 ? 2 : 3];
                },
            },
            {
                key: "_getFormats",
                value: function _getFormats(metadata) {
                    return metadata[this.v1 ? 2 : this.v2 ? 3 : 4];
                }, // For countries of the same region (e.g. NANPA)
                // formats are all stored in the "main" country for that region.
                // E.g. "RU" and "KZ", "US" and "CA".
            },
            {
                key: "formats",
                value: function formats() {
                    var _this = this;

                    var formats =
                        this._getFormats(this.metadata) ||
                        this._getFormats(this.getDefaultCountryMetadataForRegion()) ||
                        [];
                    return formats.map(function (_) {
                        return new Format(_, _this);
                    });
                },
            },
            {
                key: "nationalPrefix",
                value: function nationalPrefix() {
                    return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
                },
            },
            {
                key: "_getNationalPrefixFormattingRule",
                value: function _getNationalPrefixFormattingRule(metadata) {
                    return metadata[this.v1 ? 4 : this.v2 ? 5 : 6];
                }, // For countries of the same region (e.g. NANPA)
                // national prefix formatting rule is stored in the "main" country for that region.
                // E.g. "RU" and "KZ", "US" and "CA".
            },
            {
                key: "nationalPrefixFormattingRule",
                value: function nationalPrefixFormattingRule() {
                    return (
                        this._getNationalPrefixFormattingRule(this.metadata) ||
                        this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion())
                    );
                },
            },
            {
                key: "_nationalPrefixForParsing",
                value: function _nationalPrefixForParsing() {
                    return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
                },
            },
            {
                key: "nationalPrefixForParsing",
                value: function nationalPrefixForParsing() {
                    // If `national_prefix_for_parsing` is not set explicitly,
                    // then infer it from `national_prefix` (if any)
                    return this._nationalPrefixForParsing() || this.nationalPrefix();
                },
            },
            {
                key: "nationalPrefixTransformRule",
                value: function nationalPrefixTransformRule() {
                    return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
                },
            },
            {
                key: "_getNationalPrefixIsOptionalWhenFormatting",
                value: function _getNationalPrefixIsOptionalWhenFormatting() {
                    return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
                }, // For countries of the same region (e.g. NANPA)
                // "national prefix is optional when formatting" flag is
                // stored in the "main" country for that region.
                // E.g. "RU" and "KZ", "US" and "CA".
            },
            {
                key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
                value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
                    return (
                        this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) ||
                        this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion())
                    );
                },
            },
            {
                key: "leadingDigits",
                value: function leadingDigits() {
                    return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
                },
            },
            {
                key: "types",
                value: function types() {
                    return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
                },
            },
            {
                key: "hasTypes",
                value: function hasTypes() {
                    // Versions 1.2.0 - 1.2.4: can be `[]`.

                    /* istanbul ignore next */
                    if (this.types() && this.types().length === 0) {
                        return false;
                    } // Versions <= 1.2.4: can be `undefined`.
                    // Version >= 1.2.5: can be `0`.

                    return !!this.types();
                },
            },
            {
                key: "type",
                value: function type(_type2) {
                    if (this.hasTypes() && getType(this.types(), _type2)) {
                        return new Type(getType(this.types(), _type2), this);
                    }
                },
            },
            {
                key: "ext",
                value: function ext() {
                    if (this.v1 || this.v2) return DEFAULT_EXT_PREFIX;
                    return this.metadata[13] || DEFAULT_EXT_PREFIX;
                },
            },
        ]);

        return NumberingPlan;
    })();

var Format =
    /*#__PURE__*/
    (function () {
        function Format(format, metadata) {
            _classCallCheck$7(this, Format);

            this._format = format;
            this.metadata = metadata;
        }

        _createClass$7(Format, [
            {
                key: "pattern",
                value: function pattern() {
                    return this._format[0];
                },
            },
            {
                key: "format",
                value: function format() {
                    return this._format[1];
                },
            },
            {
                key: "leadingDigitsPatterns",
                value: function leadingDigitsPatterns() {
                    return this._format[2] || [];
                },
            },
            {
                key: "nationalPrefixFormattingRule",
                value: function nationalPrefixFormattingRule() {
                    return this._format[3] || this.metadata.nationalPrefixFormattingRule();
                },
            },
            {
                key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
                value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
                    return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
                },
            },
            {
                key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
                value: function nationalPrefixIsMandatoryWhenFormattingInNationalFormat() {
                    // National prefix is omitted if there's no national prefix formatting rule
                    // set for this country, or when the national prefix formatting rule
                    // contains no national prefix itself, or when this rule is set but
                    // national prefix is optional for this phone number format
                    // (and it is not enforced explicitly)
                    return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
                }, // Checks whether national prefix formatting rule contains national prefix.
            },
            {
                key: "usesNationalPrefix",
                value: function usesNationalPrefix() {
                    return this.nationalPrefixFormattingRule() && // Check that national prefix formatting rule is not a "dummy" one.
                        !FIRST_GROUP_ONLY_PREFIX_PATTERN.test(this.nationalPrefixFormattingRule()) // In compressed metadata, `this.nationalPrefixFormattingRule()` is `0`
                        ? // when `national_prefix_formatting_rule` is not present.
                          // So, `true` or `false` are returned explicitly here, so that
                          // `0` number isn't returned.
                          true
                        : false;
                },
            },
            {
                key: "internationalFormat",
                value: function internationalFormat() {
                    return this._format[5] || this.format();
                },
            },
        ]);

        return Format;
    })();
/**
 * A pattern that is used to determine if the national prefix formatting rule
 * has the first group only, i.e., does not start with the national prefix.
 * Note that the pattern explicitly allows for unbalanced parentheses.
 */

var FIRST_GROUP_ONLY_PREFIX_PATTERN = /^\(?\$1\)?$/;

var Type =
    /*#__PURE__*/
    (function () {
        function Type(type, metadata) {
            _classCallCheck$7(this, Type);

            this.type = type;
            this.metadata = metadata;
        }

        _createClass$7(Type, [
            {
                key: "pattern",
                value: function pattern() {
                    if (this.metadata.v1) return this.type;
                    return this.type[0];
                },
            },
            {
                key: "possibleLengths",
                value: function possibleLengths() {
                    if (this.metadata.v1) return;
                    return this.type[1] || this.metadata.possibleLengths();
                },
            },
        ]);

        return Type;
    })();

function getType(types, type) {
    switch (type) {
        case "FIXED_LINE":
            return types[0];

        case "MOBILE":
            return types[1];

        case "TOLL_FREE":
            return types[2];

        case "PREMIUM_RATE":
            return types[3];

        case "PERSONAL_NUMBER":
            return types[4];

        case "VOICEMAIL":
            return types[5];

        case "UAN":
            return types[6];

        case "PAGER":
            return types[7];

        case "VOIP":
            return types[8];

        case "SHARED_COST":
            return types[9];
    }
}

function validateMetadata(metadata) {
    if (!metadata) {
        throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");
    } // `country_phone_code_to_countries` was renamed to
    // `country_calling_codes` in `1.0.18`.

    if (!is_object(metadata) || !is_object(metadata.countries)) {
        throw new Error(
            "[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(
                is_object(metadata)
                    ? "an object of shape: { " + Object.keys(metadata).join(", ") + " }"
                    : "a " + type_of(metadata) + ": " + metadata,
                "."
            )
        );
    }
} // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */

var is_object = function is_object(_) {
    return _typeof$4(_) === "object";
}; // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */

var type_of = function type_of(_) {
    return _typeof$4(_);
};
/**
 * Returns "country calling code" for a country.
 * Throws an error if the country doesn't exist or isn't supported by this library.
 * @param  {string} country
 * @param  {object} metadata
 * @return {string}
 * @example
 * // Returns "44"
 * getCountryCallingCode("GB")
 */

function getCountryCallingCode(country, metadata) {
    metadata = new Metadata(metadata);

    if (metadata.hasCountry(country)) {
        return metadata.country(country).countryCallingCode();
    }

    throw new Error("Unknown country: ".concat(country));
}
function isSupportedCountry(country, metadata) {
    // metadata = new Metadata(metadata)
    // return metadata.hasCountry(country)
    return metadata.countries[country] !== undefined;
}

function setVersion(metadata) {
    var version = metadata.version;

    if (typeof version === "number") {
        this.v1 = version === 1;
        this.v2 = version === 2;
        this.v3 = version === 3;
        this.v4 = version === 4;
    } else {
        if (!version) {
            this.v1 = true;
        } else if (compare(version, V3) === -1) {
            this.v2 = true;
        } else if (compare(version, V4) === -1) {
            this.v3 = true;
        } else {
            this.v4 = true;
        }
    }
} // const ISO_COUNTRY_CODE = /^[A-Z]{2}$/
// function isCountryCode(countryCode) {
// 	return ISO_COUNTRY_CODE.test(countryCodeOrCountryCallingCode)
// }

var RFC3966_EXTN_PREFIX = ";ext=";
/**
 * Helper method for constructing regular expressions for parsing. Creates
 * an expression that captures up to max_length digits.
 * @return {string} RegEx pattern to capture extension digits.
 */

var getExtensionDigitsPattern = function getExtensionDigitsPattern(maxLength) {
    return "([".concat(VALID_DIGITS, "]{1,").concat(maxLength, "})");
};
/**
 * Helper initialiser method to create the regular-expression pattern to match
 * extensions.
 * Copy-pasted from Google's `libphonenumber`:
 * https://github.com/google/libphonenumber/blob/55b2646ec9393f4d3d6661b9c82ef9e258e8b829/javascript/i18n/phonenumbers/phonenumberutil.js#L759-L766
 * @return {string} RegEx pattern to capture extensions.
 */

function createExtensionPattern(purpose) {
    // We cap the maximum length of an extension based on the ambiguity of the way
    // the extension is prefixed. As per ITU, the officially allowed length for
    // extensions is actually 40, but we don't support this since we haven't seen real
    // examples and this introduces many false interpretations as the extension labels
    // are not standardized.

    /** @type {string} */
    var extLimitAfterExplicitLabel = "20";
    /** @type {string} */

    var extLimitAfterLikelyLabel = "15";
    /** @type {string} */

    var extLimitAfterAmbiguousChar = "9";
    /** @type {string} */

    var extLimitWhenNotSure = "6";
    /** @type {string} */

    var possibleSeparatorsBetweenNumberAndExtLabel = "[ \xA0\\t,]*"; // Optional full stop (.) or colon, followed by zero or more spaces/tabs/commas.

    /** @type {string} */

    var possibleCharsAfterExtLabel = "[:\\.\uFF0E]?[ \xA0\\t,-]*";
    /** @type {string} */

    var optionalExtnSuffix = "#?"; // Here the extension is called out in more explicit way, i.e mentioning it obvious
    // patterns like "ext.".

    /** @type {string} */

    var explicitExtLabels = "(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|\u0434\u043E\u0431|anexo)"; // One-character symbols that can be used to indicate an extension, and less
    // commonly used or more ambiguous extension labels.

    /** @type {string} */

    var ambiguousExtLabels = "(?:[x\uFF58#\uFF03~\uFF5E]|int|\uFF49\uFF4E\uFF54)"; // When extension is not separated clearly.

    /** @type {string} */

    var ambiguousSeparator = "[- ]+"; // This is the same as possibleSeparatorsBetweenNumberAndExtLabel, but not matching
    // comma as extension label may have it.

    /** @type {string} */

    var possibleSeparatorsNumberExtLabelNoComma = "[ \xA0\\t]*"; // ",," is commonly used for auto dialling the extension when connected. First
    // comma is matched through possibleSeparatorsBetweenNumberAndExtLabel, so we do
    // not repeat it here. Semi-colon works in Iphone and Android also to pop up a
    // button with the extension number following.

    /** @type {string} */

    var autoDiallingAndExtLabelsFound = "(?:,{2}|;)";
    /** @type {string} */

    var rfcExtn = RFC3966_EXTN_PREFIX + getExtensionDigitsPattern(extLimitAfterExplicitLabel);
    /** @type {string} */

    var explicitExtn =
        possibleSeparatorsBetweenNumberAndExtLabel +
        explicitExtLabels +
        possibleCharsAfterExtLabel +
        getExtensionDigitsPattern(extLimitAfterExplicitLabel) +
        optionalExtnSuffix;
    /** @type {string} */

    var ambiguousExtn =
        possibleSeparatorsBetweenNumberAndExtLabel +
        ambiguousExtLabels +
        possibleCharsAfterExtLabel +
        getExtensionDigitsPattern(extLimitAfterAmbiguousChar) +
        optionalExtnSuffix;
    /** @type {string} */

    var americanStyleExtnWithSuffix = ambiguousSeparator + getExtensionDigitsPattern(extLimitWhenNotSure) + "#";
    /** @type {string} */

    var autoDiallingExtn =
        possibleSeparatorsNumberExtLabelNoComma +
        autoDiallingAndExtLabelsFound +
        possibleCharsAfterExtLabel +
        getExtensionDigitsPattern(extLimitAfterLikelyLabel) +
        optionalExtnSuffix;
    /** @type {string} */

    var onlyCommasExtn =
        possibleSeparatorsNumberExtLabelNoComma +
        "(?:,)+" +
        possibleCharsAfterExtLabel +
        getExtensionDigitsPattern(extLimitAfterAmbiguousChar) +
        optionalExtnSuffix; // The first regular expression covers RFC 3966 format, where the extension is added
    // using ";ext=". The second more generic where extension is mentioned with explicit
    // labels like "ext:". In both the above cases we allow more numbers in extension than
    // any other extension labels. The third one captures when single character extension
    // labels or less commonly used labels are used. In such cases we capture fewer
    // extension digits in order to reduce the chance of falsely interpreting two
    // numbers beside each other as a number + extension. The fourth one covers the
    // special case of American numbers where the extension is written with a hash
    // at the end, such as "- 503#". The fifth one is exclusively for extension
    // autodialling formats which are used when dialling and in this case we accept longer
    // extensions. The last one is more liberal on the number of commas that acts as
    // extension labels, so we have a strict cap on the number of digits in such extensions.

    return (
        rfcExtn +
        "|" +
        explicitExtn +
        "|" +
        ambiguousExtn +
        "|" +
        americanStyleExtnWithSuffix +
        "|" +
        autoDiallingExtn +
        "|" +
        onlyCommasExtn
    );
}

//  Checks we have at least three leading digits, and only valid punctuation,
//  alpha characters and digits in the phone number. Does not include extension
//  data. The symbol 'x' is allowed here as valid punctuation since it is often
//  used as a placeholder for carrier codes, for example in Brazilian phone
//  numbers. We also allow multiple '+' characters at the start.
//
//  Corresponds to the following:
//  [digits]{minLengthNsn}|
//  plus_sign*
//  (([punctuation]|[star])*[digits]){3,}([punctuation]|[star]|[digits]|[alpha])*
//
//  The first reg-ex is to allow short numbers (two digits long) to be parsed if
//  they are entered as "15" etc, but only if there is no punctuation in them.
//  The second expression restricts the number of digits to three or more, but
//  then allows them to be in international form, and to have alpha-characters
//  and punctuation. We split up the two reg-exes here and combine them when
//  creating the reg-ex VALID_PHONE_NUMBER_PATTERN itself so we can prefix it
//  with ^ and append $ to each branch.
//
//  "Note VALID_PUNCTUATION starts with a -,
//   so must be the first in the range" (c) Google devs.
//  (wtf did they mean by saying that; probably nothing)
//

var MIN_LENGTH_PHONE_NUMBER_PATTERN = "[" + VALID_DIGITS + "]{" + MIN_LENGTH_FOR_NSN + "}"; //
// And this is the second reg-exp:
// (see MIN_LENGTH_PHONE_NUMBER_PATTERN for a full description of this reg-exp)
//

var VALID_PHONE_NUMBER =
    "[" +
    PLUS_CHARS +
    "]{0,1}" +
    "(?:" +
    "[" +
    VALID_PUNCTUATION +
    "]*" +
    "[" +
    VALID_DIGITS +
    "]" +
    "){3,}" +
    "[" +
    VALID_PUNCTUATION +
    VALID_DIGITS +
    "]*"; // This regular expression isn't present in Google's `libphonenumber`
// and is only used to determine whether the phone number being input
// is too short for it to even consider it a "valid" number.
// This is just a way to differentiate between a really invalid phone
// number like "abcde" and a valid phone number that a user has just
// started inputting, like "+1" or "1": both these cases would be
// considered `NOT_A_NUMBER` by Google's `libphonenumber`, but this
// library can provide a more detailed error message — whether it's
// really "not a number", or is it just a start of a valid phone number.

var VALID_PHONE_NUMBER_START_REG_EXP = new RegExp(
    "^" +
        "[" +
        PLUS_CHARS +
        "]{0,1}" +
        "(?:" +
        "[" +
        VALID_PUNCTUATION +
        "]*" +
        "[" +
        VALID_DIGITS +
        "]" +
        "){1,2}" +
        "$",
    "i"
);
var VALID_PHONE_NUMBER_WITH_EXTENSION =
    VALID_PHONE_NUMBER + // Phone number extensions
    "(?:" +
    createExtensionPattern() +
    ")?"; // The combined regular expression for valid phone numbers:
//

var VALID_PHONE_NUMBER_PATTERN = new RegExp( // Either a short two-digit-only phone number
    "^" +
        MIN_LENGTH_PHONE_NUMBER_PATTERN +
        "$" +
        "|" + // Or a longer fully parsed phone number (min 3 characters)
        "^" +
        VALID_PHONE_NUMBER_WITH_EXTENSION +
        "$",
    "i"
); // Checks to see if the string of characters could possibly be a phone number at
// all. At the moment, checks to see that the string begins with at least 2
// digits, ignoring any punctuation commonly found in phone numbers. This method
// does not require the number to be normalized in advance - but does assume
// that leading non-number symbols have been removed, such as by the method
// `extract_possible_number`.
//

function isViablePhoneNumber(number) {
    return number.length >= MIN_LENGTH_FOR_NSN && VALID_PHONE_NUMBER_PATTERN.test(number);
} // This is just a way to differentiate between a really invalid phone
// number like "abcde" and a valid phone number that a user has just
// started inputting, like "+1" or "1": both these cases would be
// considered `NOT_A_NUMBER` by Google's `libphonenumber`, but this
// library can provide a more detailed error message — whether it's
// really "not a number", or is it just a start of a valid phone number.

function isViablePhoneNumberStart(number) {
    return VALID_PHONE_NUMBER_START_REG_EXP.test(number);
}

// 1 or more valid digits, for use when parsing.

var EXTN_PATTERN = new RegExp("(?:" + createExtensionPattern() + ")$", "i"); // Strips any extension (as in, the part of the number dialled after the call is
// connected, usually indicated with extn, ext, x or similar) from the end of
// the number, and returns it.

function extractExtension(number) {
    var start = number.search(EXTN_PATTERN);

    if (start < 0) {
        return {};
    } // If we find a potential extension, and the number preceding this is a viable
    // number, we assume it is an extension.

    var numberWithoutExtension = number.slice(0, start);
    var matches = number.match(EXTN_PATTERN);
    var i = 1;

    while (i < matches.length) {
        if (matches[i]) {
            return {
                number: numberWithoutExtension,
                ext: matches[i],
            };
        }

        i++;
    }
}

// These mappings map a character (key) to a specific digit that should
// replace it for normalization purposes. Non-European digits that
// may be used in phone numbers are mapped to a European equivalent.
//
// E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
//
var DIGITS = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "\uFF10": "0",
    // Fullwidth digit 0
    "\uFF11": "1",
    // Fullwidth digit 1
    "\uFF12": "2",
    // Fullwidth digit 2
    "\uFF13": "3",
    // Fullwidth digit 3
    "\uFF14": "4",
    // Fullwidth digit 4
    "\uFF15": "5",
    // Fullwidth digit 5
    "\uFF16": "6",
    // Fullwidth digit 6
    "\uFF17": "7",
    // Fullwidth digit 7
    "\uFF18": "8",
    // Fullwidth digit 8
    "\uFF19": "9",
    // Fullwidth digit 9
    "\u0660": "0",
    // Arabic-indic digit 0
    "\u0661": "1",
    // Arabic-indic digit 1
    "\u0662": "2",
    // Arabic-indic digit 2
    "\u0663": "3",
    // Arabic-indic digit 3
    "\u0664": "4",
    // Arabic-indic digit 4
    "\u0665": "5",
    // Arabic-indic digit 5
    "\u0666": "6",
    // Arabic-indic digit 6
    "\u0667": "7",
    // Arabic-indic digit 7
    "\u0668": "8",
    // Arabic-indic digit 8
    "\u0669": "9",
    // Arabic-indic digit 9
    "\u06F0": "0",
    // Eastern-Arabic digit 0
    "\u06F1": "1",
    // Eastern-Arabic digit 1
    "\u06F2": "2",
    // Eastern-Arabic digit 2
    "\u06F3": "3",
    // Eastern-Arabic digit 3
    "\u06F4": "4",
    // Eastern-Arabic digit 4
    "\u06F5": "5",
    // Eastern-Arabic digit 5
    "\u06F6": "6",
    // Eastern-Arabic digit 6
    "\u06F7": "7",
    // Eastern-Arabic digit 7
    "\u06F8": "8",
    // Eastern-Arabic digit 8
    "\u06F9": "9", // Eastern-Arabic digit 9
};
function parseDigit(character) {
    return DIGITS[character];
}
/**
 * Parses phone number digits from a string.
 * Drops all punctuation leaving only digits.
 * Also converts wide-ascii and arabic-indic numerals to conventional numerals.
 * E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * parseDigits('8 (800) 555')
 * // Outputs '8800555'.
 * ```
 */

function parseDigits(string) {
    var result = ""; // Using `.split('')` here instead of normal `for ... of`
    // because the importing application doesn't neccessarily include an ES6 polyfill.
    // The `.split('')` approach discards "exotic" UTF-8 characters
    // (the ones consisting of four bytes) but digits
    // (including non-European ones) don't fall into that range
    // so such "exotic" characters would be discarded anyway.

    for (
        var _iterator = string.split(""),
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
        ;

    ) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var character = _ref;
        var digit = parseDigit(character);

        if (digit) {
            result += digit;
        }
    }

    return result;
}

/**
 * Parses phone number characters from a string.
 * Drops all punctuation leaving only digits and the leading `+` sign (if any).
 * Also converts wide-ascii and arabic-indic numerals to conventional numerals.
 * E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * // Outputs '8800555'.
 * parseIncompletePhoneNumber('8 (800) 555')
 * // Outputs '+7800555'.
 * parseIncompletePhoneNumber('+7 800 555')
 * ```
 */

function parseIncompletePhoneNumber(string) {
    var result = ""; // Using `.split('')` here instead of normal `for ... of`
    // because the importing application doesn't neccessarily include an ES6 polyfill.
    // The `.split('')` approach discards "exotic" UTF-8 characters
    // (the ones consisting of four bytes) but digits
    // (including non-European ones) don't fall into that range
    // so such "exotic" characters would be discarded anyway.

    for (
        var _iterator = string.split(""),
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
        ;

    ) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var character = _ref;
        result += parsePhoneNumberCharacter(character, result) || "";
    }

    return result;
}
/**
 * Parses next character while parsing phone number digits (including a `+`)
 * from text: discards everything except `+` and digits, and `+` is only allowed
 * at the start of a phone number.
 * For example, is used in `react-phone-number-input` where it uses
 * [`input-format`](https://gitlab.com/catamphetamine/input-format).
 * @param  {string} character - Yet another character from raw input string.
 * @param  {string?} prevParsedCharacters - Previous parsed characters.
 * @param  {object} meta - Optional custom use-case-specific metadata.
 * @return {string?} The parsed character.
 */

function parsePhoneNumberCharacter(character, prevParsedCharacters) {
    // Only allow a leading `+`.
    if (character === "+") {
        // If this `+` is not the first parsed character
        // then discard it.
        if (prevParsedCharacters) {
            return;
        }

        return "+";
    } // Allow digits.

    return parseDigit(character);
}

/**
 * Merges two arrays.
 * @param  {*} a
 * @param  {*} b
 * @return {*}
 */
function mergeArrays(a, b) {
    var merged = a.slice();

    for (
        var _iterator = b,
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
        ;

    ) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var element = _ref;

        if (a.indexOf(element) < 0) {
            merged.push(element);
        }
    }

    return merged.sort(function (a, b) {
        return a - b;
    }); // ES6 version, requires Set polyfill.
    // let merged = new Set(a)
    // for (const element of b) {
    // 	merged.add(i)
    // }
    // return Array.from(merged).sort((a, b) => a - b)
}

function checkNumberLength(nationalNumber, metadata) {
    return checkNumberLengthForType(nationalNumber, undefined, metadata);
} // Checks whether a number is possible for the country based on its length.
// Should only be called for the "new" metadata which has "possible lengths".

function checkNumberLengthForType(nationalNumber, type, metadata) {
    var type_info = metadata.type(type); // There should always be "<possiblePengths/>" set for every type element.
    // This is declared in the XML schema.
    // For size efficiency, where a sub-description (e.g. fixed-line)
    // has the same "<possiblePengths/>" as the "general description", this is missing,
    // so we fall back to the "general description". Where no numbers of the type
    // exist at all, there is one possible length (-1) which is guaranteed
    // not to match the length of any real phone number.

    var possible_lengths = (type_info && type_info.possibleLengths()) || metadata.possibleLengths(); // let local_lengths    = type_info && type.possibleLengthsLocal() || metadata.possibleLengthsLocal()
    // Metadata before version `1.0.18` didn't contain `possible_lengths`.

    if (!possible_lengths) {
        return "IS_POSSIBLE";
    }

    if (type === "FIXED_LINE_OR_MOBILE") {
        // No such country in metadata.

        /* istanbul ignore next */
        if (!metadata.type("FIXED_LINE")) {
            // The rare case has been encountered where no fixedLine data is available
            // (true for some non-geographic entities), so we just check mobile.
            return checkNumberLengthForType(nationalNumber, "MOBILE", metadata);
        }

        var mobile_type = metadata.type("MOBILE");

        if (mobile_type) {
            // Merge the mobile data in if there was any. "Concat" creates a new
            // array, it doesn't edit possible_lengths in place, so we don't need a copy.
            // Note that when adding the possible lengths from mobile, we have
            // to again check they aren't empty since if they are this indicates
            // they are the same as the general desc and should be obtained from there.
            possible_lengths = mergeArrays(possible_lengths, mobile_type.possibleLengths()); // The current list is sorted; we need to merge in the new list and
            // re-sort (duplicates are okay). Sorting isn't so expensive because
            // the lists are very small.
            // if (local_lengths) {
            // 	local_lengths = mergeArrays(local_lengths, mobile_type.possibleLengthsLocal())
            // } else {
            // 	local_lengths = mobile_type.possibleLengthsLocal()
            // }
        }
    } // If the type doesn't exist then return 'INVALID_LENGTH'.
    else if (type && !type_info) {
        return "INVALID_LENGTH";
    }

    var actual_length = nationalNumber.length; // In `libphonenumber-js` all "local-only" formats are dropped for simplicity.
    // // This is safe because there is never an overlap beween the possible lengths
    // // and the local-only lengths; this is checked at build time.
    // if (local_lengths && local_lengths.indexOf(nationalNumber.length) >= 0)
    // {
    // 	return 'IS_POSSIBLE_LOCAL_ONLY'
    // }

    var minimum_length = possible_lengths[0];

    if (minimum_length === actual_length) {
        return "IS_POSSIBLE";
    }

    if (minimum_length > actual_length) {
        return "TOO_SHORT";
    }

    if (possible_lengths[possible_lengths.length - 1] < actual_length) {
        return "TOO_LONG";
    } // We skip the first element since we've already checked it.

    return possible_lengths.indexOf(actual_length, 1) >= 0 ? "IS_POSSIBLE" : "INVALID_LENGTH";
}

function isPossiblePhoneNumber(input, options, metadata) {
    /* istanbul ignore if */
    if (options === undefined) {
        options = {};
    }

    metadata = new Metadata(metadata);

    if (options.v2) {
        if (!input.countryCallingCode) {
            throw new Error("Invalid phone number object passed");
        }

        metadata.selectNumberingPlan(input.countryCallingCode);
    } else {
        if (!input.phone) {
            return false;
        }

        if (input.country) {
            if (!metadata.hasCountry(input.country)) {
                throw new Error("Unknown country: ".concat(input.country));
            }

            metadata.country(input.country);
        } else {
            if (!input.countryCallingCode) {
                throw new Error("Invalid phone number object passed");
            }

            metadata.selectNumberingPlan(input.countryCallingCode);
        }
    }

    if (metadata.possibleLengths()) {
        return isPossibleNumber(input.phone || input.nationalNumber, metadata);
    } else {
        // There was a bug between `1.7.35` and `1.7.37` where "possible_lengths"
        // were missing for "non-geographical" numbering plans.
        // Just assume the number is possible in such cases:
        // it's unlikely that anyone generated their custom metadata
        // in that short period of time (one day).
        // This code can be removed in some future major version update.
        if (input.countryCallingCode && metadata.isNonGeographicCallingCode(input.countryCallingCode)) {
            // "Non-geographic entities" did't have `possibleLengths`
            // due to a bug in metadata generation process.
            return true;
        } else {
            throw new Error(
                'Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.'
            );
        }
    }
}
function isPossibleNumber(nationalNumber, metadata) {
    //, isInternational) {
    switch (checkNumberLength(nationalNumber, metadata)) {
        case "IS_POSSIBLE":
            return true;
        // This library ignores "local-only" phone numbers (for simplicity).
        // See the readme for more info on what are "local-only" phone numbers.
        // case 'IS_POSSIBLE_LOCAL_ONLY':
        // 	return !isInternational

        default:
            return false;
    }
}

function _slicedToArray$3(arr, i) {
    return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _nonIterableRest$3();
}

function _nonIterableRest$3() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit$3(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles$3(arr) {
    if (Array.isArray(arr)) return arr;
}

/**
 * @param  {string} text - Phone URI (RFC 3966).
 * @return {object} `{ ?number, ?ext }`.
 */

function parseRFC3966(text) {
    var number;
    var ext; // Replace "tel:" with "tel=" for parsing convenience.

    text = text.replace(/^tel:/, "tel=");

    for (
        var _iterator = text.split(";"),
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
        ;

    ) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var part = _ref;

        var _part$split = part.split("="),
            _part$split2 = _slicedToArray$3(_part$split, 2),
            name = _part$split2[0],
            value = _part$split2[1];

        switch (name) {
            case "tel":
                number = value;
                break;

            case "ext":
                ext = value;
                break;

            case "phone-context":
                // Only "country contexts" are supported.
                // "Domain contexts" are ignored.
                if (value[0] === "+") {
                    number = value + number;
                }

                break;
        }
    } // If the phone number is not viable, then abort.

    if (!isViablePhoneNumber(number)) {
        return {};
    }

    var result = {
        number: number,
    };

    if (ext) {
        result.ext = ext;
    }

    return result;
}
/**
 * @param  {object} - `{ ?number, ?extension }`.
 * @return {string} Phone URI (RFC 3966).
 */

function formatRFC3966(_ref2) {
    var number = _ref2.number,
        ext = _ref2.ext;

    if (!number) {
        return "";
    }

    if (number[0] !== "+") {
        throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');
    }

    return "tel:".concat(number).concat(ext ? ";ext=" + ext : "");
}

/**
 * Checks whether the entire input sequence can be matched
 * against the regular expression.
 * @return {boolean}
 */
function matchesEntirely(text, regular_expression) {
    // If assigning the `''` default value is moved to the arguments above,
    // code coverage would decrease for some weird reason.
    text = text || "";
    return new RegExp("^(?:" + regular_expression + ")$").test(text);
}

var NON_FIXED_LINE_PHONE_TYPES = [
    "MOBILE",
    "PREMIUM_RATE",
    "TOLL_FREE",
    "SHARED_COST",
    "VOIP",
    "PERSONAL_NUMBER",
    "PAGER",
    "UAN",
    "VOICEMAIL",
]; // Finds out national phone number type (fixed line, mobile, etc)

function getNumberType(input, options, metadata) {
    // If assigning the `{}` default value is moved to the arguments above,
    // code coverage would decrease for some weird reason.
    options = options || {}; // When `parse()` returned `{}`
    // meaning that the phone number is not a valid one.

    if (!input.country) {
        return;
    }

    metadata = new Metadata(metadata);
    metadata.selectNumberingPlan(input.country, input.countryCallingCode);
    var nationalNumber = options.v2 ? input.nationalNumber : input.phone; // The following is copy-pasted from the original function:
    // https://github.com/googlei18n/libphonenumber/blob/3ea547d4fbaa2d0b67588904dfa5d3f2557c27ff/javascript/i18n/phonenumbers/phonenumberutil.js#L2835
    // Is this national number even valid for this country

    if (!matchesEntirely(nationalNumber, metadata.nationalNumberPattern())) {
        return;
    } // Is it fixed line number

    if (isNumberTypeEqualTo(nationalNumber, "FIXED_LINE", metadata)) {
        // Because duplicate regular expressions are removed
        // to reduce metadata size, if "mobile" pattern is ""
        // then it means it was removed due to being a duplicate of the fixed-line pattern.
        //
        if (metadata.type("MOBILE") && metadata.type("MOBILE").pattern() === "") {
            return "FIXED_LINE_OR_MOBILE";
        } // v1 metadata.
        // Legacy.
        // Deprecated.

        if (!metadata.type("MOBILE")) {
            return "FIXED_LINE_OR_MOBILE";
        } // Check if the number happens to qualify as both fixed line and mobile.
        // (no such country in the minimal metadata set)

        /* istanbul ignore if */

        if (isNumberTypeEqualTo(nationalNumber, "MOBILE", metadata)) {
            return "FIXED_LINE_OR_MOBILE";
        }

        return "FIXED_LINE";
    }

    for (var _i = 0, _NON_FIXED_LINE_PHONE = NON_FIXED_LINE_PHONE_TYPES; _i < _NON_FIXED_LINE_PHONE.length; _i++) {
        var type = _NON_FIXED_LINE_PHONE[_i];

        if (isNumberTypeEqualTo(nationalNumber, type, metadata)) {
            return type;
        }
    }
}
function isNumberTypeEqualTo(nationalNumber, type, metadata) {
    type = metadata.type(type);

    if (!type || !type.pattern()) {
        return false;
    } // Check if any possible number lengths are present;
    // if so, we use them to avoid checking
    // the validation pattern if they don't match.
    // If they are absent, this means they match
    // the general description, which we have
    // already checked before a specific number type.

    if (type.possibleLengths() && type.possibleLengths().indexOf(nationalNumber.length) < 0) {
        return false;
    }

    return matchesEntirely(nationalNumber, type.pattern());
}

/**
 * Checks if a given phone number is valid.
 *
 * If the `number` is a string, it will be parsed to an object,
 * but only if it contains only valid phone number characters (including punctuation).
 * If the `number` is an object, it is used as is.
 *
 * The optional `defaultCountry` argument is the default country.
 * I.e. it does not restrict to just that country,
 * e.g. in those cases where several countries share
 * the same phone numbering rules (NANPA, Britain, etc).
 * For example, even though the number `07624 369230`
 * belongs to the Isle of Man ("IM" country code)
 * calling `isValidNumber('07624369230', 'GB', metadata)`
 * still returns `true` because the country is not restricted to `GB`,
 * it's just that `GB` is the default one for the phone numbering rules.
 * For restricting the country see `isValidNumberForRegion()`
 * though restricting a country might not be a good idea.
 * https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
 *
 * Examples:
 *
 * ```js
 * isValidNumber('+78005553535', metadata)
 * isValidNumber('8005553535', 'RU', metadata)
 * isValidNumber('88005553535', 'RU', metadata)
 * isValidNumber({ phone: '8005553535', country: 'RU' }, metadata)
 * ```
 */

function isValidNumber(input, options, metadata) {
    // If assigning the `{}` default value is moved to the arguments above,
    // code coverage would decrease for some weird reason.
    options = options || {};
    metadata = new Metadata(metadata); // This is just to support `isValidNumber({})`
    // for cases when `parseNumber()` returns `{}`.

    if (!input.country) {
        return false;
    }

    metadata.selectNumberingPlan(input.country, input.countryCallingCode); // By default, countries only have type regexps when it's required for
    // distinguishing different countries having the same `countryCallingCode`.

    if (metadata.hasTypes()) {
        return getNumberType(input, options, metadata.metadata) !== undefined;
    } // If there are no type regexps for this country in metadata then use
    // `nationalNumberPattern` as a "better than nothing" replacement.

    var national_number = options.v2 ? input.nationalNumber : input.phone;
    return matchesEntirely(national_number, metadata.nationalNumberPattern());
}

//
// E.g. "(999) 111-22-33" -> "999 111 22 33"
//
// For some reason Google's metadata contains `<intlFormat/>`s with brackets and dashes.
// Meanwhile, there's no single opinion about using punctuation in international phone numbers.
//
// For example, Google's `<intlFormat/>` for USA is `+1 213-373-4253`.
// And here's a quote from WikiPedia's "North American Numbering Plan" page:
// https://en.wikipedia.org/wiki/North_American_Numbering_Plan
//
// "The country calling code for all countries participating in the NANP is 1.
// In international format, an NANP number should be listed as +1 301 555 01 00,
// where 301 is an area code (Maryland)."
//
// I personally prefer the international format without any punctuation.
// For example, brackets are remnants of the old age, meaning that the
// phone number part in brackets (so called "area code") can be omitted
// if dialing within the same "area".
// And hyphens were clearly introduced for splitting local numbers into memorizable groups.
// For example, remembering "5553535" is difficult but "555-35-35" is much simpler.
// Imagine a man taking a bus from home to work and seeing an ad with a phone number.
// He has a couple of seconds to memorize that number until it passes by.
// If it were spaces instead of hyphens the man wouldn't necessarily get it,
// but with hyphens instead of spaces the grouping is more explicit.
// I personally think that hyphens introduce visual clutter,
// so I prefer replacing them with spaces in international numbers.
// In the modern age all output is done on displays where spaces are clearly distinguishable
// so hyphens can be safely replaced with spaces without losing any legibility.
//

function applyInternationalSeparatorStyle(formattedNumber) {
    return formattedNumber.replace(new RegExp("[".concat(VALID_PUNCTUATION, "]+"), "g"), " ").trim();
}

// first group is not used in the national pattern (e.g. Argentina) so the $1
// group does not match correctly. Therefore, we use `\d`, so that the first
// group actually used in the pattern will be matched.

var FIRST_GROUP_PATTERN = /(\$\d)/;
function formatNationalNumberUsingFormat(number, format, _ref) {
    var useInternationalFormat = _ref.useInternationalFormat,
        withNationalPrefix = _ref.withNationalPrefix;
    _ref.carrierCode;
    _ref.metadata;
    var formattedNumber = number.replace(
        new RegExp(format.pattern()),
        useInternationalFormat
            ? format.internationalFormat() // This library doesn't use `domestic_carrier_code_formatting_rule`,
            : // because that one is only used when formatting phone numbers
            // for dialing from a mobile phone, and this is not a dialing library.
            // carrierCode && format.domesticCarrierCodeFormattingRule()
            // 	// First, replace the $CC in the formatting rule with the desired carrier code.
            // 	// Then, replace the $FG in the formatting rule with the first group
            // 	// and the carrier code combined in the appropriate way.
            // 	? format.format().replace(FIRST_GROUP_PATTERN, format.domesticCarrierCodeFormattingRule().replace('$CC', carrierCode))
            // 	: (
            // 		withNationalPrefix && format.nationalPrefixFormattingRule()
            // 			? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule())
            // 			: format.format()
            // 	)
            withNationalPrefix && format.nationalPrefixFormattingRule()
            ? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule())
            : format.format()
    );

    if (useInternationalFormat) {
        return applyInternationalSeparatorStyle(formattedNumber);
    }

    return formattedNumber;
}

/**
 * Pattern that makes it easy to distinguish whether a region has a single
 * international dialing prefix or not. If a region has a single international
 * prefix (e.g. 011 in USA), it will be represented as a string that contains
 * a sequence of ASCII digits, and possibly a tilde, which signals waiting for
 * the tone. If there are multiple available international prefixes in a
 * region, they will be represented as a regex string that always contains one
 * or more characters that are not ASCII digits or a tilde.
 */

var SINGLE_IDD_PREFIX_REG_EXP = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/; // For regions that have multiple IDD prefixes
// a preferred IDD prefix is returned.

function getIddPrefix(country, callingCode, metadata) {
    var countryMetadata = new Metadata(metadata);
    countryMetadata.selectNumberingPlan(country, callingCode);

    if (countryMetadata.defaultIDDPrefix()) {
        return countryMetadata.defaultIDDPrefix();
    }

    if (SINGLE_IDD_PREFIX_REG_EXP.test(countryMetadata.IDDPrefix())) {
        return countryMetadata.IDDPrefix();
    }
}

function _objectSpread$6(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(
                Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                })
            );
        }
        ownKeys.forEach(function (key) {
            _defineProperty$8(target, key, source[key]);
        });
    }
    return target;
}

function _defineProperty$8(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}
var DEFAULT_OPTIONS = {
    formatExtension: function formatExtension(formattedNumber, extension, metadata) {
        return "".concat(formattedNumber).concat(metadata.ext()).concat(extension);
    }, // Formats a phone number
    //
    // Example use cases:
    //
    // ```js
    // formatNumber('8005553535', 'RU', 'INTERNATIONAL')
    // formatNumber('8005553535', 'RU', 'INTERNATIONAL', metadata)
    // formatNumber({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL')
    // formatNumber({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL', metadata)
    // formatNumber('+78005553535', 'NATIONAL')
    // formatNumber('+78005553535', 'NATIONAL', metadata)
    // ```
    //
};
function formatNumber(input, format, options, metadata) {
    // Apply default options.
    if (options) {
        options = _objectSpread$6({}, DEFAULT_OPTIONS, options);
    } else {
        options = DEFAULT_OPTIONS;
    }

    metadata = new Metadata(metadata);

    if (input.country && input.country !== "001") {
        // Validate `input.country`.
        if (!metadata.hasCountry(input.country)) {
            throw new Error("Unknown country: ".concat(input.country));
        }

        metadata.country(input.country);
    } else if (input.countryCallingCode) {
        metadata.selectNumberingPlan(input.countryCallingCode);
    } else return input.phone || "";

    var countryCallingCode = metadata.countryCallingCode();
    var nationalNumber = options.v2 ? input.nationalNumber : input.phone; // This variable should have been declared inside `case`s
    // but Babel has a bug and it says "duplicate variable declaration".

    var number;

    switch (format) {
        case "NATIONAL":
            // Legacy argument support.
            // (`{ country: ..., phone: '' }`)
            if (!nationalNumber) {
                return "";
            }

            number = formatNationalNumber$1(nationalNumber, input.carrierCode, "NATIONAL", metadata, options);
            return addExtension(number, input.ext, metadata, options.formatExtension);

        case "INTERNATIONAL":
            // Legacy argument support.
            // (`{ country: ..., phone: '' }`)
            if (!nationalNumber) {
                return "+".concat(countryCallingCode);
            }

            number = formatNationalNumber$1(nationalNumber, null, "INTERNATIONAL", metadata, options);
            number = "+".concat(countryCallingCode, " ").concat(number);
            return addExtension(number, input.ext, metadata, options.formatExtension);

        case "E.164":
            // `E.164` doesn't define "phone number extensions".
            return "+".concat(countryCallingCode).concat(nationalNumber);

        case "RFC3966":
            return formatRFC3966({
                number: "+".concat(countryCallingCode).concat(nationalNumber),
                ext: input.ext,
            });
        // For reference, here's Google's IDD formatter:
        // https://github.com/google/libphonenumber/blob/32719cf74e68796788d1ca45abc85dcdc63ba5b9/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L1546
        // Not saying that this IDD formatter replicates it 1:1, but it seems to work.
        // Who would even need to format phone numbers in IDD format anyway?

        case "IDD":
            if (!options.fromCountry) {
                return; // throw new Error('`fromCountry` option not passed for IDD-prefixed formatting.')
            }

            var formattedNumber = formatIDD(
                nationalNumber,
                input.carrierCode,
                countryCallingCode,
                options.fromCountry,
                metadata
            );
            return addExtension(formattedNumber, input.ext, metadata, options.formatExtension);

        default:
            throw new Error('Unknown "format" argument passed to "formatNumber()": "'.concat(format, '"'));
    }
}

function formatNationalNumber$1(number, carrierCode, formatAs, metadata, options) {
    var format = chooseFormatForNumber(metadata.formats(), number);

    if (!format) {
        return number;
    }

    return formatNationalNumberUsingFormat(number, format, {
        useInternationalFormat: formatAs === "INTERNATIONAL",
        withNationalPrefix:
            format.nationalPrefixIsOptionalWhenFormattingInNationalFormat() &&
            options &&
            options.nationalPrefix === false
                ? false
                : true,
        carrierCode: carrierCode,
        metadata: metadata,
    });
}

function chooseFormatForNumber(availableFormats, nationalNnumber) {
    for (
        var _iterator = availableFormats,
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
        ;

    ) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var format = _ref;

        // Validate leading digits
        if (format.leadingDigitsPatterns().length > 0) {
            // The last leading_digits_pattern is used here, as it is the most detailed
            var lastLeadingDigitsPattern = format.leadingDigitsPatterns()[format.leadingDigitsPatterns().length - 1]; // If leading digits don't match then move on to the next phone number format

            if (nationalNnumber.search(lastLeadingDigitsPattern) !== 0) {
                continue;
            }
        } // Check that the national number matches the phone number format regular expression

        if (matchesEntirely(nationalNnumber, format.pattern())) {
            return format;
        }
    }
}

function addExtension(formattedNumber, ext, metadata, formatExtension) {
    return ext ? formatExtension(formattedNumber, ext, metadata) : formattedNumber;
}

function formatIDD(nationalNumber, carrierCode, countryCallingCode, fromCountry, metadata) {
    var fromCountryCallingCode = getCountryCallingCode(fromCountry, metadata.metadata); // When calling within the same country calling code.

    if (fromCountryCallingCode === countryCallingCode) {
        var formattedNumber = formatNationalNumber$1(nationalNumber, carrierCode, "NATIONAL", metadata); // For NANPA regions, return the national format for these regions
        // but prefix it with the country calling code.

        if (countryCallingCode === "1") {
            return countryCallingCode + " " + formattedNumber;
        } // If regions share a country calling code, the country calling code need
        // not be dialled. This also applies when dialling within a region, so this
        // if clause covers both these cases. Technically this is the case for
        // dialling from La Reunion to other overseas departments of France (French
        // Guiana, Martinique, Guadeloupe), but not vice versa - so we don't cover
        // this edge case for now and for those cases return the version including
        // country calling code. Details here:
        // http://www.petitfute.com/voyage/225-info-pratiques-reunion
        //

        return formattedNumber;
    }

    var iddPrefix = getIddPrefix(fromCountry, undefined, metadata.metadata);

    if (iddPrefix) {
        return ""
            .concat(iddPrefix, " ")
            .concat(countryCallingCode, " ")
            .concat(formatNationalNumber$1(nationalNumber, null, "INTERNATIONAL", metadata));
    }
}

function _objectSpread$5(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(
                Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                })
            );
        }
        ownKeys.forEach(function (key) {
            _defineProperty$7(target, key, source[key]);
        });
    }
    return target;
}

function _defineProperty$7(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _classCallCheck$6(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties$6(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass$6(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$6(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$6(Constructor, staticProps);
    return Constructor;
}

var PhoneNumber =
    /*#__PURE__*/
    (function () {
        function PhoneNumber(countryCallingCode, nationalNumber, metadata) {
            _classCallCheck$6(this, PhoneNumber);

            if (!countryCallingCode) {
                throw new TypeError("`country` or `countryCallingCode` not passed");
            }

            if (!nationalNumber) {
                throw new TypeError("`nationalNumber` not passed");
            }

            if (!metadata) {
                throw new TypeError("`metadata` not passed");
            }

            var _metadata = new Metadata(metadata); // If country code is passed then derive `countryCallingCode` from it.
            // Also store the country code as `.country`.

            if (isCountryCode(countryCallingCode)) {
                this.country = countryCallingCode;

                _metadata.country(countryCallingCode);

                countryCallingCode = _metadata.countryCallingCode();
            }

            this.countryCallingCode = countryCallingCode;
            this.nationalNumber = nationalNumber;
            this.number = "+" + this.countryCallingCode + this.nationalNumber;
            this.metadata = metadata;
        }

        _createClass$6(PhoneNumber, [
            {
                key: "setExt",
                value: function setExt(ext) {
                    this.ext = ext;
                },
            },
            {
                key: "isPossible",
                value: function isPossible() {
                    return isPossiblePhoneNumber(
                        this,
                        {
                            v2: true,
                        },
                        this.metadata
                    );
                },
            },
            {
                key: "isValid",
                value: function isValid() {
                    return isValidNumber(
                        this,
                        {
                            v2: true,
                        },
                        this.metadata
                    );
                },
            },
            {
                key: "isNonGeographic",
                value: function isNonGeographic() {
                    var metadata = new Metadata(this.metadata);
                    return metadata.isNonGeographicCallingCode(this.countryCallingCode);
                },
            },
            {
                key: "isEqual",
                value: function isEqual(phoneNumber) {
                    return this.number === phoneNumber.number && this.ext === phoneNumber.ext;
                }, // // Is just an alias for `this.isValid() && this.country === country`.
                // // https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
                // isValidForRegion(country) {
                // 	return isValidNumberForRegion(this, country, { v2: true }, this.metadata)
                // }
            },
            {
                key: "getType",
                value: function getType() {
                    return getNumberType(
                        this,
                        {
                            v2: true,
                        },
                        this.metadata
                    );
                },
            },
            {
                key: "format",
                value: function format(_format, options) {
                    return formatNumber(
                        this,
                        _format,
                        options
                            ? _objectSpread$5({}, options, {
                                  v2: true,
                              })
                            : {
                                  v2: true,
                              },
                        this.metadata
                    );
                },
            },
            {
                key: "formatNational",
                value: function formatNational(options) {
                    return this.format("NATIONAL", options);
                },
            },
            {
                key: "formatInternational",
                value: function formatInternational(options) {
                    return this.format("INTERNATIONAL", options);
                },
            },
            {
                key: "getURI",
                value: function getURI(options) {
                    return this.format("RFC3966", options);
                },
            },
        ]);

        return PhoneNumber;
    })();

var isCountryCode = function isCountryCode(value) {
    return /^[A-Z]{2}$/.test(value);
};

var CAPTURING_DIGIT_PATTERN = new RegExp("([" + VALID_DIGITS + "])");
function stripIddPrefix(number, country, callingCode, metadata) {
    if (!country) {
        return;
    } // Check if the number is IDD-prefixed.

    var countryMetadata = new Metadata(metadata);
    countryMetadata.selectNumberingPlan(country, callingCode);
    var IDDPrefixPattern = new RegExp(countryMetadata.IDDPrefix());

    if (number.search(IDDPrefixPattern) !== 0) {
        return;
    } // Strip IDD prefix.

    number = number.slice(number.match(IDDPrefixPattern)[0].length); // If there're any digits after an IDD prefix,
    // then those digits are a country calling code.
    // Since no country code starts with a `0`,
    // the code below validates that the next digit (if present) is not `0`.

    var matchedGroups = number.match(CAPTURING_DIGIT_PATTERN);

    if (matchedGroups && matchedGroups[1] != null && matchedGroups[1].length > 0) {
        if (matchedGroups[1] === "0") {
            return;
        }
    }

    return number;
}

/**
 * Strips any national prefix (such as 0, 1) present in a
 * (possibly incomplete) number provided.
 * "Carrier codes" are only used  in Colombia and Brazil,
 * and only when dialing within those countries from a mobile phone to a fixed line number.
 * Sometimes it won't actually strip national prefix
 * and will instead prepend some digits to the `number`:
 * for example, when number `2345678` is passed with `VI` country selected,
 * it will return `{ number: "3402345678" }`, because `340` area code is prepended.
 * @param {string} number — National number digits.
 * @param {object} metadata — Metadata with country selected.
 * @return {object} `{ nationalNumber: string, nationalPrefix: string? carrierCode: string? }`.
 */
function extractNationalNumberFromPossiblyIncompleteNumber(number, metadata) {
    if (number && metadata.numberingPlan.nationalPrefixForParsing()) {
        // See METADATA.md for the description of
        // `national_prefix_for_parsing` and `national_prefix_transform_rule`.
        // Attempt to parse the first digits as a national prefix.
        var prefixPattern = new RegExp("^(?:" + metadata.numberingPlan.nationalPrefixForParsing() + ")");
        var prefixMatch = prefixPattern.exec(number);

        if (prefixMatch) {
            var nationalNumber;
            var carrierCode; // https://gitlab.com/catamphetamine/libphonenumber-js/-/blob/master/METADATA.md#national_prefix_for_parsing--national_prefix_transform_rule
            // If a `national_prefix_for_parsing` has any "capturing groups"
            // then it means that the national (significant) number is equal to
            // those "capturing groups" transformed via `national_prefix_transform_rule`,
            // and nothing could be said about the actual national prefix:
            // what is it and was it even there.
            // If a `national_prefix_for_parsing` doesn't have any "capturing groups",
            // then everything it matches is a national prefix.
            // To determine whether `national_prefix_for_parsing` matched any
            // "capturing groups", the value of the result of calling `.exec()`
            // is looked at, and if it has non-undefined values where there're
            // "capturing groups" in the regular expression, then it means
            // that "capturing groups" have been matched.
            // It's not possible to tell whether there'll be any "capturing gropus"
            // before the matching process, because a `national_prefix_for_parsing`
            // could exhibit both behaviors.

            var capturedGroupsCount = prefixMatch.length - 1;
            var hasCapturedGroups = capturedGroupsCount > 0 && prefixMatch[capturedGroupsCount];

            if (metadata.nationalPrefixTransformRule() && hasCapturedGroups) {
                nationalNumber = number.replace(prefixPattern, metadata.nationalPrefixTransformRule()); // If there's more than one captured group,
                // then carrier code is the second one.

                if (capturedGroupsCount > 1) {
                    carrierCode = prefixMatch[1];
                }
            } // If there're no "capturing groups",
            // or if there're "capturing groups" but no
            // `national_prefix_transform_rule`,
            // then just strip the national prefix from the number,
            // and possibly a carrier code.
            // Seems like there could be more.
            else {
                // `prefixBeforeNationalNumber` is the whole substring matched by
                // the `national_prefix_for_parsing` regular expression.
                // There seem to be no guarantees that it's just a national prefix.
                // For example, if there's a carrier code, it's gonna be a
                // part of `prefixBeforeNationalNumber` too.
                var prefixBeforeNationalNumber = prefixMatch[0];
                nationalNumber = number.slice(prefixBeforeNationalNumber.length); // If there's at least one captured group,
                // then carrier code is the first one.

                if (hasCapturedGroups) {
                    carrierCode = prefixMatch[1];
                }
            } // Tries to guess whether a national prefix was present in the input.
            // This is not something copy-pasted from Google's library:
            // they don't seem to have an equivalent for that.
            // So this isn't an "officially approved" way of doing something like that.
            // But since there seems no other existing method, this library uses it.

            var nationalPrefix;

            if (hasCapturedGroups) {
                var possiblePositionOfTheFirstCapturedGroup = number.indexOf(prefixMatch[1]);
                var possibleNationalPrefix = number.slice(0, possiblePositionOfTheFirstCapturedGroup); // Example: an Argentinian (AR) phone number `0111523456789`.
                // `prefixMatch[0]` is `01115`, and `$1` is `11`,
                // and the rest of the phone number is `23456789`.
                // The national number is transformed via `9$1` to `91123456789`.
                // National prefix `0` is detected being present at the start.
                // if (possibleNationalPrefix.indexOf(metadata.numberingPlan.nationalPrefix()) === 0) {

                if (possibleNationalPrefix === metadata.numberingPlan.nationalPrefix()) {
                    nationalPrefix = metadata.numberingPlan.nationalPrefix();
                }
            } else {
                nationalPrefix = prefixMatch[0];
            }

            return {
                nationalNumber: nationalNumber,
                nationalPrefix: nationalPrefix,
                carrierCode: carrierCode,
            };
        }
    }

    return {
        nationalNumber: number,
    };
}

/**
 * Strips national prefix and carrier code from a complete phone number.
 * The difference from the non-"FromCompleteNumber" function is that
 * it won't extract national prefix if the resultant number is too short
 * to be a complete number for the selected phone numbering plan.
 * @param  {string} number — Complete phone number digits.
 * @param  {Metadata} metadata — Metadata with a phone numbering plan selected.
 * @return {object} `{ nationalNumber: string, carrierCode: string? }`.
 */

function extractNationalNumber(number, metadata) {
    // Parsing national prefixes and carrier codes
    // is only required for local phone numbers
    // but some people don't understand that
    // and sometimes write international phone numbers
    // with national prefixes (or maybe even carrier codes).
    // http://ucken.blogspot.ru/2016/03/trunk-prefixes-in-skype4b.html
    // Google's original library forgives such mistakes
    // and so does this library, because it has been requested:
    // https://github.com/catamphetamine/libphonenumber-js/issues/127
    var _extractNationalNumbe = extractNationalNumberFromPossiblyIncompleteNumber(number, metadata),
        nationalNumber = _extractNationalNumbe.nationalNumber,
        carrierCode = _extractNationalNumbe.carrierCode;

    if (!shouldExtractNationalPrefix(number, nationalNumber, metadata)) {
        // Don't strip the national prefix.
        return {
            nationalNumber: number,
        };
    } // If a national prefix has been extracted, check to see
    // if the resultant number isn't too short.
    // Same code in Google's `libphonenumber`:
    // https://github.com/google/libphonenumber/blob/e326fa1fc4283bb05eb35cb3c15c18f98a31af33/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L3291-L3302
    // For some reason, they do this check right after the `national_number_pattern` check
    // this library does in `shouldExtractNationalPrefix()` function.
    // Why is there a second "resultant" number validity check?
    // They don't provide an explanation.
    // This library just copies the behavior.

    if (number.length !== nationalNumber.length + (carrierCode ? carrierCode.length : 0)) {
        // If not using legacy generated metadata (before version `1.0.18`)
        // then it has "possible lengths", so use those to validate the number length.
        if (metadata.possibleLengths()) {
            // "We require that the NSN remaining after stripping the national prefix and
            // carrier code be long enough to be a possible length for the region.
            // Otherwise, we don't do the stripping, since the original number could be
            // a valid short number."
            // https://github.com/google/libphonenumber/blob/876268eb1ad6cdc1b7b5bef17fc5e43052702d57/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L3236-L3250
            switch (checkNumberLength(nationalNumber, metadata)) {
                case "TOO_SHORT":
                case "INVALID_LENGTH":
                    // case 'IS_POSSIBLE_LOCAL_ONLY':
                    // Don't strip the national prefix.
                    return {
                        nationalNumber: number,
                    };
            }
        }
    }

    return {
        nationalNumber: nationalNumber,
        carrierCode: carrierCode,
    };
} // In some countries, the same digit could be a national prefix
// or a leading digit of a valid phone number.
// For example, in Russia, national prefix is `8`,
// and also `800 555 35 35` is a valid number
// in which `8` is not a national prefix, but the first digit
// of a national (significant) number.
// Same's with Belarus:
// `82004910060` is a valid national (significant) number,
// but `2004910060` is not.
// To support such cases (to prevent the code from always stripping
// national prefix), a condition is imposed: a national prefix
// is not extracted when the original number is "viable" and the
// resultant number is not, a "viable" national number being the one
// that matches `national_number_pattern`.

function shouldExtractNationalPrefix(number, nationalSignificantNumber, metadata) {
    // The equivalent in Google's code is:
    // https://github.com/google/libphonenumber/blob/e326fa1fc4283bb05eb35cb3c15c18f98a31af33/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L2969-L3004
    if (
        matchesEntirely(number, metadata.nationalNumberPattern()) &&
        !matchesEntirely(nationalSignificantNumber, metadata.nationalNumberPattern())
    ) {
        return false;
    } // Just "possible" number check would be more relaxed, so it's not used.
    // if (isPossibleNumber(number, metadata) &&
    // 	!isPossibleNumber(numberWithNationalPrefixExtracted, metadata)) {
    // 	return false
    // }

    return true;
}

/**
 * Sometimes some people incorrectly input international phone numbers
 * without the leading `+`. This function corrects such input.
 * @param  {string} number — Phone number digits.
 * @param  {string?} country
 * @param  {string?} callingCode
 * @param  {object} metadata
 * @return {object} `{ countryCallingCode: string?, number: string }`.
 */

function extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, callingCode, metadata) {
    var countryCallingCode = country ? getCountryCallingCode(country, metadata) : callingCode;

    if (number.indexOf(countryCallingCode) === 0) {
        metadata = new Metadata(metadata);
        metadata.selectNumberingPlan(country, callingCode);
        var possibleShorterNumber = number.slice(countryCallingCode.length);

        var _extractNationalNumbe = extractNationalNumber(possibleShorterNumber, metadata),
            possibleShorterNationalNumber = _extractNationalNumbe.nationalNumber;

        var _extractNationalNumbe2 = extractNationalNumber(number, metadata),
            nationalNumber = _extractNationalNumbe2.nationalNumber; // If the number was not valid before but is valid now,
        // or if it was too long before, we consider the number
        // with the country calling code stripped to be a better result
        // and keep that instead.
        // For example, in Germany (+49), `49` is a valid area code,
        // so if a number starts with `49`, it could be both a valid
        // national German number or an international number without
        // a leading `+`.

        if (
            (!matchesEntirely(nationalNumber, metadata.nationalNumberPattern()) &&
                matchesEntirely(possibleShorterNationalNumber, metadata.nationalNumberPattern())) ||
            checkNumberLength(nationalNumber, metadata) === "TOO_LONG"
        ) {
            return {
                countryCallingCode: countryCallingCode,
                number: possibleShorterNumber,
            };
        }
    }

    return {
        number: number,
    };
}

/**
 * Converts a phone number digits (possibly with a `+`)
 * into a calling code and the rest phone number digits.
 * The "rest phone number digits" could include
 * a national prefix, carrier code, and national
 * (significant) number.
 * @param  {string} number — Phone number digits (possibly with a `+`).
 * @param  {string} [country] — Default country.
 * @param  {string} [callingCode] — Default calling code (some phone numbering plans are non-geographic).
 * @param  {object} metadata
 * @return {object} `{ countryCallingCode: string?, number: string }`
 * @example
 * // Returns `{ countryCallingCode: "1", number: "2133734253" }`.
 * extractCountryCallingCode('2133734253', 'US', null, metadata)
 * extractCountryCallingCode('2133734253', null, '1', metadata)
 * extractCountryCallingCode('+12133734253', null, null, metadata)
 * extractCountryCallingCode('+12133734253', 'RU', null, metadata)
 */

function extractCountryCallingCode(number, country, callingCode, metadata) {
    if (!number) {
        return {};
    } // If this is not an international phone number,
    // then either extract an "IDD" prefix, or extract a
    // country calling code from a number by autocorrecting it
    // by prepending a leading `+` in cases when it starts
    // with the country calling code.
    // https://wikitravel.org/en/International_dialling_prefix
    // https://github.com/catamphetamine/libphonenumber-js/issues/376

    if (number[0] !== "+") {
        // Convert an "out-of-country" dialing phone number
        // to a proper international phone number.
        var numberWithoutIDD = stripIddPrefix(number, country, callingCode, metadata); // If an IDD prefix was stripped then
        // convert the number to international one
        // for subsequent parsing.

        if (numberWithoutIDD && numberWithoutIDD !== number) {
            number = "+" + numberWithoutIDD;
        } else {
            // Check to see if the number starts with the country calling code
            // for the default country. If so, we remove the country calling code,
            // and do some checks on the validity of the number before and after.
            // https://github.com/catamphetamine/libphonenumber-js/issues/376
            if (country || callingCode) {
                var _extractCountryCallin = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(
                        number,
                        country,
                        callingCode,
                        metadata
                    ),
                    countryCallingCode = _extractCountryCallin.countryCallingCode,
                    shorterNumber = _extractCountryCallin.number;

                if (countryCallingCode) {
                    return {
                        countryCallingCode: countryCallingCode,
                        number: shorterNumber,
                    };
                }
            }

            return {
                number: number,
            };
        }
    } // Fast abortion: country codes do not begin with a '0'

    if (number[1] === "0") {
        return {};
    }

    metadata = new Metadata(metadata); // The thing with country phone codes
    // is that they are orthogonal to each other
    // i.e. there's no such country phone code A
    // for which country phone code B exists
    // where B starts with A.
    // Therefore, while scanning digits,
    // if a valid country code is found,
    // that means that it is the country code.
    //

    var i = 2;

    while (i - 1 <= MAX_LENGTH_COUNTRY_CODE && i <= number.length) {
        var _countryCallingCode = number.slice(1, i);

        if (metadata.hasCallingCode(_countryCallingCode)) {
            metadata.selectNumberingPlan(_countryCallingCode);
            return {
                countryCallingCode: _countryCallingCode,
                number: number.slice(i),
            };
        }

        i++;
    }

    return {};
}

var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false;
function getCountryByCallingCode(callingCode, nationalPhoneNumber, metadata) {
    /* istanbul ignore if */
    if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
        if (metadata.isNonGeographicCallingCode(callingCode)) {
            return "001";
        }
    } // Is always non-empty, because `callingCode` is always valid

    var possibleCountries = metadata.getCountryCodesForCallingCode(callingCode);

    if (!possibleCountries) {
        return;
    } // If there's just one country corresponding to the country code,
    // then just return it, without further phone number digits validation.

    if (possibleCountries.length === 1) {
        return possibleCountries[0];
    }

    return selectCountryFromList(possibleCountries, nationalPhoneNumber, metadata.metadata);
}

function selectCountryFromList(possibleCountries, nationalPhoneNumber, metadata) {
    // Re-create `metadata` because it will be selecting a `country`.
    metadata = new Metadata(metadata);

    for (
        var _iterator = possibleCountries,
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
        ;

    ) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var country = _ref;
        metadata.country(country); // Leading digits check would be the simplest and fastest one.
        // Leading digits patterns are only defined for about 20% of all countries.
        // https://gitlab.com/catamphetamine/libphonenumber-js/blob/master/METADATA.md#leading_digits
        // Matching "leading digits" is a sufficient but not necessary condition.

        if (metadata.leadingDigits()) {
            if (nationalPhoneNumber && nationalPhoneNumber.search(metadata.leadingDigits()) === 0) {
                return country;
            }
        } // Else perform full validation with all of those
        // fixed-line/mobile/etc regular expressions.
        else if (
            getNumberType(
                {
                    phone: nationalPhoneNumber,
                    country: country,
                },
                undefined,
                metadata.metadata
            )
        ) {
            return country;
        }
    }
}

// This is a port of Google Android `libphonenumber`'s
// This prevents malicious input from consuming CPU.

var MAX_INPUT_STRING_LENGTH = 250; // This consists of the plus symbol, digits, and arabic-indic digits.

var PHONE_NUMBER_START_PATTERN = new RegExp("[" + PLUS_CHARS + VALID_DIGITS + "]"); // Regular expression of trailing characters that we want to remove.
// A trailing `#` is sometimes used when writing phone numbers with extensions in US.
// Example: "+1 (645) 123 1234-910#" number has extension "910".

var AFTER_PHONE_NUMBER_END_PATTERN = new RegExp("[^" + VALID_DIGITS + "#" + "]+$");
//
// ```js
// parse('8 (800) 555-35-35', 'RU')
// parse('8 (800) 555-35-35', 'RU', metadata)
// parse('8 (800) 555-35-35', { country: { default: 'RU' } })
// parse('8 (800) 555-35-35', { country: { default: 'RU' } }, metadata)
// parse('+7 800 555 35 35')
// parse('+7 800 555 35 35', metadata)
// ```
//

function parse(text, options, metadata) {
    // If assigning the `{}` default value is moved to the arguments above,
    // code coverage would decrease for some weird reason.
    options = options || {};
    metadata = new Metadata(metadata); // Validate `defaultCountry`.

    if (options.defaultCountry && !metadata.hasCountry(options.defaultCountry)) {
        if (options.v2) {
            throw new ParseError("INVALID_COUNTRY");
        }

        throw new Error("Unknown country: ".concat(options.defaultCountry));
    } // Parse the phone number.

    var _parseInput = parseInput(text, options.v2, options.extract),
        formattedPhoneNumber = _parseInput.number,
        ext = _parseInput.ext,
        error = _parseInput.error; // If the phone number is not viable then return nothing.

    if (!formattedPhoneNumber) {
        if (options.v2) {
            if (error === "TOO_SHORT") {
                throw new ParseError("TOO_SHORT");
            }

            throw new ParseError("NOT_A_NUMBER");
        }

        return {};
    }

    var _parsePhoneNumber = parsePhoneNumber$2(
            formattedPhoneNumber,
            options.defaultCountry,
            options.defaultCallingCode,
            metadata
        ),
        country = _parsePhoneNumber.country,
        nationalNumber = _parsePhoneNumber.nationalNumber,
        countryCallingCode = _parsePhoneNumber.countryCallingCode,
        carrierCode = _parsePhoneNumber.carrierCode;

    if (!metadata.hasSelectedNumberingPlan()) {
        if (options.v2) {
            throw new ParseError("INVALID_COUNTRY");
        }

        return {};
    } // Validate national (significant) number length.

    if (!nationalNumber || nationalNumber.length < MIN_LENGTH_FOR_NSN) {
        // Won't throw here because the regexp already demands length > 1.

        /* istanbul ignore if */
        if (options.v2) {
            throw new ParseError("TOO_SHORT");
        } // Google's demo just throws an error in this case.

        return {};
    } // Validate national (significant) number length.
    //
    // A sidenote:
    //
    // They say that sometimes national (significant) numbers
    // can be longer than `MAX_LENGTH_FOR_NSN` (e.g. in Germany).
    // https://github.com/googlei18n/libphonenumber/blob/7e1748645552da39c4e1ba731e47969d97bdb539/resources/phonenumber.proto#L36
    // Such numbers will just be discarded.
    //

    if (nationalNumber.length > MAX_LENGTH_FOR_NSN) {
        if (options.v2) {
            throw new ParseError("TOO_LONG");
        } // Google's demo just throws an error in this case.

        return {};
    }

    if (options.v2) {
        var phoneNumber = new PhoneNumber(countryCallingCode, nationalNumber, metadata.metadata);

        if (country) {
            phoneNumber.country = country;
        }

        if (carrierCode) {
            phoneNumber.carrierCode = carrierCode;
        }

        if (ext) {
            phoneNumber.ext = ext;
        }

        return phoneNumber;
    } // Check if national phone number pattern matches the number.
    // National number pattern is different for each country,
    // even for those ones which are part of the "NANPA" group.

    var valid = (options.extended ? metadata.hasSelectedNumberingPlan() : country)
        ? matchesEntirely(nationalNumber, metadata.nationalNumberPattern())
        : false;

    if (!options.extended) {
        return valid ? result(country, nationalNumber, ext) : {};
    } // isInternational: countryCallingCode !== undefined

    return {
        country: country,
        countryCallingCode: countryCallingCode,
        carrierCode: carrierCode,
        valid: valid,
        possible: valid
            ? true
            : options.extended === true && metadata.possibleLengths() && isPossibleNumber(nationalNumber, metadata)
            ? true
            : false,
        phone: nationalNumber,
        ext: ext,
    };
}
/**
 * Extracts a formatted phone number from text.
 * Doesn't guarantee that the extracted phone number
 * is a valid phone number (for example, doesn't validate its length).
 * @param  {string} text
 * @param  {boolean} [extract] — If `false`, then will parse the entire `text` as a phone number.
 * @param  {boolean} [throwOnError] — By default, it won't throw if the text is too long.
 * @return {string}
 * @example
 * // Returns "(213) 373-4253".
 * extractFormattedPhoneNumber("Call (213) 373-4253 for assistance.")
 */

function extractFormattedPhoneNumber$1(text, extract, throwOnError) {
    if (!text) {
        return;
    }

    if (text.length > MAX_INPUT_STRING_LENGTH) {
        if (throwOnError) {
            throw new ParseError("TOO_LONG");
        }

        return;
    }

    if (extract === false) {
        return text;
    } // Attempt to extract a possible number from the string passed in

    var startsAt = text.search(PHONE_NUMBER_START_PATTERN);

    if (startsAt < 0) {
        return;
    }

    return text // Trim everything to the left of the phone number
        .slice(startsAt) // Remove trailing non-numerical characters
        .replace(AFTER_PHONE_NUMBER_END_PATTERN, "");
}
/**
 * @param  {string} text - Input.
 * @param  {boolean} v2 - Legacy API functions don't pass `v2: true` flag.
 * @param  {boolean} [extract] - Whether to extract a phone number from `text`, or attempt to parse the entire text as a phone number.
 * @return {object} `{ ?number, ?ext }`.
 */

function parseInput(text, v2, extract) {
    // Parse RFC 3966 phone number URI.
    if (text && text.indexOf("tel:") === 0) {
        return parseRFC3966(text);
    }

    var number = extractFormattedPhoneNumber$1(text, extract, v2); // If the phone number is not viable, then abort.

    if (!number) {
        return {};
    }

    if (!isViablePhoneNumber(number)) {
        if (isViablePhoneNumberStart(number)) {
            return {
                error: "TOO_SHORT",
            };
        }

        return {};
    } // Attempt to parse extension first, since it doesn't require region-specific
    // data and we want to have the non-normalised number here.

    var withExtensionStripped = extractExtension(number);

    if (withExtensionStripped.ext) {
        return withExtensionStripped;
    }

    return {
        number: number,
    };
}
/**
 * Creates `parse()` result object.
 */

function result(country, nationalNumber, ext) {
    var result = {
        country: country,
        phone: nationalNumber,
    };

    if (ext) {
        result.ext = ext;
    }

    return result;
}
/**
 * Parses a viable phone number.
 * @param {string} formattedPhoneNumber — Example: "(213) 373-4253".
 * @param {string} [defaultCountry]
 * @param {string} [defaultCallingCode]
 * @param {Metadata} metadata
 * @return {object} Returns `{ country: string?, countryCallingCode: string?, nationalNumber: string? }`.
 */

function parsePhoneNumber$2(formattedPhoneNumber, defaultCountry, defaultCallingCode, metadata) {
    // Extract calling code from phone number.
    var _extractCountryCallin = extractCountryCallingCode(
            parseIncompletePhoneNumber(formattedPhoneNumber),
            defaultCountry,
            defaultCallingCode,
            metadata.metadata
        ),
        countryCallingCode = _extractCountryCallin.countryCallingCode,
        number = _extractCountryCallin.number; // Choose a country by `countryCallingCode`.

    var country;

    if (countryCallingCode) {
        metadata.selectNumberingPlan(countryCallingCode);
    } // If `formattedPhoneNumber` is in "national" format
    // then `number` is defined and `countryCallingCode` isn't.
    else if (number && (defaultCountry || defaultCallingCode)) {
        metadata.selectNumberingPlan(defaultCountry, defaultCallingCode);

        if (defaultCountry) {
            country = defaultCountry;
        }

        countryCallingCode = defaultCallingCode || getCountryCallingCode(defaultCountry, metadata.metadata);
    } else return {};

    if (!number) {
        return {
            countryCallingCode: countryCallingCode,
        };
    }

    var _extractNationalNumbe = extractNationalNumber(parseIncompletePhoneNumber(number), metadata),
        nationalNumber = _extractNationalNumbe.nationalNumber,
        carrierCode = _extractNationalNumbe.carrierCode; // Sometimes there are several countries
    // corresponding to the same country phone code
    // (e.g. NANPA countries all having `1` country phone code).
    // Therefore, to reliably determine the exact country,
    // national (significant) number should have been parsed first.
    //
    // When `metadata.json` is generated, all "ambiguous" country phone codes
    // get their countries populated with the full set of
    // "phone number type" regular expressions.
    //

    var exactCountry = getCountryByCallingCode(countryCallingCode, nationalNumber, metadata);

    if (exactCountry) {
        country = exactCountry;
        /* istanbul ignore if */

        if (exactCountry === "001");
        else {
            metadata.country(country);
        }
    }

    return {
        country: country,
        countryCallingCode: countryCallingCode,
        nationalNumber: nationalNumber,
        carrierCode: carrierCode,
    };
}

function _objectSpread$4(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(
                Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                })
            );
        }
        ownKeys.forEach(function (key) {
            _defineProperty$6(target, key, source[key]);
        });
    }
    return target;
}

function _defineProperty$6(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}
function parsePhoneNumber$1(text, options, metadata) {
    return parse(
        text,
        _objectSpread$4({}, options, {
            v2: true,
        }),
        metadata
    );
}

function _typeof$3(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof$3 = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof$3 = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof$3(obj);
}

function _objectSpread$3(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(
                Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                })
            );
        }
        ownKeys.forEach(function (key) {
            _defineProperty$5(target, key, source[key]);
        });
    }
    return target;
}

function _defineProperty$5(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _slicedToArray$2(arr, i) {
    return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _nonIterableRest$2();
}

function _nonIterableRest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit$2(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles$2(arr) {
    if (Array.isArray(arr)) return arr;
}
function normalizeArguments(args) {
    var _Array$prototype$slic = Array.prototype.slice.call(args),
        _Array$prototype$slic2 = _slicedToArray$2(_Array$prototype$slic, 4),
        arg_1 = _Array$prototype$slic2[0],
        arg_2 = _Array$prototype$slic2[1],
        arg_3 = _Array$prototype$slic2[2],
        arg_4 = _Array$prototype$slic2[3];

    var text;
    var options;
    var metadata; // If the phone number is passed as a string.
    // `parsePhoneNumber('88005553535', ...)`.

    if (typeof arg_1 === "string") {
        text = arg_1;
    } else throw new TypeError("A text for parsing must be a string."); // If "default country" argument is being passed then move it to `options`.
    // `parsePhoneNumber('88005553535', 'RU', [options], metadata)`.

    if (!arg_2 || typeof arg_2 === "string") {
        if (arg_4) {
            options = arg_3;
            metadata = arg_4;
        } else {
            options = undefined;
            metadata = arg_3;
        }

        if (arg_2) {
            options = _objectSpread$3(
                {
                    defaultCountry: arg_2,
                },
                options
            );
        }
    } // `defaultCountry` is not passed.
    // Example: `parsePhoneNumber('+78005553535', [options], metadata)`.
    else if (isObject(arg_2)) {
        if (arg_3) {
            options = arg_2;
            metadata = arg_3;
        } else {
            metadata = arg_2;
        }
    } else throw new Error("Invalid second argument: ".concat(arg_2));

    return {
        text: text,
        options: options,
        metadata: metadata,
    };
} // Otherwise istanbul would show this as "branch not covered".

/* istanbul ignore next */

var isObject = function isObject(_) {
    return _typeof$3(_) === "object";
};

function _objectSpread$2(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(
                Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                })
            );
        }
        ownKeys.forEach(function (key) {
            _defineProperty$4(target, key, source[key]);
        });
    }
    return target;
}

function _defineProperty$4(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}
function parsePhoneNumberFromString$1(text, options, metadata) {
    // Validate `defaultCountry`.
    if (options && options.defaultCountry && !isSupportedCountry(options.defaultCountry, metadata)) {
        options = _objectSpread$2({}, options, {
            defaultCountry: undefined,
        });
    } // Parse phone number.

    try {
        return parsePhoneNumber$1(text, options, metadata);
    } catch (error) {
        /* istanbul ignore else */
        if (error instanceof ParseError);
        else {
            throw error;
        }
    }
}

function parsePhoneNumberFromString() {
    var _normalizeArguments = normalizeArguments(arguments),
        text = _normalizeArguments.text,
        options = _normalizeArguments.options,
        metadata = _normalizeArguments.metadata;

    return parsePhoneNumberFromString$1(text, options, metadata);
}

function _classCallCheck$5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties$5(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass$5(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$5(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$5(Constructor, staticProps);
    return Constructor;
}

function _defineProperty$3(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

var AsYouTypeState =
    /*#__PURE__*/
    (function () {
        function AsYouTypeState(_ref) {
            var _this = this;

            var onCountryChange = _ref.onCountryChange,
                onCallingCodeChange = _ref.onCallingCodeChange;

            _classCallCheck$5(this, AsYouTypeState);

            _defineProperty$3(this, "update", function (properties) {
                for (var _i = 0, _Object$keys = Object.keys(properties); _i < _Object$keys.length; _i++) {
                    var key = _Object$keys[_i];
                    _this[key] = properties[key];
                }
            });

            this.onCountryChange = onCountryChange;
            this.onCallingCodeChange = onCallingCodeChange;
        }

        _createClass$5(AsYouTypeState, [
            {
                key: "reset",
                value: function reset(defaultCountry, defaultCallingCode) {
                    this.international = false;
                    this.IDDPrefix = undefined;
                    this.missingPlus = undefined;
                    this.callingCode = undefined;
                    this.digits = "";
                    this.resetNationalSignificantNumber();
                    this.initCountryAndCallingCode(defaultCountry, defaultCallingCode);
                },
            },
            {
                key: "resetNationalSignificantNumber",
                value: function resetNationalSignificantNumber() {
                    this.nationalSignificantNumber = this.getNationalDigits();
                    this.nationalSignificantNumberMatchesInput = true;
                    this.nationalPrefix = undefined;
                    this.carrierCode = undefined;
                    this.complexPrefixBeforeNationalSignificantNumber = undefined;
                },
            },
            {
                key: "initCountryAndCallingCode",
                value: function initCountryAndCallingCode(country, callingCode) {
                    this.setCountry(country);
                    this.setCallingCode(callingCode);
                },
            },
            {
                key: "setCountry",
                value: function setCountry(country) {
                    this.country = country;
                    this.onCountryChange(country);
                },
            },
            {
                key: "setCallingCode",
                value: function setCallingCode(callingCode) {
                    this.callingCode = callingCode;
                    return this.onCallingCodeChange(this.country, callingCode);
                },
            },
            {
                key: "startInternationalNumber",
                value: function startInternationalNumber() {
                    // Prepend the `+` to parsed input.
                    this.international = true; // If a default country was set then reset it
                    // because an explicitly international phone
                    // number is being entered.

                    this.initCountryAndCallingCode();
                },
            },
            {
                key: "appendDigits",
                value: function appendDigits(nextDigits) {
                    this.digits += nextDigits;
                },
            },
            {
                key: "appendNationalSignificantNumberDigits",
                value: function appendNationalSignificantNumberDigits(nextDigits) {
                    this.nationalSignificantNumber += nextDigits;
                },
                /**
                 * Returns the part of `this.digits` that corresponds to the national number.
                 * Basically, all digits that have been input by the user, except for the
                 * international prefix and the country calling code part
                 * (if the number is an international one).
                 * @return {string}
                 */
            },
            {
                key: "getNationalDigits",
                value: function getNationalDigits() {
                    if (this.international) {
                        return this.digits.slice(
                            (this.IDDPrefix ? this.IDDPrefix.length : 0) +
                                (this.callingCode ? this.callingCode.length : 0)
                        );
                    }

                    return this.digits;
                },
            },
            {
                key: "getDigitsWithoutInternationalPrefix",
                value: function getDigitsWithoutInternationalPrefix() {
                    if (this.international) {
                        if (this.IDDPrefix) {
                            return this.digits.slice(this.IDDPrefix.length);
                        }
                    }

                    return this.digits;
                },
            },
        ]);

        return AsYouTypeState;
    })();

// Should be the same as `DIGIT_PLACEHOLDER` in `libphonenumber-metadata-generator`.
var DIGIT_PLACEHOLDER = "x"; // '\u2008' (punctuation space)

var DIGIT_PLACEHOLDER_MATCHER = new RegExp(DIGIT_PLACEHOLDER); // Counts all occurences of a symbol in a string.
// http://stackoverflow.com/questions/202605/repeat-string-javascript

function repeat(string, times) {
    if (times < 1) {
        return "";
    }

    var result = "";

    while (times > 1) {
        if (times & 1) {
            result += string;
        }

        times >>= 1;
        string += string;
    }

    return result + string;
}
function cutAndStripNonPairedParens(string, cutBeforeIndex) {
    if (string[cutBeforeIndex] === ")") {
        cutBeforeIndex++;
    }

    return stripNonPairedParens(string.slice(0, cutBeforeIndex));
}
function stripNonPairedParens(string) {
    var dangling_braces = [];
    var i = 0;

    while (i < string.length) {
        if (string[i] === "(") {
            dangling_braces.push(i);
        } else if (string[i] === ")") {
            dangling_braces.pop();
        }

        i++;
    }

    var start = 0;
    var cleared_string = "";
    dangling_braces.push(string.length);

    for (var _i2 = 0, _dangling_braces = dangling_braces; _i2 < _dangling_braces.length; _i2++) {
        var index = _dangling_braces[_i2];
        cleared_string += string.slice(start, index);
        start = index + 1;
    }

    return cleared_string;
}
function populateTemplateWithDigits(template, position, digits) {
    // Using `.split('')` to iterate through a string here
    // to avoid requiring `Symbol.iterator` polyfill.
    // `.split('')` is generally not safe for Unicode,
    // but in this particular case for `digits` it is safe.
    // for (const digit of digits)
    for (
        var _iterator2 = digits.split(""),
            _isArray2 = Array.isArray(_iterator2),
            _i3 = 0,
            _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();
        ;

    ) {
        var _ref2;

        if (_isArray2) {
            if (_i3 >= _iterator2.length) break;
            _ref2 = _iterator2[_i3++];
        } else {
            _i3 = _iterator2.next();
            if (_i3.done) break;
            _ref2 = _i3.value;
        }

        var digit = _ref2;

        // If there is room for more digits in current `template`,
        // then set the next digit in the `template`,
        // and return the formatted digits so far.
        // If more digits are entered than the current format could handle.
        if (template.slice(position + 1).search(DIGIT_PLACEHOLDER_MATCHER) < 0) {
            return;
        }

        position = template.search(DIGIT_PLACEHOLDER_MATCHER);
        template = template.replace(DIGIT_PLACEHOLDER_MATCHER, digit);
    }

    return [template, position];
}

function formatCompleteNumber(state, format, _ref) {
    var metadata = _ref.metadata,
        shouldTryNationalPrefixFormattingRule = _ref.shouldTryNationalPrefixFormattingRule,
        getSeparatorAfterNationalPrefix = _ref.getSeparatorAfterNationalPrefix;
    var matcher = new RegExp("^(?:".concat(format.pattern(), ")$"));

    if (matcher.test(state.nationalSignificantNumber)) {
        return formatNationalNumberWithAndWithoutNationalPrefixFormattingRule(state, format, {
            metadata: metadata,
            shouldTryNationalPrefixFormattingRule: shouldTryNationalPrefixFormattingRule,
            getSeparatorAfterNationalPrefix: getSeparatorAfterNationalPrefix,
        });
    }
}
function canFormatCompleteNumber(nationalSignificantNumber, metadata) {
    return checkNumberLength(nationalSignificantNumber, metadata) === "IS_POSSIBLE";
}

function formatNationalNumberWithAndWithoutNationalPrefixFormattingRule(state, format, _ref2) {
    var metadata = _ref2.metadata,
        shouldTryNationalPrefixFormattingRule = _ref2.shouldTryNationalPrefixFormattingRule,
        getSeparatorAfterNationalPrefix = _ref2.getSeparatorAfterNationalPrefix;
    // `format` has already been checked for `nationalPrefix` requirement.
    state.nationalSignificantNumber;
    state.international;
    state.nationalPrefix;
    state.carrierCode; // Format the number with using `national_prefix_formatting_rule`.
    // If the resulting formatted number is a valid formatted number, then return it.
    //
    // Google's AsYouType formatter is different in a way that it doesn't try
    // to format using the "national prefix formatting rule", and instead it
    // simply prepends a national prefix followed by a " " character.
    // This code does that too, but as a fallback.
    // The reason is that "national prefix formatting rule" may use parentheses,
    // which wouldn't be included has it used the simpler Google's way.
    //

    if (shouldTryNationalPrefixFormattingRule(format)) {
        var formattedNumber = formatNationalNumber(state, format, {
            useNationalPrefixFormattingRule: true,
            getSeparatorAfterNationalPrefix: getSeparatorAfterNationalPrefix,
            metadata: metadata,
        });

        if (formattedNumber) {
            return formattedNumber;
        }
    } // Format the number without using `national_prefix_formatting_rule`.

    return formatNationalNumber(state, format, {
        useNationalPrefixFormattingRule: false,
        getSeparatorAfterNationalPrefix: getSeparatorAfterNationalPrefix,
        metadata: metadata,
    });
}

function formatNationalNumber(state, format, _ref3) {
    var metadata = _ref3.metadata,
        useNationalPrefixFormattingRule = _ref3.useNationalPrefixFormattingRule,
        getSeparatorAfterNationalPrefix = _ref3.getSeparatorAfterNationalPrefix;
    var formattedNationalNumber = formatNationalNumberUsingFormat(state.nationalSignificantNumber, format, {
        carrierCode: state.carrierCode,
        useInternationalFormat: state.international,
        withNationalPrefix: useNationalPrefixFormattingRule,
        metadata: metadata,
    });

    if (!useNationalPrefixFormattingRule) {
        if (state.nationalPrefix) {
            // If a national prefix was extracted, then just prepend it,
            // followed by a " " character.
            formattedNationalNumber =
                state.nationalPrefix + getSeparatorAfterNationalPrefix(format) + formattedNationalNumber;
        } else if (state.complexPrefixBeforeNationalSignificantNumber) {
            formattedNationalNumber =
                state.complexPrefixBeforeNationalSignificantNumber + " " + formattedNationalNumber;
        }
    }

    if (isValidFormattedNationalNumber(formattedNationalNumber, state)) {
        return formattedNationalNumber;
    }
} // Check that the formatted phone number contains exactly
// the same digits that have been input by the user.
// For example, when "0111523456789" is input for `AR` country,
// the extracted `this.nationalSignificantNumber` is "91123456789",
// which means that the national part of `this.digits` isn't simply equal to
// `this.nationalPrefix` + `this.nationalSignificantNumber`.
//
// Also, a `format` can add extra digits to the `this.nationalSignificantNumber`
// being formatted via `metadata[country].national_prefix_transform_rule`.
// For example, for `VI` country, it prepends `340` to the national number,
// and if this check hasn't been implemented, then there would be a bug
// when `340` "area coude" is "duplicated" during input for `VI` country:
// https://github.com/catamphetamine/libphonenumber-js/issues/318
//
// So, all these "gotchas" are filtered out.
//
// In the original Google's code, the comments say:
// "Check that we didn't remove nor add any extra digits when we matched
// this formatting pattern. This usually happens after we entered the last
// digit during AYTF. Eg: In case of MX, we swallow mobile token (1) when
// formatted but AYTF should retain all the number entered and not change
// in order to match a format (of same leading digits and length) display
// in that way."
// "If it's the same (i.e entered number and format is same), then it's
// safe to return this in formatted number as nothing is lost / added."
// Otherwise, don't use this format.
// https://github.com/google/libphonenumber/commit/3e7c1f04f5e7200f87fb131e6f85c6e99d60f510#diff-9149457fa9f5d608a11bb975c6ef4bc5
// https://github.com/google/libphonenumber/commit/3ac88c7106e7dcb553bcc794b15f19185928a1c6#diff-2dcb77e833422ee304da348b905cde0b
//

function isValidFormattedNationalNumber(formattedNationalNumber, state) {
    return parseDigits(formattedNationalNumber) === state.getNationalDigits();
}

function _classCallCheck$4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties$4(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass$4(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$4(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$4(Constructor, staticProps);
    return Constructor;
}

var PatternMatcher =
    /*#__PURE__*/
    (function () {
        function PatternMatcher(pattern) {
            _classCallCheck$4(this, PatternMatcher);

            this.matchTree = new PatternParser().parse(pattern); // console.log(JSON.stringify(this.matchTree, null, 2))
        }

        _createClass$4(PatternMatcher, [
            {
                key: "match",
                value: function match(string) {
                    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                        allowOverflow = _ref.allowOverflow;

                    if (!string) {
                        throw new Error("String is required");
                    }

                    var result = _match(string.split(""), this.matchTree, true);

                    if (result && result.match) {
                        delete result.matchedChars;
                    }

                    if (result && result.overflow) {
                        if (!allowOverflow) {
                            return;
                        }
                    }

                    return result;
                },
            },
        ]);

        return PatternMatcher;
    })();

function _match(characters, tree, last) {
    if (typeof tree === "string") {
        if (last) {
            if (characters.length > tree.length) {
                return {
                    overflow: true,
                };
            }
        }

        var characterString = characters.join("");

        if (tree.indexOf(characterString) === 0) {
            if (characters.length === tree.length) {
                return {
                    match: true,
                    matchedChars: characters,
                };
            }

            return {
                partialMatch: true, // matchedChars: characters
            };
        }

        if (characterString.indexOf(tree) === 0) {
            return {
                match: true,
                matchedChars: characters.slice(0, tree.length),
            };
        }

        return;
    }

    if (Array.isArray(tree)) {
        var restCharacters = characters.slice();
        var i = 0;

        while (i < tree.length) {
            var subtree = tree[i];

            var result = _match(restCharacters, subtree, last && i === tree.length - 1);

            if (!result || result.overflow) {
                return result;
            }

            if (result.match) {
                // Continue with the next subtree with the rest of the characters.
                restCharacters = restCharacters.slice(result.matchedChars.length);

                if (restCharacters.length === 0) {
                    if (i === tree.length - 1) {
                        return {
                            match: true,
                            matchedChars: characters,
                        };
                    } else {
                        return {
                            partialMatch: true, // matchedChars: characters
                        };
                    }
                }
            } else if (result.partialMatch) {
                return {
                    partialMatch: true, // matchedChars: characters
                };
            } else {
                throw new Error("Unsupported match result:\n".concat(JSON.stringify(result, null, 2)));
            }

            i++;
        }

        if (last) {
            return {
                overflow: true,
            };
        }

        return {
            match: true,
            matchedChars: characters.slice(0, characters.length - restCharacters.length),
        };
    }

    switch (tree.op) {
        case "|":
            var partialMatch;

            for (
                var _iterator = tree.args,
                    _isArray = Array.isArray(_iterator),
                    _i = 0,
                    _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
                ;

            ) {
                var _ref2;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref2 = _i.value;
                }

                var branch = _ref2;

                var _result = _match(characters, branch, last);

                if (_result) {
                    if (_result.overflow) {
                        return _result;
                    } else if (_result.match) {
                        return {
                            match: true,
                            matchedChars: _result.matchedChars,
                        };
                    } else if (_result.partialMatch) {
                        partialMatch = true;
                    }
                }
            }

            if (partialMatch) {
                return {
                    partialMatch: true, // matchedChars: ...
                };
            } // Not even a partial match.

            return;

        case "[]":
            for (
                var _iterator2 = tree.args,
                    _isArray2 = Array.isArray(_iterator2),
                    _i2 = 0,
                    _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();
                ;

            ) {
                var _ref3;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref3 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref3 = _i2.value;
                }

                var _char = _ref3;

                if (characters[0] === _char) {
                    if (characters.length === 1) {
                        return {
                            match: true,
                            matchedChars: characters,
                        };
                    }

                    if (last) {
                        return {
                            overflow: true,
                        };
                    }

                    return {
                        match: true,
                        matchedChars: [_char],
                    };
                }
            } // No character matches.

            return;

        default:
            throw new Error("Unsupported instruction tree: ".concat(tree));
    }
}

var OPERATOR = new RegExp( // any of:
    "(" + // or operator
        "\\|" + // or
        "|" + // or group start
        "\\(\\?\\:" + // or
        "|" + // or group end
        "\\)" + // or
        "|" + // one-of set start
        "\\[" + // or
        "|" + // one-of set end
        "\\]" +
        ")"
);

var PatternParser =
    /*#__PURE__*/
    (function () {
        function PatternParser() {
            _classCallCheck$4(this, PatternParser);
        }

        _createClass$4(PatternParser, [
            {
                key: "parse",
                value: function parse(pattern) {
                    this.context = [
                        {
                            or: true,
                            instructions: [],
                        },
                    ];
                    this.parsePattern(pattern);

                    if (this.context.length !== 1) {
                        throw new Error("Non-finalized contexts left when pattern parse ended");
                    }

                    var _this$context$ = this.context[0],
                        branches = _this$context$.branches,
                        instructions = _this$context$.instructions;

                    if (branches) {
                        return [
                            {
                                op: "|",
                                args: branches.concat([instructions]),
                            },
                        ];
                    }

                    if (instructions.length === 0) {
                        throw new Error("Pattern is required");
                    }

                    return instructions;
                },
            },
            {
                key: "startContext",
                value: function startContext(context) {
                    this.context.push(context);
                },
            },
            {
                key: "endContext",
                value: function endContext() {
                    this.context.pop();
                },
            },
            {
                key: "getContext",
                value: function getContext() {
                    return this.context[this.context.length - 1];
                },
            },
            {
                key: "parsePattern",
                value: function parsePattern(pattern) {
                    if (!pattern) {
                        throw new Error("Empty pattern passed");
                    }

                    var match = pattern.match(OPERATOR);

                    if (!match) {
                        this.getContext().instructions = this.getContext().instructions.concat(pattern.split(""));
                        return;
                    }

                    var operator = match[1];
                    var before = pattern.slice(0, match.index);
                    var rightPart = pattern.slice(match.index + operator.length);

                    switch (operator) {
                        case "(?:":
                            if (before) {
                                this.parsePattern(before);
                            }

                            this.startContext({
                                or: true,
                                instructions: [],
                                branches: [],
                            });
                            break;

                        case ")":
                            if (!this.getContext().or) {
                                throw new Error('")" operator must be preceded by "(?:" operator');
                            }

                            if (before) {
                                this.parsePattern(before);
                            }

                            if (this.getContext().instructions.length === 0) {
                                throw new Error('No instructions found after "|" operator in an "or" group');
                            }

                            var _this$getContext = this.getContext(),
                                branches = _this$getContext.branches;

                            branches.push(this.getContext().instructions);
                            this.endContext();
                            this.getContext().instructions.push({
                                op: "|",
                                args: branches,
                            });
                            break;

                        case "|":
                            if (!this.getContext().or) {
                                throw new Error('"|" operator can only be used inside "or" groups');
                            }

                            if (before) {
                                this.parsePattern(before);
                            } // The top-level is an implicit "or" group, if required.

                            if (!this.getContext().branches) {
                                if (this.context.length === 1) {
                                    this.getContext().branches = [];
                                } else {
                                    throw new Error('"branches" not found in an "or" group context');
                                }
                            }

                            this.getContext().branches.push(this.getContext().instructions);
                            this.getContext().instructions = [];
                            break;

                        case "[":
                            if (before) {
                                this.parsePattern(before);
                            }

                            this.startContext({
                                oneOfSet: true,
                            });
                            break;

                        case "]":
                            if (!this.getContext().oneOfSet) {
                                throw new Error('"]" operator must be preceded by "[" operator');
                            }

                            this.endContext();
                            this.getContext().instructions.push({
                                op: "[]",
                                args: parseOneOfSet(before),
                            });
                            break;

                        default:
                            throw new Error("Unknown operator: ".concat(operator));
                    }

                    if (rightPart) {
                        this.parsePattern(rightPart);
                    }
                },
            },
        ]);

        return PatternParser;
    })();

function parseOneOfSet(pattern) {
    var values = [];
    var i = 0;

    while (i < pattern.length) {
        if (pattern[i] === "-") {
            if (i === 0 || i === pattern.length - 1) {
                throw new Error("Couldn't parse a one-of set pattern: ".concat(pattern));
            }

            var prevValue = pattern[i - 1].charCodeAt(0) + 1;
            var nextValue = pattern[i + 1].charCodeAt(0) - 1;
            var value = prevValue;

            while (value <= nextValue) {
                values.push(String.fromCharCode(value));
                value++;
            }
        } else {
            values.push(pattern[i]);
        }

        i++;
    }

    return values;
}

function _classCallCheck$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties$3(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass$3(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$3(Constructor, staticProps);
    return Constructor;
}

function _defineProperty$2(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}
// Could be any digit, I guess.

var DUMMY_DIGIT = "9"; // I don't know why is it exactly `15`

var LONGEST_NATIONAL_PHONE_NUMBER_LENGTH = 15; // Create a phone number consisting only of the digit 9 that matches the
// `number_pattern` by applying the pattern to the "longest phone number" string.

var LONGEST_DUMMY_PHONE_NUMBER = repeat(DUMMY_DIGIT, LONGEST_NATIONAL_PHONE_NUMBER_LENGTH); // A set of characters that, if found in a national prefix formatting rules, are an indicator to
// us that we should separate the national prefix from the number when formatting.

var NATIONAL_PREFIX_SEPARATORS_PATTERN = /[- ]/; // Deprecated: Google has removed some formatting pattern related code from their repo.
// An example of a character class is "[1-4]".

var CREATE_CHARACTER_CLASS_PATTERN = function () {
    return /\[([^\[\]])*\]/g;
}; // Any digit in a regular expression that actually denotes a digit. For
// example, in the regular expression "80[0-2]\d{6,10}", the first 2 digits
// (8 and 0) are standalone digits, but the rest are not.
// Two look-aheads are needed because the number following \\d could be a
// two-digit number, since the phone number can be as long as 15 digits.

var CREATE_STANDALONE_DIGIT_PATTERN = function () {
    return /\d(?=[^,}][^,}])/g;
}; // A regular expression that is used to determine if a `format` is
// suitable to be used in the "as you type formatter".
// A `format` is suitable when the resulting formatted number has
// the same digits as the user has entered.
//
// In the simplest case, that would mean that the format
// doesn't add any additional digits when formatting a number.
// Google says that it also shouldn't add "star" (`*`) characters,
// like it does in some Israeli formats.
// Such basic format would only contain "valid punctuation"
// and "captured group" identifiers ($1, $2, etc).
//
// An example of a format that adds additional digits:
//
// Country: `AR` (Argentina).
// Format:
// {
//    "pattern": "(\\d)(\\d{2})(\\d{4})(\\d{4})",
//    "leading_digits_patterns": ["91"],
//    "national_prefix_formatting_rule": "0$1",
//    "format": "$2 15-$3-$4",
//    "international_format": "$1 $2 $3-$4"
// }
//
// In the format above, the `format` adds `15` to the digits when formatting a number.
// A sidenote: this format actually is suitable because `national_prefix_for_parsing`
// has previously removed `15` from a national number, so re-adding `15` in `format`
// doesn't actually result in any extra digits added to user's input.
// But verifying that would be a complex procedure, so the code chooses a simpler path:
// it simply filters out all `format`s that contain anything but "captured group" ids.
//
// This regular expression is called `ELIGIBLE_FORMAT_PATTERN` in Google's
// `libphonenumber` code.
//

var NON_ALTERING_FORMAT_REG_EXP = new RegExp(
    "^" + "[" + VALID_PUNCTUATION + "]*" + "(\\$\\d[" + VALID_PUNCTUATION + "]*)+" + "$"
); // This is the minimum length of the leading digits of a phone number
// to guarantee the first "leading digits pattern" for a phone number format
// to be preemptive.

var MIN_LEADING_DIGITS_LENGTH = 3;

var AsYouTypeFormatter =
    /*#__PURE__*/
    (function () {
        function AsYouTypeFormatter(_ref) {
            var _this = this;

            _ref.state;
            var metadata = _ref.metadata;

            _classCallCheck$3(this, AsYouTypeFormatter);

            _defineProperty$2(this, "getSeparatorAfterNationalPrefix", function (format) {
                // `US` metadata doesn't have a `national_prefix_formatting_rule`,
                // so the `if` condition below doesn't apply to `US`,
                // but in reality there shoudl be a separator
                // between a national prefix and a national (significant) number.
                // So `US` national prefix separator is a "special" "hardcoded" case.
                if (_this.isNANP) {
                    return " ";
                } // If a `format` has a `national_prefix_formatting_rule`
                // and that rule has a separator after a national prefix,
                // then it means that there should be a separator
                // between a national prefix and a national (significant) number.

                if (
                    format &&
                    format.nationalPrefixFormattingRule() &&
                    NATIONAL_PREFIX_SEPARATORS_PATTERN.test(format.nationalPrefixFormattingRule())
                ) {
                    return " ";
                } // At this point, there seems to be no clear evidence that
                // there should be a separator between a national prefix
                // and a national (significant) number. So don't insert one.

                return "";
            });

            _defineProperty$2(this, "shouldTryNationalPrefixFormattingRule", function (format, _ref2) {
                var international = _ref2.international,
                    nationalPrefix = _ref2.nationalPrefix;

                if (format.nationalPrefixFormattingRule()) {
                    // In some countries, `national_prefix_formatting_rule` is `($1)`,
                    // so it applies even if the user hasn't input a national prefix.
                    // `format.usesNationalPrefix()` detects such cases.
                    var usesNationalPrefix = format.usesNationalPrefix();

                    if ((usesNationalPrefix && nationalPrefix) || (!usesNationalPrefix && !international)) {
                        return true;
                    }
                }
            });

            this.metadata = metadata;
            this.resetFormat();
        }

        _createClass$3(AsYouTypeFormatter, [
            {
                key: "resetFormat",
                value: function resetFormat() {
                    this.chosenFormat = undefined;
                    this.template = undefined;
                    this.nationalNumberTemplate = undefined;
                    this.populatedNationalNumberTemplate = undefined;
                    this.populatedNationalNumberTemplatePosition = -1;
                },
            },
            {
                key: "reset",
                value: function reset(numberingPlan, state) {
                    this.resetFormat();

                    if (numberingPlan) {
                        this.isNANP = numberingPlan.callingCode() === "1";
                        this.matchingFormats = numberingPlan.formats();

                        if (state.nationalSignificantNumber) {
                            this.narrowDownMatchingFormats(state);
                        }
                    } else {
                        this.isNANP = undefined;
                        this.matchingFormats = [];
                    }
                },
                /**
                 * Formats an updated phone number.
                 * @param  {string} nextDigits — Additional phone number digits.
                 * @param  {object} state — `AsYouType` state.
                 * @return {[string]} Returns undefined if the updated phone number can't be formatted using any of the available formats.
                 */
            },
            {
                key: "format",
                value: function format(nextDigits, state) {
                    var _this2 = this;

                    // See if the phone number digits can be formatted as a complete phone number.
                    // If not, use the results from `formatNationalNumberWithNextDigits()`,
                    // which formats based on the chosen formatting pattern.
                    //
                    // Attempting to format complete phone number first is how it's done
                    // in Google's `libphonenumber`, so this library just follows it.
                    // Google's `libphonenumber` code doesn't explain in detail why does it
                    // attempt to format digits as a complete phone number
                    // instead of just going with a previoulsy (or newly) chosen `format`:
                    //
                    // "Checks to see if there is an exact pattern match for these digits.
                    //  If so, we should use this instead of any other formatting template
                    //  whose leadingDigitsPattern also matches the input."
                    //
                    if (canFormatCompleteNumber(state.nationalSignificantNumber, this.metadata)) {
                        for (
                            var _iterator = this.matchingFormats,
                                _isArray = Array.isArray(_iterator),
                                _i = 0,
                                _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
                            ;

                        ) {
                            var _ref3;

                            if (_isArray) {
                                if (_i >= _iterator.length) break;
                                _ref3 = _iterator[_i++];
                            } else {
                                _i = _iterator.next();
                                if (_i.done) break;
                                _ref3 = _i.value;
                            }

                            var format = _ref3;
                            var formattedCompleteNumber = formatCompleteNumber(state, format, {
                                metadata: this.metadata,
                                shouldTryNationalPrefixFormattingRule: function shouldTryNationalPrefixFormattingRule(
                                    format
                                ) {
                                    return _this2.shouldTryNationalPrefixFormattingRule(format, {
                                        international: state.international,
                                        nationalPrefix: state.nationalPrefix,
                                    });
                                },
                                getSeparatorAfterNationalPrefix: this.getSeparatorAfterNationalPrefix,
                            });

                            if (formattedCompleteNumber) {
                                this.resetFormat();
                                this.chosenFormat = format;
                                this.setNationalNumberTemplate(
                                    formattedCompleteNumber.replace(/\d/g, DIGIT_PLACEHOLDER),
                                    state
                                );
                                this.populatedNationalNumberTemplate = formattedCompleteNumber; // With a new formatting template, the matched position
                                // using the old template needs to be reset.

                                this.populatedNationalNumberTemplatePosition =
                                    this.template.lastIndexOf(DIGIT_PLACEHOLDER);
                                return formattedCompleteNumber;
                            }
                        }
                    } // Format the digits as a partial (incomplete) phone number
                    // using the previously chosen formatting pattern (or a newly chosen one).

                    return this.formatNationalNumberWithNextDigits(nextDigits, state);
                }, // Formats the next phone number digits.
            },
            {
                key: "formatNationalNumberWithNextDigits",
                value: function formatNationalNumberWithNextDigits(nextDigits, state) {
                    var previouslyChosenFormat = this.chosenFormat; // Choose a format from the list of matching ones.

                    var newlyChosenFormat = this.chooseFormat(state);

                    if (newlyChosenFormat) {
                        if (newlyChosenFormat === previouslyChosenFormat) {
                            // If it can format the next (current) digits
                            // using the previously chosen phone number format
                            // then return the updated formatted number.
                            return this.formatNextNationalNumberDigits(nextDigits);
                        } else {
                            // If a more appropriate phone number format
                            // has been chosen for these "leading digits",
                            // then re-format the national phone number part
                            // using the newly selected format.
                            return this.formatNextNationalNumberDigits(state.getNationalDigits());
                        }
                    }
                },
            },
            {
                key: "narrowDownMatchingFormats",
                value: function narrowDownMatchingFormats(_ref4) {
                    var _this3 = this;

                    var nationalSignificantNumber = _ref4.nationalSignificantNumber,
                        nationalPrefix = _ref4.nationalPrefix,
                        international = _ref4.international;
                    var leadingDigits = nationalSignificantNumber; // "leading digits" pattern list starts with a
                    // "leading digits" pattern fitting a maximum of 3 leading digits.
                    // So, after a user inputs 3 digits of a national (significant) phone number
                    // this national (significant) number can already be formatted.
                    // The next "leading digits" pattern is for 4 leading digits max,
                    // and the "leading digits" pattern after it is for 5 leading digits max, etc.
                    // This implementation is different from Google's
                    // in that it searches for a fitting format
                    // even if the user has entered less than
                    // `MIN_LEADING_DIGITS_LENGTH` digits of a national number.
                    // Because some leading digit patterns already match for a single first digit.

                    var leadingDigitsPatternIndex = leadingDigits.length - MIN_LEADING_DIGITS_LENGTH;

                    if (leadingDigitsPatternIndex < 0) {
                        leadingDigitsPatternIndex = 0;
                    }

                    this.matchingFormats = this.matchingFormats.filter(function (format) {
                        return (
                            _this3.formatSuits(format, international, nationalPrefix) &&
                            _this3.formatMatches(format, leadingDigits, leadingDigitsPatternIndex)
                        );
                    }); // If there was a phone number format chosen
                    // and it no longer holds given the new leading digits then reset it.
                    // The test for this `if` condition is marked as:
                    // "Reset a chosen format when it no longer holds given the new leading digits".
                    // To construct a valid test case for this one can find a country
                    // in `PhoneNumberMetadata.xml` yielding one format for 3 `<leadingDigits>`
                    // and yielding another format for 4 `<leadingDigits>` (Australia in this case).

                    if (this.chosenFormat && this.matchingFormats.indexOf(this.chosenFormat) === -1) {
                        this.resetFormat();
                    }
                },
            },
            {
                key: "formatSuits",
                value: function formatSuits(format, international, nationalPrefix) {
                    // When a prefix before a national (significant) number is
                    // simply a national prefix, then it's parsed as `this.nationalPrefix`.
                    // In more complex cases, a prefix before national (significant) number
                    // could include a national prefix as well as some "capturing groups",
                    // and in that case there's no info whether a national prefix has been parsed.
                    // If national prefix is not used when formatting a phone number
                    // using this format, but a national prefix has been entered by the user,
                    // and was extracted, then discard such phone number format.
                    // In Google's "AsYouType" formatter code, the equivalent would be this part:
                    // https://github.com/google/libphonenumber/blob/0a45cfd96e71cad8edb0e162a70fcc8bd9728933/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L175-L184
                    if (
                        nationalPrefix &&
                        !format.usesNationalPrefix() && // !format.domesticCarrierCodeFormattingRule() &&
                        !format.nationalPrefixIsOptionalWhenFormattingInNationalFormat()
                    ) {
                        return false;
                    } // If national prefix is mandatory for this phone number format
                    // and there're no guarantees that a national prefix is present in user input
                    // then discard this phone number format as not suitable.
                    // In Google's "AsYouType" formatter code, the equivalent would be this part:
                    // https://github.com/google/libphonenumber/blob/0a45cfd96e71cad8edb0e162a70fcc8bd9728933/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L185-L193

                    if (
                        !international &&
                        !nationalPrefix &&
                        format.nationalPrefixIsMandatoryWhenFormattingInNationalFormat()
                    ) {
                        return false;
                    }

                    return true;
                },
            },
            {
                key: "formatMatches",
                value: function formatMatches(format, leadingDigits, leadingDigitsPatternIndex) {
                    var leadingDigitsPatternsCount = format.leadingDigitsPatterns().length; // If this format is not restricted to a certain
                    // leading digits pattern then it fits.

                    if (leadingDigitsPatternsCount === 0) {
                        return true;
                    } // Start narrowing down the list of possible formats based on the leading digits.
                    // (only previously matched formats take part in the narrowing down process)
                    // `leading_digits_patterns` start with 3 digits min
                    // and then go up from there one digit at a time.

                    leadingDigitsPatternIndex = Math.min(leadingDigitsPatternIndex, leadingDigitsPatternsCount - 1);
                    var leadingDigitsPattern = format.leadingDigitsPatterns()[leadingDigitsPatternIndex]; // Google imposes a requirement on the leading digits
                    // to be minimum 3 digits long in order to be eligible
                    // for checking those with a leading digits pattern.
                    //
                    // Since `leading_digits_patterns` start with 3 digits min,
                    // Google's original `libphonenumber` library only starts
                    // excluding any non-matching formats only when the
                    // national number entered so far is at least 3 digits long,
                    // otherwise format matching would give false negatives.
                    //
                    // For example, when the digits entered so far are `2`
                    // and the leading digits pattern is `21` –
                    // it's quite obvious in this case that the format could be the one
                    // but due to the absence of further digits it would give false negative.
                    //
                    // Also, `leading_digits_patterns` doesn't always correspond to a single
                    // digits count. For example, `60|8` pattern would already match `8`
                    // but the `60` part would require having at least two leading digits,
                    // so the whole pattern would require inputting two digits first in order to
                    // decide on whether it matches the input, even when the input is "80".
                    //
                    // This library — `libphonenumber-js` — allows filtering by `leading_digits_patterns`
                    // even when there's only 1 or 2 digits of the national (significant) number.
                    // To do that, it uses a non-strict pattern matcher written specifically for that.
                    //

                    if (leadingDigits.length < MIN_LEADING_DIGITS_LENGTH) {
                        // Before leading digits < 3 matching was implemented:
                        // return true
                        //
                        // After leading digits < 3 matching was implemented:
                        try {
                            return (
                                new PatternMatcher(leadingDigitsPattern).match(leadingDigits, {
                                    allowOverflow: true,
                                }) !== undefined
                            );
                        } catch (error) {
                            // There's a slight possibility that there could be some undiscovered bug
                            // in the pattern matcher code. Since the "leading digits < 3 matching"
                            // feature is not "essential" for operation, it can fall back to the old way
                            // in case of any issues rather than halting the application's execution.
                            console.error(error);
                            return true;
                        }
                    } // If at least `MIN_LEADING_DIGITS_LENGTH` digits of a national number are
                    // available then use the usual regular expression matching.
                    //
                    // The whole pattern is wrapped in round brackets (`()`) because
                    // the pattern can use "or" operator (`|`) at the top level of the pattern.
                    //

                    return new RegExp("^(".concat(leadingDigitsPattern, ")")).test(leadingDigits);
                },
            },
            {
                key: "getFormatFormat",
                value: function getFormatFormat(format, international) {
                    return international ? format.internationalFormat() : format.format();
                },
            },
            {
                key: "chooseFormat",
                value: function chooseFormat(state) {
                    var _this4 = this;

                    var _loop2 = function _loop2() {
                        if (_isArray2) {
                            if (_i2 >= _iterator2.length) return "break";
                            _ref5 = _iterator2[_i2++];
                        } else {
                            _i2 = _iterator2.next();
                            if (_i2.done) return "break";
                            _ref5 = _i2.value;
                        }

                        var format = _ref5;

                        // If this format is currently being used
                        // and is still suitable, then stick to it.
                        if (_this4.chosenFormat === format) {
                            return "break";
                        } // Sometimes, a formatting rule inserts additional digits in a phone number,
                        // and "as you type" formatter can't do that: it should only use the digits
                        // that the user has input.
                        //
                        // For example, in Argentina, there's a format for mobile phone numbers:
                        //
                        // {
                        //    "pattern": "(\\d)(\\d{2})(\\d{4})(\\d{4})",
                        //    "leading_digits_patterns": ["91"],
                        //    "national_prefix_formatting_rule": "0$1",
                        //    "format": "$2 15-$3-$4",
                        //    "international_format": "$1 $2 $3-$4"
                        // }
                        //
                        // In that format, `international_format` is used instead of `format`
                        // because `format` inserts `15` in the formatted number,
                        // and `AsYouType` formatter should only use the digits
                        // the user has actually input, without adding any extra digits.
                        // In this case, it wouldn't make a difference, because the `15`
                        // is first stripped when applying `national_prefix_for_parsing`
                        // and then re-added when using `format`, so in reality it doesn't
                        // add any new digits to the number, but to detect that, the code
                        // would have to be more complex: it would have to try formatting
                        // the digits using the format and then see if any digits have
                        // actually been added or removed, and then, every time a new digit
                        // is input, it should re-check whether the chosen format doesn't
                        // alter the digits.
                        //
                        // Google's code doesn't go that far, and so does this library:
                        // it simply requires that a `format` doesn't add any additonal
                        // digits to user's input.
                        //
                        // Also, people in general should move from inputting phone numbers
                        // in national format (possibly with national prefixes)
                        // and use international phone number format instead:
                        // it's a logical thing in the modern age of mobile phones,
                        // globalization and the internet.
                        //

                        /* istanbul ignore if */

                        if (!NON_ALTERING_FORMAT_REG_EXP.test(_this4.getFormatFormat(format, state.international))) {
                            return "continue";
                        }

                        if (!_this4.createTemplateForFormat(format, state)) {
                            // Remove the format if it can't generate a template.
                            _this4.matchingFormats = _this4.matchingFormats.filter(function (_) {
                                return _ !== format;
                            });
                            return "continue";
                        }

                        _this4.chosenFormat = format;
                        return "break";
                    };

                    // When there are multiple available formats, the formatter uses the first
                    // format where a formatting template could be created.
                    _loop: for (
                        var _iterator2 = this.matchingFormats.slice(),
                            _isArray2 = Array.isArray(_iterator2),
                            _i2 = 0,
                            _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();
                        ;

                    ) {
                        var _ref5;

                        var _ret = _loop2();

                        switch (_ret) {
                            case "break":
                                break _loop;

                            case "continue":
                                continue;
                        }
                    }

                    if (!this.chosenFormat) {
                        // No format matches the national (significant) phone number.
                        this.resetFormat();
                    }

                    return this.chosenFormat;
                },
            },
            {
                key: "createTemplateForFormat",
                value: function createTemplateForFormat(format, state) {
                    // The formatter doesn't format numbers when numberPattern contains '|', e.g.
                    // (20|3)\d{4}. In those cases we quickly return.
                    // (Though there's no such format in current metadata)

                    /* istanbul ignore if */
                    if (format.pattern().indexOf("|") >= 0) {
                        return;
                    } // Get formatting template for this phone number format

                    var template = this.getTemplateForFormat(format, state); // If the national number entered is too long
                    // for any phone number format, then abort.

                    if (template) {
                        this.setNationalNumberTemplate(template, state);
                        return true;
                    }
                },
            },
            {
                key: "getInternationalPrefixBeforeCountryCallingCode",
                value: function getInternationalPrefixBeforeCountryCallingCode(_ref6, options) {
                    var IDDPrefix = _ref6.IDDPrefix,
                        missingPlus = _ref6.missingPlus;

                    if (IDDPrefix) {
                        return options && options.spacing === false ? IDDPrefix : IDDPrefix + " ";
                    }

                    if (missingPlus) {
                        return "";
                    }

                    return "+";
                },
            },
            {
                key: "getTemplate",
                value: function getTemplate(state) {
                    if (!this.template) {
                        return;
                    } // `this.template` holds the template for a "complete" phone number.
                    // The currently entered phone number is most likely not "complete",
                    // so trim all non-populated digits.

                    var index = -1;
                    var i = 0;
                    var internationalPrefix = state.international
                        ? this.getInternationalPrefixBeforeCountryCallingCode(state, {
                              spacing: false,
                          })
                        : "";

                    while (i < internationalPrefix.length + state.getDigitsWithoutInternationalPrefix().length) {
                        index = this.template.indexOf(DIGIT_PLACEHOLDER, index + 1);
                        i++;
                    }

                    return cutAndStripNonPairedParens(this.template, index + 1);
                },
            },
            {
                key: "setNationalNumberTemplate",
                value: function setNationalNumberTemplate(template, state) {
                    this.nationalNumberTemplate = template;
                    this.populatedNationalNumberTemplate = template; // With a new formatting template, the matched position
                    // using the old template needs to be reset.

                    this.populatedNationalNumberTemplatePosition = -1; // For convenience, the public `.template` property
                    // contains the whole international number
                    // if the phone number being input is international:
                    // 'x' for the '+' sign, 'x'es for the country phone code,
                    // a spacebar and then the template for the formatted national number.

                    if (state.international) {
                        this.template =
                            this.getInternationalPrefixBeforeCountryCallingCode(state).replace(
                                /[\d\+]/g,
                                DIGIT_PLACEHOLDER
                            ) +
                            repeat(DIGIT_PLACEHOLDER, state.callingCode.length) +
                            " " +
                            template;
                    } else {
                        this.template = template;
                    }
                },
                /**
                 * Generates formatting template for a national phone number,
                 * optionally containing a national prefix, for a format.
                 * @param  {Format} format
                 * @param  {string} nationalPrefix
                 * @return {string}
                 */
            },
            {
                key: "getTemplateForFormat",
                value: function getTemplateForFormat(format, _ref7) {
                    var nationalSignificantNumber = _ref7.nationalSignificantNumber,
                        international = _ref7.international,
                        nationalPrefix = _ref7.nationalPrefix,
                        complexPrefixBeforeNationalSignificantNumber =
                            _ref7.complexPrefixBeforeNationalSignificantNumber;
                    var pattern = format.pattern();
                    /* istanbul ignore else */

                    {
                        pattern = pattern // Replace anything in the form of [..] with \d
                            .replace(CREATE_CHARACTER_CLASS_PATTERN(), "\\d") // Replace any standalone digit (not the one in `{}`) with \d
                            .replace(CREATE_STANDALONE_DIGIT_PATTERN(), "\\d");
                    } // Generate a dummy national number (consisting of `9`s)
                    // that fits this format's `pattern`.
                    //
                    // This match will always succeed,
                    // because the "longest dummy phone number"
                    // has enough length to accomodate any possible
                    // national phone number format pattern.
                    //

                    var digits = LONGEST_DUMMY_PHONE_NUMBER.match(pattern)[0]; // If the national number entered is too long
                    // for any phone number format, then abort.

                    if (nationalSignificantNumber.length > digits.length) {
                        return;
                    } // Get a formatting template which can be used to efficiently format
                    // a partial number where digits are added one by one.
                    // Below `strictPattern` is used for the
                    // regular expression (with `^` and `$`).
                    // This wasn't originally in Google's `libphonenumber`
                    // and I guess they don't really need it
                    // because they're not using "templates" to format phone numbers
                    // but I added `strictPattern` after encountering
                    // South Korean phone number formatting bug.
                    //
                    // Non-strict regular expression bug demonstration:
                    //
                    // this.nationalSignificantNumber : `111111111` (9 digits)
                    //
                    // pattern : (\d{2})(\d{3,4})(\d{4})
                    // format : `$1 $2 $3`
                    // digits : `9999999999` (10 digits)
                    //
                    // '9999999999'.replace(new RegExp(/(\d{2})(\d{3,4})(\d{4})/g), '$1 $2 $3') = "99 9999 9999"
                    //
                    // template : xx xxxx xxxx
                    //
                    // But the correct template in this case is `xx xxx xxxx`.
                    // The template was generated incorrectly because of the
                    // `{3,4}` variability in the `pattern`.
                    //
                    // The fix is, if `this.nationalSignificantNumber` has already sufficient length
                    // to satisfy the `pattern` completely then `this.nationalSignificantNumber`
                    // is used instead of `digits`.

                    var strictPattern = new RegExp("^" + pattern + "$");
                    var nationalNumberDummyDigits = nationalSignificantNumber.replace(/\d/g, DUMMY_DIGIT); // If `this.nationalSignificantNumber` has already sufficient length
                    // to satisfy the `pattern` completely then use it
                    // instead of `digits`.

                    if (strictPattern.test(nationalNumberDummyDigits)) {
                        digits = nationalNumberDummyDigits;
                    }

                    var numberFormat = this.getFormatFormat(format, international);
                    var nationalPrefixIncludedInTemplate; // If a user did input a national prefix (and that's guaranteed),
                    // and if a `format` does have a national prefix formatting rule,
                    // then see if that national prefix formatting rule
                    // prepends exactly the same national prefix the user has input.
                    // If that's the case, then use the `format` with the national prefix formatting rule.
                    // Otherwise, use  the `format` without the national prefix formatting rule,
                    // and prepend a national prefix manually to it.

                    if (
                        this.shouldTryNationalPrefixFormattingRule(format, {
                            international: international,
                            nationalPrefix: nationalPrefix,
                        })
                    ) {
                        var numberFormatWithNationalPrefix = numberFormat.replace(
                            FIRST_GROUP_PATTERN,
                            format.nationalPrefixFormattingRule()
                        ); // If `national_prefix_formatting_rule` of a `format` simply prepends
                        // national prefix at the start of a national (significant) number,
                        // then such formatting can be used with `AsYouType` formatter.
                        // There seems to be no `else` case: everywhere in metadata,
                        // national prefix formatting rule is national prefix + $1,
                        // or `($1)`, in which case such format isn't even considered
                        // when the user has input a national prefix.

                        /* istanbul ignore else */

                        if (
                            parseDigits(format.nationalPrefixFormattingRule()) ===
                            (nationalPrefix || "") + parseDigits("$1")
                        ) {
                            numberFormat = numberFormatWithNationalPrefix;
                            nationalPrefixIncludedInTemplate = true; // Replace all digits of the national prefix in the formatting template
                            // with `DIGIT_PLACEHOLDER`s.

                            if (nationalPrefix) {
                                var i = nationalPrefix.length;

                                while (i > 0) {
                                    numberFormat = numberFormat.replace(/\d/, DIGIT_PLACEHOLDER);
                                    i--;
                                }
                            }
                        }
                    } // Generate formatting template for this phone number format.

                    var template = digits // Format the dummy phone number according to the format.
                        .replace(new RegExp(pattern), numberFormat) // Replace each dummy digit with a DIGIT_PLACEHOLDER.
                        .replace(new RegExp(DUMMY_DIGIT, "g"), DIGIT_PLACEHOLDER); // If a prefix of a national (significant) number is not as simple
                    // as just a basic national prefix, then just prepend such prefix
                    // before the national (significant) number, optionally spacing
                    // the two with a whitespace.

                    if (!nationalPrefixIncludedInTemplate) {
                        if (complexPrefixBeforeNationalSignificantNumber) {
                            // Prepend the prefix to the template manually.
                            template =
                                repeat(DIGIT_PLACEHOLDER, complexPrefixBeforeNationalSignificantNumber.length) +
                                " " +
                                template;
                        } else if (nationalPrefix) {
                            // Prepend national prefix to the template manually.
                            template =
                                repeat(DIGIT_PLACEHOLDER, nationalPrefix.length) +
                                this.getSeparatorAfterNationalPrefix(format) +
                                template;
                        }
                    }

                    if (international) {
                        template = applyInternationalSeparatorStyle(template);
                    }

                    return template;
                },
            },
            {
                key: "formatNextNationalNumberDigits",
                value: function formatNextNationalNumberDigits(digits) {
                    var result = populateTemplateWithDigits(
                        this.populatedNationalNumberTemplate,
                        this.populatedNationalNumberTemplatePosition,
                        digits
                    );

                    if (!result) {
                        // Reset the format.
                        this.resetFormat();
                        return;
                    }

                    this.populatedNationalNumberTemplate = result[0];
                    this.populatedNationalNumberTemplatePosition = result[1]; // Return the formatted phone number so far.

                    return cutAndStripNonPairedParens(
                        this.populatedNationalNumberTemplate,
                        this.populatedNationalNumberTemplatePosition + 1
                    ); // The old way which was good for `input-format` but is not so good
                    // for `react-phone-number-input`'s default input (`InputBasic`).
                    // return closeNonPairedParens(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition + 1)
                    // 	.replace(new RegExp(DIGIT_PLACEHOLDER, 'g'), ' ')
                },
            },
        ]);

        return AsYouTypeFormatter;
    })();

function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
}

function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit$1(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
}

function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties$2(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass$2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$2(Constructor, staticProps);
    return Constructor;
}
var VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART = "[" + VALID_PUNCTUATION + VALID_DIGITS + "]+";
var VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART_PATTERN = new RegExp(
    "^" + VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART + "$",
    "i"
);
var VALID_FORMATTED_PHONE_NUMBER_PART =
    "(?:" +
    "[" +
    PLUS_CHARS +
    "]" +
    "[" +
    VALID_PUNCTUATION +
    VALID_DIGITS +
    "]*" +
    "|" +
    "[" +
    VALID_PUNCTUATION +
    VALID_DIGITS +
    "]+" +
    ")";
var AFTER_PHONE_NUMBER_DIGITS_END_PATTERN = new RegExp("[^" + VALID_PUNCTUATION + VALID_DIGITS + "]+" + ".*" + "$"); // Tests whether `national_prefix_for_parsing` could match
// different national prefixes.
// Matches anything that's not a digit or a square bracket.

var COMPLEX_NATIONAL_PREFIX = /[^\d\[\]]/;

var AsYouTypeParser =
    /*#__PURE__*/
    (function () {
        function AsYouTypeParser(_ref) {
            var defaultCountry = _ref.defaultCountry,
                defaultCallingCode = _ref.defaultCallingCode,
                metadata = _ref.metadata,
                onNationalSignificantNumberChange = _ref.onNationalSignificantNumberChange;

            _classCallCheck$2(this, AsYouTypeParser);

            this.defaultCountry = defaultCountry;
            this.defaultCallingCode = defaultCallingCode;
            this.metadata = metadata;
            this.onNationalSignificantNumberChange = onNationalSignificantNumberChange;
        }

        _createClass$2(AsYouTypeParser, [
            {
                key: "input",
                value: function input(text, state) {
                    var _extractFormattedDigi = extractFormattedDigitsAndPlus(text),
                        _extractFormattedDigi2 = _slicedToArray$1(_extractFormattedDigi, 2),
                        formattedDigits = _extractFormattedDigi2[0],
                        hasPlus = _extractFormattedDigi2[1];

                    var digits = parseDigits(formattedDigits); // Checks for a special case: just a leading `+` has been entered.

                    var justLeadingPlus;

                    if (hasPlus) {
                        if (!state.digits) {
                            state.startInternationalNumber();

                            if (!digits) {
                                justLeadingPlus = true;
                            }
                        }
                    }

                    if (digits) {
                        this.inputDigits(digits, state);
                    }

                    return {
                        digits: digits,
                        justLeadingPlus: justLeadingPlus,
                    };
                },
                /**
                 * Inputs "next" phone number digits.
                 * @param  {string} digits
                 * @return {string} [formattedNumber] Formatted national phone number (if it can be formatted at this stage). Returning `undefined` means "don't format the national phone number at this stage".
                 */
            },
            {
                key: "inputDigits",
                value: function inputDigits(nextDigits, state) {
                    var digits = state.digits;
                    var hasReceivedThreeLeadingDigits = digits.length < 3 && digits.length + nextDigits.length >= 3; // Append phone number digits.

                    state.appendDigits(nextDigits); // Attempt to extract IDD prefix:
                    // Some users input their phone number in international format,
                    // but in an "out-of-country" dialing format instead of using the leading `+`.
                    // https://github.com/catamphetamine/libphonenumber-js/issues/185
                    // Detect such numbers as soon as there're at least 3 digits.
                    // Google's library attempts to extract IDD prefix at 3 digits,
                    // so this library just copies that behavior.
                    // I guess that's because the most commot IDD prefixes are
                    // `00` (Europe) and `011` (US).
                    // There exist really long IDD prefixes too:
                    // for example, in Australia the default IDD prefix is `0011`,
                    // and it could even be as long as `14880011`.
                    // An IDD prefix is extracted here, and then every time when
                    // there's a new digit and the number couldn't be formatted.

                    if (hasReceivedThreeLeadingDigits) {
                        this.extractIddPrefix(state);
                    }

                    if (this.isWaitingForCountryCallingCode(state)) {
                        if (!this.extractCountryCallingCode(state)) {
                            return;
                        }
                    } else {
                        state.appendNationalSignificantNumberDigits(nextDigits);
                    } // If a phone number is being input in international format,
                    // then it's not valid for it to have a national prefix.
                    // Still, some people incorrectly input such numbers with a national prefix.
                    // In such cases, only attempt to strip a national prefix if the number becomes too long.
                    // (but that is done later, not here)

                    if (!state.international) {
                        if (!this.hasExtractedNationalSignificantNumber) {
                            this.extractNationalSignificantNumber(state.getNationalDigits(), state.update);
                        }
                    }
                },
            },
            {
                key: "isWaitingForCountryCallingCode",
                value: function isWaitingForCountryCallingCode(_ref2) {
                    var international = _ref2.international,
                        callingCode = _ref2.callingCode;
                    return international && !callingCode;
                }, // Extracts a country calling code from a number
                // being entered in internatonal format.
            },
            {
                key: "extractCountryCallingCode",
                value: function extractCountryCallingCode$1(state) {
                    var _extractCountryCallin = extractCountryCallingCode(
                            "+" + state.getDigitsWithoutInternationalPrefix(),
                            this.defaultCountry,
                            this.defaultCallingCode,
                            this.metadata.metadata
                        ),
                        countryCallingCode = _extractCountryCallin.countryCallingCode,
                        number = _extractCountryCallin.number;

                    if (countryCallingCode) {
                        state.setCallingCode(countryCallingCode);
                        state.update({
                            nationalSignificantNumber: number,
                        });
                        return true;
                    }
                },
            },
            {
                key: "reset",
                value: function reset(numberingPlan) {
                    if (numberingPlan) {
                        this.hasSelectedNumberingPlan = true;

                        var nationalPrefixForParsing = numberingPlan._nationalPrefixForParsing();

                        this.couldPossiblyExtractAnotherNationalSignificantNumber =
                            nationalPrefixForParsing && COMPLEX_NATIONAL_PREFIX.test(nationalPrefixForParsing);
                    } else {
                        this.hasSelectedNumberingPlan = undefined;
                        this.couldPossiblyExtractAnotherNationalSignificantNumber = undefined;
                    }
                },
                /**
                 * Extracts a national (significant) number from user input.
                 * Google's library is different in that it only applies `national_prefix_for_parsing`
                 * and doesn't apply `national_prefix_transform_rule` after that.
                 * https://github.com/google/libphonenumber/blob/a3d70b0487875475e6ad659af404943211d26456/java/libphonenumber/src/com/google/i18n/phonenumbers/AsYouTypeFormatter.java#L539
                 * @return {boolean} [extracted]
                 */
            },
            {
                key: "extractNationalSignificantNumber",
                value: function extractNationalSignificantNumber(nationalDigits, setState) {
                    if (!this.hasSelectedNumberingPlan) {
                        return;
                    }

                    var _extractNationalNumbe = extractNationalNumberFromPossiblyIncompleteNumber(
                            nationalDigits,
                            this.metadata
                        ),
                        nationalPrefix = _extractNationalNumbe.nationalPrefix,
                        nationalNumber = _extractNationalNumbe.nationalNumber,
                        carrierCode = _extractNationalNumbe.carrierCode;

                    if (nationalNumber === nationalDigits) {
                        return;
                    }

                    this.onExtractedNationalNumber(
                        nationalPrefix,
                        carrierCode,
                        nationalNumber,
                        nationalDigits,
                        setState
                    );
                    return true;
                },
                /**
                 * In Google's code this function is called "attempt to extract longer NDD".
                 * "Some national prefixes are a substring of others", they say.
                 * @return {boolean} [result] — Returns `true` if extracting a national prefix produced different results from what they were.
                 */
            },
            {
                key: "extractAnotherNationalSignificantNumber",
                value: function extractAnotherNationalSignificantNumber(
                    nationalDigits,
                    prevNationalSignificantNumber,
                    setState
                ) {
                    if (!this.hasExtractedNationalSignificantNumber) {
                        return this.extractNationalSignificantNumber(nationalDigits, setState);
                    }

                    if (!this.couldPossiblyExtractAnotherNationalSignificantNumber) {
                        return;
                    }

                    var _extractNationalNumbe2 = extractNationalNumberFromPossiblyIncompleteNumber(
                            nationalDigits,
                            this.metadata
                        ),
                        nationalPrefix = _extractNationalNumbe2.nationalPrefix,
                        nationalNumber = _extractNationalNumbe2.nationalNumber,
                        carrierCode = _extractNationalNumbe2.carrierCode; // If a national prefix has been extracted previously,
                    // then it's always extracted as additional digits are added.
                    // That's assuming `extractNationalNumberFromPossiblyIncompleteNumber()`
                    // doesn't do anything different from what it currently does.
                    // So, just in case, here's this check, though it doesn't occur.

                    /* istanbul ignore if */

                    if (nationalNumber === prevNationalSignificantNumber) {
                        return;
                    }

                    this.onExtractedNationalNumber(
                        nationalPrefix,
                        carrierCode,
                        nationalNumber,
                        nationalDigits,
                        setState
                    );
                    return true;
                },
            },
            {
                key: "onExtractedNationalNumber",
                value: function onExtractedNationalNumber(
                    nationalPrefix,
                    carrierCode,
                    nationalSignificantNumber,
                    nationalDigits,
                    setState
                ) {
                    var complexPrefixBeforeNationalSignificantNumber;
                    var nationalSignificantNumberMatchesInput; // This check also works with empty `this.nationalSignificantNumber`.

                    var nationalSignificantNumberIndex = nationalDigits.lastIndexOf(nationalSignificantNumber); // If the extracted national (significant) number is the
                    // last substring of the `digits`, then it means that it hasn't been altered:
                    // no digits have been removed from the national (significant) number
                    // while applying `national_prefix_transform_rule`.
                    // https://gitlab.com/catamphetamine/libphonenumber-js/-/blob/master/METADATA.md#national_prefix_for_parsing--national_prefix_transform_rule

                    if (
                        nationalSignificantNumberIndex >= 0 &&
                        nationalSignificantNumberIndex === nationalDigits.length - nationalSignificantNumber.length
                    ) {
                        nationalSignificantNumberMatchesInput = true; // If a prefix of a national (significant) number is not as simple
                        // as just a basic national prefix, then such prefix is stored in
                        // `this.complexPrefixBeforeNationalSignificantNumber` property and will be
                        // prepended "as is" to the national (significant) number to produce
                        // a formatted result.

                        var prefixBeforeNationalNumber = nationalDigits.slice(0, nationalSignificantNumberIndex); // `prefixBeforeNationalNumber` is always non-empty,
                        // because `onExtractedNationalNumber()` isn't called
                        // when a national (significant) number hasn't been actually "extracted":
                        // when a national (significant) number is equal to the national part of `digits`,
                        // then `onExtractedNationalNumber()` doesn't get called.

                        if (prefixBeforeNationalNumber !== nationalPrefix) {
                            complexPrefixBeforeNationalSignificantNumber = prefixBeforeNationalNumber;
                        }
                    }

                    setState({
                        nationalPrefix: nationalPrefix,
                        carrierCode: carrierCode,
                        nationalSignificantNumber: nationalSignificantNumber,
                        nationalSignificantNumberMatchesInput: nationalSignificantNumberMatchesInput,
                        complexPrefixBeforeNationalSignificantNumber: complexPrefixBeforeNationalSignificantNumber,
                    }); // `onExtractedNationalNumber()` is only called when
                    // the national (significant) number actually did change.

                    this.hasExtractedNationalSignificantNumber = true;
                    this.onNationalSignificantNumberChange();
                },
            },
            {
                key: "reExtractNationalSignificantNumber",
                value: function reExtractNationalSignificantNumber(state) {
                    // Attempt to extract a national prefix.
                    //
                    // Some people incorrectly input national prefix
                    // in an international phone number.
                    // For example, some people write British phone numbers as `+44(0)...`.
                    //
                    // Also, in some rare cases, it is valid for a national prefix
                    // to be a part of an international phone number.
                    // For example, mobile phone numbers in Mexico are supposed to be
                    // dialled internationally using a `1` national prefix,
                    // so the national prefix will be part of an international number.
                    //
                    // Quote from:
                    // https://www.mexperience.com/dialing-cell-phones-in-mexico/
                    //
                    // "Dialing a Mexican cell phone from abroad
                    // When you are calling a cell phone number in Mexico from outside Mexico,
                    // it’s necessary to dial an additional “1” after Mexico’s country code
                    // (which is “52”) and before the area code.
                    // You also ignore the 045, and simply dial the area code and the
                    // cell phone’s number.
                    //
                    // If you don’t add the “1”, you’ll receive a recorded announcement
                    // asking you to redial using it.
                    //
                    // For example, if you are calling from the USA to a cell phone
                    // in Mexico City, you would dial +52 – 1 – 55 – 1234 5678.
                    // (Note that this is different to calling a land line in Mexico City
                    // from abroad, where the number dialed would be +52 – 55 – 1234 5678)".
                    //
                    // Google's demo output:
                    // https://libphonenumber.appspot.com/phonenumberparser?number=%2b5215512345678&country=MX
                    //
                    if (
                        this.extractAnotherNationalSignificantNumber(
                            state.getNationalDigits(),
                            state.nationalSignificantNumber,
                            state.update
                        )
                    ) {
                        return true;
                    } // If no format matches the phone number, then it could be
                    // "a really long IDD" (quote from a comment in Google's library).
                    // An IDD prefix is first extracted when the user has entered at least 3 digits,
                    // and then here — every time when there's a new digit and the number
                    // couldn't be formatted.
                    // For example, in Australia the default IDD prefix is `0011`,
                    // and it could even be as long as `14880011`.
                    //
                    // Could also check `!hasReceivedThreeLeadingDigits` here
                    // to filter out the case when this check duplicates the one
                    // already performed when there're 3 leading digits,
                    // but it's not a big deal, and in most cases there
                    // will be a suitable `format` when there're 3 leading digits.
                    //

                    if (this.extractIddPrefix(state)) {
                        this.extractCallingCodeAndNationalSignificantNumber(state);
                        return true;
                    } // Google's AsYouType formatter supports sort of an "autocorrection" feature
                    // when it "autocorrects" numbers that have been input for a country
                    // with that country's calling code.
                    // Such "autocorrection" feature looks weird, but different people have been requesting it:
                    // https://github.com/catamphetamine/libphonenumber-js/issues/376
                    // https://github.com/catamphetamine/libphonenumber-js/issues/375
                    // https://github.com/catamphetamine/libphonenumber-js/issues/316

                    if (this.fixMissingPlus(state)) {
                        this.extractCallingCodeAndNationalSignificantNumber(state);
                        return true;
                    }
                },
            },
            {
                key: "extractIddPrefix",
                value: function extractIddPrefix(state) {
                    // An IDD prefix can't be present in a number written with a `+`.
                    // Also, don't re-extract an IDD prefix if has already been extracted.
                    var international = state.international,
                        IDDPrefix = state.IDDPrefix,
                        digits = state.digits;
                    state.nationalSignificantNumber;

                    if (international || IDDPrefix) {
                        return;
                    } // Some users input their phone number in "out-of-country"
                    // dialing format instead of using the leading `+`.
                    // https://github.com/catamphetamine/libphonenumber-js/issues/185
                    // Detect such numbers.

                    var numberWithoutIDD = stripIddPrefix(
                        digits,
                        this.defaultCountry,
                        this.defaultCallingCode,
                        this.metadata.metadata
                    );

                    if (numberWithoutIDD !== undefined && numberWithoutIDD !== digits) {
                        // If an IDD prefix was stripped then convert the IDD-prefixed number
                        // to international number for subsequent parsing.
                        state.update({
                            IDDPrefix: digits.slice(0, digits.length - numberWithoutIDD.length),
                        });
                        this.startInternationalNumber(state);
                        return true;
                    }
                },
            },
            {
                key: "fixMissingPlus",
                value: function fixMissingPlus(state) {
                    if (!state.international) {
                        var _extractCountryCallin2 = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(
                                state.digits,
                                this.defaultCountry,
                                this.defaultCallingCode,
                                this.metadata.metadata
                            ),
                            newCallingCode = _extractCountryCallin2.countryCallingCode;
                        _extractCountryCallin2.number;

                        if (newCallingCode) {
                            state.update({
                                missingPlus: true,
                            });
                            this.startInternationalNumber(state);
                            return true;
                        }
                    }
                },
            },
            {
                key: "startInternationalNumber",
                value: function startInternationalNumber(state) {
                    state.startInternationalNumber(); // If a national (significant) number has been extracted before, reset it.

                    if (state.nationalSignificantNumber) {
                        state.resetNationalSignificantNumber();
                        this.onNationalSignificantNumberChange();
                        this.hasExtractedNationalSignificantNumber = undefined;
                    }
                },
            },
            {
                key: "extractCallingCodeAndNationalSignificantNumber",
                value: function extractCallingCodeAndNationalSignificantNumber(state) {
                    if (this.extractCountryCallingCode(state)) {
                        // `this.extractCallingCode()` is currently called when the number
                        // couldn't be formatted during the standard procedure.
                        // Normally, the national prefix would be re-extracted
                        // for an international number if such number couldn't be formatted,
                        // but since it's already not able to be formatted,
                        // there won't be yet another retry, so also extract national prefix here.
                        this.extractNationalSignificantNumber(state.getNationalDigits(), state.update);
                    }
                },
            },
        ]);

        return AsYouTypeParser;
    })();

function extractFormattedPhoneNumber(text) {
    // Attempt to extract a possible number from the string passed in.
    var startsAt = text.search(VALID_FORMATTED_PHONE_NUMBER_PART);

    if (startsAt < 0) {
        return;
    } // Trim everything to the left of the phone number.

    text = text.slice(startsAt); // Trim the `+`.

    var hasPlus;

    if (text[0] === "+") {
        hasPlus = true;
        text = text.slice("+".length);
    } // Trim everything to the right of the phone number.

    text = text.replace(AFTER_PHONE_NUMBER_DIGITS_END_PATTERN, ""); // Re-add the previously trimmed `+`.

    if (hasPlus) {
        text = "+" + text;
    }

    return text;
}
/**
 * Extracts formatted phone number digits (and a `+`) from text (if there're any).
 * @param  {string} text
 * @return {any[]}
 */

function _extractFormattedDigitsAndPlus(text) {
    // Extract a formatted phone number part from text.
    var extractedNumber = extractFormattedPhoneNumber(text) || ""; // Trim a `+`.

    if (extractedNumber[0] === "+") {
        return [extractedNumber.slice("+".length), true];
    }

    return [extractedNumber];
}
/**
 * Extracts formatted phone number digits (and a `+`) from text (if there're any).
 * @param  {string} text
 * @return {any[]}
 */

function extractFormattedDigitsAndPlus(text) {
    var _extractFormattedDigi3 = _extractFormattedDigitsAndPlus(text),
        _extractFormattedDigi4 = _slicedToArray$1(_extractFormattedDigi3, 2),
        formattedDigits = _extractFormattedDigi4[0],
        hasPlus = _extractFormattedDigi4[1]; // If the extracted phone number part
    // can possibly be a part of some valid phone number
    // then parse phone number characters from a formatted phone number.

    if (!VALID_FORMATTED_PHONE_NUMBER_DIGITS_PART_PATTERN.test(formattedDigits)) {
        formattedDigits = "";
    }

    return [formattedDigits, hasPlus];
}

function _typeof$2(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof$2 = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof$2 = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof$2(obj);
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
}

var AsYouType =
    /*#__PURE__*/
    (function () {
        /**
         * @param {(string|object)?} [optionsOrDefaultCountry] - The default country used for parsing non-international phone numbers. Can also be an `options` object.
         * @param {Object} metadata
         */
        function AsYouType(optionsOrDefaultCountry, metadata) {
            _classCallCheck$1(this, AsYouType);

            this.metadata = new Metadata(metadata);

            var _this$getCountryAndCa = this.getCountryAndCallingCode(optionsOrDefaultCountry),
                _this$getCountryAndCa2 = _slicedToArray(_this$getCountryAndCa, 2),
                defaultCountry = _this$getCountryAndCa2[0],
                defaultCallingCode = _this$getCountryAndCa2[1];

            this.defaultCountry = defaultCountry;
            this.defaultCallingCode = defaultCallingCode;
            this.reset();
        }

        _createClass$1(AsYouType, [
            {
                key: "getCountryAndCallingCode",
                value: function getCountryAndCallingCode(optionsOrDefaultCountry) {
                    // Set `defaultCountry` and `defaultCallingCode` options.
                    var defaultCountry;
                    var defaultCallingCode; // Turns out `null` also has type "object". Weird.

                    if (optionsOrDefaultCountry) {
                        if (_typeof$2(optionsOrDefaultCountry) === "object") {
                            defaultCountry = optionsOrDefaultCountry.defaultCountry;
                            defaultCallingCode = optionsOrDefaultCountry.defaultCallingCode;
                        } else {
                            defaultCountry = optionsOrDefaultCountry;
                        }
                    }

                    if (defaultCountry && !this.metadata.hasCountry(defaultCountry)) {
                        defaultCountry = undefined;
                    }

                    return [defaultCountry, defaultCallingCode];
                },
                /**
                 * Inputs "next" phone number characters.
                 * @param  {string} text
                 * @return {string} Formatted phone number characters that have been input so far.
                 */
            },
            {
                key: "input",
                value: function input(text) {
                    var _this$parser$input = this.parser.input(text, this.state),
                        digits = _this$parser$input.digits,
                        justLeadingPlus = _this$parser$input.justLeadingPlus;

                    if (justLeadingPlus) {
                        this.formattedOutput = "+";
                    } else if (digits) {
                        this.determineTheCountryIfNeeded(); // Match the available formats by the currently available leading digits.

                        if (this.state.nationalSignificantNumber) {
                            this.formatter.narrowDownMatchingFormats(this.state);
                        }

                        var formattedNationalNumber;

                        if (this.metadata.hasSelectedNumberingPlan()) {
                            formattedNationalNumber = this.formatter.format(digits, this.state);
                        }

                        if (formattedNationalNumber === undefined) {
                            // See if another national (significant) number could be re-extracted.
                            if (this.parser.reExtractNationalSignificantNumber(this.state)) {
                                this.determineTheCountryIfNeeded(); // If it could, then re-try formatting the new national (significant) number.

                                var nationalDigits = this.state.getNationalDigits();

                                if (nationalDigits) {
                                    formattedNationalNumber = this.formatter.format(nationalDigits, this.state);
                                }
                            }
                        }

                        this.formattedOutput = formattedNationalNumber
                            ? this.getFullNumber(formattedNationalNumber)
                            : this.getNonFormattedNumber();
                    }

                    return this.formattedOutput;
                },
            },
            {
                key: "reset",
                value: function reset() {
                    var _this = this;

                    this.state = new AsYouTypeState({
                        onCountryChange: function onCountryChange(country) {
                            // Before version `1.6.0`, the official `AsYouType` formatter API
                            // included the `.country` property of an `AsYouType` instance.
                            // Since that property (along with the others) have been moved to
                            // `this.state`, `this.country` property is emulated for compatibility
                            // with the old versions.
                            _this.country = country;
                        },
                        onCallingCodeChange: function onCallingCodeChange(country, callingCode) {
                            _this.metadata.selectNumberingPlan(country, callingCode);

                            _this.formatter.reset(_this.metadata.numberingPlan, _this.state);

                            _this.parser.reset(_this.metadata.numberingPlan);
                        },
                    });
                    this.formatter = new AsYouTypeFormatter({
                        state: this.state,
                        metadata: this.metadata,
                    });
                    this.parser = new AsYouTypeParser({
                        defaultCountry: this.defaultCountry,
                        defaultCallingCode: this.defaultCallingCode,
                        metadata: this.metadata,
                        state: this.state,
                        onNationalSignificantNumberChange: function onNationalSignificantNumberChange() {
                            _this.determineTheCountryIfNeeded();

                            _this.formatter.reset(_this.metadata.numberingPlan, _this.state);
                        },
                    });
                    this.state.reset(this.defaultCountry, this.defaultCallingCode);
                    this.formattedOutput = "";
                    return this;
                },
                /**
                 * Returns `true` if the phone number is being input in international format.
                 * In other words, returns `true` if and only if the parsed phone number starts with a `"+"`.
                 * @return {boolean}
                 */
            },
            {
                key: "isInternational",
                value: function isInternational() {
                    return this.state.international;
                },
                /**
                 * Returns the "country calling code" part of the phone number.
                 * Returns `undefined` if the number is not being input in international format.
                 * Returns "country calling code" for "non-geographic" phone numbering plans too.
                 * @return {string} [callingCode]
                 */
            },
            {
                key: "getCallingCode",
                value: function getCallingCode() {
                    return this.state.callingCode;
                }, // A legacy alias.
            },
            {
                key: "getCountryCallingCode",
                value: function getCountryCallingCode() {
                    return this.getCallingCode();
                },
                /**
                 * Returns a two-letter country code of the phone number.
                 * Returns `undefined` for "non-geographic" phone numbering plans.
                 * Returns `undefined` if no phone number has been input yet.
                 * @return {string} [country]
                 */
            },
            {
                key: "getCountry",
                value: function getCountry() {
                    var _this$state = this.state,
                        digits = _this$state.digits,
                        country = _this$state.country; // If no digits have been input yet,
                    // then `this.country` is the `defaultCountry`.
                    // Won't return the `defaultCountry` in such case.

                    if (!digits) {
                        return;
                    }

                    var countryCode = country;

                    return countryCode;
                },
            },
            {
                key: "determineTheCountryIfNeeded",
                value: function determineTheCountryIfNeeded() {
                    // Suppose a user enters a phone number in international format,
                    // and there're several countries corresponding to that country calling code,
                    // and a country has been derived from the number, and then
                    // a user enters one more digit and the number is no longer
                    // valid for the derived country, so the country should be re-derived
                    // on every new digit in those cases.
                    //
                    // If the phone number is being input in national format,
                    // then it could be a case when `defaultCountry` wasn't specified
                    // when creating `AsYouType` instance, and just `defaultCallingCode` was specified,
                    // and that "calling code" could correspond to a "non-geographic entity",
                    // or there could be several countries corresponding to that country calling code.
                    // In those cases, `this.country` is `undefined` and should be derived
                    // from the number. Again, if country calling code is ambiguous, then
                    // `this.country` should be re-derived with each new digit.
                    //
                    if (!this.state.country || this.isCountryCallingCodeAmbiguous()) {
                        this.determineTheCountry();
                    }
                }, // Prepends `+CountryCode ` in case of an international phone number
            },
            {
                key: "getFullNumber",
                value: function getFullNumber(formattedNationalNumber) {
                    var _this2 = this;

                    if (this.isInternational()) {
                        var prefix = function prefix(text) {
                            return (
                                _this2.formatter.getInternationalPrefixBeforeCountryCallingCode(_this2.state, {
                                    spacing: text ? true : false,
                                }) + text
                            );
                        };

                        var callingCode = this.state.callingCode;

                        if (!callingCode) {
                            return prefix("".concat(this.state.getDigitsWithoutInternationalPrefix()));
                        }

                        if (!formattedNationalNumber) {
                            return prefix(callingCode);
                        }

                        return prefix("".concat(callingCode, " ").concat(formattedNationalNumber));
                    }

                    return formattedNationalNumber;
                },
            },
            {
                key: "getNonFormattedNationalNumberWithPrefix",
                value: function getNonFormattedNationalNumberWithPrefix() {
                    var _this$state2 = this.state,
                        nationalSignificantNumber = _this$state2.nationalSignificantNumber,
                        complexPrefixBeforeNationalSignificantNumber =
                            _this$state2.complexPrefixBeforeNationalSignificantNumber,
                        nationalPrefix = _this$state2.nationalPrefix;
                    var number = nationalSignificantNumber;
                    var prefix = complexPrefixBeforeNationalSignificantNumber || nationalPrefix;

                    if (prefix) {
                        number = prefix + number;
                    }

                    return number;
                },
            },
            {
                key: "getNonFormattedNumber",
                value: function getNonFormattedNumber() {
                    var nationalSignificantNumberMatchesInput = this.state.nationalSignificantNumberMatchesInput;
                    return this.getFullNumber(
                        nationalSignificantNumberMatchesInput
                            ? this.getNonFormattedNationalNumberWithPrefix()
                            : this.state.getNationalDigits()
                    );
                },
            },
            {
                key: "getNonFormattedTemplate",
                value: function getNonFormattedTemplate() {
                    var number = this.getNonFormattedNumber();

                    if (number) {
                        return number.replace(/[\+\d]/g, DIGIT_PLACEHOLDER);
                    }
                },
            },
            {
                key: "isCountryCallingCodeAmbiguous",
                value: function isCountryCallingCodeAmbiguous() {
                    var callingCode = this.state.callingCode;
                    var countryCodes = this.metadata.getCountryCodesForCallingCode(callingCode);
                    return countryCodes && countryCodes.length > 1;
                }, // Determines the country of the phone number
                // entered so far based on the country phone code
                // and the national phone number.
            },
            {
                key: "determineTheCountry",
                value: function determineTheCountry() {
                    this.state.setCountry(
                        getCountryByCallingCode(
                            this.isInternational() ? this.state.callingCode : this.defaultCallingCode,
                            this.state.nationalSignificantNumber,
                            this.metadata
                        )
                    );
                },
                /**
                 * Returns an instance of `PhoneNumber` class.
                 * Will return `undefined` if no national (significant) number
                 * digits have been entered so far, or if no `defaultCountry` has been
                 * set and the user enters a phone number not in international format.
                 */
            },
            {
                key: "getNumber",
                value: function getNumber() {
                    var _this$state3 = this.state,
                        nationalSignificantNumber = _this$state3.nationalSignificantNumber,
                        carrierCode = _this$state3.carrierCode;

                    if (this.isInternational()) {
                        if (!this.state.callingCode) {
                            return;
                        }
                    } else {
                        if (!this.state.country && !this.defaultCallingCode) {
                            return;
                        }
                    }

                    if (!nationalSignificantNumber) {
                        return;
                    }

                    var countryCode = this.getCountry();
                    var callingCode = this.getCountryCallingCode() || this.defaultCallingCode;
                    var phoneNumber = new PhoneNumber(
                        countryCode || callingCode,
                        nationalSignificantNumber,
                        this.metadata.metadata
                    );

                    if (carrierCode) {
                        phoneNumber.carrierCode = carrierCode;
                    } // Phone number extensions are not supported by "As You Type" formatter.

                    return phoneNumber;
                },
                /**
                 * Returns `true` if the phone number is "possible".
                 * Is just a shortcut for `PhoneNumber.isPossible()`.
                 * @return {boolean}
                 */
            },
            {
                key: "isPossible",
                value: function isPossible() {
                    var phoneNumber = this.getNumber();

                    if (!phoneNumber) {
                        return false;
                    }

                    return phoneNumber.isPossible();
                },
                /**
                 * Returns `true` if the phone number is "valid".
                 * Is just a shortcut for `PhoneNumber.isValid()`.
                 * @return {boolean}
                 */
            },
            {
                key: "isValid",
                value: function isValid() {
                    var phoneNumber = this.getNumber();

                    if (!phoneNumber) {
                        return false;
                    }

                    return phoneNumber.isValid();
                },
                /**
                 * @deprecated
                 * This method is used in `react-phone-number-input/source/input-control.js`
                 * in versions before `3.0.16`.
                 */
            },
            {
                key: "getNationalNumber",
                value: function getNationalNumber() {
                    return this.state.nationalSignificantNumber;
                },
                /**
                 * Returns the phone number characters entered by the user.
                 * @return {string}
                 */
            },
            {
                key: "getChars",
                value: function getChars() {
                    return (this.state.international ? "+" : "") + this.state.digits;
                },
                /**
                 * Returns the template for the formatted phone number.
                 * @return {string}
                 */
            },
            {
                key: "getTemplate",
                value: function getTemplate() {
                    return this.formatter.getTemplate(this.state) || this.getNonFormattedTemplate() || "";
                },
            },
        ]);

        return AsYouType;
    })();

function getCountries(metadata) {
    return new Metadata(metadata).getCountries();
}

/**
 * Formats a (possibly incomplete) phone number.
 * The phone number can be either in E.164 format
 * or in a form of national number digits.
 * @param {string} value - A possibly incomplete phone number. Either in E.164 format or in a form of national number digits.
 * @param {string?} country - Two-letter ("ISO 3166-1 alpha-2") country code.
 * @return {string} Formatted (possibly incomplete) phone number.
 */

function formatIncompletePhoneNumber(value, country, metadata) {
    if (!metadata) {
        metadata = country;
        country = undefined;
    }

    return new AsYouType(country, metadata).input(value);
}

function getInputValuePrefix(_ref) {
    var country = _ref.country,
        international = _ref.international,
        withCountryCallingCode = _ref.withCountryCallingCode,
        metadata = _ref.metadata;
    return country && international && !withCountryCallingCode
        ? "+".concat(getCountryCallingCode(country, metadata))
        : "";
}
function removeInputValuePrefix(value, prefix) {
    if (prefix) {
        value = value.slice(prefix.length);

        if (value[0] === " ") {
            value = value.slice(1);
        }
    }

    return value;
}

function _extends$6() {
    _extends$6 =
        Object.assign ||
        function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends$6.apply(this, arguments);
}

function _objectWithoutProperties$5(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$5(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

function _objectWithoutPropertiesLoose$5(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function createInput$1(defaultMetadata) {
    /**
     * `InputSmart` is a "smarter" implementation of a `Component`
     * that can be passed to `<PhoneInput/>`. It parses and formats
     * the user's and maintains the caret's position in the process.
     * The caret positioning is maintained using `input-format` library.
     * Relies on being run in a DOM environment for calling caret positioning functions.
     */
    function InputSmart(_ref, ref) {
        var country = _ref.country,
            international = _ref.international,
            withCountryCallingCode = _ref.withCountryCallingCode,
            metadata = _ref.metadata,
            rest = _objectWithoutProperties$5(_ref, ["country", "international", "withCountryCallingCode", "metadata"]);

        var format = React.useCallback(
            function (value) {
                // "As you type" formatter.
                var formatter = new AsYouType(country, metadata);
                var prefix = getInputValuePrefix({
                    country: country,
                    international: international,
                    withCountryCallingCode: withCountryCallingCode,
                    metadata: metadata,
                }); // Format the number.

                var text = formatter.input(prefix + value);
                var template = formatter.getTemplate();

                if (prefix) {
                    text = removeInputValuePrefix(text, prefix); // `AsYouType.getTemplate()` can be `undefined`.

                    if (template) {
                        template = removeInputValuePrefix(template, prefix);
                    }
                }

                return {
                    text: text,
                    template: template,
                };
            },
            [country, metadata]
        );
        return React.createElement(
            Input$1,
            _extends$6({}, rest, {
                ref: ref,
                parse: parsePhoneNumberCharacter,
                format: format,
            })
        );
    }

    InputSmart = React.forwardRef(InputSmart);
    InputSmart.propTypes = {
        /**
         * The parsed phone number.
         * "Parsed" not in a sense of "E.164"
         * but rather in a sense of "having only
         * digits and possibly a leading plus character".
         * Examples: `""`, `"+"`, `"+123"`, `"123"`.
         */
        value: propTypes.exports.string.isRequired,

        /**
         * A function of `value: string`.
         * Updates the `value` property.
         */
        onChange: propTypes.exports.func.isRequired,

        /**
         * A two-letter country code for formatting `value`
         * as a national phone number (e.g. `(800) 555 35 35`).
         * E.g. "US", "RU", etc.
         * If no `country` is passed then `value`
         * is formatted as an international phone number.
         * (e.g. `+7 800 555 35 35`)
         * Perhaps the `country` property should have been called `defaultCountry`
         * because if `value` is an international number then `country` is ignored.
         */
        country: propTypes.exports.string,

        /**
         * If `country` property is passed along with `international={true}` property
         * then the phone number will be input in "international" format for that `country`
         * (without "country calling code").
         * For example, if `country="US"` property is passed to "without country select" input
         * then the phone number will be input in the "national" format for `US` (`(213) 373-4253`).
         * But if both `country="US"` and `international={true}` properties are passed then
         * the phone number will be input in the "international" format for `US` (`213 373 4253`)
         * (without "country calling code" `+1`).
         */
        international: propTypes.exports.bool,

        /**
         * If `country` and `international` properties are set,
         * then by default it won't include "country calling code" in the input field.
         * To change that, pass `withCountryCallingCode` property,
         * and it will include "country calling code" in the input field.
         */
        withCountryCallingCode: propTypes.exports.bool,

        /**
         * `libphonenumber-js` metadata.
         */
        metadata: propTypes.exports.object.isRequired,
    };
    InputSmart.defaultProps = {
        metadata: defaultMetadata,
    };
    return InputSmart;
}
var InputSmart = createInput$1();

function _extends$5() {
    _extends$5 =
        Object.assign ||
        function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends$5.apply(this, arguments);
}

function _objectWithoutProperties$4(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$4(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

function _objectWithoutPropertiesLoose$4(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function createInput(defaultMetadata) {
    /**
     * `InputBasic` is the most basic implementation of a `Component`
     * that can be passed to `<PhoneInput/>`. It parses and formats
     * the user's input but doesn't control the caret in the process:
     * when erasing or inserting digits in the middle of a phone number
     * the caret usually jumps to the end (this is the expected behavior).
     * Why does `InputBasic` exist when there's `InputSmart`?
     * One reason is working around the [Samsung Galaxy smart caret positioning bug]
     * (https://github.com/catamphetamine/react-phone-number-input/issues/75).
     * Another reason is that, unlike `InputSmart`, it doesn't require DOM environment.
     */
    function InputBasic(_ref, ref) {
        var value = _ref.value,
            onChange = _ref.onChange,
            country = _ref.country,
            international = _ref.international,
            withCountryCallingCode = _ref.withCountryCallingCode,
            metadata = _ref.metadata,
            Input = _ref.inputComponent,
            rest = _objectWithoutProperties$4(_ref, [
                "value",
                "onChange",
                "country",
                "international",
                "withCountryCallingCode",
                "metadata",
                "inputComponent",
            ]);

        var prefix = getInputValuePrefix({
            country: country,
            international: international,
            withCountryCallingCode: withCountryCallingCode,
            metadata: metadata,
        });

        var _onChange = React.useCallback(
            function (event) {
                var newValue = parseIncompletePhoneNumber(event.target.value); // By default, if a value is something like `"(123)"`
                // then Backspace would only erase the rightmost brace
                // becoming something like `"(123"`
                // which would give the same `"123"` value
                // which would then be formatted back to `"(123)"`
                // and so a user wouldn't be able to erase the phone number.
                // Working around this issue with this simple hack.

                if (newValue === value) {
                    var newValueFormatted = format(prefix, newValue, country, metadata);

                    if (newValueFormatted.indexOf(event.target.value) === 0) {
                        // Trim the last digit (or plus sign).
                        newValue = newValue.slice(0, -1);
                    }
                }

                onChange(newValue);
            },
            [prefix, value, onChange, country, metadata]
        );

        return React.createElement(
            Input,
            _extends$5({}, rest, {
                ref: ref,
                value: format(prefix, value, country, metadata),
                onChange: _onChange,
            })
        );
    }

    InputBasic = React.forwardRef(InputBasic);
    InputBasic.propTypes = {
        /**
         * The parsed phone number.
         * "Parsed" not in a sense of "E.164"
         * but rather in a sense of "having only
         * digits and possibly a leading plus character".
         * Examples: `""`, `"+"`, `"+123"`, `"123"`.
         */
        value: propTypes.exports.string.isRequired,

        /**
         * A function of `value: string`.
         * Updates the `value` property.
         */
        onChange: propTypes.exports.func.isRequired,

        /**
         * A two-letter country code for formatting `value`
         * as a national phone number (e.g. `(800) 555 35 35`).
         * E.g. "US", "RU", etc.
         * If no `country` is passed then `value`
         * is formatted as an international phone number.
         * (e.g. `+7 800 555 35 35`)
         * Perhaps the `country` property should have been called `defaultCountry`
         * because if `value` is an international number then `country` is ignored.
         */
        country: propTypes.exports.string,

        /**
         * If `country` property is passed along with `international={true}` property
         * then the phone number will be input in "international" format for that `country`
         * (without "country calling code").
         * For example, if `country="US"` property is passed to "without country select" input
         * then the phone number will be input in the "national" format for `US` (`(213) 373-4253`).
         * But if both `country="US"` and `international={true}` properties are passed then
         * the phone number will be input in the "international" format for `US` (`213 373 4253`)
         * (without "country calling code" `+1`).
         */
        international: propTypes.exports.bool,

        /**
         * If `country` and `international` properties are set,
         * then by default it won't include "country calling code" in the input field.
         * To change that, pass `withCountryCallingCode` property,
         * and it will include "country calling code" in the input field.
         */
        withCountryCallingCode: propTypes.exports.bool,

        /**
         * `libphonenumber-js` metadata.
         */
        metadata: propTypes.exports.object.isRequired,

        /**
         * The `<input/>` component.
         */
        inputComponent: propTypes.exports.elementType.isRequired,
    };
    InputBasic.defaultProps = {
        metadata: defaultMetadata,
        inputComponent: "input",
    };
    return InputBasic;
}
var InputBasic = createInput();

function format(prefix, value, country, metadata) {
    return removeInputValuePrefix(formatIncompletePhoneNumber(prefix + value, country, metadata), prefix);
}

/**
 * Creates Unicode flag from a two-letter ISO country code.
 * https://stackoverflow.com/questions/24050671/how-to-put-japan-flag-character-in-a-string
 * @param  {string} country — A two-letter ISO country code (case-insensitive).
 * @return {string}
 */
function getCountryFlag(country) {
    return getRegionalIndicatorSymbol(country[0]) + getRegionalIndicatorSymbol(country[1]);
}
/**
 * Converts a letter to a Regional Indicator Symbol.
 * @param  {string} letter
 * @return {string}
 */

function getRegionalIndicatorSymbol(letter) {
    return String.fromCodePoint(0x1f1e6 - 65 + letter.toUpperCase().charCodeAt(0));
}

function _extends$4() {
    _extends$4 =
        Object.assign ||
        function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends$4.apply(this, arguments);
}

function _objectWithoutProperties$3(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$3(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

function _objectWithoutPropertiesLoose$3(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function CountrySelect(_ref) {
    var value = _ref.value,
        onChange = _ref.onChange,
        options = _ref.options,
        rest = _objectWithoutProperties$3(_ref, ["value", "onChange", "options"]);

    var onChange_ = React.useCallback(
        function (event) {
            var value = event.target.value;
            onChange(value === "ZZ" ? undefined : value);
        },
        [onChange]
    );
    React.useMemo(
        function () {
            return getSelectedOption(options, value);
        },
        [options, value]
    ); // "ZZ" means "International".
    // (HTML requires each `<option/>` have some string `value`).

    return React.createElement(
        "select",
        _extends$4({}, rest, {
            value: value || "ZZ",
            onChange: onChange_,
        }),
        options.map(function (_ref2) {
            var value = _ref2.value,
                label = _ref2.label,
                divider = _ref2.divider;
            return React.createElement(
                "option",
                {
                    key: divider ? "|" : value || "ZZ",
                    value: divider ? "|" : value || "ZZ",
                    disabled: divider ? true : false,
                    style: divider ? DIVIDER_STYLE : undefined,
                },
                label
            );
        })
    );
}
CountrySelect.propTypes = {
    /**
     * A two-letter country code.
     * Example: "US", "RU", etc.
     */
    value: propTypes.exports.string,

    /**
     * A function of `value: string`.
     * Updates the `value` property.
     */
    onChange: propTypes.exports.func.isRequired,
    // `<select/>` options.
    options: propTypes.exports.arrayOf(
        propTypes.exports.shape({
            value: propTypes.exports.string,
            label: propTypes.exports.string,
            divider: propTypes.exports.bool,
        })
    ).isRequired,
};
var DIVIDER_STYLE = {
    fontSize: "1px",
    backgroundColor: "currentColor",
    color: "inherit",
};
function CountrySelectWithIcon(_ref3) {
    var value = _ref3.value,
        options = _ref3.options,
        className = _ref3.className,
        Icon = _ref3.iconComponent;
    _ref3.getIconAspectRatio;
    var Arrow = _ref3.arrowComponent,
        unicodeFlags = _ref3.unicodeFlags,
        rest = _objectWithoutProperties$3(_ref3, [
            "value",
            "options",
            "className",
            "iconComponent",
            "getIconAspectRatio",
            "arrowComponent",
            "unicodeFlags",
        ]);

    var selectedOption = React.useMemo(
        function () {
            return getSelectedOption(options, value);
        },
        [options, value]
    );
    return React.createElement(
        "div",
        {
            className: "PhoneInputCountry",
        },
        React.createElement(
            CountrySelect,
            _extends$4({}, rest, {
                value: value,
                options: options,
                className: classNames("PhoneInputCountrySelect", className),
            })
        ),
        unicodeFlags &&
            value &&
            React.createElement(
                "div",
                {
                    className: "PhoneInputCountryIconUnicode",
                },
                getCountryFlag(value)
            ),
        !(unicodeFlags && value) &&
            React.createElement(Icon, {
                country: value,
                label: selectedOption && selectedOption.label,
                aspectRatio: unicodeFlags ? 1 : undefined,
            }),
        React.createElement(Arrow, null)
    );
}
CountrySelectWithIcon.propTypes = {
    // Country flag component.
    iconComponent: propTypes.exports.elementType,
    // Select arrow component.
    arrowComponent: propTypes.exports.elementType.isRequired,
    // Set to `true` to render Unicode flag icons instead of SVG images.
    unicodeFlags: propTypes.exports.bool,
};
CountrySelectWithIcon.defaultProps = {
    arrowComponent: function arrowComponent() {
        return React.createElement("div", {
            className: "PhoneInputCountrySelectArrow",
        });
    },
};

function getSelectedOption(options, value) {
    for (
        var _iterator = options,
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
        ;

    ) {
        var _ref4;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref4 = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref4 = _i.value;
        }

        var option = _ref4;

        if (!option.divider && option.value === value) {
            return option;
        }
    }
}

function _extends$3() {
    _extends$3 =
        Object.assign ||
        function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends$3.apply(this, arguments);
}

function _objectWithoutProperties$2(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$2(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

function _objectWithoutPropertiesLoose$2(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
// `<img/>` is wrapped in a `<div/>` to prevent SVGs from exploding in size in IE 11.
// https://github.com/catamphetamine/react-phone-number-input/issues/111

function FlagComponent(_ref) {
    var country = _ref.country,
        countryName = _ref.countryName,
        flags = _ref.flags,
        flagUrl = _ref.flagUrl,
        rest = _objectWithoutProperties$2(_ref, ["country", "countryName", "flags", "flagUrl"]);

    if (flags && flags[country]) {
        return flags[country]({
            title: countryName,
        });
    }

    return React.createElement(
        "img",
        _extends$3({}, rest, {
            alt: countryName,
            role: countryName ? undefined : "presentation",
            src: flagUrl.replace("{XX}", country).replace("{xx}", country.toLowerCase()),
        })
    );
}
FlagComponent.propTypes = {
    // The country to be selected by default.
    // Two-letter country code ("ISO 3166-1 alpha-2").
    country: propTypes.exports.string.isRequired,
    // Will be HTML `title` attribute of the `<img/>`.
    countryName: propTypes.exports.string.isRequired,
    // Country flag icon components.
    // By default flag icons are inserted as `<img/>`s
    // with their `src` pointed to `country-flag-icons` gitlab pages website.
    // There might be cases (e.g. an offline application)
    // where having a large (3 megabyte) `<svg/>` flags
    // bundle is more appropriate.
    // `import flags from 'react-phone-number-input/flags'`.
    flags: propTypes.exports.objectOf(propTypes.exports.elementType),
    // A URL for a country flag icon.
    // By default it points to `country-flag-icons` gitlab pages website.
    flagUrl: propTypes.exports.string.isRequired,
};

function _extends$2() {
    _extends$2 =
        Object.assign ||
        function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends$2.apply(this, arguments);
}

function _objectWithoutProperties$1(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose$1(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

function _objectWithoutPropertiesLoose$1(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function InternationalIcon(_ref) {
    var aspectRatio = _ref.aspectRatio,
        rest = _objectWithoutProperties$1(_ref, ["aspectRatio"]);

    if (aspectRatio === 1) {
        return React.createElement(InternationalIcon1x1, rest);
    } else {
        return React.createElement(InternationalIcon3x2, rest);
    }
}
InternationalIcon.propTypes = {
    title: propTypes.exports.string.isRequired,
    aspectRatio: propTypes.exports.number,
}; // 3x2.
// Using `<title/>` in `<svg/>`s:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title

function InternationalIcon3x2(_ref2) {
    var title = _ref2.title,
        rest = _objectWithoutProperties$1(_ref2, ["title"]);

    return React.createElement(
        "svg",
        _extends$2({}, rest, {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 75 50",
        }),
        React.createElement("title", null, title),
        React.createElement(
            "g",
            {
                className: "PhoneInputInternationalIconGlobe",
                stroke: "currentColor",
                fill: "none",
                strokeWidth: "2",
                strokeMiterlimit: "10",
            },
            React.createElement("path", {
                strokeLinecap: "round",
                d: "M47.2,36.1C48.1,36,49,36,50,36c7.4,0,14,1.7,18.5,4.3",
            }),
            React.createElement("path", {
                d: "M68.6,9.6C64.2,12.3,57.5,14,50,14c-7.4,0-14-1.7-18.5-4.3",
            }),
            React.createElement("line", {
                x1: "26",
                y1: "25",
                x2: "74",
                y2: "25",
            }),
            React.createElement("line", {
                x1: "50",
                y1: "1",
                x2: "50",
                y2: "49",
            }),
            React.createElement("path", {
                strokeLinecap: "round",
                d: "M46.3,48.7c1.2,0.2,2.5,0.3,3.7,0.3c13.3,0,24-10.7,24-24S63.3,1,50,1S26,11.7,26,25c0,2,0.3,3.9,0.7,5.8",
            }),
            React.createElement("path", {
                strokeLinecap: "round",
                d: "M46.8,48.2c1,0.6,2.1,0.8,3.2,0.8c6.6,0,12-10.7,12-24S56.6,1,50,1S38,11.7,38,25c0,1.4,0.1,2.7,0.2,4c0,0.1,0,0.2,0,0.2",
            })
        ),
        React.createElement("path", {
            className: "PhoneInputInternationalIconPhone",
            stroke: "none",
            fill: "currentColor",
            d: "M12.4,17.9c2.9-2.9,5.4-4.8,0.3-11.2S4.1,5.2,1.3,8.1C-2,11.4,1.1,23.5,13.1,35.6s24.3,15.2,27.5,11.9c2.8-2.8,7.8-6.3,1.4-11.5s-8.3-2.6-11.2,0.3c-2,2-7.2-2.2-11.7-6.7S10.4,19.9,12.4,17.9z",
        })
    );
}

InternationalIcon3x2.propTypes = {
    title: propTypes.exports.string.isRequired,
}; // 1x1.
// Using `<title/>` in `<svg/>`s:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title

function InternationalIcon1x1(_ref3) {
    var title = _ref3.title,
        rest = _objectWithoutProperties$1(_ref3, ["title"]);

    return React.createElement(
        "svg",
        _extends$2({}, rest, {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 50 50",
        }),
        React.createElement("title", null, title),
        React.createElement(
            "g",
            {
                className: "PhoneInputInternationalIconGlobe",
                stroke: "currentColor",
                fill: "none",
                strokeWidth: "2",
                strokeLinecap: "round",
            },
            React.createElement("path", {
                d: "M8.45,13A21.44,21.44,0,1,1,37.08,41.56",
            }),
            React.createElement("path", {
                d: "M19.36,35.47a36.9,36.9,0,0,1-2.28-13.24C17.08,10.39,21.88.85,27.8.85s10.72,9.54,10.72,21.38c0,6.48-1.44,12.28-3.71,16.21",
            }),
            React.createElement("path", {
                d: "M17.41,33.4A39,39,0,0,1,27.8,32.06c6.62,0,12.55,1.5,16.48,3.86",
            }),
            React.createElement("path", {
                d: "M44.29,8.53c-3.93,2.37-9.86,3.88-16.49,3.88S15.25,10.9,11.31,8.54",
            }),
            React.createElement("line", {
                x1: "27.8",
                y1: "0.85",
                x2: "27.8",
                y2: "34.61",
            }),
            React.createElement("line", {
                x1: "15.2",
                y1: "22.23",
                x2: "49.15",
                y2: "22.23",
            })
        ),
        React.createElement("path", {
            className: "PhoneInputInternationalIconPhone",
            stroke: "transparent",
            fill: "currentColor",
            d: "M9.42,26.64c2.22-2.22,4.15-3.59.22-8.49S3.08,17,.93,19.17c-2.49,2.48-.13,11.74,9,20.89s18.41,11.5,20.89,9c2.15-2.15,5.91-4.77,1-8.71s-6.27-2-8.49.22c-1.55,1.55-5.48-1.69-8.86-5.08S7.87,28.19,9.42,26.64Z",
        })
    );
}

InternationalIcon1x1.propTypes = {
    title: propTypes.exports.string.isRequired,
};

/**
 * Sorts country `<select/>` options.
 * Can move some country `<select/>` options
 * to the top of the list, for example.
 * @param  {object[]} countryOptions — Country `<select/>` options.
 * @param  {string[]} [countryOptionsOrder] — Country `<select/>` options order. Example: `["US", "CA", "AU", "|", "..."]`.
 * @return {object[]}
 */

function sortCountryOptions(options, order) {
    if (!order) {
        return options;
    }

    var optionsOnTop = [];
    var optionsOnBottom = [];
    var appendTo = optionsOnTop;

    for (
        var _iterator = order,
            _isArray = Array.isArray(_iterator),
            _i = 0,
            _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
        ;

    ) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var element = _ref;

        if (element === "|") {
            appendTo.push({
                divider: true,
            });
        } else if (element === "..." || element === "…") {
            appendTo = optionsOnBottom;
        } else {
            (function () {
                var countryCode = void 0;

                if (element === "🌐") {
                    countryCode = undefined;
                } else {
                    countryCode = element;
                } // Find the position of the option.

                var index = options.indexOf(
                    options.filter(function (option) {
                        return option.value === countryCode;
                    })[0]
                ); // Get the option.

                var option = options[index]; // Remove the option from its default position.

                options.splice(index, 1); // Add the option on top.

                appendTo.push(option);
            })();
        }
    }

    return optionsOnTop.concat(options).concat(optionsOnBottom);
}
function getSupportedCountryOptions(countryOptions, metadata) {
    if (countryOptions) {
        countryOptions = countryOptions.filter(function (option) {
            switch (option) {
                case "🌐":
                case "|":
                case "...":
                case "…":
                    return true;

                default:
                    return isCountrySupportedWithError(option, metadata);
            }
        });

        if (countryOptions.length > 0) {
            return countryOptions;
        }
    }
}
function isCountrySupportedWithError(country, metadata) {
    if (isSupportedCountry(country, metadata)) {
        return true;
    } else {
        console.error("Country not found: ".concat(country));
        return false;
    }
}
function getSupportedCountries(countries, metadata) {
    if (countries) {
        countries = countries.filter(function (country) {
            return isCountrySupportedWithError(country, metadata);
        });

        if (countries.length === 0) {
            countries = undefined;
        }
    }

    return countries;
}

function createCountryIconComponent(_ref) {
    var flags = _ref.flags,
        flagUrl = _ref.flagUrl,
        FlagComponent = _ref.flagComponent,
        InternationalIcon$1 = _ref.internationalIcon;

    function CountryIcon(_ref2) {
        var country = _ref2.country,
            label = _ref2.label,
            aspectRatio = _ref2.aspectRatio;

        // `aspectRatio` is currently a hack for the default "International" icon
        // to render it as a square when Unicode flag icons are used.
        // So `aspectRatio` property is only used with the default "International" icon.
        var _aspectRatio = InternationalIcon$1 === InternationalIcon ? aspectRatio : undefined;

        return React.createElement(
            "div",
            {
                className: classNames("PhoneInputCountryIcon", {
                    "PhoneInputCountryIcon--square": _aspectRatio === 1,
                    "PhoneInputCountryIcon--border": country,
                }),
            },
            country
                ? React.createElement(FlagComponent, {
                      country: country,
                      countryName: label,
                      flags: flags,
                      flagUrl: flagUrl,
                      className: "PhoneInputCountryIconImg",
                  })
                : React.createElement(InternationalIcon$1, {
                      title: label,
                      aspectRatio: _aspectRatio,
                      className: "PhoneInputCountryIconImg",
                  })
        );
    }

    CountryIcon.propTypes = {
        country: propTypes.exports.string,
        label: propTypes.exports.string.isRequired,
        aspectRatio: propTypes.exports.number,
    };
    return CountryIcon;
}
createCountryIconComponent({
    // Must be equal to `defaultProps.flagUrl` in `./PhoneInputWithCountry.js`.
    flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg",
    flagComponent: FlagComponent,
    internationalIcon: InternationalIcon,
});

var metadata = propTypes.exports.shape({
    country_calling_codes: propTypes.exports.object.isRequired,
    countries: propTypes.exports.object.isRequired,
});
var labels$1 = propTypes.exports.objectOf(propTypes.exports.string);

var ONLY_DIGITS_REGEXP = /^\d+$/;
function getInternationalPhoneNumberPrefix(country, metadata) {
    // Standard international phone number prefix: "+" and "country calling code".
    var prefix = "+" + getCountryCallingCode(country, metadata); // Get "leading digits" for a phone number of the country.
    // If there're "leading digits" then they can be part of the prefix too.

    metadata = new Metadata(metadata);
    metadata.selectNumberingPlan(country);

    if (metadata.numberingPlan.leadingDigits() && ONLY_DIGITS_REGEXP.test(metadata.numberingPlan.leadingDigits())) {
        prefix += metadata.numberingPlan.leadingDigits();
    }

    return prefix;
}

/**
 * Decides which country should be pre-selected
 * when the phone number input component is first mounted.
 * @param  {object?} phoneNumber - An instance of `PhoneNumber` class.
 * @param  {string?} country - Pre-defined country (two-letter code).
 * @param  {string[]?} countries - A list of countries available.
 * @param  {object} metadata - `libphonenumber-js` metadata
 * @return {string?}
 */

function getPreSelectedCountry(_ref) {
    var value = _ref.value,
        phoneNumber = _ref.phoneNumber,
        defaultCountry = _ref.defaultCountry,
        getAnyCountry = _ref.getAnyCountry,
        countries = _ref.countries,
        required = _ref.required,
        metadata = _ref.metadata;
    var country; // If can get country from E.164 phone number
    // then it overrides the `country` passed (or not passed).

    if (phoneNumber && phoneNumber.country) {
        // `country` will be left `undefined` in case of non-detection.
        country = phoneNumber.country;
    } else if (defaultCountry) {
        if (!value || couldNumberBelongToCountry(value, defaultCountry, metadata)) {
            country = defaultCountry;
        }
    } // Only pre-select a country if it's in the available `countries` list.

    if (countries && countries.indexOf(country) < 0) {
        country = undefined;
    } // If there will be no "International" option
    // then some `country` must be selected.
    // It will still be the wrong country though.
    // But still country `<select/>` can't be left in a broken state.

    if (!country && required && countries && countries.length > 0) {
        country = getAnyCountry(); // noCountryMatchesTheNumber = true
    }

    return country;
}
/**
 * Generates a sorted list of country `<select/>` options.
 * @param  {string[]} countries - A list of two-letter ("ISO 3166-1 alpha-2") country codes.
 * @param  {object} labels - Custom country labels. E.g. `{ RU: 'Россия', US: 'США', ... }`.
 * @param  {boolean} addInternationalOption - Whether should include "International" option at the top of the list.
 * @return {object[]} A list of objects having shape `{ value : string, label : string }`.
 */

function getCountrySelectOptions(_ref2) {
    var countries = _ref2.countries,
        countryNames = _ref2.countryNames,
        addInternationalOption = _ref2.addInternationalOption,
        compareStringsLocales = _ref2.compareStringsLocales,
        _compareStrings = _ref2.compareStrings;

    // Default country name comparator uses `String.localeCompare()`.
    if (!_compareStrings) {
        _compareStrings = compareStrings;
    } // Generates a `<Select/>` option for each country.

    var countrySelectOptions = countries.map(function (country) {
        return {
            value: country,
            // All `locale` country names included in this library
            // include all countries (this is checked at build time).
            // The only case when a country name might be missing
            // is when a developer supplies their own `labels` property.
            // To guard against such cases, a missing country name
            // is substituted by country code.
            label: countryNames[country] || country,
        };
    }); // Sort the list of countries alphabetically.

    countrySelectOptions.sort(function (a, b) {
        return _compareStrings(a.label, b.label, compareStringsLocales);
    }); // Add the "International" option to the country list (if suitable)

    if (addInternationalOption) {
        countrySelectOptions.unshift({
            label: countryNames.ZZ,
        });
    }

    return countrySelectOptions;
}
/**
 * Parses a E.164 phone number to an instance of `PhoneNumber` class.
 * @param {string?} value = E.164 phone number.
 * @param  {object} metadata - `libphonenumber-js` metadata
 * @return {object} Object having shape `{ country: string?, countryCallingCode: string, number: string }`. `PhoneNumber`: https://gitlab.com/catamphetamine/libphonenumber-js#phonenumber.
 * @example
 * parsePhoneNumber('+78005553535')
 */

function parsePhoneNumber(value, metadata) {
    return parsePhoneNumberFromString(value || "", metadata);
}
/**
 * Generates national number digits for a parsed phone.
 * May prepend national prefix.
 * The phone number must be a complete and valid phone number.
 * @param  {object} phoneNumber - An instance of `PhoneNumber` class.
 * @param  {object} metadata - `libphonenumber-js` metadata
 * @return {string}
 * @example
 * getNationalNumberDigits({ country: 'RU', phone: '8005553535' })
 * // returns '88005553535'
 */

function generateNationalNumberDigits(phoneNumber) {
    return phoneNumber.formatNational().replace(/\D/g, "");
}
/**
 * Migrates parsed `<input/>` `value` for the newly selected `country`.
 * @param {string?} phoneDigits - Phone number digits (and `+`) parsed from phone number `<input/>` (it's not the same as the `value` property).
 * @param {string?} prevCountry - Previously selected country.
 * @param {string?} newCountry - Newly selected country. Can't be same as previously selected country.
 * @param {object} metadata - `libphonenumber-js` metadata.
 * @param {boolean} useNationalFormat - whether should attempt to convert from international to national number for the new country.
 * @return {string?}
 */

function getPhoneDigitsForNewCountry(phoneDigits, _ref3) {
    var prevCountry = _ref3.prevCountry,
        newCountry = _ref3.newCountry,
        metadata = _ref3.metadata,
        useNationalFormat = _ref3.useNationalFormat;

    // If `parsed_input` is empty
    // then no need to migrate anything.
    if (!phoneDigits) {
        if (useNationalFormat) {
            return "";
        } else {
            // If `phoneDigits` is empty then set `phoneDigits` to
            // `+{getCountryCallingCode(newCountry)}`.
            return getInternationalPhoneNumberPrefix(newCountry, metadata);
        }
    } // If switching to some country.
    // (from "International" or another country)
    // If switching from "International" then `phoneDigits` starts with a `+`.
    // Otherwise it may or may not start with a `+`.

    if (newCountry) {
        // If the phone number was entered in international format
        // then migrate it to the newly selected country.
        // The phone number may be incomplete.
        // The phone number entered not necessarily starts with
        // the previously selected country phone prefix.
        if (phoneDigits[0] === "+") {
            // If the international phone number is for the new country
            // then convert it to local if required.
            if (useNationalFormat) {
                // // If a phone number is being input in international form
                // // and the country can already be derived from it,
                // // and if it is the new country, then format as a national number.
                // const derived_country = getCountryFromPossiblyIncompleteInternationalPhoneNumber(phoneDigits, metadata)
                // if (derived_country === newCountry) {
                // 	return stripCountryCallingCode(phoneDigits, derived_country, metadata)
                // }
                // Actually, the two countries don't necessarily need to match:
                // the condition could be looser here, because several countries
                // might share the same international phone number format
                // (for example, "NANPA" countries like US, Canada, etc).
                // The looser condition would be just "same nternational phone number format"
                // which would mean "same country calling code" in the context of `libphonenumber-js`.
                if (phoneDigits.indexOf("+" + getCountryCallingCode(newCountry, metadata)) === 0) {
                    return stripCountryCallingCode(phoneDigits, newCountry, metadata);
                } // Simply discard the previously entered international phone number,
                // because otherwise any "smart" transformation like getting the
                // "national (significant) number" part and then prepending the
                // newly selected country's "country calling code" to it
                // would just be confusing for a user without being actually useful.

                return ""; // // Simply strip the leading `+` character
                // // therefore simply converting all digits into a "local" phone number.
                // // https://github.com/catamphetamine/react-phone-number-input/issues/287
                // return phoneDigits.slice(1)
            }

            if (prevCountry) {
                var newCountryPrefix = getInternationalPhoneNumberPrefix(newCountry, metadata);

                if (phoneDigits.indexOf(newCountryPrefix) === 0) {
                    return phoneDigits;
                } else {
                    return newCountryPrefix;
                }
            } else {
                var defaultValue = getInternationalPhoneNumberPrefix(newCountry, metadata); // If `phoneDigits`'s country calling code part is the same
                // as for the new `country`, then leave `phoneDigits` as is.

                if (phoneDigits.indexOf(defaultValue) === 0) {
                    return phoneDigits;
                } // If `phoneDigits`'s country calling code part is not the same
                // as for the new `country`, then set `phoneDigits` to
                // `+{getCountryCallingCode(newCountry)}`.

                return defaultValue;
            } // // If the international phone number already contains
            // // any country calling code then trim the country calling code part.
            // // (that could also be the newly selected country phone code prefix as well)
            // // `phoneDigits` doesn't neccessarily belong to `prevCountry`.
            // // (e.g. if a user enters an international number
            // //  not belonging to any of the reduced `countries` list).
            // phoneDigits = stripCountryCallingCode(phoneDigits, prevCountry, metadata)
            // // Prepend country calling code prefix
            // // for the newly selected country.
            // return e164(phoneDigits, newCountry, metadata) || `+${getCountryCallingCode(newCountry, metadata)}`
        }
    } // If switching to "International" from a country.
    else {
        // If the phone number was entered in national format.
        if (phoneDigits[0] !== "+") {
            // Format the national phone number as an international one.
            // The phone number entered not necessarily even starts with
            // the previously selected country phone prefix.
            // Even if the phone number belongs to whole another country
            // it will still be parsed into some national phone number.
            return e164(phoneDigits, prevCountry, metadata) || "";
        }
    }

    return phoneDigits;
}
/**
 * Converts phone number digits to a (possibly incomplete) E.164 phone number.
 * @param  {string?} number - A possibly incomplete phone number digits string. Can be a possibly incomplete E.164 phone number.
 * @param  {string?} country
 * @param  {[object} metadata - `libphonenumber-js` metadata.
 * @return {string?}
 */

function e164(number, country, metadata) {
    if (!number) {
        return;
    } // If the phone number is being input in international format.

    if (number[0] === "+") {
        // If it's just the `+` sign then return nothing.
        if (number === "+") {
            return;
        } // If there are any digits then the `value` is returned as is.

        return number;
    } // For non-international phone numbers
    // an accompanying country code is required.

    if (!country) {
        return;
    }

    var partial_national_significant_number = getNationalSignificantNumberDigits(number, country, metadata);

    if (partial_national_significant_number) {
        return "+".concat(getCountryCallingCode(country, metadata)).concat(partial_national_significant_number);
    }
}
/**
 * Trims phone number digits if they exceed the maximum possible length
 * for a national (significant) number for the country.
 * @param  {string} number - A possibly incomplete phone number digits string. Can be a possibly incomplete E.164 phone number.
 * @param  {string} country
 * @param  {object} metadata - `libphonenumber-js` metadata.
 * @return {string} Can be empty.
 */

function trimNumber(number, country, metadata) {
    var nationalSignificantNumberPart = getNationalSignificantNumberDigits(number, country, metadata);

    if (nationalSignificantNumberPart) {
        var overflowDigitsCount = nationalSignificantNumberPart.length - getMaxNumberLength(country, metadata);

        if (overflowDigitsCount > 0) {
            return number.slice(0, number.length - overflowDigitsCount);
        }
    }

    return number;
}

function getMaxNumberLength(country, metadata) {
    // Get "possible lengths" for a phone number of the country.
    metadata = new Metadata(metadata);
    metadata.selectNumberingPlan(country); // Return the last "possible length".

    return metadata.numberingPlan.possibleLengths()[metadata.numberingPlan.possibleLengths().length - 1];
} // If the phone number being input is an international one
// then tries to derive the country from the phone number.
// (regardless of whether there's any country currently selected)

/**
 * @param {string} partialE164Number - A possibly incomplete E.164 phone number.
 * @param {string?} country - Currently selected country.
 * @param {string[]?} countries - A list of available countries. If not passed then "all countries" are assumed.
 * @param  {object} metadata - `libphonenumber-js` metadata.
 * @return {string?}
 */

function getCountryForPartialE164Number(partialE164Number, _ref4) {
    var country = _ref4.country,
        countries = _ref4.countries,
        required = _ref4.required,
        metadata = _ref4.metadata;

    if (partialE164Number === "+") {
        // Don't change the currently selected country yet.
        return country;
    }

    var derived_country = getCountryFromPossiblyIncompleteInternationalPhoneNumber(partialE164Number, metadata); // If a phone number is being input in international form
    // and the country can already be derived from it,
    // then select that country.

    if (derived_country && (!countries || countries.indexOf(derived_country) >= 0)) {
        return derived_country;
    } // If "International" country option has not been disabled
    // and the international phone number entered doesn't correspond
    // to the currently selected country then reset the currently selected country.
    else if (country && !required && !couldNumberBelongToCountry(partialE164Number, country, metadata)) {
        return undefined;
    } // Don't change the currently selected country.

    return country;
}
/**
 * Parses `<input/>` value. Derives `country` from `input`. Derives an E.164 `value`.
 * @param  {string?} phoneDigits — Parsed `<input/>` value. Examples: `""`, `"+"`, `"+123"`, `"123"`.
 * @param  {string?} prevPhoneDigits — Previous parsed `<input/>` value. Examples: `""`, `"+"`, `"+123"`, `"123"`.
 * @param  {string?} country - Currently selected country.
 * @param  {boolean} countryRequired - Is selecting some country required.
 * @param  {function} getAnyCountry - Can be used to get any country when selecting some country required.
 * @param  {string[]?} countries - A list of available countries. If not passed then "all countries" are assumed.
 * @param  {boolean} international - Set to `true` to force international phone number format (leading `+`). Set to `false` to force "national" phone number format. Is `undefined` by default.
 * @param  {boolean} limitMaxLength — Whether to enable limiting phone number max length.
 * @param  {object} metadata - `libphonenumber-js` metadata.
 * @return {object} An object of shape `{ input, country, value }`.
 */

function onPhoneDigitsChange(phoneDigits, _ref5) {
    var prevPhoneDigits = _ref5.prevPhoneDigits,
        country = _ref5.country,
        defaultCountry = _ref5.defaultCountry,
        countryRequired = _ref5.countryRequired,
        getAnyCountry = _ref5.getAnyCountry,
        countries = _ref5.countries,
        international = _ref5.international,
        limitMaxLength = _ref5.limitMaxLength,
        countryCallingCodeEditable = _ref5.countryCallingCodeEditable,
        metadata = _ref5.metadata;

    if (international && countryCallingCodeEditable === false) {
        var prefix = getInternationalPhoneNumberPrefix(country, metadata); // The `<input/>` value must start with the country calling code.

        if (phoneDigits.indexOf(prefix) !== 0) {
            var _value; // If a phone number input is declared as
            // `international` and `withCountryCallingCode`,
            // then it's gonna be non-empty even before the user
            // has input anything in it.
            // This will result in its contents (the country calling code part)
            // being selected when the user tabs into such field.
            // If the user then starts inputting the national part digits,
            // then `<input/>` value changes from `+xxx` to `y`
            // because inputting anything while having the `<input/>` value
            // selected results in erasing the `<input/>` value
            // So, the component handles such case by restoring
            // the intended `<input/>`` value: `+xxxy`.
            // https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/43

            if (phoneDigits && phoneDigits[0] !== "+") {
                phoneDigits = prefix + phoneDigits;
                _value = phoneDigits;
            } else {
                phoneDigits = prefix;
            }

            return {
                phoneDigits: phoneDigits,
                value: _value,
                country: country,
            };
        }
    } // If `international` property is `false`, then it means
    // "enforce national-only format during input",
    // so, if that's the case, then remove all `+` characters,
    // but only if some country is currently selected.
    // (not if "International" country is selected).

    if (international === false && country && phoneDigits && phoneDigits[0] === "+") {
        phoneDigits = convertInternationalPhoneDigitsToNational(phoneDigits, country, metadata);
    } // Trim the input to not exceed the maximum possible number length.

    if (phoneDigits && country && limitMaxLength) {
        phoneDigits = trimNumber(phoneDigits, country, metadata);
    } // If this `onChange()` event was triggered
    // as a result of selecting "International" country,
    // then force-prepend a `+` sign if the phone number
    // `<input/>` value isn't in international format.
    // Also, force-prepend a `+` sign if international
    // phone number input format is set.

    if (phoneDigits && phoneDigits[0] !== "+" && (!country || international)) {
        phoneDigits = "+" + phoneDigits;
    } // If the previously entered phone number
    // has been entered in international format
    // and the user decides to erase it,
    // then also reset the `country`
    // because it was most likely automatically selected
    // while the user was typing in the phone number
    // in international format.
    // This fixes the issue when a user is presented
    // with a phone number input with no country selected
    // and then types in their local phone number
    // then discovers that the input's messed up
    // (a `+` has been prepended at the start of their input
    //  and a random country has been selected),
    // decides to undo it all by erasing everything
    // and then types in their local phone number again
    // resulting in a seemingly correct phone number
    // but in reality that phone number has incorrect country.
    // https://github.com/catamphetamine/react-phone-number-input/issues/273

    if (!phoneDigits && prevPhoneDigits && prevPhoneDigits[0] === "+") {
        if (international) {
            country = undefined;
        } else {
            country = defaultCountry;
        }
    } // Also resets such "randomly" selected country
    // as soon as the user erases the number
    // digit-by-digit up to the leading `+` sign.

    if (phoneDigits === "+" && prevPhoneDigits && prevPhoneDigits[0] === "+" && prevPhoneDigits.length > "+".length) {
        country = undefined;
    } // Generate the new `value` property.

    var value;

    if (phoneDigits) {
        if (phoneDigits[0] === "+") {
            if (phoneDigits === "+") {
                value = undefined;
            } else if (country && getInternationalPhoneNumberPrefix(country, metadata).indexOf(phoneDigits) === 0) {
                value = undefined;
            } else {
                value = phoneDigits;
            }
        } else {
            value = e164(phoneDigits, country, metadata);
        }
    } // Derive the country from the phone number.
    // (regardless of whether there's any country currently selected,
    //  because there could be several countries corresponding to one country calling code)

    if (value) {
        country = getCountryForPartialE164Number(value, {
            country: country,
            countries: countries,
            metadata: metadata,
        }); // If `international` property is `false`, then it means
        // "enforce national-only format during input",
        // so, if that's the case, then remove all `+` characters,
        // but only if some country is currently selected.
        // (not if "International" country is selected).

        if (international === false && country && phoneDigits && phoneDigits[0] === "+") {
            phoneDigits = convertInternationalPhoneDigitsToNational(phoneDigits, country, metadata); // Re-calculate `value` because `phoneDigits` has changed.

            value = e164(phoneDigits, country, metadata);
        }
    }

    if (!country && countryRequired) {
        country = defaultCountry || getAnyCountry();
    }

    return {
        phoneDigits: phoneDigits,
        country: country,
        value: value,
    };
}

function convertInternationalPhoneDigitsToNational(input, country, metadata) {
    // Handle the case when a user might have pasted
    // a phone number in international format.
    if (input.indexOf(getInternationalPhoneNumberPrefix(country, metadata)) === 0) {
        // Create "as you type" formatter.
        var formatter = new AsYouType(country, metadata); // Input partial national phone number.

        formatter.input(input); // Return the parsed partial national phone number.

        var phoneNumber = formatter.getNumber();

        if (phoneNumber) {
            // Transform the number to a national one,
            // and remove all non-digits.
            return phoneNumber.formatNational().replace(/\D/g, "");
        } else {
            return "";
        }
    } else {
        // Just remove the `+` sign.
        return input.replace(/\D/g, "");
    }
}
/**
 * Determines the country for a given (possibly incomplete) E.164 phone number.
 * @param  {string} number - A possibly incomplete E.164 phone number.
 * @param  {object} metadata - `libphonenumber-js` metadata.
 * @return {string?}
 */

function getCountryFromPossiblyIncompleteInternationalPhoneNumber(number, metadata) {
    var formatter = new AsYouType(null, metadata);
    formatter.input(number); // // `001` is a special "non-geograpical entity" code
    // // in Google's `libphonenumber` library.
    // if (formatter.getCountry() === '001') {
    // 	return
    // }

    return formatter.getCountry();
}
/**
 * Compares two strings.
 * A helper for `Array.sort()`.
 * @param {string} a — First string.
 * @param {string} b — Second string.
 * @param {(string[]|string)} [locales] — The `locales` argument of `String.localeCompare`.
 */

function compareStrings(a, b, locales) {
    // Use `String.localeCompare` if it's available.
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    // Which means everyone except IE <= 10 and Safari <= 10.
    // `localeCompare()` is available in latest Node.js versions.

    /* istanbul ignore else */
    if (String.prototype.localeCompare) {
        return a.localeCompare(b, locales);
    }
    /* istanbul ignore next */

    return a < b ? -1 : a > b ? 1 : 0;
}
/**
 * Strips `+${countryCallingCode}` prefix from an E.164 phone number.
 * @param {string} number - (possibly incomplete) E.164 phone number.
 * @param {string?} country - A possible country for this phone number.
 * @param {object} metadata - `libphonenumber-js` metadata.
 * @return {string}
 */

function stripCountryCallingCode(number, country, metadata) {
    // Just an optimization, so that it
    // doesn't have to iterate through all country calling codes.
    if (country) {
        var countryCallingCodePrefix = "+" + getCountryCallingCode(country, metadata); // If `country` fits the actual `number`.

        if (number.length < countryCallingCodePrefix.length) {
            if (countryCallingCodePrefix.indexOf(number) === 0) {
                return "";
            }
        } else {
            if (number.indexOf(countryCallingCodePrefix) === 0) {
                return number.slice(countryCallingCodePrefix.length);
            }
        }
    } // If `country` doesn't fit the actual `number`.
    // Try all available country calling codes.

    for (var _i = 0, _Object$keys = Object.keys(metadata.country_calling_codes); _i < _Object$keys.length; _i++) {
        var country_calling_code = _Object$keys[_i];

        if (number.indexOf(country_calling_code) === "+".length) {
            return number.slice("+".length + country_calling_code.length);
        }
    }

    return "";
}
/**
 * Parses a partially entered national phone number digits
 * (or a partially entered E.164 international phone number)
 * and returns the national significant number part.
 * National significant number returned doesn't come with a national prefix.
 * @param {string} number - National number digits. Or possibly incomplete E.164 phone number.
 * @param {string?} country
 * @param {object} metadata - `libphonenumber-js` metadata.
 * @return {string} [result]
 */

function getNationalSignificantNumberDigits(number, country, metadata) {
    // Create "as you type" formatter.
    var formatter = new AsYouType(country, metadata); // Input partial national phone number.

    formatter.input(number); // Return the parsed partial national phone number.

    var phoneNumber = formatter.getNumber();
    return phoneNumber && phoneNumber.nationalNumber;
}
/**
 * Checks if a partially entered E.164 phone number could belong to a country.
 * @param  {string} number
 * @param  {string} country
 * @return {boolean}
 */

function couldNumberBelongToCountry(number, country, metadata) {
    var intlPhoneNumberPrefix = getInternationalPhoneNumberPrefix(country, metadata);
    var i = 0;

    while (i < number.length && i < intlPhoneNumberPrefix.length) {
        if (number[i] !== intlPhoneNumberPrefix[i]) {
            return false;
        }

        i++;
    }

    return true;
}
/**
 * Gets initial "phone digits" (including `+`, if using international format).
 * @return {string} [phoneDigits] Returns `undefined` if there should be no initial "phone digits".
 */

function getInitialPhoneDigits(_ref6) {
    var value = _ref6.value,
        phoneNumber = _ref6.phoneNumber,
        defaultCountry = _ref6.defaultCountry,
        international = _ref6.international,
        useNationalFormat = _ref6.useNationalFormat,
        metadata = _ref6.metadata;

    // If the `value` (E.164 phone number)
    // belongs to the currently selected country
    // and `useNationalFormat` is `true`
    // then convert `value` (E.164 phone number)
    // to a local phone number digits.
    // E.g. '+78005553535' -> '88005553535'.
    if ((international === false || useNationalFormat) && phoneNumber && phoneNumber.country) {
        return generateNationalNumberDigits(phoneNumber);
    } // If `international` property is `true`,
    // meaning "enforce international phone number format",
    // then always show country calling code in the input field.

    if (!value && international && defaultCountry) {
        return getInternationalPhoneNumberPrefix(defaultCountry, metadata);
    }

    return value;
}

function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread$1(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys$1(Object(source), true).forEach(function (key) {
                _defineProperty$1(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys$1(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty$1(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}
function getPhoneInputWithCountryStateUpdateFromNewProps(props, prevProps, state) {
    var metadata = props.metadata,
        countries = props.countries,
        newDefaultCountry = props.defaultCountry,
        newValue = props.value,
        newReset = props.reset,
        international = props.international,
        displayInitialValueAsLocalNumber = props.displayInitialValueAsLocalNumber,
        initialValueFormat = props.initialValueFormat;
    var prevDefaultCountry = prevProps.defaultCountry,
        prevValue = prevProps.value,
        prevReset = prevProps.reset;
    state.country;
    var value = state.value,
        hasUserSelectedACountry = state.hasUserSelectedACountry;

    var _getInitialPhoneDigits = function _getInitialPhoneDigits(parameters) {
        return getInitialPhoneDigits(
            _objectSpread$1({}, parameters, {
                international: international,
                useNationalFormat: displayInitialValueAsLocalNumber || initialValueFormat === "national",
                metadata: metadata,
            })
        );
    }; // Some users requested a way to reset the component
    // (both number `<input/>` and country `<select/>`).
    // Whenever `reset` property changes both number `<input/>`
    // and country `<select/>` are reset.
    // It's not implemented as some instance `.reset()` method
    // because `ref` is forwarded to `<input/>`.
    // It's also not replaced with just resetting `country` on
    // external `value` reset, because a user could select a country
    // and then not input any `value`, and so the selected country
    // would be "stuck", if not using this `reset` property.
    // https://github.com/catamphetamine/react-phone-number-input/issues/300

    if (newReset !== prevReset) {
        return {
            phoneDigits: _getInitialPhoneDigits({
                value: undefined,
                defaultCountry: newDefaultCountry,
            }),
            value: undefined,
            country: newDefaultCountry,
            hasUserSelectedACountry: undefined,
        };
    } // `value` is the value currently shown in the component:
    // it's stored in the component's `state`, and it's not the `value` property.
    // `prevValue` is "previous `value` property".
    // `newValue` is "new `value` property".
    // If the default country changed
    // (e.g. in case of ajax GeoIP detection after page loaded)
    // then select it, but only if the user hasn't already manually
    // selected a country, and no phone number has been manually entered so far.
    // Because if the user has already started inputting a phone number
    // then they're okay with no country being selected at all ("International")
    // and they don't want to be disturbed, don't want their input to be screwed, etc.

    if (newDefaultCountry !== prevDefaultCountry) {
        var isNewDefaultCountrySupported =
            !newDefaultCountry || isCountrySupportedWithError(newDefaultCountry, metadata);

        var noValueHasBeenEnteredByTheUser = // By default, "no value has been entered" means `value` is `undefined`.
            !value || // When `international` is `true`, and some country has been pre-selected,
            // then the `<input/>` contains a pre-filled value of `+${countryCallingCode}${leadingDigits}`,
            // so in case of `international` being `true`, "the user hasn't entered anything" situation
            // doesn't just mean `value` is `undefined`, but could also mean `value` is `+${countryCallingCode}`.
            (international &&
                value ===
                    _getInitialPhoneDigits({
                        value: undefined,
                        defaultCountry: prevDefaultCountry,
                    })); // Only update the `defaultCountry` property if no phone number
        // has been entered by the user or pre-set by the application.

        var noValueHasBeenEntered = !newValue && noValueHasBeenEnteredByTheUser;

        if (!hasUserSelectedACountry && isNewDefaultCountrySupported && noValueHasBeenEntered) {
            return {
                country: newDefaultCountry,
                // If `phoneDigits` is empty, then automatically select the new `country`
                // and set `phoneDigits` to `+{getCountryCallingCode(newCountry)}`.
                // The code assumes that "no phone number has been entered by the user",
                // and no `value` property has been passed, so the `phoneNumber` parameter
                // of `_getInitialPhoneDigits({ value, phoneNumber, ... })` is `undefined`.
                phoneDigits: _getInitialPhoneDigits({
                    value: undefined,
                    defaultCountry: newDefaultCountry,
                }),
                // `value` is `undefined` and it stays so.
                value: undefined,
            };
        }
    } // If a new `value` is set externally.
    // (e.g. as a result of an ajax API request
    //  to get user's phone after page loaded)
    // The first part — `newValue !== prevValue` —
    // is basically `props.value !== prevProps.value`
    // so it means "if value property was changed externally".
    // The second part — `newValue !== value` —
    // is for ignoring the `getDerivedStateFromProps()` call
    // which happens in `this.onChange()` right after `this.setState()`.
    // If this `getDerivedStateFromProps()` call isn't ignored
    // then the country flag would reset on each input.

    if (newValue !== prevValue && newValue !== value) {
        var phoneNumber;
        var parsedCountry;

        if (newValue) {
            phoneNumber = parsePhoneNumber(newValue, metadata);
            var supportedCountries = getSupportedCountries(countries, metadata);

            if (phoneNumber && phoneNumber.country) {
                // Ignore `else` because all countries are supported in metadata.

                /* istanbul ignore next */
                if (!supportedCountries || supportedCountries.indexOf(phoneNumber.country) >= 0) {
                    parsedCountry = phoneNumber.country;
                }
            } else {
                parsedCountry = getCountryForPartialE164Number(newValue, {
                    country: undefined,
                    countries: supportedCountries,
                    metadata: metadata,
                });
            }
        }

        var hasUserSelectedACountryUpdate;

        if (!newValue) {
            // Reset `hasUserSelectedACountry` flag in `state`.
            hasUserSelectedACountryUpdate = {
                hasUserSelectedACountry: undefined,
            };
        }

        return _objectSpread$1({}, hasUserSelectedACountryUpdate, {
            phoneDigits: _getInitialPhoneDigits({
                phoneNumber: phoneNumber,
                value: newValue,
                defaultCountry: newDefaultCountry,
            }),
            value: newValue,
            country: newValue ? parsedCountry : newDefaultCountry,
        });
    } // `defaultCountry` didn't change.
    // `value` didn't change.
    // `phoneDigits` didn't change, because `value` didn't change.
    //
    // So no need to update state.
}

function _typeof$1(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof$1 = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof$1 = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof$1(obj);
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _extends$1() {
    _extends$1 =
        Object.assign ||
        function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends$1.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          };
    return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true },
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

var PhoneNumberInput_ =
    /*#__PURE__*/
    (function (_React$PureComponent) {
        _inherits(PhoneNumberInput_, _React$PureComponent);

        function PhoneNumberInput_(props) {
            var _this;

            _classCallCheck(this, PhoneNumberInput_);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(PhoneNumberInput_).call(this, props));

            _defineProperty(_assertThisInitialized(_this), "inputRef", React.createRef());

            _defineProperty(_assertThisInitialized(_this), "setInputRef", function (instance) {
                _this.inputRef.current = instance;
                var ref = _this.props.inputRef;

                if (ref) {
                    if (typeof ref === "function") {
                        ref(instance);
                    } else {
                        ref.current = instance;
                    }
                }
            });

            _defineProperty(_assertThisInitialized(_this), "isCountrySupportedWithError", function (country) {
                var metadata = _this.props.metadata;
                return isCountrySupportedWithError(country, metadata);
            });

            _defineProperty(_assertThisInitialized(_this), "onCountryChange", function (newCountry) {
                var _this$props = _this.props,
                    international = _this$props.international,
                    metadata = _this$props.metadata,
                    onChange = _this$props.onChange,
                    focusInputOnCountrySelection = _this$props.focusInputOnCountrySelection;
                var _this$state = _this.state,
                    prevPhoneDigits = _this$state.phoneDigits,
                    prevCountry = _this$state.country; // After the new `country` has been selected,
                // if the phone number `<input/>` holds any digits
                // then migrate those digits for the new `country`.

                var newPhoneDigits = getPhoneDigitsForNewCountry(prevPhoneDigits, {
                    prevCountry: prevCountry,
                    newCountry: newCountry,
                    metadata: metadata,
                    // Convert the phone number to "national" format
                    // when the user changes the selected country by hand.
                    useNationalFormat: !international,
                });
                var newValue = e164(newPhoneDigits, newCountry, metadata); // Focus phone number `<input/>` upon country selection.

                if (focusInputOnCountrySelection) {
                    _this.inputRef.current.focus();
                } // If the user has already manually selected a country
                // then don't override that already selected country
                // if the `defaultCountry` property changes.
                // That's what `hasUserSelectedACountry` flag is for.

                _this.setState(
                    {
                        country: newCountry,
                        hasUserSelectedACountry: true,
                        phoneDigits: newPhoneDigits,
                        value: newValue,
                    },
                    function () {
                        // Update the new `value` property.
                        // Doing it after the `state` has been updated
                        // because `onChange()` will trigger `getDerivedStateFromProps()`
                        // with the new `value` which will be compared to `state.value` there.
                        onChange(newValue);
                    }
                );
            });

            _defineProperty(_assertThisInitialized(_this), "onChange", function (_phoneDigits) {
                var _this$props2 = _this.props,
                    defaultCountry = _this$props2.defaultCountry,
                    onChange = _this$props2.onChange,
                    addInternationalOption = _this$props2.addInternationalOption,
                    international = _this$props2.international,
                    limitMaxLength = _this$props2.limitMaxLength,
                    countryCallingCodeEditable = _this$props2.countryCallingCodeEditable,
                    metadata = _this$props2.metadata;
                var _this$state2 = _this.state,
                    countries = _this$state2.countries,
                    prevPhoneDigits = _this$state2.phoneDigits,
                    currentlySelectedCountry = _this$state2.country;

                var _onPhoneDigitsChange = onPhoneDigitsChange(_phoneDigits, {
                        prevPhoneDigits: prevPhoneDigits,
                        country: currentlySelectedCountry,
                        countryRequired: !addInternationalOption,
                        defaultCountry: defaultCountry,
                        getAnyCountry: function getAnyCountry() {
                            return _this.getFirstSupportedCountry({
                                countries: countries,
                            });
                        },
                        countries: countries,
                        international: international,
                        limitMaxLength: limitMaxLength,
                        countryCallingCodeEditable: countryCallingCodeEditable,
                        metadata: metadata,
                    }),
                    phoneDigits = _onPhoneDigitsChange.phoneDigits,
                    country = _onPhoneDigitsChange.country,
                    value = _onPhoneDigitsChange.value;

                var stateUpdate = {
                    phoneDigits: phoneDigits,
                    value: value,
                    country: country,
                };

                if (countryCallingCodeEditable === false) {
                    // If it simply did `setState({ phoneDigits: intlPrefix })` here,
                    // then it would have no effect when erasing an inital international prefix
                    // via Backspace, because `phoneDigits` in `state` wouldn't change
                    // as a result, because it was `prefix` and it became `prefix`,
                    // so the component wouldn't rerender, and the user would be able
                    // to erase the country calling code part, and that part is
                    // assumed to be non-eraseable. That's why the component is
                    // forcefully rerendered here.
                    // https://github.com/catamphetamine/react-phone-number-input/issues/367#issuecomment-721703501
                    if (!value && phoneDigits === _this.state.phoneDigits) {
                        // Force a re-render of the `<input/>` in order to reset its value.
                        stateUpdate.forceRerender = {};
                    }
                }

                _this.setState(
                    stateUpdate, // Update the new `value` property.
                    // Doing it after the `state` has been updated
                    // because `onChange()` will trigger `getDerivedStateFromProps()`
                    // with the new `value` which will be compared to `state.value` there.
                    function () {
                        return onChange(value);
                    }
                );
            });

            _defineProperty(_assertThisInitialized(_this), "_onFocus", function () {
                return _this.setState({
                    isFocused: true,
                });
            });

            _defineProperty(_assertThisInitialized(_this), "_onBlur", function () {
                return _this.setState({
                    isFocused: false,
                });
            });

            _defineProperty(_assertThisInitialized(_this), "onFocus", function (event) {
                _this._onFocus();

                var onFocus = _this.props.onFocus;

                if (onFocus) {
                    onFocus(event);
                }
            });

            _defineProperty(_assertThisInitialized(_this), "onBlur", function (event) {
                var onBlur = _this.props.onBlur;

                _this._onBlur();

                if (onBlur) {
                    onBlur(event);
                }
            });

            _defineProperty(_assertThisInitialized(_this), "onCountryFocus", function (event) {
                _this._onFocus(); // this.setState({ countrySelectFocused: true })

                var countrySelectProps = _this.props.countrySelectProps;

                if (countrySelectProps) {
                    var onFocus = countrySelectProps.onFocus;

                    if (onFocus) {
                        onFocus(event);
                    }
                }
            });

            _defineProperty(_assertThisInitialized(_this), "onCountryBlur", function (event) {
                _this._onBlur(); // this.setState({ countrySelectFocused: false })

                var countrySelectProps = _this.props.countrySelectProps;

                if (countrySelectProps) {
                    var onBlur = countrySelectProps.onBlur;

                    if (onBlur) {
                        onBlur(event);
                    }
                }
            });

            var _this$props3 = _this.props,
                _value = _this$props3.value;
            _this$props3.labels;
            var _international = _this$props3.international,
                _addInternationalOption = _this$props3.addInternationalOption,
                displayInitialValueAsLocalNumber = _this$props3.displayInitialValueAsLocalNumber,
                initialValueFormat = _this$props3.initialValueFormat,
                _metadata = _this$props3.metadata;
            var _this$props4 = _this.props,
                _defaultCountry = _this$props4.defaultCountry,
                _countries = _this$props4.countries; // Validate `defaultCountry`.

            if (_defaultCountry) {
                if (!_this.isCountrySupportedWithError(_defaultCountry)) {
                    _defaultCountry = undefined;
                }
            } // Validate `countries`.

            _countries = getSupportedCountries(_countries, _metadata);
            var phoneNumber = parsePhoneNumber(_value, _metadata);
            _this.CountryIcon = createCountryIconComponent(_this.props);
            var preSelectedCountry = getPreSelectedCountry({
                value: _value,
                phoneNumber: phoneNumber,
                defaultCountry: _defaultCountry,
                required: !_addInternationalOption,
                countries: _countries || getCountries(_metadata),
                getAnyCountry: function getAnyCountry() {
                    return _this.getFirstSupportedCountry({
                        countries: _countries,
                    });
                },
                metadata: _metadata,
            });
            _this.state = {
                // Workaround for `this.props` inside `getDerivedStateFromProps()`.
                props: _this.props,
                // The country selected.
                country: preSelectedCountry,
                // `countries` are stored in `this.state` because they're filtered.
                // For example, a developer might theoretically pass some unsupported
                // countries as part of the `countries` property, and because of that
                // the component uses `this.state.countries` (which are filtered)
                // instead of `this.props.countries`
                // (which could potentially contain unsupported countries).
                countries: _countries,
                // `phoneDigits` state property holds non-formatted user's input.
                // The reason is that there's no way of finding out
                // in which form should `value` be displayed: international or national.
                // E.g. if `value` is `+78005553535` then it could be input
                // by a user both as `8 (800) 555-35-35` and `+7 800 555 35 35`.
                // Hence storing just `value` is not sufficient for correct formatting.
                // E.g. if a user entered `8 (800) 555-35-35`
                // then value is `+78005553535` and `phoneDigits` are `88005553535`
                // and if a user entered `+7 800 555 35 35`
                // then value is `+78005553535` and `phoneDigits` are `+78005553535`.
                phoneDigits: getInitialPhoneDigits({
                    value: _value,
                    phoneNumber: phoneNumber,
                    defaultCountry: _defaultCountry,
                    international: _international,
                    useNationalFormat: displayInitialValueAsLocalNumber || initialValueFormat === "national",
                    metadata: _metadata,
                }),
                // `value` property is duplicated in state.
                // The reason is that `getDerivedStateFromProps()`
                // needs this `value` to compare to the new `value` property
                // to find out if `phoneDigits` needs updating:
                // If the `value` property was changed externally
                // then it won't be equal to `state.value`
                // in which case `phoneDigits` and `country` should be updated.
                value: _value,
            };
            return _this;
        }

        _createClass(
            PhoneNumberInput_,
            [
                {
                    key: "componentDidMount",
                    value: function componentDidMount() {
                        var onCountryChange = this.props.onCountryChange;
                        var defaultCountry = this.props.defaultCountry;
                        var selectedCountry = this.state.country;

                        if (onCountryChange) {
                            if (defaultCountry) {
                                if (!this.isCountrySupportedWithError(defaultCountry)) {
                                    defaultCountry = undefined;
                                }
                            }

                            if (selectedCountry !== defaultCountry) {
                                onCountryChange(selectedCountry);
                            }
                        }
                    },
                },
                {
                    key: "componentDidUpdate",
                    value: function componentDidUpdate(prevProps, prevState) {
                        var onCountryChange = this.props.onCountryChange;
                        var country = this.state.country; // Call `onCountryChange` when user selects another country.

                        if (onCountryChange && country !== prevState.country) {
                            onCountryChange(country);
                        }
                    },
                },
                {
                    key: "getCountrySelectOptions",
                    value: function getCountrySelectOptions$1(_ref) {
                        var countries = _ref.countries;
                        var _this$props5 = this.props,
                            international = _this$props5.international,
                            countryCallingCodeEditable = _this$props5.countryCallingCodeEditable,
                            countryOptionsOrder = _this$props5.countryOptionsOrder,
                            addInternationalOption = _this$props5.addInternationalOption,
                            labels = _this$props5.labels,
                            locales = _this$props5.locales,
                            metadata = _this$props5.metadata;
                        return useMemoCountrySelectOptions(
                            function () {
                                return sortCountryOptions(
                                    getCountrySelectOptions({
                                        countries: countries || getCountries(metadata),
                                        countryNames: labels,
                                        addInternationalOption:
                                            international && countryCallingCodeEditable === false
                                                ? false
                                                : addInternationalOption,
                                        compareStringsLocales: locales, // compareStrings
                                    }),
                                    getSupportedCountryOptions(countryOptionsOrder, metadata)
                                );
                            },
                            [countries, countryOptionsOrder, addInternationalOption, labels, metadata]
                        );
                    },
                },
                {
                    key: "getFirstSupportedCountry",
                    value: function getFirstSupportedCountry(_ref2) {
                        var countries = _ref2.countries;
                        var countryOptions = this.getCountrySelectOptions({
                            countries: countries,
                        });
                        return countryOptions[0].value;
                    }, // A shorthand for not passing `metadata` as a second argument.
                },
                {
                    key: "render",
                    value: function render() {
                        var _this$props6 = this.props,
                            name = _this$props6.name,
                            disabled = _this$props6.disabled,
                            autoComplete = _this$props6.autoComplete,
                            style = _this$props6.style,
                            className = _this$props6.className;
                        _this$props6.inputRef;
                        var inputComponent = _this$props6.inputComponent,
                            numberInputProps = _this$props6.numberInputProps,
                            smartCaret = _this$props6.smartCaret,
                            CountrySelectComponent = _this$props6.countrySelectComponent,
                            countrySelectProps = _this$props6.countrySelectProps,
                            ContainerComponent = _this$props6.containerComponent;
                        _this$props6.defaultCountry;
                        _this$props6.countries;
                        _this$props6.countryOptionsOrder;
                        var labels = _this$props6.labels;
                        _this$props6.flags;
                        _this$props6.flagComponent;
                        _this$props6.flagUrl;
                        _this$props6.addInternationalOption;
                        _this$props6.internationalIcon;
                        _this$props6.displayInitialValueAsLocalNumber;
                        _this$props6.initialValueFormat;
                        _this$props6.onCountryChange;
                        _this$props6.limitMaxLength;
                        _this$props6.countryCallingCodeEditable;
                        _this$props6.focusInputOnCountrySelection;
                        _this$props6.reset;
                        var metadata = _this$props6.metadata;
                        _this$props6.international;
                        _this$props6.locales;
                        var rest = _objectWithoutProperties(_this$props6, [
                            "name",
                            "disabled",
                            "autoComplete",
                            "style",
                            "className",
                            "inputRef",
                            "inputComponent",
                            "numberInputProps",
                            "smartCaret",
                            "countrySelectComponent",
                            "countrySelectProps",
                            "containerComponent",
                            "defaultCountry",
                            "countries",
                            "countryOptionsOrder",
                            "labels",
                            "flags",
                            "flagComponent",
                            "flagUrl",
                            "addInternationalOption",
                            "internationalIcon",
                            "displayInitialValueAsLocalNumber",
                            "initialValueFormat",
                            "onCountryChange",
                            "limitMaxLength",
                            "countryCallingCodeEditable",
                            "focusInputOnCountrySelection",
                            "reset",
                            "metadata",
                            "international",
                            "locales",
                        ]);

                        var _this$state3 = this.state,
                            country = _this$state3.country,
                            countries = _this$state3.countries,
                            phoneDigits = _this$state3.phoneDigits,
                            isFocused = _this$state3.isFocused;
                        var InputComponent = smartCaret ? InputSmart : InputBasic;
                        var countrySelectOptions = this.getCountrySelectOptions({
                            countries: countries,
                        });
                        return React.createElement(
                            ContainerComponent,
                            {
                                style: style,
                                className: classNames(className, "PhoneInput", {
                                    "PhoneInput--focus": isFocused,
                                }),
                            },
                            React.createElement(
                                CountrySelectComponent,
                                _extends$1(
                                    {
                                        name: name ? "".concat(name, "Country") : undefined,
                                        "aria-label": labels.country,
                                    },
                                    countrySelectProps,
                                    {
                                        value: country,
                                        options: countrySelectOptions,
                                        onChange: this.onCountryChange,
                                        onFocus: this.onCountryFocus,
                                        onBlur: this.onCountryBlur,
                                        disabled: disabled || (countrySelectProps && countrySelectProps.disabled),
                                        iconComponent: this.CountryIcon,
                                    }
                                )
                            ),
                            React.createElement(
                                InputComponent,
                                _extends$1(
                                    {
                                        ref: this.setInputRef,
                                        type: "tel",
                                        autoComplete: autoComplete,
                                    },
                                    numberInputProps,
                                    rest,
                                    {
                                        name: name,
                                        metadata: metadata,
                                        country: country,
                                        value: phoneDigits || "",
                                        onChange: this.onChange,
                                        onFocus: this.onFocus,
                                        onBlur: this.onBlur,
                                        disabled: disabled,
                                        inputComponent: inputComponent,
                                        className: classNames(
                                            "PhoneInputInput",
                                            numberInputProps && numberInputProps.className,
                                            rest.className
                                        ),
                                    }
                                )
                            )
                        );
                    },
                },
            ],
            [
                {
                    key: "getDerivedStateFromProps",
                    // `state` holds previous props as `props`, and also:
                    // * `country` — The currently selected country, e.g. `"RU"`.
                    // * `value` — The currently entered phone number (E.164), e.g. `+78005553535`.
                    // * `phoneDigits` — The parsed `<input/>` value, e.g. `8005553535`.
                    // (and a couple of other less significant properties)
                    value: function getDerivedStateFromProps(props, state) {
                        return _objectSpread(
                            {
                                // Emulate `prevProps` via `state.props`.
                                props: props,
                            },
                            getPhoneInputWithCountryStateUpdateFromNewProps(props, state.props, state)
                        );
                    },
                },
            ]
        );

        return PhoneNumberInput_;
    })(React.PureComponent); // This wrapper is only to `.forwardRef()` to the `<input/>`.

var PhoneNumberInput = React.forwardRef(function (props, ref) {
    return React.createElement(
        PhoneNumberInput_,
        _extends$1({}, props, {
            inputRef: ref,
        })
    );
});
PhoneNumberInput.propTypes = {
    /**
     * Phone number in `E.164` format.
     *
     * Example:
     *
     * `"+12223333333"`
     */
    value: propTypes.exports.string,

    /**
     * A function of `value: string?`.
     *
     * Updates the `value` property as the user inputs a phone number.
     */
    onChange: propTypes.exports.func.isRequired,

    /**
     * Toggles the `--focus` CSS class.
     * @ignore
     */
    onFocus: propTypes.exports.func,

    /**
     * `onBlur` is usually passed by `redux-form`.
     * @ignore
     */
    onBlur: propTypes.exports.func,

    /**
     * Set to `true` to disable both the phone number `<input/>`
     * and the country `<select/>`.
     */
    disabled: propTypes.exports.bool,

    /**
     * Sets `autoComplete` property for phone number `<input/>`.
     *
     * Web browser's "autocomplete" feature
     * remembers the phone number being input
     * and can also autofill the `<input/>`
     * with previously remembered phone numbers.
     *
     * https://developers.google.com
     * /web/updates/2015/06/checkout-faster-with-autofill
     *
     * For example, can be used to turn it off:
     *
     * "So when should you use `autocomplete="off"`?
     *  One example is when you've implemented your own version
     *  of autocomplete for search. Another example is any form field
     *  where users will input and submit different kinds of information
     *  where it would not be useful to have the browser remember
     *  what was submitted previously".
     */
    // (is `"tel"` by default)
    autoComplete: propTypes.exports.string.isRequired,

    /**
     * Set to `"national"` to show the initial `value` in
     * "national" format rather than "international".
     *
     * For example, if `initialValueFormat` is `"national"`
     * and the initial `value="+12133734253"` is passed
     * then the `<input/>` value will be `"(213) 373-4253"`.
     *
     * By default, `initialValueFormat` is `undefined`,
     * meaning that if the initial `value="+12133734253"` is passed
     * then the `<input/>` value will be `"+1 213 373 4253"`.
     *
     * The reason for such default behaviour is that
     * the newer generation grows up when there are no stationary phones
     * and therefore everyone inputs phone numbers in international format
     * in their smartphones so people gradually get more accustomed to
     * writing phone numbers in international format rather than in local format.
     * Future people won't be using "national" format, only "international".
     */
    // (is `undefined` by default)
    initialValueFormat: propTypes.exports.oneOf(["national"]),
    // `displayInitialValueAsLocalNumber` property has been
    // superceded by `initialValueFormat` property.
    displayInitialValueAsLocalNumber: propTypes.exports.bool,

    /**
     * The country to be selected by default.
     * For example, can be set after a GeoIP lookup.
     *
     * Example: `"US"`.
     */
    // A two-letter country code ("ISO 3166-1 alpha-2").
    defaultCountry: propTypes.exports.string,

    /**
     * If specified, only these countries will be available for selection.
     *
     * Example:
     *
     * `["RU", "UA", "KZ"]`
     */
    countries: propTypes.exports.arrayOf(propTypes.exports.string),

    /**
     * Custom country `<select/>` option names.
     * Also some labels like "ext" and country `<select/>` `aria-label`.
     *
     * Example:
     *
     * `{ "ZZ": "Международный", RU: "Россия", US: "США", ... }`
     *
     * See the `locales` directory for examples.
     */
    labels: labels$1.isRequired,

    /**
     * Country `<select/>` options are sorted by their labels.
     * The default sorting function uses `a.localeCompare(b, locales)`,
     * and, if that's not available, falls back to simple `a > b` / `a < b`.
     * Some languages, like Chinese, support multiple sorting variants
     * (called "collations"), and the user might prefer one or another.
     * Also, sometimes the Operating System language is not always
     * the preferred language for a person using a website or an application,
     * so there should be a way to specify custom locale.
     * This `locales` property mimicks the `locales` argument of `Intl` constructors,
     * and can be either a Unicode BCP 47 locale identifier or an array of such locale identifiers.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
     */
    locales: propTypes.exports.oneOfType([
        propTypes.exports.string,
        propTypes.exports.arrayOf(propTypes.exports.string),
    ]),

    /*
   * Custom country `<select/>` options sorting function.
   * The default one uses `a.localeCompare(b)`, and,
   * if that's not available, falls back to simple `a > b`/`a < b`.
   * There have been requests to add custom sorter for cases
   * like Chinese language and "pinyin" (non-default) sorting order.
   * https://stackoverflow.com/questions/22907288/chinese-sorting-by-pinyin-in-javascript-with-localecompare
  compareStrings: PropTypes.func,
   */

    /**
     * A URL template of a country flag, where
     * "{XX}" is a two-letter country code in upper case,
     * or where "{xx}" is a two-letter country code in lower case.
     * By default it points to `country-flag-icons` gitlab pages website.
     * I imagine someone might want to download those country flag icons
     * and host them on their own servers instead
     * (all flags are available in the `country-flag-icons` library).
     * There's a catch though: new countries may be added in future,
     * so when hosting country flag icons on your own server
     * one should check the `CHANGELOG.md` every time before updating this library,
     * otherwise there's a possibility that some new country flag would be missing.
     */
    flagUrl: propTypes.exports.string.isRequired,

    /**
     * Custom country flag icon components.
     * These flags will be used instead of the default ones.
     * The the "Flags" section of the readme for more info.
     *
     * The shape is an object where keys are country codes
     * and values are flag icon components.
     * Flag icon components receive the same properties
     * as `flagComponent` (see below).
     *
     * Example:
     *
     * `{ "RU": (props) => <img src="..."/> }`
     *
     * Example:
     *
     * `import flags from 'country-flag-icons/react/3x2'`
     *
     * `import PhoneInput from 'react-phone-number-input'`
     *
     * `<PhoneInput flags={flags} .../>`
     */
    flags: propTypes.exports.objectOf(propTypes.exports.elementType),

    /**
     * Country flag icon component.
     *
     * Takes properties:
     *
     * * `country: string` — The country code.
     * * `countryName: string` — The country name.
     * * `flagUrl: string` — The `flagUrl` property (see above).
     * * `flags: object` — The `flags` property (see above).
     */
    flagComponent: propTypes.exports.elementType.isRequired,

    /**
     * Set to `false` to remove the "International" option from country `<select/>`.
     */
    addInternationalOption: propTypes.exports.bool.isRequired,

    /**
     * "International" icon component.
     * Should have the same aspect ratio.
     *
     * Receives properties:
     *
     * * `title: string` — "International" country option label.
     */
    internationalIcon: propTypes.exports.elementType.isRequired,

    /**
     * Can be used to place some countries on top of the list of country `<select/>` options.
     *
     * * `"XX"` — inserts an option for "XX" country.
     * * `"🌐"` — inserts "International" option.
     * * `"|"` — inserts a separator.
     * * `"..."` — inserts options for the rest of the countries (can be omitted, in which case it will be automatically added at the end).
     *
     * Example:
     *
     * `["US", "CA", "AU", "|", "..."]`
     */
    countryOptionsOrder: propTypes.exports.arrayOf(propTypes.exports.string),

    /**
     * `<Phone/>` component CSS style object.
     */
    style: propTypes.exports.object,

    /**
     * `<Phone/>` component CSS class.
     */
    className: propTypes.exports.string,

    /**
     * Country `<select/>` component.
     *
     * Receives properties:
     *
     * * `name: string?` — HTML `name` attribute.
     * * `value: string?` — The currently selected country code.
     * * `onChange(value: string?)` — Updates the `value`.
     * * `onFocus()` — Is used to toggle the `--focus` CSS class.
     * * `onBlur()` — Is used to toggle the `--focus` CSS class.
     * * `options: object[]` — The list of all selectable countries (including "International") each being an object of shape `{ value: string?, label: string }`.
     * * `iconComponent: PropTypes.elementType` — React component that renders a country icon: `<Icon country={value}/>`. If `country` is `undefined` then it renders an "International" icon.
     * * `disabled: boolean?` — HTML `disabled` attribute.
     * * `tabIndex: (number|string)?` — HTML `tabIndex` attribute.
     * * `className: string` — CSS class name.
     */
    countrySelectComponent: propTypes.exports.elementType.isRequired,

    /**
     * Country `<select/>` component props.
     * Along with the usual DOM properties such as `aria-label` and `tabIndex`,
     * some custom properties are supported, such as `arrowComponent` and `unicodeFlags`.
     */
    countrySelectProps: propTypes.exports.object,

    /**
     * Phone number `<input/>` component.
     *
     * Receives properties:
     *
     * * `value: string` — The formatted `value`.
     * * `onChange(event: Event)` — Updates the formatted `value` from `event.target.value`.
     * * `onFocus()` — Is used to toggle the `--focus` CSS class.
     * * `onBlur()` — Is used to toggle the `--focus` CSS class.
     * * Other properties like `type="tel"` or `autoComplete="tel"` that should be passed through to the DOM `<input/>`.
     *
     * Must also either use `React.forwardRef()` to "forward" `ref` to the `<input/>` or implement `.focus()` method.
     */
    inputComponent: propTypes.exports.elementType.isRequired,

    /**
     * Wrapping `<div/>` component.
     *
     * Receives properties:
     *
     * * `style: object` — A component CSS style object.
     * * `className: string` — Classes to attach to the component, typically changes when component focuses or blurs.
     */
    containerComponent: propTypes.exports.elementType.isRequired,

    /**
     * Phone number `<input/>` component props.
     */
    numberInputProps: propTypes.exports.object,

    /**
     * By default, the caret position is being "intelligently" managed
     * while a user inputs a phone number.
     * This "smart" caret behavior can be turned off
     * by passing `smartCaret={false}` property.
     * This is just an "escape hatch" for any possible caret position issues.
     */
    // Is `true` by default.
    smartCaret: propTypes.exports.bool.isRequired,

    /**
     * Set to `true` to force "international" phone number format.
     * Set to `false` to force "national" phone number format.
     * By default it's `undefined` meaning that it doesn't enforce any phone number format.
     */
    international: propTypes.exports.bool,

    /**
     * If set to `true`, the phone number input will get trimmed
     * if it exceeds the maximum length for the country.
     */
    limitMaxLength: propTypes.exports.bool.isRequired,

    /**
     * If set to `false`, and `international` is `true`, then
     * users won't be able to erase the "country calling part"
     * of a phone number in the `<input/>`.
     */
    countryCallingCodeEditable: propTypes.exports.bool.isRequired,

    /**
     * `libphonenumber-js` metadata.
     *
     * Can be used to pass custom `libphonenumber-js` metadata
     * to reduce the overall bundle size for those who compile "custom" metadata.
     */
    metadata: metadata.isRequired,

    /**
     * Is called every time the selected country changes:
     * either programmatically or when user selects it manually from the list.
     */
    // People have been asking for a way to get the selected country.
    // @see  https://github.com/catamphetamine/react-phone-number-input/issues/128
    // For some it's just a "business requirement".
    // I guess it's about gathering as much info on the user as a website can
    // without introducing any addional fields that would complicate the form
    // therefore reducing "conversion" (that's a marketing term).
    // Assuming that the phone number's country is the user's country
    // is not 100% correct but in most cases I guess it's valid.
    onCountryChange: propTypes.exports.func,

    /**
     * If set to `false`, will not focus the `<input/>` component
     * when the user selects a country from the list of countries.
     * This can be used to conform to the Web Content Accessibility Guidelines (WCAG).
     * Quote:
     * "On input: Changing the setting of any user interface component
     *  does not automatically cause a change of context unless the user
     *  has been advised of the behaviour before using the component."
     */
    focusInputOnCountrySelection: propTypes.exports.bool.isRequired,
};
PhoneNumberInput.defaultProps = {
    /**
     * Remember (and autofill) the value as a phone number.
     */
    autoComplete: "tel",

    /**
     * Country `<select/>` component.
     */
    countrySelectComponent: CountrySelectWithIcon,

    /**
     * Flag icon component.
     */
    flagComponent: FlagComponent,

    /**
     * By default, uses icons from `country-flag-icons` gitlab pages website.
     */
    // Must be equal to `flagUrl` in `./CountryIcon.js`.
    flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg",

    /**
     * Default "International" country `<select/>` option icon.
     */
    internationalIcon: InternationalIcon,

    /**
     * Phone number `<input/>` component.
     */
    inputComponent: "input",

    /**
     * Wrapping `<div/>` component.
     */
    containerComponent: "div",

    /**
     * Some users requested a way to reset the component:
     * both number `<input/>` and country `<select/>`.
     * Whenever `reset` property changes both number `<input/>`
     * and country `<select/>` are reset.
     * It's not implemented as some instance `.reset()` method
     * because `ref` is forwarded to `<input/>`.
     * It's also not replaced with just resetting `country` on
     * external `value` reset, because a user could select a country
     * and then not input any `value`, and so the selected country
     * would be "stuck", if not using this `reset` property.
     */
    // https://github.com/catamphetamine/react-phone-number-input/issues/300
    reset: propTypes.exports.any,

    /**
     *
     */

    /**
     * Set to `false` to use "basic" caret instead of the "smart" one.
     */
    smartCaret: true,

    /**
     * Whether to add the "International" option
     * to the list of countries.
     */
    addInternationalOption: true,

    /**
     * If set to `true` the phone number input will get trimmed
     * if it exceeds the maximum length for the country.
     */
    limitMaxLength: false,

    /**
     * If set to `false`, and `international` is `true`, then
     * users won't be able to erase the "country calling part"
     * of a phone number in the `<input/>`.
     */
    countryCallingCodeEditable: true,

    /**
     * If set to `false`, will not focus the `<input/>` component
     * when the user selects a country from the list of countries.
     * This can be used to conform to the Web Content Accessibility Guidelines (WCAG).
     * Quote:
     * "On input: Changing the setting of any user interface component
     *  does not automatically cause a change of context unless the user
     *  has been advised of the behaviour before using the component."
     */
    focusInputOnCountrySelection: true,
};
var PhoneInput = PhoneNumberInput;
var countrySelectOptionsMemo;
var countrySelectOptionsMemoDependencies;

function useMemoCountrySelectOptions(generator, dependencies) {
    if (!countrySelectOptionsMemoDependencies || !areEqualArrays(dependencies, countrySelectOptionsMemoDependencies)) {
        countrySelectOptionsMemo = generator();
        countrySelectOptionsMemoDependencies = dependencies;
    }

    return countrySelectOptionsMemo;
}

function areEqualArrays(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    var i = 0;

    while (i < a.length) {
        if (a[i] !== b[i]) {
            return false;
        }

        i++;
    }

    return true;
}

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
}
/**
 * Formats a phone number.
 * Is a proxy for `libphonenumber-js`'s `.format()` function of a parsed `PhoneNumber`.
 * @param  {string} value
 * @param  {string} [format]
 * @param  {object} metadata
 * @return {string}
 */

function formatPhoneNumber(value, format, metadata) {
    if (!metadata) {
        if (_typeof(format) === "object") {
            metadata = format;
            format = "NATIONAL";
        }
    }

    if (!value) {
        return "";
    }

    var phoneNumber = parsePhoneNumberFromString(value, metadata);

    if (!phoneNumber) {
        return "";
    } // Deprecated.
    // Legacy `format`s.

    switch (format) {
        case "National":
            format = "NATIONAL";
            break;

        case "International":
            format = "INTERNATIONAL";
            break;
    }

    return phoneNumber.format(format);
}
function formatPhoneNumberIntl$1(value, metadata) {
    return formatPhoneNumber(value, "INTERNATIONAL", metadata);
}

var ext = "ext.";
var country = "Phone number country";
var phone = "Phone";
var AB = "Abkhazia";
var AC = "Ascension Island";
var AD = "Andorra";
var AE = "United Arab Emirates";
var AF = "Afghanistan";
var AG = "Antigua and Barbuda";
var AI = "Anguilla";
var AL = "Albania";
var AM = "Armenia";
var AO = "Angola";
var AQ = "Antarctica";
var AR = "Argentina";
var AS = "American Samoa";
var AT = "Austria";
var AU = "Australia";
var AW = "Aruba";
var AX = "Åland Islands";
var AZ = "Azerbaijan";
var BA = "Bosnia and Herzegovina";
var BB = "Barbados";
var BD = "Bangladesh";
var BE = "Belgium";
var BF = "Burkina Faso";
var BG = "Bulgaria";
var BH = "Bahrain";
var BI = "Burundi";
var BJ = "Benin";
var BL = "Saint Barthélemy";
var BM = "Bermuda";
var BN = "Brunei Darussalam";
var BO = "Bolivia";
var BQ = "Bonaire, Sint Eustatius and Saba";
var BR = "Brazil";
var BS = "Bahamas";
var BT = "Bhutan";
var BV = "Bouvet Island";
var BW = "Botswana";
var BY = "Belarus";
var BZ = "Belize";
var CA = "Canada";
var CC = "Cocos (Keeling) Islands";
var CD = "Congo, Democratic Republic of the";
var CF = "Central African Republic";
var CG = "Congo";
var CH = "Switzerland";
var CI = "Cote d'Ivoire";
var CK = "Cook Islands";
var CL = "Chile";
var CM = "Cameroon";
var CN = "China";
var CO = "Colombia";
var CR = "Costa Rica";
var CU = "Cuba";
var CV = "Cape Verde";
var CW = "Curaçao";
var CX = "Christmas Island";
var CY = "Cyprus";
var CZ = "Czech Republic";
var DE = "Germany";
var DJ = "Djibouti";
var DK = "Denmark";
var DM = "Dominica";
var DO = "Dominican Republic";
var DZ = "Algeria";
var EC = "Ecuador";
var EE = "Estonia";
var EG = "Egypt";
var EH = "Western Sahara";
var ER = "Eritrea";
var ES = "Spain";
var ET = "Ethiopia";
var FI = "Finland";
var FJ = "Fiji";
var FK = "Falkland Islands";
var FM = "Federated States of Micronesia";
var FO = "Faroe Islands";
var FR = "France";
var GA = "Gabon";
var GB = "United Kingdom";
var GD = "Grenada";
var GE = "Georgia";
var GF = "French Guiana";
var GG = "Guernsey";
var GH = "Ghana";
var GI = "Gibraltar";
var GL = "Greenland";
var GM = "Gambia";
var GN = "Guinea";
var GP = "Guadeloupe";
var GQ = "Equatorial Guinea";
var GR = "Greece";
var GS = "South Georgia and the South Sandwich Islands";
var GT = "Guatemala";
var GU = "Guam";
var GW = "Guinea-Bissau";
var GY = "Guyana";
var HK = "Hong Kong";
var HM = "Heard Island and McDonald Islands";
var HN = "Honduras";
var HR = "Croatia";
var HT = "Haiti";
var HU = "Hungary";
var ID = "Indonesia";
var IE = "Ireland";
var IL = "Israel";
var IM = "Isle of Man";
var IN = "India";
var IO = "British Indian Ocean Territory";
var IQ = "Iraq";
var IR = "Iran";
var IS = "Iceland";
var IT = "Italy";
var JE = "Jersey";
var JM = "Jamaica";
var JO = "Jordan";
var JP = "Japan";
var KE = "Kenya";
var KG = "Kyrgyzstan";
var KH = "Cambodia";
var KI = "Kiribati";
var KM = "Comoros";
var KN = "Saint Kitts and Nevis";
var KP = "North Korea";
var KR = "South Korea";
var KW = "Kuwait";
var KY = "Cayman Islands";
var KZ = "Kazakhstan";
var LA = "Laos";
var LB = "Lebanon";
var LC = "Saint Lucia";
var LI = "Liechtenstein";
var LK = "Sri Lanka";
var LR = "Liberia";
var LS = "Lesotho";
var LT = "Lithuania";
var LU = "Luxembourg";
var LV = "Latvia";
var LY = "Libya";
var MA = "Morocco";
var MC = "Monaco";
var MD = "Moldova";
var ME = "Montenegro";
var MF = "Saint Martin (French Part)";
var MG = "Madagascar";
var MH = "Marshall Islands";
var MK = "North Macedonia";
var ML = "Mali";
var MM = "Burma";
var MN = "Mongolia";
var MO = "Macao";
var MP = "Northern Mariana Islands";
var MQ = "Martinique";
var MR = "Mauritania";
var MS = "Montserrat";
var MT = "Malta";
var MU = "Mauritius";
var MV = "Maldives";
var MW = "Malawi";
var MX = "Mexico";
var MY = "Malaysia";
var MZ = "Mozambique";
var NA = "Namibia";
var NC = "New Caledonia";
var NE = "Niger";
var NF = "Norfolk Island";
var NG = "Nigeria";
var NI = "Nicaragua";
var NL = "Netherlands";
var NO = "Norway";
var NP = "Nepal";
var NR = "Nauru";
var NU = "Niue";
var NZ = "New Zealand";
var OM = "Oman";
var OS = "South Ossetia";
var PA = "Panama";
var PE = "Peru";
var PF = "French Polynesia";
var PG = "Papua New Guinea";
var PH = "Philippines";
var PK = "Pakistan";
var PL = "Poland";
var PM = "Saint Pierre and Miquelon";
var PN = "Pitcairn";
var PR = "Puerto Rico";
var PS = "Palestine";
var PT = "Portugal";
var PW = "Palau";
var PY = "Paraguay";
var QA = "Qatar";
var RE = "Reunion";
var RO = "Romania";
var RS = "Serbia";
var RU = "Russia";
var RW = "Rwanda";
var SA = "Saudi Arabia";
var SB = "Solomon Islands";
var SC = "Seychelles";
var SD = "Sudan";
var SE = "Sweden";
var SG = "Singapore";
var SH = "Saint Helena";
var SI = "Slovenia";
var SJ = "Svalbard and Jan Mayen";
var SK = "Slovakia";
var SL = "Sierra Leone";
var SM = "San Marino";
var SN = "Senegal";
var SO = "Somalia";
var SR = "Suriname";
var SS = "South Sudan";
var ST = "Sao Tome and Principe";
var SV = "El Salvador";
var SX = "Sint Maarten";
var SY = "Syria";
var SZ = "Swaziland";
var TA = "Tristan da Cunha";
var TC = "Turks and Caicos Islands";
var TD = "Chad";
var TF = "French Southern Territories";
var TG = "Togo";
var TH = "Thailand";
var TJ = "Tajikistan";
var TK = "Tokelau";
var TL = "Timor-Leste";
var TM = "Turkmenistan";
var TN = "Tunisia";
var TO = "Tonga";
var TR = "Turkey";
var TT = "Trinidad and Tobago";
var TV = "Tuvalu";
var TW = "Taiwan";
var TZ = "Tanzania";
var UA = "Ukraine";
var UG = "Uganda";
var UM = "United States Minor Outlying Islands";
var US = "United States";
var UY = "Uruguay";
var UZ = "Uzbekistan";
var VA = "Holy See (Vatican City State)";
var VC = "Saint Vincent and the Grenadines";
var VE = "Venezuela";
var VG = "Virgin Islands, British";
var VI = "Virgin Islands, U.S.";
var VN = "Vietnam";
var VU = "Vanuatu";
var WF = "Wallis and Futuna";
var WS = "Samoa";
var XK = "Kosovo";
var YE = "Yemen";
var YT = "Mayotte";
var ZA = "South Africa";
var ZM = "Zambia";
var ZW = "Zimbabwe";
var ZZ = "International";
var labels = {
    ext: ext,
    country: country,
    phone: phone,
    AB: AB,
    AC: AC,
    AD: AD,
    AE: AE,
    AF: AF,
    AG: AG,
    AI: AI,
    AL: AL,
    AM: AM,
    AO: AO,
    AQ: AQ,
    AR: AR,
    AS: AS,
    AT: AT,
    AU: AU,
    AW: AW,
    AX: AX,
    AZ: AZ,
    BA: BA,
    BB: BB,
    BD: BD,
    BE: BE,
    BF: BF,
    BG: BG,
    BH: BH,
    BI: BI,
    BJ: BJ,
    BL: BL,
    BM: BM,
    BN: BN,
    BO: BO,
    BQ: BQ,
    BR: BR,
    BS: BS,
    BT: BT,
    BV: BV,
    BW: BW,
    BY: BY,
    BZ: BZ,
    CA: CA,
    CC: CC,
    CD: CD,
    CF: CF,
    CG: CG,
    CH: CH,
    CI: CI,
    CK: CK,
    CL: CL,
    CM: CM,
    CN: CN,
    CO: CO,
    CR: CR,
    CU: CU,
    CV: CV,
    CW: CW,
    CX: CX,
    CY: CY,
    CZ: CZ,
    DE: DE,
    DJ: DJ,
    DK: DK,
    DM: DM,
    DO: DO,
    DZ: DZ,
    EC: EC,
    EE: EE,
    EG: EG,
    EH: EH,
    ER: ER,
    ES: ES,
    ET: ET,
    FI: FI,
    FJ: FJ,
    FK: FK,
    FM: FM,
    FO: FO,
    FR: FR,
    GA: GA,
    GB: GB,
    GD: GD,
    GE: GE,
    GF: GF,
    GG: GG,
    GH: GH,
    GI: GI,
    GL: GL,
    GM: GM,
    GN: GN,
    GP: GP,
    GQ: GQ,
    GR: GR,
    GS: GS,
    GT: GT,
    GU: GU,
    GW: GW,
    GY: GY,
    HK: HK,
    HM: HM,
    HN: HN,
    HR: HR,
    HT: HT,
    HU: HU,
    ID: ID,
    IE: IE,
    IL: IL,
    IM: IM,
    IN: IN,
    IO: IO,
    IQ: IQ,
    IR: IR,
    IS: IS,
    IT: IT,
    JE: JE,
    JM: JM,
    JO: JO,
    JP: JP,
    KE: KE,
    KG: KG,
    KH: KH,
    KI: KI,
    KM: KM,
    KN: KN,
    KP: KP,
    KR: KR,
    KW: KW,
    KY: KY,
    KZ: KZ,
    LA: LA,
    LB: LB,
    LC: LC,
    LI: LI,
    LK: LK,
    LR: LR,
    LS: LS,
    LT: LT,
    LU: LU,
    LV: LV,
    LY: LY,
    MA: MA,
    MC: MC,
    MD: MD,
    ME: ME,
    MF: MF,
    MG: MG,
    MH: MH,
    MK: MK,
    ML: ML,
    MM: MM,
    MN: MN,
    MO: MO,
    MP: MP,
    MQ: MQ,
    MR: MR,
    MS: MS,
    MT: MT,
    MU: MU,
    MV: MV,
    MW: MW,
    MX: MX,
    MY: MY,
    MZ: MZ,
    NA: NA,
    NC: NC,
    NE: NE,
    NF: NF,
    NG: NG,
    NI: NI,
    NL: NL,
    NO: NO,
    NP: NP,
    NR: NR,
    NU: NU,
    NZ: NZ,
    OM: OM,
    OS: OS,
    PA: PA,
    PE: PE,
    PF: PF,
    PG: PG,
    PH: PH,
    PK: PK,
    PL: PL,
    PM: PM,
    PN: PN,
    PR: PR,
    PS: PS,
    PT: PT,
    PW: PW,
    PY: PY,
    QA: QA,
    RE: RE,
    RO: RO,
    RS: RS,
    RU: RU,
    RW: RW,
    SA: SA,
    SB: SB,
    SC: SC,
    SD: SD,
    SE: SE,
    SG: SG,
    SH: SH,
    SI: SI,
    SJ: SJ,
    SK: SK,
    SL: SL,
    SM: SM,
    SN: SN,
    SO: SO,
    SR: SR,
    SS: SS,
    ST: ST,
    SV: SV,
    SX: SX,
    SY: SY,
    SZ: SZ,
    TA: TA,
    TC: TC,
    TD: TD,
    TF: TF,
    TG: TG,
    TH: TH,
    TJ: TJ,
    TK: TK,
    TL: TL,
    TM: TM,
    TN: TN,
    TO: TO,
    TR: TR,
    TT: TT,
    TV: TV,
    TW: TW,
    TZ: TZ,
    UA: UA,
    UG: UG,
    UM: UM,
    US: US,
    UY: UY,
    UZ: UZ,
    VA: VA,
    VC: VC,
    VE: VE,
    VG: VG,
    VI: VI,
    VN: VN,
    VU: VU,
    WF: WF,
    WS: WS,
    XK: XK,
    YE: YE,
    YT: YT,
    ZA: ZA,
    ZM: ZM,
    ZW: ZW,
    ZZ: ZZ,
};

function _extends() {
    _extends =
        Object.assign ||
        function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    return _extends.apply(this, arguments);
}
function createPhoneInput(defaultMetadata) {
    var PhoneInputDefault = React.forwardRef(function (props, ref) {
        return React.createElement(
            PhoneInput,
            _extends(
                {
                    ref: ref,
                },
                props
            )
        );
    });
    PhoneInputDefault.propTypes = {
        metadata: metadata.isRequired,
        labels: labels$1.isRequired,
    };
    PhoneInputDefault.defaultProps = {
        metadata: defaultMetadata,
        labels: labels,
    };
    return PhoneInputDefault;
}
createPhoneInput();

function call(func, _arguments) {
    var args = Array.prototype.slice.call(_arguments);
    args.push(metadata$1);
    return func.apply(this, args);
}

createPhoneInput(metadata$1);

function formatPhoneNumberIntl() {
    return call(formatPhoneNumberIntl$1, arguments);
}

var defaultTranslationsPasswordless = {
    en: sessionAuth.__assign(sessionAuth.__assign({}, index.defaultTranslationsCommon.en), {
        GENERAL_ERROR_EMAIL_UNDEFINED: "Please set your email",
        GENERAL_ERROR_EMAIL_NON_STRING: "Email must be of type string",
        GENERAL_ERROR_EMAIL_INVALID: "Email is invalid",
        GENERAL_ERROR_PHONE_UNDEFINED: "Please set your phone number",
        GENERAL_ERROR_PHONE_NON_STRING: "Phone number must be of type string",
        GENERAL_ERROR_PHONE_INVALID: "Phone number is invalid",
        GENERAL_ERROR_EMAIL_OR_PHONE_UNDEFINED: "Please set your email or phone number",
        GENERAL_ERROR_EMAIL_OR_PHONE_NON_STRING: "Email or Phone number must be of type string",
        GENERAL_ERROR_EMAIL_OR_PHONE_INVALID: "Email or Phone number is invalid",
        GENERAL_ERROR_OTP_UNDEFINED: "Please fill your OTP",
        GENERAL_ERROR_OTP_INVALID: "Invalid OTP",
        GENERAL_ERROR_OTP_EXPIRED: "Expired OTP.",
        GENERAL_ERROR_OTP_NON_STRING: "OTP must be of type string",
        GENERAL_ERROR_OTP_EMPTY: "OTP cannot be empty",
        ERROR_SIGN_IN_UP_LINK: "Invalid magic link. Please try again.",
        ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW: "Login timed out. Please try again.",
        ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW: "Login unsuccessful. Please try again.",
        PWLESS_CLOSE_TAB_TITLE: "Success!",
        PWLESS_CLOSE_TAB_SUBTITLE_LINE1: "You have been successfully signed in.",
        PWLESS_CLOSE_TAB_SUBTITLE_LINE2: "Please close this tab",
        PWLESS_SIGN_IN_UP_HEADER_TITLE: "Sign Up or Log In",
        PWLESS_SIGN_IN_UP_FOOTER_START: "By continuing, you agree to our ",
        PWLESS_SIGN_IN_UP_FOOTER_TOS: "Terms of Service",
        PWLESS_SIGN_IN_UP_FOOTER_AND: " and ",
        PWLESS_SIGN_IN_UP_FOOTER_PP: "Privacy Policy",
        PWLESS_SIGN_IN_UP_FOOTER_END: "",
        PWLESS_SIGN_IN_UP_EMAIL_LABEL: "Email",
        PWLESS_SIGN_IN_UP_PHONE_LABEL: "Phone Number",
        PWLESS_SIGN_IN_UP_EMAIL_OR_PHONE_LABEL: "Email or Phone number",
        PWLESS_SIGN_IN_UP_CONTINUE_BUTTON: "CONTINUE",
        PWLESS_EMAIL_OR_PHONE_INVALID_INPUT_GUESS_PHONE_ERR: "Please enter a valid phone number with its country code.",
        PWLESS_LINK_SENT_RESEND_SUCCESS: "Link resent",
        PWLESS_LINK_SENT_RESEND_TITLE: "Link sent!",
        PWLESS_LINK_SENT_RESEND_DESC_START_EMAIL: "We sent a link to ",
        PWLESS_LINK_SENT_RESEND_DESC_START_PHONE: "We sent a link to your phone number ",
        PWLESS_LINK_SENT_RESEND_DESC_END_EMAIL: " Click the link to login or sign up",
        PWLESS_LINK_SENT_RESEND_DESC_END_PHONE: "",
        PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL: "Change email",
        PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE: "Change phone number",
        PWLESS_LINK_CLICKED_CONTINUE_HEADER: "Sign Up or Log In",
        PWLESS_LINK_CLICKED_CONTINUE_DESC: "Click the button below to log in on this device",
        PWLESS_LINK_CLICKED_CONTINUE_BUTTON: "CONTINUE",
        PWLESS_RESEND_SUCCESS_EMAIL: "Email resent",
        PWLESS_RESEND_SUCCESS_PHONE: "SMS resent",
        PWLESS_RESEND_BTN_DISABLED_START: "Resend in ",
        PWLESS_RESEND_BTN_DISABLED_END: "",
        PWLESS_RESEND_BTN_EMAIL: "Resend Email",
        PWLESS_RESEND_BTN_PHONE: "Resend SMS",
        PWLESS_USER_INPUT_CODE_HEADER_TITLE: "Enter OTP",
        PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE: "An OTP was sent to you at",
        PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE_LINK: "An OTP and a magic link was sent to you at",
        PWLESS_USER_INPUT_CODE_INPUT_LABEL: "OTP",
        /*
         * The following are error messages from our backend SDK.
         * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
         * They are shown as is by default (setting the value to undefined will display the raw translation key)
         */
        "Failed to generate a one time code. Please try again": undefined,
        "Phone number is invalid": undefined,
        "Email is invalid": undefined,
    }),
};

var useSuccessInAnotherTabChecker = function (state, dispatch, userContext) {
    var callingConsumeCodeRef = React.useRef(false);
    React.useEffect(
        function () {
            // We only need to start checking this if we have an active login attempt
            if (state.loginAttemptInfo && !state.successInAnotherTab) {
                var checkSessionIntervalHandle_1 = setInterval(function () {
                    return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                        var hasSession;
                        return sessionAuth.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(callingConsumeCodeRef.current === false)) return [3 /*break*/, 2];
                                    return [
                                        4 /*yield*/,
                                        session.SessionAPIWrapper.doesSessionExist({
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    hasSession = _a.sent();
                                    if (hasSession) {
                                        dispatch({ type: "successInAnotherTab" });
                                    }
                                    _a.label = 2;
                                case 2:
                                    return [2 /*return*/];
                            }
                        });
                    });
                }, 2000);
                return function () {
                    clearInterval(checkSessionIntervalHandle_1);
                };
            }
            // Nothing to clean up
            return;
        },
        [state.loginAttemptInfo, state.successInAnotherTab]
    );
    return callingConsumeCodeRef;
};
var useFeatureReducer = function (recipeImpl, userContext) {
    var _a = React__namespace.useReducer(
            function (oldState, action) {
                switch (action.type) {
                    case "load":
                        return {
                            loaded: true,
                            error: action.error,
                            loginAttemptInfo: action.loginAttemptInfo,
                            successInAnotherTab: false,
                        };
                    case "resendCode":
                        if (!oldState.loginAttemptInfo) {
                            return oldState;
                        }
                        return sessionAuth.__assign(sessionAuth.__assign({}, oldState), {
                            error: undefined,
                            loginAttemptInfo: sessionAuth.__assign(
                                sessionAuth.__assign({}, oldState.loginAttemptInfo),
                                { lastResend: action.timestamp }
                            ),
                        });
                    case "restartFlow":
                        return sessionAuth.__assign(sessionAuth.__assign({}, oldState), {
                            error: action.error,
                            loginAttemptInfo: undefined,
                        });
                    case "setError":
                        return sessionAuth.__assign(sessionAuth.__assign({}, oldState), { error: action.error });
                    case "startLogin":
                        return sessionAuth.__assign(sessionAuth.__assign({}, oldState), {
                            loginAttemptInfo: action.loginAttemptInfo,
                            error: undefined,
                        });
                    case "successInAnotherTab":
                        return sessionAuth.__assign(sessionAuth.__assign({}, oldState), { successInAnotherTab: true });
                    default:
                        return oldState;
                }
            },
            {
                error: undefined,
                loaded: false,
                loginAttemptInfo: undefined,
                successInAnotherTab: false,
            },
            function (initArg) {
                var error = undefined;
                var errorQueryParam = sessionAuth.getQueryParams("error");
                var messageQueryParam = sessionAuth.getQueryParams("message");
                if (errorQueryParam !== null) {
                    if (errorQueryParam === "signin") {
                        error = "SOMETHING_WENT_WRONG_ERROR";
                    } else if (errorQueryParam === "restart_link") {
                        error = "ERROR_SIGN_IN_UP_LINK";
                    } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                        error = messageQueryParam;
                    }
                }
                return sessionAuth.__assign(sessionAuth.__assign({}, initArg), { error: error });
            }
        ),
        state = _a[0],
        dispatch = _a[1];
    React.useEffect(
        function () {
            if (recipeImpl === undefined) {
                return;
            }
            function load() {
                return sessionAuth.__awaiter(this, void 0, void 0, function () {
                    var error, errorQueryParam, messageQueryParam, loginAttemptInfo;
                    return sessionAuth.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                error = undefined;
                                errorQueryParam = sessionAuth.getQueryParams("error");
                                messageQueryParam = sessionAuth.getQueryParams("message");
                                if (errorQueryParam !== null) {
                                    if (errorQueryParam === "signin") {
                                        error = "SOMETHING_WENT_WRONG_ERROR";
                                    } else if (errorQueryParam === "restart_link") {
                                        error = "ERROR_SIGN_IN_UP_LINK";
                                    } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                                        error = messageQueryParam;
                                    }
                                }
                                return [
                                    4 /*yield*/,
                                    getLoginAttemptInfo({
                                        recipeImplementation: recipeImpl,
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                loginAttemptInfo = _a.sent();
                                // No need to check if the component is unmounting, since this has no effect then.
                                dispatch({ type: "load", loginAttemptInfo: loginAttemptInfo, error: error });
                                return [2 /*return*/];
                        }
                    });
                });
            }
            if (state.loaded === false) {
                void load();
            }
        },
        [state.loaded, recipeImpl, userContext]
    );
    return [state, dispatch];
};
function useChildProps(recipe, dispatch, state, callingConsumeCodeRef, userContext, history) {
    var recipeImplementation = React__namespace.useMemo(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.recipeImpl, dispatch, callingConsumeCodeRef);
        },
        [recipe]
    );
    return React.useMemo(
        function () {
            if (!recipe || !recipeImplementation) {
                return undefined;
            }
            return {
                onSuccess: function (result) {
                    return sessionAuth.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                        {
                            rid: recipe.config.recipeId,
                            successRedirectContext: {
                                action: "SUCCESS",
                                isNewUser: result.createdNewUser,
                                redirectToPath: sessionAuth.getRedirectToPathFromURL(),
                            },
                        },
                        userContext,
                        history
                    );
                },
                recipeImplementation: recipeImplementation,
                config: recipe.config,
            };
        },
        [state, recipeImplementation]
    );
}
var SignInUpFeature = function (props) {
    var componentOverrides = props.recipe.config.override.components;
    var userContext = sessionAuth.useUserContext();
    var _a = useFeatureReducer(props.recipe.recipeImpl, userContext),
        state = _a[0],
        dispatch = _a[1];
    var callingConsumeCodeRef = useSuccessInAnotherTabChecker(state, dispatch, userContext);
    var childProps = useChildProps(props.recipe, dispatch, state, callingConsumeCodeRef, userContext, props.history);
    return jsxRuntime.jsx(
        index.ComponentOverrideContext.Provider,
        sessionAuth.__assign(
            { value: componentOverrides },
            {
                children: jsxRuntime.jsx(
                    index.FeatureWrapper,
                    sessionAuth.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: defaultTranslationsPasswordless,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            SignInUpThemeWrapper,
                                            sessionAuth.__assign({}, childProps, {
                                                featureState: state,
                                                dispatch: dispatch,
                                            })
                                        ),
                                    props.children &&
                                        React__namespace.Children.map(props.children, function (child) {
                                            if (React__namespace.isValidElement(child)) {
                                                return React__namespace.cloneElement(
                                                    child,
                                                    sessionAuth.__assign(sessionAuth.__assign({}, childProps), {
                                                        featureState: state,
                                                        dispatch: dispatch,
                                                    })
                                                );
                                            }
                                            return child;
                                        }),
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};
function getModifiedRecipeImplementation(originalImpl, dispatch, callingConsumeCodeRef) {
    var _this = this;
    return sessionAuth.__assign(sessionAuth.__assign({}, originalImpl), {
        createCode: function (input) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                var contactInfo, res, contactMethod, loginAttemptInfo;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if ("email" in input) {
                                contactInfo = input.email;
                            } else {
                                contactInfo = formatPhoneNumberIntl(input.phoneNumber);
                            }
                            return [4 /*yield*/, originalImpl.createCode(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 3];
                            contactMethod = "email" in input ? "EMAIL" : "PHONE";
                            loginAttemptInfo = {
                                deviceId: res.deviceId,
                                preAuthSessionId: res.preAuthSessionId,
                                flowType: res.flowType,
                                lastResend: Date.now(),
                                contactMethod: contactMethod,
                                contactInfo: contactInfo,
                                redirectToPath: sessionAuth.getRedirectToPathFromURL(),
                            };
                            return [
                                4 /*yield*/,
                                setLoginAttemptInfo({
                                    recipeImplementation: originalImpl,
                                    userContext: input.userContext,
                                    attemptInfo: loginAttemptInfo,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            dispatch({ type: "startLogin", loginAttemptInfo: loginAttemptInfo });
                            _a.label = 3;
                        case 3:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        resendCode: function (input) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                var res, loginAttemptInfo, timestamp;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.resendCode(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                getLoginAttemptInfo({
                                    recipeImplementation: originalImpl,
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            loginAttemptInfo = _a.sent();
                            if (!(loginAttemptInfo !== undefined && loginAttemptInfo.deviceId === input.deviceId))
                                return [3 /*break*/, 4];
                            timestamp = Date.now();
                            return [
                                4 /*yield*/,
                                setLoginAttemptInfo({
                                    recipeImplementation: originalImpl,
                                    userContext: input.userContext,
                                    attemptInfo: sessionAuth.__assign(sessionAuth.__assign({}, loginAttemptInfo), {
                                        lastResend: timestamp,
                                    }),
                                }),
                            ];
                        case 3:
                            _a.sent();
                            dispatch({ type: "resendCode", timestamp: timestamp });
                            _a.label = 4;
                        case 4:
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 7];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 6:
                            _a.sent();
                            dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW" });
                            _a.label = 7;
                        case 7:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        consumeCode: function (input) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                var res;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // We need to call consume code while callingConsume, so we don't detect
                            // the session creation too early and go to successInAnotherTab too early
                            callingConsumeCodeRef.current = true;
                            return [4 /*yield*/, originalImpl.consumeCode(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW" });
                            return [3 /*break*/, 5];
                        case 3:
                            if (!(res.status === "OK")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            callingConsumeCodeRef.current = false;
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        clearLoginAttemptInfo: function (input) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            _a.sent();
                            sessionAuth.clearErrorQueryParam();
                            dispatch({ type: "restartFlow", error: undefined });
                            return [2 /*return*/];
                    }
                });
            });
        },
    });
}

var PasswordlessLinkClickedScreen = function (props) {
    var t = translationContext.useTranslation();
    var _a = React.useState(false),
        loading = _a[0],
        setLoading = _a[1];
    return jsxRuntime.jsx(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsx(
                    "div",
                    sessionAuth.__assign(
                        { "data-supertokens": "row" },
                        {
                            children:
                                props.requireUserInteraction === true
                                    ? jsxRuntime.jsxs(React.Fragment, {
                                          children: [
                                              jsxRuntime.jsx(
                                                  "div",
                                                  sessionAuth.__assign(
                                                      { "data-supertokens": "headerTitle" },
                                                      { children: t("PWLESS_LINK_CLICKED_CONTINUE_HEADER") }
                                                  )
                                              ),
                                              jsxRuntime.jsx(
                                                  "div",
                                                  sessionAuth.__assign(
                                                      { "data-supertokens": "headerSubtitle secondaryText" },
                                                      { children: t("PWLESS_LINK_CLICKED_CONTINUE_DESC") }
                                                  )
                                              ),
                                              jsxRuntime.jsx(
                                                  "div",
                                                  sessionAuth.__assign(
                                                      { "data-supertokens": "continueButtonWrapper" },
                                                      {
                                                          children: jsxRuntime.jsx(button.Button, {
                                                              isLoading: loading,
                                                              onClick: function () {
                                                                  setLoading(true);
                                                                  props.consumeCode();
                                                              },
                                                              type: "button",
                                                              label: "PWLESS_LINK_CLICKED_CONTINUE_BUTTON",
                                                          }),
                                                      }
                                                  )
                                              ),
                                          ],
                                      })
                                    : jsxRuntime.jsx(
                                          "div",
                                          sessionAuth.__assign(
                                              { "data-supertokens": "spinner" },
                                              { children: jsxRuntime.jsx(spinnerIcon.SpinnerIcon, {}) }
                                          )
                                      ),
                        }
                    )
                ),
            }
        )
    );
};
var LinkClickedScreen$1 = index.withOverride("PasswordlessLinkClickedScreen", PasswordlessLinkClickedScreen);

var LinkClickedScreen = function (props) {
    var userContext = sessionAuth.useUserContext();
    var _a = React.useState(false),
        requireUserInteraction = _a[0],
        setRequireUserInteraction = _a[1];
    var consumeCodeAtMount = React.useCallback(
        function () {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                var preAuthSessionId, linkCode, loginAttemptInfo;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            preAuthSessionId = sessionAuth.getQueryParams("preAuthSessionId");
                            linkCode = sessionAuth.getURLHash();
                            if (!(preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0))
                                return [3 /*break*/, 2];
                            return [
                                4 /*yield*/,
                                sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                    history: props.history,
                                    queryParams: {
                                        error: "signin",
                                    },
                                    redirectBack: false,
                                }),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, "REDIRECTING"];
                        case 2:
                            return [
                                4 /*yield*/,
                                props.recipe.recipeImpl.getLoginAttemptInfo({ userContext: userContext }),
                            ];
                        case 3:
                            loginAttemptInfo = _a.sent();
                            if (
                                (loginAttemptInfo === null || loginAttemptInfo === void 0
                                    ? void 0
                                    : loginAttemptInfo.preAuthSessionId) !== preAuthSessionId
                            ) {
                                return [2 /*return*/, "REQUIRES_INTERACTION"];
                            }
                            return [
                                2 /*return*/,
                                props.recipe.recipeImpl.consumeCode({
                                    preAuthSessionId: preAuthSessionId,
                                    linkCode: linkCode,
                                    userContext: userContext,
                                }),
                            ];
                    }
                });
            });
        },
        [props.recipe, props.history]
    );
    var handleConsumeResp = React.useCallback(
        function (response) {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                var loginAttemptInfo;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (response === "REQUIRES_INTERACTION") {
                                // We set this here, to make sure it's set after a possible remount
                                setRequireUserInteraction(true);
                            }
                            if (typeof response === "string") {
                                // In this case we are already redirecting or showing the continue button
                                return [2 /*return*/];
                            }
                            if (response.status === "RESTART_FLOW_ERROR") {
                                return [
                                    2 /*return*/,
                                    sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        history: props.history,
                                        queryParams: {
                                            error: "restart_link",
                                        },
                                        redirectBack: false,
                                    }),
                                ];
                            }
                            if (!(response.status === "OK")) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                getLoginAttemptInfo({
                                    recipeImplementation: props.recipe.recipeImpl,
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            loginAttemptInfo = _a.sent();
                            return [
                                4 /*yield*/,
                                props.recipe.recipeImpl.clearLoginAttemptInfo({
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            return [
                                2 /*return*/,
                                sessionAuth.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                    {
                                        rid: props.recipe.config.recipeId,
                                        successRedirectContext: {
                                            action: "SUCCESS",
                                            isNewUser: response.createdNewUser,
                                            redirectToPath:
                                                loginAttemptInfo === null || loginAttemptInfo === void 0
                                                    ? void 0
                                                    : loginAttemptInfo.redirectToPath,
                                        },
                                    },
                                    userContext,
                                    props.history
                                ),
                            ];
                        case 3:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.history, props.recipe]
    );
    var handleConsumeError = React.useCallback(
        function (err) {
            if (index.STGeneralError.isThisError(err)) {
                return sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    queryParams: {
                        error: "custom",
                        message: err.message,
                    },
                    redirectBack: false,
                });
            } else {
                return sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    queryParams: {
                        error: "signin",
                    },
                    redirectBack: false,
                });
            }
        },
        [props.recipe, props.history]
    );
    sessionAuth.useOnMountAPICall(consumeCodeAtMount, handleConsumeResp, handleConsumeError);
    var componentOverrides = props.recipe.config.override.components;
    var childProps = {
        recipeImplementation: props.recipe.recipeImpl,
        config: props.recipe.config,
        requireUserInteraction: requireUserInteraction,
        consumeCode: function () {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                var preAuthSessionId, linkCode, consumeResp, err_1;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            preAuthSessionId = sessionAuth.getQueryParams("preAuthSessionId");
                            linkCode = sessionAuth.getURLHash();
                            if (preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0) {
                                // This should never happen, and even if it does the we should be already redirecting
                                throw new Error("Called consumeCode withouth link info");
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [
                                4 /*yield*/,
                                props.recipe.recipeImpl.consumeCode({
                                    preAuthSessionId: preAuthSessionId,
                                    linkCode: linkCode,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            consumeResp = _a.sent();
                            return [4 /*yield*/, handleConsumeResp(consumeResp)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _a.sent();
                            void handleConsumeError(err_1);
                            return [3 /*break*/, 5];
                        case 5:
                            return [2 /*return*/];
                    }
                });
            });
        },
    };
    return jsxRuntime.jsx(
        index.ComponentOverrideContext.Provider,
        sessionAuth.__assign(
            { value: componentOverrides },
            {
                children: jsxRuntime.jsx(
                    index.FeatureWrapper,
                    sessionAuth.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: defaultTranslationsPasswordless,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(LinkClickedScreen$1, sessionAuth.__assign({}, childProps)),
                                    props.children &&
                                        React.Children.map(props.children, function (child) {
                                            if (React.isValidElement(child)) {
                                                return React.cloneElement(child, childProps);
                                            }
                                            return child;
                                        }),
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};

/*
 * Class.
 */
var Passwordless = /** @class */ (function (_super) {
    sessionAuth.__extends(Passwordless, _super);
    function Passwordless(config) {
        var _this = _super.call(this, normalisePasswordlessConfig(config)) || this;
        _this.getFeatures = function () {
            var features = {};
            if (_this.config.signInUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("signInUp", props);
                    },
                };
            }
            if (_this.config.linkClickedScreenFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath("/verify")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("linkClickedScreen", props);
                    },
                };
            }
            return features;
        };
        _this.getDefaultRedirectionURL = function (context) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        _this.getFeatureComponent = function (componentName, props) {
            if (componentName === "signInUp") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        sessionAuth.UserContextWrapper,
                        sessionAuth.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    authWidgetWrapper.AuthWidgetWrapper,
                                    sessionAuth.__assign(
                                        { authRecipe: _this, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInUpFeature,
                                                sessionAuth.__assign({ recipe: _this }, props)
                                            ),
                                        }
                                    )
                                ),
                            }
                        )
                    );
                } else {
                    return jsxRuntime.jsx(
                        sessionAuth.UserContextWrapper,
                        sessionAuth.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    SignInUpFeature,
                                    sessionAuth.__assign({ recipe: _this }, props)
                                ),
                            }
                        )
                    );
                }
            }
            if (componentName === "linkClickedScreen") {
                return jsxRuntime.jsx(
                    sessionAuth.UserContextWrapper,
                    sessionAuth.__assign(
                        { userContext: props.userContext },
                        { children: jsxRuntime.jsx(LinkClickedScreen, sessionAuth.__assign({ recipe: _this }, props)) }
                    )
                );
            } else {
                throw new Error("Should never come here.");
            }
        };
        var builder = new index.buildExports.OverrideableBuilder(
            getRecipeImplementation({
                appInfo: _this.config.appInfo,
                recipeId: _this.config.recipeId,
                onHandleEvent: _this.config.onHandleEvent,
                preAPIHook: _this.config.preAPIHook,
                postAPIHook: _this.config.postAPIHook,
            })
        );
        _this.recipeImpl = builder.override(_this.config.override.functions).build();
        return _this;
    }
    Passwordless.init = function (config) {
        return function (appInfo) {
            Passwordless.instance = new Passwordless(
                sessionAuth.__assign(sessionAuth.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: Passwordless.RECIPE_ID,
                })
            );
            return Passwordless.instance;
        };
    };
    Passwordless.getInstanceOrThrow = function () {
        if (Passwordless.instance === undefined) {
            var error =
                "No instance of Passwordless found. Make sure to call the Passwordless.init method." +
                "See https://supertokens.io/docs/passwordless/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return Passwordless.instance;
    };
    /*
     * Tests methods.
     */
    Passwordless.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        Passwordless.instance = undefined;
        return;
    };
    Passwordless.RECIPE_ID = "passwordless";
    return Passwordless;
})(authWidgetWrapper.AuthRecipe);

exports.CloseTabScreen = CloseTabScreen;
exports.EmailForm = EmailForm;
exports.EmailOrPhoneForm = EmailOrPhoneForm;
exports.LinkClickedScreen = LinkClickedScreen$1;
exports.LinkSent = LinkSent;
exports.Passwordless = Passwordless;
exports.PhoneForm = PhoneForm;
exports.SignInUpThemeWrapper = SignInUpThemeWrapper;
exports.UserInputCodeForm = UserInputCodeForm;
exports.UserInputCodeFormHeader = UserInputCodeFormHeader;
exports.consumeCode = consumeCode;
exports.createCode = createCode;
exports.defaultTranslationsPasswordless = defaultTranslationsPasswordless;
exports.getActiveScreen = getActiveScreen;
exports.getRecipeImplementation = getRecipeImplementation;
exports.resendCode = resendCode;
exports.useChildProps = useChildProps;
exports.useFeatureReducer = useFeatureReducer;
exports.useSuccessInAnotherTabChecker = useSuccessInAnotherTabChecker;
//# sourceMappingURL=passwordless-shared.js.map
