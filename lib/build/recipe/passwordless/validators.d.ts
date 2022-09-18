export declare function defaultEmailValidator(value: any): string | undefined;
export declare function defaultPhoneNumberValidator(
    value: string
): "GENERAL_ERROR_PHONE_NON_STRING" | "GENERAL_ERROR_PHONE_INVALID" | undefined;
export declare function defaultEmailValidatorForCombinedInput(value: any): string | undefined;
export declare function defaultPhoneNumberValidatorForCombinedInput(
    value: string
): "GENERAL_ERROR_EMAIL_OR_PHONE_NON_STRING" | "GENERAL_ERROR_EMAIL_OR_PHONE_INVALID" | undefined;
export declare function userInputCodeValidate(value: any): Promise<string | undefined>;
export declare function defaultValidate(_: any): Promise<string | undefined>;
