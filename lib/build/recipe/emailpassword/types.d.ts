import { APIFormFields, APIStatus, FeatureConfigBase, FormFields, FormFieldsBaseConfig, RecipeModuleConfig, RequestJson } from "../../types";
import EmailPassword from "./emailPassword";
import { CSSInterpolation } from "@emotion/serialize/types/index";
export declare enum SignInAPIFieldsID {
    email = "email",
    password = "password"
}
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
    history?: History;
    onHandleForgotPasswordClicked?: () => Promise<boolean>;
    doesSessionExist?: () => Promise<boolean>;
    onHandleSuccess?: (context: any, user?: any, responseJson?: any) => Promise<boolean>;
    onCallSignUpAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    onCallSignInAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
};
declare type InternalEmailPasswordProps = {
    instance: EmailPassword;
};
export declare type SignUpThemeProps = {
    callAPI?: (formFields: APIFormFields[]) => Promise<Response>;
    onSuccess?: () => void;
    signInClicked?: () => void;
    styleFormInit?: CSSInterpolation;
    formFields: FormFieldsSignInProps[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
};
export declare type SignInThemeProps = {
    callAPI: (fields: APIFormFields[]) => Promise<APIResponse>;
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
export declare type APIResponse = {
    status: APIStatus;
    fields?: {
        id: SignInAPIFieldsID;
        error: string;
    }[];
    message?: string;
};
export declare type User = {
    id: string;
    email: string;
};
export {};
