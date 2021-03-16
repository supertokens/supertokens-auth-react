/// <reference types="react" />
/// <reference types="@emotion/react/types/css-prop" />
/** @jsx jsx */
import { CSSObject } from "@emotion/react";
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
declare const _default: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<InputRef>>;
export default _default;
