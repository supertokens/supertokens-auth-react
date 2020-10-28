import { APIFormField, NormalisedFormField } from "../../types";
import { FormFieldError, SignInFormFeatureConfig } from "./types";
import { CSSInterpolation } from "@emotion/serialize/types/index";
export default class SignInFeature {
    formFields: NormalisedFormField[];
    resetPasswordURL?: string;
    style: {
        [key: string]: CSSInterpolation;
    };
    constructor(defaultFormFields: NormalisedFormField[], config?: SignInFormFeatureConfig);
    getFormFields: () => NormalisedFormField[];
    getStyle: () => {
        [key: string]: CSSInterpolation;
    };
    getResetPasswordURL: () => string | undefined;
    validate(input: APIFormField[]): Promise<FormFieldError[]>;
}
