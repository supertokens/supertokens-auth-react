"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var assets = require("./assets.js");
var jsxRuntime = require("react/jsx-runtime");
var authRecipe = require("./authRecipe-shared.js");
var React = require("react");
var querier = require("./querier.js");
var translations = require("./emailverification-shared.js");
var translationContext = require("./translationContext.js");
var button = require("./emailpassword-shared.js");
var index = require("./index.js");
var utils$1 = require("./utils.js");
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

var EmailVerificationSendVerifyEmail = function (props) {
    var t = translationContext.useTranslation();
    var userContext = authRecipe.useUserContext();
    var _a = React.useState("READY"),
        status = _a[0],
        setStatus = _a[1];
    var _b = React.useState(undefined),
        errorMessage = _b[0],
        setErrorMessage = _b[1];
    var resendEmail = function () {
        return assets.__awaiter(void 0, void 0, void 0, function () {
            var response, e_1;
            return assets.__generator(this, function (_a) {
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
                        if (querier.STGeneralError.isThisError(e_1)) {
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
        return assets.__awaiter(void 0, void 0, void 0, function () {
            var e_2;
            return assets.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, props.signOut()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        if (querier.STGeneralError.isThisError(e_2)) {
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
            return assets.__awaiter(void 0, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
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
        return assets.__awaiter(void 0, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            authRecipe.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
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
    authRecipe.useOnMountAPICall(sendVerificationEmail, checkSendResponse, handleSendError);
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
                                status === "ERROR" &&
                                    jsxRuntime.jsx(querier.GeneralError, {
                                        error: errorMessage === undefined ? "SOMETHING_WENT_WRONG_ERROR" : errorMessage,
                                    }),
                                status === "EMAIL_RESENT" &&
                                    jsxRuntime.jsx(
                                        "div",
                                        assets.__assign(
                                            { "data-supertokens": "generalSuccess" },
                                            { children: t("EMAIL_VERIFICATION_RESEND_SUCCESS") }
                                        )
                                    ),
                                jsxRuntime.jsx(
                                    "div",
                                    assets.__assign(
                                        { "data-supertokens": "sendVerifyEmailIcon" },
                                        { children: jsxRuntime.jsx(assets.EmailLargeIcon, {}) }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    assets.__assign(
                                        { "data-supertokens": "headerTitle headerTinyTitle" },
                                        { children: t("EMAIL_VERIFICATION_SEND_TITLE") }
                                    )
                                ),
                                jsxRuntime.jsxs(
                                    "div",
                                    assets.__assign(
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
                                        assets.__assign(
                                            { "data-supertokens": "link sendVerifyEmailResend", onClick: resendEmail },
                                            { children: t("EMAIL_VERIFICATION_RESEND_BTN") }
                                        )
                                    ),
                                jsxRuntime.jsxs(
                                    "div",
                                    assets.__assign(
                                        { "data-supertokens": "secondaryText secondaryLinkWithArrow", onClick: logout },
                                        {
                                            children: [
                                                t("EMAIL_VERIFICATION_LOGOUT"),
                                                jsxRuntime.jsx(assets.ArrowRightIcon, {}),
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
var SendVerifyEmail = querier.withOverride("EmailVerificationSendVerifyEmail", EmailVerificationSendVerifyEmail);

var EmailVerificationVerifyEmailLinkClicked = function (props) {
    var t = translationContext.useTranslation();
    var sessionContext = authRecipe.useSessionContext();
    var userContext = authRecipe.useUserContext();
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
            return assets.__awaiter(void 0, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
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
            return assets.__awaiter(void 0, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
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
            if (querier.STGeneralError.isThisError(err)) {
                setErrorMessage(err.message);
            }
            setStatus("GENERAL_ERROR");
        },
        [setStatus, setErrorMessage]
    );
    authRecipe.useOnMountAPICall(verifyEmailOnMount, handleVerifyResp, handleError, sessionContext.loading === false);
    var onTokenInvalidRedirect = props.onTokenInvalidRedirect,
        onSuccess = props.onSuccess;
    if (status === "LOADING") {
        return jsxRuntime.jsx(
            "div",
            assets.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsx(
                        "div",
                        assets.__assign(
                            { "data-supertokens": "row" },
                            {
                                children: jsxRuntime.jsx(
                                    "div",
                                    assets.__assign(
                                        { "data-supertokens": "spinner" },
                                        { children: jsxRuntime.jsx(assets.SpinnerIcon, {}) }
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
            assets.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        assets.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        assets.__assign(
                                            { "data-supertokens": "headerTitle" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        assets.__assign(
                                            { "data-supertokens": "headerSubtitle secondaryText" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_DESC") }
                                        )
                                    ),
                                    jsxRuntime.jsx(button.Button, {
                                        isLoading: verifyLoading,
                                        onClick: function () {
                                            return assets.__awaiter(void 0, void 0, void 0, function () {
                                                var resp, err_1;
                                                return assets.__generator(this, function (_a) {
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
            assets.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        assets.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(assets.CheckedRoundIcon, {}),
                                    jsxRuntime.jsx(
                                        "div",
                                        assets.__assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_SUCCESS") }
                                        )
                                    ),
                                    jsxRuntime.jsx(
                                        "div",
                                        assets.__assign(
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
            assets.__assign(
                { "data-supertokens": "container" },
                {
                    children: jsxRuntime.jsxs(
                        "div",
                        assets.__assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsxRuntime.jsx(
                                        "div",
                                        assets.__assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_EXPIRED") }
                                        )
                                    ),
                                    jsxRuntime.jsxs(
                                        "div",
                                        assets.__assign(
                                            {
                                                onClick: onTokenInvalidRedirect,
                                                "data-supertokens": "secondaryText secondaryLinkWithArrow",
                                            },
                                            {
                                                children: [
                                                    t("EMAIL_VERIFICATION_CONTINUE_LINK"),
                                                    jsxRuntime.jsx(assets.ArrowRightIcon, {}),
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
        assets.__assign(
            { "data-supertokens": "container" },
            {
                children: jsxRuntime.jsxs(
                    "div",
                    assets.__assign(
                        { "data-supertokens": "row noFormRow" },
                        {
                            children: [
                                jsxRuntime.jsxs(
                                    "div",
                                    assets.__assign(
                                        { "data-supertokens": "headerTitle error" },
                                        {
                                            children: [
                                                jsxRuntime.jsx(assets.ErrorLargeIcon, {}),
                                                t("EMAIL_VERIFICATION_ERROR_TITLE"),
                                            ],
                                        }
                                    )
                                ),
                                jsxRuntime.jsx(
                                    "div",
                                    assets.__assign(
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
var VerifyEmailLinkClicked = querier.withOverride(
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
        return jsxRuntime.jsx(SendVerifyEmail, assets.__assign({}, props.sendVerifyEmailScreen));
    }
    // Otherwise, return VerifyEmailLinkClicked.
    return jsxRuntime.jsx(VerifyEmailLinkClicked, assets.__assign({}, props.verifyEmailLinkClickedScreen));
}
function EmailVerificationThemeWrapper(props) {
    var hasFont = querier.hasFontDefined(props.config.rootStyle);
    return jsxRuntime.jsx(
        authRecipe.UserContextWrapper,
        assets.__assign(
            { userContext: props.userContext },
            {
                children: jsxRuntime.jsx(
                    translations.ThemeBase,
                    assets.__assign(
                        {
                            loadDefaultFont: !hasFont,
                            userStyles: [
                                props.config.rootStyle,
                                props.verifyEmailLinkClickedScreen === undefined
                                    ? props.config.sendVerifyEmailScreen.style
                                    : props.config.verifyEmailLinkClickedScreen.style,
                            ],
                        },
                        { children: jsxRuntime.jsx(EmailVerificationTheme, assets.__assign({}, props)) }
                    )
                ),
            }
        )
    );
}

var EmailVerification$2 = function (props) {
    var _a;
    var sessionContext = React.useContext(authRecipe.SessionContext);
    var _b = React.useState("LOADING"),
        status = _b[0],
        setStatus = _b[1];
    var userContext = authRecipe.useUserContext();
    var redirectToAuthWithHistory = React.useCallback(
        function () {
            return assets.__awaiter(void 0, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
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
            return assets.__assign(assets.__assign({}, props.recipe.recipeImpl), {
                sendVerificationEmail: function (input) {
                    return assets.__awaiter(void 0, void 0, void 0, function () {
                        var response;
                        return assets.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, props.recipe.recipeImpl.sendVerificationEmail(input)];
                                case 1:
                                    response = _a.sent();
                                    authRecipe.clearQueryParams(["token"]);
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
            return assets.__awaiter(void 0, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        authRecipe.Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
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
            return assets.__awaiter(void 0, void 0, void 0, function () {
                var token;
                var _a;
                return assets.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (sessionContext.loading === true) {
                                // This callback should only be called if the session is already loaded
                                throw new Error("Should never come here");
                            }
                            token =
                                (_a = authRecipe.getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
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
            return assets.__awaiter(void 0, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
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
            return assets.__awaiter(void 0, void 0, void 0, function () {
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                authRecipe.Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
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
    authRecipe.useOnMountAPICall(
        fetchIsEmailVerified,
        checkIsEmailVerified,
        handleError,
        sessionContext.loading === false
    );
    var signOut = React.useCallback(
        function () {
            return assets.__awaiter(void 0, void 0, void 0, function () {
                var session;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = authRecipe.Session.getInstanceOrThrow();
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
    var token = (_a = authRecipe.getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
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
        querier.ComponentOverrideContext.Provider,
        assets.__assign(
            { value: componentOverrides },
            {
                children: jsxRuntime.jsx(
                    querier.FeatureWrapper,
                    assets.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: translations.defaultTranslationsEmailVerification,
                        },
                        {
                            children: jsxRuntime.jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsxRuntime.jsx(EmailVerificationTheme, assets.__assign({}, childProps)),
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
    var override = assets.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
            components: {},
        },
        config.override
    );
    return assets.__assign(assets.__assign({}, authRecipe.normaliseRecipeModuleConfig(config)), {
        disableDefaultUI: disableDefaultUI,
        mode: mode,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
        override: override,
    });
}

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

    function getRecipeImplementation(recipeImpleInput) {
        var querier$1 = new querier.querier.default(recipeImpleInput.recipeId, recipeImpleInput.appInfo);
        return {
            verifyEmail: function (_a) {
                var options = _a.options,
                    userContext = _a.userContext;
                return __awaiter(this, void 0, void 0, function () {
                    var token, _b, jsonBody, fetchResponse;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                token = this.getEmailVerificationTokenFromURL({
                                    userContext: userContext,
                                });
                                return [
                                    4 /*yield*/,
                                    querier$1.post(
                                        "/user/email/verify",
                                        {
                                            body: JSON.stringify({
                                                method: "token",
                                                token: token,
                                            }),
                                        },
                                        querier.querier.default.preparePreAPIHook({
                                            recipePreAPIHook: recipeImpleInput.preAPIHook,
                                            action: "VERIFY_EMAIL",
                                            options: options,
                                            userContext: userContext,
                                        }),
                                        querier.querier.default.preparePostAPIHook({
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
                return __awaiter(this, void 0, void 0, function () {
                    var _b, jsonBody, fetchResponse;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    querier$1.get(
                                        "/user/email/verify",
                                        {},
                                        undefined,
                                        querier.querier.default.preparePreAPIHook({
                                            recipePreAPIHook: recipeImpleInput.preAPIHook,
                                            action: "IS_EMAIL_VERIFIED",
                                            options: options,
                                            userContext: userContext,
                                        }),
                                        querier.querier.default.preparePostAPIHook({
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
                return __awaiter(this, void 0, void 0, function () {
                    var _b, jsonBody, fetchResponse;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    querier$1.post(
                                        "/user/email/verify/token",
                                        { body: JSON.stringify({}) },
                                        querier.querier.default.preparePreAPIHook({
                                            recipePreAPIHook: recipeImpleInput.preAPIHook,
                                            action: "SEND_VERIFY_EMAIL",
                                            options: options,
                                            userContext: userContext,
                                        }),
                                        querier.querier.default.preparePostAPIHook({
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
    var webJsImplementation = recipeImplementation_1(recipeInput);
    return {
        verifyEmail: function (input) {
            return assets.__awaiter(this, void 0, void 0, function () {
                var response;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.verifyEmail.bind(this)(assets.__assign({}, input)),
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
            return assets.__awaiter(this, void 0, void 0, function () {
                var response;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.sendVerificationEmail.bind(this)(assets.__assign({}, input)),
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
            return assets.__awaiter(this, void 0, void 0, function () {
                var response;
                return assets.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                webJsImplementation.isEmailVerified.bind(this)(assets.__assign({}, input)),
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

var sessionClaimValidatorStore = authRecipe.createCommonjsModule(function (module, exports) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;

    if (authRecipe.sessionClaimValidatorStore.default !== undefined) {
        __export(authRecipe.sessionClaimValidatorStore);
    } else {
        __export({
            default: authRecipe.sessionClaimValidatorStore,
            ...authRecipe.sessionClaimValidatorStore,
        });
    }
});

authRecipe.unwrapExports(sessionClaimValidatorStore);

var utils = authRecipe.createCommonjsModule(function (module, exports) {
    var __assign =
        (authRecipe.commonjsGlobal && authRecipe.commonjsGlobal.__assign) ||
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
    exports.normaliseUserInput = void 0;
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

    function normaliseUserInput(config) {
        var override = __assign(
            {
                functions: function (originalImplementation) {
                    return originalImplementation;
                },
            },
            config.override
        );
        return __assign(__assign({}, (0, utils$1.utils.normaliseRecipeModuleConfig)(config)), { override: override });
    }
    exports.normaliseUserInput = normaliseUserInput;
});

authRecipe.unwrapExports(utils);
utils.normaliseUserInput;

var emailVerificationClaim = authRecipe.createCommonjsModule(function (module, exports) {
    var __extends =
        (authRecipe.commonjsGlobal && authRecipe.commonjsGlobal.__extends) ||
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
    var __assign =
        (authRecipe.commonjsGlobal && authRecipe.commonjsGlobal.__assign) ||
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
    exports.EmailVerificationClaimClass = void 0;

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
            _this.validators = __assign(__assign({}, _this.validators), {
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
    })(authRecipe.session.BooleanClaim);
    exports.EmailVerificationClaimClass = EmailVerificationClaimClass;
});

authRecipe.unwrapExports(emailVerificationClaim);
emailVerificationClaim.EmailVerificationClaimClass;

var recipe = authRecipe.createCommonjsModule(function (module, exports) {
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
        (authRecipe.commonjsGlobal && authRecipe.commonjsGlobal.__assign) ||
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
    exports.Recipe = void 0;

    var Recipe = /** @class */ (function () {
        function Recipe(config) {
            this.config = (0, utils.normaliseUserInput)(config);
            var builder = new authRecipe.build.default(
                (0, recipeImplementation.default)({
                    recipeId: this.config.recipeId,
                    appInfo: this.config.appInfo,
                    preAPIHook: this.config.preAPIHook,
                    postAPIHook: this.config.postAPIHook,
                })
            );
            this.recipeImplementation = builder.override(this.config.override.functions).build();
            authRecipe.postSuperTokensInitCallbacks.PostSuperTokensInitCallbacks.addPostInitCallback(function () {
                sessionClaimValidatorStore.SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(
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
                var error =
                    "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
                error = (0, authRecipe.utils.checkForSSRErrorAndAppendIfNeeded)(error);
                throw Error(error);
            }
            return Recipe.instance;
        };
        Recipe.reset = function () {
            if (!(0, authRecipe.utils.isTest)()) {
                return;
            }
            Recipe.instance = undefined;
            return;
        };
        Recipe.RECIPE_ID = "emailverification";
        Recipe.EmailVerificationClaim = new emailVerificationClaim.EmailVerificationClaimClass(function () {
            return Recipe.getInstanceOrThrow().recipeImplementation;
        });
        return Recipe;
    })();
    exports.Recipe = Recipe;
    exports.default = Recipe;
});

authRecipe.unwrapExports(recipe);
recipe.Recipe;

var emailverification = authRecipe.createCommonjsModule(function (module, exports) {
    var __assign =
        (authRecipe.commonjsGlobal && authRecipe.commonjsGlobal.__assign) ||
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

    Object.defineProperty(exports, "EmailVerificationClaimClass", {
        enumerable: true,
        get: function () {
            return emailVerificationClaim.EmailVerificationClaimClass;
        },
    });
    var RecipeWrapper = /** @class */ (function () {
        function RecipeWrapper() {}
        RecipeWrapper.init = function (config) {
            return recipe.default.init(config);
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
            return recipe.default.getInstanceOrThrow().recipeImplementation.verifyEmail(
                __assign(__assign({}, input), {
                    userContext: (0, authRecipe.utils.getNormalisedUserContext)(
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
            return recipe.default.getInstanceOrThrow().recipeImplementation.sendVerificationEmail(
                __assign(__assign({}, input), {
                    userContext: (0, authRecipe.utils.getNormalisedUserContext)(
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
            return recipe.default.getInstanceOrThrow().recipeImplementation.isEmailVerified(
                __assign(__assign({}, input), {
                    userContext: (0, authRecipe.utils.getNormalisedUserContext)(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        };
        RecipeWrapper.getEmailVerificationTokenFromURL = function (input) {
            return recipe.default.getInstanceOrThrow().recipeImplementation.getEmailVerificationTokenFromURL(
                __assign(__assign({}, input), {
                    userContext: (0, authRecipe.utils.getNormalisedUserContext)(
                        input === null || input === void 0 ? void 0 : input.userContext
                    ),
                })
            );
        };
        RecipeWrapper.EmailVerificationClaim = recipe.default.EmailVerificationClaim;
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
});

authRecipe.unwrapExports(emailverification);
var emailverification_1 = emailverification.EmailVerificationClaimClass;
emailverification.EmailVerificationClaim;
emailverification.getEmailVerificationTokenFromURL;
emailverification.isEmailVerified;
emailverification.sendVerificationEmail;
emailverification.verifyEmail;
emailverification.init;

var EmailVerification$1 = /** @class */ (function (_super) {
    assets.__extends(EmailVerification, _super);
    function EmailVerification(config) {
        var _this = _super.call(this, normaliseEmailVerificationFeature(config)) || this;
        _this.getFeatures = function () {
            var features = {};
            if (_this.config.disableDefaultUI !== true) {
                var normalisedFullPath = _this.config.appInfo.websiteBasePath.appendPath(
                    new authRecipe.NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: authRecipe.matchRecipeIdUsingQueryParams(_this.config.recipeId),
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
                authRecipe.UserContextWrapper,
                assets.__assign(
                    { userContext: props.userContext },
                    {
                        children: jsxRuntime.jsx(
                            authRecipe.SessionAuth,
                            assets.__assign(
                                {
                                    requireAuth: false,
                                    overrideGlobalClaimValidators: function () {
                                        return [];
                                    },
                                },
                                {
                                    children: jsxRuntime.jsx(authRecipe.UserContextContext.Consumer, {
                                        children: function (value) {
                                            return jsxRuntime.jsx(
                                                EmailVerification$2,
                                                assets.__assign(
                                                    { recipe: _this },
                                                    assets.__assign(assets.__assign({}, props), {
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
            return assets.__awaiter(_this, void 0, void 0, function () {
                var verifyEmailPath;
                return assets.__generator(this, function (_b) {
                    if (context.action === "VERIFY_EMAIL") {
                        verifyEmailPath = new authRecipe.NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH);
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
        }
        authRecipe.postSuperTokensInitCallbacks_1.addPostInitCallback(function () {
            authRecipe.sessionClaimValidatorStore_1.addClaimValidatorFromOtherRecipe(
                EmailVerification.EmailVerificationClaim.validators.isVerified(10)
            );
        });
        return _this;
    }
    EmailVerification.init = function (config) {
        return function (appInfo) {
            EmailVerification.instance = new EmailVerification(
                assets.__assign(assets.__assign({}, config), {
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
                error = error + authRecipe.SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailVerification.instance;
    };
    EmailVerification.prototype.isEmailVerified = function (userContext) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_b) {
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
    EmailVerification.EmailVerificationClaim = new emailverification_1(
        function () {
            return EmailVerification.getInstanceOrThrow().recipeImpl;
        },
        function (userContext) {
            return assets.__awaiter(void 0, void 0, void 0, function () {
                var recipe, _b, _c;
                return assets.__generator(_a, function (_d) {
                    switch (_d.label) {
                        case 0:
                            recipe = EmailVerification.getInstanceOrThrow();
                            if (!(recipe.config.mode === "REQUIRED")) return [3 /*break*/, 2];
                            _b = authRecipe.saveInvalidClaimRedirectPathInContext;
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
})(authRecipe.RecipeModule);

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
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    EmailVerification$1.getInstanceOrThrow().recipeImpl.isEmailVerified(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.verifyEmail = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    EmailVerification$1.getInstanceOrThrow().recipeImpl.verifyEmail(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.sendVerificationEmail = function (input) {
        return assets.__awaiter(this, void 0, void 0, function () {
            return assets.__generator(this, function (_a) {
                return [
                    2 /*return*/,
                    EmailVerification$1.getInstanceOrThrow().recipeImpl.sendVerificationEmail(
                        assets.__assign(assets.__assign({}, input), {
                            userContext: authRecipe.getNormalisedUserContext(
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
            assets.__assign(assets.__assign({}, input), {
                userContext: authRecipe.getNormalisedUserContext(
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
