/// <reference types="react" />
import { APIFormField } from "../../../../types";
export declare type InputProps = {
    type: string;
    name: string;
    autofocus?: boolean;
    autoComplete?: string;
    validated: boolean;
    hasError: boolean;
    placeholder: string;
    value: string;
    onInputBlur?: (field: APIFormField) => void;
    onInputFocus?: (field: APIFormField) => void;
    onChange?: (field: APIFormField) => void;
};
declare const Input: React.FC<InputProps>;
export default Input;
