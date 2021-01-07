import { APIFormField, FeatureBaseConfig, FormField, FormFieldBaseConfig, NormalisedBaseConfig, NormalisedFormField, RecipeModuleConfig, RequestJson, Styles } from "../../types";
import { CSSObject } from "@emotion/react/types/index";
import { RefObject } from "react";
import NormalisedURLPath from "../../normalisedURLPath";
import { API_RESPONSE_STATUS, EMAIL_PASSWORD_AUTH, EMAIL_VERIFICATION_MODE, FORM_BASE_STATUS, SEND_VERIFY_EMAIL_STATUS, SIGN_IN_AND_UP_STATUS, SUCCESS_ACTION, VERIFY_EMAIL_LINK_CLICKED_STATUS } from "./constants";
import { History } from "history";
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
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    emailVerificationFeature: NormalisedEmailVerificationFeatureConfig;
};
export declare type SignInAndUpFeatureUserInput = {
    disableDefaultImplementation?: boolean;
    defaultToSignUp?: boolean;
    onSuccessRedirectURL?: string;
    signUpForm?: SignUpFormFeatureUserInput;
    signInForm?: SignInFormFeatureUserInput;
};
export declare type NormalisedSignInAndUpFeatureConfig = {
    disableDefaultImplementation: boolean;
    defaultToSignUp: boolean;
    onSuccessRedirectURL: string;
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
    onSuccessRedirectURL?: string;
    submitNewPasswordForm?: FeatureBaseConfig;
    enterEmailForm?: FeatureBaseConfig;
};
export declare type NormalisedResetPasswordUsingTokenFeatureConfig = {
    disableDefaultImplementation: boolean;
    onSuccessRedirectURL: string;
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
export declare type BaseProps = {
    __internal?: {
        instance: EmailPassword;
    };
    children?: JSX.Element;
    history?: History;
};
export declare type SignInAndUpProps = BaseProps & {
    onHandleForgotPasswordClicked?: () => Promise<boolean>;
    doesSessionExist?: () => Promise<boolean>;
    onHandleSuccess?: (context: OnHandleSignInAndUpSuccessContext) => Promise<boolean>;
    onCallSignUpAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<SignUpAPIResponse>;
    onCallSignInAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<SignInAPIResponse>;
    onCallEmailExistsAPI?: (value: string, headers: HeadersInit) => Promise<EmailExistsAPIResponse>;
};
export declare type ResetPasswordUsingTokenProps = BaseProps & {
    onHandleSuccess(context: onHandleResetPasswordUsingTokenSuccessContext): Promise<boolean>;
    onCallSubmitNewPasswordAPI(requestJson: RequestJson, headers: HeadersInit): Promise<SubmitNewPasswordAPIResponse>;
    onCallSendResetEmailAPI(requestJson: RequestJson, headers: HeadersInit): Promise<EnterEmailAPIResponse>;
};
export declare type onHandleResetPasswordUsingTokenSuccessContext = {
    action: SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT | SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL;
};
export declare type EmailPasswordAuthProps = BaseProps & {
    onCallIsEmailVerifiedAPI?: (headers: HeadersInit) => Promise<IsEmailVerifiedAPIResponse>;
    doesSessionExist?: () => Promise<boolean>;
    onHandleShowEmailVerificationScreen?: () => Promise<boolean>;
};
export declare type EmailPasswordAuthState = {
    status: EMAIL_PASSWORD_AUTH.LOADING | EMAIL_PASSWORD_AUTH.READY;
};
export declare type EmailVerificationProps = BaseProps & {
    doesSessionExist?: () => Promise<boolean>;
    onCallVerifyEmailAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<VerifyEmailAPIResponse>;
    onCallSendVerifyEmailAPI?: (headers: HeadersInit) => Promise<SendVerificationEmailAPIResponse>;
    onHandleSuccess?: (context: onHandleEmailVerificationSuccessContext) => Promise<boolean>;
    signOut?: () => Promise<SignOutAPIResponse>;
};
export declare type onHandleEmailVerificationSuccessContext = {
    action: SUCCESS_ACTION.EMAIL_VERIFIED_SUCCESSFUL | SUCCESS_ACTION.VERIFY_EMAIL_SENT;
};
declare type ThemeBaseProps = {
    styleFromInit?: Styles;
    onSuccess?: () => void;
};
declare type FormThemeBaseProps = ThemeBaseProps & {
    formFields: FormFieldThemeProps[];
};
export declare type SignInThemeProps = FormThemeBaseProps & {
    signUpClicked?: () => void;
    forgotPasswordClick?: () => void;
    resetPasswordURL?: NormalisedURLPath;
    callAPI: (fields: APIFormField[]) => Promise<SignInThemeResponse>;
};
export declare type SignUpThemeProps = FormThemeBaseProps & {
    signInClicked?: () => void;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    callAPI: (fields: APIFormField[]) => Promise<SignUpThemeResponse>;
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
    status: API_RESPONSE_STATUS.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR | API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR;
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
export declare type SubmitNewPasswordThemeResponse = SubmitNewPasswordAPIResponse | ThemeResponseGeneralError;
export declare type SendVerifyEmailAPIResponse = BaseResetPasswordAPIResponse;
export declare type SendVerifyEmailThemeResponse = SendVerifyEmailAPIResponse | ThemeResponseGeneralError;
export declare type VerifyEmailThemeResponse = {
    status: verifyEmailLinkClickedStatus;
};
export declare type OnHandleSignInAndUpSuccessContext = {
    action: SUCCESS_ACTION.SESSION_ALREADY_EXISTS;
} | {
    action: SUCCESS_ACTION.SIGN_IN_COMPLETE | SUCCESS_ACTION.SIGN_UP_COMPLETE;
    user: {
        id: string;
        email: string;
    };
    responseJson: any;
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
    callAPI: (fields: APIFormField[]) => Promise<EnterEmailThemeResponse>;
};
export declare type SubmitNewPasswordThemeProps = FormThemeBaseProps & {
    callAPI: (fields: APIFormField[]) => Promise<SubmitNewPasswordThemeResponse>;
    onSignInClicked: () => void;
};
export declare type EnterEmailThemeState = {
    emailSent?: boolean;
};
export declare type SubmitNewPasswordThemeState = {
    hasNewPassword?: boolean;
};
export declare type EmailVerificationThemeProps = {
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;
    verifyEmailLinkClickedScreen: VerifyEmailLinkClickedThemeProps;
    hasToken: boolean;
};
export declare type SendVerifyEmailThemeProps = ThemeBaseProps & {
    callAPI: () => Promise<SendVerifyEmailThemeResponse>;
    signOut: () => Promise<void>;
};
export declare type SendVerifyEmailThemeState = {
    status: SEND_VERIFY_EMAIL_STATUS.READY | SEND_VERIFY_EMAIL_STATUS.SUCCESS | SEND_VERIFY_EMAIL_STATUS.ERROR;
};
export declare type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    callAPI: () => Promise<VerifyEmailThemeResponse>;
    redirectToVerifyEmailScreen: () => Promise<void>;
    onContinueClicked: () => Promise<void>;
};
export declare type VerifyEmailLinkClickedThemeState = VerifyEmailThemeResponse;
declare type verifyEmailLinkClickedStatus = VERIFY_EMAIL_LINK_CLICKED_STATUS.LOADING | VERIFY_EMAIL_LINK_CLICKED_STATUS.INVALID | VERIFY_EMAIL_LINK_CLICKED_STATUS.GENERAL_ERROR | VERIFY_EMAIL_LINK_CLICKED_STATUS.SUCCESSFUL | VERIFY_EMAIL_LINK_CLICKED_STATUS.ALREADY_VERIFIED;
export declare type SignInAndUpState = {
    status: SIGN_IN_AND_UP_STATUS.LOADING;
} | {
    status: SIGN_IN_AND_UP_STATUS.READY;
} | {
    status: SIGN_IN_AND_UP_STATUS.SUCCESSFUL;
    user: User;
    responseJson: any;
};
export declare type PaletteUserInput = Record<string, string>;
export declare type DefaultStylesUserInput = Record<string, CSSObject>;
export declare type FormBaseStatus = FORM_BASE_STATUS.IN_PROGRESS | FORM_BASE_STATUS.READY | FORM_BASE_STATUS.LOADING | FORM_BASE_STATUS.FIELD_ERRORS | FORM_BASE_STATUS.SUCCESS;
export declare type FormBaseState = {
    formFields: FormFieldState[];
    status: FormBaseStatus;
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
    callAPI: (fields: APIFormField[]) => Promise<SignInThemeResponse | SignUpThemeResponse | SubmitNewPasswordThemeResponse | EnterEmailThemeResponse>;
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
