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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var formBase_1 = tslib_1.__importDefault(require("../../../../emailpassword/components/library/formBase"));
var validators_1 = require("../../../../emailpassword/validators");
var signInUpFooter_1 = require("./signInUpFooter");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
exports.EmailForm = withOverride_1.withOverride("PasswordlessEmailForm", function PasswordlessEmailForm(props) {
    var _this = this;
    var userContext = usercontext_1.useUserContext();
    return react_1.jsx(formBase_1.default, {
        clearError: props.clearError,
        onError: props.onError,
        formFields: [
            {
                id: "email",
                label: "PWLESS_SIGN_IN_UP_EMAIL_LABEL",
                optional: false,
                autofocus: true,
                placeholder: "",
                // We are using the default validator that allows any string
                validate: validators_1.defaultValidate,
            },
        ],
        buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var email, validationRes, response;
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            email =
                                (_a = formFields.find(function (field) {
                                    return field.id === "email";
                                })) === null || _a === void 0
                                    ? void 0
                                    : _a.value;
                            if (email === undefined) {
                                throw new error_1.default("GENERAL_ERROR_EMAIL_UNDEFINED");
                            }
                            return [4 /*yield*/, props.config.validateEmailAddress(email)];
                        case 1:
                            validationRes = _b.sent();
                            if (validationRes !== undefined) {
                                throw new error_1.default(validationRes);
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    email: email,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _b.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
        footer: react_1.jsx(signInUpFooter_1.SignInUpFooter, {
            privacyPolicyLink: props.config.signInUpFeature.privacyPolicyLink,
            termsOfServiceLink: props.config.signInUpFeature.termsOfServiceLink,
        }),
    });
});
