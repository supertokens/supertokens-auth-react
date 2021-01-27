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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var react_1 = __importStar(require("react"));
var styleContext_1 = __importDefault(require("../../../styles/styleContext"));
function SignUpFooter(_a) {
    var termsOfServiceLink = _a.termsOfServiceLink, privacyPolicyLink = _a.privacyPolicyLink;
    var styles = react_1.useContext(styleContext_1.default);
    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }
    return (react_1.default.createElement("div", { "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions", css: [styles.secondaryText, styles.privacyPolicyAndTermsAndConditions] },
        "By signing up, you agree to our",
        termsOfServiceLink !== undefined && (react_1.default.createElement("a", { "data-supertokens": "link", css: styles.link, target: "_blank", href: termsOfServiceLink }, "Terms of Service")),
        termsOfServiceLink !== undefined && privacyPolicyLink !== undefined && "and",
        privacyPolicyLink !== undefined && (react_1.default.createElement("a", { "data-supertokens": "link", css: styles.link, href: privacyPolicyLink, target: "_blank" }, "Privacy Policy"))));
}
exports.default = SignUpFooter;
