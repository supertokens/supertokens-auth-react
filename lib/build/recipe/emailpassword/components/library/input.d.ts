/// <reference types="react" />
export declare type InputProps = {
    type: string;
    name: string;
    autofocus?: boolean;
    autoComplete?: string;
    validated: boolean;
    hasError: boolean;
    placeholder: string;
    value: string;
    onInputBlur: (value: string) => void;
    onInputFocus: (value: string) => void;
    onChange: (value: string) => void;
};
declare const Input: React.FC<InputProps>;
export default Input;
