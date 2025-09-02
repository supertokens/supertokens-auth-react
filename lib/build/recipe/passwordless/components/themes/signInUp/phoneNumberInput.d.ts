/// <reference types="react" />
import type { InputProps } from "../../../../emailpassword/components/library/input";
declare type PhoneNumberInputProps = {
    defaultCountry?: string;
};
declare function PhoneNumberInput({
    defaultCountry,
    autoComplete,
    autofocus,
    name,
    onInputBlur,
    onInputFocus,
    onChange,
    hasError,
    value,
}: InputProps & PhoneNumberInputProps): JSX.Element;
export default PhoneNumberInput;
export declare const phoneNumberInputWithInjectedProps: (
    injectedProps: Partial<PhoneNumberInputProps>
) => (props: any) => import("react/jsx-runtime").JSX.Element;
