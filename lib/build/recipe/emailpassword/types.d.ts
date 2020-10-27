import { APIFormField, APIStatus, FeatureConfigBase, FormField, FormFieldBaseConfig, NormalisedFormField, RecipeModuleConfig, RequestJson } from "../../types";
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
export declare type SignUpThemeProps = {
    callAPI?: (formFields: APIFormField[]) => Promise<Response>;
    onSuccess?: () => void;
    signInClicked?: () => void;
    styleFormInit?: CSSInterpolation;
    formFields: FormFieldThemeProps[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
};
export declare type SignInThemeProps = {
    callAPI: (fields: APIFormField[]) => Promise<APIResponse>;
    onSuccess?: () => void;
    signUpClicked?: () => void;
    styleFormInit?: CSSInterpolation;
    formFields: FormFieldThemeProps[];
    resetPasswordURL?: string;
};
export declare type SignInAndUpThemeProps = {
    signInForm: SignInThemeProps;
    signUpForm: SignUpThemeProps;
};
export declare type FormFieldThemeProps = NormalisedFormField & {
    error?: string;
};
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
