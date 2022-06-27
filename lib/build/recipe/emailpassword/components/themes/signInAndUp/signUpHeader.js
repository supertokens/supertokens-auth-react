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
exports.SignUpHeader = void 0;
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
 * Imports
 */
var react_1 = require("react");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
exports.SignUpHeader = (0, withOverride_1.withOverride)(
    "EmailPasswordSignUpHeader",
    function EmailPasswordSignUpHeader(_a) {
        var onClick = _a.onClick;
        var styles = (0, react_1.useContext)(styleContext_1.default);
        var t = (0, translationContext_1.useTranslation)();
        return (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
            children: [
                (0, jsx_runtime_1.jsx)(
                    "div",
                    __assign(
                        { "data-supertokens": "headerTitle", css: styles.headerTitle },
                        { children: t("EMAIL_PASSWORD_SIGN_UP_HEADER_TITLE") }
                    )
                ),
                (0, jsx_runtime_1.jsx)(
                    "div",
                    __assign(
                        { "data-supertokens": "headerSubtitle", css: styles.headerSubtitle },
                        {
                            children: (0, jsx_runtime_1.jsxs)(
                                "div",
                                __assign(
                                    { "data-supertokens": "secondaryText", css: styles.secondaryText },
                                    {
                                        children: [
                                            t("EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_START"),
                                            (0, jsx_runtime_1.jsx)(
                                                "span",
                                                __assign(
                                                    { "data-supertokens": "link", onClick: onClick, css: styles.link },
                                                    {
                                                        children: t(
                                                            "EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_SIGN_IN_LINK"
                                                        ),
                                                    }
                                                )
                                            ),
                                            t("EMAIL_PASSWORD_SIGN_UP_HEADER_SUBTITLE_END"),
                                        ],
                                    }
                                )
                            ),
                        }
                    )
                ),
                (0, jsx_runtime_1.jsx)("div", { "data-supertokens": "divider", css: styles.divider }),
            ],
        });
    }
);
