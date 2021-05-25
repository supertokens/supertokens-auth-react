"use strict";
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
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
var formBase_1 = __importDefault(require("../../library/formBase"));
/*
 * Component.
 */
var EnterEmailTheme = /** @class */ (function (_super) {
    __extends(EnterEmailTheme, _super);
    /*
     * Constructor.
     */
    function EnterEmailTheme(props) {
        var _this = _super.call(this, props) || this;
        /*
         * Methods.
         */
        _this.onSuccess = function () {
            _this.setState(function () {
                return {
                    status: "SENT",
                };
            });
            _this.props.onSuccess();
        };
        _this.resend = function () {
            _this.setState(function () {
                return {
                    status: "READY",
                };
            });
        };
        _this.state = {
            status: "READY",
        };
        return _this;
    }
    /*
     * Render.
     */
    EnterEmailTheme.prototype.render = function () {
        var styles = this.context;
        var _a = this.props,
            formFields = _a.formFields,
            enterEmailAPI = _a.enterEmailAPI;
        var status = this.state.status;
        if (status === "SENT") {
            return react_1.jsx(
                "div",
                { "data-supertokens": "container", css: styles.container },
                react_1.jsx(
                    "div",
                    { "data-supertokens": "row", css: styles.row },
                    react_1.jsx(
                        "div",
                        {
                            "data-supertokens": "primaryText enterEmailSuccessMessage",
                            css: [styles.primaryText, styles.enterEmailSuccessMessage],
                        },
                        "Please check your email for the password recovery link.",
                        " ",
                        react_1.jsx(
                            "span",
                            { "data-supertokens": "link", css: styles.link, onClick: this.resend },
                            "Resend"
                        )
                    )
                )
            );
        }
        // Otherwise, return Form.
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                react_1.jsx(formBase_1.default, {
                    formFields: formFields,
                    buttonLabel: "Email me",
                    onSuccess: this.onSuccess,
                    callAPI: enterEmailAPI,
                    showLabels: false,
                    validateOnBlur: true,
                    header: react_1.jsx(
                        react_2.Fragment,
                        null,
                        react_1.jsx(
                            "div",
                            { "data-supertokens": "headerTitle", css: styles.headerTitle },
                            "Reset your password"
                        ),
                        react_1.jsx(
                            "div",
                            { "data-supertokens": "headerSubtitle", css: styles.headerSubtitle },
                            react_1.jsx(
                                "div",
                                { "data-supertokens": "secondaryText", css: styles.secondaryText },
                                "We will send you an email to reset your password"
                            )
                        )
                    ),
                })
            )
        );
    };
    EnterEmailTheme.contextType = styleContext_1.default;
    return EnterEmailTheme;
})(react_2.PureComponent);
exports.default = EnterEmailTheme;
//# sourceMappingURL=enterEmail.js.map
