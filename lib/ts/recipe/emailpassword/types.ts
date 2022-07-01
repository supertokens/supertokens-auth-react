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
} from "../../types";
import React, { Dispatch } from "react";
import {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    PreAndPostAPIHookAction as AuthRecipeModulePreAPIHookAction,
    User,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
    UserInputOverride as AuthRecipeUserInputOverride,
} from "../authRecipeWithEmailVerification/types";
import OverrideableBuilder from "supertokens-js-override";

import { ComponentOverride } from "../../components/componentOverride/componentOverride";
import { SignInHeader } from "./components/themes/signInAndUp/signInHeader";
import { SignIn } from "./components/themes/signInAndUp/signIn";
import { SignInFooter } from "./components/themes/signInAndUp/signInFooter";
import { SignInForm } from "./components/themes/signInAndUp/signInForm";
import { SignUp } from "./components/themes/signInAndUp/signUp";
import { SignUpFooter } from "./components/themes/signInAndUp/signUpFooter";
import { SignUpForm } from "./components/themes/signInAndUp/signUpForm";
import { SignUpHeader } from "./components/themes/signInAndUp/signUpHeader";
import { ResetPasswordEmail } from "./components/themes/resetPasswordUsingToken/resetPasswordEmail";
import { SubmitNewPassword } from "./components/themes/resetPasswordUsingToken/submitNewPassword";
import { InputProps } from "./components/library/input";
import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";

export type ComponentOverrideMap = {
    EmailPasswordSignIn_Override?: ComponentOverride<typeof SignIn>;
    EmailPasswordSignInFooter_Override?: ComponentOverride<typeof SignInFooter>;
    EmailPasswordSignInForm_Override?: ComponentOverride<typeof SignInForm>;
    EmailPasswordSignInHeader_Override?: ComponentOverride<typeof SignInHeader>;
    EmailPasswordSignUp_Override?: ComponentOverride<typeof SignUp>;
    EmailPasswordSignUpFooter_Override?: ComponentOverride<typeof SignUpFooter>;
    EmailPasswordSignUpForm_Override?: ComponentOverride<typeof SignUpForm>;
    EmailPasswordSignUpHeader_Override?: ComponentOverride<typeof SignUpHeader>;
    EmailPasswordResetPasswordEmail_Override?: ComponentOverride<typeof ResetPasswordEmail>;
    EmailPasswordSubmitNewPassword_Override?: ComponentOverride<typeof SubmitNewPassword>;
};

export type UserInput = {
    signInAndUpFeature?: SignInAndUpFeatureUserInput;
    resetPasswordUsingTokenFeature?: ResetPasswordUsingTokenUserInput;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components?: ComponentOverrideMap;
    } & AuthRecipeUserInputOverride;
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
        components: ComponentOverrideMap;
    };
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type SignInAndUpFeatureUserInput = {
    /*
     * Disable default implementation with default routes.
     */
    disableDefaultUI?: boolean;

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
    disableDefaultUI: boolean;

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
    disableDefaultUI?: boolean;

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
    disableDefaultUI: boolean;

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

    error: string | undefined;
};

export type SignInThemeProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    clearError: () => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    signUpClicked?: () => void;
    forgotPasswordClick: () => void;
    onSuccess: () => void;
};

export type SignUpThemeProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    clearError: () => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    signInClicked?: () => void;
    onSuccess: () => void;
};

export type SignInAndUpThemeProps = {
    signInForm: SignInThemeProps;
    signUpForm: SignUpThemeProps;
    featureState: {
        isSignUp: boolean;
    };
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>;
    config: NormalisedConfig;
    userContext?: any;
};

export type FormFieldThemeProps = NormalisedFormField & {
    /*
     * Custom component that replaces the label entirely
     */
    labelComponent?: JSX.Element;

    /*
     * Custom component that replaces the standard input component
     */
    inputComponent?: React.FC<InputProps>;

    /*
     * Show Is required (*) next to label
     */
    showIsRequired?: boolean;

    /*
     * Clears the field after calling the API.
     */
    clearOnSubmit?: boolean;
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

export type PreAndPostAPIHookAction =
    | AuthRecipeModulePreAPIHookAction
    | "EMAIL_PASSWORD_SIGN_UP"
    | "EMAIL_PASSWORD_SIGN_IN"
    | "SEND_RESET_PASSWORD_EMAIL"
    | "SUBMIT_NEW_PASSWORD"
    | "EMAIL_EXISTS";

export type PreAPIHookContext = {
    /*
     * Pre API Hook action.
     */
    action: PreAndPostAPIHookAction;

    /*
     * Request object containing query params, body, headers.
     */
    requestInit: RequestInit;

    /*
     * URL
     */
    url: string;
    userContext: any;
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
          userContext: any;
      }
    | {
          action: "SUCCESS";
          isNewUser: boolean;
          user: { id: string; email: string };
          userContext: any;
      };

export type ResetPasswordUsingTokenThemeProps = {
    enterEmailForm: EnterEmailProps;
    submitNewPasswordForm: SubmitNewPasswordProps | undefined;
    config: NormalisedConfig;
    userContext?: any;
};

export type EnterEmailProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    onBackButtonClicked: () => void;
};

export type SubmitNewPasswordProps = FormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    onSignInClicked: () => void;
    token: string;
};

export type EnterEmailStatus = "READY" | "SENT";

export type SubmitNewPasswordStatus = "READY" | "SUCCESS";

export type FormBaseProps<T> = {
    footer?: JSX.Element;

    formFields: FormFieldThemeProps[];

    showLabels: boolean;

    buttonLabel: string;

    validateOnBlur?: boolean;

    clearError: () => void;
    onError: (error: string) => void;
    onSuccess?: (result: T & { status: "OK" }) => void;

    callAPI: (fields: APIFormField[], setValue: (id: string, value: string) => void) => Promise<FormBaseAPIResponse<T>>;
};

export type FormBaseAPIResponse<T> =
    | ({
          /*
           * Success.
           */
          status: "OK";
      } & T)
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

export type SignInAndUpState = {
    user: User | undefined;
    error: string | undefined;
    isSignUp: boolean;
};

export type EmailPasswordSignInAndUpAction =
    | {
          type: "setError";
          error: string | undefined;
      }
    | {
          type: "setSignUp";
      }
    | {
          type: "setSignIn";
      };

export type EmailPasswordSignInAndUpChildProps = Omit<SignInAndUpThemeProps, "featureState" | "dispatch">;
