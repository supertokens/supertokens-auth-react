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
import EmailPassword from "./emailPassword";
import { CSSObject } from "@emotion/serialize/types/index";
import { RefObject } from "react";
import NormalisedURLPath from "../../normalisedURLPath";
import { API_RESPONSE_STATUS, SUCCESS_ACTION } from "./constants";
import { History } from "history";

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
     * Form fields for SignUp.
     */
    formFields?: FormFieldSignInConfig[];

    /*
     * Link to the reset password URL in case disableDefaultImplemention is true.
     */
    resetPasswordURL?: string;
};

export type NormalisedSignInFormFeatureConfig = NormalisedBaseConfig & {
    /*
     * Form fields for SignUp.
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
     * submitNewPasswordForm config.
     */
    submitNewPasswordForm: NormalisedSubmitNewPasswordForm;

    /*
     * enterEmailForm config.
     */
    enterEmailForm: NormalisedEnterEmailForm;
};

export type NormalisedSubmitNewPasswordForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};

export type NormalisedEnterEmailForm = FeatureBaseConfig & {
    formFields: NormalisedFormField[];
};

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
    onHandleForgotPasswordClicked?: () => Promise<boolean>;

    doesSessionExist?: () => Promise<boolean>;

    onHandleSuccess?: (context: OnHandleSignInAndUpSuccessContext) => Promise<boolean>;

    onCallSignUpAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<SignUpAPIResponse>;

    onCallSignInAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<SignInAPIResponse>;
};

export type ResetPasswordUsingTokenProps = BaseProps & {
    onHandleSuccess(context: {
        action: SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT | SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL;
    }): Promise<boolean>;

    onCallSubmitNewPasswordAPI(requestJson: RequestJson, headers: HeadersInit): Promise<SubmitNewPasswordAPIResponse>;

    onCallSendResetEmailAPI(requestJson: RequestJson, headers: HeadersInit): Promise<EnterEmailAPIResponse>;
};

export type onHandleResetPasswordUsingTokenSuccessContext = {
    action: SUCCESS_ACTION.RESET_PASSWORD_EMAIL_SENT | SUCCESS_ACTION.PASSWORD_RESET_SUCCESSFUL;
};

type ThemeBaseProps = {
    /*
     * Custom styling from user.
     */
    styleFromInit?: Styles;

    /*
     * Form fields to use in the signin form.
     */
    formFields: FormFieldThemeProps[];

    /*
     * Called on successful signin/signup/resetpassword.
     */
    onSuccess?: () => void;
};

export type SignInThemeProps = ThemeBaseProps & {
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

export type SignUpThemeProps = ThemeBaseProps & {
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

export type FormFieldThemeProps = NormalisedFormFieldWithError;

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
export type VerifyEmailAPIResponse = SuccessAPIResponse | FormFieldAPIResponse;

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

export type EnterEmailThemeProps = ThemeBaseProps & {
    /*
     * Call Sign In API.
     */
    callAPI: (fields: APIFormField[]) => Promise<EnterEmailThemeResponse>;
};

export type SubmitNewPasswordThemeProps = ThemeBaseProps & {
    /*
     * Call Sign In API.
     */
    callAPI: (fields: APIFormField[]) => Promise<SubmitNewPasswordThemeResponse>;

    /*
     * Click on Sign In button after reset password form.
     */
    onSignInClicked: () => void;
};

/*
 * State type.
 */

export type FormFieldState = FormFieldThemeProps & {
    /*
     * Has the value already been submitted to its validator.
     */
    ref: RefObject<HTMLInputElement>;

    /*
     * Has the value already been submitted to its validator.
     */
    showIsRequired?: boolean;

    /*
     * Autocomplete
     */
    autoComplete?: string;
};

export type EnterEmailThemeState = {
    /*
     * Has the email been sent already.
     */
    emailSent?: boolean;

    /*
     * Email FormField only.
     */
    formFields: FormFieldState[];
};

export type SubmitNewPasswordThemeState = {
    /*
     * Has new password been set successfully.
     */
    hasNewPassword?: boolean;

    /*
     * Password and new password FormFields.
     */
    formFields: FormFieldState[];
};

export enum SignInAndUpStateStatus {
    LOADING = "LOADING",
    READY = "READY",
    SUCCESSFUL = "SUCCESSFUL"
}

export type SignInAndUpState =
    | {
          status: SignInAndUpStateStatus.LOADING;
      }
    | {
          status: SignInAndUpStateStatus.READY;
      }
    | {
          status: SignInAndUpStateStatus.SUCCESSFUL;
          user: User;
          responseJson: any;
      };

export type PaletteUserInput = Record<string, string>;

export type DefaultStylesUserInput = Record<string, CSSObject>;

export type FormBaseStatus = "IN_PROGRESS" | "READY" | "LOADING" | "FIELD_ERRORS" | "SUCCESS";
export type FormBaseState =
    | {
          formFields: FormFieldState[];
          status: FormBaseStatus;
      }
    | {
          formFields: FormFieldState[];
          status: "GENERAL_ERROR";
          generalError: string;
      };

export type FormBaseProps = {
    header?: JSX.Element;

    footer?: JSX.Element;

    formFields: FormFieldState[];

    showLabels: boolean;

    buttonLabel: string;

    noValidateOnBlur?: boolean;

    onSuccess?: () => void;

    callAPI: (
        fields: APIFormField[]
    ) => Promise<SignInThemeResponse | SignUpThemeResponse | SubmitNewPasswordThemeResponse | EnterEmailThemeResponse>;
};

export type SignUpAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<SignUpAPIResponse>;
export type SignInAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<SignInAPIResponse>;
export type EnterEmailAPI = (requestJson: RequestJson, headers: HeadersInit) => Promise<EnterEmailAPIResponse>;
export type SubmitNewPasswordAPI = (
    requestJson: RequestJson,
    headers: HeadersInit
) => Promise<SubmitNewPasswordAPIResponse>;
