import { APIFormField, NormalisedFormField } from "../../types";
import { FormFieldError, SignInFormFeatureConfig } from "./types";
export default class SignInFeature {
    formFields: NormalisedFormField[];
    resetPasswordURL?: string;
    constructor(defaultFormFields: NormalisedFormField[], config?: SignInFormFeatureConfig);
    getFormFields: () => NormalisedFormField[];
    getResetPasswordURL: () => string | undefined;
    validate(input: APIFormField[]): Promise<FormFieldError[]>;
}
