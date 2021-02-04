"use strict";
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
var styleContext_1 = __importDefault(require("../../styles/styleContext"));
var formBase_1 = __importDefault(require("../../library/formBase"));
var signUpFooter_1 = __importDefault(require("./signUpFooter"));
/*
 * Component.
 */
var SignUpTheme = /** @class */ (function(_super) {
    __extends(SignUpTheme, _super);
    function SignUpTheme() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    /*
     * Render.
     */
    SignUpTheme.prototype.render = function() {
        var styles = this.context;
        var _a = this.props,
            privacyPolicyLink = _a.privacyPolicyLink,
            termsOfServiceLink = _a.termsOfServiceLink,
            signInClicked = _a.signInClicked,
            onSuccess = _a.onSuccess,
            signUpAPI = _a.signUpAPI;
        var formFields = this.props.formFields;
        return react_1.jsx(formBase_1.default, {
            formFields: formFields,
            buttonLabel: "SIGN UP",
            onSuccess: onSuccess,
            callAPI: signUpAPI,
            validateOnBlur: true,
            showLabels: true,
            header: react_1.jsx(
                react_2.Fragment,
                null,
                react_1.jsx("div", { "data-supertokens": "headerTitle", css: styles.headerTitle }, "Sign Up"),
                react_1.jsx(
                    "div",
                    { "data-supertokens": "headerSubtitle", css: styles.headerSubtitle },
                    react_1.jsx(
                        "div",
                        { "data-supertokens": "secondaryText", css: styles.secondaryText },
                        "Already have an account?",
                        react_1.jsx(
                            "span",
                            { "data-supertokens": "link", onClick: signInClicked, css: styles.link },
                            "Sign In"
                        )
                    )
                ),
                react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider })
            ),
            footer: react_1.jsx(signUpFooter_1.default, {
                privacyPolicyLink: privacyPolicyLink,
                termsOfServiceLink: termsOfServiceLink
            })
        });
    };
    SignUpTheme.contextType = styleContext_1.default;
    return SignUpTheme;
})(react_2.PureComponent);
exports.default = SignUpTheme;
