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

/*
 * Palette
 */
import { NormalisedDefaultStyles, NormalisedPalette } from "../types";

export const defaultPalette: NormalisedPalette = {
    colors: {
        background: "white",
        inputBackground: "#f2f2f2",
        primary: "#ff9b33",
        error: "#ff1717",
        textTitle: "#222222",
        textPrimary: "#222222",
        textSecondary: "#656565",
        textLink: "#0076ff"
    },

    fonts: {
        size: ["14px", "16px", "28px"]
    }
};

/*
 * Default styles.
 */

export function getDefaultStyles(palette: NormalisedPalette): NormalisedDefaultStyles {
    return {
        root: {
            margin: "26px",
            "@media (max-width: 440px)": {
                margin: "12px"
            }
        },

        container: {
            fontFamily: "'Rubik', sans-serif",
            maxWidth: "524px",
            width: "60vw",
            margin: "0 auto",
            minWidth: "420px",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "1px 1px 10px rgba(0,0,0,0.16)",
            backgroundColor: palette.colors.background,
            "@media (max-width: 440px)": {
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
            backgroundColor: "#ffebeb",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "18px",
            paddingRight: "18px",
            letterSpacing: "0.2px",
            fontSize: palette.fonts.size[1],
            borderRadius: "12px",
            color: palette.colors.error
        },

        inputWrapper: {
            float: "left",
            width: "100%"
        },

        inputError: {
            border: `1px solid ${palette.colors.error}`
        },

        input: {
            width: "94%",
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
            height: "42px",
            backgroundPosition: "90% 50% !important", // Password manager backgrounds.
            "@media (max-width: 800px)": {
                backgroundPosition: "87% 50% !important"
            },
            "@media (max-width: 440px)": {
                backgroundPosition: "84% 50% !important"
            }
        },

        inputAdornment: {
            float: "right",
            left: "-2%",
            top: "-33px",
            position: "relative",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center"
        },

        inputErrorMessage: {
            color: palette.colors.error,
            lineHeight: "24px",
            fontWeight: 400,
            textAlign: "left"
        },

        button: {
            width: "100%",
            height: "42px",
            backgroundColor: palette.colors.primary,
            color: "white",
            fontWeight: 700,
            borderWidth: "0px",
            borderRadius: "8px",
            "&:disabled": {
                cursor: "no-drop"
            },
            "&:active": {
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
            color: palette.colors.textPrimary
        },

        formRow: {
            display: "flex",
            flexDirection: "column",
            paddingTop: "5px",
            paddingBottom: "24px"
        },

        primaryText: {
            fontSize: palette.fonts.size[1],
            fontWeight: 400,
            letterSpacing: "0.4px",
            color: palette.colors.textPrimary
        },

        secondaryText: {
            fontSize: palette.fonts.size[1],
            fontWeight: 300,
            letterSpacing: "0.4px",
            color: palette.colors.textSecondary
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
            alignItems: "center"
        }
    };
}
