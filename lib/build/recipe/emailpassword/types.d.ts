import { APIFormField, AuthRecipeModuleUserInput, FeatureBaseConfig, FormField, FormFieldBaseConfig, NormalisedBaseConfig, NormalisedFormField, RecipeModuleConfig, SuccessAPIResponse, ThemeBaseProps } from "../../types";
import { RefObject } from "react";
import NormalisedURLPath from "../../normalisedURLPath";
import { History, LocationState } from "history";
import { EmailVerificationUserInput } from "../emailverification/types";
export declare type EmailPasswordUserInput = AuthRecipeModuleUserInput<EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext> & {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    emailVerificationFeature?: EmailVerificationUserInput;
};
export declare type EmailPasswordConfig = EmailPasswordUserInput & RecipeModuleConfig<EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext>;
export declare type NormalisedEmailPasswordConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
};
export declare type SignInAndUpFeatureUserInput = {
    disableDefaultImplementation?: boolean;
    defaultToSignUp?: boolean;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
};
export declare type NormalisedSignInAndUpFeatureConfig = {
    disableDefaultImplementation: boolean;
    defaultToSignUp: boolean;
    signUpForm: NormalisedSignUpFormFeatureConfig;
    signInForm: NormalisedSignInFormFeatureConfig;
};
export declare type SignUpFormFeatureUserInput = FeatureBaseConfig & {
    formFields?: FormFieldSignUpConfig[];
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
};
export declare type NormalisedSignUpFormFeatureConfig = NormalisedBaseConfig & {
    formFields: NormalisedFormField[];
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
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
export declare type ResetPasswordUsingTokenUserInput = {
    disableDefaultImplementation?: boolean;
    submitNewPasswordForm?: FeatureBaseConfig;
    enterEmailForm?: FeatureBaseConfig;
};
export declare type NormalisedResetPasswordUsingTokenFeatureConfig = {
    disableDefaultImplementation: boolean;
    submitNewPasswordForm: NormalisedSubmitNewPasswordForm;
    enterEmailForm: NormalisedEnterEmailForm;
};
export declare type NormalisedSubmitNewPasswordForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};
export declare type NormalisedEnterEmailForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};
export declare type FeatureBaseProps<T> = {
    __internal?: {
        instance: T;
    };
    children?: JSX.Element;
    history?: History<LocationState>;
};
declare type FormThemeBaseProps = ThemeBaseProps & {
    formFields: FormFieldThemeProps[];
};
export declare type SignInThemeProps = FormThemeBaseProps & {
    signUpClicked?: () => void;
    forgotPasswordClick: () => void;
    signInAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
};
export declare type SignUpThemeProps = FormThemeBaseProps & {
    signInClicked?: () => void;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    signUpAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
};
export declare type SignInAndUpThemeProps = {
    defaultToSignUp: boolean;
    signInForm: SignInThemeProps;
    signUpForm: SignUpThemeProps;
    rawPalette: Record<string, string>;
};
export declare type NormalisedFormFieldWithError = NormalisedFormField & {
    error?: string;
};
export declare type FormFieldThemeProps = NormalisedFormFieldWithError & {
    showIsRequired?: boolean;
    autoComplete?: string;
};
export declare type FormFieldState = FormFieldThemeProps & {
    validated: boolean;
    ref: RefObject<InputRef>;
};
export declare type InputRef = HTMLInputElement & {
    isFocused?: boolean;
};
export declare type FormFieldError = {
    id: string;
    error: string;
};
export declare type EmailExistsAPIResponse = SuccessAPIResponse & {
    exists: boolean;
};
export declare type FormFieldAPIResponse = {
    status: "FIELD_ERROR";
    formFields: FormFieldError[];
};
export declare type BaseSignInUpAPIResponse = {
    status: "OK";
    user: User;
} | FormFieldAPIResponse;
export declare type BaseResetPasswordAPIResponse = {
    status: "OK";
} | FormFieldAPIResponse;
export declare type ThemeResponseGeneralError = {
    status: "GENERAL_ERROR";
    message: string;
};
export declare type SignUpAPIResponse = BaseSignInUpAPIResponse;
export declare type SignInAPIResponse = BaseSignInUpAPIResponse | {
    status: "WRONG_CREDENTIALS_ERROR";
    message: string;
};
export declare type EnterEmailAPIResponse = BaseResetPasswordAPIResponse;
export declare type SubmitNewPasswordAPIResponse = BaseResetPasswordAPIResponse | {
    status: "RESET_PASSWORD_INVALID_TOKEN_ERROR";
};
export declare type EmailPasswordPreAPIHookContext = {
    action: "SEND_RESET_PASSWORD_EMAIL" | "SUBMIT_NEW_PASSWORD" | "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED" | "SIGN_IN" | "SIGN_UP" | "SIGN_OUT";
    requestInit: RequestInit;
};
export declare type EmailPasswordGetRedirectionURLContext = {
    action: "SUCCESS";
    redirectToPath?: string;
} | {
    action: "SIGN_IN_AND_UP" | "VERIFY_EMAIL" | "RESET_PASSWORD";
};
export declare type EmailPasswordOnHandleEventContext = {
    action: "SESSION_ALREADY_EXISTS" | "RESET_PASSWORD_EMAIL_SENT" | "PASSWORD_RESET_SUCCESSFUL" | "VERIFY_EMAIL_SENT" | "EMAIL_VERIFIED_SUCCESSFUL";
} | {
    action: "SIGN_IN_COMPLETE" | "SIGN_UP_COMPLETE";
    user: {
        id: string;
        email: string;
    };
};
export declare type User = {
    id: string;
    email: string;
};
export declare type ResetPasswordUsingTokenThemeProps = {
    enterEmailForm: EnterEmailThemeProps;
    submitNewPasswordForm: SubmitNewPasswordThemeProps;
    hasToken: boolean;
    rawPalette: Record<string, string>;
};
export declare type EnterEmailThemeProps = FormThemeBaseProps & {
    enterEmailAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
};
export declare type SubmitNewPasswordThemeProps = FormThemeBaseProps & {
    submitNewPasswordAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    onSignInClicked: () => void;
};
export declare type SignInAndUpState = {
    status: "LOADING" | "READY";
} | {
    status: "SUCCESSFUL";
    user: User;
};
export declare type EnterEmailThemeState = {
    status: "READY" | "SENT";
};
export declare type SubmitNewPasswordThemeState = {
    status: "READY" | "SUCCESS";
};
export declare type SendVerifyEmailThemeState = {
    status: "READY" | "SUCCESS" | "ERROR";
};
export declare type EmailPasswordAuthState = {
    status: "LOADING" | "READY";
};
export declare type FormBaseState = {
    formFields: FormFieldState[];
    status: "IN_PROGRESS" | "READY" | "LOADING" | "FIELD_ERRORS" | "SUCCESS";
} | {
    formFields: FormFieldState[];
    status: "GENERAL_ERROR";
    generalError: string;
};
export declare type FormBaseProps = {
    header?: JSX.Element;
    footer?: JSX.Element;
    formFields: FormFieldThemeProps[];
    showLabels: boolean;
    buttonLabel: string;
    validateOnBlur?: boolean;
    onSuccess?: () => void;
    callAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
};
export declare type FormBaseAPIResponse = {
    status: "OK";
    user?: User;
} | {
    status: "GENERAL_ERROR";
    message: string;
} | {
    status: "FIELD_ERROR";
    formFields: FormFieldError[];
};
declare global {
    interface Document {
        documentMode?: any;
    }
}
export {};
