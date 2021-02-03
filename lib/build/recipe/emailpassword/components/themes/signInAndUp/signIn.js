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
var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var formBase_1 = __importDefault(require("../../library/formBase"));
/*
 * Component.
 */
var SignInTheme = /** @class */ (function(_super) {
    __extends(SignInTheme, _super);
    function SignInTheme() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    /*
     * Render.
     */
    SignInTheme.prototype.render = function() {
        var styles = this.context;
        var _a = this.props,
            signUpClicked = _a.signUpClicked,
            forgotPasswordClick = _a.forgotPasswordClick,
            onSuccess = _a.onSuccess,
            signInAPI = _a.signInAPI;
        var formFields = this.props.formFields;
        return react_1.jsx(formBase_1.default, {
            formFields: formFields,
            buttonLabel: "SIGN IN",
            onSuccess: onSuccess,
            callAPI: signInAPI,
            showLabels: true,
            header: react_1.jsx(
                react_2.Fragment,
                null,
                react_1.jsx("div", { "data-supertokens": "headerTitle", css: styles.headerTitle }, "Sign In"),
                react_1.jsx(
                    "div",
                    { "data-supertokens": "headerSubtitle", css: styles.headerSubtitle },
                    react_1.jsx(
                        "div",
                        { "data-supertokens": "secondaryText", css: styles.secondaryText },
                        "Not registered yet?",
                        react_1.jsx(
                            "span",
                            { "data-supertokens": "link", onClick: signUpClicked, css: styles.link },
                            "Sign Up"
                        )
                    )
                ),
                react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider })
            ),
            footer: react_1.jsx(
                "div",
                {
                    "data-supertokens": "link secondaryText forgotPasswordLink",
                    css: [styles.link, styles.secondaryText, styles.forgotPasswordLink],
                    onClick: forgotPasswordClick
                },
                "Forgot password?"
            )
        });
    };
    SignInTheme.contextType = styleContext_1.default;
    return SignInTheme;
})(react_2.PureComponent);
exports.default = SignInTheme;
