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
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var arrowLeftIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/arrowLeftIcon"));
var translationContext_1 = require("../../../../../translation/translationContext");
var usercontext_1 = require("../../../../../usercontext");
exports.UserInputCodeFormFooter = withOverride_1.withOverride(
    "PasswordlessUserInputCodeFormFooter",
    function PasswordlessUserInputCodeFormFooter(_a) {
        var loginAttemptInfo = _a.loginAttemptInfo,
            recipeImplementation = _a.recipeImplementation;
        var t = translationContext_1.useTranslation();
        var styles = react_2.useContext(styleContext_1.default);
        var userContext = usercontext_1.useUserContext();
        return react_1.jsx(
            react_2.Fragment,
            null,
            react_1.jsx(
                "div",
                {
                    "data-supertokens": "secondaryText secondaryLinkWithLeftArrow",
                    css: [styles.secondaryText, styles.secondaryLinkWithLeftArrow],
                    onClick: function () {
                        return recipeImplementation.clearLoginAttemptInfo({
                            userContext: userContext,
                        });
                    },
                },
                react_1.jsx(arrowLeftIcon_1.default, { color: styles.palette.colors.textPrimary }),
                loginAttemptInfo.contactMethod === "EMAIL"
                    ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                    : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE")
            )
        );
    }
);
