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
function ArrowRightIcon(_a) {
    var color = _a.color;
    return jsxRuntime.jsx(
        "svg",
        sessionAuth.__assign(
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

var EmailVerificationSendVerifyEmail = function (props) {
    var t = translationContext.useTranslation();
    var userContext = sessionAuth.useUserContext();
    var _a = React.useState("READY"),
        status = _a[0],
        setStatus = _a[1];
    var _b = React.useState(undefined),
        errorMessage = _b[0],
        setErrorMessage = _b[1];
    var resendEmail = function () {
        return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
            var response, e_1;
            return sessionAuth.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [
                            4 /*yield*/,
                            props.recipeImplementation.sendVerificationEmail({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        response = _a.sent();
                        if (!(response.status === "EMAIL_ALREADY_VERIFIED_ERROR")) return [3 /*break*/, 3];
                        return [4 /*yield*/, props.onEmailAlreadyVerified()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (response.status === "OK") {
                            setStatus("EMAIL_RESENT");
                        }
                        _a.label = 4;
                    case 4:
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        if (index.STGeneralError.isThisError(e_1)) {
                            setErrorMessage(e_1.message);
                        }
                        setStatus("ERROR");
                        return [2 /*return*/, handleSendError()];
                    case 6:
                        return [2 /*return*/];
                }
            });
        });
    };
    var logout = function () {
        return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
            var e_2;
            return sessionAuth.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, props.signOut()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        if (index.STGeneralError.isThisError(e_2)) {
                            setErrorMessage(e_2.message);
                        }
                        setStatus("ERROR");
                        return [3 /*break*/, 3];
                    case 3:
                        return [2 /*return*/];
                }
            });
        });
    };
    var sendVerificationEmail = React.useCallback(
        function () {
            return props.recipeImplementation.sendVerificationEmail({
                userContext: userContext,
            });
        },
        [props.config, props.recipeImplementation]
    );
    var checkSendResponse = React.useCallback(
        function (response) {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(response.status === "EMAIL_ALREADY_VERIFIED_ERROR")) return [3 /*break*/, 2];
                            return [4 /*yield*/, props.onEmailAlreadyVerified()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.config, props.recipeImplementation, props.onEmailAlreadyVerified]
    );
    var handleSendError = React.useCallback(function () {
        return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            sessionAuth.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
                        ];
                    case 1:
                        if (!(_a.sent() !== true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, props.redirectToAuth()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    sessionAuth.useOnMountAPICall(sendVerificationEmail, checkSendResponse, handleSendError);
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
                                status === "ERROR" &&
                                    jsxRuntime.jsx(index.GeneralError, {
                                        error: errorMessage === undefined ? "SOMETHING_WENT_WRONG_ERROR" : errorMessage,
                                    }),
                                status === "EMAIL_RESENT" &&
                                    jsxRuntime.jsx(
                                        "div",
                                        sessionAuth.__assign(
                                            { "data-supertokens": "generalSuccess" },
                                            { children: t("EMAIL_VERIFICATION_RESEND_SUCCESS") }
                                        )
                                    ),
                                jsxRuntime.jsx(
                                    "div",
                                    sessionAuth.__assign(
                                        { "data-supertokens": "sendVerifyEmailIcon" },
                                        { children: jsxRuntime.jsx(utils$1.EmailLargeIcon, {}) }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    sessionAuth.__assign(
                                        { "data-supertokens": "headerTitle headerTinyTitle" },
                                        { children: t("EMAIL_VERIFICATION_SEND_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsxs(
                                    "div",
                                    sessionAuth.__assign(
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
                                        sessionAuth.__assign(
                                            { "data-supertokens": "link sendVerifyEmailResend", onClick: resendEmail },
                                            { children: t("EMAIL_VERIFICATION_RESEND_BTN") }
                                        )
                                    ),
                                jsxRuntime.jsxs(
                                    "div",
                                    sessionAuth.__assign(
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
var SendVerifyEmail = index.withOverride("EmailVerificationSendVerifyEmail", EmailVerificationSendVerifyEmail);

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
        sessionAuth.__assign(
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
                            sessionAuth.__assign(
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
                            sessionAuth.__assign(
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
                                        sessionAuth.__assign({ x: "0", y: "0" }, { children: "!" })
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

var EmailVerificationVerifyEmailLinkClicked = function (props) {
    var t = translationContext.useTranslation();
    var sessionContext = session.useSessionContext();
    var userContext = sessionAuth.useUserContext();
    var _a = React.useState("LOADING"),
        status = _a[0],
        setStatus = _a[1];
    var _b = React.useState(undefined),
        errorMessage = _b[0],
        setErrorMessage = _b[1];
    var _c = React.useState(false),
        verifyLoading = _c[0],
        setVerifyLoading = _c[1];
    var verifyEmailOnMount = React.useCallback(
        function () {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    if (sessionContext.loading === true) {
                        // This callback should only be called if the session is already loaded
                        throw new Error("Should never come here");
                    }
                    // If there is no active session we know that the verification was started elsewhere, since it requires a session
                    // otherwise we assume it's the same session. The main purpose of this is to prevent mail scanners
                    // from accidentally validating an email address
                    if (!sessionContext.doesSessionExist) {
                        return [2 /*return*/, "INTERACTION_REQUIRED"];
                    }
                    return [
                        2 /*return*/,
                        props.recipeImplementation.verifyEmail({
                            userContext: userContext,
                        }),
                    ];
                });
            });
        },
        [props.recipeImplementation, sessionContext]
    );
    var handleVerifyResp = React.useCallback(
        function (response) {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    if (response === "INTERACTION_REQUIRED") {
                        setStatus("INTERACTION_REQUIRED");
                    } else if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                        setStatus("INVALID");
                    } else {
                        setStatus("SUCCESSFUL");
                    }
                    return [2 /*return*/];
                });
            });
        },
        [setStatus]
    );
    var handleError = React.useCallback(
        function (err) {
            if (index.STGeneralError.isThisError(err)) {
                setErrorMessage(err.message);
            }
            setStatus("GENERAL_ERROR");
        },
        [setStatus, setErrorMessage]
    );
    sessionAuth.useOnMountAPICall(verifyEmailOnMount, handleVerifyResp, handleError, sessionContext.loading === false);
    var onTokenInvalidRedirect = props.onTokenInvalidRedirect,
        onSuccess = props.onSuccess;
    if (status === "LOADING") {
        return jsxRuntime.jsx(
            "div",
            sessionAuth.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsx(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: jsxRuntime.jsx(
                                    "div",
                                    sessionAuth.__assign(
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
            sessionAuth.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        sessionAuth.__assign(
                                            { "data-supertokens": "headerTitle" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        sessionAuth.__assign(
                                            { "data-supertokens": "headerSubtitle secondaryText" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_DESC") }
                                        )
                                    ),
                                    jsxRuntime.jsx(button.Button, {
                                        isLoading: verifyLoading,
                                        onClick: function () {
                                            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                                                var resp, err_1;
                                                return sessionAuth.__generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            setVerifyLoading(true);
                                                            _a.label = 1;
                                                        case 1:
                                                            _a.trys.push([1, 4, , 5]);
                                                            return [
                                                                4 /*yield*/,
                                                                props.recipeImplementation.verifyEmail({
                                                                    userContext: userContext,
                                                                }),
                                                            ];
                                                        case 2:
                                                            resp = _a.sent();
                                                            return [4 /*yield*/, handleVerifyResp(resp)];
                                                        case 3:
                                                            _a.sent();
                                                            return [3 /*break*/, 5];
                                                        case 4:
                                                            err_1 = _a.sent();
                                                            void handleError(err_1);
                                                            return [3 /*break*/, 5];
                                                        case 5:
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            });
                                        },
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
            sessionAuth.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(utils$1.CheckedRoundIcon, {}),
                                    jsxRuntime.jsx(
                                        "div",
                                        sessionAuth.__assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_SUCCESS") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        sessionAuth.__assign(
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
            sessionAuth.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        sessionAuth.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        sessionAuth.__assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_EXPIRED") }
                                        )
                                    ),
                                    jsxRuntime.jsxs(
                                        "div",
                                        sessionAuth.__assign(
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
        sessionAuth.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    sessionAuth.__assign(
                        { "data-supertokens": "row noFormRow" },
                        {
                            children: [
                                jsxRuntime.jsxs(
                                    "div",
                                    sessionAuth.__assign(
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
                                    sessionAuth.__assign(
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
var VerifyEmailLinkClicked = index.withOverride(
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
        return jsxRuntime.jsx(SendVerifyEmail, sessionAuth.__assign({}, props.sendVerifyEmailScreen));
    }
    // Otherwise, return VerifyEmailLinkClicked.
    return jsxRuntime.jsx(VerifyEmailLinkClicked, sessionAuth.__assign({}, props.verifyEmailLinkClickedScreen));
}
function EmailVerificationThemeWrapper(props) {
    var hasFont = index.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        sessionAuth.UserContextWrapper,
        sessionAuth.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    sessionAuth.__assign(
                        {
                            loadDefaultFont: !hasFont,
                            userStyles: [
                                props.config.rootStyle,
                                props.verifyEmailLinkClickedScreen === undefined
                                    ? props.config.sendVerifyEmailScreen.style
                                    : props.config.verifyEmailLinkClickedScreen.style,
                            ],
                        },
                        { children: jsxRuntime.jsx(EmailVerificationTheme, sessionAuth.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

var EmailVerification$2 = function (props) {
    var _a;
    var sessionContext = React.useContext(sessionAuth.SessionContext);
    var _b = React.useState("LOADING"),
        status = _b[0],
        setStatus = _b[1];
    var userContext = sessionAuth.useUserContext();
    var redirectToAuthWithHistory = React.useCallback(
        function () {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                index$1.redirectToAuth({ redirectBack: false, history: props.history }),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.history]
    );
    var modifiedRecipeImplementation = React.useMemo(
        function () {
            return sessionAuth.__assign(sessionAuth.__assign({}, props.recipe.recipeImpl), {
                sendVerificationEmail: function (input) {
                    return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                        var response;
                        return sessionAuth.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, props.recipe.recipeImpl.sendVerificationEmail(input)];
                                case 1:
                                    response = _a.sent();
                                    sessionAuth.clearQueryParams(["token"]);
                                    return [2 /*return*/, response];
                            }
                        });
                    });
                },
            });
        },
        [props.recipe]
    );
    var onSuccess = React.useCallback(
        function () {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        sessionAuth.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            undefined,
                            userContext,
                            props.history
                        ),
                    ];
                });
            });
        },
        [props.recipe, props.history, userContext]
    );
    var fetchIsEmailVerified = React.useCallback(
        function () {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                var token;
                var _a;
                return sessionAuth.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (sessionContext.loading === true) {
                                // This callback should only be called if the session is already loaded
                                throw new Error("Should never come here");
                            }
                            token =
                                (_a = sessionAuth.getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
                            if (!(token === undefined)) return [3 /*break*/, 4];
                            if (!!sessionContext.doesSessionExist) return [3 /*break*/, 2];
                            return [4 /*yield*/, redirectToAuthWithHistory()];
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            return [4 /*yield*/, props.recipe.recipeImpl.isEmailVerified({ userContext: userContext })];
                        case 3:
                            // we check if the email is already verified, and if it is, then we redirect the user
                            return [2 /*return*/, _b.sent().isVerified];
                        case 4:
                            return [2 /*return*/, false];
                    }
                });
            });
        },
        [props.recipe, sessionContext, redirectToAuthWithHistory]
    );
    var checkIsEmailVerified = React.useCallback(
        function (isVerified) {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    if (isVerified) {
                        return [2 /*return*/, onSuccess()];
                    }
                    setStatus("READY");
                    return [2 /*return*/];
                });
            });
        },
        [props.recipe, setStatus, onSuccess]
    );
    var handleError = React.useCallback(
        function (err) {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                sessionAuth.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
                            ];
                        case 1:
                            if (!_a.sent()) return [3 /*break*/, 2];
                            throw err;
                        case 2:
                            return [4 /*yield*/, redirectToAuthWithHistory()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [redirectToAuthWithHistory]
    );
    sessionAuth.useOnMountAPICall(
        fetchIsEmailVerified,
        checkIsEmailVerified,
        handleError,
        sessionContext.loading === false
    );
    var signOut = React.useCallback(
        function () {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                var session;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = sessionAuth.Session.getInstanceOrThrow();
                            return [4 /*yield*/, session.signOut(props.userContext)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, redirectToAuthWithHistory()];
                    }
                });
            });
        },
        [props.recipe, redirectToAuthWithHistory]
    );
    if (status === "LOADING") {
        return jsxRuntime.jsx(React.Fragment, {});
    }
    var componentOverrides = props.recipe.config.override.components;
    var sendVerifyEmailScreenFeature = props.recipe.config.sendVerifyEmailScreen;
    var sendVerifyEmailScreen = {
        styleFromInit: sendVerifyEmailScreenFeature.style,
        recipeImplementation: modifiedRecipeImplementation,
        config: props.recipe.config,
        signOut: signOut,
        onEmailAlreadyVerified: onSuccess,
        redirectToAuth: redirectToAuthWithHistory,
    };
    var verifyEmailLinkClickedScreenFeature = props.recipe.config.verifyEmailLinkClickedScreen;
    var token = (_a = sessionAuth.getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
    var verifyEmailLinkClickedScreen =
        token === undefined
            ? undefined
            : {
                  styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                  onTokenInvalidRedirect: redirectToAuthWithHistory,
                  onSuccess: onSuccess,
                  recipeImplementation: modifiedRecipeImplementation,
                  config: props.recipe.config,
                  token: token,
              };
    var childProps = {
        config: props.recipe.config,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
        hasToken: token !== undefined,
    };
    return jsxRuntime.jsx(
        index.ComponentOverrideContext.Provider,
        sessionAuth.__assign(
            { value: componentOverrides },
            {
                children: jsxRuntime.jsx(
                    index.FeatureWrapper,
                    sessionAuth.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: translations.defaultTranslationsEmailVerification,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            EmailVerificationThemeWrapper,
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
var DEFAULT_VERIFY_EMAIL_PATH = "/verify-email";

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
    var disableDefaultUI = config.disableDefaultUI === true;
    var mode = config.mode === undefined ? "REQUIRED" : config.mode;
    var sendVerifyEmailScreenStyle =
        config.sendVerifyEmailScreen !== undefined && config.sendVerifyEmailScreen.style !== undefined
            ? config.sendVerifyEmailScreen.style
            : "";
    var sendVerifyEmailScreen = {
        style: sendVerifyEmailScreenStyle,
    };
    var verifyEmailLinkClickedScreenStyle =
        config.verifyEmailLinkClickedScreen !== undefined && config.verifyEmailLinkClickedScreen.style !== undefined
            ? config.verifyEmailLinkClickedScreen.style
            : "";
    var verifyEmailLinkClickedScreen = {
        style: verifyEmailLinkClickedScreenStyle,
    };
    var override = sessionAuth.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
        },
        config.override
    );
    return sessionAuth.__assign(sessionAuth.__assign({}, sessionAuth.normaliseRecipeModuleConfig(config)), {
        disableDefaultUI: disableDefaultUI,
        mode: mode,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
        override: override,
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
    var webJsImplementation = recipeImplementation$1.getRecipeImplementation(recipeInput);
    return {
        verifyEmail: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.verifyEmail.bind(this)(sessionAuth.__assign({}, input)),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "EMAIL_VERIFIED_SUCCESSFUL",
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        sendVerificationEmail: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.sendVerificationEmail.bind(this)(sessionAuth.__assign({}, input)),
                            ];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                recipeInput.onHandleEvent({
                                    action: "VERIFY_EMAIL_SENT",
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        isEmailVerified: function (input) {
            return sessionAuth.__awaiter(this, void 0, void 0, function () {
                var response;
                return sessionAuth.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.isEmailVerified.bind(this)(sessionAuth.__assign({}, input)),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
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
    var override = __assign$2(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return __assign$2(__assign$2({}, (0, utils_1$1.normaliseRecipeModuleConfig)(config)), { override: override });
}
utils.normaliseUserInput = normaliseUserInput;

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
var supertokens_js_override_1 = index.build;
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

var EmailVerification$1 = /** @class */ (function (_super) {
    sessionAuth.__extends(EmailVerification, _super);
    function EmailVerification(config) {
        var _this = _super.call(this, normaliseEmailVerificationFeature(config)) || this;
        _this.getFeatures = function () {
            var features = {};
            if (_this.config.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new sessionAuth.NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: sessionAuth.matchRecipeIdUsingQueryParams(_this.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("emailverification", props);
                    },
                };
            }
            return features;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _this.getFeatureComponent = function (_, props) {
            return jsxRuntime.jsx(
                sessionAuth.UserContextWrapper,
                sessionAuth.__assign(
                    { userContext: props.userContext },
                    {
                        children: jsxRuntime.jsx(
                            session.SessionAuth,
                            sessionAuth.__assign(
                                {
                                    requireAuth: false,
                                    overrideGlobalClaimValidators: function () {
                                        return [];
                                    },
                                },
                                {
                                    children: jsxRuntime.jsx(sessionAuth.UserContextContext.Consumer, {
                                        children: function (value) {
                                            return jsxRuntime.jsx(
                                                EmailVerification$2,
                                                sessionAuth.__assign(
                                                    { recipe: _this },
                                                    sessionAuth.__assign(sessionAuth.__assign({}, props), {
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
        _this.getDefaultRedirectionURL = function (context) {
            return sessionAuth.__awaiter(_this, void 0, void 0, function () {
                var verifyEmailPath;
                return sessionAuth.__generator(this, function (_b) {
                    if (context.action === "VERIFY_EMAIL") {
                        verifyEmailPath = new sessionAuth.NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH);
                        return [
                            2 /*return*/,
                            ""
                                .concat(
                                    this.config.appInfo.websiteBasePath
                                        .appendPath(verifyEmailPath)
                                        .getAsStringDangerous(),
                                    "?rid="
                                )
                                .concat(this.config.recipeId),
                        ];
                    } else {
                        return [2 /*return*/, "/"];
                    }
                });
            });
        };
        {
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
        }
        sessionAuth.postSuperTokensInitCallbacks$1.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            sessionClaimValidatorStore.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
                EmailVerification.EmailVerificationClaim.validators.isVerified(10)
            );
        });
        return _this;
    }
    EmailVerification.init = function (config) {
        return function (appInfo) {
            EmailVerification.instance = new EmailVerification(
                sessionAuth.__assign(sessionAuth.__assign({}, config), {
                    appInfo: appInfo,
                    recipeId: EmailVerification.RECIPE_ID,
                })
            );
            return EmailVerification.instance;
        };
    };
    EmailVerification.getInstanceOrThrow = function () {
        if (EmailVerification.instance === undefined) {
            var error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + sessionAuth.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailVerification.instance;
    };
    EmailVerification.prototype.isEmailVerified = function (userContext) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            this.recipeImpl.isEmailVerified({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    var _a;
    _a = EmailVerification;
    EmailVerification.RECIPE_ID = "emailverification";
    EmailVerification.EmailVerificationClaim = new emailverification$1.EmailVerificationClaimClass(
        function () {
            return EmailVerification.getInstanceOrThrow().recipeImpl;
        },
        function (userContext) {
            return sessionAuth.__awaiter(void 0, void 0, void 0, function () {
                var recipe, _b, _c;
                return sessionAuth.__generator(_a, function (_d) {
                    switch (_d.label) {
                        case 0:
                            recipe = EmailVerification.getInstanceOrThrow();
                            if (!(recipe.config.mode === "REQUIRED")) return [3 /*break*/, 2];
                            _b = sessionAuth.saveInvalidClaimRedirectPathInContext;
                            _c = [userContext];
                            return [4 /*yield*/, recipe.getRedirectUrl({ action: "VERIFY_EMAIL" })];
                        case 1:
                            _b.apply(void 0, _c.concat([_d.sent()]));
                            _d.label = 2;
                        case 2:
                            return [2 /*return*/];
                    }
                });
            });
        }
    );
    return EmailVerification;
})(sessionAuth.RecipeModule);

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
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return EmailVerification$1.init(config);
    };
    Wrapper.isEmailVerified = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    EmailVerification$1.getInstanceOrThrow().recipeImpl.isEmailVerified(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.verifyEmail = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    EmailVerification$1.getInstanceOrThrow().recipeImpl.verifyEmail(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.sendVerificationEmail = function (input) {
        return sessionAuth.__awaiter(this, void 0, void 0, function () {
            return sessionAuth.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    EmailVerification$1.getInstanceOrThrow().recipeImpl.sendVerificationEmail(
                        sessionAuth.__assign(sessionAuth.__assign({}, input), {
                            userContext: sessionAuth.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getEmailVerificationTokenFromURL = function (input) {
        return EmailVerification$1.getInstanceOrThrow().recipeImpl.getEmailVerificationTokenFromURL(
            sessionAuth.__assign(sessionAuth.__assign({}, input), {
                userContext: sessionAuth.getNormalisedUserContext(
                    input === null || input === void 0 ? void 0 : input.userContext
                ),
            })
        );
    };
    Wrapper.EmailVerification = function (prop) {
        return EmailVerification$1.getInstanceOrThrow().getFeatureComponent("emailverification", prop);
    };
    Wrapper.EmailVerificationTheme = EmailVerificationThemeWrapper;
    Wrapper.EmailVerificationClaim = EmailVerification$1.EmailVerificationClaim;
    return Wrapper;
})();
var init = Wrapper.init;
var isEmailVerified = Wrapper.isEmailVerified;
var verifyEmail = Wrapper.verifyEmail;
var sendVerificationEmail = Wrapper.sendVerificationEmail;
var EmailVerification = Wrapper.EmailVerification;
var getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
var EmailVerificationClaim = EmailVerification$1.EmailVerificationClaim;

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
