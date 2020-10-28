import { APIFormField, NormalisedFormField } from "../../types";
import { FormFieldError, SignUpFormFeatureConfig } from "./types";
import { CSSInterpolation } from "@emotion/serialize/types/index";
export default class SignUpFeature {
    formFields: NormalisedFormField[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
    style: {
        [key: string]: CSSInterpolation;
    };
    constructor(config?: SignUpFormFeatureConfig);
    getFormFields: () => NormalisedFormField[];
    getStyle: () => {
        [key: string]: CSSInterpolation;
    };
    getPrivacyPolicyLink: () => string | undefined;
    getTermsAndConditionsLink: () => string | undefined;
    getDefaultFormFields: () => NormalisedFormField[];
    validate(input: APIFormField[]): Promise<FormFieldError[]>;
}
