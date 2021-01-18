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
        inputBackground: "#fafafa",
        primary: "#ff9b33",
        success: "#41a700",
        error: "#ff1717",
        textTitle: "#222222",
        textLabel: "#222222",
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

        inputWrapper: {
            paddingTop: "10px",
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
            borderRadius: "8px",
            border: "1px solid #dddddd",
            fontSize: palette.fonts.size[0],
            paddingLeft: "20px",
            paddingRight: "20px",
            letterSpacing: "1.2px",
            "&:focus": {
                border: `1px solid ${palette.colors.primary}`,
                boxShadow: `0 0 0 0.2rem ${chroma(palette.colors.primary).alpha(0.25)}`,
                outline: "none"
            },
            height: "34px"
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
            maxWidth: "300px",
            marginTop: "10px"
        },

        inputErrorMessage: {
            paddingTop: "5px",
            paddingBottom: "5px",
            color: palette.colors.error,
            lineHeight: "24px",
            fontWeight: 400,
            fontSize: palette.fonts.size[0],
            textAlign: "left",
            animation: `${slideTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
            maxWidth: "330px",
            "@media (max-width: 440px)": {
                maxWidth: "250px"
            }
        },

        inputErrorSymbol: {
            marginRight: "5px",
            top: "1px",
            position: "relative",
            left: "2px"
        },

        inputAdornment: {
            float: "right",
            left: "8%",
            top: "-24px",
            position: "relative",
            display: "flex",
            "@media (max-width: 440px)": {
                left: "10%"
            },
            height: "0px"
        },

        showPassword: {
            float: "right",
            top: "-65px",
            position: "relative",
            display: "flex",
            height: "0px",
            cursor: "pointer"
        },

        button: {
            width: "100%",
            height: "34px",
            backgroundColor: palette.colors.primary,
            color: "white",
            fontWeight: 700,
            border: `1px solid ${chroma(palette.colors.primary)
                .darken(0.3)
                .hex()}`,
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
            fontWeight: 600,
            fontSize: palette.fonts.size[0],
            lineHeight: "24px",
            color: palette.colors.textLabel
        },

        formRow: {
            display: "flex",
            flexDirection: "column",
            paddingTop: "0px",
            paddingBottom: "34px"
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

        sendVerifyEmailIcon: {
            marginTop: "11px"
        },

        headerTinyTitle: {
            marginTop: "13px",
            fontSize: palette.fonts.size[2],
            letterSpacing: "1.1px",
            fontWeight: 500,
            lineHeight: "28px"
        },

        sendVerifyEmailText: {
            lineHeight: "21px",
            fontSize: palette.fonts.size[0],
            textAlign: "center",
            fontWeight: 300,
            letterSpacing: "0.8px"
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

        sendVerifyEmailResend: {
            marginTop: "13px",
            fontWeight: 300,
            "&:hover": {
                textDecoration: "underline"
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

        noFormRow: {
            paddingBottom: "25px"
        },

        emailVerificationButtonWrapper: {
            paddingTop: "25px",
            maxWidth: "96px",
            margin: "0 auto"
        }
    };
}
