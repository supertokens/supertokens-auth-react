import type {
    Config,
    NormalisedConfig,
    NormalisedResetPasswordUsingTokenFeatureConfig,
    NormalisedSignInAndUpFeatureConfig,
    NormalisedSignInFormFeatureConfig,
    NormalisedSignUpFormFeatureConfig,
    ResetPasswordUsingTokenUserInput,
    SignInAndUpFeatureUserInput,
    SignInFormFeatureUserInput,
    SignUpFormFeatureUserInput,
} from "./types";
import type { FormField, NormalisedFormField } from "../../types";
export declare function normaliseEmailPasswordConfig(config?: Config): NormalisedConfig;
export declare function normaliseSignInAndUpFeature(
    config?: SignInAndUpFeatureUserInput
): NormalisedSignInAndUpFeatureConfig;
export declare function normaliseSignUpFormFeatureConfig(
    config?: SignUpFormFeatureUserInput
): NormalisedSignUpFormFeatureConfig;
export declare function normaliseSignInFormFeatureConfig(
    defaultFormFields: NormalisedFormField[],
    config?: SignInFormFeatureUserInput
): NormalisedSignInFormFeatureConfig;
export declare function getDefaultFormFields(): NormalisedFormField[];
export declare function normaliseResetPasswordUsingTokenFeature(
    signUpPasswordFieldValidate: (value: any) => Promise<string | undefined> | string | undefined,
    signUpEmailField: NormalisedFormField,
    config?: ResetPasswordUsingTokenUserInput
): NormalisedResetPasswordUsingTokenFeatureConfig;
export declare function mergeFormFields(
    defaultFormFields: NormalisedFormField[],
    userFormFields: FormField[]
): NormalisedFormField[];
export declare function getFormattedFormField(field: NormalisedFormField): NormalisedFormField;
