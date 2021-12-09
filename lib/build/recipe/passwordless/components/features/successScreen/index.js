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
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../../themes/styles");
var successScreen_1 = require("../../themes/successScreen");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var SuccessScreen = /** @class */ (function (_super) {
    __extends(SuccessScreen, _super);
    function SuccessScreen() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.getIsEmbedded = function () {
            if (_this.props.isEmbedded !== undefined) {
                return _this.props.isEmbedded;
            }
            return false;
        };
        _this.render = function () {
            var componentOverrides = _this.props.recipe.config.override.components;
            var successScreen = _this.props.recipe.config.successScreen;
            var props = {
                recipeImplementation: _this.props.recipe.recipeImpl,
                config: _this.props.recipe.config,
            };
            return react_1.jsx(
                componentOverrideContext_1.ComponentOverrideContext.Provider,
                { value: componentOverrides },
                react_1.jsx(
                    featureWrapper_1.default,
                    { useShadowDom: _this.props.recipe.config.useShadowDom, isEmbedded: _this.getIsEmbedded() },
                    react_1.jsx(
                        styleContext_1.StyleProvider,
                        {
                            rawPalette: _this.props.recipe.config.palette,
                            defaultPalette: styles_1.defaultPalette,
                            styleFromInit: successScreen.style,
                            rootStyleFromInit: _this.props.recipe.config.rootStyle,
                            getDefaultStyles: styles_2.getStyles,
                        },
                        react_1.jsx(
                            react_2.Fragment,
                            null,
                            _this.props.children === undefined &&
                                react_1.jsx(successScreen_1.SuccessScreen, __assign({}, props)),
                            _this.props.children
                        )
                    )
                )
            );
        };
        return _this;
    }
    return SuccessScreen;
})(react_2.PureComponent);
exports.default = SuccessScreen;
