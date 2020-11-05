/** @jsx jsx */
import { CSSObject } from "@emotion/core";
import * as React from "react";
import { RefObject } from "react";
import { APIFormField } from "../../../../types";
import { NormalisedDefaultStyles, NormalisedPalette } from "../../types";
declare type InputProps = {
    style?: CSSObject;
    errorStyle?: CSSObject;
    adornmentStyle?: CSSObject;
    validated: boolean;
    type: string;
    name: string;
    hasError: boolean;
    placeholder: string;
    defaultStyles: NormalisedDefaultStyles;
    palette: NormalisedPalette;
    ref: RefObject<any>;
    onChange?: (field: APIFormField) => void;
};
declare const _default: React.ForwardRefExoticComponent<Pick<InputProps, "style" | "hasError" | "defaultStyles" | "name" | "placeholder" | "type" | "onChange" | "palette" | "adornmentStyle" | "validated" | "errorStyle"> & React.RefAttributes<any>>;
export default _default;
