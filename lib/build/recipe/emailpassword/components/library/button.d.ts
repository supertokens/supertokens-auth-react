/// <reference types="react" />
declare type ButtonProps = {
    label: string;
    isLoading: boolean;
    disabled?: boolean;
    type: "submit" | "button" | "reset" | undefined;
    onClick?: () => void;
    isGreyedOut?: boolean;
    icon?: () => JSX.Element;
};
export default function Button({
    type,
    label,
    disabled,
    isLoading,
    onClick,
    isGreyedOut,
    icon,
}: ButtonProps): JSX.Element;
export {};
