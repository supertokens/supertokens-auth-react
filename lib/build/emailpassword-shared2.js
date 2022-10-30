"use strict";

var assets = require("./assets.js");
var jsxRuntime = require("react/jsx-runtime");
var authRecipe = require("./authRecipe-shared.js");
var formBase = require("./emailpassword-shared3.js");
var React = require("react");
var querier = require("./querier.js");
var translationContext = require("./translationContext.js");
var SuperTokensBranding = require("./SuperTokensBranding.js");
var translations = require("./emailverification-shared.js");
require("./index.js");
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
    var override = assets.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
        },
        config.override
    );
    return assets.__assign(assets.__assign({}, authRecipe.normaliseAuthRecipe(config)), {
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
            return assets.__spreadArray(assets.__spreadArray([], signInFieldsAccumulator, true), [field], false);
        }
        if (field.id === "password") {
            return assets.__spreadArray(
                assets.__spreadArray([], signInFieldsAccumulator, true),
                [
                    assets.__assign(assets.__assign({}, field), {
                        autoComplete: "current-password",
                        validate: formBase.defaultLoginPasswordValidator,
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
                return formBase.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id);
            })
            // Sign In fields are never optional.
            .map(function (field) {
                return assets.__assign(assets.__assign({}, field), { optional: false });
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
        validate: formBase.defaultEmailValidator,
        optional: false,
        autoComplete: "email",
    };
}
function getDefaultPasswordFormField() {
    return {
        id: "password",
        label: "EMAIL_PASSWORD_PASSWORD_LABEL",
        placeholder: "EMAIL_PASSWORD_PASSWORD_PLACEHOLDER",
        validate: formBase.defaultPasswordValidator,
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
            assets.__assign(assets.__assign({}, getDefaultEmailFormField()), {
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
                if (formBase.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(userField.id)) {
                    optional = false;
                }
                // Merge.
                mergedFormFields[j] = assets.__assign(
                    assets.__assign(assets.__assign({}, mergedFormFields[j]), userField),
                    { optional: optional }
                );
                isNewField = false;
                break;
            }
        }
        // If new field, push to mergeFormFields.
        if (isNewField) {
            mergedFormFields.push(
                assets.__assign(
                    { optional: false, placeholder: userField.label, validate: formBase.defaultValidate },
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
    return assets.__assign(assets.__assign({}, field), {
        validate: function (value) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
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

var SignUpFooter = querier.withOverride("EmailPasswordSignUpFooter", function EmailPasswordSignUpFooter(_a) {
    var termsOfServiceLink = _a.termsOfServiceLink,
        privacyPolicyLink = _a.privacyPolicyLink;
    var t = translationContext.useTranslation();
    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }
    return jsxRuntime.jsxs(
        "div",
        assets.__assign(
            { "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions" },
            {
                children: [
                    t("EMAIL_PASSWORD_SIGN_UP_FOOTER_START"),
                    termsOfServiceLink !== undefined &&
                        jsxRuntime.jsx(
                            "a",
                            assets.__assign(
                                {
                                    "data-supertokens": "link",
                                    href: termsOfServiceLink,
                                    target: "_blank",
                                    rel: "noopener noreferer",
                                },
                                { children: t("EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS") }
                            )
                        ),
                    termsOfServiceLink !== undefined &&
                        privacyPolicyLink !== undefined &&
                        t("EMAIL_PASSWORD_SIGN_UP_FOOTER_AND"),
                    privacyPolicyLink !== undefined &&
                        jsxRuntime.jsx(
                            "a",
                            assets.__assign(
                                {
                                    "data-supertokens": "link",
                                    href: privacyPolicyLink,
                                    target: "_blank",
                                    rel: "noopener noreferer",
                                },
                                { children: t("EMAIL_PASSWORD_SIGN_UP_FOOTER_PP") }
                            )
                        ),
                    t("EMAIL_PASSWORD_SIGN_UP_FOOTER_END"),
                ],
            }
        )
    );
});

var SignUpHeader = querier.withOverride("EmailPasswordSignUpHeader", function EmailPasswordSignUpHeader(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                assets.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx(
                "div",
                assets.__assign(
                    { "data-supertokens": "headerSubtitle" },
                    {
                        children: jsxRuntime.jsxs(
                            "div",
                            assets.__assign(
                                { "data-supertokens": "secondaryText" },
                                {
                                    children: [
                                        t("EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START"),
                                        jsxRuntime.jsx(
                                            "span",
                                            assets.__assign(
                                                { "data-supertokens": "link", onClick: onClick },
                                                { children: t("EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_SIGN_IN_LINK") }
                                            )
                                        ),
                                        t("EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_END"),
                                    ],
                                }
                            )
                        ),
                    }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

/*
 * Component.
 */
var SignUpForm = querier.withOverride("EmailPasswordSignUpForm", function EmailPasswordSignUpForm(props) {
    var _this = this;
    var userContext = authRecipe.useUserContext();
    return jsxRuntime.jsx(formBase.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                var validationErrors;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                authRecipe.validateForm(
                                    formFields,
                                    props.config.signInAndUpFeature.signUpForm.formFields
                                ),
                            ];
                        case 1:
                            validationErrors = _a.sent();
                            if (validationErrors.length > 0) {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: validationErrors,
                                    },
                                ];
                            }
                            return [
                                2 /*return*/,
                                props.recipeImplementation.signUp({
                                    formFields: formFields,
                                    userContext: userContext,
                                }),
                            ];
                    }
                });
            });
        },
        validateOnBlur: true,
        showLabels: true,
        footer: props.footer,
    });
});

var SignUp = querier.withOverride("EmailPasswordSignUp", function EmailPasswordSignUp(props) {
    return jsxRuntime.jsxs(
        "div",
        assets.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        assets.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignUpHeader, { onClick: props.signInClicked }),
                                    props.error !== undefined &&
                                        jsxRuntime.jsx(querier.GeneralError, { error: props.error }),
                                    jsxRuntime.jsx(
                                        SignUpForm,
                                        assets.__assign({}, props, {
                                            footer: jsxRuntime.jsx(SignUpFooter, {
                                                privacyPolicyLink:
                                                    props.config.signInAndUpFeature.signUpForm.privacyPolicyLink,
                                                termsOfServiceLink:
                                                    props.config.signInAndUpFeature.signUpForm.termsOfServiceLink,
                                            }),
                                        })
                                    ),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx(SuperTokensBranding.SuperTokensBranding, {}),
                ],
            }
        )
    );
});

var SignInFooter = querier.withOverride("EmailPasswordSignInFooter", function EmailPasswordSignInFooter(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        assets.__assign(
            { "data-supertokens": "link secondaryText forgotPasswordLink", onClick: onClick },
            { children: t("EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK") }
        )
    );
});

var SignInForm = querier.withOverride("EmailPasswordSignInForm", function EmailPasswordSignInForm(props) {
    var _this = this;
    var userContext = authRecipe.useUserContext();
    return jsxRuntime.jsx(formBase.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                var validationErrors, response;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                authRecipe.validateForm(
                                    formFields,
                                    props.config.signInAndUpFeature.signInForm.formFields
                                ),
                            ];
                        case 1:
                            validationErrors = _a.sent();
                            if (validationErrors.length > 0) {
                                return [
                                    2 /*return*/,
                                    {
                                        status: "FIELD_ERROR",
                                        formFields: validationErrors,
                                    },
                                ];
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.signIn({
                                    formFields: formFields,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _a.sent();
                            if (response.status === "WRONG_CREDENTIALS_ERROR") {
                                throw new querier.STGeneralError("EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR");
                            } else {
                                return [2 /*return*/, response];
                            }
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
        footer: props.footer,
    });
});

var SignInHeader = querier.withOverride("EmailPasswordSignInHeader", function EmailPasswordSignInHeader(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                assets.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx(
                "div",
                assets.__assign(
                    { "data-supertokens": "headerSubtitle" },
                    {
                        children: jsxRuntime.jsxs(
                            "div",
                            assets.__assign(
                                { "data-supertokens": "secondaryText" },
                                {
                                    children: [
                                        t("EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START"),
                                        jsxRuntime.jsx(
                                            "span",
                                            assets.__assign(
                                                { "data-supertokens": "link", onClick: onClick },
                                                { children: t("EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK") }
                                            )
                                        ),
                                        t("EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END"),
                                    ],
                                }
                            )
                        ),
                    }
                )
            ),
            jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

var SignIn = querier.withOverride("EmailPasswordSignIn", function EmailPasswordSignIn(props) {
    return jsxRuntime.jsxs(
        "div",
        assets.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        assets.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignInHeader, { onClick: props.signUpClicked }),
                                    props.error !== undefined &&
                                        jsxRuntime.jsx(querier.GeneralError, { error: props.error }),
                                    jsxRuntime.jsx(
                                        SignInForm,
                                        assets.__assign({}, props, {
                                            footer: jsxRuntime.jsx(SignInFooter, {
                                                onClick: props.forgotPasswordClick,
                                            }),
                                        })
                                    ),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx(SuperTokensBranding.SuperTokensBranding, {}),
                ],
            }
        )
    );
});

var SignInAndUpTheme = function (props) {
    // If isSignUp, return signUp.
    if (props.featureState.isSignUp) {
        return jsxRuntime.jsx(
            SignUp,
            assets.__assign({}, props.signUpForm, {
                signInClicked: function () {
                    props.dispatch({ type: "setSignIn" });
                },
            })
        );
    }
    // Otherwise, return SignIn.
    return jsxRuntime.jsx(
        SignIn,
        assets.__assign({}, props.signInForm, {
            signUpClicked: function () {
                props.dispatch({ type: "setSignUp" });
            },
        })
    );
};
function SignInAndUpThemeWrapper(props) {
    var hasFont = querier.hasFontDefined(props.config.rootStyle);
    var activeStyle = props.featureState.isSignUp
        ? props.config.signInAndUpFeature.signUpForm.style
        : props.config.signInAndUpFeature.signInForm.style;
    return jsxRuntime.jsx(
        authRecipe.UserContextWrapper,
        assets.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    assets.__assign(
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
                        { children: jsxRuntime.jsx(SignInAndUpTheme, assets.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

var defaultTranslationsEmailPassword = {
    en: assets.__assign(
        assets.__assign(
            assets.__assign({}, querier.defaultTranslationsCommon.en),
            translations.defaultTranslationsEmailVerification.en
        ),
        {
            EMAIL_PASSWORD_EMAIL_LABEL: "Email",
            EMAIL_PASSWORD_EMAIL_PLACEHOLDER: "Email address",
            EMAIL_PASSWORD_PASSWORD_LABEL: "Password",
            EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: "Password",
            EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE: "Sign In",
            EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START: "Not registered yet?",
            EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK: "Sign Up",
            EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END: "",
            EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK: "Forgot password?",
            EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: "SIGN IN",
            EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR: "Incorrect email and password combination",
            EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE: "Sign Up",
            EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START: "Already have an account?",
            EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_SIGN_IN_LINK: "Sign In",
            EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_END: "",
            EMAIL_PASSWORD_SIGN_UP_FOOTER_START: "By continuing, you agree to our ",
            EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS: "Terms of Service",
            EMAIL_PASSWORD_SIGN_UP_FOOTER_AND: " and ",
            EMAIL_PASSWORD_SIGN_UP_FOOTER_PP: "Privacy Policy",
            EMAIL_PASSWORD_SIGN_UP_FOOTER_END: "",
            EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN: "SIGN UP",
            EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS: "This email already exists. Please sign in instead",
            EMAIL_PASSWORD_RESET_HEADER_TITLE: "Reset your password",
            EMAIL_PASSWORD_RESET_HEADER_SUBTITLE: "We will send you an email to reset your password",
            EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL: "your account",
            EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL: "A password reset email has been sent to ",
            EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL: ", if it exists in our system. ",
            EMAIL_PASSWORD_RESET_RESEND_LINK: "Resend or change email",
            EMAIL_PASSWORD_RESET_SEND_BTN: "Email me",
            EMAIL_PASSWORD_RESET_SIGN_IN_LINK: "Sign In",
            EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE: "Success!",
            EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC: "Your password has been updated successfully",
            EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN: "SIGN IN",
            EMAIL_PASSWORD_NEW_PASSWORD_LABEL: "New password",
            EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER: "New password",
            EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL: "Confirm password",
            EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER: "Confirm your password",
            EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE: "Change your password",
            EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE: "Enter a new password below to change your password",
            EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN: "CHANGE PASSWORD",
            EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR: "Invalid password reset token",
            ERROR_EMAIL_NON_STRING: "Email must be of type string",
            ERROR_EMAIL_INVALID: "Email is invalid",
            ERROR_PASSWORD_NON_STRING: "Password must be of type string",
            ERROR_PASSWORD_TOO_SHORT: "Password must contain at least 8 characters, including a number",
            ERROR_PASSWORD_TOO_LONG: "Password's length must be lesser than 100 characters",
            ERROR_PASSWORD_NO_ALPHA: "Password must contain at least one alphabet",
            ERROR_PASSWORD_NO_NUM: "Password must contain at least one number",
            ERROR_CONFIRM_PASSWORD_NO_MATCH: "Confirmation password doesn't match",
            ERROR_NON_OPTIONAL: "Field is not optional",
            /*
             * The following are error messages from our backend SDK.
             * These are returned as full messages to preserver compatibilty, but they work just like the keys above.
             * They are shown as is by default (setting the value to undefined will display the raw translation key)
             */
            "This email already exists. Please sign in instead.": undefined,
            "Field is not optional": undefined,
            "Password must contain at least 8 characters, including a number": undefined,
            "Password's length must be lesser than 100 characters": undefined,
            "Password must contain at least one alphabet": undefined,
            "Password must contain at least one number": undefined,
            "Email is invalid": undefined,
        }
    ),
};

var useFeatureReducer = function (recipe) {
    return React__namespace.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "setSignIn":
                    return assets.__assign(assets.__assign({}, oldState), { error: undefined, isSignUp: false });
                case "setSignUp":
                    return assets.__assign(assets.__assign({}, oldState), { error: undefined, isSignUp: true });
                case "setError":
                    return assets.__assign(assets.__assign({}, oldState), { error: action.error });
                default:
                    return oldState;
            }
        },
        {
            isSignUp: recipe === undefined ? false : recipe.config.signInAndUpFeature.defaultToSignUp,
            user: undefined,
            error: undefined,
        },
        function (initArg) {
            var show = authRecipe.getQueryParams("show");
            var isSignUp = initArg.isSignUp;
            if (show !== null) {
                isSignUp = show === "signup";
            }
            return {
                isSignUp: isSignUp,
                user: undefined,
                error: undefined,
            };
        }
    );
};
function useChildProps(recipe, state, dispatch, history) {
    var _this = this;
    var recipeImplementation = React.useMemo(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.recipeImpl);
        },
        [recipe]
    );
    var userContext = authRecipe.useUserContext();
    var onSignInSuccess = React.useCallback(
        function () {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        authRecipe.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: recipe.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: false,
                                    redirectToPath: authRecipe.getRedirectToPathFromURL(),
                                },
                            },
                            userContext,
                            history
                        ),
                    ];
                });
            });
        },
        [recipe, userContext, history]
    );
    var onSignUpSuccess = React.useCallback(
        function () {
            return assets.__awaiter(_this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        authRecipe.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: recipe.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: true,
                                    redirectToPath: authRecipe.getRedirectToPathFromURL(),
                                },
                            },
                            userContext,
                            history
                        ),
                    ];
                });
            });
        },
        [recipe, userContext, history]
    );
    return React.useMemo(
        function () {
            if (recipe === undefined || recipeImplementation === undefined) {
                return;
            }
            var signInAndUpFeature = recipe.config.signInAndUpFeature;
            var signUpFeature = signInAndUpFeature.signUpForm;
            var signInFeature = signInAndUpFeature.signInForm;
            var signInForm = {
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                styleFromInit: signInFeature.style,
                formFields: signInFeature.formFields,
                error: state.error,
                clearError: function () {
                    return dispatch({ type: "setError", error: undefined });
                },
                onError: function (error) {
                    return dispatch({ type: "setError", error: error });
                },
                onSuccess: onSignInSuccess,
                forgotPasswordClick: function () {
                    return recipe.redirect({ action: "RESET_PASSWORD" }, history);
                },
            };
            var signUpForm = {
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                styleFromInit: signUpFeature.style,
                formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe, userContext),
                error: state.error,
                clearError: function () {
                    return dispatch({ type: "setError", error: undefined });
                },
                onError: function (error) {
                    return dispatch({ type: "setError", error: error });
                },
                onSuccess: onSignUpSuccess,
            };
            return {
                config: recipe.config,
                signInForm: signInForm,
                signUpForm: signUpForm,
            };
        },
        [recipe, state, dispatch]
    );
}
var SignInAndUpFeature = function (props) {
    var _a = useFeatureReducer(props.recipe),
        state = _a[0],
        dispatch = _a[1];
    var childProps = useChildProps(props.recipe, state, dispatch, props.history);
    return jsxRuntime.jsx(
        querier.ComponentOverrideContext.Provider,
        assets.__assign(
            { value: props.recipe.config.override.components },
            {
                children: jsxRuntime.jsx(
                    querier.FeatureWrapper,
                    assets.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: defaultTranslationsEmailPassword,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            SignInAndUpThemeWrapper,
                                            assets.__assign({}, childProps, { featureState: state, dispatch: dispatch })
                                        ),
                                    props.children &&
                                        React__namespace.Children.map(props.children, function (child) {
                                            if (React__namespace.isValidElement(child)) {
                                                return React__namespace.cloneElement(
                                                    child,
                                                    assets.__assign(assets.__assign({}, childProps), {
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
var getModifiedRecipeImplementation = function (origImpl) {
    return assets.__assign({}, origImpl);
};
function getThemeSignUpFeatureFormFields(formFields, recipe, userContext) {
    var _this = this;
    var emailPasswordOnly = formFields.length === 2;
    return formFields.map(function (field) {
        return assets.__assign(assets.__assign({}, field), {
            showIsRequired: (function () {
                // If email and password only, do not show required indicator (*).
                if (emailPasswordOnly) {
                    return false;
                }
                // Otherwise, show for all non optional fields (including email and password).
                return field.optional === false;
            })(),
            validate: (function () {
                // If field is not email, return field validate unchanged.
                if (field.id !== "email") {
                    return field.validate;
                }
                // Otherwise, if email, use syntax validate method and check if email exists.
                return function (value) {
                    return assets.__awaiter(_this, void 0, void 0, function () {
                        var error, emailExists, err_1;
                        return assets.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, field.validate(value)];
                                case 1:
                                    error = _a.sent();
                                    if (error !== undefined) {
                                        return [2 /*return*/, error];
                                    }
                                    if (typeof value !== "string") {
                                        return [2 /*return*/, "GENERAL_ERROR_EMAIL_NON_STRING"];
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [
                                        4 /*yield*/,
                                        recipe.recipeImpl.doesEmailExist({
                                            email: value,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 3:
                                    emailExists = _a.sent().doesExist;
                                    if (emailExists) {
                                        return [2 /*return*/, "EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS"];
                                    }
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_1 = _a.sent();
                                    if (querier.STGeneralError.isThisError(err_1)) {
                                        return [2 /*return*/, err_1.message];
                                    }
                                    return [3 /*break*/, 5];
                                case 5:
                                    return [2 /*return*/, undefined];
                            }
                        });
                    });
                };
            })(),
        });
    });
}

/*
 * Component.
 */
function BackToSignInButton(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "div",
        assets.__assign(
            { "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: onClick },
            { children: [jsxRuntime.jsx(assets.ArrowLeftIcon, {}), t("EMAIL_PASSWORD_RESET_SIGN_IN_LINK")] }
        )
    );
}

/*
 * Component.
 */
function BackButton(_a) {
    var onClick = _a.onClick;
    return jsxRuntime.jsx(
        "button",
        assets.__assign(
            { onClick: onClick, "data-supertokens": "backButton backButtonCommon" },
            { children: jsxRuntime.jsx(assets.HeavyArrowLeftIcon, {}) }
        )
    );
}

var EmailPasswordResetPasswordEmail = function (props) {
    var t = translationContext.useTranslation();
    var userContext = authRecipe.useUserContext();
    var _a = React.useState("READY"),
        status = _a[0],
        setStatus = _a[1];
    var _b = React.useState(""),
        emailFieldValue = _b[0],
        setEmailFieldValue = _b[1];
    var onSuccess = function () {
        setStatus("SENT");
    };
    var resend = function () {
        setStatus("READY");
    };
    var formFields = props.formFields;
    var emailSuccessText =
        t("EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL") +
        (emailFieldValue !== undefined && emailFieldValue.length > 0
            ? emailFieldValue
            : t("EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL")) +
        t("EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL");
    if (status === "SENT") {
        return jsxRuntime.jsx(
            "div",
            assets.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        assets.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsxs(
                                        "div",
                                        assets.__assign(
                                            { "data-supertokens": "primaryText enterEmailSuccessMessage" },
                                            {
                                                children: [
                                                    emailSuccessText,
                                                    jsxRuntime.jsx(
                                                        "span",
                                                        assets.__assign(
                                                            {
                                                                "data-supertokens": "link resendEmailLink",
                                                                onClick: resend,
                                                            },
                                                            { children: t("EMAIL_PASSWORD_RESET_RESEND_LINK") }
                                                        )
                                                    ),
                                                ],
                                            }
                                        )
                                    ),
                                    jsxRuntime.jsx(BackToSignInButton, { onClick: props.onBackButtonClicked }),
                                ],
                            }
                        )
                    ),
                }
            )
        );
    }
    // Otherwise, return Form.
    return jsxRuntime.jsx(
        "div",
        assets.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    assets.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                jsxRuntime.jsxs(
                                    "div",
                                    assets.__assign(
                                        { "data-supertokens": "headerTitle resetPasswordHeaderTitle" },
                                        {
                                            children: [
                                                jsxRuntime.jsx(BackButton, { onClick: props.onBackButtonClicked }),
                                                t("EMAIL_PASSWORD_RESET_HEADER_TITLE"),
                                                jsxRuntime.jsx("span", {
                                                    "data-supertokens": "backButtonPlaceholder backButtonCommon",
                                                }),
                                            ],
                                        }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    assets.__assign(
                                        { "data-supertokens": "headerSubtitle" },
                                        {
                                            children: jsxRuntime.jsx(
                                                "div",
                                                assets.__assign(
                                                    { "data-supertokens": "secondaryText" },
                                                    { children: t("EMAIL_PASSWORD_RESET_HEADER_SUBTITLE") }
                                                )
                                            ),
                                        }
                                    )
                                ),
                                props.error !== undefined &&
                                    jsxRuntime.jsx(querier.GeneralError, { error: props.error }),
                                jsxRuntime.jsx(formBase.FormBase, {
                                    clearError: props.clearError,
                                    onError: props.onError,
                                    formFields: formFields,
                                    buttonLabel: "EMAIL_PASSWORD_RESET_SEND_BTN",
                                    onSuccess: onSuccess,
                                    callAPI: function (formFields) {
                                        return assets.__awaiter(void 0, void 0, void 0, function () {
                                            var validationErrors, emailField;
                                            return assets.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        return [
                                                            4 /*yield*/,
                                                            authRecipe.validateForm(
                                                                formFields,
                                                                props.config.resetPasswordUsingTokenFeature
                                                                    .enterEmailForm.formFields
                                                            ),
                                                        ];
                                                    case 1:
                                                        validationErrors = _a.sent();
                                                        if (validationErrors.length > 0) {
                                                            return [
                                                                2 /*return*/,
                                                                {
                                                                    status: "FIELD_ERROR",
                                                                    formFields: validationErrors,
                                                                },
                                                            ];
                                                        }
                                                        emailField = formFields.find(function (field) {
                                                            return field.id === "email";
                                                        });
                                                        if (emailField !== undefined) {
                                                            setEmailFieldValue(emailField.value);
                                                        }
                                                        return [
                                                            4 /*yield*/,
                                                            props.recipeImplementation.sendPasswordResetEmail({
                                                                formFields: formFields,
                                                                userContext: userContext,
                                                            }),
                                                        ];
                                                    case 2:
                                                        return [2 /*return*/, _a.sent()];
                                                }
                                            });
                                        });
                                    },
                                    showLabels: true,
                                    validateOnBlur: true,
                                }),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
var ResetPasswordEmail = querier.withOverride("EmailPasswordResetPasswordEmail", EmailPasswordResetPasswordEmail);

var EmailPasswordSubmitNewPassword = function (props) {
    var t = translationContext.useTranslation();
    var userContext = authRecipe.useUserContext();
    var _a = React.useState("READY"),
        status = _a[0],
        setStatus = _a[1];
    var onSuccess = function () {
        setStatus("SUCCESS");
    };
    var formFields = props.formFields,
        onSignInClicked = props.onSignInClicked;
    if (status === "SUCCESS") {
        return jsxRuntime.jsx(
            "div",
            assets.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        assets.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        assets.__assign(
                                            { "data-supertokens": "headerTitle" },
                                            { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        formBase.FormRow,
                                        {
                                            children: jsxRuntime.jsxs(React.Fragment, {
                                                children: [
                                                    jsxRuntime.jsx(
                                                        "div",
                                                        assets.__assign(
                                                            {
                                                                "data-supertokens":
                                                                    "primaryText submitNewPasswordSuccessMessage",
                                                            },
                                                            {
                                                                children: t(
                                                                    "EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC"
                                                                ),
                                                            }
                                                        )
                                                    ),
                                                    jsxRuntime.jsx(button.Button, {
                                                        disabled: false,
                                                        isLoading: false,
                                                        type: "button",
                                                        onClick: onSignInClicked,
                                                        label: "EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN",
                                                    }),
                                                ],
                                            }),
                                        },
                                        "form-button"
                                    ),
                                ],
                            }
                        )
                    ),
                }
            )
        );
    }
    return jsxRuntime.jsx(
        "div",
        assets.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    assets.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                jsxRuntime.jsx(
                                    "div",
                                    assets.__assign(
                                        { "data-supertokens": "headerTitle" },
                                        { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    assets.__assign(
                                        { "data-supertokens": "headerSubtitle" },
                                        {
                                            children: jsxRuntime.jsx(
                                                "div",
                                                assets.__assign(
                                                    { "data-supertokens": "secondaryText" },
                                                    { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE") }
                                                )
                                            ),
                                        }
                                    )
                                ),
                                props.error !== undefined &&
                                    jsxRuntime.jsx(querier.GeneralError, { error: props.error }),
                                jsxRuntime.jsx(formBase.FormBase, {
                                    formFields: formFields,
                                    clearError: props.clearError,
                                    onError: props.onError,
                                    buttonLabel: "EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN",
                                    onSuccess: onSuccess,
                                    validateOnBlur: true,
                                    callAPI: function (fields) {
                                        return assets.__awaiter(void 0, void 0, void 0, function () {
                                            var validationErrors, response;
                                            return assets.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        return [
                                                            4 /*yield*/,
                                                            authRecipe.validateForm(
                                                                fields,
                                                                props.config.resetPasswordUsingTokenFeature
                                                                    .submitNewPasswordForm.formFields
                                                            ),
                                                        ];
                                                    case 1:
                                                        validationErrors = _a.sent();
                                                        if (validationErrors.length > 0) {
                                                            return [
                                                                2 /*return*/,
                                                                {
                                                                    status: "FIELD_ERROR",
                                                                    formFields: validationErrors,
                                                                },
                                                            ];
                                                        }
                                                        // Verify that both passwords match.
                                                        if (fields[0].value !== fields[1].value) {
                                                            return [
                                                                2 /*return*/,
                                                                {
                                                                    status: "FIELD_ERROR",
                                                                    formFields: [
                                                                        {
                                                                            id: fields[1].id,
                                                                            error: "ERROR_CONFIRM_PASSWORD_NO_MATCH",
                                                                        },
                                                                    ],
                                                                },
                                                            ];
                                                        }
                                                        return [
                                                            4 /*yield*/,
                                                            props.recipeImplementation.submitNewPassword({
                                                                formFields: fields,
                                                                userContext: userContext,
                                                            }),
                                                        ];
                                                    case 2:
                                                        response = _a.sent();
                                                        if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                                                            throw new querier.STGeneralError(
                                                                "EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR"
                                                            );
                                                        }
                                                        return [
                                                            2 /*return*/,
                                                            response.status === "FIELD_ERROR"
                                                                ? response
                                                                : {
                                                                      status: "OK",
                                                                  },
                                                        ];
                                                }
                                            });
                                        });
                                    },
                                    showLabels: true,
                                }),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
var SubmitNewPassword = querier.withOverride("EmailPasswordSubmitNewPassword", EmailPasswordSubmitNewPassword);

/*
 * Component.
 */
function ResetPasswordUsingTokenTheme(props) {
    /*
     * Render.
     */
    // If no token, return SubmitNewPassword.
    if (props.submitNewPasswordForm !== undefined) {
        return jsxRuntime.jsx(SubmitNewPassword, assets.__assign({}, props.submitNewPasswordForm));
    }
    // Otherwise, return EnterEmail.
    return jsxRuntime.jsx(ResetPasswordEmail, assets.__assign({}, props.enterEmailForm));
}
function ResetPasswordUsingTokenThemeWrapper(props) {
    var hasFont = querier.hasFontDefined(props.config.rootStyle);
    var userStyles = props.submitNewPasswordForm
        ? props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.style
        : props.config.resetPasswordUsingTokenFeature.enterEmailForm.style;
    return jsxRuntime.jsx(
        authRecipe.UserContextWrapper,
        assets.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    assets.__assign(
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, userStyles] },
                        { children: jsxRuntime.jsx(ResetPasswordUsingTokenTheme, assets.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

var ResetPasswordUsingToken = /** @class */ (function (_super) {
    assets.__extends(ResetPasswordUsingToken, _super);
    /*
     * Constructor.
     */
    function ResetPasswordUsingToken(props) {
        var _this = _super.call(this, props) || this;
        _this.render = function () {
            var enterEmailFormFeature = _this.props.recipe.config.resetPasswordUsingTokenFeature.enterEmailForm;
            var componentOverrides = _this.props.recipe.config.override.components;
            var submitNewPasswordFormFeature =
                _this.props.recipe.config.resetPasswordUsingTokenFeature.submitNewPasswordForm;
            var submitNewPasswordForm =
                _this.state.token === undefined
                    ? undefined
                    : {
                          error: _this.state.error,
                          onError: function (error) {
                              return _this.setState(function (os) {
                                  return assets.__assign(assets.__assign({}, os), { error: error });
                              });
                          },
                          clearError: function () {
                              return _this.setState(function (os) {
                                  return assets.__assign(assets.__assign({}, os), { error: undefined });
                              });
                          },
                          styleFromInit: submitNewPasswordFormFeature.style,
                          formFields: submitNewPasswordFormFeature.formFields,
                          recipeImplementation: _this.props.recipe.recipeImpl,
                          config: _this.props.recipe.config,
                          onSignInClicked: function () {
                              void authRecipe.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                  show: "signin",
                                  history: _this.props.history,
                                  redirectBack: false,
                              });
                          },
                          token: _this.state.token,
                      };
            var enterEmailForm = {
                onBackButtonClicked: function () {
                    return authRecipe.SuperTokens.getInstanceOrThrow().redirectToAuth({
                        show: "signin",
                        history: _this.props.history,
                        redirectBack: false,
                    });
                },
                error: _this.state.error,
                onError: function (error) {
                    return _this.setState(function (os) {
                        return assets.__assign(assets.__assign({}, os), { error: error });
                    });
                },
                clearError: function () {
                    return _this.setState(function (os) {
                        return assets.__assign(assets.__assign({}, os), { error: undefined });
                    });
                },
                styleFromInit: enterEmailFormFeature.style,
                formFields: enterEmailFormFeature.formFields,
                recipeImplementation: _this.props.recipe.recipeImpl,
                config: _this.props.recipe.config,
            };
            var props = {
                config: _this.props.recipe.config,
                submitNewPasswordForm: submitNewPasswordForm,
                enterEmailForm: enterEmailForm,
            };
            return jsxRuntime.jsx(
                querier.ComponentOverrideContext.Provider,
                assets.__assign(
                    { value: componentOverrides },
                    {
                        children: jsxRuntime.jsx(
                            querier.FeatureWrapper,
                            assets.__assign(
                                {
                                    useShadowDom: _this.props.recipe.config.useShadowDom,
                                    defaultStore: defaultTranslationsEmailPassword,
                                },
                                {
                                    children: jsxRuntime.jsxs(React.Fragment, {
                                        children: [
                                            _this.props.children === undefined &&
                                                jsxRuntime.jsx(
                                                    ResetPasswordUsingTokenThemeWrapper,
                                                    assets.__assign({}, props)
                                                ),
                                            _this.props.children &&
                                                React__namespace.Children.map(_this.props.children, function (child) {
                                                    if (React__namespace.isValidElement(child)) {
                                                        return React__namespace.cloneElement(child, props);
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
        var token = authRecipe.getQueryParams("token");
        if (token === null) {
            _this.state = { token: undefined, error: undefined };
        } else {
            _this.state = {
                token: token,
                error: undefined,
            };
        }
        return _this;
    }
    return ResetPasswordUsingToken;
})(React.PureComponent);

var recipeImplementation = authRecipe.createCommonjsModule(function (module, exports) {
    var __awaiter =
        (authRecipe.commonjsGlobal && authRecipe.commonjsGlobal.__awaiter) ||
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
        (authRecipe.commonjsGlobal && authRecipe.commonjsGlobal.__generator) ||
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRecipeImplementation = void 0;
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

    function getRecipeImplementation(recipeImplInput) {
        var querier$1 = new querier.querier.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
        return {
            submitNewPassword: function (_a) {
                var formFields = _a.formFields,
                    options = _a.options,
                    userContext = _a.userContext;
                return __awaiter(this, void 0, void 0, function () {
                    var token, _b, jsonBody, fetchResponse;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                token = this.getResetPasswordTokenFromURL({
                                    userContext: userContext,
                                });
                                return [
                                    4 /*yield*/,
                                    querier$1.post(
                                        "/user/password/reset",
                                        {
                                            body: JSON.stringify({
                                                formFields: formFields,
                                                token: token,
                                                method: "token",
                                            }),
                                        },
                                        querier.querier.default.preparePreAPIHook({
                                            recipePreAPIHook: recipeImplInput.preAPIHook,
                                            action: "SUBMIT_NEW_PASSWORD",
                                            options: options,
                                            userContext: userContext,
                                        }),
                                        querier.querier.default.preparePostAPIHook({
                                            recipePostAPIHook: recipeImplInput.postAPIHook,
                                            action: "SUBMIT_NEW_PASSWORD",
                                            userContext: userContext,
                                        })
                                    ),
                                ];
                            case 1:
                                (_b = _c.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
                                if (jsonBody.status === "FIELD_ERROR") {
                                    return [
                                        2 /*return*/,
                                        {
                                            status: "FIELD_ERROR",
                                            formFields: jsonBody.formFields,
                                            fetchResponse: fetchResponse,
                                        },
                                    ];
                                }
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
            sendPasswordResetEmail: function (_a) {
                var formFields = _a.formFields,
                    options = _a.options,
                    userContext = _a.userContext;
                return __awaiter(this, void 0, void 0, function () {
                    var _b, jsonBody, fetchResponse;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    querier$1.post(
                                        "/user/password/reset/token",
                                        { body: JSON.stringify({ formFields: formFields }) },
                                        querier.querier.default.preparePreAPIHook({
                                            recipePreAPIHook: recipeImplInput.preAPIHook,
                                            action: "SEND_RESET_PASSWORD_EMAIL",
                                            options: options,
                                            userContext: userContext,
                                        }),
                                        querier.querier.default.preparePostAPIHook({
                                            recipePostAPIHook: recipeImplInput.postAPIHook,
                                            action: "SEND_RESET_PASSWORD_EMAIL",
                                            userContext: userContext,
                                        })
                                    ),
                                ];
                            case 1:
                                (_b = _c.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
                                if (jsonBody.status === "FIELD_ERROR") {
                                    return [
                                        2 /*return*/,
                                        {
                                            status: "FIELD_ERROR",
                                            formFields: jsonBody.formFields,
                                            fetchResponse: fetchResponse,
                                        },
                                    ];
                                }
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
            signUp: function (_a) {
                var formFields = _a.formFields,
                    options = _a.options,
                    userContext = _a.userContext;
                return __awaiter(this, void 0, void 0, function () {
                    var _b, jsonBody, fetchResponse;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    querier$1.post(
                                        "/signup",
                                        { body: JSON.stringify({ formFields: formFields }) },
                                        querier.querier.default.preparePreAPIHook({
                                            recipePreAPIHook: recipeImplInput.preAPIHook,
                                            action: "EMAIL_PASSWORD_SIGN_UP",
                                            options: options,
                                            userContext: userContext,
                                        }),
                                        querier.querier.default.preparePostAPIHook({
                                            recipePostAPIHook: recipeImplInput.postAPIHook,
                                            action: "EMAIL_PASSWORD_SIGN_UP",
                                            userContext: userContext,
                                        })
                                    ),
                                ];
                            case 1:
                                (_b = _c.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
                                if (jsonBody.status === "FIELD_ERROR") {
                                    return [
                                        2 /*return*/,
                                        {
                                            status: "FIELD_ERROR",
                                            formFields: jsonBody.formFields,
                                            fetchResponse: fetchResponse,
                                        },
                                    ];
                                }
                                return [
                                    2 /*return*/,
                                    {
                                        status: jsonBody.status,
                                        user: jsonBody.user,
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                        }
                    });
                });
            },
            signIn: function (_a) {
                var formFields = _a.formFields,
                    options = _a.options,
                    userContext = _a.userContext;
                return __awaiter(this, void 0, void 0, function () {
                    var _b, jsonBody, fetchResponse;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    querier$1.post(
                                        "/signin",
                                        { body: JSON.stringify({ formFields: formFields }) },
                                        querier.querier.default.preparePreAPIHook({
                                            recipePreAPIHook: recipeImplInput.preAPIHook,
                                            action: "EMAIL_PASSWORD_SIGN_IN",
                                            options: options,
                                            userContext: userContext,
                                        }),
                                        querier.querier.default.preparePostAPIHook({
                                            recipePostAPIHook: recipeImplInput.postAPIHook,
                                            action: "EMAIL_PASSWORD_SIGN_IN",
                                            userContext: userContext,
                                        })
                                    ),
                                ];
                            case 1:
                                (_b = _c.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
                                if (jsonBody.status === "FIELD_ERROR") {
                                    return [
                                        2 /*return*/,
                                        {
                                            status: "FIELD_ERROR",
                                            formFields: jsonBody.formFields,
                                            fetchResponse: fetchResponse,
                                        },
                                    ];
                                }
                                if (jsonBody.status === "WRONG_CREDENTIALS_ERROR") {
                                    return [
                                        2 /*return*/,
                                        {
                                            status: "WRONG_CREDENTIALS_ERROR",
                                            fetchResponse: fetchResponse,
                                        },
                                    ];
                                }
                                return [
                                    2 /*return*/,
                                    {
                                        status: "OK",
                                        user: jsonBody.user,
                                        fetchResponse: fetchResponse,
                                    },
                                ];
                        }
                    });
                });
            },
            doesEmailExist: function (_a) {
                var email = _a.email,
                    options = _a.options,
                    userContext = _a.userContext;
                return __awaiter(this, void 0, void 0, function () {
                    var _b, jsonBody, fetchResponse;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    querier$1.get(
                                        "/signup/email/exists",
                                        {},
                                        { email: email },
                                        querier.querier.default.preparePreAPIHook({
                                            recipePreAPIHook: recipeImplInput.preAPIHook,
                                            action: "EMAIL_EXISTS",
                                            options: options,
                                            userContext: userContext,
                                        }),
                                        querier.querier.default.preparePostAPIHook({
                                            recipePostAPIHook: recipeImplInput.postAPIHook,
                                            action: "EMAIL_EXISTS",
                                            userContext: userContext,
                                        })
                                    ),
                                ];
                            case 1:
                                (_b = _c.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
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
            getResetPasswordTokenFromURL: function () {
                var token = (0, authRecipe.utils.getQueryParams)("token");
                if (token === undefined) {
                    return "";
                }
                return token;
            },
        };
    }
    exports.default = getRecipeImplementation;
    exports.getRecipeImplementation = getRecipeImplementation;
});

authRecipe.unwrapExports(recipeImplementation);
var recipeImplementation_1 = recipeImplementation.getRecipeImplementation;

function getRecipeImplementation(recipeInput) {
    var webJsImplementation = recipeImplementation_1({
        recipeId: recipeInput.recipeId,
        appInfo: recipeInput.appInfo,
        preAPIHook: recipeInput.preAPIHook,
        postAPIHook: recipeInput.postAPIHook,
    });
    return {
        submitNewPassword: function (input) {
            return assets.__awaiter(this, void 0, void 0, function () {
                var response;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.submitNewPassword.bind(this)(
                                    assets.__assign(assets.__assign({}, input), { formFields: [input.formFields[0]] })
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
            return assets.__awaiter(this, void 0, void 0, function () {
                var response;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.sendPasswordResetEmail.bind(this)(assets.__assign({}, input)),
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
            return assets.__awaiter(this, void 0, void 0, function () {
                var response;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.signUp.bind(this)(assets.__assign({}, input))];
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
            return assets.__awaiter(this, void 0, void 0, function () {
                var response;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, webJsImplementation.signIn.bind(this)(assets.__assign({}, input))];
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
            return assets.__awaiter(this, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.doesEmailExist.bind(this)(assets.__assign({}, input)),
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

/*
 * Class.
 */
var EmailPassword = /** @class */ (function (_super) {
    assets.__extends(EmailPassword, _super);
    function EmailPassword(config) {
        var _this = _super.call(this, normaliseEmailPasswordConfig(config)) || this;
        _this.getFeatures = function () {
            var features = {};
            if (_this.config.signInAndUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new authRecipe.NormalisedURLPath("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: authRecipe.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("signinup", props);
                    },
                };
            }
            if (_this.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new authRecipe.NormalisedURLPath(formBase.DEFAULT_RESET_PASSWORD_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: authRecipe.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("resetpassword", props);
                    },
                };
            }
            return features;
        };
        _this.getDefaultRedirectionURL = function (context) {
            return assets.__awaiter(_this, void 0, void 0, function () {
                var resetPasswordPath;
                return assets.__generator(this, function (_a) {
                    if (context.action === "RESET_PASSWORD") {
                        resetPasswordPath = new authRecipe.NormalisedURLPath(formBase.DEFAULT_RESET_PASSWORD_PATH);
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
        _this.getFeatureComponent = function (componentName, props) {
            if (componentName === "signinup") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        authRecipe.UserContextWrapper,
                        assets.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    authRecipe.AuthWidgetWrapper,
                                    assets.__assign(
                                        { authRecipe: _this, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUpFeature,
                                                assets.__assign({ recipe: _this }, props)
                                            ),
                                        }
                                    )
                                ),
                            }
                        )
                    );
                } else {
                    return jsxRuntime.jsx(
                        authRecipe.UserContextWrapper,
                        assets.__assign(
                            { userContext: props.userContext },
                            { children: jsxRuntime.jsx(SignInAndUpFeature, assets.__assign({ recipe: _this }, props)) }
                        )
                    );
                }
            } else if (componentName === "resetpassword") {
                return jsxRuntime.jsx(
                    authRecipe.UserContextWrapper,
                    assets.__assign(
                        { userContext: props.userContext },
                        { children: jsxRuntime.jsx(ResetPasswordUsingToken, assets.__assign({ recipe: _this }, props)) }
                    )
                );
            } else {
                throw new Error("Should never come here.");
            }
        };
        var builder = new authRecipe.OverrideableBuilder(
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
                assets.__assign(assets.__assign({}, config), { appInfo: appInfo, recipeId: EmailPassword.RECIPE_ID })
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
                error = error + authRecipe.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailPassword.instance;
    };
    /*
     * Tests methods.
     */
    EmailPassword.reset = function () {
        if (!authRecipe.isTest()) {
            return;
        }
        EmailPassword.instance = undefined;
        return;
    };
    EmailPassword.RECIPE_ID = "emailpassword";
    return EmailPassword;
})(authRecipe.AuthRecipe);

exports.EmailPassword = EmailPassword;
exports.ResetPasswordUsingTokenThemeWrapper = ResetPasswordUsingTokenThemeWrapper;
exports.SignInAndUpThemeWrapper = SignInAndUpThemeWrapper;
exports.SignInFooter = SignInFooter;
exports.SignInForm = SignInForm;
exports.SignInHeader = SignInHeader;
exports.SignUpFooter = SignUpFooter;
exports.SignUpForm = SignUpForm;
exports.SignUpHeader = SignUpHeader;
exports.defaultTranslationsEmailPassword = defaultTranslationsEmailPassword;
exports.getRecipeImplementation = getRecipeImplementation;
exports.useChildProps = useChildProps;
exports.useFeatureReducer = useFeatureReducer;
//# sourceMappingURL=emailpassword-shared2.js.map
