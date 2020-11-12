/// <reference types="react" />
export declare type AdornmentType = "success" | "error" | undefined;
declare type InputAdornmentProps = {
    type: AdornmentType;
};
export default function InputAdornment({ type }: InputAdornmentProps): JSX.Element;
export {};
