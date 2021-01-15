import { APIFormField, FeatureBaseConfig, FormField, FormFieldBaseConfig, NormalisedBaseConfig, NormalisedFormField, RecipeModuleConfig, RequestJson, Styles } from "../../types";
import { CSSObject } from "@emotion/react/types/index";
import { RefObject } from "react";
import NormalisedURLPath from "../../normalisedURLPath";
import { API_RESPONSE_STATUS, EMAIL_VERIFICATION_MODE, ENTER_EMAIL_STATUS, FORM_BASE_API_RESPONSE, FORM_BASE_STATUS, EMAIL_PASSWORD_REDIRECTION_URL_ACTION, EMAIL_PASSWORD_PRE_API_HOOK_ACTION, SEND_VERIFY_EMAIL_STATUS, SIGN_IN_AND_UP_STATUS, SUBMIT_NEW_PASSWORD_STATUS, SUCCESS_ACTION, VERIFY_EMAIL_LINK_CLICKED_STATUS, EMAIL_PASSWORD_AUTH_STATE } from "./constants";
import { History, LocationState } from "history";
import EmailPassword from "./emailPassword";
export declare type EmailPasswordUserInput = {
    palette?: PaletteUserInput;
    useShadowDom?: boolean;
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    emailVerificationFeature?: EmailVerificationUserInput;
};
export declare type EmailPasswordConfig = RecipeModuleConfig & EmailPasswordUserInput;
export declare type NormalisedEmailPasswordConfig = {
    palette: PaletteUserInput;
    useShadowDom: boolean;
    preAPIHook?: (context: PreAPIHookContext) => Promise<RequestInit>;
    getRedirectionURL?: (context: GetRedirectionURLContext) => Promise<string | undefined>;
    onHandleEvent?: (context: OnHandleEventContext) => void;
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    emailVerificationFeature: NormalisedEmailVerificationFeatureConfig;
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
export declare type EmailVerificationUserInput = {
    mode?: EmailVerificationMode;
    disableDefaultImplementation?: boolean;
    sendVerifyEmailScreen?: FeatureBaseConfig;
    verifyEmailLinkClickedScreen?: FeatureBaseConfig;
};
export declare type NormalisedEmailVerificationFeatureConfig = {
    mode: EmailVerificationMode;
    disableDefaultImplementation: boolean;
    sendVerifyEmailScreen: FeatureBaseConfig;
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
};
export declare type EmailVerificationMode = EMAIL_VERIFICATION_MODE.OFF | EMAIL_VERIFICATION_MODE.REQUIRED;
export declare type FeatureBaseProps = {
    __internal?: {
        instance: EmailPassword;
    };
    children?: JSX.Element;
    history?: History<LocationState>;
};
declare type ThemeBaseProps = {
    styleFromInit?: Styles;
    onSuccess: () => void;
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
declare type SuccessAPIResponse = {
    status: API_RESPONSE_STATUS.OK;
};
export declare type SignOutAPIResponse = SuccessAPIResponse;
export declare type EmailExistsAPIResponse = SuccessAPIResponse & {
    exists: boolean;
};
export declare type IsEmailVerifiedAPIResponse = SuccessAPIResponse & {
    isVerified: boolean;
};
export declare type VerifyEmailAPIResponse = SuccessAPIResponse | {
    status: API_RESPONSE_STATUS.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR;
};
export declare type SendVerificationEmailAPIResponse = SuccessAPIResponse;
export declare type FormFieldAPIResponse = {
    status: API_RESPONSE_STATUS.FIELD_ERROR;
    formFields: FormFieldError[];
};
export declare type BaseSignInUpAPIResponse = {
    status: API_RESPONSE_STATUS.OK;
    user: User;
} | FormFieldAPIResponse;
export declare type BaseResetPasswordAPIResponse = {
    status: API_RESPONSE_STATUS.OK;
} | FormFieldAPIResponse;
export declare type ThemeResponseGeneralError = {
    status: API_RESPONSE_STATUS.GENERAL_ERROR;
    message: string;
};
export declare type SignUpAPIResponse = BaseSignInUpAPIResponse;
export declare type SignUpThemeResponse = SignUpAPIResponse | ThemeResponseGeneralError;
export declare type SignInAPIResponse = BaseSignInUpAPIResponse | {
    status: API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR;
    message: string;
};
export declare type SignInThemeResponse = SignInAPIResponse | ThemeResponseGeneralError;
export declare type EnterEmailAPIResponse = BaseResetPasswordAPIResponse;
export declare type EnterEmailThemeResponse = EnterEmailAPIResponse | ThemeResponseGeneralError;
export declare type SubmitNewPasswordAPIResponse = BaseResetPasswordAPIResponse | {
    status: API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR;
};
export declare type SendVerifyEmailAPIResponse = {
    status: API_RESPONSE_STATUS.OK | API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR;
};
export declare type SendVerifyEmailThemeResponse = SendVerifyEmailAPIResponse | ThemeResponseGeneralError;
export declare type VerifyEmailThemeResponse = {
    status: keyof typeof VERIFY_EMAIL_LINK_CLICKED_STATUS;
};
export declare type PreAPIHookContext = {
    action: keyof typeof EMAIL_PASSWORD_PRE_API_HOOK_ACTION;
    requestInit: RequestInit;
};
export declare type GetRedirectionURLContext = {
    action: keyof typeof EMAIL_PASSWORD_REDIRECTION_URL_ACTION;
};
export declare type OnHandleEventContext = {
    action: SUCCESS_ACTION.EMAIL_VERIFIED_SUCCESSFUL | SUCCESS_ACTION.VERIFY_EMAIL_SENT | SUCCESS_ACTION.EMAIL_VERIFIED_SUCCESSFUL | SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL | SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT | SUCCESS_ACTION.EMAIL_VERIFIED_SUCCESSFUL | SUCCESS_ACTION.SESSION_ALREADY_EXISTS;
} | {
    action: SUCCESS_ACTION.SIGN_IN_COMPLETE | SUCCESS_ACTION.SIGN_UP_COMPLETE;
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
};
export declare type EnterEmailThemeProps = FormThemeBaseProps & {
    enterEmailAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
};
export declare type SubmitNewPasswordThemeProps = FormThemeBaseProps & {
    submitNewPasswordAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    onSignInClicked: () => void;
};
export declare type EmailVerificationThemeProps = {
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;
    verifyEmailLinkClickedScreen: VerifyEmailLinkClickedThemeProps;
    hasToken: boolean;
};
export declare type SendVerifyEmailThemeProps = ThemeBaseProps & {
    sendVerifyEmailAPI: () => Promise<SendVerifyEmailThemeResponse>;
    signOut: () => Promise<void>;
    onEmailAlreadyVerified: () => Promise<void>;
};
export declare type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    verifyEmailAPI: () => Promise<VerifyEmailThemeResponse>;
    onTokenInvalidRedirect: () => Promise<void>;
    onContinueClicked: () => Promise<void>;
};
export declare type SignInAndUpState = {
    status: SIGN_IN_AND_UP_STATUS.LOADING;
} | {
    status: SIGN_IN_AND_UP_STATUS.READY;
} | {
    status: SIGN_IN_AND_UP_STATUS.SUCCESSFUL;
    user: User;
};
export declare type EnterEmailThemeState = {
    status: keyof typeof ENTER_EMAIL_STATUS;
};
export declare type SubmitNewPasswordThemeState = {
    status: keyof typeof SUBMIT_NEW_PASSWORD_STATUS;
};
export declare type SendVerifyEmailThemeState = {
    status: keyof typeof SEND_VERIFY_EMAIL_STATUS;
};
export declare type VerifyEmailLinkClickedThemeState = {
    status: keyof typeof VERIFY_EMAIL_LINK_CLICKED_STATUS;
};
export declare type EmailPasswordAuthState = {
    status: EMAIL_PASSWORD_AUTH_STATE.LOADING | EMAIL_PASSWORD_AUTH_STATE.READY;
};
export declare type PaletteUserInput = Record<string, string>;
export declare type DefaultStylesUserInput = Record<string, CSSObject>;
export declare type FormBaseState = {
    formFields: FormFieldState[];
    status: FORM_BASE_STATUS.IN_PROGRESS | FORM_BASE_STATUS.READY | FORM_BASE_STATUS.LOADING | FORM_BASE_STATUS.FIELD_ERRORS | FORM_BASE_STATUS.SUCCESS;
} | {
    formFields: FormFieldState[];
    status: FORM_BASE_STATUS.GENERAL_ERROR;
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
    status: FORM_BASE_API_RESPONSE.OK;
    user?: User;
} | {
    status: FORM_BASE_API_RESPONSE.GENERAL_ERROR;
    message: string;
} | {
    status: FORM_BASE_API_RESPONSE.FIELD_ERROR;
    formFields: FormFieldError[];
};
export declare type SignUpAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<SignUpAPIResponse>;
export declare type SignInAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<SignInAPIResponse>;
export declare type VerifyEmailAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<VerifyEmailAPIResponse>;
export declare type SendVerifyEmailAPI = (headers: HeadersInit) => Promise<SendVerifyEmailAPIResponse>;
export declare type EmailExistsAPI = (value: string, headers: HeadersInit) => Promise<EmailExistsAPIResponse>;
export declare type EnterEmailAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<EnterEmailAPIResponse>;
export declare type SubmitNewPasswordAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<SubmitNewPasswordAPIResponse>;
declare global {
    interface Document {
        documentMode?: any;
    }
}
export {};
