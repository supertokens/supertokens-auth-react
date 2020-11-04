/// <reference types="react" />
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { NormalisedDefaultStyles } from "../../types";
declare type FormRowProps = {
    style: CSSInterpolation;
    children: JSX.Element;
    defaultStyles: NormalisedDefaultStyles;
};
export default function FormRow({ style, children, defaultStyles }: FormRowProps): JSX.Element;
export {};
