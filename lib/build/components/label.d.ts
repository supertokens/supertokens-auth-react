/// <reference types="react" />
import { CSSInterpolation } from "@emotion/serialize/types/index";
declare type LabelProps = {
    style: CSSInterpolation;
    value: string;
    showIsRequired?: boolean;
};
export default function Label(props: LabelProps): JSX.Element;
export {};
