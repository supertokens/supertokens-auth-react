"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
var React = require("react");
var styles_1 = require("../../styles/styles");
var core_1 = require("@emotion/core");
/*
 * Component.
 */
var SignInAndUpTheme = /** @class */ (function(_super) {
    __extends(SignInAndUpTheme, _super);
    function SignInAndUpTheme() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    SignInAndUpTheme.prototype.render = function() {
        return React.createElement(
            "div",
            { css: { backgroundColor: "blue" } },
            React.createElement(
                "div",
                { css: styles_1.defaultStyles.row },
                React.createElement(
                    "div",
                    { css: styles.header },
                    React.createElement("div", { css: styles.headerTitle }, "Sign In"),
                    React.createElement(
                        "div",
                        { css: styles.headerSubtitle },
                        React.createElement("div", null, "Not registered yet?"),
                        React.createElement("div", { css: styles.signUpLink }, "Sign up")
                    )
                ),
                React.createElement("div", { css: styles_1.defaultStyles.divider }),
                React.createElement(
                    "form",
                    null,
                    this.props.formFields.map(function(field) {
                        return React.createElement(
                            "div",
                            { key: field.id },
                            React.createElement("label", null, field.label),
                            React.createElement("input", { name: field.id, placeholder: field.placeholder })
                        );
                    })
                ),
                React.createElement("button", null, " Sign In "),
                React.createElement("h1", null, " Sign In "),
                React.createElement("div", null, "Forgot password?")
            )
        );
    };
    return SignInAndUpTheme;
})(React.Component);
var styles = {
    header: {
        height: "141px"
    },
    headerTitle: core_1.css({
        paddingTop: "49px",
        fontSize: styles_1.palette.fonts.size[1],
        lineHeight: "40px",
        letterSpacing: "0.28px",
        fontWeight: 700,
        fontFamily: styles_1.palette.fonts.primary,
        color: styles_1.palette.colors.primary,
        backgroundColor: "green"
    }),
    headerSubtitle: {
        fontSize: styles_1.palette.fonts.size[0],
        fontWeight: 400,
        color: styles_1.palette.colors.secondary,
        fontFamily: styles_1.palette.fonts.primary
    },
    signUpLink: {
        color: "blue"
    }
};
exports.default = SignInAndUpTheme;
