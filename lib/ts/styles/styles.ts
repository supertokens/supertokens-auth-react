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
import { CSSObject, jsx, keyframes } from "@emotion/react";
import chroma from "chroma-js";
import { NormalisedPalette, NormalisedDefaultStyles } from "../types";

/*
 * Palette
 */
export const defaultPalette: NormalisedPalette = {
    colors: {
        background: "white",
        inputBackground: "#fafafa",
        primary: "#ff9b33",
        success: "#41a700",
        error: "#ff1717",
        textTitle: "#222222",
        textLabel: "#222222",
        textInput: "#222222",
        textPrimary: "#656565",
        textLink: "#0076ff"
    },
    fonts: {
        size: ["14px", "16px", "19px", "24px"]
    }
};

/*
 * Default styles.
 */
export const slideTop = keyframes`
    0% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0px);
    }
`;

export const swingIn = keyframes`
0% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
}
@keyframes swing-in-top-fwd {
  0% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
`;

export function getDefaultStyles(palette: NormalisedPalette): NormalisedDefaultStyles {
    return {
        container: {
            fontFamily: "'Rubik', sans-serif",
            margin: "12px auto",
            marginTop: "26px",
            marginBottom: "26px",
            width: "420px",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "1px 1px 10px rgba(0,0,0,0.16)",
            backgroundColor: palette.colors.background,
            "@media (max-width: 440px)": {
                width: "95vw"
            }
        },

        row: {
            margin: "0 auto",
            width: "76%",
            paddingTop: "30px",
            paddingBottom: "10px"
        },

        generalError: {
            backgroundColor: chroma(palette.colors.error)
                .brighten(2)
                .luminance(0.9)
                .hex(),
            paddingTop: "10px",
            paddingBottom: "10px",
            marginBottom: "15px",
            paddingLeft: "18px",
            paddingRight: "18px",
            letterSpacing: "0.2px",
            fontSize: palette.fonts.size[0],
            borderRadius: "8px",
            color: palette.colors.error,
            animation: `${swingIn} 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both`
        },

        headerTitle: {
            fontSize: palette.fonts.size[3],
            lineHeight: "40px",
            letterSpacing: "0.58px",
            fontWeight: 800,
            marginBottom: "2px",
            color: palette.colors.textTitle
        },

        headerSubtitle: {
            marginBottom: "21px"
        },

        privacyPolicyAndTermsAndConditions: {
            a: {
                lineHeight: "21px"
            },
            maxWidth: "300px",
            marginTop: "10px"
        },

        primaryText: {
            fontSize: palette.fonts.size[0],
            fontWeight: 500,
            letterSpacing: "0.4px",
            lineHeight: "21px",
            color: palette.colors.textLabel
        },

        secondaryText: {
            fontSize: palette.fonts.size[0],
            fontWeight: 300,
            letterSpacing: "0.4px",
            color: palette.colors.textPrimary
        },

        link: {
            paddingLeft: "3px",
            paddingRight: "3px",
            color: palette.colors.textLink,
            fontSize: palette.fonts.size[0],
            cursor: "pointer",
            letterSpacing: "0.16px",
            lineHeight: "26px"
        },

        divider: {
            marginTop: "1em",
            marginBottom: "1em",
            borderBottom: "0.3px solid #dddddd",
            display: "flex",
            alignItems: "center",
            paddingBottom: "5px"
        },

        headerTinyTitle: {
            marginTop: "13px",
            fontSize: palette.fonts.size[2],
            letterSpacing: "1.1px",
            fontWeight: 500,
            lineHeight: "28px"
        },

        secondaryLinkWithArrow: {
            marginTop: "10px",
            marginBottom: "30px",
            cursor: "pointer",
            "&:hover": {
                position: "relative",
                left: "2px",
                wordSpacing: "4px"
            }
        },

        generalSuccess: {
            color: palette.colors.success,
            fontSize: palette.fonts.size[0],
            backgroundColor: chroma(palette.colors.success)
                .brighten(2)
                .luminance(0.9)
                .hex(),
            animation: `${swingIn} 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both`,
            padding: "9px 15px 9px 15px",
            borderRadius: "6px",
            display: "inline-block"
        },

        spinner: {
            width: "80px",
            height: "auto",
            paddingTop: "20px",
            paddingBottom: "40px",
            margin: "0 auto"
        },

        error: {
            color: palette.colors.error
        },

        button: getButtonStyle(palette.colors.primary)
    };
}

export function getButtonStyle(color: string, brighten?: boolean): CSSObject {
    const backgroundColor =
        brighten === true
            ? chroma(color)
                  .brighten(0.6)
                  .hex()
            : chroma(color)
                  .darken(0.2)
                  .hex();

    return {
        width: "100%",
        height: "34px",
        backgroundColor: color,
        color: "white",
        fontWeight: 700,
        border: `1px solid ${chroma(color)
            .darken(0.3)
            .hex()}`,
        borderRadius: "6px",
        backgroundPosition: "center",
        backgroundImage: `radial-gradient(circle, transparent 1%, ${color} 1%)`,
        transition: "background 0.4s",
        backgroundSize: "12000%",
        "&:disabled": {
            border: "none",
            cursor: "no-drop"
        },
        "&:active": {
            outline: "none",
            backgroundColor,
            transition: "background 0s",
            backgroundSize: "100%"
        },
        "&:hover": {
            backgroundColor
        },
        "&:focus": {
            outline: "none"
        },
        cursor: "pointer"
    };
}

export function getMergedStyles(
    defaultStyles: NormalisedDefaultStyles,
    themeStyles: NormalisedDefaultStyles
): NormalisedDefaultStyles {
    const styles = defaultStyles;
    for (const key in themeStyles) {
        styles[key] = {
            ...styles[key],
            ...themeStyles[key]
        };
    }

    return styles;
}
