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

import type { InputProps } from "./components/library/input";
import type { ResetPasswordEmail } from "./components/themes/resetPasswordUsingToken/resetPasswordEmail";
import type { SubmitNewPassword } from "./components/themes/resetPasswordUsingToken/submitNewPassword";
import type { SignIn } from "./components/themes/signInAndUp/signIn";
import type { SignInFooter } from "./components/themes/signInAndUp/signInFooter";
import type { SignInForm } from "./components/themes/signInAndUp/signInForm";
import type { SignInHeader } from "./components/themes/signInAndUp/signInHeader";
import type { SignUp } from "./components/themes/signInAndUp/signUp";
import type { SignUpFooter } from "./components/themes/signInAndUp/signUpFooter";
import type { SignUpForm } from "./components/themes/signInAndUp/signUpForm";
import type { SignUpHeader } from "./components/themes/signInAndUp/signUpHeader";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    APIFormField,
    FeatureBaseConfig,
    FormField,
    FormFieldBaseConfig,
    NormalisedBaseConfig,
    NormalisedFormField,
    ThemeBaseProps,
    UserContext,
} from "../../types";
import type {
    GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext,
    OnHandleEventContext as AuthRecipeModuleOnHandleEventContext,
    Config as AuthRecipeModuleConfig,
    NormalisedConfig as NormalisedAuthRecipeModuleConfig,
    UserInput as AuthRecipeModuleUserInput,
} from "../authRecipe/types";
import type { Dispatch } from "react";
import type { OverrideableBuilder } from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import type { User } from "supertokens-web-js/types";

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
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & AuthRecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type Config = UserInput &
    AuthRecipeModuleConfig<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
    resetPasswordUsingTokenFeature: NormalisedResetPasswordUsingTokenFeatureConfig;
    override: {
        functions: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
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
    formFields?: (FormField & {
        inputComponent?: (props: InputProps) => JSX.Element;
    })[];

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
    formFields: (NormalisedFormField & {
        inputComponent?: (props: InputProps) => JSX.Element;
    })[];

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

type NonSignUpFormThemeBaseProps = ThemeBaseProps & {
    /*
     * Omit since, custom inputComponent only part of signup
     */
    formFields: Omit<FormFieldThemeProps, "inputComponent">[];

    error: string | undefined;
};

export type SignInThemeProps = NonSignUpFormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    clearError: () => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    signUpClicked?: () => void;
    forgotPasswordClick: () => void;
    onSuccess: (result: { user: User }) => void;
};

export type SignUpThemeProps = ThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    clearError: () => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    signInClicked?: () => void;
    onSuccess: (result: { user: User }) => void;
    formFields: FormFieldThemeProps[];
    error: string | undefined;
};

export type SignInAndUpThemeProps = {
    signInForm: SignInThemeProps;
    signUpForm: SignUpThemeProps;
    featureState: {
        isSignUp: boolean;
    };
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>;
    config: NormalisedConfig;
    userContext?: UserContext;
};

export type FormFieldThemeProps = NormalisedFormField & {
    /*
     * Custom component that replaces the label entirely
     */
    labelComponent?: JSX.Element;

    /*
     * Show Is required (*) next to label
     */
    showIsRequired?: boolean;

    /*
     * Clears the field after calling the API.
     */
    clearOnSubmit?: boolean;

    /*
     * Ability to add custom components
     */
    inputComponent?: (props: InputProps) => JSX.Element;
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
    userContext: UserContext;
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
          action: "RESET_PASSWORD_EMAIL_SENT";
          email: string;
          userContext: UserContext;
      }
    | {
          /*
           * On Handle Event actions
           */
          action: "PASSWORD_RESET_SUCCESSFUL";
          userContext: UserContext;
      }
    | {
          action: "SUCCESS";
          isNewRecipeUser: boolean;
          user: User;
          userContext: UserContext;
      };

export type ResetPasswordUsingTokenThemeProps = {
    enterEmailForm: EnterEmailProps;
    submitNewPasswordForm: SubmitNewPasswordProps | undefined;
    config: NormalisedConfig;
    userContext?: UserContext;
};

export type EnterEmailProps = NonSignUpFormThemeBaseProps & {
    recipeImplementation: RecipeInterface;
    error: string | undefined;
    clearError: () => void;
    onError: (error: string) => void;
    config: NormalisedConfig;
    onBackButtonClicked: () => void;
};

export type SubmitNewPasswordProps = NonSignUpFormThemeBaseProps & {
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
