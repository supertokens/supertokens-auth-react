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
var React = tslib_1.__importStar(require("react"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var userContextWrapper_1 = tslib_1.__importDefault(require("../../../../../usercontext/userContextWrapper"));
var styles_2 = require("../../../../emailpassword/components/themes/styles/styles");
var themeBase_1 = require("../../../../emailpassword/components/themes/themeBase");
var sendVerifyEmail_1 = require("./sendVerifyEmail");
var verifyEmailLinkClicked_1 = require("./verifyEmailLinkClicked");
/*
 * Component.
 */
function EmailVerificationTheme(props) {
    /*
     * Render.
     */
    // If no token, return SendVerifyEmail.
    if (props.verifyEmailLinkClickedScreen === undefined) {
        return React.createElement(
            styleContext_1.StyleProvider,
            {
                rawPalette: props.config.palette,
                defaultPalette: styles_1.defaultPalette,
                styleFromInit: props.sendVerifyEmailScreen.styleFromInit,
                rootStyleFromInit: props.config.rootStyle,
                getDefaultStyles: styles_2.getStyles,
            },
            React.createElement(sendVerifyEmail_1.SendVerifyEmail, tslib_1.__assign({}, props.sendVerifyEmailScreen))
        );
    }
    // Otherwise, return VerifyEmailLinkClicked.
    return React.createElement(
        styleContext_1.StyleProvider,
        {
            rawPalette: props.config.palette,
            defaultPalette: styles_1.defaultPalette,
            styleFromInit: props.verifyEmailLinkClickedScreen.styleFromInit,
            rootStyleFromInit: props.config.rootStyle,
            getDefaultStyles: styles_2.getStyles,
        },
        React.createElement(
            verifyEmailLinkClicked_1.VerifyEmailLinkClicked,
            tslib_1.__assign({}, props.verifyEmailLinkClickedScreen)
        )
    );
}
exports.EmailVerificationTheme = EmailVerificationTheme;
function EmailVerificationThemeWrapper(props) {
    var hasFont = styles_1.hasFontDefined(props.config.rootStyle);
    return React.createElement(
        userContextWrapper_1.default,
        { userContext: props.userContext },
        React.createElement(
            themeBase_1.ThemeBase,
            { loadDefaultFont: !hasFont },
            React.createElement(EmailVerificationTheme, tslib_1.__assign({}, props))
        )
    );
}
exports.default = EmailVerificationThemeWrapper;
