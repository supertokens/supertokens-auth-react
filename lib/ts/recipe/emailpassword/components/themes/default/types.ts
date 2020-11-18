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

export enum paletteColorOptions {
    BACKGROUND = "background",
    INPUTBACKGROUND = "inputBackground",
    GENERALERRORBACKGROUND = "generalErrorBackground",
    PRIMARY = "primary",
    ERROR = "error",
    TEXTTITLE = "textTitle",
    TEXTLABEL = "textLabel",
    TEXTPRIMARY = "textPrimary",
    TEXTLINK = "textLink"
}

export type NormalisedPalette = {
    colors: Record<paletteColorOptions, string>;
    fonts: {
        size: string[];
    };
};

export enum defaultStylesOptions {
    CONTAINER = "container",
    ROW = "row",
    GENERALERROR = "generalError",
    INPUTWRAPPER = "inputWrapper",
    INPUT = "input",
    INPUTERROR = "inputError",
    INPUTADORNMENT = "inputAdornment",
    INPUTERRORMESSAGE = "inputErrorMessage",
    BUTTON = "button",
    LABEL = "label",
    FORMROW = "formRow",
    PRIMARYTEXT = "primaryText",
    SECONDARYTEXT = "secondaryText",
    LINK = "link",
    DIVIDER = "divider"
}

export type NormalisedDefaultStyles = Record<defaultStylesOptions, CSSObject>;
