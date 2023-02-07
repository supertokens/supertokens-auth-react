"use strict";

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var translations = require("./translations.js");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var utils = require("./authRecipe-shared.js");
var React = require("react");
var translations$1 = require("./emailverification-shared.js");
var translationContext = require("./translationContext.js");
require("./index.js");
var validators = require("./emailpassword-shared3.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var button = require("./emailpassword-shared.js");
var recipeImplementation = require("supertokens-web-js/recipe/emailpassword/recipeImplementation");

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

var _a = translations.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider = _a[1];

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
        sessionAuth.__assign(
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
        sessionAuth.__assign(
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
        sessionAuth.__assign(
            { "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: onClick },
            {
                children: [
                    jsxRuntime.jsx(validators.ArrowLeftIcon, { color: "rgb(var(--palette-secondaryText))" }),
                    t("EMAIL_PASSWORD_RESET_SIGN_IN_LINK"),
                ],
            }
        )
    );
}

var EmailPasswordResetPasswordEmail = function (props) {
    var t = translationContext.useTranslation();
    var userContext = sessionAuth.useUserContext();
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
            sessionAuth.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsxs(
                                        "div",
                                        sessionAuth.__assign(
                                            { "data-supertokens": "primaryText enterEmailSuccessMessage" },
                                            {
                                                children: [
                                                    emailSuccessText,
                                                    jsxRuntime.jsx(
                                                        "span",
                                                        sessionAuth.__assign(
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
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    sessionAuth.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                jsxRuntime.jsxs(
                                    "div",
                                    sessionAuth.__assign(
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
                                    sessionAuth.__assign(
                                        { "data-supertokens": "headerSubtitle" },
                                        {
                                            children: jsxRuntime.jsx(
                                                "div",
                                                sessionAuth.__assign(
                                                    { "data-supertokens": "secondaryText" },
                                                    { children: t("EMAIL_PASSWORD_RESET_HEADER_SUBTITLE") }
                                                )
                                            ),
                                        }
                                    )
                                ),
                                props.error !== undefined &&
                                    jsxRuntime.jsx(translations.GeneralError, { error: props.error }),
                                jsxRuntime.jsx(validators.FormBase, {
                                    clearError: props.clearError,
                                    onError: props.onError,
                                    formFields: formFields,
                                    buttonLabel: "EMAIL_PASSWORD_RESET_SEND_BTN",
                                    onSuccess: onSuccess,
                                    callAPI: function (formFields) {
                                        return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                                            var validationErrors, emailField;
                                            return sessionAuth.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        return [
                                                            4 /*yield*/,
                                                            sessionAuth.validateForm(
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
var ResetPasswordEmail = translations.withOverride("EmailPasswordResetPasswordEmail", EmailPasswordResetPasswordEmail);

var EmailPasswordSubmitNewPassword = function (props) {
    var t = translationContext.useTranslation();
    var userContext = sessionAuth.useUserContext();
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
            sessionAuth.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        sessionAuth.__assign(
                                            { "data-supertokens": "headerTitle" },
                                            { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        validators.FormRow,
                                        {
                                            children: jsxRuntime.jsxs(React.Fragment, {
                                                children: [
                                                    jsxRuntime.jsx(
                                                        "div",
                                                        sessionAuth.__assign(
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
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    sessionAuth.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                jsxRuntime.jsx(
                                    "div",
                                    sessionAuth.__assign(
                                        { "data-supertokens": "headerTitle" },
                                        { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    sessionAuth.__assign(
                                        { "data-supertokens": "headerSubtitle" },
                                        {
                                            children: jsxRuntime.jsx(
                                                "div",
                                                sessionAuth.__assign(
                                                    { "data-supertokens": "secondaryText" },
                                                    { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE") }
                                                )
                                            ),
                                        }
                                    )
                                ),
                                props.error !== undefined &&
                                    jsxRuntime.jsx(translations.GeneralError, { error: props.error }),
                                jsxRuntime.jsx(validators.FormBase, {
                                    formFields: formFields,
                                    clearError: props.clearError,
                                    onError: props.onError,
                                    buttonLabel: "EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN",
                                    onSuccess: onSuccess,
                                    validateOnBlur: true,
                                    callAPI: function (fields) {
                                        return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                                            var validationErrors, response;
                                            return sessionAuth.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        return [
                                                            4 /*yield*/,
                                                            sessionAuth.validateForm(
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
var SubmitNewPassword = translations.withOverride("EmailPasswordSubmitNewPassword", EmailPasswordSubmitNewPassword);

/*
 * Component.
 */
function ResetPasswordUsingTokenTheme(props) {
    /*
     * Render.
     */
    // If no token, return SubmitNewPassword.
    if (props.submitNewPasswordForm !== undefined) {
        return jsxRuntime.jsx(SubmitNewPassword, sessionAuth.__assign({}, props.submitNewPasswordForm));
    }
    // Otherwise, return EnterEmail.
    return jsxRuntime.jsx(ResetPasswordEmail, sessionAuth.__assign({}, props.enterEmailForm));
}
function ResetPasswordUsingTokenThemeWrapper(props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
    var userStyles = props.submitNewPasswordForm
        ? props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.style
        : props.config.resetPasswordUsingTokenFeature.enterEmailForm.style;
    return jsxRuntime.jsx(
        sessionAuth.UserContextWrapper,
        sessionAuth.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations$1.ThemeBase,
                    sessionAuth.__assign(
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, userStyles] },
                        { children: jsxRuntime.jsx(ResetPasswordUsingTokenTheme, sessionAuth.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

var SignInFooter = translations.withOverride("EmailPasswordSignInFooter", function EmailPasswordSignInFooter(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "link secondaryText forgotPasswordLink", onClick: onClick },
            { children: t("EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK") }
        )
    );
});

var SignInForm = translations.withOverride("EmailPasswordSignInForm", function EmailPasswordSignInForm(props) {
    var _this = this;
    var userContext = sessionAuth.useUserContext();
    return jsxRuntime.jsx(validators.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                var validationErrors, response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                sessionAuth.validateForm(
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

var SignInHeader = translations.withOverride("EmailPasswordSignInHeader", function EmailPasswordSignInHeader(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                sessionAuth.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx(
                "div",
                sessionAuth.__assign(
                    { "data-supertokens": "headerSubtitle" },
                    {
                        children: jsxRuntime.jsxs(
                            "div",
                            sessionAuth.__assign(
                                { "data-supertokens": "secondaryText" },
                                {
                                    children: [
                                        t("EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START"),
                                        jsxRuntime.jsx(
                                            "span",
                                            sessionAuth.__assign(
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

var SignIn = translations.withOverride("EmailPasswordSignIn", function EmailPasswordSignIn(props) {
    return jsxRuntime.jsxs(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignInHeader, { onClick: props.signUpClicked }),
                                    props.error !== undefined &&
                                        jsxRuntime.jsx(translations.GeneralError, { error: props.error }),
                                    jsxRuntime.jsx(
                                        SignInForm,
                                        sessionAuth.__assign({}, props, {
                                            footer: jsxRuntime.jsx(SignInFooter, {
                                                onClick: props.forgotPasswordClick,
                                            }),
                                        })
                                    ),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx(utils.SuperTokensBranding, {}),
                ],
            }
        )
    );
});

var SignUpFooter = translations.withOverride("EmailPasswordSignUpFooter", function EmailPasswordSignUpFooter(_a) {
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
                    t("EMAIL_PASSWORD_SIGN_UP_FOOTER_START"),
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
                                { children: t("EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS") }
                            )
                        ),
                    termsOfServiceLink !== undefined &&
                        privacyPolicyLink !== undefined &&
                        t("EMAIL_PASSWORD_SIGN_UP_FOOTER_AND"),
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
var SignUpForm = translations.withOverride("EmailPasswordSignUpForm", function EmailPasswordSignUpForm(props) {
    var _this = this;
    var userContext = sessionAuth.useUserContext();
    return jsxRuntime.jsx(validators.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                var validationErrors;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                sessionAuth.validateForm(
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

var SignUpHeader = translations.withOverride("EmailPasswordSignUpHeader", function EmailPasswordSignUpHeader(_a) {
    var onClick = _a.onClick;
    var t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                sessionAuth.__assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx(
                "div",
                sessionAuth.__assign(
                    { "data-supertokens": "headerSubtitle" },
                    {
                        children: jsxRuntime.jsxs(
                            "div",
                            sessionAuth.__assign(
                                { "data-supertokens": "secondaryText" },
                                {
                                    children: [
                                        t("EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START"),
                                        jsxRuntime.jsx(
                                            "span",
                                            sessionAuth.__assign(
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

var SignUp = translations.withOverride("EmailPasswordSignUp", function EmailPasswordSignUp(props) {
    return jsxRuntime.jsxs(
        "div",
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignUpHeader, { onClick: props.signInClicked }),
                                    props.error !== undefined &&
                                        jsxRuntime.jsx(translations.GeneralError, { error: props.error }),
                                    jsxRuntime.jsx(
                                        SignUpForm,
                                        sessionAuth.__assign({}, props, {
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
                    jsxRuntime.jsx(utils.SuperTokensBranding, {}),
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
            sessionAuth.__assign({}, props.signUpForm, {
                signInClicked: function () {
                    props.dispatch({ type: "setSignIn" });
                },
            })
        );
    }
    // Otherwise, return SignIn.
    return jsxRuntime.jsx(
        SignIn,
        sessionAuth.__assign({}, props.signInForm, {
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
        sessionAuth.UserContextWrapper,
        sessionAuth.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations$1.ThemeBase,
                    sessionAuth.__assign(
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
                        { children: jsxRuntime.jsx(SignInAndUpTheme, sessionAuth.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

var defaultTranslationsEmailPassword = {
    en: sessionAuth.__assign(
        sessionAuth.__assign(
            sessionAuth.__assign({}, translations.defaultTranslationsCommon.en),
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
        }
    ),
};

var ResetPasswordUsingToken = function (props) {
    var token = sessionAuth.getQueryParams("token");
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
                  recipeImplementation: props.recipe.recipeImpl,
                  config: props.recipe.config,
                  onSignInClicked: function () {
                      void sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                          show: "signin",
                          history: props.history,
                          redirectBack: false,
                      });
                  },
                  token: token,
              };
    var enterEmailForm = {
        onBackButtonClicked: function () {
            return sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
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
        recipeImplementation: props.recipe.recipeImpl,
        config: props.recipe.config,
    };
    var childProps = {
        config: props.recipe.config,
        submitNewPasswordForm: submitNewPasswordForm,
        enterEmailForm: enterEmailForm,
    };
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        translations.ComponentOverrideContext.Provider,
        sessionAuth.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    translations.FeatureWrapper,
                    sessionAuth.__assign(
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
                                            sessionAuth.__assign({}, childProps)
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

var useFeatureReducer = function (recipe) {
    return React__namespace.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "setSignIn":
                    return sessionAuth.__assign(sessionAuth.__assign({}, oldState), {
                        error: undefined,
                        isSignUp: false,
                    });
                case "setSignUp":
                    return sessionAuth.__assign(sessionAuth.__assign({}, oldState), {
                        error: undefined,
                        isSignUp: true,
                    });
                case "setError":
                    return sessionAuth.__assign(sessionAuth.__assign({}, oldState), { error: action.error });
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
            var show = sessionAuth.getQueryParams("show");
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
    var userContext = sessionAuth.useUserContext();
    var onSignInSuccess = React.useCallback(
        function () {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        sessionAuth.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: recipe.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: false,
                                    redirectToPath: sessionAuth.getRedirectToPathFromURL(),
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
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        sessionAuth.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: recipe.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: true,
                                    redirectToPath: sessionAuth.getRedirectToPathFromURL(),
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
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        translations.ComponentOverrideContext.Provider,
        sessionAuth.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    translations.FeatureWrapper,
                    sessionAuth.__assign(
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
var getModifiedRecipeImplementation = function (origImpl) {
    return sessionAuth.__assign({}, origImpl);
};
function getThemeSignUpFeatureFormFields(formFields, recipe, userContext) {
    var _this = this;
    var emailPasswordOnly = formFields.length === 2;
    return formFields.map(function (field) {
        return sessionAuth.__assign(sessionAuth.__assign({}, field), {
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
                    return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                        var error, emailExists, err_1;
                        return sessionAuth.__generator(this, function (_a) {
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

function getRecipeImplementation(recipeInput) {
    var webJsImplementation = recipeImplementation.getRecipeImplementation({
        recipeId: recipeInput.recipeId,
        appInfo: recipeInput.appInfo,
        preAPIHook: recipeInput.preAPIHook,
        postAPIHook: recipeInput.postAPIHook,
    });
    return {
        submitNewPassword: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.submitNewPassword.bind(this)(
                                    sessionAuth.__assign(sessionAuth.__assign({}, input), {
                                        formFields: [input.formFields[0]],
                                    })
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
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.sendPasswordResetEmail.bind(this)(sessionAuth.__assign({}, input)),
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
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.signUp.bind(this)(sessionAuth.__assign({}, input)),
                            ];
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
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.signIn.bind(this)(sessionAuth.__assign({}, input)),
                            ];
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
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.doesEmailExist.bind(this)(sessionAuth.__assign({}, input)),
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
    var override = sessionAuth.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return sessionAuth.__assign(sessionAuth.__assign({}, utils.normaliseAuthRecipe(config)), {
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
            return sessionAuth.__spreadArray(
                sessionAuth.__spreadArray([], signInFieldsAccumulator, true),
                [field],
                false
            );
        }
        if (field.id === "password") {
            return sessionAuth.__spreadArray(
                sessionAuth.__spreadArray([], signInFieldsAccumulator, true),
                [
                    sessionAuth.__assign(sessionAuth.__assign({}, field), {
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
                return sessionAuth.__assign(sessionAuth.__assign({}, field), { optional: false });
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
            sessionAuth.__assign(sessionAuth.__assign({}, getDefaultEmailFormField()), {
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
                mergedFormFields[j] = sessionAuth.__assign(
                    sessionAuth.__assign(sessionAuth.__assign({}, mergedFormFields[j]), userField),
                    { optional: optional }
                );
                isNewField = false;
                break;
            }
        }
        // If new field, push to mergeFormFields.
        if (isNewField) {
            mergedFormFields.push(
                sessionAuth.__assign(
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
    return sessionAuth.__assign(sessionAuth.__assign({}, field), {
        validate: function (value) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
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

/*
 * Class.
 */
var EmailPassword = /** @class */ (function (_super) {
    sessionAuth.__extends(EmailPassword, _super);
    function EmailPassword(config) {
        var _this = _super.call(this, normaliseEmailPasswordConfig(config)) || this;
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            var features = {};
            if (_this.config.signInAndUpFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("signinup", props, useComponentOverrides);
                    },
                };
            }
            if (_this.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(validators.DEFAULT_RESET_PASSWORD_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("resetpassword", props, useComponentOverrides);
                    },
                };
            }
            return features;
        };
        _this.getDefaultRedirectionURL = function (context) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                var resetPasswordPath;
                return sessionAuth.__generator(this, function (_a) {
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
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            if (componentName === "signinup") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        sessionAuth.UserContextWrapper,
                        sessionAuth.__assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    utils.AuthWidgetWrapper,
                                    sessionAuth.__assign(
                                        { authRecipe: _this, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUpFeature,
                                                sessionAuth.__assign({ recipe: _this }, props, {
                                                    useComponentOverrides: useComponentOverrides,
                                                })
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
                                    SignInAndUpFeature,
                                    sessionAuth.__assign({ recipe: _this }, props, {
                                        useComponentOverrides: useComponentOverrides,
                                    })
                                ),
                            }
                        )
                    );
                }
            } else if (componentName === "resetpassword") {
                return jsxRuntime.jsx(
                    sessionAuth.UserContextWrapper,
                    sessionAuth.__assign(
                        { userContext: props.userContext },
                        {
                            children: jsxRuntime.jsx(
                                ResetPasswordUsingToken,
                                sessionAuth.__assign({ recipe: _this }, props, {
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
        var builder = new translations.OverrideableBuilder_1(
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
                sessionAuth.__assign(sessionAuth.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: EmailPassword.RECIPE_ID,
                })
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
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailPassword.instance;
    };
    /*
     * Tests methods.
     */
    EmailPassword.reset = function () {
        if (!sessionAuth.isTest()) {
            return;
        }
        EmailPassword.instance = undefined;
        return;
    };
    EmailPassword.RECIPE_ID = "emailpassword";
    return EmailPassword;
})(utils.AuthRecipe);

exports.EmailPassword = EmailPassword;
exports.Provider = Provider;
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
