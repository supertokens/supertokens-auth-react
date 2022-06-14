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
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
exports.SignUpFooter = withOverride_1.withOverride("EmailPasswordSignUpFooter", function EmailPasswordSignUpFooter(_a) {
    var termsOfServiceLink = _a.termsOfServiceLink,
        privacyPolicyLink = _a.privacyPolicyLink;
    var styles = react_2.useContext(styleContext_1.default);
    var t = translationContext_1.useTranslation();
    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }
    return react_1.jsx(
        "div",
        {
            "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions",
            css: [styles.secondaryText, styles.privacyPolicyAndTermsAndConditions],
        },
        t("EMAIL_PASSWORD_SIGN_UP_FOOTER_START"),
        termsOfServiceLink !== undefined &&
            react_1.jsx(
                "a",
                {
                    "data-supertokens": "link",
                    css: styles.link,
                    href: termsOfServiceLink,
                    target: "_blank",
                    rel: "noopener noreferer",
                },
                t("EMAIL_PASSWORD_SIGN_UP_FOOTER_TOS")
            ),
        termsOfServiceLink !== undefined && privacyPolicyLink !== undefined && t("EMAIL_PASSWORD_SIGN_UP_FOOTER_AND"),
        privacyPolicyLink !== undefined &&
            react_1.jsx(
                "a",
                {
                    "data-supertokens": "link",
                    css: styles.link,
                    href: privacyPolicyLink,
                    target: "_blank",
                    rel: "noopener noreferer",
                },
                t("EMAIL_PASSWORD_SIGN_UP_FOOTER_PP")
            ),
        t("EMAIL_PASSWORD_SIGN_UP_FOOTER_END")
    );
});
