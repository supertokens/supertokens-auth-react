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
var styleContext_1 = __importStar(require("../../../../../styles/styleContext"));
var themeBase_1 = require("../themeBase");
var header_1 = __importDefault(require("./header"));
var signInAndUp_1 = __importDefault(require("../../../../thirdparty/components/features/signInAndUp"));
var signInAndUp_2 = __importDefault(require("../../../../emailpassword/components/features/signInAndUp"));
var signInAndUpForm_1 = __importDefault(require("../../themes/signInAndUp/signInAndUpForm"));
var providersForm_1 = __importDefault(require("../../../../thirdparty/components/themes/signInAndUp/providersForm"));
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../styles");
var utils_1 = require("../../../../../utils");
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
        var styles = this.context;
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                react_1.jsx(header_1.default, {
                    isSignUp: this.state.isSignUp,
                    setIsSignUp: function (isSignUp) {
                        _this.setState(function (oldState) {
                            return __assign({}, oldState, { isSignUp: isSignUp });
                        });
                    },
                }),
                this.props.hideThirdParty !== true &&
                    react_1.jsx(
                        react_2.Fragment,
                        null,
                        react_1.jsx(
                            signInAndUp_1.default,
                            { history: this.props.history, recipeId: this.props.recipeId, isEmbedded: true },
                            react_1.jsx(
                                providersForm_1.default,
                                // Seed props. Real props will be given by parent feature.
                                __assign({}, {})
                            )
                        )
                    ),
                this.props.hideEmailPassword !== true &&
                    this.props.hideThirdParty !== true &&
                    react_1.jsx(
                        "div",
                        {
                            "data-supertokens": "thirdPartyEmailPasswordDivider",
                            css: styles.thirdPartyEmailPasswordDivider,
                        },
                        react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider }),
                        react_1.jsx(
                            "div",
                            {
                                "data-supertokens": "thirdPartyEmailPasswordDividerOr",
                                css: styles.thirdPartyEmailPasswordDividerOr,
                            },
                            "or"
                        ),
                        react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider })
                    ),
                this.props.hideEmailPassword !== true &&
                    react_1.jsx(
                        signInAndUp_2.default,
                        { history: this.props.history, recipeId: this.props.recipeId, isEmbedded: true },
                        react_1.jsx(
                            signInAndUpForm_1.default,
                            // Seed props. Real props will be given by parent feature.
                            __assign({}, {}, { isSignUp: this.state.isSignUp })
                        )
                    )
            )
        );
    };
    SignInAndUpTheme.contextType = styleContext_1.default;
    return SignInAndUpTheme;
})(React.PureComponent);
function SignInAndUpThemeWrapper(props) {
    return react_1.jsx(
        themeBase_1.ThemeBase,
        null,
        react_1.jsx(
            styleContext_1.StyleProvider,
            {
                rawPalette: props.rawPalette,
                defaultPalette: styles_1.defaultPalette,
                styleFromInit: props.styleFromInit,
                getDefaultStyles: styles_2.getStyles,
            },
            react_1.jsx(SignInAndUpTheme, __assign({}, props))
        )
    );
}
exports.default = SignInAndUpThemeWrapper;
//# sourceMappingURL=index.js.map
