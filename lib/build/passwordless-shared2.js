"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var PasswordlessWebJS = require("supertokens-web-js/recipe/passwordless");
var postSuperTokensInitCallbacks = require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
var otpIcon = require("./otpIcon.js");
var utils = require("./authRecipe-shared.js");
var recipe = require("./multifactorauth-shared.js");
var validators = require("./passwordless-shared3.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var PasswordlessWebJS__default = /*#__PURE__*/ _interopDefault(PasswordlessWebJS);

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
    var validateEmailAddress = validators.defaultEmailValidator;
    if (
        (config.contactMethod === "EMAIL" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validateEmailAddress !== undefined
    ) {
        validateEmailAddress = config.validateEmailAddress;
    } else if (config.contactMethod === "EMAIL_OR_PHONE") {
        validateEmailAddress = validators.defaultEmailValidatorForCombinedInput;
    }
    var validatePhoneNumber = validators.defaultPhoneNumberValidator;
    if (
        (config.contactMethod === "PHONE" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validatePhoneNumber !== undefined
    ) {
        validatePhoneNumber = config.validatePhoneNumber;
    } else if (config.contactMethod === "EMAIL_OR_PHONE") {
        validatePhoneNumber = validators.defaultPhoneNumberValidatorForCombinedInput;
    }
    return genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, utils.normaliseAuthRecipe(config)),
        {
            validateEmailAddress: validateEmailAddress,
            validatePhoneNumber: validatePhoneNumber,
            signInUpFeature: signInUpFeature,
            linkClickedScreenFeature: normalisePasswordlessBaseConfig(config.linkClickedScreenFeature),
            mfaFeature: normalisePasswordlessBaseConfig(config.mfaFeature),
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
                    : validators.defaultGuessInternationPhoneNumberFromInputPhoneNumber,
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
function getEnabledContactMethods(contactMethod, currentDynamicLoginMethods) {
    var _a;
    var enabledContactMethods = contactMethod === "EMAIL_OR_PHONE" ? ["EMAIL", "PHONE"] : [contactMethod];
    var firstFactors;
    if (currentDynamicLoginMethods.loaded && currentDynamicLoginMethods.loginMethods.firstFactors) {
        firstFactors = currentDynamicLoginMethods.loginMethods.firstFactors;
    } else {
        firstFactors =
            (_a = recipe.MultiFactorAuth.getInstance()) === null || _a === void 0 ? void 0 : _a.config.firstFactors;
    }
    if (firstFactors !== undefined) {
        if (enabledContactMethods.includes("PHONE")) {
            if (!firstFactors.includes("otp-phone") && !firstFactors.includes("link-phone")) {
                enabledContactMethods = enabledContactMethods.filter(function (c) {
                    return c !== "PHONE";
                });
            }
        } else {
            if (firstFactors.includes("otp-phone") || firstFactors.includes("link-phone")) {
                throw new Error("The enabled contact method is not a superset of the requested first factors");
            }
        }
        if (enabledContactMethods.includes("EMAIL")) {
            if (!firstFactors.includes("otp-email") && !firstFactors.includes("link-email")) {
                enabledContactMethods = enabledContactMethods.filter(function (c) {
                    return c !== "EMAIL";
                });
            }
        } else {
            if (firstFactors.includes("otp-email") || firstFactors.includes("link-email")) {
                throw new Error("The enabled contact method is not a superset of the requested first factors");
            }
        }
    }
    if (enabledContactMethods.length === 0) {
        // It should never get here, but as a sanity check this is fine
        throw new Error("The enabled contact method is not a superset of the requested first factors");
    }
    return enabledContactMethods;
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
var otpPhoneFactor = {
    id: "otp-phone",
    name: "SMS based OTP",
    description: "Get an OTP code on your phone to complete the authentication request",
    path: "/mfa/otp-phone",
    logo: otpIcon.OTPIcon,
};
var otpEmailFactor = {
    id: "otp-email",
    name: "Email based OTP",
    description: "Get an OTP code on your email address to complete the authentication request",
    path: "/mfa/otp-email",
    logo: otpIcon.OTPIcon,
};
var passwordlessFactors = ["otp-phone", "otp-email", "link-phone", "link-email"];
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
        postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var mfa = recipe.MultiFactorAuth.getInstance();
            if (mfa !== undefined) {
                mfa.addMFAFactors([otpPhoneFactor, otpEmailFactor]);
            }
        });
        return _this;
    }
    Passwordless.init = function (config) {
        var normalisedConfig = normalisePasswordlessConfig(config);
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
exports.getEnabledContactMethods = getEnabledContactMethods;
exports.normalisePasswordlessConfig = normalisePasswordlessConfig;
exports.passwordlessFactors = passwordlessFactors;
