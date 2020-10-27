import { NormalisedFormField } from "../../types";
import { SignUpFormFeatureConfig } from "./types";
export default class SignUpFeature {
    formFields: NormalisedFormField[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
    constructor(config?: SignUpFormFeatureConfig);
    getFormFields: () => NormalisedFormField[];
    getPrivacyPolicyLink: () => string | undefined;
    getTermsAndConditionsLink: () => string | undefined;
    getDefaultFormFields: () => NormalisedFormField[];
}
