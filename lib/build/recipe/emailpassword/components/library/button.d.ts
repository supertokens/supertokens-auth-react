/// <reference types="react" />
declare type ButtonProps = {
    label: string;
    isLoading: boolean;
    disabled?: boolean;
    type: "submit" | "button" | "reset" | undefined;
    onClick?: () => void;
    isGreyedOut?: boolean;
};
export default function Button({ type, label, disabled, isLoading, onClick, isGreyedOut }: ButtonProps): JSX.Element;
export {};
