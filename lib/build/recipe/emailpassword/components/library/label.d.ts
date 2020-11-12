/// <reference types="react" />
import { CSSObject } from "@emotion/serialize/types/index";
declare type LabelProps = {
    style: CSSObject;
    value: string;
    showIsRequired?: boolean;
};
export default function Label({ style, value, showIsRequired }: LabelProps): JSX.Element;
export {};
