/// <reference types="react" />
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { NormalisedDefaultStyles } from "../../types";
declare type InputErrorProps = {
    style: CSSInterpolation;
    error: string;
    defaultStyles: NormalisedDefaultStyles;
};
export default function InputError({ style, error, defaultStyles }: InputErrorProps): JSX.Element;
export {};
