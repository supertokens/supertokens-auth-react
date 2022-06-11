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
var formBase_1 = tslib_1.__importDefault(require("../../library/formBase"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var utils_1 = require("../../../../../utils");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
exports.SignInForm = withOverride_1.withOverride("EmailPasswordSignInForm", function EmailPasswordSignInForm(props) {
    var _this = this;
    var userContext = usercontext_1.useUserContext();
    return react_1.jsx(formBase_1.default, {
        formFields: props.formFields,
        clearError: props.clearError,
        onError: props.onError,
        buttonLabel: "EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var validationErrors, response;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                utils_1.validateForm(formFields, props.config.signInAndUpFeature.signInForm.formFields),
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
                                props.recipeImplementation.signIn({
                                    formFields: formFields,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _a.sent();
                            if (response.status === "WRONG_CREDENTIALS_ERROR") {
                                throw new error_1.default("EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR");
                            } else {
                                return [2 /*return*/, response];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
        footer: props.footer,
    });
});
