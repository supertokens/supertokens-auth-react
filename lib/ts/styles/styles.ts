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
export const palette = {
    colors: {
        background: "white",
        primary: "#222222",
        secondary: "#656565"
    },

    fonts: {
        size: [16, 28],
        primary: "Rubik"
    }
};

/*
 * Default styles.
 */

export const defaultStyles = {
    container: {
        maxWidth: "524px",
        width: "60vw",
        margin: "0 auto",
        minWidth: "420px",
        height: "498px",
        borderRadius: "8px",
        boxShadow: "1px 1px 10px rgba(0,0,0,0.16)",
        backgroundColor: palette.colors.background,
        "@media (max-width: 440px)": {
            minWidth: "320px"
        }
    },
    row: {
        margin: "0 auto",
        width: "60%"
    },
    divider: {
        margin: "1em -1em",
        borderBottom: "0.3px solid #dddddd",
        display: "flex",
        alignItems: "center"
    }
};
