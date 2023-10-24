"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var SuperTokensBranding = require("./SuperTokensBranding.js");
var componentOverrideContext = require("./emailpassword-shared3.js");
var React = require("react");
var translations = require("./translations.js");
var translations$1 = require("./emailverification-shared2.js");
var translationContext = require("./translationContext.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
var formBase = require("./emailpassword-shared7.js");
var generalError = require("./emailpassword-shared.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var button = require("./emailpassword-shared2.js");
var recipe = require("./session-shared2.js");
var STGeneralError$1 = require("supertokens-web-js/lib/build/error");
var validators = require("./emailpassword-shared5.js");
var recipe$1 = require("./emailpassword-shared4.js");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
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

var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);
var React__namespace = /*#__PURE__*/ _interopNamespace(React);
var STGeneralError__default = /*#__PURE__*/ _interopDefault(STGeneralError);
var STGeneralError__default$1 = /*#__PURE__*/ _interopDefault(STGeneralError$1);

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
 * Imports.
 */
/*
 * Component.
 */
function HeavyArrowLeftIcon(_a) {
    var color = _a.color;
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "13",
                viewBox: "0 0 16 13",
                "data-supertokens": "heavyArrowLeftIcon",
            },
            {
                children: jsxRuntime.jsx("path", {
                    fill: color,
                    d: "M13 6.8h.022H3.8l2.9 2.9a.761.761 0 0 1 0 1.07l-.451.451a.754.754 0 0 1-1.064 0L.22 6.254a.759.759 0 0 1 0-1.068L5.186.22a.755.755 0 0 1 1.064 0l.45.451a.746.746 0 0 1 .22.532.724.724 0 0 1-.22.522l-2.93 2.92h9.24a.781.781 0 0 1 .764.773v.638A.766.766 0 0 1 13 6.8z",
                    transform: "translate(1.182 .708)",
                }),
            }
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
        genericComponentOverrideContext.__assign(
            { onClick: onClick, "data-supertokens": "backButton backButtonCommon" },
            { children: jsxRuntime.jsx(HeavyArrowLeftIcon, { color: "rgb(var(--palette-textTitle))" }) }
        )
    );
}

/*
 * Component.
 */
function BackToSignInButton(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: onClick },
            {
                children: [
                    jsxRuntime.jsx(arrowLeftIcon.ArrowLeftIcon, { color: "rgb(var(--palette-secondaryText))" }),
                    t("EMAIL_PASSWORD_RESET_SIGN_IN_LINK"),
                ],
            }
        )
    );
}

var EmailPasswordResetPasswordEmail = function (props) {
    var t = translationContext.useTranslation();
    var userContext = uiEntry.useUserContext();
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
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsxs(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "primaryText enterEmailSuccessMessage" },
                                            {
                                                children: [
                                                    emailSuccessText,
                                                    jsxRuntime.jsx(
                                                        "span",
                                                        genericComponentOverrideContext.__assign(
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
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                jsxRuntime.jsxs(
                                    "div",
                                    genericComponentOverrideContext.__assign(
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
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "headerSubtitle" },
                                        {
                                            children: jsxRuntime.jsx(
                                                "div",
                                                genericComponentOverrideContext.__assign(
                                                    { "data-supertokens": "secondaryText" },
                                                    { children: t("EMAIL_PASSWORD_RESET_HEADER_SUBTITLE") }
                                                )
                                            ),
                                        }
                                    )
                                ),
                                props.error !== undefined &&
                                    jsxRuntime.jsx(generalError.GeneralError, { error: props.error }),
                                jsxRuntime.jsx(formBase.FormBase, {
                                    clearError: props.clearError,
                                    onError: props.onError,
                                    formFields: formFields,
                                    buttonLabel: "EMAIL_PASSWORD_RESET_SEND_BTN",
                                    onSuccess: onSuccess,
                                    callAPI: function (formFields) {
                                        return genericComponentOverrideContext.__awaiter(
                                            void 0,
                                            void 0,
                                            void 0,
                                            function () {
                                                var validationErrors, emailField, resp;
                                                return genericComponentOverrideContext.__generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            return [
                                                                4 /*yield*/,
                                                                genericComponentOverrideContext.validateForm(
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
                                                            resp = _a.sent();
                                                            if (resp.status === "PASSWORD_RESET_NOT_ALLOWED") {
                                                                return [
                                                                    2 /*return*/,
                                                                    {
                                                                        status: "FIELD_ERROR",
                                                                        formFields: [
                                                                            { id: "email", error: resp.reason },
                                                                        ],
                                                                    },
                                                                ];
                                                            }
                                                            return [2 /*return*/, resp];
                                                    }
                                                });
                                            }
                                        );
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
var ResetPasswordEmail = uiEntry.withOverride("EmailPasswordResetPasswordEmail", EmailPasswordResetPasswordEmail);

var EmailPasswordSubmitNewPassword = function (props) {
    var t = translationContext.useTranslation();
    var userContext = uiEntry.useUserContext();
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
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
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
                                                        genericComponentOverrideContext.__assign(
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
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "headerTitle" },
                                        { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "headerSubtitle" },
                                        {
                                            children: jsxRuntime.jsx(
                                                "div",
                                                genericComponentOverrideContext.__assign(
                                                    { "data-supertokens": "secondaryText" },
                                                    { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE") }
                                                )
                                            ),
                                        }
                                    )
                                ),
                                props.error !== undefined &&
                                    jsxRuntime.jsx(generalError.GeneralError, { error: props.error }),
                                jsxRuntime.jsx(formBase.FormBase, {
                                    formFields: formFields,
                                    clearError: props.clearError,
                                    onError: props.onError,
                                    buttonLabel: "EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN",
                                    onSuccess: onSuccess,
                                    validateOnBlur: true,
                                    callAPI: function (fields) {
                                        return genericComponentOverrideContext.__awaiter(
                                            void 0,
                                            void 0,
                                            void 0,
                                            function () {
                                                var validationErrors, response;
                                                return genericComponentOverrideContext.__generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            return [
                                                                4 /*yield*/,
                                                                genericComponentOverrideContext.validateForm(
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
                                                            if (
                                                                response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR"
                                                            ) {
                                                                throw new STGeneralError__default.default(
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
                                            }
                                        );
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
var SubmitNewPassword = uiEntry.withOverride("EmailPasswordSubmitNewPassword", EmailPasswordSubmitNewPassword);

/*
 * Component.
 */
function ResetPasswordUsingTokenTheme(props) {
    /*
     * Render.
     */
    // If no token, return SubmitNewPassword.
    if (props.submitNewPasswordForm !== undefined) {
        return jsxRuntime.jsx(
            SubmitNewPassword,
            genericComponentOverrideContext.__assign({}, props.submitNewPasswordForm)
        );
    }
    // Otherwise, return EnterEmail.
    return jsxRuntime.jsx(ResetPasswordEmail, genericComponentOverrideContext.__assign({}, props.enterEmailForm));
}
function ResetPasswordUsingTokenThemeWrapper(props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
    var userStyles = props.submitNewPasswordForm
        ? props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.style
        : props.config.resetPasswordUsingTokenFeature.enterEmailForm.style;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations$1.ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, userStyles] },
                        {
                            children: jsxRuntime.jsx(
                                ResetPasswordUsingTokenTheme,
                                genericComponentOverrideContext.__assign({}, props)
                            ),
                        }
                    )
                ),
            }
        )
    );
}

var defaultTranslationsEmailPassword = {
    en: genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign(
            genericComponentOverrideContext.__assign({}, translations.defaultTranslationsCommon.en),
            translations$1.defaultTranslationsEmailVerification.en
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
            "Reset password link was not created because of account take over risk. Please contact support. (ERR_CODE_001)":
                undefined,
            "Cannot sign up due to security reasons. Please try logging in, use a different login method or contact support. (ERR_CODE_007)":
                undefined,
            "Cannot sign in due to security reasons. Please try resetting your password, use a different login method or contact support. (ERR_CODE_008)":
                undefined,
        }
    ),
};

var ResetPasswordUsingToken$1 = function (props) {
    var token = genericComponentOverrideContext.getQueryParams("token");
    var _a = React__namespace.useState(),
        error = _a[0],
        setError = _a[1];
    var enterEmailFormFeature = props.recipe.config.resetPasswordUsingTokenFeature.enterEmailForm;
    var submitNewPasswordFormFeature = props.recipe.config.resetPasswordUsingTokenFeature.submitNewPasswordForm;
    var submitNewPasswordForm =
        token === undefined || token === null
            ? undefined
            : {
                  error: error,
                  onError: function (error) {
                      return setError(error);
                  },
                  clearError: function () {
                      return setError(undefined);
                  },
                  styleFromInit: submitNewPasswordFormFeature.style,
                  formFields: submitNewPasswordFormFeature.formFields,
                  recipeImplementation: props.recipe.webJSRecipe,
                  config: props.recipe.config,
                  onSignInClicked: function () {
                      void genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                          show: "signin",
                          history: props.history,
                          redirectBack: false,
                      });
                  },
                  token: token,
              };
    var enterEmailForm = {
        onBackButtonClicked: function () {
            return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                show: "signin",
                history: props.history,
                redirectBack: false,
            });
        },
        error: error,
        onError: function (error) {
            return setError(error);
        },
        clearError: function () {
            return setError(undefined);
        },
        styleFromInit: enterEmailFormFeature.style,
        formFields: enterEmailFormFeature.formFields,
        recipeImplementation: props.recipe.webJSRecipe,
        config: props.recipe.config,
    };
    var childProps = {
        config: props.recipe.config,
        submitNewPasswordForm: submitNewPasswordForm,
        enterEmailForm: enterEmailForm,
    };
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        uiEntry.ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: defaultTranslationsEmailPassword,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            ResetPasswordUsingTokenThemeWrapper,
                                            genericComponentOverrideContext.__assign({}, childProps)
                                        ),
                                    props.children &&
                                        React__namespace.Children.map(props.children, function (child) {
                                            if (React__namespace.isValidElement(child)) {
                                                return React__namespace.cloneElement(child, childProps);
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

var SignInFooter = uiEntry.withOverride("EmailPasswordSignInFooter", function EmailPasswordSignInFooter(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "link secondaryText forgotPasswordLink", onClick: onClick },
            { children: t("EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK") }
        )
    );
});

var SignInForm = uiEntry.withOverride("EmailPasswordSignInForm", function EmailPasswordSignInForm(props) {
    var _this = this;
    var userContext = uiEntry.useUserContext();
    return jsxRuntime.jsx(formBase.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var validationErrors, response;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                genericComponentOverrideContext.validateForm(
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
                                throw new STGeneralError__default.default(
                                    "EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR"
                                );
                            } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
                                throw new STGeneralError__default.default(response.reason);
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

var SignInHeader = uiEntry.withOverride("EmailPasswordSignInHeader", function EmailPasswordSignInHeader(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerSubtitle" },
                    {
                        children: jsxRuntime.jsxs(
                            "div",
                            genericComponentOverrideContext.__assign(
                                { "data-supertokens": "secondaryText" },
                                {
                                    children: [
                                        t("EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START"),
                                        jsxRuntime.jsx(
                                            "span",
                                            genericComponentOverrideContext.__assign(
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

var SignIn = uiEntry.withOverride("EmailPasswordSignIn", function EmailPasswordSignIn(props) {
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignInHeader, { onClick: props.signUpClicked }),
                                    props.error !== undefined &&
                                        jsxRuntime.jsx(generalError.GeneralError, { error: props.error }),
                                    jsxRuntime.jsx(
                                        SignInForm,
                                        genericComponentOverrideContext.__assign({}, props, {
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

var SignUpFooter = uiEntry.withOverride("EmailPasswordSignUpFooter", function EmailPasswordSignUpFooter(_a) {
    var termsOfServiceLink = _a.termsOfServiceLink,
        privacyPolicyLink = _a.privacyPolicyLink;
    var t = translationContext.useTranslation();
    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions" },
            {
                children: [
                    t("EMAIL_PASSWORD_SIGN_UP_FOOTER_START"),
                    termsOfServiceLink !== undefined &&
                        jsxRuntime.jsx(
                            "a",
                            genericComponentOverrideContext.__assign(
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
                            genericComponentOverrideContext.__assign(
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

/*
 * Component.
 */
var SignUpForm = uiEntry.withOverride("EmailPasswordSignUpForm", function EmailPasswordSignUpForm(props) {
    var _this = this;
    var userContext = uiEntry.useUserContext();
    return jsxRuntime.jsx(formBase.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var validationErrors, res;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                genericComponentOverrideContext.validateForm(
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
                                4 /*yield*/,
                                props.recipeImplementation.signUp({
                                    formFields: formFields,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            res = _a.sent();
                            if (res.status === "SIGN_UP_NOT_ALLOWED") {
                                throw new STGeneralError__default$1.default(res.reason);
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        validateOnBlur: true,
        showLabels: true,
        footer: props.footer,
    });
});

var SignUpHeader = uiEntry.withOverride("EmailPasswordSignUpHeader", function EmailPasswordSignUpHeader(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx(
                "div",
                genericComponentOverrideContext.__assign(
                    { "data-supertokens": "headerSubtitle" },
                    {
                        children: jsxRuntime.jsxs(
                            "div",
                            genericComponentOverrideContext.__assign(
                                { "data-supertokens": "secondaryText" },
                                {
                                    children: [
                                        t("EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START"),
                                        jsxRuntime.jsx(
                                            "span",
                                            genericComponentOverrideContext.__assign(
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

var SignUp = uiEntry.withOverride("EmailPasswordSignUp", function EmailPasswordSignUp(props) {
    return jsxRuntime.jsxs(
        "div",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignUpHeader, { onClick: props.signInClicked }),
                                    props.error !== undefined &&
                                        jsxRuntime.jsx(generalError.GeneralError, { error: props.error }),
                                    jsxRuntime.jsx(
                                        SignUpForm,
                                        genericComponentOverrideContext.__assign({}, props, {
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

var SignInAndUpTheme = function (props) {
    // If isSignUp, return signUp.
    if (props.featureState.isSignUp) {
        return jsxRuntime.jsx(
            SignUp,
            genericComponentOverrideContext.__assign({}, props.signUpForm, {
                signInClicked: function () {
                    props.dispatch({ type: "setSignIn" });
                },
            })
        );
    }
    // Otherwise, return SignIn.
    return jsxRuntime.jsx(
        SignIn,
        genericComponentOverrideContext.__assign({}, props.signInForm, {
            signUpClicked: function () {
                props.dispatch({ type: "setSignUp" });
            },
        })
    );
};
function SignInAndUpThemeWrapper(props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
    var activeStyle = props.featureState.isSignUp
        ? props.config.signInAndUpFeature.signUpForm.style
        : props.config.signInAndUpFeature.signInForm.style;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations$1.ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
                        {
                            children: jsxRuntime.jsx(
                                SignInAndUpTheme,
                                genericComponentOverrideContext.__assign({}, props)
                            ),
                        }
                    )
                ),
            }
        )
    );
}

var useFeatureReducer = function (recipe) {
    return React__namespace.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "setSignIn":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { error: undefined, isSignUp: false }
                    );
                case "setSignUp":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { error: undefined, isSignUp: true }
                    );
                case "setError":
                    return genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, oldState),
                        { error: action.error }
                    );
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
            var show = genericComponentOverrideContext.getQueryParams("show");
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
function useChildProps(recipe$1, state, dispatch, history) {
    var _this = this;
    var recipeImplementation = React.useMemo(
        function () {
            return recipe$1 && getModifiedRecipeImplementation(recipe$1.webJSRecipe);
        },
        [recipe$1]
    );
    var userContext = uiEntry.useUserContext();
    var onSignInSuccess = React.useCallback(
        function (response) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: recipe$1.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewRecipeUser: false,
                                    user: response.user,
                                    redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL(),
                                },
                            },
                            userContext,
                            history
                        ),
                    ];
                });
            });
        },
        [recipe$1, userContext, history]
    );
    var onSignUpSuccess = React.useCallback(
        function (response) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: recipe$1.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewRecipeUser: true,
                                    user: response.user,
                                    redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL(),
                                },
                            },
                            userContext,
                            history
                        ),
                    ];
                });
            });
        },
        [recipe$1, userContext, history]
    );
    return React.useMemo(
        function () {
            if (recipe$1 === undefined || recipeImplementation === undefined) {
                return;
            }
            var signInAndUpFeature = recipe$1.config.signInAndUpFeature;
            var signUpFeature = signInAndUpFeature.signUpForm;
            var signInFeature = signInAndUpFeature.signInForm;
            var signInForm = {
                recipeImplementation: recipeImplementation,
                config: recipe$1.config,
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
                    return recipe$1.redirect({ action: "RESET_PASSWORD" }, history);
                },
            };
            var signUpForm = {
                recipeImplementation: recipeImplementation,
                config: recipe$1.config,
                styleFromInit: signUpFeature.style,
                formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe$1, userContext),
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
                config: recipe$1.config,
                signInForm: signInForm,
                signUpForm: signUpForm,
            };
        },
        [recipe$1, state, dispatch]
    );
}
var SignInAndUpFeature = function (props) {
    var _a = useFeatureReducer(props.recipe),
        state = _a[0],
        dispatch = _a[1];
    var childProps = useChildProps(props.recipe, state, dispatch, props.history);
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        uiEntry.ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
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
                                            genericComponentOverrideContext.__assign({}, childProps, {
                                                featureState: state,
                                                dispatch: dispatch,
                                            })
                                        ),
                                    props.children &&
                                        React__namespace.Children.map(props.children, function (child) {
                                            if (React__namespace.isValidElement(child)) {
                                                return React__namespace.cloneElement(
                                                    child,
                                                    genericComponentOverrideContext.__assign(
                                                        genericComponentOverrideContext.__assign({}, childProps),
                                                        { featureState: state, dispatch: dispatch }
                                                    )
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
    return genericComponentOverrideContext.__assign({}, origImpl);
};
function getThemeSignUpFeatureFormFields(formFields, recipe, userContext) {
    var _this = this;
    var emailPasswordOnly = formFields.length === 2;
    return formFields.map(function (field) {
        return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, field), {
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
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var error, emailExists, err_1;
                        return genericComponentOverrideContext.__generator(this, function (_a) {
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
                                        recipe.webJSRecipe.doesEmailExist({
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
                                    if (STGeneralError__default.default.isThisError(err_1)) {
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

var EmailPasswordPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(EmailPasswordPreBuiltUI, _super);
    function EmailPasswordPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.signInAndUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("signinup", props, useComponentOverrides);
                    },
                    recipeID: recipe$1.EmailPassword.RECIPE_ID,
                };
            }
            if (_this.recipeInstance.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(validators.DEFAULT_RESET_PASSWORD_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("resetpassword", props, useComponentOverrides);
                    },
                    recipeID: recipe$1.EmailPassword.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            if (componentName === "signinup") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        uiEntry.UserContextWrapper,
                        genericComponentOverrideContext.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    SuperTokensBranding.AuthWidgetWrapper,
                                    genericComponentOverrideContext.__assign(
                                        { authRecipe: _this.recipeInstance, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUpFeature,
                                                genericComponentOverrideContext.__assign(
                                                    { recipe: _this.recipeInstance },
                                                    props,
                                                    { useComponentOverrides: useComponentOverrides }
                                                )
                                            ),
                                        }
                                    )
                                ),
                            }
                        )
                    );
                } else {
                    return jsxRuntime.jsx(
                        uiEntry.UserContextWrapper,
                        genericComponentOverrideContext.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    SignInAndUpFeature,
                                    genericComponentOverrideContext.__assign({ recipe: _this.recipeInstance }, props, {
                                        useComponentOverrides: useComponentOverrides,
                                    })
                                ),
                            }
                        )
                    );
                }
            } else if (componentName === "resetpassword") {
                return jsxRuntime.jsx(
                    uiEntry.UserContextWrapper,
                    genericComponentOverrideContext.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                ResetPasswordUsingToken$1,
                                genericComponentOverrideContext.__assign({ recipe: _this.recipeInstance }, props, {
                                    useComponentOverrides: useComponentOverrides,
                                })
                            ),
                        }
                    )
                );
            } else {
                throw new Error("Should never come here.");
            }
        };
        return _this;
    }
    // Static methods
    EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (EmailPasswordPreBuiltUI.instance === undefined) {
            var recipeInstance = recipe$1.EmailPassword.getInstanceOrThrow();
            EmailPasswordPreBuiltUI.instance = new EmailPasswordPreBuiltUI(recipeInstance);
        }
        return EmailPasswordPreBuiltUI.instance;
    };
    EmailPasswordPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = componentOverrideContext.useContext;
        }
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    EmailPasswordPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = componentOverrideContext.useContext;
        }
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    // For tests
    EmailPasswordPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        EmailPasswordPreBuiltUI.instance = undefined;
        return;
    };
    EmailPasswordPreBuiltUI.SignInAndUp = function (prop) {
        if (prop === void 0) {
            prop = {};
        }
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("signinup", prop);
    };
    EmailPasswordPreBuiltUI.ResetPasswordUsingToken = function (prop) {
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("resetpassword", prop);
    };
    EmailPasswordPreBuiltUI.ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenThemeWrapper;
    EmailPasswordPreBuiltUI.SignInAndUpTheme = SignInAndUpThemeWrapper;
    return EmailPasswordPreBuiltUI;
})(uiEntry.RecipeRouter);
var SignInAndUp = EmailPasswordPreBuiltUI.SignInAndUp;
var ResetPasswordUsingToken = EmailPasswordPreBuiltUI.ResetPasswordUsingToken;

exports.EmailPasswordPreBuiltUI = EmailPasswordPreBuiltUI;
exports.ResetPasswordUsingToken = ResetPasswordUsingToken;
exports.ResetPasswordUsingTokenThemeWrapper = ResetPasswordUsingTokenThemeWrapper;
exports.SignInAndUp = SignInAndUp;
exports.SignInAndUpThemeWrapper = SignInAndUpThemeWrapper;
exports.SignInFooter = SignInFooter;
exports.SignInForm = SignInForm;
exports.SignInHeader = SignInHeader;
exports.SignUpFooter = SignUpFooter;
exports.SignUpForm = SignUpForm;
exports.SignUpHeader = SignUpHeader;
exports.defaultTranslationsEmailPassword = defaultTranslationsEmailPassword;
exports.useChildProps = useChildProps;
exports.useFeatureReducer = useFeatureReducer;
