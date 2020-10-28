import * as React from "react";
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { RefObject } from "react";
import { APIFormField } from "../types";
declare type InputProps = {
    style?: CSSInterpolation;
    errorStyle?: CSSInterpolation;
    type: string;
    name: string;
    hasError: boolean;
    placeholder: string;
    ref: RefObject<any>;
    onChange?: (field: APIFormField) => void;
};
declare const _default: React.ForwardRefExoticComponent<Pick<InputProps, "style" | "name" | "type" | "onChange" | "placeholder" | "hasError" | "errorStyle"> & React.RefAttributes<any>>;
export default _default;
