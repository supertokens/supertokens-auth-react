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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputCodeFormFooter = void 0;
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
var react_1 = require("react");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var arrowLeftIcon_1 = __importDefault(require("../../../../../components/assets/arrowLeftIcon"));
var translationContext_1 = require("../../../../../translation/translationContext");
var usercontext_1 = require("../../../../../usercontext");
exports.UserInputCodeFormFooter = (0, withOverride_1.withOverride)(
    "PasswordlessUserInputCodeFormFooter",
    function PasswordlessUserInputCodeFormFooter(_a) {
        var loginAttemptInfo = _a.loginAttemptInfo,
            recipeImplementation = _a.recipeImplementation;
        var t = (0, translationContext_1.useTranslation)();
        var styles = (0, react_1.useContext)(styleContext_1.default);
        var userContext = (0, usercontext_1.useUserContext)();
        return (0, jsx_runtime_1.jsx)(react_1.Fragment, {
            children: (0, jsx_runtime_1.jsxs)(
                "div",
                __assign(
                    {
                        "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                        css: [styles.secondaryText, styles.secondaryLinkWithLeftArrow],
                        onClick: function () {
                            return recipeImplementation.clearLoginAttemptInfo({
                                userContext: userContext,
                            });
                        },
                    },
                    {
                        children: [
                            (0, jsx_runtime_1.jsx)(arrowLeftIcon_1.default, {
                                color: styles.palette.colors.textPrimary,
                            }),
                            loginAttemptInfo.contactMethod === "EMAIL"
                                ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                                : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE"),
                        ],
                    }
                )
            ),
        });
    }
);
