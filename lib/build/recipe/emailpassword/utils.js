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
var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedFormField =
    exports.mergeFormFields =
    exports.normaliseResetPasswordUsingTokenFeature =
    exports.getDefaultFormFields =
    exports.normaliseSignInFormFeatureConfig =
    exports.normaliseSignUpFormFeatureConfig =
    exports.normaliseSignInAndUpFeature =
    exports.normaliseEmailPasswordConfig =
        void 0;
var constants_1 = require("./constants");
var validators_1 = require("./validators");
var utils_1 = require("../authRecipe/utils");
function normaliseEmailPasswordConfig(config) {
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    var signUpPasswordField = signInAndUpFeature.signUpForm.formFields.find(function (field) {
        return field.id === "password";
    });
    var signUpEmailField = signInAndUpFeature.signUpForm.formFields.find(function (field) {
        return field.id === "email";
    });
    var resetPasswordUsingTokenFeature = normaliseResetPasswordUsingTokenFeature(
        signUpPasswordField.validate,
        signUpEmailField,
        config.resetPasswordUsingTokenFeature
    );
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
        },
        config.override
    );
    return __assign(__assign({}, (0, utils_1.normaliseAuthRecipe)(config)), {
        signInAndUpFeature: signInAndUpFeature,
        resetPasswordUsingTokenFeature: resetPasswordUsingTokenFeature,
        override: override,
    });
}
exports.normaliseEmailPasswordConfig = normaliseEmailPasswordConfig;
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var signUpForm = normaliseSignUpFormFeatureConfig(config.signUpForm);
    var defaultToSignUp = config.defaultToSignUp !== undefined ? config.defaultToSignUp : false;
    /*
     * Default Sign In corresponds to computed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     * Exception made of the password validator which only verifies that the value is not empty for login
     * https://github.com/supertokens/supertokens-auth-react/issues/21
     */
    var defaultSignInFields = signUpForm.formFields.reduce(function (signInFieldsAccumulator, field) {
        if (field.id === "email") {
            return __spreadArray(__spreadArray([], signInFieldsAccumulator, true), [field], false);
        }
        if (field.id === "password") {
            return __spreadArray(
                __spreadArray([], signInFieldsAccumulator, true),
                [
                    __assign(__assign({}, field), {
                        autoComplete: "current-password",
                        validate: validators_1.defaultLoginPasswordValidator,
                    }),
                ],
                false
            );
        }
        return signInFieldsAccumulator;
    }, []);
    var signInForm = normaliseSignInFormFeatureConfig(defaultSignInFields, config.signInForm);
    return {
        disableDefaultUI: disableDefaultUI,
        defaultToSignUp: defaultToSignUp,
        signUpForm: signUpForm,
        signInForm: signInForm,
    };
}
exports.normaliseSignInAndUpFeature = normaliseSignInAndUpFeature;
function normaliseSignUpFormFeatureConfig(config) {
    if (config === undefined) {
        config = {};
    }
    var defaultFormFields = getDefaultFormFields();
    var userFormFields = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields;
    }
    var formFields = mergeFormFields(defaultFormFields, userFormFields);
    var privacyPolicyLink = config.privacyPolicyLink;
    var termsOfServiceLink = config.termsOfServiceLink;
    var style = config.style !== undefined ? config.style : {};
    return {
        style: style,
        formFields: formFields,
        privacyPolicyLink: privacyPolicyLink,
        termsOfServiceLink: termsOfServiceLink,
    };
}
exports.normaliseSignUpFormFeatureConfig = normaliseSignUpFormFeatureConfig;
function normaliseSignInFormFeatureConfig(defaultFormFields, config) {
    if (config === undefined) {
        config = {};
    }
    var userFormFields = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields
            // Filter on email and password only.
            .filter(function (field) {
                return constants_1.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id);
            })
            // Sign In fields are never optional.
            .map(function (field) {
                return __assign(__assign({}, field), { optional: false });
            });
    }
    var formFields = mergeFormFields(defaultFormFields, userFormFields);
    var style = config.style !== undefined ? config.style : {};
    return {
        style: style,
        formFields: formFields,
    };
}
exports.normaliseSignInFormFeatureConfig = normaliseSignInFormFeatureConfig;
function getDefaultFormFields() {
    return [getDefaultEmailFormField(), getDefaultPasswordFormField()];
}
exports.getDefaultFormFields = getDefaultFormFields;
function getDefaultEmailFormField() {
    return {
        id: "email",
        label: "EMAIL_PASSWORD_EMAIL_LABEL",
        placeholder: "EMAIL_PASSWORD_EMAIL_PLACEHOLDER",
        validate: validators_1.defaultEmailValidator,
        optional: false,
        autoComplete: "email",
    };
}
function getDefaultPasswordFormField() {
    return {
        id: "password",
        label: "EMAIL_PASSWORD_PASSWORD_LABEL",
        placeholder: "EMAIL_PASSWORD_PASSWORD_PLACEHOLDER",
        validate: validators_1.defaultPasswordValidator,
        optional: false,
        autoComplete: "new-password",
    };
}
function normaliseResetPasswordUsingTokenFeature(signUpPasswordFieldValidate, signUpEmailField, config) {
    if (config === undefined) {
        config = {};
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var submitNewPasswordFormStyle =
        config.submitNewPasswordForm !== undefined && config.submitNewPasswordForm.style !== undefined
            ? config.submitNewPasswordForm.style
            : {};
    var submitNewPasswordForm = {
        style: submitNewPasswordFormStyle,
        formFields: [
            {
                id: "password",
                label: "EMAIL_PASSWORD_NEW_PASSWORD_LABEL",
                placeholder: "EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password",
            },
            {
                id: "confirm-password",
                label: "EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL",
                placeholder: "EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password",
            },
        ],
    };
    var enterEmailFormStyle =
        config.enterEmailForm !== undefined && config.enterEmailForm.style !== undefined
            ? config.enterEmailForm.style
            : {};
    var enterEmailForm = {
        style: enterEmailFormStyle,
        formFields: [
            __assign(__assign({}, getDefaultEmailFormField()), {
                validate: signUpEmailField.validate,
                placeholder: "",
                autofocus: true,
            }),
        ],
    };
    return {
        disableDefaultUI: disableDefaultUI,
        submitNewPasswordForm: submitNewPasswordForm,
        enterEmailForm: enterEmailForm,
    };
}
exports.normaliseResetPasswordUsingTokenFeature = normaliseResetPasswordUsingTokenFeature;
/*
 * mergeFormFields by keeping the provided order, defaultFormFields or merged first, and unmerged userFormFields after.
 */
function mergeFormFields(defaultFormFields, userFormFields) {
    // Create a new array with default fields.
    var mergedFormFields = defaultFormFields;
    // Loop through user provided fields.
    for (var i = 0; i < userFormFields.length; i++) {
        var userField = userFormFields[i];
        var isNewField = true;
        // Loop through the merged fields array.
        for (var j = 0; j < mergedFormFields.length; j++) {
            var mergedField = mergedFormFields[j];
            // If id is equal, merge the fields
            if (userField.id === mergedField.id) {
                // Make sure that email and password are kept mandatory.
                var optional = mergedField.optional; // Init with default value.
                // If user provided value, overwrite.
                if (userField.optional !== undefined) {
                    optional = userField.optional;
                }
                // If "email" or "password", always mandatory.
                if (constants_1.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(userField.id)) {
                    optional = false;
                }
                // Merge.
                mergedFormFields[j] = __assign(__assign(__assign({}, mergedFormFields[j]), userField), {
                    optional: optional,
                });
                isNewField = false;
                break;
            }
        }
        // If new field, push to mergeFormFields.
        if (isNewField) {
            mergedFormFields.push(
                __assign(
                    { optional: false, placeholder: userField.label, validate: validators_1.defaultValidate },
                    userField
                )
            );
        }
    }
    return mergedFormFields.map(function (field) {
        return getFormattedFormField(field);
    });
}
exports.mergeFormFields = mergeFormFields;
function getFormattedFormField(field) {
    var _this = this;
    return __assign(__assign({}, field), {
        validate: function (value) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Absent or not optional empty field
                            if (value === "" && field.optional === false) {
                                return [2 /*return*/, "ERROR_NON_OPTIONAL"];
                            }
                            return [4 /*yield*/, field.validate(value)];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
    });
}
exports.getFormattedFormField = getFormattedFormField;
