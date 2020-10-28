import { APIFormField, FeatureConfigBase, FormField, FormFieldBaseConfig, NormalisedFormField, RecipeModuleConfig, RequestJson } from "../../types";
import { API_RESPONSE_STATUS } from "../../constants";
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
export declare type FormFieldSignInConfig = FormFieldBaseConfig;
export declare type FormFieldSignUpConfig = FormField;
export declare type SignUpFormFeatureConfig = FeatureConfigBase & {
    formFields?: FormFieldSignUpConfig[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
};
export declare type SignInFormFeatureConfig = FeatureConfigBase & {
    formFields?: FormFieldSignInConfig[];
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
declare type EmailPasswordThemeProps = {
    callAPI: (fields: APIFormField[]) => Promise<APIResponse>;
    onSuccess?: () => void;
    styleFormInit?: {
        [key: string]: CSSInterpolation;
    };
    formFields: FormFieldThemeProps[];
};
export declare type SignInThemeProps = EmailPasswordThemeProps & {
    signUpClicked?: () => void;
    resetPasswordURL?: string;
};
export declare type SignUpThemeProps = EmailPasswordThemeProps & {
    signInClicked?: () => void;
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
};
export declare type SignInAndUpThemeProps = {
    signInForm: SignInThemeProps;
    signUpForm: SignUpThemeProps;
};
export declare type NormalisedFormFieldWithError = NormalisedFormField & {
    error?: string;
};
export declare type FormFieldThemeProps = NormalisedFormFieldWithError;
export declare type FormFieldError = {
    id: string;
    error: string;
};
export declare type APIResponse = {
    status: API_RESPONSE_STATUS;
    fields?: FormFieldError[];
    message?: string;
};
export declare type User = {
    id: string;
    email: string;
};
export {};
