/// <reference types="react" />
import { CSSObject } from "@emotion/serialize/types/index";
declare type ButtonProps = {
    style: CSSObject;
    label: string;
    isLoading: boolean;
    disabled?: boolean;
    type: "submit" | "button" | "reset" | undefined;
    onClick?: () => void;
};
export default function Button({ style, type, label, disabled, isLoading, onClick }: ButtonProps): JSX.Element;
export {};
