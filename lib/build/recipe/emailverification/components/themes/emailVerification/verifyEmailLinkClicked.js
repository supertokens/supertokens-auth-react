"use strict";
var __assign =
    (this && this.__assign) ||
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
    (this && this.__awaiter) ||
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
    (this && this.__generator) ||
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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailLinkClicked = exports.EmailVerificationVerifyEmailLinkClicked = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
var react_1 = require("react");
var arrowRightIcon_1 = __importDefault(require("../../../../../components/assets/arrowRightIcon"));
var checkedRoundIcon_1 = __importDefault(require("../../../../../components/assets/checkedRoundIcon"));
var errorLargeIcon_1 = __importDefault(require("../../../../../components/assets/errorLargeIcon"));
var spinnerIcon_1 = __importDefault(require("../../../../../components/assets/spinnerIcon"));
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var library_1 = require("../../../../emailpassword/components/library");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
var usercontext_1 = require("../../../../../usercontext");
var utils_1 = require("../../../../../utils");
var error_1 = __importDefault(require("supertokens-web-js/utils/error"));
var useSessionContext_1 = __importDefault(require("../../../../session/useSessionContext"));
var EmailVerificationVerifyEmailLinkClicked = function (props) {
    var styles = (0, react_1.useContext)(styleContext_1.default);
    var t = (0, translationContext_1.useTranslation)();
    var sessionContext = (0, useSessionContext_1.default)();
    var userContext = (0, usercontext_1.useUserContext)();
    var _a = (0, react_1.useState)("LOADING"),
        status = _a[0],
        setStatus = _a[1];
    var _b = (0, react_1.useState)(undefined),
        errorMessage = _b[0],
        setErrorMessage = _b[1];
    var _c = (0, react_1.useState)(false),
        verifyLoading = _c[0],
        setVerifyLoading = _c[1];
    var verifyEmailOnMount = (0, react_1.useCallback)(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
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
    var handleVerifyResp = (0, react_1.useCallback)(
        function (response) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
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
    var handleError = (0, react_1.useCallback)(
        function (err) {
            if (error_1.default.isThisError(err)) {
                setErrorMessage(err.message);
            }
            setStatus("GENERAL_ERROR");
        },
        [setStatus, setErrorMessage]
    );
    (0, utils_1.useOnMountAPICall)(verifyEmailOnMount, handleVerifyResp, handleError, sessionContext.loading === false);
    var onTokenInvalidRedirect = props.onTokenInvalidRedirect,
        onSuccess = props.onSuccess;
    if (status === "LOADING") {
        return (0, jsx_runtime_1.jsx)(
            "div",
            __assign(
                { "data-supertokens": "container", css: styles.container },
                {
                    children: (0, jsx_runtime_1.jsx)(
                        "div",
                        __assign(
                            { "data-supertokens": "row", css: styles.row },
                            {
                                children: (0, jsx_runtime_1.jsx)(
                                    "div",
                                    __assign(
                                        { "data-supertokens": "spinner", css: styles.spinner },
                                        {
                                            children: (0, jsx_runtime_1.jsx)(spinnerIcon_1.default, {
                                                color: styles.palette.colors.primary,
                                            }),
                                        }
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
        return (0, jsx_runtime_1.jsx)(
            "div",
            __assign(
                { "data-supertokens": "container", css: styles.container },
                {
                    children: (0, jsx_runtime_1.jsxs)(
                        "div",
                        __assign(
                            { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
                            {
                                children: [
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "headerTitle", css: styles.headerTitle },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER") }
                                        )
                                    ),
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        __assign(
                                            {
                                                "data-supertokens": "headerSubtitle secondaryText",
                                                css: [styles.headerSubtitle, styles.secondaryText],
                                            },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_DESC") }
                                        )
                                    ),
                                    (0, jsx_runtime_1.jsx)(library_1.Button, {
                                        isLoading: verifyLoading,
                                        onClick: function () {
                                            return __awaiter(void 0, void 0, void 0, function () {
                                                var resp, err_1;
                                                return __generator(this, function (_a) {
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
        return (0, jsx_runtime_1.jsx)(
            "div",
            __assign(
                { "data-supertokens": "container", css: styles.container },
                {
                    children: (0, jsx_runtime_1.jsxs)(
                        "div",
                        __assign(
                            { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
                            {
                                children: [
                                    (0, jsx_runtime_1.jsx)(checkedRoundIcon_1.default, {
                                        color: styles.palette.colors.success,
                                    }),
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        __assign(
                                            {
                                                "data-supertokens": "headerTitle headerTinyTitle",
                                                css: [styles.headerTitle, styles.headerTinyTitle],
                                            },
                                            { children: t("EMAIL_VERIFICATION_SUCCESS") }
                                        )
                                    ),
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        __assign(
                                            {
                                                "data-supertokens": "emailVerificationButtonWrapper",
                                                css: styles.emailVerificationButtonWrapper,
                                            },
                                            {
                                                children: (0, jsx_runtime_1.jsx)(library_1.Button, {
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
        return (0, jsx_runtime_1.jsx)(
            "div",
            __assign(
                { "data-supertokens": "container", css: styles.container },
                {
                    children: (0, jsx_runtime_1.jsxs)(
                        "div",
                        __assign(
                            { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
                            {
                                children: [
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        __assign(
                                            {
                                                "data-supertokens": "headerTitle headerTinyTitle",
                                                css: [styles.headerTitle, styles.headerTinyTitle],
                                            },
                                            { children: t("EMAIL_VERIFICATION_EXPIRED") }
                                        )
                                    ),
                                    (0, jsx_runtime_1.jsxs)(
                                        "div",
                                        __assign(
                                            {
                                                onClick: onTokenInvalidRedirect,
                                                "data-supertokens": "secondaryText secondaryLinkWithArrow",
                                                css: [styles.secondaryText, styles.secondaryLinkWithArrow],
                                            },
                                            {
                                                children: [
                                                    t("EMAIL_VERIFICATION_CONTINUE_LINK"),
                                                    (0, jsx_runtime_1.jsx)(arrowRightIcon_1.default, {
                                                        color: styles.palette.colors.textPrimary,
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
    return (0, jsx_runtime_1.jsx)(
        "div",
        __assign(
            { "data-supertokens": "container", css: styles.container },
            {
                children: (0, jsx_runtime_1.jsxs)(
                    "div",
                    __assign(
                        { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
                        {
                            children: [
                                (0, jsx_runtime_1.jsxs)(
                                    "div",
                                    __assign(
                                        {
                                            "data-supertokens": "headerTitle error",
                                            css: [styles.headerTitle, styles.error],
                                        },
                                        {
                                            children: [
                                                (0, jsx_runtime_1.jsx)(errorLargeIcon_1.default, {
                                                    color: styles.palette.colors.error,
                                                }),
                                                t("EMAIL_VERIFICATION_ERROR_TITLE"),
                                            ],
                                        }
                                    )
                                ),
                                (0, jsx_runtime_1.jsx)(
                                    "div",
                                    __assign(
                                        { "data-supertokens": "primaryText", css: styles.primaryText },
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
exports.EmailVerificationVerifyEmailLinkClicked = EmailVerificationVerifyEmailLinkClicked;
exports.VerifyEmailLinkClicked = (0, withOverride_1.withOverride)(
    "EmailVerificationVerifyEmailLinkClicked",
    exports.EmailVerificationVerifyEmailLinkClicked
);
