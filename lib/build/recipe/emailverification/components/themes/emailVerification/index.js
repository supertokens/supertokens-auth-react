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
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var React = __importStar(require("react"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../../../../emailpassword/components/themes/styles/styles");
var themeBase_1 = require("../../../../emailpassword/components/themes/themeBase");
var sendVerifyEmail_1 = __importDefault(require("./sendVerifyEmail"));
var verifyEmailLinkClicked_1 = __importDefault(require("./verifyEmailLinkClicked"));
/*
 * Component.
 */
function EmailVerificationTheme(props) {
    /*
     * Render.
     */
    // If no token, return SendVerifyEmail.
    if (props.hasToken === false) {
        return React.createElement(
            styleContext_1.StyleProvider,
            {
                rawPalette: props.rawPalette,
                defaultPalette: styles_1.defaultPalette,
                styleFromInit: props.sendVerifyEmailScreen.styleFromInit,
                getDefaultStyles: styles_2.getStyles,
            },
            React.createElement(sendVerifyEmail_1.default, __assign({}, props.sendVerifyEmailScreen))
        );
    }
    // Otherwise, return VerifyEmailLinkClicked.
    return React.createElement(
        styleContext_1.StyleProvider,
        {
            rawPalette: props.rawPalette,
            defaultPalette: styles_1.defaultPalette,
            styleFromInit: props.verifyEmailLinkClickedScreen.styleFromInit,
            getDefaultStyles: styles_2.getStyles,
        },
        React.createElement(verifyEmailLinkClicked_1.default, __assign({}, props.verifyEmailLinkClickedScreen))
    );
}
exports.EmailVerificationTheme = EmailVerificationTheme;
function EmailVerificationThemeWrapper(props) {
    return React.createElement(
        themeBase_1.ThemeBase,
        null,
        React.createElement(EmailVerificationTheme, __assign({}, props))
    );
}
exports.default = EmailVerificationThemeWrapper;
//# sourceMappingURL=index.js.map
