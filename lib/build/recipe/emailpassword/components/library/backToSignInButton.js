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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var __1 = require("../../../..");
var arrowLeftIcon_1 = tslib_1.__importDefault(require("../../../../components/assets/arrowLeftIcon"));
var styleContext_1 = tslib_1.__importDefault(require("../../../../styles/styleContext"));
/*
 * Component.
 */
function BackToSignInButton(_a) {
    var onClick = _a.onClick;
    var t = __1.useTranslation();
    var styles = react_2.useContext(styleContext_1.default);
    return react_1.jsx(
        "div",
        { "data-supertokens": "backButtonContainer", css: styles.backButtonContainer },
        react_1.jsx(
            "button",
            { "data-supertokens": "backButtonWithLeftArrow", css: styles.backButtonWithLeftArrow, onClick: onClick },
            react_1.jsx(arrowLeftIcon_1.default, { color: styles.palette.colors.secondaryText }),
            react_1.jsx("span", null, t("EMAIL_PASSWORD_RESET_SIGN_IN_LINK"))
        )
    );
}
exports.default = BackToSignInButton;
