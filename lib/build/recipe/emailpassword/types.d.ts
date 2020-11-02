import { APIFormField, FeatureBaseConfig, FormField, FormFieldBaseConfig, NormalisedBaseConfig, NormalisedFormField, RecipeModuleConfig, RequestJson } from "../../types";
import EmailPassword from "./emailPassword";
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { RefObject } from "react";
import NormalisedURLPath from "../../normalisedURLPath";
import { API_RESPONSE_STATUS, SUCCESS_ACTION } from "./constants";
export declare type EmailPasswordUserInput = {
    palette?: PaletteUserInput;
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
};
export declare type EmailPasswordConfig = RecipeModuleConfig & EmailPasswordUserInput;
export declare type NormalisedEmailPasswordConfig = {
    palette: NormalisedPalette;
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
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
export declare type ResetPasswordUsingTokenUserInput = {
    disableDefaultImplementation?: boolean;
    onSuccessRedirectURL?: string;
    submitNewPasswordForm?: FeatureBaseConfig;
    enterEmailForm?: FeatureBaseConfig;
};
export declare type NormalisedResetPasswordUsingTokenFeatureConfig = {
    disableDefaultImplementation: boolean;
    onSuccessRedirectURL: NormalisedURLPath;
    submitNewPasswordForm: NormalisedSubmitNewPasswordForm;
    enterEmailForm: NormalisedEnterEmailForm;
};
export declare type NormalisedSubmitNewPasswordForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};
export declare type NormalisedEnterEmailForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};
export declare type BaseProps = {
    __internal?: {
        instance: EmailPassword;
    };
    children?: JSX.Element;
};
export declare type SignInAndUpProps = BaseProps & {
    onHandleForgotPasswordClicked?: () => Promise<boolean>;
    doesSessionExist?: () => Promise<boolean>;
    onHandleSuccess?: (context: onHandleSignInAndUpSuccessContext) => Promise<boolean>;
    onCallSignUpAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    onCallSignInAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
};
export declare type ResetPasswordUsingTokenProps = BaseProps & {
    onHandleSuccess(context: {
        action: SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT | SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL;
    }): Promise<boolean>;
    onCallSubmitNewPasswordAPI(requestJson: RequestJson, headers: HeadersInit): Promise<any>;
    onCallEnterEmailAPI(requestJson: RequestJson, headers: HeadersInit): Promise<any>;
};
export declare type onHandleResetPasswordUsingTokenSuccessContext = {
    action: SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT | SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL;
};
declare type ThemeBaseProps = {
    styleFromInit?: {
        [key: string]: CSSInterpolation;
    };
    formFields: FormFieldThemeProps[];
    defaultStyles: NormalisedDefaultStyles;
    palette: NormalisedPalette;
    onSuccess?: () => void;
};
export declare type SignInThemeProps = ThemeBaseProps & {
    signUpClicked?: () => void;
    forgotPasswordClick?: () => void;
    resetPasswordURL?: NormalisedURLPath;
    callAPI: (fields: APIFormField[]) => Promise<SignInThemeResponse>;
};
export declare type SignUpThemeProps = ThemeBaseProps & {
    signInClicked?: () => void;
    privacyPolicyLink?: string;
    termsAndConditionsLink?: string;
    callAPI: (fields: APIFormField[]) => Promise<SignUpThemeResponse>;
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
export declare type BaseResponse = {
    status: API_RESPONSE_STATUS.OK;
} | {
    status: API_RESPONSE_STATUS.GENERAL_ERROR;
    message: string;
} | {
    status: API_RESPONSE_STATUS.FIELD_ERROR;
    fields: FormFieldError[];
};
export declare type SignUpThemeResponse = BaseResponse;
export declare type SignInThemeResponse = BaseResponse | {
    status: API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR;
    message: string;
};
export declare type EnterEmailThemeResponse = BaseResponse;
export declare type SubmitNewPasswordThemeResponse = BaseResponse | {
    status: API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR;
};
export declare type onHandleSignInAndUpSuccessContext = {
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
    enterEmail: EnterEmailThemeProps;
    submitNewPassword: SubmitNewPasswordThemeProps;
    hasToken: boolean;
};
export declare type EnterEmailThemeProps = ThemeBaseProps & {
    callAPI: (fields: APIFormField[]) => Promise<EnterEmailThemeResponse>;
};
export declare type SubmitNewPasswordThemeProps = ThemeBaseProps & {
    callAPI: (fields: APIFormField[]) => Promise<SubmitNewPasswordThemeResponse>;
    onSignInClicked: () => void;
};
export declare type FormFieldState = FormFieldThemeProps & {
    validated: boolean;
    ref: RefObject<HTMLInputElement>;
    showIsRequired?: boolean;
};
declare enum paletteColorOptions {
    BACKGROUND = "background",
    INPUTBACKGROUND = "inputBackground",
    PRIMARY = "primary",
    ERROR = "error",
    TEXTTITLE = "textTitle",
    TEXTPRIMARY = "textPrimary",
    TEXTSECONDARY = "textSecondary",
    TEXTLINK = "textLink"
}
export declare type PaletteUserInput = {
    colors?: {
        [key in paletteColorOptions]: string;
    };
};
export declare type NormalisedPalette = {
    colors: {
        [key in paletteColorOptions]: string;
    };
    fonts: {
        size: string[];
    };
};
declare enum defaultStylesOptions {
    ROOT = "root",
    CONTAINER = "container",
    ROW = "row",
    GENERALERROR = "generalError",
    INPUTWRAPPER = "inputWrapper",
    INPUT = "input",
    INPUTERROR = "inputError",
    INPUTADORNMENT = "inputAdornment",
    INPUTERRORMESSAGE = "inputErrorMessage",
    BUTTON = "button",
    LABEL = "label",
    FORMROW = "formRow",
    PRIMARYTEXT = "primaryText",
    SECONDARYTEXT = "secondaryText",
    LINK = "link",
    DIVIDER = "divider"
}
export declare type DefaultStylesUserInput = {
    [key in defaultStylesOptions]?: CSSInterpolation;
};
export declare type NormalisedDefaultStyles = {
    [key in defaultStylesOptions]: CSSInterpolation;
};
export declare type FormBaseState = {
    formFields: FormFieldState[];
    generalError: string | undefined;
    isLoading: boolean;
};
export declare type FormBaseProps = {
    header?: JSX.Element;
    footer?: JSX.Element;
    formFields: FormFieldState[];
    showLabels: boolean;
    buttonLabel: string;
    onSuccess?: () => void;
    callAPI: (fields: APIFormField[]) => Promise<SignInThemeResponse | SignUpThemeResponse | SubmitNewPasswordThemeResponse | EnterEmailThemeResponse>;
    defaultStyles: NormalisedDefaultStyles;
    palette: NormalisedPalette;
    styleFromInit?: {
        [key: string]: CSSInterpolation;
    };
};
export {};
