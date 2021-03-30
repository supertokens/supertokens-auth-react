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
var signUpFooter_1 = __importDefault(
    require("../../../../authRecipeModule/components/themes/signInAndUp/signUpFooter")
);
var signUpHeader_1 = __importDefault(require("./signUpHeader"));
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var signUpForm_1 = __importDefault(require("./signUpForm"));
/*
 * Component.
 */
var SignUp = /** @class */ (function (_super) {
    __extends(SignUp, _super);
    function SignUp() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    /*
     * Render.
     */
    SignUp.prototype.render = function () {
        var styles = this.context;
        return react_1.jsx(
            "div",
            { "data-supertokens": "container", css: styles.container },
            react_1.jsx(
                "div",
                { "data-supertokens": "row", css: styles.row },
                react_1.jsx(
                    signUpForm_1.default,
                    __assign({}, this.props, {
                        header: react_1.jsx(signUpHeader_1.default, { onClick: this.props.signInClicked }),
                        footer: react_1.jsx(signUpFooter_1.default, {
                            privacyPolicyLink: this.props.privacyPolicyLink,
                            termsOfServiceLink: this.props.termsOfServiceLink,
                        }),
                    })
                )
            )
        );
    };
    SignUp.contextType = styleContext_1.default;
    return SignUp;
})(react_2.PureComponent);
exports.default = SignUp;
//# sourceMappingURL=signUp.js.map
