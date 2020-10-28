import * as React from "react";
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { RefObject } from "react";
import { APIFormField } from "../types";
declare type InputProps = {
    style: CSSInterpolation;
    type: string;
    name: string;
    placeholder: string;
    ref: RefObject<any>;
    handleChange?: (field: APIFormField) => void;
};
declare const _default: React.ForwardRefExoticComponent<Pick<InputProps, "style" | "name" | "type" | "placeholder" | "handleChange"> & React.RefAttributes<any>>;
export default _default;
