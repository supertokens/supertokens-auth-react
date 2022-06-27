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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInAndUpCallbackTheme = void 0;
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
var react_1 = require("react");
var spinnerIcon_1 = __importDefault(require("../../../../../components/assets/spinnerIcon"));
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
/*
 * Component.
 */
var ThirdPartySignInAndUpCallbackTheme = /** @class */ (function (_super) {
    __extends(ThirdPartySignInAndUpCallbackTheme, _super);
    function ThirdPartySignInAndUpCallbackTheme() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        /*
         * Methods.
         */
        _this.render = function () {
            var styles = _this.context;
            return (0, jsx_runtime_1.jsx)(
                "div",
                __assign(
                    { "data-supertokens": "container", css: styles.container },
                    {
                        children: (0, jsx_runtime_1.jsx)(
                            "div",
                            __assign(
                                { "data-supertokens": "row", css: styles.row },
                                {
                                    children: (0, jsx_runtime_1.jsx)(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "spinner", css: styles.spinner },
                                            {
                                                children: (0, jsx_runtime_1.jsx)(spinnerIcon_1.default, {
                                                    color: styles.palette.colors.primary,
                                                }),
                                            }
                                        )
                                    ),
                                }
                            )
                        ),
                    }
                )
            );
        };
        return _this;
    }
    ThirdPartySignInAndUpCallbackTheme.contextType = styleContext_1.default;
    return ThirdPartySignInAndUpCallbackTheme;
})(react_1.PureComponent);
exports.SignInAndUpCallbackTheme = (0, withOverride_1.withOverride)(
    "ThirdPartySignInAndUpCallbackTheme",
    ThirdPartySignInAndUpCallbackTheme
);
