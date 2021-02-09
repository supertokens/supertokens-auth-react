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
import { jsx } from "@emotion/react";
import chroma from "chroma-js";
import { getButtonStyle, getDefaultStyles, getMergedStyles } from "../../../../styles/styles";
import { NormalisedPalette, NormalisedDefaultStyles } from "../../../../types";

const providerColors = {
    google: "#ea3721",
    github: "#000",
    facebook: "#274483",
    twitter: "#008dd1",
    apple: "#07093c",
    custom: "#FFF"
};

export function getStyles(palette: NormalisedPalette): NormalisedDefaultStyles {
    const baseStyles = getDefaultStyles(palette);
    const recipeStyles = {
        providerContainer: {
            paddingTop: "9px",
            paddingBottom: "9px"
        },

        providerButton: {
            display: "flex",
            flexDirection: "row"
        },

        providerButtonLeft: {
            width: "34px"
        },

        providerButtonLogo: {
            height: "30px",
            display: "flex",
            borderRight: "1px solid rgba(255, 255, 255, 0.6)"
        },

        providerButtonLogoCenter: {
            margin: "auto"
        },

        providerButtonText: {
            marginTop: "auto",
            marginBottom: "auto",
            textAlign: "center",
            marginLeft: "20%",
            justifyContent: "center",
            "@media (max-width: 380px)": {
                marginLeft: "10%"
            }
        },

        providerGoogle: getButtonStyle(providerColors.google),
        providerGithub: getButtonStyle(providerColors.github),
        providerTwitter: getButtonStyle(providerColors.twitter),
        providerFacebook: getButtonStyle(providerColors.facebook),
        providerApple: getButtonStyle(providerColors.apple),

        providerCustom: {
            ...getButtonStyle(providerColors.custom),
            color: "#000",
            border: "1px solid #000",
            "&:active": {
                outline: "none",
                border: "1px solid #000",
                backgroundColor: chroma(providerColors.custom)
                    .darken(0.1)
                    .hex(),
                transition: "background 0s",
                backgroundSize: "100%"
            },
            "&:focus": {
                outline: "none",
                border: "1px solid #000"
            }
        }
    } as NormalisedDefaultStyles;
    return getMergedStyles(baseStyles, recipeStyles);
}
