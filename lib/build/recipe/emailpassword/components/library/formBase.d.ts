import React from "react";
import type { FormBaseProps, FormFieldThemeProps } from "../../types";
export declare type FieldState = {
    id: string;
    validated?: boolean;
    error?: string;
    value: string;
};
export declare const fetchDefaultValue: (field: FormFieldThemeProps) => string;
export declare const FormBase: React.FC<FormBaseProps<any>>;
export declare const useFormFields: () => {
    id: string;
    value: string;
}[];
export default FormBase;
