"use strict";

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var authWidgetWrapper = require("./authRecipe-shared.js");
var arrowLeftIcon = require("./arrowLeftIcon.js");
var React = require("react");
var index = require("./index3.js");
var translationContext = require("./translationContext.js");
var translations = require("./emailverification-shared.js");
require("./index.js");
var button = require("./emailpassword-shared.js");
var recipe = require("./recipe.js");

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
    const signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    const signUpPasswordField = signInAndUpFeature.signUpForm.formFields.find((field) => {
        return field.id === "password";
    });
    const signUpEmailField = signInAndUpFeature.signUpForm.formFields.find((field) => {
        return field.id === "email";
    });
    const resetPasswordUsingTokenFeature = normaliseResetPasswordUsingTokenFeature(
        signUpPasswordField.validate,
        signUpEmailField,
        config.resetPasswordUsingTokenFeature
    );
    const override = Object.assign(
        { functions: (originalImplementation) => originalImplementation, components: {} },
        config.override
    );
    return Object.assign(Object.assign({}, authWidgetWrapper.normaliseAuthRecipe(config)), {
        signInAndUpFeature,
        resetPasswordUsingTokenFeature,
        override,
    });
}
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    const disableDefaultUI = config.disableDefaultUI === true;
    const signUpForm = normaliseSignUpFormFeatureConfig(config.signUpForm);
    const defaultToSignUp = config.defaultToSignUp !== undefined ? config.defaultToSignUp : false;
    /*
     * Default Sign In corresponds to computed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     * Exception made of the password validator which only verifies that the value is not empty for login
     * https://github.com/supertokens/supertokens-auth-react/issues/21
     */
    const defaultSignInFields = signUpForm.formFields.reduce((signInFieldsAccumulator, field) => {
        if (field.id === "email") {
            return [...signInFieldsAccumulator, field];
        }
        if (field.id === "password") {
            return [
                ...signInFieldsAccumulator,
                Object.assign(Object.assign({}, field), {
                    autoComplete: "current-password",
                    validate: arrowLeftIcon.defaultLoginPasswordValidator,
                }),
            ];
        }
        return signInFieldsAccumulator;
    }, []);
    const signInForm = normaliseSignInFormFeatureConfig(defaultSignInFields, config.signInForm);
    return {
        disableDefaultUI,
        defaultToSignUp,
        signUpForm,
        signInForm,
    };
}
function normaliseSignUpFormFeatureConfig(config) {
    if (config === undefined) {
        config = {};
    }
    const defaultFormFields = getDefaultFormFields();
    let userFormFields = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields;
    }
    const formFields = mergeFormFields(defaultFormFields, userFormFields);
    const privacyPolicyLink = config.privacyPolicyLink;
    const termsOfServiceLink = config.termsOfServiceLink;
    const style = config.style !== undefined ? config.style : "";
    return {
        style,
        formFields,
        privacyPolicyLink,
        termsOfServiceLink,
    };
}
function normaliseSignInFormFeatureConfig(defaultFormFields, config) {
    if (config === undefined) {
        config = {};
    }
    let userFormFields = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields
            // Filter on email and password only.
            .filter((field) => arrowLeftIcon.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id))
            // Sign In fields are never optional.
            .map((field) => Object.assign(Object.assign({}, field), { optional: false }));
    }
    const formFields = mergeFormFields(defaultFormFields, userFormFields);
    const style = config.style !== undefined ? config.style : "";
    return {
        style,
        formFields,
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
        validate: arrowLeftIcon.defaultEmailValidator,
        optional: false,
        autoComplete: "email",
    };
}
function getDefaultPasswordFormField() {
    return {
        id: "password",
        label: "EMAIL_PASSWORD_PASSWORD_LABEL",
        placeholder: "EMAIL_PASSWORD_PASSWORD_PLACEHOLDER",
        validate: arrowLeftIcon.defaultPasswordValidator,
        optional: false,
        autoComplete: "new-password",
    };
}
function normaliseResetPasswordUsingTokenFeature(signUpPasswordFieldValidate, signUpEmailField, config) {
    if (config === undefined) {
        config = {};
    }
    const disableDefaultUI = config.disableDefaultUI === true;
    const submitNewPasswordFormStyle =
        config.submitNewPasswordForm !== undefined && config.submitNewPasswordForm.style !== undefined
            ? config.submitNewPasswordForm.style
            : "";
    const submitNewPasswordForm = {
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
    const enterEmailFormStyle =
        config.enterEmailForm !== undefined && config.enterEmailForm.style !== undefined
            ? config.enterEmailForm.style
            : "";
    const enterEmailForm = {
        style: enterEmailFormStyle,
        formFields: [
            Object.assign(Object.assign({}, getDefaultEmailFormField()), {
                validate: signUpEmailField.validate,
                placeholder: "",
                autofocus: true,
            }),
        ],
    };
    return {
        disableDefaultUI,
        submitNewPasswordForm,
        enterEmailForm,
    };
}
/*
 * mergeFormFields by keeping the provided order, defaultFormFields or merged first, and unmerged userFormFields after.
 */
function mergeFormFields(defaultFormFields, userFormFields) {
    // Create a new array with default fields.
    const mergedFormFields = defaultFormFields;
    // Loop through user provided fields.
    for (let i = 0; i < userFormFields.length; i++) {
        const userField = userFormFields[i];
        let isNewField = true;
        // Loop through the merged fields array.
        for (let j = 0; j < mergedFormFields.length; j++) {
            const mergedField = mergedFormFields[j];
            // If id is equal, merge the fields
            if (userField.id === mergedField.id) {
                // Make sure that email and password are kept mandatory.
                let optional = mergedField.optional; // Init with default value.
                // If user provided value, overwrite.
                if (userField.optional !== undefined) {
                    optional = userField.optional;
                }
                // If "email" or "password", always mandatory.
                if (arrowLeftIcon.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(userField.id)) {
                    optional = false;
                }
                // Merge.
                mergedFormFields[j] = Object.assign(Object.assign(Object.assign({}, mergedFormFields[j]), userField), {
                    optional,
                });
                isNewField = false;
                break;
            }
        }
        // If new field, push to mergeFormFields.
        if (isNewField) {
            mergedFormFields.push(
                Object.assign(
                    { optional: false, placeholder: userField.label, validate: arrowLeftIcon.defaultValidate },
                    userField
                )
            );
        }
    }
    return mergedFormFields.map((field) => getFormattedFormField(field));
}
function getFormattedFormField(field) {
    return Object.assign(Object.assign({}, field), {
        validate: (value) =>
            sessionAuth.__awaiter(this, void 0, void 0, function* () {
                // Absent or not optional empty field
                if (value === "" && field.optional === false) {
                    return "ERROR_NON_OPTIONAL";
                }
                return yield field.validate(value);
            }),
    });
}

const SignUpFooter = index.withOverride(
    "EmailPasswordSignUpFooter",
    function EmailPasswordSignUpFooter({ termsOfServiceLink, privacyPolicyLink }) {
        const t = translationContext.useTranslation();
        if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
            return null;
        }
        return jsxRuntime.jsxs(
            "div",
            Object.assign(
                { "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions" },
                {
                    children: [
                        t("EMAIL_PASSWORD_SIGN_UP_FOOTER_START"),
                        termsOfServiceLink !== undefined &&
                            jsxRuntime.jsx(
                                "a",
                                Object.assign(
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
                                Object.assign(
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
    }
);

const SignUpHeader = index.withOverride("EmailPasswordSignUpHeader", function EmailPasswordSignUpHeader({ onClick }) {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                Object.assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx(
                "div",
                Object.assign(
                    { "data-supertokens": "headerSubtitle" },
                    {
                        children: jsxRuntime.jsxs(
                            "div",
                            Object.assign(
                                { "data-supertokens": "secondaryText" },
                                {
                                    children: [
                                        t("EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START"),
                                        jsxRuntime.jsx(
                                            "span",
                                            Object.assign(
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
const SignUpForm = index.withOverride("EmailPasswordSignUpForm", function EmailPasswordSignUpForm(props) {
    const userContext = sessionAuth.useUserContext();
    return jsxRuntime.jsx(arrowLeftIcon.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: (formFields) =>
            sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const validationErrors = yield sessionAuth.validateForm(
                    formFields,
                    props.config.signInAndUpFeature.signUpForm.formFields
                );
                if (validationErrors.length > 0) {
                    return {
                        status: "FIELD_ERROR",
                        formFields: validationErrors,
                    };
                }
                return props.recipeImplementation.signUp({
                    formFields,
                    userContext,
                });
            }),
        validateOnBlur: true,
        showLabels: true,
        footer: props.footer,
    });
});

const SignUp = index.withOverride("EmailPasswordSignUp", function EmailPasswordSignUp(props) {
    return jsxRuntime.jsxs(
        "div",
        Object.assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        Object.assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignUpHeader, { onClick: props.signInClicked }),
                                    props.error !== undefined &&
                                        jsxRuntime.jsx(index.GeneralError, { error: props.error }),
                                    jsxRuntime.jsx(
                                        SignUpForm,
                                        Object.assign({}, props, {
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
                    jsxRuntime.jsx(authWidgetWrapper.SuperTokensBranding, {}),
                ],
            }
        )
    );
});

const SignInFooter = index.withOverride("EmailPasswordSignInFooter", function EmailPasswordSignInFooter({ onClick }) {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsx(
        "div",
        Object.assign(
            { "data-supertokens": "link secondaryText forgotPasswordLink", onClick: onClick },
            { children: t("EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK") }
        )
    );
});

const SignInForm = index.withOverride("EmailPasswordSignInForm", function EmailPasswordSignInForm(props) {
    const userContext = sessionAuth.useUserContext();
    return jsxRuntime.jsx(arrowLeftIcon.FormBase, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: (formFields) =>
            sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const validationErrors = yield sessionAuth.validateForm(
                    formFields,
                    props.config.signInAndUpFeature.signInForm.formFields
                );
                if (validationErrors.length > 0) {
                    return {
                        status: "FIELD_ERROR",
                        formFields: validationErrors,
                    };
                }
                const response = yield props.recipeImplementation.signIn({
                    formFields,
                    userContext,
                });
                if (response.status === "WRONG_CREDENTIALS_ERROR") {
                    throw new index.STGeneralError("EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR");
                } else {
                    return response;
                }
            }),
        validateOnBlur: false,
        showLabels: true,
        footer: props.footer,
    });
});

const SignInHeader = index.withOverride("EmailPasswordSignInHeader", function EmailPasswordSignInHeader({ onClick }) {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsxs(React.Fragment, {
        children: [
            jsxRuntime.jsx(
                "div",
                Object.assign(
                    { "data-supertokens": "headerTitle" },
                    { children: t("EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE") }
                )
            ),
            jsxRuntime.jsx(
                "div",
                Object.assign(
                    { "data-supertokens": "headerSubtitle" },
                    {
                        children: jsxRuntime.jsxs(
                            "div",
                            Object.assign(
                                { "data-supertokens": "secondaryText" },
                                {
                                    children: [
                                        t("EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START"),
                                        jsxRuntime.jsx(
                                            "span",
                                            Object.assign(
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

const SignIn = index.withOverride("EmailPasswordSignIn", function EmailPasswordSignIn(props) {
    return jsxRuntime.jsxs(
        "div",
        Object.assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxRuntime.jsxs(
                        "div",
                        Object.assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(SignInHeader, { onClick: props.signUpClicked }),
                                    props.error !== undefined &&
                                        jsxRuntime.jsx(index.GeneralError, { error: props.error }),
                                    jsxRuntime.jsx(
                                        SignInForm,
                                        Object.assign({}, props, {
                                            footer: jsxRuntime.jsx(SignInFooter, {
                                                onClick: props.forgotPasswordClick,
                                            }),
                                        })
                                    ),
                                ],
                            }
                        )
                    ),
                    jsxRuntime.jsx(authWidgetWrapper.SuperTokensBranding, {}),
                ],
            }
        )
    );
});

const SignInAndUpTheme = (props) => {
    // If isSignUp, return signUp.
    if (props.featureState.isSignUp) {
        return jsxRuntime.jsx(
            SignUp,
            Object.assign({}, props.signUpForm, {
                signInClicked: () => {
                    props.dispatch({ type: "setSignIn" });
                },
            })
        );
    }
    // Otherwise, return SignIn.
    return jsxRuntime.jsx(
        SignIn,
        Object.assign({}, props.signInForm, {
            signUpClicked: () => {
                props.dispatch({ type: "setSignUp" });
            },
        })
    );
};
function SignInAndUpThemeWrapper(props) {
    const hasFont = index.hasFontDefined(props.config.rootStyle);
    const activeStyle = props.featureState.isSignUp
        ? props.config.signInAndUpFeature.signUpForm.style
        : props.config.signInAndUpFeature.signInForm.style;
    return jsxRuntime.jsx(
        sessionAuth.UserContextWrapper,
        Object.assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    Object.assign(
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, activeStyle] },
                        { children: jsxRuntime.jsx(SignInAndUpTheme, Object.assign({}, props)) }
                    )
                ),
            }
        )
    );
}

const defaultTranslationsEmailPassword = {
    en: Object.assign(
        Object.assign(
            Object.assign({}, index.defaultTranslationsCommon.en),
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

const useFeatureReducer = (recipe) => {
    return React__namespace.useReducer(
        (oldState, action) => {
            switch (action.type) {
                case "setSignIn":
                    return Object.assign(Object.assign({}, oldState), { error: undefined, isSignUp: false });
                case "setSignUp":
                    return Object.assign(Object.assign({}, oldState), { error: undefined, isSignUp: true });
                case "setError":
                    return Object.assign(Object.assign({}, oldState), { error: action.error });
                default:
                    return oldState;
            }
        },
        {
            isSignUp: recipe === undefined ? false : recipe.config.signInAndUpFeature.defaultToSignUp,
            user: undefined,
            error: undefined,
        },
        (initArg) => {
            const show = sessionAuth.getQueryParams("show");
            let isSignUp = initArg.isSignUp;
            if (show !== null) {
                isSignUp = show === "signup";
            }
            return {
                isSignUp,
                user: undefined,
                error: undefined,
            };
        }
    );
};
function useChildProps(recipe, state, dispatch, history) {
    const recipeImplementation = React.useMemo(
        () => recipe && getModifiedRecipeImplementation(recipe.recipeImpl),
        [recipe]
    );
    const userContext = sessionAuth.useUserContext();
    const onSignInSuccess = React.useCallback(
        () =>
            sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return sessionAuth.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
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
                );
            }),
        [recipe, userContext, history]
    );
    const onSignUpSuccess = React.useCallback(
        () =>
            sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return sessionAuth.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
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
                );
            }),
        [recipe, userContext, history]
    );
    return React.useMemo(() => {
        if (recipe === undefined || recipeImplementation === undefined) {
            return;
        }
        const signInAndUpFeature = recipe.config.signInAndUpFeature;
        const signUpFeature = signInAndUpFeature.signUpForm;
        const signInFeature = signInAndUpFeature.signInForm;
        const signInForm = {
            recipeImplementation,
            config: recipe.config,
            styleFromInit: signInFeature.style,
            formFields: signInFeature.formFields,
            error: state.error,
            clearError: () => dispatch({ type: "setError", error: undefined }),
            onError: (error) => dispatch({ type: "setError", error }),
            onSuccess: onSignInSuccess,
            forgotPasswordClick: () => recipe.redirect({ action: "RESET_PASSWORD" }, history),
        };
        const signUpForm = {
            recipeImplementation,
            config: recipe.config,
            styleFromInit: signUpFeature.style,
            formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe, userContext),
            error: state.error,
            clearError: () => dispatch({ type: "setError", error: undefined }),
            onError: (error) => dispatch({ type: "setError", error }),
            onSuccess: onSignUpSuccess,
        };
        return {
            config: recipe.config,
            signInForm: signInForm,
            signUpForm: signUpForm,
        };
    }, [recipe, state, dispatch]);
}
const SignInAndUpFeature = (props) => {
    const [state, dispatch] = useFeatureReducer(props.recipe);
    const childProps = useChildProps(props.recipe, state, dispatch, props.history);
    return jsxRuntime.jsx(
        index.ComponentOverrideContext.Provider,
        Object.assign(
            { value: props.recipe.config.override.components },
            {
                children: jsxRuntime.jsx(
                    index.FeatureWrapper,
                    Object.assign(
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
                                            Object.assign({}, childProps, { featureState: state, dispatch: dispatch })
                                        ),
                                    props.children &&
                                        React__namespace.Children.map(props.children, (child) => {
                                            if (React__namespace.isValidElement(child)) {
                                                return React__namespace.cloneElement(
                                                    child,
                                                    Object.assign(Object.assign({}, childProps), {
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
const getModifiedRecipeImplementation = (origImpl) => {
    return Object.assign({}, origImpl);
};
function getThemeSignUpFeatureFormFields(formFields, recipe, userContext) {
    const emailPasswordOnly = formFields.length === 2;
    return formFields.map((field) =>
        Object.assign(Object.assign({}, field), {
            showIsRequired: (() => {
                // If email and password only, do not show required indicator (*).
                if (emailPasswordOnly) {
                    return false;
                }
                // Otherwise, show for all non optional fields (including email and password).
                return field.optional === false;
            })(),
            validate: (() => {
                // If field is not email, return field validate unchanged.
                if (field.id !== "email") {
                    return field.validate;
                }
                // Otherwise, if email, use syntax validate method and check if email exists.
                return (value) =>
                    sessionAuth.__awaiter(this, void 0, void 0, function* () {
                        const error = yield field.validate(value);
                        if (error !== undefined) {
                            return error;
                        }
                        if (typeof value !== "string") {
                            return "GENERAL_ERROR_EMAIL_NON_STRING";
                        }
                        try {
                            const emailExists = (yield recipe.recipeImpl.doesEmailExist({
                                email: value,
                                userContext,
                            })).doesExist;
                            if (emailExists) {
                                return "EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS";
                            }
                        } catch (err) {
                            if (index.STGeneralError.isThisError(err)) {
                                return err.message;
                            }
                        }
                        return undefined;
                    });
            })(),
        })
    );
}

/*
 * Component.
 */
function BackToSignInButton({ onClick }) {
    const t = translationContext.useTranslation();
    return jsxRuntime.jsxs(
        "div",
        Object.assign(
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
function HeavyArrowLeftIcon({ color }) {
    return jsxRuntime.jsx(
        "svg",
        Object.assign(
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
function BackButton({ onClick }) {
    return jsxRuntime.jsx(
        "button",
        Object.assign(
            { onClick: onClick, "data-supertokens": "backButton backButtonCommon" },
            { children: jsxRuntime.jsx(HeavyArrowLeftIcon, { color: "rgb(var(--palette-textTitle))" }) }
        )
    );
}

const EmailPasswordResetPasswordEmail = (props) => {
    const t = translationContext.useTranslation();
    const userContext = sessionAuth.useUserContext();
    const [status, setStatus] = React.useState("READY");
    const [emailFieldValue, setEmailFieldValue] = React.useState("");
    const onSuccess = () => {
        setStatus("SENT");
    };
    const resend = () => {
        setStatus("READY");
    };
    const { formFields } = props;
    const emailSuccessText =
        t("EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL") +
        (emailFieldValue !== undefined && emailFieldValue.length > 0
            ? emailFieldValue
            : t("EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL")) +
        t("EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL");
    if (status === "SENT") {
        return jsxRuntime.jsx(
            "div",
            Object.assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        Object.assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsxs(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "primaryText enterEmailSuccessMessage" },
                                            {
                                                children: [
                                                    emailSuccessText,
                                                    jsxRuntime.jsx(
                                                        "span",
                                                        Object.assign(
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
        Object.assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    Object.assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                jsxRuntime.jsxs(
                                    "div",
                                    Object.assign(
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
                                    Object.assign(
                                        { "data-supertokens": "headerSubtitle" },
                                        {
                                            children: jsxRuntime.jsx(
                                                "div",
                                                Object.assign(
                                                    { "data-supertokens": "secondaryText" },
                                                    { children: t("EMAIL_PASSWORD_RESET_HEADER_SUBTITLE") }
                                                )
                                            ),
                                        }
                                    )
                                ),
                                props.error !== undefined && jsxRuntime.jsx(index.GeneralError, { error: props.error }),
                                jsxRuntime.jsx(arrowLeftIcon.FormBase, {
                                    clearError: props.clearError,
                                    onError: props.onError,
                                    formFields: formFields,
                                    buttonLabel: "EMAIL_PASSWORD_RESET_SEND_BTN",
                                    onSuccess: onSuccess,
                                    callAPI: (formFields) =>
                                        sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                                            const validationErrors = yield sessionAuth.validateForm(
                                                formFields,
                                                props.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields
                                            );
                                            if (validationErrors.length > 0) {
                                                return {
                                                    status: "FIELD_ERROR",
                                                    formFields: validationErrors,
                                                };
                                            }
                                            const emailField = formFields.find((field) => {
                                                return field.id === "email";
                                            });
                                            if (emailField !== undefined) {
                                                setEmailFieldValue(emailField.value);
                                            }
                                            return yield props.recipeImplementation.sendPasswordResetEmail({
                                                formFields,
                                                userContext,
                                            });
                                        }),
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
const ResetPasswordEmail = index.withOverride("EmailPasswordResetPasswordEmail", EmailPasswordResetPasswordEmail);

const EmailPasswordSubmitNewPassword = (props) => {
    const t = translationContext.useTranslation();
    const userContext = sessionAuth.useUserContext();
    const [status, setStatus] = React.useState("READY");
    const onSuccess = () => {
        setStatus("SUCCESS");
    };
    const { formFields, onSignInClicked } = props;
    if (status === "SUCCESS") {
        return jsxRuntime.jsx(
            "div",
            Object.assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        Object.assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "headerTitle" },
                                            { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        arrowLeftIcon.FormRow,
                                        {
                                            children: jsxRuntime.jsxs(React.Fragment, {
                                                children: [
                                                    jsxRuntime.jsx(
                                                        "div",
                                                        Object.assign(
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
        Object.assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    Object.assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                jsxRuntime.jsx(
                                    "div",
                                    Object.assign(
                                        { "data-supertokens": "headerTitle" },
                                        { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    Object.assign(
                                        { "data-supertokens": "headerSubtitle" },
                                        {
                                            children: jsxRuntime.jsx(
                                                "div",
                                                Object.assign(
                                                    { "data-supertokens": "secondaryText" },
                                                    { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE") }
                                                )
                                            ),
                                        }
                                    )
                                ),
                                props.error !== undefined && jsxRuntime.jsx(index.GeneralError, { error: props.error }),
                                jsxRuntime.jsx(arrowLeftIcon.FormBase, {
                                    formFields: formFields,
                                    clearError: props.clearError,
                                    onError: props.onError,
                                    buttonLabel: "EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN",
                                    onSuccess: onSuccess,
                                    validateOnBlur: true,
                                    callAPI: (fields) =>
                                        sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                                            const validationErrors = yield sessionAuth.validateForm(
                                                fields,
                                                props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm
                                                    .formFields
                                            );
                                            if (validationErrors.length > 0) {
                                                return {
                                                    status: "FIELD_ERROR",
                                                    formFields: validationErrors,
                                                };
                                            }
                                            // Verify that both passwords match.
                                            if (fields[0].value !== fields[1].value) {
                                                return {
                                                    status: "FIELD_ERROR",
                                                    formFields: [
                                                        {
                                                            id: fields[1].id,
                                                            error: "ERROR_CONFIRM_PASSWORD_NO_MATCH",
                                                        },
                                                    ],
                                                };
                                            }
                                            const response = yield props.recipeImplementation.submitNewPassword({
                                                formFields: fields,
                                                userContext,
                                            });
                                            if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                                                throw new index.STGeneralError(
                                                    "EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR"
                                                );
                                            }
                                            return response.status === "FIELD_ERROR"
                                                ? response
                                                : {
                                                      status: "OK",
                                                  };
                                        }),
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
const SubmitNewPassword = index.withOverride("EmailPasswordSubmitNewPassword", EmailPasswordSubmitNewPassword);

/*
 * Component.
 */
function ResetPasswordUsingTokenTheme(props) {
    /*
     * Render.
     */
    // If no token, return SubmitNewPassword.
    if (props.submitNewPasswordForm !== undefined) {
        return jsxRuntime.jsx(SubmitNewPassword, Object.assign({}, props.submitNewPasswordForm));
    }
    // Otherwise, return EnterEmail.
    return jsxRuntime.jsx(ResetPasswordEmail, Object.assign({}, props.enterEmailForm));
}
function ResetPasswordUsingTokenThemeWrapper(props) {
    const hasFont = index.hasFontDefined(props.config.rootStyle);
    const userStyles = props.submitNewPasswordForm
        ? props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.style
        : props.config.resetPasswordUsingTokenFeature.enterEmailForm.style;
    return jsxRuntime.jsx(
        sessionAuth.UserContextWrapper,
        Object.assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    Object.assign(
                        { loadDefaultFont: !hasFont, userStyles: [props.config.rootStyle, userStyles] },
                        { children: jsxRuntime.jsx(ResetPasswordUsingTokenTheme, Object.assign({}, props)) }
                    )
                ),
            }
        )
    );
}

class ResetPasswordUsingToken extends React.PureComponent {
    /*
     * Constructor.
     */
    constructor(props) {
        super(props);
        this.render = () => {
            const enterEmailFormFeature = this.props.recipe.config.resetPasswordUsingTokenFeature.enterEmailForm;
            const componentOverrides = this.props.recipe.config.override.components;
            const submitNewPasswordFormFeature =
                this.props.recipe.config.resetPasswordUsingTokenFeature.submitNewPasswordForm;
            const submitNewPasswordForm =
                this.state.token === undefined
                    ? undefined
                    : {
                          error: this.state.error,
                          onError: (error) => this.setState((os) => Object.assign(Object.assign({}, os), { error })),
                          clearError: () =>
                              this.setState((os) => Object.assign(Object.assign({}, os), { error: undefined })),
                          styleFromInit: submitNewPasswordFormFeature.style,
                          formFields: submitNewPasswordFormFeature.formFields,
                          recipeImplementation: this.props.recipe.recipeImpl,
                          config: this.props.recipe.config,
                          onSignInClicked: () => {
                              void sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                                  show: "signin",
                                  history: this.props.history,
                                  redirectBack: false,
                              });
                          },
                          token: this.state.token,
                      };
            const enterEmailForm = {
                onBackButtonClicked: () =>
                    sessionAuth.SuperTokens.getInstanceOrThrow().redirectToAuth({
                        show: "signin",
                        history: this.props.history,
                        redirectBack: false,
                    }),
                error: this.state.error,
                onError: (error) => this.setState((os) => Object.assign(Object.assign({}, os), { error })),
                clearError: () => this.setState((os) => Object.assign(Object.assign({}, os), { error: undefined })),
                styleFromInit: enterEmailFormFeature.style,
                formFields: enterEmailFormFeature.formFields,
                recipeImplementation: this.props.recipe.recipeImpl,
                config: this.props.recipe.config,
            };
            const props = {
                config: this.props.recipe.config,
                submitNewPasswordForm: submitNewPasswordForm,
                enterEmailForm: enterEmailForm,
            };
            return jsxRuntime.jsx(
                index.ComponentOverrideContext.Provider,
                Object.assign(
                    { value: componentOverrides },
                    {
                        children: jsxRuntime.jsx(
                            index.FeatureWrapper,
                            Object.assign(
                                {
                                    useShadowDom: this.props.recipe.config.useShadowDom,
                                    defaultStore: defaultTranslationsEmailPassword,
                                },
                                {
                                    children: jsxRuntime.jsxs(React.Fragment, {
                                        children: [
                                            this.props.children === undefined &&
                                                jsxRuntime.jsx(
                                                    ResetPasswordUsingTokenThemeWrapper,
                                                    Object.assign({}, props)
                                                ),
                                            this.props.children &&
                                                React__namespace.Children.map(this.props.children, (child) => {
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
        const token = sessionAuth.getQueryParams("token");
        if (token === null) {
            this.state = { token: undefined, error: undefined };
        } else {
            this.state = {
                token,
                error: undefined,
            };
        }
    }
}

var recipeImplementation$1 = {};

var recipeImplementation = {};

var __awaiter =
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__awaiter) ||
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
    (recipe.commonjsGlobal && recipe.commonjsGlobal.__generator) ||
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
Object.defineProperty(recipeImplementation, "__esModule", { value: true });
recipeImplementation.getRecipeImplementation = void 0;
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
var querier_1 = index.querier;
var utils_1 = recipe.utils;
function getRecipeImplementation$1(recipeImplInput) {
    var querier = new querier_1.default(recipeImplInput.recipeId, recipeImplInput.appInfo);
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
                                querier.post(
                                    "/user/password/reset",
                                    { body: JSON.stringify({ formFields: formFields, token: token, method: "token" }) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "SUBMIT_NEW_PASSWORD",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
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
                                querier.post(
                                    "/user/password/reset/token",
                                    { body: JSON.stringify({ formFields: formFields }) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "SEND_RESET_PASSWORD_EMAIL",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
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
                                querier.post(
                                    "/signup",
                                    { body: JSON.stringify({ formFields: formFields }) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "EMAIL_PASSWORD_SIGN_UP",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
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
                                querier.post(
                                    "/signin",
                                    { body: JSON.stringify({ formFields: formFields }) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "EMAIL_PASSWORD_SIGN_IN",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
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
                                querier.get(
                                    "/signup/email/exists",
                                    {},
                                    { email: email },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImplInput.preAPIHook,
                                        action: "EMAIL_EXISTS",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
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
            var token = (0, utils_1.getQueryParams)("token");
            if (token === undefined) {
                return "";
            }
            return token;
        },
    };
}
recipeImplementation.default = getRecipeImplementation$1;
recipeImplementation.getRecipeImplementation = getRecipeImplementation$1;

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

(function (exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;

    let d = recipeImplementation;

    if (d.default !== undefined) {
        __export(d);
    } else {
        __export({
            default: d,
            ...d,
        });
    }
})(recipeImplementation$1);

function getRecipeImplementation(recipeInput) {
    const webJsImplementation = recipeImplementation$1.getRecipeImplementation({
        recipeId: recipeInput.recipeId,
        appInfo: recipeInput.appInfo,
        preAPIHook: recipeInput.preAPIHook,
        postAPIHook: recipeInput.postAPIHook,
    });
    return {
        submitNewPassword: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJsImplementation.submitNewPassword.bind(this)(
                    Object.assign(Object.assign({}, input), { formFields: [input.formFields[0]] })
                );
                if (response.status === "OK") {
                    recipeInput.onHandleEvent({
                        action: "PASSWORD_RESET_SUCCESSFUL",
                        userContext: input.userContext,
                    });
                }
                return response;
            });
        },
        sendPasswordResetEmail: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJsImplementation.sendPasswordResetEmail.bind(this)(Object.assign({}, input));
                if (response.status === "OK") {
                    recipeInput.onHandleEvent({
                        action: "RESET_PASSWORD_EMAIL_SENT",
                        userContext: input.userContext,
                    });
                }
                return response;
            });
        },
        signUp: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJsImplementation.signUp.bind(this)(Object.assign({}, input));
                if (response.status === "OK") {
                    recipeInput.onHandleEvent({
                        action: "SUCCESS",
                        isNewUser: true,
                        user: response.user,
                        userContext: input.userContext,
                    });
                }
                return response;
            });
        },
        signIn: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJsImplementation.signIn.bind(this)(Object.assign({}, input));
                if (response.status === "OK") {
                    recipeInput.onHandleEvent({
                        action: "SUCCESS",
                        isNewUser: false,
                        user: response.user,
                        userContext: input.userContext,
                    });
                }
                return response;
            });
        },
        doesEmailExist: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                return yield webJsImplementation.doesEmailExist.bind(this)(Object.assign({}, input));
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
class EmailPassword extends authWidgetWrapper.AuthRecipe {
    constructor(config) {
        super(normaliseEmailPasswordConfig(config));
        this.getFeatures = () => {
            const features = {};
            if (this.config.signInAndUpFeature.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath("/")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(this.config.recipeId),
                    component: (props) => this.getFeatureComponent("signinup", props),
                };
            }
            if (this.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath(arrowLeftIcon.DEFAULT_RESET_PASSWORD_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(this.config.recipeId),
                    component: (props) => this.getFeatureComponent("resetpassword", props),
                };
            }
            return features;
        };
        this.getDefaultRedirectionURL = (context) =>
            sessionAuth.__awaiter(this, void 0, void 0, function* () {
                if (context.action === "RESET_PASSWORD") {
                    const resetPasswordPath = new sessionAuth.NormalisedURLPath(
                        arrowLeftIcon.DEFAULT_RESET_PASSWORD_PATH
                    );
                    return `${this.config.appInfo.websiteBasePath
                        .appendPath(resetPasswordPath)
                        .getAsStringDangerous()}?rid=${this.config.recipeId}`;
                }
                return this.getAuthRecipeDefaultRedirectionURL(context);
            });
        this.getFeatureComponent = (componentName, props) => {
            if (componentName === "signinup") {
                if (props.redirectOnSessionExists !== false) {
                    return jsxRuntime.jsx(
                        sessionAuth.UserContextWrapper,
                        Object.assign(
                            { userContext: props.userContext },
                            {
                                children: jsxRuntime.jsx(
                                    authWidgetWrapper.AuthWidgetWrapper,
                                    Object.assign(
                                        { authRecipe: this, history: props.history },
                                        {
                                            children: jsxRuntime.jsx(
                                                SignInAndUpFeature,
                                                Object.assign({ recipe: this }, props)
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
                        Object.assign(
                            { userContext: props.userContext },
                            { children: jsxRuntime.jsx(SignInAndUpFeature, Object.assign({ recipe: this }, props)) }
                        )
                    );
                }
            } else if (componentName === "resetpassword") {
                return jsxRuntime.jsx(
                    sessionAuth.UserContextWrapper,
                    Object.assign(
                        { userContext: props.userContext },
                        { children: jsxRuntime.jsx(ResetPasswordUsingToken, Object.assign({ recipe: this }, props)) }
                    )
                );
            } else {
                throw new Error("Should never come here.");
            }
        };
        const builder = new index.OverrideableBuilder_1(
            getRecipeImplementation({
                appInfo: this.config.appInfo,
                recipeId: this.config.recipeId,
                onHandleEvent: this.config.onHandleEvent,
                preAPIHook: this.config.preAPIHook,
                postAPIHook: this.config.postAPIHook,
            })
        );
        this.recipeImpl = builder.override(this.config.override.functions).build();
    }
    static init(config) {
        return (appInfo) => {
            EmailPassword.instance = new EmailPassword(
                Object.assign(Object.assign({}, config), { appInfo, recipeId: EmailPassword.RECIPE_ID })
            );
            return EmailPassword.instance;
        };
    }
    static getInstanceOrThrow() {
        if (EmailPassword.instance === undefined) {
            let error =
                "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailPassword.instance;
    }
    /*
     * Tests methods.
     */
    static reset() {
        if (!sessionAuth.isTest()) {
            return;
        }
        EmailPassword.instance = undefined;
        return;
    }
}
EmailPassword.RECIPE_ID = "emailpassword";

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
