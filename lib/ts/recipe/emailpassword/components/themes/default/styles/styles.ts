/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
import { jsx, keyframes } from "@emotion/react";
import { NormalisedDefaultStyles, NormalisedPalette } from "../types";
import chroma from "chroma-js";

/*
 * Palette
 */
export const defaultPalette: NormalisedPalette = {
    colors: {
        background: "white",
        inputBackground: "#f2f2f2",
        generalErrorBackground: "#fdf3f2",
        primary: "#ff9b33",
        error: "#ff1717",
        textTitle: "#222222",
        textLabel: "#222222",
        textPrimary: "#656565",
        textLink: "#0076ff"
    },
    fonts: {
        size: ["14px", "16px", "28px"]
    }
};

/*
 * Default styles.
 */
const slideTop = keyframes`
    0% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0px);
    }
`;

const swingIn = keyframes`
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
            maxWidth: "524px",
            width: "50vw",
            margin: "26px auto",
            minWidth: "420px",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "1px 1px 10px rgba(0,0,0,0.16)",
            backgroundColor: palette.colors.background,
            "@media (max-width: 440px)": {
                margin: "12px auto",
                minWidth: "320px"
            },
            "@media (max-width: 340px)": {
                minWidth: "260px"
            },
            "@media (max-width: 300px)": {
                minWidth: "220px"
            }
        },

        row: {
            margin: "0 auto",
            width: "69%",
            paddingTop: "45px",
            paddingBottom: "20px"
        },

        generalError: {
            backgroundColor: palette.colors.generalErrorBackground,
            paddingTop: "10px",
            paddingBottom: "10px",
            marginBottom: "15px",
            paddingLeft: "18px",
            paddingRight: "18px",
            letterSpacing: "0.2px",
            fontSize: palette.fonts.size[1],
            borderRadius: "12px",
            color: palette.colors.error,
            animation: `${swingIn} 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both`
        },

        inputWrapper: {
            float: "left",
            width: "100%"
        },

        inputError: {
            border: `1px solid ${palette.colors.error}`
        },

        input: {
            boxSizing: "border-box",
            width: "100%",
            backgroundColor: palette.colors.inputBackground,
            borderRadius: "12px",
            border: "1px solid #dddddd",
            fontSize: palette.fonts.size[0],
            paddingLeft: "20px",
            letterSpacing: "1.2px",
            "&:focus": {
                border: `1px solid ${palette.colors.primary}`,
                outline: "none"
            },
            height: "42px"
        },

        headerTitle: {
            fontSize: palette.fonts.size[2],
            lineHeight: "40px",
            letterSpacing: "0.58px",
            fontWeight: 800,
            marginBottom: "9px",
            color: palette.colors.textTitle
        },

        headerSubtitle: {
            marginBottom: "21px"
        },

        forgotPasswordLink: {
            marginTop: "10px"
        },

        enterEmailSuccessMessage: {
            marginTop: "15px",
            marginBottom: "15px"
        },

        submitNewPasswordSuccessMessage: {
            marginTop: "15px",
            marginBottom: "15px"
        },

        privacyPolicyAndTermsAndConditions: {
            marginTop: "10px"
        },

        inputErrorMessage: {
            paddingTop: "5px",
            paddingBottom: "5px",
            color: palette.colors.error,
            lineHeight: "24px",
            fontWeight: 400,
            textAlign: "left",
            animation: `${slideTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`
        },

        inputErrorSymbol: {
            marginRight: "5px",
            top: "1px",
            position: "relative",
            left: "2px"
        },

        button: {
            width: "100%",
            height: "42px",
            backgroundColor: palette.colors.primary,
            color: "white",
            fontWeight: 700,
            borderWidth: "0px",
            borderRadius: "8px",
            backgroundPosition: "center",
            backgroundImage: `radial-gradient(circle, transparent 1%, ${palette.colors.primary} 1%)`,
            transition: "background 0.4s",
            backgroundSize: "12000%",
            "&:disabled": {
                border: "none",
                cursor: "no-drop"
            },
            "&:active": {
                outline: "none",
                border: "none",
                backgroundColor: chroma(palette.colors.primary)
                    .darken(0.1)
                    .hex(),
                transition: "background 0s",
                backgroundSize: "100%"
            },
            "&:hover": {
                backgroundColor: chroma(palette.colors.primary)
                    .darken(0.1)
                    .hex()
            },
            "&:focus": {
                outline: "none",
                border: "none"
            },
            cursor: "pointer"
        },

        label: {
            textAlign: "left",
            fontWeight: 500,
            fontSize: palette.fonts.size[1],
            lineHeight: "24px",
            paddingBottom: "10px",
            color: palette.colors.textLabel
        },

        formRow: {
            display: "flex",
            flexDirection: "column",
            paddingTop: "0px",
            paddingBottom: "35px"
        },

        primaryText: {
            fontSize: palette.fonts.size[1],
            fontWeight: 400,
            letterSpacing: "0.4px",
            color: palette.colors.textLabel
        },

        secondaryText: {
            fontSize: palette.fonts.size[1],
            fontWeight: 300,
            letterSpacing: "0.4px",
            color: palette.colors.textPrimary
        },

        link: {
            paddingLeft: "3px",
            paddingRight: "3px",
            color: palette.colors.textLink,
            fontSize: palette.fonts.size[1],
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
        }
    };
}
