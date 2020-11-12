/// <reference types="react" />
import { CSSObject } from "@emotion/serialize/types/index";
export declare type AdornmentType = "success" | "error" | undefined;
declare type InputAdornmentProps = {
    style?: CSSObject;
    type: AdornmentType;
};
export default function InputAdornment({ type, style }: InputAdornmentProps): JSX.Element;
export {};
