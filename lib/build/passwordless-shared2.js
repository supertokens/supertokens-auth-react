"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var PasswordlessWebJS = require("supertokens-web-js/recipe/passwordless");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var jsxRuntime = require("react/jsx-runtime");
var utils = require("./authRecipe-shared.js");
var recipe = require("./multifactorauth-shared.js");
var windowHandler = require("supertokens-web-js/utils/windowHandler");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var PasswordlessWebJS__default = /*#__PURE__*/ _interopDefault(PasswordlessWebJS);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

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
                            path: new NormalisedURLPath__default.default("/check-auth/otp-phone"),
                            logo: OTPIcon,
                        },
                        {
                            id: "otp-email",
                            name: "SMS based OTP",
                            description: "Get an OTP code on your email address to complete the authentication request",
                            path: new NormalisedURLPath__default.default("/check-auth/otp-email"),
                            logo: OTPIcon,
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
