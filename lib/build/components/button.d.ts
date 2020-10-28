/// <reference types="react" />
import { CSSInterpolation } from "@emotion/serialize/types/index";
declare type ButtonProps = {
    style: CSSInterpolation;
    label: string;
    isLoading: boolean;
    disabled: boolean;
    type: "submit" | "button" | "reset" | undefined;
};
export default function Button(props: ButtonProps): JSX.Element;
export {};
