"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
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
var signInHeader_1 = require("../../../../emailpassword/components/themes/signInAndUp/signInHeader");
var signUpHeader_1 = require("../../../../emailpassword/components/themes/signInAndUp/signUpHeader");
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
/*
 * Component.
 */
exports.Header = (0, withOverride_1.withOverride)(
    "ThirdPartyEmailPasswordHeader",
    function ThirdPartyEmailPasswordHeader(_a) {
        var isSignUp = _a.isSignUp,
            setIsSignUp = _a.setIsSignUp;
        /*
         * Render.
         */
        if (isSignUp === true) {
            return (0, jsx_runtime_1.jsx)(signUpHeader_1.SignUpHeader, {
                onClick: function () {
                    return setIsSignUp(false);
                },
            });
        } else {
            return (0, jsx_runtime_1.jsx)(signInHeader_1.SignInHeader, {
                onClick: function () {
                    return setIsSignUp(true);
                },
            });
        }
    }
);
