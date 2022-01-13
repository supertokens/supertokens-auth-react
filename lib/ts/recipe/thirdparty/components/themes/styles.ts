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
import chroma from "chroma-js";
import { getButtonStyle, getDefaultStyles, getMergedStyles } from "../../../../styles/styles";
import { NormalisedPalette, NormalisedDefaultStyles } from "../../../../types";

const providerColors = {
    google: "#ea3721",
    github: "#000",
    facebook: "#274483",
    twitter: "#008dd1",
    apple: "#07093c",
    custom: "#FFF",
};

export function getStyles(palette: NormalisedPalette): NormalisedDefaultStyles {
    const baseStyles = getDefaultStyles(palette);
    const recipeStyles = {
        row: {
            paddingBottom: "30px",
        },

        providerContainer: {
            paddingTop: "9px",
            paddingBottom: "9px",
        },

        providerButton: {
            // Default button height in 34
            minHeight: "34px",
            // this will allow the button to scale with different font sizes and text lengths
            height: "auto !important",
            display: "flex",
            flexDirection: "row",
            paddingLeft: "0px",
            paddingRight: "0px",
            // This makes the button look somewhat cleaner if the text wraps
            paddingTop: "2px",
            paddingBottom: "2px",
        },

        providerButtonLeft: {
            width: "40px",
        },

        providerButtonLogo: {
            height: "30px",
            display: "flex",
            borderRight: "1px solid rgba(255, 255, 255, 0.6)",
        },

        providerButtonLogoCenter: {
            margin: "auto",
        },

        providerButtonText: {
            margin: "auto",
            textAlign: "center",
            justifyContent: "center",
        },

        providerGoogle: getButtonStyle(providerColors.google, "white"),
        providerGithub: getButtonStyle(providerColors.github, "white", true),
        providerTwitter: getButtonStyle(providerColors.twitter, "white"),
        providerFacebook: getButtonStyle(providerColors.facebook, "white"),
        providerApple: getButtonStyle(providerColors.apple, "white", true),

        providerCustom: {
            ...getButtonStyle(providerColors.custom, "white"),
            color: "#000",
            border: "1px solid #000",
            "&:active": {
                outline: "none",
                border: "1px solid #000",
                backgroundColor: chroma(providerColors.custom).darken(0.1).hex(),
                transition: "background 0s",
                backgroundSize: "100%",
            },
            "&:focus": {
                outline: "none",
                border: "1px solid #000",
            },
        },
    } as NormalisedDefaultStyles;
    return getMergedStyles(baseStyles, recipeStyles);
}
