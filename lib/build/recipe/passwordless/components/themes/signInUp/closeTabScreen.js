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
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var checkedRoundIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/checkedRoundIcon"));
var translationContext_1 = require("../../../../../translation/translationContext");
var PasswordlessCloseTabScreen = function () {
    var styles = react_2.useContext(styleContext_1.default);
    var t = translationContext_1.useTranslation();
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row noFormRow", css: [styles.row, styles.noFormRow] },
            react_1.jsx(checkedRoundIcon_1.default, { color: styles.palette.colors.success }),
            react_1.jsx(
                "div",
                { "data-supertokens": "headerTitle", css: styles.headerTitle },
                t("PWLESS_CLOSE_TAB_TITLE")
            ),
            react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider }),
            react_1.jsx(
                "div",
                {
                    "data-supertokens": "headerSubtitle secondaryText",
                    css: [styles.headerSubtitle, styles.secondaryText],
                },
                t("PWLESS_CLOSE_TAB_SUBTITLE_LINE1"),
                react_1.jsx("br", null),
                t("PWLESS_CLOSE_TAB_SUBTITLE_LINE2")
            )
        )
    );
};
exports.CloseTabScreen = withOverride_1.withOverride("PasswordlessCloseTabScreen", PasswordlessCloseTabScreen);
