import { FeatureConfigBase, FormFields, FormFieldsBaseConfig, RecipeModuleConfig } from "../../types";
import EmailPassword from "./emailPassword";
import { CSSInterpolation } from "@emotion/serialize/types/index";
export declare type EmailPasswordUserInput = {
    signInAndUpFeature?: SignInAndUpConfig;
    resetPasswordUsingTokenFeature?: any;
};
export declare type EmailPasswordConfig = RecipeModuleConfig & EmailPasswordUserInput;
export declare type SignInAndUpConfig = {
    disableDefaultImplementation?: boolean;
    onSuccessRedirectURL?: string;
    signUpForm?: SignUpFormFeatureConfig;
    signInForm?: SignInFormFeatureConfig;
};
export declare type SignInAndUp = {
    disableDefaultImplementation: boolean;
    onSuccessRedirectURL: string;
    signUpForm?: SignUpFormFeatureConfig;
    signInForm?: SignInFormFeatureConfig;
};
export declare type FormFieldsSignInConfig = FormFieldsBaseConfig;
export declare type FormFieldsSignUpConfig = FormFields;
export declare type SignUpFormFeatureConfig = FeatureConfigBase & {
    formFields?: FormFieldsSignUpConfig[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
};
export declare type SignInFormFeatureConfig = FeatureConfigBase & {
    formFields?: FormFieldsSignInConfig[];
    resetPasswordURL?: string;
};
export declare type EmailPasswordProps = {
    __internal?: InternalEmailPasswordProps;
};
declare type InternalEmailPasswordProps = {
    instance: EmailPassword;
};
export declare type SignUpThemeProps = {
    callApi?: any;
    onSuccess?: () => void;
    signInClicked?: () => void;
    styleFormInit?: CSSInterpolation;
    formFields: FormFieldsSignInProps[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
};
export declare type SignInThemeProps = {
    callApi?: any;
    onSuccess?: () => void;
    signUpClicked?: () => void;
    styleFormInit?: CSSInterpolation;
    formFields: FormFieldsSignInProps[];
    resetPasswordURL?: string;
};
export declare type SignInAndUpThemeProps = {
    signInForm: SignInThemeProps;
    signUpForm: SignUpThemeProps;
};
export declare type FormFieldsSignInProps = FormFieldsSignUpConfig;
export {};
