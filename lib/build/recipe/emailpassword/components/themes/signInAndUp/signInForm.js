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
var formBase_1 = __importDefault(require("../../library/formBase"));
/*
 * Component.
 */
function SignInForm(props) {
    return react_1.jsx(formBase_1.default, {
        formFields: props.formFields,
        buttonLabel: "SIGN IN",
        onSuccess: props.onSuccess,
        callAPI: props.signInAPI,
        validateOnBlur: false,
        showLabels: true,
        header: props.header,
        footer: props.footer,
    });
}
exports.default = SignInForm;
//# sourceMappingURL=signInForm.js.map
