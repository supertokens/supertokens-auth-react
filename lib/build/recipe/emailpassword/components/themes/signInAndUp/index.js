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
    function() {
        __assign =
            Object.assign ||
            function(t) {
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
    function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var React = __importStar(require("react"));
var react_1 = require("react");
var signUp_1 = __importDefault(require("./signUp"));
var signIn_1 = __importDefault(require("./signIn"));
var themeBase_1 = require("../themeBase");
var styles_1 = require("../styles/styles");
var styleContext_1 = require("../../../../../styles/styleContext");
/*
 * Component.
 */
function SignInAndUpTheme(_a) {
    /*
     * State.
     */
    var signInForm = _a.signInForm,
        rawPalette = _a.rawPalette,
        signUpForm = _a.signUpForm,
        defaultToSignUp = _a.defaultToSignUp;
    var _b = react_1.useState(defaultToSignUp),
        isSignUp = _b[0],
        setSignUp = _b[1];
    /*
     * Render.
     */
    // If isSignUp, return signUp.
    if (isSignUp) {
        return React.createElement(
            styleContext_1.StyleProvider,
            {
                rawPalette: rawPalette,
                defaultPalette: styles_1.defaultPalette,
                styleFromInit: signUpForm.styleFromInit,
                getDefaultStyles: styles_1.getDefaultStyles
            },
            React.createElement(
                signUp_1.default,
                __assign({}, signUpForm, {
                    signInClicked: function() {
                        return setSignUp(false);
                    }
                })
            )
        );
    }
    // Otherwise, return SignIn.
    return React.createElement(
        styleContext_1.StyleProvider,
        {
            rawPalette: rawPalette,
            defaultPalette: styles_1.defaultPalette,
            styleFromInit: signInForm.styleFromInit,
            getDefaultStyles: styles_1.getDefaultStyles
        },
        React.createElement(
            signIn_1.default,
            __assign({}, signInForm, {
                signUpClicked: function() {
                    return setSignUp(true);
                }
            })
        )
    );
}
exports.SignInAndUpTheme = SignInAndUpTheme;
function SignInAndUpThemeWrapper(props) {
    return React.createElement(themeBase_1.ThemeBase, null, React.createElement(SignInAndUpTheme, __assign({}, props)));
}
exports.default = SignInAndUpThemeWrapper;
