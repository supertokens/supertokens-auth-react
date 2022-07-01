"use strict";
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
exports.SignUp = void 0;
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
var react_1 = require("react");
var signUpFooter_1 = require("./signUpFooter");
var signUpHeader_1 = require("./signUpHeader");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var signUpForm_1 = require("./signUpForm");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var SuperTokensBranding_1 = require("../../../../../components/SuperTokensBranding");
var generalError_1 = __importDefault(require("../../library/generalError"));
exports.SignUp = (0, withOverride_1.withOverride)("EmailPasswordSignUp", function EmailPasswordSignUp(props) {
    var styles = (0, react_1.useContext)(styleContext_1.default);
    return (0,
    jsx_runtime_1.jsxs)("div", __assign({ "data-supertokens": "container", css: styles.container }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ "data-supertokens": "row", css: styles.row }, { children: [(0, jsx_runtime_1.jsx)(signUpHeader_1.SignUpHeader, { onClick: props.signInClicked }), props.error !== undefined && (0, jsx_runtime_1.jsx)(generalError_1.default, { error: props.error }), (0, jsx_runtime_1.jsx)(signUpForm_1.SignUpForm, __assign({}, props, { footer: (0, jsx_runtime_1.jsx)(signUpFooter_1.SignUpFooter, { privacyPolicyLink: props.config.signInAndUpFeature.signUpForm.privacyPolicyLink, termsOfServiceLink: props.config.signInAndUpFeature.signUpForm.termsOfServiceLink }) }))] })), (0, jsx_runtime_1.jsx)(SuperTokensBranding_1.SuperTokensBranding, {})] }));
});
