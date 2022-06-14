"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
var React = tslib_1.__importStar(require("react"));
var react_1 = require("react");
var resetPasswordUsingToken_1 = tslib_1.__importDefault(require("../../themes/resetPasswordUsingToken"));
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = tslib_1.__importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var ResetPasswordUsingToken = /** @class */ (function (_super) {
    tslib_1.__extends(ResetPasswordUsingToken, _super);
    /*
     * Constructor.
     */
    function ResetPasswordUsingToken(props) {
        var _this = _super.call(this, props) || this;
        _this.render = function () {
            var enterEmailFormFeature = _this.props.recipe.config.resetPasswordUsingTokenFeature.enterEmailForm;
            var componentOverrides = _this.props.recipe.config.override.components;
            var submitNewPasswordFormFeature =
                _this.props.recipe.config.resetPasswordUsingTokenFeature.submitNewPasswordForm;
            var submitNewPasswordForm =
                _this.state.token === undefined
                    ? undefined
                    : {
                          error: _this.state.error,
                          onError: function (error) {
                              return _this.setState(function (os) {
                                  return tslib_1.__assign(tslib_1.__assign({}, os), { error: error });
                              });
                          },
                          clearError: function () {
                              return _this.setState(function (os) {
                                  return tslib_1.__assign(tslib_1.__assign({}, os), { error: undefined });
                              });
                          },
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
                onBackButtonClicked: function () {
                    return _this.props.recipe.redirectToAuthWithoutRedirectToPath("signin", _this.props.history);
                },
                error: _this.state.error,
                onError: function (error) {
                    return _this.setState(function (os) {
                        return tslib_1.__assign(tslib_1.__assign({}, os), { error: error });
                    });
                },
                clearError: function () {
                    return _this.setState(function (os) {
                        return tslib_1.__assign(tslib_1.__assign({}, os), { error: undefined });
                    });
                },
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
            return (0, jsx_runtime_1.jsx)(
                componentOverrideContext_1.ComponentOverrideContext.Provider,
                tslib_1.__assign(
                    { value: componentOverrides },
                    {
                        children: (0, jsx_runtime_1.jsx)(
                            featureWrapper_1.default,
                            tslib_1.__assign(
                                {
                                    useShadowDom: _this.props.recipe.config.useShadowDom,
                                    defaultStore: translations_1.defaultTranslationsEmailPassword,
                                },
                                {
                                    children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                        children: [
                                            _this.props.children === undefined &&
                                                (0, jsx_runtime_1.jsx)(
                                                    resetPasswordUsingToken_1.default,
                                                    tslib_1.__assign({}, props)
                                                ),
                                            _this.props.children &&
                                                React.Children.map(_this.props.children, function (child) {
                                                    if (React.isValidElement(child)) {
                                                        return React.cloneElement(child, props);
                                                    }
                                                    return child;
                                                }),
                                        ],
                                    }),
                                }
                            )
                        ),
                    }
                )
            );
        };
        var token = (0, utils_1.getQueryParams)("token");
        if (token === null) {
            _this.state = { token: undefined, error: undefined };
        } else {
            _this.state = {
                token: token,
                error: undefined,
            };
        }
        return _this;
    }
    return ResetPasswordUsingToken;
})(react_1.PureComponent);
exports.default = ResetPasswordUsingToken;
