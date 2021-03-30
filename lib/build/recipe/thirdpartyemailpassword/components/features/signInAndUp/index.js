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
var superTokens_1 = __importDefault(require("../../../../../superTokens"));
var authRecipeModule_1 = __importDefault(require("../../../../authRecipeModule"));
var __1 = require("../../..");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
/*
 * Component.
 */
var SignInAndUp = /** @class */ (function (_super) {
    __extends(SignInAndUp, _super);
    function SignInAndUp() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        _this.getRecipeInstanceOrThrow = function () {
            if (_this.props.recipeId === undefined) {
                throw new Error("No recipeId props given to SignInAndUp component");
            }
            var recipe = superTokens_1.default.getInstanceOrThrow().getRecipeOrThrow(_this.props.recipeId);
            if (recipe instanceof authRecipeModule_1.default === false) {
                throw new Error(
                    recipe.recipeId + " must be an instance of AuthRecipeModule to use SignInAndUp component."
                );
            }
            return recipe;
        };
        _this.getRecipeConfigOrThrow = function () {
            return _this.getRecipeInstanceOrThrow().getConfig();
        };
        _this.getIsEmbedded = function () {
            if (_this.props.isEmbedded !== undefined) {
                return _this.props.isEmbedded;
            }
            return false;
        };
        _this.render = function () {
            /*
             * Render.
             */
            var hideEmailPassword = _this.getRecipeConfigOrThrow().disableEmailPassword;
            var hideThirdParty = _this.getRecipeConfigOrThrow().signInAndUpFeature.providers.length === 0;
            return react_1.jsx(
                featureWrapper_1.default,
                { useShadowDom: _this.getRecipeConfigOrThrow().useShadowDom },
                react_1.jsx(
                    react_2.Fragment,
                    null,
                    _this.props.children === undefined &&
                        react_1.jsx(__1.SignInAndUpTheme, {
                            rawPalette: _this.getRecipeConfigOrThrow().palette,
                            styleFromInit: _this.getRecipeConfigOrThrow().signInAndUpFeature.style,
                            hideThirdParty: hideThirdParty,
                            hideEmailPassword: hideEmailPassword,
                            defaultToSignUp: _this.getRecipeConfigOrThrow().signInAndUpFeature.defaultToSignUp,
                            history: _this.props.history,
                            recipeId: _this.getRecipeInstanceOrThrow().recipeId,
                        }),
                    _this.props.children &&
                        React.cloneElement(_this.props.children, {
                            hideThirdParty: hideThirdParty,
                            hideEmailPassword: hideEmailPassword,
                            rawPalette: _this.getRecipeConfigOrThrow().palette,
                            styleFromInit: _this.getRecipeConfigOrThrow().signInAndUpFeature.style,
                            defaultToSignUp: _this.getRecipeConfigOrThrow().signInAndUpFeature.defaultToSignUp,
                            history: _this.props.history,
                            recipeId: _this.getRecipeInstanceOrThrow().recipeId,
                        })
                )
            );
        };
        return _this;
    }
    return SignInAndUp;
})(react_2.PureComponent);
exports.default = SignInAndUp;
//# sourceMappingURL=index.js.map
