/** @jsx jsx */
import { CSSObject } from "@emotion/react";
import React from "react";
import { APIFormField } from "../../../../types";
import { InputRef } from "../../types";
declare type InputProps = {
    errorStyle?: CSSObject;
    type: string;
    name: string;
    autoComplete?: string;
    validated: boolean;
    hasError: boolean;
    placeholder: string;
    onInputBlur?: (field: APIFormField) => void;
    onInputFocus?: (field: APIFormField) => void;
};
declare const _default: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>>;
export default _default;
