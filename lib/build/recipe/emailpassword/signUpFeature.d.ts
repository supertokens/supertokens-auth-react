import { FormFields } from "../../types";
import { SignUpFormFeatureConfig } from "./types";
export default class SignUpFeature {
    formFields: FormFields[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
    constructor(config?: SignUpFormFeatureConfig);
    getFormFields: () => FormFields[];
    getPrivacyPolicyLink: () => string | undefined;
    getTermsAndConditionsLink: () => string | undefined;
    getDefaultFormFields: () => FormFields[];
}
