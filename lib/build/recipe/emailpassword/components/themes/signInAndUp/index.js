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
var signUp_1 = require("./signUp");
var signIn_1 = require("./signIn");
var themeBase_1 = require("../themeBase");
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../styles/styles");
var userContextWrapper_1 = tslib_1.__importDefault(require("../../../../../usercontext/userContextWrapper"));
exports.SignInAndUpTheme = function (props) {
    // If isSignUp, return signUp.
    if (props.featureState.isSignUp) {
        return React.createElement(
            styleContext_1.StyleProvider,
            {
                rawPalette: props.config.palette,
                defaultPalette: styles_1.defaultPalette,
                styleFromInit: props.signUpForm.styleFromInit,
                rootStyleFromInit: props.config.rootStyle,
                getDefaultStyles: styles_2.getStyles,
            },
            React.createElement(
                signUp_1.SignUp,
                tslib_1.__assign({}, props.signUpForm, {
                    signInClicked: function () {
                        props.dispatch({ type: "setSignIn" });
                    },
                })
            )
        );
    }
    // Otherwise, return SignIn.
    return React.createElement(
        styleContext_1.StyleProvider,
        {
            rawPalette: props.config.palette,
            defaultPalette: styles_1.defaultPalette,
            styleFromInit: props.signInForm.styleFromInit,
            rootStyleFromInit: props.config.rootStyle,
            getDefaultStyles: styles_2.getStyles,
        },
        React.createElement(
            signIn_1.SignIn,
            tslib_1.__assign({}, props.signInForm, {
                signUpClicked: function () {
                    props.dispatch({ type: "setSignUp" });
                },
            })
        )
    );
};
function SignInAndUpThemeWrapper(props) {
    var hasFont = styles_1.hasFontDefined(props.config.rootStyle);
    return React.createElement(
        userContextWrapper_1.default,
        { userContext: props.userContext },
        React.createElement(
            themeBase_1.ThemeBase,
            { loadDefaultFont: !hasFont },
            React.createElement(exports.SignInAndUpTheme, tslib_1.__assign({}, props))
        )
    );
}
exports.default = SignInAndUpThemeWrapper;
