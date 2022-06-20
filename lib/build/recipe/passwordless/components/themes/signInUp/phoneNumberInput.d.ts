/// <reference types="react" />
import { InputProps } from "../../../../emailpassword/components/library/input";
import { CountryCode } from "libphonenumber-js";
declare type PhoneNumberInputProps = {
    defaultCountry?: CountryCode;
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
    placeholder,
    value,
}: InputProps & PhoneNumberInputProps): JSX.Element;
export default PhoneNumberInput;
export declare const phoneNumberInputWithInjectedProps: (
    injectedProps: Partial<PhoneNumberInputProps>
) => (props: any) => import("@emotion/react/jsx-runtime").JSX.Element;
