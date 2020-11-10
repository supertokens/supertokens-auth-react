/// <reference types="react" />
import { CSSObject } from "@emotion/serialize/types/index";
import { NormalisedDefaultStyles } from "../../types";
declare type LabelProps = {
    style: CSSObject;
    value: string;
    showIsRequired?: boolean;
    defaultStyles: NormalisedDefaultStyles;
};
export default function Label({ style, value, showIsRequired, defaultStyles }: LabelProps): JSX.Element;
export {};
