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
exports.SignUpFooter = void 0;
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
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
exports.SignUpFooter = (0, withOverride_1.withOverride)("ThirdPartySignUpFooter", function ThirdPartySignUpFooter(_a) {
    var termsOfServiceLink = _a.termsOfServiceLink,
        privacyPolicyLink = _a.privacyPolicyLink;
    var styles = (0, react_1.useContext)(styleContext_1.default);
    var t = (0, translationContext_1.useTranslation)();
    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }
    return (0,
    jsx_runtime_1.jsxs)("div", __assign({ "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions", css: [styles.secondaryText, styles.privacyPolicyAndTermsAndConditions] }, { children: [t("THIRD_PARTY_SIGN_IN_UP_FOOTER_START"), termsOfServiceLink !== undefined && (0, jsx_runtime_1.jsx)("a", __assign({ "data-supertokens": "link", css: styles.link, href: termsOfServiceLink, target: "_blank", rel: "noopener noreferer" }, { children: t("THIRD_PARTY_SIGN_IN_UP_FOOTER_TOS") })), termsOfServiceLink !== undefined && privacyPolicyLink !== undefined && t("THIRD_PARTY_SIGN_IN_UP_FOOTER_AND"), privacyPolicyLink !== undefined && (0, jsx_runtime_1.jsx)("a", __assign({ "data-supertokens": "link", css: styles.link, href: privacyPolicyLink, target: "_blank", rel: "noopener noreferer" }, { children: t("THIRD_PARTY_SIGN_IN_UP_FOOTER_PP") })), t("THIRD_PARTY_SIGN_IN_UP_FOOTER_END")] }));
});
