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
var react_2 = require("react");
var styleContext_1 = __importDefault(require("../../../../styles/styleContext"));
var heavyArrowLeftIcon_1 = __importDefault(require("../../../../components/assets/heavyArrowLeftIcon"));
/*
 * Component.
 */
function BackButton(_a) {
    var onClick = _a.onClick;
    var styles = react_2.useContext(styleContext_1.default);
    return react_1.jsx(
        "button",
        {
            onClick: onClick,
            css: [styles.backButton, styles.backButtonCommon],
            "data-supertokens": "backButton backButtonCommon",
        },
        react_1.jsx(heavyArrowLeftIcon_1.default, { color: styles.palette.colors.textTitle })
    );
}
exports.default = BackButton;
