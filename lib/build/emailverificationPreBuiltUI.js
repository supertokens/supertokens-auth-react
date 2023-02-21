"use strict";

var utils = require("./recipeModule-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var sessionAuth = require("./session-shared.js");
var session = require("./session-shared3.js");
var recipe$1 = require("./emailverification-shared.js");
var React = require("react");
var index = require("./index.js");
var translations = require("./translations.js");
var recipe = require("./session-shared2.js");
var translations$1 = require("./emailverification-shared2.js");
var STGeneralError = require("supertokens-web-js/utils/error");
var checkedRoundIcon = require("./checkedRoundIcon.js");
var translationContext = require("./translationContext.js");
var spinnerIcon = require("./spinnerIcon.js");
var button = require("./emailpassword-shared.js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/recipe/session");
require("./index2.js");
require("supertokens-web-js/recipe/emailverification");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("supertokens-web-js/recipe/emailverification/recipeImplementation");
require("supertokens-web-js/recipe/session/recipe");
require("react-dom");

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
        utils.__assign(
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
        return utils.__awaiter(void 0, void 0, void 0, function () {
            var response, e_1;
            return utils.__generator(this, function (_a) {
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
        return utils.__awaiter(void 0, void 0, void 0, function () {
            var e_2;
            return utils.__generator(this, function (_a) {
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
            return utils.__awaiter(void 0, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
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
        return utils.__awaiter(void 0, void 0, void 0, function () {
            return utils.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            recipe.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
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
    utils.useOnMountAPICall(sendVerificationEmail, checkSendResponse, handleSendError);
    return jsxRuntime.jsx(
        "div",
        utils.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    utils.__assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                status === "ERROR" &&
                                    jsxRuntime.jsx(translations.GeneralError, {
                                        error: errorMessage === undefined ? "SOMETHING_WENT_WRONG_ERROR" : errorMessage,
                                    }),
                                status === "EMAIL_RESENT" &&
                                    jsxRuntime.jsx(
                                        "div",
                                        utils.__assign(
                                            { "data-supertokens": "generalSuccess" },
                                            { children: t("EMAIL_VERIFICATION_RESEND_SUCCESS") }
                                        )
                                    ),
                                jsxRuntime.jsx(
                                    "div",
                                    utils.__assign(
                                        { "data-supertokens": "sendVerifyEmailIcon" },
                                        { children: jsxRuntime.jsx(checkedRoundIcon.EmailLargeIcon, {}) }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    utils.__assign(
                                        { "data-supertokens": "headerTitle headerTinyTitle" },
                                        { children: t("EMAIL_VERIFICATION_SEND_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsxs(
                                    "div",
                                    utils.__assign(
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
                                        utils.__assign(
                                            { "data-supertokens": "link sendVerifyEmailResend", onClick: resendEmail },
                                            { children: t("EMAIL_VERIFICATION_RESEND_BTN") }
                                        )
                                    ),
                                jsxRuntime.jsxs(
                                    "div",
                                    utils.__assign(
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
var SendVerifyEmail = translations.withOverride("EmailVerificationSendVerifyEmail", EmailVerificationSendVerifyEmail);

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
        utils.__assign(
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
                            utils.__assign(
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
                            utils.__assign(
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
                                        utils.__assign({ x: "0", y: "0" }, { children: "!" })
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
            return utils.__awaiter(void 0, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
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
            return utils.__awaiter(void 0, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
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
    utils.useOnMountAPICall(verifyEmailOnMount, handleVerifyResp, handleError, sessionContext.loading === false);
    var onTokenInvalidRedirect = props.onTokenInvalidRedirect,
        onSuccess = props.onSuccess;
    if (status === "LOADING") {
        return jsxRuntime.jsx(
            "div",
            utils.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsx(
                        "div",
                        utils.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: jsxRuntime.jsx(
                                    "div",
                                    utils.__assign(
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
            utils.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        utils.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        utils.__assign(
                                            { "data-supertokens": "headerTitle" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        utils.__assign(
                                            { "data-supertokens": "headerSubtitle secondaryText" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_DESC") }
                                        )
                                    ),
                                    jsxRuntime.jsx(button.Button, {
                                        isLoading: verifyLoading,
                                        onClick: function () {
                                            return utils.__awaiter(void 0, void 0, void 0, function () {
                                                var resp, err_1;
                                                return utils.__generator(this, function (_a) {
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
            utils.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        utils.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(checkedRoundIcon.CheckedRoundIcon, {}),
                                    jsxRuntime.jsx(
                                        "div",
                                        utils.__assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_SUCCESS") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        utils.__assign(
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
            utils.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        utils.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        utils.__assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_EXPIRED") }
                                        )
                                    ),
                                    jsxRuntime.jsxs(
                                        "div",
                                        utils.__assign(
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
        utils.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    utils.__assign(
                        { "data-supertokens": "row noFormRow" },
                        {
                            children: [
                                jsxRuntime.jsxs(
                                    "div",
                                    utils.__assign(
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
                                    utils.__assign(
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
var VerifyEmailLinkClicked = translations.withOverride(
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
        return jsxRuntime.jsx(SendVerifyEmail, utils.__assign({}, props.sendVerifyEmailScreen));
    }
    // Otherwise, return VerifyEmailLinkClicked.
    return jsxRuntime.jsx(VerifyEmailLinkClicked, utils.__assign({}, props.verifyEmailLinkClickedScreen));
}
function EmailVerificationThemeWrapper(props) {
    var hasFont = translations.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        sessionAuth.UserContextWrapper,
        utils.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations$1.ThemeBase,
                    utils.__assign(
                        {
                            loadDefaultFont: !hasFont,
                            userStyles: [
                                props.config.rootStyle,
                                props.verifyEmailLinkClickedScreen === undefined
                                    ? props.config.sendVerifyEmailScreen.style
                                    : props.config.verifyEmailLinkClickedScreen.style,
                            ],
                        },
                        { children: jsxRuntime.jsx(EmailVerificationTheme, utils.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

var EmailVerification = function (props) {
    var _a;
    var sessionContext = React.useContext(sessionAuth.SessionContext);
    var _b = React.useState("LOADING"),
        status = _b[0],
        setStatus = _b[1];
    var userContext = sessionAuth.useUserContext();
    var recipeComponentOverrides = props.useComponentOverrides();
    var redirectToAuthWithHistory = React.useCallback(
        function () {
            return utils.__awaiter(void 0, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, index.redirectToAuth({ redirectBack: false, history: props.history })];
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
            return utils.__assign(utils.__assign({}, props.recipe.recipeImpl), {
                sendVerificationEmail: function (input) {
                    return utils.__awaiter(void 0, void 0, void 0, function () {
                        var response;
                        return utils.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, props.recipe.recipeImpl.sendVerificationEmail(input)];
                                case 1:
                                    response = _a.sent();
                                    utils.clearQueryParams(["token"]);
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
            return utils.__awaiter(void 0, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
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
            return utils.__awaiter(void 0, void 0, void 0, function () {
                var token;
                var _a;
                return utils.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (sessionContext.loading === true) {
                                // This callback should only be called if the session is already loaded
                                throw new Error("Should never come here");
                            }
                            token = (_a = utils.getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
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
            return utils.__awaiter(void 0, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
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
            return utils.__awaiter(void 0, void 0, void 0, function () {
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipe.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
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
    utils.useOnMountAPICall(fetchIsEmailVerified, checkIsEmailVerified, handleError, sessionContext.loading === false);
    var signOut = React.useCallback(
        function () {
            return utils.__awaiter(void 0, void 0, void 0, function () {
                var session;
                return utils.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = recipe.Session.getInstanceOrThrow();
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
    var token = (_a = utils.getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
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
        translations.ComponentOverrideContext.Provider,
        utils.__assign(
            { value: recipeComponentOverrides },
            {
                children: jsxRuntime.jsx(
                    translations.FeatureWrapper,
                    utils.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: translations$1.defaultTranslationsEmailVerification,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(EmailVerificationThemeWrapper, utils.__assign({}, childProps)),
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
    utils.__extends(EmailVerificationPreBuiltUI, _super);
    function EmailVerificationPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = recipe$1.useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath__default.default(recipe$1.DEFAULT_VERIFY_EMAIL_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: utils.matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("emailverification", props, useComponentOverrides);
                    },
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
                useComponentOverrides = recipe$1.useContext;
            }
            return jsxRuntime.jsx(
                sessionAuth.UserContextWrapper,
                utils.__assign(
                    { userContext: props.userContext },
                    {
                        children: jsxRuntime.jsx(
                            session.SessionAuth,
                            utils.__assign(
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
                                                EmailVerification,
                                                utils.__assign(
                                                    {
                                                        recipe: _this.recipeInstance,
                                                        useComponentOverrides: useComponentOverrides,
                                                    },
                                                    utils.__assign(utils.__assign({}, props), {
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
        return _this;
    }
    EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (EmailVerificationPreBuiltUI.instance === undefined) {
            var recipeInstance = recipe$1.EmailVerification.getInstanceOrThrow();
            EmailVerificationPreBuiltUI.instance = new EmailVerificationPreBuiltUI(recipeInstance);
        }
        return EmailVerificationPreBuiltUI.instance;
    };
    EmailVerificationPreBuiltUI.canHandleRoute = function () {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().canHandleRoute();
    };
    EmailVerificationPreBuiltUI.getRoutingComponent = function () {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getRoutingComponent();
    };
    EmailVerificationPreBuiltUI.getFeatures = function () {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures();
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    EmailVerificationPreBuiltUI.getFeatureComponent = function (_, props) {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(_, props);
    };
    EmailVerificationPreBuiltUI.getReactRouterDomRoutes = function (reactRouterDom) {
        return sessionAuth.RecipeRouter.getRecipeRoutes(
            reactRouterDom,
            EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance()
        );
    };
    EmailVerificationPreBuiltUI.reset = function () {
        if (!utils.isTest()) {
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
})(sessionAuth.RecipeRouter);

exports.EmailVerificationPreBuiltUI = EmailVerificationPreBuiltUI;
//# sourceMappingURL=emailverificationPreBuiltUI.js.map
