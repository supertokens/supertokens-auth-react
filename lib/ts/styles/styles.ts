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
import { CSSInterpolation } from "@emotion/serialize/types/index";

export const palette = {
    colors: {
        background: "white",
        primary: "#222222",
        secondary: "#656565",
        link: "#0076ff",
        error: "#ff1717"
    },

    fonts: {
        size: [14, 16, 28],
        bold: "Rubik-Bold",
        primary: "Rubik"
    }
};

/*
 * Default styles.
 */

export const defaultStyles = {
    root: {
        minHeight: "550px",
        margin: "26px"
    } as CSSInterpolation,

    container: {
        maxWidth: "524px",
        width: "60vw",
        margin: "0 auto",
        minWidth: "420px",
        minHeight: "498px",
        borderRadius: "8px",
        boxShadow: "1px 1px 10px rgba(0,0,0,0.16)",
        backgroundColor: palette.colors.background,
        "@media (max-width: 440px)": {
            minWidth: "320px"
        }
    } as CSSInterpolation,

    row: {
        margin: "0 auto",
        width: "60%",
        paddingTop: "50px",
        paddingBottom: "50px"
    } as CSSInterpolation,

    input: {
        float: "left",
        backgroundColor: "#f2f2f2",
        borderRadius: "12px",
        border: "1px solid #dddddd",
        width: "93%",
        height: "42px",
        fontSize: palette.fonts.size[0],
        paddingLeft: "20px",
        "&:focus": {
            outline: "none"
        }
    } as CSSInterpolation,

    inputError: {
        border: `1px solid ${palette.colors.error}`
    } as CSSInterpolation,

    inputErrorMessage: {
        color: palette.colors.error,
        lineHeight: "24px",
        fontWeight: 400,
        textAlign: "left",
        paddingTop: "5px"
    } as CSSInterpolation,

    button: {
        width: "100%",
        height: "42px",
        backgroundColor: "#ff9933",
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
    } as CSSInterpolation,

    label: {
        textAlign: "left",
        fontWeight: 600,
        fontSize: palette.fonts.size[1],
        lineHeight: "24px",
        paddingBottom: "10px"
    } as CSSInterpolation,

    formRow: {
        display: "flex",
        flexDirection: "column",
        paddingTop: "15px",
        paddingBottom: "15px"
    } as CSSInterpolation,

    secondaryText: {
        fontSize: palette.fonts.size[1],
        fontWeight: 400,
        color: palette.colors.secondary
    } as CSSInterpolation,

    link: {
        color: palette.colors.link,
        fontSize: palette.fonts.size[1],
        cursor: "pointer",
        letterSpacing: "0.16px",
        lineHeight: "40px"
    } as CSSInterpolation,

    divider: {
        marginTop: "1em",
        marginBottom: "1em",
        borderBottom: "0.3px solid #dddddd",
        display: "flex",
        alignItems: "center"
    } as CSSInterpolation
};
