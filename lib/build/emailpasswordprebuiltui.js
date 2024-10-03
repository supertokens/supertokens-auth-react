"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
require("./multifactorauth.js");
var componentOverrideContext = require("./emailpassword-shared2.js");
var React = require("react");
var translations = require("./emailverification-shared2.js");
var translationContext = require("./translationContext.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
var formBase = require("./emailpassword-shared5.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var button = require("./emailpassword-shared.js");
var authCompWrapper = require("./authCompWrapper.js");
var emailverification = require("./emailverification.js");
var recipe$1 = require("./emailverification-shared.js");
var session = require("./session.js");
var types = require("./multifactorauth-shared.js");
var recipe = require("./emailpassword-shared3.js");
var STGeneralError$1 = require("supertokens-web-js/lib/build/error");
var constants = require("./emailpassword-shared4.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/normalisedURLDomain");
require("react-dom");
require("./multitenancy-shared.js");
require("./multifactorauth-shared2.js");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");
require("./oauth2provider-shared.js");
require("supertokens-web-js/recipe/oauth2provider");
require("./authRecipe-shared.js");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("./multifactorauth-shared3.js");
require("supertokens-web-js/recipe/emailverification");
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("supertokens-web-js/recipe/emailpassword");
require("./authRecipe-shared2.js");

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
            { "data-supertokens": "container resetPasswordEmailForm" },
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
                                        { "data-supertokens": "headerTitle withBackButton" },
                                        {
                                            children: [
                                                jsxRuntime.jsx(uiEntry.BackButton, {
                                                    onClick: props.onBackButtonClicked,
                                                }),
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
                                        { "data-supertokens": "headerSubtitle secondaryText" },
                                        { children: t("EMAIL_PASSWORD_RESET_HEADER_SUBTITLE") }
                                    )
                                ),
                                props.error !== undefined &&
                                    jsxRuntime.jsx(uiEntry.GeneralError, { error: props.error }),
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
            { "data-supertokens": "container resetPasswordPasswordForm" },
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
                                        { "data-supertokens": "headerSubtitle secondaryText" },
                                        { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE") }
                                    )
                                ),
                                props.error !== undefined &&
                                    jsxRuntime.jsx(uiEntry.GeneralError, { error: props.error }),
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
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    var userStyles = props.submitNewPasswordForm
        ? props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.style
        : props.config.resetPasswordUsingTokenFeature.enterEmailForm.style;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle, userStyles] },
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
            genericComponentOverrideContext.__assign({}, uiEntry.defaultTranslationsCommon.en),
            translations.defaultTranslationsEmailVerification.en
        ),
        {
            EMAIL_PASSWORD_EMAIL_LABEL: "Email",
            EMAIL_PASSWORD_EMAIL_PLACEHOLDER: "Email address",
            EMAIL_PASSWORD_PASSWORD_LABEL: "Password",
            EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: "Password",
            EMAIL_PASSWORD_SIGN_IN_FORGOT_PW_LINK: "Forgot password?",
            EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: "SIGN IN",
            EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR: "Incorrect email and password combination",
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
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_009)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_010)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_011)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_012)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_013)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_014)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_015)": undefined,
            "Cannot sign in / up due to security reasons. Please contact support. (ERR_CODE_016)": undefined,
        }
    ),
};

var ResetPasswordUsingToken$1 = function (props) {
    var token = genericComponentOverrideContext.getQueryParams("token");
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
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
                          navigate: props.navigate,
                          redirectBack: false,
                          userContext: userContext,
                      });
                  },
                  token: token,
              };
    var enterEmailForm = {
        onBackButtonClicked: function () {
            return genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().redirectToAuth({
                show: "signin",
                navigate: props.navigate,
                redirectBack: false,
                userContext: userContext,
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
                            useShadowDom: genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
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

var SignInForm = uiEntry.withOverride("EmailPasswordSignInForm", function EmailPasswordSignInForm(props) {
    var _this = this;
    var userContext = uiEntry.useUserContext();
    return jsxRuntime.jsx(formBase.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        onFetchError: props.onFetchError,
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
                                    shouldTryLinkingWithSessionUser: false,
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
function SignInTheme(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    var activeStyle = props.config.signInAndUpFeature.signInForm.style;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] },
                        { children: jsxRuntime.jsx(SignInForm, genericComponentOverrideContext.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

function useChildProps$1(recipe$2, onAuthSuccess, error, onError, clearError, userContext, navigate) {
    var _this = this;
    var session$1 = uiEntry.useSessionContext();
    var recipeImplementation = React.useMemo(
        function () {
            return getModifiedRecipeImplementation$1(recipe$2.webJSRecipe);
        },
        [recipe$2]
    );
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    var t = translationContext.useTranslation();
    var onSignInSuccess = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var payloadAfterCall;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            payloadAfterCall = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _b.sent();
                            payloadAfterCall = undefined;
                            return [3 /*break*/, 3];
                        case 3:
                            return [
                                2 /*return*/,
                                onAuthSuccess({
                                    createdNewUser: false,
                                    isNewRecipeUser: false,
                                    newSessionCreated:
                                        session$1.loading ||
                                        !session$1.doesSessionExist ||
                                        (payloadAfterCall !== undefined &&
                                            session$1.accessTokenPayload.sessionHandle !==
                                                payloadAfterCall.sessionHandle),
                                    recipeId: recipe.EmailPassword.RECIPE_ID,
                                }).catch(rethrowInRender),
                            ];
                    }
                });
            });
        },
        [recipe$2, userContext, navigate]
    );
    return React.useMemo(
        function () {
            var onForgotPasswordClick = function () {
                return recipe$2.redirect(
                    {
                        action: "RESET_PASSWORD",
                        tenantIdFromQueryParams: genericComponentOverrideContext.getTenantIdFromQueryParams(),
                    },
                    navigate,
                    undefined,
                    userContext
                );
            };
            var signInAndUpFeature = recipe$2.config.signInAndUpFeature;
            var signInFeature = signInAndUpFeature.signInForm;
            var formFields = signInFeature.formFields.map(function (f) {
                return f.id !== "password"
                    ? f
                    : genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, f), {
                          labelComponent: jsxRuntime.jsxs(
                              "div",
                              genericComponentOverrideContext.__assign(
                                  { "data-supertokens": "formLabelWithLinkWrapper" },
                                  {
                                      children: [
                                          jsxRuntime.jsx(formBase.Label, {
                                              value: f.label,
                                              "data-supertokens": "passwordInputLabel",
                                          }),
                                          jsxRuntime.jsx(
                                              "a",
                                              genericComponentOverrideContext.__assign(
                                                  {
                                                      onClick: onForgotPasswordClick,
                                                      "data-supertokens":
                                                          "link linkButton formLabelLinkBtn forgotPasswordLink",
                                                  },
                                                  { children: t("EMAIL_PASSWORD_SIGN_IN_FORGOT_PW_LINK") }
                                              )
                                          ),
                                      ],
                                  }
                              )
                          ),
                      });
            });
            return {
                recipeImplementation: recipeImplementation,
                config: recipe$2.config,
                styleFromInit: signInFeature.style,
                formFields: formFields,
                error: error,
                clearError: clearError,
                onError: onError,
                onFetchError: function (err) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var invalidClaims, evInstance;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (
                                        !(
                                            err.status ===
                                            types.Session.getInstanceOrThrow().config.invalidClaimStatusCode
                                        )
                                    )
                                        return [3 /*break*/, 5];
                                    return [
                                        4 /*yield*/,
                                        session.getInvalidClaimsFromResponse({
                                            response: err,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    invalidClaims = _b.sent();
                                    if (
                                        !invalidClaims.some(function (i) {
                                            return i.id === emailverification.EmailVerificationClaim.id;
                                        })
                                    )
                                        return [3 /*break*/, 5];
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    evInstance = recipe$1.EmailVerification.getInstanceOrThrow();
                                    return [
                                        4 /*yield*/,
                                        evInstance.redirect(
                                            {
                                                action: "VERIFY_EMAIL",
                                                tenantIdFromQueryParams:
                                                    genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                            },
                                            navigate,
                                            undefined,
                                            userContext
                                        ),
                                    ];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/];
                                case 4:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 5:
                                    onError("SOMETHING_WENT_WRONG_ERROR");
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onSuccess: onSignInSuccess,
                onForgotPasswordClick: onForgotPasswordClick,
                userContext: userContext,
            };
        },
        [recipe$2, error, userContext]
    );
}
var SignInFeature = function (props) {
    var childProps = useChildProps$1(
        props.recipe,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.userContext,
        props.navigate
    );
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            {
                children: jsxRuntime.jsxs(React.Fragment, {
                    children: [
                        props.children === undefined &&
                            jsxRuntime.jsx(SignInTheme, genericComponentOverrideContext.__assign({}, childProps)),
                        props.children &&
                            React__namespace.Children.map(props.children, function (child) {
                                if (React__namespace.isValidElement(child)) {
                                    return React__namespace.cloneElement(
                                        child,
                                        genericComponentOverrideContext.__assign({}, childProps)
                                    );
                                }
                                return child;
                            }),
                    ],
                }),
            }
        )
    );
};
var getModifiedRecipeImplementation$1 = function (origImpl) {
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, origImpl), {
        signIn: function (input) {
            return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                var response;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                origImpl.signIn(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, input),
                                        { shouldTryLinkingWithSessionUser: false }
                                    )
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        signUp: function (input) {
            return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                var response;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                origImpl.signUp(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, input),
                                        { shouldTryLinkingWithSessionUser: false }
                                    )
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
    });
};

var SignUpForm = uiEntry.withOverride("EmailPasswordSignUpForm", function EmailPasswordSignUpForm(props) {
    var _this = this;
    var userContext = uiEntry.useUserContext();
    return jsxRuntime.jsx(formBase.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        onFetchError: props.onFetchError,
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
                                    shouldTryLinkingWithSessionUser: false,
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
function SignUpTheme(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    var activeStyle = props.config.signInAndUpFeature.signUpForm.style;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    genericComponentOverrideContext.__assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] },
                        { children: jsxRuntime.jsx(SignUpForm, genericComponentOverrideContext.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

function useChildProps(recipe, onAuthSuccess, error, onError, clearError, userContext, navigate) {
    var _this = this;
    var session$1 = uiEntry.useSessionContext();
    var recipeImplementation = React.useMemo(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.webJSRecipe);
        },
        [recipe]
    );
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    var onSignUpSuccess = React.useCallback(
        function (result) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                var payloadAfterCall;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            payloadAfterCall = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _b.sent();
                            payloadAfterCall = undefined;
                            return [3 /*break*/, 3];
                        case 3:
                            return [
                                2 /*return*/,
                                onAuthSuccess({
                                    createdNewUser: result.user.loginMethods.length === 1,
                                    isNewRecipeUser: true,
                                    newSessionCreated:
                                        session$1.loading ||
                                        !session$1.doesSessionExist ||
                                        (payloadAfterCall !== undefined &&
                                            session$1.accessTokenPayload.sessionHandle !==
                                                payloadAfterCall.sessionHandle),
                                    recipeId: recipe.recipeID,
                                }).catch(rethrowInRender),
                            ];
                    }
                });
            });
        },
        [recipe, userContext, navigate]
    );
    return React.useMemo(
        function () {
            var signInAndUpFeature = recipe.config.signInAndUpFeature;
            var signUpFeature = signInAndUpFeature.signUpForm;
            return {
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                styleFromInit: signUpFeature.style,
                formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe, userContext),
                onFetchError: function (err) {
                    return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                        var invalidClaims, evInstance;
                        return genericComponentOverrideContext.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (
                                        !(
                                            err.status ===
                                            types.Session.getInstanceOrThrow().config.invalidClaimStatusCode
                                        )
                                    )
                                        return [3 /*break*/, 5];
                                    return [
                                        4 /*yield*/,
                                        session.getInvalidClaimsFromResponse({
                                            response: err,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    invalidClaims = _b.sent();
                                    if (
                                        !invalidClaims.some(function (i) {
                                            return i.id === emailverification.EmailVerificationClaim.id;
                                        })
                                    )
                                        return [3 /*break*/, 5];
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    evInstance = recipe$1.EmailVerification.getInstanceOrThrow();
                                    return [
                                        4 /*yield*/,
                                        evInstance.redirect(
                                            {
                                                action: "VERIFY_EMAIL",
                                                tenantIdFromQueryParams:
                                                    genericComponentOverrideContext.getTenantIdFromQueryParams(),
                                            },
                                            navigate,
                                            undefined,
                                            userContext
                                        ),
                                    ];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/];
                                case 4:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 5:
                                    onError("SOMETHING_WENT_WRONG_ERROR");
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onSuccess: onSignUpSuccess,
                userContext: userContext,
                error: error,
                onError: onError,
                clearError: clearError,
            };
        },
        [recipe, error, userContext]
    );
}
var SignUpFeature = function (props) {
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var childProps = useChildProps(
        props.recipe,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        userContext,
        props.navigate
    );
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsxRuntime.jsx(
        authCompWrapper.AuthComponentWrapper,
        genericComponentOverrideContext.__assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            {
                children: jsxRuntime.jsxs(React.Fragment, {
                    children: [
                        props.children === undefined &&
                            jsxRuntime.jsx(SignUpTheme, genericComponentOverrideContext.__assign({}, childProps)),
                        props.children &&
                            React__namespace.Children.map(props.children, function (child) {
                                if (React__namespace.isValidElement(child)) {
                                    return React__namespace.cloneElement(
                                        child,
                                        genericComponentOverrideContext.__assign({}, childProps)
                                    );
                                }
                                return child;
                            }),
                    ],
                }),
            }
        )
    );
};
var getModifiedRecipeImplementation = function (origImpl) {
    return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, origImpl), {
        signIn: function (input) {
            return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                var response;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                origImpl.signIn(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, input),
                                        { shouldTryLinkingWithSessionUser: false }
                                    )
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        signUp: function (input) {
            return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                var response;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                origImpl.signUp(
                                    genericComponentOverrideContext.__assign(
                                        genericComponentOverrideContext.__assign({}, input),
                                        { shouldTryLinkingWithSessionUser: false }
                                    )
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
    });
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
        _this.languageTranslations = defaultTranslationsEmailPassword;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(constants.DEFAULT_RESET_PASSWORD_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("resetpassword", props, useComponentOverrides);
                    },
                    recipeID: recipe.EmailPassword.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = componentOverrideContext.useContext;
            }
            if (componentName === "resetpassword") {
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
        _this.requiresSignUpPage = true;
        return _this;
    }
    // Static methods
    EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (EmailPasswordPreBuiltUI.instance === undefined) {
            var recipeInstance = recipe.EmailPassword.getInstanceOrThrow();
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
    EmailPasswordPreBuiltUI.prototype.getAuthComponents = function () {
        var _this = this;
        return [
            {
                factorIds: [types.FactorIds.EMAILPASSWORD],
                displayOrder: 2,
                type: "SIGN_UP",
                component: function (props) {
                    return jsxRuntime.jsx(
                        SignUpFeature,
                        genericComponentOverrideContext.__assign(
                            {
                                recipe: _this.recipeInstance,
                                useComponentOverrides: componentOverrideContext.useContext,
                            },
                            props
                        ),
                        "emailpassword-sign-up"
                    );
                },
            },
            {
                factorIds: [types.FactorIds.EMAILPASSWORD],
                displayOrder: 2,
                type: "SIGN_IN",
                component: function (props) {
                    return jsxRuntime.jsx(
                        SignInFeature,
                        genericComponentOverrideContext.__assign(
                            {
                                recipe: _this.recipeInstance,
                                useComponentOverrides: componentOverrideContext.useContext,
                            },
                            props
                        ),
                        "emailpassword-sign-in"
                    );
                },
            },
        ];
    };
    // For tests
    EmailPasswordPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        EmailPasswordPreBuiltUI.instance = undefined;
        return;
    };
    EmailPasswordPreBuiltUI.ResetPasswordUsingToken = function (prop) {
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("resetpassword", prop);
    };
    EmailPasswordPreBuiltUI.ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenThemeWrapper;
    return EmailPasswordPreBuiltUI;
})(uiEntry.RecipeRouter);
var ResetPasswordUsingToken = EmailPasswordPreBuiltUI.ResetPasswordUsingToken;

exports.EmailPasswordPreBuiltUI = EmailPasswordPreBuiltUI;
exports.ResetPasswordUsingToken = ResetPasswordUsingToken;
exports.ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenThemeWrapper;
