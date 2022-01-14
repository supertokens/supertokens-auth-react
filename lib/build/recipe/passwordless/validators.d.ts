export declare function defaultEmailValidator(value: any): string | undefined;
export declare function defaultPhoneNumberValidator(
    value: string
): "Phone number must be of type string" | "Phone number is invalid" | undefined;
export declare function defaultEmailValidatorForCombinedInput(value: any): string | undefined;
export declare function defaultPhoneNumberValidatorForCombinedInput(
    value: string
): "Email or Phone number must be of type string" | "Email or Phone number is invalid" | undefined;
export declare function userInputCodeValidate(value: any): Promise<string | undefined>;
