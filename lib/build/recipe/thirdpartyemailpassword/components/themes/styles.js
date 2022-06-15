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
exports.getStyles = void 0;
var styles_1 = require("../../../../styles/styles");
var styles_2 = require("../../../emailpassword/components/themes/styles/styles");
var styles_3 = require("../../../thirdparty/components/themes/styles");
function getStyles(palette) {
    var baseStyles = (0, styles_1.getDefaultStyles)(palette);
    var emailPasswordStyles = (0, styles_2.getStyles)(palette);
    var thirdPartyStyles = (0, styles_3.getStyles)(palette);
    var baseRecipeStyles = (0, styles_1.getMergedStyles)(emailPasswordStyles, thirdPartyStyles);
    var thirdPartyEmailPasswordStyle = {
        thirdPartyEmailPasswordDivider: {
            paddingTop: "5px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            color: palette.colors.textPrimary,
        },
        thirdPartyEmailPasswordDividerOr: {
            flex: "1 1",
            marginTop: "0.75em",
        },
        divider: {
            flex: "3 3",
        },
    };
    var recipeStyles = (0, styles_1.getMergedStyles)(baseRecipeStyles, thirdPartyEmailPasswordStyle);
    return (0, styles_1.getMergedStyles)(baseStyles, recipeStyles);
}
exports.getStyles = getStyles;
