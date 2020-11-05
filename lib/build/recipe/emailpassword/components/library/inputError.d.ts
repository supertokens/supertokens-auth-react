/// <reference types="react" />
import { CSSObject } from "@emotion/serialize/types/index";
import { NormalisedDefaultStyles } from "../../types";
declare type InputErrorProps = {
    style: CSSObject;
    error: string;
    defaultStyles: NormalisedDefaultStyles;
};
export default function InputError({ style, error, defaultStyles }: InputErrorProps): JSX.Element;
export {};
