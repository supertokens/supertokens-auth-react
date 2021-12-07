import React from "react";
import { InputRef } from "../../../../emailpassword/types";
import { InputProps } from "../../../../emailpassword/components/library/input";
import { CountryCode } from "libphonenumber-js";
declare type PhoneNumberInputProps = {
    defaultCountry?: CountryCode;
};
declare const PhoneNumberInputWithForwardRef: React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<InputRef>
>;
export default PhoneNumberInputWithForwardRef;
export declare const phoneNumberInputWithInjectedProps: (
    props: PhoneNumberInputProps
) => React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>>;
