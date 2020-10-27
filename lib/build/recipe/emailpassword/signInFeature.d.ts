import { NormalisedFormField } from "../../types";
import { SignInFormFeatureConfig } from "./types";
export default class SignInFeature {
    formFields: NormalisedFormField[];
    resetPasswordURL?: string;
    constructor(defaultFormFields: NormalisedFormField[], config?: SignInFormFeatureConfig);
    getFormFields: () => NormalisedFormField[];
    getResetPasswordURL: () => string | undefined;
}
