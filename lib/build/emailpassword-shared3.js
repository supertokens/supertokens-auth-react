"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var EmailPasswordWebJS = require("supertokens-web-js/recipe/emailpassword");
var index = require("./authRecipe-shared2.js");
var types = require("./multifactorauth-shared.js");
var constants = require("./emailpassword-shared4.js");
var utils = require("./authRecipe-shared.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var EmailPasswordWebJS__default = /*#__PURE__*/ _interopDefault(EmailPasswordWebJS);

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) {
        return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImp), {
            submitNewPassword: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    originalImp.submitNewPassword(
                                        genericComponentOverrideContext.__assign(
                                            genericComponentOverrideContext.__assign({}, input),
                                            { formFields: [input.formFields[0]] }
                                        )
                                    ),
                                ];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "PASSWORD_RESET_SUCCESSFUL",
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            sendPasswordResetEmail: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.sendPasswordResetEmail(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "RESET_PASSWORD_EMAIL_SENT",
                                        email: input.formFields.find(function (_a) {
                                            var id = _a.id;
                                            return id === "email";
                                        }).value,
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            signUp: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var payloadBeforeCall, response, payloadAfterCall;
                    return genericComponentOverrideContext.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 2, , 3]);
                                return [
                                    4 /*yield*/,
                                    types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 1:
                                payloadBeforeCall = _c.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                _c.sent();
                                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                                payloadBeforeCall = undefined;
                                return [3 /*break*/, 3];
                            case 3:
                                return [4 /*yield*/, originalImp.signUp(input)];
                            case 4:
                                response = _c.sent();
                                if (!(response.status === "OK")) return [3 /*break*/, 9];
                                payloadAfterCall = void 0;
                                _c.label = 5;
                            case 5:
                                _c.trys.push([5, 7, , 8]);
                                return [
                                    4 /*yield*/,
                                    types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 6:
                                payloadAfterCall = _c.sent();
                                return [3 /*break*/, 8];
                            case 7:
                                _c.sent();
                                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                                payloadAfterCall = undefined;
                                return [3 /*break*/, 8];
                            case 8:
                                onHandleEvent({
                                    action: "SUCCESS",
                                    isNewRecipeUser: true,
                                    createdNewSession:
                                        payloadAfterCall !== undefined &&
                                        (payloadBeforeCall === undefined ||
                                            payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                                    user: response.user,
                                    userContext: input.userContext,
                                });
                                _c.label = 9;
                            case 9:
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            signIn: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var payloadBeforeCall, response, payloadAfterCall;
                    return genericComponentOverrideContext.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 2, , 3]);
                                return [
                                    4 /*yield*/,
                                    types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 1:
                                payloadBeforeCall = _c.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                _c.sent();
                                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                                payloadBeforeCall = undefined;
                                return [3 /*break*/, 3];
                            case 3:
                                return [4 /*yield*/, originalImp.signIn(input)];
                            case 4:
                                response = _c.sent();
                                if (!(response.status === "OK")) return [3 /*break*/, 9];
                                payloadAfterCall = void 0;
                                _c.label = 5;
                            case 5:
                                _c.trys.push([5, 7, , 8]);
                                return [
                                    4 /*yield*/,
                                    types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 6:
                                payloadAfterCall = _c.sent();
                                return [3 /*break*/, 8];
                            case 7:
                                _c.sent();
                                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                                payloadAfterCall = undefined;
                                return [3 /*break*/, 8];
                            case 8:
                                onHandleEvent({
                                    action: "SUCCESS",
                                    isNewRecipeUser: false,
                                    createdNewSession:
                                        payloadAfterCall !== undefined &&
                                        (payloadBeforeCall === undefined ||
                                            payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                                    user: response.user,
                                    userContext: input.userContext,
                                });
                                _c.label = 9;
                            case 9:
                                return [2 /*return*/, response];
                        }
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
/*
 * defaultEmailValidator.
 */
function defaultEmailValidator(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        var defaultEmailValidatorRegexp;
        return genericComponentOverrideContext.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "ERROR_EMAIL_NON_STRING"];
            }
            value = value.trim();
            defaultEmailValidatorRegexp =
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // We check if the email syntax is correct
            // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
            // Regex from https://stackoverflow.com/a/46181/3867175
            if (value.match(defaultEmailValidatorRegexp) === null) {
                return [2 /*return*/, "ERROR_EMAIL_INVALID"];
            }
            return [2 /*return*/, undefined];
        });
    });
}
/*
 * defaultPasswordValidator.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */
function defaultPasswordValidator(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        return genericComponentOverrideContext.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "ERROR_PASSWORD_NON_STRING"];
            }
            // length >= 8 && < 100
            // must have a number and a character
            // as per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
            if (value.length < 8) {
                return [2 /*return*/, "ERROR_PASSWORD_TOO_SHORT"];
            }
            if (value.length >= 100) {
                return [2 /*return*/, "ERROR_PASSWORD_TOO_LONG"];
            }
            if (value.match(/^.*[A-Za-z]+.*$/) === null) {
                return [2 /*return*/, "ERROR_PASSWORD_NO_ALPHA"];
            }
            if (value.match(/^.*[0-9]+.*$/) === null) {
                return [2 /*return*/, "ERROR_PASSWORD_NO_NUM"];
            }
            return [2 /*return*/, undefined];
        });
    });
}
/*
 * defaultLoginPasswordValidator.
 * type string
 */
function defaultLoginPasswordValidator(value) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        return genericComponentOverrideContext.__generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "ERROR_PASSWORD_NON_STRING"];
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
function normaliseEmailPasswordConfig(config) {
    if (config === undefined) {
        config = {};
    }
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
    var override = genericComponentOverrideContext.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, utils.normaliseAuthRecipe(config)),
        {
            signInAndUpFeature: signInAndUpFeature,
            resetPasswordUsingTokenFeature: resetPasswordUsingTokenFeature,
            override: override,
        }
    );
}
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    var signUpForm = normaliseSignUpFormFeatureConfig(config.signUpForm);
    /*
     * Default Sign In corresponds to computed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     * Exception made of the password validator which only verifies that the value is not empty for login
     * https://github.com/supertokens/supertokens-auth-react/issues/21
     */
    var defaultSignInFields = signUpForm.formFields.reduce(function (signInFieldsAccumulator, field) {
        if (field.id === "email") {
            return genericComponentOverrideContext.__spreadArray(
                genericComponentOverrideContext.__spreadArray([], signInFieldsAccumulator, true),
                [field],
                false
            );
        }
        if (field.id === "password") {
            return genericComponentOverrideContext.__spreadArray(
                genericComponentOverrideContext.__spreadArray([], signInFieldsAccumulator, true),
                [
                    genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, field), {
                        autoComplete: "current-password",
                        validate: defaultLoginPasswordValidator,
                    }),
                ],
                false
            );
        }
        return signInFieldsAccumulator;
    }, []);
    var signInForm = normaliseSignInFormFeatureConfig(defaultSignInFields, config.signInForm);
    return {
        signUpForm: signUpForm,
        signInForm: signInForm,
    };
}
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
    var style = config.style !== undefined ? config.style : "";
    return {
        style: style,
        formFields: formFields,
    };
}
function normaliseSignInFormFeatureConfig(defaultFormFields, config) {
    if (config === undefined) {
        config = {};
    }
    var userFormFields = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields
            // Filter on email and password only.
            .filter(function (field) {
                return constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id);
            })
            // Sign In fields are never optional.
            .map(function (field) {
                return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, field), {
                    optional: false,
                });
            });
    }
    var formFields = mergeFormFields(defaultFormFields, userFormFields);
    var style = config.style !== undefined ? config.style : "";
    return {
        style: style,
        formFields: formFields,
    };
}
function getDefaultFormFields() {
    return [getDefaultEmailFormField(), getDefaultPasswordFormField()];
}
function getDefaultEmailFormField() {
    return {
        id: "email",
        label: "EMAIL_PASSWORD_EMAIL_LABEL",
        placeholder: "EMAIL_PASSWORD_EMAIL_PLACEHOLDER",
        validate: defaultEmailValidator,
        optional: false,
        autoComplete: "email",
    };
}
function getDefaultPasswordFormField() {
    return {
        id: "password",
        label: "EMAIL_PASSWORD_PASSWORD_LABEL",
        placeholder: "EMAIL_PASSWORD_PASSWORD_PLACEHOLDER",
        validate: defaultPasswordValidator,
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
            : "";
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
            : "";
    var enterEmailForm = {
        style: enterEmailFormStyle,
        formFields: [
            genericComponentOverrideContext.__assign(
                genericComponentOverrideContext.__assign({}, getDefaultEmailFormField()),
                { validate: signUpEmailField.validate, placeholder: "", autofocus: true }
            ),
        ],
    };
    return {
        disableDefaultUI: disableDefaultUI,
        submitNewPasswordForm: submitNewPasswordForm,
        enterEmailForm: enterEmailForm,
    };
}
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
                if (constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(userField.id)) {
                    optional = false;
                }
                // Merge.
                mergedFormFields[j] = genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, mergedFormFields[j]),
                        userField
                    ),
                    { optional: optional }
                );
                isNewField = false;
                break;
            }
        }
        // If new field, push to mergeFormFields.
        if (isNewField) {
            mergedFormFields.push(
                genericComponentOverrideContext.__assign(
                    { optional: false, placeholder: userField.label, validate: defaultValidate },
                    userField
                )
            );
        }
    }
    return mergedFormFields.map(function (field) {
        return getFormattedFormField(field);
    });
}
function getFormattedFormField(field) {
    var _this = this;
    // Fields with the 'nonOptionalErrorMsg' property must have a valid message defined
    if (field.optional === false && field.nonOptionalErrorMsg === "") {
        throw new Error("nonOptionalErrorMsg for field ".concat(field.id, " cannot be an empty string"));
    }
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, field), {
        validate: function (value) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Absent or not optional empty field
                            if (value === "" && field.optional === false) {
                                if (field.nonOptionalErrorMsg !== undefined) {
                                    return [2 /*return*/, field.nonOptionalErrorMsg];
                                }
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
var EmailPassword = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(EmailPassword, _super);
    function EmailPassword(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = EmailPasswordWebJS__default.default;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = EmailPassword.RECIPE_ID;
        _this.firstFactorIds = [types.FactorIds.EMAILPASSWORD];
        _this.getDefaultRedirectionURL = function (context) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    if (context.action === "RESET_PASSWORD") {
                        return [
                            2 /*return*/,
                            genericComponentOverrideContext.getDefaultRedirectionURLForPath(
                                this.config,
                                constants.DEFAULT_RESET_PASSWORD_PATH,
                                context
                            ),
                        ];
                    }
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        return _this;
    }
    EmailPassword.prototype.getFirstFactorsForAuthPage = function () {
        return this.firstFactorIds;
    };
    EmailPassword.init = function (config) {
        var normalisedConfig = normaliseEmailPasswordConfig(config);
        return {
            recipeID: EmailPassword.RECIPE_ID,
            authReact: function (appInfo) {
                EmailPassword.instance = new EmailPassword(
                    genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, normalisedConfig),
                        { appInfo: appInfo, recipeId: EmailPassword.RECIPE_ID }
                    )
                );
                return EmailPassword.instance;
            },
            webJS: EmailPasswordWebJS__default.default.init(
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
    EmailPassword.getInstanceOrThrow = function () {
        if (EmailPassword.instance === undefined) {
            var error =
                "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailPassword.instance;
    };
    /*
     * Tests methods.
     */
    EmailPassword.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        EmailPassword.instance = undefined;
        return;
    };
    EmailPassword.RECIPE_ID = "emailpassword";
    return EmailPassword;
})(index.AuthRecipe);

exports.EmailPassword = EmailPassword;
exports.defaultValidate = defaultValidate;
