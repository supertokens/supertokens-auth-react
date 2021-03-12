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
import { CSSObject, jsx } from "@emotion/react";
import { getDefaultStyles, getMergedStyles } from "../../../../styles/styles";
import { NormalisedPalette, NormalisedDefaultStyles } from "../../../../types";
import { getStyles as getEmailPasswordStyles } from "../../../emailpassword/components/themes/styles/styles";
import { getStyles as getThirdPartyStyles } from "../../../emailpassword/components/themes/styles/styles";

export function getStyles(palette: NormalisedPalette): NormalisedDefaultStyles {
    const baseStyles = getDefaultStyles(palette);
    const emailPasswordStyles = getEmailPasswordStyles(palette);
    const thirdPartyStyles = getThirdPartyStyles(palette);
    const baseRecipeStyles = getMergedStyles(emailPasswordStyles, thirdPartyStyles);
    const thirdPartyEmailPasswordStyle: Record<string, CSSObject> = {
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
    const recipeStyles = getMergedStyles(baseRecipeStyles, thirdPartyEmailPasswordStyle);
    return getMergedStyles(baseStyles, recipeStyles);
}
