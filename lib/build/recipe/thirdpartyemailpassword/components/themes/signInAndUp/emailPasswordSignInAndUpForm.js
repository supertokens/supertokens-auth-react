"use strict";
var __assign =
    (this && this.__assign) ||
    function() {
        __assign =
            Object.assign ||
            function(t) {
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
    function(mod) {
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
var signIn_1 = require("../../../../emailpassword/components/themes/signInAndUp/signIn");
var signInFooter_1 = __importDefault(require("../../../../emailpassword/components/themes/signInAndUp/signInFooter"));
var signUp_1 = require("../../../../emailpassword/components/themes/signInAndUp/signUp");
/*
 * Component.
 */
function EmailPasswordSignInAndUpForm(props) {
    /*
     * Render.
     */
    if (props.status === "SIGN_UP") {
        return react_1.jsx(signUp_1.SignUpForm, __assign({}, props.signUpForm));
    } else {
        return react_1.jsx(
            signIn_1.SignInForm,
            __assign({}, props.signInForm, {
                footer: react_1.jsx(signInFooter_1.default, { onClick: props.signInForm.forgotPasswordClick })
            })
        );
    }
}
exports.default = EmailPasswordSignInAndUpForm;
