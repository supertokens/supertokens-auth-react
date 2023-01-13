"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var React = require("react");
var index = require("./index3.js");
var translations = require("./emailverification-shared.js");
var utils$1 = require("./utils.js");
var translationContext = require("./translationContext.js");
var spinnerIcon = require("./spinnerIcon.js");
var button = require("./emailpassword-shared.js");
var index$1 = require("./index.js");
var session = require("./session-shared2.js");
var recipe$1 = require("./recipe.js");
var index$2 = require("./index2.js");
require("react-dom");

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
/*
 * Imports.
 */
/*
 * Component.
 */
function ArrowRightIcon({ color }) {
    return jsxRuntime.jsx(
        "svg",
        Object.assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "11.272",
                height: "9.49",
                viewBox: "0 0 11.272 9.49",
                "data-supertokens": "arrowRightIcon",
            },
            {
                children: jsxRuntime.jsx("path", {
                    fill: color,
                    stroke: "#fff",
                    strokeWidth: "0.75px",
                    d: "M9.931 3.545h.016-7.041L5.12 1.33a.581.581 0 0 0 0-.817L4.775.168a.576.576 0 0 0-.813 0L.168 3.962a.58.58 0 0 0 0 .816l3.794 3.794a.577.577 0 0 0 .813 0l.344-.345a.57.57 0 0 0 .168-.407.553.553 0 0 0-.168-.4L2.881 5.191h7.058a.6.6 0 0 0 .584-.59v-.487a.585.585 0 0 0-.592-.569z",
                    transform: "rotate(180 5.449 4.558)",
                }),
            }
        )
    );
}

const EmailVerificationSendVerifyEmail = (props) => {
    const t = translationContext.useTranslation();
    const userContext = sessionAuth.useUserContext();
    const [status, setStatus] = React.useState("READY");
    const [errorMessage, setErrorMessage] = React.useState(undefined);
    const resendEmail = () =>
        sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield props.recipeImplementation.sendVerificationEmail({
                    userContext,
                });
                if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                    yield props.onEmailAlreadyVerified();
                } else if (response.status === "OK") {
                    setStatus("EMAIL_RESENT");
                }
            } catch (e) {
                if (index.STGeneralError.isThisError(e)) {
                    setErrorMessage(e.message);
                }
                setStatus("ERROR");
                return handleSendError();
            }
        });
    const logout = () =>
        sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
            try {
                yield props.signOut();
            } catch (e) {
                if (index.STGeneralError.isThisError(e)) {
                    setErrorMessage(e.message);
                }
                setStatus("ERROR");
            }
        });
    const sendVerificationEmail = React.useCallback(
        () =>
            props.recipeImplementation.sendVerificationEmail({
                userContext,
            }),
        [props.config, props.recipeImplementation]
    );
    const checkSendResponse = React.useCallback(
        (response) =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                    yield props.onEmailAlreadyVerified();
                }
            }),
        [props.config, props.recipeImplementation, props.onEmailAlreadyVerified]
    );
    const handleSendError = React.useCallback(
        () =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                // TODO: we will not need this after restructuring the emailverification components, since it should be handled by SessionAuth
                // If the error cleared the session we should redirect to auth
                if ((yield sessionAuth.Session.getInstanceOrThrow().doesSessionExist({ userContext })) !== true) {
                    yield props.redirectToAuth();
                }
                // We intentionally ignore the error here, because we don't want to show an error without the user taking action
            }),
        []
    );
    sessionAuth.useOnMountAPICall(sendVerificationEmail, checkSendResponse, handleSendError);
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
                                status === "ERROR" &&
                                    jsxRuntime.jsx(index.GeneralError, {
                                        error: errorMessage === undefined ? "SOMETHING_WENT_WRONG_ERROR" : errorMessage,
                                    }),
                                status === "EMAIL_RESENT" &&
                                    jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "generalSuccess" },
                                            { children: t("EMAIL_VERIFICATION_RESEND_SUCCESS") }
                                        )
                                    ),
                                jsxRuntime.jsx(
                                    "div",
                                    Object.assign(
                                        { "data-supertokens": "sendVerifyEmailIcon" },
                                        { children: jsxRuntime.jsx(utils$1.EmailLargeIcon, {}) }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    Object.assign(
                                        { "data-supertokens": "headerTitle headerTinyTitle" },
                                        { children: t("EMAIL_VERIFICATION_SEND_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsxs(
                                    "div",
                                    Object.assign(
                                        { "data-supertokens": "primaryText sendVerifyEmailText" },
                                        {
                                            children: [
                                                t("EMAIL_VERIFICATION_SEND_DESC_START"),
                                                jsxRuntime.jsx("strong", {
                                                    children: t("EMAIL_VERIFICATION_SEND_DESC_STRONG"),
                                                }),
                                                t("EMAIL_VERIFICATION_SEND_DESC_END"),
                                            ],
                                        }
                                    )
                                ),
                                status !== "EMAIL_RESENT" &&
                                    jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "link sendVerifyEmailResend", onClick: resendEmail },
                                            { children: t("EMAIL_VERIFICATION_RESEND_BTN") }
                                        )
                                    ),
                                jsxRuntime.jsxs(
                                    "div",
                                    Object.assign(
                                        { "data-supertokens": "secondaryText secondaryLinkWithArrow", onClick: logout },
                                        {
                                            children: [
                                                t("EMAIL_VERIFICATION_LOGOUT"),
                                                jsxRuntime.jsx(ArrowRightIcon, {
                                                    color: "rgb(var(--palette-textPrimary))",
                                                }),
                                            ],
                                        }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
const SendVerifyEmail = index.withOverride("EmailVerificationSendVerifyEmail", EmailVerificationSendVerifyEmail);

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
function ErrorLargeIcon() {
    return jsxRuntime.jsx(
        "svg",
        Object.assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "33",
                height: "30",
                viewBox: "0 0 33 30",
                "data-supertokens": "errorLargeIcon",
            },
            {
                children: jsxRuntime.jsxs("g", {
                    children: [
                        jsxRuntime.jsx(
                            "g",
                            Object.assign(
                                { fill: "rgb(var(--palette-error))" },
                                {
                                    children: jsxRuntime.jsx("path", {
                                        d: "M29.617 29.75H3.383c-.626 0-1.189-.321-1.507-.86-.318-.537-.328-1.186-.027-1.733l13.118-23.85c.312-.568.885-.907 1.533-.907.648 0 1.221.339 1.533.907l13.118 23.85c.301.547.291 1.196-.027 1.734s-.881.859-1.507.859z",
                                        transform: "translate(-824.894 -352.483) translate(824.894 352.483)",
                                    }),
                                }
                            )
                        ),
                        jsxRuntime.jsx(
                            "text",
                            Object.assign(
                                {
                                    fill: "#fff",
                                    "font-family": "Rubik-Bold, Rubik",
                                    "font-size": "18px",
                                    fontWeight: "700",
                                    transform: "translate(-824.894 -352.483) translate(838.997 377.437)",
                                },
                                {
                                    children: jsxRuntime.jsx(
                                        "tspan",
                                        Object.assign({ x: "0", y: "0" }, { children: "!" })
                                    ),
                                }
                            )
                        ),
                    ],
                }),
            }
        )
    );
}

const EmailVerificationVerifyEmailLinkClicked = (props) => {
    const t = translationContext.useTranslation();
    const sessionContext = session.useSessionContext();
    const userContext = sessionAuth.useUserContext();
    const [status, setStatus] = React.useState("LOADING");
    const [errorMessage, setErrorMessage] = React.useState(undefined);
    const [verifyLoading, setVerifyLoading] = React.useState(false);
    const verifyEmailOnMount = React.useCallback(
        () =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                if (sessionContext.loading === true) {
                    // This callback should only be called if the session is already loaded
                    throw new Error("Should never come here");
                }
                // If there is no active session we know that the verification was started elsewhere, since it requires a session
                // otherwise we assume it's the same session. The main purpose of this is to prevent mail scanners
                // from accidentally validating an email address
                if (!sessionContext.doesSessionExist) {
                    return "INTERACTION_REQUIRED";
                }
                return props.recipeImplementation.verifyEmail({
                    userContext,
                });
            }),
        [props.recipeImplementation, sessionContext]
    );
    const handleVerifyResp = React.useCallback(
        (response) =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                if (response === "INTERACTION_REQUIRED") {
                    setStatus("INTERACTION_REQUIRED");
                } else if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                    setStatus("INVALID");
                } else {
                    setStatus("SUCCESSFUL");
                }
            }),
        [setStatus]
    );
    const handleError = React.useCallback(
        (err) => {
            if (index.STGeneralError.isThisError(err)) {
                setErrorMessage(err.message);
            }
            setStatus("GENERAL_ERROR");
        },
        [setStatus, setErrorMessage]
    );
    sessionAuth.useOnMountAPICall(verifyEmailOnMount, handleVerifyResp, handleError, sessionContext.loading === false);
    const { onTokenInvalidRedirect, onSuccess } = props;
    if (status === "LOADING") {
        return jsxRuntime.jsx(
            "div",
            Object.assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsx(
                        "div",
                        Object.assign(
                            { "data-supertokens": "row" },
                            {
                                children: jsxRuntime.jsx(
                                    "div",
                                    Object.assign(
                                        { "data-supertokens": "spinner" },
                                        { children: jsxRuntime.jsx(spinnerIcon.SpinnerIcon, {}) }
                                    )
                                ),
                            }
                        )
                    ),
                }
            )
        );
    }
    if (status === "INTERACTION_REQUIRED") {
        return jsxRuntime.jsx(
            "div",
            Object.assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        Object.assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "headerTitle" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "headerSubtitle secondaryText" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_DESC") }
                                        )
                                    ),
                                    jsxRuntime.jsx(button.Button, {
                                        isLoading: verifyLoading,
                                        onClick: () =>
                                            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                                                setVerifyLoading(true);
                                                try {
                                                    const resp = yield props.recipeImplementation.verifyEmail({
                                                        userContext,
                                                    });
                                                    yield handleVerifyResp(resp);
                                                } catch (err) {
                                                    void handleError(err);
                                                }
                                            }),
                                        type: "button",
                                        label: "EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON",
                                    }),
                                ],
                            }
                        )
                    ),
                }
            )
        );
    }
    if (status === "SUCCESSFUL") {
        return jsxRuntime.jsx(
            "div",
            Object.assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        Object.assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(utils$1.CheckedRoundIcon, {}),
                                    jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_SUCCESS") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "emailVerificationButtonWrapper" },
                                            {
                                                children: jsxRuntime.jsx(button.Button, {
                                                    isLoading: false,
                                                    onClick: onSuccess,
                                                    type: "button",
                                                    label: "EMAIL_VERIFICATION_CONTINUE_BTN",
                                                }),
                                            }
                                        )
                                    ),
                                ],
                            }
                        )
                    ),
                }
            )
        );
    }
    if (status === "INVALID") {
        return jsxRuntime.jsx(
            "div",
            Object.assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        Object.assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        Object.assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_EXPIRED") }
                                        )
                                    ),
                                    jsxRuntime.jsxs(
                                        "div",
                                        Object.assign(
                                            {
                                                onClick: onTokenInvalidRedirect,
                                                "data-supertokens": "secondaryText secondaryLinkWithArrow",
                                            },
                                            {
                                                children: [
                                                    t("EMAIL_VERIFICATION_CONTINUE_LINK"),
                                                    jsxRuntime.jsx(ArrowRightIcon, {
                                                        color: "rgb(var(--palette-textPrimary))",
                                                    }),
                                                ],
                                            }
                                        )
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
                        { "data-supertokens": "row noFormRow" },
                        {
                            children: [
                                jsxRuntime.jsxs(
                                    "div",
                                    Object.assign(
                                        { "data-supertokens": "headerTitle error" },
                                        {
                                            children: [
                                                jsxRuntime.jsx(ErrorLargeIcon, {}),
                                                t("EMAIL_VERIFICATION_ERROR_TITLE"),
                                            ],
                                        }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    Object.assign(
                                        { "data-supertokens": "primaryText" },
                                        {
                                            children: t(
                                                errorMessage === undefined
                                                    ? "EMAIL_VERIFICATION_ERROR_DESC"
                                                    : errorMessage
                                            ),
                                        }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
const VerifyEmailLinkClicked = index.withOverride(
    "EmailVerificationVerifyEmailLinkClicked",
    EmailVerificationVerifyEmailLinkClicked
);

/*
 * Component.
 */
function EmailVerificationTheme(props) {
    /*
     * Render.
     */
    // If no token, return SendVerifyEmail.
    if (props.verifyEmailLinkClickedScreen === undefined) {
        return jsxRuntime.jsx(SendVerifyEmail, Object.assign({}, props.sendVerifyEmailScreen));
    }
    // Otherwise, return VerifyEmailLinkClicked.
    return jsxRuntime.jsx(VerifyEmailLinkClicked, Object.assign({}, props.verifyEmailLinkClickedScreen));
}
function EmailVerificationThemeWrapper(props) {
    const hasFont = index.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        sessionAuth.UserContextWrapper,
        Object.assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    Object.assign(
                        {
                            loadDefaultFont: !hasFont,
                            userStyles: [
                                props.config.rootStyle,
                                props.verifyEmailLinkClickedScreen === undefined
                                    ? props.config.sendVerifyEmailScreen.style
                                    : props.config.verifyEmailLinkClickedScreen.style,
                            ],
                        },
                        { children: jsxRuntime.jsx(EmailVerificationTheme, Object.assign({}, props)) }
                    )
                ),
            }
        )
    );
}

const EmailVerification$2 = (props) => {
    var _a;
    const sessionContext = React.useContext(sessionAuth.SessionContext);
    const [status, setStatus] = React.useState("LOADING");
    const userContext = sessionAuth.useUserContext();
    const redirectToAuthWithHistory = React.useCallback(
        () =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                yield index$1.redirectToAuth({ redirectBack: false, history: props.history });
            }),
        [props.history]
    );
    const modifiedRecipeImplementation = React.useMemo(
        () =>
            Object.assign(Object.assign({}, props.recipe.recipeImpl), {
                sendVerificationEmail: (input) =>
                    sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                        const response = yield props.recipe.recipeImpl.sendVerificationEmail(input);
                        sessionAuth.clearQueryParams(["token"]);
                        return response;
                    }),
            }),
        [props.recipe]
    );
    const onSuccess = React.useCallback(
        () =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                return sessionAuth.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                    undefined,
                    userContext,
                    props.history
                );
            }),
        [props.recipe, props.history, userContext]
    );
    const fetchIsEmailVerified = React.useCallback(
        () =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                var _b;
                if (sessionContext.loading === true) {
                    // This callback should only be called if the session is already loaded
                    throw new Error("Should never come here");
                }
                const token = (_b = sessionAuth.getQueryParams("token")) !== null && _b !== void 0 ? _b : undefined;
                if (token === undefined) {
                    if (!sessionContext.doesSessionExist) {
                        yield redirectToAuthWithHistory();
                    } else {
                        // we check if the email is already verified, and if it is, then we redirect the user
                        return (yield props.recipe.recipeImpl.isEmailVerified({ userContext })).isVerified;
                    }
                }
                return false;
            }),
        [props.recipe, sessionContext, redirectToAuthWithHistory]
    );
    const checkIsEmailVerified = React.useCallback(
        (isVerified) =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                if (isVerified) {
                    return onSuccess();
                }
                setStatus("READY");
            }),
        [props.recipe, setStatus, onSuccess]
    );
    const handleError = React.useCallback(
        (err) =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                // TODO: we will not need this after restructuring the emailverification components, since it should be handled by SessionAuth
                // If the error cleared the session we redirect away, otherwise we have no way of handling it.
                if (yield sessionAuth.Session.getInstanceOrThrow().doesSessionExist({ userContext })) {
                    throw err;
                } else {
                    yield redirectToAuthWithHistory();
                }
            }),
        [redirectToAuthWithHistory]
    );
    sessionAuth.useOnMountAPICall(
        fetchIsEmailVerified,
        checkIsEmailVerified,
        handleError,
        sessionContext.loading === false
    );
    const signOut = React.useCallback(
        () =>
            sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
                const session = sessionAuth.Session.getInstanceOrThrow();
                yield session.signOut(props.userContext);
                return redirectToAuthWithHistory();
            }),
        [props.recipe, redirectToAuthWithHistory]
    );
    if (status === "LOADING") {
        return jsxRuntime.jsx(React.Fragment, {});
    }
    const componentOverrides = props.recipe.config.override.components;
    const sendVerifyEmailScreenFeature = props.recipe.config.sendVerifyEmailScreen;
    const sendVerifyEmailScreen = {
        styleFromInit: sendVerifyEmailScreenFeature.style,
        recipeImplementation: modifiedRecipeImplementation,
        config: props.recipe.config,
        signOut: signOut,
        onEmailAlreadyVerified: onSuccess,
        redirectToAuth: redirectToAuthWithHistory,
    };
    const verifyEmailLinkClickedScreenFeature = props.recipe.config.verifyEmailLinkClickedScreen;
    const token = (_a = sessionAuth.getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
    const verifyEmailLinkClickedScreen =
        token === undefined
            ? undefined
            : {
                  styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                  onTokenInvalidRedirect: redirectToAuthWithHistory,
                  onSuccess,
                  recipeImplementation: modifiedRecipeImplementation,
                  config: props.recipe.config,
                  token,
              };
    const childProps = {
        config: props.recipe.config,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen,
        hasToken: token !== undefined,
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
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: translations.defaultTranslationsEmailVerification,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(EmailVerificationThemeWrapper, Object.assign({}, childProps)),
                                    props.children &&
                                        React__namespace.Children.map(props.children, (child) => {
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
const DEFAULT_VERIFY_EMAIL_PATH = "/verify-email";

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
function normaliseEmailVerificationFeature(config) {
    const disableDefaultUI = config.disableDefaultUI === true;
    const mode = config.mode === undefined ? "REQUIRED" : config.mode;
    const sendVerifyEmailScreenStyle =
        config.sendVerifyEmailScreen !== undefined && config.sendVerifyEmailScreen.style !== undefined
            ? config.sendVerifyEmailScreen.style
            : "";
    const sendVerifyEmailScreen = {
        style: sendVerifyEmailScreenStyle,
    };
    const verifyEmailLinkClickedScreenStyle =
        config.verifyEmailLinkClickedScreen !== undefined && config.verifyEmailLinkClickedScreen.style !== undefined
            ? config.verifyEmailLinkClickedScreen.style
            : "";
    const verifyEmailLinkClickedScreen = {
        style: verifyEmailLinkClickedScreenStyle,
    };
    const override = Object.assign(
        { functions: (originalImplementation) => originalImplementation, components: {} },
        config.override
    );
    return Object.assign(Object.assign({}, sessionAuth.normaliseRecipeModuleConfig(config)), {
        disableDefaultUI,
        mode,
        sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen,
        override,
    });
}

var recipeImplementation$1 = {};

var recipeImplementation = {};

var __awaiter$1 =
    (recipe$1.commonjsGlobal && recipe$1.commonjsGlobal.__awaiter) ||
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
var __generator$1 =
    (recipe$1.commonjsGlobal && recipe$1.commonjsGlobal.__generator) ||
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
var utils_1$2 = recipe$1.utils;
function getRecipeImplementation$1(recipeImpleInput) {
    var querier = new querier_1.default(recipeImpleInput.recipeId, recipeImpleInput.appInfo);
    return {
        verifyEmail: function (_a) {
            var options = _a.options,
                userContext = _a.userContext;
            return __awaiter$1(this, void 0, void 0, function () {
                var token, _b, jsonBody, fetchResponse;
                return __generator$1(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            token = this.getEmailVerificationTokenFromURL({
                                userContext: userContext,
                            });
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/user/email/verify",
                                    {
                                        body: JSON.stringify({
                                            method: "token",
                                            token: token,
                                        }),
                                    },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImpleInput.preAPIHook,
                                        action: "VERIFY_EMAIL",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImpleInput.postAPIHook,
                                        userContext: userContext,
                                        action: "VERIFY_EMAIL",
                                    })
                                ),
                            ];
                        case 1:
                            (_b = _c.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
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
        isEmailVerified: function (_a) {
            var options = _a.options,
                userContext = _a.userContext;
            return __awaiter$1(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse;
                return __generator$1(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.get(
                                    "/user/email/verify",
                                    {},
                                    undefined,
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImpleInput.preAPIHook,
                                        action: "IS_EMAIL_VERIFIED",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImpleInput.postAPIHook,
                                        userContext: userContext,
                                        action: "IS_EMAIL_VERIFIED",
                                    })
                                ),
                            ];
                        case 1:
                            (_b = _c.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
                            return [
                                2 /*return*/,
                                {
                                    status: "OK",
                                    isVerified: jsonBody.isVerified,
                                    fetchResponse: fetchResponse,
                                },
                            ];
                    }
                });
            });
        },
        sendVerificationEmail: function (_a) {
            var options = _a.options,
                userContext = _a.userContext;
            return __awaiter$1(this, void 0, void 0, function () {
                var _b, jsonBody, fetchResponse;
                return __generator$1(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                querier.post(
                                    "/user/email/verify/token",
                                    { body: JSON.stringify({}) },
                                    querier_1.default.preparePreAPIHook({
                                        recipePreAPIHook: recipeImpleInput.preAPIHook,
                                        action: "SEND_VERIFY_EMAIL",
                                        options: options,
                                        userContext: userContext,
                                    }),
                                    querier_1.default.preparePostAPIHook({
                                        recipePostAPIHook: recipeImpleInput.postAPIHook,
                                        userContext: userContext,
                                        action: "SEND_VERIFY_EMAIL",
                                    })
                                ),
                            ];
                        case 1:
                            (_b = _c.sent()), (jsonBody = _b.jsonBody), (fetchResponse = _b.fetchResponse);
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
        getEmailVerificationTokenFromURL: function () {
            var token = (0, utils_1$2.getQueryParams)("token");
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
    const webJsImplementation = recipeImplementation$1.getRecipeImplementation(recipeInput);
    return {
        verifyEmail: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJsImplementation.verifyEmail.bind(this)(Object.assign({}, input));
                if (response.status === "OK") {
                    recipeInput.onHandleEvent({
                        action: "EMAIL_VERIFIED_SUCCESSFUL",
                        userContext: input.userContext,
                    });
                }
                return response;
            });
        },
        sendVerificationEmail: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJsImplementation.sendVerificationEmail.bind(this)(Object.assign({}, input));
                if (response.status === "OK") {
                    recipeInput.onHandleEvent({
                        action: "VERIFY_EMAIL_SENT",
                        userContext: input.userContext,
                    });
                }
                return response;
            });
        },
        isEmailVerified: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function* () {
                const response = yield webJsImplementation.isEmailVerified.bind(this)(Object.assign({}, input));
                return response;
            });
        },
        getEmailVerificationTokenFromURL: function (input) {
            return webJsImplementation.getEmailVerificationTokenFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}

var emailverification$1 = {};

var emailverification = {};

var recipe = {};

var sessionClaimValidatorStore = {};

/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
    let d = recipe$1.requireSessionClaimValidatorStore();
    if (d.default !== undefined) {
        __export(d);
    } else {
        __export({
            default: d,
            ...d,
        });
    }
})(sessionClaimValidatorStore);

var utils = {};

var __assign$3 =
    (recipe$1.commonjsGlobal && recipe$1.commonjsGlobal.__assign) ||
    function () {
        __assign$3 =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign$3.apply(this, arguments);
    };
Object.defineProperty(utils, "__esModule", { value: true });
utils.normaliseUserInput = void 0;
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
var utils_1$1 = utils$1.utils;
function normaliseUserInput(config) {
    var override = __assign$3(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return __assign$3(__assign$3({}, (0, utils_1$1.normaliseRecipeModuleConfig)(config)), { override: override });
}
utils.normaliseUserInput = normaliseUserInput;

var build = {};

var getProxyObject$1 = {};

var __assign$2 =
    (recipe$1.commonjsGlobal && recipe$1.commonjsGlobal.__assign) ||
    function () {
        __assign$2 =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign$2.apply(this, arguments);
    };
Object.defineProperty(getProxyObject$1, "__esModule", { value: true });
getProxyObject$1.getProxyObject = void 0;
function getProxyObject(orig) {
    var ret = __assign$2(__assign$2({}, orig), {
        _call: function (_, __) {
            throw new Error("This function should only be called through the recipe object");
        },
    });
    var keys = Object.keys(ret);
    var _loop_1 = function (k) {
        if (k !== "_call") {
            ret[k] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return this._call(k, args);
            };
        }
    };
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var k = keys_1[_i];
        _loop_1(k);
    }
    return ret;
}
getProxyObject$1.getProxyObject = getProxyObject;

Object.defineProperty(build, "__esModule", { value: true });
build.OverrideableBuilder = void 0;
var getProxyObject_1 = getProxyObject$1;
var OverrideableBuilder = /** @class */ (function () {
    function OverrideableBuilder(originalImplementation) {
        this.layers = [originalImplementation];
        this.proxies = [];
    }
    OverrideableBuilder.prototype.override = function (overrideFunc) {
        var proxy = (0, getProxyObject_1.getProxyObject)(this.layers[0]);
        var layer = overrideFunc(proxy, this);
        for (var _i = 0, _a = Object.keys(this.layers[0]); _i < _a.length; _i++) {
            var key = _a[_i];
            if (layer[key] === proxy[key] || key === "_call") {
                delete layer[key];
            } else if (layer[key] === undefined) {
                layer[key] = null;
            }
        }
        this.layers.push(layer);
        this.proxies.push(proxy);
        return this;
    };
    OverrideableBuilder.prototype.build = function () {
        var _this = this;
        if (this.result) {
            return this.result;
        }
        this.result = {};
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            for (var _b = 0, _c = Object.keys(layer); _b < _c.length; _b++) {
                var key = _c[_b];
                var override = layer[key];
                if (override !== undefined) {
                    if (override === null) {
                        this.result[key] = undefined;
                    } else if (typeof override === "function") {
                        this.result[key] = override.bind(this.result);
                    } else {
                        this.result[key] = override;
                    }
                }
            }
        }
        var _loop_1 = function (proxyInd) {
            var proxy = this_1.proxies[proxyInd];
            proxy._call = function (fname, args) {
                for (var i = proxyInd; i >= 0; --i) {
                    var func = _this.layers[i][fname];
                    if (func !== undefined && func !== null) {
                        return func.bind(_this.result).apply(void 0, args);
                    }
                }
            };
        };
        var this_1 = this;
        for (var proxyInd = 0; proxyInd < this.proxies.length; ++proxyInd) {
            _loop_1(proxyInd);
        }
        return this.result;
    };
    return OverrideableBuilder;
})();
build.OverrideableBuilder = OverrideableBuilder;
build.default = OverrideableBuilder;

var emailVerificationClaim = {};

var __extends =
    (recipe$1.commonjsGlobal && recipe$1.commonjsGlobal.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign$1 =
    (recipe$1.commonjsGlobal && recipe$1.commonjsGlobal.__assign) ||
    function () {
        __assign$1 =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign$1.apply(this, arguments);
    };
var __awaiter =
    (recipe$1.commonjsGlobal && recipe$1.commonjsGlobal.__awaiter) ||
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
    (recipe$1.commonjsGlobal && recipe$1.commonjsGlobal.__generator) ||
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
Object.defineProperty(emailVerificationClaim, "__esModule", { value: true });
emailVerificationClaim.EmailVerificationClaimClass = void 0;
var session_1 = index$2.session;
/**
 * We include "Class" in the class name, because it makes it easier to import/use the right thing (the instance exported by the recipe) instead of this.
 * */
var EmailVerificationClaimClass = /** @class */ (function (_super) {
    __extends(EmailVerificationClaimClass, _super);
    function EmailVerificationClaimClass(getRecipeImpl, updateContextOnIsVerifiedFalse) {
        var _this =
            _super.call(this, {
                id: "st-ev",
                refresh: function (userContext) {
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        getRecipeImpl().isEmailVerified({
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
            }) || this;
        _this.validators = __assign$1(__assign$1({}, _this.validators), {
            isVerified: function (refetchTimeOnFalseInSeconds, maxAgeInSeconds) {
                if (refetchTimeOnFalseInSeconds === void 0) {
                    refetchTimeOnFalseInSeconds = 10;
                }
                if (maxAgeInSeconds === void 0) {
                    maxAgeInSeconds = 300;
                }
                return {
                    id: _this.id,
                    refresh: _this.refresh,
                    shouldRefresh: function (payload, userContext) {
                        var value = _this.getValueFromPayload(payload, userContext);
                        return (
                            value === undefined ||
                            _this.getLastFetchedTime(payload, userContext) < Date.now() - maxAgeInSeconds * 1000 ||
                            (value === false &&
                                _this.getLastFetchedTime(payload, userContext) <
                                    Date.now() - refetchTimeOnFalseInSeconds * 1000)
                        );
                    },
                    validate: function (payload, userContext) {
                        return __awaiter(_this, void 0, void 0, function () {
                            var value;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        value = this.getValueFromPayload(payload, userContext);
                                        if (!(value !== true && updateContextOnIsVerifiedFalse !== undefined))
                                            return [3 /*break*/, 2];
                                        return [4 /*yield*/, updateContextOnIsVerifiedFalse(userContext)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        return [
                                            2 /*return*/,
                                            value === true
                                                ? { isValid: true }
                                                : {
                                                      isValid: false,
                                                      reason: {
                                                          message: "wrong value",
                                                          expectedValue: true,
                                                          actualValue: value,
                                                      },
                                                  },
                                        ];
                                }
                            });
                        });
                    },
                };
            },
        });
        return _this;
    }
    return EmailVerificationClaimClass;
})(session_1.BooleanClaim);
emailVerificationClaim.EmailVerificationClaimClass = EmailVerificationClaimClass;

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
var __assign =
    (recipe$1.commonjsGlobal && recipe$1.commonjsGlobal.__assign) ||
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
Object.defineProperty(recipe, "__esModule", { value: true });
recipe.Recipe = void 0;
var sessionClaimValidatorStore_1 = sessionClaimValidatorStore;
var utils_1 = utils;
var recipeImplementation_1 = recipeImplementation;
var supertokens_js_override_1 = build;
var utils_2 = recipe$1.utils;
var emailVerificationClaim_1 = emailVerificationClaim;
var postSuperTokensInitCallbacks_1 = sessionAuth.postSuperTokensInitCallbacks;
var Recipe = /** @class */ (function () {
    function Recipe(config) {
        this.config = (0, utils_1.normaliseUserInput)(config);
        var builder = new supertokens_js_override_1.default(
            (0, recipeImplementation_1.default)({
                recipeId: this.config.recipeId,
                appInfo: this.config.appInfo,
                preAPIHook: this.config.preAPIHook,
                postAPIHook: this.config.postAPIHook,
            })
        );
        this.recipeImplementation = builder.override(this.config.override.functions).build();
        postSuperTokensInitCallbacks_1.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            sessionClaimValidatorStore_1.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                Recipe.EmailVerificationClaim.validators.isVerified(10)
            );
        });
    }
    Recipe.init = function (config) {
        return function (appInfo) {
            Recipe.instance = new Recipe(
                __assign(__assign({}, config), { appInfo: appInfo, recipeId: Recipe.RECIPE_ID })
            );
            return Recipe.instance;
        };
    };
    Recipe.getInstanceOrThrow = function () {
        if (Recipe.instance === undefined) {
            var error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            error = (0, utils_2.checkForSSRErrorAndAppendIfNeeded)(error);
            throw Error(error);
        }
        return Recipe.instance;
    };
    Recipe.reset = function () {
        if (!(0, utils_2.isTest)()) {
            return;
        }
        Recipe.instance = undefined;
        return;
    };
    Recipe.RECIPE_ID = "emailverification";
    Recipe.EmailVerificationClaim = new emailVerificationClaim_1.EmailVerificationClaimClass(function () {
        return Recipe.getInstanceOrThrow().recipeImplementation;
    });
    return Recipe;
})();
recipe.Recipe = Recipe;
recipe.default = Recipe;

(function (exports) {
    var __assign =
        (recipe$1.commonjsGlobal && recipe$1.commonjsGlobal.__assign) ||
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EmailVerificationClaimClass =
        exports.EmailVerificationClaim =
        exports.getEmailVerificationTokenFromURL =
        exports.isEmailVerified =
        exports.sendVerificationEmail =
        exports.verifyEmail =
        exports.init =
            void 0;
    var recipe_1 = recipe;
    var utils_1 = recipe$1.utils;
    var emailVerificationClaim_1 = emailVerificationClaim;
    Object.defineProperty(exports, "EmailVerificationClaimClass", {
        enumerable: true,
        get: function () {
            return emailVerificationClaim_1.EmailVerificationClaimClass;
        },
    });
    var RecipeWrapper = /** @class */ (function () {
        function RecipeWrapper() {}
        RecipeWrapper.init = function (config) {
            return recipe_1.default.init(config);
        };
        /**
         * Verify an email
         *
         * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
         *
         * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
         *
         * @returns `{status: "OK"}` if successfull
         * @returns `{status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR"}` if token is invalid
         *
         * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
         */
        RecipeWrapper.verifyEmail = function (input) {
            return recipe_1.default.getInstanceOrThrow().recipeImplementation.verifyEmail(
                __assign(__assign({}, input), {
                    userContext: (0, utils_1.getNormalisedUserContext)(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        };
        /**
         * Send an email to the user for verification.
         *
         * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
         *
         * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
         *
         * @returns `{status: "OK"}` if successfull
         * @returns `{status: "EMAIL_ALREADY_VERIFIED_ERROR"}` if the email has already been verified
         *
         * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
         */
        RecipeWrapper.sendVerificationEmail = function (input) {
            return recipe_1.default.getInstanceOrThrow().recipeImplementation.sendVerificationEmail(
                __assign(__assign({}, input), {
                    userContext: (0, utils_1.getNormalisedUserContext)(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        };
        /**
         * Check if an email has been verified
         *
         * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
         *
         * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
         *
         * @returns `{status: "OK", isVerified: boolean}`
         *
         * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
         */
        RecipeWrapper.isEmailVerified = function (input) {
            return recipe_1.default.getInstanceOrThrow().recipeImplementation.isEmailVerified(
                __assign(__assign({}, input), {
                    userContext: (0, utils_1.getNormalisedUserContext)(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        };
        RecipeWrapper.getEmailVerificationTokenFromURL = function (input) {
            return recipe_1.default.getInstanceOrThrow().recipeImplementation.getEmailVerificationTokenFromURL(
                __assign(__assign({}, input), {
                    userContext: (0, utils_1.getNormalisedUserContext)(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        };
        RecipeWrapper.EmailVerificationClaim = recipe_1.default.EmailVerificationClaim;
        return RecipeWrapper;
    })();
    exports.default = RecipeWrapper;
    var init = RecipeWrapper.init;
    exports.init = init;
    var verifyEmail = RecipeWrapper.verifyEmail;
    exports.verifyEmail = verifyEmail;
    var sendVerificationEmail = RecipeWrapper.sendVerificationEmail;
    exports.sendVerificationEmail = sendVerificationEmail;
    var isEmailVerified = RecipeWrapper.isEmailVerified;
    exports.isEmailVerified = isEmailVerified;
    var getEmailVerificationTokenFromURL = RecipeWrapper.getEmailVerificationTokenFromURL;
    exports.getEmailVerificationTokenFromURL = getEmailVerificationTokenFromURL;
    var EmailVerificationClaim = RecipeWrapper.EmailVerificationClaim;
    exports.EmailVerificationClaim = EmailVerificationClaim;
})(emailverification);

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
    __export(emailverification);
})(emailverification$1);

let EmailVerification$1 = class EmailVerification extends sessionAuth.RecipeModule {
    constructor(config) {
        super(normaliseEmailVerificationFeature(config));
        this.getFeatures = () => {
            const features = {};
            if (this.config.disableDefaultUI !== true) {
                const normalisedFullPath = this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(this.config.recipeId),
                    component: (props) => this.getFeatureComponent("emailverification", props),
                };
            }
            return features;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.getFeatureComponent = (_, props) => {
            return jsxRuntime.jsx(
                sessionAuth.UserContextWrapper,
                Object.assign(
                    { userContext: props.userContext },
                    {
                        children: jsxRuntime.jsx(
                            session.SessionAuth,
                            Object.assign(
                                { requireAuth: false, overrideGlobalClaimValidators: () => [] },
                                {
                                    children: jsxRuntime.jsx(sessionAuth.UserContextContext.Consumer, {
                                        children: (value) => {
                                            return jsxRuntime.jsx(
                                                EmailVerification$2,
                                                Object.assign(
                                                    { recipe: this },
                                                    Object.assign(Object.assign({}, props), {
                                                        // We do this to make sure it does not add another provider
                                                        userContext: value,
                                                    })
                                                )
                                            );
                                        },
                                    }),
                                }
                            )
                        ),
                    }
                )
            );
        };
        this.getDefaultRedirectionURL = (context) =>
            sessionAuth.__awaiter(this, void 0, void 0, function* () {
                if (context.action === "VERIFY_EMAIL") {
                    const verifyEmailPath = new sessionAuth.NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH);
                    return `${this.config.appInfo.websiteBasePath
                        .appendPath(verifyEmailPath)
                        .getAsStringDangerous()}?rid=${this.config.recipeId}`;
                } else {
                    return "/";
                }
            });
        {
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
        sessionAuth.postSuperTokensInitCallbacks$1.PostSuperTokensInitCallbacks.addPostInitCallback(() => {
            sessionClaimValidatorStore.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                EmailVerification$1.EmailVerificationClaim.validators.isVerified(10)
            );
        });
    }
    static init(config) {
        return (appInfo) => {
            EmailVerification$1.instance = new EmailVerification$1(
                Object.assign(Object.assign({}, config), { appInfo, recipeId: EmailVerification$1.RECIPE_ID })
            );
            return EmailVerification$1.instance;
        };
    }
    static getInstanceOrThrow() {
        if (EmailVerification$1.instance === undefined) {
            let error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailVerification$1.instance;
    }
    isEmailVerified(userContext) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return yield this.recipeImpl.isEmailVerified({
                userContext,
            });
        });
    }
};
EmailVerification$1.RECIPE_ID = "emailverification";
EmailVerification$1.EmailVerificationClaim = new emailverification$1.EmailVerificationClaimClass(
    () => EmailVerification$1.getInstanceOrThrow().recipeImpl,
    (userContext) =>
        sessionAuth.__awaiter(void 0, void 0, void 0, function* () {
            const recipe = EmailVerification$1.getInstanceOrThrow();
            if (recipe.config.mode === "REQUIRED") {
                sessionAuth.saveInvalidClaimRedirectPathInContext(
                    userContext,
                    yield recipe.getRedirectUrl({ action: "VERIFY_EMAIL" })
                );
            }
        })
);

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
class Wrapper {
    static init(config) {
        return EmailVerification$1.init(config);
    }
    static isEmailVerified(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return EmailVerification$1.getInstanceOrThrow().recipeImpl.isEmailVerified(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
    static verifyEmail(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return EmailVerification$1.getInstanceOrThrow().recipeImpl.verifyEmail(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
    static sendVerificationEmail(input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function* () {
            return EmailVerification$1.getInstanceOrThrow().recipeImpl.sendVerificationEmail(
                Object.assign(Object.assign({}, input), {
                    userContext: sessionAuth.getNormalisedUserContext(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        });
    }
    static getEmailVerificationTokenFromURL(input) {
        return EmailVerification$1.getInstanceOrThrow().recipeImpl.getEmailVerificationTokenFromURL(
            Object.assign(Object.assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    }
}
Wrapper.EmailVerification = (prop) =>
    EmailVerification$1.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
Wrapper.EmailVerificationTheme = EmailVerificationThemeWrapper;
Wrapper.EmailVerificationClaim = EmailVerification$1.EmailVerificationClaim;
const init = Wrapper.init;
const isEmailVerified = Wrapper.isEmailVerified;
const verifyEmail = Wrapper.verifyEmail;
const sendVerificationEmail = Wrapper.sendVerificationEmail;
const EmailVerification = Wrapper.EmailVerification;
const getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
const EmailVerificationClaim = EmailVerification$1.EmailVerificationClaim;

exports.EmailVerification = EmailVerification;
exports.EmailVerificationClaim = EmailVerificationClaim;
exports.EmailVerificationTheme = EmailVerificationThemeWrapper;
exports.default = Wrapper;
exports.getEmailVerificationTokenFromURL = getEmailVerificationTokenFromURL;
exports.init = init;
exports.isEmailVerified = isEmailVerified;
exports.sendVerificationEmail = sendVerificationEmail;
exports.verifyEmail = verifyEmail;
//# sourceMappingURL=emailverification.js.map
