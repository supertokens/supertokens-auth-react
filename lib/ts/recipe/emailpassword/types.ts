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
    AuthRecipeModuleUserInput,
    FeatureBaseConfig,
    FormField,
    FormFieldBaseConfig,
    NormalisedBaseConfig,
    NormalisedFormField,
    RecipeModuleConfig,
    SuccessAPIResponse,
    ThemeBaseProps
} from "../../types";
import { RefObject } from "react";
import NormalisedURLPath from "../../normalisedURLPath";
import { History, LocationState } from "history";
import { EmailVerificationUserInput } from "../emailverification/types";

/*
 * EmailPassword User InputsConfig Types.
 */

export type EmailPasswordUserInput = AuthRecipeModuleUserInput<
    EmailPasswordGetRedirectionURLContext,
    EmailPasswordPreAPIHookContext,
    EmailPasswordOnHandleEventContext
> & {
    /*
     * Sign In and Sign Up feature.
     */
    signInAndUpFeature?: SignInAndUpFeatureUserInput;

    /*
     * Reset password Using Token feature.
     */
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;

    /*
     * Email Verification configs.
     */
    emailVerificationFeature?: EmailVerificationUserInput;
};

export type EmailPasswordConfig = EmailPasswordUserInput &
    RecipeModuleConfig<EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext>;

export type NormalisedEmailPasswordConfig = {
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

/*
 * Props Types.
 */
export type FeatureBaseProps<T> = {
    /*
     * Internal props provided by
     */
    __internal?: { instance: T };

    /*
     * Children element
     */
    children?: JSX.Element;

    /*
     * History provided by react-router
     */
    history?: History<LocationState>;
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

    /*
     * Raw Palette provided by user.
     */
    rawPalette: Record<string, string>;
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

export type EmailExistsAPIResponse = SuccessAPIResponse & {
    /*
     * Is email already registered
     */
    exists: boolean;
};

export type FormFieldAPIResponse = {
    /*
     * Field validation errors.
     */
    status: "FIELD_ERROR";

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
          status: "OK";

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
          status: "OK";
      }
    | FormFieldAPIResponse;

export type ThemeResponseGeneralError = {
    /*
     * General error.
     */
    status: "GENERAL_ERROR";

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
          status: "WRONG_CREDENTIALS_ERROR";

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
          status: "RESET_PASSWORD_INVALID_TOKEN_ERROR";
      };

export type EmailPasswordPreAPIHookContext = {
    /*
     * Pre API Hook action.
     */
    action:
        | "SEND_RESET_PASSWORD_EMAIL"
        | "SUBMIT_NEW_PASSWORD"
        | "VERIFY_EMAIL"
        | "SEND_VERIFY_EMAIL"
        | "IS_EMAIL_VERIFIED"
        | "SIGN_IN"
        | "SIGN_UP"
        | "SIGN_OUT";

    /*
     * Request object containing query params, body, headers.
     */
    requestInit: RequestInit;
};

export type EmailPasswordGetRedirectionURLContext =
    | {
          /*
           * Get Redirection URL Context
           */
          action: "SUCCESS";

          /*
           * Redirect To Path represents the intended path the user wanted to access.
           */
          redirectToPath?: string;
      }
    | {
          /*
           * Get Redirection URL Context
           */
          action: "SIGN_IN_AND_UP" | "VERIFY_EMAIL" | "RESET_PASSWORD";
      };

export type EmailPasswordOnHandleEventContext =
    | {
          /*
           * On Handle Event actions
           */
          action:
              | "SESSION_ALREADY_EXISTS"
              | "RESET_PASSWORD_EMAIL_SENT"
              | "PASSWORD_RESET_SUCCESSFUL"
              | "VERIFY_EMAIL_SENT"
              | "EMAIL_VERIFIED_SUCCESSFUL";
      }
    | {
          /*
           * Sign In / Sign Up success.
           */
          action: "SIGN_IN_COMPLETE" | "SIGN_UP_COMPLETE";
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

    /*
     * Raw Palette provided by user.
     */
    rawPalette: Record<string, string>;
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

export type SignInAndUpState =
    | {
          status: "LOADING" | "READY";
      }
    | {
          status: "SUCCESSFUL";
          user: User;
      };

export type EnterEmailThemeState = {
    /*
     * Enter Email Status
     */
    status: "READY" | "SENT";
};

export type SubmitNewPasswordThemeState = {
    /*
     * Enter Email Status
     */
    status: "READY" | "SUCCESS";
};

export type SendVerifyEmailThemeState = {
    /*
     * Status.
     */
    status: "READY" | "SUCCESS" | "ERROR";
};

export type EmailPasswordAuthState = {
    /*
     * EmailPassword Auth Status
     */
    status: "LOADING" | "READY";
};

export type FormBaseState =
    | {
          formFields: FormFieldState[];
          status: "IN_PROGRESS" | "READY" | "LOADING" | "FIELD_ERRORS" | "SUCCESS";
      }
    | {
          formFields: FormFieldState[];
          status: "GENERAL_ERROR";
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
          status: "OK";

          /*
           * User object.
           */
          user?: User;
      }
    | {
          /*
           * General Errors.
           */
          status: "GENERAL_ERROR";

          /*
           * Error message.
           */
          message: string;
      }
    | {
          /*
           * Field validation errors.
           */
          status: "FIELD_ERROR";

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
