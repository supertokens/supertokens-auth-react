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
var signUpFooter_1 = require("../../../../emailpassword/components/themes/signInAndUp/signUpFooter");
var signInFooter_1 = require("../../../../emailpassword/components/themes/signInAndUp/signInFooter");
var signInForm_1 = require("../../../../emailpassword/components/themes/signInAndUp/signInForm");
var signUpForm_1 = require("../../../../emailpassword/components/themes/signInAndUp/signUpForm");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
/*
 * Component.
 */
// We could actually remove this component
exports.SignInAndUpForm = withOverride_1.withOverride(
    "ThirdPartyEmailPasswordSignInAndUpForm",
    function ThirdPartyEmailPasswordSignInAndUpForm(props) {
        /*
         * Render.
         */
        if (props.featureState.isSignUp === true) {
            return react_1.jsx(
                signUpForm_1.SignUpForm,
                __assign({}, props.signUpForm, {
                    footer: react_1.jsx(signUpFooter_1.SignUpFooter, {
                        privacyPolicyLink: props.config.signInAndUpFeature.signUpForm.privacyPolicyLink,
                        termsOfServiceLink: props.config.signInAndUpFeature.signUpForm.termsOfServiceLink,
                    }),
                })
            );
        } else {
            return react_1.jsx(
                signInForm_1.SignInForm,
                __assign({}, props.signInForm, {
                    footer: react_1.jsx(signInFooter_1.SignInFooter, { onClick: props.signInForm.forgotPasswordClick }),
                })
            );
        }
    }
);
