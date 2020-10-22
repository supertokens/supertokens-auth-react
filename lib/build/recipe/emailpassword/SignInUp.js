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
var constants_1 = require("../../constants");
var _1 = require("./");
var _2 = require("./");
/*
 * Component.
 */
var SignInUp = /** @class */ (function(_super) {
    __extends(SignInUp, _super);
    function SignInUp() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.getRecipeInstanceOrThrow = function() {
            var instance;
            if (_this.props.__internal !== undefined && _this.props.__internal.instance !== undefined) {
                instance = _this.props.__internal.instance;
            } else {
                instance = _1.default.getInstanceIfDefined();
            }
            return instance;
        };
        return _this;
    }
    SignInUp.prototype.render = function() {
        return React.createElement(
            "div",
            { id: constants_1.CLASS_CONTAINER },
            React.createElement(
                _2.SignInAndUpTheme,
                // TODO Get the form Fields from the recipe.
                {
                    // TODO Get the form Fields from the recipe.
                    formFields: [
                        {
                            id: "email",
                            label: "Email",
                            placeholder: "youremail@example.com",
                            validate: function(email) {
                                return new Promise(function(resolve) {
                                    return resolve(true);
                                });
                            }
                        },
                        {
                            id: "password",
                            label: "Password",
                            placeholder: "Enter your password",
                            validate: function(password) {
                                return new Promise(function(resolve) {
                                    return resolve(true);
                                });
                            }
                        }
                    ]
                }
            )
        );
    };
    return SignInUp;
})(React.Component);
exports.default = SignInUp;
