/// <reference types="react" />
import { CSSObject } from "@emotion/serialize/types/index";
import { NormalisedDefaultStyles } from "../../types";
declare type FormRowProps = {
    style: CSSObject;
    children: JSX.Element;
    defaultStyles: NormalisedDefaultStyles;
};
export default function FormRow({ style, children, defaultStyles }: FormRowProps): JSX.Element;
export {};
