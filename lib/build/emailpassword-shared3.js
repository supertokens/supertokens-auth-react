"use strict";

var utils = require("./recipeModule-shared.js");
var index = require("./index2.js");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var utils$1 = require("./authRecipe-shared.js");
var validators = require("./emailpassword-shared4.js");
var recipeImplementation = require("supertokens-web-js/recipe/emailpassword/recipeImplementation");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);

function getRecipeImplementation(recipeInput) {
    var webJsImplementation = recipeImplementation.getRecipeImplementation({
        recipeId: recipeInput.recipeId,
        appInfo: recipeInput.appInfo,
        preAPIHook: recipeInput.preAPIHook,
        postAPIHook: recipeInput.postAPIHook,
    });
    return {
        submitNewPassword: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                var response;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.submitNewPassword.bind(this)(
                                    utils.__assign(utils.__assign({}, input), { formFields: [input.formFields[0]] })
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
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
            return utils.__awaiter(this, void 0, void 0, function () {
                var response;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.sendPasswordResetEmail.bind(this)(utils.__assign({}, input)),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "RESET_PASSWORD_EMAIL_SENT",
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        signUp: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                var response;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.signUp.bind(this)(utils.__assign({}, input))];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "SUCCESS",
                                    isNewUser: true,
                                    user: response.user,
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        signIn: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                var response;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.signIn.bind(this)(utils.__assign({}, input))];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "SUCCESS",
                                    isNewUser: false,
                                    user: response.user,
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        doesEmailExist: function (input) {
            return utils.__awaiter(this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.doesEmailExist.bind(this)(utils.__assign({}, input)),
                            ];
                        case 1:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        getResetPasswordTokenFromURL: function (input) {
            return webJsImplementation.getResetPasswordTokenFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
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
    var override = utils.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return utils.__assign(utils.__assign({}, utils$1.normaliseAuthRecipe(config)), {
        signInAndUpFeature: signInAndUpFeature,
        resetPasswordUsingTokenFeature: resetPasswordUsingTokenFeature,
        override: override,
    });
}
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
            return utils.__spreadArray(utils.__spreadArray([], signInFieldsAccumulator, true), [field], false);
        }
        if (field.id === "password") {
            return utils.__spreadArray(
                utils.__spreadArray([], signInFieldsAccumulator, true),
                [
                    utils.__assign(utils.__assign({}, field), {
                        autoComplete: "current-password",
                        validate: validators.defaultLoginPasswordValidator,
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
    var style = config.style !== undefined ? config.style : "";
    return {
        style: style,
        formFields: formFields,
        privacyPolicyLink: privacyPolicyLink,
        termsOfServiceLink: termsOfServiceLink,
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
                return validators.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id);
            })
            // Sign In fields are never optional.
            .map(function (field) {
                return utils.__assign(utils.__assign({}, field), { optional: false });
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
        validate: validators.defaultEmailValidator,
        optional: false,
        autoComplete: "email",
    };
}
function getDefaultPasswordFormField() {
    return {
        id: "password",
        label: "EMAIL_PASSWORD_PASSWORD_LABEL",
        placeholder: "EMAIL_PASSWORD_PASSWORD_PLACEHOLDER",
        validate: validators.defaultPasswordValidator,
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
            utils.__assign(utils.__assign({}, getDefaultEmailFormField()), {
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
                if (validators.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(userField.id)) {
                    optional = false;
                }
                // Merge.
                mergedFormFields[j] = utils.__assign(
                    utils.__assign(utils.__assign({}, mergedFormFields[j]), userField),
                    { optional: optional }
                );
                isNewField = false;
                break;
            }
        }
        // If new field, push to mergeFormFields.
        if (isNewField) {
            mergedFormFields.push(
                utils.__assign(
                    { optional: false, placeholder: userField.label, validate: validators.defaultValidate },
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
    return utils.__assign(utils.__assign({}, field), {
        validate: function (value) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
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
    utils.__extends(EmailPassword, _super);
    function EmailPassword(config) {
        var _this = _super.call(this, normaliseEmailPasswordConfig(config)) || this;
        _this.getDefaultRedirectionURL = function (context) {
            return utils.__awaiter(_this, void 0, void 0, function () {
                var resetPasswordPath;
                return utils.__generator(this, function (_a) {
                    if (context.action === "RESET_PASSWORD") {
                        resetPasswordPath = new NormalisedURLPath__default.default(
                            validators.DEFAULT_RESET_PASSWORD_PATH
                        );
                        return [
                            2 /*return*/,
                            ""
                                .concat(
                                    this.config.appInfo.websiteBasePath
                                        .appendPath(resetPasswordPath)
                                        .getAsStringDangerous(),
                                    "?rid="
                                )
                                .concat(this.config.recipeId),
                        ];
                    }
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        var builder = new index.OverrideableBuilder_1(
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
    EmailPassword.init = function (config) {
        return function (appInfo) {
            EmailPassword.instance = new EmailPassword(
                utils.__assign(utils.__assign({}, config), { appInfo: appInfo, recipeId: EmailPassword.RECIPE_ID })
            );
            return EmailPassword.instance;
        };
    };
    EmailPassword.getInstanceOrThrow = function () {
        if (EmailPassword.instance === undefined) {
            var error =
                "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + utils.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailPassword.instance;
    };
    /*
     * Tests methods.
     */
    EmailPassword.reset = function () {
        if (!utils.isTest()) {
            return;
        }
        EmailPassword.instance = undefined;
        return;
    };
    EmailPassword.RECIPE_ID = "emailpassword";
    return EmailPassword;
})(utils$1.AuthRecipe);

exports.EmailPassword = EmailPassword;
exports.getRecipeImplementation = getRecipeImplementation;
//# sourceMappingURL=emailpassword-shared3.js.map
