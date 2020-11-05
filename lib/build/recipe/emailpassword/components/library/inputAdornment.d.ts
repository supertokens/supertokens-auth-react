/// <reference types="react" />
import { CSSObject } from "@emotion/serialize/types/index";
import { NormalisedDefaultStyles, NormalisedPalette } from "../../types";
export declare type AdornmentType = "success" | "error" | undefined;
declare type InputAdornmentProps = {
    style?: CSSObject;
    type: AdornmentType;
    defaultStyles: NormalisedDefaultStyles;
    palette: NormalisedPalette;
};
export default function InputAdornment({ type, style, defaultStyles, palette }: InputAdornmentProps): JSX.Element;
export {};
