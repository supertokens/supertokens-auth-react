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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var arrowRightIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/arrowRightIcon"));
var checkedRoundIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/checkedRoundIcon"));
var errorLargeIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/errorLargeIcon"));
var spinnerIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/spinnerIcon"));
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var library_1 = require("../../../../emailpassword/components/library");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
var usercontext_1 = require("../../../../../usercontext");
var utils_1 = require("../../../../../utils");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
/*
 * Component.
 */
exports.EmailVerificationVerifyEmailLinkClicked = function (props) {
    var styles = react_2.useContext(styleContext_1.default);
    var t = translationContext_1.useTranslation();
    var userContext = usercontext_1.useUserContext();
    var _a = react_2.useState("LOADING"),
        status = _a[0],
        setStatus = _a[1];
    var _b = react_2.useState(undefined),
        errorMessage = _b[0],
        setErrorMessage = _b[1];
    var verifyEmail = react_2.useCallback(
        function () {
            return props.recipeImplementation.verifyEmail({
                userContext: userContext,
            });
        },
        [props.recipeImplementation]
    );
    var handleVerifyResp = react_2.useCallback(
        function (response) {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
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
    var handleError = react_2.useCallback(
        function (err) {
            if (error_1.default.isThisError(err)) {
                setErrorMessage(err.message);
            }
            setStatus("GENERAL_ERROR");
        },
        [setStatus, setErrorMessage]
    );
    utils_1.useOnMountAPICall(verifyEmail, handleVerifyResp, handleError);
    var onTokenInvalidRedirect = props.onTokenInvalidRedirect,
        onContinueClicked = props.onContinueClicked;
    if (status === "LOADING") {
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                react_1.jsx(
                    "div",
                    { "data-supertokens": "spinner", css: styles.spinner },
                    react_1.jsx(spinnerIcon_1.default, { color: styles.palette.colors.primary })
                )
            )
        );
    }
    if (status === "SUCCESSFUL") {
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
                react_1.jsx(checkedRoundIcon_1.default, { color: styles.palette.colors.success }),
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "headerTitle headerTinyTitle",
                        css: [styles.headerTitle, styles.headerTinyTitle],
                    },
                    t("EMAIL_VERIFICATION_SUCCESS")
                ),
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "emailVerificationButtonWrapper",
                        css: styles.emailVerificationButtonWrapper,
                    },
                    react_1.jsx(library_1.Button, {
                        isLoading: false,
                        onClick: onContinueClicked,
                        type: "button",
                        label: "EMAIL_VERIFICATION_CONTINUE_BTN",
                    })
                )
            )
        );
    }
    if (status === "INVALID") {
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "headerTitle headerTinyTitle",
                        css: [styles.headerTitle, styles.headerTinyTitle],
                    },
                    t("EMAIL_VERIFICATION_EXPIRED")
                ),
                react_1.jsx(
                    "div",
                    {
                        onClick: onTokenInvalidRedirect,
                        "data-supertokens": "secondaryText secondaryLinkWithArrow",
                        css: [styles.secondaryText, styles.secondaryLinkWithArrow],
                    },
                    t("EMAIL_VERIFICATION_CONTINUE_LINK"),
                    react_1.jsx(arrowRightIcon_1.default, { color: styles.palette.colors.textPrimary })
                )
            )
        );
    }
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
            react_1.jsx(
                "div",
                { "data-supertokens": "headerTitle error", css: [styles.headerTitle, styles.error] },
                react_1.jsx(errorLargeIcon_1.default, { color: styles.palette.colors.error }),
                t("EMAIL_VERIFICATION_ERROR_TITLE")
            ),
            react_1.jsx(
                "div",
                { "data-supertokens": "primaryText", css: styles.primaryText },
                t(errorMessage === undefined ? "EMAIL_VERIFICATION_ERROR_DESC" : errorMessage)
            )
        )
    );
};
exports.VerifyEmailLinkClicked = withOverride_1.withOverride(
    "EmailVerificationVerifyEmailLinkClicked",
    exports.EmailVerificationVerifyEmailLinkClicked
);
