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
var React = __importStar(require("react"));
var signUp_1 = __importDefault(require("./signUp"));
var signIn_1 = __importDefault(require("./signIn"));
var themeBase_1 = require("../themeBase");
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../styles/styles");
var utils_1 = require("../../../../../utils");
/*
 * Component.
 */
var SignInAndUpTheme = /** @class */ (function (_super) {
    __extends(SignInAndUpTheme, _super);
    function SignInAndUpTheme(props) {
        var _this = _super.call(this, props) || this;
        var urlParams = new URLSearchParams(utils_1.getWindowOrThrow().location.search);
        var show = urlParams.get("show");
        var isSignUp = props.defaultToSignUp;
        if (show !== null) {
            isSignUp = show === "signup";
        }
        _this.state = {
            isSignUp: isSignUp,
        };
        return _this;
    }
    SignInAndUpTheme.prototype.render = function () {
        var _this = this;
        // If isSignUp, return signUp.
        if (this.state.isSignUp) {
            return React.createElement(
                styleContext_1.StyleProvider,
                {
                    rawPalette: this.props.rawPalette,
                    defaultPalette: styles_1.defaultPalette,
                    styleFromInit: this.props.signUpForm.styleFromInit,
                    getDefaultStyles: styles_2.getStyles,
                },
                React.createElement(
                    signUp_1.default,
                    __assign({}, this.props.signUpForm, {
                        signInClicked: function () {
                            _this.setState(function (oldState) {
                                return __assign({}, oldState, { isSignUp: false });
                            });
                        },
                    })
                )
            );
        }
        // Otherwise, return SignIn.
        return React.createElement(
            styleContext_1.StyleProvider,
            {
                rawPalette: this.props.rawPalette,
                defaultPalette: styles_1.defaultPalette,
                styleFromInit: this.props.signInForm.styleFromInit,
                getDefaultStyles: styles_2.getStyles,
            },
            React.createElement(
                signIn_1.default,
                __assign({}, this.props.signInForm, {
                    signUpClicked: function () {
                        _this.setState(function (oldState) {
                            return __assign({}, oldState, { isSignUp: true });
                        });
                    },
                })
            )
        );
    };
    return SignInAndUpTheme;
})(React.PureComponent);
exports.SignInAndUpTheme = SignInAndUpTheme;
function SignInAndUpThemeWrapper(props) {
    return React.createElement(themeBase_1.ThemeBase, null, React.createElement(SignInAndUpTheme, __assign({}, props)));
}
exports.default = SignInAndUpThemeWrapper;
//# sourceMappingURL=index.js.map
