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
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var library_1 = require("../../library");
var formBase_1 = tslib_1.__importDefault(require("../../library/formBase"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var utils_1 = require("../../../../../utils");
var generalError_1 = tslib_1.__importDefault(require("../../library/generalError"));
var usercontext_1 = require("../../../../../usercontext");
var EmailPasswordSubmitNewPassword = function (props) {
    var styles = react_2.useContext(styleContext_1.default);
    var t = translationContext_1.useTranslation();
    var userContext = usercontext_1.useUserContext();
    var _a = react_2.useState("READY"),
        status = _a[0],
        setStatus = _a[1];
    var onSuccess = function () {
        setStatus("SUCCESS");
    };
    var formFields = props.formFields,
        onSignInClicked = props.onSignInClicked;
    if (status === "SUCCESS") {
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                react_1.jsx(
                    "div",
                    { "data-supertokens": "headerTitle", css: styles.headerTitle },
                    t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE")
                ),
                react_1.jsx(
                    library_1.FormRow,
                    { key: "form-button" },
                    react_1.jsx(
                        react_2.Fragment,
                        null,
                        react_1.jsx(
                            "div",
                            {
                                "data-supertokens": "primaryText submitNewPasswordSuccessMessage",
                                css: [styles.primaryText, styles.submitNewPasswordSuccessMessage],
                            },
                            t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC")
                        ),
                        react_1.jsx(library_1.Button, {
                            disabled: false,
                            isLoading: false,
                            type: "button",
                            onClick: onSignInClicked,
                            label: "EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN",
                        })
                    )
                )
            )
        );
    }
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row", css: styles.row },
            react_1.jsx(
                "div",
                { "data-supertokens": "headerTitle", css: styles.headerTitle },
                t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE")
            ),
            react_1.jsx(
                "div",
                { "data-supertokens": "headerSubtitle", css: styles.headerSubtitle },
                react_1.jsx(
                    "div",
                    { "data-supertokens": "secondaryText", css: styles.secondaryText },
                    t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE")
                )
            ),
            props.error !== undefined && react_1.jsx(generalError_1.default, { error: props.error }),
            react_1.jsx(formBase_1.default, {
                formFields: formFields,
                clearError: props.clearError,
                onError: props.onError,
                buttonLabel: "EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN",
                onSuccess: onSuccess,
                validateOnBlur: true,
                callAPI: function (fields) {
                    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var validationErrors, response;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        utils_1.validateForm(
                                            fields,
                                            props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields
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
                                    // Verify that both passwords match.
                                    if (fields[0].value !== fields[1].value) {
                                        return [
                                            2 /*return*/,
                                            {
                                                status: "FIELD_ERROR",
                                                formFields: [
                                                    {
                                                        id: fields[1].id,
                                                        error: "ERROR_CONFIRM_PASSWORD_NO_MATCH",
                                                    },
                                                ],
                                            },
                                        ];
                                    }
                                    return [
                                        4 /*yield*/,
                                        props.recipeImplementation.submitNewPassword({
                                            formFields: fields,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 2:
                                    response = _a.sent();
                                    if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                                        throw new error_1.default("EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR");
                                    }
                                    return [
                                        2 /*return*/,
                                        response.status === "FIELD_ERROR"
                                            ? response
                                            : {
                                                  status: "OK",
                                              },
                                    ];
                            }
                        });
                    });
                },
                showLabels: true,
            })
        )
    );
};
exports.SubmitNewPassword = withOverride_1.withOverride(
    "EmailPasswordSubmitNewPassword",
    EmailPasswordSubmitNewPassword
);
