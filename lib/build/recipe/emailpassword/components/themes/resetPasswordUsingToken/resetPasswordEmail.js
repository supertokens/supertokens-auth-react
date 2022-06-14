"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var formBase_1 = tslib_1.__importDefault(require("../../library/formBase"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
var utils_1 = require("../../../../../utils");
var generalError_1 = tslib_1.__importDefault(require("../../library/generalError"));
var usercontext_1 = require("../../../../../usercontext");
var EmailPasswordResetPasswordEmail = function (props) {
    var styles = react_2.useContext(styleContext_1.default);
    var t = translationContext_1.useTranslation();
    var userContext = usercontext_1.useUserContext();
    var _a = react_2.useState("READY"),
        status = _a[0],
        setStatus = _a[1];
    var onSuccess = function () {
        setStatus("SENT");
    };
    var resend = function () {
        setStatus("READY");
    };
    var formFields = props.formFields;
    if (status === "SENT") {
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "primaryText enterEmailSuccessMessage",
                        css: [styles.primaryText, styles.enterEmailSuccessMessage],
                    },
                    t("EMAIL_PASSWORD_RESET_SEND_SUCCESS"),
                    react_1.jsx(
                        "span",
                        { "data-supertokens": "link", css: styles.link, onClick: resend },
                        t("EMAIL_PASSWORD_RESET_RESEND_LINK")
                    )
                )
            )
        );
    }
    // Otherwise, return Form.
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row", css: styles.row },
            react_1.jsx(
                "div",
                { "data-supertokens": "headerTitle", css: styles.headerTitle },
                t("EMAIL_PASSWORD_RESET_HEADER_TITLE")
            ),
            react_1.jsx(
                "div",
                { "data-supertokens": "headerSubtitle", css: styles.headerSubtitle },
                react_1.jsx(
                    "div",
                    { "data-supertokens": "secondaryText", css: styles.secondaryText },
                    t("EMAIL_PASSWORD_RESET_HEADER_SUBTITLE")
                )
            ),
            props.error !== undefined && react_1.jsx(generalError_1.default, { error: props.error }),
            react_1.jsx(formBase_1.default, {
                clearError: props.clearError,
                onError: props.onError,
                formFields: formFields,
                buttonLabel: "EMAIL_PASSWORD_RESET_SEND_BTN",
                onSuccess: onSuccess,
                callAPI: function (formFields) {
                    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var validationErrors;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        utils_1.validateForm(
                                            formFields,
                                            props.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields
                                        ),
                                    ];
                                case 1:
                                    validationErrors = _a.sent();
                                    if (validationErrors.length > 0) {
                                        return [
                                            2 /*return*/,
                                            {
                                                status: "FIELD_ERROR",
                                                formFields: validationErrors,
                                            },
                                        ];
                                    }
                                    return [
                                        4 /*yield*/,
                                        props.recipeImplementation.sendPasswordResetEmail({
                                            formFields: formFields,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 2:
                                    return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                },
                showLabels: true,
                validateOnBlur: true,
            })
        )
    );
};
exports.ResetPasswordEmail = withOverride_1.withOverride(
    "EmailPasswordResetPasswordEmail",
    EmailPasswordResetPasswordEmail
);
