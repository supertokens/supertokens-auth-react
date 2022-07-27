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
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
              o["default"] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
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
var React = __importStar(require("react"));
var react_1 = require("react");
var resetPasswordUsingToken_1 = __importDefault(require("../../themes/resetPasswordUsingToken"));
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var superTokens_1 = __importDefault(require("../../../../../superTokens"));
var ResetPasswordUsingToken = /** @class */ (function (_super) {
    __extends(ResetPasswordUsingToken, _super);
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
                                  return __assign(__assign({}, os), { error: error });
                              });
                          },
                          clearError: function () {
                              return _this.setState(function (os) {
                                  return __assign(__assign({}, os), { error: undefined });
                              });
                          },
                          styleFromInit: submitNewPasswordFormFeature.style,
                          formFields: submitNewPasswordFormFeature.formFields,
                          recipeImplementation: _this.props.recipe.recipeImpl,
                          config: _this.props.recipe.config,
                          onSignInClicked: function () {
                              void superTokens_1.default.getInstanceOrThrow().redirectToAuth({
                                  show: "signin",
                                  history: _this.props.history,
                                  redirectBack: false,
                              });
                          },
                          token: _this.state.token,
                      };
            var enterEmailForm = {
                onBackButtonClicked: function () {
                    return superTokens_1.default.getInstanceOrThrow().redirectToAuth({
                        show: "signin",
                        history: _this.props.history,
                        redirectBack: false,
                    });
                },
                error: _this.state.error,
                onError: function (error) {
                    return _this.setState(function (os) {
                        return __assign(__assign({}, os), { error: error });
                    });
                },
                clearError: function () {
                    return _this.setState(function (os) {
                        return __assign(__assign({}, os), { error: undefined });
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
                __assign(
                    { value: componentOverrides },
                    {
                        children: (0, jsx_runtime_1.jsx)(
                            featureWrapper_1.default,
                            __assign(
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
                                                    __assign({}, props)
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
