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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var signUpFooter_1 = __importDefault(
    require("../../../../authRecipeModule/components/themes/signInAndUp/signUpFooter")
);
var themeBase_1 = require("../themeBase");
var providersForm_1 = __importDefault(require("./providersForm"));
/*
 * Component.
 */
function SignInAndUpTheme(props) {
    var styles = react_2.useContext(styleContext_1.default);
    return react_1.jsx(
        themeBase_1.ThemeBase,
        null,
        react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                react_1.jsx("div", { "data-supertokens": "headerTitle", css: styles.headerTitle }, "Sign Up / Sign In"),
                react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider }),
                react_1.jsx(providersForm_1.default, __assign({}, props)),
                react_1.jsx(signUpFooter_1.default, {
                    privacyPolicyLink: props.privacyPolicyLink,
                    termsOfServiceLink: props.termsOfServiceLink,
                })
            )
        )
    );
}
exports.default = SignInAndUpTheme;
//# sourceMappingURL=index.js.map
