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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../authRecipeWithEmailVerification/utils");
var providers_1 = __importDefault(require("../thirdparty/providers"));
var custom_1 = __importDefault(require("../thirdparty/providers/custom"));
var validators_1 = require("../passwordless/validators");
var utils_2 = require("../passwordless/utils");
/*
 * Methods.
 */
function normaliseThirdPartyPasswordlessConfig(config) {
    var _a;
    var disablePasswordless = config.disablePasswordless === true;
    if (
        disablePasswordless &&
        (config.signInUpFeature === undefined ||
            config.signInUpFeature.providers === undefined ||
            config.signInUpFeature.providers.length === 0)
    ) {
        throw new Error("You need to enable either email password or third party providers login.");
    }
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
    var signInUpFeature = normaliseSignInUpFeatureConfig(config);
    return __assign(__assign({}, utils_1.normaliseAuthRecipeWithEmailVerificationConfig(config)), {
        contactMethod: config.contactMethod,
        validateEmailAddress: validateEmailAddress,
        validatePhoneNumber: validatePhoneNumber,
        signInUpFeature: signInUpFeature,
        oAuthCallbackScreen: {
            style:
                config.oAuthCallbackScreen === undefined || config.oAuthCallbackScreen.style === undefined
                    ? {}
                    : config.oAuthCallbackScreen.style,
        },
        linkClickedScreenFeature: {
            disableDefaultImplementation:
                ((_a = config.linkClickedScreenFeature) === null || _a === void 0
                    ? void 0
                    : _a.disableDefaultImplementation) === true,
            style:
                config.linkClickedScreenFeature === undefined || config.linkClickedScreenFeature.style === undefined
                    ? {}
                    : config.linkClickedScreenFeature.style,
        },
        disablePasswordless: disablePasswordless,
        override: override,
    });
}
exports.normaliseThirdPartyPasswordlessConfig = normaliseThirdPartyPasswordlessConfig;
function normaliseSignInUpFeatureConfig(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var disableDefaultImplementation =
        ((_a = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _a === void 0
            ? void 0
            : _a.disableDefaultImplementation) === undefined
            ? false
            : (_b = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _b === void 0
            ? void 0
            : _b.disableDefaultImplementation;
    /*
     * Convert custom configs to custom providers.
     */
    var providersWithCustom = (
        ((_c = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _c === void 0
            ? void 0
            : _c.providers) || []
    ).map(function (provider) {
        if (provider instanceof providers_1.default) {
            return provider;
        }
        return custom_1.default.init(provider);
    });
    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    var providers = Array.from(
        new Set(
            providersWithCustom.map(function (provider) {
                return provider.id;
            })
        )
    ).map(function (id) {
        return providersWithCustom.find(function (provider) {
            return provider.id === id;
        });
    });
    config &&
        config.contactMethod === "PHONE" &&
        ((_d = config.signInUpFeature) === null || _d === void 0 ? void 0 : _d.defaultCountry);
    return __assign(__assign({}, config), {
        providers: providers,
        disableDefaultImplementation: disableDefaultImplementation,
        resendEmailOrSMSGapInSeconds:
            ((_e = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _e === void 0
                ? void 0
                : _e.resendEmailOrSMSGapInSeconds) === undefined
                ? 15
                : config === null || config === void 0
                ? void 0
                : config.signInUpFeature.resendEmailOrSMSGapInSeconds,
        providerAndEmailOrPhoneFormStyle:
            ((_f = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _f === void 0
                ? void 0
                : _f.providerAndEmailOrPhoneFormStyle) === undefined
                ? {}
                : config === null || config === void 0
                ? void 0
                : config.signInUpFeature.providerAndEmailOrPhoneFormStyle,
        linkSentScreenStyle:
            ((_g = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _g === void 0
                ? void 0
                : _g.linkSentScreenStyle) === undefined
                ? {}
                : config === null || config === void 0
                ? void 0
                : config.signInUpFeature.linkSentScreenStyle,
        userInputCodeFormStyle:
            ((_h = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _h === void 0
                ? void 0
                : _h.userInputCodeFormStyle) === undefined
                ? {}
                : config === null || config === void 0
                ? void 0
                : config.signInUpFeature.userInputCodeFormStyle,
        closeTabScreenStyle:
            ((_j = config === null || config === void 0 ? void 0 : config.signInUpFeature) === null || _j === void 0
                ? void 0
                : _j.closeTabScreenStyle) === undefined
                ? {}
                : config === null || config === void 0
                ? void 0
                : config.signInUpFeature.closeTabScreenStyle,
        defaultCountry:
            ["PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod) &&
            (config === null || config === void 0 ? void 0 : config.signInUpFeature) &&
            "defaultCountry" in config.signInUpFeature
                ? config === null || config === void 0
                    ? void 0
                    : config.signInUpFeature.defaultCountry
                : undefined,
        guessInternationPhoneNumberFromInputPhoneNumber:
            config.contactMethod === "EMAIL_OR_PHONE" &&
            (config === null || config === void 0 ? void 0 : config.signInUpFeature) &&
            "guessInternationPhoneNumberFromInputPhoneNumber" in
                (config === null || config === void 0 ? void 0 : config.signInUpFeature) &&
            (config === null || config === void 0
                ? void 0
                : config.signInUpFeature.guessInternationPhoneNumberFromInputPhoneNumber) !== undefined
                ? config === null || config === void 0
                    ? void 0
                    : config.signInUpFeature.guessInternationPhoneNumberFromInputPhoneNumber
                : utils_2.defaultGuessInternationPhoneNumberFromInputPhoneNumber,
    });
}
