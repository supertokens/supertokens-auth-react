/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import {
    APIFormField,
    FeatureBaseConfig,
    FormField,
    FormFieldBaseConfig,
    NormalisedBaseConfig,
    NormalisedFormField,
    RecipeModuleConfig,
    RequestJson,
    Styles
} from "../../types";
import { CSSObject } from "@emotion/react/types/index";
import { RefObject } from "react";
import NormalisedURLPath from "../../normalisedURLPath";
import {
    API_RESPONSE_STATUS,
    EMAIL_PASSWORD_AUTH,
    EMAIL_VERIFICATION_MODE,
    FORM_BASE_STATUS,
    SEND_VERIFY_EMAIL_STATUS,
    SIGN_IN_AND_UP_STATUS,
    SUCCESS_ACTION,
    VERIFY_EMAIL_LINK_CLICKED_STATUS
} from "./constants";
import { History } from "history";
import EmailPassword from "./emailPassword";

/*
 * EmailPassword User InputsConfig Types.
 */

export type EmailPasswordUserInput = {
    /*
     * Styling palette.
     */
    palette?: PaletteUserInput;

    /*
     * Use shadow Dom root.
     */
    useShadowDom?: boolean;

    /*
     * Sign In and Sign Up feature.
     */
    signInAndUpFeature?: SignInAndUpFeatureUserInput;

    /*
     * Reset password Using Token feature.
     */
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;

    /*
     * Email Verification feature.
     */
    emailVerificationFeature?: EmailVerificationUserInput;
};

export type EmailPasswordConfig = RecipeModuleConfig & EmailPasswordUserInput;

export type NormalisedEmailPasswordConfig = {
    /*
     * Styling palette.
     */
    palette: PaletteUserInput;

    /*
     * Use shadow Dom root.
     */
    useShadowDom: boolean;

    /*
     * Sign In and Sign Up feature.
     */
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;

    /*
     * Reset password Using Token feature.
     */
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;

    /*
     * Email Verification feature.
     */
    emailVerificationFeature: NormalisedEmailVerificationFeatureConfig;
};

export type SignInAndUpFeatureUserInput = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation?: boolean;

    /*
     * Should default to Sign up form.
     */
    defaultToSignUp?: boolean;

    /*
     * URL to redirect to in case disableDefaultImplemention is true
     */
    onSuccessRedirectURL?: string;

    /*
     * SignUp form config.
     */

    signUpForm?: SignUpFormFeatureUserInput;

    /*
     * SignIn form config.
     */

    signInForm?: SignInFormFeatureUserInput;
};

export type NormalisedSignInAndUpFeatureConfig = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation: boolean;

    /*
     * Default to sign up form.
     */
    defaultToSignUp: boolean;

    /*
     * URL to redirect to in case disableDefaultImplemention is true
     */
    onSuccessRedirectURL: string;

    /*
     * SignUp form config.
     */
    signUpForm: NormalisedSignUpFormFeatureConfig;

    /*
     * SignIn form config.
     */
    signInForm: NormalisedSignInFormFeatureConfig;
};

export type SignUpFormFeatureUserInput = FeatureBaseConfig & {
    /*
     * Form fields for SignUp.
     */
    formFields?: FormFieldSignUpConfig[];

    /*
     * Privacy policy link for sign up form.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link for sign up form.
     */
    termsOfServiceLink?: string;
};

export type NormalisedSignUpFormFeatureConfig = NormalisedBaseConfig & {
    /*
     * Normalised form fields for SignUp.
     */
    formFields: NormalisedFormField[];

    /*
     * Privacy policy link for sign up form.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link for sign up form.
     */
    termsOfServiceLink?: string;
};

export type SignInFormFeatureUserInput = FeatureBaseConfig & {
    /*
     * Form fields for SignIn.
     */
    formFields?: FormFieldSignInConfig[];

    /*
     * Link to the reset password URL in case disableDefaultImplemention is true.
     */
    resetPasswordURL?: string;
};

export type NormalisedSignInFormFeatureConfig = NormalisedBaseConfig & {
    /*
     * Normalised form fields for SignIn.
     */
    formFields: NormalisedFormField[];

    /*
     * Link to the reset password URL in case disableDefaultImplemention is true.
     */
    resetPasswordURL: NormalisedURLPath;
};

export type FormFieldSignInConfig = FormFieldBaseConfig;

export type FormFieldSignUpConfig = FormField;

export type ResetPasswordUsingTokenUserInput = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation?: boolean;

    /*
     * URL to redirect to in case disableDefaultImplemention is true
     */
    onSuccessRedirectURL?: string;

    /*
     * submitNewPasswordForm config.
     */
    submitNewPasswordForm?: FeatureBaseConfig;

    /*
     * enterEmailForm config.
     */
    enterEmailForm?: FeatureBaseConfig;
};

export type NormalisedResetPasswordUsingTokenFeatureConfig = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation: boolean;

    /*
     * URL to redirect to in case disableDefaultImplemention is true
     */
    onSuccessRedirectURL: string;

    /*
     * Normalised submitNewPasswordForm config.
     */
    submitNewPasswordForm: NormalisedSubmitNewPasswordForm;

    /*
     * Normalised enterEmailForm config.
     */
    enterEmailForm: NormalisedEnterEmailForm;
};

export type NormalisedSubmitNewPasswordForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};

export type NormalisedEnterEmailForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};

export type EmailVerificationUserInput = {
    /*
     * Email Verification Mode
     */
    mode?: EmailVerificationMode;

    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation?: boolean;

    /*
     * sendVerifyEmailScreen config.
     */
    sendVerifyEmailScreen?: FeatureBaseConfig;

    /*
     * verifyEmailLinkClickedScreen config.
     */
    verifyEmailLinkClickedScreen?: FeatureBaseConfig;
};

export type NormalisedEmailVerificationFeatureConfig = {
    /*
     * Email Verification Mode
     */
    mode: EmailVerificationMode;

    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation: boolean;

    /*
     * Normalised sendVerifyEmailScreen config.
     */
    sendVerifyEmailScreen: FeatureBaseConfig;

    /*
     * Normalised verifyEmailLinkClickedScreen config.
     */
    verifyEmailLinkClickedScreen: FeatureBaseConfig;
};

export type EmailVerificationMode = EMAIL_VERIFICATION_MODE.OFF | EMAIL_VERIFICATION_MODE.REQUIRED;

/*
 * Props Types.
 */
export type BaseProps = {
    /*
     * Internal props provided by
     */
    __internal?: { instance: EmailPassword };

    /*
     * Children element
     */
    children?: JSX.Element;

    /*
     * History provided by react-router
     */
    history?: History;
};

export type SignInAndUpProps = BaseProps & {
    /*
     * Optional method called when forgot password is clicked.
     * Return true if handled properly.
     * Return false for default behaviour.
     */
    onHandleForgotPasswordClicked?: () => Promise<boolean>;

    /*
     * Optional method called to overwrite verify if session exists.
     */
    doesSessionExist?: () => Promise<boolean>;

    /*
     * Optional method called on successful Sign-up/Sign-in
     */
    onHandleSuccess?: (context: OnHandleSignInAndUpSuccessContext) => Promise<boolean>;

    /*
     * Optional method to overwrite Sign Up API call.
     */
    onCallSignUpAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<SignUpAPIResponse>;

    /*
     * Optional method to overwrite Sign In API call.
     */
    onCallSignInAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<SignInAPIResponse>;

    /*
     * Optional method to overwrite Email Exists API call.
     */
    onCallEmailExistsAPI?: (value: string, headers: HeadersInit) => Promise<EmailExistsAPIResponse>;
};

export type ResetPasswordUsingTokenProps = BaseProps & {
    /*
     * Optional method called on successful Reset Password/Send Reset password email
     */
    onHandleSuccess(context: onHandleResetPasswordUsingTokenSuccessContext): Promise<boolean>;

    /*
     * Optional method to overwrite Submit New Password API call.
     */
    onCallSubmitNewPasswordAPI(requestJson: RequestJson, headers: HeadersInit): Promise<SubmitNewPasswordAPIResponse>;

    /*
     * Optional method to overwrite Send Reset Email API call.
     */
    onCallSendResetEmailAPI(requestJson: RequestJson, headers: HeadersInit): Promise<EnterEmailAPIResponse>;
};

export type onHandleResetPasswordUsingTokenSuccessContext = {
    action: SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT | SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL;
};

export type EmailPasswordAuthProps = BaseProps & {
    /*
     * Optional method to overwrite Is Email Verified API call.
     */
    onCallIsEmailVerifiedAPI?: (headers: HeadersInit) => Promise<IsEmailVerifiedAPIResponse>;

    /*
     * Optional method called to overwrite verify if session exists.
     */
    doesSessionExist?: () => Promise<boolean>;

    /*
     * Optional method called when Email is not verified and Email verification mode is "REQUIRED"
     * Return true if handled properly.
     * Return false for default behaviour.
     */
    onHandleShowEmailVerificationScreen?: () => Promise<boolean>;
};

export type EmailPasswordAuthState = {
    /*
     * EmailPassword Auth Status
     */
    status: EMAIL_PASSWORD_AUTH.LOADING | EMAIL_PASSWORD_AUTH.READY;
};

export type EmailVerificationProps = BaseProps & {
    /*
     * Optional method called to overwrite verify if session exists.
     */
    doesSessionExist?: () => Promise<boolean>;

    /*
     * Optional method to overwrite Verify Email API call.
     */
    onCallVerifyEmailAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<VerifyEmailAPIResponse>;

    /*
     * Optional method to overwrite call to send verification Email API call.
     */
    onCallSendVerifyEmailAPI?: (headers: HeadersInit) => Promise<SendVerificationEmailAPIResponse>;

    /*
     * Optional method called on successful email address verification / send email for email address verification.
     */
    onHandleSuccess?: (context: onHandleEmailVerificationSuccessContext) => Promise<boolean>;

    /*
     * Optional method called when Sign Out button is clicked. Default to SuperTokens Session Sign Out.
     */
    signOut?: () => Promise<SignOutAPIResponse>;
};

export type onHandleEmailVerificationSuccessContext = {
    action: SUCCESS_ACTION.EMAIL_VERIFIED_SUCCESSFUL | SUCCESS_ACTION.VERIFY_EMAIL_SENT;
};

type ThemeBaseProps = {
    /*
     * Custom styling from user.
     */
    styleFromInit?: Styles;

    /*
     * Called on successful signin/signup/resetpassword.
     */
    onSuccess?: () => void;
};

type FormThemeBaseProps = ThemeBaseProps & {
    /*
     * Form fields to use in the signin form.
     */
    formFields: FormFieldThemeProps[];
};

export type SignInThemeProps = FormThemeBaseProps & {
    /*
     * Callback called when Sign Up link is clicked.
     */
    signUpClicked?: () => void;

    /*
     * Callback called when Forgot password link is clicked.
     */
    forgotPasswordClick?: () => void;

    /*
     * Reset password URL for forgot password button.
     */
    resetPasswordURL?: NormalisedURLPath;

    /*
     * Call Sign In API.
     */
    callAPI: (fields: APIFormField[]) => Promise<SignInThemeResponse>;
};

export type SignUpThemeProps = FormThemeBaseProps & {
    /*
     * Callback called when Sign In link is clicked.
     */
    signInClicked?: () => void;

    /*
     * Privacy policy link.
     */
    privacyPolicyLink?: string;

    /*
     * Terms and conditions link.
     */
    termsOfServiceLink?: string;

    /*
     * Call Sign Up API.
     */
    callAPI: (fields: APIFormField[]) => Promise<SignUpThemeResponse>;
};

export type SignInAndUpThemeProps = {
    /*
     * Should default to Sign up form.
     */
    defaultToSignUp: boolean;

    /*
     * Sign in form props.
     */
    signInForm: SignInThemeProps;

    /*
     * Sign up form props.
     */
    signUpForm: SignUpThemeProps;
};

export type NormalisedFormFieldWithError = NormalisedFormField & {
    /*
     * Error message to display to users.
     */
    error?: string;
};

export type FormFieldThemeProps = NormalisedFormFieldWithError & {
    /*
     * Show Is required (*) next to label
     */
    showIsRequired?: boolean;

    /*
     * Autocomplete
     */
    autoComplete?: string;
};

export type FormFieldState = FormFieldThemeProps & {
    /*
     * Has the value already been submitted to its validator.
     */
    validated: boolean;

    /*
     * Input
     */
    ref: RefObject<InputRef>;
};

export type InputRef = HTMLInputElement & {
    /*
     * Is the current input HTML Element focused.
     */
    isFocused?: boolean;
};

export type FormFieldError = {
    /*
     * Field id.
     */
    id: string;

    /*
     * Error message.
     */
    error: string;
};

type SuccessAPIResponse = {
    /*
     * Success.
     */
    status: API_RESPONSE_STATUS.OK;
};

export type SignOutAPIResponse = SuccessAPIResponse;

export type EmailExistsAPIResponse = SuccessAPIResponse & {
    /*
     * Is email already registered
     */
    exists: boolean;
};

export type IsEmailVerifiedAPIResponse = SuccessAPIResponse & {
    /*
     * Is email verified
     */
    isVerified: boolean;
};

export type VerifyEmailAPIResponse =
    | SuccessAPIResponse
    | {
          /*
           * Email verification invalid token error.
           */
          status: API_RESPONSE_STATUS.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR;
      };

export type SendVerificationEmailAPIResponse = SuccessAPIResponse;

export type FormFieldAPIResponse = {
    /*
     * Field validation errors.
     */
    status: API_RESPONSE_STATUS.FIELD_ERROR;

    /*
     * Array of Field Id and their corresponding error.
     */
    formFields: FormFieldError[];
};

export type BaseSignInUpAPIResponse =
    | {
          /*
           * Success.
           */
          status: API_RESPONSE_STATUS.OK;

          /*
           * User object.
           */
          user: User;
      }
    | FormFieldAPIResponse;

export type BaseResetPasswordAPIResponse =
    | {
          /*
           * Success.
           */
          status: API_RESPONSE_STATUS.OK;
      }
    | FormFieldAPIResponse;

export type ThemeResponseGeneralError = {
    /*
     * General error.
     */
    status: API_RESPONSE_STATUS.GENERAL_ERROR;

    /*
     * General error message.
     */
    message: string;
};

export type SignUpAPIResponse = BaseSignInUpAPIResponse;

export type SignUpThemeResponse = SignUpAPIResponse | ThemeResponseGeneralError;

export type SignInAPIResponse =
    | BaseSignInUpAPIResponse
    | {
          /*
           * Wrong credentials error.
           */
          status: API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR;

          /*
           * Wrong credentials error message.
           */
          message: string;
      };

export type SignInThemeResponse = SignInAPIResponse | ThemeResponseGeneralError;

export type EnterEmailAPIResponse = BaseResetPasswordAPIResponse;
export type EnterEmailThemeResponse = EnterEmailAPIResponse | ThemeResponseGeneralError;

export type SubmitNewPasswordAPIResponse =
    | BaseResetPasswordAPIResponse
    | {
          /*
           * Wrong credentials error.
           */
          status: API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR;
      };

export type SubmitNewPasswordThemeResponse = SubmitNewPasswordAPIResponse | ThemeResponseGeneralError;

export type SendVerifyEmailAPIResponse = {
    /*
     * Success.
     */
    status: API_RESPONSE_STATUS.OK | API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR;
};
export type SendVerifyEmailThemeResponse = SendVerifyEmailAPIResponse | ThemeResponseGeneralError;

export type VerifyEmailThemeResponse = {
    /*
     * Verify Email Link clicked Theme Status.
     */
    status: verifyEmailLinkClickedStatus;
};
export type OnHandleSignInAndUpSuccessContext =
    | { action: SUCCESS_ACTION.SESSION_ALREADY_EXISTS }
    | {
          /*
           * Sign In / Sign Up success.
           */
          action: SUCCESS_ACTION.SIGN_IN_COMPLETE | SUCCESS_ACTION.SIGN_UP_COMPLETE;
          /*
           * User returned from API.
           */
          user: { id: string; email: string };

          /*
           * Response body from API.
           */
          responseJson: any;
      };

export type User = {
    /*
     * User id.
     */
    id: string;

    /*
     * User email.
     */
    email: string;
};

export type ResetPasswordUsingTokenThemeProps = {
    /*
     * Enter email form props.
     */
    enterEmailForm: EnterEmailThemeProps;

    /*
     * Submit new password form props.
     */
    submitNewPasswordForm: SubmitNewPasswordThemeProps;

    /*
     * A token is present in the query params or not.
     */
    hasToken: boolean;
};

export type EnterEmailThemeProps = FormThemeBaseProps & {
    /*
     * Call Enter Email API.
     */
    callAPI: (fields: APIFormField[]) => Promise<EnterEmailThemeResponse>;
};

export type SubmitNewPasswordThemeProps = FormThemeBaseProps & {
    /*
     * Call Submit New Password API.
     */
    callAPI: (fields: APIFormField[]) => Promise<SubmitNewPasswordThemeResponse>;

    /*
     * Click on Sign In button after reset password form.
     */
    onSignInClicked: () => void;
};

export type EnterEmailThemeState = {
    /*
     * Has the email been sent already.
     */
    emailSent?: boolean;
};

export type SubmitNewPasswordThemeState = {
    /*
     * Has new password been set successfully.
     */
    hasNewPassword?: boolean;
};

export type EmailVerificationThemeProps = {
    /*
     * Send Verification Email Screen Theme Props.
     */
    sendVerifyEmailScreen: SendVerifyEmailThemeProps;

    /*
     * Verify Email Link Clicked Screen Theme Props.
     */
    verifyEmailLinkClickedScreen: VerifyEmailLinkClickedThemeProps;

    /*
     * A token is present in the query params or not.
     */
    hasToken: boolean;
};

export type SendVerifyEmailThemeProps = ThemeBaseProps & {
    /*
     * Call Send Verify Email API.
     */
    callAPI: () => Promise<SendVerifyEmailThemeResponse>;

    /*
     * Method called when Sign Out button is clicked. Default to SuperTokens Session Sign Out.
     */
    signOut: () => Promise<void>;

    /*
     * Method called when "resend email" clicked results in email already verified response.
     */
    onEmailAlreadyVerified: () => Promise<void>;
};

export type SendVerifyEmailThemeState = {
    /*
     * Has the email been sent already.
     */
    status: SEND_VERIFY_EMAIL_STATUS.READY | SEND_VERIFY_EMAIL_STATUS.SUCCESS | SEND_VERIFY_EMAIL_STATUS.ERROR;
};

export type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    /*
     * Call Verify Email API.
     */
    callAPI: () => Promise<VerifyEmailThemeResponse>;

    /*
     * Redirect to verify Email Screen on invalid token.
     */
    redirectToVerifyEmailScreen: () => Promise<void>;

    /*
     * On email verification success, action when "Continue" button is clicked.
     */
    onContinueClicked: () => Promise<void>;
};

export type VerifyEmailLinkClickedThemeState = VerifyEmailThemeResponse;

type verifyEmailLinkClickedStatus =
    | VERIFY_EMAIL_LINK_CLICKED_STATUS.LOADING
    | VERIFY_EMAIL_LINK_CLICKED_STATUS.INVALID
    | VERIFY_EMAIL_LINK_CLICKED_STATUS.GENERAL_ERROR
    | VERIFY_EMAIL_LINK_CLICKED_STATUS.SUCCESSFUL;

export type SignInAndUpState =
    | {
          status: SIGN_IN_AND_UP_STATUS.LOADING;
      }
    | {
          status: SIGN_IN_AND_UP_STATUS.READY;
      }
    | {
          status: SIGN_IN_AND_UP_STATUS.SUCCESSFUL;
          user: User;
          responseJson: any;
      };

export type PaletteUserInput = Record<string, string>;

export type DefaultStylesUserInput = Record<string, CSSObject>;

export type FormBaseStatus =
    | FORM_BASE_STATUS.IN_PROGRESS
    | FORM_BASE_STATUS.READY
    | FORM_BASE_STATUS.LOADING
    | FORM_BASE_STATUS.FIELD_ERRORS
    | FORM_BASE_STATUS.SUCCESS;
export type FormBaseState =
    | {
          formFields: FormFieldState[];
          status: FormBaseStatus;
      }
    | {
          formFields: FormFieldState[];
          status: FORM_BASE_STATUS.GENERAL_ERROR;
          generalError: string;
      };

export type FormBaseProps = {
    header?: JSX.Element;

    footer?: JSX.Element;

    formFields: FormFieldThemeProps[];

    showLabels: boolean;

    buttonLabel: string;

    validateOnBlur?: boolean;

    onSuccess?: () => void;

    callAPI: (
        fields: APIFormField[]
    ) => Promise<SignInThemeResponse | SignUpThemeResponse | SubmitNewPasswordThemeResponse | EnterEmailThemeResponse>;
};

export type SignUpAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<SignUpAPIResponse>;

export type SignInAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<SignInAPIResponse>;

export type VerifyEmailAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<VerifyEmailAPIResponse>;

export type SendVerifyEmailAPI = (headers: HeadersInit) => Promise<SendVerifyEmailAPIResponse>;

export type EmailExistsAPI = (value: string, headers: HeadersInit) => Promise<EmailExistsAPIResponse>;

export type EnterEmailAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<EnterEmailAPIResponse>;

export type SubmitNewPasswordAPI = (
    requestJson: RequestJson,
    headers: HeadersInit
) => Promise<SubmitNewPasswordAPIResponse>;

/*
 *  Add documentMode to document object in order to use to detect if browser is IE.
 */
declare global {
    interface Document {
        documentMode?: any;
    }
}
