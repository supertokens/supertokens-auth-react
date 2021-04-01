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
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var library_1 = require("../../library");
var formBase_1 = __importDefault(require("../../library/formBase"));
/*
 * Component.
 */
var SubmitNewPasswordTheme = /** @class */ (function (_super) {
    __extends(SubmitNewPasswordTheme, _super);
    /*
     * Constructor.
     */
    function SubmitNewPasswordTheme(props) {
        var _this = _super.call(this, props) || this;
        _this.onSuccess = function () {
            _this.setState(function () {
                return {
                    status: "SUCCESS",
                };
            });
            _this.props.onSuccess();
        };
        _this.state = {
            status: "READY",
        };
        return _this;
    }
    /*
     * Render.
     */
    SubmitNewPasswordTheme.prototype.render = function () {
        var styles = this.context;
        var _a = this.props,
            submitNewPasswordAPI = _a.submitNewPasswordAPI,
            formFields = _a.formFields,
            onSignInClicked = _a.onSignInClicked;
        var status = this.state.status;
        if (status === "SUCCESS") {
            return react_1.jsx(
                "div",
                { "data-supertokens": "container", css: styles.container },
                react_1.jsx(
                    "div",
                    { "data-supertokens": "row", css: styles.row },
                    react_1.jsx("div", { "data-supertokens": "headerTitle", css: styles.headerTitle }, "Success!"),
                    react_1.jsx(
                        library_1.FormRow,
                        { key: "form-button" },
                        react_1.jsx(
                            react_2.Fragment,
                            null,
                            react_1.jsx(
                                "div",
                                {
                                    "data-supertokens": "primaryText submitNewPasswordSuccessMessage",
                                    css: [styles.primaryText, styles.submitNewPasswordSuccessMessage],
                                },
                                "Your password has been updated successfully"
                            ),
                            react_1.jsx(library_1.Button, {
                                disabled: false,
                                isLoading: false,
                                type: "button",
                                onClick: onSignInClicked,
                                label: "SIGN IN",
                            })
                        )
                    )
                )
            );
        }
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                react_1.jsx(formBase_1.default, {
                    formFields: formFields,
                    buttonLabel: "Change password",
                    onSuccess: this.onSuccess,
                    validateOnBlur: true,
                    callAPI: submitNewPasswordAPI,
                    showLabels: true,
                    header: react_1.jsx(
                        react_2.Fragment,
                        null,
                        react_1.jsx(
                            "div",
                            { "data-supertokens": "headerTitle", css: styles.headerTitle },
                            "Change your password"
                        ),
                        react_1.jsx(
                            "div",
                            { "data-supertokens": "headerSubtitle", css: styles.headerSubtitle },
                            react_1.jsx(
                                "div",
                                { "data-supertokens": "secondaryText", css: styles.secondaryText },
                                "Enter a new password below to change your password"
                            )
                        )
                    ),
                })
            )
        );
    };
    SubmitNewPasswordTheme.contextType = styleContext_1.default;
    return SubmitNewPasswordTheme;
})(react_2.PureComponent);
exports.default = SubmitNewPasswordTheme;
//# sourceMappingURL=submitNewPassword.js.map
