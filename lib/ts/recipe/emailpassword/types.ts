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
    FeatureConfigBase,
    FormField,
    FormFieldBaseConfig,
    NormalisedFormField,
    RecipeModuleConfig,
    RequestJson
} from "../../types";
import { API_RESPONSE_STATUS } from "../../constants";
import EmailPassword from "./emailPassword";
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { RefObject } from "react";

/*
 * EmailPassword enums.
 */

/*
 * EmailPassword Config Types.
 */

export type EmailPasswordUserInput = {
    /*
     * Sign In and Sign Up feature.
     */
    signInAndUpFeature?: SignInAndUpConfig;

    /*
     * Reset password Using Token feature.
     */
    resetPasswordUsingTokenFeature?: any;
};

export type EmailPasswordConfig = RecipeModuleConfig & EmailPasswordUserInput;

export type SignInAndUpConfig = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation?: boolean;

    /*
     * URL to redirect to in case disableDefaultImplemention is true
     */
    onSuccessRedirectURL?: string;

    /*
     * SignUp form config.
     */

    signUpForm?: SignUpFormFeatureConfig;

    /*
     * SignIn form config.
     */

    signInForm?: SignInFormFeatureConfig;
};

export type SignInAndUp = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultImplementation: boolean;

    /*
     * URL to redirect to in case disableDefaultImplemention is true
     */
    onSuccessRedirectURL: string;

    /*
     * SignUp form config.
     */

    signUpForm?: SignUpFormFeatureConfig;

    /*
     * SignIn form config.
     */

    signInForm?: SignInFormFeatureConfig;
};

export type FormFieldSignInConfig = FormFieldBaseConfig;

export type FormFieldSignUpConfig = FormField;

export type SignUpFormFeatureConfig = FeatureConfigBase & {
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
    termsAndConditionsLink?: string;
};

export type SignInFormFeatureConfig = FeatureConfigBase & {
    /*
     * Form fields for SignUp.
     */
    formFields?: FormFieldSignInConfig[];

    /*
     * Link to the reset password URL in case disableDefaultImplemention is true.
     */
    resetPasswordURL?: string;
};

/*
 * Props Types.
 */
export type EmailPasswordProps = {
    /*
     * Internal props provided by
     */
    __internal?: { instance: EmailPassword };

    children?: JSX.Element;

    onHandleForgotPasswordClicked?: () => Promise<boolean>;

    doesSessionExist?: () => Promise<boolean>;

    onHandleSuccess?: (context: any, user?: any, responseJson?: any) => Promise<boolean>;

    onCallSignUpAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;

    onCallSignInAPI?: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
};

type EmailPasswordThemeProps = {
    /*
     * Call Sign In API.
     */
    callAPI: (fields: APIFormField[]) => Promise<SignInThemeResponse>;

    /*
     * Called on successful signin/signup/resetpassword.
     */
    onSuccess?: () => void;

    /*
     * Custom styling from user.
     */
    styleFromInit?: { [key: string]: CSSInterpolation };

    /*
     * Form fields to use in the signin form.
     */
    formFields: FormFieldThemeProps[];
};

export type SignInThemeProps = EmailPasswordThemeProps & {
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
    resetPasswordURL?: string;
};

export type SignUpThemeProps = EmailPasswordThemeProps & {
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
    termsAndConditionsLink?: string;
};

export type SignInAndUpThemeProps = {
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

/*eslint-disable */
export type SignUpThemeResponse =
    | {
          /*
           * Success.
           */
          status: API_RESPONSE_STATUS.OK;
      }
    | {
          /*
           * General error.
           */
          status: API_RESPONSE_STATUS.GENERAL_ERROR;

          /*
           * General error message.
           */
          message?: string;
      }
    | {
          /*
           * Field validation errors.
           */
          status: API_RESPONSE_STATUS.FIELD_ERROR;

          /*
           * Array of Field Id and their corresponding error.
           */
          fields: FormFieldError[];
      };

export type SignInThemeResponse =
    | SignUpThemeResponse
    | {
          /*
           * Wrong credentials error.
           */
          status: API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR;

          /*
           * Wrong credentials error message.
           */
          message?: string;
      };
/*eslint-enabled */

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

/*
 * State type.
 */

export type FormFieldState = FormFieldThemeProps & {
    /*
     * Has the value already been submitted to its validator.
     */
    validated: boolean;

    /*
     * Has the value already been submitted to its validator.
     */
    ref: RefObject<HTMLInputElement>;

    /*
     * Has the value already been submitted to its validator.
     */
    showIsRequired: boolean;
};
