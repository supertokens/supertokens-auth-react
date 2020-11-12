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
import { CSSObject } from "@emotion/core";
import React from "react";
import { Styles } from "../../../types";
import EmailPassword from "../emailPassword";
import { NormalisedPalette } from "../types";
import { defaultPalette, getDefaultStyles } from "./styles";

type NormalisedStyle = {
    palette: NormalisedPalette;
    [x: string]: CSSObject;
};

const StyleContext = React.createContext<NormalisedStyle>({
    palette: defaultPalette,
    ...getDefaultStyles(defaultPalette)
});

export function StyleProvider({
    children,
    styleFromInit
}: {
    children: JSX.Element;
    styleFromInit?: Styles;
}): JSX.Element {
    const palette = EmailPassword.getInstanceOrThrow().getConfig().palette;
    const styles: NormalisedStyle = {
        palette,
        ...getDefaultStyles(palette)
    };
    if (styleFromInit !== undefined) {
        // Palette is a reserved word, delete it if exists.
        delete styleFromInit.palette;

        Object.keys(styleFromInit).forEach(key => [
            (styles[key] = {
                ...styles[key],
                ...styleFromInit[key]
            })
        ]);
    }

    return <StyleContext.Provider value={styles}>{children}</StyleContext.Provider>;
}

export const StyleConsumer = StyleContext.Consumer;
