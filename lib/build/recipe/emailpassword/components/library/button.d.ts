/// <reference types="react" />
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { NormalisedDefaultStyles } from "../../types";
declare type ButtonProps = {
    style: CSSInterpolation;
    label: string;
    isLoading: boolean;
    disabled?: boolean;
    type: "submit" | "button" | "reset" | undefined;
    defaultStyles: NormalisedDefaultStyles;
};
export default function Button({ style, type, label, disabled, isLoading, defaultStyles }: ButtonProps): JSX.Element;
export {};
