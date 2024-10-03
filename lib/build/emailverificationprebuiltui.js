"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var uiEntry = require("./index2.js");
var session = require("./session.js");
var recipe = require("./emailverification-shared.js");
var React = require("react");
var types = require("./multifactorauth-shared.js");
var translations = require("./emailverification-shared2.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var emailLargeIcon = require("./emailLargeIcon.js");
var translationContext = require("./translationContext.js");
var button = require("./emailpassword-shared.js");
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
require("supertokens-web-js/recipe/session");
require("./session-shared.js");
require("supertokens-web-js/recipe/emailverification");

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
        genericComponentOverrideContext.__assign(
            { width: "6", height: "8", viewBox: "0 0 6 8", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: jsxRuntime.jsx("path", {
                    d: "M5.62713 3.24407C6.08759 3.64284 6.08759 4.35716 5.62713 4.75593L2.15465 7.76318C1.50701 8.32406 0.5 7.864 0.5 7.00725L0.5 0.992749C0.5 0.135997 1.50701 -0.324056 2.15465 0.23682L5.62713 3.24407Z",
                    fill: "".concat(color),
                }),
            }
        )
    );
}

var EmailVerificationSendVerifyEmail = function (props) {
    var t = translationContext.useTranslation();
    var userContext = uiEntry.useUserContext();
    var _a = React.useState("READY"),
        status = _a[0],
        setStatus = _a[1];
    var _b = React.useState(undefined),
        errorMessage = _b[0],
        setErrorMessage = _b[1];
    var resendEmail = function () {
        return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
            var response, e_1;
            return genericComponentOverrideContext.__generator(this, function (_a) {
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
                        if (STGeneralError__default.default.isThisError(e_1)) {
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
        return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
            var e_2;
            return genericComponentOverrideContext.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, props.signOut()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        if (STGeneralError__default.default.isThisError(e_2)) {
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
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
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
        return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
            return genericComponentOverrideContext.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            types.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
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
    genericComponentOverrideContext.useOnMountAPICall(sendVerificationEmail, checkSendResponse, handleSendError);
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
                                status === "ERROR" &&
                                    jsxRuntime.jsx(uiEntry.GeneralError, {
                                        error: errorMessage === undefined ? "SOMETHING_WENT_WRONG_ERROR" : errorMessage,
                                    }),
                                status === "EMAIL_RESENT" &&
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "generalSuccess" },
                                            { children: t("EMAIL_VERIFICATION_RESEND_SUCCESS") }
                                        )
                                    ),
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "sendVerifyEmailIcon" },
                                        { children: jsxRuntime.jsx(emailLargeIcon.EmailLargeIcon, {}) }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "headerTitle headerTinyTitle" },
                                        { children: t("EMAIL_VERIFICATION_SEND_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsx("div", { "data-supertokens": "divider" }),
                                jsxRuntime.jsxs(
                                    "div",
                                    genericComponentOverrideContext.__assign(
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
                                jsxRuntime.jsxs(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "buttonWithArrow", onClick: logout },
                                        {
                                            children: [
                                                jsxRuntime.jsx(
                                                    "div",
                                                    genericComponentOverrideContext.__assign(
                                                        {
                                                            "data-supertokens":
                                                                "secondaryText secondaryLinkWithRightArrow",
                                                        },
                                                        { children: t("EMAIL_VERIFICATION_LOGOUT") }
                                                    )
                                                ),
                                                jsxRuntime.jsx(ArrowRightIcon, {
                                                    color: "rgb(var(--palette-textGray))",
                                                }),
                                            ],
                                        }
                                    )
                                ),
                                status !== "EMAIL_RESENT" &&
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "link sendVerifyEmailResend", onClick: resendEmail },
                                            { children: t("EMAIL_VERIFICATION_RESEND_BTN") }
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
var SendVerifyEmail = uiEntry.withOverride("EmailVerificationSendVerifyEmail", EmailVerificationSendVerifyEmail);

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
function CheckedRoundIcon() {
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "33",
                height: "33",
                viewBox: "0 0 33 33",
                "data-supertokens": "checkedRoundIcon",
            },
            {
                children: jsxRuntime.jsxs(
                    "g",
                    genericComponentOverrideContext.__assign(
                        { fill: "rgb(var(--palette-success))", stroke: "rgb(var(--palette-success))" },
                        {
                            children: [
                                jsxRuntime.jsx("path", {
                                    d: "M6.715 15.334a1.135 1.135 0 0 1 1.605-1.605l4.558 4.558 9.573-9.573a1.135 1.135 0 0 1 1.605 1.605L13.748 20.627a1.231 1.231 0 0 1-1.741 0z",
                                    transform: "translate(-.5 -.5) translate(1.242 1.703)",
                                }),
                                jsxRuntime.jsx("path", {
                                    fillRule: "evenodd",
                                    d: "M17 1a16 16 0 1 0 16 16A16 16 0 0 0 17 1zM3.462 17A13.538 13.538 0 1 1 17 30.538 13.538 13.538 0 0 1 3.462 17z",
                                    transform: "translate(-.5 -.5)",
                                }),
                            ],
                        }
                    )
                ),
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
function ErrorLargeIcon() {
    return jsxRuntime.jsx(
        "svg",
        genericComponentOverrideContext.__assign(
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
                            genericComponentOverrideContext.__assign(
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
                            genericComponentOverrideContext.__assign(
                                {
                                    fill: "#fff",
                                    "font-family": "Arial-Bold, Arial",
                                    "font-size": "18px",
                                    fontWeight: "700",
                                    transform: "translate(-824.894 -352.483) translate(838.997 377.437)",
                                },
                                {
                                    children: jsxRuntime.jsx(
                                        "tspan",
                                        genericComponentOverrideContext.__assign({ x: "0", y: "0" }, { children: "!" })
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
    var sessionContext = uiEntry.useSessionContext();
    var userContext = uiEntry.useUserContext();
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
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
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
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
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
            if (STGeneralError__default.default.isThisError(err)) {
                setErrorMessage(err.message);
            }
            setStatus("GENERAL_ERROR");
        },
        [setStatus, setErrorMessage]
    );
    genericComponentOverrideContext.useOnMountAPICall(
        verifyEmailOnMount,
        handleVerifyResp,
        handleError,
        sessionContext.loading === false
    );
    var onTokenInvalidRedirect = props.onTokenInvalidRedirect,
        onSuccess = props.onSuccess;
    if (status === "LOADING") {
        return jsxRuntime.jsx(
            "div",
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsx(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: jsxRuntime.jsx(
                                    "div",
                                    genericComponentOverrideContext.__assign(
                                        { "data-supertokens": "spinner" },
                                        { children: jsxRuntime.jsx(uiEntry.SpinnerIcon, {}) }
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
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "headerTitle" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "headerSubtitle secondaryText" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_DESC") }
                                        )
                                    ),
                                    jsxRuntime.jsx(button.Button, {
                                        isLoading: verifyLoading,
                                        onClick: function () {
                                            return genericComponentOverrideContext.__awaiter(
                                                void 0,
                                                void 0,
                                                void 0,
                                                function () {
                                                    var resp, err_1;
                                                    return genericComponentOverrideContext.__generator(
                                                        this,
                                                        function (_a) {
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
                                                        }
                                                    );
                                                }
                                            );
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
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(CheckedRoundIcon, {}),
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_SUCCESS") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
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
            genericComponentOverrideContext.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_EXPIRED") }
                                        )
                                    ),
                                    jsxRuntime.jsxs(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            {
                                                onClick: onTokenInvalidRedirect,
                                                "data-supertokens": "secondaryText secondaryLinkWithArrow",
                                            },
                                            {
                                                children: [
                                                    t("EMAIL_VERIFICATION_CONTINUE_LINK"),
                                                    " ",
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
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    genericComponentOverrideContext.__assign(
                        { "data-supertokens": "row noFormRow" },
                        {
                            children: [
                                jsxRuntime.jsxs(
                                    "div",
                                    genericComponentOverrideContext.__assign(
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
                                    genericComponentOverrideContext.__assign(
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
var VerifyEmailLinkClicked = uiEntry.withOverride(
    "EmailVerificationVerifyEmailLinkClicked",
    EmailVerificationVerifyEmailLinkClicked
);

function EmailVerificationTheme(props) {
    var sessionContext = session.useSessionContext();
    // If we have a token, return VerifyEmailLinkClicked.
    if (props.verifyEmailLinkClickedScreen !== undefined) {
        return jsxRuntime.jsx(
            VerifyEmailLinkClicked,
            genericComponentOverrideContext.__assign({}, props.verifyEmailLinkClickedScreen)
        );
    }
    // If we have an active session, we want to send the verification email
    if (sessionContext.loading === false && sessionContext.doesSessionExist === true) {
        return jsxRuntime.jsx(
            SendVerifyEmail,
            genericComponentOverrideContext.__assign({}, props.sendVerifyEmailScreen)
        );
    }
    // Otherwise, return an empty screen, waiting for the feature component to redirection to complete.
    return jsxRuntime.jsx(jsxRuntime.Fragment, {});
}
function EmailVerificationThemeWrapper(props) {
    var rootStyle = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().rootStyle;
    return jsxRuntime.jsx(
        uiEntry.UserContextWrapper,
        genericComponentOverrideContext.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    genericComponentOverrideContext.__assign(
                        {
                            userStyles: [
                                rootStyle,
                                props.config.recipeRootStyle,
                                props.verifyEmailLinkClickedScreen === undefined
                                    ? props.config.sendVerifyEmailScreen.style
                                    : props.config.verifyEmailLinkClickedScreen.style,
                            ],
                        },
                        {
                            children: jsxRuntime.jsx(
                                EmailVerificationTheme,
                                genericComponentOverrideContext.__assign({}, props)
                            ),
                        }
                    )
                ),
            }
        )
    );
}

var EmailVerification$1 = function (props) {
    var _a;
    var sessionContext = React.useContext(uiEntry.SessionContext);
    var _b = React.useState("LOADING"),
        status = _b[0],
        setStatus = _b[1];
    var rethrowInRender = genericComponentOverrideContext.useRethrowInRender();
    var recipeComponentOverrides = props.useComponentOverrides();
    var userContext = uiEntry.useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var redirectToAuthWithHistory = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                uiEntry.redirectToAuth({ redirectBack: false, navigate: props.navigate }),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.navigate]
    );
    var modifiedRecipeImplementation = React.useMemo(
        function () {
            return genericComponentOverrideContext.__assign(
                genericComponentOverrideContext.__assign({}, props.recipe.webJSRecipe),
                {
                    sendVerificationEmail: function (input) {
                        return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                            var response;
                            return genericComponentOverrideContext.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [4 /*yield*/, props.recipe.webJSRecipe.sendVerificationEmail(input)];
                                    case 1:
                                        response = _a.sent();
                                        genericComponentOverrideContext.clearQueryParams(["token"]);
                                        return [2 /*return*/, response];
                                }
                            });
                        });
                    },
                }
            );
        },
        [props.recipe]
    );
    var onSuccess = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        types.Session.getInstanceOrThrow()
                            .validateGlobalClaimsAndHandleSuccessRedirection(
                                undefined,
                                props.recipe.recipeID,
                                undefined,
                                userContext,
                                props.navigate
                            )
                            .catch(rethrowInRender),
                    ];
                });
            });
        },
        [props.recipe, props.navigate, userContext]
    );
    var fetchIsEmailVerified = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var token;
                var _a;
                return genericComponentOverrideContext.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (sessionContext.loading === true) {
                                // This callback should only be called if the session is already loaded
                                throw new Error("Should never come here");
                            }
                            token =
                                (_a = genericComponentOverrideContext.getQueryParams("token")) !== null && _a !== void 0
                                    ? _a
                                    : undefined;
                            if (!(token === undefined)) return [3 /*break*/, 4];
                            if (!!sessionContext.doesSessionExist) return [3 /*break*/, 2];
                            return [4 /*yield*/, redirectToAuthWithHistory()];
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.isEmailVerified({ userContext: userContext }),
                            ];
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
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
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
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                types.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
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
    genericComponentOverrideContext.useOnMountAPICall(
        fetchIsEmailVerified,
        checkIsEmailVerified,
        handleError,
        sessionContext.loading === false
    );
    var signOut = React.useCallback(
        function () {
            return genericComponentOverrideContext.__awaiter(void 0, void 0, void 0, function () {
                var session;
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = types.Session.getInstanceOrThrow();
                            return [4 /*yield*/, session.signOut({ userContext: userContext })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, redirectToAuthWithHistory()];
                    }
                });
            });
        },
        [redirectToAuthWithHistory, userContext]
    );
    if (status === "LOADING") {
        return jsxRuntime.jsx(React.Fragment, {});
    }
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
    var token =
        (_a = genericComponentOverrideContext.getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
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
        uiEntry.ComponentOverrideContext.Provider,
        genericComponentOverrideContext.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    uiEntry.FeatureWrapper,
                    genericComponentOverrideContext.__assign(
                        {
                            useShadowDom: genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().useShadowDom,
                            defaultStore: translations.defaultTranslationsEmailVerification,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(
                                            EmailVerificationThemeWrapper,
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

var EmailVerificationPreBuiltUI = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(EmailVerificationPreBuiltUI, _super);
    function EmailVerificationPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = translations.defaultTranslationsEmailVerification;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(recipe.DEFAULT_VERIFY_EMAIL_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: genericComponentOverrideContext.matchRecipeIdUsingQueryParams(
                        _this.recipeInstance.config.recipeId
                    ),
                    component: function (props) {
                        return _this.getFeatureComponent("emailverification", props, useComponentOverrides);
                    },
                    recipeID: recipe.EmailVerification.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _,
            props,
            useComponentOverrides
        ) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe.useContext;
            }
            return jsxRuntime.jsx(
                uiEntry.UserContextWrapper,
                genericComponentOverrideContext.__assign(
                    { userContext: props.userContext },
                    {
                        children: jsxRuntime.jsx(
                            session.SessionAuth,
                            genericComponentOverrideContext.__assign(
                                {
                                    requireAuth: false,
                                    overrideGlobalClaimValidators: function () {
                                        return [];
                                    },
                                },
                                {
                                    children: jsxRuntime.jsx(uiEntry.UserContextContext.Consumer, {
                                        children: function (value) {
                                            return jsxRuntime.jsx(
                                                EmailVerification$1,
                                                genericComponentOverrideContext.__assign(
                                                    {
                                                        recipe: _this.recipeInstance,
                                                        useComponentOverrides: useComponentOverrides,
                                                    },
                                                    genericComponentOverrideContext.__assign(
                                                        genericComponentOverrideContext.__assign({}, props),
                                                        {
                                                            // We do this to make sure it does not add another provider
                                                            userContext: value,
                                                        }
                                                    )
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
        return _this;
    }
    // Static methods
    EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (EmailVerificationPreBuiltUI.instance === undefined) {
            var recipeInstance = recipe.EmailVerification.getInstanceOrThrow();
            EmailVerificationPreBuiltUI.instance = new EmailVerificationPreBuiltUI(recipeInstance);
        }
        return EmailVerificationPreBuiltUI.instance;
    };
    EmailVerificationPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe.useContext;
        }
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    EmailVerificationPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = recipe.useContext;
        }
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    EmailVerificationPreBuiltUI.prototype.getAuthComponents = function () {
        return [];
    };
    // For tests
    EmailVerificationPreBuiltUI.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        EmailVerificationPreBuiltUI.instance = undefined;
        return;
    };
    EmailVerificationPreBuiltUI.EmailVerification = function (props) {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            "emailverification",
            props
        );
    };
    EmailVerificationPreBuiltUI.EmailVerificationTheme = EmailVerificationTheme;
    return EmailVerificationPreBuiltUI;
})(uiEntry.RecipeRouter);
var EmailVerification = EmailVerificationPreBuiltUI.EmailVerification;

exports.EmailVerification = EmailVerification;
exports.EmailVerificationPreBuiltUI = EmailVerificationPreBuiltUI;
exports.EmailVerificationTheme = EmailVerificationTheme;
