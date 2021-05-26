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
    ThemeBaseProps,
    PreAPIHookFunction,
} from "../../types";
import { RefObject } from "react";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    PreAPIHookContext as AuthRecipeModulePreAPIHookContext,
    User,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipeModule/types";
import RecipeImplementation from "./recipeImplementation";

export type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    override?: {
        functions?: (originalImplementation: RecipeImplementation) => RecipeInterface;
    };
} & AuthRecipeModuleUserInput;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

export type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    override: {
        functions: (originalImplementation: RecipeImplementation) => RecipeInterface;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;

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
};

export type NormalisedSignInFormFeatureConfig = NormalisedBaseConfig & {
    /*
     * Normalised form fields for SignIn.
     */
    formFields: NormalisedFormField[];
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

type FormThemeBaseProps = ThemeBaseProps & {
    /*
     * Form fields to use in the signin form.
     */
    formFields: FormFieldThemeProps[];
};

export type SignInThemeProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    signUpClicked?: () => void;
    forgotPasswordClick: () => void;
};

export type SignUpThemeProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    signInClicked?: () => void;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
};

export type SignInAndUpThemeProps = {
    defaultToSignUp: boolean;

    signInForm: SignInThemeProps;

    signUpForm: SignUpThemeProps;

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

export type PreAPIHookContext =
    | AuthRecipeModulePreAPIHookContext
    | {
          /*
           * Pre API Hook action.
           */
          action: "SIGN_UP" | "SEND_RESET_PASSWORD_EMAIL" | "SUBMIT_NEW_PASSWORD";

          /*
           * Request object containing query params, body, headers.
           */
          requestInit: RequestInit;

          /*
           * URL
           */
          url: string;
      };

export type GetRedirectionURLContext =
    | AuthRecipeModuleGetRedirectionURLContext
    | {
          /*
           * Get Redirection URL Context
           */
          action: "RESET_PASSWORD";
      };

export type OnHandleEventContext =
    | AuthRecipeModuleOnHandleEventContext
    | {
          /*
           * On Handle Event actions
           */
          action: "RESET_PASSWORD_EMAIL_SENT" | "PASSWORD_RESET_SUCCESSFUL";
      };

export type ResetPasswordUsingTokenThemeProps = {
    enterEmailForm: EnterEmailThemeProps;
    submitNewPasswordForm: SubmitNewPasswordThemeProps;
    token: string | undefined;
    rawPalette: Record<string, string>;
};

export type EnterEmailThemeProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
};

export type SubmitNewPasswordThemeProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    onSignInClicked: () => void;
    token: string;
};

export type EnterEmailThemeState = {
    /*
     * Enter Email Status
     */
    status: "READY" | "SENT";
};

export type SubmitNewPasswordThemeState = {
    /*
     * Submit New Password Theme Status
     */
    status: "READY" | "SUCCESS";
};

export type SendVerifyEmailThemeState = {
    /*
     * Send verify Email Theme Status.
     */
    status: "READY" | "SUCCESS" | "ERROR";
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

export type SignInAndUpState =
    | {
          status: "LOADING" | "READY";
      }
    | {
          status: "SUCCESSFUL";
          user: User;
      };

export interface RecipeInterface {
    submitNewPassword: (
        formFields: {
            id: string;
            value: string;
        }[],
        token: string,
        preAPIHook?: PreAPIHookFunction
    ) => Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;

    sendPasswordResetEmail: (
        formFields: {
            id: string;
            value: string;
        }[],
        preAPIHook?: PreAPIHookFunction
    ) => Promise<
        | {
              status: "OK";
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;

    signUp: (
        formFields: {
            id: string;
            value: string;
        }[],
        preAPIHook?: PreAPIHookFunction
    ) => Promise<
        | {
              status: "OK";
              user: User;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;

    signIn: (
        formFields: {
            id: string;
            value: string;
        }[],
        preAPIHook?: PreAPIHookFunction
    ) => Promise<
        | {
              status: "OK";
              user: User;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
        | {
              status: "WRONG_CREDENTIALS_ERROR";
          }
    >;

    doesEmailExist: (email: string, preAPIHook?: PreAPIHookFunction) => Promise<boolean>;
}
