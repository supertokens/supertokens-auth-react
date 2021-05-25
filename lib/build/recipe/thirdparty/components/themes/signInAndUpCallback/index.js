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
var spinnerIcon_1 = __importDefault(require("../../../../../components/assets/spinnerIcon"));
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
/*
 * Component.
 */
var SignInAndUpCallbackTheme = /** @class */ (function (_super) {
    __extends(SignInAndUpCallbackTheme, _super);
    function SignInAndUpCallbackTheme() {
        var _this = (_super !== null && _super.apply(this, arguments)) || this;
        /*
         * Methods.
         */
        _this.render = function () {
            var styles = _this.context;
            return react_1.jsx(
                "div",
                { "data-supertokens": "container", css: styles.container },
                react_1.jsx(
                    "div",
                    { "data-supertokens": "row", css: styles.row },
                    react_1.jsx(
                        "div",
                        { "data-supertokens": "spinner", css: styles.spinner },
                        react_1.jsx(spinnerIcon_1.default, { color: styles.palette.colors.primary })
                    )
                )
            );
        };
        return _this;
    }
    SignInAndUpCallbackTheme.contextType = styleContext_1.default;
    return SignInAndUpCallbackTheme;
})(react_2.PureComponent);
exports.default = SignInAndUpCallbackTheme;
//# sourceMappingURL=index.js.map
