/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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
    Styles
} from "../../types";
import { RefObject } from "react";
import NormalisedURLPath from "../../normalisedURLPath";
import {
    API_RESPONSE_STATUS,
    EMAIL_VERIFICATION_MODE,
    ENTER_EMAIL_STATUS,
    FORM_BASE_API_RESPONSE,
    FORM_BASE_STATUS,
    EMAIL_PASSWORD_PRE_API_HOOK_ACTION,
    SEND_VERIFY_EMAIL_STATUS,
    SIGN_IN_AND_UP_STATUS,
    SUBMIT_NEW_PASSWORD_STATUS,
    VERIFY_EMAIL_LINK_CLICKED_STATUS,
    EMAIL_PASSWORD_AUTH_STATE,
    EMAIL_PASSWORD_WITHOUT_USER_SUCCESS_ACTION,
    EMAIL_PASSWORD_WITH_USER_SUCCESS_ACTION,
    EMAIL_PASSWORD_REDIRECTION_URL_ACTION
} from "./constants";
import { History, LocationState } from "history";
import EmailPassword from "./emailPassword";

/*
 * EmailPassword User InputsConfig Types.
 */

export type EmailPasswordHooks = {
    /*
     * Optional pre API Hook.
     */
    preAPIHook?: (context: EmailPasswordPreAPIHookContext) => Promise<RequestInit>;

    /*
     * Optional method used for redirections.
     */
    getRedirectionURL?: (context: EmailPasswordGetRedirectionURLContext) => Promise<string | undefined>;

    /*
     * Optional method used for handling event success.
     */
    onHandleEvent?: (context: EmailPasswordOnHandleEventContext) => void;
};

export type EmailPasswordUserInput = EmailPasswordHooks & {
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
    mode?: "OFF" | "REQUIRED";

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
export type FeatureBaseProps = {
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
    history?: History<LocationState>;
};

type ThemeBaseProps = {
    /*
     * Custom styling from user.
     */
    styleFromInit?: Styles;

    /*
     * Called on successful state.
     */
    onSuccess: () => void;
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
    forgotPasswordClick: () => void;

    /*
     * Call Sign In API.
     */
    signInAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
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
    signUpAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
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

export type EnterEmailAPIResponse = BaseResetPasswordAPIResponse;

export type SubmitNewPasswordAPIResponse =
    | BaseResetPasswordAPIResponse
    | {
          /*
           * Wrong credentials error.
           */
          status: API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR;
      };

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
    status: keyof typeof VERIFY_EMAIL_LINK_CLICKED_STATUS;
};

export type EmailPasswordWithoutUserSuccessAction = typeof EMAIL_PASSWORD_WITHOUT_USER_SUCCESS_ACTION[keyof typeof EMAIL_PASSWORD_WITHOUT_USER_SUCCESS_ACTION];
export type EmailPasswordWithUserSuccessAction = typeof EMAIL_PASSWORD_WITH_USER_SUCCESS_ACTION[keyof typeof EMAIL_PASSWORD_WITH_USER_SUCCESS_ACTION];
export type EmailPasswordRedirectionUrlAction = typeof EMAIL_PASSWORD_REDIRECTION_URL_ACTION[keyof typeof EMAIL_PASSWORD_REDIRECTION_URL_ACTION];
export type EmailPasswordPreAPIHookAction = typeof EMAIL_PASSWORD_PRE_API_HOOK_ACTION[keyof typeof EMAIL_PASSWORD_PRE_API_HOOK_ACTION];

export type EmailPasswordPreAPIHookContext = {
    /*
     * Pre API Hook action.
     */
    action: EmailPasswordPreAPIHookAction;

    /*
     * Request object containing query params, body, headers.
     */
    requestInit: RequestInit;
};

export type EmailPasswordGetRedirectionURLContext = {
    /*
     * Get Redirection URL Context
     */
    action: EmailPasswordRedirectionUrlAction;
};

export type EmailPasswordOnHandleEventContext =
    | {
          /*
           * On Handle Event actions
           */
          action: EmailPasswordWithoutUserSuccessAction;
      }
    | {
          /*
           * Sign In / Sign Up success.
           */
          action: EmailPasswordWithUserSuccessAction;
          /*
           * User returned from API.
           */
          user: { id: string; email: string };
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
    enterEmailAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
};

export type SubmitNewPasswordThemeProps = FormThemeBaseProps & {
    /*
     * Call Submit New Password API.
     */
    submitNewPasswordAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;

    /*
     * Click on Sign In button after reset password form.
     */
    onSignInClicked: () => void;
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
    sendVerifyEmailAPI: () => Promise<SendVerifyEmailThemeResponse>;

    /*
     * Method called when Sign Out button is clicked. Default to SuperTokens Session Sign Out.
     */
    signOut: () => Promise<void>;

    /*
     * Method called when "resend email" clicked results in email already verified response.
     */
    onEmailAlreadyVerified: () => Promise<void>;
};

export type VerifyEmailLinkClickedThemeProps = ThemeBaseProps & {
    /*
     * Call Verify Email API.
     */
    verifyEmailAPI: () => Promise<VerifyEmailThemeResponse>;

    /*
     * Redirect to verify Email Screen on invalid token.
     */
    onTokenInvalidRedirect: () => Promise<void>;

    /*
     * On email verification success, action when "Continue" button is clicked.
     */
    onContinueClicked: () => Promise<void>;
};

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
      };

export type EnterEmailThemeState = {
    /*
     * Enter Email Status
     */
    status: keyof typeof ENTER_EMAIL_STATUS;
};

export type SubmitNewPasswordThemeState = {
    /*
     * Enter Email Status
     */
    status: keyof typeof SUBMIT_NEW_PASSWORD_STATUS;
};

export type SendVerifyEmailThemeState = {
    /*
     * Status.
     */
    status: keyof typeof SEND_VERIFY_EMAIL_STATUS;
};

export type VerifyEmailLinkClickedThemeState = {
    /*
     * Verify Email Link clicked Status.
     */
    status: keyof typeof VERIFY_EMAIL_LINK_CLICKED_STATUS;
};

export type EmailPasswordAuthState = {
    /*
     * EmailPassword Auth Status
     */
    status: EMAIL_PASSWORD_AUTH_STATE.LOADING | EMAIL_PASSWORD_AUTH_STATE.READY;
};

export type PaletteUserInput = Record<string, string>;

export type FormBaseState =
    | {
          formFields: FormFieldState[];
          status:
              | FORM_BASE_STATUS.IN_PROGRESS
              | FORM_BASE_STATUS.READY
              | FORM_BASE_STATUS.LOADING
              | FORM_BASE_STATUS.FIELD_ERRORS
              | FORM_BASE_STATUS.SUCCESS;
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

    callAPI: (fields: APIFormField[]) => Promise<FormBaseAPIResponse>;
};

export type FormBaseAPIResponse =
    | {
          /*
           * Success.
           */
          status: FORM_BASE_API_RESPONSE.OK;

          /*
           * User object.
           */
          user?: User;
      }
    | {
          /*
           * General Errors.
           */
          status: FORM_BASE_API_RESPONSE.GENERAL_ERROR;

          /*
           * Error message.
           */
          message: string;
      }
    | {
          /*
           * Field validation errors.
           */
          status: FORM_BASE_API_RESPONSE.FIELD_ERROR;

          /*
           * Array of Field Id and their corresponding error.
           */
          formFields: FormFieldError[];
      };

/*
 *  Add documentMode to document object in order to use to detect if browser is IE.
 */
declare global {
    interface Document {
        documentMode?: any;
    }
}
