/** @jsx jsx */
import { CSSObject } from "@emotion/core";
import * as React from "react";
import { RefObject } from "react";
import { APIFormField } from "../../../../../../types";
declare type InputProps = {
    style?: CSSObject;
    errorStyle?: CSSObject;
    adornmentStyle?: CSSObject;
    validated: boolean;
    type: string;
    name: string;
    hasError: boolean;
    placeholder: string;
    ref: RefObject<any>;
    onChange?: (field: APIFormField) => void;
};
declare const _default: React.ForwardRefExoticComponent<Pick<InputProps, "style" | "name" | "type" | "onChange" | "placeholder" | "hasError" | "validated" | "errorStyle" | "adornmentStyle"> & React.RefAttributes<any>>;
export default _default;
