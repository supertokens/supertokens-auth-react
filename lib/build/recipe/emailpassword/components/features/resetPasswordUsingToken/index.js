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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var React = __importStar(require("react"));
var react_2 = require("react");
var resetPasswordUsingToken_1 = __importDefault(require("../../themes/resetPasswordUsingToken"));
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var ResetPasswordUsingToken = /** @class */ (function (_super) {
    __extends(ResetPasswordUsingToken, _super);
    /*
     * Constructor.
     */
    function ResetPasswordUsingToken(props) {
        var _this = _super.call(this, props) || this;
        _this.getIsEmbedded = function () {
            if (_this.props.isEmbedded !== undefined) {
                return _this.props.isEmbedded;
            }
            return false;
        };
        _this.render = function () {
            var enterEmailFormFeature = _this.props.recipe.config.resetPasswordUsingTokenFeature.enterEmailForm;
            var componentOverrides = _this.props.recipe.config.override.components;
            var submitNewPasswordFormFeature =
                _this.props.recipe.config.resetPasswordUsingTokenFeature.submitNewPasswordForm;
            var submitNewPasswordForm =
                _this.state.token === undefined
                    ? undefined
                    : {
                          styleFromInit: submitNewPasswordFormFeature.style,
                          formFields: submitNewPasswordFormFeature.formFields,
                          recipeImplementation: _this.props.recipe.recipeImpl,
                          config: _this.props.recipe.config,
                          onSignInClicked: function () {
                              void _this.props.recipe.redirectToAuthWithoutRedirectToPath(
                                  "signin",
                                  _this.props.history
                              );
                          },
                          token: _this.state.token,
                      };
            var enterEmailForm = {
                styleFromInit: enterEmailFormFeature.style,
                formFields: enterEmailFormFeature.formFields,
                recipeImplementation: _this.props.recipe.recipeImpl,
                config: _this.props.recipe.config,
            };
            var props = {
                config: _this.props.recipe.config,
                submitNewPasswordForm: submitNewPasswordForm,
                enterEmailForm: enterEmailForm,
            };
            return react_1.jsx(
                componentOverrideContext_1.ComponentOverrideContext.Provider,
                { value: componentOverrides },
                react_1.jsx(
                    featureWrapper_1.default,
                    { isEmbedded: _this.getIsEmbedded(), useShadowDom: _this.props.recipe.config.useShadowDom },
                    react_1.jsx(
                        react_2.Fragment,
                        null,
                        _this.props.children === undefined &&
                            react_1.jsx(resetPasswordUsingToken_1.default, __assign({}, props)),
                        _this.props.children &&
                            React.Children.map(_this.props.children, function (child) {
                                if (React.isValidElement(child)) {
                                    return React.cloneElement(child, props);
                                }
                                return child;
                            })
                    )
                )
            );
        };
        var token = utils_1.getQueryParams("token");
        if (token === null) {
            _this.state = { token: undefined };
        } else {
            _this.state = {
                token: token,
            };
        }
        return _this;
    }
    return ResetPasswordUsingToken;
})(react_2.PureComponent);
exports.default = ResetPasswordUsingToken;
