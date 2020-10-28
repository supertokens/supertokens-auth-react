/// <reference types="react" />
import { CSSInterpolation } from "@emotion/serialize/types/index";
export declare type AdornmentType = "success" | "error" | undefined;
declare type InputAdornmentProps = {
    style?: CSSInterpolation;
    type: AdornmentType;
};
export default function InputAdornment(props: InputAdornmentProps): JSX.Element;
export {};
