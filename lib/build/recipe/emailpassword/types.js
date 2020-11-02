"use strict";

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
 * EmailPassword User InputsConfig Types.
 */

/*
 * Props Types.
 */
// es-lint / prettier clash regarding | indentation.

/*eslint-disable */

/*eslint-enabled */

/*
 * State type.
 */
var paletteColorOptions;

(function(paletteColorOptions) {
    paletteColorOptions["BACKGROUND"] = "background";
    paletteColorOptions["INPUTBACKGROUND"] = "inputBackground";
    paletteColorOptions["PRIMARY"] = "primary";
    paletteColorOptions["ERROR"] = "error";
    paletteColorOptions["TEXTTITLE"] = "textTitle";
    paletteColorOptions["TEXTPRIMARY"] = "textPrimary";
    paletteColorOptions["TEXTSECONDARY"] = "textSecondary";
    paletteColorOptions["TEXTLINK"] = "textLink";
})(paletteColorOptions || (paletteColorOptions = {}));

var defaultStylesOptions;

(function(defaultStylesOptions) {
    defaultStylesOptions["ROOT"] = "root";
    defaultStylesOptions["CONTAINER"] = "container";
    defaultStylesOptions["ROW"] = "row";
    defaultStylesOptions["GENERALERROR"] = "generalError";
    defaultStylesOptions["INPUTWRAPPER"] = "inputWrapper";
    defaultStylesOptions["INPUT"] = "input";
    defaultStylesOptions["INPUTERROR"] = "inputError";
    defaultStylesOptions["INPUTADORNMENT"] = "inputAdornment";
    defaultStylesOptions["INPUTERRORMESSAGE"] = "inputErrorMessage";
    defaultStylesOptions["BUTTON"] = "button";
    defaultStylesOptions["LABEL"] = "label";
    defaultStylesOptions["FORMROW"] = "formRow";
    defaultStylesOptions["PRIMARYTEXT"] = "primaryText";
    defaultStylesOptions["SECONDARYTEXT"] = "secondaryText";
    defaultStylesOptions["LINK"] = "link";
    defaultStylesOptions["DIVIDER"] = "divider";
})(defaultStylesOptions || (defaultStylesOptions = {}));
