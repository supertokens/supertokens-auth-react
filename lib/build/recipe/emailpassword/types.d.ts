import { APIFormField, FeatureBaseConfig, FormField, FormFieldBaseConfig, NormalisedBaseConfig, NormalisedFormField, RecipeModuleConfig, RequestJson } from "../../types";
import { API_RESPONSE_STATUS } from "../../constants";
import EmailPassword from "./emailPassword";
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { RefObject } from "react";
import NormalisedURLPath from "../../normalisedURLPath";
export declare type EmailPasswordUserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: any;
};
export declare type EmailPasswordConfig = RecipeModuleConfig & EmailPasswordUserInput;
export declare type NormalisedEmailPasswordConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature?: any;
};
export declare type SignInAndUpFeatureUserInput = {
    disableDefaultImplementation?: boolean;
    onSuccessRedirectURL?: string;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
};
export declare type NormalisedSignInAndUpFeatureConfig = {
    disableDefaultImplementation: boolean;
    onSuccessRedirectURL: NormalisedURLPath;
    signUpForm: NormalisedSignUpFormFeatureConfig;
    signInForm: NormalisedSignInFormFeatureConfig;
};
export declare type SignUpFormFeatureUserInput = FeatureBaseConfig & {
    formFields?: FormFieldSignUpConfig[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
};
export declare type NormalisedSignUpFormFeatureConfig = NormalisedBaseConfig & {
    formFields: NormalisedFormField[];
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
};
export declare type SignInFormFeatureUserInput = FeatureBaseConfig & {
    formFields?: FormFieldSignInConfig[];
    resetPasswordURL?: string;
};
export declare type NormalisedSignInFormFeatureConfig = NormalisedBaseConfig & {
    formFields: NormalisedFormField[];
    resetPasswordURL: NormalisedURLPath;
};
export declare type FormFieldSignInConfig = FormFieldBaseConfig;
export declare type FormFieldSignUpConfig = FormField;
export declare type EmailPasswordProps = {
    __internal?: {
        instance: EmailPassword;
    };
    children?: JSX.Element;
    onHandleForgotPasswordClicked?: () => Promise<boolean>;
    doesSessionExist?: () => Promise<boolean>;
    onHandleSuccess?: (context: any, user?: any, responseJson?: any) => Promise<boolean>;
    onCallSignUpAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    onCallSignInAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
};
declare type EmailPasswordThemeProps = {
    callAPI: (fields: APIFormField[]) => Promise<SignInThemeResponse>;
    onSuccess?: () => void;
    styleFromInit?: {
        [key: string]: CSSInterpolation;
    };
    formFields: FormFieldThemeProps[];
};
export declare type SignInThemeProps = EmailPasswordThemeProps & {
    signUpClicked?: () => void;
    forgotPasswordClick?: () => void;
    resetPasswordURL?: NormalisedURLPath;
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
export declare type SignUpThemeResponse = {
    status: API_RESPONSE_STATUS.OK;
} | {
    status: API_RESPONSE_STATUS.GENERAL_ERROR;
    message?: string;
} | {
    status: API_RESPONSE_STATUS.FIELD_ERROR;
    fields: FormFieldError[];
};
export declare type SignInThemeResponse = SignUpThemeResponse | {
    status: API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR;
    message?: string;
};
export declare type User = {
    id: string;
    email: string;
};
export declare type FormFieldState = FormFieldThemeProps & {
    validated: boolean;
    ref: RefObject<HTMLInputElement>;
    showIsRequired: boolean;
};
export {};
