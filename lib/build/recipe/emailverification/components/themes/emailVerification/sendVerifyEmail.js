"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var arrowRightIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/arrowRightIcon"));
var emailLargeIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/emailLargeIcon"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
var generalError_1 = tslib_1.__importDefault(require("../../../../emailpassword/components/library/generalError"));
var usercontext_1 = require("../../../../../usercontext");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var utils_1 = require("../../../../../utils");
exports.EmailVerificationSendVerifyEmail = function (props) {
    var styles = react_2.useContext(styleContext_1.default);
    var t = translationContext_1.useTranslation();
    var userContext = usercontext_1.useUserContext();
    var _a = react_2.useState("READY"),
        status = _a[0],
        setStatus = _a[1];
    var _b = react_2.useState(undefined),
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
    var sendVerificationEmail = react_2.useCallback(
        function () {
            return props.recipeImplementation.sendVerificationEmail({
                userContext: userContext,
            });
        },
        [props.config, props.recipeImplementation]
    );
    var checkSendResponse = react_2.useCallback(
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
    utils_1.useOnMountAPICall(sendVerificationEmail, checkSendResponse);
    var signOut = props.signOut;
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row", css: styles.row },
            status === "ERROR" &&
                react_1.jsx(generalError_1.default, {
                    error: errorMessage === undefined ? "SOMETHING_WENT_WRONG_ERROR" : errorMessage,
                }),
            status === "EMAIL_RESENT" &&
                react_1.jsx(
                    "div",
                    { "data-supertokens": "generalSuccess", css: styles.generalSuccess },
                    t("EMAIL_VERIFICATION_RESEND_SUCCESS")
                ),
            react_1.jsx(
                "div",
                { "data-supertokens": "sendVerifyEmailIcon", css: styles.sendVerifyEmailIcon },
                react_1.jsx(emailLargeIcon_1.default, null)
            ),
            react_1.jsx(
                "div",
                {
                    "data-supertokens": "headerTitle headerTinyTitle",
                    css: [styles.headerTitle, styles.headerTinyTitle],
                },
                t("EMAIL_VERIFICATION_SEND_TITLE")
            ),
            react_1.jsx(
                "div",
                {
                    "data-supertokens": "primaryText sendVerifyEmailText",
                    css: [styles.primaryText, styles.sendVerifyEmailText],
                },
                t("EMAIL_VERIFICATION_SEND_DESC_START"),
                react_1.jsx("strong", null, t("EMAIL_VERIFICATION_SEND_DESC_STRONG")),
                t("EMAIL_VERIFICATION_SEND_DESC_END")
            ),
            status !== "EMAIL_RESENT" &&
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "link sendVerifyEmailResend",
                        css: [styles.link, styles.sendVerifyEmailResend],
                        onClick: resendEmail,
                    },
                    t("EMAIL_VERIFICATION_RESEND_BTN")
                ),
            react_1.jsx(
                "div",
                {
                    "data-supertokens": "secondaryText secondaryLinkWithArrow",
                    css: [styles.secondaryText, styles.secondaryLinkWithArrow],
                    onClick: function () {
                        return signOut();
                    },
                },
                t("EMAIL_VERIFICATION_LOGOUT"),
                react_1.jsx(arrowRightIcon_1.default, { color: styles.palette.colors.textPrimary })
            )
        )
    );
};
exports.SendVerifyEmail = withOverride_1.withOverride(
    "EmailVerificationSendVerifyEmail",
    exports.EmailVerificationSendVerifyEmail
);
