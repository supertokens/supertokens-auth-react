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
var React = __importStar(require("react"));
var react_2 = require("react");
var signInAndUp_1 = __importDefault(require("../../themes/signInAndUp"));
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var utils_1 = require("../../../../../utils");
var styles_2 = require("../../../components/themes/styles");
var utils_2 = require("../../../../../utils");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../../translations");
var SignInAndUp = /** @class */ (function (_super) {
    __extends(SignInAndUp, _super);
    function SignInAndUp(props) {
        var _this = _super.call(this, props) || this;
        _this.getIsEmbedded = function () {
            if (_this.props.isEmbedded !== undefined) {
                return _this.props.isEmbedded;
            }
            return false;
        };
        _this.getModifiedRecipeImplementation = function () {
            return __assign(__assign({}, _this.props.recipe.recipeImpl), {
                redirectToThirdPartyLogin: function (input) {
                    input = __assign(__assign({}, input), {
                        state: __assign(__assign({}, input.state), {
                            redirectToPath: utils_2.getRedirectToPathFromURL(),
                        }),
                    });
                    return _this.props.recipe.recipeImpl.redirectToThirdPartyLogin(input);
                },
            });
        };
        _this.render = function () {
            var componentOverrides = _this.props.recipe.config.override.components;
            var signInAndUpFeature = _this.props.recipe.config.signInAndUpFeature;
            var providers = signInAndUpFeature.providers.map(function (provider) {
                return {
                    id: provider.id,
                    buttonComponent: provider.getButton(),
                };
            });
            var props = {
                error: _this.state.error,
                providers: providers,
                recipeImplementation: _this.getModifiedRecipeImplementation(),
                config: _this.props.recipe.config,
            };
            return react_1.jsx(
                componentOverrideContext_1.ComponentOverrideContext.Provider,
                { value: componentOverrides },
                react_1.jsx(
                    featureWrapper_1.default,
                    {
                        useShadowDom: _this.props.recipe.config.useShadowDom,
                        isEmbedded: _this.getIsEmbedded(),
                        defaultStore: utils_1.mergeObjects(
                            translations_1.defaultTranslationsThirdParty,
                            _this.props.recipe.config.translations
                        ),
                    },
                    react_1.jsx(
                        styleContext_1.StyleProvider,
                        {
                            rawPalette: _this.props.recipe.config.palette,
                            defaultPalette: styles_1.defaultPalette,
                            styleFromInit: signInAndUpFeature.style,
                            rootStyleFromInit: _this.props.recipe.config.rootStyle,
                            getDefaultStyles: styles_2.getStyles,
                        },
                        react_1.jsx(
                            react_2.Fragment,
                            null,
                            _this.props.children === undefined &&
                                react_1.jsx(signInAndUp_1.default, __assign({}, props)),
                            _this.props.children &&
                                React.Children.map(_this.props.children, function (child) {
                                    if (React.isValidElement(child)) {
                                        return React.cloneElement(child, props);
                                    }
                                    return child;
                                })
                        )
                    )
                )
            );
        };
        var error = undefined;
        var errorQueryParam = utils_1.getQueryParams("error");
        if (errorQueryParam !== null) {
            if (errorQueryParam === "signin") {
                error = "SOMETHING_WENT_WRONG_ERROR";
            } else if (errorQueryParam === "no_email_present") {
                error = "THIRD_PARTY_ERROR_NO_EMAIL";
            } else {
                var customError = utils_1.getQueryParams("message");
                if (customError === null) {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else {
                    error = customError;
                }
            }
        }
        _this.state = {
            error: error,
        };
        return _this;
    }
    return SignInAndUp;
})(react_2.PureComponent);
exports.default = SignInAndUp;
