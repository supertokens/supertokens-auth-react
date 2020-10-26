import { FormFields } from "../../types";
import { SignInFormFeatureConfig } from "./types";
export default class SignInFeature {
    formFields: FormFields[];
    resetPasswordURL?: string;
    constructor(defaultFormFields: FormFields[], config?: SignInFormFeatureConfig);
    getFormFields: () => FormFields[];
    getResetPasswordURL: () => string | undefined;
}
