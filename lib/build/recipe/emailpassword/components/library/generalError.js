"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var translationContext_1 = require("../../../../translation/translationContext");
var styleContext_1 = tslib_1.__importDefault(require("../../../../styles/styleContext"));
function GeneralError(_a) {
    var error = _a.error;
    var styles = react_2.useContext(styleContext_1.default);
    var t = translationContext_1.useTranslation();
    return react_1.jsx("div", { "data-supertokens": "generalError", css: styles.generalError }, t(error));
}
exports.default = GeneralError;
