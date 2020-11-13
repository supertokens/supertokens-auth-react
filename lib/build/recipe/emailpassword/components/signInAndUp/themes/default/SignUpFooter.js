"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = SignUpFooter;

var _react = _interopRequireDefault(require("react"));

var _styleContext = require("../../../../styles/styleContext");

var _core = require("@emotion/core");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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

/** @jsx jsx */
function SignUpFooter(_ref) {
    var componentStyles = _ref.componentStyles,
        termsOfServiceLink = _ref.termsOfServiceLink,
        privacyPolicyLink = _ref.privacyPolicyLink;

    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }

    return (0, _core.jsx)(_styleContext.StyleConsumer, null, function(styles) {
        return (0, _core.jsx)(
            "div",
            {
                className: "secondaryText privacyPolicyAndTermsAndConditions",
                css: [
                    componentStyles.privacyPolicyAndTermsAndConditions,
                    styles.secondaryText,
                    styles.privacyPolicyAndTermsAndConditions
                ]
            },
            "By signing up, you agree to our",
            termsOfServiceLink !== undefined &&
                (0, _core.jsx)(
                    "a",
                    {
                        className: "link",
                        css: styles.link,
                        target: "_blank",
                        href: termsOfServiceLink
                    },
                    "Terms of Service"
                ),
            termsOfServiceLink !== undefined && privacyPolicyLink !== undefined && "and",
            privacyPolicyLink !== undefined &&
                (0, _core.jsx)(
                    "a",
                    {
                        className: "link",
                        css: styles.link,
                        href: privacyPolicyLink,
                        target: "_blank"
                    },
                    "Privacy Policy"
                )
        );
    });
}
