"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerifyEmail = exports.EmailVerificationSendVerifyEmail = void 0;
var tslib_1 = require("tslib");
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
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var arrowRightIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/arrowRightIcon"));
var emailLargeIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/emailLargeIcon"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
var generalError_1 = tslib_1.__importDefault(require("../../../../emailpassword/components/library/generalError"));
var usercontext_1 = require("../../../../../usercontext");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var utils_1 = require("../../../../../utils");
var EmailVerificationSendVerifyEmail = function (props) {
    var styles = (0, react_1.useContext)(styleContext_1.default);
    var t = (0, translationContext_1.useTranslation)();
    var userContext = (0, usercontext_1.useUserContext)();
    var _a = (0, react_1.useState)("READY"),
        status = _a[0],
        setStatus = _a[1];
    var _b = (0, react_1.useState)(undefined),
        errorMessage = _b[0],
        setErrorMessage = _b[1];
    var resendEmail = function () {
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var response, e_1;
            return tslib_1.__generator(this, function (_a) {
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
                        if (error_1.default.isThisError(e_1)) {
                            setErrorMessage(e_1.message);
                        }
                        setStatus("ERROR");
                        return [3 /*break*/, 6];
                    case 6:
                        return [2 /*return*/];
                }
            });
        });
    };
    var logout = function () {
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 6]);
                        return [4 /*yield*/, props.signOut()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        e_2 = _a.sent();
                        if (!error_1.default.isThisError(e_2)) return [3 /*break*/, 3];
                        setErrorMessage(e_2.message);
                        setStatus("ERROR");
                        return [3 /*break*/, 5];
                    case 3:
                        return [4 /*yield*/, props.navigateAfterSignOut()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        return [3 /*break*/, 6];
                    case 6:
                        return [2 /*return*/];
                }
            });
        });
    };
    var sendVerificationEmail = (0, react_1.useCallback)(
        function () {
            return props.recipeImplementation.sendVerificationEmail({
                userContext: userContext,
            });
        },
        [props.config, props.recipeImplementation]
    );
    var checkSendResponse = (0, react_1.useCallback)(
        function (response) {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
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
    (0, utils_1.useOnMountAPICall)(sendVerificationEmail, checkSendResponse);
    return (0, jsx_runtime_1.jsx)(
        "div",
        tslib_1.__assign(
            { "data-supertokens": "container", css: styles.container },
            {
                children: (0, jsx_runtime_1.jsxs)(
                    "div",
                    tslib_1.__assign(
                        { "data-supertokens": "row", css: styles.row },
                        {
                            children: [
                                status === "ERROR" &&
                                    (0, jsx_runtime_1.jsx)(generalError_1.default, {
                                        error: errorMessage === undefined ? "SOMETHING_WENT_WRONG_ERROR" : errorMessage,
                                    }),
                                status === "EMAIL_RESENT" &&
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        tslib_1.__assign(
                                            { "data-supertokens": "generalSuccess", css: styles.generalSuccess },
                                            { children: t("EMAIL_VERIFICATION_RESEND_SUCCESS") }
                                        )
                                    ),
                                (0, jsx_runtime_1.jsx)(
                                    "div",
                                    tslib_1.__assign(
                                        { "data-supertokens": "sendVerifyEmailIcon", css: styles.sendVerifyEmailIcon },
                                        { children: (0, jsx_runtime_1.jsx)(emailLargeIcon_1.default, {}) }
                                    )
                                ),
                                (0, jsx_runtime_1.jsx)(
                                    "div",
                                    tslib_1.__assign(
                                        {
                                            "data-supertokens": "headerTitle headerTinyTitle",
                                            css: [styles.headerTitle, styles.headerTinyTitle],
                                        },
                                        { children: t("EMAIL_VERIFICATION_SEND_TITLE") }
                                    )
                                ),
                                (0, jsx_runtime_1.jsxs)(
                                    "div",
                                    tslib_1.__assign(
                                        {
                                            "data-supertokens": "primaryText sendVerifyEmailText",
                                            css: [styles.primaryText, styles.sendVerifyEmailText],
                                        },
                                        {
                                            children: [
                                                t("EMAIL_VERIFICATION_SEND_DESC_START"),
                                                (0, jsx_runtime_1.jsx)("strong", {
                                                    children: t("EMAIL_VERIFICATION_SEND_DESC_STRONG"),
                                                }),
                                                t("EMAIL_VERIFICATION_SEND_DESC_END"),
                                            ],
                                        }
                                    )
                                ),
                                status !== "EMAIL_RESENT" &&
                                    (0, jsx_runtime_1.jsx)(
                                        "div",
                                        tslib_1.__assign(
                                            {
                                                "data-supertokens": "link sendVerifyEmailResend",
                                                css: [styles.link, styles.sendVerifyEmailResend],
                                                onClick: resendEmail,
                                            },
                                            { children: t("EMAIL_VERIFICATION_RESEND_BTN") }
                                        )
                                    ),
                                (0, jsx_runtime_1.jsxs)(
                                    "div",
                                    tslib_1.__assign(
                                        {
                                            "data-supertokens": "secondaryText secondaryLinkWithArrow",
                                            css: [styles.secondaryText, styles.secondaryLinkWithArrow],
                                            onClick: logout,
                                        },
                                        {
                                            children: [
                                                t("EMAIL_VERIFICATION_LOGOUT"),
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
};
exports.EmailVerificationSendVerifyEmail = EmailVerificationSendVerifyEmail;
exports.SendVerifyEmail = (0, withOverride_1.withOverride)(
    "EmailVerificationSendVerifyEmail",
    exports.EmailVerificationSendVerifyEmail
);
