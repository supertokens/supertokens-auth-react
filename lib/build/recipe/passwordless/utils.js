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
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
              o["default"] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
var __awaiter =
    (this && this.__awaiter) ||
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
    (this && this.__generator) ||
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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeCode =
    exports.resendCode =
    exports.createCode =
    exports.setLoginAttemptInfo =
    exports.getLoginAttemptInfo =
    exports.defaultGuessInternationPhoneNumberFromInputPhoneNumber =
    exports.normalisePasswordlessConfig =
        void 0;
var min_1 = __importStar(require("libphonenumber-js/min"));
var utils_1 = require("../authRecipe/utils");
var validators_1 = require("./validators");
var utils_2 = __importDefault(require("supertokens-web-js/recipe/passwordless/utils"));
function normalisePasswordlessConfig(config) {
    if (!["EMAIL", "PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod)) {
        throw new Error("Please pass one of 'PHONE', 'EMAIL' or 'EMAIL_OR_PHONE' as the contactMethod");
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
    return __assign(__assign({}, (0, utils_1.normaliseAuthRecipe)(config)), {
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
    var signInUpFeature = __assign(__assign({}, signInUpInput), {
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
    return __assign(__assign({}, config), { style: style });
}
function defaultGuessInternationPhoneNumberFromInputPhoneNumber(value, defaultCountryFromConfig) {
    var _a;
    if (value === undefined || value.length === 0) {
        return value;
    }
    if (defaultCountryFromConfig !== undefined) {
        try {
            return (_a = (0, min_1.default)(value, {
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
    var incomplete = (0, min_1.parseIncompletePhoneNumber)(value);
    // If the incomplete/extracted phonenumber is less than half the input we assume it's not a phone number.
    // I.e.: if less than half of the input is numbers
    if (value.includes("@") || incomplete.length < value.length / 2) {
        return undefined;
    }
    var incompleteIntlNum = (0, min_1.formatIncompletePhoneNumber)(value, defaultCountryFromConfig);
    if (incompleteIntlNum !== value) {
        return incompleteIntlNum;
    }
    // We want to return the value as an international number because the phone number input lib expects it this way
    return "+".concat(value);
}
exports.defaultGuessInternationPhoneNumberFromInputPhoneNumber = defaultGuessInternationPhoneNumberFromInputPhoneNumber;
function getLoginAttemptInfo(input) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
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
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
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
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, utils_2.default.createCode(input)];
        });
    });
}
exports.createCode = createCode;
function resendCode(input) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, utils_2.default.resendCode(input)];
        });
    });
}
exports.resendCode = resendCode;
function consumeCode(input) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, utils_2.default.consumeCode(input)];
        });
    });
}
exports.consumeCode = consumeCode;
